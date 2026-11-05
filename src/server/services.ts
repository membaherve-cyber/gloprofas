import "server-only";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { and, eq, isNull, sql } from "drizzle-orm";
import { db } from "@/db";
import {
  activityLogs,
  contactMessages,
  newsletterSubscribers,
  pages,
  partnershipApplications,
  reportDrafts,
  scamAlerts,
  scamCategories,
  scamReportAttachments,
  scamReportNotes,
  scamReports,
  serviceEnquiries,
  users,
  userRoles,
  volunteerApplications,
  websiteSettings,
  chatbotSettings,
  articles,
  resources,
  services,
  jobs,
  failedJobs,
} from "@/db/schema";
import { createSession, hashPassword, readSignedToken, signedToken, verifyPassword, verifyTotp } from "@/lib/auth";
import { env } from "@/lib/env";
import type { Permission } from "@/lib/permissions";
import { can } from "@/lib/permissions";
import { rateLimit } from "@/lib/rate-limit";
import type { SessionUser } from "@/lib/auth";
import type { ReportDraftData, RoleKey } from "@/lib/types";
import {
  contactSchema,
  enquirySchema,
  newsletterSchema,
  partnershipSchema,
  reportStep1,
  reportStep2,
  reportStep4,
  volunteerSchema,
} from "@/lib/validation";
import { escapeCsv, makeReference, sha256, uid } from "@/lib/utils";
import { emailHtml, queueEmail } from "@/server/mail";
import { getSettings } from "@/server/queries";

export class ServiceError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export async function logActivity(userId: string | null, action: string, entity?: string, entityId?: string, meta?: Record<string, string | number | boolean | null>) {
  await db.insert(activityLogs).values({ id: uid("log"), userId, action, entity, entityId, meta });
}

export async function guardForm(ip: string, form: FormData, bucket: string) {
  if (String(form.get("company_website") || "").trim()) throw new ServiceError("rejected");
  const started = Number(form.get("started_at") || 0);
  if (!started || Date.now() - started < 1800) throw new ServiceError("too_fast");
  const limited = await rateLimit(`${bucket}:${sha256(ip).slice(0, 16)}`, 8, 3600);
  if (!limited.ok) throw new ServiceError("limited");
  if (env().TURNSTILE_SECRET_KEY) {
    const token = String(form.get("turnstile_token") || "");
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: env().TURNSTILE_SECRET_KEY, response: token }),
    });
    const data = await response.json() as { success?: boolean };
    if (!data.success) throw new ServiceError("captcha");
  }
}

function str(form: FormData, key: string) {
  return String(form.get(key) || "");
}

async function notify(subject: string, lines: string[]) {
  const settings = await getSettings();
  const recipients = settings?.notificationEmails?.filter(Boolean) || [];
  const extra = env().MAIL_FROM_ADDRESS ? [] : [];
  const all = recipients.length ? recipients : extra;
  for (const to of all) {
    await queueEmail({ to, subject, text: lines.join("\n"), html: emailHtml(subject, lines) });
  }
}

export async function submitContact(form: FormData, ip: string) {
  await guardForm(ip, form, "contact");
  const parsed = contactSchema.safeParse({
    name: str(form, "name"),
    email: str(form, "email"),
    subject: str(form, "subject"),
    category: str(form, "category"),
    message: str(form, "message"),
    language: str(form, "language") || "en",
  });
  if (!parsed.success) throw new ServiceError("invalid");
  const id = uid("msg");
  await db.insert(contactMessages).values({ id, ...parsed.data, status: "new" });
  await queueEmail({
    to: parsed.data.email,
    subject: "GLOPROFAS · message received",
    text: "We have received your message. This is not a police report.",
    html: emailHtml("Message received", ["We have received your message.", "This acknowledgement is not a police report and does not mean funds can be recovered."]),
  });
  await notify("New contact message", [`From: ${parsed.data.email}`, `Subject: ${parsed.data.subject}`]);
  await db.insert(jobs).values({ id: uid("job"), type: "contact.notify", payload: { id }, status: "done", attempts: 1 });
  return id;
}

export async function submitEnquiry(form: FormData, ip: string) {
  await guardForm(ip, form, "enquiry");
  const parsed = enquirySchema.safeParse({
    name: str(form, "name"),
    organisation: str(form, "organisation"),
    email: str(form, "email"),
    phone: str(form, "phone"),
    country: str(form, "country"),
    serviceId: str(form, "service_id"),
    serviceLabel: str(form, "service_label"),
    requirements: str(form, "requirements"),
    contactMethod: str(form, "contact_method"),
    language: str(form, "language") || "en",
  });
  if (!parsed.success) throw new ServiceError("invalid");
  const id = uid("enq");
  await db.insert(serviceEnquiries).values({ id, ...parsed.data, status: "new" });
  await queueEmail({
    to: parsed.data.email,
    subject: "GLOPROFAS · enquiry received",
    text: "Your service enquiry has been received. No price is confirmed by this email.",
    html: emailHtml("Enquiry received", ["Your service enquiry has been received.", "No fee is confirmed by this message."]),
  });
  await notify("New service enquiry", [`From: ${parsed.data.email}`, `Service: ${parsed.data.serviceLabel || parsed.data.serviceId}`]);
  return id;
}

export async function submitVolunteer(form: FormData, ip: string) {
  await guardForm(ip, form, "volunteer");
  const parsed = volunteerSchema.safeParse({
    name: str(form, "name"),
    email: str(form, "email"),
    country: str(form, "country"),
    background: str(form, "background"),
    skills: str(form, "skills"),
    languages: str(form, "languages"),
    interests: str(form, "interests"),
    motivation: str(form, "motivation"),
  });
  if (!parsed.success) throw new ServiceError("invalid");
  await db.insert(volunteerApplications).values({ id: uid("vol"), ...parsed.data, status: "new" });
  await notify("New volunteer application", [`From: ${parsed.data.email}`]);
}

export async function submitPartnership(form: FormData, ip: string) {
  await guardForm(ip, form, "partner");
  const parsed = partnershipSchema.safeParse({
    organisation: str(form, "organisation"),
    orgType: str(form, "org_type"),
    contactName: str(form, "contact_name"),
    email: str(form, "email"),
    country: str(form, "country"),
    proposal: str(form, "proposal"),
  });
  if (!parsed.success) throw new ServiceError("invalid");
  await db.insert(partnershipApplications).values({ id: uid("par"), ...parsed.data, status: "new" });
  await notify("New partnership proposal", [`Organisation: ${parsed.data.organisation}`]);
}

export async function submitNewsletter(form: FormData, ip: string) {
  await guardForm(ip, form, "news");
  const parsed = newsletterSchema.safeParse({
    name: str(form, "name"),
    email: str(form, "email"),
    country: str(form, "country"),
    language: str(form, "language") || "en",
    consent: form.get("consent") ? "yes" : "",
  });
  if (!parsed.success) throw new ServiceError("invalid");
  const email = parsed.data.email.toLowerCase();
  const [existing] = await db.select().from(newsletterSubscribers).where(eq(newsletterSubscribers.email, email)).limit(1);
  if (existing?.status === "confirmed") return "exists";
  const id = existing?.id || uid("sub");
  if (!existing) {
    await db.insert(newsletterSubscribers).values({
      id,
      name: parsed.data.name,
      email,
      country: parsed.data.country,
      language: parsed.data.language,
      status: "pending",
      consentAt: new Date(),
    });
  }
  const token = signedToken(`confirm:${id}:${Date.now() + 1000 * 60 * 60 * 48}`);
  const link = `${env().NEXT_PUBLIC_SITE_URL}/api/newsletter/confirm?token=${encodeURIComponent(token)}`;
  await queueEmail({
    to: email,
    subject: "Confirm your GLOPROFAS subscription",
    text: `Confirm your subscription: ${link}`,
    html: emailHtml("Confirm your subscription", ["Open this link to confirm. If you did not ask for it, ignore this message.", link]),
  });
  return "pending";
}

export async function confirmNewsletter(token: string) {
  const raw = readSignedToken(token);
  if (!raw?.startsWith("confirm:")) return false;
  const [, id, exp] = raw.split(":");
  if (!id || Number(exp) < Date.now()) return false;
  await db.update(newsletterSubscribers).set({ status: "confirmed", confirmedAt: new Date() }).where(eq(newsletterSubscribers.id, id));
  return true;
}

export async function unsubscribeNewsletter(token: string) {
  const raw = readSignedToken(token);
  if (!raw?.startsWith("unsub:")) return false;
  const id = raw.slice("unsub:".length);
  await db.update(newsletterSubscribers).set({ status: "unsubscribed", unsubscribedAt: new Date() }).where(eq(newsletterSubscribers.id, id));
  return true;
}

export function unsubscribeToken(id: string) {
  return signedToken(`unsub:${id}`);
}

export async function loadDraft(token: string | undefined) {
  if (!token) return null;
  const [row] = await db.select().from(reportDrafts).where(eq(reportDrafts.tokenHash, sha256(token))).limit(1);
  if (!row || row.expiresAt < new Date()) return null;
  return row;
}

export async function saveDraft(token: string, step: number, data: ReportDraftData) {
  const hash = sha256(token);
  const [existing] = await db.select().from(reportDrafts).where(eq(reportDrafts.tokenHash, hash)).limit(1);
  if (!existing) {
    await db.insert(reportDrafts).values({
      id: uid("draft"),
      tokenHash: hash,
      step,
      data,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 12),
    });
    return;
  }
  const merged = { ...existing.data, ...data };
  if (step === 1) reportStep1.parse({ ...merged, unsure: Boolean(merged.unsure), description: merged.description || "placeholder-not-validated" });
  await db.update(reportDrafts).set({ step, data: merged, updatedAt: new Date() }).where(eq(reportDrafts.id, existing.id));
}

export function validateDraft(step: number, data: ReportDraftData) {
  if (step === 1) return reportStep1.safeParse({ ...data, unsure: Boolean(data.unsure) });
  if (step === 2) return reportStep2.safeParse({ ...data, moneyLost: Boolean(data.moneyLost), ongoing: Boolean(data.ongoing) });
  if (step === 3 || step === 4) return reportStep4.safeParse(data);
  return { success: true as const, data };
}

function sniff(buffer: Buffer) {
  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return "image/jpeg";
  if (buffer.length >= 8 && buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "image/png";
  if (buffer.length >= 12 && buffer.subarray(0, 4).toString() === "RIFF" && buffer.subarray(8, 12).toString() === "WEBP") return "image/webp";
  if (buffer.subarray(0, 5).toString() === "%PDF-") return "application/pdf";
  return null;
}

export async function storeEvidence(draftId: string, file: File) {
  if (file.size <= 0 || file.size > 10 * 1024 * 1024) throw new ServiceError("file_size");
  const existing = await db.select().from(scamReportAttachments).where(eq(scamReportAttachments.draftId, draftId));
  if (existing.length >= 5) throw new ServiceError("file_count");
  const buffer = Buffer.from(await file.arrayBuffer());
  const sniffed = sniff(buffer);
  const ext = path.extname(file.name).toLowerCase();
  const allowed: Record<string, string[]> = {
    "image/jpeg": [".jpg", ".jpeg"],
    "image/png": [".png"],
    "image/webp": [".webp"],
    "application/pdf": [".pdf"],
  };
  if (!sniffed || !allowed[sniffed]?.includes(ext)) throw new ServiceError("file_type");
  let output = buffer;
  let mime = sniffed;
  let nameExt = ext;
  if (sniffed === "application/pdf") {
    const text = buffer.toString("latin1");
    if (/\/JavaScript|\/JS |\/Launch|\/EmbeddedFile/i.test(text)) throw new ServiceError("file_type");
  } else {
    const image = sharp(buffer, { failOn: "error" }).rotate();
    if (sniffed === "image/png") {
      output = await image.png().toBuffer();
      nameExt = ".png";
    } else if (sniffed === "image/webp") {
      output = await image.webp({ quality: 82 }).toBuffer();
      nameExt = ".webp";
    } else {
      output = await image.jpeg({ quality: 82 }).toBuffer();
      mime = "image/jpeg";
      nameExt = ".jpg";
    }
  }
  const key = `${uid("file")}${nameExt}`;
  const dir = path.join(/*turbopackIgnore: true*/ process.cwd(), "storage", "private");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, key), output);
  const id = uid("att");
  await db.insert(scamReportAttachments).values({
    id,
    draftId,
    storageKey: key,
    originalName: path.basename(file.name).slice(0, 120),
    mime,
    size: output.length,
  });
  return { id, name: path.basename(file.name).slice(0, 120), size: output.length };
}

export async function readPrivateFile(storageKey: string) {
  const full = path.join(/*turbopackIgnore: true*/ process.cwd(), "storage", "private", path.basename(storageKey));
  return readFile(full);
}

export async function submitReport(token: string) {
  const draft = await loadDraft(token);
  if (!draft) throw new ServiceError("draft");
  const data = draft.data;
  const step1 = reportStep1.safeParse({ ...data, unsure: Boolean(data.unsure) });
  const step2 = reportStep2.safeParse({ ...data, moneyLost: Boolean(data.moneyLost), ongoing: Boolean(data.ongoing) });
  const step4 = reportStep4.safeParse(data);
  if (!step1.success || !step2.success || !step4.success || !data.consent) throw new ServiceError("invalid");
  let reference = "";
  let reportId = "";
  for (let attempt = 0; attempt < 5; attempt += 1) {
    reference = makeReference();
    reportId = uid("rep");
    try {
      await db.transaction(async (tx) => {
        await tx.insert(scamReports).values({
          id: reportId,
          reference,
          categoryId: data.unsure ? null : data.categoryId || null,
          description: step1.data.description,
          incidentDate: step1.data.incidentDate,
          channel: step2.data.channel,
          country: step2.data.country,
          city: step2.data.city,
          suspiciousUrl: step2.data.url,
          phone: step2.data.phone,
          emailInvolved: step2.data.emailInvolved,
          moneyLost: step2.data.moneyLost,
          amount: step2.data.amount,
          currency: step2.data.currency,
          ongoing: step2.data.ongoing,
          reporterName: step4.data.name,
          reporterEmail: step4.data.email,
          contactLanguage: step4.data.language,
          consentAt: new Date(),
          status: "new",
        });
        await tx.update(scamReportAttachments).set({ reportId, draftId: null }).where(eq(scamReportAttachments.draftId, draft.id));
        await tx.insert(activityLogs).values({
          id: uid("log"),
          action: "report.created",
          entity: "scam_reports",
          entityId: reportId,
          meta: { reference },
        });
        await tx.delete(reportDrafts).where(eq(reportDrafts.id, draft.id));
      });
      break;
    } catch (error) {
      if (attempt === 4) throw error;
    }
  }
  await queueEmail({
    to: step4.data.email,
    subject: `GLOPROFAS report ${reference}`,
    text: `Your reference is ${reference}. This is not a police report and does not guarantee recovery. If you sent money, contact your bank or mobile-money provider through its official channel.`,
    html: emailHtml("Report received", [
      `Your reference number is ${reference}.`,
      "Keep it. Staff can find the report with this number.",
      "This is not a police report and does not guarantee recovery of funds.",
      "If you sent money, contact your bank or mobile-money provider now through its official channel.",
    ]),
  });
  await notify("New scam report", [`Reference: ${reference}`, "Open the admin reports module. Do not forward evidence by email."]);
  await db.insert(jobs).values({
    id: uid("job"),
    type: "report.received",
    payload: { reference },
    status: "done",
    attempts: 1,
  });
  return { reference, moneyLost: step2.data.moneyLost };
}

export async function loginWithPassword(email: string, password: string, ip: string) {
  const limited = await rateLimit(`login:${sha256(ip).slice(0, 12)}`, 10, 900);
  if (!limited.ok) throw new ServiceError("limited");
  const [user] = await db.select().from(users).where(eq(users.email, email.toLowerCase().trim())).limit(1);
  if (!user || !user.active || user.deletedAt) {
    await hashPassword(password);
    throw new ServiceError("invalid");
  }
  if (user.lockedUntil && user.lockedUntil > new Date()) throw new ServiceError("locked");
  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) {
    const fails = user.failedLogins + 1;
    const lock = fails >= 5 ? new Date(Date.now() + Math.min(60, fails * 5) * 60 * 1000) : null;
    await db.update(users).set({ failedLogins: fails, lockedUntil: lock, updatedAt: new Date() }).where(eq(users.id, user.id));
    throw new ServiceError("invalid");
  }
  await db.update(users).set({ failedLogins: 0, lockedUntil: null, updatedAt: new Date() }).where(eq(users.id, user.id));
  if (user.totpEnabled && user.totpSecret) return { needsTotp: true as const, userId: user.id };
  await createSession(user.id);
  await logActivity(user.id, "login", "users", user.id);
  return { needsTotp: false as const };
}

export async function completeTotp(userId: string, code: string) {
  const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  if (!user?.totpSecret || !verifyTotp(user.totpSecret, code)) {
    const codes = user?.recoveryCodes || [];
    if (!codes.includes(code.trim())) throw new ServiceError("invalid");
    await db.update(users).set({ recoveryCodes: codes.filter((item) => item !== code.trim()) }).where(eq(users.id, userId));
  }
  await createSession(userId);
  await logActivity(userId, "login.totp", "users", userId);
}

export function assertCan(user: SessionUser | null, permission: Permission) {
  if (!can(user, permission)) throw new ServiceError("forbidden");
}

export async function updateReportStatus(user: SessionUser, id: string, status: string, note?: string) {
  assertCan(user, "reports.update");
  const allowed = ["new", "under_review", "info_required", "reviewed", "closed"];
  if (!allowed.includes(status)) throw new ServiceError("invalid");
  await db.update(scamReports).set({ status, updatedAt: new Date() }).where(eq(scamReports.id, id));
  if (note) {
    assertCan(user, "reports.notes");
    await db.insert(scamReportNotes).values({ id: uid("note"), reportId: id, authorId: user.id, body: note.slice(0, 4000) });
  }
  await logActivity(user.id, "report.status", "scam_reports", id, { status });
}

export async function requestReportInfo(user: SessionUser, id: string, message: string) {
  assertCan(user, "reports.update");
  const [report] = await db.select().from(scamReports).where(eq(scamReports.id, id)).limit(1);
  if (!report) throw new ServiceError("missing");
  await db.update(scamReports).set({ status: "info_required", updatedAt: new Date() }).where(eq(scamReports.id, id));
  await db.insert(scamReportNotes).values({ id: uid("note"), reportId: id, authorId: user.id, body: `Information requested: ${message.slice(0, 1000)}` });
  await queueEmail({
    to: report.reporterEmail,
    subject: `GLOPROFAS ${report.reference}: more information`,
    text: message,
    html: emailHtml("More information requested", [message, `Reference: ${report.reference}`, "Do not send passwords, PINs or one-time codes."]),
  });
  await logActivity(user.id, "report.info_requested", "scam_reports", id);
}

export async function exportReportsCsv(user: SessionUser) {
  assertCan(user, "reports.export");
  const rows = await db.select().from(scamReports).where(isNull(scamReports.deletedAt));
  const header = ["reference", "status", "country", "money_lost", "created_at"];
  const lines = [header.join(",")];
  for (const row of rows) {
    lines.push([row.reference, row.status, row.country || "", row.moneyLost ? "yes" : "no", row.createdAt.toISOString()].map((cell) => escapeCsv(String(cell))).join(","));
  }
  await logActivity(user.id, "report.export", "scam_reports");
  return lines.join("\n");
}

export async function saveSettings(user: SessionUser, data: Record<string, unknown>) {
  assertCan(user, "settings.manage");
  const [row] = await db.select().from(websiteSettings).where(eq(websiteSettings.id, "default")).limit(1);
  if (!row) throw new ServiceError("missing");
  const next = { ...row.data, ...data, seedVersion: row.data.seedVersion };
  await db.update(websiteSettings).set({ data: next, updatedAt: new Date() }).where(eq(websiteSettings.id, "default"));
  await logActivity(user.id, "settings.update", "website_settings", "default");
}

export async function saveChatSettings(user: SessionUser, patch: Record<string, unknown>) {
  assertCan(user, "ai.manage");
  const [row] = await db.select().from(chatbotSettings).where(eq(chatbotSettings.id, "default")).limit(1);
  if (!row) throw new ServiceError("missing");
  await db.update(chatbotSettings).set({ data: { ...row.data, ...patch }, updatedAt: new Date() }).where(eq(chatbotSettings.id, "default"));
  await logActivity(user.id, "ai.settings", "chatbot_settings", "default");
}

const tables = { pages, articles, resources, services, scam_alerts: scamAlerts, scam_categories: scamCategories } as const;
type Editable = keyof typeof tables;

export async function updateContent(user: SessionUser, table: string, id: string, patch: Record<string, unknown>) {
  const permission = table === "scam_alerts" ? "alerts.manage" : "content.manage";
  assertCan(user, permission);
  if (!(table in tables)) throw new ServiceError("invalid");
  const target = tables[table as Editable];
  await db.update(target).set({ ...patch, updatedAt: new Date() }).where(eq(target.id, id));
  await logActivity(user.id, "content.update", table, id);
}

export async function softDelete(user: SessionUser, table: string, id: string) {
  assertCan(user, table === "scam_alerts" ? "alerts.manage" : "content.manage");
  if (!(table in tables)) throw new ServiceError("invalid");
  const target = tables[table as Editable];
  await db.update(target).set({ deletedAt: new Date(), status: "archived", updatedAt: new Date() }).where(eq(target.id, id));
  await logActivity(user.id, "content.delete", table, id);
}

export async function createUser(actor: SessionUser, input: { email: string; name: string; password: string; role: RoleKey }) {
  assertCan(actor, "users.manage");
  const id = uid("user");
  await db.insert(users).values({
    id,
    email: input.email.toLowerCase(),
    name: input.name,
    passwordHash: await hashPassword(input.password),
    isDemo: false,
  });
  await db.insert(userRoles).values({ userId: id, roleId: `role_${input.role}` });
  await logActivity(actor.id, "user.create", "users", id, { role: input.role });
}

export async function purgeDemo(actor: SessionUser) {
  assertCan(actor, "settings.manage");
  await db.delete(scamReports).where(eq(scamReports.isDemo, true));
  await db.delete(articles).where(eq(articles.isDemo, true));
  await db.delete(resources).where(eq(resources.isDemo, true));
  await db.delete(scamAlerts).where(eq(scamAlerts.isDemo, true));
  await db.delete(scamCategories).where(eq(scamCategories.isDemo, true));
  await db.delete(pages).where(eq(pages.isDemo, true));
  await db.delete(services).where(eq(services.isDemo, true));
  await logActivity(actor.id, "demo.purge");
}

export async function publishDue() {
  const now = new Date();
  await db.execute(sql`update articles set status = 'published', updated_at = now() where status = 'scheduled' and published_at <= ${now}`);
  await db.execute(sql`update scam_alerts set status = 'published', updated_at = now() where status = 'scheduled' and published_at <= ${now}`);
  await db.execute(sql`update resources set status = 'published', updated_at = now() where status = 'scheduled' and published_at <= ${now}`);
}

export async function purgeExpired() {
  const settings = await getSettings();
  const reportDays = settings?.retentionReportDays ?? 730;
  const chatDays = settings?.retentionChatDays ?? 30;
  const reportCutoff = new Date(Date.now() - reportDays * 86400000);
  const chatCutoff = new Date(Date.now() - chatDays * 86400000);
  await db.delete(scamReports).where(and(eq(scamReports.status, "closed"), sql`${scamReports.updatedAt} < ${reportCutoff}`));
  await db.execute(sql`delete from chatbot_messages where created_at < ${chatCutoff}`);
  await db.execute(sql`delete from chatbot_conversations where created_at < ${chatCutoff}`);
  await db.delete(reportDrafts).where(sql`${reportDrafts.expiresAt} < now()`);
}

export async function processJobs() {
  const worker = `worker-${process.pid}`;
  const claimed = await db.execute(sql`
    update jobs set status = 'running', locked_at = now(), locked_by = ${worker}, attempts = attempts + 1, updated_at = now()
    where id in (
      select id from jobs where status = 'pending' and run_at <= now()
      order by run_at asc
      for update skip locked
      limit 10
    )
    returning id, type, payload, attempts, max_attempts
  `);
  for (const row of claimed.rows as { id: string; type: string; payload: Record<string, unknown>; attempts: number; max_attempts: number }[]) {
    try {
      await db.update(jobs).set({ status: "done", updatedAt: new Date() }).where(eq(jobs.id, row.id));
    } catch (error) {
      const message = error instanceof Error ? error.message : "job failed";
      if (row.attempts >= row.max_attempts) {
        await db.insert(failedJobs).values({ id: uid("fail"), jobId: row.id, type: row.type, payload: row.payload, error: message });
        await db.update(jobs).set({ status: "failed", lastError: message, updatedAt: new Date() }).where(eq(jobs.id, row.id));
      } else {
        await db.update(jobs).set({
          status: "pending",
          lastError: message,
          runAt: new Date(Date.now() + row.attempts * 60 * 1000),
          updatedAt: new Date(),
        }).where(eq(jobs.id, row.id));
      }
    }
  }
  return claimed.rows.length;
}

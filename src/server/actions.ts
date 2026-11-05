"use server";

import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { destroySession, generateTotpSecret, getSession, totpCode, verifyTotp } from "@/lib/auth";
import { env } from "@/lib/env";
import type { ReportDraftData, RoleKey } from "@/lib/types";
import { clientIp, sha256, uid } from "@/lib/utils";
import { db } from "@/db";
import { scamReportAttachments, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import {
  ServiceError,
  completeTotp,
  createUser,
  exportReportsCsv,
  loadDraft,
  loginWithPassword,
  purgeDemo,
  requestReportInfo,
  saveChatSettings,
  saveDraft,
  saveSettings,
  softDelete,
  storeEvidence,
  submitContact,
  submitEnquiry,
  submitNewsletter,
  submitPartnership,
  submitReport,
  submitVolunteer,
  updateContent,
  updateReportStatus,
  validateDraft,
} from "@/server/services";

export type FormState = { ok: boolean; error?: string; message?: string };

function fail(error: unknown): FormState {
  if (typeof error === "object" && error && "digest" in error && String((error as { digest?: string }).digest).includes("NEXT_")) {
    throw error;
  }
  if (error instanceof ServiceError) return { ok: false, error: error.message };
  return { ok: false, error: "error" };
}

async function ip() {
  return clientIp(await headers());
}

export async function contactAction(_prev: FormState, form: FormData): Promise<FormState> {
  try {
    await submitContact(form, await ip());
    revalidatePath("/", "layout");
    return { ok: true, message: "sent" };
  } catch (error) {
    return fail(error);
  }
}

export async function enquiryAction(_prev: FormState, form: FormData): Promise<FormState> {
  try {
    await submitEnquiry(form, await ip());
    return { ok: true, message: "sent" };
  } catch (error) {
    return fail(error);
  }
}

export async function volunteerAction(_prev: FormState, form: FormData): Promise<FormState> {
  try {
    await submitVolunteer(form, await ip());
    return { ok: true, message: "sent" };
  } catch (error) {
    return fail(error);
  }
}

export async function partnershipAction(_prev: FormState, form: FormData): Promise<FormState> {
  try {
    await submitPartnership(form, await ip());
    return { ok: true, message: "sent" };
  } catch (error) {
    return fail(error);
  }
}

export async function newsletterAction(_prev: FormState, form: FormData): Promise<FormState> {
  try {
    const result = await submitNewsletter(form, await ip());
    return { ok: true, message: result === "exists" ? "exists" : "pending" };
  } catch (error) {
    return fail(error);
  }
}

const DRAFT = "glp_draft";

async function draftToken() {
  const jar = await cookies();
  let token = jar.get(DRAFT)?.value;
  if (!token) {
    token = uid("tok");
    jar.set(DRAFT, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: (await headers()).get("x-forwarded-proto") === "https",
      path: "/",
      maxAge: 60 * 60 * 12,
    });
  }
  const loaded = await loadDraft(token);
  if (!loaded) await saveDraft(token, 1, {});
  return token;
}

export async function saveReportAction(_prev: FormState, form: FormData): Promise<FormState> {
  try {
    const token = await draftToken();
    const draft = await loadDraft(token);
    const step = Number(form.get("step") || 1);
    const data: ReportDraftData = {
      ...(draft?.data || {}),
      categoryId: str(form, "category_id") || draft?.data.categoryId,
      unsure: form.get("unsure") === "yes",
      description: str(form, "description") || draft?.data.description,
      incidentDate: str(form, "incident_date") || draft?.data.incidentDate,
      channel: str(form, "channel") || draft?.data.channel,
      country: str(form, "country") || draft?.data.country,
      city: str(form, "city") || draft?.data.city,
      url: str(form, "url") || draft?.data.url,
      phone: str(form, "phone") || draft?.data.phone,
      emailInvolved: str(form, "email_involved") || draft?.data.emailInvolved,
      moneyLost: form.has("money_lost") ? form.get("money_lost") === "yes" : draft?.data.moneyLost,
      amount: str(form, "amount") || draft?.data.amount,
      currency: str(form, "currency") || draft?.data.currency,
      ongoing: form.has("ongoing") ? form.get("ongoing") === "yes" : draft?.data.ongoing,
      name: str(form, "name") || draft?.data.name,
      email: str(form, "email") || draft?.data.email,
      language: (str(form, "language") as "en" | "fr") || draft?.data.language,
      consent: form.get("consent") === "yes" || draft?.data.consent,
    };
    const checked = validateDraft(step, data);
    if (!checked.success) return { ok: false, error: "invalid" };
    await saveDraft(token, Math.min(5, step + 1), data);
    return { ok: true };
  } catch (error) {
    return fail(error);
  }
}

export async function uploadEvidenceAction(form: FormData): Promise<FormState> {
  try {
    const address = await ip();
    const { rateLimit } = await import("@/lib/rate-limit");
    const limited = await rateLimit(`upload:${sha256(address).slice(0, 12)}`, 20, 3600);
    if (!limited.ok) return { ok: false, error: "limited" };
    const token = await draftToken();
    const draft = await loadDraft(token);
    if (!draft) return { ok: false, error: "draft" };
    const file = form.get("file");
    if (!(file instanceof File)) return { ok: false, error: "file_type" };
    await storeEvidence(draft.id, file);
    return { ok: true };
  } catch (error) {
    return fail(error);
  }
}

export async function removeEvidenceAction(id: string): Promise<FormState> {
  const token = await draftToken();
  const draft = await loadDraft(token);
  if (!draft) return { ok: false, error: "draft" };
  await db.delete(scamReportAttachments).where(eq(scamReportAttachments.id, id));
  return { ok: true };
}

export async function submitReportAction(locale: string): Promise<FormState> {
  try {
    const token = await draftToken();
    const result = await submitReport(token);
    const jar = await cookies();
    jar.set("glp_confirm", result.reference, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 30 });
    jar.set("glp_money", result.moneyLost ? "1" : "0", { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 30 });
    jar.delete(DRAFT);
    redirect(`/${locale === "fr" ? "fr" : "en"}/${locale === "fr" ? "signaler" : "report"}/confirmation`);
  } catch (error) {
    return fail(error);
  }
}

export async function loginAction(_prev: FormState, form: FormData): Promise<FormState> {
  try {
    const result = await loginWithPassword(str(form, "email"), str(form, "password"), await ip());
    if (result.needsTotp) {
      const jar = await cookies();
      jar.set("glp_totp", result.userId, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 300 });
      return { ok: false, error: "totp" };
    }
    redirect("/admin");
  } catch (error) {
    return fail(error);
  }
}

export async function totpAction(_prev: FormState, form: FormData): Promise<FormState> {
  try {
    const jar = await cookies();
    const userId = jar.get("glp_totp")?.value;
    if (!userId) return { ok: false, error: "invalid" };
    await completeTotp(userId, str(form, "code"));
    jar.delete("glp_totp");
    redirect("/admin");
  } catch (error) {
    return fail(error);
  }
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}

export async function reportStatusAction(form: FormData) {
  const user = await getSession();
  await updateReportStatus(user!, str(form, "id"), str(form, "status"), str(form, "note"));
  revalidatePath("/admin");
}

export async function requestInfoAction(form: FormData) {
  const user = await getSession();
  await requestReportInfo(user!, str(form, "id"), str(form, "message"));
  revalidatePath("/admin");
}

export async function settingsAction(form: FormData) {
  const user = await getSession();
  const emails = str(form, "notification_emails").split(",").map((item) => item.trim()).filter(Boolean);
  const socials = str(form, "socials").split("\n").map((line) => {
    const [label, href] = line.split("|").map((part) => part.trim());
    return label && href ? { label, href } : null;
  }).filter((item): item is { label: string; href: string } => Boolean(item));
  await saveSettings(user!, {
    legalName: str(form, "legal_name"),
    email: str(form, "email"),
    emailPublic: form.get("email_public") === "yes",
    phone: str(form, "phone"),
    phonePublic: form.get("phone_public") === "yes",
    location: str(form, "location"),
    locationPublic: form.get("location_public") === "yes",
    donationUrl: str(form, "donation_url"),
    notificationEmails: emails,
    socials,
    retentionReportDays: Number(str(form, "retention_reports") || 730),
    retentionChatDays: Number(str(form, "retention_chat") || 30),
  });
  revalidatePath("/", "layout");
}

export async function aiSettingsAction(form: FormData) {
  const user = await getSession();
  await saveChatSettings(user!, {
    enabled: form.get("enabled") === "yes",
    storeConversations: form.get("store") === "yes",
    dailyCap: Number(str(form, "daily_cap") || 400),
    perHour: Number(str(form, "per_hour") || 20),
    welcome: { en: str(form, "welcome_en"), fr: str(form, "welcome_fr") },
    instructions: { en: str(form, "instructions_en"), fr: str(form, "instructions_fr") },
  });
  revalidatePath("/admin");
}

export async function contentAction(form: FormData) {
  const user = await getSession();
  const table = str(form, "table");
  const id = str(form, "id");
  const locale = str(form, "locale") === "fr" ? "fr" : "en";
  const [current] = table === "pages"
    ? await db.select().from((await import("@/db/schema")).pages).where(eq((await import("@/db/schema")).pages.id, id)).limit(1)
    : table === "articles"
      ? await db.select().from((await import("@/db/schema")).articles).where(eq((await import("@/db/schema")).articles.id, id)).limit(1)
      : table === "scam_alerts"
        ? await db.select().from((await import("@/db/schema")).scamAlerts).where(eq((await import("@/db/schema")).scamAlerts.id, id)).limit(1)
        : table === "resources"
          ? await db.select().from((await import("@/db/schema")).resources).where(eq((await import("@/db/schema")).resources.id, id)).limit(1)
          : table === "services"
            ? await db.select().from((await import("@/db/schema")).services).where(eq((await import("@/db/schema")).services.id, id)).limit(1)
            : await db.select().from((await import("@/db/schema")).scamCategories).where(eq((await import("@/db/schema")).scamCategories.id, id)).limit(1);
  if (!current) return;
  const translations = { ...(current.translations as Record<string, Record<string, unknown>>) };
  const block = { ...(translations[locale] || {}) };
  for (const key of ["title", "slug", "summary", "definition", "howItWorks", "example", "body", "question", "answer", "audience"]) {
    if (form.has(key)) block[key] = str(form, key);
  }
  if (form.has("paragraphs")) block.body = str(form, "paragraphs").split("\n").map((line) => line.trim()).filter(Boolean);
  if (form.has("warning_signs")) block.warningSigns = lines(form, "warning_signs");
  if (form.has("techniques")) block.techniques = lines(form, "techniques");
  if (form.has("protection")) block.protection = lines(form, "protection");
  if (form.has("if_affected")) block.ifAffected = lines(form, "if_affected");
  if (form.has("recommended")) block.recommended = lines(form, "recommended");
  translations[locale] = block;
  const patch: Record<string, unknown> = { translations };
  if (form.get("status")) patch.status = str(form, "status");
  if (form.get("risk")) patch.risk = str(form, "risk");
  if (form.get("country")) patch.country = str(form, "country");
  if (form.get("pricing_mode")) patch.pricingMode = str(form, "pricing_mode");
  await updateContent(user!, table, id, patch);
  revalidatePath("/", "layout");
}

export async function deleteContentAction(form: FormData) {
  const user = await getSession();
  await softDelete(user!, str(form, "table"), str(form, "id"));
  revalidatePath("/", "layout");
}

export async function createUserAction(form: FormData) {
  const user = await getSession();
  await createUser(user!, {
    email: str(form, "email"),
    name: str(form, "name"),
    password: str(form, "password"),
    role: str(form, "role") as RoleKey,
  });
  revalidatePath("/admin");
}

export async function purgeDemoAction() {
  const user = await getSession();
  await purgeDemo(user!);
  revalidatePath("/", "layout");
}

export async function enableTotpAction() {
  const user = await getSession();
  if (!user) return { secret: "", code: "" };
  const secret = generateTotpSecret();
  const codes = [uid("rc").slice(0, 10), uid("rc").slice(0, 10), uid("rc").slice(0, 10)];
  await db.update(users).set({ totpSecret: secret, totpEnabled: false, recoveryCodes: codes }).where(eq(users.id, user.id));
  return { secret, code: totpCode(secret), recovery: codes.join(" ") };
}

export async function confirmTotpAction(form: FormData) {
  const user = await getSession();
  if (!user) return;
  const [row] = await db.select().from(users).where(eq(users.id, user.id)).limit(1);
  if (!row?.totpSecret || !verifyTotp(row.totpSecret, str(form, "code"))) return;
  await db.update(users).set({ totpEnabled: true }).where(eq(users.id, user.id));
  revalidatePath("/admin");
}

export async function downloadReportsAction() {
  const user = await getSession();
  const csv = await exportReportsCsv(user!);
  return csv;
}

function str(form: FormData, key: string) {
  return String(form.get(key) || "");
}

function lines(form: FormData, key: string) {
  return str(form, key).split("\n").map((line) => line.trim()).filter(Boolean);
}

export async function appUrl() {
  return env().NEXT_PUBLIC_SITE_URL;
}

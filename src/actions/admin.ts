"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import {
  articles,
  scamAlerts,
  scamReportNotes,
  scamReports,
  websiteSettings,
} from "@/db/schema";
import { authenticate, createSession, destroySession, getCurrentUser, logActivity, can } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";
import { loginSchema, reportStatuses, type ReportStatus } from "@/lib/validation";
import { getSiteSettings } from "@/lib/queries";
import type { FormState } from "@/lib/form-state";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";

function slugify(value: string): string {
  return (
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 72) || `item-${Date.now()}`
  );
}

export async function adminLogin(locale: Locale, _prev: FormState, formData: FormData): Promise<FormState> {
  const dict = getDictionary(locale);
  const store = await headers();
  const ip = store.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const parsed = loginSchema.safeParse({ email, password });
  if (!parsed.success) return { status: "error", message: dict.admin.invalid };

  const limit = await rateLimit(`admin-login:${ip}:${parsed.data.email}`, 12, 900);
  if (!limit.allowed) {
    await logActivity(parsed.data.email, "auth.rate_limited", "user");
    return { status: "error", message: dict.admin.locked };
  }

  const user = await authenticate(parsed.data.email, parsed.data.password);
  if (!user) {
    await logActivity(parsed.data.email, "auth.failed", "user");
    return { status: "error", message: dict.admin.invalid };
  }

  await createSession(user.id);
  await logActivity(user.email, "auth.login", "user", String(user.id));
  redirect(`/${locale}/admin`);
}

export async function adminLogout(locale: Locale): Promise<void> {
  const user = await getCurrentUser();
  if (user) await logActivity(user.email, "auth.logout", "user", String(user.id));
  await destroySession();
  redirect(`/${locale}/admin/login`);
}

export async function updateReportStatus(
  locale: Locale,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const dict = getDictionary(locale);
  const user = await getCurrentUser();
  if (!user || !can(user, "reports:write")) {
    return { status: "error", message: dict.admin.accessDenied };
  }
  const reportId = Number(formData.get("reportId"));
  const status = String(formData.get("status")) as ReportStatus;
  if (!Number.isInteger(reportId) || !reportStatuses.includes(status)) {
    return { status: "error", message: dict.common.errorBody };
  }
  await db.update(scamReports).set({ status, updatedAt: new Date() }).where(eq(scamReports.id, reportId));
  await logActivity(user.email, "report.status_changed", "scam_report", String(reportId), { status });
  revalidatePath(`/${locale}/admin`);
  revalidatePath(`/${locale}/admin/reports`);
  return { status: "success", message: dict.admin.statusUpdated };
}

export async function addReportNote(
  locale: Locale,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const dict = getDictionary(locale);
  const user = await getCurrentUser();
  if (!user || !can(user, "reports:write")) {
    return { status: "error", message: dict.admin.accessDenied };
  }
  const reportId = Number(formData.get("reportId"));
  const note = String(formData.get("note") ?? "").trim();
  if (!Number.isInteger(reportId) || note.length < 3 || note.length > 4000) {
    return { status: "error", message: dict.common.errorBody };
  }
  await db.insert(scamReportNotes).values({ reportId, author: user.email, note });
  await logActivity(user.email, "report.note_added", "scam_report", String(reportId));
  revalidatePath(`/${locale}/admin`);
  revalidatePath(`/${locale}/admin/reports`);
  return { status: "success", message: dict.admin.logged };
}

export async function createScamAlert(
  locale: Locale,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const dict = getDictionary(locale);
  const user = await getCurrentUser();
  if (!user || !can(user, "content:write")) {
    return { status: "error", message: dict.admin.accessDenied };
  }

  const titleEn = String(formData.get("titleEn") ?? "").trim();
  const titleFr = String(formData.get("titleFr") ?? "").trim() || titleEn;
  const summaryEn = String(formData.get("summaryEn") ?? "").trim();
  const summaryFr = String(formData.get("summaryFr") ?? "").trim() || summaryEn;
  const country = String(formData.get("country") ?? "Cameroon").trim() || "Cameroon";
  const riskLevel = String(formData.get("riskLevel") ?? "high").trim();

  if (titleEn.length < 6 || summaryEn.length < 15) {
    return {
      status: "error",
      message:
        locale === "fr"
          ? "Veuillez renseigner un titre et un résumé complets."
          : "Please provide a complete alert title and summary.",
    };
  }

  const stamp = Date.now().toString(36).slice(-4);
  const slugEn = `${slugify(titleEn)}-${stamp}`;
  const slugFr = `${slugify(titleFr)}-${stamp}`;

  await db.insert(scamAlerts).values({
    slugEn,
    slugFr,
    titleEn,
    titleFr,
    summaryEn,
    summaryFr,
    bodyEn: [summaryEn],
    bodyFr: [summaryFr],
    actionsEn: [
      "Verify the request through an independent official channel before acting.",
      "Never share a one-time code, PIN or password.",
    ],
    actionsFr: [
      "Vérifiez la demande par un canal officiel indépendant avant d’agir.",
      "Ne partagez jamais un code à usage unique, un code PIN ou un mot de passe.",
    ],
    country,
    riskLevel: ["low", "medium", "high", "critical"].includes(riskLevel) ? riskLevel : "high",
    status: "published",
    isDemo: false,
  });

  await logActivity(user.email, "alert.published", "scam_alert", slugEn, { riskLevel, country });
  revalidatePath(`/${locale}`);
  revalidatePath(`/${locale}/alerts`);
  revalidatePath(`/${locale}/admin`);
  return {
    status: "success",
    message: locale === "fr" ? "Alerte publiée avec succès." : "Scam alert published.",
  };
}

export async function createArticle(
  locale: Locale,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const dict = getDictionary(locale);
  const user = await getCurrentUser();
  if (!user || !can(user, "content:write")) {
    return { status: "error", message: dict.admin.accessDenied };
  }

  const titleEn = String(formData.get("titleEn") ?? "").trim();
  const titleFr = String(formData.get("titleFr") ?? "").trim() || titleEn;
  const excerptEn = String(formData.get("excerptEn") ?? "").trim();
  const excerptFr = String(formData.get("excerptFr") ?? "").trim() || excerptEn;
  const tag = String(formData.get("tag") ?? "Campaign").trim() || "Campaign";
  const kind = String(formData.get("kind") ?? "campaign").trim() || "campaign";

  if (titleEn.length < 6 || excerptEn.length < 15) {
    return {
      status: "error",
      message:
        locale === "fr"
          ? "Veuillez renseigner un titre et un extrait complets."
          : "Please provide a complete article title and excerpt.",
    };
  }

  const stamp = Date.now().toString(36).slice(-4);
  const slugEn = `${slugify(titleEn)}-${stamp}`;
  const slugFr = `${slugify(titleFr)}-${stamp}`;

  await db.insert(articles).values({
    slugEn,
    slugFr,
    titleEn,
    titleFr,
    excerptEn,
    excerptFr,
    bodyEn: [excerptEn],
    bodyFr: [excerptFr],
    kind,
    tag,
    authorName: user.name,
    status: "published",
    isDemo: false,
  });

  await logActivity(user.email, "article.published", "article", slugEn, { kind, tag });
  revalidatePath(`/${locale}`);
  revalidatePath(`/${locale}/news`);
  revalidatePath(`/${locale}/admin`);
  return {
    status: "success",
    message: locale === "fr" ? "Publication ajoutée avec succès." : "Publication created.",
  };
}

export async function updateOrganisationSettings(
  locale: Locale,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const dict = getDictionary(locale);
  const user = await getCurrentUser();
  if (!user || !can(user, "content:write")) {
    return { status: "error", message: dict.admin.accessDenied };
  }

  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const assistantEnabled = formData.get("assistantEnabled") === "on";

  const current = await getSiteSettings();
  const updated = {
    ...current,
    organisation: {
      ...current.organisation,
      email: email || current.organisation.email,
      phone,
      location,
    },
    assistant: {
      ...current.assistant,
      enabled: assistantEnabled,
    },
  };

  await db
    .insert(websiteSettings)
    .values({ key: "site", value: updated as unknown as Record<string, unknown> })
    .onConflictDoUpdate({
      target: websiteSettings.key,
      set: { value: updated as unknown as Record<string, unknown>, updatedAt: new Date() },
    });

  await logActivity(user.email, "settings.updated", "website_settings", "site");
  revalidatePath(`/${locale}`);
  revalidatePath(`/${locale}/contact`);
  revalidatePath(`/${locale}/admin`);
  return {
    status: "success",
    message: locale === "fr" ? "Paramètres enregistrés." : "Organisation settings saved.",
  };
}

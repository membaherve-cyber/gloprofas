import "server-only";
import { and, desc, eq, isNull, sql } from "drizzle-orm";
import { db } from "@/db";
import {
  activityLogs,
  articleCategories,
  articles,
  chatbotSettings,
  contactMessages,
  faqs,
  media,
  newsletterSubscribers,
  pages,
  partnershipApplications,
  resourceCategories,
  resources,
  scamAlerts,
  scamCategories,
  scamReportAttachments,
  scamReportNotes,
  scamReports,
  serviceEnquiries,
  services,
  volunteerApplications,
  websiteSettings,
} from "@/db/schema";
import { pathFor, SECTIONS, type SectionKey } from "@/lib/paths";
import type { Locale, Localized } from "@/lib/types";
import { pickLocale } from "@/lib/utils";

export async function getSettings() {
  const [row] = await db.select().from(websiteSettings).where(eq(websiteSettings.id, "default")).limit(1);
  return row?.data ?? null;
}

export async function getChatSettings() {
  const [row] = await db.select().from(chatbotSettings).where(eq(chatbotSettings.id, "default")).limit(1);
  return row?.data ?? null;
}

export async function listCategories() {
  return db.select().from(scamCategories).where(isNull(scamCategories.deletedAt)).orderBy(scamCategories.sortOrder);
}

export async function listAlerts() {
  return db.select().from(scamAlerts).where(isNull(scamAlerts.deletedAt)).orderBy(desc(scamAlerts.publishedAt));
}

export async function listArticles() {
  return db.select().from(articles).where(isNull(articles.deletedAt)).orderBy(desc(articles.publishedAt));
}

export async function listResources() {
  return db.select().from(resources).where(isNull(resources.deletedAt)).orderBy(desc(resources.featured), desc(resources.publishedAt));
}

export async function listResourceCategories() {
  return db.select().from(resourceCategories).orderBy(resourceCategories.sortOrder);
}

export async function listArticleCategories() {
  return db.select().from(articleCategories);
}

export async function listServices() {
  return db.select().from(services).where(isNull(services.deletedAt)).orderBy(services.sortOrder);
}

export async function listPages() {
  return db.select().from(pages).where(isNull(pages.deletedAt)).orderBy(pages.sortOrder);
}

export async function listFaqs() {
  return db.select().from(faqs).where(and(eq(faqs.status, "published"), isNull(faqs.deletedAt))).orderBy(faqs.sortOrder);
}

export async function published<T extends { status: string }>(rows: T[]) {
  return rows.filter((row) => row.status === "published" || row.status === "scheduled");
}

export function visible<T extends { status: string; publishedAt?: Date | null }>(row: T, now = new Date()) {
  if (row.status === "published") return true;
  if (row.status === "scheduled" && row.publishedAt && row.publishedAt <= now) return true;
  return false;
}

export async function homepageData() {
  const [categories, alerts, articleRows, resourceRows, settings] = await Promise.all([
    listCategories(),
    listAlerts(),
    listArticles(),
    listResources(),
    getSettings(),
  ]);
  return {
    categories: categories.filter((row) => row.status === "published"),
    alerts: alerts.filter((row) => row.status === "published"),
    articles: articleRows.filter((row) => row.status === "published"),
    resources: resourceRows.filter((row) => row.status === "published"),
    settings,
  };
}

export async function findBySlug<T extends { translations: Localized<{ slug: string }> | null }>(rows: T[], locale: Locale, slug: string) {
  return rows.find((row) => {
    const picked = pickLocale(row.translations, locale);
    return picked?.value.slug === slug;
  }) ?? null;
}

export async function buildAlternateMap() {
  const [categories, alerts, articleRows, resourceRows, pageRows, serviceRows] = await Promise.all([
    listCategories(),
    listAlerts(),
    listArticles(),
    listResources(),
    listPages(),
    listServices(),
  ]);
  const map: Record<string, string> = {
    "/en": "/fr",
    "/fr": "/en",
  };
  const add = (en: string, fr: string) => {
    map[en] = fr;
    map[fr] = en;
  };
  (Object.keys(SECTIONS) as SectionKey[]).forEach((key) => add(`/${"en"}/${SECTIONS[key].en}`, `/${"fr"}/${SECTIONS[key].fr}`));
  for (const row of categories) {
    const en = pickLocale(row.translations, "en");
    const fr = pickLocale(row.translations, "fr");
    if (en && fr) add(pathFor("en", "awareness", en.value.slug), pathFor("fr", "awareness", fr.value.slug));
  }
  for (const row of alerts) {
    const en = pickLocale(row.translations, "en");
    const fr = pickLocale(row.translations, "fr");
    if (en && fr) add(pathFor("en", "alerts", en.value.slug), pathFor("fr", "alerts", fr.value.slug));
  }
  for (const row of articleRows) {
    const en = pickLocale(row.translations, "en");
    const fr = pickLocale(row.translations, "fr");
    if (en && fr) add(pathFor("en", "news", en.value.slug), pathFor("fr", "news", fr.value.slug));
  }
  for (const row of resourceRows) {
    const en = pickLocale(row.translations, "en");
    const fr = pickLocale(row.translations, "fr");
    if (en && fr) add(pathFor("en", "resources", en.value.slug), pathFor("fr", "resources", fr.value.slug));
  }
  for (const row of pageRows) {
    const en = pickLocale(row.translations, "en");
    const fr = pickLocale(row.translations, "fr");
    const section = row.section === "about" ? "about" : row.section === "legal" ? "legal" : row.section === "involved" ? "involved" : null;
    if (en && fr && section) add(pathFor("en", section, en.value.slug), pathFor("fr", section, fr.value.slug));
  }
  for (const row of serviceRows) {
    const en = pickLocale(row.translations, "en");
    const fr = pickLocale(row.translations, "fr");
    if (en && fr) add(pathFor("en", "services", row.groupKey, en.value.slug), pathFor("fr", "services", row.groupKey, fr.value.slug));
  }
  return map;
}

const STOP = new Set(["this", "that", "with", "from", "have", "what", "when", "where", "your", "about", "should", "would", "could", "please", "someone", "after", "before", "into", "they", "them", "does", "doing", "recognise", "recognize", "comment", "quoi", "faire", "avec", "pour", "dans", "etre", "suis", "vous", "nous"]);

export async function searchPublished(query: string, locale: Locale, type?: string) {
  const q = query.trim();
  if (q.length < 2) return [];
  const terms = q.toLowerCase().split(/[^a-z0-9]+/).filter((word) => word.length > 3 && !STOP.has(word)).slice(0, 8);
  const orQuery = terms.join(" | ");
  const vector = sql`to_tsvector('simple', translations::text)`;
  const tsq = orQuery ? sql`to_tsquery('simple', ${orQuery})` : sql`plainto_tsquery('simple', ${q})`;
  const rank = sql`ts_rank(${vector}, ${tsq})`;
  type Hit = { id: string; kind: string; translations: unknown; rank: number; extra?: string };
  const hits: Hit[] = [];
  const run = async (table: "articles" | "scam_alerts" | "scam_categories" | "resources" | "pages" | "faqs", kind: string) => {
    if (type && type !== kind) return;
    const result = await db.execute(sql`
      select id, translations, ${rank} as rank
      from ${sql.raw(table)}
      where deleted_at is null
        and status = 'published'
        and ${vector} @@ ${tsq}
      order by rank desc
      limit 12
    `);
    for (const row of result.rows as Record<string, unknown>[]) {
      hits.push({ id: String(row.id), kind, translations: row.translations, rank: Number(row.rank || 0) });
    }
  };
  await Promise.all([
    run("articles", "article"),
    run("scam_alerts", "alert"),
    run("scam_categories", "category"),
    run("resources", "resource"),
    run("pages", "page"),
    run("faqs", "faq"),
  ]);
  hits.sort((a, b) => b.rank - a.rank);
  return hits.slice(0, 24).map((hit) => {
    const picked = pickLocale(hit.translations as Localized<{ title?: string; question?: string; slug?: string; summary?: string; answer?: string }>, locale);
    const value = picked?.value;
    const title = value?.title || value?.question || "Untitled";
    const summary = value?.summary || value?.answer || "";
    let href = pathFor(locale, "search");
    if (hit.kind === "article" && value?.slug) href = pathFor(locale, "news", value.slug);
    if (hit.kind === "alert" && value?.slug) href = pathFor(locale, "alerts", value.slug);
    if (hit.kind === "category" && value?.slug) href = pathFor(locale, "awareness", value.slug);
    if (hit.kind === "resource" && value?.slug) href = pathFor(locale, "resources", value.slug);
    if (hit.kind === "page" && value?.slug) href = pathFor(locale, "about", value.slug);
    return { type: hit.kind, title, summary, href, rank: hit.rank };
  });
}

export async function dashboardCounts() {
  const tables = {
    reports: scamReports,
    alerts: scamAlerts,
    articles,
    resources,
    subscribers: newsletterSubscribers,
    contacts: contactMessages,
    enquiries: serviceEnquiries,
    volunteers: volunteerApplications,
    partnerships: partnershipApplications,
  };
  const [reports, newReports, reviewReports, alerts, articleCount, resourceCount, subscribers, contacts, enquiries, volunteers, partnerships, logs] = await Promise.all([
    db.select({ id: scamReports.id }).from(scamReports).where(isNull(scamReports.deletedAt)),
    db.select({ id: scamReports.id }).from(scamReports).where(and(eq(scamReports.status, "new"), isNull(scamReports.deletedAt))),
    db.select({ id: scamReports.id }).from(scamReports).where(and(eq(scamReports.status, "under_review"), isNull(scamReports.deletedAt))),
    db.select({ id: scamAlerts.id }).from(scamAlerts).where(and(eq(scamAlerts.status, "published"), isNull(scamAlerts.deletedAt))),
    db.select({ id: articles.id }).from(articles).where(and(eq(articles.status, "published"), isNull(articles.deletedAt))),
    db.select({ id: resources.id }).from(resources).where(and(eq(resources.status, "published"), isNull(resources.deletedAt))),
    db.select({ id: newsletterSubscribers.id }).from(newsletterSubscribers).where(eq(newsletterSubscribers.status, "confirmed")),
    db.select({ id: contactMessages.id }).from(contactMessages).where(isNull(contactMessages.deletedAt)),
    db.select({ id: serviceEnquiries.id }).from(serviceEnquiries).where(isNull(serviceEnquiries.deletedAt)),
    db.select({ id: volunteerApplications.id }).from(volunteerApplications).where(isNull(volunteerApplications.deletedAt)),
    db.select({ id: partnershipApplications.id }).from(partnershipApplications).where(isNull(partnershipApplications.deletedAt)),
    db.select().from(activityLogs).orderBy(desc(activityLogs.createdAt)).limit(8),
  ]);
  const chat = await getChatSettings();
  return {
    reports: reports.length,
    newReports: newReports.length,
    reviewReports: reviewReports.length,
    alerts: alerts.length,
    articles: articleCount.length,
    resources: resourceCount.length,
    subscribers: subscribers.length,
    contacts: contacts.length,
    enquiries: enquiries.length,
    volunteers: volunteers.length,
    partnerships: partnerships.length,
    aiMessages: chat?.usage.messages ?? 0,
    logs,
    unused: tables,
  };
}

export async function getReportBundle(id: string) {
  const [report] = await db.select().from(scamReports).where(eq(scamReports.id, id)).limit(1);
  if (!report) return null;
  const [notes, files] = await Promise.all([
    db.select().from(scamReportNotes).where(eq(scamReportNotes.reportId, id)).orderBy(desc(scamReportNotes.createdAt)),
    db.select().from(scamReportAttachments).where(eq(scamReportAttachments.reportId, id)),
  ]);
  return { report, notes, files };
}

export async function listMedia() {
  return db.select().from(media).orderBy(desc(media.createdAt));
}

import "server-only";
import { cache } from "react";
import { and, asc, count, desc, eq, ilike, ne, or, sql } from "drizzle-orm";
import type { AnyPgColumn } from "drizzle-orm/pg-core";
import { db } from "@/db";
import {
  activityLogs,
  articles,
  contactMessages,
  newsletterSubscribers,
  partnershipApplications,
  resources,
  scamAlerts,
  scamCategories,
  scamReports,
  serviceEnquiries,
  services,
  users,
  volunteerApplications,
  websiteSettings,
} from "@/db/schema";
import { seedDatabase, SEED_VERSION } from "@/db/seed";
import type { Locale } from "@/lib/i18n";

export type SiteSettings = {
  organisation: {
    legalName: string;
    shortName: string;
    email: string;
    phone: string;
    location: string;
    socials: { linkedin: string; facebook: string; x: string };
  };
  donation: { configured: boolean; url: string; note: string };
  assistant: { enabled: boolean; dailyCap: number; perSessionLimit: number };
  legal: Record<
    string,
    { titleEn: string; titleFr: string; updated: string; bodyEn: string[]; bodyFr: string[] }
  >;
};

const fallbackSettings: SiteSettings = {
  organisation: {
    legalName: "Global Programme for the Fight Against Scams",
    shortName: "GLOPROFAS",
    email: "contact@gloprofas.org",
    phone: "",
    location: "",
    socials: { linkedin: "", facebook: "", x: "" },
  },
  donation: { configured: false, url: "", note: "" },
  assistant: { enabled: true, dailyCap: 400, perSessionLimit: 18 },
  legal: {},
};

let seedPromise: Promise<unknown> | null = null;
async function ensureSeeded(): Promise<void> {
  if (!seedPromise) {
    seedPromise = (async () => {
      try {
        const [row] = await db.select({ value: count() }).from(scamCategories);
        const [versionRow] = await db
          .select()
          .from(websiteSettings)
          .where(eq(websiteSettings.key, "seed.version"));
        const storedVersion = (versionRow?.value as { version?: string } | undefined)?.version;
        if (Number(row.value) === 0 || storedVersion !== SEED_VERSION) {
          await seedDatabase();
        }
      } catch (error) {
        seedPromise = null;
        throw error;
      }
    })();
  }
  await seedPromise;
}

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  try {
    const rows = await db
      .select()
      .from(websiteSettings)
      .where(eq(websiteSettings.key, "site"));
    const stored = rows[0]?.value as Partial<SiteSettings> | undefined;
    if (!stored) return fallbackSettings;
    return {
      organisation: { ...fallbackSettings.organisation, ...(stored.organisation ?? {}) },
      donation: { ...fallbackSettings.donation, ...(stored.donation ?? {}) },
      assistant: { ...fallbackSettings.assistant, ...(stored.assistant ?? {}) },
      legal: stored.legal ?? {},
    };
  } catch {
    return fallbackSettings;
  }
});

export async function getHomeData(locale: Locale) {
  await ensureSeeded();
  const [categories, alerts, news, resourceRows, serviceRows, counts] = await Promise.all([
    db
      .select()
      .from(scamCategories)
      .where(eq(scamCategories.isPublished, true))
      .orderBy(asc(scamCategories.position)),
    db
      .select()
      .from(scamAlerts)
      .where(eq(scamAlerts.status, "published"))
      .orderBy(desc(scamAlerts.publishedAt))
      .limit(4),
    db
      .select()
      .from(articles)
      .where(eq(articles.status, "published"))
      .orderBy(desc(articles.publishedAt))
      .limit(3),
    db
      .select()
      .from(resources)
      .where(eq(resources.status, "published"))
      .orderBy(desc(resources.featured), desc(resources.publishedAt)),
    db
      .select()
      .from(services)
      .where(eq(services.isPublished, true))
      .orderBy(asc(services.position)),
    Promise.all([
      db.select({ value: count() }).from(scamCategories).where(eq(scamCategories.isPublished, true)),
      db.select({ value: count() }).from(resources).where(eq(resources.status, "published")),
      db.select({ value: count() }).from(scamAlerts).where(eq(scamAlerts.status, "published")),
    ]),
  ]);

  return {
    locale,
    categories,
    alerts,
    news,
    featuredResource: resourceRows.find((r) => r.featured) ?? resourceRows[0] ?? null,
    resources: resourceRows.slice(0, 5),
    services: serviceRows,
    stats: {
      categories: Number(counts[0][0]?.value ?? 0),
      resources: Number(counts[1][0]?.value ?? 0),
      alerts: Number(counts[2][0]?.value ?? 0),
      languages: 2,
    },
  };
}

export async function getCategories(locale: Locale) {
  await ensureSeeded();
  void locale;
  return db
    .select()
    .from(scamCategories)
    .where(eq(scamCategories.isPublished, true))
    .orderBy(asc(scamCategories.position));
}

export async function getCategory(locale: Locale, slug: string) {
  await ensureSeeded();
  const column = locale === "fr" ? scamCategories.slugFr : scamCategories.slugEn;
  const rows = await db.select().from(scamCategories).where(eq(column, slug)).limit(1);
  const category = rows[0];
  if (!category) return null;
  const related = await db
    .select()
    .from(scamCategories)
    .where(and(eq(scamCategories.isPublished, true), ne(scamCategories.id, category.id)))
    .orderBy(asc(scamCategories.position))
    .limit(3);
  const relatedResources = await db
    .select()
    .from(resources)
    .where(eq(resources.status, "published"))
    .limit(3);
  return { category, related, relatedResources };
}

export async function getAlerts(options: { risk?: string; categoryId?: number; limit?: number } = {}) {
  await ensureSeeded();
  const filters = [eq(scamAlerts.status, "published")];
  if (options.risk && options.risk !== "all") filters.push(eq(scamAlerts.riskLevel, options.risk));
  if (options.categoryId) filters.push(eq(scamAlerts.categoryId, options.categoryId));
  return db
    .select({
      alert: scamAlerts,
      categoryNameEn: scamCategories.nameEn,
      categoryNameFr: scamCategories.nameFr,
      categorySlugEn: scamCategories.slugEn,
      categorySlugFr: scamCategories.slugFr,
    })
    .from(scamAlerts)
    .leftJoin(scamCategories, eq(scamAlerts.categoryId, scamCategories.id))
    .where(and(...filters))
    .orderBy(desc(scamAlerts.publishedAt))
    .limit(options.limit ?? 30);
}

export async function getAlert(locale: Locale, slug: string) {
  await ensureSeeded();
  const column = locale === "fr" ? scamAlerts.slugFr : scamAlerts.slugEn;
  const rows = await db
    .select({
      alert: scamAlerts,
      categoryNameEn: scamCategories.nameEn,
      categoryNameFr: scamCategories.nameFr,
      categorySlugEn: scamCategories.slugEn,
      categorySlugFr: scamCategories.slugFr,
    })
    .from(scamAlerts)
    .leftJoin(scamCategories, eq(scamAlerts.categoryId, scamCategories.id))
    .where(eq(column, slug))
    .limit(1);
  return rows[0] ?? null;
}

export async function getArticles(limit = 20) {
  await ensureSeeded();
  return db
    .select()
    .from(articles)
    .where(eq(articles.status, "published"))
    .orderBy(desc(articles.publishedAt))
    .limit(limit);
}

export async function getArticle(locale: Locale, slug: string) {
  await ensureSeeded();
  const column = locale === "fr" ? articles.slugFr : articles.slugEn;
  const rows = await db.select().from(articles).where(eq(column, slug)).limit(1);
  const article = rows[0];
  if (!article) return null;
  const related = await db
    .select()
    .from(articles)
    .where(and(eq(articles.status, "published"), ne(articles.id, article.id)))
    .orderBy(desc(articles.publishedAt))
    .limit(2);
  return { article, related };
}

export async function getResources() {
  await ensureSeeded();
  return db
    .select()
    .from(resources)
    .where(eq(resources.status, "published"))
    .orderBy(desc(resources.featured), desc(resources.publishedAt));
}

export async function getServices() {
  await ensureSeeded();
  return db
    .select()
    .from(services)
    .where(eq(services.isPublished, true))
    .orderBy(asc(services.position));
}

export async function getService(locale: Locale, slug: string) {
  await ensureSeeded();
  const column = locale === "fr" ? services.slugFr : services.slugEn;
  const rows = await db.select().from(services).where(eq(column, slug)).limit(1);
  return rows[0] ?? null;
}

export type SearchResult = {
  type: "category" | "alert" | "resource" | "article";
  titleEn: string;
  titleFr: string;
  excerptEn: string;
  excerptFr: string;
  slugEn: string;
  slugFr: string;
  metaEn: string;
  metaFr: string;
};

const STOP_WORDS = new Set([
  "what", "when", "where", "which", "with", "this", "that", "have", "does", "from", "your",
  "about", "there", "comment", "quand", "quoi", "quel", "quelle", "dans", "pour", "avec",
  "cette", "sont", "être", "faire", "plus", "mon", "mes", "les", "des", "une", "est",
]);

/** Tokenised, accent-tolerant relevance pass over published content. */
export async function searchContent(term: string, type = "all"): Promise<SearchResult[]> {
  await ensureSeeded();
  if (!term.trim()) return [];
  const tokens = term
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length >= 4 && !STOP_WORDS.has(token))
    .slice(0, 4);
  const source = tokens.length > 0 ? tokens : [term.trim().toLowerCase()];
  const patterns = source.map((token) => `%${token}%`);
  const strip = (column: AnyPgColumn) =>
    sql`translate(lower(${column}), 'àâäéèêëîïôöùûüç', 'aaaeeeeiioouuuc')`;
  const unaccented = (english: AnyPgColumn, french: AnyPgColumn) =>
    patterns.flatMap((pattern) => [ilike(strip(english), pattern), ilike(strip(french), pattern)]);
  const results: SearchResult[] = [];

  if (type === "all" || type === "category") {
    const rows = await db
      .select()
      .from(scamCategories)
      .where(
        and(
          eq(scamCategories.isPublished, true),
          or(
            ...unaccented(scamCategories.nameEn, scamCategories.nameFr),
            ...unaccented(scamCategories.summaryEn, scamCategories.summaryFr),
            ...unaccented(scamCategories.definitionEn, scamCategories.definitionFr),
          ),
        ),
      )
      .limit(8);
    results.push(
      ...rows.map((r) => ({
        type: "category" as const,
        titleEn: r.nameEn,
        titleFr: r.nameFr,
        excerptEn: r.summaryEn,
        excerptFr: r.summaryFr,
        slugEn: r.slugEn,
        slugFr: r.slugFr,
        metaEn: "Scam guide",
        metaFr: "Fiche d’arnaque",
      })),
    );
  }

  if (type === "all" || type === "alert") {
    const rows = await db
      .select()
      .from(scamAlerts)
      .where(
        and(
          eq(scamAlerts.status, "published"),
          or(
            ...unaccented(scamAlerts.titleEn, scamAlerts.titleFr),
            ...unaccented(scamAlerts.summaryEn, scamAlerts.summaryFr),
          ),
        ),
      )
      .limit(8);
    results.push(
      ...rows.map((r) => ({
        type: "alert" as const,
        titleEn: r.titleEn,
        titleFr: r.titleFr,
        excerptEn: r.summaryEn,
        excerptFr: r.summaryFr,
        slugEn: r.slugEn,
        slugFr: r.slugFr,
        metaEn: `Alert · ${r.country}`,
        metaFr: `Alerte · ${r.country}`,
      })),
    );
  }

  if (type === "all" || type === "resource") {
    const rows = await db
      .select()
      .from(resources)
      .where(
        and(
          eq(resources.status, "published"),
          or(
            ...unaccented(resources.titleEn, resources.titleFr),
            ...unaccented(resources.descriptionEn, resources.descriptionFr),
          ),
        ),
      )
      .limit(8);
    results.push(
      ...rows.map((r) => ({
        type: "resource" as const,
        titleEn: r.titleEn,
        titleFr: r.titleFr,
        excerptEn: r.descriptionEn,
        excerptFr: r.descriptionFr,
        slugEn: r.slugEn,
        slugFr: r.slugFr,
        metaEn: `Resource · ${r.type}`,
        metaFr: `Ressource · ${r.type}`,
      })),
    );
  }

  if (type === "all" || type === "article") {
    const rows = await db
      .select()
      .from(articles)
      .where(
        and(
          eq(articles.status, "published"),
          or(
            ...unaccented(articles.titleEn, articles.titleFr),
            ...unaccented(articles.excerptEn, articles.excerptFr),
          ),
        ),
      )
      .limit(8);
    results.push(
      ...rows.map((r) => ({
        type: "article" as const,
        titleEn: r.titleEn,
        titleFr: r.titleFr,
        excerptEn: r.excerptEn,
        excerptFr: r.excerptFr,
        slugEn: r.slugEn,
        slugFr: r.slugFr,
        metaEn: `Article · ${r.tag}`,
        metaFr: `Article · ${r.tag}`,
      })),
    );
  }

  return results;
}

export async function getAdminDashboard() {
  await ensureSeeded();
  const [
    reports,
    newReports,
    underReviewReports,
    alertCount,
    articleCount,
    categoryCount,
    resourceCount,
    serviceCount,
    subscribers,
    messages,
    enquiries,
    volunteers,
    partnerships,
    recentReports,
    recentAlerts,
    recentArticles,
    recentMessages,
    recentEnquiries,
    staffUsers,
    recentLogs,
    siteSettings,
  ] = await Promise.all([
    db.select({ value: count() }).from(scamReports),
    db.select({ value: count() }).from(scamReports).where(eq(scamReports.status, "new")),
    db.select({ value: count() }).from(scamReports).where(eq(scamReports.status, "under-review")),
    db.select({ value: count() }).from(scamAlerts).where(eq(scamAlerts.status, "published")),
    db.select({ value: count() }).from(articles),
    db.select({ value: count() }).from(scamCategories),
    db.select({ value: count() }).from(resources),
    db.select({ value: count() }).from(services),
    db.select({ value: count() }).from(newsletterSubscribers),
    db.select({ value: count() }).from(contactMessages),
    db.select({ value: count() }).from(serviceEnquiries),
    db.select({ value: count() }).from(volunteerApplications),
    db.select({ value: count() }).from(partnershipApplications),
    db.select().from(scamReports).orderBy(desc(scamReports.createdAt)).limit(8),
    db.select().from(scamAlerts).orderBy(desc(scamAlerts.publishedAt)).limit(6),
    db.select().from(articles).orderBy(desc(articles.publishedAt)).limit(6),
    db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt)).limit(5),
    db.select().from(serviceEnquiries).orderBy(desc(serviceEnquiries.createdAt)).limit(5),
    db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        isActive: users.isActive,
        lastLoginAt: users.lastLoginAt,
      })
      .from(users)
      .orderBy(asc(users.id)),
    db.select().from(activityLogs).orderBy(desc(activityLogs.createdAt)).limit(10),
    getSiteSettings(),
  ]);

  return {
    stats: {
      reports: Number(reports[0]?.value ?? 0),
      newReports: Number(newReports[0]?.value ?? 0),
      underReviewReports: Number(underReviewReports[0]?.value ?? 0),
      alerts: Number(alertCount[0]?.value ?? 0),
      articles: Number(articleCount[0]?.value ?? 0),
      categories: Number(categoryCount[0]?.value ?? 0),
      resources: Number(resourceCount[0]?.value ?? 0),
      services: Number(serviceCount[0]?.value ?? 0),
      subscribers: Number(subscribers[0]?.value ?? 0),
      messages: Number(messages[0]?.value ?? 0),
      enquiries: Number(enquiries[0]?.value ?? 0),
      volunteers: Number(volunteers[0]?.value ?? 0),
      partnerships: Number(partnerships[0]?.value ?? 0),
    },
    recentReports,
    recentAlerts,
    recentArticles,
    recentMessages,
    recentEnquiries,
    staffUsers,
    recentLogs,
    siteSettings,
  };
}

export async function getCategoriesForSelect() {
  await ensureSeeded();
  return db
    .select({
      id: scamCategories.id,
      nameEn: scamCategories.nameEn,
      nameFr: scamCategories.nameFr,
      slugEn: scamCategories.slugEn,
      slugFr: scamCategories.slugFr,
      icon: scamCategories.icon,
    })
    .from(scamCategories)
    .where(eq(scamCategories.isPublished, true))
    .orderBy(asc(scamCategories.position));
}

export async function getStatsFigures() {
  await ensureSeeded();
  const [categories, alerts, resourcesCount] = await Promise.all([
    db.select({ value: sql<number>`count(*)::int` }).from(scamCategories),
    db.select({ value: sql<number>`count(*)::int` }).from(scamAlerts),
    db.select({ value: sql<number>`count(*)::int` }).from(resources),
  ]);
  return {
    categories: categories[0]?.value ?? 0,
    alerts: alerts[0]?.value ?? 0,
    resources: resourcesCount[0]?.value ?? 0,
  };
}

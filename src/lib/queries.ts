import "server-only";
import { cache } from "react";
import { and, asc, count, desc, eq, ilike, ne, or, sql } from "drizzle-orm";
import type { AnyPgColumn } from "drizzle-orm/pg-core";
import { db, hasDatabase } from "@/db";
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
  type Article,
  type Resource,
  type ScamAlert,
  type ScamCategory,
  type ScamReport,
  type Service,
} from "@/db/schema";
import { seedDatabase, SEED_VERSION } from "@/db/seed";
import { categorySeed } from "@/db/seed/categories";
import { alertSeed, articleSeed, resourceSeed, serviceSeed, siteSettingsSeed } from "@/db/seed/content";
import { STAFF_CREDENTIALS } from "@/lib/admin-credentials";
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
  organisation: siteSettingsSeed.organisation,
  donation: siteSettingsSeed.donation,
  assistant: siteSettingsSeed.assistant,
  legal: siteSettingsSeed.legal,
};

const fallbackCategories: ScamCategory[] = categorySeed.map((c, idx) => ({
  id: idx + 1,
  slugEn: c.slugEn,
  slugFr: c.slugFr,
  nameEn: c.nameEn,
  nameFr: c.nameFr,
  summaryEn: c.summaryEn,
  summaryFr: c.summaryFr,
  definitionEn: c.definitionEn,
  definitionFr: c.definitionFr,
  stepsEn: c.stepsEn,
  stepsFr: c.stepsFr,
  signsEn: c.signsEn,
  signsFr: c.signsFr,
  techniquesEn: c.techniquesEn,
  techniquesFr: c.techniquesFr,
  protectEn: c.protectEn,
  protectFr: c.protectFr,
  affectedEn: c.affectedEn,
  affectedFr: c.affectedFr,
  icon: c.icon,
  featured: Boolean(c.featured),
  tileSize: c.tileSize ?? "compact",
  position: idx,
  isPublished: true,
  isDemo: true,
  createdAt: new Date("2026-10-20T00:00:00Z"),
}));

const fallbackAlerts: ScamAlert[] = alertSeed.map((a, idx) => {
  const cat = fallbackCategories.find((c) => c.slugEn === a.categorySlugEn);
  return {
    id: idx + 1,
    slugEn: a.slugEn,
    slugFr: a.slugFr,
    titleEn: a.titleEn,
    titleFr: a.titleFr,
    summaryEn: a.summaryEn,
    summaryFr: a.summaryFr,
    bodyEn: a.bodyEn,
    bodyFr: a.bodyFr,
    actionsEn: a.actionsEn,
    actionsFr: a.actionsFr,
    categoryId: cat?.id ?? null,
    country: a.country,
    riskLevel: a.riskLevel,
    imageUrl: a.imageUrl,
    status: "published",
    publishedAt: new Date(a.date ?? "2026-10-28T00:00:00Z"),
    isDemo: true,
  };
});

const fallbackArticles: Article[] = articleSeed.map((a, idx) => ({
  id: idx + 1,
  slugEn: a.slugEn,
  slugFr: a.slugFr,
  titleEn: a.titleEn,
  titleFr: a.titleFr,
  excerptEn: a.excerptEn,
  excerptFr: a.excerptFr,
  bodyEn: a.bodyEn,
  bodyFr: a.bodyFr,
  kind: a.kind,
  tag: a.tag,
  authorName: a.authorName ?? "GLOPROFAS Editorial",
  imageUrl: a.imageUrl,
  status: "published",
  publishedAt: new Date(a.date ?? "2026-10-27T00:00:00Z"),
  isDemo: true,
}));

const fallbackResources: Resource[] = resourceSeed.map((r, idx) => ({
  id: idx + 1,
  slugEn: r.slugEn,
  slugFr: r.slugFr,
  titleEn: r.titleEn,
  titleFr: r.titleFr,
  descriptionEn: r.descriptionEn,
  descriptionFr: r.descriptionFr,
  type: r.type,
  category: r.category,
  language: r.language,
  fileSizeKb: r.fileSizeKb,
  featured: r.featured,
  status: "published",
  publishedAt: new Date("2026-10-20T00:00:00Z"),
  isDemo: true,
}));

const fallbackServices: Service[] = serviceSeed.map((s, idx) => ({
  id: idx + 1,
  slugEn: s.slugEn,
  slugFr: s.slugFr,
  nameEn: s.nameEn,
  nameFr: s.nameFr,
  descriptionEn: s.descriptionEn,
  descriptionFr: s.descriptionFr,
  groupKey: s.groupKey,
  pricingMode: s.pricingMode,
  priceLabelEn: null,
  priceLabelFr: null,
  bulletsEn: s.bullets,
  bulletsFr: s.bulletsFr,
  position: idx,
  isPublished: true,
  isDemo: true,
}));

let seedPromise: Promise<unknown> | null = null;
async function ensureSeeded(): Promise<boolean> {
  if (!hasDatabase) return false;
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
        return true;
      } catch {
        seedPromise = null;
        return false;
      }
    })();
  }
  return Boolean(await seedPromise);
}

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  if (!hasDatabase) return fallbackSettings;
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
      legal: Object.keys(stored.legal ?? {}).length ? (stored.legal ?? {}) : fallbackSettings.legal,
    };
  } catch {
    return fallbackSettings;
  }
});

export async function getHomeData(locale: Locale) {
  const ready = await ensureSeeded();
  if (!ready) {
    return {
      locale,
      categories: fallbackCategories,
      alerts: fallbackAlerts.slice(0, 4),
      news: fallbackArticles.slice(0, 3),
      featuredResource: fallbackResources.find((r) => r.featured) ?? fallbackResources[0] ?? null,
      resources: fallbackResources.slice(0, 5),
      services: fallbackServices,
      stats: {
        categories: fallbackCategories.length,
        resources: fallbackResources.length,
        alerts: fallbackAlerts.length,
        languages: 2,
      },
    };
  }

  try {
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
  } catch {
    return {
      locale,
      categories: fallbackCategories,
      alerts: fallbackAlerts.slice(0, 4),
      news: fallbackArticles.slice(0, 3),
      featuredResource: fallbackResources.find((r) => r.featured) ?? fallbackResources[0] ?? null,
      resources: fallbackResources.slice(0, 5),
      services: fallbackServices,
      stats: {
        categories: fallbackCategories.length,
        resources: fallbackResources.length,
        alerts: fallbackAlerts.length,
        languages: 2,
      },
    };
  }
}

export async function getCategories(locale: Locale) {
  void locale;
  const ready = await ensureSeeded();
  if (!ready) return fallbackCategories;
  try {
    return await db
      .select()
      .from(scamCategories)
      .where(eq(scamCategories.isPublished, true))
      .orderBy(asc(scamCategories.position));
  } catch {
    return fallbackCategories;
  }
}

export async function getCategory(locale: Locale, slug: string) {
  const ready = await ensureSeeded();
  if (!ready) {
    const category = fallbackCategories.find(
      (c) => (locale === "fr" ? c.slugFr : c.slugEn) === slug,
    );
    if (!category) return null;
    return {
      category,
      related: fallbackCategories.filter((c) => c.id !== category.id).slice(0, 3),
      relatedResources: fallbackResources.slice(0, 3),
    };
  }
  try {
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
  } catch {
    const category = fallbackCategories.find(
      (c) => (locale === "fr" ? c.slugFr : c.slugEn) === slug,
    );
    if (!category) return null;
    return {
      category,
      related: fallbackCategories.filter((c) => c.id !== category.id).slice(0, 3),
      relatedResources: fallbackResources.slice(0, 3),
    };
  }
}

export async function getAlerts(options: { risk?: string; categoryId?: number; limit?: number } = {}) {
  const ready = await ensureSeeded();
  const buildFallback = () =>
    fallbackAlerts
      .filter(
        (a) =>
          (!options.risk || options.risk === "all" || a.riskLevel === options.risk) &&
          (!options.categoryId || a.categoryId === options.categoryId),
      )
      .slice(0, options.limit ?? 30)
      .map((alert) => {
        const cat = fallbackCategories.find((c) => c.id === alert.categoryId);
        return {
          alert,
          categoryNameEn: cat?.nameEn ?? null,
          categoryNameFr: cat?.nameFr ?? null,
          categorySlugEn: cat?.slugEn ?? null,
          categorySlugFr: cat?.slugFr ?? null,
        };
      });

  if (!ready) return buildFallback();
  try {
    const filters = [eq(scamAlerts.status, "published")];
    if (options.risk && options.risk !== "all") filters.push(eq(scamAlerts.riskLevel, options.risk));
    if (options.categoryId) filters.push(eq(scamAlerts.categoryId, options.categoryId));
    return await db
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
  } catch {
    return buildFallback();
  }
}

export async function getAlert(locale: Locale, slug: string) {
  const ready = await ensureSeeded();
  if (!ready) {
    const alert = fallbackAlerts.find(
      (a) => (locale === "fr" ? a.slugFr : a.slugEn) === slug,
    );
    if (!alert) return null;
    const cat = fallbackCategories.find((c) => c.id === alert.categoryId);
    return {
      alert,
      categoryNameEn: cat?.nameEn ?? null,
      categoryNameFr: cat?.nameFr ?? null,
      categorySlugEn: cat?.slugEn ?? null,
      categorySlugFr: cat?.slugFr ?? null,
    };
  }
  try {
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
  } catch {
    return null;
  }
}

export async function getArticles(limit = 20) {
  const ready = await ensureSeeded();
  if (!ready) return fallbackArticles.slice(0, limit);
  try {
    return await db
      .select()
      .from(articles)
      .where(eq(articles.status, "published"))
      .orderBy(desc(articles.publishedAt))
      .limit(limit);
  } catch {
    return fallbackArticles.slice(0, limit);
  }
}

export async function getArticle(locale: Locale, slug: string) {
  const ready = await ensureSeeded();
  if (!ready) {
    const article = fallbackArticles.find(
      (a) => (locale === "fr" ? a.slugFr : a.slugEn) === slug,
    );
    if (!article) return null;
    return {
      article,
      related: fallbackArticles.filter((a) => a.id !== article.id).slice(0, 2),
    };
  }
  try {
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
  } catch {
    return null;
  }
}

export async function getResources() {
  const ready = await ensureSeeded();
  if (!ready) return fallbackResources;
  try {
    return await db
      .select()
      .from(resources)
      .where(eq(resources.status, "published"))
      .orderBy(desc(resources.featured), desc(resources.publishedAt));
  } catch {
    return fallbackResources;
  }
}

export async function getServices() {
  const ready = await ensureSeeded();
  if (!ready) return fallbackServices;
  try {
    return await db
      .select()
      .from(services)
      .where(eq(services.isPublished, true))
      .orderBy(asc(services.position));
  } catch {
    return fallbackServices;
  }
}

export async function getService(locale: Locale, slug: string) {
  const ready = await ensureSeeded();
  if (!ready) {
    return (
      fallbackServices.find(
        (s) => (locale === "fr" ? s.slugFr : s.slugEn) === slug,
      ) ?? null
    );
  }
  try {
    const column = locale === "fr" ? services.slugFr : services.slugEn;
    const rows = await db.select().from(services).where(eq(column, slug)).limit(1);
    return rows[0] ?? null;
  } catch {
    return (
      fallbackServices.find(
        (s) => (locale === "fr" ? s.slugFr : s.slugEn) === slug,
      ) ?? null
    );
  }
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

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function searchInMemory(tokens: string[], type = "all"): SearchResult[] {
  const results: SearchResult[] = [];
  const matches = (fields: string[]) => {
    const hay = normalizeText(fields.join(" "));
    return tokens.some((tok) => hay.includes(tok));
  };

  if (type === "all" || type === "category") {
    for (const r of fallbackCategories) {
      if (matches([r.nameEn, r.nameFr, r.summaryEn, r.summaryFr, r.definitionEn, r.definitionFr])) {
        results.push({
          type: "category",
          titleEn: r.nameEn,
          titleFr: r.nameFr,
          excerptEn: r.summaryEn,
          excerptFr: r.summaryFr,
          slugEn: r.slugEn,
          slugFr: r.slugFr,
          metaEn: "Scam guide",
          metaFr: "Fiche d’arnaque",
        });
      }
    }
  }
  if (type === "all" || type === "alert") {
    for (const r of fallbackAlerts) {
      if (matches([r.titleEn, r.titleFr, r.summaryEn, r.summaryFr])) {
        results.push({
          type: "alert",
          titleEn: r.titleEn,
          titleFr: r.titleFr,
          excerptEn: r.summaryEn,
          excerptFr: r.summaryFr,
          slugEn: r.slugEn,
          slugFr: r.slugFr,
          metaEn: `Alert · ${r.country}`,
          metaFr: `Alerte · ${r.country}`,
        });
      }
    }
  }
  if (type === "all" || type === "resource") {
    for (const r of fallbackResources) {
      if (matches([r.titleEn, r.titleFr, r.descriptionEn, r.descriptionFr])) {
        results.push({
          type: "resource",
          titleEn: r.titleEn,
          titleFr: r.titleFr,
          excerptEn: r.descriptionEn,
          excerptFr: r.descriptionFr,
          slugEn: r.slugEn,
          slugFr: r.slugFr,
          metaEn: `Resource · ${r.type}`,
          metaFr: `Ressource · ${r.type}`,
        });
      }
    }
  }
  if (type === "all" || type === "article") {
    for (const r of fallbackArticles) {
      if (matches([r.titleEn, r.titleFr, r.excerptEn, r.excerptFr])) {
        results.push({
          type: "article",
          titleEn: r.titleEn,
          titleFr: r.titleFr,
          excerptEn: r.excerptEn,
          excerptFr: r.excerptFr,
          slugEn: r.slugEn,
          slugFr: r.slugFr,
          metaEn: `Article · ${r.tag}`,
          metaFr: `Article · ${r.tag}`,
        });
      }
    }
  }
  return results;
}

/** Tokenised, accent-tolerant relevance pass over published content. */
export async function searchContent(term: string, type = "all"): Promise<SearchResult[]> {
  if (!term.trim()) return [];
  const tokens = normalizeText(term)
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length >= 4 && !STOP_WORDS.has(token))
    .slice(0, 4);
  const source = tokens.length > 0 ? tokens : [normalizeText(term.trim())];

  const ready = await ensureSeeded();
  if (!ready) return searchInMemory(source, type);

  try {
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
  } catch {
    return searchInMemory(source, type);
  }
}

export async function getAdminDashboard() {
  const fallbackDashboard = {
    stats: {
      reports: 0,
      newReports: 0,
      underReviewReports: 0,
      alerts: fallbackAlerts.length,
      articles: fallbackArticles.length,
      categories: fallbackCategories.length,
      resources: fallbackResources.length,
      services: fallbackServices.length,
      subscribers: 0,
      messages: 0,
      enquiries: 0,
      volunteers: 0,
      partnerships: 0,
    },
    recentReports: [] as ScamReport[],
    recentAlerts: fallbackAlerts,
    recentArticles: fallbackArticles,
    recentMessages: [] as (typeof contactMessages.$inferSelect)[],
    recentEnquiries: [] as (typeof serviceEnquiries.$inferSelect)[],
    staffUsers: STAFF_CREDENTIALS.map((s, idx) => ({
      id: idx + 1,
      name: s.name,
      email: s.email,
      role: s.role,
      isActive: true,
      lastLoginAt: null as Date | null,
    })),
    recentLogs: [] as (typeof activityLogs.$inferSelect)[],
    siteSettings: fallbackSettings,
  };

  const ready = await ensureSeeded();
  if (!ready) return fallbackDashboard;

  try {
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
  } catch {
    return fallbackDashboard;
  }
}

export async function getCategoriesForSelect() {
  const ready = await ensureSeeded();
  if (!ready) {
    return fallbackCategories.map((c) => ({
      id: c.id,
      nameEn: c.nameEn,
      nameFr: c.nameFr,
      slugEn: c.slugEn,
      slugFr: c.slugFr,
      icon: c.icon,
    }));
  }
  try {
    return await db
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
  } catch {
    return fallbackCategories.map((c) => ({
      id: c.id,
      nameEn: c.nameEn,
      nameFr: c.nameFr,
      slugEn: c.slugEn,
      slugFr: c.slugFr,
      icon: c.icon,
    }));
  }
}

export async function getStatsFigures() {
  const ready = await ensureSeeded();
  if (!ready) {
    return {
      categories: fallbackCategories.length,
      alerts: fallbackAlerts.length,
      resources: fallbackResources.length,
    };
  }
  try {
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
  } catch {
    return {
      categories: fallbackCategories.length,
      alerts: fallbackAlerts.length,
      resources: fallbackResources.length,
    };
  }
}

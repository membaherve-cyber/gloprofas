/**
 * Resource Centre server store — Prisma-backed content with static seeding.
 * The static TypeScript data files are the publication source of truth;
 * on first read the DB is seeded from them, after which the CMS (admin)
 * owns live edits. Reads fall back to static data if the DB is unavailable.
 */

import { db } from "@/lib/db";
import {
  ARTICLES,
  CHECKLISTS,
  VIDEOS,
  DIRECTORY,
  type Article,
  type Checklist,
  type DirectoryCountry,
  type VideoResource,
} from "@/lib/content/resource-centre";
import { CHECKER_INDICATORS } from "@/lib/content/checker-data";
import type { CheckerIndicator } from "@/lib/content/resource-centre-types";

/* ---------------- wire types ---------------- */

export type ArticleSummary = {
  slug: string;
  categorySlug: string;
  title: { en: string; fr: string };
  summary: { en: string; fr: string };
  readingMinutes: number;
  publishedAt: string;
  updatedAt: string;
  featured: boolean;
  popular: boolean;
  imageUrl: string;
  published: boolean;
};

export type ChecklistSummary = Checklist & {
  published: boolean;
  downloadCount: number;
};

export type VideoSummary = VideoResource & {
  published: boolean;
};

export type DirectoryCountryRow = DirectoryCountry & {
  status: string;
  lastVerified: string;
};

/* ---------------- cache ---------------- */

type CacheShape = {
  articles: (Article & { published: boolean })[];
  checklists: ChecklistSummary[];
  videos: VideoSummary[];
  directory: DirectoryCountryRow[];
  checker: CheckerIndicator[];
  at: number;
};

let cache: CacheShape | null = null;
let seeding: Promise<void> | null = null;

export function invalidateResourceCache() {
  cache = null;
}

/* ---------------- seeding ---------------- */

async function seedIfEmpty() {
  const articleCount = await db.article.count();
  if (articleCount === 0) {
    await db.article.createMany({
      data: ARTICLES.map((a, i) => ({
        slug: a.slug,
        categorySlug: a.categorySlug,
        content: JSON.stringify(a),
        published: true,
        featured: Boolean(a.featured),
        popular: Boolean(a.popular),
        displayOrder: i,
        publishedAt: new Date(a.publishedAt),
        updatedAt: new Date(a.updatedAt),
      })),
    });
  }

  const videoCount = await db.videoResource.count();
  if (videoCount === 0) {
    await db.videoResource.createMany({
      data: VIDEOS.map((v) => ({
        youtubeId: v.youtubeId,
        content: JSON.stringify(v),
        published: true,
        displayOrder: v.displayOrder,
        verified: v.verified,
        verifiedAt: new Date(v.verifiedAt),
      })),
    });
  }

  const checklistCount = await db.checklistItem.count();
  if (checklistCount === 0) {
    await db.checklistItem.createMany({
      data: CHECKLISTS.map((c) => ({
        slug: c.slug,
        content: JSON.stringify(c),
        published: true,
        featured: Boolean(c.featured),
        fileEn: c.pdfEn,
        fileFr: c.pdfFr,
      })),
    });
  }

  const countryCount = await db.directoryCountry.count();
  if (countryCount === 0) {
    await db.directoryCountry.createMany({
      data: DIRECTORY.map((c) => ({
        code: c.code,
        content: JSON.stringify(c),
        status: c.status,
        lastVerified: new Date(c.lastVerified),
      })),
    });
  }

  const patternCount = await db.checkerPattern.count();
  if (patternCount === 0) {
    await db.checkerPattern.createMany({
      data: CHECKER_INDICATORS.map((p) => ({
        indicatorId: p.id,
        category: p.category,
        weight: p.weight,
        content: JSON.stringify({ label: p.label, explanation: p.explanation }),
        patterns: JSON.stringify(p.patterns),
        active: true,
      })),
    });
  }
}

export async function ensureSeeded() {
  if (!seeding) {
    seeding = seedIfEmpty().catch((e) => {
      seeding = null; // allow retry on next request
      throw e;
    });
  }
  await seeding;
}

/* ---------------- reads ---------------- */

function staticFallback(): CacheShape {
  return {
    articles: ARTICLES.map((a) => ({ ...a, published: true })),
    checklists: CHECKLISTS.map((c) => ({ ...c, published: true, downloadCount: 0 })),
    videos: VIDEOS.map((v) => ({ ...v, published: true })),
    directory: DIRECTORY.map((c) => ({ ...c, status: c.status, lastVerified: c.lastVerified })),
    checker: CHECKER_INDICATORS,
    at: Date.now(),
  };
}

export async function getResourceStore(): Promise<CacheShape> {
  if (cache && Date.now() - cache.at < 30_000) return cache;
  try {
    await ensureSeeded();
    const [articles, videos, checklists, countries, patterns] = await Promise.all([
      db.article.findMany({ orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }] }),
      db.videoResource.findMany({ orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }] }),
      db.checklistItem.findMany({ orderBy: { createdAt: "asc" } }),
      db.directoryCountry.findMany({ orderBy: { code: "asc" } }),
      db.checkerPattern.findMany({ orderBy: { indicatorId: "asc" } }),
    ]);

    const parsed: CacheShape = {
      articles: articles
        .map((r) => {
          try {
            return { ...(JSON.parse(r.content) as Article), published: r.published };
          } catch {
            return null;
          }
        })
        .filter((a): a is Article & { published: boolean } => Boolean(a)),
      checklists: checklists
        .map((r) => {
          try {
            return {
              ...(JSON.parse(r.content) as Checklist),
              published: r.published,
              downloadCount: r.downloadCount,
            };
          } catch {
            return null;
          }
        })
        .filter((c): c is ChecklistSummary => Boolean(c)),
      videos: videos
        .map((r) => {
          try {
            return { ...(JSON.parse(r.content) as VideoResource), published: r.published };
          } catch {
            return null;
          }
        })
        .filter((v): v is VideoSummary => Boolean(v)),
      directory: countries
        .map((r) => {
          try {
            const c = JSON.parse(r.content) as DirectoryCountry;
            return { ...c, status: r.status, lastVerified: r.lastVerified.toISOString().slice(0, 10) };
          } catch {
            return null;
          }
        })
        .filter((c): c is DirectoryCountryRow => Boolean(c)),
      checker: patterns
        .filter((r) => r.active)
        .map((r) => {
          try {
            const meta = JSON.parse(r.content) as { label: { en: string; fr: string }; explanation: { en: string; fr: string } };
            return {
              id: r.indicatorId,
              category: r.category,
              weight: r.weight,
              label: meta.label,
              explanation: meta.explanation,
              patterns: JSON.parse(r.patterns) as string[],
            };
          } catch {
            return null;
          }
        })
        .filter((p): p is CheckerIndicator => Boolean(p)),
      at: Date.now(),
    };
    cache = parsed;
    return parsed;
  } catch (e) {
    console.error("[resource-store] DB read failed, using static fallback", e);
    cache = staticFallback();
    return cache;
  }
}

export function toArticleSummary(a: Article & { published: boolean }): ArticleSummary {
  return {
    slug: a.slug,
    categorySlug: a.categorySlug,
    title: a.title,
    summary: a.summary,
    readingMinutes: a.readingMinutes,
    publishedAt: a.publishedAt,
    updatedAt: a.updatedAt,
    featured: Boolean(a.featured),
    popular: Boolean(a.popular),
    imageUrl: a.imageUrl,
    published: a.published,
  };
}

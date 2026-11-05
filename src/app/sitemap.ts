import type { MetadataRoute } from "next";
import { hasDatabase } from "@/db";
import { ZITE_CONTENT } from "@/lib/zite-data";
import { locales } from "@/lib/i18n";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  const staticPaths = [
    "",
    "/about",
    "/campaigns",
    "/check",
    "/scams",
    "/alerts",
    "/resources",
    "/services",
    "/news",
    "/report",
    "/contact",
    "/get-involved",
    "/search",
    "/newsletter",
    "/legal/privacy",
    "/legal/terms",
    "/legal/cookies",
  ];

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${base}/${locale}${path}`,
        lastModified: new Date(),
        priority: path === "" ? 1 : 0.7,
        alternates: {
          languages: {
            en: `${base}/en${path}`,
            fr: `${base}/fr${path}`,
          },
        },
      });
    }
  }

  for (const category of ZITE_CONTENT.categories) {
    entries.push({
      url: `${base}/en/scams/${category.slug}`,
      lastModified: new Date(),
      priority: 0.8,
    });
    entries.push({
      url: `${base}/fr/scams/${category.slug}`,
      lastModified: new Date(),
      priority: 0.8,
    });
  }

  for (const article of ZITE_CONTENT.articles) {
    entries.push({
      url: `${base}/en/news/${article.id}`,
      lastModified: new Date(article.date),
      priority: 0.6,
    });
    entries.push({
      url: `${base}/fr/news/${article.id}`,
      lastModified: new Date(article.date),
      priority: 0.6,
    });
  }

  for (const alert of ZITE_CONTENT.alerts) {
    entries.push({
      url: `${base}/en/alerts/${alert.id}`,
      lastModified: new Date(alert.date),
      priority: 0.6,
    });
    entries.push({
      url: `${base}/fr/alerts/${alert.id}`,
      lastModified: new Date(alert.date),
      priority: 0.6,
    });
  }

  if (hasDatabase) {
    try {
      const { getCategories, getArticles, getAlerts } = await import("@/lib/queries");
      const [categories, articles, alerts] = await Promise.all([
        getCategories("en"),
        getArticles(50),
        getAlerts({ limit: 50 }),
      ]);
      const seen = new Set(entries.map((e) => e.url));
      for (const category of categories) {
        const uEn = `${base}/en/scams/${category.slugEn}`;
        const uFr = `${base}/fr/scams/${category.slugFr}`;
        if (!seen.has(uEn)) entries.push({ url: uEn, lastModified: category.createdAt, priority: 0.8 });
        if (!seen.has(uFr)) entries.push({ url: uFr, lastModified: category.createdAt, priority: 0.8 });
      }
      for (const article of articles) {
        const uEn = `${base}/en/news/${article.slugEn}`;
        const uFr = `${base}/fr/news/${article.slugFr}`;
        if (!seen.has(uEn)) entries.push({ url: uEn, lastModified: article.publishedAt, priority: 0.6 });
        if (!seen.has(uFr)) entries.push({ url: uFr, lastModified: article.publishedAt, priority: 0.6 });
      }
      for (const row of alerts) {
        const uEn = `${base}/en/alerts/${row.alert.slugEn}`;
        const uFr = `${base}/fr/alerts/${row.alert.slugFr}`;
        if (!seen.has(uEn)) entries.push({ url: uEn, lastModified: row.alert.publishedAt, priority: 0.6 });
        if (!seen.has(uFr)) entries.push({ url: uFr, lastModified: row.alert.publishedAt, priority: 0.6 });
      }
    } catch {
      // Database unavailable during build: static ZITE_CONTENT entries are already included.
    }
  }

  return entries;
}

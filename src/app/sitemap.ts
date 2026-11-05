import type { MetadataRoute } from "next";
import { getCategories, getArticles, getAlerts } from "@/lib/queries";
import { locales } from "@/lib/i18n";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  const staticPaths = ["", "/about", "/campaigns", "/scams", "/alerts", "/resources", "/services", "/news", "/report", "/contact", "/get-involved", "/search", "/newsletter", "/legal/privacy", "/legal/terms", "/legal/cookies", "/legal/disclaimer", "/legal/reporting", "/legal/ai"];

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

  try {
    const [categories, articles, alerts] = await Promise.all([getCategories("en"), getArticles(50), getAlerts({ limit: 50 })]);
    for (const category of categories) {
      entries.push({ url: `${base}/en/scams/${category.slugEn}`, lastModified: category.createdAt, priority: 0.8 });
      entries.push({ url: `${base}/fr/scams/${category.slugFr}`, lastModified: category.createdAt, priority: 0.8 });
    }
    for (const article of articles) {
      entries.push({ url: `${base}/en/news/${article.slugEn}`, lastModified: article.publishedAt, priority: 0.6 });
      entries.push({ url: `${base}/fr/news/${article.slugFr}`, lastModified: article.publishedAt, priority: 0.6 });
    }
    for (const row of alerts) {
      entries.push({ url: `${base}/en/alerts/${row.alert.slugEn}`, lastModified: row.alert.publishedAt, priority: 0.6 });
      entries.push({ url: `${base}/fr/alerts/${row.alert.slugFr}`, lastModified: row.alert.publishedAt, priority: 0.6 });
    }
  } catch {
    // Database unavailable during build: static entries are still emitted.
  }

  return entries;
}

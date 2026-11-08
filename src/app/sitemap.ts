import type { MetadataRoute } from "next";
import { ZITE_CONTENT } from "@/lib/zite-data";
import { localeUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

const STATIC_PATHS: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1.0, freq: "weekly" },
  { path: "/about", priority: 0.8, freq: "monthly" },
  { path: "/scams", priority: 0.9, freq: "weekly" },
  { path: "/alerts", priority: 0.9, freq: "daily" },
  { path: "/resources", priority: 0.8, freq: "weekly" },
  { path: "/news", priority: 0.8, freq: "weekly" },
  { path: "/services", priority: 0.7, freq: "monthly" },
  { path: "/campaigns", priority: 0.7, freq: "monthly" },
  { path: "/get-involved", priority: 0.6, freq: "monthly" },
  { path: "/report", priority: 0.9, freq: "monthly" },
  { path: "/check", priority: 0.8, freq: "monthly" },
  { path: "/contact", priority: 0.6, freq: "yearly" },
  { path: "/newsletter", priority: 0.5, freq: "yearly" },
  { path: "/legal/privacy", priority: 0.3, freq: "yearly" },
  { path: "/legal/terms", priority: 0.3, freq: "yearly" },
  { path: "/legal/cookies", priority: 0.3, freq: "yearly" },
];

/**
 * Bilingual sitemap. Every URL declares reciprocal en/fr alternates
 * plus x-default, per Google's localized-versions guidance.
 * Admin, API and search are intentionally excluded.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entry = (
    path: string,
    priority: number,
    freq: MetadataRoute.Sitemap[number]["changeFrequency"],
    lastModified: Date = now,
  ): MetadataRoute.Sitemap =>
    (["en", "fr"] as const).map((locale) => ({
      url: localeUrl(locale, path),
      lastModified,
      changeFrequency: freq,
      priority: locale === "en" ? priority : Math.max(0.1, priority - 0.1),
      alternates: {
        languages: {
          en: localeUrl("en", path),
          fr: localeUrl("fr", path),
          "x-default": localeUrl("en", path),
        },
      },
    }));

  const entries: MetadataRoute.Sitemap = [];

  for (const s of STATIC_PATHS) entries.push(...entry(s.path, s.priority, s.freq));
  for (const c of ZITE_CONTENT.categories) entries.push(...entry(`/scams/${c.slug}`, 0.8, "monthly"));
  for (const a of ZITE_CONTENT.articles)
    entries.push(...entry(`/news/${a.id}`, 0.7, "yearly", new Date(a.date)));
  for (const a of ZITE_CONTENT.alerts)
    entries.push(...entry(`/alerts/${a.id}`, 0.8, "monthly", new Date(a.date)));

  // De-duplicate by URL, keeping the first occurrence.
  const seen = new Set<string>();
  return entries.filter((e) => (seen.has(e.url) ? false : (seen.add(e.url), true)));
}

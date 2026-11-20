import type { MetadataRoute } from "next";

/**
 * GLOPROFAS sitemap — the application is served at the root route with
 * hash-based sections (#/about, #/scams, …); crawlers index the entry URL.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://gloprofas.org";
  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}

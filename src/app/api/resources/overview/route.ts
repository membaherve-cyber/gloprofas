import { NextResponse } from "next/server";
import { getResourceStore, toArticleSummary } from "@/lib/server/resource-store";
import { rateLimitHelper } from "@/lib/server/resource-api-helpers";

/**
 * GET /api/resources/overview — Resource Centre landing aggregates.
 */

export async function GET(req: Request) {
  if (!rateLimitHelper(req, "overview", 90)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }
  try {
    const store = await getResourceStore();
    const published = store.articles.filter((a) => a.published);

    const byCategory = new Map<string, number>();
    for (const a of published) byCategory.set(a.categorySlug, (byCategory.get(a.categorySlug) ?? 0) + 1);

    // Stable newest-first (equal dates keep store order — mirrors the PHP port).
    const latest = [...published]
      .sort(
        (a, b) =>
          a.publishedAt < b.publishedAt ? 1 : a.publishedAt > b.publishedAt ? -1 : 0
      )
      .slice(0, 6)
      .map(toArticleSummary);

    const featured = published.filter((a) => a.featured).slice(0, 4).map(toArticleSummary);
    const popular = published.filter((a) => a.popular).slice(0, 6).map(toArticleSummary);

    const featuredChecklists = store.checklists.filter((c) => c.published && c.featured).slice(0, 3);
    const latestChecklists = store.checklists.filter((c) => c.published).slice(0, 6);

    const publishedVideos = store.videos.filter((v) => v.published).slice(0, 4);

    const countries = store.directory.map((c) => ({
      code: c.code,
      name: c.name,
      nameFr: c.nameFr,
      continent: c.continent,
      priority: Boolean(c.priority),
      status: c.status,
      agencyCount: c.agencies.length,
      lastVerified: c.lastVerified,
    }));

    return NextResponse.json(
      {
        counts: {
          articles: published.length,
          checklists: store.checklists.filter((c) => c.published).length,
          videos: store.videos.filter((v) => v.published).length,
          countries: store.directory.length,
          articleCategories: Object.fromEntries(byCategory),
        },
        featuredArticles: featured,
        popularArticles: popular,
        latestArticles: latest,
        featuredChecklists,
        latestChecklists,
        videos: publishedVideos,
        countries,
      },
      { headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" } }
    );
  } catch (e) {
    console.error("[api/resources/overview]", e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

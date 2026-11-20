import { NextResponse } from "next/server";
import { getResourceStore } from "@/lib/server/resource-store";
import { getRelatedArticles } from "@/lib/content/resource-centre";
import { rateLimitHelper } from "@/lib/server/resource-api-helpers";

/**
 * GET /api/resources/articles/[slug] — full article by slug.
 */

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!rateLimitHelper(req, "article-detail", 180)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }
  try {
    const { slug } = await params;
    const store = await getResourceStore();
    const article = store.articles.find((a) => a.slug === slug && a.published);
    if (!article) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }
    const related = getRelatedArticles(article)
      .map((r) => {
        const live = store.articles.find((a) => a.slug === r.slug && a.published);
        return live ?? r;
      })
      .slice(0, 3);
    return NextResponse.json(
      { article, related },
      { headers: { "Cache-Control": "public, max-age=120, stale-while-revalidate=600" } }
    );
  } catch (e) {
    console.error("[api/resources/articles/[slug]]", e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

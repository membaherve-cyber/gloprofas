import { NextResponse } from "next/server";
import { getResourceStore, toArticleSummary } from "@/lib/server/resource-store";
import { rateLimitHelper } from "@/lib/server/resource-api-helpers";

/**
 * GET /api/resources/articles?category=&q= — searchable article library.
 * Public endpoint: returns only published articles (summaries by default,
 * full bodies with ?full=1 for the detail pages / search snippets).
 */

const CATEGORIES = new Set([
  "online-digital",
  "money-banking",
  "social-engineering",
  "business-fraud",
  "emerging-specialised",
]);

export async function GET(req: Request) {
  if (!rateLimitHelper(req, "articles", 120)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }
  try {
    const url = new URL(req.url);
    const category = url.searchParams.get("category") ?? "";
    const q = (url.searchParams.get("q") ?? "").trim().toLowerCase().slice(0, 120);
    const full = url.searchParams.get("full") === "1";

    const store = await getResourceStore();
    let list = store.articles.filter((a) => a.published);

    if (category && CATEGORIES.has(category)) {
      list = list.filter((a) => a.categorySlug === category);
    }

    if (q) {
      const terms = q.split(/\s+/).filter(Boolean);
      list = list
        .map((a) => {
          const hay = [
            a.slug,
            a.title.en, a.title.fr,
            a.summary.en, a.summary.fr,
            a.what.en, a.what.fr,
            ...(full ? [a.how.en, a.how.fr, ...a.warningSigns.map((w) => `${w.en} ${w.fr}`)] : []),
          ].join(" ").toLowerCase();
          const score = terms.reduce((s, t) => s + (hay.includes(t) ? 1 : 0), 0);
          return { a, score };
        })
        .filter((x) => x.score === terms.length)
        .sort((x, y) => y.score - x.score)
        .map((x) => x.a);
    }

    return NextResponse.json(
      {
        count: list.length,
        articles: list.map((a) => (full ? { ...a } : toArticleSummary(a))),
      },
      { headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" } }
    );
  } catch (e) {
    console.error("[api/resources/articles]", e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

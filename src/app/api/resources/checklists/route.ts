import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getResourceStore, invalidateResourceCache } from "@/lib/server/resource-store";
import { rateLimit } from "@/lib/server/api-helpers";

/**
 * GET /api/resources/checklists — printable checklist library (published).
 * POST /api/resources/checklists — download beacon { slug, lang } → increments
 * the download counter and returns the file path (no registration required).
 */

export async function GET(req: NextRequest) {
  const rl = rateLimit(req, "checklists-get", 120, 60_000);
  if (!rl.ok) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  try {
    const store = await getResourceStore();
    const list = store.checklists
      .filter((c) => c.published)
      .map((c) => ({
        slug: c.slug,
        title: c.title,
        subtitle: c.subtitle,
        category: c.category,
        intro: c.intro,
        warning: c.warning,
        sections: c.sections,
        references: c.references,
        version: c.version,
        publishedAt: c.publishedAt,
        featured: Boolean(c.featured),
        downloadCount: c.downloadCount,
        pdfEn: c.pdfEn,
        pdfFr: c.pdfFr,
      }));
    return NextResponse.json(
      { count: list.length, checklists: list },
      { headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" } }
    );
  } catch (e) {
    console.error("[api/resources/checklists GET]", e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const rl = rateLimit(req, "checklists-track", 40, 60_000);
  if (!rl.ok) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  try {
    const body = await req.json().catch(() => null);
    const slug = typeof body?.slug === "string" ? body.slug.replace(/[^a-z0-9-]/gi, "").slice(0, 80) : "";
    const lang = body?.lang === "fr" ? "fr" : "en";
    if (!slug) return NextResponse.json({ error: "validation" }, { status: 400 });

    const store = await getResourceStore();
    const item = store.checklists.find((c) => c.slug === slug);
    if (!item) return NextResponse.json({ error: "not_found" }, { status: 404 });

    try {
      await db.checklistItem.update({
        where: { slug },
        data: { downloadCount: { increment: 1 } },
      });
      invalidateResourceCache();
    } catch {
      /* counter is best-effort — the download must never fail because of it */
    }

    const file = lang === "fr" ? item.pdfFr || item.pdfEn : item.pdfEn || item.pdfFr;
    return NextResponse.json({ ok: true, file }, { headers: { "Cache-Control": "no-store" } });
  } catch (e) {
    console.error("[api/resources/checklists POST]", e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

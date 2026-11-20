import { NextRequest, NextResponse } from "next/server";
import { getResourceStore } from "@/lib/server/resource-store";
import { rateLimit } from "@/lib/server/api-helpers";

/**
 * GET /api/resources/videos — Video Learning Centre (published, ordered).
 */

export async function GET(req: NextRequest) {
  const rl = rateLimit(req, "videos-get", 120, 60_000);
  if (!rl.ok) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  try {
    const store = await getResourceStore();
    const list = store.videos
      .filter((v) => v.published)
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map((v) => ({
        youtubeId: v.youtubeId,
        title: v.title,
        description: v.description,
        publisher: v.publisher,
        publisherUrl: v.publisherUrl,
        duration: v.duration,
        topicSlug: v.topicSlug,
        verified: v.verified,
        verifiedAt: v.verifiedAt,
        displayOrder: v.displayOrder,
      }));
    return NextResponse.json(
      { count: list.length, videos: list },
      { headers: { "Cache-Control": "public, max-age=120, stale-while-revalidate=600" } }
    );
  } catch (e) {
    console.error("[api/resources/videos]", e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

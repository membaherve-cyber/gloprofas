import { NextRequest, NextResponse } from "next/server";
import { currentSession } from "@/lib/server/admin-auth";
import { rateLimit, limited } from "@/lib/server/api-helpers";

/**
 * POST /api/admin/verify-video — verify a YouTube video before adding it to
 * the Video Learning Centre. Returns title, publisher and thumbnail when the
 * video exists and is publicly accessible.
 */

export async function POST(req: NextRequest) {
  const session = await currentSession(req);
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const rl = rateLimit(req, "verify-video", 30, 60_000);
  if (!rl.ok) return limited(rl.retryAfterSec);

  try {
    const body = await req.json().catch(() => null);
    const raw = typeof body?.url === "string" ? body.url.trim().slice(0, 200) : "";
    if (!raw) return NextResponse.json({ error: "validation" }, { status: 400 });

    const idMatch = raw.match(/(?:v=|youtu\.be\/|shorts\/)([A-Za-z0-9_-]{11})/);
    const id = idMatch ? idMatch[1] : raw;
    if (!/^[A-Za-z0-9_-]{11}$/.test(id)) {
      return NextResponse.json({ ok: false, error: "invalid_id" }, { status: 422 });
    }

    const res = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${id}`, {
      signal: AbortSignal.timeout(12_000),
    });
    const data = (await res.json()) as { error?: string; title?: string; author_name?: string; thumbnail_url?: string; url?: string };
    if (data.error || !data.title) {
      return NextResponse.json({ ok: false, error: "not_found" }, { status: 422 });
    }
    return NextResponse.json({
      ok: true,
      youtubeId: id,
      title: data.title,
      publisher: data.author_name ?? "",
      thumbnail: data.thumbnail_url ?? "",
    });
  } catch (e) {
    console.error("[api/admin/verify-video]", e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

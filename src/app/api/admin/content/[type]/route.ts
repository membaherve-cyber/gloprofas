import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentSession } from "@/lib/server/admin-auth";
import { ensureSeeded, invalidateResourceCache } from "@/lib/server/resource-store";
import { rateLimit, limited } from "@/lib/server/api-helpers";

/**
 * Resource Centre CMS — /api/admin/content/[type]
 * type ∈ articles | videos | checklists | directory | checker
 * GET    — full list including unpublished (for the admin tables)
 * POST   — create an entry
 * PATCH  — update flags/metadata/content (body.id required)
 * DELETE — remove an entry (body.id)
 * Session-guarded. Written messages from the Scam Checker are NEVER exposed here.
 */

const TYPES = new Set(["articles", "videos", "checklists", "directory", "checker"]);

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function safeJsonString(v: unknown, maxLen = 60_000): string | null {
  if (!isPlainObject(v)) return null;
  const s = JSON.stringify(v);
  return s.length <= maxLen ? s : null;
}

async function verifyYouTube(id: string): Promise<{ ok: boolean; title?: string; author?: string }> {
  try {
    const res = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${id}`, {
      signal: AbortSignal.timeout(10_000),
    });
    const data = (await res.json()) as { error?: string; title?: string; author_name?: string };
    if (data.error || !data.title) return { ok: false };
    return { ok: true, title: data.title, author: data.author_name };
  } catch {
    return { ok: false };
  }
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ type: string }> }) {
  const session = await currentSession(req);
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { type } = await params;
  if (!TYPES.has(type)) return NextResponse.json({ error: "bad_type" }, { status: 404 });

  try {
    await ensureSeeded().catch(() => {});
    if (type === "articles") {
      const rows = await db.article.findMany({ orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }] });
      return NextResponse.json({
        items: rows.map((r) => ({
          id: r.id, slug: r.slug, categorySlug: r.categorySlug, published: r.published,
          featured: r.featured, popular: r.popular, displayOrder: r.displayOrder,
          publishedAt: r.publishedAt.toISOString().slice(0, 10), updatedAt: r.updatedAt.toISOString().slice(0, 10),
          content: JSON.parse(r.content),
        })),
      });
    }
    if (type === "videos") {
      const rows = await db.videoResource.findMany({ orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }] });
      return NextResponse.json({
        items: rows.map((r) => ({
          id: r.id, youtubeId: r.youtubeId, published: r.published, displayOrder: r.displayOrder,
          verified: r.verified, verifiedAt: r.verifiedAt.toISOString().slice(0, 10),
          content: JSON.parse(r.content),
        })),
      });
    }
    if (type === "checklists") {
      const rows = await db.checklistItem.findMany({ orderBy: { createdAt: "asc" } });
      return NextResponse.json({
        items: rows.map((r) => ({
          id: r.id, slug: r.slug, published: r.published, featured: r.featured,
          downloadCount: r.downloadCount, fileEn: r.fileEn, fileFr: r.fileFr,
          content: JSON.parse(r.content),
        })),
      });
    }
    if (type === "directory") {
      const rows = await db.directoryCountry.findMany({ orderBy: { code: "asc" } });
      return NextResponse.json({
        items: rows.map((r) => ({
          id: r.id, code: r.code, status: r.status,
          lastVerified: r.lastVerified.toISOString().slice(0, 10),
          nextReview: r.nextReview ? r.nextReview.toISOString().slice(0, 10) : null,
          content: JSON.parse(r.content),
        })),
      });
    }
    // checker
    const rows = await db.checkerPattern.findMany({ orderBy: { indicatorId: "asc" } });
    return NextResponse.json({
      items: rows.map((r) => ({
        id: r.id, indicatorId: r.indicatorId, category: r.category, weight: r.weight, active: r.active,
        label: JSON.parse(r.content).label, explanation: JSON.parse(r.content).explanation,
        patterns: JSON.parse(r.patterns),
      })),
    });
  } catch (e) {
    console.error("[api/admin/content GET]", e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ type: string }> }) {
  const session = await currentSession(req);
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const rl = rateLimit(req, "admin-content-write", 60, 60_000);
  if (!rl.ok) return limited(rl.retryAfterSec);
  const { type } = await params;
  if (!TYPES.has(type)) return NextResponse.json({ error: "bad_type" }, { status: 404 });

  try {
    const body = await req.json().catch(() => null);
    if (!isPlainObject(body)) return NextResponse.json({ error: "validation" }, { status: 400 });

    if (type === "articles") {
      const content = safeJsonString(body.content);
      const slug = typeof body.slug === "string" ? body.slug.replace(/[^a-z0-9-]/gi, "").toLowerCase() : "";
      const c = body.content as { title?: { en?: string; fr?: string } } | undefined;
      if (!content || !slug || !c?.title?.en || !c?.title?.fr) {
        return NextResponse.json({ error: "validation" }, { status: 400 });
      }
      const row = await db.article.create({
        data: {
          slug,
          categorySlug: ["online-digital", "money-banking", "social-engineering", "business-fraud", "emerging-specialised"].includes(String(body.categorySlug)) ? String(body.categorySlug) : "online-digital",
          content,
          published: body.published !== false,
          featured: Boolean(body.featured),
          popular: Boolean(body.popular),
          displayOrder: Number(body.displayOrder) || 999,
          publishedAt: new Date(),
        },
      });
      invalidateResourceCache();
      await db.activityLog.create({ data: { actor: session.user.email, action: "create", entity: "article", entityId: row.id } });
      return NextResponse.json({ ok: true, id: row.id });
    }

    if (type === "videos") {
      const content = safeJsonString(body.content, 20_000);
      const youtubeId = typeof body.youtubeId === "string" ? body.youtubeId.trim().slice(0, 20) : "";
      const idMatch = youtubeId.match(/(?:v=|youtu\.be\/|shorts\/)([A-Za-z0-9_-]{11})/);
      const id = idMatch ? idMatch[1] : youtubeId;
      if (!content || !/^[A-Za-z0-9_-]{11}$/.test(id)) {
        return NextResponse.json({ error: "validation" }, { status: 400 });
      }
      // Verify the video exists and is public before accepting it.
      const check = await verifyYouTube(id);
      if (!check.ok) return NextResponse.json({ error: "video_not_verified" }, { status: 422 });
      const existing = await db.videoResource.findUnique({ where: { youtubeId: id } });
      if (existing) return NextResponse.json({ error: "duplicate" }, { status: 409 });
      const vc = (body.content ?? {}) as Record<string, unknown>;
      const row = await db.videoResource.create({
        data: {
          youtubeId: id,
          content: JSON.stringify({
            ...vc,
            title: (vc.title as { en?: string } | undefined)?.en
              ? (vc.title as { en: string; fr: string })
              : { en: check.title ?? "", fr: ((vc.title as { fr?: string } | undefined)?.fr as string) ?? check.title ?? "" },
            publisher: (vc.publisher as string) ?? check.author ?? "",
            duration: (vc.duration as string) ?? "",
          }),
          published: body.published !== false,
          displayOrder: Number(body.displayOrder) || 99,
          verified: true,
          verifiedAt: new Date(),
        },
      });
      invalidateResourceCache();
      await db.activityLog.create({ data: { actor: session.user.email, action: "create", entity: "video", entityId: row.id } });
      return NextResponse.json({ ok: true, id: row.id, fetchedTitle: check.title, publisher: check.author });
    }

    if (type === "checklists") {
      const content = safeJsonString(body.content);
      const slug = typeof body.slug === "string" ? body.slug.replace(/[^a-z0-9-]/gi, "").toLowerCase() : "";
      const cc = body.content as { title?: { en?: string } } | undefined;
      if (!content || !slug || !cc?.title?.en) {
        return NextResponse.json({ error: "validation" }, { status: 400 });
      }
      const row = await db.checklistItem.create({
        data: {
          slug,
          content,
          published: body.published !== false,
          featured: Boolean(body.featured),
          fileEn: typeof body.fileEn === "string" ? body.fileEn.slice(0, 300) : "",
          fileFr: typeof body.fileFr === "string" ? body.fileFr.slice(0, 300) : "",
        },
      });
      invalidateResourceCache();
      await db.activityLog.create({ data: { actor: session.user.email, action: "create", entity: "checklist", entityId: row.id } });
      return NextResponse.json({ ok: true, id: row.id });
    }

    if (type === "directory") {
      const content = safeJsonString(body.content);
      const code = typeof body.code === "string" ? body.code.toUpperCase().slice(0, 2) : "";
      const dc = body.content as { agencies?: unknown } | undefined;
      if (!content || !/^[A-Z]{2}$/.test(code) || !Array.isArray(dc?.agencies)) {
        return NextResponse.json({ error: "validation" }, { status: 400 });
      }
      const row = await db.directoryCountry.create({
        data: {
          code,
          content,
          status: ["verified", "pending-verification", "requires-review", "outdated"].includes(String(body.status)) ? String(body.status) : "pending-verification",
          lastVerified: new Date(),
        },
      });
      invalidateResourceCache();
      await db.activityLog.create({ data: { actor: session.user.email, action: "create", entity: "directory-country", entityId: row.id } });
      return NextResponse.json({ ok: true, id: row.id });
    }

    // checker pattern
    const indicatorId = typeof body.indicatorId === "string" ? body.indicatorId.replace(/[^a-z0-9-]/gi, "").slice(0, 60) : "";
    const patterns = Array.isArray(body.patterns) ? body.patterns.filter((p: unknown) => typeof p === "string").slice(0, 40) : [];
    const label = isPlainObject(body.label) ? body.label : null;
    if (!indicatorId || !patterns.length || !label || !body.category) {
      return NextResponse.json({ error: "validation" }, { status: 400 });
    }
    for (const p of patterns) {
      try {
        new RegExp(String(p));
      } catch {
        return NextResponse.json({ error: "bad_regex", pattern: String(p) }, { status: 422 });
      }
    }
    const row = await db.checkerPattern.create({
      data: {
        indicatorId,
        category: String(body.category).slice(0, 30),
        weight: Math.min(3, Math.max(1, Number(body.weight) || 1)),
        content: JSON.stringify({ label, explanation: isPlainObject(body.explanation) ? body.explanation : { en: "", fr: "" } }),
        patterns: JSON.stringify(patterns),
        active: body.active !== false,
      },
    });
    invalidateResourceCache();
    await db.activityLog.create({ data: { actor: session.user.email, action: "create", entity: "checker-pattern", entityId: row.id } });
    return NextResponse.json({ ok: true, id: row.id });
  } catch (e) {
    console.error("[api/admin/content POST]", e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ type: string }> }) {
  const session = await currentSession(req);
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { type } = await params;
  if (!TYPES.has(type)) return NextResponse.json({ error: "bad_type" }, { status: 404 });

  try {
    const body = await req.json().catch(() => null);
    const id = typeof body?.id === "string" ? body.id : "";
    if (!isPlainObject(body) || !id) return NextResponse.json({ error: "validation" }, { status: 400 });

    if (type === "articles") {
      const data: Record<string, unknown> = {};
      if (body.content !== undefined) {
        const content = safeJsonString(body.content);
        if (!content) return NextResponse.json({ error: "validation" }, { status: 400 });
        data.content = content;
        const pc = body.content as { slug?: unknown; categorySlug?: unknown } | undefined;
        if (typeof pc?.slug === "string" && /^[a-z0-9-]+$/.test(pc.slug)) data.slug = pc.slug;
        if (typeof pc?.categorySlug === "string") data.categorySlug = pc.categorySlug;
      }
      if (body.published !== undefined) data.published = Boolean(body.published);
      if (body.featured !== undefined) data.featured = Boolean(body.featured);
      if (body.popular !== undefined) data.popular = Boolean(body.popular);
      if (body.displayOrder !== undefined) data.displayOrder = Number(body.displayOrder) || 0;
      await db.article.update({ where: { id }, data });
    } else if (type === "videos") {
      const data: Record<string, unknown> = {};
      if (body.youtubeId !== undefined) {
        const yt = String(body.youtubeId).trim().slice(0, 20);
        const idMatch = yt.match(/(?:v=|youtu\.be\/|shorts\/)([A-Za-z0-9_-]{11})/);
        const vid = idMatch ? idMatch[1] : yt;
        if (!/^[A-Za-z0-9_-]{11}$/.test(vid)) return NextResponse.json({ error: "validation" }, { status: 400 });
        const check = await verifyYouTube(vid);
        if (!check.ok) return NextResponse.json({ error: "video_not_verified" }, { status: 422 });
        data.youtubeId = vid;
        data.verified = true;
        data.verifiedAt = new Date();
      }
      if (body.content !== undefined) {
        const content = safeJsonString(body.content, 20_000);
        if (!content) return NextResponse.json({ error: "validation" }, { status: 400 });
        data.content = content;
      }
      if (body.published !== undefined) data.published = Boolean(body.published);
      if (body.displayOrder !== undefined) data.displayOrder = Number(body.displayOrder) || 0;
      await db.videoResource.update({ where: { id }, data });
    } else if (type === "checklists") {
      const data: Record<string, unknown> = {};
      if (body.content !== undefined) {
        const content = safeJsonString(body.content);
        if (!content) return NextResponse.json({ error: "validation" }, { status: 400 });
        data.content = content;
      }
      if (body.published !== undefined) data.published = Boolean(body.published);
      if (body.featured !== undefined) data.featured = Boolean(body.featured);
      if (typeof body.fileEn === "string") data.fileEn = body.fileEn.slice(0, 300);
      if (typeof body.fileFr === "string") data.fileFr = body.fileFr.slice(0, 300);
      await db.checklistItem.update({ where: { id }, data });
    } else if (type === "directory") {
      const data: Record<string, unknown> = {};
      if (body.content !== undefined) {
        const content = safeJsonString(body.content);
        if (!content) return NextResponse.json({ error: "validation" }, { status: 400 });
        data.content = content;
      }
      if (["verified", "pending-verification", "requires-review", "outdated"].includes(String(body.status))) {
        data.status = String(body.status);
        if (body.status === "verified") data.lastVerified = new Date();
      }
      if (body.markVerified === true) data.lastVerified = new Date();
      if (body.nextReview !== undefined) {
        data.nextReview = body.nextReview ? new Date(String(body.nextReview)) : null;
      }
      await db.directoryCountry.update({ where: { id }, data });
    } else {
      const data: Record<string, unknown> = {};
      if (body.patterns !== undefined && Array.isArray(body.patterns)) {
        const pats = body.patterns.filter((p: unknown) => typeof p === "string").slice(0, 40);
        for (const p of pats) {
          try {
            new RegExp(String(p));
          } catch {
            return NextResponse.json({ error: "bad_regex", pattern: String(p) }, { status: 422 });
          }
        }
        data.patterns = JSON.stringify(pats);
      }
      if (body.label !== undefined && isPlainObject(body.label)) {
        const existing = await db.checkerPattern.findUnique({ where: { id } });
        const meta = existing ? (JSON.parse(existing.content) as { label: unknown; explanation: unknown }) : { label: {}, explanation: {} };
        data.content = JSON.stringify({ label: body.label, explanation: body.explanation ?? meta.explanation });
      }
      if (body.active !== undefined) data.active = Boolean(body.active);
      if (body.weight !== undefined) data.weight = Math.min(3, Math.max(1, Number(body.weight) || 1));
      await db.checkerPattern.update({ where: { id }, data });
    }

    invalidateResourceCache();
    await db.activityLog.create({ data: { actor: session.user.email, action: "update", entity: `content:${type}`, entityId: id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[api/admin/content PATCH]", e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ type: string }> }) {
  const session = await currentSession(req);
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { type } = await params;
  if (!TYPES.has(type)) return NextResponse.json({ error: "bad_type" }, { status: 404 });

  try {
    const body = await req.json().catch(() => null);
    const id = typeof body?.id === "string" ? body.id : "";
    if (!id) return NextResponse.json({ error: "validation" }, { status: 400 });

    if (type === "articles") await db.article.delete({ where: { id } });
    else if (type === "videos") await db.videoResource.delete({ where: { id } });
    else if (type === "checklists") await db.checklistItem.delete({ where: { id } });
    else if (type === "directory") await db.directoryCountry.delete({ where: { id } });
    else await db.checkerPattern.delete({ where: { id } });

    invalidateResourceCache();
    await db.activityLog.create({ data: { actor: session.user.email, action: "delete", entity: `content:${type}`, entityId: id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[api/admin/content DELETE]", e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

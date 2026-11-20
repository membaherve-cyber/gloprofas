import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cleanText } from "@/lib/server/api-helpers";
import { ensureAdminSeed, currentSession } from "@/lib/server/admin-auth";

/**
 * GET  /api/admin/data — dashboard data (KPIs, reports, messages, …)
 * POST /api/admin/data — report status update + internal note
 * Session-guarded via gloprofas_session cookie.
 */

export async function GET(req: NextRequest) {
  const session = await currentSession(req);
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  try {
    await ensureAdminSeed();

    const [
      reports,
      reportCount,
      newReports,
      underReview,
      contactMessages,
      newMessages,
      subscribers,
      volunteers,
      partnerships,
      enquiries,
      notes,
    ] = await Promise.all([
      db.scamReport.findMany({
        orderBy: { createdAt: "desc" },
        take: 50,
        include: { notes: { orderBy: { createdAt: "desc" }, take: 5 } },
      }),
      db.scamReport.count(),
      db.scamReport.count({ where: { status: "new" } }),
      db.scamReport.count({ where: { status: "under-review" } }),
      db.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 30 }),
      db.contactMessage.count({ where: { status: "new" } }),
      db.newsletterSubscriber.count(),
      db.volunteerApplication.findMany({ orderBy: { createdAt: "desc" }, take: 20 }),
      db.partnershipApplication.findMany({ orderBy: { createdAt: "desc" }, take: 20 }),
      db.serviceEnquiry.findMany({ orderBy: { createdAt: "desc" }, take: 20 }),
      db.reportNote.count(),
    ]);

    return NextResponse.json(
      {
        user: { name: session.user.name, email: session.user.email, role: session.user.role },
        kpis: {
          reportCount,
          newReports,
          underReview,
          notes,
          newMessages,
          subscribers,
          volunteers: volunteers.length,
          partnerships: partnerships.length,
          enquiries: enquiries.length,
        },
        reports,
        contactMessages,
        volunteers,
        partnerships,
        enquiries,
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (e) {
    console.error("[api/admin/data GET]", e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await currentSession(req);
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  try {
    const body = await req.json().catch(() => null);
    const action = cleanText(body?.action, 40);

    if (action === "report-status") {
      const reference = cleanText(body?.reference, 40);
      const status = ["new", "under-review", "info-required", "reviewed", "closed"].includes(
        body?.status
      )
        ? body.status
        : null;
      if (!reference || !status) {
        return NextResponse.json({ error: "validation" }, { status: 400 });
      }
      await db.scamReport.update({ where: { reference }, data: { status } });
      await db.activityLog.create({
        data: {
          actor: session.user.email,
          action: `report.status.${status}`,
          entity: "ScamReport",
          entityId: reference,
        },
      });
      return NextResponse.json({ ok: true });
    }

    if (action === "report-note") {
      const reference = cleanText(body?.reference, 40);
      const note = cleanText(body?.note, 2000);
      if (!reference || note.length < 2) {
        return NextResponse.json({ error: "validation" }, { status: 400 });
      }
      const report = await db.scamReport.findUnique({ where: { reference } });
      if (!report) return NextResponse.json({ error: "not_found" }, { status: 404 });
      await db.reportNote.create({
        data: { reportId: report.id, author: session.user.name, note },
      });
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: "unknown_action" }, { status: 400 });
  } catch (e) {
    console.error("[api/admin/data POST]", e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

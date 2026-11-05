import { NextResponse } from "next/server";
import { processJobs } from "@/server/jobs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Job worker endpoint. In production the queue is drained by `npm run worker`
 * (scripts/worker.mjs) under systemd; this route exists for scheduled crons and
 * local verification. It requires WORKER_TOKEN when configured.
 */
export async function POST(request: Request) {
  const token = process.env.WORKER_TOKEN;
  if (token) {
    const provided = request.headers.get("authorization")?.replace("Bearer ", "");
    if (provided !== token) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
    }
  } else if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "WORKER_TOKEN is not configured" }, { status: 503 });
  }

  const result = await processJobs(20);
  return NextResponse.json(result);
}

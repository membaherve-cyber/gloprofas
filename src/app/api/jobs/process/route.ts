import { env } from "@/lib/env";
import { processJobs, publishDue, purgeExpired } from "@/server/services";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  const secret = env().CRON_SECRET;
  if (secret && request.headers.get("x-cron-secret") !== secret) {
    return Response.json({ ok: false }, { status: 401 });
  }
  if (!secret) {
    const host = request.headers.get("host") || "";
    if (!host.startsWith("127.0.0.1") && !host.startsWith("localhost")) {
      return Response.json({ ok: false }, { status: 401 });
    }
  }
  const task = new URL(request.url).searchParams.get("task");
  if (task === "publish") await publishDue();
  if (task === "purge") await purgeExpired();
  const processed = await processJobs();
  return Response.json({ ok: true, processed });
}

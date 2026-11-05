import { eq } from "drizzle-orm";
import { db } from "@/db";
import { scamReportAttachments } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { can } from "@/lib/permissions";
import { logActivity, readPrivateFile } from "@/server/services";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await getSession();
  if (!can(user, "reports.read")) return new Response("Forbidden", { status: 403 });
  const { id } = await context.params;
  const [file] = await db.select().from(scamReportAttachments).where(eq(scamReportAttachments.id, id)).limit(1);
  if (!file) return new Response("Not found", { status: 404 });
  const bytes = await readPrivateFile(file.storageKey);
  await logActivity(user?.id || null, "file.read", "attachments", id);
  return new Response(new Uint8Array(bytes), {
    headers: {
      "Content-Type": file.mime,
      "Content-Disposition": `attachment; filename="${file.originalName.replaceAll('"', "")}"`,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "private, no-store",
    },
  });
}

import { getSession } from "@/lib/auth";
import { exportReportsCsv } from "@/server/services";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getSession();
  if (!user) return new Response("Forbidden", { status: 403 });
  const csv = await exportReportsCsv(user);
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=gloprofas-reports.csv",
    },
  });
}

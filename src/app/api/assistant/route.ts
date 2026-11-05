import { answerQuestion } from "@/server/assistant";
import { assistantSchema } from "@/lib/validation";
import { clientIp } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host && !origin.includes(host)) {
    return Response.json({ answer: "Rejected.", sources: [], disclaimer: "" }, { status: 403 });
  }
  const body = await request.json().catch(() => null);
  const parsed = assistantSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ answer: "Please send a shorter question.", sources: [], disclaimer: "" }, { status: 400 });
  }
  const reply = await answerQuestion({ ...parsed.data, ip: clientIp(request.headers) });
  return Response.json(reply);
}

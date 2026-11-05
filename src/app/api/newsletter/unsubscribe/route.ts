import { unsubscribeNewsletter } from "@/server/services";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token") || "";
  const ok = await unsubscribeNewsletter(token);
  return new Response(ok ? "You are unsubscribed." : "This link is not valid.", { status: ok ? 200 : 400 });
}

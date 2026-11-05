import { confirmNewsletter } from "@/server/services";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token") || "";
  const ok = await confirmNewsletter(token);
  const html = ok
    ? "<main style='font-family:sans-serif;padding:48px'><h1>Subscription confirmed</h1><p>You will receive occasional GLOPROFAS notes. <a href='/en'>Return to the site</a></p></main>"
    : "<main style='font-family:sans-serif;padding:48px'><h1>Link expired</h1><p>Ask for a new confirmation from the newsletter form.</p></main>";
  return new Response(html, { status: ok ? 200 : 400, headers: { "content-type": "text/html; charset=utf-8" } });
}

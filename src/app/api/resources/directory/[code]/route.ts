import { NextRequest, NextResponse } from "next/server";
import { getResourceStore } from "@/lib/server/resource-store";
import { rateLimit } from "@/lib/server/api-helpers";

/**
 * GET /api/resources/directory/[code] — full reporting information for one
 * country (ISO 3166-1 alpha-2 code).
 */

export async function GET(req: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  const rl = rateLimit(req, "directory-country", 180, 60_000);
  if (!rl.ok) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  try {
    const { code } = await params;
    const wanted = code.toUpperCase();
    const store = await getResourceStore();
    const country = store.directory.find((c) => c.code === wanted);
    if (!country) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }
    const neighbours = store.directory
      .filter((c) => c.continent === country.continent && c.code !== country.code)
      .slice(0, 8)
      .map((c) => ({ code: c.code, name: c.name, nameFr: c.nameFr }));
    return NextResponse.json(
      { country, neighbours },
      { headers: { "Cache-Control": "public, max-age=300, stale-while-revalidate=600" } }
    );
  } catch (e) {
    console.error("[api/resources/directory/[code]]", e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

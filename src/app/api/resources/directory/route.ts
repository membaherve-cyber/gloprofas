import { NextRequest, NextResponse } from "next/server";
import { getResourceStore } from "@/lib/server/resource-store";
import { rateLimit } from "@/lib/server/api-helpers";

/**
 * GET /api/resources/directory — global reporting directory.
 * Query: ?continent=&handles=&q=&status= — filters by continent, fraud type,
 * country name or agency; ?summary=1 returns the light country index.
 */

const CONTINENTS = new Set(["africa", "europe", "north-america", "south-america", "asia", "middle-east", "oceania"]);
const FRAUD_TYPES = new Set([
  "online-scams", "financial-fraud", "mobile-money", "bank-transfer", "identity-theft", "phishing",
  "crypto", "investment", "romance", "shopping", "cybercrime", "bec", "impersonation", "child-exploitation",
]);

export async function GET(req: NextRequest) {
  const rl = rateLimit(req, "directory-get", 120, 60_000);
  if (!rl.ok) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  try {
    const url = new URL(req.url);
    const continent = url.searchParams.get("continent") ?? "";
    const handles = url.searchParams.get("handles") ?? "";
    const q = (url.searchParams.get("q") ?? "").trim().toLowerCase().slice(0, 80);
    const summary = url.searchParams.get("summary") === "1";

    const store = await getResourceStore();
    let list = [...store.directory];

    if (continent && CONTINENTS.has(continent)) {
      list = list.filter((c) => c.continent === continent);
    }

    if (handles && FRAUD_TYPES.has(handles)) {
      list = list.filter((c) => c.agencies.some((a) => a.handles.includes(handles)));
    }

    if (q) {
      list = list.filter((c) => {
        const hay = `${c.code} ${c.name} ${c.nameFr} ${c.agencies.map((a) => a.name).join(" ")}`.toLowerCase();
        return hay.includes(q);
      });
    }

    if (summary) {
      return NextResponse.json(
        {
          count: list.length,
          countries: list.map((c) => ({
            code: c.code,
            name: c.name,
            nameFr: c.nameFr,
            continent: c.continent,
            priority: Boolean(c.priority),
            status: c.status,
            agencyCount: c.agencies.length,
            lastVerified: c.lastVerified,
          })),
        },
        { headers: { "Cache-Control": "public, max-age=300, stale-while-revalidate=600" } }
      );
    }

    return NextResponse.json(
      { count: list.length, countries: list },
      { headers: { "Cache-Control": "public, max-age=300, stale-while-revalidate=600" } }
    );
  } catch (e) {
    console.error("[api/resources/directory]", e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

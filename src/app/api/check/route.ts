import { NextRequest, NextResponse } from "next/server";
import { rateLimit, limited, cleanText } from "@/lib/server/api-helpers";
import { runChecker, recommendedActions, suggestedArticleSlugs } from "@/lib/server/scam-checker";
import { getResourceStore, toArticleSummary } from "@/lib/server/resource-store";
import { ZITE_CONTENT } from "@/lib/content/zite-data";

/**
 * POST /api/check — GLOPROFAS Scam Checker.
 * Option A: analyse pasted message text (SMS, WhatsApp, email, offers…).
 * Option B: assess user-selected warning signs.
 * Fully in-memory; nothing is stored; indicative assessment only.
 */

const VALID_SIGN_IDS = new Set([
  "advance-payment", "unexpected-prize", "urgent-money", "password-pin-request", "otp-request",
  "unusual-payment", "guaranteed-returns", "threats", "unverified-identity", "short-links",
  "move-private", "too-good",
]);

export async function POST(req: NextRequest) {
  try {
    const rl = rateLimit(req, "check", 15, 60_000);
    if (!rl.ok) return limited(rl.retryAfterSec);

    const body = await req.json().catch(() => null);
    const locale = body?.locale === "fr" ? "fr" : "en";
    const text = cleanText(body?.text, 3000);
    const rawSigns: unknown = body?.signs;
    const signIds = Array.isArray(rawSigns)
      ? rawSigns.filter((s): s is string => typeof s === "string" && VALID_SIGN_IDS.has(s)).slice(0, 12)
      : [];

    if (text.trim().length < 3 && signIds.length === 0) {
      return NextResponse.json({ error: "validation" }, { status: 400 });
    }

    const store = await getResourceStore();
    const alertsIndex = ZITE_CONTENT.alerts.map((a) => ({
      id: a.id,
      title: a.title,
      summary: a.summary,
      risk: a.risk as string,
    }));

    const outcome = runChecker({ text, signIds, indicators: store.checker, alerts: alertsIndex });
    const actions = recommendedActions(outcome, locale);
    const suggested = suggestedArticleSlugs(outcome);
    const relatedArticles = store.articles
      .filter((a) => a.published && suggested.includes(a.slug))
      .slice(0, 3)
      .map(toArticleSummary);

    return NextResponse.json(
      {
        band: outcome.band,
        score: outcome.score,
        mode: outcome.mode,
        indicators: outcome.indicators.map((d) => ({
          id: d.id,
          category: d.category,
          label: locale === "fr" ? d.label.fr : d.label.en,
          explanation: locale === "fr" ? d.explanation.fr : d.explanation.en,
          matchedPattern: d.matchedPattern,
        })),
        signResults: outcome.signResults.map((s) => ({
          id: s.id,
          label: locale === "fr" ? s.label.fr : s.label.en,
          explanation: locale === "fr" ? s.explanation.fr : s.explanation.en,
        })),
        secretsWarning: outcome.secretsWarning,
        matchedAlerts: outcome.matchedAlerts.map((a) => ({ ...a, title: a.title })),
        relatedArticles: relatedArticles.map((a) => ({
          slug: a.slug,
          title: locale === "fr" ? a.title.fr : a.title.en,
          summary: locale === "fr" ? a.summary.fr : a.summary.en,
        })),
        actions,
        disclaimer: locale === "fr" ? outcome.disclaimer.fr : outcome.disclaimer.en,
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (e) {
    console.error("[api/check]", e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { ZITE_CONTENT } from "@/lib/zite-data";
import type { Locale } from "@/lib/i18n";

export const dynamic = "force-dynamic";

const HIGH_KEYWORDS = [
  "pin",
  "otp",
  "code",
  "password",
  "mot de passe",
  "reversal",
  "annulation",
  "registration fee",
  "frais d'inscription",
  "frais d’inscription",
  "guaranteed",
  "garanti",
  "urgent",
  "suspended",
  "suspendu",
  "crypto",
  "seed phrase",
];

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    query?: string;
    lang?: string;
  };
  const query = (body.query ?? "").trim();
  const lang: Locale = body.lang === "fr" ? "fr" : "en";

  if (query.length < 3) {
    return NextResponse.json({ error: "Query too short" }, { status: 400 });
  }

  const lower = query.toLowerCase();
  const matchedKeywords = HIGH_KEYWORDS.filter((kw) => lower.includes(kw));

  const matchedAlerts = ZITE_CONTENT.alerts
    .filter((a) => {
      const hay = `${a.title.en} ${a.title.fr} ${a.summary.en} ${a.summary.fr} ${a.category.en} ${a.category.fr}`.toLowerCase();
      return lower
        .split(/\W+/)
        .filter((w) => w.length >= 4)
        .some((w) => hay.includes(w));
    })
    .map((a) => ({
      id: a.id,
      title: a.title[lang],
    }));

  const risk: "Low" | "Medium" | "High" =
    matchedKeywords.length >= 2 || matchedAlerts.length > 0
      ? "High"
      : matchedKeywords.length === 1 || /http|www\.|\+\d{3}/.test(lower)
        ? "Medium"
        : "Low";

  const signs =
    lang === "fr"
      ? [
          "Demande inhabituelle de paiement, de frais d’avance ou de code secret",
          "Pression pour agir immédiatement ou garder l’échange secret",
          "Expéditeur ou lien qui ne correspond pas au canal officiel vérifié",
        ]
      : [
          "Unusual request for payment, advance fee or secret code",
          "Pressure to act immediately or keep the conversation secret",
          "Sender or link that does not match a verified official channel",
        ];

  const actions =
    lang === "fr"
      ? [
          "N’envoyez pas d’argent et ne partagez jamais de code PIN ou code à usage unique",
          "Vérifiez directement auprès de l’organisation par un numéro officiel que vous connaissez déjà",
          "Conservez une capture d’écran et signalez l’incident à GLOPROFAS",
        ]
      : [
          "Do not send money and never share a PIN or one-time code",
          "Verify directly with the organisation using an official number you already know",
          "Keep a screenshot and report the incident to GLOPROFAS",
        ];

  const summary =
    risk === "High"
      ? lang === "fr"
        ? "Ce message ou contact présente plusieurs signaux d’alerte fréquents dans les arnaques signalées. N’agissez pas avant d’avoir vérifié par un canal officiel indépendant."
        : "This message or contact shows several warning signs commonly seen in reported scams. Do not act until you have verified through an independent official channel."
      : risk === "Medium"
        ? lang === "fr"
          ? "Certains éléments appellent à la prudence. Vérifiez l’identité de votre interlocuteur par un canal officiel avant tout paiement ou partage d’information."
          : "Some elements call for caution. Verify who you are dealing with through an official channel before making any payment or sharing information."
        : lang === "fr"
          ? "Aucun signal d’alerte évident n’a été détecté automatiquement, mais restez vigilant : ne partagez jamais de code secret et vérifiez toujours les demandes d’argent."
          : "No obvious automated warning sign was detected, but stay cautious: never share secret codes and always verify requests for money.";

  return NextResponse.json({
    risk,
    summary,
    reportMatches: matchedAlerts.length,
    signs,
    actions,
    alerts: matchedAlerts,
  });
}

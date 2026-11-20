import { NextRequest, NextResponse } from "next/server";
import { cleanText, containsSecrets } from "@/lib/server/api-helpers";
import { ZITE_CONTENT } from "@/lib/content/zite-data";

/**
 * POST /api/check — Jarvis suspicious message / link / number checker.
 * Preserved heuristic workflow from the original implementation:
 * high-risk keyword scoring (EN/FR) + pattern detection + alert matching.
 * Indicative assessment only, never a verdict.
 */

const HIGH_RISK_KEYWORDS = [
  "pin",
  "otp",
  "one-time",
  "one time",
  "code",
  "password",
  "mot de passe",
  "reversal",
  "annulation",
  "registration fee",
  "frais d'inscription",
  "frais de dossier",
  "guaranteed",
  "garanti",
  "urgent",
  "suspended",
  "crypto",
  "seed phrase",
  "phase de récupération",
  "lottery",
  "loterie",
  "prize",
  "prix gagné",
  "you have won",
  "blocked",
  "bloqué",
  "verify your account",
  "cliquez ici",
  "click here",
];

function normalise(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const text = cleanText(body?.text, 3000);
    const locale = body?.locale === "fr" ? "fr" : "en";
    const fr = locale === "fr";

    if (text.length < 3) {
      return NextResponse.json({ error: "validation" }, { status: 400 });
    }

    const norm = normalise(text);
    const matchedKeywords = HIGH_RISK_KEYWORDS.filter((k) => norm.includes(normalise(k)));
    const hasUrl = /https?:\/\/|www\.|\.(com|net|org|info|xyz|top|online|cm|fr)\b/i.test(text);
    const hasPhone = /\+\d{3}[\s-]?\d{6,}/.test(text) || /0[1-9](?:[\s.-]?\d{2}){4}/.test(text);

    /* alert overlap matching */
    const tokens = norm.split(/[^a-z0-9à-ÿ]+/).filter((t) => t.length > 3);
    const matchedAlerts = ZITE_CONTENT.alerts.filter((a) => {
      const hay = normalise(`${a.title.en} ${a.title.fr} ${a.summary.en} ${a.summary.fr}`);
      return tokens.some((t) => hay.includes(t));
    });

    let risk: "Low" | "Medium" | "High";
    if (matchedKeywords.length >= 2 || matchedAlerts.length > 0) {
      risk = "High";
    } else if (matchedKeywords.length === 1 || hasUrl || hasPhone) {
      risk = "Medium";
    } else {
      risk = "Low";
    }

    const summary =
      risk === "High"
        ? fr
          ? "Ce contenu présente plusieurs signaux d'alerte typiques des arnaques connues. N'agissez pas avant d'avoir vérifié par un canal officiel."
          : "This content shows several warning signs typical of known scam patterns. Do not act before verifying through an official channel."
        : risk === "Medium"
          ? fr
            ? "Ce contenu présente des éléments à vérifier : un lien, un numéro ou un terme sensible. Vérifiez toujours par un canal officiel avant d'agir."
            : "This content contains elements worth checking: a link, a number or a sensitive term. Always verify through an official channel before acting."
          : fr
            ? "Aucun signal d'alerte majeur détecté. Restez toutefois prudent : aucune vérification ne peut garantir qu'un message est sûr."
            : "No major warning sign detected. Stay cautious anyway: no check can guarantee that a message is safe.";

    const signs = fr
      ? [
          "Pression à agir rapidement",
          "Demande de code, de PIN ou de paiement",
          "Canal de contact non vérifiable",
        ]
      : [
          "Pressure to act quickly",
          "Request for a code, PIN or payment",
          "Contact channel you cannot verify",
        ];

    const actions = fr
      ? [
          "Ne cliquez pas sur les liens et ne répondez pas ; ouvrez l'application officielle.",
          "Contactez l'organisation par un numéro que vous connaissez déjà.",
          "Conservez les preuves et signalez l'incident à GLOPROFAS.",
        ]
      : [
          "Do not click links or reply; open the official app instead.",
          "Contact the organisation on a number you already know.",
          "Keep evidence and report the incident to GLOPROFAS.",
        ];

    const secrets = containsSecrets(text);

    return NextResponse.json(
      {
        risk,
        summary,
        signs,
        actions,
        matchedKeywords: matchedKeywords.length,
        matchedAlerts: matchedAlerts.map((a) => ({
          id: a.id,
          title: fr ? a.title.fr : a.title.en,
          risk: a.risk,
        })),
        secretsWarning: secrets,
        disclaimer: fr
          ? "Évaluation indicative, pas un verdict. Aucun outil ne peut certifier qu'un message est sûr."
          : "Indicative assessment, not a verdict. No tool can certify that a message is safe.",
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (e) {
    console.error("[api/check]", e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

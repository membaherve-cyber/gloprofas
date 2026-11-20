/**
 * GLOPROFAS Scam Checker — server-side analysis engine.
 * Heuristic, indicative pattern analysis of user-submitted message text
 * and/or user-selected warning signs. Runs fully in memory; nothing is
 * stored. Never declares a message definitively legitimate.
 */

import type { CheckerIndicator, WarningSignOption } from "@/lib/content/resource-centre-types";
import { WARNING_SIGN_OPTIONS, CHECKER_DISCLAIMER } from "@/lib/content/checker-data";

export type DetectedIndicator = {
  id: string;
  category: string;
  weight: number;
  label: { en: string; fr: string };
  explanation: { en: string; fr: string };
  matchedPattern?: string;
};

export type CheckerOutcome = {
  band: "strong" | "several" | "insufficient" | "none";
  score: number;
  indicators: DetectedIndicator[];
  signResults: { id: string; label: { en: string; fr: string }; explanation: { en: string; fr: string } }[];
  secretsWarning: boolean;
  matchedAlerts: { id: string; title: string; risk: string }[];
  relatedCategories: string[];
  disclaimer: { en: string; fr: string };
  mode: "text" | "signs" | "combined";
};

/** Category → related GLOPROFAS article slugs (for recommendations). */
const CATEGORY_ARTICLES: Record<string, string[]> = {
  urgency: ["how-to-recognise-and-avoid-online-scams", "smishing-and-vishing-sms-telephone-scams"],
  manipulation: ["romance-scams-recognising-emotional-manipulation", "impersonation-scams-someone-you-trust"],
  financial: ["fake-mobile-money-payment-notifications", "mobile-money-scams-protect-mtn-momo-orange-money"],
  "advance-fee": ["how-to-recognise-and-avoid-online-scams", "lottery-prize-and-giveaway-scams", "fake-job-offers-and-employment-scams"],
  impersonation: ["impersonation-scams-someone-you-trust", "fake-customer-support-and-technical-support-scams"],
  credentials: ["phishing-scams-recognise-fake-emails-messages", "mobile-money-scams-protect-mtn-momo-orange-money"],
  payment: ["investment-scams-and-ponzi-schemes", "mobile-money-scams-protect-mtn-momo-orange-money"],
  promises: ["investment-scams-and-ponzi-schemes", "lottery-prize-and-giveaway-scams"],
  confidential: ["identity-theft-and-personal-data-exploitation", "phishing-scams-recognise-fake-emails-messages"],
  urls: ["how-to-identify-fake-websites-and-online-stores", "phishing-scams-recognise-fake-emails-messages"],
  attachments: ["phishing-scams-recognise-fake-emails-messages"],
  unusual: ["how-to-recognise-and-avoid-online-scams", "whatsapp-scams-common-tricks"],
};

function normalise(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/** Basic URL inspection without visiting anything. */
function inspectUrls(text: string): DetectedIndicator[] {
  const out: DetectedIndicator[] = [];
  const urls = text.match(/https?:\/\/[^\s<>"')]+|www\.[^\s<>"')]+/gi) ?? [];
  for (const raw of urls) {
    const lower = raw.toLowerCase();
    let reason = "";
    if (/^https?:\/\/\d+\.\d+\.\d+\.\d+/.test(lower)) reason = "IP";
    else if (/[a-z0-9]-?(secure|verify|login|support|promo|app)[.-]/.test(lower.replace(/^https?:\/\//, ""))) reason = "keyword";
    else if (/\.(xyz|top|click|buzz|live|shop|online|info)\b/.test(lower)) reason = "exotic TLD";
    if (!reason) continue;
    out.push({
      id: "url-inspection",
      category: "urls",
      weight: 1,
      label: { en: `Suspicious link: ${raw.slice(0, 60)}`, fr: `Lien suspect : ${raw.slice(0, 60)}` },
      explanation: {
        en: "This address shows structural warning signs (embedded keywords, unusual extension or raw IP). Compare it character by character with the organisation's real address, and never enter codes or payment details on it.",
        fr: "Cette adresse présente des signes structurels (mots-clés intégrés, extension inhabituelle ou IP nue). Comparez-la caractère par caractère avec la vraie adresse de l’organisation, et n’y saisissez ni codes ni paiements.",
      },
      matchedPattern: reason,
    });
  }
  return out.slice(0, 3);
}

/** Secrets detection (shared style with api-helpers, kept local to avoid client import). */
function containsSecrets(text: string): boolean {
  const kw = /\b(pin|otp|one[-\s]?time|cvv|cvc|password|passcode|mot\s+de\s+passe|code\s+secret|code\s+pin|secret\s+code|seed\s+phrase|recovery\s+phrase|private\s+key)\b/i;
  const digits = text.replace(/[\s-]/g, "");
  const cardLike = /\d{13,19}/.test(digits);
  return kw.test(text) && /\d{3,}/.test(text) && (cardLike || /code|pin|otp/i.test(text));
}

export type AlertsIndex = { id: string; title: { en: string; fr: string }; summary: { en: string; fr: string }; risk: string }[];

export function runChecker(input: {
  text?: string;
  signIds?: string[];
  indicators: CheckerIndicator[];
  alerts: AlertsIndex;
}): CheckerOutcome {
  const { indicators, alerts } = input;
  const text = (input.text ?? "").slice(0, 3000);
  const signIds = input.signIds ?? [];
  const hasText = text.trim().length >= 3;
  const hasSigns = signIds.length > 0;
  const mode: CheckerOutcome["mode"] = hasText && hasSigns ? "combined" : hasText ? "text" : "signs";

  const detected: DetectedIndicator[] = [];

  if (hasText) {
    const norm = normalise(text);
    for (const ind of indicators) {
      for (const p of ind.patterns) {
        let re: RegExp;
        try {
          re = new RegExp(p, "i");
        } catch {
          continue;
        }
        const m = norm.match(re);
        if (m) {
          detected.push({
            id: ind.id,
            category: ind.category,
            weight: ind.weight,
            label: ind.label,
            explanation: ind.explanation,
            matchedPattern: m[0].slice(0, 40),
          });
          break;
        }
      }
    }
    detected.push(...inspectUrls(text));
  }

  const signResults = WARNING_SIGN_OPTIONS.filter((o: WarningSignOption) => signIds.includes(o.id)).map((o) => ({
    id: o.id,
    label: o.label,
    explanation: o.explanation,
  }));
  const signWeight = WARNING_SIGN_OPTIONS.filter((o) => signIds.includes(o.id)).reduce((s, o) => s + o.weight, 0);

  // Aggregate: unique categories with max weight per category.
  const byCategory = new Map<string, number>();
  for (const d of detected) byCategory.set(d.category, Math.max(byCategory.get(d.category) ?? 0, d.weight));
  const textScore = [...byCategory.values()].reduce((s, w) => s + w, 0);
  const score = textScore + signWeight;
  const strongHits = [...byCategory.values()].filter((w) => w >= 3).length + signIds.filter((id) => WARNING_SIGN_OPTIONS.find((o) => o.id === id)?.weight === 3).length;

  let band: CheckerOutcome["band"];
  if (!hasText && !hasSigns) band = "insufficient";
  else if (strongHits >= 1 || score >= 7) band = "strong";
  else if (score >= 3) band = "several";
  else if (score > 0) band = "several";
  else band = hasText || hasSigns ? "none" : "insufficient";

  // Alert overlap matching (existing behaviour preserved).
  const matchedAlerts: { id: string; title: string; risk: string }[] = [];
  if (hasText) {
    const norm = normalise(text);
    const tokens = norm.split(/[^a-z0-9]+/).filter((t) => t.length > 3);
    for (const a of alerts) {
      const hay = normalise(`${a.title.en} ${a.title.fr} ${a.summary.en} ${a.summary.fr}`);
      if (tokens.some((t) => hay.includes(t))) {
        matchedAlerts.push({ id: a.id, title: a.title.en, risk: a.risk });
      }
    }
  }

  const relatedCategories = [...new Set(detected.map((d) => d.category))];

  return {
    band,
    score,
    indicators: detected,
    signResults,
    secretsWarning: hasText ? containsSecrets(text) : false,
    matchedAlerts: matchedAlerts.slice(0, 3),
    relatedCategories,
    disclaimer: CHECKER_DISCLAIMER,
    mode,
  };
}

/** Recommended actions derived from detected categories (bilingual). */
export function recommendedActions(outcome: CheckerOutcome, locale: "en" | "fr"): string[] {
  const cats = new Set(outcome.indicators.map((d) => d.category));
  const actions: { en: string; fr: string }[] = [];

  actions.push(
    locale === "fr"
      ? { en: "", fr: "Ne cliquez pas sur les liens et ne répondez pas ; ouvrez plutôt l’application ou le site officiel en le saisissant vous-même." }
      : { en: "Do not click links or reply; open the official app or type the official address yourself.", fr: "" }
  );
  if (cats.has("credentials") || cats.has("confidential"))
    actions.push(
      locale === "fr"
        ? { en: "", fr: "Ne partagez jamais votre code PIN, mot de passe ou code à usage unique — mettez immédiatement vos comptes en sécurité et changez les mots de passe exposés." }
        : { en: "Never share your PIN, password or one-time code — secure your accounts immediately and change any exposed passwords.", fr: "" }
    );
  if (cats.has("payment") || cats.has("advance-fee") || cats.has("promises"))
    actions.push(
      locale === "fr"
        ? { en: "", fr: "N’envoyez aucun paiement, aucune « fee » et aucun dépôt avant une vérification indépendante par un canal officiel." }
        : { en: "Do not send any payment, “fee” or deposit before independent verification through an official channel.", fr: "" }
    );
  if (cats.has("impersonation"))
    actions.push(
      locale === "fr"
        ? { en: "", fr: "Rappelez la personne ou l’organisation concernée via un numéro que vous connaissez déjà — jamais celui du message." }
        : { en: "Call the person or organisation back on a number you already know — never the one in the message.", fr: "" }
    );
  if (cats.has("urls"))
    actions.push(
      locale === "fr"
        ? { en: "", fr: "Comparez l’adresse caractère par caractère avec le site officiel, et vérifiez le cadenas et l’orthographe exacte du domaine." }
        : { en: "Compare the address character by character with the official site, and check the padlock and exact domain spelling.", fr: "" }
    );
  if (outcome.signResults.some((s) => ["otp-request", "password-pin-request"].includes(s.id)))
    actions.push(
      locale === "fr"
        ? { en: "", fr: "Si vous avez déjà partagé un code, contactez immédiatement votre banque ou opérateur via son numéro officiel pour verrouiller le compte." }
        : { en: "If you already shared a code, contact your bank or operator immediately on its official number to lock the account.", fr: "" }
    );
  actions.push(
    locale === "fr"
      ? { en: "", fr: "Conservez les captures d’écran et signalez l’incident via le formulaire GLOPROFAS et auprès des autorités compétentes." }
      : { en: "Keep screenshots and report the incident through the GLOPROFAS form and to the competent authorities.", fr: "" }
  );
  return actions.map((a) => (locale === "fr" ? a.fr : a.en)).filter(Boolean).slice(0, 6);
}

/** Suggested reading derived from detected categories. */
export function suggestedArticleSlugs(outcome: CheckerOutcome, limit = 3): string[] {
  const slugs = new Set<string>();
  for (const cat of outcome.relatedCategories) {
    for (const s of CATEGORY_ARTICLES[cat] ?? []) slugs.add(s);
  }
  if (slugs.size === 0) {
    for (const s of CATEGORY_ARTICLES.urgency ?? []) slugs.add(s);
  }
  return [...slugs].slice(0, limit);
}

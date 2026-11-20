/**
 * GLOPROFAS Resource Centre — aggregated content index.
 * Combines the article library, checklists, videos and reporting directory
 * produced by the editorial pipeline, and assigns topical photography.
 * This module is server-safe (pure data, no client APIs).
 */

import type {
  Article,
  ArticleCategorySlug,
  Checklist,
  DirectoryCountry,
  VideoResource,
} from "./resource-centre-types";
import { ARTICLES_A_B } from "./articles-a-b";
import { ARTICLES_C } from "./articles-c";
import { ARTICLES_D_E } from "./articles-d-e";
import { CHECKLISTS } from "./checklists-data";
import { VIDEOS } from "./videos-data";
import { DIRECTORY_AFRICA } from "./directory-africa";
import { DIRECTORY_WORLD } from "./directory-world";

export type { Article, Checklist, VideoResource, DirectoryCountry };
export { CHECKLISTS, VIDEOS };
export { CHECKLIST_CATEGORIES, VIDEO_TOPICS, FRAUD_TYPES, CONTINENTS, ARTICLE_CATEGORIES } from "./resource-centre-types";

/* ------------------------------------------------------------------ */
/* Topical photography assignment (ultra-realistic editorial images)  */
/* ------------------------------------------------------------------ */

const ARTICLE_IMAGES: Record<string, string> = {
  // Category A — online and digital
  "how-to-recognise-and-avoid-online-scams": "/images/gen/article-cat-online.jpg",
  "how-to-identify-fake-websites-and-online-stores": "/images/context/home-online-shopping.jpg",
  "phishing-scams-recognise-fake-emails-messages": "/images/gen/scam-phishing.jpg",
  "smishing-and-vishing-sms-telephone-scams": "/images/context/person-phone-desk.jpg",
  "fake-customer-support-and-technical-support-scams": "/images/context/notebook-smartphone-notes.jpg",
  "online-marketplace-scams-buy-and-sell-safely": "/images/gen/scam-shopping.jpg",
  // Category B — money and banking
  "mobile-money-scams-protect-mtn-momo-orange-money": "/images/gen/scam-mobile-money.jpg",
  "fake-mobile-money-payment-notifications": "/images/gen/scam-momo-notification.jpg",
  "sim-swap-fraud-hijacked-phone-number": "/images/context/intro-phone.jpg",
  "investment-scams-and-ponzi-schemes": "/images/gen/scam-investment.jpg",
  "cryptocurrency-and-digital-asset-scams": "/images/gen/scam-crypto.jpg",
  "loan-credit-and-financial-assistance-scams": "/images/gen/scam-loan.jpg",
  // Category C — social engineering
  "romance-scams-recognising-emotional-manipulation": "/images/gen/scam-romance.jpg",
  "impersonation-scams-someone-you-trust": "/images/gen/scam-impersonation.jpg",
  "whatsapp-scams-common-tricks": "/images/gen/article-cat-social.jpg",
  "facebook-instagram-tiktok-scams": "/images/gen/article-cat-social.jpg",
  "fake-job-offers-and-employment-scams": "/images/gen/scam-job.jpg",
  "lottery-prize-and-giveaway-scams": "/images/gen/scam-advance-fee.jpg",
  // Category D — business fraud
  "business-email-compromise-how-companies-lose-money": "/images/gen/article-cat-business.jpg",
  "invoice-and-payment-redirection-fraud": "/images/context/article-business-controls.jpg",
  "ceo-and-executive-impersonation-scams": "/images/gen/scam-business.jpg",
  "recruitment-and-corporate-identity-fraud": "/images/context/team-laptops-office.jpg",
  "supplier-and-procurement-fraud": "/images/context/campaign-corporate.jpg",
  "fake-investment-opportunities-targeting-businesses": "/images/gen/article-cat-money.jpg",
  // Category E — emerging and specialised
  "artificial-intelligence-and-deepfake-scams": "/images/gen/article-cat-emerging.jpg",
  "identity-theft-and-personal-data-exploitation": "/images/zite/img_9FEr6sokBRFWKAW9.jpg",
  "online-extortion-and-blackmail-scams": "/images/context/article-reporting.jpg",
  "cryptocurrency-recovery-and-refund-scams": "/images/gen/scam-crypto-recovery.jpg",
  "fake-charity-and-donation-campaigns": "/images/context/campaign-community.jpg",
  "travel-visa-and-immigration-scams": "/images/context/currency-exchange-desk.jpg",
};

const CATEGORY_IMAGES: Record<ArticleCategorySlug, string> = {
  "online-digital": "/images/gen/article-cat-online.jpg",
  "money-banking": "/images/gen/article-cat-money.jpg",
  "social-engineering": "/images/gen/article-cat-social.jpg",
  "business-fraud": "/images/gen/article-cat-business.jpg",
  "emerging-specialised": "/images/gen/article-cat-emerging.jpg",
};

/** All published articles, with topical imagery assigned. */
export const ARTICLES: Article[] = [...ARTICLES_A_B, ...ARTICLES_C, ...ARTICLES_D_E].map((a) => ({
  ...a,
  imageUrl: a.imageUrl || ARTICLE_IMAGES[a.slug] || CATEGORY_IMAGES[a.categorySlug],
}));

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getRelatedArticles(article: Article, max = 3): Article[] {
  const related = article.relatedSlugs
    .map((s) => getArticle(s))
    .filter((a): a is Article => Boolean(a));
  if (related.length >= max) return related.slice(0, max);
  const sameCategory = ARTICLES.filter(
    (a) => a.categorySlug === article.categorySlug && a.slug !== article.slug && !related.some((r) => r.slug === a.slug)
  );
  return [...related, ...sameCategory].slice(0, max);
}

export function getChecklist(slug: string): Checklist | undefined {
  return CHECKLISTS.find((c) => c.slug === slug);
}

/** Authoritative external knowledge-library resources (verified). */
export const EXTERNAL_RESOURCES: {
  title: { en: string; fr: string };
  org: string;
  url: string;
  region: string;
  topics: string[];
  format: string;
}[] = [
  {
    title: { en: "Consumer Advice — scams and fraud", fr: "Conseils aux consommateurs — arnaques et fraude" },
    org: "U.S. Federal Trade Commission",
    url: "https://consumer.ftc.gov/",
    region: "United States · International",
    topics: ["online-scams", "shopping", "identity-theft", "investment"],
    format: "Guide",
  },
  {
    title: { en: "Internet Crime Complaint Center (IC3)", fr: "Internet Crime Complaint Center (IC3)" },
    org: "FBI",
    url: "https://www.ic3.gov/",
    region: "United States · International",
    topics: ["cybercrime", "bec", "online-scams"],
    format: "Reporting portal",
  },
  {
    title: { en: "Cybercrime", fr: "Cybercriminalité" },
    org: "INTERPOL",
    url: "https://www.interpol.int/en/Crimes/Cybercrime",
    region: "International",
    topics: ["cybercrime", "impersonation"],
    format: "Guide",
  },
  {
    title: { en: "Scams and fraud awareness", fr: "Sensibilisation aux arnaques et à la fraude" },
    org: "Europol",
    url: "https://www.europol.europa.eu/",
    region: "Europe · International",
    topics: ["cybercrime", "online-scams"],
    format: "Guide",
  },
  {
    title: { en: "Secure Our World — phishing and online safety", fr: "Secure Our World — hameçonnage et sécurité en ligne" },
    org: "CISA",
    url: "https://www.cisa.gov/",
    region: "United States · International",
    topics: ["phishing", "cybercrime"],
    format: "Guide",
  },
  {
    title: { en: "Cyber Aware — six actions to stay safe online", fr: "Cyber Aware — six gestes pour rester en sécurité en ligne" },
    org: "UK National Cyber Security Centre",
    url: "https://www.ncsc.gov.uk/cyberaware",
    region: "United Kingdom · International",
    topics: ["phishing", "identity-theft"],
    format: "Guide",
  },
  {
    title: { en: "Scamwatch — advice and reports", fr: "Scamwatch — conseils et signalements" },
    org: "ACCC (Australia)",
    url: "https://www.scamwatch.gov.au/",
    region: "Australia · International",
    topics: ["online-scams", "investment", "romance"],
    format: "Guide",
  },
  {
    title: { en: "Canadian Anti-Fraud Centre", fr: "Centre antifraude canadien" },
    org: "CAFC",
    url: "https://www.antifraudcentre-centreantifraude.ca/",
    region: "Canada",
    topics: ["online-scams", "financial-fraud"],
    format: "Reporting portal",
  },
  {
    title: { en: "ScamShield — spot scams, report them", fr: "ScamShield — repérez et signalez les arnaques" },
    org: "Singapore Government",
    url: "https://www.scamshield.gov.sg/",
    region: "Singapore · Asia",
    topics: ["online-scams", "impersonation"],
    format: "Reporting portal",
  },
  {
    title: { en: "Cyber Security Authority — awareness resources", fr: "Cyber Security Authority — ressources de sensibilisation" },
    org: "Ghana CSA",
    url: "https://csa.gov.gh/",
    region: "Ghana · West Africa",
    topics: ["online-scams", "mobile-money", "cybercrime"],
    format: "Guide",
  },
  {
    title: { en: "ngCERT — advisories and incident reporting", fr: "ngCERT — alertes et signalement d’incidents" },
    org: "Nigeria",
    url: "https://cert.gov.ng/",
    region: "Nigeria · West Africa",
    topics: ["cybercrime", "phishing"],
    format: "Advisory",
  },
  {
    title: { en: "ANTIC — cybersecurity and digital trust", fr: "ANTIC — cybersécurité et confiance numérique" },
    org: "Cameroon",
    url: "https://www.antic.cm/",
    region: "Cameroon · Central Africa",
    topics: ["cybercrime", "online-scams"],
    format: "Guide",
  },
  {
    title: { en: "Cybermalveillance — assistance for victims", fr: "Cybermalveillance — assistance aux victimes" },
    org: "France",
    url: "https://www.cybermalveillance.gouv.fr/",
    region: "France · Francophonie",
    topics: ["cybercrime", "identity-theft", "phishing"],
    format: "Assistance platform",
  },
  {
    title: { en: "Fraudehelpdesk — fraud helpdesk", fr: "Fraudehelpdesk — plateforme anti-fraude" },
    org: "Netherlands",
    url: "https://www.fraudehelpdesk.nl/",
    region: "Netherlands · Europe",
    topics: ["online-scams", "financial-fraud"],
    format: "Helpdesk",
  },
  {
    title: { en: "Safeonweb — report suspicious messages", fr: "Safeonweb — signalez les messages suspects" },
    org: "Belgium CCB",
    url: "https://www.safeonweb.be/",
    region: "Belgium · Europe",
    topics: ["phishing", "online-scams"],
    format: "Reporting portal",
  },
  {
    title: { en: "INCIBE — cybersecurity for citizens", fr: "INCIBE — cybersécurité pour les citoyens" },
    org: "Spain",
    url: "https://www.incibe.es/",
    region: "Spain · Europe",
    topics: ["cybercrime", "phishing"],
    format: "Guide",
  },
];

/** Victim action guide — “What to Do If You Have Been Scammed” (5 urgency steps). */
export const VICTIM_GUIDE: {
  key: string;
  title: { en: string; fr: string };
  intro: { en: string; fr: string };
  steps: { t: { en: string; fr: string }; items: { en: string; fr: string }[] }[];
} = {
  key: "victim-guide",
  title: {
    en: "What to Do If You Have Been Scammed",
    fr: "Que faire si vous avez été victime d’une arnaque",
  },
  intro: {
    en: "Act in this order. Every hour counts for your money, your accounts and your identity. You are not alone, and you are not to blame — scammers are skilled, organised criminals.",
    fr: "Agissez dans cet ordre. Chaque heure compte pour votre argent, vos comptes et votre identité. Vous n’êtes pas seul et vous n’êtes pas en faute : les escrocs sont des criminels organisés et habiles.",
  },
  steps: [
    {
      t: { en: "First — stop further losses", fr: "Premièrement — stopper les pertes" },
      items: [
        { en: "Stop communicating with the suspected scammer.", fr: "Cessez toute communication avec l’escroc présumé." },
        { en: "Do not send any additional money — not even “fees to recover” your money.", fr: "N’envoyez plus d’argent — pas même des « frais pour récupérer » vos fonds." },
        { en: "Do not disclose OTPs, PINs or passwords to anyone who contacts you.", fr: "Ne divulguez aucun code à usage unique, code PIN ni mot de passe à quiconque vous contacte." },
        { en: "Avoid clicking further suspicious links or opening attachments.", fr: "Évitez de cliquer sur d’autres liens suspects ou d’ouvrir des pièces jointes." },
      ],
    },
    {
      t: { en: "Second — contact your financial provider", fr: "Deuxièmement — contactez votre fournisseur financier" },
      items: [
        { en: "Call your bank immediately on its official number.", fr: "Appelez immédiatement votre banque via son numéro officiel." },
        { en: "Contact MTN MoMo or Orange Money through their official channels where applicable.", fr: "Contactez MTN MoMo ou Orange Money par leurs canaux officiels, le cas échéant." },
        { en: "Request an investigation or a transaction recall where available.", fr: "Demandez une enquête ou une annulation de transaction, si possible." },
        { en: "Ask whether the payment can be blocked or traced.", fr: "Demandez si le paiement peut être bloqué ou tracé." },
        { en: "Secure or freeze compromised accounts and cards.", fr: "Sécurisez ou gelez les comptes et cartes compromis." },
      ],
    },
    {
      t: { en: "Third — preserve the evidence", fr: "Troisièmement — préservez les preuves" },
      items: [
        { en: "Keep screenshots of messages, profiles and pages.", fr: "Conservez des captures d’écran des messages, profils et pages." },
        { en: "Save phone numbers and account names used by the scammer.", fr: "Enregistrez les numéros de téléphone et noms de comptes utilisés par l’escroc." },
        { en: "Preserve email headers where possible (do not delete the emails).", fr: "Conservez les en-têtes de courriels si possible (ne supprimez pas les courriels)." },
        { en: "Keep transaction references and payment receipts.", fr: "Gardez les références de transaction et les reçus de paiement." },
        { en: "Save website addresses and record dates and times.", fr: "Enregistrez les adresses web, ainsi que les dates et heures." },
      ],
    },
    {
      t: { en: "Fourth — report the incident", fr: "Quatrièmement — signalez l’incident" },
      items: [
        { en: "Identify the correct national authority for your country.", fr: "Identifiez l’autorité nationale compétente pour votre pays." },
        { en: "Submit a report through the official channel and keep the complaint reference number.", fr: "Déposez un signalement par le canal officiel et conservez le numéro de référence." },
        { en: "Provide the evidence you preserved.", fr: "Fournissez les preuves que vous avez conservées." },
        { en: "Also warn GLOPROFAS so others can be alerted.", fr: "Signalez aussi à GLOPROFAS afin d’alerter d’autres personnes." },
      ],
    },
    {
      t: { en: "Fifth — protect your identity", fr: "Cinquièmement — protégez votre identité" },
      items: [
        { en: "Change compromised passwords, starting with your email account.", fr: "Changez les mots de passe compromis, en commençant par votre compte de messagerie." },
        { en: "Enable multi-factor authentication everywhere it is offered.", fr: "Activez l’authentification multifacteur partout où elle est proposée." },
        { en: "Contact relevant service providers (bank, operator, platforms).", fr: "Contactez les fournisseurs concernés (banque, opérateur, plateformes)." },
        { en: "Monitor financial accounts and statements for unfamiliar activity.", fr: "Surveillez vos comptes et relevés pour toute activité inhabituelle." },
        { en: "Watch out for recovery scams — anyone promising to recover your funds for a fee.", fr: "Méfiez-vous des arnaques au recouvrement : quiconque promet de récupérer vos fonds contre paiement." },
      ],
    },
  ],
};

/** Aggregated directory (Africa first). */
export const DIRECTORY: DirectoryCountry[] = [...DIRECTORY_AFRICA, ...DIRECTORY_WORLD];

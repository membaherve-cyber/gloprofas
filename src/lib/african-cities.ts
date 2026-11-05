import type { Locale } from "@/lib/i18n";

export type AerialCityHero = {
  image: string;
  city: { en: string; fr: string };
};

/**
 * Every page outside the Home Page has a unique aerial view of a different
 * African city as its Hero background.
 */
export const PAGE_AERIAL_HEROES: Record<string, AerialCityHero> = {
  about: {
    image: "/images/cities/yaounde-cameroon.jpg",
    city: { en: "Yaoundé, Cameroon", fr: "Yaoundé, Cameroun" },
  },
  scamsIndex: {
    image: "/images/cities/lagos-marina.jpg",
    city: { en: "Lagos Marina, Nigeria", fr: "Marina de Lagos, Nigéria" },
  },
  alertsIndex: {
    image: "/images/cities/nairobi-uhuru.jpg",
    city: { en: "Nairobi CBD, Kenya", fr: "Centre de Nairobi, Kenya" },
  },
  newsIndex: {
    image: "/images/cities/kigali-hills.jpg",
    city: { en: "Kigali Hills, Rwanda", fr: "Collines de Kigali, Rwanda" },
  },
  resourcesIndex: {
    image: "/images/cities/cape-town-mountain.jpg",
    city: { en: "Cape Town, South Africa", fr: "Le Cap, Afrique du Sud" },
  },
  servicesIndex: {
    image: "/images/cities/sandton-cbd.jpg",
    city: {
      en: "Sandton Financial District, South Africa",
      fr: "Quartier financier de Sandton, Afrique du Sud",
    },
  },
  serviceDetail: {
    image: "/images/cities/nairobi-kicc.jpg",
    city: { en: "Nairobi Westlands, Kenya", fr: "Nairobi Westlands, Kenya" },
  },
  getInvolved: {
    image: "/images/cities/yaounde-monument.jpg",
    city: {
      en: "Yaoundé (Reunification), Cameroon",
      fr: "Yaoundé (Réunification), Cameroun",
    },
  },
  contact: {
    image: "/images/cities/rabat-morocco.jpg",
    city: { en: "Rabat, Morocco", fr: "Rabat, Maroc" },
  },
  report: {
    image: "/images/cities/lagos-expressway.jpg",
    city: {
      en: "Victoria Island, Lagos, Nigeria",
      fr: "Victoria Island, Lagos, Nigéria",
    },
  },
  check: {
    image: "/images/cities/nairobi-expressway.jpg",
    city: {
      en: "Nairobi Expressway, Kenya",
      fr: "Nairobi Expressway, Kenya",
    },
  },
  campaigns: {
    image: "/images/cities/kigali-sunset.jpg",
    city: {
      en: "Nyarugenge, Kigali, Rwanda",
      fr: "Nyarugenge, Kigali, Rwanda",
    },
  },
  search: {
    image: "/images/cities/cairo-citadel.jpg",
    city: { en: "Greater Cairo, Egypt", fr: "Grand Caire, Égypte" },
  },
  newsletter: {
    image: "/images/cities/durban-coast.jpg",
    city: { en: "Durban, South Africa", fr: "Durban, Afrique du Sud" },
  },
  legalPrivacy: {
    image: "/images/cities/addis-ababa-center.jpg",
    city: {
      en: "Kirkos, Addis Ababa, Ethiopia",
      fr: "Kirkos, Addis-Abeba, Éthiopie",
    },
  },
  legalTerms: {
    image: "/images/cities/dar-es-salaam-rail.jpg",
    city: {
      en: "Ilala, Dar es Salaam, Tanzania",
      fr: "Ilala, Dar es Salam, Tanzanie",
    },
  },
  legalCookies: {
    image: "/images/cities/manzini-eswatini.jpg",
    city: { en: "Manzini, Eswatini", fr: "Manzini, Eswatini" },
  },
  legalDefault: {
    image: "/images/cities/cape-town-bay.jpg",
    city: { en: "Table Bay, Cape Town", fr: "Table Bay, Le Cap" },
  },
};

/**
 * 12 distinct African city aerial views for each Scam Category detail page hero.
 */
export const SCAM_CATEGORY_AERIAL_HEROES: Record<string, AerialCityHero> = {
  phishing: {
    image: "/images/cities/nairobi-skyline.jpg",
    city: { en: "Nairobi, Kenya", fr: "Nairobi, Kenya" },
  },
  "mobile-money-scams": {
    image: "/images/cities/douala-cameroon.jpg",
    city: { en: "Douala, Cameroon", fr: "Douala, Cameroun" },
  },
  "investment-scams": {
    image: "/images/cities/sandton-gauteng.jpg",
    city: { en: "Sandton, South Africa", fr: "Sandton, Afrique du Sud" },
  },
  "employment-scams": {
    image: "/images/cities/kigali-rwanda.jpg",
    city: { en: "Kigali, Rwanda", fr: "Kigali, Rwanda" },
  },
  "romance-scams": {
    image: "/images/cities/cape-town-harbor.jpg",
    city: {
      en: "Cape Town Waterfront, South Africa",
      fr: "Front de mer du Cap, Afrique du Sud",
    },
  },
  "online-shopping-scams": {
    image: "/images/cities/casablanca-morocco.jpg",
    city: { en: "Casablanca, Morocco", fr: "Casablanca, Maroc" },
  },
  "cryptocurrency-scams": {
    image: "/images/cities/johannesburg-skyline.jpg",
    city: {
      en: "Johannesburg, South Africa",
      fr: "Johannesbourg, Afrique du Sud",
    },
  },
  "impersonation-scams": {
    image: "/images/cities/addis-ababa.jpg",
    city: { en: "Addis Ababa, Ethiopia", fr: "Addis-Abeba, Éthiopie" },
  },
  "advance-fee-scams": {
    image: "/images/cities/lagos-carter-bridge.jpg",
    city: { en: "Lagos Island, Nigeria", fr: "Île de Lagos, Nigéria" },
  },
  "fake-loan-scams": {
    image: "/images/cities/dar-es-salaam.jpg",
    city: { en: "Dar es Salaam, Tanzania", fr: "Dar es Salam, Tanzanie" },
  },
  "business-email-compromise": {
    image: "/images/cities/cairo-nile.jpg",
    city: { en: "Cairo & Nile, Egypt", fr: "Le Caire et le Nil, Égypte" },
  },
  "fake-websites": {
    image: "/images/cities/algiers-algeria.jpg",
    city: { en: "Algiers, Algeria", fr: "Alger, Algérie" },
  },
};

/**
 * Distinct African city aerial views for each Scam Alert detail page hero.
 */
export const ALERT_AERIAL_HEROES: Record<string, AerialCityHero> = {
  "4765f308-62d4-4eb6-b28d-07e4227f8423": {
    image: "/images/cities/yaounde-central.jpg",
    city: { en: "Yaoundé Centre, Cameroon", fr: "Yaoundé Centre, Cameroun" },
  },
  "470da78a-4787-4979-9f71-057fe61d5e50": {
    image: "/images/cities/dakar-coast.jpg",
    city: { en: "Dakar Coastline, Senegal", fr: "Littoral de Dakar, Sénégal" },
  },
  "881dce1a-df7b-4d32-963b-4f2ecd1e1b8b": {
    image: "/images/cities/kampala-uganda.jpg",
    city: { en: "Kampala, Uganda", fr: "Kampala, Ouganda" },
  },
};

/**
 * Distinct African city aerial views for each Editorial Article detail page hero.
 */
export const ARTICLE_AERIAL_HEROES: Record<string, AerialCityHero> = {
  "84b3aae8-32a2-40eb-9c90-c414846fbc8a": {
    image: "/images/cities/nairobi-dusk.jpg",
    city: {
      en: "Nairobi Metropolitan, Kenya",
      fr: "Métropole de Nairobi, Kenya",
    },
  },
  "f10d1bb2-3e78-457f-9375-174734191e5f": {
    image: "/images/cities/addis-ababa-towers.jpg",
    city: {
      en: "Bole, Addis Ababa, Ethiopia",
      fr: "Bole, Addis-Abeba, Éthiopie",
    },
  },
  "5f261c0b-297a-4451-8118-9cbe77cf40a5": {
    image: "/images/cities/dar-es-salaam-night.jpg",
    city: {
      en: "Dar es Salaam Harbour, Tanzania",
      fr: "Port de Dar es Salam, Tanzanie",
    },
  },
};

/**
 * Rich contextual photography of people, objects, and places for each article's
 * body gallery and callouts.
 */
export const ARTICLE_CONTEXT_VISUALS: Record<
  string,
  {
    leadCaption: { en: string; fr: string };
    gallery: {
      image: string;
      tag: { en: string; fr: string };
      caption: { en: string; fr: string };
    }[];
  }
> = {
  "84b3aae8-32a2-40eb-9c90-c414846fbc8a": {
    leadCaption: {
      en: "Pausing to verify a payment request on a known number stops most fraud before money moves.",
      fr: "Prendre une pause pour vérifier une demande de paiement sur un numéro connu arrête la plupart des fraudes.",
    },
    gallery: [
      {
        image: "/images/article-payment-pause.jpg",
        tag: { en: "Payment Pause", fr: "Pause avant paiement" },
        caption: {
          en: "Always check the recipient details and pause when someone rushes you to send money.",
          fr: "Vérifiez toujours les coordonnées du destinataire et marquez une pause face à l’urgence.",
        },
      },
      {
        image: "/images/market-cash.jpg",
        tag: { en: "Everyday Transactions", fr: "Transactions quotidiennes" },
        caption: {
          en: "Whether in a market or on mobile money, confirm the transaction in your official balance first.",
          fr: "Au marché comme sur mobile money, confirmez d’abord l’opération dans votre solde officiel.",
        },
      },
    ],
  },
  "f10d1bb2-3e78-457f-9375-174734191e5f": {
    leadCaption: {
      en: "Legitimate employers evaluate your skills — they never ask candidates to pay registration, visa or training fees.",
      fr: "Les employeurs légitimes évaluent vos compétences — ils ne demandent jamais de frais d’inscription ou de visa.",
    },
    gallery: [
      {
        image: "/images/context/person-phone-desk.jpg",
        tag: { en: "Independent Verification", fr: "Vérification indépendante" },
        caption: {
          en: "Look up the employer’s official website and telephone number yourself before sending documents.",
          fr: "Recherchez vous-même le site et le numéro officiels de l’employeur avant d’envoyer des documents.",
        },
      },
      {
        image: "/images/context/team-laptops-office.jpg",
        tag: { en: "Workplace Standards", fr: "Normes professionnelles" },
        caption: {
          en: "Real recruitment processes involve verifiable HR contacts and formal written contracts without upfront fees.",
          fr: "Un recrutement réel implique des contacts RH vérifiables et un contrat écrit sans frais préalables.",
        },
      },
    ],
  },
  "5f261c0b-297a-4451-8118-9cbe77cf40a5": {
    leadCaption: {
      en: "Quick, calm action in the first 60 minutes — calling your provider, securing accounts and saving evidence — limits damage.",
      fr: "Une réaction calme et rapide dans la première heure — appeler l’opérateur, sécuriser les comptes et garder les preuves — limite les dégâts.",
    },
    gallery: [
      {
        image: "/images/article-reporting.jpg",
        tag: { en: "Preserve Evidence", fr: "Conserver les preuves" },
        caption: {
          en: "Write down transaction references, phone numbers, URLs and timestamps while details are fresh.",
          fr: "Notez les références de transaction, numéros, liens et horaires tant que les détails sont précis.",
        },
      },
      {
        image: "/images/context/support-call-center.jpg",
        tag: { en: "Official Support Channels", fr: "Canaux d’assistance officiels" },
        caption: {
          en: "Call your bank or mobile money operator using the official number printed on your card or SIM pack.",
          fr: "Appelez votre banque ou opérateur mobile money via le numéro officiel figurant sur votre carte.",
        },
      },
    ],
  },
};

export function getLegalAerialHero(slug: string): AerialCityHero {
  if (slug === "privacy") return PAGE_AERIAL_HEROES.legalPrivacy;
  if (slug === "terms") return PAGE_AERIAL_HEROES.legalTerms;
  if (slug === "cookies") return PAGE_AERIAL_HEROES.legalCookies;
  return PAGE_AERIAL_HEROES.legalDefault;
}

export function formatAerialBadge(city: { en: string; fr: string }, lang: Locale): string {
  return lang === "fr"
    ? `Vue aérienne · ${city.fr}`
    : `Aerial view · ${city.en}`;
}

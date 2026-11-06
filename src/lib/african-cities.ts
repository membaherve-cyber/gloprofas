import type { Locale } from "@/lib/i18n";

export type AerialCityHero = {
  video: string;
  image: string;
  coords?: string;
  city: { en: string; fr: string };
};

/**
 * Every page outside the Home Page features a real, contextually selected
 * aerial drone video of an African city or urban district (`public/video/cities/*.mp4`)
 * paired with a high-resolution poster fallback (`public/images/cities/*.jpg`).
 */
export const PAGE_AERIAL_HEROES: Record<string, AerialCityHero> = {
  about: {
    video: "/video/cities/douala-cameroon.mp4",
    image: "/images/cities/yaounde-cameroon.jpg",
    coords: "04°03′N · 09°42′E",
    city: { en: "Douala & Yaoundé, Cameroon", fr: "Douala et Yaoundé, Cameroun" },
  },
  scamsIndex: {
    video: "/video/cities/lagos-cityscape.mp4",
    image: "/images/cities/lagos-marina.jpg",
    coords: "06°27′N · 03°23′E",
    city: { en: "Lagos Marina, Nigeria", fr: "Marina de Lagos, Nigéria" },
  },
  alertsIndex: {
    video: "/video/cities/nairobi-westlands.mp4",
    image: "/images/cities/nairobi-uhuru.jpg",
    coords: "01°17′S · 36°49′E",
    city: { en: "Nairobi CBD, Kenya", fr: "Centre de Nairobi, Kenya" },
  },
  newsIndex: {
    video: "/video/cities/kigali-rwanda.mp4",
    image: "/images/cities/kigali-hills.jpg",
    coords: "01°56′S · 30°03′E",
    city: { en: "Kigali Hills, Rwanda", fr: "Collines de Kigali, Rwanda" },
  },
  resourcesIndex: {
    video: "/video/cities/cape-town-night.mp4",
    image: "/images/cities/cape-town-mountain.jpg",
    coords: "33°55′S · 18°25′E",
    city: { en: "Cape Town, South Africa", fr: "Le Cap, Afrique du Sud" },
  },
  servicesIndex: {
    video: "/video/cities/sandton-johannesburg.mp4",
    image: "/images/cities/sandton-cbd.jpg",
    coords: "26°06′S · 28°03′E",
    city: {
      en: "Sandton Financial District, South Africa",
      fr: "Quartier financier de Sandton, Afrique du Sud",
    },
  },
  serviceDetail: {
    video: "/video/cities/sandton-skyline.mp4",
    image: "/images/cities/nairobi-kicc.jpg",
    coords: "26°06′S · 28°03′E",
    city: {
      en: "Sandton Corporate Skyline, South Africa",
      fr: "Quartier d’affaires de Sandton, Afrique du Sud",
    },
  },
  getInvolved: {
    video: "/video/cities/abuja-nigeria.mp4",
    image: "/images/cities/yaounde-monument.jpg",
    coords: "09°04′N · 07°29′E",
    city: {
      en: "Abuja Central District, Nigeria",
      fr: "District central d’Abuja, Nigéria",
    },
  },
  contact: {
    video: "/video/cities/banjul-gambia.mp4",
    image: "/images/cities/rabat-morocco.jpg",
    coords: "13°27′N · 16°34′W",
    city: { en: "Banjul, The Gambia", fr: "Banjul, Gambie" },
  },
  report: {
    video: "/video/cities/lagos-victoria-island.mp4",
    image: "/images/cities/lagos-expressway.jpg",
    coords: "06°25′N · 03°25′E",
    city: {
      en: "Victoria Island, Lagos, Nigeria",
      fr: "Victoria Island, Lagos, Nigéria",
    },
  },
  check: {
    video: "/video/cities/urban-flyover.mp4",
    image: "/images/cities/nairobi-expressway.jpg",
    coords: "01°16′S · 36°48′E",
    city: {
      en: "Metropolitan Corridor, East Africa",
      fr: "Corridor métropolitain, Afrique de l’Est",
    },
  },
  campaigns: {
    video: "/video/cities/lagos-sunset.mp4",
    image: "/images/cities/kigali-sunset.jpg",
    coords: "06°26′N · 03°24′E",
    city: {
      en: "Lagos Lagoon at Dusk, West Africa",
      fr: "Lagune de Lagos au crépuscule, Afrique de l’Ouest",
    },
  },
  search: {
    video: "/video/cities/sandton-dawn.mp4",
    image: "/images/cities/cairo-citadel.jpg",
    coords: "26°06′S · 28°03′E",
    city: { en: "Gauteng Skyline at Dawn", fr: "Horizon du Gauteng à l’aube" },
  },
  newsletter: {
    video: "/video/cities/coastal-metropolis.mp4",
    image: "/images/cities/durban-coast.jpg",
    coords: "29°51′S · 31°01′E",
    city: { en: "Coastal Metropolis", fr: "Métropole côtière" },
  },
  legalPrivacy: {
    video: "/video/cities/lekki-lagos.mp4",
    image: "/images/cities/addis-ababa-center.jpg",
    coords: "06°28′N · 03°45′E",
    city: {
      en: "Ibeju-Lekki, Lagos, Nigeria",
      fr: "Ibeju-Lekki, Lagos, Nigéria",
    },
  },
  legalTerms: {
    video: "/video/cities/sandton-skyline.mp4",
    image: "/images/cities/dar-es-salaam-rail.jpg",
    coords: "26°06′S · 28°03′E",
    city: {
      en: "Sandton Skyline, South Africa",
      fr: "Horizon de Sandton, Afrique du Sud",
    },
  },
  legalCookies: {
    video: "/video/cities/banjul-gambia.mp4",
    image: "/images/cities/manzini-eswatini.jpg",
    coords: "13°27′N · 16°34′W",
    city: { en: "Banjul, West Africa", fr: "Banjul, Afrique de l’Ouest" },
  },
  legalDefault: {
    video: "/video/cities/cape-town-night.mp4",
    image: "/images/cities/cape-town-bay.jpg",
    coords: "33°55′S · 18°25′E",
    city: { en: "Table Bay, Cape Town", fr: "Table Bay, Le Cap" },
  },
};

/**
 * 12 distinct African city aerial videos + posters for each Scam Category detail page hero.
 */
export const SCAM_CATEGORY_AERIAL_HEROES: Record<string, AerialCityHero> = {
  phishing: {
    video: "/video/cities/nairobi-westlands.mp4",
    image: "/images/cities/nairobi-skyline.jpg",
    coords: "01°17′S · 36°49′E",
    city: { en: "Nairobi, Kenya", fr: "Nairobi, Kenya" },
  },
  "mobile-money-scams": {
    video: "/video/cities/douala-cameroon.mp4",
    image: "/images/cities/douala-cameroon.jpg",
    coords: "04°03′N · 09°42′E",
    city: { en: "Douala, Cameroon", fr: "Douala, Cameroun" },
  },
  "investment-scams": {
    video: "/video/cities/sandton-johannesburg.mp4",
    image: "/images/cities/sandton-gauteng.jpg",
    coords: "26°06′S · 28°03′E",
    city: { en: "Sandton, South Africa", fr: "Sandton, Afrique du Sud" },
  },
  "employment-scams": {
    video: "/video/cities/kigali-rwanda.mp4",
    image: "/images/cities/kigali-rwanda.jpg",
    coords: "01°56′S · 30°03′E",
    city: { en: "Kigali, Rwanda", fr: "Kigali, Rwanda" },
  },
  "romance-scams": {
    video: "/video/cities/cape-town-night.mp4",
    image: "/images/cities/cape-town-harbor.jpg",
    coords: "33°55′S · 18°25′E",
    city: {
      en: "Cape Town Waterfront, South Africa",
      fr: "Front de mer du Cap, Afrique du Sud",
    },
  },
  "online-shopping-scams": {
    video: "/video/cities/lagos-cityscape.mp4",
    image: "/images/cities/casablanca-morocco.jpg",
    coords: "06°27′N · 03°23′E",
    city: { en: "Lagos Commercial District", fr: "Quartier commerçant de Lagos" },
  },
  "cryptocurrency-scams": {
    video: "/video/cities/sandton-skyline.mp4",
    image: "/images/cities/johannesburg-skyline.jpg",
    coords: "26°12′S · 28°02′E",
    city: {
      en: "Johannesburg, South Africa",
      fr: "Johannesbourg, Afrique du Sud",
    },
  },
  "impersonation-scams": {
    video: "/video/cities/abuja-nigeria.mp4",
    image: "/images/cities/addis-ababa.jpg",
    coords: "09°04′N · 07°29′E",
    city: { en: "Abuja, Nigeria", fr: "Abuja, Nigéria" },
  },
  "advance-fee-scams": {
    video: "/video/cities/lagos-sunset.mp4",
    image: "/images/cities/lagos-carter-bridge.jpg",
    coords: "06°27′N · 03°23′E",
    city: { en: "Lagos Island, Nigeria", fr: "Île de Lagos, Nigéria" },
  },
  "fake-loan-scams": {
    video: "/video/cities/banjul-gambia.mp4",
    image: "/images/cities/dar-es-salaam.jpg",
    coords: "13°27′N · 16°34′W",
    city: { en: "Banjul, The Gambia", fr: "Banjul, Gambie" },
  },
  "business-email-compromise": {
    video: "/video/cities/sandton-dawn.mp4",
    image: "/images/cities/cairo-nile.jpg",
    coords: "26°06′S · 28°03′E",
    city: { en: "Sandton Corporate Center", fr: "Centre d’affaires de Sandton" },
  },
  "fake-websites": {
    video: "/video/cities/urban-flyover.mp4",
    image: "/images/cities/algiers-algeria.jpg",
    coords: "06°28′N · 03°45′E",
    city: { en: "Metropolitan Interchange", fr: "Échangeur métropolitain" },
  },
};

/**
 * Distinct African city aerial videos for each Scam Alert detail page hero.
 */
export const ALERT_AERIAL_HEROES: Record<string, AerialCityHero> = {
  "4765f308-62d4-4eb6-b28d-07e4227f8423": {
    video: "/video/cities/douala-cameroon.mp4",
    image: "/images/cities/yaounde-central.jpg",
    coords: "04°03′N · 09°42′E",
    city: { en: "Douala & Yaoundé, Cameroon", fr: "Douala et Yaoundé, Cameroun" },
  },
  "470da78a-4787-4979-9f71-057fe61d5e50": {
    video: "/video/cities/lagos-sunset.mp4",
    image: "/images/cities/dakar-coast.jpg",
    coords: "06°27′N · 03°23′E",
    city: { en: "West African Coastline", fr: "Littoral d’Afrique de l’Ouest" },
  },
  "881dce1a-df7b-4d32-963b-4f2ecd1e1b8b": {
    video: "/video/cities/kigali-rwanda.mp4",
    image: "/images/cities/kampala-uganda.jpg",
    coords: "01°56′S · 30°03′E",
    city: { en: "Central & East Africa", fr: "Afrique centrale et de l’Est" },
  },
};

/**
 * Distinct African city aerial videos for each Editorial Article detail page hero.
 */
export const ARTICLE_AERIAL_HEROES: Record<string, AerialCityHero> = {
  "84b3aae8-32a2-40eb-9c90-c414846fbc8a": {
    video: "/video/cities/nairobi-westlands.mp4",
    image: "/images/cities/nairobi-dusk.jpg",
    coords: "01°17′S · 36°49′E",
    city: {
      en: "Nairobi Metropolitan, Kenya",
      fr: "Métropole de Nairobi, Kenya",
    },
  },
  "f10d1bb2-3e78-457f-9375-174734191e5f": {
    video: "/video/cities/abuja-nigeria.mp4",
    image: "/images/cities/addis-ababa-towers.jpg",
    coords: "09°04′N · 07°29′E",
    city: {
      en: "Abuja Business District, Nigeria",
      fr: "Quartier d’affaires d’Abuja, Nigéria",
    },
  },
  "5f261c0b-297a-4451-8118-9cbe77cf40a5": {
    video: "/video/cities/cape-town-night.mp4",
    image: "/images/cities/dar-es-salaam-night.jpg",
    coords: "33°55′S · 18°25′E",
    city: {
      en: "Cape Town Harbour, South Africa",
      fr: "Port du Cap, Afrique du Sud",
    },
  },
};

/**
 * Authentic documentary photography of people, objects, and places for each article's
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
        image: "/images/context/contactless-card-terminal.jpg",
        tag: { en: "Payment Verification", fr: "Vérification avant paiement" },
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
        image: "/images/context/notebook-smartphone-notes.jpg",
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
    : `Aerial footage · ${city.en}`;
}

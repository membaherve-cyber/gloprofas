import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SITE } from "@/lib/site";
import { FAQ_ITEMS } from "@/lib/content/faq-data";

/**
 * Advanced international SEO layer.
 * - Comprehensive bilingual keyword coverage (scam types x geographies x intents).
 * - Full Open Graph / Twitter / robots directives.
 * - Rich structured data: NGO (with HQ address), WebSite + SearchAction,
 *   and a FAQPage mirroring the visible FAQ rendered on the homepage.
 */

const SEO_KEYWORDS = [
  // Brand
  "GLOPROFAS",
  "Global Programme for the Fight Against Scams",
  "Programme mondial de lutte contre les arnaques",
  // Core intents (EN)
  "how to avoid scams",
  "how to spot a scam",
  "report a scam online",
  "scam prevention guide",
  "fraud awareness training",
  "scam victim support",
  "what to do if you have been scammed",
  "scam checker",
  "check suspicious message",
  "verify a website legitimacy",
  "anti-fraud education",
  "cyber safety awareness",
  // Scam types (EN)
  "phishing scams",
  "smishing vishing",
  "mobile money fraud",
  "MTN MoMo scam",
  "Orange Money fraud",
  "fake bank alert",
  "SIM swap fraud",
  "investment scams",
  "Ponzi scheme warning signs",
  "cryptocurrency scams",
  "romance scams",
  "fake job offers",
  "advance fee fraud 419",
  "business email compromise",
  "CEO fraud",
  "invoice redirection fraud",
  "identity theft protection",
  "deepfake scams",
  "AI voice cloning fraud",
  "fake online stores",
  "WhatsApp scams",
  "loan scam warning signs",
  "fake charity donations",
  // Geography (EN)
  "scam awareness Cameroon",
  "fraud prevention Africa",
  "report fraud Cameroon",
  "scam alerts Douala",
  "African scam reporting directory",
  // Intentes et types (FR)
  "comment éviter les arnaques",
  "reconnaître une arnaque",
  "signaler une arnaque",
  "lutte contre la fraude",
  "arnaque internet",
  "vérifier un message suspect",
  "arnaque mobile money",
  "arnaque Orange Money",
  "faux transfert mobile money",
  "arnaque phishing",
  "hameçonnage SMS",
  "arnaque sentimentale",
  "fausse offre d'emploi",
  "arnaque crypto",
  "arnaque investissement",
  "usurpation d'identité",
  "arnaque WhatsApp Cameroun",
  "prévention arnaques Afrique",
  "signaler une fraude Cameroun",
  "sensibilisation aux arnaques",
  "vérificateur d'arnaques gratuit",
];

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.fullName} | Scam Awareness & Fraud Prevention — Cameroon, Africa, Worldwide`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description.en,
  applicationName: SITE.name,
  keywords: SEO_KEYWORDS,
  authors: [{ name: SITE.fullName }],
  creator: SITE.fullName,
  publisher: SITE.fullName,
  category: "education",
  classification: "public awareness, consumer protection, cybersecurity education",
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      fr: "/",
      "x-default": "/",
    },
  },
  icons: {
    icon: "/images/gloprofas-logo.png",
    apple: "/images/gloprofas-logo.png",
  },
  openGraph: {
    type: "website",
    siteName: SITE.fullName,
    title: `${SITE.fullName} — ${SITE.tagline.en}`,
    description: SITE.description.en,
    url: "/",
    locale: "en_GB",
    alternateLocale: "fr_FR",
    images: [
      {
        url: "/images/gen/hero-main.jpg",
        width: 1472,
        height: 736,
        alt: "GLOPROFAS — spot the scam before it costs you",
      },
      {
        url: "/images/gloprofas-logo.png",
        width: 1132,
        height: 350,
        alt: `${SITE.fullName} logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.fullName} — ${SITE.tagline.en}`,
    description: SITE.description.en,
    images: ["/images/gen/hero-main.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "geo.region": "CM",
    "geo.placename": "Douala",
    "geo.position": "4.0511;9.7679",
    ICBM: "4.0511, 9.7679",
  },
};

export const viewport: Viewport = {
  themeColor: "#fbfbfd",
  width: "device-width",
  initialScale: 1,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: SITE.fullName,
  alternateName: [SITE.name, "GLOPROFAS Global Programme for the Fight Against Scams"],
  url: SITE.url,
  logo: `${SITE.url}/images/gloprofas-logo.png`,
  description: SITE.description.en,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Akwa",
    addressLocality: "Douala",
    addressRegion: "Littoral",
    addressCountry: "CM",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: SITE.email,
    availableLanguage: ["English", "French"],
  },
  areaServed: [
    { "@type": "Country", name: "Cameroon" },
    { "@type": "Continent", name: "Africa" },
    { "@type": "Place", name: "Worldwide" },
  ],
  knowsAbout: [
    "Scam prevention",
    "Fraud awareness",
    "Phishing",
    "Smishing and vishing",
    "Mobile money fraud",
    "MTN MoMo security",
    "Orange Money security",
    "Investment scams and Ponzi schemes",
    "Cryptocurrency fraud",
    "Romance scams",
    "Business email compromise",
    "Identity theft prevention",
    "Deepfake and AI-powered scams",
    "Scam reporting channels",
    "Digital safety education",
  ],
  availableLanguage: ["en", "fr"],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.fullName,
  alternateName: SITE.name,
  url: SITE.url,
  inLanguage: ["en", "fr"],
  description: SITE.description.en,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE.url}/#/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: ["en", "fr"],
  mainEntity: FAQ_ITEMS.map((f) => ({
    "@type": "Question",
    name: f.q.en,
    acceptedAnswer: { "@type": "Answer", text: f.a.en },
  })),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-white text-ink-900">
        {/* No-JS fallback: reveal all scroll-reveal content */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationJsonLd, websiteJsonLd, faqJsonLd]),
          }}
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}

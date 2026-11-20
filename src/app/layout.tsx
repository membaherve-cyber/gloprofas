import type { Metadata, Viewport } from "next";
import "@fontsource-variable/sora";
import "@fontsource-variable/manrope";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.fullName} | Scam Awareness & Fraud Prevention`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description.en,
  applicationName: SITE.name,
  keywords: [
    "scam prevention",
    "fraud awareness",
    "online fraud prevention",
    "mobile money scams",
    "financial fraud",
    "investment scams",
    "phishing prevention",
    "scam victim support",
    "digital safety",
    "fraud prevention education",
    "scam awareness Africa",
    "fraud prevention Cameroon",
    "arnaque",
    "fraude",
    "prévention",
    "lutte contre les arnaques",
  ],
  authors: [{ name: SITE.fullName }],
  creator: SITE.fullName,
  publisher: SITE.fullName,
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
        url: "/images/gloprofas-logo.png",
        width: 1132,
        height: 350,
        alt: `${SITE.fullName} logo`,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: `${SITE.fullName} — ${SITE.tagline.en}`,
    description: SITE.description.en,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "education",
};

export const viewport: Viewport = {
  themeColor: "#050b1a",
  width: "device-width",
  initialScale: 1,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: SITE.fullName,
  alternateName: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/images/gloprofas-logo.png`,
  description: SITE.description.en,
  areaServed: ["Cameroon", "Africa", "Worldwide"],
  knowsAbout: [
    "Scam prevention",
    "Fraud awareness",
    "Phishing",
    "Mobile money fraud",
    "Investment scams",
    "Digital safety education",
    "Romance scams",
    "Business email compromise",
    "Cryptocurrency fraud",
    "Identity theft prevention",
    "Deepfake scams",
    "Scam reporting channels",
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
            __html: JSON.stringify([organizationJsonLd, websiteJsonLd]),
          }}
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import "@fontsource-variable/sora";
import "@fontsource-variable/manrope";
import "../globals.css";
import { defaultLocale, getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const active: Locale = isLocale(locale) ? locale : defaultLocale;
  const dict = getDictionary(active);
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
    title: { default: dict.meta.title, template: "%s · GLOPROFAS" },
    description: dict.meta.description,
    applicationName: "GLOPROFAS",
    alternates: {
      canonical: `/${active}`,
      languages: { en: "/en", fr: "/fr", "x-default": "/en" },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      locale: active === "fr" ? "fr_FR" : "en_GB",
      type: "website",
      siteName: "GLOPROFAS",
      images: ["/images/gloprofas-logo.png"],
    },
    icons: { icon: "/icon.svg" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale} className="scroll-smooth">
      <body className="bg-white text-ink-900 antialiased">{children}</body>
    </html>
  );
}

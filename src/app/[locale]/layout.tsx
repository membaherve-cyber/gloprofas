import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import "@fontsource-variable/sora";
import "@fontsource-variable/manrope";
import "../globals.css";
import { defaultLocale, isLocale, locales, type Locale } from "@/lib/i18n";
import { SITE_NAME, SITE_URL, LEGAL_NAME, SITE_DESCRIPTION, buildMetadata, organizationLd, websiteLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";

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
  return {
    ...buildMetadata({
      locale: active,
      path: "/",
      title: `${SITE_NAME} — ${LEGAL_NAME[active]}`,
      description: SITE_DESCRIPTION[active],
    }),
    title: { default: `${SITE_NAME} — ${LEGAL_NAME[active]}`, template: `%s · ${SITE_NAME}` },
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    icons: { icon: "/icon.svg", apple: "/images/gloprofas-logo.png" },
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
    <html lang={locale} dir="ltr" className="scroll-smooth">
      <body className="bg-white text-ink-900 antialiased">
        <JsonLd data={[organizationLd(), websiteLd()]} />
        {children}
      </body>
    </html>
  );
}

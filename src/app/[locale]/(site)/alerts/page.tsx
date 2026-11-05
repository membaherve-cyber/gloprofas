import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { ZiteAlertsView } from "@/components/zite/alerts-view";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: locale === "fr" ? "Alertes aux arnaques" : "Scam alerts",
    alternates: {
      canonical: `/${locale}/alerts`,
      languages: { en: "/en/alerts", fr: "/fr/alerts" },
    },
  };
}

export default async function AlertsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  return <ZiteAlertsView locale={locale} />;
}

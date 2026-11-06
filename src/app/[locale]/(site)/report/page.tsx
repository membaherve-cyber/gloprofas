import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { ZiteReportView } from "@/components/zite/report-view";
import { L } from "@/lib/zite-copy";

import { R } from "@/lib/zite-copy";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: R(L.report, locale),
    alternates: {
      canonical: `/${locale}/report`,
      languages: { en: "/en/report", fr: "/fr/report" },
    },
  };
}

export default async function ReportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  return <ZiteReportView locale={locale} />;
}

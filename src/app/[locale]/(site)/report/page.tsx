import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { ZiteReportView } from "@/components/zite/report-view";
import { L, R } from "@/components/zite/copy";
import { buildMetadata, SITE_DESCRIPTION } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata({
    locale,
    path: "/report",
    title: R(L.report, locale),
    description: SITE_DESCRIPTION[locale],
  });
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

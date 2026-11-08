import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { AssistantLauncher } from "@/components/site/assistant-launcher";
import { ZiteHomeView } from "@/components/zite/home-sections";
import { L, R } from "@/components/zite/copy";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { ZITE_CONTENT } from "@/lib/zite-data";
import enMessages from "@/messages/en.json";
import frMessages from "@/messages/fr.json";
import { buildMetadata, SITE_DESCRIPTION } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const msg = locale === "fr" ? frMessages : enMessages;
  return buildMetadata({
    locale,
    path: "",
    title: msg.meta.title,
    description: msg.home.heroC11.valueProposition,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = getDictionary(locale);

  const criticalAlert =
    ZITE_CONTENT.alerts.find((a) => a.risk === "Critical") ??
    ZITE_CONTENT.alerts[0];
  const latestAlert = criticalAlert
    ? {
        title: R(criticalAlert.title, locale),
        href: `/${locale}/alerts`,
      }
    : null;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
      >
        {R(L.skip, locale)}
      </a>
      <SiteHeader locale={locale} dict={dict} latestAlert={latestAlert} />
      <main id="main">
        <ZiteHomeView lang={locale} />
      </main>
      <SiteFooter locale={locale} dict={dict} />
      <AssistantLauncher locale={locale} dict={dict} />
    </>
  );
}

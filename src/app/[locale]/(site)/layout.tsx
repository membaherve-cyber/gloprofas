import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { AssistantLauncher } from "@/components/site/assistant-launcher";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { ZITE_CONTENT } from "@/lib/zite-data";
import { L } from "@/lib/zite-copy";

import { R } from "@/lib/zite-copy";


export const dynamic = "force-dynamic";

export default async function SiteLayout({
  children,
  params,
}: {
  children: ReactNode;
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
      <main id="main">{children}</main>
      <SiteFooter locale={locale} dict={dict} />
      <AssistantLauncher locale={locale} dict={dict} />
    </>
  );
}

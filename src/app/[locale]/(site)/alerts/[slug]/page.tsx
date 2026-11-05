import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n";
import { ZITE_CONTENT, type ZiteAlert } from "@/lib/zite-data";
import {
  Btn,
  formatZiteDate,
  L,
  PageHero,
  R,
  ZiteRiskBadge,
} from "@/components/zite/shared";

import { getAlert } from "@/lib/queries";

async function findAlert(locale: Locale, slugOrId: string): Promise<ZiteAlert | undefined> {
  const list = ZITE_CONTENT.alerts as unknown as ZiteAlert[];
  const found = list.find((a) => a.id === slugOrId || a.categorySlug === slugOrId);
  if (found) return found;
  const dbRow = await getAlert(locale, slugOrId);
  if (!dbRow) return undefined;
  const riskCap = (dbRow.alert.riskLevel.charAt(0).toUpperCase() +
    dbRow.alert.riskLevel.slice(1).toLowerCase()) as ZiteAlert["risk"];
  return {
    id: dbRow.alert.slugEn,
    title: { en: dbRow.alert.titleEn, fr: dbRow.alert.titleFr },
    summary: { en: dbRow.alert.summaryEn, fr: dbRow.alert.summaryFr },
    actions: {
      en: dbRow.alert.actionsEn.join("\n"),
      fr: dbRow.alert.actionsFr.join("\n"),
    },
    categorySlug: dbRow.categorySlugEn ?? "",
    category: {
      en: dbRow.categoryNameEn ?? "Scam alert",
      fr: dbRow.categoryNameFr ?? "Alerte",
    },
    country: dbRow.alert.country,
    risk: ["Low", "Medium", "High", "Critical"].includes(riskCap) ? riskCap : "High",
    date: dbRow.alert.publishedAt.toISOString().slice(0, 10),
    imageUrl: dbRow.alert.imageUrl ?? "",
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const alert = await findAlert(locale, slug);
  if (!alert) return {};
  return {
    title: R(alert.title, locale),
    description: R(alert.summary, locale),
    alternates: {
      canonical: `/${locale}/alerts/${alert.id}`,
      languages: {
        en: `/en/alerts/${alert.id}`,
        fr: `/fr/alerts/${alert.id}`,
      },
    },
  };
}

export default async function AlertDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const fr = locale === "fr";
  const l = (path = "") => `/${locale}${path}`;

  const alert = await findAlert(locale, slug);
  if (!alert) notFound();

  const actions = R(alert.actions, locale)
    .split("\n")
    .filter(Boolean);

  return (
    <>
      <PageHero
        title={R(alert.title, locale)}
        image={alert.imageUrl}
        crumbs={[
          { label: fr ? "Accueil" : "Home", to: l() },
          { label: fr ? "Alertes" : "Alerts", to: l("/alerts") },
          { label: R(alert.category, locale) || "—" },
        ]}
      />

      <section className="section-y bg-mist">
        <div className="container-g grid gap-10 lg:grid-cols-12">
          <article className="rounded-[22px] bg-white p-8 shadow-e1 lg:col-span-8">
            <div className="flex flex-wrap items-center gap-3">
              <ZiteRiskBadge level={alert.risk} lang={locale} />
              <span className="text-sm text-slatex-600">
                {R(alert.category, locale)} · {alert.country} ·{" "}
                {formatZiteDate(alert.date, locale)}
              </span>
            </div>

            <p className="lead mt-6 text-ink">{R(alert.summary, locale)}</p>

            <p className="mt-8 rounded-[14px] bg-mist p-4 text-sm text-slatex-600">
              {fr
                ? "Cette alerte décrit une activité suspecte signalée. Elle n’accuse aucune personne ni entreprise identifiée."
                : "This alert describes reported suspicious activity. It does not accuse any identified person or business."}
            </p>

            {alert.categorySlug ? (
              <div className="mt-8">
                <Btn href={l(`/scams/${alert.categorySlug}`)} variant="outline">
                  {fr
                    ? "Comprendre ce type d’arnaque"
                    : "Understand this scam type"}
                </Btn>
              </div>
            ) : null}
          </article>

          <aside className="lg:col-span-4">
            <div className="on-dark rounded-[22px] bg-navy-900 p-7">
              <h2 className="h4 text-white">
                {fr ? "Actions recommandées" : "Recommended actions"}
              </h2>
              <ul className="mt-5 space-y-3">
                {actions.map((act, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-slatex-300">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyanx" />
                    {act}
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                <Btn href={l("/report")} variant="signal" className="w-full">
                  {R(L.report, locale)}
                </Btn>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

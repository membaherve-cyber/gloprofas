import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n";
import { ZITE_CONTENT, type ZiteAlert } from "@/lib/zite-data";
import { Btn, PageHero, ZiteRiskBadge } from "@/components/zite/shared";
import { formatZiteDate, L, R } from "@/components/zite/copy";

import {
  ALERT_AERIAL_HEROES,
  formatAerialBadge,
  PAGE_AERIAL_HEROES,
} from "@/lib/african-cities";
import { getAlert } from "@/lib/queries";
import { buildMetadata, SITE_DESCRIPTION, articleLd, breadcrumbLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";

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
  return buildMetadata({
    locale,
    path: `/alerts/${alert.id}`,
    title: R(alert.title, locale),
    description: R(alert.summary, locale),
    ogType: "article",
  });
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
  const aerialHero =
    ALERT_AERIAL_HEROES[alert.id] ?? PAGE_AERIAL_HEROES.alertsIndex;

  return (
    <>
      <JsonLd
        data={[
          articleLd({
            headline: R(alert.title, locale),
            description: R(alert.summary, locale),
            path: `/alerts/${alert.id}`,
            locale,
            image: alert.imageUrl,
            datePublished: new Date(alert.date).toISOString(),
          }),
          breadcrumbLd(
            [
              { name: fr ? "Accueil" : "Home", path: "/" },
              { name: fr ? "Alertes" : "Alerts", path: "/alerts" },
              { name: R(alert.title, locale), path: `/alerts/${alert.id}` },
            ],
            locale,
          ),
        ]}
      />
      <PageHero
        title={R(alert.title, locale)}
        image={aerialHero.image}
        cityBadge={formatAerialBadge(aerialHero.city, locale)}
        crumbs={[
          { label: fr ? "Accueil" : "Home", to: l() },
          { label: fr ? "Alertes" : "Alerts", to: l("/alerts") },
          { label: R(alert.category, locale) || "—" },
        ]}
      />

      <section className="section-y bg-mist">
        <div className="container-g grid gap-10 lg:grid-cols-12">
          <article className="overflow-hidden rounded-none bg-white shadow-none lg:col-span-8">
            {alert.imageUrl ? (
              <div className="group relative aspect-[16/9] w-full overflow-hidden bg-navy-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img width={1600} height={900}
                  src={alert.imageUrl}
                  alt={R(alert.title, locale)}
                  className="h-full w-full object-cover transition-transform duration-slow group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/75 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <ZiteRiskBadge level={alert.risk} lang={locale} />
                </div>
              </div>
            ) : null}
            <div className="p-8">
              <div className="flex flex-wrap items-center gap-3">
                <ZiteRiskBadge level={alert.risk} lang={locale} />
                <span className="text-sm text-slatex-600">
                  {R(alert.category, locale)} · {alert.country} ·{" "}
                  {formatZiteDate(alert.date, locale)}
                </span>
              </div>

              <p className="lead mt-6 text-ink">{R(alert.summary, locale)}</p>

            <p className="mt-8 rounded-sm bg-mist p-4 text-sm text-slatex-600">
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
            </div>
          </article>

          <aside className="lg:col-span-4">
            <div className="on-dark rounded-none bg-navy-900 p-7">
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

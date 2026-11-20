"use client";

/**
 * Scam Alerts — risk-classified public warnings with filters + detail view.
 */

import React, { useMemo, useState } from "react";
import { ArrowLeft, Check, ChevronRight, TriangleAlert } from "lucide-react";
import { A } from "@/lib/router";
import { useI18n } from "@/lib/i18n";
import { R, L } from "@/lib/content/copy";
import { ZITE_CONTENT, type ZiteAlert } from "@/lib/content/zite-data";
import {
  Btn,
  EmptyState,
  PageHero,
  Reveal,
  RiskBadge,
  Masthead,
} from "@/components/shared/ui";

const RISKS = ["All", "Critical", "High", "Medium", "Low"] as const;

export function AlertsView() {
  const { locale, formatDate, t } = useI18n();
  const fr = locale === "fr";
  const [risk, setRisk] = useState<string>("All");

  const alerts = useMemo(() => {
    const list = [...ZITE_CONTENT.alerts].sort(
      (a: ZiteAlert, b: ZiteAlert) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    if (risk === "All") return list;
    return list.filter((a: ZiteAlert) => a.risk === risk);
  }, [risk]);

  return (
    <>
      <PageHero
        eyebrow={fr ? "Alertes" : "Alerts"}
        title={t("alerts.h1")}
        lead={t("alerts.lead")}
        image="/images/context/article-payment-pause.jpg"
        imageAlt={fr ? "Paiement interrompu pour vérification" : "Payment paused for verification"}
      />

      <section className="section-y bg-white">
        <div className="container-g">
          {/* Filters */}
          <Reveal>
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label={fr ? "Filtrer par risque" : "Filter by risk"}>
              {RISKS.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRisk(r)}
                  aria-pressed={risk === r}
                  className={`h-10 rounded-full border px-4 font-heading text-[13px] font-semibold transition-colors ${
                    risk === r
                      ? "border-brand-600 bg-brand-600 text-white"
                      : "border-line-200 text-slatex-600 hover:border-brand-500/60 hover:text-brand-600"
                  }`}
                >
                  {r === "All" ? (fr ? "Toutes" : "All") : R((L.risk as Record<string, { en: string; fr: string }>)[r], locale)}
                </button>
              ))}
            </div>
          </Reveal>

          {/* List */}
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {alerts.map((a: ZiteAlert, i: number) => (
              <Reveal key={a.id} delay={(i % 2) * 80}>
                <A href={`/alerts/${a.id}`} className="group block h-full">
                  <article className="card-g hoverable flex h-full flex-col overflow-hidden sm:flex-row">
                    <div className="sm:w-2/5">
                      <img
                        src={a.imageUrl}
                        alt={fr ? "Illustration : scène associée à l'alerte" : "Illustration: scene related to the alert"}
                        width={1200}
                        height={896}
                        loading="lazy"
                        className="img-editorial h-full min-h-[170px] w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <RiskBadge risk={a.risk} />
                        <span className="text-[12px] font-semibold uppercase tracking-wide text-slatex-400">
                          {a.country}
                        </span>
                      </div>
                      <h2 className="mt-2.5 font-heading text-[15.5px] font-semibold leading-snug text-ink-900 group-hover:text-brand-600">
                        {R(a.title, locale)}
                      </h2>
                      <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-slatex-600">
                        {R(a.summary, locale)}
                      </p>
                      <div className="mt-4 flex items-center justify-between text-[12.5px] text-slatex-400">
                        <span>{formatDate(a.date)}</span>
                        <span className="inline-flex items-center gap-1 font-semibold text-brand-600">
                          {fr ? "Lire l'alerte" : "Read alert"}
                          <ChevronRight size={13} aria-hidden />
                        </span>
                      </div>
                    </div>
                  </article>
                </A>
              </Reveal>
            ))}
          </div>

          {alerts.length === 0 ? (
            <div className="mt-8">
              <EmptyState>
                {fr ? "Aucune alerte pour ce niveau de risque." : "No alerts for this risk level."}
              </EmptyState>
            </div>
          ) : null}

          <Reveal delay={140} className="mt-12">
            <div className="rounded-xl border border-line-200 bg-mist-50 px-6 py-5 text-[13px] leading-relaxed text-slatex-600">
              {fr
                ? "Les alertes décrivent des schémas signalés ou des mises en garde publiques. Elles sont classées par niveau de risque et précisent leur portée géographique. Une alerte n'établit pas qu'une arnaque sévit actuellement dans votre région."
                : "Alerts describe reported patterns or public warnings. They are classified by risk level and state their geographic scope. An alert does not establish that a scam is currently active in your area."}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ================= Detail view ================= */

export function AlertDetailView({ id }: { id: string }) {
  const { locale, formatDate, t } = useI18n();
  const fr = locale === "fr";
  const alert = ZITE_CONTENT.alerts.find((a: ZiteAlert) => a.id === id);

  if (!alert) {
    return (
      <section className="bg-white pt-32 pb-24">
        <div className="container-g">
          <EmptyState>
            <div className="space-y-4 text-center">
              <p>{fr ? "Alerte introuvable." : "Alert not found."}</p>
              <Btn href="/alerts" variant="outline">
                <ArrowLeft size={15} aria-hidden />
                {fr ? "Retour aux alertes" : "Back to alerts"}
              </Btn>
            </div>
          </EmptyState>
        </div>
      </section>
    );
  }

  const actions = R(alert.actions, locale).split("\n").filter(Boolean);
  const related = ZITE_CONTENT.alerts.filter((a: ZiteAlert) => a.id !== alert.id).slice(0, 2);
  const guide = ZITE_CONTENT.categories.find(
    (c) => c.slug === alert.categorySlug
  );

  return (
    <>
      <PageHero
        eyebrow={t("alerts.alertType")}
        title={R(alert.title, locale)}
        lead={R(alert.summary, locale)}
        image={alert.imageUrl}
        imageAlt={fr ? "Illustration : scène associée à l'alerte" : "Illustration: scene related to the alert"}
        breadcrumb={[{ label: t("alerts.h1"), href: "/alerts" }, { label: R(alert.category, locale) }]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <RiskBadge risk={alert.risk} className="!bg-white/10" />
          <span className="chip-g border-white/20 bg-white/10 text-white">{alert.country}</span>
          <span className="text-[13px] text-slatex-300">{formatDate(alert.date)}</span>
        </div>
      </PageHero>

      <section className="section-y bg-white">
        <div className="container-g max-w-3xl">
          <Reveal>
            <div className="prose-g">
              <p className="text-[1.05rem] leading-relaxed">{R(alert.summary, locale)}</p>
              <p>
                {fr
                  ? "Cette alerte fait suite à des signalements et à des mises en garde publiques. Les schémas décrits ci-dessous correspondent au mode opératoire observé. Restez attentif et partagez cette information avec votre entourage."
                  : "This alert follows reports and public warnings. The patterns described below match the observed modus operandi. Stay alert and share this information with those around you."}
              </p>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <div className="mt-8">
              <Masthead num="01" eyebrow={t("alerts.recommended")} />
              <ol className="card-g mt-5 divide-y divide-line-200 p-2">
                {actions.map((a, i) => (
                  <li key={i} className="flex items-start gap-4 px-4 py-4">
                    <span className="mast-num text-[14px]">{String(i + 1).padStart(2, "0")}</span>
                    <p className="text-[14px] leading-relaxed text-ink-700">{a}</p>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {guide ? (
                <A href={`/scams/${guide.slug}`} className="group">
                  <div className="card-g hoverable h-full p-5">
                    <p className="eyebrow mb-2">{fr ? "Guide associé" : "Related guide"}</p>
                    <p className="font-heading text-[14.5px] font-semibold text-ink-900 group-hover:text-brand-600">
                      {R(guide.title, locale)}
                    </p>
                    <p className="mt-1.5 text-[13px] text-slatex-600">{R(guide.summary, locale)}</p>
                  </div>
                </A>
              ) : null}
              <div className="card-g p-5">
                <p className="eyebrow mb-2">{fr ? "À faire si concerné" : "If you are affected"}</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-[13px] text-ink-700">
                    <Check size={14} className="mt-1 shrink-0 text-risk-low" aria-hidden />
                    {fr ? "Ne répondez pas et ne payez rien." : "Do not reply and do not pay anything."}
                  </li>
                  <li className="flex items-start gap-2 text-[13px] text-ink-700">
                    <TriangleAlert size={14} className="mt-1 shrink-0 text-risk-medium" aria-hidden />
                    {fr ? "Vérifiez par un canal officiel." : "Verify through an official channel."}
                  </li>
                </ul>
                <div className="mt-4">
                  <Btn href="/report" variant="signal" size="sm">
                    {R(L.report, locale)}
                  </Btn>
                </div>
              </div>
            </div>
          </Reveal>

          {related.length > 0 ? (
            <Reveal delay={200}>
              <div className="mt-10 border-t border-line-200 pt-8">
                <p className="eyebrow mb-4">{fr ? "Autres alertes" : "Other alerts"}</p>
                <ul className="divide-y divide-line-200">
                  {related.map((a: ZiteAlert) => (
                    <li key={a.id}>
                      <A href={`/alerts/${a.id}`} className="group flex items-center gap-4 py-3.5">
                        <RiskBadge risk={a.risk} />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-heading text-[14px] font-semibold text-ink-900 group-hover:text-brand-600">
                            {R(a.title, locale)}
                          </span>
                          <span className="text-[12px] text-slatex-400">{a.country}</span>
                        </span>
                        <ChevronRight size={15} aria-hidden className="text-slatex-400" />
                      </A>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ) : null}
        </div>
      </section>
    </>
  );
}

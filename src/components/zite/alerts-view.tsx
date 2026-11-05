"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import {
  formatZiteDate,
  L,
  PageHero,
  R,
  Reveal,
  ZiteRiskBadge,
} from "@/components/zite/shared";
import { formatAerialBadge, PAGE_AERIAL_HEROES } from "@/lib/african-cities";
import { ZITE_CONTENT, type ZiteAlert, type ZiteCategory } from "@/lib/zite-data";
import type { Locale } from "@/lib/i18n";

const RISKS = ["Critical", "High", "Medium", "Low"] as const;
const fieldCls =
  "h-12 w-full rounded-[14px] border border-line bg-white px-4 text-ink placeholder:text-slatex-600/60 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20";

export function ZiteAlertsView({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const l = (path = "") => `/${locale}${path}`;
  const alerts = ZITE_CONTENT.alerts as unknown as ZiteAlert[];
  const categories = ZITE_CONTENT.categories as unknown as ZiteCategory[];

  const [query, setQuery] = useState("");
  const [risk, setRisk] = useState("");
  const [catSlug, setCatSlug] = useState("");

  const filtered = useMemo(
    () =>
      alerts.filter(
        (a) =>
          (!risk || a.risk === risk) &&
          (!catSlug || a.categorySlug === catSlug) &&
          (!query ||
            `${R(a.title, locale)} ${R(a.summary, locale)} ${a.country}`
              .toLowerCase()
              .includes(query.toLowerCase())),
      ),
    [alerts, query, risk, catSlug, locale],
  );

  const featuredCritical = alerts.find((a) => a.risk === "Critical");

  return (
    <>
      <PageHero
        title={fr ? "Alertes aux arnaques" : "Scam alerts"}
        eyebrow={R(L.nav.news, locale)}
        lead={
          fr
            ? "Activités suspectes signalées, classées par niveau de risque. Les alertes décrivent des signalements et ne constituent pas des accusations."
            : "Reported suspicious activity, classified by risk. Alerts describe reports and are not accusations against any person or business."
        }
        image={PAGE_AERIAL_HEROES.alertsIndex.image}
        cityBadge={formatAerialBadge(PAGE_AERIAL_HEROES.alertsIndex.city, locale)}
        crumbs={[
          { label: fr ? "Accueil" : "Home", to: l() },
          { label: fr ? "Alertes" : "Alerts" },
        ]}
      />

      <section className="section-y bg-mist">
        <div className="container-g">
          {featuredCritical ? (
            <Link
              href={l(`/alerts/${featuredCritical.id}`)}
              className="mb-10 grid overflow-hidden rounded-[22px] bg-white shadow-e2 md:grid-cols-2"
            >
              {featuredCritical.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={featuredCritical.imageUrl}
                  alt=""
                  className="h-full max-h-80 w-full object-cover"
                />
              ) : null}
              <div className="p-8">
                <ZiteRiskBadge level={featuredCritical.risk} lang={locale} />
                <h2 className="h3 mt-4 text-ink">
                  {R(featuredCritical.title, locale)}
                </h2>
                <p className="mt-3 text-slatex-600">
                  {R(featuredCritical.summary, locale)}
                </p>
              </div>
            </Link>
          ) : null}

          <div className="grid gap-3 rounded-[22px] bg-white p-4 shadow-e1 md:grid-cols-[1fr_200px_240px]">
            <label className="relative">
              <span className="sr-only">Search</span>
              <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slatex-600" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={fr ? "Rechercher une alerte…" : "Search alerts…"}
                className={`${fieldCls} pl-10`}
              />
            </label>

            <select
              aria-label="Risk"
              value={risk}
              onChange={(e) => setRisk(e.target.value)}
              className={fieldCls}
            >
              <option value="">
                {fr ? "Tous les risques" : "All risk levels"}
              </option>
              {RISKS.map((r) => (
                <option key={r} value={r}>
                  {R(L.risk[r], locale)}
                </option>
              ))}
            </select>

            <select
              aria-label="Category"
              value={catSlug}
              onChange={(e) => setCatSlug(e.target.value)}
              className={fieldCls}
            >
              <option value="">
                {fr ? "Toutes les catégories" : "All categories"}
              </option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {R(c.title, locale)}
                </option>
              ))}
            </select>
          </div>

          {filtered.length === 0 ? (
            <p className="mt-10 text-center text-slatex-600">
              {fr
                ? "Aucune alerte ne correspond à votre recherche."
                : "No alerts match your search."}
            </p>
          ) : null}

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((a, idx) => (
              <Reveal key={a.id} delay={(idx % 3) * 60}>
                <Link
                  href={l(`/alerts/${a.id}`)}
                  className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-line bg-white shadow-e1 transition-all hover:-translate-y-1 hover:shadow-e2"
                >
                  {a.imageUrl ? (
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-navy-900">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={a.imageUrl}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <ZiteRiskBadge level={a.risk} lang={locale} />
                      </div>
                    </div>
                  ) : null}
                  <div className="flex flex-1 flex-col p-7">
                    {!a.imageUrl ? <ZiteRiskBadge level={a.risk} lang={locale} /> : null}
                    <h2 className="h4 mt-3 text-ink group-hover:text-brand-600">
                      {R(a.title, locale)}
                    </h2>
                    <p className="mt-3 flex-1 text-sm text-slatex-600">
                      {R(a.summary, locale)}
                    </p>
                    <p className="mt-5 border-t border-line pt-4 text-sm text-slatex-600">
                      {R(a.category, locale)} · {a.country} ·{" "}
                      {formatZiteDate(a.date, locale)}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

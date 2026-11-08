"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PageHero, Reveal, ZiteRiskBadge } from "@/components/zite/shared";
import { formatZiteDate, L, R } from "@/components/zite/copy";
import { formatAerialBadge, PAGE_AERIAL_HEROES } from "@/lib/african-cities";
import { ZITE_CONTENT, type ZiteAlert, type ZiteCategory } from "@/lib/zite-data";
import type { Locale } from "@/lib/i18n";

const RISKS = ["Critical", "High", "Medium", "Low"] as const;
const fieldCls =
  "h-11 w-full rounded-[2px] border border-line bg-white px-3.5 text-base text-ink placeholder:text-slatex-600/60 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20";

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
              className="mb-10 grid overflow-hidden rounded-none bg-white shadow-none md:grid-cols-2"
            >
              {featuredCritical.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img width={1600} height={900}
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

          <div className="grid gap-3 rounded-none bg-white p-4 shadow-e1 md:grid-cols-[1fr_200px_240px]">
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

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
            {filtered[0] ? (
              <Reveal className="lg:col-span-6">
                <Link href={l(`/alerts/${filtered[0].id}`)} className="group block">
                  <div className="ed-media ed-media-hover aspect-[16/10]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img width={1600} height={1000} src={filtered[0].imageUrl} alt="" loading="lazy" />
                  </div>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <ZiteRiskBadge level={filtered[0].risk} lang={locale} />
                    <span className="text-micro uppercase tracking-[0.14em] text-slatex-600">
                      {filtered[0].country} · {formatZiteDate(filtered[0].date, locale)}
                    </span>
                  </div>
                  <h2 className="h3 mt-3 max-w-[28ch] text-ink">
                    <span className="ed-link">{R(filtered[0].title, locale)}</span>
                  </h2>
                  <p className="mt-3 max-w-[54ch] text-body leading-relaxed text-slatex-600">
                    {R(filtered[0].summary, locale)}
                  </p>
                </Link>
              </Reveal>
            ) : null}

            <div className="lg:col-span-6">
              <div className="ed-list">
                {filtered.slice(1).map((a) => (
                  <Link key={a.id} href={l(`/alerts/${a.id}`)} className="ed-item group">
                    <div className="flex flex-wrap items-center gap-3">
                      <ZiteRiskBadge level={a.risk} lang={locale} />
                      <span className="text-micro uppercase tracking-[0.14em] text-slatex-600">
                        {R(a.category, locale)} · {a.country} · {formatZiteDate(a.date, locale)}
                      </span>
                    </div>
                    <h2 className="h4 mt-2.5 text-ink">
                      <span className="ed-link">{R(a.title, locale)}</span>
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-slatex-600">
                      {R(a.summary, locale)}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

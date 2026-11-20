"use client";

/**
 * Reporting Channels — the international directory of official scam and
 * cybercrime reporting authorities (all continents, Africa first), the country
 * detail view and the "What to Do If You Have Been Scammed" action guide.
 */

import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  ChevronRight,
  CircleHelp,
  Clock,
  ExternalLink,
  Globe,
  Mail,
  MapPin,
  Phone,
  Search,
  ShieldCheck,
  Siren,
} from "lucide-react";
import { A } from "@/lib/router";
import { useI18n } from "@/lib/i18n";
import { R } from "@/lib/content/copy";
import { VICTIM_GUIDE } from "@/lib/content/resource-centre";
import { Btn, PageHero, Reveal, SectionHeading } from "@/components/shared/ui";
import {
  LoadError,
  agencyRoleLabel,
  continentLabel,
  fraudTypeLabel,
  useApiData,
  type CountryFullDTO,
  type CountrySummaryDTO,
} from "./resources-parts";

const CONTINENTS = [
  "africa",
  "europe",
  "north-america",
  "south-america",
  "asia",
  "middle-east",
  "oceania",
] as const;

const FRAUD_TYPES = [
  "online-scams",
  "financial-fraud",
  "mobile-money",
  "bank-transfer",
  "identity-theft",
  "phishing",
  "crypto",
  "investment",
  "romance",
  "shopping",
  "cybercrime",
  "bec",
  "impersonation",
  "child-exploitation",
] as const;

const STATUS_LABEL = {
  verified: { en: "Verified", fr: "Vérifié" },
  "pending-verification": { en: "Pending verification", fr: "Vérification en cours" },
  "requires-review": { en: "Requires review", fr: "À réexaminer" },
  outdated: { en: "Outdated", fr: "Obsolète" },
} as const;

function flag(code: string): string {
  return String.fromCodePoint(...[...code.toUpperCase()].map((c) => 127397 + c.charCodeAt(0)));
}

/* ------------------------------------------------------------------ */
/* Directory landing                                                   */
/* ------------------------------------------------------------------ */

export function DirectoryView() {
  const { locale, formatDate } = useI18n();
  const fr = locale === "fr";
  const [continent, setContinent] = useState<string>("all");
  const [fraud, setFraud] = useState<string>("all");
  const [q, setQ] = useState("");
  const [query, setQuery] = useState("");
  const [helpMode, setHelpMode] = useState(() =>
    typeof window !== "undefined" ? window.location.hash.includes("help=1") : false
  );

  const { data, error, loading, retry } = useApiData<{ countries: CountrySummaryDTO[] }>(
    `/api/resources/directory?summary=1${continent !== "all" ? `&continent=${continent}` : ""}${fraud !== "all" ? `&handles=${fraud}` : ""}${query ? `&q=${encodeURIComponent(query)}` : ""}`
  );

  useEffect(() => {
    const t = setTimeout(() => setQuery(q.trim().toLowerCase()), 280);
    return () => clearTimeout(t);
  }, [q]);

  useEffect(() => {
    document.title = `${fr ? "Où signaler arnaques et cybercriminalité" : "Where to Report Scams and Cybercrime"} · GLOPROFAS`;
  }, [fr]);

  const countries = useMemo(() => data?.countries ?? [], [data]);
  const grouped = useMemo(() => {
    const map = new Map<string, CountrySummaryDTO[]>();
    for (const c of countries) {
      const list = map.get(c.continent) ?? [];
      list.push(c);
      map.set(c.continent, list);
    }
    return [...map.entries()].sort((a, b) => {
      const order = CONTINENTS.indexOf(a[0] as (typeof CONTINENTS)[number]);
      const orderB = CONTINENTS.indexOf(b[0] as (typeof CONTINENTS)[number]);
      return order - orderB;
    });
  }, [countries]);

  return (
    <>
      <PageHero
        eyebrow={fr ? "Canaux de signalement" : "Reporting channels"}
        title={fr ? "Où signaler arnaques et cybercriminalité." : "Where to report scams and cybercrime."}
        lead={
          fr
            ? "Les canaux officiels varient selon le pays et le type de fraude. Cet annuaire international référence les autorités compétentes — police, unités cybercriminalité, CERT, protection des consommateurs et régulateurs financiers — avec leurs liens officiels et leurs rôles."
            : "Official channels differ by country and fraud type. This international directory lists the competent authorities — police, cybercrime units, CERTs, consumer protection and financial regulators — with their official links and their roles."
        }
        image="/images/gen/reporting-directory.jpg"
        imageAlt={fr ? "Personne prenant des notes lors d’un appel officiel à son bureau" : "Person taking notes during an official call at a desk"}
        breadcrumb={[{ label: fr ? "Centre de ressources" : "Resource Centre", href: "/resources" }, { label: fr ? "Canaux de signalement" : "Reporting channels" }]}
      >
        <div className="mt-2 flex flex-wrap gap-3">
          <Btn href="/report" variant="signal" size="sm">
            <Siren size={14} aria-hidden />
            {fr ? "Signaler à GLOPROFAS" : "Report to GLOPROFAS"}
          </Btn>
          <Btn href="/resources/reporting-channels/victim-guide" variant="outlineDark" size="sm">
            {fr ? "Guide d’urgence pour victimes" : "Victim emergency guide"}
          </Btn>
        </div>
      </PageHero>

      <section className="section-y bg-white">
        <div className="container-g">
          {/* Help mode banner */}
          {helpMode ? (
            <Reveal>
              <div className="card-g mb-8 border-signal-300/60 bg-signal-100/40 p-6">
                <h2 className="flex items-center gap-2.5 font-heading text-[16px] font-bold text-ink-900">
                  <CircleHelp size={19} className="text-signal-600" aria-hidden />
                  {fr ? "Je ne sais pas où signaler mon arnaque" : "I don’t know where to report my scam"}
                </h2>
                <p className="mt-2.5 max-w-2xl text-[13.5px] leading-relaxed text-slatex-600">
                  {fr
                    ? "Deux questions suffisent : 1) sélectionnez le type de problème ci-dessous ; 2) choisissez votre pays dans la liste qui s’affiche. Si aucune autorité en ligne n’existe encore pour votre pays, la fiche indique l’alternative officielle vérifiée (police nationale ou portail gouvernemental)."
                    : "Two questions are enough: 1) select the type of problem below; 2) choose your country from the filtered list. If no online authority exists yet for your country, the country card gives the verified official alternative (national police or government portal)."}
                </p>
              </div>
            </Reveal>
          ) : null}

          {/* Filters */}
          <Reveal>
            <form role="search" onSubmit={(e) => e.preventDefault()} className="relative max-w-xl">
              <label htmlFor="dir-search" className="sr-only">
                {fr ? "Rechercher un pays ou une agence" : "Search a country or agency"}
              </label>
              <Search size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slatex-400" aria-hidden />
              <input
                id="dir-search"
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                maxLength={80}
                placeholder={fr ? "Pays (ex. Cameroun) ou agence (ex. EFCC)…" : "Country (e.g. Cameroon) or agency (e.g. EFCC)…"}
                className="field-g !h-12 !pl-11"
              />
            </form>
          </Reveal>

          <Reveal className="mt-5">
            <div className="flex flex-wrap gap-2" role="group" aria-label={fr ? "Filtrer par continent" : "Filter by continent"}>
              <button
                type="button"
                onClick={() => setContinent("all")}
                aria-pressed={continent === "all"}
                className={`h-10 rounded-full border px-4 font-heading text-[13px] font-semibold transition-colors ${
                  continent === "all" ? "border-brand-600 bg-brand-600 text-white" : "border-line-200 text-slatex-600 hover:border-brand-500/60 hover:text-brand-600"
                }`}
              >
                <Globe size={13} className="mr-1.5 inline" aria-hidden />
                {fr ? "Tous les continents" : "All continents"}
              </button>
              {CONTINENTS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setContinent(c)}
                  aria-pressed={continent === c}
                  className={`h-10 rounded-full border px-4 font-heading text-[13px] font-semibold transition-colors ${
                    continent === c ? "border-brand-600 bg-brand-600 text-white" : "border-line-200 text-slatex-600 hover:border-brand-500/60 hover:text-brand-600"
                  }`}
                >
                  {continentLabel(c, locale)}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-4">
            <div className="flex flex-wrap gap-2" role="group" aria-label={fr ? "Filtrer par type de fraude" : "Filter by fraud type"}>
              <button
                type="button"
                onClick={() => setFraud("all")}
                aria-pressed={fraud === "all"}
                className={`h-9 rounded-full border px-3.5 text-[12.5px] font-semibold transition-colors ${
                  fraud === "all" ? "border-navy-950 bg-navy-950 text-white" : "border-line-200 text-slatex-600 hover:border-navy-950/50 hover:text-navy-950"
                }`}
              >
                {fr ? "Tous les types d’incident" : "All incident types"}
              </button>
              {FRAUD_TYPES.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFraud(f)}
                  aria-pressed={fraud === f}
                  className={`h-9 rounded-full border px-3.5 text-[12.5px] font-semibold transition-colors ${
                    fraud === f ? "border-navy-950 bg-navy-950 text-white" : "border-line-200 text-slatex-600 hover:border-navy-950/50 hover:text-navy-950"
                  }`}
                >
                  {fraudTypeLabel(f, locale)}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Results */}
          <div className="mt-9">
            {loading ? (
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4" aria-busy>
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="h-[62px] animate-pulse rounded-xl bg-line-200/40" />
                ))}
              </div>
            ) : error ? (
              <LoadError onRetry={retry} />
            ) : countries.length === 0 ? (
              <p className="text-[14px] text-slatex-600">
                {fr ? "Aucun pays ne correspond à ces filtres." : "No country matches these filters."}
              </p>
            ) : (
              <div className="space-y-10">
                {grouped.map(([cont, list]) => (
                  <div key={cont}>
                    <Reveal>
                      <h2 className="mb-4 flex items-center gap-3 font-heading text-[16px] font-bold text-ink-900">
                        {continentLabel(cont, locale)}
                        <span className="text-[12.5px] font-medium text-slatex-400">{list.length}</span>
                        <span className="h-px flex-1 bg-line-200" aria-hidden />
                      </h2>
                    </Reveal>
                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
                      {list.map((c, i) => (
                        <Reveal key={c.code} delay={Math.min(i, 10) * 30}>
                          <A href={`/resources/reporting-channels/${c.code}`} className="group block">
                            <span className="card-g hoverable flex items-center gap-3 px-4 py-3.5">
                              <span aria-hidden className="text-[22px] leading-none">{flag(c.code)}</span>
                              <span className="min-w-0 flex-1">
                                <span className="block truncate font-heading text-[13.5px] font-semibold text-ink-900">
                                  {locale === "fr" ? c.nameFr : c.name}
                                </span>
                                <span className="mt-0.5 flex items-center gap-1 text-[11px] text-slatex-400">
                                  {c.agencyCount} {fr ? "autorités" : "authorities"}
                                  {c.status === "verified" ? (
                                    <BadgeCheck size={11} className="text-risk-low" aria-hidden />
                                  ) : null}
                                </span>
                              </span>
                              <ChevronRight size={15} className="shrink-0 text-slatex-300 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-600" aria-hidden />
                            </span>
                          </A>
                        </Reveal>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Reveal className="mt-12">
            <div className="card-g bg-mist-30 p-6">
              <h2 className="flex items-center gap-2.5 font-heading text-[15px] font-bold text-ink-900">
                <ShieldCheck size={17} className="text-brand-600" aria-hidden />
                {fr ? "Comment cet annuaire est vérifié" : "How this directory is verified"}
              </h2>
              <p className="mt-2.5 max-w-3xl text-[13.5px] leading-relaxed text-slatex-600">
                {fr
                  ? "Toutes les informations d’agence sont rapprochées de sources officielles : sites de police nationale, portails gouvernementaux, CERT nationaux, régulateurs financiers et autorités de protection des consommateurs. Seuls les canaux officiels vérifiés apparaissent comme destinations de signalement confirmées ; la date de dernière vérification est affichée publiquement. INTERPOL et Europol coordonnent des enquêtes internationales mais n’acceptent pas les plaintes individuelles : elles ne figurent donc pas comme destinations de signalement."
                  : "All agency information is checked against official sources: national police websites, government portals, national CERTs, financial regulators and consumer protection authorities. Only verified official channels appear as confirmed reporting destinations; the last verification date is displayed publicly. INTERPOL and Europol coordinate international investigations but do not accept individual complaints, so they are not listed as reporting destinations."}
              </p>
              <p className="mt-3 flex items-center gap-1.5 text-[12.5px] text-slatex-500">
                <Clock size={13} aria-hidden />
                {fr ? "Dernière passe de vérification" : "Last verification pass"}: {formatDate("2026-11-20")}
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Country detail                                                      */
/* ------------------------------------------------------------------ */

export function CountryDetailView({ code }: { code: string }) {
  const { locale, formatDate } = useI18n();
  const fr = locale === "fr";
  const { data, error, loading, retry } = useApiData<{ country: CountryFullDTO; neighbours: { code: string; name: string; nameFr: string }[] }>(
    `/api/resources/directory/${encodeURIComponent(code)}`
  );

  const c = data?.country;

  useEffect(() => {
    if (c) document.title = `${fr ? c.nameFr : c.name} · ${fr ? "Canaux de signalement" : "Reporting channels"} · GLOPROFAS`;
  }, [c, fr]);

  return (
    <>
      <PageHero
        eyebrow={c ? `${continentLabel(c.continent, locale)} · ${fr ? "Canaux de signalement" : "Reporting channels"}` : "…"}
        title={c ? `${flag(c.code)}  ${locale === "fr" ? c.nameFr : c.name}` : "…"}
        lead={
          c
            ? fr
              ? `Autorités officielles compétentes pour signaler arnaques et cybercriminalité : ${c.agencies.length} ${c.agencies.length > 1 ? "autorités référencées" : "autorité référencée"}${c.emergency ? ` · urgence ${c.emergency}` : ""}.`
              : `Official authorities for reporting scams and cybercrime: ${c.agencies.length} listed ${c.agencies.length > 1 ? "authorities" : "authority"}${c.emergency ? ` · emergency ${c.emergency}` : ""}.`
            : undefined
        }
        image="/images/gen/reporting-directory.jpg"
        imageAlt={c ? (locale === "fr" ? c.nameFr : c.name) : ""}
        breadcrumb={[
          { label: fr ? "Centre de ressources" : "Resource Centre", href: "/resources" },
          { label: fr ? "Canaux de signalement" : "Reporting channels", href: "/resources/reporting-channels" },
          { label: c ? (locale === "fr" ? c.nameFr : c.name) : code },
        ]}
      >
        {c ? (
          <div className="flex flex-wrap items-center gap-3 text-[13px]">
            <span className={`chip-g ${c.status === "verified" ? "bg-[#159769]/15 text-[#0d6e4a]" : "bg-signal-100 text-signal-600"}`}>
              {c.status === "verified" ? <BadgeCheck size={13} aria-hidden /> : <Clock size={13} aria-hidden />}
              {R(STATUS_LABEL[c.status as keyof typeof STATUS_LABEL] ?? STATUS_LABEL["pending-verification"], locale)}
            </span>
            <span className="text-slatex-300">
              {fr ? "Vérifié le" : "Verified on"} {formatDate(c.lastVerified)}
            </span>
          </div>
        ) : null}
      </PageHero>

      <section className="section-y bg-white">
        <div className="container-g max-w-4xl">
          <Reveal>
            <A href="/resources/reporting-channels" className="link-g !text-[13px]">
              <ArrowLeft size={14} strokeWidth={2.2} aria-hidden />
              {fr ? "Tous les pays" : "All countries"}
            </A>
          </Reveal>

          {loading ? (
            <div className="mt-8 space-y-4" aria-busy>
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-32 animate-pulse rounded-2xl bg-line-200/40" />
              ))}
            </div>
          ) : error || !c ? (
            <div className="mt-8">
              <LoadError onRetry={retry} />
              <p className="mt-4 text-center text-[13px] text-slatex-500">
                {fr ? "Ce pays n’est pas encore dans l’annuaire." : "This country is not yet in the directory."}
              </p>
            </div>
          ) : (
            <div className="mt-8">
              {/* Emergency + physical */}
              <div className="grid gap-4 sm:grid-cols-2">
                {c.emergency ? (
                  <div className="rounded-xl border border-[#d23434]/30 bg-[#d23434]/[0.05] p-5">
                    <p className="flex items-center gap-2 font-heading text-[13px] font-bold uppercase tracking-wide text-[#a52222]">
                      <Phone size={14} aria-hidden />
                      {fr ? "Urgence police" : "Police emergency"}
                    </p>
                    <p className="mt-1.5 font-heading text-[24px] font-bold text-ink-900">{c.emergency}</p>
                  </div>
                ) : null}
                {c.physicalReporting ? (
                  <div className="rounded-xl border border-line-200 bg-mist-30 p-5">
                    <p className="flex items-center gap-2 font-heading text-[13px] font-bold uppercase tracking-wide text-slatex-500">
                      <MapPin size={14} aria-hidden />
                      {fr ? "Signalement en personne" : "In-person reporting"}
                    </p>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-slatex-600">{R(c.physicalReporting, locale)}</p>
                  </div>
                ) : null}
              </div>

              {/* Agencies */}
              <div className="mt-8 space-y-4">
                {c.agencies.map((a, i) => (
                  <Reveal key={i} delay={Math.min(i, 6) * 50}>
                    <article className="card-g p-6">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0">
                          <span className="chip-g bg-mist-50 text-slatex-600">{agencyRoleLabel(a.role, locale)}</span>
                          <h2 className="mt-2.5 font-heading text-[16px] font-bold leading-snug text-ink-900">{a.name}</h2>
                        </div>
                        {a.reportingUrl ? (
                          <a href={a.reportingUrl} target="_blank" rel="noopener noreferrer" className="btn-g btn-primary-g btn-sm-g shrink-0">
                            <Siren size={13} aria-hidden />
                            {fr ? "Signaler en ligne" : "Report online"}
                            <ExternalLink size={11} aria-hidden />
                          </a>
                        ) : null}
                      </div>

                      {a.note ? (
                        <p className="mt-3 rounded-lg bg-mist-30 px-4 py-2.5 text-[13px] leading-relaxed text-slatex-600">
                          {R(a.note, locale)}
                        </p>
                      ) : null}

                      <dl className="mt-4 grid gap-x-6 gap-y-3 text-[13.5px] sm:grid-cols-2">
                        <div>
                          <dt className="text-[12px] font-semibold uppercase tracking-wide text-slatex-400">{fr ? "Site officiel" : "Official website"}</dt>
                          <dd className="mt-0.5">
                            <a href={a.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-medium text-brand-600 hover:underline">
                              {a.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                              <ExternalLink size={11} aria-hidden />
                            </a>
                          </dd>
                        </div>
                        {a.phone ? (
                          <div>
                            <dt className="text-[12px] font-semibold uppercase tracking-wide text-slatex-400">{fr ? "Téléphone" : "Phone"}</dt>
                            <dd className="mt-0.5 font-medium text-ink-900">{a.phone}</dd>
                          </div>
                        ) : null}
                        {a.email ? (
                          <div>
                            <dt className="text-[12px] font-semibold uppercase tracking-wide text-slatex-400">{fr ? "Courriel" : "Email"}</dt>
                            <dd className="mt-0.5">
                              <a href={`mailto:${a.email}`} className="inline-flex items-center gap-1.5 font-medium text-brand-600 hover:underline">
                                <Mail size={12} aria-hidden />
                                {a.email}
                              </a>
                            </dd>
                          </div>
                        ) : null}
                        <div className="sm:col-span-2">
                          <dt className="text-[12px] font-semibold uppercase tracking-wide text-slatex-400">{fr ? "Types d’incidents pris en charge" : "Incident types handled"}</dt>
                          <dd className="mt-1.5 flex flex-wrap gap-1.5">
                            {a.handles.map((h) => (
                              <span key={h} className="chip-g bg-brand-50 text-brand-600">{fraudTypeLabel(h, locale)}</span>
                            ))}
                          </dd>
                        </div>
                      </dl>
                    </article>
                  </Reveal>
                ))}
              </div>

              {/* Distinguish responsibilities */}
              <Reveal className="mt-8">
                <div className="card-g bg-mist-30 p-5">
                  <p className="text-[13px] leading-relaxed text-slatex-600">
                    <ShieldCheck size={14} className="mr-1.5 inline text-brand-600" aria-hidden />
                    {fr
                      ? "Distinguez les rôles : un CERT national reçoit les signalements d’incidents techniques (hameçonnage, compromission) mais n’enquête pas sur la fraude financière ; la police et les unités cybercriminalité traitent les plaintes pénales ; les autorités de protection des consommateurs traitent les litiges ; les régulateurs financiers supervisent les établissements. En cas de doute, commencez par la police et votre banque."
                      : "Distinguish the roles: a national CERT receives technical incident reports (phishing, compromise) but does not investigate financial fraud; police and cybercrime units handle criminal complaints; consumer protection authorities handle disputes; financial regulators supervise institutions. When in doubt, start with the police and your bank."}
                  </p>
                </div>
              </Reveal>

              {/* Sources */}
              {c.sources.length > 0 ? (
                <div className="mt-6">
                  <h3 className="eyebrow mb-3">{fr ? "Sources officielles" : "Official sources"}</h3>
                  <ul className="space-y-1.5">
                    {c.sources.map((s, i) => (
                      <li key={i}>
                        <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-brand-600 hover:underline">
                          <ExternalLink size={11} aria-hidden />
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {/* Neighbours */}
              {data?.neighbours && data.neighbours.length > 0 ? (
                <div className="mt-10">
                  <h3 className="eyebrow mb-4">{fr ? "Pays voisins" : "Nearby countries"}</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.neighbours.map((n) => (
                      <A key={n.code} href={`/resources/reporting-channels/${n.code}`} className="chip-g hover:border-brand-400 hover:text-brand-600">
                        {flag(n.code)} {locale === "fr" ? n.nameFr : n.name}
                        <ChevronRight size={11} aria-hidden />
                      </A>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Victim action guide                                                 */
/* ------------------------------------------------------------------ */

export function VictimGuideView() {
  const { locale } = useI18n();
  const fr = locale === "fr";

  useEffect(() => {
    document.title = `${fr ? "Que faire si vous avez été victime d’une arnaque" : "What to Do If You Have Been Scammed"} · GLOPROFAS`;
  }, [fr]);

  return (
    <>
      <PageHero
        eyebrow={fr ? "Guide d’action" : "Action guide"}
        title={R(VICTIM_GUIDE.title, locale)}
        lead={R(VICTIM_GUIDE.intro, locale)}
        image="/images/gen/victim-guide.jpg"
        imageAlt={fr ? "Personne appelant calmement sa banque le matin, carnet à portée de main" : "Person calmly calling their bank in the morning, notebook at hand"}
        breadcrumb={[
          { label: fr ? "Centre de ressources" : "Resource Centre", href: "/resources" },
          { label: fr ? "Canaux de signalement" : "Reporting channels", href: "/resources/reporting-channels" },
          { label: R(VICTIM_GUIDE.title, locale) },
        ]}
      >
        <div className="mt-2 flex flex-wrap gap-3">
          <Btn href="/report" variant="signal" size="sm">
            <Siren size={14} aria-hidden />
            {fr ? "Signaler à GLOPROFAS" : "Report to GLOPROFAS"}
          </Btn>
          <Btn href="/resources/scam-checker" variant="outlineDark" size="sm">
            {fr ? "Vérifier un message suspect" : "Check a suspicious message"}
          </Btn>
        </div>
      </PageHero>

      <section className="section-y bg-white">
        <div className="container-g max-w-3xl">
          <div className="space-y-6">
            {VICTIM_GUIDE.steps.map((step, i) => (
              <Reveal key={step.t.en} delay={i * 60}>
                <article className="card-g p-6 lg:p-7">
                  <div className="flex items-start gap-5">
                    <span className="mast-num flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-950 text-[18px] font-bold text-white">
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h2 className="font-heading text-[17px] font-bold leading-snug text-ink-900">{R(step.t, locale)}</h2>
                      <ul className="mt-4 space-y-2.5">
                        {step.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-ink-700">
                            <ArrowRight size={14} className="mt-1.5 shrink-0 text-brand-600" aria-hidden />
                            {R(item, locale)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10">
            <div className="on-dark rounded-2xl bg-navy-950 p-7 sm:p-8">
              <SectionHeading
                dark
                eyebrow={fr ? "Ensuite" : "Next steps"}
                title={fr ? "Vous n’êtes pas seul." : "You are not alone."}
              />
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <A href="/victim-support" className="card-dark-g p-5">
                  <ShieldCheck size={20} className="text-cyanx-500" aria-hidden />
                  <p className="mt-3 font-heading text-[14.5px] font-semibold text-white">
                    {fr ? "Soutien aux victimes" : "Victim support"}
                  </p>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-slatex-300">
                    {fr ? "Ressources respectueuses pour les personnes, familles et entreprises." : "Dignified resources for people, families and businesses."}
                  </p>
                </A>
                <A href="/resources/reporting-channels" className="card-dark-g p-5">
                  <Globe size={20} className="text-cyanx-500" aria-hidden />
                  <p className="mt-3 font-heading text-[14.5px] font-semibold text-white">
                    {fr ? "Autorités par pays" : "Authorities by country"}
                  </p>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-slatex-300">
                    {fr ? "Tous les continents, autorités vérifiées et liens officiels." : "Every continent, verified authorities and official links."}
                  </p>
                </A>
                <A href="/checklists/after-being-scammed-en.pdf" className="card-dark-g p-5">
                  <Siren size={20} className="text-cyanx-500" aria-hidden />
                  <p className="mt-3 font-heading text-[14.5px] font-semibold text-white">
                    {fr ? "Liste d’urgence à imprimer" : "Printable emergency checklist"}
                  </p>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-slatex-300">
                    {fr ? "Les bons réflexes, à garder à portée de main." : "The right reflexes, ready to keep at hand."}
                  </p>
                </A>
              </div>
              <p className="mt-6 text-[12.5px] italic leading-relaxed text-slatex-400">
                {fr
                  ? "GLOPROFAS n’est pas une autorité de police et ne peut pas geler des comptes ou récupérer des fonds à votre place. Un signalement à GLOPROFAS complète la plainte officielle ; il ne la remplace pas."
                  : "GLOPROFAS is not a law-enforcement authority and cannot freeze accounts or recover funds on your behalf. A report to GLOPROFAS complements the official complaint; it does not replace it."}
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

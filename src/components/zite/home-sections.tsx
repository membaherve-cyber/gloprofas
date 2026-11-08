"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Check,
  CheckCircle2,
  ChevronDown,
  Database,
  Info,
  LoaderCircle,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react";
import { Btn, Reveal, SectionHeading, ZiteRiskBadge } from "@/components/zite/shared";
import { formatZiteDate, getCategoryIcon, L, R } from "@/components/zite/copy";
import { ScamInterceptionDiagram } from "@/components/zite/editorial-graphics";
import {
  ZITE_CONTENT,
  type ZiteAlert,
  type ZiteArticle,
  type ZiteCategory,
  type ZiteResource,
} from "@/lib/zite-data";
import enMessages from "@/messages/en.json";
import frMessages from "@/messages/fr.json";
import type { Locale } from "@/lib/i18n";

const PILLAR_ICONS: Record<string, LucideIcon> = {
  "database-check": Database,
  "community-reporting": ShieldAlert,
  "secure-analytics": BarChart3,
};

const PILLAR_IMAGES: Record<string, string> = {
  "database-check": "/images/context/person-phone-desk.jpg",
  "community-reporting": "/images/context/notebook-smartphone-notes.jpg",
  "secure-analytics": "/images/context/person-finance-phone.jpg",
};

const HOW_STEP_IMAGES = [
  "/images/context/accra-outdoor-phone.jpg",
  "/images/context/person-phone-desk.jpg",
  "/images/context/contactless-card-terminal.jpg",
  "/images/context/currency-exchange-desk.jpg",
] as const;

/** Section masthead: index numeral + label + hairline rule. */
function Masthead({
  index,
  label,
  dark = false,
}: {
  index: string;
  label: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`mb-10 flex items-baseline justify-between gap-4 border-b pb-3 ${
        dark ? "border-white/15" : "border-line"
      }`}
    >
      <span className="flex items-baseline gap-3">
        <span className={`ed-num text-sm ${dark ? "text-cyanx" : ""}`}>{index}</span>
        <span className="ed-label">{label}</span>
      </span>
      <span
        aria-hidden="true"
        className={`hidden font-mono text-micro uppercase tracking-[0.2em] sm:block ${
          dark ? "text-white/30" : "text-slate-600/50"
        }`}
      >
        GLOPROFAS
      </span>
    </div>
  );
}

function Technique({ title, body }: { title: string; body: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/12">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
      >
        <span className="font-[family-name:var(--font-heading)] text-body font-medium text-white">
          {title}
        </span>
        <ChevronDown
          aria-hidden="true"
          className={`h-4 w-4 shrink-0 text-cyanx transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          strokeWidth={1.5}
        />
      </button>
      {open ? (
        <p className="pb-4 pr-8 text-sm leading-relaxed text-slatex-300">{body}</p>
      ) : null}
    </div>
  );
}

export function ZiteHomeView({
  lang,
  categories = ZITE_CONTENT.categories as unknown as ZiteCategory[],
  alerts = ZITE_CONTENT.alerts as unknown as ZiteAlert[],
  articles = ZITE_CONTENT.articles as unknown as ZiteArticle[],
  resources = ZITE_CONTENT.resources as unknown as ZiteResource[],
  stats = ZITE_CONTENT.stats,
}: {
  lang: Locale;
  categories?: ZiteCategory[];
  alerts?: ZiteAlert[];
  articles?: ZiteArticle[];
  resources?: ZiteResource[];
  stats?: { categories: number; resources: number; languages: number };
}) {
  const fr = lang === "fr";
  const l = (path = "") => `/${lang}${path}`;
  const msg = fr ? frMessages : enMessages;
  const heroC11 = msg.home.heroC11;
  const pillarsC12 = msg.home.pillarsC12;
  const featuredCats = categories.filter((c) => c.featured);
  const otherCats = categories.filter((c) => !c.featured);
  const [featuredRes, ...otherRes] = resources;
  const [leadAlert, ...restAlerts] = alerts;
  const [leadPillar, ...restPillars] = pillarsC12.items;

  const [nlState, setNlState] = useState({
    name: "",
    email: "",
    country: "",
    language: lang.toUpperCase(),
    consent: false,
    website: "",
  });
  const [nlErrors, setNlErrors] = useState<Record<string, string>>({});
  const [nlStatus, setNlStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleNewsletterSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!nlState.name.trim()) errs.name = R(L.nl.required, lang);
    if (!/^\S+@\S+\.\S+$/.test(nlState.email.trim()))
      errs.email = R(L.nl.invalidEmail, lang);
    if (!nlState.country.trim()) errs.country = R(L.nl.required, lang);
    if (!nlState.consent) errs.consent = R(L.nl.consentReq, lang);
    if (Object.keys(errs).length > 0) {
      setNlErrors(errs);
      return;
    }
    setNlErrors({});
    setNlStatus("loading");
    try {
      const fd = new FormData();
      fd.set("name", nlState.name);
      fd.set("email", nlState.email);
      fd.set("country", nlState.country);
      fd.set("language", nlState.language.toLowerCase());
      fd.set("consent", "on");
      const { subscribeNewsletter } = await import("@/actions/public");
      await subscribeNewsletter(lang, { status: "idle" }, fd);
      setNlStatus("done");
    } catch {
      setNlStatus("error");
    }
  }

  const cases = [
    {
      scope: fr ? "Cameroun · Afrique centrale" : "Cameroon · Central Africa",
      category: fr ? "Fraude au mobile money" : "Mobile money fraud",
      image: "/images/context/contactless-card-terminal.jpg",
      title: fr
        ? "Faux SMS de dépôt et appel pressant de « remboursement »"
        : "Fake deposit SMS followed by an urgent reversal call",
      body: fr
        ? "Une commerçante reçoit un SMS imitant une notification de dépôt de 50 000 FCFA depuis un numéro ordinaire, suivi d’un appel lui demandant de renvoyer la somme d’urgence."
        : "A shopkeeper receives an SMS from an ordinary number mimicking a 50,000 FCFA deposit notification, followed immediately by a caller pleading for an urgent return transfer.",
      lesson: fr
        ? "Vérifiez toujours le solde réel dans le menu officiel de l’opérateur et ne partagez jamais votre code PIN."
        : "Always check your actual balance in the official operator menu and never share your PIN.",
      href: "/scams/mobile-money-scams",
    },
    {
      scope: fr ? "Afrique de l’Ouest" : "West Africa",
      category: fr ? "Fausses offres d’emploi" : "Employment scams",
      image: "/images/context/person-phone-desk.jpg",
      title: fr
        ? "Recrutement par messagerie exigeant des frais de dossier"
        : "Messaging-app recruitment demanding upfront fees",
      body: fr
        ? "Un candidat reçoit une promesse d’embauche après un simple échange écrit, conditionnée au paiement préalable de frais de formation par mobile money."
        : "A job seeker is offered a role after a text-only chat, conditional on paying upfront training fees via mobile transfer.",
      lesson: fr
        ? "Un employeur légitime ne demande jamais d’argent avant l’embauche."
        : "Legitimate employers never charge fees to hire you.",
      href: "/scams/employment-scams",
    },
    {
      scope: fr ? "International" : "International",
      category: fr ? "Compromission de facture" : "Invoice redirection",
      image: "/images/context/executive-phone-laptop.jpg",
      title: fr
        ? "Changement de coordonnées bancaires d’un fournisseur"
        : "Supplier bank details changed from a lookalike domain",
      body: fr
        ? "Une PME reçoit une facture attendue depuis une adresse quasi identique à celle de son fournisseur, annonçant un nouveau RIB pour un règlement urgent."
        : "An SME receives an expected invoice from a domain differing by one letter, requesting urgent payment to a new account.",
      lesson: fr
        ? "Confirmez tout changement de compte par un contre-appel sur un numéro déjà vérifié."
        : "Confirm every account change by calling back on a trusted number already on file.",
      href: "/scams/business-email-compromise",
    },
  ];

  return (
    <>
      {/* ── 01 · HERO — existing identity preserved ───────────────── */}
      <section className="on-dark relative isolate overflow-hidden bg-navy-900 pt-[112px] lg:pt-[148px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/zite/img_0jR_JgYMybEsisEl.jpg"
          alt=""
          width={1632}
          height={912}
          fetchPriority="high"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[70%_center]"
          style={{ filter: "saturate(0.88) contrast(1.05)" }}
        />
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(96deg, rgba(4,9,20,0.93) 0%, rgba(6,14,32,0.78) 48%, rgba(6,14,32,0.42) 100%)",
          }}
        />
        <div className="container-g grid items-end gap-12 pb-16 lg:grid-cols-12 lg:pb-24">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="ed-label text-cyanx">{heroC11.eyebrow}</p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="h1 mt-5 max-w-[18ch] text-white">{heroC11.title}</h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-[52ch] border-l-2 border-cyanx pl-4 text-base font-medium leading-relaxed text-white/90">
                {heroC11.valueProposition}
              </p>
            </Reveal>
            <Reveal delay={220}>
              <p className="ed-deck mt-5">{heroC11.lead}</p>
            </Reveal>
            <Reveal delay={280} className="mt-9 flex flex-wrap gap-3">
              <Btn href={l("/report")} variant="signal">
                {heroC11.reportCta}
              </Btn>
              <Btn href={l("/check")} variant="outlineDark">
                {heroC11.verifyCta}
              </Btn>
            </Reveal>
          </div>

          <div className="hidden lg:col-span-5 lg:block">
            <div className="border-t border-white/20 pt-4">
              <p className="ed-label mb-3 text-white/50">
                {fr ? "Schémas documentés" : "Documented patterns"}
              </p>
              <ul>
                {featuredCats.slice(0, 4).map((cat, idx) => (
                  <li key={cat.id} className="border-b border-white/12">
                    <Link
                      href={l(`/scams/${cat.slug}`)}
                      className="group flex items-baseline gap-3 py-2.5 text-sm text-white/85 transition-colors hover:text-white"
                    >
                      <span className="ed-num text-xs text-cyanx">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="ed-link">{R(cat.title, lang)}</span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="ml-auto h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-70"
                        strokeWidth={1.5}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02 · VERIFICATION STRIP ───────────────────────────────── */}
      <section className="on-dark border-y border-white/12 bg-navy-950">
        <div className="container-g flex flex-col items-start justify-between gap-4 py-6 md:flex-row md:items-center">
          <p className="font-[family-name:var(--font-heading)] text-lg font-medium text-white md:text-xl">
            {R(L.strip.text, lang)}
          </p>
          <Link
            href={l("/check")}
            className="ed-link inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-cyanx"
          >
            {R(L.strip.cta, lang)}
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* ── 03 · PILLARS — asymmetric lead + ruled entries ────────── */}
      <section id="verification-pillars" className="section-y scroll-mt-28 bg-white">
        <div className="container-g">
          <Masthead
            index="01"
            label={fr ? "Architecture de protection" : "Protection architecture"}
          />
          <SectionHeading
            eyebrow={pillarsC12.eyebrow}
            title={pillarsC12.h2}
            lead={pillarsC12.lead}
          />

          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Lead pillar: large editorial figure */}
            {leadPillar ? (
              <Reveal className="lg:col-span-7">
                <article>
                  <div className="ed-media ed-media-hover aspect-[16/10]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img width={1600} height={1000}
                      src={PILLAR_IMAGES[leadPillar.id]}
                      alt={leadPillar.title}
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-6 flex items-start gap-4">
                    <span className="ed-num pt-1 text-2xl">01</span>
                    <div>
                      <h3 className="h3 text-ink">{leadPillar.title}</h3>
                      <p className="mt-3 max-w-[54ch] text-body leading-relaxed text-slatex-600">
                        {leadPillar.description}
                      </p>
                      <ul className="mt-5 space-y-2">
                        {leadPillar.highlights.map((h) => (
                          <li key={h} className="flex gap-2.5 text-sm text-ink">
                            <Check
                              aria-hidden="true"
                              className="mt-1 h-3.5 w-3.5 shrink-0 text-brand-600"
                              strokeWidth={1.5}
                            />
                            {h}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={l(leadPillar.href)}
                        className="ed-link mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600"
                      >
                        {leadPillar.cta}
                        <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ) : null}

            {/* Supporting pillars: ruled list, no cards */}
            <div className="lg:col-span-5">
              <div className="ed-list">
                {restPillars.map((pillar, idx) => {
                  const Icon = PILLAR_ICONS[pillar.id] ?? ShieldAlert;
                  return (
                    <Reveal key={pillar.id} delay={idx * 70}>
                      <article className="ed-item">
                        <div className="flex items-baseline gap-3">
                          <span className="ed-num text-lg">
                            {String(idx + 2).padStart(2, "0")}
                          </span>
                          <Icon
                            aria-hidden="true"
                            className="h-4 w-4 shrink-0 translate-y-0.5 text-brand-600"
                            strokeWidth={1.5}
                          />
                          <h3 className="h4 text-ink">{pillar.title}</h3>
                        </div>
                        <p className="mt-2.5 pl-9 text-sm leading-relaxed text-slatex-600">
                          {pillar.description}
                        </p>
                        <Link
                          href={l(pillar.href)}
                          className="ed-link ml-9 mt-3.5 inline-flex items-center gap-1.5 text-small font-semibold text-brand-600"
                        >
                          {pillar.cta}
                          <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
                        </Link>
                      </article>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 04 · ABOUT — portrait crop + ruled manifesto ──────────── */}
      <section id="about" className="section-y scroll-mt-28 bg-mist">
        <div className="container-g">
          <Masthead index="02" label={fr ? "Le programme" : "The programme"} />
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <div className="ed-media ed-media-hover aspect-[4/5]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img width={1000} height={1250}
                  src="/images/context/lagos-lecture-hall.jpg"
                  alt={fr ? "Séminaire de sensibilisation" : "Awareness seminar"}
                  loading="lazy"
                />
              </div>
              <p className="ed-caption">
                {fr
                  ? "Sensibilisation en salle — écoles, universités et communautés."
                  : "In-person awareness — schools, universities and communities."}
              </p>
            </Reveal>

            <div className="lg:col-span-7">
              <Reveal>
                <h2 className="h2 max-w-[22ch] text-ink">{R(L.intro.h2, lang)}</h2>
                <p className="ed-deck mt-6">{R(L.intro.body, lang)}</p>
              </Reveal>
              <div className="ed-list mt-8">
                {L.intro.points.map((pt, idx) => (
                  <Reveal key={idx} delay={idx * 50}>
                    <div className="ed-item flex items-baseline gap-4 !py-3.5">
                      <span className="ed-num text-xs">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="text-body font-medium text-ink">
                        {R(pt, lang)}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <Btn href={l("/about")} variant="primary" size="sm">
                  {fr ? "À propos de GLOPROFAS" : "About GLOPROFAS"}
                </Btn>
                <span className="flex items-baseline gap-2">
                  <span className="ed-num text-2xl">{stats.categories}</span>
                  <span className="text-xs text-slatex-600">{R(L.intro.anchor, lang)}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 05 · SCAM INDEX — feature + numbered index ────────────── */}
      <section id="scams" className="section-y scroll-mt-28 bg-white">
        <div className="container-g">
          <Masthead index="03" label={fr ? "Bibliothèque des arnaques" : "Scam library"} />
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow={R(L.scams.eyebrow, lang)}
              title={R(L.scams.h2, lang)}
              lead={R(L.scams.lead, lang)}
            />
            <Link
              href={l("/scams")}
              className="ed-link hidden shrink-0 items-center gap-2 pb-1 text-sm font-semibold text-brand-600 lg:inline-flex"
            >
              {fr ? "Index complet" : "Full index"}
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Lead category — full-bleed editorial figure */}
            {featuredCats[0] ? (
              <Reveal className="lg:col-span-5">
                <Link href={l(`/scams/${featuredCats[0].slug}`)} className="group block">
                  <div className="ed-media ed-media-hover aspect-[4/5]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img width={1000} height={1250}
                      src={featuredCats[0].imageUrl}
                      alt={R(featuredCats[0].title, lang)}
                      loading="lazy"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/92 to-transparent p-6 pt-16">
                      <span className="ed-label text-cyanx">
                        {fr ? "À la une" : "In focus"}
                      </span>
                      <h3 className="h3 mt-2 text-white">
                        {R(featuredCats[0].title, lang)}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slatex-600">
                    {R(featuredCats[0].summary, lang)}
                  </p>
                </Link>
              </Reveal>
            ) : null}

            {/* Remaining categories — two-column ruled index */}
            <div className="lg:col-span-7">
              <div className="grid gap-x-10 sm:grid-cols-2">
 {[...featuredCats.slice(1), ...otherCats].map((cat, idx) => {
                  const Icon = getCategoryIcon(cat.icon);
                  return (
                    <Link
                      key={cat.id}
                      href={l(`/scams/${cat.slug}`)}
                      className="group flex items-start gap-3 border-b border-line py-3.5 transition-colors hover:border-brand-600"
                    >
                      <span className="ed-num pt-0.5 text-micro">
                        {String(idx + 2).padStart(2, "0")}
                      </span>
                      <Icon
                        aria-hidden="true"
                        className="mt-0.5 h-4 w-4 shrink-0 text-slatex-600 transition-colors group-hover:text-brand-600"
                        strokeWidth={1.5}
                      />
                      <span className="text-base font-medium leading-snug text-ink">
                        {R(cat.title, lang)}
                      </span>
                    </Link>
                  );
                })}
              </div>
              <Link
                href={l("/scams")}
                className="ed-link mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 lg:hidden"
              >
                {fr ? "Index complet" : "Full index"}
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 06 · ANATOMY — process + schematic ────────────────────── */}
      <section id="how" className="on-dark section-y scroll-mt-28 bg-navy-950">
        <div className="container-g">
          <Masthead
            index="04"
            dark
            label={fr ? "Anatomie d’une arnaque" : "Anatomy of a scam"}
          />
          <SectionHeading dark eyebrow={R(L.how.eyebrow, lang)} title={R(L.how.h2, lang)} />

          <ol className="mt-12 grid gap-px border border-white/12 bg-white/12 sm:grid-cols-2 lg:grid-cols-4">
            {L.how.steps.map((step, idx) => (
              <li key={idx} className="bg-navy-950 p-6">
                <div className="ed-media aspect-[3/2]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img width={1500} height={1000} src={HOW_STEP_IMAGES[idx]} alt="" loading="lazy" />
                </div>
                <span className="ed-num mt-5 block text-3xl text-cyanx">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-[family-name:var(--font-heading)] text-base font-semibold text-white">
                  {R(step.t, lang)}
                </h3>
                <p className="mt-2 text-small leading-relaxed text-slatex-300">
                  {R(step.d, lang)}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-12">
            <ScamInterceptionDiagram lang={lang} />
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-12">
            <h3 className="h4 text-white lg:col-span-4">{R(L.how.techTitle, lang)}</h3>
            <div className="grid gap-x-10 border-t border-white/12 md:grid-cols-2 lg:col-span-8">
              {L.how.techniques.map((tech, idx) => (
                <Technique key={idx} title={R(tech.t, lang)} body={R(tech.d, lang)} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 07 · FIGURES — ruled data band ────────────────────────── */}
      <section className="on-dark border-y border-white/12 bg-navy-900">
        <div className="container-g py-12">
          <p className="ed-label mb-8 text-white/45">{R(L.stats.eyebrow, lang)}</p>
          <dl className="grid gap-8 sm:grid-cols-3">
            {[
              { v: stats.categories, k: R(L.stats.categories, lang) },
              { v: stats.resources, k: R(L.stats.resources, lang) },
              { v: stats.languages, k: R(L.stats.languages, lang) },
            ].map((s, i) => (
              <div key={i} className="border-l border-white/20 pl-5">
                <dt className="sr-only">{s.k}</dt>
                <dd>
                  <span className="block font-[family-name:var(--font-heading)] text-4xl font-medium tabular-nums tracking-tight text-white md:text-5xl">
                    {s.v}
                  </span>
                  <span className="mt-2 block text-sm text-slatex-300">{s.k}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── 08 · REPORT — image + ruled protocol ──────────────────── */}
      <section id="report" className="section-y scroll-mt-28 bg-white">
        <div className="container-g">
          <Masthead index="05" label={fr ? "Signalement confidentiel" : "Confidential reporting"} />
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow={R(L.reportSec.eyebrow, lang)}
                title={R(L.reportSec.h2, lang)}
                lead={R(L.reportSec.body, lang)}
              />
              <div className="ed-media ed-media-hover mt-8 aspect-[16/9]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img width={1600} height={900} src="/images/market-cash.jpg" alt="" loading="lazy" />
              </div>
              <div className="mt-6 flex gap-3 border-l-2 border-signal bg-signal/[0.07] p-4">
                <Info
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-ink"
                  strokeWidth={1.5}
                />
                <p className="text-small leading-relaxed text-ink">
                  {R(L.reportSec.note, lang)}
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="ed-panel-dark p-7 sm:p-9">
                <p className="ed-label text-cyanx">
                  {fr ? "Protocole de signalement" : "Reporting protocol"}
                </p>
                <ol className="mt-6">
                  {L.reportSec.steps.map((step, idx) => (
                    <li
                      key={idx}
                      className="flex gap-4 border-b border-white/12 py-4 last:border-b-0"
                    >
                      <span className="ed-num text-lg text-cyanx">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-[family-name:var(--font-heading)] text-body font-semibold text-white">
                          {R(step.t, lang)}
                        </h3>
                        <p className="mt-1 text-small leading-relaxed text-slatex-300">
                          {R(step.d, lang)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="mt-7 border-t border-white/12 pt-6">
                  <Btn href={l("/report")} variant="signal" className="w-full sm:w-auto">
                    {R(L.report, lang)}
                  </Btn>
                  <p className="mt-4 text-caption leading-relaxed text-white/45">
                    {fr
                      ? "Aucun mot de passe, code PIN ou code à usage unique n’est jamais demandé."
                      : "We never ask for passwords, PINs or one-time codes."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 09 · RESOURCES — feature + ruled list ─────────────────── */}
      {featuredRes ? (
        <section id="resources" className="section-y scroll-mt-28 bg-mist">
          <div className="container-g">
            <Masthead index="06" label={fr ? "Ressources" : "Resources"} />
            <SectionHeading eyebrow={R(L.res.eyebrow, lang)} title={R(L.res.h2, lang)} />
            <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
              <Reveal className="lg:col-span-7">
                <article>
                  <div className="ed-media ed-media-hover aspect-[16/9]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img width={1600} height={900} src={featuredRes.imageUrl} alt="" loading="lazy" />
                  </div>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <span className="border-l-2 border-brand-600 pl-2 text-micro font-bold uppercase tracking-[0.14em] text-brand-600">
                      {R(L.res.featured, lang)}
                    </span>
                    <span className="text-micro uppercase tracking-[0.14em] text-slatex-600">
                      {featuredRes.type} · {featuredRes.language}
                    </span>
                  </div>
                  <h3 className="h3 mt-3 max-w-[26ch] text-ink">
                    {R(featuredRes.title, lang)}
                  </h3>
                  <p className="mt-3 max-w-[56ch] text-body leading-relaxed text-slatex-600">
                    {R(featuredRes.description, lang)}
                  </p>
                </article>
              </Reveal>

              <div className="lg:col-span-5">
                <div className="ed-list">
                  {otherRes.map((res) => (
                    <Link
                      key={res.id}
                      href={l("/resources")}
                      className="ed-item group"
                    >
                      <span className="text-micro font-bold uppercase tracking-[0.16em] text-brand-600">
                        {res.type} · {res.language}
                      </span>
                      <h4 className="mt-1.5 font-[family-name:var(--font-heading)] text-body font-medium leading-snug text-ink">
                        <span className="ed-link">{R(res.title, lang)}</span>
                      </h4>
                    </Link>
                  ))}
                </div>
                <Link
                  href={l("/resources")}
                  className="ed-link mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600"
                >
                  {R(L.final.resources, lang)}
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* ── 10 · SERVICES — split, full-bleed ─────────────────────── */}
      <section id="services" className="section-y scroll-mt-28 bg-white">
        <div className="container-g">
          <Masthead index="07" label={fr ? "Domaines d’intervention" : "Areas of work"} />
          <SectionHeading eyebrow={R(L.services.eyebrow, lang)} title={R(L.services.h2, lang)} />
          <div className="mt-12 grid gap-px border border-line bg-line lg:grid-cols-2">
            <article className="bg-white">
              <div className="ed-media ed-media-hover aspect-[2/1]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img width={1600} height={800}
                  src="/images/context/lagos-lecture-hall.jpg"
                  alt={R(L.services.freeTitle, lang)}
                  loading="lazy"
                />
              </div>
              <div className="p-7 sm:p-9">
                <span className="border-l-2 border-risk-low pl-2 text-micro font-bold uppercase tracking-[0.14em] text-risk-low">
                  {R(L.services.freeTag, lang)}
                </span>
                <h3 className="h3 mt-3 text-ink">{R(L.services.freeTitle, lang)}</h3>
                <ul className="mt-5 space-y-2.5">
                  {L.services.free.map((item, idx) => (
                    <li key={idx} className="flex gap-2.5 text-sm text-slatex-600">
                      <Check
                        aria-hidden="true"
                        className="mt-1 h-3.5 w-3.5 shrink-0 text-risk-low"
                        strokeWidth={1.5}
                      />
                      {R(item, lang)}
                    </li>
                  ))}
                </ul>
                <Link
                  href={l("/resources")}
                  className="ed-link mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-600"
                >
                  {R(L.services.freeCta, lang)}
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                </Link>
              </div>
            </article>

            <article className="on-dark bg-navy-950">
              <div className="ed-media ed-media-hover aspect-[2/1]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img width={1600} height={800}
                  src="/images/context/team-laptops-office.jpg"
                  alt={R(L.services.paidTitle, lang)}
                  loading="lazy"
                />
              </div>
              <div className="p-7 sm:p-9">
                <span className="border-l-2 border-signal pl-2 text-micro font-bold uppercase tracking-[0.14em] text-signal">
                  {R(L.services.paidTag, lang)}
                </span>
                <h3 className="h3 mt-3 text-white">{R(L.services.paidTitle, lang)}</h3>
                <ul className="mt-5 space-y-2.5">
                  {L.services.paid.map((item, idx) => (
                    <li key={idx} className="flex gap-2.5 text-sm text-slatex-300">
                      <Check
                        aria-hidden="true"
                        className="mt-1 h-3.5 w-3.5 shrink-0 text-cyanx"
                        strokeWidth={1.5}
                      />
                      {R(item, lang)}
                    </li>
                  ))}
                </ul>
                <Link
                  href={l("/services")}
                  className="ed-link mt-7 inline-flex items-center gap-2 text-sm font-semibold text-cyanx"
                >
                  {R(L.services.paidCta, lang)}
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ── 11 · ALERTS — lead story + ruled briefs ───────────────── */}
      <section id="news" className="section-y scroll-mt-28 bg-mist">
        <div className="container-g">
          <Masthead index="08" label={fr ? "Alertes & analyses" : "Alerts & analysis"} />
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow={R(L.newsSec.eyebrow, lang)} title={R(L.newsSec.h2, lang)} />
            <Link
              href={l("/alerts")}
              className="ed-link hidden shrink-0 items-center gap-2 pb-1 text-sm font-semibold text-brand-600 lg:inline-flex"
            >
              {fr ? "Toutes les alertes" : "All alerts"}
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>

          {alerts.length === 0 ? (
            <p className="mt-10 text-slatex-600">{R(L.newsSec.empty, lang)}</p>
          ) : (
            <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
              {leadAlert ? (
                <Reveal className="lg:col-span-6">
                  <Link href={l(`/alerts/${leadAlert.id}`)} className="group block">
                    <div className="ed-media ed-media-hover aspect-[16/10]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img width={1600} height={1000} src={leadAlert.imageUrl} alt="" loading="lazy" />
                    </div>
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      <ZiteRiskBadge level={leadAlert.risk} lang={lang} />
                      <span className="text-micro uppercase tracking-[0.14em] text-slatex-600">
                        {leadAlert.country} · {formatZiteDate(leadAlert.date, lang)}
                      </span>
                    </div>
                    <h3 className="h3 mt-3 max-w-[28ch] text-ink">
                      <span className="ed-link">{R(leadAlert.title, lang)}</span>
                    </h3>
                    <p className="mt-3 max-w-[54ch] text-body leading-relaxed text-slatex-600">
                      {R(leadAlert.summary, lang)}
                    </p>
                  </Link>
                </Reveal>
              ) : null}

              <div className="lg:col-span-6">
                <div className="ed-list">
                  {restAlerts.map((a) => (
                    <Link key={a.id} href={l(`/alerts/${a.id}`)} className="ed-item group">
                      <div className="flex flex-wrap items-center gap-3">
                        <ZiteRiskBadge level={a.risk} lang={lang} />
                        <span className="text-micro uppercase tracking-[0.14em] text-slatex-600">
                          {a.country} · {formatZiteDate(a.date, lang)}
                        </span>
                      </div>
                      <h4 className="h4 mt-2.5 text-ink">
                        <span className="ed-link">{R(a.title, lang)}</span>
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-slatex-600">
                        {R(a.summary, lang)}
                      </p>
                    </Link>
                  ))}
                </div>

                {articles.length > 0 ? (
                  <>
                    <p className="ed-label mt-9 mb-3">{R(L.newsSec.news, lang)}</p>
                    <div className="ed-list">
                      {articles.slice(0, 3).map((art) => (
                        <Link
                          key={art.id}
                          href={l(`/news/${art.id}`)}
                          className="ed-item group flex items-start gap-4 !py-3.5"
                        >
                          <div className="ed-media h-16 w-24 shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img width={1600} height={900} src={art.imageUrl} alt="" loading="lazy" />
                          </div>
                          <div className="min-w-0">
                            <span className="text-micro font-bold uppercase tracking-[0.16em] text-brand-600">
                              {R(art.tag, lang)}
                            </span>
                            <h4 className="mt-1 font-[family-name:var(--font-heading)] text-base font-medium leading-snug text-ink">
                              <span className="ed-link">{R(art.title, lang)}</span>
                            </h4>
                            <span className="mt-1 block text-caption text-slatex-600">
                              {formatZiteDate(art.date, lang)}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── 12 · CASE FILES — asymmetric dossier ──────────────────── */}
      <section id="case-studies" className="section-y scroll-mt-28 bg-white">
        <div className="container-g">
          <Masthead index="09" label={fr ? "Dossiers documentés" : "Case files"} />
          <SectionHeading
            eyebrow={fr ? "Études de cas & aide aux victimes" : "Case studies & victim support"}
            title={
              fr
                ? "Schémas réels observés en Afrique et dans le monde."
                : "Real-world patterns observed across Africa and globally."
            }
            lead={
              fr
                ? "Chaque dossier illustre des mécanismes de fraude documentés par les avis publics aux consommateurs, sans accusation non vérifiée."
                : "Each file illustrates fraud mechanics documented in public consumer-protection advisories, without unverified allegations."
            }
          />

          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-7">
              <article>
                <div className="ed-media ed-media-hover aspect-[16/9]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img width={1600} height={900} src={cases[0].image} alt={cases[0].title} loading="lazy" />
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <span className="border-l-2 border-brand-600 pl-2 text-micro font-bold uppercase tracking-[0.14em] text-brand-600">
                    {cases[0].scope}
                  </span>
                  <span className="text-micro uppercase tracking-[0.14em] text-slatex-600">
                    {cases[0].category}
                  </span>
                </div>
                <h3 className="h3 mt-3 max-w-[30ch] text-ink">{cases[0].title}</h3>
                <p className="mt-3 max-w-[58ch] text-body leading-relaxed text-slatex-600">
                  {cases[0].body}
                </p>
                <div className="mt-5 border-l-2 border-signal bg-signal/[0.07] p-4">
                  <span className="ed-label block text-ink">
                    {fr ? "Leçon clé" : "Key takeaway"}
                  </span>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink">{cases[0].lesson}</p>
                </div>
                <Link
                  href={l(cases[0].href)}
                  className="ed-link mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-600"
                >
                  {fr ? "Lire le guide de prévention" : "Read prevention guide"}
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                </Link>
              </article>
            </Reveal>

            <div className="lg:col-span-5">
              <div className="ed-list">
                {cases.slice(1).map((cs) => (
                  <article key={cs.title} className="ed-item">
                    <span className="text-micro font-bold uppercase tracking-[0.16em] text-brand-600">
                      {cs.scope} · {cs.category}
                    </span>
                    <h4 className="h4 mt-2 text-ink">{cs.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-slatex-600">{cs.body}</p>
                    <p className="mt-3 border-t border-line pt-3 text-small leading-relaxed text-ink">
                      <strong className="font-semibold">
                        {fr ? "Leçon : " : "Takeaway: "}
                      </strong>
                      {cs.lesson}
                    </p>
                    <Link
                      href={l(cs.href)}
                      className="ed-link mt-3 inline-flex items-center gap-1.5 text-small font-semibold text-brand-600"
                    >
                      {fr ? "Guide de prévention" : "Prevention guide"}
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 13 · BRIEFING — editorial subscription ────────────────── */}
      <section id="newsletter" className="on-dark section-y scroll-mt-28 bg-navy-950">
        <div className="container-g">
          <Masthead index="10" dark label={fr ? "Restez informé" : "Stay informed"} />
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="h2 max-w-[20ch] text-white">{R(L.nl.h2, lang)}</h2>
              <p className="ed-deck mt-5">{R(L.nl.body, lang)}</p>

              <div className="mt-9 border-t border-white/15 pt-7">
                <p className="ed-label text-signal">
                  {fr ? "Vous avez été touché ?" : "Already affected?"}
                </p>
                <p className="mt-3 text-body leading-relaxed text-slatex-300">
                  {fr
                    ? "Signalez un numéro, un SMS ou une demande de paiement suspecte. Aucun compte requis, réponse de référence immédiate."
                    : "Report a suspicious number, SMS or payment request. No account needed, immediate reference issued."}
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Btn href={l("/report")} variant="signal" size="sm">
                    {R(L.report, lang)}
                  </Btn>
                  <Btn href={l("/check")} variant="outlineDark" size="sm">
                    {fr ? "Vérifier un message" : "Verify a message"}
                  </Btn>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              {nlStatus === "done" ? (
                <div
                  role="status"
                  className="flex items-start gap-4 border-l-2 border-cyanx bg-white/[0.04] p-7"
                >
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-0.5 h-6 w-6 shrink-0 text-cyanx"
                    strokeWidth={1.5}
                  />
                  <p className="text-base font-medium text-white">{R(L.nl.done, lang)}</p>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} noValidate>
                  <div className="border-b border-white/15 pb-3">
                    <span className="ed-label text-white/50">
                      {fr ? "Inscription au bulletin" : "Briefing subscription"}
                    </span>
                  </div>
                  <input
                    type="text"
                    name="website"
                    value={nlState.website}
                    onChange={(e) => setNlState({ ...nlState, website: e.target.value })}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />
                  <div className="mt-7 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                    {[
                      { id: "nl-name", key: "name" as const, label: R(L.nl.name, lang), type: "text", auto: "name", ph: fr ? "Votre nom" : "Your name" },
                      { id: "nl-email", key: "email" as const, label: R(L.nl.email, lang), type: "email", auto: "email", ph: "name@example.com" },
                      { id: "nl-country", key: "country" as const, label: R(L.nl.country, lang), type: "text", auto: "country-name", ph: fr ? "Cameroun" : "Cameroon" },
                    ].map((f) => (
                      <div key={f.id}>
                        <label htmlFor={f.id} className="ed-label block text-white/60">
                          {f.label}
                        </label>
                        <input
                          id={f.id}
                          type={f.type}
                          autoComplete={f.auto}
                          placeholder={f.ph}
                          className="ed-field mt-1.5"
                          value={nlState[f.key]}
                          onChange={(e) => setNlState({ ...nlState, [f.key]: e.target.value })}
                          aria-invalid={Boolean(nlErrors[f.key])}
                        />
                        {nlErrors[f.key] ? (
                          <p className="mt-1.5 flex items-center gap-1.5 text-caption text-signal">
                            <AlertCircle className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
                            {nlErrors[f.key]}
                          </p>
                        ) : null}
                      </div>
                    ))}
                    <div>
                      <label htmlFor="nl-lang" className="ed-label block text-white/60">
                        {R(L.nl.language, lang)}
                      </label>
                      <select
                        id="nl-lang"
                        className="ed-field mt-1.5"
                        value={nlState.language}
                        onChange={(e) => setNlState({ ...nlState, language: e.target.value })}
                      >
                        <option value="EN">English</option>
                        <option value="FR">Français</option>
                      </select>
                    </div>
                  </div>

                  <label className="mt-7 flex items-start gap-3 border-t border-white/15 pt-6 text-small leading-relaxed text-slatex-300">
                    <input
                      type="checkbox"
                      checked={nlState.consent}
                      onChange={(e) => setNlState({ ...nlState, consent: e.target.checked })}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-brand-500"
                    />
                    <span>
                      {R(L.nl.consent, lang)}
                      {nlErrors.consent ? (
                        <span className="mt-1.5 flex items-center gap-1.5 text-caption text-signal">
                          <AlertCircle className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
                          {nlErrors.consent}
                        </span>
                      ) : null}
                    </span>
                  </label>

                  <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <button
                      type="submit"
                      disabled={nlStatus === "loading"}
                      className="btn btn-primary"
                    >
                      {nlStatus === "loading" ? (
                        <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
                      ) : null}
                      {R(L.nl.submit, lang)}
                    </button>
                    <span className="text-caption text-white/40">
                      {fr
                        ? "Vos données ne sont jamais vendues."
                        : "We never sell or share your email."}
                    </span>
                    {nlStatus === "error" ? (
                      <p role="alert" className="w-full text-sm text-signal">
                        {R(L.nl.err, lang)}
                      </p>
                    ) : null}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── 14 · CLOSING ──────────────────────────────────────────── */}
      <section className="on-dark border-t border-white/12 bg-navy-900 py-16">
        <div className="container-g flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <h2 className="h2 max-w-[24ch] text-white">{R(L.final.h2, lang)}</h2>
          <div className="flex flex-wrap gap-3">
            <Btn href={l("/report")} variant="signal">
              {R(L.report, lang)}
            </Btn>
            <Btn href={l("/contact")} variant="outlineDark">
              {R(L.final.contact, lang)}
            </Btn>
          </div>
        </div>
      </section>
    </>
  );
}

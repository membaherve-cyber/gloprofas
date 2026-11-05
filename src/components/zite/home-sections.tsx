"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  ArrowUpRight,
  BarChart3,
  Check,
  CheckCircle2,
  ChevronDown,
  Database,
  Download,
  FileText,
  Info,
  LoaderCircle,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react";
import { Monogram } from "@/components/ui/logo";
import {
  Btn,
  formatZiteDate,
  getCategoryIcon,
  IconTile,
  ImageSlot,
  L,
  R,
  Reveal,
  SectionHeading,
  ZiteRiskBadge,
} from "@/components/zite/shared";
import { ZITE_CONTENT, type ZiteAlert, type ZiteArticle, type ZiteCategory, type ZiteResource } from "@/lib/zite-data";
import enMessages from "@/messages/en.json";
import frMessages from "@/messages/fr.json";
import type { Locale } from "@/lib/i18n";

const PILLAR_ICONS: Record<string, LucideIcon> = {
  "database-check": Database,
  "community-reporting": ShieldAlert,
  "secure-analytics": BarChart3,
};

const HOW_STEP_IMAGES = [
  "/images/zite/img_Sr6t0DpFam9Pwbqs.jpg",
  "/images/zite/img_oA0HSqR_wTZ4p6wO.jpg",
  "/images/zite/img_w6NSryT8uOdtulEw.jpg",
  "/images/zite/img_sXyrGNS5SrsTeXa7.jpg",
] as const;

const CHIP_POSITIONS = [
  "top-[6%] left-[8%]",
  "top-[30%] right-[4%]",
  "bottom-[30%] left-[0%]",
  "bottom-[8%] right-[14%]",
] as const;

function TechniqueItem({ title, body }: { title: string; body: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-5 text-left font-[family-name:var(--font-heading)] text-lg font-semibold text-white"
      >
        {title}
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-cyanx transition-transform duration-250 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open ? <p className="pb-5 text-slatex-300">{body}</p> : null}
    </div>
  );
}

function ZiteCounter({ value, label }: { value: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVal(value);
      return;
    }
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      obs.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / 1200);
        setVal(Math.round(value * (1 - (1 - p) ** 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="border-l border-white/15 pl-6">
      <p className="font-[family-name:var(--font-heading)] text-5xl font-bold tabular-nums text-white md:text-6xl">
        {val}
      </p>
      <p className="mt-2 font-medium text-slatex-300">{label}</p>
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
  const l = (path = "") => `/${lang}${path}`;
  const msg = lang === "fr" ? frMessages : enMessages;
  const heroC11 = msg.home.heroC11;
  const pillarsC12 = msg.home.pillarsC12;
  const h1Words = heroC11.title.split(" ");
  const featuredCats = categories.filter((c) => c.featured);
  const otherCats = categories.filter((c) => !c.featured);
  const [featuredRes, ...otherRes] = resources;

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

  const inputCls =
    "h-12 w-full rounded-[14px] border border-white/20 bg-white/10 px-4 text-white placeholder:text-slatex-300/60 focus:border-cyanx focus:outline-none";

  return (
    <>
      {/* 1. Hero (HomeTop.tsx) */}
      <section className="on-dark relative isolate overflow-hidden bg-navy-900 pt-[112px] lg:pt-[152px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/zite/img_0jR_JgYMybEsisEl.jpg"
          alt=""
          width={1632}
          height={912}
          fetchPriority="high"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[70%_center]"
        />
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(90deg, rgba(5, 11, 26, 0.85), rgba(10, 22, 49, 0.55))",
          }}
        />
        <div className="container-g grid items-center gap-12 pb-20 lg:grid-cols-12 lg:pb-32">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="mb-5 inline-flex flex-wrap items-center gap-3 rounded-xl border border-white/15 bg-navy-950/75 p-2 pr-4 backdrop-blur-sm">
                <span className="inline-flex items-center rounded-lg bg-white px-2.5 py-1 shadow-xs">
                  <Image
                    src="/images/gloprofas-logo.png"
                    alt={heroC11.logoAlt}
                    width={1132}
                    height={350}
                    priority
                    className="h-9 w-auto object-contain"
                  />
                </span>
                <span className="text-xs font-semibold tracking-wide text-slatex-300">
                  {heroC11.badge}
                </span>
              </div>
            </Reveal>
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-cyanx">
                <span className="h-px w-8 bg-cyanx" />
                {heroC11.eyebrow}
              </p>
            </Reveal>
            <h1 className="h1 mt-6 text-white">
              {h1Words.map((word, idx) => (
                <Reveal
                  key={`${word}-${idx}`}
                  delay={idx * 60}
                  className="mr-[0.25em] inline-block"
                >
                  {word}
                </Reveal>
              ))}
            </h1>
            <Reveal delay={240}>
              <p className="mt-5 max-w-2xl text-base font-semibold text-cyanx sm:text-lg">
                {heroC11.valueProposition}
              </p>
            </Reveal>
            <Reveal delay={300}>
              <p className="lead mt-4 text-slatex-300">{heroC11.lead}</p>
            </Reveal>
            <Reveal delay={400} className="mt-10 flex flex-wrap gap-3">
              <Btn href={l("/report")} variant="signal">
                {heroC11.reportCta}
              </Btn>
              <Btn href={l("/check")} variant="primary">
                {heroC11.verifyCta}
              </Btn>
              <Btn href={l("/scams")} variant="outlineDark">
                {heroC11.secondaryCta}
              </Btn>
            </Reveal>
          </div>

          <div
            className="relative hidden h-[380px] lg:col-span-5 lg:block"
            aria-hidden="true"
          >
            <Monogram className="absolute inset-0 m-auto h-56 w-56 text-white/10" />
            {featuredCats.slice(0, 4).map((cat, idx) => (
              <Link
                key={cat.id}
                href={l(`/scams/${cat.slug}`)}
                tabIndex={-1}
                style={{ animationDelay: `${idx * 1.2}s` }}
                className={`float-chip dark-surface absolute ${CHIP_POSITIONS[idx]} rounded-full bg-navy-800/90 px-5 py-3 text-sm font-semibold text-white hover:text-cyanx`}
              >
                {R(cat.title, lang)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Strip (HomeTop.tsx) */}
      <section className="on-dark relative overflow-hidden bg-navy-800">
        <Monogram className="absolute -right-10 top-1/2 h-64 w-64 -translate-y-1/2 text-white/5" />
        <div className="container-g relative flex flex-col items-start justify-between gap-5 py-8 md:flex-row md:items-center">
          <p className="font-[family-name:var(--font-heading)] text-xl font-semibold text-white md:text-2xl">
            {R(L.strip.text, lang)}
          </p>
          <Btn href={l("/check")} variant="outlineDark">
            {R(L.strip.cta, lang)}
          </Btn>
        </div>
      </section>

      {/* 2B. Features & Verification Grid (C12 — 3-Column Platform Pillars) */}
      <section
        id="verification-pillars"
        aria-label={pillarsC12.eyebrow}
        className="section-y scroll-mt-28 bg-mist"
      >
        <div className="container-g">
          <SectionHeading
            eyebrow={pillarsC12.eyebrow}
            title={pillarsC12.h2}
            lead={pillarsC12.lead}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pillarsC12.items.map((pillar, idx) => {
              const PillarIcon = PILLAR_ICONS[pillar.id] ?? ShieldAlert;
              const isReport = pillar.id === "community-reporting";
              return (
                <Reveal key={pillar.id} delay={idx * 80}>
                  <article className="flex h-full flex-col justify-between rounded-[22px] border border-line bg-white p-7 shadow-e1 transition-all duration-150 hover:-translate-y-1 hover:border-brand-600/40 hover:shadow-e2">
                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <IconTile>
                          <PillarIcon className="h-6 w-6" strokeWidth={1.6} />
                        </IconTile>
                        <span className="rounded-full bg-mist px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-600">
                          {pillar.badge}
                        </span>
                      </div>
                      <h3 className="h4 mt-5 text-ink">{pillar.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-slatex-600">
                        {pillar.description}
                      </p>
                      <ul className="mt-5 space-y-2.5 border-t border-line pt-4">
                        {pillar.highlights.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-sm font-medium text-ink"
                          >
                            <CheckCircle2
                              className="mt-0.5 h-4 w-4 shrink-0 text-brand-600"
                              strokeWidth={2}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-7 pt-2">
                      <Btn
                        href={l(pillar.href)}
                        variant={isReport ? "signal" : "primary"}
                        className="w-full"
                      >
                        {pillar.cta}
                      </Btn>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Intro / Who We Are (HomeTop.tsx) */}
      <section id="about" className="section-y scroll-mt-28 bg-white">
        <div className="container-g grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-brand-600">
                <span className="h-px w-8 bg-brand-600" />
                {R(L.intro.eyebrow, lang)}
              </p>
            </Reveal>
            <Reveal>
              <h2 className="h2 mt-4 text-ink">{R(L.intro.h2, lang)}</h2>
            </Reveal>
            <Reveal>
              <p className="lead mt-6 text-slatex-600">{R(L.intro.body, lang)}</p>
            </Reveal>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {L.intro.points.map((pt, idx) => (
                <Reveal key={idx} delay={idx * 60}>
                  <li className="flex gap-3 font-medium text-ink">
                    <CheckCircle2
                      className="mt-1 h-5 w-5 shrink-0 text-brand-600"
                      strokeWidth={1.75}
                    />
                    {R(pt, lang)}
                  </li>
                </Reveal>
              ))}
            </ul>
            <Reveal className="mt-10 flex flex-wrap gap-3">
              <Btn href={l("/about")} variant="primary">
                {lang === "fr" ? "En savoir plus" : "About GLOPROFAS"}
              </Btn>
              <Btn href={l("/scams")} variant="outline">
                {R(L.intro.cta, lang)}
              </Btn>
            </Reveal>
          </div>

          <Reveal className="relative mx-auto w-full max-w-[480px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/zite/img_rV5DNdwu0nwwIUqR.jpg"
              alt=""
              loading="lazy"
              width={1024}
              height={1024}
              className="aspect-square w-full rounded-full object-cover shadow-e3"
            />
            {stats.categories > 0 ? (
              <div className="absolute -bottom-4 left-0 rounded-[22px] bg-white p-6 shadow-e3">
                <p className="font-[family-name:var(--font-heading)] text-5xl font-bold tabular-nums text-brand-600">
                  {stats.categories}
                </p>
                <p className="mt-1 text-sm font-semibold text-slatex-600">
                  {R(L.intro.anchor, lang)}
                </p>
              </div>
            ) : null}
          </Reveal>
        </div>
      </section>

      {/* 4. Marquee (HomeMiddle.tsx) */}
      <section
        className="marquee overflow-hidden bg-navy-950 py-8"
        aria-label={R(L.scams.eyebrow, lang)}
      >
        <div className="marquee-track flex w-max">
          {[false, true].map((hidden, trackIdx) => (
            <ul
              key={trackIdx}
              aria-hidden={hidden || undefined}
              className="flex shrink-0 items-center"
            >
              {categories.map((cat) => (
                <li
                  key={`${cat.id}-${trackIdx}`}
                  className="flex items-center gap-8 pr-8 font-[family-name:var(--font-heading)] text-2xl font-semibold whitespace-nowrap text-white md:text-3xl"
                >
                  {R(cat.title, lang)}
                  <span className="h-2 w-2 rounded-full bg-cyanx" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      {/* 5. Common Scams Bento (HomeMiddle.tsx) */}
      <section id="scams" className="section-y scroll-mt-28 bg-mist">
        <div className="container-g">
          <SectionHeading
            eyebrow={R(L.scams.eyebrow, lang)}
            title={R(L.scams.h2, lang)}
            lead={R(L.scams.lead, lang)}
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {featuredCats.map((cat, idx) => {
              const Icon = getCategoryIcon(cat.icon);
              return (
                <Reveal
                  key={cat.id}
                  delay={idx * 60}
                  className={idx === 0 ? "lg:col-span-2 lg:row-span-2" : ""}
                >
                  <Link
                    href={l(`/scams/${cat.slug}`)}
                    className="group relative flex h-full min-h-[260px] flex-col justify-end overflow-hidden rounded-[22px] bg-navy-900 p-7 shadow-e1 transition-all duration-150 hover:-translate-y-1 hover:shadow-e3"
                  >
                    {cat.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={cat.imageUrl}
                        alt=""
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms] group-hover:scale-105"
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/50 to-transparent" />
                    <div className="relative">
                      <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-white/15 text-white backdrop-blur">
                        <Icon className="h-6 w-6" strokeWidth={1.5} />
                      </div>
                      <h3 className={`mt-5 text-white ${idx === 0 ? "h3" : "h4"}`}>
                        {R(cat.title, lang)}
                      </h3>
                      <p className="mt-2 text-sm text-slatex-300">
                        {R(cat.summary, lang)}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {otherCats.map((cat, idx) => {
              const Icon = getCategoryIcon(cat.icon);
              return (
                <Reveal key={cat.id} delay={idx * 40}>
                  <Link
                    href={l(`/scams/${cat.slug}`)}
                    className="flex h-full items-center gap-4 rounded-[14px] border border-line bg-white p-4 transition-all duration-150 hover:-translate-y-1 hover:border-brand-600/40 hover:shadow-e2"
                  >
                    <IconTile>
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                    </IconTile>
                    <h3 className="font-[family-name:var(--font-heading)] text-[0.95rem] font-semibold leading-snug text-ink">
                      {R(cat.title, lang)}
                    </h3>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-10">
            <Btn href={l("/scams")} variant="primary">
              {lang === "fr" ? "Toutes les arnaques" : "All scam types"}
            </Btn>
          </div>
        </div>
      </section>

      {/* 6. How Scams Work (HomeMiddle.tsx) */}
      <section id="how" className="on-dark section-y scroll-mt-28 bg-navy-900">
        <div className="container-g">
          <SectionHeading
            dark
            eyebrow={R(L.how.eyebrow, lang)}
            title={R(L.how.h2, lang)}
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {L.how.steps.map((step, idx) => (
              <Reveal key={idx} delay={idx * 60}>
                <article className="dark-surface relative h-full rounded-[22px] bg-navy-800 p-5">
                  <span
                    className="pointer-events-none absolute top-2 right-5 font-[family-name:var(--font-heading)] text-7xl font-bold text-transparent"
                    style={{ WebkitTextStroke: "1px rgba(255,255,255,.18)" }}
                  >
                    0{idx + 1}
                  </span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={HOW_STEP_IMAGES[idx]}
                    alt=""
                    loading="lazy"
                    width={1200}
                    height={896}
                    className="aspect-[4/3] w-full rounded-[14px] object-cover"
                  />
                  <h3 className="h4 mt-5 text-white">{R(step.t, lang)}</h3>
                  <p className="mt-2 text-slatex-300">{R(step.d, lang)}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 grid gap-x-12 lg:grid-cols-12">
            <h3 className="h3 text-white lg:col-span-4">{R(L.how.techTitle, lang)}</h3>
            <div className="mt-6 grid gap-x-10 md:grid-cols-2 lg:col-span-8 lg:mt-0">
              {L.how.techniques.map((tech, idx) => (
                <TechniqueItem
                  key={idx}
                  title={R(tech.t, lang)}
                  body={R(tech.d, lang)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Stats Counters (HomeMiddle.tsx) */}
      <section className="on-dark bg-navy-800 py-16 md:py-20">
        <div className="container-g">
          <p className="eyebrow flex items-center gap-3 text-cyanx">
            <span className="h-px w-8 bg-cyanx" />
            {R(L.stats.eyebrow, lang)}
          </p>
          <div className="mt-10 grid gap-10 sm:grid-cols-3">
            <ZiteCounter value={stats.categories} label={R(L.stats.categories, lang)} />
            <ZiteCounter value={stats.resources} label={R(L.stats.resources, lang)} />
            <ZiteCounter value={stats.languages} label={R(L.stats.languages, lang)} />
          </div>
        </div>
      </section>

      {/* 8. Report Section (HomeLower.tsx) */}
      <section id="report" className="section-y scroll-mt-28 bg-white">
        <div className="container-g grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow={R(L.reportSec.eyebrow, lang)}
              title={R(L.reportSec.h2, lang)}
              lead={R(L.reportSec.body, lang)}
            />
            <Reveal className="mt-8 flex gap-3 rounded-[14px] border border-signal/60 bg-signal/10 p-5 text-sm text-ink">
              <Info className="h-5 w-5 shrink-0 text-ink" strokeWidth={1.75} />
              <p>{R(L.reportSec.note, lang)}</p>
            </Reveal>
            <div className="mt-8">
              <Btn href={l("/report")} variant="signal">
                {R(L.report, lang)}
              </Btn>
            </div>
          </div>
          <ol className="grid gap-4">
            {L.reportSec.steps.map((step, idx) => (
              <Reveal key={idx} delay={idx * 60}>
                <li className="flex gap-5 rounded-[22px] border border-line bg-mist p-6">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy-900 font-[family-name:var(--font-heading)] text-lg font-bold text-white">
                    {idx + 1}
                  </span>
                  <div>
                    <h3 className="h4 text-ink">{R(step.t, lang)}</h3>
                    <p className="mt-1 text-slatex-600">{R(step.d, lang)}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 9. Protection and Resources (HomeLower.tsx) */}
      {featuredRes ? (
        <section id="resources" className="section-y scroll-mt-28 bg-mist">
          <div className="container-g">
            <SectionHeading
              eyebrow={R(L.res.eyebrow, lang)}
              title={R(L.res.h2, lang)}
            />
            <div className="mt-14 grid gap-6 lg:grid-cols-12">
              <Reveal className="lg:col-span-7">
                <article className="flex h-full flex-col overflow-hidden rounded-[22px] bg-white shadow-e1">
                  {featuredRes.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={featuredRes.imageUrl}
                      alt=""
                      loading="lazy"
                      className="aspect-[16/9] w-full object-cover"
                    />
                  ) : (
                    <ImageSlot id="RES" lang={lang} className="aspect-[16/9]" />
                  )}
                  <div className="p-8">
                    <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
                      <span className="rounded-full bg-brand-600 px-3 py-1 text-white">
                        {R(L.res.featured, lang)}
                      </span>
                      <span className="rounded-full bg-mist px-3 py-1 text-ink">
                        {featuredRes.type}
                      </span>
                      <span className="rounded-full border border-line px-3 py-1 text-slatex-600">
                        {featuredRes.language}
                      </span>
                    </div>
                    <h3 className="h3 mt-5 text-ink">{R(featuredRes.title, lang)}</h3>
                    <p className="mt-3 text-slatex-600">
                      {R(featuredRes.description, lang)}
                    </p>
                    {featuredRes.fileSize ? (
                      <p className="mt-5 flex items-center gap-2 text-sm font-semibold text-slatex-600">
                        <Download className="h-4 w-4" />
                        {featuredRes.fileSize}
                      </p>
                    ) : null}
                  </div>
                </article>
              </Reveal>

              <ul className="grid gap-4 lg:col-span-5">
                {otherRes.map((res, idx) => (
                  <Reveal key={res.id} delay={idx * 60}>
                    <li className="flex items-center gap-4 rounded-[14px] border border-line bg-white p-5">
                      <IconTile>
                        <FileText className="h-6 w-6" strokeWidth={1.5} />
                      </IconTile>
                      <div className="min-w-0">
                        <p className="text-xs font-bold uppercase tracking-wider text-brand-600">
                          {res.type} · {res.language}
                          {res.fileSize ? ` · ${res.fileSize}` : ""}
                        </p>
                        <h3 className="mt-1 font-[family-name:var(--font-heading)] font-semibold leading-snug text-ink">
                          {R(res.title, lang)}
                        </h3>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <Btn href={l("/resources")} variant="primary">
                {R(L.final.resources, lang)}
              </Btn>
            </div>
          </div>
        </section>
      ) : null}

      {/* 10. Our Services (HomeLower.tsx) */}
      <section id="services" className="section-y scroll-mt-28 bg-white">
        <div className="container-g">
          <SectionHeading
            eyebrow={R(L.services.eyebrow, lang)}
            title={R(L.services.h2, lang)}
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <Reveal className="flex h-full flex-col rounded-[22px] border border-line bg-mist p-8 md:p-10">
              <span className="self-start rounded-full bg-risk-low px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                {R(L.services.freeTag, lang)}
              </span>
              <h3 className="h3 mt-5 text-ink">{R(L.services.freeTitle, lang)}</h3>
              <ul className="mt-6 flex-1 space-y-3">
                {L.services.free.map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-slatex-600">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-brand-600" />
                    {R(item, lang)}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Btn href={l("/resources")} variant="primary">
                  {R(L.services.freeCta, lang)}
                </Btn>
              </div>
            </Reveal>

            <Reveal className="on-dark flex h-full flex-col rounded-[22px] bg-navy-900 p-8 text-white md:p-10">
              <span className="self-start rounded-full bg-signal px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy-950">
                {R(L.services.paidTag, lang)}
              </span>
              <h3 className="h3 mt-5 text-white">{R(L.services.paidTitle, lang)}</h3>
              <ul className="mt-6 flex-1 space-y-3">
                {L.services.paid.map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-slatex-300">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-cyanx" />
                    {R(item, lang)}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Btn href={l("/services")} variant="outlineDark">
                  {R(L.services.paidCta, lang)}
                </Btn>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 11. Alerts and News (HomeLower.tsx) */}
      <section id="news" className="section-y scroll-mt-28 bg-mist">
        <div className="container-g">
          <SectionHeading
            eyebrow={R(L.newsSec.eyebrow, lang)}
            title={R(L.newsSec.h2, lang)}
          />
          {alerts.length === 0 ? (
            <p className="mt-10 text-slatex-600">{R(L.newsSec.empty, lang)}</p>
          ) : null}
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {alerts.slice(0, 3).map((alert, idx) => (
              <Reveal key={alert.id} delay={idx * 60}>
                <Link
                  href={l(`/alerts/${alert.id}`)}
                  className="flex h-full flex-col rounded-[22px] border border-line bg-white p-7 shadow-e1 transition-all duration-150 hover:-translate-y-1 hover:shadow-e2"
                >
                  <ZiteRiskBadge level={alert.risk} lang={lang} />
                  <h3 className="h4 mt-5 text-ink">{R(alert.title, lang)}</h3>
                  <p className="mt-3 flex-1 text-sm text-slatex-600">
                    {R(alert.summary, lang)}
                  </p>
                  <p className="mt-5 border-t border-line pt-4 text-sm font-medium text-slatex-600">
                    {R(alert.category, lang)} · {alert.country} ·{" "}
                    {formatZiteDate(alert.date, lang)}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-10">
            <Btn href={l("/alerts")} variant="outline">
              {lang === "fr" ? "Toutes les alertes" : "All alerts"}
            </Btn>
          </div>

          {articles.length > 0 ? (
            <h3 className="h3 mt-20 text-ink">{R(L.newsSec.news, lang)}</h3>
          ) : null}
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {articles.slice(0, 3).map((art, idx) => (
              <Reveal key={art.id} delay={idx * 60}>
                <Link href={l(`/news/${art.id}`)} className="group block h-full">
                  {art.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={art.imageUrl}
                      alt=""
                      loading="lazy"
                      width={800}
                      height={600}
                      className="aspect-[4/3] w-full rounded-[22px] object-cover"
                    />
                  ) : (
                    <ImageSlot
                      id={`HOME-NEWS-${idx + 1}`}
                      lang={lang}
                      className="aspect-[4/3] rounded-[22px]"
                    />
                  )}
                  <p className="mt-5 text-xs font-bold uppercase tracking-wider text-brand-600">
                    {R(art.tag, lang)}
                  </p>
                  <h4 className="h4 mt-2 line-clamp-2 text-ink">
                    {R(art.title, lang)}{" "}
                    <ArrowUpRight className="inline h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </h4>
                  <p className="mt-3 text-sm text-slatex-600">
                    {art.author} · {formatZiteDate(art.date, lang)}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Newsletter (HomeBottom.tsx) */}
      <section
        id="newsletter"
        className="on-dark scroll-mt-28 py-20"
        style={{ background: "linear-gradient(180deg, #0a1631, #10244d)" }}
      >
        <div className="container-g grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 className="h3 text-white">{R(L.nl.h2, lang)}</h2>
            <p className="mt-3 text-slatex-300">{R(L.nl.body, lang)}</p>
          </Reveal>

          {nlStatus === "done" ? (
            <p
              role="status"
              className="flex items-center gap-3 text-lg font-semibold text-white lg:col-span-8"
            >
              <CheckCircle2 className="h-6 w-6 text-cyanx" />
              {R(L.nl.done, lang)}
            </p>
          ) : (
            <form
              onSubmit={handleNewsletterSubmit}
              noValidate
              className="grid gap-4 sm:grid-cols-2 lg:col-span-8"
            >
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
              <div>
                <label
                  htmlFor="nl-name"
                  className="mb-1.5 block text-sm font-semibold text-white"
                >
                  {R(L.nl.name, lang)}
                </label>
                <input
                  id="nl-name"
                  autoComplete="name"
                  className={inputCls}
                  value={nlState.name}
                  onChange={(e) => setNlState({ ...nlState, name: e.target.value })}
                />
                {nlErrors.name ? (
                  <p className="mt-1.5 flex items-center gap-1.5 text-sm text-signal">
                    <AlertCircle className="h-4 w-4" />
                    {nlErrors.name}
                  </p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="nl-email"
                  className="mb-1.5 block text-sm font-semibold text-white"
                >
                  {R(L.nl.email, lang)}
                </label>
                <input
                  id="nl-email"
                  type="email"
                  autoComplete="email"
                  className={inputCls}
                  value={nlState.email}
                  onChange={(e) => setNlState({ ...nlState, email: e.target.value })}
                />
                {nlErrors.email ? (
                  <p className="mt-1.5 flex items-center gap-1.5 text-sm text-signal">
                    <AlertCircle className="h-4 w-4" />
                    {nlErrors.email}
                  </p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="nl-country"
                  className="mb-1.5 block text-sm font-semibold text-white"
                >
                  {R(L.nl.country, lang)}
                </label>
                <input
                  id="nl-country"
                  autoComplete="country-name"
                  className={inputCls}
                  value={nlState.country}
                  onChange={(e) => setNlState({ ...nlState, country: e.target.value })}
                />
                {nlErrors.country ? (
                  <p className="mt-1.5 flex items-center gap-1.5 text-sm text-signal">
                    <AlertCircle className="h-4 w-4" />
                    {nlErrors.country}
                  </p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="nl-lang"
                  className="mb-1.5 block text-sm font-semibold text-white"
                >
                  {R(L.nl.language, lang)}
                </label>
                <select
                  id="nl-lang"
                  className={inputCls}
                  value={nlState.language}
                  onChange={(e) => setNlState({ ...nlState, language: e.target.value })}
                >
                  <option value="EN" className="text-ink">
                    English
                  </option>
                  <option value="FR" className="text-ink">
                    Français
                  </option>
                </select>
              </div>

              <label className="flex min-h-[44px] items-start gap-3 text-sm text-slatex-300 sm:col-span-2">
                <input
                  type="checkbox"
                  checked={nlState.consent}
                  onChange={(e) =>
                    setNlState({ ...nlState, consent: e.target.checked })
                  }
                  className="mt-0.5 h-5 w-5 accent-brand-500"
                />
                <span>
                  {R(L.nl.consent, lang)}
                  {nlErrors.consent ? (
                    <span className="mt-1.5 flex items-center gap-1.5 text-sm text-signal">
                      <AlertCircle className="h-4 w-4" />
                      {nlErrors.consent}
                    </span>
                  ) : null}
                </span>
              </label>

              <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
                <button
                  type="submit"
                  disabled={nlStatus === "loading"}
                  className="inline-flex h-[52px] items-center gap-2 rounded-full bg-brand-600 px-7 font-semibold text-white hover:bg-brand-500 disabled:opacity-60"
                >
                  {nlStatus === "loading" ? (
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  ) : null}
                  {R(L.nl.submit, lang)}
                </button>
                {nlStatus === "error" ? (
                  <p role="alert" className="text-sm text-signal">
                    {R(L.nl.err, lang)}
                  </p>
                ) : null}
              </div>
            </form>
          )}
        </div>
      </section>

      {/* 13. Final CTA (HomeBottom.tsx) */}
      <section className="on-dark section-y relative overflow-hidden bg-navy-900">
        <Monogram className="absolute top-1/2 -left-24 h-[520px] w-[520px] -translate-y-1/2 text-white/[0.04]" />
        <div className="container-g relative text-center">
          <Reveal>
            <h2 className="h2 mx-auto max-w-3xl text-white">
              {R(L.final.h2, lang)}
            </h2>
          </Reveal>
          <Reveal delay={120} className="mt-10 flex flex-wrap justify-center gap-3">
            <Btn href={l("/report")} variant="signal">
              {R(L.report, lang)}
            </Btn>
            <Btn href={l("/resources")} variant="primary">
              {R(L.final.resources, lang)}
            </Btn>
            <Btn href={l("/contact")} variant="outlineDark">
              {R(L.final.contact, lang)}
            </Btn>
          </Reveal>
        </div>
      </section>
    </>
  );
}

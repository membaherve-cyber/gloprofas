"use client";

/**
 * GLOPROFAS homepage — preserved hero identity + 14 editorial sections.
 * 01 Hero · 02 Verification strip · 03 Pillars · 04 About intro
 * 05 Scam library · 06 Anatomy · 07 Figures · 08 Report
 * 09 Resources · 10 Services · 11 Alerts & articles · 12 Case files
 * 13 Newsletter briefing · 14 Closing band
 */

import React, { useState } from "react";
import {
  ArrowUpRight,
  BarChart3,
  Check,
  CirclePlay,
  Database,
  FileText,
  Globe,
  ListChecks,
  Lock,
  ShieldAlert,
  ShieldCheck,
  Siren,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { A } from "@/lib/router";
import { useI18n } from "@/lib/i18n";
import { R, L, getCategoryIcon } from "@/lib/content/copy";
import {
  ZITE_CONTENT,
  type ZiteCategory,
} from "@/lib/content/zite-data";
import { categoryImage } from "@/lib/site";
import { FAQ_ITEMS } from "@/lib/content/faq-data";
import {
  Reveal,
  Btn,
  LinkG,
  SectionHeading,
  Masthead,
  RiskBadge,
  StatCell,
} from "@/components/shared/ui";

const CASES = [
  {
    scope: { en: "Cameroon · Central Africa", fr: "Cameroun · Afrique centrale" },
    category: { en: "Mobile money fraud", fr: "Fraude au mobile money" },
    image: "/images/context/contactless-card-terminal.jpg",
    title: {
      en: "Fake deposit SMS followed by an urgent reversal call",
      fr: "Faux SMS de dépôt et appel pressant de « remboursement »",
    },
    body: {
      en: "A shopkeeper receives an SMS from an ordinary number mimicking a 50,000 FCFA deposit notification, followed immediately by a caller pleading for an urgent return transfer.",
      fr: "Une commerçante reçoit un SMS imitant une notification de dépôt de 50 000 FCFA depuis un numéro ordinaire, suivi d’un appel lui demandant de renvoyer la somme d’urgence.",
    },
    lesson: {
      en: "Always check your actual balance in the official operator menu and never share your PIN.",
      fr: "Vérifiez toujours le solde réel dans le menu officiel de l’opérateur et ne partagez jamais votre code PIN.",
    },
    href: "/scams/mobile-money-scams",
  },
  {
    scope: { en: "West Africa", fr: "Afrique de l’Ouest" },
    category: { en: "Employment scams", fr: "Fausses offres d’emploi" },
    image: "/images/context/person-phone-desk.jpg",
    title: {
      en: "Messaging-app recruitment demanding upfront fees",
      fr: "Recrutement par messagerie exigeant des frais de dossier",
    },
    body: {
      en: "A job seeker is offered a role after a text-only chat, conditional on paying upfront training fees via mobile transfer.",
      fr: "Un candidat reçoit une promesse d’embauche après un simple échange écrit, conditionnée au paiement préalable de frais de formation par mobile money.",
    },
    lesson: {
      en: "Legitimate employers never charge fees to hire you.",
      fr: "Un employeur légitime ne demande jamais d’argent avant l’embauche.",
    },
    href: "/scams/employment-scams",
  },
  {
    scope: { en: "International", fr: "International" },
    category: { en: "Invoice redirection", fr: "Compromission de facture" },
    image: "/images/context/executive-phone-laptop.jpg",
    title: {
      en: "Supplier bank details changed from a lookalike domain",
      fr: "Changement de coordonnées bancaires d’un fournisseur",
    },
    body: {
      en: "An SME receives an expected invoice from a domain differing by one letter, requesting urgent payment to a new account.",
      fr: "Une PME reçoit une facture attendue depuis une adresse quasi identique à celle de son fournisseur, annonçant un nouveau RIB pour un règlement urgent.",
    },
    lesson: {
      en: "Confirm every account change by calling back on a trusted number already on file.",
      fr: "Confirmez tout changement de compte par un contre-appel sur un numéro déjà vérifié.",
    },
    href: "/scams/business-email-compromise",
  },
];

const PILLARS = [
  {
    id: "database-check",
    icon: Database,
    title: { en: "Real-time Database Check", fr: "Vérification en base temps réel" },
    description: {
      en: "Instantly cross-check suspicious phone numbers, website links, emails and messages against our live database of public scam alerts and reported fraud patterns.",
      fr: "Vérifiez instantanément numéros, liens, courriels et messages suspects par rapport à notre base d’alertes publiques et de schémas de fraude signalés.",
    },
    highlights: [
      { en: "Instant phone number, URL & message verification", fr: "Vérification instantanée des numéros, liens et messages" },
      { en: "Cross-referenced with active regional scam alerts", fr: "Recoupement avec les alertes régionales actives" },
      { en: "AI-assisted warning sign analysis with Oskie", fr: "Analyse des signaux d’alerte assistée par IA avec Oskie" },
    ],
    cta: { en: "Verify a Scam", fr: "Vérifier une arnaque" },
    href: "/check",
  },
  {
    id: "community-reporting",
    icon: ShieldAlert,
    title: { en: "Community Reporting", fr: "Signalement communautaire" },
    description: {
      en: "Submit a guided, confidential incident report in under five minutes with no account required. What you share helps protect others across the community.",
      fr: "Déposez un signalement confidentiel guidé en moins de cinq minutes, sans compte. Ce que vous partagez aide à protéger les autres.",
    },
    highlights: [
      { en: "Guided confidential intake with no account required", fr: "Recueil confidentiel guidé, sans compte requis" },
      { en: "Private evidence protection & unique reference code", fr: "Preuves protégées et numéro de référence unique" },
      { en: "Immediate bank & mobile-money safety guidance", fr: "Conseils de sécurité bancaire et mobile money immédiats" },
    ],
    cta: { en: "Report an Incident", fr: "Signaler un incident" },
    href: "/report",
  },
  {
    id: "secure-analytics",
    icon: BarChart3,
    title: { en: "Secure Analytics", fr: "Analyse sécurisée" },
    description: {
      en: "Access risk-classified fraud trend intelligence and public awareness alerts, built from reported patterns and reviewed before publication.",
      fr: "Accédez à des analyses de tendances classées par risque et à des alertes publiques, établies à partir de signalements vérifiés avant publication.",
    },
    highlights: [
      { en: "Risk-classified public scam alerts", fr: "Alertes publiques classées par risque" },
      { en: "Pattern briefs from community reports", fr: "Synthèses issues des signalements" },
      { en: "Bilingual awareness publications", fr: "Publications de sensibilisation bilingues" },
    ],
    cta: { en: "See Scam Alerts", fr: "Voir les alertes" },
    href: "/alerts",
  },
];

export function HomeView() {
  const { locale, t } = useI18n();
  const cats = ZITE_CONTENT.categories;
  const featuredCats = cats.filter((c: ZiteCategory) => c.featured);
  const heroCat = featuredCats[0] ?? cats[0];
  const restCats = cats.filter((c: ZiteCategory) => c.id !== heroCat.id);
  const fr = locale === "fr";

  const alerts = ZITE_CONTENT.alerts;
  const articles = ZITE_CONTENT.articles;

  return (
    <>
      {/* ═══ 01 · HERO — original identity preserved & enhanced ═══ */}
      <section className="on-dark relative isolate flex min-h-[100svh] items-center overflow-hidden bg-navy-900 pt-[110px] pb-14 lg:pt-[128px] lg:pb-20">
        <div className="absolute inset-0 -z-20" aria-hidden>
          <img
            src="/images/gen/hero-main.jpg"
            alt=""
            width={1472}
            height={736}
            fetchPriority="high"
            className="img-editorial h-full w-full object-cover object-[72%_center]"
          />
        </div>
        <div className="hero-scrim hero-scrim-anim absolute inset-0 -z-10" aria-hidden />

        <div className="container-g grid w-full items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-cyanx-500">
                <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-cyanx-500" aria-hidden />
                {R(L.hero.eyebrow, locale)}
              </p>
            </Reveal>
            <Reveal delay={90}>
              <h1 className="h1-g mt-5 max-w-[16ch] text-white">{R(L.hero.h1, locale)}</h1>
            </Reveal>
            <Reveal delay={170}>
              <p className="lead-g mt-6 max-w-xl text-slatex-300">{R(L.hero.lead, locale)}</p>
            </Reveal>
            <Reveal delay={240} className="mt-9 flex flex-wrap gap-3">
              <Btn href="/report" variant="signal">
                <Siren size={16} strokeWidth={2.2} aria-hidden />
                {fr ? "Signaler un incident" : "Report an Incident"}
              </Btn>
              <Btn href="/check" variant="outlineDark">
                <ShieldCheck size={16} aria-hidden />
                {fr ? "Vérifier une arnaque" : "Verify a Scam"}
              </Btn>
            </Reveal>
            <Reveal delay={300}>
              <p className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] font-medium text-white/60">
                <span className="inline-flex items-center gap-1.5">
                  <Check size={13} className="text-cyanx-500" aria-hidden />
                  {fr ? "Gratuit" : "Free"}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check size={13} className="text-cyanx-500" aria-hidden />
                  {fr ? "Privé par défaut" : "Private by default"}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check size={13} className="text-cyanx-500" aria-hidden />
                  {fr ? "Anglais et français" : "English and French"}
                </span>
              </p>
            </Reveal>
          </div>

          {/* Documented patterns rail */}
          <div className="hidden lg:col-span-5 lg:block">
            <Reveal delay={340}>
              <div className="rounded-2xl border border-white/15 bg-navy-950/45 p-6 backdrop-blur-[3px]">
                <p className="eyebrow mb-1 text-white/50">
                  {fr ? "Schémas documentés" : "Documented patterns"}
                </p>
                <ul>
                  {featuredCats.slice(0, 4).map((cat: ZiteCategory, idx: number) => (
                    <li key={cat.id} className="border-b border-white/10 last:border-0">
                      <A
                        href={`/scams/${cat.slug}`}
                        className="group flex items-baseline gap-3 py-3.5 text-[14.5px] text-white/85 transition-colors hover:text-white"
                      >
                        <span className="mast-num text-xs">{String(idx + 1).padStart(2, "0")}</span>
                        <span className="font-medium">{R(cat.title, locale)}</span>
                        <ArrowUpRight
                          aria-hidden
                          className="ml-auto h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-70"
                          strokeWidth={1.5}
                        />
                      </A>
                    </li>
                  ))}
                </ul>
                <A
                  href="/scams"
                  className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-semibold text-cyanx-500 hover:text-cyanx-400"
                >
                  {fr ? "Voir les 12 guides" : "Browse all 12 guides"}
                  <ChevronRight size={14} aria-hidden />
                </A>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ 02 · VERIFICATION STRIP ═══ */}
      <section className="on-dark border-y border-white/10 bg-navy-950">
        <div className="container-g flex flex-col items-start justify-between gap-4 py-6 md:flex-row md:items-center">
          <p className="font-heading text-lg font-medium text-white md:text-xl">
            {R(L.strip.text, locale)}
          </p>
          <LinkG href="/check" className="shrink-0 !text-cyanx-500">{R(L.strip.cta, locale)}</LinkG>
        </div>
      </section>

      {/* ═══ 03 · PILLARS ═══ */}
      <section className="section-y bg-white">
        <div className="container-g">
          <Reveal>
            <Masthead num="01" eyebrow={fr ? "Architecture de protection" : "Protection architecture"} />
          </Reveal>
          <div className="mt-8 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal delay={60}>
                <h2 className="h2-g">
                  {fr
                    ? "Trois piliers pour détecter, signaler et analyser la fraude."
                    : "Three core pillars to detect, report and analyse fraud."}
                </h2>
                <p className="lead-g mt-4">
                  {fr
                    ? "Chaque outil de GLOPROFAS offre aux particuliers, aux familles et aux institutions une défense immédiate et fiable contre les arnaques modernes."
                    : "Every tool on GLOPROFAS is built to give individuals, families and institutions an immediate, trustworthy defence against modern scamming schemes."}
                </p>
              </Reveal>
              <Reveal delay={140}>
                <div className="card-g mt-8 overflow-hidden">
                  <img
                    src="/images/gen/check-verify.jpg"
                    alt={fr ? "Une personne examine attentivement un message suspect sur son téléphone avant d'agir" : "A person carefully examines a suspicious message on their phone before acting"}
                    width={1344}
                    height={768}
                    loading="lazy"
                    className="img-editorial aspect-[16/10] w-full object-cover"
                  />
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <div className="flex flex-col gap-4">
                {PILLARS.map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <Reveal key={p.id} delay={80 + i * 90}>
                      <article className="card-g hoverable p-6">
                        <div className="flex items-start gap-4">
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                            <Icon size={20} strokeWidth={1.9} aria-hidden />
                          </span>
                          <div className="min-w-0">
                            <p className="eyebrow mb-1.5">{`Pillar 0${i + 1}`}</p>
                            <h3 className="h3-g text-[1.15rem]">{R(p.title, locale)}</h3>
                            <p className="mt-2 text-[14px] leading-relaxed text-slatex-600">
                              {R(p.description, locale)}
                            </p>
                            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                              {p.highlights.map((h, j) => (
                                <li key={j} className="flex items-start gap-2 text-[13px] text-ink-700">
                                  <Check size={14} className="mt-1 shrink-0 text-risk-low" aria-hidden />
                                  {R(h, locale)}
                                </li>
                              ))}
                            </ul>
                            <div className="mt-5">
                              <LinkG href={p.href}>{R(p.cta, locale)}</LinkG>
                            </div>
                          </div>
                        </div>
                      </article>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 04 · ABOUT INTRO ═══ */}
      <section className="section-y bg-mist-50">
        <div className="container-g grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="card-g overflow-hidden">
                <img
                  src="/images/gen/about-workshop.jpg"
                  alt={fr ? "Un animateur anime un atelier de sensibilisation aux arnaques devant un public attentif au Cameroun" : "A facilitator leads an anti-scam awareness workshop for an engaged audience in Cameroon"}
                  width={1344}
                  height={768}
                  loading="lazy"
                  className="img-editorial aspect-[4/5] w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:pl-4">
            <Reveal>
              <Masthead num="02" eyebrow={R(L.intro.eyebrow, locale)} />
            </Reveal>
            <Reveal delay={70}>
              <h2 className="h2-g mt-6">{R(L.intro.h2, locale)}</h2>
              <p className="lead-g mt-5">{R(L.intro.body, locale)}</p>
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {L.intro.points.map((pt, i) => (
                <Reveal key={i} delay={120 + i * 70}>
                  <div className="flex items-start gap-3.5">
                    <span className="mast-num pt-0.5 text-[15px]">{String(i + 1).padStart(2, "0")}</span>
                    <p className="text-[14.5px] font-medium leading-snug text-ink-900">{R(pt, locale)}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={420} className="mt-10 flex flex-wrap items-center gap-6">
              <Btn href="/about" variant="outline">
                {fr ? "À propos de GLOPROFAS" : "About GLOPROFAS"}
              </Btn>
              <p className="text-[13.5px] text-slatex-600">
                <span className="font-heading text-lg font-bold text-brand-600">12</span>{" "}
                {R(L.intro.anchor, locale)}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ 05 · SCAM LIBRARY ═══ */}
      <section className="section-y bg-white">
        <div className="container-g">
          <Reveal>
            <Masthead num="03" eyebrow={R(L.scams.eyebrow, locale)} />
          </Reveal>
          <div className="mt-8 grid gap-10 lg:grid-cols-12">
            {/* Featured card */}
            <div className="lg:col-span-5">
              <Reveal delay={60}>
                <A href={`/scams/${heroCat.slug}`} className="group block">
                  <article className="card-g hoverable h-full overflow-hidden">
                    <div className="relative">
                      <img
                        src={categoryImage(heroCat.slug, heroCat.imageUrl)}
                        alt={fr ? `Illustration : ${R(heroCat.title, "fr")}` : `Illustration: ${R(heroCat.title, "en")}`}
                        width={1344}
                        height={768}
                        loading="lazy"
                        className="img-editorial aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/85 to-transparent p-5 pt-16">
                        <p className="eyebrow !text-cyanx-500">{fr ? "Guide vedette" : "Featured guide"}</p>
                        <h3 className="mt-1 font-heading text-xl font-semibold text-white">
                          {R(heroCat.title, locale)}
                        </h3>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-[14px] text-slatex-600">{R(heroCat.summary, locale)}</p>
                      <span className="link-g mt-4 !text-brand-600">
                        {fr ? "Lire le guide" : "Read the guide"}
                        <ChevronRight size={14} aria-hidden />
                      </span>
                    </div>
                  </article>
                </A>
              </Reveal>
            </div>
            {/* Index of the rest */}
            <div className="lg:col-span-7">
              <Reveal delay={100}>
                <h2 className="h2-g">{R(L.scams.h2, locale)}</h2>
                <p className="lead-g mt-3">{R(L.scams.lead, locale)}</p>
              </Reveal>
              <ul className="mt-7 grid gap-x-8 sm:grid-cols-2">
                {restCats.map((cat: ZiteCategory, i: number) => {
                  const Icon = getCategoryIcon(cat.icon);
                  return (
                    <li key={cat.id} className="border-b border-line-200">
                      <A
                        href={`/scams/${cat.slug}`}
                        className="group flex items-center gap-3.5 py-[13px]"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-mist-50 text-brand-600 transition-colors group-hover:bg-brand-50">
                          <Icon size={16} strokeWidth={1.9} aria-hidden />
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate font-heading text-[14px] font-semibold text-ink-900 transition-colors group-hover:text-brand-600">
                            {R(cat.title, locale)}
                          </span>
                          <span className="block truncate text-[12.5px] text-slatex-600">
                            {R(cat.summary, locale)}
                          </span>
                        </span>
                        <ChevronRight
                          size={15}
                          aria-hidden
                          className="ml-auto shrink-0 text-slatex-400 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-600"
                        />
                      </A>
                    </li>
                  );
                })}
              </ul>
              <Reveal delay={160} className="mt-6">
                <LinkG href="/scams">{fr ? "Index complet" : "Full index"}</LinkG>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 06 · ANATOMY (dark) ═══ */}
      <section className="on-dark section-y bg-navy-950">
        <div className="container-g">
          <Reveal>
            <Masthead num="04" eyebrow={R(L.how.eyebrow, locale)} dark />
          </Reveal>
          <div className="mt-8 max-w-2xl">
            <Reveal delay={60}>
              <h2 className="h2-g text-white">{R(L.how.h2, locale)}</h2>
            </Reveal>
          </div>

          {/* 4 moves */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {L.how.steps.map((step, i) => (
              <Reveal key={i} delay={80 + i * 80}>
                <div className="card-dark-g h-full p-5">
                  <div className="mast-num text-[26px] leading-none">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="mt-4 font-heading text-[15.5px] font-semibold text-white">{R(step.t, locale)}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-slatex-300">{R(step.d, locale)}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Interception diagram */}
          <Reveal delay={160}>
            <div className="card-dark-g mt-6 p-6 lg:p-8">
              <p className="eyebrow mb-6">
                {fr ? "Où arrêter une arnaque" : "Where to stop a scam"}
              </p>
              <ol className="grid items-stretch gap-3 md:grid-cols-4">
                <li className="rounded-lg border border-white/12 bg-white/[0.03] p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slatex-400">
                    {fr ? "Étape 1" : "Stage 1"}
                  </p>
                  <p className="mt-1.5 font-heading text-[14.5px] font-semibold text-white">
                    {fr ? "Vecteur entrant" : "Incoming vector"}
                  </p>
                  <p className="mt-1.5 text-[12.5px] text-slatex-300">
                    {fr ? "Message, appel ou publication." : "A message, call or post arrives."}
                  </p>
                </li>
                <li className="rounded-lg border border-white/12 bg-white/[0.03] p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slatex-400">
                    {fr ? "Étape 2" : "Stage 2"}
                  </p>
                  <p className="mt-1.5 font-heading text-[14.5px] font-semibold text-white">
                    {fr ? "Pression organisée" : "Engineered pressure"}
                  </p>
                  <p className="mt-1.5 text-[12.5px] text-slatex-300">
                    {fr ? "Urgence, peur ou espoir." : "Urgency, fear or hope."}
                  </p>
                </li>
                <li className="relative rounded-lg border-2 border-signal-500/70 bg-signal-500/[0.07] p-4">
                  <span className="absolute -top-3 left-4 rounded-full bg-signal-500 px-2.5 py-0.5 text-[10.5px] font-bold uppercase tracking-wider text-navy-950">
                    {fr ? "Arrêtez ici" : "Stop here"}
                  </span>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-signal-400">
                    {fr ? "Porte de vérification" : "Verification gate"}
                  </p>
                  <p className="mt-1.5 font-heading text-[14.5px] font-semibold text-white">
                    {fr ? "Pause et contre-vérification" : "Pause and verify"}
                  </p>
                  <p className="mt-1.5 text-[12.5px] text-slatex-300">
                    {fr
                      ? "Canal officiel, numéro connu, aucun code partagé."
                      : "Official channel, known number, no code shared."}
                  </p>
                </li>
                <li className="rounded-lg border border-cyanx-500/30 bg-cyanx-500/[0.06] p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-cyanx-500">
                    {fr ? "Résultat" : "Outcome"}
                  </p>
                  <p className="mt-1.5 font-heading text-[14.5px] font-semibold text-white">
                    {fr ? "Argent protégé" : "Protected outcome"}
                  </p>
                  <p className="mt-1.5 text-[12.5px] text-slatex-300">
                    {fr ? "Aucun paiement, aucune donnée perdue." : "No payment made, no data lost."}
                  </p>
                </li>
              </ol>
            </div>
          </Reveal>

          {/* Techniques accordion */}
          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Reveal delay={60}>
                <h3 className="h3-g text-white">{R(L.how.techTitle, locale)}</h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-slatex-300">
                  {fr
                    ? "Les mêmes leviers psychologiques reviennent dans presque toutes les arnaques. Apprenez à les nommer pour mieux les repérer."
                    : "The same psychological levers recur in almost every scam. Learn to name them to spot them faster."}
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <Reveal delay={120}>
                <Accordion type="single" collapsible className="divide-y divide-white/10 rounded-xl border border-white/12">
                  {L.how.techniques.map((tech, i) => (
                    <AccordionItem key={i} value={`t-${i}`} className="border-0">
                      <AccordionTrigger className="px-5 py-4 text-left font-heading text-[14.5px] font-semibold text-white hover:no-underline hover:text-cyanx-500 [&>svg]:text-cyanx-500">
                        <span className="flex items-baseline gap-3">
                          <span className="mast-num text-[12px]">{String(i + 1).padStart(2, "0")}</span>
                          {R(tech.t, locale)}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="px-5 pb-4 text-[13.5px] leading-relaxed text-slatex-300">
                        {R(tech.d, locale)}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 07 · FIGURES band ═══ */}
      <section className="on-dark bg-navy-900 py-12">
        <div className="container-g grid gap-8 sm:grid-cols-3">
          <Reveal>
            <StatCell dark value="EN · FR" label={R(L.stats.languages, locale)} />
          </Reveal>
          <Reveal delay={90}>
            <StatCell
              dark
              value={fr ? "Gratuit" : "Free"}
              label={fr ? "Accès sans inscription" : "No account needed"}
            />
          </Reveal>
          <Reveal delay={180}>
            <StatCell
              dark
              value={fr ? "Confidentiel" : "Confidential"}
              label={fr ? "Signalements protégés" : "Protected reporting"}
            />
          </Reveal>
        </div>
      </section>

      {/* ═══ 08 · REPORT ═══ */}
      <section className="section-y bg-white">
        <div className="container-g grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <div className="card-g overflow-hidden">
                <img
                  src="/images/gen/report-scene.jpg"
                  alt={fr ? "Une personne remplit calmement un signalement en ligne, composée et déterminée" : "A person calmly completes an online report, composed and determined"}
                  width={1344}
                  height={768}
                  loading="lazy"
                  className="img-editorial aspect-[16/10] w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Reveal>
              <Masthead num="05" eyebrow={R(L.reportSec.eyebrow, locale)} />
            </Reveal>
            <Reveal delay={70}>
              <h2 className="h2-g mt-6">{R(L.reportSec.h2, locale)}</h2>
              <p className="lead-g mt-4">{R(L.reportSec.body, locale)}</p>
            </Reveal>
            <Reveal delay={140}>
              <div className="mt-6 rounded-xl border-l-4 border-signal-500 bg-signal-100/60 px-5 py-4 text-[13.5px] leading-relaxed text-ink-700">
                <div className="flex items-center gap-2 font-heading text-[13px] font-bold uppercase tracking-wide text-signal-600">
                  <Lock size={14} aria-hidden />
                  {fr ? "Confidentiel" : "Confidential"}
                </div>
                <p className="mt-1.5">{R(L.reportSec.note, locale)}</p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="on-dark mt-6 rounded-xl bg-navy-950 p-6">
                <p className="eyebrow mb-4">{fr ? "Protocole de signalement" : "Reporting protocol"}</p>
                <ol className="space-y-3.5">
                  {L.reportSec.steps.map((s, i) => (
                    <li key={i} className="flex items-start gap-3.5">
                      <span className="mast-num pt-0.5 text-[14px]">{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <p className="font-heading text-[14px] font-semibold text-white">{R(s.t, locale)}</p>
                        <p className="mt-0.5 text-[13px] text-slatex-300">{R(s.d, locale)}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="mt-6">
                  <Btn href="/report" variant="signal">
                    <Siren size={16} strokeWidth={2.2} aria-hidden />
                    {R(L.report, locale)}
                  </Btn>
                </div>
                <p className="mt-4 border-t border-white/10 pt-4 text-[12px] text-slatex-400">
                  {fr
                    ? "Nous ne demandons jamais de mots de passe, de codes PIN ou de codes à usage unique."
                    : "We never ask for passwords, PINs or one-time codes."}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ 09 · RESOURCES ═══ */}
      <section className="section-y bg-mist-50">
        <div className="container-g">
          <Reveal>
            <Masthead num="06" eyebrow={R(L.res.eyebrow, locale)} />
          </Reveal>
          <div className="mt-8 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal delay={60}>
                <h2 className="h2-g">{R(L.res.h2, locale)}</h2>
                <A href="/resources/scam-checker" className="group mt-6 block">
                  <article className="card-g hoverable overflow-hidden">
                    <img
                      src="/images/gen/check-verify.jpg"
                      alt={fr ? "Personne vérifiant un message suspect sur son téléphone" : "Person checking a suspicious message on their phone"}
                      width={1344}
                      height={768}
                      loading="lazy"
                      className="img-editorial aspect-video w-full object-cover"
                    />
                    <div className="p-5">
                      <div className="flex items-center gap-2.5">
                        <span className="chip-g bg-[#159769]/10 text-[#0d6e4a]">{fr ? "Outil gratuit" : "Free tool"}</span>
                        <span className="text-[12px] font-semibold uppercase tracking-wide text-signal-600">
                          {R(L.res.featured, locale)}
                        </span>
                      </div>
                      <h3 className="h3-g mt-2.5 text-[1.1rem]">GLOPROFAS Scam Checker</h3>
                      <p className="mt-1.5 text-[13.5px] text-slatex-600">
                        {fr
                          ? "Collez un message suspect ou cochez des signaux d’alerte : l’outil explique chaque schéma détecté et les bons réflexes."
                          : "Paste a suspicious message or tick warning signs: the tool explains every detected pattern and the right reflexes."}
                      </p>
                    </div>
                  </article>
                </A>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <ul className="divide-y divide-line-200">
                {[
                  {
                    href: "/resources/practical-tools",
                    icon: FileText,
                    t: { en: "Practical Tools to Protect Yourself", fr: "Outils pratiques pour vous protéger" },
                    d: { en: "In-depth guides covering online, money, social, business and emerging scams", fr: "Des guides approfondis : en ligne, argent, social, entreprise et arnaques émergentes" },
                  },
                  {
                    href: "/resources/knowledge-tools",
                    icon: ListChecks,
                    t: { en: "Knowledge & Tools", fr: "Savoir et outils" },
                    d: { en: "Searchable knowledge library and printable bilingual checklists", fr: "Bibliothèque de recherche et listes bilingues à imprimer" },
                  },
                  {
                    href: "/resources/video-learning",
                    icon: CirclePlay,
                    t: { en: "Video Learning Centre", fr: "Centre d’apprentissage vidéo" },
                    d: { en: "Verified video lessons from trusted institutions", fr: "Leçons vidéo vérifiées d’institutions fiables" },
                  },
                  {
                    href: "/resources/reporting-channels",
                    icon: Globe,
                    t: { en: "Reporting Channels", fr: "Canaux de signalement" },
                    d: { en: "Official reporting authorities across every continent, Africa first", fr: "Autorités officielles de signalement sur tous les continents, l’Afrique en priorité" },
                  },
                ].map((r, i) => (
                  <Reveal key={r.href} delay={80 + i * 60}>
                    <li>
                      <A href={r.href} className="group flex items-center gap-4 py-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-brand-600 ring-1 ring-line-200">
                          <r.icon size={17} strokeWidth={1.9} aria-hidden />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-heading text-[14.5px] font-semibold text-ink-900 group-hover:text-brand-600">
                            {R(r.t, locale)}
                          </span>
                          <span className="mt-0.5 block text-[12.5px] text-slatex-600">{R(r.d, locale)}</span>
                        </span>
                        <ChevronRight size={16} aria-hidden className="text-slatex-400 group-hover:text-brand-600" />
                      </A>
                    </li>
                  </Reveal>
                ))}
              </ul>
              <Reveal delay={400} className="mt-6">
                <LinkG href="/resources">{fr ? "Tout le centre de ressources" : "Explore the Resource Centre"}</LinkG>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 10 · SERVICES ═══ */}
      <section className="section-y bg-white">
        <div className="container-g">
          <Reveal>
            <Masthead num="07" eyebrow={R(L.services.eyebrow, locale)} />
          </Reveal>
          <div className="mt-8 max-w-2xl">
            <Reveal delay={60}>
              <h2 className="h2-g">{R(L.services.h2, locale)}</h2>
            </Reveal>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <Reveal delay={100}>
              <div className="card-g h-full p-7">
                <div className="flex items-center justify-between">
                  <h3 className="h3-g">{R(L.services.freeTitle, locale)}</h3>
                  <span className="chip-g bg-[#159769]/10 text-[#0d6e4a]">{R(L.services.freeTag, locale)}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {L.services.free.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[14px] text-ink-700">
                      <Check size={15} className="mt-1 shrink-0 text-risk-low" aria-hidden />
                      {R(f, locale)}
                    </li>
                  ))}
                </ul>
                <div className="mt-7">
                  <Btn href="/resources" variant="outline">{R(L.services.freeCta, locale)}</Btn>
                </div>
              </div>
            </Reveal>
            <Reveal delay={180}>
              <div className="on-dark h-full rounded-[14px] bg-navy-950 p-7 ring-1 ring-white/10">
                <div className="flex items-center justify-between">
                  <h3 className="h3-g text-white">{R(L.services.paidTitle, locale)}</h3>
                </div>
                <ul className="mt-6 space-y-3">
                  {L.services.paid.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[14px] text-slatex-300">
                      <Check size={15} className="mt-1 shrink-0 text-cyanx-500" aria-hidden />
                      {R(f, locale)}
                    </li>
                  ))}
                </ul>
                <div className="mt-7">
                  <Btn href="/services" variant="outlineDark">{R(L.services.paidCta, locale)}</Btn>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ 11 · ALERTS & NEWS ═══ */}
      <section className="section-y bg-mist-50">
        <div className="container-g">
          <Reveal>
            <Masthead num="08" eyebrow={R(L.newsSec.eyebrow, locale)} />
          </Reveal>
          <div className="mt-8 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal delay={60}>
                <h2 className="h2-g">{R(L.newsSec.h2, locale)}</h2>
              </Reveal>
              {/* Lead alert */}
              {alerts[0] ? (
                <Reveal delay={110}>
                  <A href={`/alerts/${alerts[0].id}`} className="group mt-7 block">
                    <article className="card-g hoverable overflow-hidden">
                      <div className="grid sm:grid-cols-5">
                        <div className="sm:col-span-2">
                          <img
                            src={alerts[0].imageUrl}
                            alt={fr ? "Illustration : scène associée à l'alerte" : "Illustration: scene related to the alert"}
                            width={1200}
                            height={896}
                            loading="lazy"
                            className="img-editorial h-full min-h-[160px] w-full object-cover"
                          />
                        </div>
                        <div className="p-5 sm:col-span-3">
                          <div className="flex flex-wrap items-center gap-2.5">
                            <RiskBadge risk={alerts[0].risk} />
                            <span className="text-[12px] font-medium uppercase tracking-wide text-slatex-400">
                              {alerts[0].country}
                            </span>
                          </div>
                          <h3 className="h3-g mt-2.5 text-[1.05rem] leading-snug">{R(alerts[0].title, locale)}</h3>
                          <p className="mt-2 line-clamp-2 text-[13.5px] text-slatex-600">
                            {R(alerts[0].summary, locale)}
                          </p>
                        </div>
                      </div>
                    </article>
                  </A>
                </Reveal>
              ) : null}
              {/* Alert briefs */}
              <ul className="mt-4 divide-y divide-line-200">
                {alerts.slice(1).map((a, i) => (
                  <Reveal key={a.id} delay={140 + i * 60}>
                    <li>
                      <A href={`/alerts/${a.id}`} className="group flex items-center gap-4 py-3.5">
                        <RiskBadge risk={a.risk} />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-heading text-[14px] font-semibold text-ink-900 group-hover:text-brand-600">
                            {R(a.title, locale)}
                          </span>
                          <span className="text-[12px] text-slatex-400">{a.country}</span>
                        </span>
                        <ChevronRight size={15} aria-hidden className="text-slatex-400 group-hover:text-brand-600" />
                      </A>
                    </li>
                  </Reveal>
                ))}
              </ul>
              <Reveal delay={280} className="mt-5">
                <LinkG href="/alerts">{fr ? "Toutes les alertes" : "All alerts"}</LinkG>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={120}>
                <p className="eyebrow mb-4">{R(L.newsSec.news, locale)}</p>
                <ul className="space-y-4">
                  {articles.map((art) => (
                    <li key={art.id}>
                      <A href={`/news/${art.id}`} className="group flex gap-4">
                        <img
                          src={art.imageUrl}
                          alt={fr ? "Illustration de l'article" : "Article illustration"}
                          width={1200}
                          height={896}
                          loading="lazy"
                          className="img-editorial h-16 w-20 shrink-0 rounded-lg object-cover ring-1 ring-line-200"
                        />
                        <span className="min-w-0">
                          <span className="block font-heading text-[13.5px] font-semibold leading-snug text-ink-900 group-hover:text-brand-600">
                            {R(art.title, locale)}
                          </span>
                          <span className="mt-1 block text-[12px] text-slatex-400">
                            {R(art.tag, locale)} · {art.author}
                          </span>
                        </span>
                      </A>
                    </li>
                  ))}
                </ul>
                <div className="mt-5">
                  <LinkG href="/news">{fr ? "Tous les articles" : "All articles"}</LinkG>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 12 · CASE FILES ═══ */}
      <section className="section-y bg-white">
        <div className="container-g">
          <Reveal>
            <Masthead num="09" eyebrow={fr ? "Dossiers" : "Case files"} />
          </Reveal>
          <div className="mt-8 max-w-2xl">
            <Reveal delay={60}>
              <h2 className="h2-g">
                {fr ? "Trois schémas, trois leçons." : "Three patterns, three lessons."}
              </h2>
              <p className="lead-g mt-3">
                {fr
                  ? "Dossiers illustratifs construits à partir de schémas récurrents signalés au public. Ce ne sont pas des affaires réelles."
                  : "Illustrative dossiers built from recurring publicly-reported patterns. These are not real cases."}
              </p>
            </Reveal>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {CASES.map((c, i) => (
              <Reveal key={i} delay={80 + i * 90}>
                <article className="card-g hoverable flex h-full flex-col overflow-hidden">
                  <div className="relative">
                    <img
                      src={c.image}
                      alt={fr ? "Illustration : scène associée au dossier" : "Illustration: scene related to the case file"}
                      width={1200}
                      height={900}
                      loading="lazy"
                      className="img-editorial aspect-[16/10] w-full object-cover"
                    />
                    <span className="absolute left-3 top-3 rounded-md bg-navy-950/85 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white/90 backdrop-blur-[2px]">
                      {R(c.scope, locale)}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="eyebrow">{R(c.category, locale)}</p>
                    <h3 className="mt-1.5 font-heading text-[15.5px] font-semibold leading-snug text-ink-900">
                      {R(c.title, locale)}
                    </h3>
                    <p className="mt-2.5 flex-1 text-[13.5px] leading-relaxed text-slatex-600">{R(c.body, locale)}</p>
                    <div className="mt-4 rounded-lg border-l-[3px] border-signal-500 bg-signal-100/50 px-3.5 py-2.5 text-[12.5px] font-medium leading-relaxed text-ink-700">
                      <span className="font-heading text-[11px] font-bold uppercase tracking-wider text-signal-600">
                        {fr ? "À retenir" : "Key takeaway"} ·{" "}
                      </span>
                      {R(c.lesson, locale)}
                    </div>
                    <A
                      href={c.href}
                      className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-600 hover:text-brand-700"
                    >
                      {fr ? "Lire le guide associé" : "Read the matching guide"}
                      <ChevronRight size={14} aria-hidden />
                    </A>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 12b · FAQ (mirrors FAQPage structured data) ═══ */}
      <FaqSection />

      {/* ═══ 13 · BRIEFING / NEWSLETTER (dark) ═══ */}
      <NewsletterSection />

      {/* ═══ 14 · CLOSING ═══ */}
      <section className="on-dark bg-navy-900">
        <div className="container-g flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center">
          <Reveal>
            <h2 className="h2-g max-w-xl text-white">{R(L.final.h2, locale)}</h2>
          </Reveal>
          <Reveal delay={120} className="flex flex-wrap gap-3">
            <Btn href="/report" variant="signal">{R(L.report, locale)}</Btn>
            <Btn href="/contact" variant="outlineDark">{R(L.final.contact, locale)}</Btn>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ---------------- FAQ section (mirrors FAQPage structured data) ---------------- */

function FaqSection() {
  const { locale } = useI18n();
  const fr = locale === "fr";
  return (
    <section className="section-y bg-mist-50" id="faq">
      <div className="container-g">
        <Reveal>
          <Masthead num="10" eyebrow={fr ? "Questions fréquentes" : "Frequently asked questions"} />
        </Reveal>
        <div className="mt-8 max-w-2xl">
          <Reveal delay={60}>
            <h2 className="h2-g">{fr ? "Les questions que tout le monde se pose." : "The questions everyone asks."}</h2>
            <p className="lead-g mt-3">
              {fr
                ? "Des réponses directes, fondées sur nos propres guides — en anglais comme en français."
                : "Direct answers, grounded in our own guidance — in English and in French."}
            </p>
          </Reveal>
        </div>
        <Reveal delay={120} className="mt-8">
          <Accordion type="single" collapsible className="divide-y divide-line-200 rounded-xl border border-line-200 bg-white">
            {FAQ_ITEMS.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-0">
                <AccordionTrigger className="px-5 py-4 text-left font-heading text-[14.5px] font-semibold text-ink-900 hover:no-underline hover:text-brand-600 [&>svg]:text-brand-600">
                  {R(f.q, locale)}
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-4 text-[13.5px] leading-relaxed text-slatex-600">
                  {R(f.a, locale)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Newsletter section ---------------- */

function NewsletterSection() {
  const { locale } = useI18n();
  const fr = locale === "fr";
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", country: "", language: locale });
  const [errs, setErrs] = useState<Record<string, string>>({});

  React.useEffect(() => {
    setForm((f) => ({ ...f, language: locale }));
  }, [locale]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = fr ? "Ce champ est obligatoire." : "This field is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = fr ? "Saisissez une adresse électronique valide." : "Enter a valid email address.";
    setErrs(next);
    if (Object.keys(next).length > 0) return;
    setState("busy");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setState("done");
    } catch {
      setState("error");
    }
  }

  return (
    <section className="on-dark section-y bg-navy-950">
      <div className="container-g grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <Masthead num="10" eyebrow={fr ? "Bulletin" : "Briefing"} dark />
            <h2 className="h2-g mt-6 text-white">{R(L.nl.h2, locale)}</h2>
            <p className="lead-g mt-4">{R(L.nl.body, locale)}</p>
          </Reveal>
        </div>
        <div className="lg:col-span-7">
          <Reveal delay={100}>
            <form onSubmit={submit} className="card-dark-g p-6 lg:p-8" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="nl-name" className="mb-2 block font-heading text-[12.5px] font-semibold text-white">
                    {R(L.nl.name, locale)}
                  </label>
                  <input
                    id="nl-name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="field-g !border-white/15 !bg-white/[0.06] !text-white placeholder:!text-slatex-400"
                    placeholder={fr ? "Votre nom" : "Your name"}
                    autoComplete="name"
                  />
                  {errs.name ? <p className="mt-1.5 text-[12px] text-signal-400">{errs.name}</p> : null}
                </div>
                <div>
                  <label htmlFor="nl-email" className="mb-2 block font-heading text-[12.5px] font-semibold text-white">
                    {R(L.nl.email, locale)} *
                  </label>
                  <input
                    id="nl-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="field-g !border-white/15 !bg-white/[0.06] !text-white placeholder:!text-slatex-400"
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                  {errs.email ? <p className="mt-1.5 text-[12px] text-signal-400">{errs.email}</p> : null}
                </div>
                <div>
                  <label htmlFor="nl-country" className="mb-2 block font-heading text-[12.5px] font-semibold text-white">
                    {R(L.nl.country, locale)}
                  </label>
                  <input
                    id="nl-country"
                    value={form.country}
                    onChange={(e) => setForm({ ...form, country: e.target.value })}
                    className="field-g !border-white/15 !bg-white/[0.06] !text-white placeholder:!text-slatex-400"
                    placeholder={fr ? "Cameroun" : "Cameroon"}
                    autoComplete="country-name"
                  />
                </div>
                <div>
                  <label htmlFor="nl-lang" className="mb-2 block font-heading text-[12.5px] font-semibold text-white">
                    {R(L.nl.language, locale)}
                  </label>
                  <select
                    id="nl-lang"
                    value={form.language}
                    onChange={(e) => setForm({ ...form, language: e.target.value })}
                    className="field-g !border-white/15 !bg-white/[0.06] !text-white"
                  >
                    <option value="en" className="text-ink-900">English</option>
                    <option value="fr" className="text-ink-900">Français</option>
                  </select>
                </div>
              </div>
              <label className="mt-5 flex items-start gap-3 text-[13px] text-slatex-300">
                <input
                  type="checkbox"
                  required
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-white/25 bg-white/10 accent-cyanx-500"
                />
                <span>{R(L.nl.consent, locale)}</span>
              </label>
              {state === "done" ? (
                <p role="status" className="mt-5 rounded-lg border border-cyanx-500/30 bg-cyanx-500/10 px-4 py-3 text-[13.5px] font-medium text-cyanx-500">
                  {R(L.nl.done, locale)}
                </p>
              ) : (
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Btn type="submit" variant="primary" disabled={state === "busy"}>
                    {state === "busy" ? (fr ? "Envoi…" : "Sending…") : R(L.nl.submit, locale)}
                  </Btn>
                  {state === "error" ? (
                    <p role="alert" className="text-[13px] text-signal-400">{R(L.nl.err, locale)}</p>
                  ) : null}
                </div>
              )}
            </form>
          </Reveal>
          <Reveal delay={180}>
            <div className="mt-6 flex flex-wrap items-center gap-4 rounded-xl border border-white/12 bg-white/[0.03] p-5">
              <p className="min-w-0 flex-1 text-[13.5px] text-slatex-300">
                {fr ? "Déjà victime d’une arnaque ?" : "Already affected by a scam?"}
              </p>
              <div className="flex flex-wrap gap-2.5">
                <Btn href="/report" variant="outlineDark" size="sm">{R(L.report, locale)}</Btn>
                <Btn href="/victim-support" variant="outlineDark" size="sm">
                  {fr ? "Aide aux victimes" : "Victim support"}
                </Btn>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function setConsent(_v: boolean) {
  /* consent tracked by required checkbox; no-op state holder */
}

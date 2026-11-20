"use client";

/**
 * Resource Centre — landing page and sub-router for /resources/* routes.
 * Sections: Practical Tools, Knowledge & Tools, Video Learning, Scam Checker,
 * Reporting Channels (with victim action guide) and unified search.
 */

import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  CirclePlay,
  FileDown,
  Globe,
  ListChecks,
  Search,
  ShieldCheck,
  Siren,
} from "lucide-react";
import { A, useRouter } from "@/lib/router";
import { useI18n } from "@/lib/i18n";
import { R } from "@/lib/content/copy";
import { ZITE_CONTENT } from "@/lib/content/zite-data";
import { Btn, PageHero, Reveal, SectionHeading } from "@/components/shared/ui";
import {
  ArticleCard,
  ChecklistCard,
  LoadError,
  LoadingGrid,
  RESOURCE_SECTIONS,
  StatRow,
  VideoCard,
  categoryLabel,
  continentLabel,
  useApiData,
  type OverviewDTO,
  type VideoDTO,
} from "./resources-parts";
import { ArticleLibraryView, ArticleDetailView } from "./resources-articles";
import { KnowledgeToolsView } from "./resources-knowledge";
import { VideoCentreView } from "./resources-videos";
import { ScamCheckerView } from "./resources-checker";
import {
  DirectoryView,
  CountryDetailView,
  VictimGuideView,
} from "./resources-directory";

export function ResourcesView() {
  const { route } = useRouter();
  const parts = route.parts; // e.g. ["practical-tools", "slug"]

  if (parts.length === 0) return <ResourceCentreLanding />;

  const section = parts[0];
  const rest = parts.slice(1);

  if (section === "practical-tools") {
    if (rest.length === 0) return <ArticleLibraryView />;
    return <ArticleDetailView slug={rest[0]} />;
  }
  if (section === "knowledge-tools") return <KnowledgeToolsView />;
  if (section === "video-learning") return <VideoCentreView />;
  if (section === "scam-checker") return <ScamCheckerView />;
  if (section === "reporting-channels") {
    if (rest.length === 0) return <DirectoryView />;
    if (rest[0] === "victim-guide") return <VictimGuideView />;
    if (/^[A-Za-z]{2}$/.test(rest[0])) return <CountryDetailView code={rest[0].toUpperCase()} />;
    return <DirectoryView />;
  }
  if (section === "search") return <UnifiedSearchView />;

  return <ResourceCentreLanding />;
}

/* ------------------------------------------------------------------ */
/* Landing                                                             */
/* ------------------------------------------------------------------ */

function ResourceCentreLanding() {
  const { locale, formatDate } = useI18n();
  const fr = locale === "fr";
  const { data, error, loading, retry } = useApiData<OverviewDTO>("/api/resources/overview");
  const [q, setQ] = useState("");
  const router = useRouter();

  const alerts = ZITE_CONTENT.alerts.slice(0, 3);
  const priorityCountries = useMemo(
    () => (data?.countries ?? []).filter((c) => c.priority).slice(0, 12),
    [data]
  );

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = q.trim();
    if (query.length >= 2) router.navigate(`/resources/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <>
      <PageHero
        eyebrow={fr ? "Centre de ressources" : "Resource Centre"}
        title={
          fr
            ? "Votre hub de connaissances et de protection numérique."
            : "Your knowledge and digital-protection hub."
        }
        lead={
          fr
            ? "Guides pratiques, listes de vérification imprimables, vidéos, vérificateur d’arnaques et annuaire mondial des canaux de signalement — tout ce qu’il faut pour reconnaître, éviter et signaler les arnaques, au Cameroun, en Afrique et partout ailleurs."
            : "Practical guides, printable checklists, videos, a scam checker and a global reporting directory — everything you need to recognise, avoid and report scams in Cameroon, Africa and beyond."
        }
        image="/images/gen/resource-centre-hero.jpg"
        imageAlt={fr ? "Personne étudiant des guides de sécurité sur son bureau" : "Person studying safety guides at a desk"}
        breadcrumb={[{ label: fr ? "Centre de ressources" : "Resource Centre" }]}
      >
        <form onSubmit={submitSearch} role="search" className="mt-2 max-w-xl">
          <label htmlFor="rc-search" className="sr-only">
            {fr ? "Rechercher dans le centre de ressources" : "Search the Resource Centre"}
          </label>
          <div className="flex overflow-hidden rounded-xl border border-white/20 bg-white/[0.08] backdrop-blur-sm focus-within:border-cyanx-500/70">
            <input
              id="rc-search"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              maxLength={90}
              placeholder={
                fr
                  ? "Rechercher un guide, une liste, une vidéo…"
                  : "Search a guide, checklist, video…"
              }
              className="h-12 min-w-0 flex-1 bg-transparent px-4 text-[14.5px] text-white placeholder:text-slatex-400 focus:outline-none"
            />
            <button type="submit" className="btn-g btn-primary-g m-1.5 !h-9 shrink-0" aria-label={fr ? "Rechercher" : "Search"}>
              <Search size={15} aria-hidden />
              <span className="hidden sm:inline">{fr ? "Rechercher" : "Search"}</span>
            </button>
          </div>
        </form>
      </PageHero>

      {/* Quick access tiles */}
      <section className="section-y bg-white" aria-labelledby="rc-sections">
        <div className="container-g">
          <span id="rc-sections" className="sr-only">{fr ? "Sections du centre de ressources" : "Resource Centre sections"}</span>
          <Reveal>
            <SectionHeading
              eyebrow={fr ? "Accès rapide" : "Quick access"}
              title={fr ? "Tout ce dont vous avez besoin, organisé." : "Everything you need, organised."}
            />
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: BookOpen, href: "/resources/practical-tools", t: { en: "Practical Tools to Protect Yourself", fr: "Outils pratiques pour vous protéger" }, d: { en: "36 in-depth guides covering online, money, social, business and emerging scams.", fr: "36 guides approfondis : en ligne, argent, social, entreprise et arnaques émergentes." }, accent: "bg-brand-50 text-brand-600" },
              { icon: ListChecks, href: "/resources/knowledge-tools", t: { en: "Knowledge & Tools", fr: "Savoir et outils" }, d: { en: "Searchable knowledge library, external resources and printable checklists.", fr: "Bibliothèque de recherche, ressources externes et listes imprimables." }, accent: "bg-mist-50 text-brand-600" },
              { icon: CirclePlay, href: "/resources/video-learning", t: { en: "Video Learning Centre", fr: "Centre d’apprentissage vidéo" }, d: { en: "Short, practical lessons from trusted institutions worldwide.", fr: "Des leçons courtes et pratiques d’institutions fiables du monde entier." }, accent: "bg-[#d23434]/10 text-[#a52222]" },
              { icon: ShieldCheck, href: "/resources/scam-checker", t: { en: "Scam Checker", fr: "Vérificateur d’arnaques" }, d: { en: "Examine a suspicious message or offer for warning signs — free, no account.", fr: "Examinez un message ou une offre suspecte — gratuit, sans compte." }, accent: "bg-[#159769]/10 text-[#0d6e4a]" },
              { icon: Globe, href: "/resources/reporting-channels", t: { en: "Reporting Channels", fr: "Canaux de signalement" }, d: { en: "Official reporting authorities for 67 countries, organised by continent.", fr: "Autorités officielles pour 67 pays, par continent." }, accent: "bg-signal-100/60 text-signal-600" },
              { icon: Siren, href: "/alerts", t: { en: "Latest Scam Alerts", fr: "Dernières alertes" }, d: { en: "Current warnings based on what people are reporting now.", fr: "Avertissements actuels basés sur les signalements." }, accent: "bg-[#d75c09]/10 text-[#a34306]" },
              { icon: ListChecks, href: "/resources/knowledge-tools?tab=checklists", t: { en: "Prevention Checklists", fr: "Listes de prévention" }, d: { en: "15 printable bilingual checklists with tick boxes, free to download.", fr: "15 listes bilingues à imprimer, avec cases à cocher." }, accent: "bg-brand-50 text-brand-600" },
              { icon: Siren, href: "/resources/reporting-channels/victim-guide", t: { en: "Victim Action Guide", fr: "Guide d’action des victimes" }, d: { en: "Scammed? The five urgent steps, in the right order.", fr: "Victime ? Les cinq étapes urgentes, dans l’ordre." }, accent: "bg-[#d23434]/10 text-[#a52222]" },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 60}>
                <A href={s.href} className="group block h-full">
                  <article className="card-g hoverable flex h-full flex-col p-5">
                    <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${s.accent}`}>
                      <s.icon size={20} strokeWidth={1.9} aria-hidden />
                    </span>
                    <h3 className="mt-3.5 font-heading text-[15px] font-semibold leading-snug text-ink-900">
                      {R(s.t as { en: string; fr: string }, locale)}
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-slatex-600">
                      {R(s.d as { en: string; fr: string }, locale)}
                    </p>
                    <span className="mt-auto pt-3 text-[12.5px] font-semibold text-brand-600">
                      {fr ? "Explorer" : "Explore"}
                      <ArrowRight size={13} className="ml-1 inline transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </article>
                </A>
              </Reveal>
            ))}
          </div>

          {/* Stats */}
          <Reveal className="mt-12">
            {data ? (
              <StatRow
                items={[
                  { value: data.counts.articles, label: { en: "In-depth guides", fr: "Guides approfondis" } },
                  { value: data.counts.checklists, label: { en: "Printable checklists", fr: "Listes imprimables" } },
                  { value: data.counts.videos, label: { en: "Video lessons", fr: "Leçons vidéo" } },
                  { value: data.counts.countries, label: { en: "Countries covered", fr: "Pays couverts" } },
                ]}
              />
            ) : null}
          </Reveal>
        </div>
      </section>

      {/* Featured articles */}
      <section className="section-y bg-mist-30" aria-labelledby="rc-featured">
        <div className="container-g">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading
                eyebrow={fr ? "À la une" : "Featured"}
                title={fr ? "Articles pédagogiques en vedette." : "Featured educational articles."}
              />
              <A href="/resources/practical-tools" className="link-g">
                {fr ? "Tous les guides" : "All guides"}
                <ArrowRight size={15} strokeWidth={2.2} aria-hidden />
              </A>
            </div>
          </Reveal>
          <div className="mt-8">
            {loading ? (
              <LoadingGrid count={3} />
            ) : error ? (
              <LoadError onRetry={retry} />
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {(data?.featuredArticles ?? []).slice(0, 4).map((a, i) => (
                  <Reveal key={a.slug} delay={i * 70}>
                    <ArticleCard article={a} eager={i < 2} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Popular + latest */}
      <section className="section-y bg-white" aria-labelledby="rc-popular">
        <div className="container-g grid gap-10 lg:grid-cols-2">
          <div>
            <Reveal>
              <SectionHeading
                eyebrow={fr ? "Populaires" : "Popular"}
                title={fr ? "Guides de protection les plus consultés." : "Most-consulted protection guides."}
              />
            </Reveal>
            <ul className="mt-6 divide-y divide-line-200">
              {(data?.popularArticles ?? []).slice(0, 6).map((a, i) => (
                <Reveal key={a.slug} delay={i * 50}>
                  <li>
                    <A href={`/resources/practical-tools/${a.slug}`} className="group flex items-start gap-4 py-4">
                      <span className="mast-num pt-0.5 text-[15px]">{String(i + 1).padStart(2, "0")}</span>
                      <div className="min-w-0">
                        <h3 className="font-heading text-[14.5px] font-semibold leading-snug text-ink-900 group-hover:text-brand-600">
                          {R(a.title, locale)}
                        </h3>
                        <p className="mt-1 text-[12.5px] text-slatex-500">
                          {categoryLabel(a.categorySlug, locale)} · {a.readingMinutes} min
                        </p>
                      </div>
                      <ChevronRight size={16} className="ml-auto mt-1 shrink-0 text-slatex-300 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-600" aria-hidden />
                    </A>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
          <div>
            <Reveal>
              <SectionHeading
                eyebrow={fr ? "Nouveautés" : "Recently published"}
                title={fr ? "Dernières ressources publiées." : "Latest published resources."}
              />
            </Reveal>
            <ul className="mt-6 space-y-3">
              {(data?.latestArticles ?? []).slice(0, 3).map((a, i) => (
                <Reveal key={a.slug} delay={i * 60}>
                  <li>
                    <A href={`/resources/practical-tools/${a.slug}`} className="group flex items-center gap-4">
                      <img
                        src={a.imageUrl}
                        alt=""
                        width={112}
                        height={64}
                        loading="lazy"
                        className="img-editorial h-16 w-28 shrink-0 rounded-lg object-cover"
                      />
                      <div className="min-w-0">
                        <h3 className="font-heading text-[14px] font-semibold leading-snug text-ink-900 group-hover:text-brand-600">
                          {R(a.title, locale)}
                        </h3>
                        <p className="mt-1 text-[12px] text-slatex-400">{formatDate(a.publishedAt)}</p>
                      </div>
                    </A>
                  </li>
                </Reveal>
              ))}
              {(data?.latestChecklists ?? []).slice(0, 2).map((c, i) => (
                <Reveal key={c.slug} delay={180 + i * 60}>
                  <li>
                    <A href="/resources/knowledge-tools?tab=checklists" className="group flex items-center gap-4">
                      <span className="flex h-16 w-28 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                        <ListChecks size={22} strokeWidth={1.8} aria-hidden />
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-heading text-[14px] font-semibold leading-snug text-ink-900 group-hover:text-brand-600">
                          {R(c.title, locale)}
                        </h3>
                        <p className="mt-1 text-[12px] text-slatex-400">
                          {fr ? "Liste à imprimer" : "Printable checklist"} · {formatDate(c.publishedAt)}
                        </p>
                      </div>
                    </A>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Video highlights */}
      <section className="section-y bg-mist-30" aria-labelledby="rc-videos">
        <div className="container-g">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading
                eyebrow={fr ? "Apprendre en vidéo" : "Video learning"}
                title={fr ? "Apprenez à repérer et prévenir les arnaques." : "Learn to spot and prevent scams."}
                lead={fr ? "Des vidéos courtes. Des leçons pratiques. Des vies numériques plus sûres." : "Short videos. Practical lessons. Safer digital lives."}
              />
              <A href="/resources/video-learning" className="link-g">
                {fr ? "Toutes les vidéos" : "All videos"}
                <ArrowRight size={15} strokeWidth={2.2} aria-hidden />
              </A>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(data?.videos ?? []).slice(0, 4).map((v, i) => (
              <Reveal key={v.youtubeId} delay={i * 70}>
                <VideoCard video={v} onOpen={(vid) => router.navigate("/resources/video-learning")} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Scam Checker CTA */}
      <section className="section-y bg-white">
        <div className="container-g">
          <Reveal>
            <div className="on-dark relative overflow-hidden rounded-2xl bg-navy-950 p-8 sm:p-10">
              <div
                aria-hidden
                className="absolute inset-0 bg-[url('/images/gen/check-verify.jpg')] bg-cover bg-center opacity-20"
              />
              <div className="hero-scrim absolute inset-0" aria-hidden />
              <div className="relative max-w-2xl">
                <p className="eyebrow mb-3 !text-cyanx-500">{fr ? "Outil phare" : "Flagship tool"}</p>
                <h2 className="h2-g text-white">
                  {fr ? "Pas sûr qu’un message soit légitime ?" : "Not sure whether a message is legitimate?"}
                </h2>
                <p className="lead-g mt-4 text-slatex-300">
                  {fr
                    ? "Utilisez le GLOPROFAS Scam Checker pour examiner les signaux d’alerte et repérer les schémas suspects — gratuitement, sans compte, en anglais comme en français."
                    : "Use the GLOPROFAS Scam Checker to examine common warning signs and identify potentially suspicious patterns — free, no account, in English or French."}
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Btn href="/resources/scam-checker" variant="primary">
                    <ShieldCheck size={16} aria-hidden />
                    {fr ? "Ouvrir le Scam Checker" : "Open the Scam Checker"}
                  </Btn>
                  <Btn href="/resources/reporting-channels/victim-guide" variant="outlineDark">
                    {fr ? "Déjà victime ? Les 5 étapes" : "Already affected? The 5 steps"}
                  </Btn>
                </div>
                <ul className="mt-7 grid gap-2 sm:grid-cols-2">
                  {[
                    { en: "Paste a message or select warning signs", fr: "Collez un message ou cochez des signaux" },
                    { en: "Clear explanations of every detected pattern", fr: "Chaque schéma détecté expliqué clairement" },
                    { en: "Recommended next steps and reporting channels", fr: "Prochaines étapes et canaux de signalement" },
                    { en: "Privacy-first: nothing is stored", fr: "Confidentialité : rien n’est conservé" },
                  ].map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[13.5px] text-slatex-300">
                      <Check size={14} className="mt-1 shrink-0 text-cyanx-500" aria-hidden />
                      {R(f as { en: string; fr: string }, locale)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Checklists */}
      <section className="section-y bg-mist-30" aria-labelledby="rc-checklists">
        <div className="container-g">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading
                eyebrow={fr ? "À imprimer" : "Print & share"}
                title={fr ? "Listes de vérification en vedette." : "Featured downloadable checklists."}
                lead={
                  fr
                    ? "Avec cases à cocher, signaux d’alerte et références officielles. Bilingues, sans inscription — à partager en famille, à l’école, à l’église et dans les groupes communautaires."
                    : "With tick boxes, warning signs and official references. Bilingual, no registration — to share at home, at school, at church and in community groups."
                }
              />
              <A href="/resources/knowledge-tools?tab=checklists" className="link-g">
                {fr ? "Les 15 listes" : "All 15 checklists"}
                <ArrowRight size={15} strokeWidth={2.2} aria-hidden />
              </A>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(data?.featuredChecklists ?? []).slice(0, 3).map((c, i) => (
              <Reveal key={c.slug} delay={i * 70}>
                <ChecklistCard checklist={c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reporting directory */}
      <section className="section-y bg-white" aria-labelledby="rc-directory">
        <div className="container-g">
          <Reveal>
            <SectionHeading
              eyebrow={fr ? "Canaux de signalement" : "Reporting channels"}
              title={fr ? "Où signaler arnaques et cybercriminalité." : "Where to report scams and cybercrime."}
              lead={
                fr
                  ? "Les bons canaux officiels diffèrent selon le pays et le type de fraude. Sélectionnez votre pays pour voir les autorités compétentes, leurs rôles et leurs liens officiels."
                  : "The right official channels differ by country and fraud type. Select your country to see the competent authorities, their roles and official links."
              }
            />
          </Reveal>
          <div className="mt-8">
            <Reveal delay={80}>
              <A
                href="/resources/reporting-channels?help=1"
                className="card-g hoverable mb-6 flex flex-wrap items-center gap-4 border-signal-300/50 bg-signal-100/40 p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-signal-500/15 text-signal-600">
                  <Siren size={20} aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-heading text-[15px] font-semibold text-ink-900">
                    {fr ? "Je ne sais pas où signaler mon arnaque." : "I don’t know where to report my scam."}
                  </p>
                  <p className="mt-0.5 text-[13px] text-slatex-600">
                    {fr ? "Répondez à deux questions, nous vous guidons." : "Answer two questions and we’ll guide you."}
                  </p>
                </div>
                <ArrowRight size={18} className="shrink-0 text-signal-600" aria-hidden />
              </A>
            </Reveal>

            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
              {priorityCountries.map((c, i) => (
                <Reveal key={c.code} delay={Math.min(i, 8) * 40}>
                  <A href={`/resources/reporting-channels/${c.code}`} className="group block">
                    <span className="card-g hoverable flex items-center gap-3 px-4 py-3.5">
                      <span aria-hidden className="text-[22px] leading-none">{countryFlag(c.code)}</span>
                      <span className="min-w-0 flex-1 truncate font-heading text-[13.5px] font-semibold text-ink-900">
                        {locale === "fr" ? c.nameFr : c.name}
                      </span>
                      <ChevronRight size={15} className="shrink-0 text-slatex-300 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-600" aria-hidden />
                    </span>
                  </A>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-6">
              <p className="text-[13px] text-slatex-500">
                {fr ? "Couverture prioritaire : 25 pays africains, plus " : "Priority coverage: 25 African countries, plus "}
                {fr ? "42 pays sur les cinq autres continents." : "42 countries across the other five continents."}{" "}
                <A href="/resources/reporting-channels" className="link-g">
                  {fr ? "Annuaire complet" : "Full directory"}
                  <ArrowRight size={13} strokeWidth={2.2} aria-hidden />
                </A>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Latest alerts strip */}
      <section className="section-y bg-navy-950 on-dark" aria-labelledby="rc-alerts">
        <div className="container-g">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading
                dark
                eyebrow={fr ? "Alertes en cours" : "Current alerts"}
                title={fr ? "Ce que l’on signale en ce moment." : "What people are reporting now."}
              />
              <A href="/alerts" className="link-g !text-cyanx-500">
                {fr ? "Toutes les alertes" : "All alerts"}
                <ArrowRight size={15} strokeWidth={2.2} aria-hidden />
              </A>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {alerts.map((a, i) => (
              <Reveal key={a.id} delay={i * 70}>
                <A href={`/alerts/${a.id}`} className="group block h-full">
                  <article className="card-dark-g h-full p-5">
                    <p className="eyebrow !text-cyanx-500">{R(a.category, locale)}</p>
                    <h3 className="mt-2.5 font-heading text-[15px] font-semibold leading-snug text-white group-hover:text-cyanx-500">
                      {R(a.title, locale)}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-slatex-300">
                      {R(a.summary, locale)}
                    </p>
                    <p className="mt-3 text-[12px] text-slatex-400">{formatDate(a.date)}</p>
                  </article>
                </A>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function countryFlag(code: string): string {
  return String.fromCodePoint(...[...code.toUpperCase()].map((c) => 127397 + c.charCodeAt(0)));
}

/* ------------------------------------------------------------------ */
/* Unified search                                                      */
/* ------------------------------------------------------------------ */

function UnifiedSearchView() {
  const { locale } = useI18n();
  const fr = locale === "fr";
  const router = useRouter();
  const initial = useMemo(() => {
    const h = typeof window !== "undefined" ? window.location.hash : "";
    const m = h.match(/[?&]q=([^&]*)/);
    return m ? decodeURIComponent(m[1]).slice(0, 90) : "";
  }, []);
  const [q, setQ] = useState(initial);
  const [submitted, setSubmitted] = useState(initial);

  const articlesQ = submitted.trim().length >= 2 ? `/api/resources/articles?full=1&q=${encodeURIComponent(submitted.trim())}` : null;
  const { data: articlesData, loading: articlesLoading } = useApiData<{ count: number; articles: (OverviewDTO["featuredArticles"][number] & Record<string, unknown>)[] }>(articlesQ);
  const { data: checklistsData, loading: checklistsLoading } = useApiData<{ checklists: { slug: string; title: { en: string; fr: string }; subtitle: { en: string; fr: string }; intro: { en: string; fr: string }; pdfEn: string; pdfFr: string; category: string }[] }>(
    submitted.trim().length >= 2 ? "/api/resources/checklists" : null
  );
  const { data: videosData, loading: videosLoading } = useApiData<{ videos: VideoDTO[] }>(
    submitted.trim().length >= 2 ? "/api/resources/videos" : null
  );

  const query = submitted.trim().toLowerCase();
  const checklists = useMemo(() => {
    if (!checklistsData || query.length < 2) return [];
    return checklistsData.checklists.filter((c) =>
      `${c.title.en} ${c.title.fr} ${c.subtitle.en} ${c.subtitle.fr} ${c.intro.en} ${c.intro.fr}`.toLowerCase().includes(query)
    );
  }, [checklistsData, query]);
  const videos = useMemo(() => {
    if (!videosData || query.length < 2) return [];
    return videosData.videos.filter((v) =>
      `${v.title.en} ${v.title.fr} ${v.description.en} ${v.description.fr} ${v.publisher}`.toLowerCase().includes(query)
    );
  }, [videosData, query]);

  useEffect(() => {
    document.title = `${fr ? "Recherche" : "Search"}: ${submitted} · GLOPROFAS`;
  }, [submitted, fr]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = q.trim();
    setSubmitted(query);
    if (query.length >= 2) {
      window.history.replaceState(null, "", `#/resources/search?q=${encodeURIComponent(query)}`);
    }
  };

  const total = (articlesData?.count ?? 0) + checklists.length + videos.length;
  const busy = articlesLoading || checklistsLoading || videosLoading;

  return (
    <>
      <PageHero
        eyebrow={fr ? "Centre de ressources" : "Resource Centre"}
        title={fr ? "Recherche" : "Search"}
        lead={
          submitted
            ? fr
              ? `${total + (busy ? "+" : "")} résultat(s) pour « ${submitted} »`
              : `${total + (busy ? "+" : "")} result(s) for “${submitted}”`
            : fr
              ? "Rechercher dans les articles, guides, vidéos et listes de vérification."
              : "Search across articles, guides, videos and checklists."
        }
        image="/images/gen/knowledge-tools.jpg"
        imageAlt={fr ? "Listes imprimées et ressources sur un bureau" : "Printed checklists and resources on a desk"}
        breadcrumb={[{ label: fr ? "Centre de ressources" : "Resource Centre", href: "/resources" }, { label: fr ? "Recherche" : "Search" }]}
      >
        <form onSubmit={submit} role="search" className="mt-2 max-w-xl">
          <div className="flex overflow-hidden rounded-xl border border-white/20 bg-white/[0.08] focus-within:border-cyanx-500/70">
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              maxLength={90}
              autoFocus
              placeholder={fr ? "Mots-clés : mobile money, phishing, romance…" : "Keywords: mobile money, phishing, romance…"}
              className="h-12 min-w-0 flex-1 bg-transparent px-4 text-[14.5px] text-white placeholder:text-slatex-400 focus:outline-none"
            />
            <button type="submit" className="btn-g btn-primary-g m-1.5 !h-9 shrink-0">
              <Search size={15} aria-hidden />
              {fr ? "Rechercher" : "Search"}
            </button>
          </div>
        </form>
      </PageHero>

      <section className="section-y bg-white">
        <div className="container-g max-w-4xl">
          {submitted.trim().length < 2 ? (
            <p className="text-[14px] text-slatex-600">
              {fr ? "Saisissez au moins deux caractères pour lancer la recherche." : "Enter at least two characters to start searching."}
            </p>
          ) : busy ? (
            <LoadingGrid count={3} />
          ) : total === 0 ? (
            <div className="card-g px-6 py-12 text-center">
              <p className="text-[15px] font-medium text-ink-900">
                {fr ? "Aucun résultat. Essayez d’autres mots-clés." : "No results. Try different keywords."}
              </p>
              <p className="mt-2 text-[13.5px] text-slatex-600">
                {fr
                  ? "Astuce : des termes comme « mobile money », « OTP », « faux site » fonctionnent bien."
                  : "Tip: terms like “mobile money”, “OTP”, “fake website” work well."}
              </p>
            </div>
          ) : (
            <div className="space-y-10">
              {articlesData && articlesData.count > 0 ? (
                <div>
                  <h2 className="eyebrow mb-4">{fr ? "Guides et articles" : "Guides & articles"} ({articlesData.count})</h2>
                  <ul className="divide-y divide-line-200">
                    {articlesData.articles.slice(0, 10).map((a) => {
                      const art = a as unknown as OverviewDTO["featuredArticles"][number];
                      return (
                        <li key={art.slug}>
                          <A href={`/resources/practical-tools/${art.slug}`} className="group flex items-start gap-4 py-4">
                            <img src={art.imageUrl} alt="" width={96} height={56} loading="lazy" className="img-editorial h-14 w-24 shrink-0 rounded-lg object-cover" />
                            <div className="min-w-0">
                              <h3 className="font-heading text-[14.5px] font-semibold leading-snug text-ink-900 group-hover:text-brand-600">
                                {R(art.title, locale)}
                              </h3>
                              <p className="mt-1 line-clamp-2 text-[13px] text-slatex-600">{R(art.summary, locale)}</p>
                            </div>
                          </A>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : null}

              {checklists.length > 0 ? (
                <div>
                  <h2 className="eyebrow mb-4">{fr ? "Listes à imprimer" : "Printable checklists"} ({checklists.length})</h2>
                  <ul className="divide-y divide-line-200">
                    {checklists.slice(0, 6).map((c) => (
                      <li key={c.slug}>
                        <A href="/resources/knowledge-tools?tab=checklists" className="group flex items-center gap-4 py-4">
                          <span className="flex h-14 w-24 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                            <ListChecks size={20} aria-hidden />
                          </span>
                          <div>
                            <h3 className="font-heading text-[14.5px] font-semibold text-ink-900 group-hover:text-brand-600">
                              {R(c.title as { en: string; fr: string }, locale)}
                            </h3>
                            <p className="mt-0.5 text-[12.5px] text-slatex-500">{R(c.subtitle as { en: string; fr: string }, locale)}</p>
                          </div>
                        </A>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {videos.length > 0 ? (
                <div>
                  <h2 className="eyebrow mb-4">{fr ? "Vidéos" : "Videos"} ({videos.length})</h2>
                  <ul className="divide-y divide-line-200">
                    {videos.slice(0, 6).map((v) => (
                      <li key={v.youtubeId}>
                        <A href="/resources/video-learning" className="group flex items-center gap-4 py-4">
                          <img src={`https://i.ytimg.com/vi/${v.youtubeId}/default.jpg`} alt="" width={96} height={54} loading="lazy" className="img-editorial h-14 w-24 shrink-0 rounded-lg object-cover" />
                          <div>
                            <h3 className="font-heading text-[14.5px] font-semibold text-ink-900 group-hover:text-brand-600">
                              {R(v.title, locale)}
                            </h3>
                            <p className="mt-0.5 text-[12.5px] text-slatex-500">{v.publisher} · {v.duration}</p>
                          </div>
                        </A>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

"use client";

/**
 * Resource Centre — shared building blocks: data types for API payloads,
 * loading skeletons, cards and section tiles used across all sub-views.
 */

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CirclePlay,
  FileDown,
  Globe,
  ListChecks,
  Search,
  ShieldCheck,
  Siren,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";
import { A } from "@/lib/router";
import { useI18n } from "@/lib/i18n";
import { R } from "@/lib/content/copy";
import type { BiText } from "@/lib/content/zite-data";
import { Reveal } from "@/components/shared/ui";

/* ---------------- API payload types ---------------- */

export type ArticleSummaryDTO = {
  slug: string;
  categorySlug: string;
  title: BiText;
  summary: BiText;
  readingMinutes: number;
  publishedAt: string;
  updatedAt: string;
  featured: boolean;
  popular: boolean;
  imageUrl: string;
};

export type ArticleFullDTO = ArticleSummaryDTO & {
  metaDescription: BiText;
  what: BiText;
  how: BiText;
  warningSigns: BiText[];
  example: BiText;
  protect: BiText[];
  ifVictim: BiText[];
  reportTo: BiText[];
  keyTakeaway: BiText;
  relatedSlugs: string[];
  checklistSlug: string;
  references: { label: string; url: string }[];
};

export type ChecklistDTO = {
  slug: string;
  title: BiText;
  subtitle: BiText;
  category: string;
  intro: BiText;
  warning: BiText;
  sections: { heading: BiText; items: BiText[] }[];
  references: { label: string; url: string }[];
  version: string;
  publishedAt: string;
  featured?: boolean;
  downloadCount: number;
  pdfEn: string;
  pdfFr: string;
};

export type VideoDTO = {
  youtubeId: string;
  title: BiText;
  description: BiText;
  publisher: string;
  publisherUrl: string;
  duration: string;
  topicSlug: string;
  verified: boolean;
  verifiedAt: string;
  displayOrder: number;
};

export type CountrySummaryDTO = {
  code: string;
  name: string;
  nameFr: string;
  continent: string;
  priority?: boolean;
  status: string;
  agencyCount: number;
  lastVerified: string;
};

export type CountryFullDTO = CountrySummaryDTO & {
  agencies: {
    name: string;
    role: string;
    website: string;
    reportingUrl?: string;
    phone?: string;
    email?: string;
    handles: string[];
    note?: BiText;
  }[];
  emergency?: string;
  physicalReporting?: BiText;
  sources: { label: string; url: string }[];
};

export type OverviewDTO = {
  counts: {
    articles: number;
    checklists: number;
    videos: number;
    countries: number;
    articleCategories: Record<string, number>;
  };
  featuredArticles: ArticleSummaryDTO[];
  popularArticles: ArticleSummaryDTO[];
  latestArticles: ArticleSummaryDTO[];
  featuredChecklists: ChecklistDTO[];
  latestChecklists: ChecklistDTO[];
  videos: VideoDTO[];
  countries: CountrySummaryDTO[];
};

/* ---------------- fetch helper ---------------- */

export function useApiData<T>(url: string | null, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(Boolean(url));
  const attempt = useRef(0);

  useEffect(() => {
    if (!url) return;
    let cancelled = false;
    const run = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error("http");
        const json = (await res.json()) as T;
        if (!cancelled) setData(json);
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [url, attempt.current, ...deps]);

  return { data, error, loading, retry: () => (attempt.current += 1) };
}

/* ---------------- structured data (SEO) ---------------- */

/** Inject (and clean up) a JSON-LD script tag for the current view. */
export function useJsonLd(id: string, data: unknown | null) {
  useEffect(() => {
    if (!data) return;
    const scriptId = `jsonld-${id}`;
    let el = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement("script");
      el.type = "application/ld+json";
      el.id = scriptId;
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(data);
    return () => {
      document.getElementById(scriptId)?.remove();
    };
  }, [id, data]);
}

/* ---------------- skeletons ---------------- */

export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`card-g overflow-hidden ${className}`} aria-hidden>
      <div className="aspect-video w-full animate-pulse bg-line-200/60" />
      <div className="space-y-2.5 p-5">
        <div className="h-3.5 w-1/3 animate-pulse rounded bg-line-200/70" />
        <div className="h-5 w-4/5 animate-pulse rounded bg-line-200/70" />
        <div className="h-3 w-full animate-pulse rounded bg-line-200/50" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-line-200/50" />
      </div>
    </div>
  );
}

export function LoadingGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function LoadError({ onRetry }: { onRetry?: () => void }) {
  const { locale } = useI18n();
  return (
    <div className="card-g flex flex-col items-center gap-4 px-6 py-14 text-center">
      <TriangleAlert size={26} className="text-risk-medium" aria-hidden />
      <p className="text-[14px] text-slatex-600">
        {locale === "fr"
          ? "Impossible de charger cette section pour le moment."
          : "This section could not load right now."}
      </p>
      {onRetry ? (
        <button type="button" onClick={onRetry} className="btn-g btn-outline-g btn-sm-g">
          {locale === "fr" ? "Réessayer" : "Try again"}
        </button>
      ) : null}
    </div>
  );
}

/* ---------------- cards ---------------- */

export function ArticleCard({ article, eager = false }: { article: ArticleSummaryDTO; eager?: boolean }) {
  const { locale, formatDate } = useI18n();
  return (
    <A href={`/resources/practical-tools/${article.slug}`} className="group flex h-full flex-col">
      <article className="card-g hoverable flex h-full flex-col overflow-hidden">
        <div className="relative aspect-video w-full overflow-hidden">
          <img
            src={article.imageUrl || "/images/gen/article-cat-online.jpg"}
            alt={R(article.title, locale)}
            width={672}
            height={384}
            loading={eager ? "eager" : "lazy"}
            className="img-editorial h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <span className="absolute left-3 top-3 chip-g bg-navy-950/85 text-white">
            {categoryLabel(article.categorySlug, locale)}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="h3-g text-[1.02rem] leading-snug">{R(article.title, locale)}</h3>
          <p className="mt-2 line-clamp-3 text-[13.5px] leading-relaxed text-slatex-600">{R(article.summary, locale)}</p>
          <p className="mt-auto pt-4 text-[12px] text-slatex-400">
            {formatDate(article.publishedAt)} · {article.readingMinutes} min
          </p>
        </div>
      </article>
    </A>
  );
}

export function VideoCard({ video, onOpen }: { video: VideoDTO; onOpen: (v: VideoDTO) => void }) {
  const { locale } = useI18n();
  return (
    <article className="card-g hoverable flex h-full flex-col overflow-hidden">
      <button
        type="button"
        onClick={() => onOpen(video)}
        className="relative block aspect-video w-full overflow-hidden text-left"
        aria-label={`${locale === "fr" ? "Regarder" : "Watch"}: ${R(video.title, locale)}`}
      >
        <img
          src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
          alt={R(video.title, locale)}
          width={480}
          height={360}
          loading="lazy"
          className="img-editorial h-full w-full object-cover"
        />
        <span className="absolute inset-0 flex items-center justify-center bg-navy-950/25 transition-colors group-hover:bg-navy-950/10">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d23434] text-white shadow-e2 transition-transform duration-300 hover:scale-110">
            <CirclePlay size={26} aria-hidden />
          </span>
        </span>
        <span className="absolute bottom-2.5 right-2.5 rounded bg-navy-950/85 px-2 py-0.5 font-mono text-[11.5px] font-semibold text-white">
          {video.duration}
        </span>
      </button>
      <div className="flex flex-1 flex-col p-5">
        <span className="chip-g bg-mist-50 text-slatex-600">{videoTopicLabel(video.topicSlug, locale)}</span>
        <h3 className="h3-g mt-2.5 text-[1rem] leading-snug">{R(video.title, locale)}</h3>
        <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-slatex-600">{R(video.description, locale)}</p>
        <p className="mt-auto flex items-center gap-1.5 pt-3.5 text-[12px] font-medium text-slatex-500">
          <ShieldCheck size={13} className="text-risk-low" aria-hidden />
          {video.publisher}
        </p>
        <div className="mt-3 flex items-center justify-between gap-3">
          <button type="button" onClick={() => onOpen(video)} className="btn-g btn-primary-g btn-sm-g">
            <CirclePlay size={14} aria-hidden />
            {locale === "fr" ? "Regarder" : "Watch"}
          </button>
          <a
            href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="link-g !text-[12.5px]"
          >
            YouTube
            <ArrowRight size={13} strokeWidth={2.2} aria-hidden />
          </a>
        </div>
      </div>
    </article>
  );
}

export function ChecklistCard({ checklist }: { checklist: ChecklistDTO }) {
  const { locale } = useI18n();
  const file = locale === "fr" ? checklist.pdfFr || checklist.pdfEn : checklist.pdfEn || checklist.pdfFr;

  const track = () => {
    fetch("/api/resources/checklists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: checklist.slug, lang: locale }),
      keepalive: true,
    }).catch(() => {});
  };

  return (
    <article className="card-g hoverable flex h-full flex-col p-5">
      <span className="chip-g w-fit bg-brand-50 text-brand-600">
        <ListChecks size={13} aria-hidden />
        {checklistCategoryLabel(checklist.category, locale)}
      </span>
      <h3 className="h3-g mt-3 text-[1rem] leading-snug">{R(checklist.title, locale)}</h3>
      <p className="mt-1.5 text-[12.5px] font-medium text-brand-600/90">{R(checklist.subtitle, locale)}</p>
      <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-slatex-600">{R(checklist.intro, locale)}</p>
      <p className="mt-3 text-[12px] text-slatex-400">
        {checklist.sections.reduce((s, sec) => s + sec.items.length, 0)}{" "}
        {locale === "fr" ? "points à vérifier" : "check items"} · PDF EN/FR
      </p>
      <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-4">
        <a
          href={file}
          download
          onClick={track}
          className="btn-g btn-primary-g btn-sm-g"
          aria-label={`${locale === "fr" ? "Télécharger" : "Download"}: ${R(checklist.title, locale)}`}
        >
          <FileDown size={14} aria-hidden />
          {locale === "fr" ? "Télécharger le PDF" : "Download PDF"}
        </a>
        <span className="text-[12px] text-slatex-400">
          {checklist.downloadCount > 0 ? `${checklist.downloadCount} ↓` : ""}
        </span>
      </div>
    </article>
  );
}

/* ---------------- section tiles ---------------- */

export const RESOURCE_SECTIONS: { icon: LucideIcon; href: string; key: string }[] = [
  { icon: BookOpen, href: "/resources/practical-tools", key: "practicalTools" },
  { icon: Search, href: "/resources/knowledge-tools", key: "knowledgeTools" },
  { icon: CirclePlay, href: "/resources/video-learning", key: "videoLearning" },
  { icon: ShieldCheck, href: "/resources/scam-checker", key: "scamChecker" },
  { icon: Globe, href: "/resources/reporting-channels", key: "reportingChannels" },
  { icon: ListChecks, href: "/resources/knowledge-tools?tab=checklists", key: "checklists" },
  { icon: Siren, href: "/alerts", key: "latestAlerts" },
];

/* ---------------- label helpers ---------------- */

export function categoryLabel(slug: string, locale: string): string {
  const map: Record<string, BiText> = {
    "online-digital": { en: "Online & digital", fr: "En ligne et numérique" },
    "money-banking": { en: "Money & banking", fr: "Argent et banque" },
    "social-engineering": { en: "Social engineering", fr: "Ingénierie sociale" },
    "business-fraud": { en: "Business fraud", fr: "Fraude en entreprise" },
    "emerging-specialised": { en: "Emerging scams", fr: "Arnaques émergentes" },
  };
  return R(map[slug] ?? { en: slug, fr: slug }, locale as "en" | "fr");
}

export function videoTopicLabel(slug: string, locale: string): string {
  const map: Record<string, BiText> = {
    "online-scams": { en: "Common online scams", fr: "Arnaques en ligne courantes" },
    phishing: { en: "Phishing", fr: "Hameçonnage" },
    "mobile-money": { en: "Mobile money", fr: "Mobile money" },
    "romance-impersonation": { en: "Romance & impersonation", fr: "Amour et usurpation" },
    "investment-crypto": { en: "Investment & crypto", fr: "Investissement et crypto" },
    "social-whatsapp": { en: "Social media & WhatsApp", fr: "Réseaux sociaux et WhatsApp" },
    "fake-websites": { en: "Fake websites", fr: "Faux sites web" },
    "identity-theft": { en: "Identity theft", fr: "Vol d’identité" },
    "ai-deepfakes": { en: "AI & deepfakes", fr: "IA et deepfakes" },
    "after-scam": { en: "After a scam", fr: "Après une arnaque" },
  };
  return R(map[slug] ?? { en: slug, fr: slug }, locale as "en" | "fr");
}

export function checklistCategoryLabel(slug: string, locale: string): string {
  const map: Record<string, BiText> = {
    general: { en: "General protection", fr: "Protection générale" },
    money: { en: "Money & payments", fr: "Argent et paiements" },
    shopping: { en: "Online shopping", fr: "Achats en ligne" },
    social: { en: "Social & messaging", fr: "Social et messagerie" },
    business: { en: "Business", fr: "Entreprise" },
    family: { en: "Family safety", fr: "Sécurité familiale" },
    crisis: { en: "Emergency response", fr: "Réponse d’urgence" },
  };
  return R(map[slug] ?? { en: slug, fr: slug }, locale as "en" | "fr");
}

export function continentLabel(slug: string, locale: string): string {
  const map: Record<string, BiText> = {
    africa: { en: "Africa", fr: "Afrique" },
    europe: { en: "Europe", fr: "Europe" },
    "north-america": { en: "North America", fr: "Amérique du Nord" },
    "south-america": { en: "South America", fr: "Amérique du Sud" },
    asia: { en: "Asia", fr: "Asie" },
    "middle-east": { en: "Middle East", fr: "Moyen-Orient" },
    oceania: { en: "Oceania", fr: "Océanie" },
  };
  return R(map[slug] ?? { en: slug, fr: slug }, locale as "en" | "fr");
}

export function agencyRoleLabel(role: string, locale: string): string {
  const map: Record<string, BiText> = {
    police: { en: "Police", fr: "Police" },
    "cybercrime-unit": { en: "Cybercrime unit", fr: "Unité cybercriminalité" },
    cert: { en: "Cybersecurity / CERT", fr: "Cybersécurité / CERT" },
    "consumer-protection": { en: "Consumer protection", fr: "Protection des consommateurs" },
    "financial-regulator": { en: "Financial regulator", fr: "Régulateur financier" },
    "reporting-portal": { en: "Reporting portal", fr: "Portail de signalement" },
  };
  return R(map[role] ?? { en: role, fr: role }, locale as "en" | "fr");
}

export function fraudTypeLabel(slug: string, locale: string): string {
  const map: Record<string, BiText> = {
    "online-scams": { en: "Online scams", fr: "Arnaques en ligne" },
    "financial-fraud": { en: "Financial fraud", fr: "Fraude financière" },
    "mobile-money": { en: "Mobile money fraud", fr: "Fraude mobile money" },
    "bank-transfer": { en: "Bank transfer fraud", fr: "Fraude au virement" },
    "identity-theft": { en: "Identity theft", fr: "Vol d’identité" },
    phishing: { en: "Phishing", fr: "Hameçonnage" },
    crypto: { en: "Cryptocurrency fraud", fr: "Fraude en cryptomonnaies" },
    investment: { en: "Investment fraud", fr: "Fraude à l’investissement" },
    romance: { en: "Romance scams", fr: "Arnaques sentimentales" },
    shopping: { en: "Online shopping fraud", fr: "Fraude aux achats en ligne" },
    cybercrime: { en: "Cybercrime", fr: "Cybercriminalité" },
    bec: { en: "Business email compromise", fr: "Compromission du courriel professionnel" },
    impersonation: { en: "Impersonation", fr: "Usurpation d’identité" },
    "child-exploitation": { en: "Child online exploitation", fr: "Exploitation des enfants en ligne" },
  };
  return R(map[slug] ?? { en: slug, fr: slug }, locale as "en" | "fr");
}

/** Simple animated stat band. */
export function StatRow({ items }: { items: { value: string | number; label: BiText }[] }) {
  const { locale } = useI18n();
  return (
    <dl className="grid grid-cols-2 gap-5 sm:grid-cols-4">
      {items.map((s, i) => (
        <Reveal key={i} delay={i * 80}>
          <div className="border-l-2 border-brand-600/40 pl-4">
            <dt className="sr-only">{R(s.label, locale)}</dt>
            <dd className="font-heading text-[clamp(1.6rem,1.2rem+1.6vw,2.4rem)] font-semibold leading-none text-ink-900">
              {s.value}
            </dd>
            <dd className="mt-1.5 text-[12.5px] text-slatex-600">{R(s.label, locale)}</dd>
          </div>
        </Reveal>
      ))}
    </dl>
  );
}

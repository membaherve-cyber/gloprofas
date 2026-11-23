"use client";

/**
 * Video Learning Centre — "Learn to Spot and Prevent Scams".
 * ~10 verified educational YouTube videos from credible institutions,
 * topic filters, lazy-loaded privacy-enhanced embeds in an elegant modal.
 */

import React, { useEffect, useMemo, useState } from "react";
import { CirclePlay, ExternalLink, ShieldCheck, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { R } from "@/lib/content/copy";
import { PageHero, Reveal, SectionHeading } from "@/components/shared/ui";
import {
  LoadError,
  VideoCard,
  videoTopicLabel,
  useApiData,
  useJsonLd,
  type VideoDTO,
} from "./resources-parts";

const TOPIC_ORDER = [
  "online-scams",
  "phishing",
  "mobile-money",
  "romance-impersonation",
  "investment-crypto",
  "social-whatsapp",
  "fake-websites",
  "identity-theft",
  "ai-deepfakes",
  "after-scam",
] as const;

export function VideoCentreView() {
  const { locale, formatDate } = useI18n();
  const fr = locale === "fr";
  const [topic, setTopic] = useState<string>("all");
  const [active, setActive] = useState<VideoDTO | null>(null);

  const { data, error, loading, retry } = useApiData<{ count: number; videos: VideoDTO[] }>(
    "/api/resources/videos"
  );

  const videos = useMemo(() => data?.videos ?? [], [data]);
  const filtered = useMemo(
    () => (topic === "all" ? videos : videos.filter((v) => v.topicSlug === topic)),
    [videos, topic]
  );

  // Close modal: Escape key + body scroll lock
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  useEffect(() => {
    if (data) document.title = `${fr ? "Centre d’apprentissage vidéo" : "Video Learning Centre"} · GLOPROFAS`;
  }, [data, fr]);

  useJsonLd(
    "video-learning",
    videos.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "GLOPROFAS Video Learning Centre — Learn to Spot and Prevent Scams",
          itemListElement: videos.map((v, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "VideoObject",
              name: v.title.en,
              description: v.description.en,
              thumbnailUrl: `https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`,
              uploadDate: v.verifiedAt,
              embedUrl: `https://www.youtube-nocookie.com/embed/${v.youtubeId}`,
              contentUrl: `https://www.youtube.com/watch?v=${v.youtubeId}`,
            },
          })),
        }
      : null
  );

  return (
    <>
      <PageHero
        eyebrow={fr ? "Centre d’apprentissage vidéo" : "Video Learning Centre"}
        title={fr ? "Apprenez à repérer et prévenir les arnaques." : "Learn to spot and prevent scams."}
        lead={fr ? "Des vidéos courtes. Des leçons pratiques. Des vies numériques plus sûres." : "Short videos. Practical lessons. Safer digital lives."}
        image="/images/gen/video-learning.jpg"
        imageAlt={fr ? "Deux amis regardant une vidéo éducative sur un smartphone" : "Two friends watching an educational video on a smartphone"}
        breadcrumb={[{ label: fr ? "Centre de ressources" : "Resource Centre", href: "/resources" }, { label: fr ? "Vidéos" : "Videos" }]}
      >
        <p className="mt-1 max-w-xl text-[13.5px] leading-relaxed text-white">
          {fr
            ? "Chaque vidéo provient d’une institution fiable (FTC, CISA, ACCC Scamwatch, MTN Ghana, police de Singapour, BBC…) et a été vérifiée : existence, durée, éditeur et sujet."
            : "Every video comes from a trusted institution (FTC, CISA, ACCC Scamwatch, MTN Ghana, Singapore Police, BBC…) and was verified: existence, duration, publisher and topic."}
        </p>
      </PageHero>

      <section className="section-y bg-white">
        <div className="container-g">
          <Reveal>
            <div className="flex flex-wrap gap-2" role="group" aria-label={fr ? "Filtrer par sujet" : "Filter by topic"}>
              <button
                type="button"
                onClick={() => setTopic("all")}
                aria-pressed={topic === "all"}
                className={`h-10 rounded-full border px-4 font-heading text-[13px] font-semibold transition-colors ${
                  topic === "all"
                    ? "border-brand-600 bg-brand-600 text-white"
                    : "border-line-200 text-slatex-600 hover:border-brand-500/60 hover:text-brand-600"
                }`}
              >
                {fr ? "Tous les sujets" : "All topics"}
                <span className="ml-1.5 opacity-70">{videos.length}</span>
              </button>
              {TOPIC_ORDER.map((t) => {
                const n = videos.filter((v) => v.topicSlug === t).length;
                if (n === 0) return null;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTopic(t)}
                    aria-pressed={topic === t}
                    className={`h-10 rounded-full border px-4 font-heading text-[13px] font-semibold transition-colors ${
                      topic === t
                        ? "border-brand-600 bg-brand-600 text-white"
                        : "border-line-200 text-slatex-600 hover:border-brand-500/60 hover:text-brand-600"
                    }`}
                  >
                    {videoTopicLabel(t, locale)}
                    <span className="ml-1.5 opacity-70">{n}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <div className="mt-8">
            {loading ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="card-g overflow-hidden" aria-hidden>
                    <div className="aspect-video w-full animate-pulse bg-line-200/60" />
                    <div className="space-y-2.5 p-5">
                      <div className="h-3 w-1/3 animate-pulse rounded bg-line-200/70" />
                      <div className="h-4 w-4/5 animate-pulse rounded bg-line-200/70" />
                      <div className="h-3 w-full animate-pulse rounded bg-line-200/50" />
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <LoadError onRetry={retry} />
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((v, i) => (
                  <Reveal key={v.youtubeId} delay={Math.min(i, 8) * 50}>
                    <VideoCard video={v} onOpen={setActive} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>

          {data ? (
            <Reveal className="mt-10">
              <p className="text-[12.5px] leading-relaxed text-slatex-400">
                <ShieldCheck size={13} className="mr-1.5 inline text-risk-low" aria-hidden />
                {fr
                  ? "Vidéos intégrées via le lecteur YouTube respectueux de la vie privée (youtube-nocookie), chargées uniquement à l’ouverture. "
                  : "Videos embedded via the privacy-enhanced YouTube player (youtube-nocookie), loaded only when opened. "}
                {fr ? "Vérifié le" : "Verified on"} {data.videos.length > 0 ? formatDate(data.videos[0].verifiedAt) : "2026-11-20"}.{" "}
                {fr ? "Regardez directement sur YouTube via le lien de chaque vidéo." : "Watch directly on YouTube via each video's link."}
              </p>
            </Reveal>
          ) : null}
        </div>
      </section>

      {/* Player modal */}
      {active ? (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-navy-950/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={R(active.title, locale)}
          onClick={() => setActive(null)}
        >
          <div
            className="w-full max-w-3xl overflow-hidden rounded-2xl bg-navy-950 shadow-e3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 p-5 pb-4">
              <div className="min-w-0">
                <p className="eyebrow !text-cyanx-500">{videoTopicLabel(active.topicSlug, locale)}</p>
                <h2 className="mt-1.5 font-heading text-[16px] font-bold leading-snug text-white">
                  {R(active.title, locale)}
                </h2>
                <p className="mt-1 text-[12.5px] text-slatex-300">
                  {active.publisher} · {active.duration} · {fr ? "vérifié" : "verified"} {formatDate(active.verifiedAt)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white hover:bg-white/10"
                aria-label={fr ? "Fermer" : "Close"}
                autoFocus
              >
                <X size={20} aria-hidden />
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${active.youtubeId}?autoplay=1&rel=0`}
                title={R(active.title, locale)}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="h-full w-full"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 p-5">
              <p className="max-w-lg text-[13px] leading-relaxed text-slatex-300">
                {R(active.description, locale)}
              </p>
              <a
                href={`https://www.youtube.com/watch?v=${active.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-g btn-outline-dark-g btn-sm-g shrink-0"
              >
                <ExternalLink size={13} aria-hidden />
                YouTube
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

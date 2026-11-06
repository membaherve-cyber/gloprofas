"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  AlertCircle,
  ArrowRight,
  ChevronRight,
  Image as ImageIcon,
  Info,
  OctagonAlert,
  Pause,
  Play,
  ShieldQuestion,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";
import {
  ALERT_AERIAL_HEROES,
  ARTICLE_AERIAL_HEROES,
  PAGE_AERIAL_HEROES,
  SCAM_CATEGORY_AERIAL_HEROES,
} from "@/lib/african-cities";
import type { Locale } from "@/lib/i18n";
import { L, R, getCategoryIcon } from "@/components/zite/copy";

const IMAGE_TO_VIDEO_MAP: Record<string, { video: string; coords?: string }> = {};
for (const group of [
  PAGE_AERIAL_HEROES,
  SCAM_CATEGORY_AERIAL_HEROES,
  ALERT_AERIAL_HEROES,
  ARTICLE_AERIAL_HEROES,
]) {
  for (const entry of Object.values(group)) {
    if (entry.image && entry.video) {
      IMAGE_TO_VIDEO_MAP[entry.image] = {
        video: entry.video,
        coords: entry.coords,
      };
    }
  }
}

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-[600ms] ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      } ${className}`}
      style={{
        transitionTimingFunction: "var(--ease-out-brand)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const btnVariants = {
  signal: "bg-signal text-navy-950 hover:brightness-105",
  primary: "bg-brand-600 text-white hover:bg-brand-500",
  outline: "border border-line text-ink hover:border-brand-600 hover:text-brand-600",
  outlineDark: "border border-white/25 text-white hover:border-white/60",
  ghost: "text-ink hover:bg-mist",
} as const;

export function Btn({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  arrow = true,
  onClick,
  type,
}: {
  href?: string;
  children: ReactNode;
  variant?: keyof typeof btnVariants;
  size?: "md" | "sm";
  className?: string;
  arrow?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const dims =
    size === "sm"
      ? "h-10 px-5 text-[0.8125rem]"
      : "h-[50px] px-7 text-[0.9375rem]";
  const cls = `group inline-flex items-center justify-center gap-2 rounded-[2px] font-semibold tracking-[-0.005em] transition-colors duration-200 whitespace-nowrap disabled:opacity-60 ${dims} ${btnVariants[variant]} ${className}`;
  const inner = (
    <>
      <span className="text-roll">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
      {arrow ? (
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          strokeWidth={1.5}
        />
      ) : null}
    </>
  );

  if (href?.startsWith("/")) {
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type ?? "button"} onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  dark = false,
  center = false,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <div
        className={`mb-5 flex items-center gap-3 border-b pb-2.5 ${
          dark ? "border-white/15" : "border-line"
        } ${center ? "justify-center" : ""}`}
      >
        <span
          aria-hidden="true"
          className={`h-2.5 w-2.5 ${dark ? "bg-cyanx" : "bg-brand-600"}`}
        />
        <span className="ed-label">{eyebrow}</span>
      </div>
      <h2 className={`h2 ${dark ? "text-white" : "text-ink"}`}>{title}</h2>
      {lead ? (
        <p className={`ed-deck mt-5 ${center ? "mx-auto" : ""}`}>{lead}</p>
      ) : null}
    </Reveal>
  );
}

export function PageHero({
  title,
  lead,
  eyebrow,
  image,
  video,
  coords,
  cityBadge,
  crumbs,
}: {
  title: string;
  lead?: string;
  eyebrow?: string;
  image?: string | null;
  video?: string | null;
  coords?: string;
  cityBadge?: string;
  crumbs: { label: string; to?: string }[];
}) {
  const posterSrc = image || "/images/cities/yaounde-cameroon.jpg";
  const mapped = IMAGE_TO_VIDEO_MAP[posterSrc];
  const videoSrc = video || mapped?.video || "/video/cities/douala-cameroon.mp4";
  const resolvedCoords = coords || mapped?.coords || "04°03′N · 09°42′E";

  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || reducedMotion || videoFailed) return;
    if (isPlaying) {
      void el.play().catch(() => {
        // Autoplay prevented by browser power saver; poster remains visible.
      });
    } else {
      el.pause();
    }
  }, [isPlaying, reducedMotion, videoFailed, videoSrc]);

  return (
    <section className="on-dark relative isolate overflow-hidden border-b border-white/10 bg-navy-950 pt-[136px] pb-14 lg:pt-[176px] lg:pb-20">
      {/* Fallback / Poster image always rendered beneath video */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={posterSrc}
        alt=""
        className="hero-aerial-zoom absolute inset-0 -z-30 h-full w-full object-cover object-center"
      />

      {/* Ultrarealistic Full-Bleed Aerial Drone Video */}
      {!reducedMotion && !videoFailed ? (
        <video
          key={videoSrc}
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={posterSrc}
          onError={() => setVideoFailed(true)}
          aria-hidden="true"
          tabIndex={-1}
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : null}

      {/* Cinematic grade: single directional scrim for legibility */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(96deg, rgba(4,9,20,0.94) 0%, rgba(6,14,32,0.82) 46%, rgba(6,14,32,0.44) 100%), linear-gradient(180deg, rgba(4,9,20,0.62) 0%, transparent 30%, rgba(4,9,20,0.72) 100%)",
        }}
      />

      <div className="container-g relative">
        {/* Editorial masthead: breadcrumb rule + provenance */}
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-white/15 pb-3.5">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-white/55">
              {crumbs.map((c, idx) => (
                <li key={`${c.label}-${idx}`} className="flex items-center gap-2">
                  {idx > 0 ? (
                    <span aria-hidden="true" className="text-white/25">/</span>
                  ) : null}
                  {c.to ? (
                    <Link href={c.to} className="ed-link transition-colors hover:text-white">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-white">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <div className="flex items-center gap-4">
            {cityBadge ? (
              <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-white/50">
                {cityBadge}
              </span>
            ) : null}
            {!reducedMotion && !videoFailed ? (
              <button
                type="button"
                onClick={() => setIsPlaying((p) => !p)}
                aria-pressed={!isPlaying}
                aria-label={isPlaying ? "Pause background footage" : "Play background footage"}
                className="inline-flex h-7 w-7 items-center justify-center border border-white/25 text-white/70 transition-colors hover:border-white hover:text-white"
              >
                {isPlaying ? (
                  <Pause className="h-3 w-3" strokeWidth={1.5} aria-hidden="true" />
                ) : (
                  <Play className="h-3 w-3" strokeWidth={1.5} aria-hidden="true" />
                )}
              </button>
            ) : null}
          </div>
        </div>

        {eyebrow ? (
          <p className="ed-label mt-9 text-cyanx">{eyebrow}</p>
        ) : null}
        <Reveal>
          <h1
            className="h1 mt-3.5 max-w-[20ch] text-white"
            style={{ fontSize: "clamp(2.25rem, 1.5rem + 2.6vw, 3.6rem)" }}
          >
            {title}
          </h1>
        </Reveal>
        {lead ? (
          <Reveal delay={120}>
            <p className="ed-deck mt-6 max-w-[58ch]">{lead}</p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

export function ImageSlot({
  id,
  label = "",
  lang = "en",
  className = "",
}: {
  id: string;
  label?: string;
  lang?: Locale;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`grid-pattern relative flex items-center justify-center overflow-hidden bg-navy-900 ${className}`}
    >
      <div className="flex flex-col items-center gap-2 px-4 text-center text-slatex-300">
        <ImageIcon className="h-6 w-6" strokeWidth={1.5} />
        <span className="text-xs font-semibold uppercase tracking-widest">{id}</span>
        <span className="text-xs opacity-70">{R(L.imgPending, lang)}</span>
      </div>
    </div>
  );
}

export function IconTile({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <div
      className={`flex h-11 w-11 shrink-0 items-center justify-center border ${
        dark
          ? "border-white/20 text-cyanx"
          : "border-line text-brand-600"
      } [&_svg]:h-5 [&_svg]:w-5 [&_svg]:stroke-[1.5]`}
    >
      {children}
    </div>
  );
}

const riskMap: Record<
  string,
  { cls: string; Icon: LucideIcon; key: keyof typeof L.risk }
> = {
  Low: {
    cls: "bg-risk-low/10 border-risk-low text-ink",
    Icon: Info,
    key: "Low",
  },
  low: {
    cls: "bg-risk-low/10 border-risk-low text-ink",
    Icon: Info,
    key: "Low",
  },
  Medium: {
    cls: "bg-risk-medium/15 border-risk-medium text-ink",
    Icon: AlertCircle,
    key: "Medium",
  },
  medium: {
    cls: "bg-risk-medium/15 border-risk-medium text-ink",
    Icon: AlertCircle,
    key: "Medium",
  },
  High: {
    cls: "bg-risk-high/10 border-risk-high text-ink",
    Icon: TriangleAlert,
    key: "High",
  },
  high: {
    cls: "bg-risk-high/10 border-risk-high text-ink",
    Icon: TriangleAlert,
    key: "High",
  },
  Critical: {
    cls: "bg-risk-critical/10 border-risk-critical text-risk-critical",
    Icon: OctagonAlert,
    key: "Critical",
  },
  critical: {
    cls: "bg-risk-critical/10 border-risk-critical text-risk-critical",
    Icon: OctagonAlert,
    key: "Critical",
  },
};

export function ZiteRiskBadge({
  level,
  lang,
}: {
  level: string;
  lang: Locale;
}) {
  const entry = riskMap[level] ?? riskMap.Low;
  const Icon = entry.Icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 border-l-2 px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.14em] ${entry.cls}`}
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
      {R(L.risk[entry.key], lang)}
    </span>
  );
}

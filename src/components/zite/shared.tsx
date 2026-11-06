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
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";
import { L, R } from "@/lib/zite-copy";
import {
  ALERT_AERIAL_HEROES,
  ARTICLE_AERIAL_HEROES,
  PAGE_AERIAL_HEROES,
  SCAM_CATEGORY_AERIAL_HEROES,
} from "@/lib/african-cities";
import type { Locale } from "@/lib/i18n";

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
  className = "",
  arrow = true,
  onClick,
  type,
}: {
  href?: string;
  children: ReactNode;
  variant?: keyof typeof btnVariants;
  className?: string;
  arrow?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const cls = `group inline-flex h-[52px] items-center justify-center gap-2 rounded-full px-7 text-[0.9375rem] font-semibold leading-[1.2] transition-colors duration-150 whitespace-nowrap disabled:opacity-60 ${btnVariants[variant]} ${className}`;
  const inner = (
    <>
      <span className="text-roll">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
      {arrow ? (
        <ArrowRight
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
          strokeWidth={1.75}
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
    <Reveal className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <p
        className={`eyebrow flex items-center gap-3 ${center ? "justify-center" : ""} ${
          dark ? "text-cyanx" : "text-brand-600"
        }`}
      >
        <span className={`h-px w-8 ${dark ? "bg-cyanx" : "bg-brand-600"}`} />
        {eyebrow}
      </p>
      <h2 className={`h2 mt-4 ${dark ? "text-white" : "text-ink"}`}>{title}</h2>
      {lead ? (
        <p
          className={`lead mt-5 ${dark ? "text-slatex-300" : "text-slatex-600"} ${
            center ? "mx-auto" : ""
          }`}
        >
          {lead}
        </p>
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
    <section className="on-dark relative isolate flex min-h-[540px] items-center overflow-hidden border-b border-white/10 bg-navy-950 pt-[148px] pb-16 sm:min-h-[580px] lg:min-h-[640px] lg:pt-[188px] lg:pb-24">
      {/* High-resolution poster is also the LCP and reduced-motion fallback */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={posterSrc}
        alt=""
        loading="eager"
        fetchPriority="high"
        decoding="async"
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

      {/* Editorial Multi-Stop Gradient + Architectural Grid Overlay */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(102deg, rgba(5, 11, 26, 0.93) 0%, rgba(10, 22, 49, 0.78) 54%, rgba(5, 11, 26, 0.52) 100%), linear-gradient(180deg, rgba(5, 11, 26, 0.55) 0%, transparent 35%, rgba(5, 11, 26, 0.85) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "linear-gradient(90deg, #000 15%, transparent 80%)",
        }}
      />

      <div className="container-g relative">
        {/* Top Editorial Telemetry & Breadcrumb Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/12 pb-4">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-slatex-300">
              {crumbs.map((c, idx) => (
                <li key={`${c.label}-${idx}`} className="flex items-center gap-1.5">
                  {idx > 0 ? <ChevronRight className="h-3.5 w-3.5 text-white/40" /> : null}
                  {c.to ? (
                    <Link href={c.to} className="transition-colors hover:text-white">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-cyanx">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <div className="flex flex-wrap items-center gap-2.5">
            {cityBadge ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-navy-950/85 px-3.5 py-1 text-xs font-semibold tracking-wide text-slatex-300">
                <span className="animate-dot h-1.5 w-1.5 rounded-full bg-cyanx" />
                <span>{cityBadge}</span>
                <span className="hidden border-l border-white/15 pl-2 font-mono text-xs text-white/60 sm:inline">
                  {resolvedCoords}
                </span>
              </span>
            ) : null}
            {!reducedMotion && !videoFailed ? (
              <button
                type="button"
                onClick={() => setIsPlaying((p) => !p)}
                aria-pressed={!isPlaying}
                aria-label={isPlaying ? "Pause aerial video" : "Play aerial video"}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-navy-950/85 text-white/85 transition hover:border-cyanx hover:text-cyanx"
              >
                {isPlaying ? (
                  <Pause className="h-3 w-3" aria-hidden="true" />
                ) : (
                  <Play className="h-3 w-3" aria-hidden="true" />
                )}
              </button>
            ) : null}
          </div>
        </div>

        {eyebrow ? (
          <p className="eyebrow mt-8 flex items-center gap-3 text-cyanx">
            <span className="h-px w-8 bg-cyanx" />
            {eyebrow}
          </p>
        ) : null}
        <Reveal>
          <h1
            className="h1 mt-4 max-w-4xl text-white"
            style={{ fontSize: "clamp(2.125rem, 1.35rem + 2.8vw, 3.85rem)" }}
          >
            {title}
          </h1>
        </Reveal>
        {lead ? (
          <Reveal delay={120}>
            <p className="lead mt-5 max-w-2xl text-slatex-300">{lead}</p>
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
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] ${
        dark ? "bg-white/10 text-brand-500" : "bg-brand-600/10 text-brand-600"
      }`}
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
    cls: "bg-risk-critical border-risk-critical text-white",
    Icon: OctagonAlert,
    key: "Critical",
  },
  critical: {
    cls: "bg-risk-critical border-risk-critical text-white",
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
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold uppercase tracking-wider ${entry.cls}`}
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={2} />
      {R(L.risk[entry.key], lang)}
    </span>
  );
}

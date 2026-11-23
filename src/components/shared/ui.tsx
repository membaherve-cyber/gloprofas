"use client";

/**
 * Shared GLOPROFAS UI atoms: Reveal, Btn, SectionHeading, RiskBadge,
 * PageHero, StatBand pieces. All transform/opacity motion, reduced-motion safe.
 */

import React, { useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  Info,
  OctagonAlert,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";
import { A } from "@/lib/router";
import { useI18n, type Locale } from "@/lib/i18n";
import { R, L } from "@/lib/content/copy";
import type { BiText } from "@/lib/content/zite-data";

/* ---------------- Reveal on scroll ---------------- */

export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: React.ElementType;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    io.observe(el);
    // Safety fallback: guarantee visibility even if the observer never fires
    // (e.g. crawlers, print, screenshots). Content clarity beats animation.
    const fallback = window.setTimeout(() => el.classList.add("is-in"), 2600);
    return () => {
      window.clearTimeout(fallback);
      io.disconnect();
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/* ---------------- Buttons ---------------- */

type BtnVariant = "primary" | "signal" | "outline" | "outlineDark" | "ghost";

const VARIANT_CLASS: Record<BtnVariant, string> = {
  primary: "btn-primary-g",
  signal: "btn-signal-g",
  outline: "btn-outline-g",
  outlineDark: "btn-outline-dark-g",
  ghost: "btn-ghost-g",
};

export function Btn({
  href,
  onClick,
  variant = "primary",
  size,
  className = "",
  children,
  type,
  disabled,
  ariaLabel,
}: {
  href?: string;
  onClick?: () => void;
  variant?: BtnVariant;
  size?: "sm";
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaLabel?: string;
}) {
  const cls = `btn-g ${VARIANT_CLASS[variant]} ${size === "sm" ? "btn-sm-g" : ""} ${className}`;
  if (href) {
    return (
      <A href={href} className={cls} aria-label={ariaLabel}>
        {children}
      </A>
    );
  }
  return (
    <button type={type ?? "button"} onClick={onClick} className={cls} disabled={disabled} aria-label={ariaLabel}>
      {children}
    </button>
  );
}

/** Quiet inline link with animated arrow. */
export function LinkG({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <A href={href} className={`link-g ${className}`}>
      {children}
      <ArrowRight size={15} strokeWidth={2.2} aria-hidden />
    </A>
  );
}

/* ---------------- Section heading ---------------- */

export function SectionHeading({
  eyebrow,
  title,
  lead,
  dark = false,
  className = "",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={`max-w-2xl ${className}`}>
      {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
      <h2 className={`h2-g ${dark ? "text-white" : ""}`}>{title}</h2>
      {lead ? <p className={`lead-g mt-4`}>{lead}</p> : null}
    </div>
  );
}

/* ---------------- Numbered masthead ---------------- */

export function Masthead({
  num,
  eyebrow,
  dark = false,
}: {
  num: string;
  eyebrow: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-4 ${
        dark ? "text-slatex-300" : "text-slatex-600"
      }`}
    >
      <span className="mast-num text-lg">{num}</span>
      <span className="eyebrow">{eyebrow}</span>
      <span
        aria-hidden
        className={`h-px flex-1 ${dark ? "bg-white/15" : "bg-line-200"}`}
      />
    </div>
  );
}

/* ---------------- Risk badge ---------------- */

export const RISK_STYLES: Record<string, { bg: string; text: string; icon: LucideIcon }> = {
  Low: { bg: "bg-[#159769]/10", text: "text-[#0d6e4a]", icon: Info },
  Medium: { bg: "bg-[#c18708]/12", text: "text-[#8a6104]", icon: AlertCircle },
  High: { bg: "bg-[#d75c09]/12", text: "text-[#a34306]", icon: TriangleAlert },
  Critical: { bg: "bg-[#d23434]/12", text: "text-[#a52222]", icon: OctagonAlert },
};

export function RiskBadge({ risk, className = "" }: { risk: string; className?: string }) {
  const { locale } = useI18n();
  const s = RISK_STYLES[risk] ?? RISK_STYLES.Medium;
  const Icon = s.icon;
  return (
    <span
      className={`chip-g ${s.bg} ${s.text} ${className}`}
    >
      <Icon size={13} strokeWidth={2.4} aria-hidden />
      {R((L.risk as Record<string, BiText>)[risk], locale)}
    </span>
  );
}

/* ---------------- Page hero for inner pages ---------------- */

export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  imageAlt,
  breadcrumb,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  image: string;
  imageAlt: string;
  breadcrumb?: { label: string; href?: string }[];
  children?: React.ReactNode;
}) {
  const { locale } = useI18n();
  return (
    <section className="on-dark relative overflow-hidden bg-navy-950 pt-28 pb-16 sm:pt-32 sm:pb-20">
      <div className="absolute inset-0" aria-hidden>
        <img
          src={image}
          alt=""
          className="img-editorial h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 hero-scrim-soft" />
      </div>
      <div className="container-g relative">
        {breadcrumb && breadcrumb.length > 0 ? (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-[13px] text-slatex-300">
              <li>
                <A href="/" className="hover:text-cyanx-500 transition-colors">
                  {locale === "fr" ? "Accueil" : "Home"}
                </A>
              </li>
              {breadcrumb.map((b, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span aria-hidden className="text-slatex-400">/</span>
                  {b.href ? (
                    <A href={b.href} className="hover:text-cyanx-500 transition-colors">
                      {b.label}
                    </A>
                  ) : (
                    <span className="text-white/90">{b.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        <Reveal>
          <p className="eyebrow mb-4">{eyebrow}</p>
          <h1 className="h1-g max-w-3xl text-white">{title}</h1>
          {lead ? <p className="lead-g mt-5 max-w-2xl text-slatex-300">{lead}</p> : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Stat (border-left numeral) ---------------- */

export function StatCell({
  value,
  label,
  dark = false,
}: {
  value: React.ReactNode;
  label: string;
  dark?: boolean;
}) {
  return (
    <div className={`border-l pl-5 ${dark ? "border-white/20" : "border-black/[0.12]"}`}>
      <div
        className={`font-heading text-[clamp(1.9rem,1.4rem+1.8vw,2.8rem)] font-bold leading-none tracking-[-0.03em] ${
          dark ? "text-white" : "text-ink-900"
        }`}
      >
        {value}
      </div>
      <div className={`mt-2 text-[13.5px] ${dark ? "text-slatex-300" : "text-slatex-600"}`}>
        {label}
      </div>
    </div>
  );
}

/* ---------------- Empty state ---------------- */

export function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <div className="card-g flex items-center justify-center px-6 py-14 text-center text-slatex-600">
      {children}
    </div>
  );
}

/* ---------------- Bilingual helper ---------------- */

export function bi<T>(obj: { en: T; fr: T }, locale: Locale): T {
  return obj[locale] ?? obj.en;
}

export { R, L };

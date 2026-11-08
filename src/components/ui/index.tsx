import Link from "next/link";
import type { ReactNode } from "react";
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Download,
  FileText,
  Languages,
} from "lucide-react";
import { CategoryIcon } from "./icon-map";
import { formatDate, formatSize } from "@/lib/format";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/messages/en";

type ButtonVariant = "signal" | "primary" | "outline" | "ghost";

function buttonClass(variant: ButtonVariant, size: "md" | "sm"): string {
  const base = variant === "signal" ? "btn btn-signal" : variant === "primary" ? "btn btn-primary" : variant === "outline" ? "btn btn-outline" : "btn btn-ghost";
  return size === "sm" ? `${base} btn-sm` : base;
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  className = "",
  ...rest
}: {
  href: string;
  children: string;
  variant?: ButtonVariant;
  size?: "md" | "sm";
  arrow?: boolean;
  className?: string;
} & Omit<React.ComponentProps<typeof Link>, "href" | "children" | "className">) {
  return (
    <Link href={href} className={`${buttonClass(variant, size)} ${className}`} {...rest}>
      <span className="text-roll" aria-hidden="true">
        <span>{children}</span>
        <span className="absolute left-0 top-full">{children}</span>
      </span>
      <span className="sr-only">{children}</span>
      {arrow ? <ArrowRight size={17} strokeWidth={1.5} aria-hidden="true" /> : null}
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  arrow = false,
  ...rest
}: {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: "md" | "sm";
  arrow?: boolean;
} & React.ComponentProps<"button">) {
  return (
    <button className={`${buttonClass(variant, size)} ${className}`} {...rest}>
      {children}
      {arrow ? <ArrowRight size={17} strokeWidth={1.5} aria-hidden="true" /> : null}
    </button>
  );
}

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <span className={`eyebrow ${dark ? "eyebrow-dark" : ""}`}>{children}</span>;
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  cta,
  dark = false,
  align = "start",
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  cta?: { href: string; label: string };
  dark?: boolean;
  align?: "start" | "center";
  as?: "h1" | "h2";
}) {
  return (
    <div
      className={`flex flex-col gap-5 ${align === "center" ? "items-center text-center" : "items-start"} ${
        dark ? "on-dark text-white" : ""
      }`}
    >
      {eyebrow ? <Eyebrow dark={dark}>{eyebrow}</Eyebrow> : null}
      <div className={`flex w-full flex-col gap-5 md:flex-row md:items-end md:justify-between ${align === "center" ? "md:flex-col md:items-center" : ""}`}>
        <div className="max-w-2xl">
          <Tag className={dark ? "text-white" : "text-ink-900"}>{title}</Tag>
          {lead ? <p className="lead mt-4">{lead}</p> : null}
        </div>
        {cta ? (
          <ButtonLink href={cta.href} variant={dark ? "outline" : "outline"} size="sm" arrow>
            {cta.label}
          </ButtonLink>
        ) : null}
      </div>
    </div>
  );
}

const riskStyles: Record<string, { bg: string; border: string; icon: ReactNode }> = {
  low: { bg: "bg-[color-mix(in_srgb,var(--color-risk-low)_14%,white)]", border: "border-[var(--color-risk-low)]", icon: <CheckCircle2 size={14} strokeWidth={1.5} aria-hidden="true" /> },
  medium: { bg: "bg-[color-mix(in_srgb,var(--color-risk-medium)_16%,white)]", border: "border-[var(--color-risk-medium)]", icon: <AlertTriangle size={14} strokeWidth={1.5} aria-hidden="true" /> },
  high: { bg: "bg-[color-mix(in_srgb,var(--color-risk-high)_14%,white)]", border: "border-[var(--color-risk-high)]", icon: <AlertTriangle size={14} strokeWidth={1.5} aria-hidden="true" /> },
  critical: { bg: "bg-[color-mix(in_srgb,var(--color-risk-critical)_14%,white)]", border: "border-[var(--color-risk-critical)]", icon: <AlertTriangle size={14} strokeWidth={1.5} aria-hidden="true" /> },
};

export function RiskBadge({
  level,
  dict,
}: {
  level: string;
  dict: Dictionary;
}) {
  const style = riskStyles[level] ?? riskStyles.medium;
  const label =
    level === "critical" ? dict.common.critical : level === "high" ? dict.common.high : level === "low" ? dict.common.low : dict.common.medium;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-micro font-bold uppercase tracking-[0.08em] text-ink-900 ${style.bg} ${style.border}`}
    >
      {style.icon}
      <span>
        {dict.common.risk}: {label}
      </span>
    </span>
  );
}

export function CategoryTile({
  href,
  name,
  summary,
  icon,
  size = "compact",
}: {
  href: string;
  name: string;
  summary: string;
  icon: string;
  size?: "large" | "medium" | "compact";
}) {
  const large = size === "large";
  return (
    <Link
      href={href}
      className={`card card-hover group flex flex-col justify-between gap-5 p-5 ${
        large ? "sm:p-7" : ""
      } ${size === "large" ? "min-h-[248px]" : size === "medium" ? "min-h-[210px]" : "min-h-[172px]"}`}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-[color-mix(in_srgb,var(--color-blue-600)_10%,white)] text-blue-600">
          <CategoryIcon name={icon} />
        </span>
        <ArrowUpRight
          size={18}
          strokeWidth={1.8}
          aria-hidden="true"
          className="text-slate-600 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-600"
        />
      </div>
      <div>
        <h3 className={`font-semibold text-ink-900 ${large ? "text-[1.375rem] leading-snug" : "text-lead leading-snug"}`}>
          {name}
        </h3>
        <p className={`mt-2 text-slate-600 ${large ? "text-body line-clamp-3" : "text-base line-clamp-2"}`}>
          {summary}
        </p>
      </div>
    </Link>
  );
}

export function AlertCard({
  href,
  title,
  summary,
  locale,
  riskLevel,
  country,
  categoryName,
  publishedAt,
  dict,
}: {
  href: string;
  title: string;
  summary: string;
  locale: Locale;
  riskLevel: string;
  country: string;
  categoryName?: string | null;
  publishedAt: Date;
  dict: Dictionary;
}) {
  return (
    <Link href={href} className="card card-hover group flex h-full flex-col overflow-hidden">
      <div className="flex items-center justify-between gap-2 border-b border-line-200 bg-mist-50 px-4 py-3">
        <RiskBadge level={riskLevel} dict={dict} />
        <span className="inline-flex items-center gap-1.5 text-micro font-semibold uppercase tracking-[0.08em] text-slate-600">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" aria-hidden="true" />
          {dict.alerts.alertType}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-caption font-semibold uppercase tracking-[0.08em] text-slate-600">
          {categoryName ? <span className="text-blue-600">{categoryName}</span> : null}
          <span>{country}</span>
          <span className="font-medium normal-case tracking-normal">{formatDate(publishedAt, locale)}</span>
        </div>
        <h3 className="text-lead font-semibold leading-snug text-ink-900 group-hover:text-blue-600">{title}</h3>
        <p className="line-clamp-3 text-base text-slate-600">{summary}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-small font-semibold text-blue-600">
          {dict.common.readMore}
          <ChevronRight size={15} strokeWidth={1.5} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

export function ArticleCard({
  href,
  title,
  excerpt,
  tag,
  date,
  locale,
  dict,
}: {
  href: string;
  title: string;
  excerpt: string;
  tag: string;
  date: Date;
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <Link href={href} className="card card-hover group flex h-full flex-col gap-3 p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="chip w-fit border-blue-600/20 bg-[color-mix(in_srgb,var(--color-blue-600)_8%,white)] text-blue-600">{tag}</span>
        <span
          className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] bg-mist-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white"
          aria-hidden="true"
        >
          <FileText size={16} strokeWidth={1.6} />
        </span>
      </div>
      <h3 className="line-clamp-3 text-lead font-semibold leading-snug text-ink-900 group-hover:text-blue-600">{title}</h3>
      <p className="line-clamp-2 text-base text-slate-600">{excerpt}</p>
      <div className="mt-auto flex items-center gap-2 pt-2 text-caption text-slate-600">
        <span>GLOPROFAS</span>
        <span aria-hidden="true">·</span>
        <time dateTime={date.toISOString()}>{formatDate(date, locale)}</time>
      </div>
      <span className="sr-only">{dict.common.readMore}</span>
    </Link>
  );
}

export function ResourceRow({
  title,
  description,
  type,
  language,
  fileSizeKb,
  dict,
}: {
  title: string;
  description: string;
  type: string;
  language: string;
  fileSizeKb: number | null;
  dict: Dictionary;
}) {
  const label = dict.resources.formats[type as keyof typeof dict.resources.formats] ?? type;
  return (
    <div className="group flex items-start gap-4 border-b border-line-200 py-4 last:border-0">
      <span className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-mist-50 text-blue-600">
        <FileText size={20} strokeWidth={1.5} aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="chip border-blue-600/25 text-blue-600">{label}</span>
          <span className="inline-flex items-center gap-1 text-micro font-medium text-slate-600">
            <Languages size={12} strokeWidth={1.8} aria-hidden="true" /> {language}
          </span>
          {fileSizeKb ? (
            <span className="inline-flex items-center gap-1 text-micro font-medium text-slate-600">
              <Download size={12} strokeWidth={1.8} aria-hidden="true" /> {formatSize(fileSizeKb)}
            </span>
          ) : null}
        </div>
        <h3 className="mt-2 text-body font-semibold leading-snug text-ink-900 group-hover:text-blue-600">{title}</h3>
        <p className="mt-1 line-clamp-2 text-small text-slate-600">{description}</p>
      </div>
    </div>
  );
}

export function NumberedStep({
  number,
  title,
  body,
  icon = "shield-alert",
}: {
  number: string;
  title: string;
  body: string;
  icon?: string;
}) {
  return (
    <article className="on-dark relative flex h-full flex-col overflow-hidden rounded-sm border border-white/10 bg-navy-800/50 p-5 transition-colors hover:border-white/25">
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-sm bg-white/10 text-cyan-400">
          <CategoryIcon name={icon} size={19} />
        </span>
        <span
          aria-hidden="true"
          className="font-[family-name:var(--font-heading)] text-[2.5rem] font-bold leading-none text-transparent"
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.35)" }}
        >
          {number}
        </span>
      </div>
      <h3 className="mt-5 text-lead font-semibold text-white">{title}</h3>
      <p className="mt-2 text-base leading-relaxed text-slate-300">{body}</p>
      <span aria-hidden="true" className="mt-auto pt-4">
        <span className="block h-px w-full bg-gradient-to-r from-cyan-400/50 to-transparent" />
      </span>
    </article>
  );
}

export function Marquee({ items }: { items: string[] }) {
  const track = [...items, ...items];
  return (
    <div className="marquee overflow-hidden border-y border-white/10 py-5" role="region" aria-label="Scam types">
      <div className="marquee-track items-center gap-8">
        {track.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="inline-flex items-center gap-3 whitespace-nowrap font-[family-name:var(--font-heading)] text-body font-medium text-slate-300"
            aria-hidden={index >= items.length}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" aria-hidden="true" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Breadcrumbs({
  items,
}: {
  items: { href?: string; label: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-small text-slate-600">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
            {item.href ? (
              <Link href={item.href} className="hover:text-blue-600">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium text-ink-900">
                {item.label}
              </span>
            )}
            {index < items.length - 1 ? <ChevronRight size={13} aria-hidden="true" /> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-sm border border-dashed border-line-200 bg-mist-50 px-6 py-12 text-center">
      <p className="text-slate-600">{message}</p>
    </div>
  );
}

export function CheckList({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <ul className={`flex flex-col gap-3 ${dark ? "on-dark" : ""}`}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--color-blue-600)_12%,white)] text-blue-600">
            <CheckCircle2 size={14} strokeWidth={1.5} aria-hidden="true" />
          </span>
          <span className={`text-body ${dark ? "text-slate-300" : "text-slate-600"}`}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

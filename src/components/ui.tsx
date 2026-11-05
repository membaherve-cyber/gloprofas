import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, AlertTriangle, ShieldAlert, Siren, TriangleAlert } from "lucide-react";
import { CategoryIcon } from "@/lib/icons";
import type { RiskLevel } from "@/lib/types";
import { cn } from "@/lib/utils";

const LOGO_SIZES: Record<string, string> = { sm: "h-10", md: "h-14", lg: "h-20", xl: "h-28" };
const LOGO_ALT = "GLOPROFAS - Global Programme for the Fight Against Scams";

export function Logo({ size = "sm", compact = false, priority = false }: { size?: "sm" | "md" | "lg" | "xl"; compact?: boolean; priority?: boolean }) {
  if (compact) {
    return (
      <span className="logo">
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <circle cx="20" cy="20" r="13.5" fill="none" stroke="#2BD4E8" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="68 18" transform="rotate(-30 20 20)" />
          <circle cx="30.5" cy="11.5" r="2.3" fill="#FFB02E" />
        </svg>
      </span>
    );
  }
  // Official mark, stored as-is: public/images/gloprofas-logo.jpg
  return (
    <Image
      src="/images/gloprofas-logo.jpg"
      alt={LOGO_ALT}
      priority={priority}
      width={1132}
      height={350}
      className={`${LOGO_SIZES[size]} w-auto object-contain rounded-[10px]`}
    />
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  type = "button",
  className,
  onClick,
}: {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "signal" | "outline" | "outline-dark" | "ghost" | "text";
  type?: "button" | "submit";
  className?: string;
  onClick?: () => void;
}) {
  const classNames = cn("btn", variant === "primary" ? "" : `btn-${variant}`, className);
  const inner = (
    <>
      <span className="btn-roll">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
      {variant !== "text" ? <ArrowRight className="arrow" size={16} aria-hidden="true" /> : null}
    </>
  );
  if (href) return <Link className={classNames} href={href}>{inner}</Link>;
  return <button className={classNames} type={type} onClick={onClick}>{inner}</button>;
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  light = false,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  light?: boolean;
}) {
  return (
    <div className={cn("measure", light && "on-dark")}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {lead ? <p className={cn("lead", light ? "muted-dark" : "muted")}>{lead}</p> : null}
    </div>
  );
}

export function RiskBadge({ level, label }: { level: RiskLevel; label: string }) {
  const Icon = level === "critical" ? Siren : level === "high" ? ShieldAlert : level === "medium" ? TriangleAlert : AlertTriangle;
  return (
    <span className={cn("risk", `risk-${level}`)}>
      <Icon size={14} aria-hidden="true" />
      {label}
    </span>
  );
}

export function IconTile({ name }: { name: string }) {
  return (
    <span className="icon-tile">
      <CategoryIcon name={name} />
    </span>
  );
}

export function Photo({
  src,
  alt,
  className,
  priority = false,
  width,
  height,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}) {
  return (
    // Native img keeps the hero under the byte budget without an optimizer round-trip surprise.
    <img src={src} alt={alt} className={className} width={width} height={height} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} />
  );
}

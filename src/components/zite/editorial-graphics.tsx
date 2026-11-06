"use client";

import type { Locale } from "@/lib/i18n";

export function EditorialSectionIndex({
  index,
  code,
  dark = false,
}: {
  index: string;
  code: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`mb-8 flex items-center justify-between border-b pb-3 text-xs font-bold uppercase tracking-[0.16em] ${
        dark
          ? "border-white/12 text-slatex-300"
          : "border-line text-slatex-600"
      }`}
    >
      <span className="inline-flex items-center gap-2.5">
        <span
          className={`font-mono text-xs font-extrabold ${
            dark ? "text-cyanx" : "text-brand-600"
          }`}
        >
          [{index}]
        </span>
        <span>{code}</span>
      </span>
      <span className="font-mono text-xs opacity-60">GLOPROFAS · INTL</span>
    </div>
  );
}

/**
 * Custom vector technical diagram illustrating GLOPROFAS's 4-stage fraud
 * interception protocol (Contact -> Pressure -> Verification Gate -> Safe Action).
 */
export function ScamInterceptionDiagram({ lang }: { lang: Locale }) {
  const fr = lang === "fr";
  const nodes = fr
    ? [
        { code: "01", title: "Vecteur entrant", sub: "SMS, appel, lien ou facture" },
        { code: "02", title: "Pression artificielle", sub: "Urgence, peur ou gain garanti" },
        { code: "03", title: "Sas de vérification", sub: "Contre-appel & base GLOPROFAS" },
        { code: "04", title: "Décision protégée", sub: "Blocage & signalement privé" },
      ]
    : [
        { code: "01", title: "Incoming Vector", sub: "SMS, call, link or invoice" },
        { code: "02", title: "Engineered Pressure", sub: "Urgency, fear or guaranteed return" },
        { code: "03", title: "Verification Gate", sub: "Independent call-back & Jarvis check" },
        { code: "04", title: "Protected Outcome", sub: "Transaction blocked & report logged" },
      ];

  return (
    <div className="on-dark relative overflow-hidden rounded-[20px] border border-white/12 bg-navy-950/90 p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
        <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-cyanx">
          {fr
            ? "SCHÉMA D’INTERCEPTION DE LA FRAUDE · PROTOCOLE GLOPROFAS"
            : "FRAUD INTERCEPTION ARCHITECTURE · GLOPROFAS PROTOCOL"}
        </span>
        <span className="inline-flex items-center gap-1.5 font-mono text-xs text-slatex-300">
          <span className="animate-dot h-2 w-2 rounded-full bg-signal" />
          {fr ? "POINT D’ARRÊT : ÉTAPE 03" : "CRITICAL INTERCEPT: STAGE 03"}
        </span>
      </div>

      {/* Custom SVG Vector Schematic Line */}
      <div className="my-6 hidden lg:block" aria-hidden="true">
        <svg
          viewBox="0 0 960 56"
          className="h-14 w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="40"
            y1="28"
            x2="920"
            y2="28"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
          <line
            x1="40"
            y1="28"
            x2="620"
            y2="28"
            stroke="#2BD4E8"
            strokeWidth="2"
          />
          {[120, 360, 620, 860].map((cx, idx) => (
            <g key={cx}>
              <circle
                cx={cx}
                cy="28"
                r="16"
                fill={idx === 2 ? "#FFB02E" : "#0A1631"}
                stroke={idx === 2 ? "#FFB02E" : "#2BD4E8"}
                strokeWidth="2"
              />
              <circle
                cx={cx}
                cy="28"
                r="4"
                fill={idx === 2 ? "#050B1A" : "#2BD4E8"}
              />
            </g>
          ))}
        </svg>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {nodes.map((node, idx) => {
          const isGate = idx === 2;
          return (
            <div
              key={node.code}
              className={`rounded-xl border p-4 transition-colors ${
                isGate
                  ? "border-signal/60 bg-signal/10"
                  : "border-white/10 bg-navy-900/70"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`font-mono text-xs font-bold ${
                    isGate ? "text-signal" : "text-cyanx"
                  }`}
                >
                  STAGE {node.code}
                </span>
                {isGate ? (
                  <span className="rounded-full bg-signal px-2 py-0.5 font-mono text-xs font-bold text-navy-950">
                    STOP
                  </span>
                ) : null}
              </div>
              <p className="mt-2 font-[family-name:var(--font-heading)] text-sm font-bold text-white">
                {node.title}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-slatex-300">
                {node.sub}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

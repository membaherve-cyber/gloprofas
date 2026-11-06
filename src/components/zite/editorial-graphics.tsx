"use client";

import type { Locale } from "@/lib/i18n";

/** Section index rule — retained for backwards compatibility. */
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
      className={`mb-8 flex items-baseline justify-between gap-4 border-b pb-3 ${
        dark ? "border-white/15" : "border-line"
      }`}
    >
      <span className="flex items-baseline gap-3">
        <span className={`ed-num text-sm ${dark ? "text-cyanx" : ""}`}>{index}</span>
        <span className="ed-label">{code}</span>
      </span>
      <span
        aria-hidden="true"
        className={`hidden font-mono text-xs uppercase tracking-[0.2em] sm:block ${
          dark ? "text-white/30" : "text-slate-600/50"
        }`}
      >
        GLOPROFAS
      </span>
    </div>
  );
}

/**
 * Fraud-interception schematic.
 * A precise vector process diagram: the verification gate is the
 * single point at which a victim can still interrupt the sequence.
 */
export function ScamInterceptionDiagram({ lang }: { lang: Locale }) {
  const fr = lang === "fr";
  const nodes = fr
    ? [
        { code: "01", title: "Vecteur entrant", sub: "SMS, appel, lien ou facture" },
        { code: "02", title: "Pression fabriquée", sub: "Urgence, peur ou gain garanti" },
        { code: "03", title: "Sas de vérification", sub: "Contre-appel indépendant" },
        { code: "04", title: "Décision protégée", sub: "Blocage et signalement" },
      ]
    : [
        { code: "01", title: "Incoming vector", sub: "SMS, call, link or invoice" },
        { code: "02", title: "Engineered pressure", sub: "Urgency, fear or guaranteed gain" },
        { code: "03", title: "Verification gate", sub: "Independent call-back" },
        { code: "04", title: "Protected outcome", sub: "Blocked and reported" },
      ];

  return (
    <figure className="border border-white/15">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-3 border-b border-white/15 px-5 py-3">
        <span className="ed-label text-cyanx">
          {fr ? "Séquence d’interception" : "Interception sequence"}
        </span>
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-signal">
          {fr ? "Point d’arrêt · étape 03" : "Interrupt point · stage 03"}
        </span>
      </figcaption>

      {/* Vector spine: solid up to the gate, dashed beyond */}
      <div className="hidden px-5 pt-6 lg:block" aria-hidden="true">
        <svg viewBox="0 0 960 24" className="h-6 w-full" fill="none">
          <line x1="60" y1="12" x2="600" y2="12" stroke="#2BD4E8" strokeWidth="1.5" />
          <line
            x1="600"
            y1="12"
            x2="900"
            y2="12"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="1.5"
            strokeDasharray="4 5"
          />
          {[60, 340, 600, 900].map((cx, i) => (
            <rect
              key={cx}
              x={cx - 5}
              y={7}
              width="10"
              height="10"
              fill={i === 2 ? "#FFB02E" : "#050b1a"}
              stroke={i === 2 ? "#FFB02E" : "#2BD4E8"}
              strokeWidth="1.5"
            />
          ))}
        </svg>
      </div>

      <ol className="grid gap-px bg-white/12 lg:grid-cols-4">
        {nodes.map((node, i) => {
          const gate = i === 2;
          return (
            <li
              key={node.code}
              className={`bg-navy-950 p-5 ${gate ? "border-l-2 border-signal lg:border-l-0 lg:border-t-2" : ""}`}
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className={`ed-num text-xs ${gate ? "text-signal" : "text-cyanx"}`}>
                  {node.code}
                </span>
                {gate ? (
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-signal">
                    {fr ? "Arrêt" : "Stop"}
                  </span>
                ) : null}
              </div>
              <p className="mt-2.5 font-[family-name:var(--font-heading)] text-[0.9375rem] font-semibold text-white">
                {node.title}
              </p>
              <p className="mt-1 text-[0.8125rem] leading-relaxed text-slatex-300">
                {node.sub}
              </p>
            </li>
          );
        })}
      </ol>
    </figure>
  );
}

"use client";

/**
 * GLOPROFAS Scam Checker — Option A: paste a suspicious message for pattern
 * analysis; Option B: select warning signs. Results explain every detected
 * pattern, recommend protective actions and link to reporting channels.
 * Privacy-first: no account, nothing stored, secrets actively warned against.
 */

import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CircleHelp,
  Info,
  OctagonAlert,
  Search,
  ShieldAlert,
  ShieldCheck,
  Siren,
  TriangleAlert,
} from "lucide-react";
import { A } from "@/lib/router";
import { useI18n } from "@/lib/i18n";
import { R } from "@/lib/content/copy";
import { WARNING_SIGN_OPTIONS, CHECKER_PRIVACY } from "@/lib/content/checker-data";
import { Btn, PageHero, Reveal } from "@/components/shared/ui";

type CheckerResponse = {
  band: "strong" | "several" | "insufficient" | "none";
  score: number;
  mode: "text" | "signs" | "combined";
  indicators: { id: string; category: string; label: string; explanation: string; matchedPattern?: string }[];
  signResults: { id: string; label: string; explanation: string }[];
  secretsWarning: boolean;
  matchedAlerts: { id: string; title: string; risk: string }[];
  relatedArticles: { slug: string; title: string; summary: string }[];
  actions: string[];
  disclaimer: string;
};

const BAND_STYLE = {
  strong: {
    border: "border-[#d23434]/45",
    bg: "bg-[#d23434]/[0.05]",
    icon: OctagonAlert,
    color: "text-[#a52222]",
    chip: "bg-[#d23434] text-white",
  },
  several: {
    border: "border-signal-500/50",
    bg: "bg-signal-100/50",
    icon: TriangleAlert,
    color: "text-signal-600",
    chip: "bg-signal-500 text-white",
  },
  insufficient: {
    border: "border-line-300",
    bg: "bg-mist-30",
    icon: CircleHelp,
    color: "text-slatex-600",
    chip: "bg-slatex-500 text-white",
  },
  none: {
    border: "border-[#159769]/40",
    bg: "bg-[#159769]/[0.05]",
    icon: ShieldCheck,
    color: "text-[#0d6e4a]",
    chip: "bg-[#159769] text-white",
  },
} as const;

const BAND_TITLE = {
  strong: { en: "Strong scam indicators detected", fr: "Indicateurs d’arnaque marqués détectés" },
  several: { en: "Several suspicious indicators detected", fr: "Plusieurs indicateurs suspects détectés" },
  insufficient: { en: "Insufficient information", fr: "Informations insuffisantes" },
  none: { en: "No obvious indicators detected", fr: "Aucun indicateur manifeste détecté" },
} as const;

const BAND_SUMMARY = {
  strong: {
    en: "This content shows patterns typical of known scam techniques. Do not pay, do not share codes, and verify independently through an official channel before doing anything.",
    fr: "Ce contenu présente des schémas typiques d’arnaques connues. Ne payez pas, ne partagez aucun code, et vérifiez par un canal officiel avant toute action.",
  },
  several: {
    en: "Several elements are worth checking. Treat them as red flags until you can verify the sender and the request independently.",
    fr: "Plusieurs éléments méritent vérification. Considérez-les comme des signaux d’alerte tant que l’expéditeur et la demande ne sont pas vérifiés.",
  },
  insufficient: {
    en: "There is not enough content to assess. Add the message text or select the warning signs you noticed for a meaningful analysis.",
    fr: "Le contenu est insuffisant pour évaluer. Ajoutez le texte du message ou cochez les signaux constatés pour une analyse utile.",
  },
  none: {
    en: "No obvious indicator was detected. Stay cautious anyway: the absence of detected indicators does not prove that a message is legitimate — sophisticated scams can look perfectly normal.",
    fr: "Aucun indicateur manifeste détecté. Restez prudent : l’absence d’indicateurs ne prouve pas qu’un message est légitime — certaines arnaques sophistiquées paraissent parfaitement normales.",
  },
} as const;

export function ScamCheckerView() {
  const { locale } = useI18n();
  const fr = locale === "fr";
  const [mode, setMode] = useState<"message" | "signs">("message");
  const [text, setText] = useState("");
  const [signs, setSigns] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<CheckerResponse | null>(null);
  const [error, setError] = useState(false);

  const toggleSign = (id: string) => {
    setSigns((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  };

  useEffect(() => {
    document.title = `${fr ? "GLOPROFAS Scam Checker" : "GLOPROFAS Scam Checker"} · GLOPROFAS`;
  }, [fr]);

  async function run(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    if (mode === "message" && text.trim().length < 3) return;
    if (mode === "signs" && signs.length === 0) return;
    setBusy(true);
    setError(false);
    setResult(null);
    try {
      const res = await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: mode === "message" ? text : undefined,
          signs: mode === "signs" || (mode === "message" && signs.length > 0) ? signs : undefined,
          locale,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error("http");
      setResult(data as CheckerResponse);
      requestAnimationFrame(() => {
        document.getElementById("checker-result")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } catch {
      setError(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <PageHero
        eyebrow={fr ? "Outil phare" : "Flagship tool"}
        title="GLOPROFAS Scam Checker"
        lead={
          fr
            ? "Pas sûr qu’un message, une offre ou une communication soit légitime ? Utilisez le GLOPROFAS Scam Checker pour examiner les signaux d’alerte courants et repérer les schémas potentiellement suspects."
            : "Not sure whether a message, offer or communication is legitimate? Use the GLOPROFAS Scam Checker to examine common warning signs and identify potentially suspicious patterns."
        }
        image="/images/gen/verify-hands.jpg"
        imageAlt={fr ? "Mains posées sur une table de café à côté d’un téléphone retourné et d’un carnet, à l’heure bleue" : "Hands resting on a cafe table beside a face-down phone and a notebook at blue hour"}
        breadcrumb={[{ label: fr ? "Centre de ressources" : "Resource Centre", href: "/resources" }, { label: "Scam Checker" }]}
      >
        <p className="mt-1 max-w-xl text-[13px] leading-relaxed text-slatex-300">{R(CHECKER_PRIVACY, locale)}</p>
      </PageHero>

      <section className="section-y bg-white">
        <div className="container-g max-w-3xl">
          {/* Mode switch */}
          <Reveal>
            <div className="grid gap-3 sm:grid-cols-2" role="tablist" aria-label={fr ? "Options de vérification" : "Checking options"}>
              <button
                type="button"
                role="tab"
                aria-selected={mode === "message"}
                onClick={() => setMode("message")}
                className={`card-g p-4 text-left transition-all ${mode === "message" ? "!border-brand-600 ring-2 ring-brand-600/25" : "hover:border-brand-400/50"}`}
              >
                <span className="flex items-center gap-2.5">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${mode === "message" ? "bg-brand-600 text-white" : "bg-mist-50 text-brand-600"}`}>
                    <Search size={16} aria-hidden />
                  </span>
                  <span>
                    <span className="block font-heading text-[14px] font-bold text-ink-900">
                      {fr ? "Option A — Vérifier un message" : "Option A — Check a message"}
                    </span>
                    <span className="block text-[12px] text-slatex-500">
                      {fr ? "Collez un SMS, WhatsApp, courriel, offre…" : "Paste an SMS, WhatsApp, email, offer…"}
                    </span>
                  </span>
                </span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mode === "signs"}
                onClick={() => setMode("signs")}
                className={`card-g p-4 text-left transition-all ${mode === "signs" ? "!border-brand-600 ring-2 ring-brand-600/25" : "hover:border-brand-400/50"}`}
              >
                <span className="flex items-center gap-2.5">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${mode === "signs" ? "bg-brand-600 text-white" : "bg-mist-50 text-brand-600"}`}>
                    <TriangleAlert size={16} aria-hidden />
                  </span>
                  <span>
                    <span className="block font-heading text-[14px] font-bold text-ink-900">
                      {fr ? "Option B — Signaux constatés" : "Option B — Warning signs"}
                    </span>
                    <span className="block text-[12px] text-slatex-500">
                      {fr ? "Cochez ce que vous avez remarqué" : "Tick what you have noticed"}
                    </span>
                  </span>
                </span>
              </button>
            </div>
          </Reveal>

          <Reveal className="mt-6">
            <form onSubmit={run} className="card-g p-6 lg:p-8">
              {mode === "message" ? (
                <>
                  <label htmlFor="checker-text" className="lbl-g">
                    {fr ? "Message, offre ou communication à examiner" : "Message, offer or communication to examine"}
                  </label>
                  <textarea
                    id="checker-text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={7}
                    maxLength={3000}
                    placeholder={
                      fr
                        ? "Collez ici le SMS suspect, le message WhatsApp, le courriel, l’offre d’investissement, l’annonce d’emploi, la demande de paiement ou le message du « service client »…"
                        : "Paste the suspicious SMS, WhatsApp message, email, investment offer, job advert, payment request or “customer support” message…"
                    }
                    className="field-g resize-y font-mono text-[13.5px]"
                  />
                  <p className="mt-3 flex items-start gap-2 text-[12.5px] leading-relaxed text-slatex-600">
                    <Info size={14} className="mt-0.5 shrink-0 text-brand-600" aria-hidden />
                    {fr
                      ? "Ne collez jamais de mots de passe, de codes PIN, de codes à usage unique ni de données bancaires. Aucune saisie n’est conservée."
                      : "Never paste passwords, PINs, one-time codes or card details. No input is stored."}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-4">
                    <Btn type="submit" variant="primary" disabled={busy || text.trim().length < 3}>
                      {busy ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden />
                          {fr ? "Analyse…" : "Analysing…"}
                        </>
                      ) : (
                        <>
                          <Search size={15} aria-hidden />
                          {fr ? "Vérifier le message" : "Check message"}
                        </>
                      )}
                    </Btn>
                    <span className="text-[12.5px] text-slatex-400">{text.length}/3000</span>
                  </div>
                </>
              ) : (
                <>
                  <fieldset>
                    <legend className="lbl-g">
                      {fr ? "Qu’avez-vous remarqué ? Cochez tout ce qui s’applique." : "What have you noticed? Tick everything that applies."}
                    </legend>
                    <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                      {WARNING_SIGN_OPTIONS.map((o) => {
                        const on = signs.includes(o.id);
                        return (
                          <label
                            key={o.id}
                            className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-colors ${
                              on ? "border-brand-600 bg-brand-50" : "border-line-200 hover:border-brand-400/60"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={on}
                              onChange={() => toggleSign(o.id)}
                              className="mt-0.5 h-4 w-4 shrink-0 accent-[#0e7490]"
                            />
                            <span className="text-[13px] leading-snug text-ink-900">{R(o.label, locale)}</span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>
                  <div className="mt-5 flex flex-wrap items-center gap-4">
                    <Btn type="submit" variant="primary" disabled={busy || signs.length === 0}>
                      {busy ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden />
                          {fr ? "Évaluation…" : "Assessing…"}
                        </>
                      ) : (
                        <>
                          <ShieldAlert size={15} aria-hidden />
                          {fr ? "Évaluer les signaux" : "Assess warning signs"}
                        </>
                      )}
                    </Btn>
                    <span className="text-[12.5px] text-slatex-400">
                      {signs.length} {fr ? "signal(aux) sélectionné(s)" : "sign(s) selected"}
                    </span>
                  </div>
                </>
              )}
            </form>
          </Reveal>

          {error ? (
            <p role="alert" className="mt-5 rounded-xl border border-[#d23434]/30 bg-[#d23434]/[0.06] px-5 py-3.5 text-[13.5px] font-medium text-[#a52222]">
              {fr
                ? "Le vérificateur est indisponible pour le moment. Réessayez dans un instant."
                : "The checker is unavailable right now. Please try again in a moment."}
            </p>
          ) : null}

          {result ? (
            <div id="checker-result" className="mt-8 scroll-mt-24">
              <Reveal>
                <div className={`rounded-2xl border-2 ${BAND_STYLE[result.band].border} ${BAND_STYLE[result.band].bg} p-6 lg:p-8`} role="status">
                  <div className="flex flex-wrap items-center gap-4">
                    {(() => {
                      const Icon = BAND_STYLE[result.band].icon;
                      return (
                        <span className={`flex h-12 w-12 items-center justify-center rounded-xl bg-white ${BAND_STYLE[result.band].color}`}>
                          <Icon size={22} strokeWidth={2} aria-hidden />
                        </span>
                      );
                    })()}
                    <div>
                      <span className={`chip-g ${BAND_STYLE[result.band].chip}`}>
                        {fr ? "Évaluation indicative" : "Indicative assessment"}
                      </span>
                      <p className={`mt-1.5 font-heading text-[15.5px] font-bold ${BAND_STYLE[result.band].color}`}>
                        {R(BAND_TITLE[result.band], locale)}
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 text-[14.5px] leading-relaxed text-ink-700">{R(BAND_SUMMARY[result.band], locale)}</p>

                  {result.secretsWarning ? (
                    <p className="mt-4 rounded-lg border border-[#d23434]/40 bg-white px-4 py-3 text-[13px] font-semibold text-[#a52222]">
                      {fr
                        ? "⚠ Votre texte semble contenir des données sensibles (code, mot de passe ou numéro de carte). Ne partagez jamais ces informations — pas même ici."
                        : "⚠ Your text appears to contain sensitive data (a code, password or card number). Never share this information — not even here."}
                    </p>
                  ) : null}

                  {/* Detected indicators */}
                  {result.indicators.length > 0 ? (
                    <div className="mt-6">
                      <h3 className="mb-3 font-heading text-[13px] font-bold uppercase tracking-wide text-slatex-500">
                        {fr ? "Schémas détectés et pourquoi ils sont suspects" : "Detected patterns and why they are suspicious"}
                      </h3>
                      <ul className="space-y-3">
                        {result.indicators.map((d, i) => (
                          <li key={`${d.id}-${i}`} className="rounded-xl bg-white p-4 ring-1 ring-line-200">
                            <p className="flex items-center gap-2 text-[13.5px] font-semibold text-ink-900">
                              <TriangleAlert size={14} className="shrink-0 text-signal-600" aria-hidden />
                              {d.label}
                            </p>
                            <p className="mt-1.5 text-[13px] leading-relaxed text-slatex-600">{d.explanation}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {/* Selected signs */}
                  {result.signResults.length > 0 ? (
                    <div className="mt-6">
                      <h3 className="mb-3 font-heading text-[13px] font-bold uppercase tracking-wide text-slatex-500">
                        {fr ? "Signaux que vous avez signalés" : "Warning signs you reported"}
                      </h3>
                      <ul className="space-y-3">
                        {result.signResults.map((s) => (
                          <li key={s.id} className="rounded-xl bg-white p-4 ring-1 ring-line-200">
                            <p className="flex items-center gap-2 text-[13.5px] font-semibold text-ink-900">
                              <TriangleAlert size={14} className="shrink-0 text-signal-600" aria-hidden />
                              {s.label}
                            </p>
                            <p className="mt-1.5 text-[13px] leading-relaxed text-slatex-600">{s.explanation}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {/* Recommended actions */}
                  {result.actions.length > 0 ? (
                    <div className="mt-6">
                      <h3 className="mb-3 font-heading text-[13px] font-bold uppercase tracking-wide text-slatex-500">
                        {fr ? "Actions recommandées dès maintenant" : "Recommended actions right now"}
                      </h3>
                      <ul className="space-y-2">
                        {result.actions.map((a, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-[13.5px] text-ink-700">
                            <ShieldCheck size={15} className="mt-0.5 shrink-0 text-risk-low" aria-hidden />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {/* Related articles */}
                  {result.relatedArticles.length > 0 ? (
                    <div className="mt-6 border-t border-line-200 pt-5">
                      <h3 className="mb-3 font-heading text-[13px] font-bold uppercase tracking-wide text-slatex-500">
                        {fr ? "Lire ensuite" : "Read next"}
                      </h3>
                      <ul className="space-y-2">
                        {result.relatedArticles.map((a) => (
                          <li key={a.slug}>
                            <A href={`/resources/practical-tools/${a.slug}`} className="group inline-flex items-start gap-2.5 text-[13.5px] font-semibold text-brand-600 hover:underline">
                              <BookOpen size={14} className="mt-0.5 shrink-0" aria-hidden />
                              {a.title}
                            </A>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {/* Reporting */}
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line-200 pt-5">
                    <div className="min-w-0">
                      <p className="text-[12px] italic leading-relaxed text-slatex-400">{result.disclaimer}</p>
                      <A href="/resources/reporting-channels" className="link-g mt-2 !text-[12.5px]">
                        {fr ? "Trouver l’autorité officielle de votre pays" : "Find your country’s official authority"}
                        <ArrowRight size={13} strokeWidth={2.2} aria-hidden />
                      </A>
                    </div>
                    <Btn href="/report" variant="signal" size="sm">
                      <Siren size={14} aria-hidden />
                      {fr ? "Signaler cette activité suspecte" : "Report this suspicious activity"}
                    </Btn>
                  </div>
                </div>
              </Reveal>
            </div>
          ) : null}

          {/* Privacy panel */}
          <Reveal delay={100}>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="card-g p-5">
                <h2 className="flex items-center gap-2 font-heading text-[14px] font-bold text-ink-900">
                  <ShieldCheck size={16} className="text-risk-low" aria-hidden />
                  {fr ? "Confidentialité et sécurité" : "Privacy and security"}
                </h2>
                <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-slatex-600">
                  <li>{fr ? "Aucun compte ni inscription requis." : "No account or registration required."}</li>
                  <li>{fr ? "Les messages soumis ne sont ni publiés ni conservés." : "Submitted messages are neither published nor stored."}</li>
                  <li>{fr ? "Aucun envoi externe : l’analyse tourne sur nos serveurs." : "No external transmission: the analysis runs on our servers."}</li>
                  <li>{fr ? "Saisies nettoyées contre les liens malveillants et l’injection." : "Input sanitised against malicious links and injection."}</li>
                </ul>
              </div>
              <div className="card-g p-5">
                <h2 className="flex items-center gap-2 font-heading text-[14px] font-bold text-ink-900">
                  <Info size={16} className="text-brand-600" aria-hidden />
                  {fr ? "Ce que le vérificateur n’est pas" : "What the checker is not"}
                </h2>
                <p className="mt-3 text-[13px] leading-relaxed text-slatex-600">
                  {fr
                    ? "Le GLOPROFAS Scam Checker fournit une évaluation indicative fondée sur des signaux d’alerte identifiables. Il ne garantit ni la fraude ni la légitimité d’un message et ne remplace pas une enquête professionnelle. Un message sans indicateur détecté n’est pas pour autant certifié légitime."
                    : "The GLOPROFAS Scam Checker provides an indicative assessment based on identifiable warning signs. It does not guarantee that a message is fraudulent or legitimate and does not replace professional investigation. A message without detected indicators is not thereby certified as legitimate."}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

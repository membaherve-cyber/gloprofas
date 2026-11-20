"use client";

/**
 * Check a number, link or message — Oskie heuristic checker.
 * Preserved workflow: paste content → risk assessment → warning signs,
 * recommended actions, matched alerts. Never a verdict.
 */

import React, { useState } from "react";
import {
  Info,
  MessageCircleQuestion,
  OctagonAlert,
  Search,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import { A } from "@/lib/router";
import { useI18n } from "@/lib/i18n";
import { R, L } from "@/lib/content/copy";
import { ZITE_CONTENT } from "@/lib/content/zite-data";
import { Btn, PageHero, Reveal, RiskBadge } from "@/components/shared/ui";

interface CheckResult {
  risk: "Low" | "Medium" | "High";
  summary: string;
  signs: string[];
  actions: string[];
  matchedKeywords: number;
  matchedAlerts: { id: string; title: string; risk: string }[];
  secretsWarning: boolean;
  disclaimer: string;
}

export function CheckView() {
  const { locale } = useI18n();
  const fr = locale === "fr";
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<CheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function run(e: React.FormEvent) {
    e.preventDefault();
    if (text.trim().length < 3 || busy) return;
    setBusy(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, locale }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "error");
      setResult(data as CheckResult);
    } catch {
      setError(
        fr
          ? "La vérification est indisponible pour le moment. Réessayez dans un instant."
          : "The check is unavailable right now. Please try again in a moment."
      );
    } finally {
      setBusy(false);
    }
  }

  const riskStyles = {
    High: { border: "border-[#d23434]/40", bg: "bg-[#d23434]/[0.05]", icon: OctagonAlert, color: "text-[#a52222]" },
    Medium: { border: "border-signal-500/50", bg: "bg-signal-100/50", icon: TriangleAlert, color: "text-signal-600" },
    Low: { border: "border-[#159769]/40", bg: "bg-[#159769]/[0.05]", icon: ShieldCheck, color: "text-[#0d6e4a]" },
  } as const;

  return (
    <>
      <PageHero
        eyebrow="Oskie"
        title={fr ? "Vérifier un numéro, un lien ou un message" : "Check a number, link or message"}
        lead={
          fr
            ? "Collez le message suspect, le lien ou le numéro de téléphone. Oskie le compare aux schémas d'arnaques connus et vous donne une évaluation indicative."
            : "Paste the suspicious message, link or phone number. Oskie compares it against known scam patterns and gives you an indicative assessment."
        }
        image="/images/gen/check-verify.jpg"
        imageAlt={fr ? "Personne vérifiant attentivement un message sur son téléphone" : "Person carefully verifying a message on their phone"}
      />

      <section className="section-y bg-white">
        <div className="container-g max-w-3xl">
          <Reveal>
            <form onSubmit={run} className="card-g p-6 lg:p-8">
              <label htmlFor="check-text" className="lbl-g">
                {fr ? "Message, lien ou numéro à vérifier" : "Message, link or number to check"}
              </label>
              <textarea
                id="check-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={6}
                maxLength={3000}
                placeholder={
                  fr
                    ? "+237 6XX XX XX XX, www.exemple-suspect.com ou le texte du message…"
                    : "+237 6XX XX XX XX, www.example-site.com or the text of the message…"
                }
                className="field-g resize-y font-mono text-[13.5px]"
              />
              <p className="mt-3 flex items-start gap-2 text-[12.5px] leading-relaxed text-slatex-600">
                <Info size={14} className="mt-0.5 shrink-0 text-brand-600" aria-hidden />
                {fr
                  ? "Ne collez jamais de mots de passe, de codes PIN, de codes à usage unique ni de données bancaires. Aucune saisie n'est conservée."
                  : "Never paste passwords, PINs, one-time codes or card details. No input is stored."}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Btn type="submit" variant="primary" disabled={busy || text.trim().length < 3}>
                  {busy ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden />
                      {fr ? "Analyse…" : "Analysing…"}
                    </>
                  ) : (
                    <>
                      <Search size={15} aria-hidden />
                      {fr ? "Vérifier maintenant" : "Check now"}
                    </>
                  )}
                </Btn>
                <span className="text-[12.5px] text-slatex-400">{text.length}/3000</span>
              </div>
            </form>
          </Reveal>

          {error ? (
            <p role="alert" className="mt-5 rounded-xl border border-[#d23434]/30 bg-[#d23434]/[0.06] px-5 py-3.5 text-[13.5px] font-medium text-[#a52222]">
              {error}
            </p>
          ) : null}

          {result ? (
            <Reveal>
              <div
                className={`mt-6 rounded-2xl border-2 ${riskStyles[result.risk].border} ${riskStyles[result.risk].bg} p-6 lg:p-8`}
                role="status"
              >
                <div className="flex flex-wrap items-center gap-4">
                  {(() => {
                    const RIcon = riskStyles[result.risk].icon;
                    return (
                      <span className={`flex h-12 w-12 items-center justify-center rounded-xl bg-white ${riskStyles[result.risk].color}`}>
                        <RIcon size={22} strokeWidth={2} aria-hidden />
                      </span>
                    );
                  })()}
                  <div>
                    <RiskBadge risk={result.risk} />
                    <p className={`mt-1.5 font-heading text-[15px] font-bold ${riskStyles[result.risk].color}`}>
                      {result.risk === "High"
                        ? fr ? "Plusieurs signaux d'alerte détectés" : "Several warning signs detected"
                        : result.risk === "Medium"
                          ? fr ? "Éléments à vérifier" : "Elements worth checking"
                          : fr ? "Aucun signal majeur détecté" : "No major warning sign detected"}
                    </p>
                  </div>
                </div>

                <p className="mt-5 text-[14.5px] leading-relaxed text-ink-700">{result.summary}</p>

                {result.secretsWarning ? (
                  <p className="mt-4 rounded-lg border border-[#d23434]/40 bg-white px-4 py-3 text-[13px] font-semibold text-[#a52222]">
                    {fr
                      ? "⚠ Votre texte semble contenir des données sensibles (code, mot de passe ou numéro de carte). Ne partagez jamais ces informations."
                      : "⚠ Your text appears to contain sensitive data (a code, password or card number). Never share this information."}
                  </p>
                ) : null}

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <h2 className="mb-3 font-heading text-[13px] font-bold uppercase tracking-wide text-slatex-500">
                      {fr ? "Signaux d'alerte typiques" : "Typical warning signs"}
                    </h2>
                    <ul className="space-y-2">
                      {result.signs.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-[13.5px] text-ink-700">
                          <TriangleAlert size={14} className="mt-1 shrink-0 text-risk-medium" aria-hidden />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h2 className="mb-3 font-heading text-[13px] font-bold uppercase tracking-wide text-slatex-500">
                      {fr ? "Actions recommandées" : "Recommended actions"}
                    </h2>
                    <ul className="space-y-2">
                      {result.actions.map((a, i) => (
                        <li key={i} className="flex items-start gap-2 text-[13.5px] text-ink-700">
                          <ShieldCheck size={14} className="mt-1 shrink-0 text-risk-low" aria-hidden />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {result.matchedAlerts.length > 0 ? (
                  <div className="mt-6 border-t border-line-200 pt-5">
                    <h2 className="mb-3 font-heading text-[13px] font-bold uppercase tracking-wide text-slatex-500">
                      {fr ? "Alertes correspondantes" : "Matching alerts"}
                    </h2>
                    <ul className="space-y-2">
                      {result.matchedAlerts.map((a) => (
                        <li key={a.id}>
                          <A
                            href={`/alerts/${a.id}`}
                            className="inline-flex items-center gap-2.5 text-[13.5px] font-semibold text-brand-600 hover:underline"
                          >
                            <RiskBadge risk={a.risk} />
                            {a.title}
                          </A>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line-200 pt-5">
                  <p className="text-[12px] italic text-slatex-400">{result.disclaimer}</p>
                  <Btn href="/report" variant="signal" size="sm">
                    {R(L.report, locale)}
                  </Btn>
                </div>
              </div>
            </Reveal>
          ) : null}

          {/* Help alternatives */}
          <Reveal delay={120}>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <A href="/scams" className="group">
                <div className="card-g hoverable h-full p-6">
                  <MessageCircleQuestion size={22} className="text-brand-600" aria-hidden />
                  <h2 className="h3-g mt-3 text-[1.05rem]">
                    {fr ? "Apprendre à repérer les arnaques" : "Learn to spot scams"}
                  </h2>
                  <p className="mt-2 text-[13.5px] text-slatex-600">
                    {fr
                      ? "Douze guides pas à pas pour reconnaître chaque type d'arnaque."
                      : "Twelve step-by-step guides to recognise every scam type."}
                  </p>
                </div>
              </A>
              <A href="/victim-support" className="group">
                <div className="card-g hoverable h-full p-6">
                  <ShieldCheck size={22} className="text-brand-600" aria-hidden />
                  <h2 className="h3-g mt-3 text-[1.05rem]">
                    {fr ? "Vous avez été victime ?" : "Already affected?"}
                  </h2>
                  <p className="mt-2 text-[13.5px] text-slatex-600">
                    {fr
                      ? "Soutien, premiers gestes et accompagnement respectueux."
                      : "Support, first steps and respectful guidance."}
                  </p>
                </div>
              </A>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  LoaderCircle,
  ShieldAlert,
  ShieldQuestion,
} from "lucide-react";
import { Btn, PageHero } from "@/components/zite/shared";
import { formatAerialBadge, PAGE_AERIAL_HEROES } from "@/lib/african-cities";
import type { Locale } from "@/lib/i18n";

type CheckResult = {
  risk: "Low" | "Medium" | "High";
  summary: string;
  reportMatches: number;
  signs: string[];
  actions: string[];
  alerts: { id: string; title: string }[];
};

const TONES = {
  Low: "border-risk-low/40 bg-risk-low/10",
  Medium: "border-amber-400/50 bg-amber-50",
  High: "border-red-400/50 bg-red-50",
} as const;

const ICONS = {
  Low: CheckCircle2,
  Medium: ShieldQuestion,
  High: ShieldAlert,
} as const;

export function ZiteCheckView({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const l = (path = "") => `/${locale}${path}`;
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CheckResult | null>(null);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim().length < 3) {
      setError(
        fr
          ? "Saisissez au moins 3 caractères."
          : "Enter at least 3 characters.",
      );
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query.trim(), lang: locale }),
      });
      if (!res.ok) throw new Error("failed");
      setResult((await res.json()) as CheckResult);
    } catch {
      setError(
        fr
          ? "La vérification a échoué. Réessayez."
          : "The check failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  const RiskIcon = result ? ICONS[result.risk] : ShieldQuestion;
  const riskTitle = result
    ? {
        Low: fr ? "Peu de signaux d’alerte" : "Few warning signs",
        Medium: fr ? "Prudence" : "Be cautious",
        High: fr ? "Risque élevé" : "High risk",
      }[result.risk]
    : "";

  return (
    <>
      <PageHero
        eyebrow="Jarvis"
        title={
          fr
            ? "Vérifier un numéro, un lien ou un message"
            : "Check a number, link or message"
        }
        lead={
          fr
            ? "Collez ce que vous avez reçu. Nous le comparons à nos alertes et aux signalements reçus, puis Jarvis analyse les signaux d’alerte."
            : "Paste what you received. We compare it with our alerts and the reports we’ve received, then Jarvis looks for warning signs."
        }
        image={PAGE_AERIAL_HEROES.check.image}
        cityBadge={formatAerialBadge(PAGE_AERIAL_HEROES.check.city, locale)}
        crumbs={[
          { label: fr ? "Accueil" : "Home", to: l() },
          { label: fr ? "Vérifier" : "Check" },
        ]}
      />

      <section className="bg-white py-16 lg:py-24">
        <div className="container-g max-w-3xl">
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="chk"
              className="mb-2 block text-sm font-semibold text-ink"
            >
              {fr
                ? "Numéro, site web ou message suspect"
                : "Suspicious phone number, website or message"}
            </label>
            <textarea
              id="chk"
              rows={5}
              maxLength={3000}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                fr
                  ? "Ex. +237 6XX XX XX XX, www.exemple-site.com ou le texte du message"
                  : "e.g. +237 6XX XX XX XX, www.example-site.com or the text of the message"
              }
              className="w-full rounded-sm border border-line bg-white p-4 text-ink focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20 transition-colors duration-fast ease-standard"
            />
            {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
            <button
              type="submit"
              disabled={loading}
              className="mt-4 inline-flex h-[52px] items-center gap-2 rounded-[2px] bg-brand-600 px-7 font-semibold text-white disabled:opacity-60"
            >
              {loading ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : null}
              {loading
                ? fr
                  ? "Analyse…"
                  : "Checking…"
                : fr
                  ? "Vérifier"
                  : "Check now"}
            </button>
            <p className="mt-3 text-sm text-slatex-600">
              {fr
                ? "Ne collez jamais de mot de passe, code PIN ou code reçu par SMS. Ce résultat est indicatif : GLOPROFAS ne certifie aucun numéro ni site."
                : "Never paste passwords, PINs or SMS codes. This result is guidance only: GLOPROFAS does not certify any number or website."}
            </p>
          </form>

          {result ? (
            <div
              role="status"
              className={`mt-8 rounded-none border-2 p-6 sm:p-8 ${
                TONES[result.risk]
              }`}
            >
              <div className="flex items-center gap-3">
                <RiskIcon className="h-8 w-8 text-ink" />
                <h2 className="h3 text-ink">{riskTitle}</h2>
              </div>
              <p className="mt-3 text-slatex-600">{result.summary}</p>
              {result.reportMatches > 0 ? (
                <p className="mt-4 flex items-center gap-2 font-semibold text-ink">
                  <AlertTriangle className="h-5 w-5" />
                  {fr
                    ? `Correspond à ${result.reportMatches} signalement(s) reçu(s) par GLOPROFAS.`
                    : `Matches ${result.reportMatches} report(s) received by GLOPROFAS.`}
                </p>
              ) : null}

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {result.signs.length > 0 ? (
                  <div>
                    <p className="mb-2 block text-sm font-semibold text-ink">
                      {fr ? "Signaux d’alerte" : "Warning signs"}
                    </p>
                    <ul className="list-disc space-y-1 pl-5 text-slatex-600">
                      {result.signs.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {result.actions.length > 0 ? (
                  <div>
                    <p className="mb-2 block text-sm font-semibold text-ink">
                      {fr ? "Que faire" : "What to do"}
                    </p>
                    <ul className="list-disc space-y-1 pl-5 text-slatex-600">
                      {result.actions.map((a) => (
                        <li key={a}>{a}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>

              {result.alerts.length > 0 ? (
                <div className="mt-6">
                  <p className="mb-2 block text-sm font-semibold text-ink">
                    {fr ? "Alertes liées" : "Related alerts"}
                  </p>
                  <ul className="space-y-1">
                    {result.alerts.map((al) => (
                      <li key={al.id}>
                        <Link
                          href={l(`/alerts/${al.id}`)}
                          className="font-semibold text-brand-600 hover:underline transition-colors duration-fast ease-standard"
                        >
                          {al.title} →
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="mt-8">
                <Btn href={l("/report")} variant="signal">
                  {fr ? "Signaler cette arnaque" : "Report this scam"}
                </Btn>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}

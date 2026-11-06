"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { AlertCircle, ArrowLeft, ArrowRight, Check, Paperclip, ShieldAlert } from "lucide-react";
import { CopyButton } from "@/components/ui/motion";
import { CategoryIcon } from "@/components/ui/icon-map";
import { routes, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/messages/en";

type CategoryOption = { slugEn: string; slugFr: string; nameEn: string; nameFr: string; icon: string };

type Confirmation = { reference: string };

const channels = [
  "WhatsApp / messaging",
  "Phone call",
  "SMS",
  "Email",
  "Social media",
  "Website",
  "In person",
];

export function ReportWizard({
  locale,
  dict,
  categories,
}: {
  locale: Locale;
  dict: Dictionary;
  categories: CategoryOption[];
}) {
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [moneyLost, setMoneyLost] = useState(false);

  const stepNames = dict.report.stepNames;
  const progress = useMemo(() => ((step + 1) / stepNames.length) * 100, [step, stepNames.length]);

  function validateStep(): string | null {
    const form = formRef.current;
    if (!form) return null;
    if (step === 0) {
      if (!selectedCategory) return dict.report.errors.category;
      const description = (form.elements.namedItem("description") as HTMLTextAreaElement)?.value ?? "";
      if (description.trim().length < 30) return dict.report.errors.description;
      const date = (form.elements.namedItem("incidentDate") as HTMLInputElement)?.value ?? "";
      if (!date || new Date(date).getTime() > Date.now() + 86_400_000) return dict.report.errors.date;
    }
    if (step === 1) {
      const channel = (form.elements.namedItem("channel") as HTMLSelectElement)?.value ?? "";
      if (!channel) return dict.report.errors.channel;
      const country = (form.elements.namedItem("country") as HTMLInputElement)?.value ?? "";
      if (country.trim().length < 2) return dict.report.errors.country;
    }
    if (step === 3) {
      const email = (form.elements.namedItem("reporterEmail") as HTMLInputElement)?.value ?? "";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return dict.report.errors.email;
    }
    return null;
  }

  function next() {
    const message = validateStep();
    if (message) {
      setError(message);
      return;
    }
    setError(null);
    setStep((current) => Math.min(current + 1, stepNames.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function back() {
    setError(null);
    setStep((current) => Math.max(current - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!selectedCategory) {
      setError(dict.report.errors.category);
      setStep(0);
      return;
    }
    const consent = form.elements.namedItem("consent") as HTMLInputElement | null;
    if (!consent?.checked) {
      setError(dict.report.errors.consent);
      return;
    }
    setPending(true);
    setError(null);
    try {
      const data = new FormData(form);
      data.set("categorySlug", selectedCategory);
      const response = await fetch("/api/reports", { method: "POST", body: data });
      if (response.status === 429) {
        setError(dict.report.errors.rate);
        return;
      }
      if (!response.ok) {
        const payload = (await response.json().catch(() => ({}))) as { error?: string };
        setError(payload.error ?? dict.report.errors.submit);
        return;
      }
      const payload = (await response.json()) as { reference: string };
      setConfirmation({ reference: payload.reference });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError(dict.report.errors.submit);
    } finally {
      setPending(false);
    }
  }

  if (confirmation) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="rounded-none border border-risk-low/40 bg-risk-low/5 p-6 sm:p-8">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-risk-low/15 text-risk-low">
            <Check size={24} aria-hidden="true" />
          </span>
          <h2 className="mt-5 text-[1.75rem]">{dict.report.confirm.title}</h2>
          <p className="mt-2 text-[0.95rem] text-slate-600">{dict.report.confirm.body}</p>
          <div className="mt-5 flex flex-wrap items-center gap-3 rounded-sm border border-line-200 bg-white p-4">
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-slate-600">
                {dict.report.confirm.reference}
              </p>
              <p className="font-[family-name:var(--font-heading)] text-[1.4rem] font-bold tracking-wide text-ink-900">
                {confirmation.reference}
              </p>
            </div>
            <CopyButton value={confirmation.reference} labels={{ copy: dict.common.copy, copied: dict.common.copied }} />
          </div>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-sm border border-line-200 bg-white p-5">
            <h3 className="text-[1.05rem]">{dict.report.confirm.nextTitle}</h3>
            <p className="mt-2 text-[0.88rem] leading-relaxed text-slate-600">{dict.report.confirm.nextBody}</p>
          </div>
          <div className="rounded-sm border border-signal-400/50 bg-signal-400/10 p-5">
            <h3 className="flex items-center gap-2 text-[1.05rem]">
              <ShieldAlert size={18} className="text-risk-high" aria-hidden="true" />
              {dict.report.confirm.safetyTitle}
            </h3>
            <p className="mt-2 text-[0.88rem] leading-relaxed text-ink-900">{dict.report.confirm.safetyBody}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={routes.home(locale)} className="btn btn-outline">
            {dict.report.confirm.home}
          </Link>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setConfirmation(null);
              setStep(0);
              setSelectedCategory("");
            }}
          >
            {dict.report.confirm.again}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <div className="flex items-center justify-between text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-slate-600">
          <span>
            {dict.common.page} {step + 1} / {stepNames.length} — {stepNames[step]}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-line-200">
          <div className="h-full rounded-full bg-blue-600 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
        <ol className="mt-3 hidden flex-wrap gap-x-4 gap-y-1 text-[0.78rem] text-slate-600 sm:flex">
          {stepNames.map((name, index) => (
            <li key={name} className={index === step ? "font-semibold text-blue-600" : index < step ? "text-ink-900" : ""}>
              {index + 1}. {name}
            </li>
          ))}
        </ol>
      </div>

      <form ref={formRef} onSubmit={submit} className="rounded-none border border-line-200 bg-white p-5 sm:p-7">
        <section hidden={step !== 0} aria-label={stepNames[0]}>
          <fieldset>
            <legend className="label">
              {dict.report.labels.category} <span className="text-risk-critical">*</span>
            </legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {categories.map((category) => {
                const name = locale === "fr" ? category.nameFr : category.nameEn;
                const slug = locale === "fr" ? category.slugFr : category.slugEn;
                const active = selectedCategory === slug;
                return (
                  <label
                    key={slug}
                    className={`flex cursor-pointer items-center gap-3 rounded-sm border p-3 text-[0.88rem] font-medium transition-colors ${
                      active ? "border-blue-600 bg-blue-600/5 text-ink-900" : "border-line-200 text-slate-600 hover:border-blue-600/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="categorySlug"
                      value={slug}
                      checked={active}
                      onChange={() => setSelectedCategory(slug)}
                      className="sr-only"
                    />
                    <span className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] ${active ? "bg-blue-600 text-white" : "bg-mist-50 text-blue-600"}`}>
                      <CategoryIcon name={category.icon} size={17} />
                    </span>
                    {name}
                  </label>
                );
              })}
              <label
                className={`flex cursor-pointer items-center gap-3 rounded-sm border p-3 text-[0.88rem] font-medium transition-colors ${
                  selectedCategory === "not-sure" ? "border-blue-600 bg-blue-600/5" : "border-line-200 text-slate-600"
                }`}
              >
                <input
                  type="radio"
                  name="categoryUncertain"
                  checked={selectedCategory === "not-sure"}
                  onChange={() => setSelectedCategory("not-sure")}
                  className="sr-only"
                />
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-mist-50 text-blue-600">
                  <ShieldAlert size={17} aria-hidden="true" />
                </span>
                {dict.report.labels.notSure}
              </label>
            </div>
          </fieldset>

          <div className="mt-6">
            <label htmlFor="description" className="label">
              {dict.report.labels.description} <span className="text-risk-critical">*</span>
            </label>
            <textarea id="description" name="description" required minLength={30} maxLength={5000} className="field" aria-describedby="description-help" />
            <p id="description-help" className="hint">
              {dict.report.labels.descriptionHelp}
            </p>
          </div>
          <div className="mt-4">
            <label htmlFor="incidentDate" className="label">
              {dict.report.labels.incidentDate} <span className="text-risk-critical">*</span>
            </label>
            <input id="incidentDate" name="incidentDate" type="date" required max={new Date().toISOString().slice(0, 10)} className="field" />
          </div>
        </section>

        <section hidden={step !== 1} aria-label={stepNames[1]}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="channel" className="label">
                {dict.report.labels.channel} <span className="text-risk-critical">*</span>
              </label>
              <select id="channel" name="channel" className="field" defaultValue="">
                <option value="" disabled>
                  —
                </option>
                {channels.map((channel) => (
                  <option key={channel} value={channel}>
                    {channel}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="country" className="label">
                {dict.report.labels.country} <span className="text-risk-critical">*</span>
              </label>
              <input id="country" name="country" required autoComplete="country-name" className="field" />
            </div>
            <div>
              <label htmlFor="city" className="label">
                {dict.report.labels.city}
              </label>
              <input id="city" name="city" className="field" />
            </div>
            <div>
              <label htmlFor="suspiciousUrl" className="label">
                {dict.report.labels.suspiciousUrl}
              </label>
              <input id="suspiciousUrl" name="suspiciousUrl" className="field" />
            </div>
            <div>
              <label htmlFor="phoneInvolved" className="label">
                {dict.report.labels.phone}
              </label>
              <input id="phoneInvolved" name="phoneInvolved" className="field" />
            </div>
            <div>
              <label htmlFor="emailInvolved" className="label">
                {dict.report.labels.emailInvolved}
              </label>
              <input id="emailInvolved" name="emailInvolved" type="email" className="field" />
            </div>
          </div>
          <fieldset className="mt-5">
            <legend className="label">{dict.report.labels.moneyLost}</legend>
            <div className="flex gap-4">
              <label className="inline-flex min-h-11 items-center gap-2 text-[0.9rem]">
                <input type="radio" name="moneyLost" value="yes" checked={moneyLost} onChange={() => setMoneyLost(true)} /> {dict.report.labels.yes}
              </label>
              <label className="inline-flex min-h-11 items-center gap-2 text-[0.9rem]">
                <input type="radio" name="moneyLost" value="no" checked={!moneyLost} onChange={() => setMoneyLost(false)} /> {dict.report.labels.no}
              </label>
            </div>
          </fieldset>
          {moneyLost ? (
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="amount" className="label">
                  {dict.report.labels.amount}
                </label>
                <input id="amount" name="amount" inputMode="decimal" className="field" />
              </div>
              <div>
                <label htmlFor="currency" className="label">
                  {dict.report.labels.currency}
                </label>
                <input id="currency" name="currency" maxLength={10} placeholder="XAF" className="field" />
              </div>
            </div>
          ) : null}
          <div className="mt-5">
            <label htmlFor="ongoing" className="label">
              {dict.report.labels.ongoing}
            </label>
            <select id="ongoing" name="ongoing" className="field" defaultValue="no">
              <option value="no">{dict.report.labels.no}</option>
              <option value="yes">{dict.report.labels.yes}</option>
            </select>
          </div>
        </section>

        <section hidden={step !== 2} aria-label={stepNames[2]}>
          <label htmlFor="evidence" className="label">
            {dict.report.labels.evidence}
          </label>
          <div className="rounded-sm border-2 border-dashed border-line-200 bg-mist-50 p-6 text-center">
            <Paperclip size={22} className="mx-auto text-blue-600" aria-hidden="true" />
            <input
              id="evidence"
              name="evidence"
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp,application/pdf"
              className="mx-auto mt-3 block w-full max-w-sm text-[0.85rem]"
              aria-describedby="evidence-help"
            />
            <p id="evidence-help" className="hint">
              {dict.report.labels.evidenceHelp}
            </p>
          </div>
          <p className="mt-4 rounded-sm border border-line-200 p-4 text-[0.82rem] leading-relaxed text-slate-600">
            {locale === "fr"
              ? "Vos pièces sont stockées dans un espace privé, hors du site public. Elles ne sont accessibles qu’au personnel autorisé et chaque accès est journalisé."
              : "Evidence is stored in a private area outside the public website. It is accessible only to authorised staff and every access is logged."}
          </p>
        </section>

        <section hidden={step !== 3} aria-label={stepNames[3]}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="reporterName" className="label">
                {dict.report.labels.name}
              </label>
              <input id="reporterName" name="reporterName" autoComplete="name" className="field" />
            </div>
            <div>
              <label htmlFor="reporterEmail" className="label">
                {dict.report.labels.reporterEmail} <span className="text-risk-critical">*</span>
              </label>
              <input id="reporterEmail" name="reporterEmail" type="email" required autoComplete="email" className="field" aria-describedby="reporter-email-help" />
              <p id="reporter-email-help" className="hint">
                {dict.report.labels.reporterEmailHelp}
              </p>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="language" className="label">
                {dict.report.labels.language}
              </label>
              <select id="language" name="language" defaultValue={locale} className="field">
                <option value="en">English</option>
                <option value="fr">Français</option>
              </select>
            </div>
          </div>
        </section>

        <section hidden={step !== 4} aria-label={stepNames[4]}>
          <h2 className="text-[1.3rem]">{dict.report.labels.review}</h2>
          <p className="mt-2 text-[0.9rem] leading-relaxed text-slate-600">
            {locale === "fr"
              ? "Vérifiez les informations saisies. Vous pouvez revenir en arrière pour modifier n’importe quelle étape avant l’envoi."
              : "Check the information you entered. You can go back and edit any step before submitting."}
          </p>
          <ul className="mt-4 space-y-2 rounded-sm border border-line-200 bg-mist-50 p-4 text-[0.85rem] text-slate-600">
            <li className="flex justify-between gap-4">
              <span>{dict.report.labels.category}</span>
              <span className="font-semibold text-ink-900">
                {selectedCategory === "not-sure"
                  ? dict.report.labels.notSure
                  : categories.find((c) => (locale === "fr" ? c.slugFr : c.slugEn) === selectedCategory)?.[locale === "fr" ? "nameFr" : "nameEn"]}
              </span>
            </li>
            <li className="flex justify-between gap-4">
              <span>{dict.report.labels.moneyLost}</span>
              <span className="font-semibold text-ink-900">{moneyLost ? dict.report.labels.yes : dict.report.labels.no}</span>
            </li>
            <li className="flex justify-between gap-4">
              <span>{dict.report.labels.reporterEmail}</span>
              <span className="font-semibold text-ink-900">
                {(formRef.current?.elements.namedItem("reporterEmail") as HTMLInputElement | null)?.value}
              </span>
            </li>
          </ul>
          <label htmlFor="consent" className="mt-5 flex min-h-11 cursor-pointer items-start gap-3 text-[0.85rem] leading-relaxed text-slate-600">
            <input id="consent" name="consent" type="checkbox" required className="mt-1 h-5 w-5" />
            <span>{dict.report.labels.consent}</span>
          </label>
          <p className="mt-3 rounded-sm border border-signal-400/50 bg-signal-400/10 p-3 text-[0.8rem] font-medium text-ink-900">
            {dict.common.notPolice}
          </p>
        </section>

        {error ? (
          <p className="mt-5 flex items-start gap-2 rounded-[10px] border border-risk-critical/40 bg-risk-critical/10 p-3 text-[0.85rem] font-medium text-ink-900" role="alert">
            <AlertCircle size={16} className="mt-0.5 shrink-0 text-risk-critical" aria-hidden="true" /> {error}
          </p>
        ) : null}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line-200 pt-5">
          <button
            type="button"
            onClick={back}
            disabled={step === 0 || pending}
            className="btn btn-ghost btn-sm disabled:opacity-40"
          >
            <ArrowLeft size={15} aria-hidden="true" /> {dict.report.back}
          </button>
          {step < stepNames.length - 1 ? (
            <button type="button" onClick={next} className="btn btn-primary">
              {dict.report.next} <ArrowRight size={16} aria-hidden="true" />
            </button>
          ) : (
            <button type="submit" disabled={pending} className="btn btn-signal">
              {pending ? dict.report.submitting : dict.report.submit}
            </button>
          )}
        </div>
      </form>

      <p className="mt-6 text-center text-[0.78rem] leading-relaxed text-slate-600">
        {locale === "fr"
          ? "En cas de perte financière, contactez immédiatement votre banque ou votre opérateur de monnaie électronique."
          : "If money has been lost, contact your bank or mobile money provider immediately."}
      </p>
    </div>
  );
}

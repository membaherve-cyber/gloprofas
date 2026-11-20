"use client";

/**
 * Report a Scam — confidential 4-step wizard (preserved workflow).
 * ① What happened → ② Details (+evidence) → ③ About you → ④ Review & consent.
 * Submits to POST /api/reports; confirmation shows GLP-YYYY-XXXXXX reference.
 */

import React, { useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  FileText,
  Lock,
  Paperclip,
  Send,
  Siren,
  TriangleAlert,
  X,
} from "lucide-react";
import { A } from "@/lib/router";
import { useI18n } from "@/lib/i18n";
import { R, L, getCategoryIcon } from "@/lib/content/copy";
import { ZITE_CONTENT, type ZiteCategory } from "@/lib/content/zite-data";
import { Btn, PageHero, Reveal } from "@/components/shared/ui";

const STEPS = ["What happened", "Details", "About you", "Review"] as const;
const STEPS_FR = ["Ce qui s'est passé", "Détails", "Vous", "Vérification"] as const;

const CHANNELS = [
  { value: "sms", en: "SMS", fr: "SMS" },
  { value: "phone", en: "Phone call", fr: "Appel téléphonique" },
  { value: "whatsapp", en: "WhatsApp / messaging", fr: "WhatsApp / messagerie" },
  { value: "social", en: "Social media", fr: "Réseaux sociaux" },
  { value: "email", en: "Email", fr: "Courriel" },
  { value: "web", en: "Website or app", fr: "Site web ou application" },
  { value: "inperson", en: "In person", fr: "En personne" },
  { value: "other", en: "Other", fr: "Autre" },
];

const SECRET_CLIENT = /\b(pin|otp|one[-\s]?time|cvv|cvc|password|passcode|mot\s+de\s+passe|code\s+secret|code\s+pin|seed\s+phrase|recovery\s+phrase)\b[^0-9]{0,15}\d{4,8}/i;

interface FormState {
  categorySlug: string;
  description: string;
  incidentDate: string;
  channel: string;
  country: string;
  city: string;
  suspiciousUrl: string;
  phoneInvolved: string;
  emailInvolved: string;
  moneyLost: boolean;
  amount: string;
  ongoing: boolean;
  reporterName: string;
  reporterEmail: string;
  consent: boolean;
}

interface EvidenceItem {
  name: string;
  dataBase64: string;
  size: number;
}

export function ReportView() {
  const { locale, t } = useI18n();
  const fr = locale === "fr";
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>({
    categorySlug: "",
    description: "",
    incidentDate: "",
    channel: "",
    country: "",
    city: "",
    suspiciousUrl: "",
    phoneInvolved: "",
    emailInvolved: "",
    moneyLost: false,
    amount: "",
    ongoing: false,
    reporterName: "",
    reporterEmail: "",
    consent: false,
  });
  const [evidence, setEvidence] = useState<EvidenceItem[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const cats = ZITE_CONTENT.categories;

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => {
      const { [key as string]: _drop, ...rest } = e;
      return rest;
    });
  }

  function validateStep(s: number): boolean {
    const errs: Record<string, string> = {};
    if (s === 0) {
      if (form.description.trim().length < 20) errs.description = t("report.errors.description");
      if (SECRET_CLIENT.test(form.description)) {
        errs.description = fr
          ? "Pour votre sécurité, retirez les mots de passe, PIN, codes à usage unique et numéros de carte de votre message."
          : "For your safety, please remove PINs, passwords, one-time codes and card numbers from your message.";
      }
    }
    if (s === 1) {
      if (!form.channel) errs.channel = t("report.errors.channel");
    }
    if (s === 2) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.reporterEmail))
        errs.reporterEmail = t("report.errors.email");
    }
    if (s === 3) {
      if (!form.consent) errs.consent = t("report.errors.consent");
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function next() {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function onFiles(files: FileList | null) {
    if (!files) return;
    const next = [...evidence];
    for (const f of Array.from(files).slice(0, 5 - evidence.length)) {
      if (f.size > 10 * 1024 * 1024) continue;
      const dataBase64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.readAsDataURL(f);
      });
      next.push({ name: f.name, dataBase64, size: f.size });
    }
    setEvidence(next.slice(0, 5));
    if (fileRef.current) fileRef.current.value = "";
  }

  async function submit() {
    if (!validateStep(3)) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          evidence: evidence.map((e) => ({ name: e.name, dataBase64: e.dataBase64 })),
          language: locale,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data?.fields) {
          const errs: Record<string, string> = {};
          for (const [k, v] of Object.entries(data.fields as Record<string, string>)) {
            errs[k] =
              v === "secrets"
                ? fr
                  ? "Pour votre sécurité, retirez les données sensibles de votre message."
                  : "For your safety, remove sensitive data from your message."
                : t(`report.errors.${k === "reporterEmail" ? "email" : k}`) !== `report.errors.${k}`
                  ? t(`report.errors.${k === "reporterEmail" ? "email" : k}`)
                  : t("report.errors.submit");
          }
          setErrors(errs);
          if (errs.description) setStep(0);
          else if (errs.channel) setStep(1);
          else if (errs.reporterEmail) setStep(2);
          else setStep(3);
        } else if (data?.error === "rate_limited") {
          setErrors({ form: t("report.errors.rate") });
        } else {
          setErrors({ form: t("report.errors.submit") });
        }
        return;
      }
      setReference(data.reference);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setErrors({ form: t("report.errors.submit") });
    } finally {
      setSubmitting(false);
    }
  }

  /* ---------- Confirmation ---------- */
  if (reference) {
    return (
      <section className="on-dark relative overflow-hidden bg-navy-950 pt-32 pb-24">
        <div className="absolute inset-0" aria-hidden>
          <img
            src="/images/gen/report-scene.jpg"
            alt=""
            className="img-editorial h-full w-full object-cover opacity-15"
          />
          <div className="absolute inset-0 hero-scrim" />
        </div>
        <div className="container-g relative max-w-2xl">
          <Reveal>
            <div className="text-center">
              <span className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-cyanx-500/15 text-cyanx-500">
                <Check size={30} strokeWidth={2.2} aria-hidden />
              </span>
              <h1 className="h1-g text-white">{t("report.confirm.title")}</h1>
              <p className="lead-g mt-4">{t("report.confirm.body")}</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="card-dark-g mt-8 p-7 text-center">
              <p className="eyebrow mb-3">{t("report.confirm.reference")}</p>
              <div className="flex items-center justify-center gap-3">
                <code className="font-heading text-[clamp(1.4rem,1rem+2vw,2rem)] font-bold tracking-[0.12em] text-white">
                  {reference}
                </code>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(reference).catch(() => {});
                    setCopied(true);
                    window.setTimeout(() => setCopied(false), 2000);
                  }}
                  aria-label={fr ? "Copier la référence" : "Copy reference"}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-white/80 hover:border-cyanx-500 hover:text-cyanx-500"
                >
                  {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
                </button>
              </div>
              <p className="mt-3 inline-flex items-center gap-1.5 text-[12px] text-slatex-400">
                <Lock size={12} aria-hidden />
                {fr ? "Privé — jamais publié automatiquement" : "Private — never published automatically"}
              </p>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="card-dark-g p-5">
                <h2 className="font-heading text-[14.5px] font-semibold text-white">
                  {t("report.confirm.nextTitle")}
                </h2>
                <p className="mt-2 text-[13px] leading-relaxed text-slatex-300">
                  {t("report.confirm.nextBody")}
                </p>
              </div>
              <div className="rounded-[14px] border border-signal-500/40 bg-signal-500/[0.08] p-5">
                <h2 className="flex items-center gap-2 font-heading text-[14.5px] font-semibold text-signal-400">
                  <TriangleAlert size={15} aria-hidden />
                  {t("report.confirm.safetyTitle")}
                </h2>
                <p className="mt-2 text-[13px] leading-relaxed text-slatex-300">
                  {t("report.confirm.safetyBody")}
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={280} className="mt-8 flex flex-wrap justify-center gap-3">
            <Btn
              onClick={() => {
                setReference(null);
                setForm({
                  categorySlug: "",
                  description: "",
                  incidentDate: "",
                  channel: "",
                  country: "",
                  city: "",
                  suspiciousUrl: "",
                  phoneInvolved: "",
                  emailInvolved: "",
                  moneyLost: false,
                  amount: "",
                  ongoing: false,
                  reporterName: "",
                  reporterEmail: "",
                  consent: false,
                });
                setEvidence([]);
                setStep(0);
              }}
              variant="outlineDark"
            >
              {t("report.confirm.again")}
            </Btn>
            <Btn href="/" variant="primary">
              {t("report.confirm.home")}
            </Btn>
          </Reveal>
        </div>
      </section>
    );
  }

  /* ---------- Wizard ---------- */
  const selectedCat = cats.find((c: ZiteCategory) => c.slug === form.categorySlug);

  return (
    <>
      <PageHero
        eyebrow={fr ? "Signalement confidentiel" : "Confidential reporting"}
        title={t("report.h1")}
        lead={t("report.lead")}
        image="/images/gen/report-scene.jpg"
        imageAlt={fr ? "Personne remplissant calmement un signalement en ligne" : "Person calmly completing an online report"}
      >
        <p className="flex items-start gap-2.5 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-[13px] text-slatex-300">
          <Lock size={15} className="mt-0.5 shrink-0 text-cyanx-500" aria-hidden />
          {R(L.reportSec.note, locale)}
        </p>
      </PageHero>

      <section className="section-y bg-white">
        <div className="container-g max-w-3xl">
          {/* Progress */}
          <Reveal>
            <ol className="mb-10 grid grid-cols-4 gap-2" aria-label={fr ? "Progression" : "Progress"}>
              {STEPS.map((s, i) => (
                <li key={s}>
                  <div
                    className={`h-1.5 rounded-full transition-colors ${
                      i < step ? "bg-risk-low" : i === step ? "bg-brand-600" : "bg-line-200"
                    }`}
                    aria-hidden
                  />
                  <p
                    className={`mt-2 font-heading text-[11.5px] font-semibold uppercase tracking-wide ${
                      i <= step ? "text-ink-900" : "text-slatex-400"
                    }`}
                  >
                    {i + 1}. {fr ? STEPS_FR[i] : s}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>

          {/* STEP 1 */}
          {step === 0 ? (
            <Reveal>
              <div className="card-g p-6 lg:p-8">
                <h2 className="h3-g">{t("report.labels.category")}</h2>
                <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  <button
                    type="button"
                    onClick={() => set("categorySlug", "")}
                    aria-pressed={form.categorySlug === ""}
                    className={`flex min-h-[64px] flex-col items-center justify-center gap-1.5 rounded-xl border px-2 py-3 text-center transition-colors ${
                      form.categorySlug === ""
                        ? "border-brand-600 bg-brand-50"
                        : "border-line-200 hover:border-brand-500/60"
                    }`}
                  >
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-slatex-500">
                      ?
                    </span>
                    <span className="font-heading text-[12px] font-semibold text-ink-900">
                      {t("report.labels.notSure")}
                    </span>
                  </button>
                  {cats.map((c: ZiteCategory) => {
                    const Icon = getCategoryIcon(c.icon);
                    const active = form.categorySlug === c.slug;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => set("categorySlug", c.slug)}
                        aria-pressed={active}
                        className={`flex min-h-[64px] flex-col items-center justify-center gap-1.5 rounded-xl border px-2 py-3 text-center transition-colors ${
                          active
                            ? "border-brand-600 bg-brand-50"
                            : "border-line-200 hover:border-brand-500/60"
                        }`}
                      >
                        <Icon
                          size={17}
                          strokeWidth={1.9}
                          aria-hidden
                          className={active ? "text-brand-600" : "text-slatex-600"}
                        />
                        <span className="font-heading text-[11.5px] font-semibold leading-tight text-ink-900">
                          {R(c.title, locale)}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-7">
                  <label htmlFor="rp-desc" className="lbl-g">
                    {t("report.labels.description")} *
                  </label>
                  <textarea
                    id="rp-desc"
                    value={form.description}
                    onChange={(e) => set("description", e.target.value)}
                    rows={5}
                    maxLength={4000}
                    aria-invalid={!!errors.description}
                    aria-describedby="rp-desc-help"
                    className="field-g resize-y"
                    placeholder={
                      fr
                        ? "Décrivez les messages, appels ou paiements concernés…"
                        : "Describe the messages, calls or payments involved…"
                    }
                  />
                  <p id="rp-desc-help" className="hint-g">
                    {t("report.labels.descriptionHelp")}
                  </p>
                  {errors.description ? (
                    <p className="err-g" role="alert">
                      <TriangleAlert size={13} aria-hidden />
                      {errors.description}
                    </p>
                  ) : null}
                </div>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="rp-date" className="lbl-g">
                      {t("report.labels.incidentDate")}
                    </label>
                    <input
                      id="rp-date"
                      type="date"
                      value={form.incidentDate}
                      max={new Date().toISOString().slice(0, 10)}
                      onChange={(e) => set("incidentDate", e.target.value)}
                      className="field-g"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          ) : null}

          {/* STEP 2 */}
          {step === 1 ? (
            <Reveal>
              <div className="card-g p-6 lg:p-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="rp-channel" className="lbl-g">
                      {t("report.labels.channel")} *
                    </label>
                    <select
                      id="rp-channel"
                      value={form.channel}
                      onChange={(e) => set("channel", e.target.value)}
                      aria-invalid={!!errors.channel}
                      className="field-g"
                    >
                      <option value="">{fr ? "Sélectionner…" : "Select…"}</option>
                      {CHANNELS.map((c) => (
                        <option key={c.value} value={c.value}>
                          {fr ? c.fr : c.en}
                        </option>
                      ))}
                    </select>
                    {errors.channel ? (
                      <p className="err-g" role="alert">
                        <TriangleAlert size={13} aria-hidden />
                        {errors.channel}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="rp-country" className="lbl-g">
                      {t("report.labels.country")}
                    </label>
                    <input
                      id="rp-country"
                      value={form.country}
                      onChange={(e) => set("country", e.target.value)}
                      autoComplete="country-name"
                      placeholder={fr ? "Cameroun" : "Cameroon"}
                      className="field-g"
                    />
                  </div>
                  <div>
                    <label htmlFor="rp-city" className="lbl-g">
                      {t("report.labels.city")}
                    </label>
                    <input
                      id="rp-city"
                      value={form.city}
                      onChange={(e) => set("city", e.target.value)}
                      className="field-g"
                    />
                  </div>
                  <div>
                    <label htmlFor="rp-url" className="lbl-g">
                      {t("report.labels.suspiciousUrl")}
                    </label>
                    <input
                      id="rp-url"
                      value={form.suspiciousUrl}
                      onChange={(e) => set("suspiciousUrl", e.target.value)}
                      inputMode="url"
                      placeholder="www.example-site.com"
                      className="field-g"
                    />
                  </div>
                  <div>
                    <label htmlFor="rp-phone" className="lbl-g">
                      {t("report.labels.phone")}
                    </label>
                    <input
                      id="rp-phone"
                      value={form.phoneInvolved}
                      onChange={(e) => set("phoneInvolved", e.target.value)}
                      inputMode="tel"
                      placeholder="+237 6XX XX XX XX"
                      className="field-g"
                    />
                  </div>
                  <div>
                    <label htmlFor="rp-email" className="lbl-g">
                      {t("report.labels.emailInvolved")}
                    </label>
                    <input
                      id="rp-email"
                      type="email"
                      value={form.emailInvolved}
                      onChange={(e) => set("emailInvolved", e.target.value)}
                      className="field-g"
                    />
                  </div>
                </div>

                {/* Money + ongoing */}
                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  <fieldset className="rounded-xl border border-line-200 p-4">
                    <legend className="px-1.5 font-heading text-[13px] font-semibold text-ink-900">
                      {t("report.labels.moneyLost")}
                    </legend>
                    <div className="mt-2 flex gap-2">
                      {[true, false].map((v) => (
                        <button
                          key={String(v)}
                          type="button"
                          onClick={() => set("moneyLost", v)}
                          aria-pressed={form.moneyLost === v}
                          className={`h-11 flex-1 rounded-lg border font-semibold transition-colors ${
                            form.moneyLost === v
                              ? "border-brand-600 bg-brand-50 text-brand-600"
                              : "border-line-200 text-slatex-600 hover:border-brand-500/50"
                          }`}
                        >
                          {v ? t("report.labels.yes") : t("report.labels.no")}
                        </button>
                      ))}
                    </div>
                    {form.moneyLost ? (
                      <div className="mt-3">
                        <label htmlFor="rp-amount" className="lbl-g">
                          {t("report.labels.amount")}
                        </label>
                        <input
                          id="rp-amount"
                          value={form.amount}
                          onChange={(e) => set("amount", e.target.value)}
                          inputMode="text"
                          placeholder="50 000 FCFA"
                          className="field-g"
                        />
                      </div>
                    ) : null}
                  </fieldset>
                  <fieldset className="rounded-xl border border-line-200 p-4">
                    <legend className="px-1.5 font-heading text-[13px] font-semibold text-ink-900">
                      {t("report.labels.ongoing")}
                    </legend>
                    <div className="mt-2 flex gap-2">
                      {[true, false].map((v) => (
                        <button
                          key={String(v)}
                          type="button"
                          onClick={() => set("ongoing", v)}
                          aria-pressed={form.ongoing === v}
                          className={`h-11 flex-1 rounded-lg border font-semibold transition-colors ${
                            form.ongoing === v
                              ? "border-brand-600 bg-brand-50 text-brand-600"
                              : "border-line-200 text-slatex-600 hover:border-brand-500/50"
                          }`}
                        >
                          {v ? t("report.labels.yes") : t("report.labels.no")}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                </div>

                {/* Evidence */}
                <div className="mt-7">
                  <span className="lbl-g">{t("report.labels.evidence")}</span>
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-line-200 px-4 py-8 text-center transition-colors hover:border-brand-500/60 hover:bg-brand-50/40"
                  >
                    <Paperclip size={20} className="text-slatex-400" aria-hidden />
                    <span className="font-heading text-[13.5px] font-semibold text-ink-900">
                      {fr ? "Ajouter des fichiers" : "Add files"}
                    </span>
                    <span className="hint-g !mt-0">{t("report.labels.evidenceHelp")}</span>
                  </button>
                  <input
                    ref={fileRef}
                    type="file"
                    multiple
                    accept="image/*,.pdf"
                    className="sr-only"
                    onChange={(e) => onFiles(e.target.files)}
                    aria-label={t("report.labels.evidence")}
                  />
                  {evidence.length > 0 ? (
                    <ul className="mt-3 space-y-2">
                      {evidence.map((f, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-3 rounded-lg border border-line-200 bg-mist-50 px-3.5 py-2.5"
                        >
                          <FileText size={15} className="shrink-0 text-brand-600" aria-hidden />
                          <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-ink-900">
                            {f.name}
                          </span>
                          <span className="shrink-0 text-[12px] text-slatex-400">
                            {Math.max(1, Math.round(f.size / 1024))} KB
                          </span>
                          <button
                            type="button"
                            onClick={() => setEvidence(evidence.filter((_, j) => j !== i))}
                            aria-label={fr ? `Retirer ${f.name}` : `Remove ${f.name}`}
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-slatex-400 hover:bg-white hover:text-risk-critical"
                          >
                            <X size={14} aria-hidden />
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            </Reveal>
          ) : null}

          {/* STEP 3 */}
          {step === 2 ? (
            <Reveal>
              <div className="card-g p-6 lg:p-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="rp-name" className="lbl-g">
                      {t("report.labels.name")}
                    </label>
                    <input
                      id="rp-name"
                      value={form.reporterName}
                      onChange={(e) => set("reporterName", e.target.value)}
                      autoComplete="name"
                      className="field-g"
                    />
                  </div>
                  <div>
                    <label htmlFor="rp-email" className="lbl-g">
                      {t("report.labels.reporterEmail")} *
                    </label>
                    <input
                      id="rp-email"
                      type="email"
                      value={form.reporterEmail}
                      onChange={(e) => set("reporterEmail", e.target.value)}
                      autoComplete="email"
                      aria-invalid={!!errors.reporterEmail}
                      aria-describedby="rp-email-help"
                      placeholder="you@example.com"
                      className="field-g"
                    />
                    <p id="rp-email-help" className="hint-g">
                      {t("report.labels.reporterEmailHelp")}
                    </p>
                    {errors.reporterEmail ? (
                      <p className="err-g" role="alert">
                        <TriangleAlert size={13} aria-hidden />
                        {errors.reporterEmail}
                      </p>
                    ) : null}
                  </div>
                </div>
                <p className="mt-6 flex items-start gap-2.5 rounded-lg bg-mist-50 px-4 py-3 text-[12.5px] leading-relaxed text-slatex-600">
                  <Lock size={14} className="mt-0.5 shrink-0 text-brand-600" aria-hidden />
                  {fr
                    ? "Nous ne demandons jamais de mots de passe, de codes PIN ou de codes à usage unique. Vos informations ne sont jamais publiées."
                    : "We never ask for passwords, PINs or one-time codes. Your information is never published."}
                </p>
              </div>
            </Reveal>
          ) : null}

          {/* STEP 4 — Review */}
          {step === 3 ? (
            <Reveal>
              <div className="card-g p-6 lg:p-8">
                <h2 className="h3-g">{t("report.labels.review")}</h2>
                <dl className="mt-5 divide-y divide-line-200">
                  {[
                    {
                      k: t("report.labels.category"),
                      v: selectedCat ? R(selectedCat.title, locale) : t("report.labels.notSure"),
                      edit: 0,
                    },
                    { k: t("report.labels.description"), v: form.description, edit: 0 },
                    { k: t("report.labels.channel"), v: form.channel || "—", edit: 1 },
                    { k: t("report.labels.country"), v: form.country || "—", edit: 1 },
                    {
                      k: t("report.labels.moneyLost"),
                      v: form.moneyLost
                        ? `${t("report.labels.yes")}${form.amount ? ` · ${form.amount}` : ""}`
                        : t("report.labels.no"),
                      edit: 1,
                    },
                    {
                      k: t("report.labels.evidence"),
                      v: evidence.length > 0 ? `${evidence.length} ${fr ? "fichier(s)" : "file(s)"}` : "—",
                      edit: 1,
                    },
                    { k: t("report.labels.name"), v: form.reporterName || "—", edit: 2 },
                    { k: t("report.labels.reporterEmail"), v: form.reporterEmail, edit: 2 },
                  ].map((row, i) => (
                    <div key={i} className="grid gap-1 py-3.5 sm:grid-cols-[220px_1fr_auto] sm:gap-4">
                      <dt className="font-heading text-[12.5px] font-semibold uppercase tracking-wide text-slatex-500">
                        {row.k}
                      </dt>
                      <dd className="text-[13.5px] leading-relaxed text-ink-900">
                        {row.v.length > 220 ? row.v.slice(0, 220) + "…" : row.v}
                      </dd>
                      <dd>
                        <button
                          type="button"
                          onClick={() => setStep(row.edit)}
                          className="text-[12.5px] font-semibold text-brand-600 hover:underline"
                        >
                          {fr ? "Modifier" : "Edit"}
                        </button>
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-6 rounded-xl border-l-4 border-signal-500 bg-signal-100/60 px-5 py-4 text-[13px] leading-relaxed text-ink-700">
                  {R(L.reportSec.note, locale)}
                </div>

                <div className="mt-6">
                  <label className="flex cursor-pointer items-start gap-3 text-[13.5px] leading-relaxed text-ink-700">
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => set("consent", e.target.checked)}
                      aria-invalid={!!errors.consent}
                      className="mt-1 h-4 w-4 rounded accent-brand-600"
                    />
                    <span>{t("report.labels.consent")}</span>
                  </label>
                  {errors.consent ? (
                    <p className="err-g" role="alert">
                      <TriangleAlert size={13} aria-hidden />
                      {errors.consent}
                    </p>
                  ) : null}
                </div>
              </div>
            </Reveal>
          ) : null}

          {/* Form-level error */}
          {errors.form ? (
            <p
              role="alert"
              className="mt-5 rounded-xl border border-[#d23434]/30 bg-[#d23434]/[0.06] px-5 py-3.5 text-[13.5px] font-medium text-[#a52222]"
            >
              {errors.form}
            </p>
          ) : null}

          {/* Nav buttons */}
          <div className="mt-8 flex items-center justify-between gap-4">
            {step > 0 ? (
              <Btn onClick={back} variant="outline">
                <ArrowLeft size={15} aria-hidden />
                {t("report.back")}
              </Btn>
            ) : (
              <A href="/" className="btn-g btn-ghost-g">
                <ArrowLeft size={15} aria-hidden />
                {fr ? "Accueil" : "Home"}
              </A>
            )}
            {step < STEPS.length - 1 ? (
              <Btn onClick={next} variant="primary">
                {t("report.next")}
                <ArrowRight size={15} aria-hidden />
              </Btn>
            ) : (
              <Btn onClick={submit} variant="signal" disabled={submitting}>
                {submitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-navy-950/30 border-t-navy-950" aria-hidden />
                    {t("report.submitting")}
                  </>
                ) : (
                  <>
                    <Send size={15} aria-hidden />
                    {t("report.submit")}
                  </>
                )}
              </Btn>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

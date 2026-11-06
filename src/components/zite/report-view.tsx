"use client";

import { useRef, useState } from "react";
import {
  AlertCircle,
  Check,
  Copy,
  FileText,
  LoaderCircle,
  Paperclip,
  ShieldAlert,
  X,
} from "lucide-react";
import { Btn, PageHero } from "@/components/zite/shared";
import { getCategoryIcon, L, R } from "@/components/zite/copy";
import { formatAerialBadge, PAGE_AERIAL_HEROES } from "@/lib/african-cities";
import { ZITE_CONTENT, type ZiteCategory } from "@/lib/zite-data";
import type { Locale } from "@/lib/i18n";

const CHANNELS = [
  ["SMS", "SMS"],
  ["Phone call", "Appel téléphonique"],
  ["WhatsApp / messaging", "WhatsApp / messagerie"],
  ["Social media", "Réseaux sociaux"],
  ["Email", "Courriel"],
  ["Website or app", "Site ou application"],
  ["In person", "En personne"],
  ["Other", "Autre"],
] as const;

const fieldCls =
  "h-12 w-full rounded-sm border border-line bg-white px-4 text-ink placeholder:text-slatex-600/60 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20";
const labelCls = "mb-1.5 block text-sm font-semibold text-ink";

function YesNo({
  value,
  onChange,
  label,
  fr,
}: {
  value: boolean;
  onChange: (val: boolean) => void;
  label: string;
  fr: boolean;
}) {
  return (
    <fieldset>
      <legend className={labelCls}>{label}</legend>
      <div className="flex gap-2">
        {[true, false].map((opt) => (
          <button
            key={String(opt)}
            type="button"
            onClick={() => onChange(opt)}
            aria-pressed={value === opt}
            className={`h-12 flex-1 rounded-sm border font-semibold ${
              value === opt
                ? "border-brand-600 bg-brand-600/10 text-brand-600"
                : "border-line text-ink"
            }`}
          >
            {opt ? (fr ? "Oui" : "Yes") : fr ? "Non" : "No"}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function ZiteReportView({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const l = (path = "") => `/${locale}${path}`;
  const categories = ZITE_CONTENT.categories as unknown as ZiteCategory[];
  const steps = fr
    ? ["Ce qui s’est passé", "Détails", "Vous", "Vérification"]
    : ["What happened", "Details", "About you", "Review"];

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    category: "",
    description: "",
    incidentDate: "",
    channel: "",
    country: "",
    suspiciousContact: "",
    moneyLost: false,
    amount: "",
    ongoing: false,
    name: "",
    email: "",
    consent: false,
    website: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState("");
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const reqMsg = fr ? "Ce champ est obligatoire." : "This field is required.";

  function setField<K extends keyof typeof form>(key: K, val: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  function validateStep(idx: number): boolean {
    const errs: Record<string, string> = {};
    if (idx === 0) {
      if (!form.category) errs.category = reqMsg;
      if (form.description.trim().length < 10) {
        errs.description = fr
          ? "Décrivez la situation en au moins 10 caractères."
          : "Please describe what happened (at least 10 characters).";
      }
    }
    if (idx === 1) {
      if (!form.channel) errs.channel = reqMsg;
      if (!form.country.trim()) errs.country = reqMsg;
    }
    if (idx === 2) {
      if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
        errs.email = R(L.nl.invalidEmail, locale);
      }
    }
    if (idx === 3 && !form.consent) {
      errs.consent = R(L.nl.consentReq, locale);
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleNext() {
    if (validateStep(step)) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  async function handleSubmit() {
    if (!validateStep(3)) return;
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.set("categorySlug", form.category);
      fd.set(
        "description",
        form.description.trim().length >= 30
          ? form.description.trim()
          : `${form.description.trim()} (reported via GLOPROFAS confidential form)`,
      );
      fd.set(
        "incidentDate",
        form.incidentDate || new Date().toISOString().slice(0, 10),
      );
      fd.set("channel", form.channel);
      fd.set("country", form.country);
      if (form.suspiciousContact) fd.set("suspiciousUrl", form.suspiciousContact);
      fd.set("moneyLost", form.moneyLost ? "yes" : "no");
      if (form.amount) fd.set("amount", form.amount);
      fd.set("ongoing", form.ongoing ? "yes" : "no");
      if (form.name) fd.set("reporterName", form.name);
      fd.set("reporterEmail", form.email);
      fd.set("language", locale);
      fd.set("consent", "on");
      for (const f of files.slice(0, 5)) {
        fd.append("evidence", f);
      }
      const res = await fetch("/api/reports", { method: "POST", body: fd });
      if (!res.ok) throw new Error("submit failed");
      const data = (await res.json()) as { reference: string };
      setReference(data.reference);
      window.scrollTo({ top: 0 });
    } catch {
      setErrors({ consent: R(L.nl.err, locale) });
    } finally {
      setSubmitting(false);
    }
  }

  const categoryLabel =
    form.category === "unsure"
      ? fr
        ? "Pas sûr"
        : "Not sure"
      : R(
          categories.find((c) => c.slug === form.category)?.title ?? {
            en: form.category,
            fr: form.category,
          },
          locale,
        );

  if (reference) {
    return (
      <>
        <PageHero
          title={
            fr ? "Merci pour votre signalement." : "Thank you for your report."
          }
          image={PAGE_AERIAL_HEROES.report.image}
          cityBadge={formatAerialBadge(PAGE_AERIAL_HEROES.report.city, locale)}
          crumbs={[
            { label: fr ? "Accueil" : "Home", to: l() },
            { label: R(L.report, locale) },
          ]}
        />
        <section className="section-y bg-mist">
          <div className="container-g grid max-w-4xl gap-6">
            <div className="rounded-none bg-white p-8 text-center shadow-none">
              <p className="ed-label text-brand-600">
                {fr ? "Votre numéro de référence" : "Your reference number"}
              </p>
              <p className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-bold tracking-wider text-ink">
                {reference}
              </p>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(reference);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="mt-4 inline-flex h-11 items-center gap-2 rounded-[2px] border border-line px-5 text-sm font-semibold hover:border-brand-600"
              >
                <Copy className="h-4 w-4" />
                {copied
                  ? fr
                    ? "Référence copiée"
                    : "Reference copied"
                  : fr
                    ? "Copier"
                    : "Copy"}
              </button>
              <p className="mt-6 text-slatex-600">
                {fr
                  ? "Notre équipe examinera votre signalement. Nous pourrons vous écrire si des informations complémentaires sont nécessaires. Votre signalement ne sera jamais publié sans anonymisation et approbation."
                  : "Our team will review your report and may email you if more information is needed. Your report will never be published without anonymisation and approval."}
              </p>
            </div>

            <div className="flex gap-4 rounded-none border border-signal bg-signal/10 p-6 text-ink">
              <ShieldAlert className="h-6 w-6 shrink-0" />
              <p>{R(L.reportSec.note, locale)}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Btn href={l()} variant="primary">
                {fr ? "Retour à l’accueil" : "Back to home"}
              </Btn>
              <Btn href={l("/scams")} variant="outline">
                {fr ? "Découvrir les arnaques" : "Learn about scams"}
              </Btn>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        title={R(L.report, locale)}
        eyebrow={fr ? "Signalement confidentiel" : "Confidential report"}
        lead={
          fr
            ? "Cela prend environ cinq minutes. Vous n’êtes pas en faute, et ce que vous partagez aide d’autres personnes à se protéger."
            : "This takes about five minutes. You are not to blame, and what you share helps others stay safe."
        }
        image={PAGE_AERIAL_HEROES.report.image}
        cityBadge={formatAerialBadge(PAGE_AERIAL_HEROES.report.city, locale)}
        crumbs={[
          { label: fr ? "Accueil" : "Home", to: l() },
          { label: R(L.report, locale) },
        ]}
      />

      <section className="bg-mist pt-12 pb-28 md:pb-20">
        <div className="container-g max-w-4xl">
          <ol className="grid grid-cols-4 gap-2" aria-label="Progress">
            {steps.map((sName, idx) => (
              <li
                key={sName}
                className="text-center"
                aria-current={idx === step ? "step" : undefined}
              >
                <div
                  className={`h-1.5 rounded-full ${
                    idx <= step ? "bg-brand-600" : "bg-line"
                  }`}
                />
                <p
                  className={`mt-2 hidden text-sm font-semibold sm:block ${
                    idx === step ? "text-ink" : "text-slatex-600"
                  }`}
                >
                  {idx + 1}. {sName}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-8 rounded-none bg-white p-6 shadow-e1 md:p-10">
            <h2 className="h3 text-ink">{steps[step]}</h2>
            <div className="mt-8 grid gap-6">
              {step === 0 ? (
                <>
                  <fieldset>
                    <legend className={labelCls}>
                      {fr ? "Type d’arnaque" : "Type of scam"}
                    </legend>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                      {[
                        ...categories.map((c) => ({
                          slug: c.slug,
                          label: R(c.title, locale),
                          icon: c.icon,
                        })),
                        {
                          slug: "unsure",
                          label: fr ? "Pas sûr" : "Not sure",
                          icon: "",
                        },
                      ].map((item) => {
                        const Icon = getCategoryIcon(item.icon);
                        return (
                          <button
                            key={item.slug}
                            type="button"
                            onClick={() => setField("category", item.slug)}
                            aria-pressed={form.category === item.slug}
                            className={`flex min-h-[64px] items-center gap-3 rounded-sm border p-3 text-left text-sm font-semibold transition-colors ${
                              form.category === item.slug
                                ? "border-brand-600 bg-brand-600/10 text-brand-600"
                                : "border-line text-ink hover:border-brand-600/50"
                            }`}
                          >
                            <Icon className="h-5 w-5 shrink-0" strokeWidth={1.5} />
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                    {errors.category ? (
                      <p className="mt-1.5 flex items-center gap-1.5 text-sm text-risk-critical">
                        <AlertCircle className="h-4 w-4" />
                        {errors.category}
                      </p>
                    ) : null}
                  </fieldset>

                  <div>
                    <label htmlFor="r-desc" className={labelCls}>
                      {fr ? "Que s’est-il passé ?" : "What happened?"}
                    </label>
                    <textarea
                      id="r-desc"
                      rows={5}
                      className={`${fieldCls} h-auto py-3`}
                      value={form.description}
                      onChange={(e) => setField("description", e.target.value)}
                    />
                    {errors.description ? (
                      <p className="mt-1.5 flex items-center gap-1.5 text-sm text-risk-critical">
                        <AlertCircle className="h-4 w-4" />
                        {errors.description}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="r-date" className={labelCls}>
                      {fr
                        ? "Date de l’incident (facultatif)"
                        : "Date of incident (optional)"}
                    </label>
                    <input
                      id="r-date"
                      type="date"
                      className={fieldCls}
                      value={form.incidentDate}
                      onChange={(e) => setField("incidentDate", e.target.value)}
                    />
                  </div>
                </>
              ) : null}

              {step === 1 ? (
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="r-chan" className={labelCls}>
                      {fr
                        ? "Canal de communication"
                        : "Communication channel"}
                    </label>
                    <select
                      id="r-chan"
                      className={fieldCls}
                      value={form.channel}
                      onChange={(e) => setField("channel", e.target.value)}
                    >
                      <option value="">{fr ? "Choisir…" : "Choose…"}</option>
                      {CHANNELS.map(([en, frLabel]) => (
                        <option key={en} value={en}>
                          {fr ? frLabel : en}
                        </option>
                      ))}
                    </select>
                    {errors.channel ? (
                      <p className="mt-1.5 flex items-center gap-1.5 text-sm text-risk-critical">
                        <AlertCircle className="h-4 w-4" />
                        {errors.channel}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="r-country" className={labelCls}>
                      {R(L.nl.country, locale)}
                    </label>
                    <input
                      id="r-country"
                      autoComplete="country-name"
                      className={fieldCls}
                      value={form.country}
                      onChange={(e) => setField("country", e.target.value)}
                    />
                    {errors.country ? (
                      <p className="mt-1.5 flex items-center gap-1.5 text-sm text-risk-critical">
                        <AlertCircle className="h-4 w-4" />
                        {errors.country}
                      </p>
                    ) : null}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="r-contact" className={labelCls}>
                      {fr
                        ? "Site, numéro ou courriel suspect (facultatif)"
                        : "Suspicious website, phone number or email (optional)"}
                    </label>
                    <input
                      id="r-contact"
                      className={fieldCls}
                      value={form.suspiciousContact}
                      onChange={(e) =>
                        setField("suspiciousContact", e.target.value)
                      }
                    />
                  </div>

                  <YesNo
                    fr={fr}
                    label={
                      fr ? "Avez-vous perdu de l’argent ?" : "Did you lose money?"
                    }
                    value={form.moneyLost}
                    onChange={(v) => setField("moneyLost", v)}
                  />
                  <YesNo
                    fr={fr}
                    label={
                      fr
                        ? "La situation est-elle en cours ?"
                        : "Is it still ongoing?"
                    }
                    value={form.ongoing}
                    onChange={(v) => setField("ongoing", v)}
                  />

                  {form.moneyLost ? (
                    <div className="sm:col-span-2">
                      <label htmlFor="r-amt" className={labelCls}>
                        {fr ? "Montant et devise" : "Amount and currency"}
                      </label>
                      <input
                        id="r-amt"
                        className={fieldCls}
                        placeholder="50 000 FCFA"
                        value={form.amount}
                        onChange={(e) => setField("amount", e.target.value)}
                      />
                    </div>
                  ) : null}

                  <div className="sm:col-span-2">
                    <p className={labelCls}>
                      {fr ? "Preuves (facultatif)" : "Evidence (optional)"}
                    </p>
                    <p className="mb-3 text-sm text-slatex-600">
                      {fr
                        ? "Captures d’écran, reçus ou documents — jusqu’à 5 fichiers. Conservés en privé."
                        : "Screenshots, receipts or documents — up to 5 files. Kept private."}
                    </p>
                    {files.length > 0 ? (
                      <ul className="mb-3 space-y-2">
                        {files.map((f, idx) => (
                          <li
                            key={`${f.name}-${idx}`}
                            className="flex items-center gap-3 border border-line bg-white px-3 py-2 text-sm"
                          >
                            <FileText className="h-4 w-4 shrink-0 text-brand-600" />
                            <span className="min-w-0 flex-1 truncate text-ink">
                              {f.name}
                            </span>
                            <button
                              type="button"
                              aria-label={fr ? "Retirer" : "Remove"}
                              onClick={() =>
                                setFiles(files.filter((_, i) => i !== idx))
                              }
                              className="rounded p-1 text-slatex-600 hover:text-ink"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {files.length < 5 ? (
                      <label className="flex cursor-pointer items-center justify-center gap-2 border border-dashed border-line px-4 py-6 text-sm font-semibold text-ink hover:border-brand-600">
                        <Paperclip className="h-4 w-4" />
                        {fr ? "Ajouter des fichiers" : "Add files"}
                        <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          accept="image/*,.pdf"
                          className="sr-only"
                          onChange={(e) => {
                            if (!e.target.files) return;
                            const added = Array.from(e.target.files).slice(
                              0,
                              5 - files.length,
                            );
                            setFiles([...files, ...added]);
                          }}
                        />
                      </label>
                    ) : null}
                  </div>
                </div>
              ) : null}

              {step === 2 ? (
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="r-name" className={labelCls}>
                      {fr ? "Nom (facultatif)" : "Name (optional)"}
                    </label>
                    <input
                      id="r-name"
                      autoComplete="name"
                      className={fieldCls}
                      value={form.name}
                      onChange={(e) => setField("name", e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="r-email" className={labelCls}>
                      {R(L.nl.email, locale)}
                    </label>
                    <input
                      id="r-email"
                      type="email"
                      autoComplete="email"
                      className={fieldCls}
                      value={form.email}
                      onChange={(e) => setField("email", e.target.value)}
                    />
                    <p className="mt-1.5 text-sm text-slatex-600">
                      {fr
                        ? "Uniquement pour le suivi de votre signalement."
                        : "Only used to follow up on your report."}
                    </p>
                    {errors.email ? (
                      <p className="mt-1.5 flex items-center gap-1.5 text-sm text-risk-critical">
                        <AlertCircle className="h-4 w-4" />
                        {errors.email}
                      </p>
                    ) : null}
                  </div>
                </div>
              ) : null}

              {step === 3 ? (
                <>
                  <dl className="divide-y divide-line rounded-sm border border-line">
                    {[
                      [steps[0], `${categoryLabel} — ${form.description}`, 0],
                      [
                        steps[1],
                        `${form.channel} · ${form.country}${
                          form.moneyLost ? ` · ${form.amount}` : ""
                        }${files.length ? ` · ${files.length} 📎` : ""}`,
                        1,
                      ],
                      [steps[2], `${form.name || "—"} · ${form.email}`, 2],
                    ].map(([label, summary, targetStep]) => (
                      <div key={String(label)} className="flex gap-4 p-4">
                        <dt className="w-32 shrink-0 text-sm font-semibold text-ink">
                          {label}
                        </dt>
                        <dd className="flex-1 break-words text-sm text-slatex-600">
                          {summary}
                        </dd>
                        <button
                          type="button"
                          onClick={() => setStep(Number(targetStep))}
                          className="text-sm font-semibold text-brand-600"
                        >
                          {fr ? "Modifier" : "Edit"}
                        </button>
                      </div>
                    ))}
                  </dl>

                  <p className="rounded-sm bg-signal/10 p-4 text-sm text-ink">
                    {R(L.reportSec.note, locale)}
                  </p>

                  <label className="flex min-h-[44px] items-start gap-3 text-sm text-ink">
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => setField("consent", e.target.checked)}
                      className="mt-0.5 h-5 w-5 accent-brand-600"
                    />
                    <span>
                      {fr
                        ? "J’accepte que GLOPROFAS traite ces informations pour examiner mon signalement, conformément à la politique de confidentialité."
                        : "I agree that GLOPROFAS may process this information to review my report, in line with the privacy policy."}
                      {errors.consent ? (
                        <span className="mt-1.5 flex items-center gap-1.5 text-sm text-risk-critical">
                          <AlertCircle className="h-4 w-4" />
                          {errors.consent}
                        </span>
                      ) : null}
                    </span>
                  </label>
                </>
              ) : null}
            </div>

            <div className="fixed inset-x-0 bottom-0 z-40 flex gap-3 border-t border-line bg-white p-4 md:static md:mt-6 md:border-0 md:bg-transparent md:p-0">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="h-[52px] rounded-[2px] border border-line bg-white px-6 font-semibold text-ink"
                >
                  {fr ? "Retour" : "Back"}
                </button>
              ) : null}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="h-[52px] flex-1 rounded-[2px] bg-brand-600 px-7 font-semibold text-white hover:bg-brand-500 md:flex-none"
                >
                  {fr ? "Suivant" : "Next"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => void handleSubmit()}
                  disabled={submitting}
                  className="inline-flex h-[52px] flex-1 items-center justify-center gap-2 rounded-[2px] bg-signal px-7 font-semibold text-navy-950 disabled:opacity-60 md:flex-none"
                >
                  {submitting ? (
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4" />
                  )}
                  {fr ? "Envoyer le signalement" : "Submit report"}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

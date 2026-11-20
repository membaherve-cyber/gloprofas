"use client";

/**
 * Professional Services — assessment, awareness and training for businesses
 * and institutions. Grouped presentation + enquiry form.
 */

import React, { useState } from "react";
import { ArrowRight, Building2, Check, GraduationCap, Send, TriangleAlert, User } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { SERVICES, type GService } from "@/lib/content/services";
import { Btn, PageHero, Reveal, Masthead } from "@/components/shared/ui";

const GROUPS = [
  { key: "individual", icon: User, label: { en: "For individuals", fr: "Pour les particuliers" } },
  { key: "business", icon: Building2, label: { en: "For businesses", fr: "Pour les entreprises" } },
  { key: "enterprise", icon: GraduationCap, label: { en: "For institutions", fr: "Pour les institutions" } },
  { key: "training", icon: GraduationCap, label: { en: "Training", fr: "Formation" } },
] as const;

export function ServicesView() {
  const { locale, t } = useI18n();
  const fr = locale === "fr";

  const [form, setForm] = useState({
    name: "",
    organisation: "",
    email: "",
    phone: "",
    country: "",
    serviceSlug: "",
    requirements: "",
    contactMethod: "email",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  function set(k: string, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => {
      const { [k]: _d, ...rest } = e;
      return rest;
    });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = fr ? "Ce champ est obligatoire." : "This field is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email))
      errs.email = fr ? "Adresse électronique invalide." : "Enter a valid email address.";
    if (form.requirements.trim().length < 20)
      errs.requirements = fr ? "Décrivez vos besoins (20 caractères minimum)." : "Describe your requirements (20 characters minimum).";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setBusy(true);
    try {
      const res = await fetch("/api/service-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, language: locale }),
      });
      if (!res.ok) throw new Error();
      setDone(true);
    } catch {
      setErrors({ form: fr ? "L'envoi a échoué. Réessayez dans un instant." : "Submission failed. Please try again in a moment." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <PageHero
        eyebrow={fr ? "Services" : "Services"}
        title={t("services.h1")}
        lead={t("services.lead")}
        image="/images/gen/scam-business.jpg"
        imageAlt={fr ? "Dirigeant vérifiant indépendamment les détails d'un paiement" : "Business owner independently verifying payment details"}
      />

      {/* Free vs paid note */}
      <section className="border-b border-line-200 bg-white py-6">
        <div className="container-g">
          <Reveal>
            <p className="rounded-xl border-l-4 border-brand-600 bg-brand-50 px-5 py-3.5 text-[13.5px] leading-relaxed text-ink-700">
              {t("services.freeNote")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Groups */}
      <section className="section-y bg-mist-50">
        <div className="container-g">
          {GROUPS.map((g, gi) => {
            const items = SERVICES.filter((s: GService) => s.group === g.key);
            if (items.length === 0) return null;
            const Icon = g.icon;
            return (
              <div key={g.key} className={gi > 0 ? "mt-14" : ""}>
                <Reveal>
                  <div className="flex items-center gap-3.5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand-600 ring-1 ring-line-200">
                      <Icon size={19} strokeWidth={1.9} aria-hidden />
                    </span>
                    <h2 className="h3-g">{fr ? g.label.fr : g.label.en}</h2>
                    <span className="mast-num ml-2 text-[14px]">{`0${gi + 1}`}</span>
                    <span aria-hidden className="h-px flex-1 bg-line-200" />
                  </div>
                </Reveal>
                <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {items.map((s: GService, i: number) => (
                    <Reveal key={s.slug} delay={(i % 3) * 70}>
                      <article className="card-g hoverable flex h-full flex-col p-6">
                        <div className="flex items-center justify-between gap-3">
                          <span
                            className={`chip-g ${
                              s.pricingMode === "free"
                                ? "bg-[#159769]/10 text-[#0d6e4a]"
                                : "bg-brand-50 text-brand-600"
                            }`}
                          >
                            {t(`services.pricing.${s.pricingMode}`)}
                          </span>
                        </div>
                        <h3 className="mt-3 font-heading text-[15.5px] font-semibold leading-snug text-ink-900">
                          {fr ? s.name.fr : s.name.en}
                        </h3>
                        <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-slatex-600">
                          {fr ? s.description.fr : s.description.en}
                        </p>
                        <ul className="mt-4 space-y-1.5">
                          {(fr ? s.bullets.fr : s.bullets.en).map((b, j) => (
                            <li key={j} className="flex items-start gap-2 text-[12.5px] text-ink-700">
                              <Check size={13} className="mt-0.5 shrink-0 text-risk-low" aria-hidden />
                              {b}
                            </li>
                          ))}
                        </ul>
                        <button
                          type="button"
                          onClick={() => {
                            set("serviceSlug", s.slug);
                            document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="link-g mt-5 !text-[13px]"
                        >
                          {t("services.enquire")}
                          <ArrowRight size={13} aria-hidden />
                        </button>
                      </article>
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Enquiry form */}
      <section id="enquiry" className="section-y scroll-mt-28 bg-white">
        <div className="container-g grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <Masthead num="05" eyebrow={t("services.enquiryTitle")} />
              <h2 className="h2-g mt-6">{t("services.enquiryTitle")}</h2>
              <p className="lead-g mt-4">{t("services.enquiryBody")}</p>
              <div className="mt-6 rounded-xl bg-mist-50 px-5 py-4 text-[13px] leading-relaxed text-slatex-600">
                {fr
                  ? "Les services professionnels sont fournis dans le cadre d'un accord écrit distinct. Aucun prix n'est affiché sans validation de l'organisation."
                  : "Professional services are provided under a separate written agreement. No prices are displayed without organisational approval."}
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={100}>
              {done ? (
                <div className="card-g p-8 text-center">
                  <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#159769]/10 text-[#0d6e4a]">
                    <Check size={26} aria-hidden />
                  </span>
                  <h3 className="h3-g">{t("services.success")}</h3>
                  <div className="mt-5">
                    <Btn href="/" variant="outline">{fr ? "Retour à l'accueil" : "Back to homepage"}</Btn>
                  </div>
                </div>
              ) : (
                <form onSubmit={submit} className="card-g p-6 lg:p-8" noValidate>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="se-name" className="lbl-g">{fr ? "Nom *" : "Name *"}</label>
                      <input id="se-name" value={form.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" aria-invalid={!!errors.name} className="field-g" />
                      {errors.name ? <p className="err-g" role="alert"><TriangleAlert size={13} aria-hidden />{errors.name}</p> : null}
                    </div>
                    <div>
                      <label htmlFor="se-org" className="lbl-g">{fr ? "Organisation" : "Organisation"}</label>
                      <input id="se-org" value={form.organisation} onChange={(e) => set("organisation", e.target.value)} autoComplete="organization" className="field-g" />
                    </div>
                    <div>
                      <label htmlFor="se-email" className="lbl-g">{fr ? "Courriel *" : "Email *"}</label>
                      <input id="se-email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" aria-invalid={!!errors.email} className="field-g" />
                      {errors.email ? <p className="err-g" role="alert"><TriangleAlert size={13} aria-hidden />{errors.email}</p> : null}
                    </div>
                    <div>
                      <label htmlFor="se-phone" className="lbl-g">{fr ? "Téléphone" : "Phone"}</label>
                      <input id="se-phone" value={form.phone} onChange={(e) => set("phone", e.target.value)} inputMode="tel" autoComplete="tel" className="field-g" />
                    </div>
                    <div>
                      <label htmlFor="se-country" className="lbl-g">{fr ? "Pays" : "Country"}</label>
                      <input id="se-country" value={form.country} onChange={(e) => set("country", e.target.value)} autoComplete="country-name" className="field-g" />
                    </div>
                    <div>
                      <label htmlFor="se-service" className="lbl-g">{t("services.service")}</label>
                      <select id="se-service" value={form.serviceSlug} onChange={(e) => set("serviceSlug", e.target.value)} className="field-g">
                        <option value="">{fr ? "Sélectionner un service…" : "Select a service…"}</option>
                        {SERVICES.map((s: GService) => (
                          <option key={s.slug} value={s.slug}>
                            {fr ? s.name.fr : s.name.en}
                          </option>
                        ))}
                        <option value="other">{fr ? "Autre / non sûr" : "Other / not sure"}</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="se-req" className="lbl-g">{t("services.requirements")} *</label>
                      <textarea id="se-req" value={form.requirements} onChange={(e) => set("requirements", e.target.value)} rows={4} maxLength={3000} aria-invalid={!!errors.requirements} className="field-g resize-y" />
                      {errors.requirements ? <p className="err-g" role="alert"><TriangleAlert size={13} aria-hidden />{errors.requirements}</p> : null}
                    </div>
                    <div>
                      <label htmlFor="se-method" className="lbl-g">{t("services.contactMethod")}</label>
                      <select id="se-method" value={form.contactMethod} onChange={(e) => set("contactMethod", e.target.value)} className="field-g">
                        <option value="email">{fr ? "Courriel" : "Email"}</option>
                        <option value="phone">{fr ? "Téléphone" : "Phone"}</option>
                      </select>
                    </div>
                  </div>
                  {errors.form ? (
                    <p role="alert" className="err-g">{errors.form}</p>
                  ) : null}
                  <div className="mt-6">
                    <Btn type="submit" variant="primary" disabled={busy}>
                      {busy ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden />
                          {fr ? "Envoi…" : "Sending…"}
                        </>
                      ) : (
                        <>
                          <Send size={15} aria-hidden />
                          {fr ? "Envoyer la demande" : "Send enquiry"}
                        </>
                      )}
                    </Btn>
                  </div>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

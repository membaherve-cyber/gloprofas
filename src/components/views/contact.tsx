"use client";

/**
 * Contact GLOPROFAS — contact form with categories + organisation details.
 */

import React, { useState } from "react";
import { Check, Mail, MapPin, Send, TriangleAlert } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import { Btn, PageHero, Reveal, Masthead } from "@/components/shared/ui";

export function ContactView() {
  const { locale, t } = useI18n();
  const fr = locale === "fr";
  const [form, setForm] = useState({ name: "", email: "", subject: "", category: "general", message: "" });
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
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) errs.email = fr ? "Adresse invalide." : "Enter a valid email address.";
    if (form.message.trim().length < 10) errs.message = fr ? "Message trop court." : "Message is too short.";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setBusy(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, language: locale }),
      });
      if (!res.ok) throw new Error();
      setDone(true);
    } catch {
      setErrors({ form: fr ? "L'envoi a échoué. Réessayez." : "Submission failed. Please try again." });
    } finally {
      setBusy(false);
    }
  }

  const categories = ["general", "partnership", "media", "services"] as const;

  return (
    <>
      <PageHero
        eyebrow={fr ? "Contact" : "Contact"}
        title={t("contact.h1")}
        lead={t("contact.lead")}
        image="/images/context/team-laptops-office.jpg"
        imageAlt={fr ? "Équipe GLOPROFAS au travail" : "GLOPROFAS team at work"}
      />

      <section className="section-y bg-white">
        <div className="container-g grid gap-12 lg:grid-cols-12">
          {/* Form */}
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="h3-g">{t("contact.formTitle")}</h2>
            </Reveal>
            <Reveal delay={80}>
              {done ? (
                <div className="card-g mt-6 p-8 text-center">
                  <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#159769]/10 text-[#0d6e4a]">
                    <Check size={26} aria-hidden />
                  </span>
                  <h3 className="h3-g">{t("contact.success")}</h3>
                  <div className="mt-5">
                    <Btn onClick={() => setDone(false)} variant="outline">
                      {fr ? "Envoyer un autre message" : "Send another message"}
                    </Btn>
                  </div>
                </div>
              ) : (
                <form onSubmit={submit} className="card-g mt-6 p-6 lg:p-8" noValidate>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="ct-name" className="lbl-g">{fr ? "Nom *" : "Name *"}</label>
                      <input id="ct-name" value={form.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" aria-invalid={!!errors.name} className="field-g" />
                      {errors.name ? <p className="err-g" role="alert"><TriangleAlert size={13} aria-hidden />{errors.name}</p> : null}
                    </div>
                    <div>
                      <label htmlFor="ct-email" className="lbl-g">{fr ? "Courriel *" : "Email *"}</label>
                      <input id="ct-email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" aria-invalid={!!errors.email} className="field-g" />
                      {errors.email ? <p className="err-g" role="alert"><TriangleAlert size={13} aria-hidden />{errors.email}</p> : null}
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="ct-cat" className="lbl-g">{t("contact.category")}</label>
                      <select id="ct-cat" value={form.category} onChange={(e) => set("category", e.target.value)} className="field-g">
                        {categories.map((c) => (
                          <option key={c} value={c}>
                            {t(`contact.categories.${c}`)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="ct-subject" className="lbl-g">{t("contact.subject")}</label>
                      <input id="ct-subject" value={form.subject} onChange={(e) => set("subject", e.target.value)} className="field-g" />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="ct-msg" className="lbl-g">{t("contact.message")} *</label>
                      <textarea id="ct-msg" value={form.message} onChange={(e) => set("message", e.target.value)} rows={5} maxLength={4000} aria-invalid={!!errors.message} className="field-g resize-y" />
                      {errors.message ? <p className="err-g" role="alert"><TriangleAlert size={13} aria-hidden />{errors.message}</p> : null}
                    </div>
                  </div>
                  <p className="mt-4 rounded-lg bg-mist-50 px-4 py-3 text-[12.5px] leading-relaxed text-slatex-600">
                    {t("contact.disclaimer")}
                  </p>
                  {errors.form ? <p role="alert" className="err-g mt-3">{errors.form}</p> : null}
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
                          {fr ? "Envoyer le message" : "Send message"}
                        </>
                      )}
                    </Btn>
                  </div>
                </form>
              )}
            </Reveal>
          </div>

          {/* Details */}
          <div className="lg:col-span-5">
            <Reveal delay={120}>
              <div className="on-dark rounded-2xl bg-navy-950 p-7">
                <p className="eyebrow mb-5">{t("contact.detailsTitle")}</p>
                <ul className="space-y-5">
                  <li className="flex items-start gap-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-cyanx-500">
                      <Mail size={17} aria-hidden />
                    </span>
                    <div>
                      <p className="font-heading text-[12.5px] font-semibold uppercase tracking-wide text-slatex-400">
                        {t("contact.emailLabel")}
                      </p>
                      <a href={`mailto:${SITE.email}`} className="mt-1 block text-[14.5px] font-semibold text-white hover:text-cyanx-500">
                        {SITE.email}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-cyanx-500">
                      <MapPin size={17} aria-hidden />
                    </span>
                    <div>
                      <p className="font-heading text-[12.5px] font-semibold uppercase tracking-wide text-slatex-400">
                        {t("contact.locationLabel")}
                      </p>
                      <p className="mt-1 text-[14px] text-slatex-300">{fr ? SITE.location.fr : SITE.location.en}</p>
                    </div>
                  </li>
                </ul>
                <div className="mt-7 border-t border-white/10 pt-6">
                  <p className="text-[12.5px] leading-relaxed text-slatex-400">
                    {fr
                      ? "GLOPROFAS n'est pas un service de police, un régulateur ni une banque. Pour une plainte officielle, contactez les autorités compétentes de votre pays. Pour un signalement de fraude, utilisez notre formulaire confidentiel."
                      : "GLOPROFAS is not a police service, a regulator or a bank. For an official complaint, contact the competent authorities in your country. To report fraud, use our confidential form."}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Btn href="/report" variant="signal" size="sm">
                      {fr ? "Signaler une arnaque" : "Report a scam"}
                    </Btn>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

"use client";

/**
 * Get Involved — volunteer application and partnership enquiry.
 */

import React, { useState } from "react";
import { Check, HandHeart, HeartHandshake, Send, TriangleAlert } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Btn, PageHero, Reveal, Masthead } from "@/components/shared/ui";

export function GetInvolvedView() {
  const { locale, t } = useI18n();
  const fr = locale === "fr";
  const [tab, setTab] = useState<"volunteer" | "partner">("volunteer");

  const [vForm, setVForm] = useState({ name: "", email: "", background: "", skills: "", languages: "", interests: "", motivation: "" });
  const [pForm, setPForm] = useState({ organisation: "", organisationType: "", contactPerson: "", email: "", phone: "", country: "", proposal: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<"volunteer" | "partner" | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (tab === "volunteer") {
      if (!vForm.name.trim()) errs.name = fr ? "Ce champ est obligatoire." : "This field is required.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(vForm.email)) errs.email = fr ? "Adresse invalide." : "Enter a valid email.";
    } else {
      if (!pForm.organisation.trim()) errs.organisation = fr ? "Ce champ est obligatoire." : "This field is required.";
      if (!pForm.contactPerson.trim()) errs.contactPerson = fr ? "Ce champ est obligatoire." : "This field is required.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(pForm.email)) errs.email = fr ? "Adresse invalide." : "Enter a valid email.";
      if (pForm.proposal.trim().length < 20) errs.proposal = fr ? "Décrivez votre proposition (20 caractères minimum)." : "Describe your proposal (20 characters minimum).";
    }
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setBusy(true);
    try {
      const res = await fetch("/api/get-involved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          tab === "volunteer"
            ? { kind: "volunteer", ...vForm, language: locale }
            : { kind: "partner", ...pForm, language: locale }
        ),
      });
      if (!res.ok) throw new Error();
      setDone(tab);
    } catch {
      setErrors({ form: fr ? "L'envoi a échoué. Réessayez." : "Submission failed. Please try again." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <PageHero
        eyebrow={fr ? "Participer" : "Take part"}
        title={t("involved.h1")}
        lead={t("involved.lead")}
        image="/images/gen/about-workshop.jpg"
        imageAlt={fr ? "Atelier communautaire de sensibilisation" : "Community awareness workshop"}
      />

      {/* Intro cards */}
      <section className="section-y bg-white">
        <div className="container-g grid gap-5 lg:grid-cols-3">
          <Reveal>
            <div className="card-g hoverable h-full p-6">
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <HandHeart size={20} strokeWidth={1.9} aria-hidden />
              </span>
              <h2 className="h3-g text-[1.05rem]">{t("involved.volunteerTitle")}</h2>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-slatex-600">{t("involved.volunteerBody")}</p>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <div className="card-g hoverable h-full p-6">
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <HeartHandshake size={20} strokeWidth={1.9} aria-hidden />
              </span>
              <h2 className="h3-g text-[1.05rem]">{t("involved.partnerTitle")}</h2>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-slatex-600">{t("involved.partnerBody")}</p>
            </div>
          </Reveal>
          <Reveal delay={180}>
            <div className="card-g h-full p-6">
              <h2 className="h3-g text-[1.05rem]">{t("involved.supportTitle")}</h2>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-slatex-600">{t("involved.supportBody")}</p>
              <ul className="mt-4 space-y-2">
                {[t("involved.volunteerBody"), t("involved.partnerBody")].map((x, i) => (
                  <li key={i} className="flex items-start gap-2 text-[12.5px] text-ink-700">
                    <Check size={13} className="mt-0.5 shrink-0 text-risk-low" aria-hidden />
                    {x.slice(0, 90)}…
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Forms */}
      <section className="section-y bg-mist-50">
        <div className="container-g max-w-3xl">
          <Reveal>
            <Masthead num="01" eyebrow={fr ? "Candidature" : "Application"} />
          </Reveal>

          {done ? (
            <div className="card-g mt-8 p-8 text-center">
              <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#159769]/10 text-[#0d6e4a]">
                <Check size={26} aria-hidden />
              </span>
              <h2 className="h3-g">
                {done === "volunteer" ? t("involved.volunteerSuccess") : t("involved.partnerSuccess")}
              </h2>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <Btn onClick={() => setDone(null)} variant="outline">
                  {fr ? "Soumettre une autre candidature" : "Submit another application"}
                </Btn>
                <Btn href="/" variant="primary">{fr ? "Accueil" : "Homepage"}</Btn>
              </div>
            </div>
          ) : (
            <div className="card-g mt-8 overflow-hidden">
              {/* Tabs */}
              <div className="grid grid-cols-2 border-b border-line-200" role="tablist">
                {(["volunteer", "partner"] as const).map((tb) => (
                  <button
                    key={tb}
                    type="button"
                    role="tab"
                    aria-selected={tab === tb}
                    onClick={() => {
                      setTab(tb);
                      setErrors({});
                    }}
                    className={`h-[52px] font-heading text-[14px] font-semibold transition-colors ${
                      tab === tb
                        ? "border-b-2 border-brand-600 bg-white text-brand-600"
                        : "bg-mist-50 text-slatex-600 hover:text-ink-900"
                    }`}
                  >
                    {tb === "volunteer" ? t("involved.volunteerForm") : t("involved.partnerForm")}
                  </button>
                ))}
              </div>

              <form onSubmit={submit} className="p-6 lg:p-8" noValidate>
                {tab === "volunteer" ? (
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="gv-name" className="lbl-g">{fr ? "Nom *" : "Name *"}</label>
                      <input id="gv-name" value={vForm.name} onChange={(e) => setVForm({ ...vForm, name: e.target.value })} autoComplete="name" aria-invalid={!!errors.name} className="field-g" />
                      {errors.name ? <p className="err-g" role="alert"><TriangleAlert size={13} aria-hidden />{errors.name}</p> : null}
                    </div>
                    <div>
                      <label htmlFor="gv-email" className="lbl-g">{fr ? "Courriel *" : "Email *"}</label>
                      <input id="gv-email" type="email" value={vForm.email} onChange={(e) => setVForm({ ...vForm, email: e.target.value })} autoComplete="email" aria-invalid={!!errors.email} className="field-g" />
                      {errors.email ? <p className="err-g" role="alert"><TriangleAlert size={13} aria-hidden />{errors.email}</p> : null}
                    </div>
                    <div>
                      <label htmlFor="gv-bg" className="lbl-g">{t("involved.background")}</label>
                      <input id="gv-bg" value={vForm.background} onChange={(e) => setVForm({ ...vForm, background: e.target.value })} className="field-g" />
                    </div>
                    <div>
                      <label htmlFor="gv-skills" className="lbl-g">{t("involved.skills")}</label>
                      <input id="gv-skills" value={vForm.skills} onChange={(e) => setVForm({ ...vForm, skills: e.target.value })} className="field-g" />
                    </div>
                    <div>
                      <label htmlFor="gv-langs" className="lbl-g">{t("involved.languages")}</label>
                      <input id="gv-langs" value={vForm.languages} onChange={(e) => setVForm({ ...vForm, languages: e.target.value })} placeholder="French, English…" className="field-g" />
                    </div>
                    <div>
                      <label htmlFor="gv-int" className="lbl-g">{t("involved.interests")}</label>
                      <input id="gv-int" value={vForm.interests} onChange={(e) => setVForm({ ...vForm, interests: e.target.value })} className="field-g" />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="gv-mot" className="lbl-g">{t("involved.motivation")}</label>
                      <textarea id="gv-mot" value={vForm.motivation} onChange={(e) => setVForm({ ...vForm, motivation: e.target.value })} rows={4} maxLength={2000} className="field-g resize-y" />
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="gp-org" className="lbl-g">{t("involved.organisation")} *</label>
                      <input id="gp-org" value={pForm.organisation} onChange={(e) => setPForm({ ...pForm, organisation: e.target.value })} aria-invalid={!!errors.organisation} className="field-g" />
                      {errors.organisation ? <p className="err-g" role="alert"><TriangleAlert size={13} aria-hidden />{errors.organisation}</p> : null}
                    </div>
                    <div>
                      <label htmlFor="gp-type" className="lbl-g">{t("involved.organisationType")}</label>
                      <input id="gp-type" value={pForm.organisationType} onChange={(e) => setPForm({ ...pForm, organisationType: e.target.value })} className="field-g" />
                    </div>
                    <div>
                      <label htmlFor="gp-contact" className="lbl-g">{t("involved.contactPerson")} *</label>
                      <input id="gp-contact" value={pForm.contactPerson} onChange={(e) => setPForm({ ...pForm, contactPerson: e.target.value })} autoComplete="name" aria-invalid={!!errors.contactPerson} className="field-g" />
                      {errors.contactPerson ? <p className="err-g" role="alert"><TriangleAlert size={13} aria-hidden />{errors.contactPerson}</p> : null}
                    </div>
                    <div>
                      <label htmlFor="gp-email" className="lbl-g">{fr ? "Courriel *" : "Email *"}</label>
                      <input id="gp-email" type="email" value={pForm.email} onChange={(e) => setPForm({ ...pForm, email: e.target.value })} autoComplete="email" aria-invalid={!!errors.email} className="field-g" />
                      {errors.email ? <p className="err-g" role="alert"><TriangleAlert size={13} aria-hidden />{errors.email}</p> : null}
                    </div>
                    <div>
                      <label htmlFor="gp-phone" className="lbl-g">{fr ? "Téléphone" : "Phone"}</label>
                      <input id="gp-phone" value={pForm.phone} onChange={(e) => setPForm({ ...pForm, phone: e.target.value })} inputMode="tel" autoComplete="tel" className="field-g" />
                    </div>
                    <div>
                      <label htmlFor="gp-country" className="lbl-g">{fr ? "Pays" : "Country"}</label>
                      <input id="gp-country" value={pForm.country} onChange={(e) => setPForm({ ...pForm, country: e.target.value })} autoComplete="country-name" className="field-g" />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="gp-prop" className="lbl-g">{t("involved.proposal")} *</label>
                      <textarea id="gp-prop" value={pForm.proposal} onChange={(e) => setPForm({ ...pForm, proposal: e.target.value })} rows={4} maxLength={3000} aria-invalid={!!errors.proposal} className="field-g resize-y" />
                      {errors.proposal ? <p className="err-g" role="alert"><TriangleAlert size={13} aria-hidden />{errors.proposal}</p> : null}
                    </div>
                  </div>
                )}

                {errors.form ? <p role="alert" className="err-g mt-4">{errors.form}</p> : null}

                <div className="mt-7">
                  <Btn type="submit" variant="primary" disabled={busy}>
                    {busy ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden />
                        {fr ? "Envoi…" : "Sending…"}
                      </>
                    ) : (
                      <>
                        <Send size={15} aria-hidden />
                        {fr ? "Envoyer" : "Submit"}
                      </>
                    )}
                  </Btn>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

"use client";

import { useActionState, useMemo, useState, type ReactNode } from "react";
import { contactAction, enquiryAction, newsletterAction, partnershipAction, volunteerAction, type FormState } from "@/server/actions";
import { COUNTRIES } from "@/lib/countries";
import { m } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

const initial: FormState = { ok: false };

function Shell({ children, state }: { children: ReactNode; state: FormState }) {
  const error = state.error === "too_fast" ? "tooFast" : state.error === "limited" ? "limited" : state.error === "invalid" ? "invalid" : state.error;
  return (
    <div className="card" style={{ display: "grid", gap: 14 }}>
      <input type="hidden" name="started_at" value={String(Date.now())} />
      <p className="honeypot"><label>Website<input name="company_website" tabIndex={-1} autoComplete="off" /></label></p>
      {children}
      {error ? <p className="error" role="alert">{error}</p> : null}
      {state.ok ? <p role="status">OK</p> : null}
    </div>
  );
}

export function NewsletterForm({ locale }: { locale: Locale }) {
  const t = m(locale);
  const [state, action, pending] = useActionState(newsletterAction, initial);
  const error = state.error === "too_fast" ? t.forms.tooFast : state.error === "limited" ? t.forms.limited : state.error === "invalid" ? t.forms.invalid : null;
  return (
    <form action={action} className="nl-form" aria-label={t.newsletterH2}>
      <input type="hidden" name="started_at" value={String(Date.now())} />
      <p className="honeypot"><label>{t.forms.honeypot}<input name="company_website" tabIndex={-1} autoComplete="off" /></label></p>
      <div className="nl-row">
        <input name="name" placeholder={t.newsletterName} aria-label={t.newsletterName} autoComplete="name" />
        <input name="email" type="email" required placeholder={t.newsletterEmail} aria-label={t.newsletterEmail} autoComplete="email" />
      </div>
      <div className="nl-row">
        <select name="country" defaultValue="" aria-label={t.newsletterCountry}>
          <option value="">{t.newsletterCountry}</option>
          {COUNTRIES.map((country) => <option key={country}>{country}</option>)}
        </select>
        <select name="language" defaultValue={locale} aria-label={t.newsletterLanguage}>
          <option value="en">English</option>
          <option value="fr">Français</option>
        </select>
      </div>
      <label className="nl-consent"><input type="checkbox" name="consent" value="yes" required /> {t.newsletterConsent}</label>
      <button className="btn btn-signal nl-submit" type="submit" disabled={pending}>{t.newsletterSubmit}</button>
      {error ? <p className="nl-error" role="alert">{error}</p> : null}
      {state.ok ? <p className="nl-success" role="status">{t.newsletterSuccess}</p> : null}
    </form>
  );
}

export function ContactForm({ locale }: { locale: Locale }) {
  const t = m(locale);
  const [state, action, pending] = useActionState(contactAction, initial);
  return (
    <form action={action}>
      <Shell state={state}>
        <div className="field"><label htmlFor="c-name">{t.newsletterName}</label><input id="c-name" name="name" required autoComplete="name" /></div>
        <div className="field"><label htmlFor="c-email">{t.newsletterEmail}</label><input id="c-email" name="email" type="email" required autoComplete="email" /></div>
        <div className="field"><label htmlFor="c-subject">{t.forms.subject}</label><input id="c-subject" name="subject" required /></div>
        <div className="field">
          <label htmlFor="c-cat">{t.forms.category}</label>
          <select id="c-cat" name="category" defaultValue="general">
            <option value="general">{t.forms.general}</option>
            <option value="partnership">{t.forms.partnership}</option>
            <option value="media">{t.forms.media}</option>
            <option value="professional">{t.forms.professional}</option>
            <option value="volunteer">{locale === "fr" ? "Bénévolat" : "Volunteer"}</option>
          </select>
        </div>
        <div className="field"><label htmlFor="c-msg">{t.forms.message}</label><textarea id="c-msg" name="message" required /></div>
        <input type="hidden" name="language" value={locale} />
        <button className="btn" type="submit" disabled={pending}>{t.send}</button>
        {state.ok ? <p role="status">{t.forms.sent}</p> : null}
      </Shell>
    </form>
  );
}

export function EnquiryForm({ locale, serviceId, serviceLabel }: { locale: Locale; serviceId?: string; serviceLabel?: string }) {
  const t = m(locale);
  const [state, action, pending] = useActionState(enquiryAction, initial);
  return (
    <form action={action}>
      <Shell state={state}>
        <input type="hidden" name="service_id" value={serviceId || ""} />
        <input type="hidden" name="service_label" value={serviceLabel || ""} />
        <input type="hidden" name="language" value={locale} />
        <div className="field"><label>{t.newsletterName}</label><input name="name" required /></div>
        <div className="field"><label>{t.forms.organisation}</label><input name="organisation" /></div>
        <div className="field"><label>{t.newsletterEmail}</label><input name="email" type="email" required /></div>
        <div className="field"><label>{t.forms.phone}</label><input name="phone" autoComplete="tel" /></div>
        <div className="field"><label>{t.newsletterCountry}</label><CountrySelect /></div>
        <div className="field"><label>{t.forms.method}</label><select name="contact_method" defaultValue="email"><option value="email">Email</option><option value="phone">Phone</option></select></div>
        <div className="field"><label>{t.forms.requirements}</label><textarea name="requirements" required /></div>
        <button className="btn" type="submit" disabled={pending}>{t.send}</button>
        {state.ok ? <p role="status">{t.forms.enquirySent}</p> : null}
      </Shell>
    </form>
  );
}

export function VolunteerForm({ locale }: { locale: Locale }) {
  const t = m(locale);
  const [state, action, pending] = useActionState(volunteerAction, initial);
  return (
    <form action={action}>
      <Shell state={state}>
        <div className="field"><label>{t.newsletterName}</label><input name="name" required /></div>
        <div className="field"><label>{t.newsletterEmail}</label><input name="email" type="email" required /></div>
        <div className="field"><label>{t.newsletterCountry}</label><CountrySelect /></div>
        <div className="field"><label>{t.forms.background}</label><textarea name="background" /></div>
        <div className="field"><label>{t.forms.skills}</label><input name="skills" /></div>
        <div className="field"><label>{t.forms.languages}</label><input name="languages" /></div>
        <div className="field"><label>{t.forms.interests}</label><input name="interests" /></div>
        <div className="field"><label>{t.forms.motivation}</label><textarea name="motivation" required /></div>
        <button className="btn" type="submit" disabled={pending}>{t.submit}</button>
        {state.ok ? <p role="status">{t.forms.sent}</p> : null}
      </Shell>
    </form>
  );
}

export function PartnershipForm({ locale }: { locale: Locale }) {
  const t = m(locale);
  const [state, action, pending] = useActionState(partnershipAction, initial);
  return (
    <form action={action}>
      <Shell state={state}>
        <div className="field"><label>{t.forms.organisation}</label><input name="organisation" required /></div>
        <div className="field"><label>{t.forms.orgType}</label><input name="org_type" /></div>
        <div className="field"><label>{t.forms.contactPerson}</label><input name="contact_name" required /></div>
        <div className="field"><label>{t.newsletterEmail}</label><input name="email" type="email" required /></div>
        <div className="field"><label>{t.newsletterCountry}</label><CountrySelect /></div>
        <div className="field"><label>{t.forms.proposal}</label><textarea name="proposal" required /></div>
        <button className="btn" type="submit" disabled={pending}>{t.submit}</button>
        {state.ok ? <p role="status">{t.forms.sent}</p> : null}
      </Shell>
    </form>
  );
}

function CountrySelect({ id }: { id?: string }) {
  const options = useMemo(() => COUNTRIES, []);
  return (
    <select id={id} name="country" defaultValue="">
      <option value="">—</option>
      {options.map((country) => <option key={country}>{country}</option>)}
    </select>
  );
}

export function useStarted() {
  const [started] = useState(() => Date.now());
  return started;
}

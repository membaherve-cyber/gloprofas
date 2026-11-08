"use client";

import { useActionState, type ReactNode } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import {
  sendContactMessage,
  submitPartnership,
  submitServiceEnquiry,
  submitVolunteerApplication,
} from "@/actions/public";
import { initialFormState, type FormState } from "@/lib/form-state";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/messages/en";

function Field({
  id,
  label,
  error,
  hint,
  children,
  required,
  className = "",
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="label">
        {label}
        {required ? <span className="ml-1 text-risk-critical">*</span> : null}
      </label>
      {children}
      {hint ? <p className="hint">{hint}</p> : null}
      {error ? (
        <p className="error-text" role="alert">
          <AlertCircle size={13} aria-hidden="true" /> {error}
        </p>
      ) : null}
    </div>
  );
}

function Select({
  id,
  name,
  options,
  defaultValue,
  error,
}: {
  id: string;
  name: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
  error?: string;
}) {
  return (
    <select
      id={id}
      name={name}
      defaultValue={defaultValue}
      className="field"
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${id}-error` : undefined}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

function Status({ state }: { state: FormState }) {
  if (state.status === "success") {
    return (
      <div className="flex items-start gap-3 rounded-sm border border-risk-low/40 bg-risk-low/10 p-4" role="status">
        <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-risk-low" aria-hidden="true" />
        <p className="text-base text-ink-900">{state.message}</p>
      </div>
    );
  }
  if (state.status === "error") {
    return (
      <div className="flex items-start gap-3 rounded-sm border border-risk-critical/40 bg-risk-critical/10 p-4" role="alert">
        <AlertCircle size={18} className="mt-0.5 shrink-0 text-risk-critical" aria-hidden="true" />
        <p className="text-base text-ink-900">{state.message}</p>
      </div>
    );
  }
  return null;
}

const consentNote = {
  en: "We use your details only to handle this request. Do not send passwords, codes or identity documents.",
  fr: "Vos informations servent uniquement à traiter cette demande. N’envoyez ni mots de passe, ni codes, ni documents d’identité.",
};

export function ContactForm({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [state, action, pending] = useActionState(sendContactMessage.bind(null, locale), initialFormState);
  return (
    <form action={action} className="grid gap-4 sm:grid-cols-2">
      <Field id="contact-name" label={dict.common.name} required error={state.errors?.name}>
        <input id="contact-name" name="name" required autoComplete="name" className="field" aria-invalid={Boolean(state.errors?.name)} />
      </Field>
      <Field id="contact-email" label={dict.common.email} required error={state.errors?.email}>
        <input id="contact-email" name="email" type="email" required autoComplete="email" className="field" aria-invalid={Boolean(state.errors?.email)} />
      </Field>
      <Field id="contact-category" label={dict.contact.category} required error={state.errors?.category}>
        <Select
          id="contact-category"
          name="category"
          defaultValue="general"
          options={Object.entries(dict.contact.categories).map(([value, label]) => ({ value, label }))}
          error={state.errors?.category}
        />
      </Field>
      <Field id="contact-subject" label={dict.contact.subject} required error={state.errors?.subject}>
        <input id="contact-subject" name="subject" required maxLength={200} className="field" aria-invalid={Boolean(state.errors?.subject)} />
      </Field>
      <Field id="contact-message" label={dict.contact.message} required error={state.errors?.message} className="sm:col-span-2">
        <textarea id="contact-message" name="message" required minLength={20} className="field" aria-invalid={Boolean(state.errors?.message)} />
      </Field>
      <div className="sm:col-span-2">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        <input type="hidden" name="language" value={locale} />
        <Status state={state} />
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-caption leading-relaxed text-slate-600">{consentNote[locale]}</p>
          <button type="submit" disabled={pending} className="btn btn-primary shrink-0">
            {pending ? dict.common.sending : dict.common.submit}
          </button>
        </div>
      </div>
    </form>
  );
}

export function ServiceEnquiryForm({
  locale,
  dict,
  serviceSlug,
  serviceName,
}: {
  locale: Locale;
  dict: Dictionary;
  serviceSlug?: string;
  serviceName?: string;
}) {
  const [state, action, pending] = useActionState(submitServiceEnquiry.bind(null, locale), initialFormState);
  return (
    <form action={action} className="grid gap-4 sm:grid-cols-2">
      <Field id="enquiry-name" label={dict.common.name} required error={state.errors?.name}>
        <input id="enquiry-name" name="name" required autoComplete="name" className="field" />
      </Field>
      <Field id="enquiry-organisation" label={locale === "fr" ? "Organisation (facultatif)" : "Organisation (optional)"} error={state.errors?.organisation}>
        <input id="enquiry-organisation" name="organisation" autoComplete="organization" className="field" />
      </Field>
      <Field id="enquiry-email" label={dict.common.email} required error={state.errors?.email}>
        <input id="enquiry-email" name="email" type="email" required autoComplete="email" className="field" />
      </Field>
      <Field id="enquiry-phone" label={`${dict.services.phone} (${dict.common.optional})`} error={state.errors?.phone}>
        <input id="enquiry-phone" name="phone" type="tel" autoComplete="tel" className="field" />
      </Field>
      <Field id="enquiry-country" label={dict.common.country} required error={state.errors?.country}>
        <input id="enquiry-country" name="country" required autoComplete="country-name" className="field" />
      </Field>
      <Field id="enquiry-contact-method" label={dict.services.contactMethod} error={state.errors?.contactMethod}>
        <Select
          id="enquiry-contact-method"
          name="contactMethod"
          defaultValue="email"
          options={[
            { value: "email", label: dict.common.email },
            { value: "phone", label: dict.services.phone },
          ]}
        />
      </Field>
      <Field id="enquiry-service" label={dict.services.service} className="sm:col-span-2" error={state.errors?.serviceSlug}>
        {serviceName ? <input type="hidden" name="serviceSlug" value={serviceSlug ?? ""} /> : null}
        <input
          id="enquiry-service"
          name={serviceName ? "serviceDisplay" : "serviceSlug"}
          defaultValue={serviceName ?? ""}
          readOnly={Boolean(serviceName)}
          className="field bg-mist-50"
          required
        />
      </Field>
      <Field id="enquiry-requirements" label={dict.services.requirements} required className="sm:col-span-2" error={state.errors?.requirements}>
        <textarea id="enquiry-requirements" name="requirements" required minLength={20} className="field" />
      </Field>
      <div className="sm:col-span-2">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        <input type="hidden" name="language" value={locale} />
        <Status state={state} />
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-caption leading-relaxed text-slate-600">{consentNote[locale]}</p>
          <button type="submit" disabled={pending} className="btn btn-primary shrink-0">
            {pending ? dict.common.sending : dict.common.submit}
          </button>
        </div>
      </div>
    </form>
  );
}

export function VolunteerForm({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [state, action, pending] = useActionState(submitVolunteerApplication.bind(null, locale), initialFormState);
  return (
    <form action={action} className="grid gap-4 sm:grid-cols-2">
      <Field id="volunteer-name" label={dict.common.name} required error={state.errors?.fullName}>
        <input id="volunteer-name" name="fullName" required autoComplete="name" className="field" />
      </Field>
      <Field id="volunteer-email" label={dict.common.email} required error={state.errors?.email}>
        <input id="volunteer-email" name="email" type="email" required autoComplete="email" className="field" />
      </Field>
      <Field id="volunteer-country" label={dict.common.country} required error={state.errors?.country}>
        <input id="volunteer-country" name="country" required autoComplete="country-name" className="field" />
      </Field>
      <Field id="volunteer-languages" label={dict.involved.languages} required error={state.errors?.languages}>
        <input id="volunteer-languages" name="languages" required className="field" />
      </Field>
      <Field id="volunteer-background" label={dict.involved.background} required className="sm:col-span-2" error={state.errors?.background}>
        <input id="volunteer-background" name="background" required className="field" />
      </Field>
      <Field id="volunteer-skills" label={dict.involved.skills} required className="sm:col-span-2" error={state.errors?.skills}>
        <input id="volunteer-skills" name="skills" required className="field" />
      </Field>
      <Field id="volunteer-motivation" label={dict.involved.motivation} required className="sm:col-span-2" error={state.errors?.motivation}>
        <textarea id="volunteer-motivation" name="motivation" required minLength={20} className="field" />
      </Field>
      <div className="sm:col-span-2">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        <Status state={state} />
        <button type="submit" disabled={pending} className="btn btn-primary mt-4">
          {pending ? dict.common.sending : dict.common.submit}
        </button>
      </div>
    </form>
  );
}

export function PartnershipForm({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [state, action, pending] = useActionState(submitPartnership.bind(null, locale), initialFormState);
  return (
    <form action={action} className="grid gap-4 sm:grid-cols-2">
      <Field id="partner-organisation" label={dict.involved.organisation} required error={state.errors?.organisationName}>
        <input id="partner-organisation" name="organisationName" required className="field" />
      </Field>
      <Field id="partner-type" label={dict.involved.organisationType} required error={state.errors?.organisationType}>
        <input id="partner-type" name="organisationType" required className="field" />
      </Field>
      <Field id="partner-contact" label={dict.involved.contactPerson} required error={state.errors?.contactPerson}>
        <input id="partner-contact" name="contactPerson" required className="field" />
      </Field>
      <Field id="partner-email" label={dict.common.email} required error={state.errors?.email}>
        <input id="partner-email" name="email" type="email" required autoComplete="email" className="field" />
      </Field>
      <Field id="partner-country" label={dict.common.country} required error={state.errors?.country}>
        <input id="partner-country" name="country" required autoComplete="country-name" className="field" />
      </Field>
      <Field id="partner-proposal" label={dict.involved.proposal} required className="sm:col-span-2" error={state.errors?.proposal}>
        <textarea id="partner-proposal" name="proposal" required minLength={20} className="field" />
      </Field>
      <div className="sm:col-span-2">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        <Status state={state} />
        <button type="submit" disabled={pending} className="btn btn-primary mt-4">
          {pending ? dict.common.sending : dict.common.submit}
        </button>
      </div>
    </form>
  );
}

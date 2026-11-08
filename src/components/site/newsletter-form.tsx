"use client";

import { useActionState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { subscribeNewsletter } from "@/actions/public";
import { initialFormState, type FormState } from "@/lib/form-state";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/messages/en";

const initialState: FormState = initialFormState;

export function NewsletterForm({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [state, formAction, pending] = useActionState(subscribeNewsletter.bind(null, locale), initialState);

  if (state.status === "success") {
    return (
      <div className="flex items-start gap-3 rounded-sm border border-risk-low/40 bg-risk-low/10 p-4 text-white">
        <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-risk-low" aria-hidden="true" />
        <p className="text-base" role="status">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
      <div>
        <label htmlFor="newsletter-name" className="ed-label block text-white/60">
          {dict.newsletter.name}
        </label>
        <input id="newsletter-name" name="name" required maxLength={120} autoComplete="given-name" className="ed-field" />
      </div>
      <div>
        <label htmlFor="newsletter-email" className="ed-label block text-white/60">
          {dict.newsletter.email}
        </label>
        <input id="newsletter-email" name="email" type="email" required autoComplete="email" className="ed-field" aria-invalid={Boolean(state.errors?.email)} />
      </div>
      <div>
        <label htmlFor="newsletter-country" className="ed-label block text-white/60">
          {dict.newsletter.country}
        </label>
        <input id="newsletter-country" name="country" required autoComplete="country-name" className="ed-field" />
      </div>
      <div>
        <label htmlFor="newsletter-language" className="ed-label block text-white/60">
          {dict.newsletter.language}
        </label>
        <select id="newsletter-language" name="language" defaultValue={locale} className="ed-field">
          <option value="en" className="text-ink-900">
            English
          </option>
          <option value="fr" className="text-ink-900">
            Français
          </option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="newsletter-consent" className="flex min-h-11 items-start gap-3 text-small text-slate-300">
          <input id="newsletter-consent" name="consent" type="checkbox" required className="mt-0.5 h-4 w-4 shrink-0 accent-brand-500" />
          <span>{dict.newsletter.consent}</span>
        </label>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      </div>
      <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" disabled={pending} className="btn btn-signal">
          {pending ? dict.common.sending : dict.newsletter.submit}
        </button>
        {state.status === "error" ? (
          <p className="inline-flex items-center gap-1.5 text-small font-semibold text-white" role="alert">
            <AlertCircle size={15} aria-hidden="true" /> {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}

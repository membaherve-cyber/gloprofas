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
      <div className="flex items-start gap-3 rounded-[var(--radius-md)] border border-risk-low/40 bg-risk-low/10 p-4 text-white">
        <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-risk-low" aria-hidden="true" />
        <p className="text-[0.9rem]" role="status">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="grid gap-3 sm:grid-cols-2">
      <div>
        <label htmlFor="newsletter-name" className="label text-white">
          {dict.newsletter.name}
        </label>
        <input id="newsletter-name" name="name" required maxLength={120} autoComplete="given-name" className="field border-white/15 bg-white/5 text-white" />
      </div>
      <div>
        <label htmlFor="newsletter-email" className="label text-white">
          {dict.newsletter.email}
        </label>
        <input id="newsletter-email" name="email" type="email" required autoComplete="email" className="field border-white/15 bg-white/5 text-white" aria-invalid={Boolean(state.errors?.email)} />
      </div>
      <div>
        <label htmlFor="newsletter-country" className="label text-white">
          {dict.newsletter.country}
        </label>
        <input id="newsletter-country" name="country" required autoComplete="country-name" className="field border-white/15 bg-white/5 text-white" />
      </div>
      <div>
        <label htmlFor="newsletter-language" className="label text-white">
          {dict.newsletter.language}
        </label>
        <select id="newsletter-language" name="language" defaultValue={locale} className="field border-white/15 bg-white/5 text-white">
          <option value="en" className="text-ink-900">
            English
          </option>
          <option value="fr" className="text-ink-900">
            Français
          </option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="newsletter-consent" className="flex min-h-11 items-start gap-3 text-[0.82rem] text-slate-300">
          <input id="newsletter-consent" name="consent" type="checkbox" required className="mt-1 h-5 w-5 rounded border-white/30 bg-white/10" />
          <span>{dict.newsletter.consent}</span>
        </label>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      </div>
      <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" disabled={pending} className="btn btn-signal">
          {pending ? dict.common.sending : dict.newsletter.submit}
        </button>
        {state.status === "error" ? (
          <p className="inline-flex items-center gap-1.5 text-[0.82rem] font-semibold text-white" role="alert">
            <AlertCircle size={15} aria-hidden="true" /> {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}

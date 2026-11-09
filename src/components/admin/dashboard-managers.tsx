"use client";

import { useActionState, useState } from "react";
import { AlertCircle, CheckCircle2, FileText, GitBranch, Settings, ShieldAlert } from "lucide-react";
import {
  createArticle,
  createScamAlert,
  updateOrganisationSettings,
  updateReportStatus,
} from "@/actions/admin";
import { initialFormState, type FormState } from "@/lib/form-state";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/messages/en";

function ActionNotice({ state }: { state: FormState }) {
  if (state.status === "idle") return null;
  const ok = state.status === "success";
  return (
    <p
      role={ok ? "status" : "alert"}
      className={`mt-3 inline-flex items-center gap-2 rounded-[var(--radius-sm)] border px-3 py-2 text-small font-semibold ${
        ok
          ? "border-risk-low/40 bg-risk-low/10 text-risk-low"
          : "border-risk-critical/40 bg-risk-critical/10 text-risk-critical"
      }`}
    >
      {ok ? <CheckCircle2 size={14} aria-hidden="true" /> : <AlertCircle size={14} aria-hidden="true" />}
      {state.message}
    </p>
  );
}

export function InlineReportStatusForm({
  locale,
  reportId,
  currentStatus,
}: {
  locale: Locale;
  reportId: number;
  currentStatus: string;
}) {
  const [state, action, pending] = useActionState(updateReportStatus.bind(null, locale), initialFormState);
  return (
    <form action={action} className="inline-flex items-center gap-2">
      <input type="hidden" name="reportId" value={reportId} />
      <select
        name="status"
        defaultValue={currentStatus}
        aria-label="Report status"
        className="rounded-[8px] border border-line-200 bg-white px-2 py-1 text-caption font-medium text-ink-900"
      >
        <option value="new">new</option>
        <option value="under-review">under-review</option>
        <option value="info-required">info-required</option>
        <option value="reviewed">reviewed</option>
        <option value="closed">closed</option>
      </select>
      <button
        type="submit"
        disabled={pending}
        className="rounded-[8px] bg-blue-600 px-3 py-1 text-micro font-semibold text-white hover:bg-blue-500 disabled:opacity-50 transition-colors duration-fast ease-standard"
      >
        {pending ? "…" : locale === "fr" ? "OK" : "Save"}
      </button>
      {state.status === "success" ? (
        <span className="text-micro font-semibold text-risk-low">✓</span>
      ) : null}
    </form>
  );
}

export function QuickPublishAlertForm({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [state, action, pending] = useActionState(createScamAlert.bind(null, locale), initialFormState);
  return (
    <form action={action} className="rounded-sm border border-line-200 bg-white p-5">
      <div className="flex items-center gap-2 text-caption font-bold uppercase tracking-label text-risk-high">
        <ShieldAlert size={16} aria-hidden="true" />
        <span>{locale === "fr" ? "Publier une nouvelle alerte" : "Publish a new scam alert"}</span>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="alert-title-en" className="label text-small">
            {locale === "fr" ? "Titre (anglais) *" : "Title (English) *"}
          </label>
          <input
            id="alert-title-en"
            name="titleEn"
            required
            minLength={6}
            placeholder="Reported fake mobile money agent calls"
            className="field min-h-10 text-small"
          />
        </div>
        <div>
          <label htmlFor="alert-title-fr" className="label text-small">
            {locale === "fr" ? "Titre (français)" : "Title (French)"}
          </label>
          <input
            id="alert-title-fr"
            name="titleFr"
            placeholder="Faux appels d’agents de monnaie électronique signalés"
            className="field min-h-10 text-small"
          />
        </div>
        <div>
          <label htmlFor="alert-country" className="label text-small">
            {dict.common.country}
          </label>
          <input
            id="alert-country"
            name="country"
            defaultValue="Cameroon"
            className="field min-h-10 text-small"
          />
        </div>
        <div>
          <label htmlFor="alert-risk" className="label text-small">
            {dict.common.risk}
          </label>
          <select id="alert-risk" name="riskLevel" defaultValue="high" className="field min-h-10 text-small">
            <option value="low">{dict.common.low}</option>
            <option value="medium">{dict.common.medium}</option>
            <option value="high">{dict.common.high}</option>
            <option value="critical">{dict.common.critical}</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="alert-summary-en" className="label text-small">
            {locale === "fr" ? "Résumé de l’alerte (anglais) *" : "Alert summary (English) *"}
          </label>
          <textarea
            id="alert-summary-en"
            name="summaryEn"
            required
            minLength={15}
            rows={2}
            placeholder="Describe the reported suspicious pattern without unverified accusations."
            className="field min-h-[76px] text-small"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="alert-summary-fr" className="label text-small">
            {locale === "fr" ? "Résumé de l’alerte (français)" : "Alert summary (French)"}
          </label>
          <textarea
            id="alert-summary-fr"
            name="summaryFr"
            rows={2}
            placeholder="Décrivez le schéma suspect signalé sans accusation non vérifiée."
            className="field min-h-[76px] text-small"
          />
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <button type="submit" disabled={pending} className="btn btn-primary btn-sm">
          {pending
            ? dict.common.sending
            : locale === "fr"
              ? "Publier l’alerte"
              : "Publish alert"}
        </button>
        <ActionNotice state={state} />
      </div>
    </form>
  );
}

export function QuickPublishArticleForm({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [state, action, pending] = useActionState(createArticle.bind(null, locale), initialFormState);
  return (
    <form action={action} className="rounded-sm border border-line-200 bg-white p-5">
      <div className="flex items-center gap-2 text-caption font-bold uppercase tracking-label text-blue-600">
        <FileText size={16} aria-hidden="true" />
        <span>
          {locale === "fr"
            ? "Publier un article ou compte-rendu de campagne"
            : "Publish a news article or campaign report"}
        </span>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="art-title-en" className="label text-small">
            {locale === "fr" ? "Titre (anglais) *" : "Title (English) *"}
          </label>
          <input
            id="art-title-en"
            name="titleEn"
            required
            minLength={6}
            placeholder="Anti-scam seminar in secondary schools"
            className="field min-h-10 text-small"
          />
        </div>
        <div>
          <label htmlFor="art-title-fr" className="label text-small">
            {locale === "fr" ? "Titre (français)" : "Title (French)"}
          </label>
          <input
            id="art-title-fr"
            name="titleFr"
            placeholder="Séminaire anti-arnaque dans les établissements secondaires"
            className="field min-h-10 text-small"
          />
        </div>
        <div>
          <label htmlFor="art-kind" className="label text-small">
            {dict.common.type}
          </label>
          <select id="art-kind" name="kind" defaultValue="campaign" className="field min-h-10 text-small">
            <option value="campaign">{dict.news.kinds.campaign}</option>
            <option value="news">{dict.news.kinds.news}</option>
            <option value="article">{dict.news.kinds.article}</option>
            <option value="press">{dict.news.kinds.press}</option>
          </select>
        </div>
        <div>
          <label htmlFor="art-tag" className="label text-small">
            {dict.common.category}
          </label>
          <input
            id="art-tag"
            name="tag"
            defaultValue="Campaign"
            className="field min-h-10 text-small"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="art-excerpt-en" className="label text-small">
            {locale === "fr" ? "Résumé / contenu (anglais) *" : "Summary / content (English) *"}
          </label>
          <textarea
            id="art-excerpt-en"
            name="excerptEn"
            required
            minLength={15}
            rows={2}
            placeholder="Summary of the seminar, forum or publication."
            className="field min-h-[76px] text-small"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="art-excerpt-fr" className="label text-small">
            {locale === "fr" ? "Résumé / contenu (français)" : "Summary / content (French)"}
          </label>
          <textarea
            id="art-excerpt-fr"
            name="excerptFr"
            rows={2}
            placeholder="Résumé du séminaire, du forum ou de la publication."
            className="field min-h-[76px] text-small"
          />
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <button type="submit" disabled={pending} className="btn btn-primary btn-sm">
          {pending
            ? dict.common.sending
            : locale === "fr"
              ? "Publier l’article"
              : "Publish article"}
        </button>
        <ActionNotice state={state} />
      </div>
    </form>
  );
}

export function OrganisationSettingsForm({
  locale,
  dict,
  initial,
}: {
  locale: Locale;
  dict: Dictionary;
  initial: {
    email: string;
    phone: string;
    location: string;
    assistantEnabled: boolean;
  };
}) {
  const [state, action, pending] = useActionState(
    updateOrganisationSettings.bind(null, locale),
    initialFormState,
  );
  return (
    <form action={action} className="rounded-sm border border-line-200 bg-white p-5">
      <div className="flex items-center gap-2 text-caption font-bold uppercase tracking-label text-ink-900">
        <Settings size={16} className="text-blue-600" aria-hidden="true" />
        <span>{dict.admin.settings}</span>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div>
          <label htmlFor="org-email" className="label text-small">
            {dict.contact.emailLabel}
          </label>
          <input
            id="org-email"
            name="email"
            type="email"
            defaultValue={initial.email}
            className="field min-h-10 text-small"
          />
        </div>
        <div>
          <label htmlFor="org-phone" className="label text-small">
            {dict.contact.phoneLabel}
          </label>
          <input
            id="org-phone"
            name="phone"
            defaultValue={initial.phone}
            placeholder="+237 ..."
            className="field min-h-10 text-small"
          />
        </div>
        <div>
          <label htmlFor="org-location" className="label text-small">
            {dict.contact.locationLabel}
          </label>
          <input
            id="org-location"
            name="location"
            defaultValue={initial.location}
            className="field min-h-10 text-small"
          />
        </div>
      </div>
      <label className="mt-3 inline-flex items-center gap-2 text-small font-medium text-ink-900">
        <input
          type="checkbox"
          name="assistantEnabled"
          defaultChecked={initial.assistantEnabled}
          className="h-4 w-4"
        />
        <span>
          {locale === "fr"
            ? "Activer l’assistant IA GLOPROFAS sur le site public"
            : "Enable the GLOPROFAS AI Assistant on the public website"}
        </span>
      </label>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <button type="submit" disabled={pending} className="btn btn-primary btn-sm">
          {pending
            ? dict.common.sending
            : locale === "fr"
              ? "Enregistrer les paramètres"
              : "Save settings"}
        </button>
        <ActionNotice state={state} />
      </div>
    </form>
  );
}


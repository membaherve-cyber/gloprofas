"use client";

import { useActionState, useState } from "react";
import { AlertCircle, KeyRound, Lock } from "lucide-react";
import { adminLogin } from "@/actions/admin";
import { initialFormState } from "@/lib/form-state";
import { STAFF_CREDENTIALS } from "@/lib/admin-credentials";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/messages/en";

export function AdminLoginForm({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [state, action, pending] = useActionState(adminLogin.bind(null, locale), initialFormState);
  const [email, setEmail] = useState(STAFF_CREDENTIALS[0].email);
  const [password, setPassword] = useState(STAFF_CREDENTIALS[0].password);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
      <form action={action} className="grid gap-4 rounded-none border border-line-200 bg-white p-6 shadow-[var(--shadow-none)]">
        <div className="flex items-center gap-2 text-small font-semibold uppercase tracking-label text-blue-600">
          <Lock size={15} aria-hidden="true" />
          <span>{dict.admin.title}</span>
        </div>
        <h1 className="text-[1.75rem] text-ink-900">{dict.admin.loginTitle}</h1>
        <p className="text-base text-slate-600">{dict.admin.loginLead}</p>

        <div>
          <label htmlFor="admin-email" className="label">
            {dict.admin.email}
          </label>
          <input
            id="admin-email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="username"
            className="field"
          />
        </div>
        <div>
          <label htmlFor="admin-password" className="label">
            {dict.admin.password}
          </label>
          <input
            id="admin-password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            minLength={8}
            className="field"
          />
        </div>
        {state.status === "error" ? (
          <p className="error-text" role="alert">
            <AlertCircle size={14} aria-hidden="true" /> {state.message}
          </p>
        ) : null}
        <button type="submit" disabled={pending} className="btn btn-primary w-full">
          {pending ? dict.common.loading : dict.admin.signIn}
        </button>
      </form>

      <aside className="rounded-none border border-navy-900/15 bg-navy-900 p-6 text-white shadow-[var(--shadow-none)]">
        <div className="flex items-center gap-2 text-small font-bold uppercase tracking-label text-signal-400">
          <KeyRound size={16} aria-hidden="true" />
          <span>{locale === "fr" ? "Comptes administrateurs configurés" : "Configured Administrator Accounts"}</span>
        </div>
        <p className="mt-2 text-small leading-relaxed text-slate-300">
          {locale === "fr"
            ? "Sélectionnez un compte ci-dessous pour remplir automatiquement les identifiants et accéder au back-office :"
            : "Select an account below to auto-fill the credentials and sign in to the backoffice:"}
        </p>
        <div className="mt-4 space-y-3">
          {STAFF_CREDENTIALS.map((cred) => {
            const isSelected = email.toLowerCase() === cred.email.toLowerCase();
            return (
              <div
                key={cred.email}
                className={`rounded-sm border p-4 transition-colors ${
                  isSelected
                    ? "border-cyan-400 bg-navy-800"
                    : "border-white/12 bg-white/5 hover:border-white/25"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-body font-semibold text-white">{cred.name}</p>
                    <p className="text-micro font-semibold uppercase tracking-label text-cyan-400">
                      {locale === "fr" ? cred.roleLabelFr : cred.roleLabelEn}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setEmail(cred.email);
                      setPassword(cred.password);
                    }}
                    className="rounded-full bg-signal-400 px-3 py-1 text-caption font-bold text-navy-950 hover:bg-white transition-colors duration-fast ease-standard"
                  >
                    {locale === "fr" ? "Remplir" : "Use credentials"}
                  </button>
                </div>
                <dl className="mt-3 space-y-2 border-t border-white/10 pt-3 text-small">
                  <div className="flex items-center justify-between gap-2">
                    <dt className="text-slate-300">{dict.admin.email}:</dt>
                    <dd className="font-mono font-semibold text-white select-all">{cred.email}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <dt className="text-slate-300">{dict.admin.password}:</dt>
                    <dd className="font-mono font-semibold text-signal-400 select-all">{cred.password}</dd>
                  </div>
                </dl>
              </div>
            );
          })}
        </div>
      </aside>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { AlertCircle, KeyRound, Lock, ShieldCheck } from "lucide-react";
import { adminLogin } from "@/actions/admin";
import { initialFormState } from "@/lib/form-state";
import { STAFF_CREDENTIALS } from "@/lib/admin-credentials";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/messages/en";

export function FooterLogin({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [state, action, pending] = useActionState(adminLogin.bind(null, locale), initialFormState);
  const [email, setEmail] = useState(STAFF_CREDENTIALS[0].email);
  const [password, setPassword] = useState(STAFF_CREDENTIALS[0].password);

  return (
    <section aria-labelledby="footer-login-title" className="border-t border-white/10">
      <div className="container-page grid gap-6 py-10 lg:grid-cols-[0.9fr_1fr_1.1fr] lg:items-start">
        <div>
          <h2 id="footer-login-title" className="flex items-center gap-2 text-[1rem] font-semibold text-white">
            <Lock size={16} className="text-cyan-400" aria-hidden="true" /> {dict.footer.login.title}
          </h2>
          <p className="mt-2 max-w-sm text-[0.84rem] leading-relaxed text-slate-300">{dict.footer.login.body}</p>
          <p className="mt-3 inline-flex items-start gap-2 text-[0.75rem] leading-relaxed text-slate-300">
            <ShieldCheck size={14} className="mt-0.5 shrink-0 text-cyan-400" aria-hidden="true" />
            {dict.footer.login.secureNote}
          </p>
          <div className="mt-4">
            <Link
              href={`/${locale}/admin`}
              className="inline-flex items-center gap-1.5 text-[0.8rem] font-semibold text-cyan-400 hover:text-white"
            >
              {locale === "fr" ? "Ouvrir le back-office (tableau de bord) →" : "Open backoffice (admin dashboard) →"}
            </Link>
          </div>
        </div>

        <form action={action} className="on-dark grid gap-3 rounded-[var(--radius-md)] border border-white/10 bg-navy-900/70 p-4">
          <div>
            <label htmlFor="footer-login-email" className="mb-1 block text-[0.78rem] font-semibold text-white">
              {dict.admin.email}
            </label>
            <input
              id="footer-login-email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="username"
              placeholder="hervememba2@gmail.com"
              className="field min-h-11 border-white/15 bg-white/5 text-white placeholder:text-slate-300"
            />
          </div>
          <div>
            <label htmlFor="footer-login-password" className="mb-1 block text-[0.78rem] font-semibold text-white">
              {dict.admin.password}
            </label>
            <input
              id="footer-login-password"
              name="password"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              className="field min-h-11 border-white/15 bg-white/5 text-white"
            />
          </div>
          {state.status === "error" ? (
            <p className="inline-flex items-center gap-1.5 text-[0.78rem] font-semibold text-signal-400" role="alert">
              <AlertCircle size={14} aria-hidden="true" /> {state.message}
            </p>
          ) : null}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button type="submit" disabled={pending} className="btn btn-signal btn-sm">
              {pending ? dict.common.loading : dict.footer.login.submit}
            </button>
            <Link
              href={`/${locale}/admin/login`}
              className="text-[0.78rem] font-medium text-slate-300 underline underline-offset-4 hover:text-white"
            >
              {dict.admin.loginTitle}
            </Link>
          </div>
        </form>

        <aside className="rounded-[var(--radius-md)] border border-signal-400/40 bg-signal-400/10 p-4">
          <h3 className="flex items-center gap-2 text-[0.82rem] font-bold uppercase tracking-[0.1em] text-signal-400">
            <KeyRound size={14} aria-hidden="true" />
            {locale === "fr" ? "Identifiants administrateur (back-office)" : "Administrator login credentials"}
          </h3>
          <p className="mt-1.5 text-[0.76rem] leading-relaxed text-slate-200">
            {locale === "fr"
              ? "Cliquez sur un compte pour pré-remplir le formulaire de connexion :"
              : "Click an account below to pre-fill the sign-in form:"}
          </p>
          <div className="mt-3 space-y-2.5">
            {STAFF_CREDENTIALS.map((cred) => (
              <div
                key={cred.email}
                className="rounded-[var(--radius-sm)] border border-white/15 bg-navy-950/70 p-2.5 text-[0.78rem]"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-white">{cred.name}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setEmail(cred.email);
                      setPassword(cred.password);
                    }}
                    className="rounded-full bg-signal-400 px-2.5 py-0.5 text-[0.7rem] font-bold text-navy-950 hover:bg-white"
                  >
                    {locale === "fr" ? "Utiliser" : "Use account"}
                  </button>
                </div>
                <dl className="mt-1.5 space-y-1 text-[0.75rem]">
                  <div className="flex items-center justify-between gap-2">
                    <dt className="text-slate-300">{dict.footer.login.demoEmailLabel}:</dt>
                    <dd className="font-mono font-semibold text-cyan-400 select-all">{cred.email}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <dt className="text-slate-300">{dict.footer.login.demoPasswordLabel}:</dt>
                    <dd className="font-mono font-semibold text-white select-all">{cred.password}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

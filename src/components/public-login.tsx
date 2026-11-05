"use client";

import { useActionState } from "react";
import { loginAction, totpAction, type FormState } from "@/server/actions";
import { m } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

const initial: FormState = { ok: false };

const CREDENTIALS = [
  { email: "hervememba2@gmail.com", password: "Gloprofas#Herve2026" },
  { email: "ngwam2002@yahoo.com", password: "Gloprofas#Ngwa2026" },
];

export function PublicLogin({ locale, tone = "light" }: { locale: Locale; tone?: "light" | "dark" }) {
  const t = m(locale);
  const [state, action, pending] = useActionState(loginAction, initial);
  const [totpState, totpForm, totpPending] = useActionState(totpAction, initial);
  const dark = tone === "dark";
  return (
    <div className="login-split">
      <form action={state.error === "totp" ? totpForm : action} className="card" style={{ display: "grid", gap: 12 }}>
        <h2 style={{ fontSize: "1.6rem" }}>{t.loginTitle}</h2>
        <p className="muted">{t.loginLead}</p>
        {state.error === "totp" ? (
          <div className="field">
            <label htmlFor={`totp-${tone}`}>Authenticator code</label>
            <input id={`totp-${tone}`} name="code" inputMode="numeric" autoComplete="one-time-code" required />
          </div>
        ) : (
          <>
            <div className="field">
              <label htmlFor={`email-${tone}`}>{t.newsletterEmail}</label>
              <input id={`email-${tone}`} name="email" type="email" autoComplete="username" required />
            </div>
            <div className="field">
              <label htmlFor={`password-${tone}`}>Password</label>
              <input id={`password-${tone}`} name="password" type="password" autoComplete="current-password" required />
            </div>
          </>
        )}
        {state.error && state.error !== "totp" ? <p className="error" role="alert">{locale === "fr" ? "Connexion refusée. Vérifiez les identifiants." : "Login failed. Check the credentials."}</p> : null}
        {totpState.error ? <p className="error" role="alert">{t.forms.invalid}</p> : null}
        <button className="btn" type="submit" disabled={pending || totpPending}>{t.login}</button>
      </form>
      <aside className={dark ? "cred-card" : "card"} style={dark ? undefined : { borderColor: "#ffb02e" }}>
        <p className="eyebrow">{t.loginSide}</p>
        <p className={dark ? "fine" : "help"}>{t.loginHint}</p>
        {CREDENTIALS.map((item) => (
          <p key={item.email}><strong>{item.email}</strong><code>{item.password}</code></p>
        ))}
      </aside>
    </div>
  );
}

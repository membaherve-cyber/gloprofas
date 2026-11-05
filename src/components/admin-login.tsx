"use client";

import { useActionState } from "react";
import type { FormState } from "@/server/actions";

const initial: FormState = { ok: false };

export function LoginForm({
  login,
  totp,
}: {
  login: (state: FormState, form: FormData) => Promise<FormState>;
  totp: (state: FormState, form: FormData) => Promise<FormState>;
}) {
  const [state, action, pending] = useActionState(login, initial);
  const [totpState, totpAction, totpPending] = useActionState(totp, initial);
  if (state.error === "totp") {
    return (
      <form action={totpAction} className="card" style={{ width: minWidth(), display: "grid", gap: 12 }}>
        <h2>Two-factor code</h2>
        <div className="field"><label htmlFor="code">Authenticator code</label><input id="code" name="code" inputMode="numeric" autoComplete="one-time-code" required /></div>
        {totpState.error ? <p className="error">Code not accepted.</p> : null}
        <button className="btn" disabled={totpPending} type="submit">Continue</button>
      </form>
    );
  }
  return (
    <form action={action} className="card" style={{ width: minWidth(), display: "grid", gap: 12 }}>
      <h2>Login</h2>
      <div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="username" required /></div>
      <div className="field"><label htmlFor="password">Password</label><input id="password" name="password" type="password" autoComplete="current-password" required /></div>
      {state.error && state.error !== "totp" ? <p className="error" role="alert">Login failed. Check the details or wait if the account is temporarily locked.</p> : null}
      <button className="btn" type="submit" disabled={pending}>Login</button>
    </form>
  );
}

function minWidth() {
  return "min(420px, 100%)";
}

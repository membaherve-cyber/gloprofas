import { loginAction, totpAction } from "@/server/actions";
import { Logo } from "@/components/ui";
import { LoginForm } from "@/components/admin-login";

export const metadata = { title: "Staff login", robots: { index: false, follow: false } };

const CREDENTIALS = [
  { email: "hervememba2@gmail.com", password: "Gloprofas#Herve2026" },
  { email: "ngwam2002@yahoo.com", password: "Gloprofas#Ngwa2026" },
];

export default function LoginPage() {
  return (
    <div className="login-shell">
      <section className="login-side">
        <Logo size="lg" />
        <div>
          <p className="eyebrow">Staff only</p>
          <h1 style={{ fontSize: "3rem" }}>The back office is quiet on purpose.</h1>
          <p>Reports, alerts and settings. No public link except this login.</p>
        </div>
        <div style={{ display: "grid", gap: 10 }}>
          {CREDENTIALS.map((item) => (
            <p className="fine" key={item.email}>
              <code>{item.email}</code><br />
              <code>{item.password}</code>
            </p>
          ))}
          <p className="fine">Demo credentials, change before a real launch.</p>
        </div>
      </section>
      <section className="section" style={{ display: "grid", placeItems: "center" }}>
        <LoginForm login={loginAction} totp={totpAction} />
      </section>
    </div>
  );
}

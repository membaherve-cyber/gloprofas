import Link from "next/link";
import { Logo } from "@/components/ui";
import { PublicLogin } from "@/components/public-login";
import { m } from "@/lib/i18n";
import { pathFor } from "@/lib/paths";
import type { Locale, WebsiteSettings } from "@/lib/types";

export function Footer({ locale, settings }: { locale: Locale; settings: WebsiteSettings | null }) {
  const t = m(locale);
  const other = locale === "en" ? "fr" : "en";
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Logo size="md" />
          <p className="fine">{t.footerBlurb}</p>
          <p className="fine">{t.footerDisclaimer}</p>
        </div>
        <div>
          <h3>{t.footerQuick}</h3>
          <ul>
            <li><Link href={pathFor(locale, "about", locale === "fr" ? "qui-nous-sommes" : "who-we-are")}>{t.nav.about}</Link></li>
            <li><Link href={pathFor(locale, "awareness")}>{t.nav.awareness}</Link></li>
            <li><Link href={pathFor(locale, "alerts")}>{t.alertsTitle}</Link></li>
            <li><Link href={pathFor(locale, "report")}>{t.reportCta}</Link></li>
          </ul>
        </div>
        <div>
          <h3>{t.footerResources}</h3>
          <ul>
            <li><Link href={pathFor(locale, "resources")}>{t.nav.resources}</Link></li>
            <li><Link href={pathFor(locale, "support")}>{t.support.eyebrow}</Link></li>
            <li><Link href={pathFor(locale, "services")}>{t.nav.services}</Link></li>
            <li><Link href={pathFor(locale, "news")}>{t.nav.news}</Link></li>
            <li><Link href={pathFor(locale, "search")}>{t.search}</Link></li>
          </ul>
        </div>
        <div>
          <h3>{t.footerContact}</h3>
          <ul>
            {settings?.emailPublic && settings.email ? <li><a href={`mailto:${settings.email}`}>{settings.email}</a></li> : null}
            {settings?.phonePublic && settings.phone ? <li>{settings.phone}</li> : null}
            {settings?.locationPublic && settings.location ? <li>{settings.location}</li> : null}
            {!settings?.emailPublic && !settings?.phonePublic ? <li className="fine">{t.contactPending}</li> : null}
            <li><Link href={pathFor(locale, "contact")}>{t.nav.contact}</Link></li>
            <li><Link href={locale === "en" ? "/fr" : "/en"}>{other.toUpperCase()}</Link></li>
          </ul>
        </div>
      </div>
      <div className="container" style={{ marginTop: 28 }}>
        <h2 style={{ color: "white", fontSize: "1.8rem" }}>{t.loginTitle}</h2>
        <p className="fine">{t.loginLead}</p>
        <div style={{ marginTop: 16 }}>
          <PublicLogin locale={locale} tone="dark" />
        </div>
      </div>
      <div className="container legal-row">
        <Link href={pathFor(locale, "legal", locale === "fr" ? "confidentialite" : "privacy")}>{locale === "fr" ? "Confidentialité" : "Privacy"}</Link>
        <Link href={pathFor(locale, "legal", locale === "fr" ? "conditions" : "terms")}>{locale === "fr" ? "Conditions" : "Terms"}</Link>
        <Link href={pathFor(locale, "legal", "cookies")}>Cookies</Link>
        <Link href={pathFor(locale, "legal", locale === "fr" ? "avertissement" : "disclaimer")}>{locale === "fr" ? "Avertissement" : "Disclaimer"}</Link>
        <span>© {new Date().getUTCFullYear()} {t.footerRights}</span>
      </div>
    </footer>
  );
}

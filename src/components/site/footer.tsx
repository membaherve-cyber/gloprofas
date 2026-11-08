import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { L, NAV_ITEMS, R } from "@/components/zite/copy";
import { FooterLogin } from "./footer-login";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/messages/en";
import type { SiteSettings } from "@/lib/queries";

const LEGAL_LINKS = [
  { slug: "privacy", en: "Privacy Policy", fr: "Confidentialité" },
  { slug: "terms", en: "Terms of Use", fr: "Conditions d’utilisation" },
  { slug: "cookies", en: "Cookies", fr: "Cookies" },
] as const;

export function SiteFooter({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
  settings?: SiteSettings;
}) {
  const l = (path = "") => `/${locale}${path}`;

  return (
    <footer className="on-dark bg-navy-950 pt-20 pb-10 text-slatex-300">
      <div className="container-g grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-5 max-w-sm">{R(L.footer.desc, locale)}</p>
        </div>

        <nav aria-label={R(L.footer.quick, locale)} className="md:col-span-3">
          <h2 className="ed-label text-white">{R(L.footer.quick, locale)}</h2>
          <ul className="mt-5 space-y-2.5 text-base">
            {NAV_ITEMS.slice(0, 6).map((item) => (
              <li key={item.key}>
                <Link href={l(item.href)} className="ed-link hover:text-white">
                  {R(L.nav[item.key], locale)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="ed-label text-white">{R(L.footer.contactTitle, locale)}</h2>
          <p className="mt-5">{R(L.footer.contactPending, locale)}</p>
          <ul className="mt-5 space-y-2.5 text-base">
            <li>
              <Link href={l("/contact")} className="font-semibold text-white hover:text-cyanx">
                {R(L.nav.contact, locale)} →
              </Link>
            </li>
            <li>
              <Link href={l("/report")} className="ed-link hover:text-white">
                {R(L.report, locale)}
              </Link>
            </li>
            <li>
              <Link href={l("/check")} className="ed-link hover:text-white">
                {locale === "fr" ? "Vérifier un numéro ou un lien" : "Check a number or link"}
              </Link>
            </li>
            <li>
              <Link href={l("/alerts")} className="ed-link hover:text-white">
                {locale === "fr" ? "Alertes" : "Scam alerts"}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-14">
        <FooterLogin locale={locale} dict={dict} />
      </div>

      <div className="container-g mt-10 border-t border-white/10 pt-8 text-sm">
        <p className="max-w-4xl">{R(L.footer.disclaimer, locale)}</p>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} GLOPROFAS — {R(L.footer.rights, locale)}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {LEGAL_LINKS.map((item) => (
              <li key={item.slug}>
                <Link href={l(`/legal/${item.slug}`)} className="ed-link hover:text-white">
                  {item[locale]}
                </Link>
              </li>
            ))}
            <li>
              <Link href={`/${locale}/admin`} className="font-semibold text-white hover:underline">
                {locale === "fr" ? "Connexion équipe" : "Team log in"}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, FileText, Inbox, LayoutDashboard, LogOut, Settings, ShieldAlert } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { adminLogout } from "@/actions/admin";
import { getDictionary, isLocale, otherLocale, routes, type Locale } from "@/lib/i18n";
import { Logo } from "@/components/ui/logo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "GLOPROFAS administration",
  robots: { index: false, follow: false, nocache: true },
};

export default async function AdminLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDictionary(locale);
  const user = await getCurrentUser();
  const altLocale = otherLocale(locale);

  const modules = [
    { label: dict.admin.dashboard, href: routes.admin(locale), Icon: LayoutDashboard },
    { label: dict.admin.reports, href: `${routes.admin(locale)}/reports`, Icon: ShieldAlert },
    { label: dict.admin.messages, href: `${routes.admin(locale)}/messages`, Icon: Inbox },
    {
      label: locale === "fr" ? "Alertes & Contenus" : "Alerts & Content",
      href: `${routes.admin(locale)}#content-publisher`,
      Icon: FileText,
    },
    {
      label: dict.admin.settings,
      href: `${routes.admin(locale)}#settings-panel`,
      Icon: Settings,
    },
  ];

  return (
    <div className="min-h-screen bg-mist-50">
      <header className="border-b border-white/10 bg-navy-900">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-4">
            <Link href={routes.admin(locale)} aria-label="GLOPROFAS Backoffice">
              <Logo variant="light" />
            </Link>
            <span className="hidden rounded-full border border-cyan-400/40 bg-cyan-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-cyan-400 md:inline-block">
              {locale === "fr" ? "Back-office" : "Backoffice"}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 text-[0.8rem] text-slate-300">
            <Link
              href={routes.home(locale)}
              className="btn btn-signal btn-sm"
            >
              <ArrowLeft size={15} aria-hidden="true" />
              <span>
                {locale === "fr"
                  ? "Retourner à l’accueil du site"
                  : "Return to website frontpage"}
              </span>
            </Link>

            <Link
              href={routes.admin(altLocale)}
              className="inline-flex h-10 items-center rounded-full border border-white/20 px-3 text-[0.75rem] font-bold uppercase text-white hover:border-cyan-400"
            >
              {altLocale.toUpperCase()}
            </Link>

            {user ? (
              <>
                <span className="hidden rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[0.76rem] text-white lg:inline-block">
                  {user.name} ({user.email})
                </span>
                <form action={adminLogout.bind(null, locale)}>
                  <button
                    type="submit"
                    className="inline-flex h-10 items-center gap-1.5 rounded-full border border-white/20 px-3.5 text-[0.78rem] font-semibold text-white hover:border-risk-critical hover:bg-risk-critical/20"
                  >
                    <LogOut size={14} aria-hidden="true" />
                    {dict.admin.signOut}
                  </button>
                </form>
              </>
            ) : null}
          </div>
        </div>
      </header>

      {user ? (
        <nav aria-label={dict.admin.title} className="border-b border-line-200 bg-white shadow-xs">
          <ul className="mx-auto flex max-w-7xl flex-wrap items-center gap-1 px-4 py-2 sm:px-6">
            {modules.map(({ label, href, Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[0.82rem] font-semibold text-slate-600 transition-colors hover:bg-mist-50 hover:text-blue-600"
                >
                  <Icon size={15} aria-hidden="true" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}

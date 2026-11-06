import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  ArrowUpRight,
  Bell,
  BookOpen,
  Briefcase,
  CheckCircle2,
  FileText,
  Globe,
  Inbox,
  ShieldAlert,
  Users,
} from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { getAdminDashboard } from "@/lib/queries";
import { getDictionary, isLocale, pick, routes, type Locale } from "@/lib/i18n";
import { formatDate } from "@/lib/format";
import { RiskBadge } from "@/components/ui";
import {
  GitHubPushPanel,
  InlineReportStatusForm,
  OrganisationSettingsForm,
  QuickPublishAlertForm,
  QuickPublishArticleForm,
} from "@/components/admin/dashboard-managers";

export default async function AdminDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDictionary(locale);
  const user = await getCurrentUser();
  if (!user) redirect(`${routes.admin(locale)}/login`);

  const {
    stats,
    recentReports,
    recentAlerts,
    recentArticles,
    recentMessages,
    recentEnquiries,
    staffUsers,
    recentLogs,
    siteSettings,
  } = await getAdminDashboard();

  const kpiCards = [
    {
      label: dict.admin.reports,
      value: stats.reports,
      sub: `${stats.newReports} ${dict.admin.new.toLowerCase()}`,
      href: `${routes.admin(locale)}/reports`,
      tone: "text-risk-critical",
    },
    {
      label: dict.admin.underReview,
      value: stats.underReviewReports,
      sub: locale === "fr" ? "Dossiers actifs" : "Active cases",
      href: `${routes.admin(locale)}/reports`,
      tone: "text-risk-high",
    },
    {
      label: dict.alerts.h1,
      value: stats.alerts,
      sub: locale === "fr" ? "Publiées sur le site" : "Published on site",
      href: routes.alerts(locale),
      tone: "text-blue-600",
    },
    {
      label: dict.nav.awareness,
      value: stats.categories,
      sub: locale === "fr" ? "Fiches bilingues" : "Bilingual guides",
      href: routes.scams(locale),
      tone: "text-blue-600",
    },
    {
      label: dict.news.h1,
      value: stats.articles,
      sub: locale === "fr" ? "Articles & campagnes" : "Articles & campaigns",
      href: routes.news(locale),
      tone: "text-blue-600",
    },
    {
      label: dict.nav.resources,
      value: stats.resources,
      sub: locale === "fr" ? "Guides & listes" : "Guides & checklists",
      href: routes.resources(locale),
      tone: "text-blue-600",
    },
    {
      label: dict.nav.services,
      value: stats.services,
      sub: locale === "fr" ? "Offres configurées" : "Configured services",
      href: routes.services(locale),
      tone: "text-ink-900",
    },
    {
      label: dict.admin.enquiries,
      value: stats.enquiries,
      sub: locale === "fr" ? "Demandes de service" : "Service requests",
      href: `${routes.admin(locale)}/messages`,
      tone: "text-ink-900",
    },
    {
      label: dict.admin.messages,
      value: stats.messages,
      sub: locale === "fr" ? "Formulaire contact" : "Contact form",
      href: `${routes.admin(locale)}/messages`,
      tone: "text-ink-900",
    },
    {
      label: dict.admin.subscribers,
      value: stats.subscribers,
      sub: locale === "fr" ? "Infolettre mensuelle" : "Monthly briefing",
      href: `${routes.admin(locale)}/messages`,
      tone: "text-risk-low",
    },
    {
      label: dict.admin.volunteers,
      value: stats.volunteers,
      sub: locale === "fr" ? "Candidatures" : "Applications",
      href: `${routes.admin(locale)}/messages`,
      tone: "text-ink-900",
    },
    {
      label: dict.admin.partnerships,
      value: stats.partnerships,
      sub: locale === "fr" ? "Propositions" : "Proposals",
      href: `${routes.admin(locale)}/messages`,
      tone: "text-ink-900",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner with Return to Website Frontpage button */}
      <section className="rounded-none border border-navy-900/15 bg-navy-900 p-6 text-white shadow-[var(--shadow-none)]">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div>
            <p className="text-[0.75rem] font-bold uppercase tracking-[0.14em] text-cyan-400">
              {dict.admin.title}
            </p>
            <h1 className="mt-1 text-[1.75rem] text-white sm:text-[2rem]">
              {dict.admin.dashboard}
            </h1>
            <p className="mt-1.5 max-w-2xl text-[0.9rem] text-slate-300">
              {dict.admin.dashboardIntro}{" "}
              {locale === "fr"
                ? `Connecté en tant que ${user.name} (${user.email}).`
                : `Signed in as ${user.name} (${user.email}).`}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link href={routes.home(locale)} className="btn btn-signal btn-sm">
              <ArrowLeft size={16} aria-hidden="true" />
              <span>
                {locale === "fr"
                  ? "Retourner à l’accueil du site"
                  : "Return to website frontpage"}
              </span>
            </Link>
            <Link href={`${routes.admin(locale)}/reports`} className="btn btn-primary btn-sm">
              <ShieldAlert size={16} aria-hidden="true" />
              <span>{dict.admin.reports}</span>
            </Link>
            <Link href={`${routes.admin(locale)}/messages`} className="btn btn-outline btn-sm text-white">
              <Inbox size={16} aria-hidden="true" />
              <span>{dict.admin.messages}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 1-Click GitHub Push to membaherve-cyber/gloprofas */}
      <GitHubPushPanel locale={locale} />

      {/* 12 Live KPI Cards */}
      <section aria-label="Key metrics">
        <dl className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {kpiCards.map((card) => (
            <Link
              key={card.label}
              href={card.href}
              className="group rounded-sm border border-line-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-blue-600/50 hover:shadow-[var(--shadow-e1)]"
            >
              <div className="flex items-start justify-between gap-2">
                <dt className="text-xs font-bold uppercase tracking-[0.08em] text-slate-600">
                  {card.label}
                </dt>
                <ArrowUpRight
                  size={15}
                  className="text-slate-600 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-600 group-hover:opacity-100"
                  aria-hidden="true"
                />
              </div>
              <dd className={`mt-2 font-[family-name:var(--font-heading)] text-[1.85rem] font-bold leading-none ${card.tone}`}>
                {card.value}
              </dd>
              <p className="mt-1.5 text-[0.76rem] text-slate-600">{card.sub}</p>
            </Link>
          ))}
        </dl>
      </section>

      {/* Scam Reports Table with Inline Status Control */}
      <section className="overflow-hidden rounded-sm border border-line-200 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line-200 px-5 py-4">
          <div>
            <h2 className="flex items-center gap-2 text-[1.1rem] font-semibold text-ink-900">
              <ShieldAlert size={18} className="text-risk-critical" aria-hidden="true" />
              {dict.admin.reports} — {dict.admin.recent}
            </h2>
            <p className="text-[0.8rem] text-slate-600">
              {locale === "fr"
                ? "Examinez les signalements reçus et mettez à jour leur statut directement."
                : "Review incoming scam reports and update their workflow status inline."}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link href={routes.report(locale)} className="btn btn-outline btn-sm">
              {locale === "fr" ? "Formulaire public" : "Public report wizard"}
            </Link>
            <Link href={`${routes.admin(locale)}/reports`} className="btn btn-primary btn-sm">
              {locale === "fr" ? "Tous les signalements" : "Manage all reports"}
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table-dense w-full min-w-[740px]">
            <thead>
              <tr>
                <th scope="col">{dict.admin.reference}</th>
                <th scope="col">{dict.common.category}</th>
                <th scope="col">{dict.common.country}</th>
                <th scope="col">{dict.common.email}</th>
                <th scope="col">{dict.admin.status}</th>
                <th scope="col">{dict.common.date}</th>
              </tr>
            </thead>
            <tbody>
              {recentReports.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-600">
                    {dict.admin.noRecords}
                  </td>
                </tr>
              ) : (
                recentReports.map((report) => (
                  <tr key={report.id}>
                    <td>
                      <Link
                        href={`${routes.admin(locale)}/reports?ref=${report.reference}`}
                        className="font-mono text-[0.82rem] font-bold text-blue-600 hover:underline"
                      >
                        {report.reference}
                      </Link>
                    </td>
                    <td>{report.categorySlug}</td>
                    <td>{report.country}</td>
                    <td className="text-[0.82rem] text-slate-600">{report.reporterEmail}</td>
                    <td>
                      <InlineReportStatusForm
                        locale={locale}
                        reportId={report.id}
                        currentStatus={report.status}
                      />
                    </td>
                    <td className="whitespace-nowrap text-[0.82rem] text-slate-600">
                      {formatDate(report.createdAt, locale)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Content Publishing Center: Alerts & News/Campaigns */}
      <section id="content-publisher" className="space-y-4">
        <div>
          <h2 className="text-[1.25rem] font-semibold text-ink-900">
            {locale === "fr"
              ? "Publication rapide : alertes, campagnes et articles"
              : "Quick publishing: scam alerts, campaigns and articles"}
          </h2>
          <p className="text-[0.85rem] text-slate-600">
            {locale === "fr"
              ? "Publiez immédiatement une alerte ou un compte-rendu de séminaire/campagne en anglais et en français."
              : "Immediately publish a new public scam alert or campaign/seminar article in English and French."}
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <QuickPublishAlertForm locale={locale} dict={dict} />
          <QuickPublishArticleForm locale={locale} dict={dict} />
        </div>
      </section>

      {/* Published Alerts & Published Articles Overview */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="overflow-hidden rounded-sm border border-line-200 bg-white">
          <div className="flex items-center justify-between border-b border-line-200 px-5 py-3.5">
            <h2 className="flex items-center gap-2 text-[1rem] font-semibold text-ink-900">
              <Bell size={16} className="text-risk-high" aria-hidden="true" />
              {dict.alerts.h1} ({stats.alerts})
            </h2>
            <Link href={routes.alerts(locale)} className="text-[0.8rem] font-semibold text-blue-600 hover:underline">
              {dict.nav.viewAll} →
            </Link>
          </div>
          <div className="divide-y divide-line-200">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start justify-between gap-3 px-5 py-3.5">
                <div className="min-w-0">
                  <Link
                    href={routes.alert(locale, pick(locale, alert.slugEn, alert.slugFr))}
                    className="font-semibold text-[0.9rem] text-ink-900 hover:text-blue-600"
                  >
                    {pick(locale, alert.titleEn, alert.titleFr)}
                  </Link>
                  <p className="mt-0.5 text-[0.76rem] text-slate-600">
                    {alert.country} · {formatDate(alert.publishedAt, locale)}
                  </p>
                </div>
                <div className="shrink-0">
                  <RiskBadge level={alert.riskLevel} dict={dict} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="overflow-hidden rounded-sm border border-line-200 bg-white">
          <div className="flex items-center justify-between border-b border-line-200 px-5 py-3.5">
            <h2 className="flex items-center gap-2 text-[1rem] font-semibold text-ink-900">
              <FileText size={16} className="text-blue-600" aria-hidden="true" />
              {dict.news.h1} ({stats.articles})
            </h2>
            <Link href={routes.news(locale)} className="text-[0.8rem] font-semibold text-blue-600 hover:underline">
              {dict.nav.viewAll} →
            </Link>
          </div>
          <div className="divide-y divide-line-200">
            {recentArticles.map((article) => (
              <div key={article.id} className="flex items-start justify-between gap-3 px-5 py-3.5">
                <div className="min-w-0">
                  <Link
                    href={routes.article(locale, pick(locale, article.slugEn, article.slugFr))}
                    className="font-semibold text-[0.9rem] text-ink-900 hover:text-blue-600"
                  >
                    {pick(locale, article.titleEn, article.titleFr)}
                  </Link>
                  <p className="mt-0.5 text-[0.76rem] text-slate-600">
                    {article.authorName} · {formatDate(article.publishedAt, locale)}
                  </p>
                </div>
                <span className="chip shrink-0">{article.tag}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Contact Messages & Service Enquiries */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="overflow-hidden rounded-sm border border-line-200 bg-white">
          <div className="flex items-center justify-between border-b border-line-200 px-5 py-3.5">
            <h2 className="flex items-center gap-2 text-[1rem] font-semibold text-ink-900">
              <Inbox size={16} className="text-blue-600" aria-hidden="true" />
              {dict.admin.messages} ({stats.messages})
            </h2>
            <Link href={`${routes.admin(locale)}/messages`} className="text-[0.8rem] font-semibold text-blue-600 hover:underline">
              {dict.nav.viewAll} →
            </Link>
          </div>
          <div className="divide-y divide-line-200">
            {recentMessages.length === 0 ? (
              <p className="px-5 py-6 text-center text-[0.85rem] text-slate-600">{dict.admin.noRecords}</p>
            ) : (
              recentMessages.map((msg) => (
                <div key={msg.id} className="px-5 py-3.5 text-[0.85rem]">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-ink-900">
                      {msg.name} ({msg.email})
                    </span>
                    <span className="chip">{msg.category}</span>
                  </div>
                  <p className="mt-1 font-medium text-ink-900">{msg.subject}</p>
                  <p className="mt-0.5 line-clamp-2 text-[0.8rem] text-slate-600">{msg.message}</p>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="overflow-hidden rounded-sm border border-line-200 bg-white">
          <div className="flex items-center justify-between border-b border-line-200 px-5 py-3.5">
            <h2 className="flex items-center gap-2 text-[1rem] font-semibold text-ink-900">
              <Briefcase size={16} className="text-blue-600" aria-hidden="true" />
              {dict.admin.enquiries} ({stats.enquiries})
            </h2>
            <Link href={`${routes.admin(locale)}/messages`} className="text-[0.8rem] font-semibold text-blue-600 hover:underline">
              {dict.nav.viewAll} →
            </Link>
          </div>
          <div className="divide-y divide-line-200">
            {recentEnquiries.length === 0 ? (
              <p className="px-5 py-6 text-center text-[0.85rem] text-slate-600">{dict.admin.noRecords}</p>
            ) : (
              recentEnquiries.map((enq) => (
                <div key={enq.id} className="px-5 py-3.5 text-[0.85rem]">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-ink-900">
                      {enq.name} {enq.organisation ? `· ${enq.organisation}` : ""}
                    </span>
                    <span className="chip">{enq.status}</span>
                  </div>
                  <p className="mt-0.5 text-[0.8rem] text-slate-600">
                    {enq.email} · {enq.country}
                  </p>
                  <p className="mt-1 line-clamp-2 text-[0.8rem] text-slate-600">{enq.requirements}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {/* Settings, Staff Accounts & Activity Logs */}
      <section id="settings-panel" className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <OrganisationSettingsForm
            locale={locale}
            dict={dict}
            initial={{
              email: siteSettings.organisation.email,
              phone: siteSettings.organisation.phone,
              location: siteSettings.organisation.location,
              assistantEnabled: siteSettings.assistant.enabled,
            }}
          />

          <GitHubPushPanel locale={locale} />

          <div className="overflow-hidden rounded-sm border border-line-200 bg-white">
            <div className="border-b border-line-200 px-5 py-3.5">
              <h2 className="flex items-center gap-2 text-[1rem] font-semibold text-ink-900">
                <Users size={16} className="text-blue-600" aria-hidden="true" />
                {locale === "fr" ? "Comptes administrateurs autorisés" : "Authorised Administrator Accounts"}
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="table-dense w-full">
                <thead>
                  <tr>
                    <th scope="col">{dict.common.name}</th>
                    <th scope="col">{dict.common.email}</th>
                    <th scope="col">Role</th>
                    <th scope="col">{dict.admin.status}</th>
                  </tr>
                </thead>
                <tbody>
                  {staffUsers.map((staff) => (
                    <tr key={staff.id}>
                      <td className="font-semibold text-ink-900">{staff.name}</td>
                      <td className="font-mono text-[0.82rem] text-blue-600">{staff.email}</td>
                      <td>
                        <span className="chip">{staff.role}</span>
                      </td>
                      <td>
                        <span className="inline-flex items-center gap-1 text-[0.78rem] font-semibold text-risk-low">
                          <CheckCircle2 size={13} aria-hidden="true" />
                          {staff.isActive ? "Active" : "Disabled"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-sm border border-line-200 bg-white">
          <div className="border-b border-line-200 px-5 py-3.5">
            <h2 className="flex items-center gap-2 text-[1rem] font-semibold text-ink-900">
              <Activity size={16} className="text-blue-600" aria-hidden="true" />
              {locale === "fr" ? "Journal d’activité et de sécurité" : "Security & Activity Audit Log"}
            </h2>
          </div>
          <div className="divide-y divide-line-200">
            {recentLogs.length === 0 ? (
              <p className="px-5 py-6 text-center text-[0.85rem] text-slate-600">{dict.admin.noRecords}</p>
            ) : (
              recentLogs.map((log) => (
                <div key={log.id} className="flex items-start justify-between gap-3 px-5 py-3 text-[0.82rem]">
                  <div>
                    <p className="font-semibold text-ink-900">
                      <span className="font-mono text-blue-600">{log.action}</span> · {log.entity}
                      {log.entityId ? ` (#${log.entityId})` : ""}
                    </p>
                    <p className="text-[0.76rem] text-slate-600">{log.actor}</p>
                  </div>
                  <time className="shrink-0 text-[0.75rem] text-slate-600">
                    {formatDate(log.createdAt, locale)}
                  </time>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Bottom Return to Frontpage bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-sm border border-line-200 bg-white p-5">
        <div className="flex items-center gap-3 text-[0.88rem] text-slate-600">
          <Globe size={18} className="text-blue-600" aria-hidden="true" />
          <span>
            {locale === "fr"
              ? "Vous consultez le back-office d’administration GLOPROFAS."
              : "You are viewing the GLOPROFAS administration backoffice."}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <Link href={routes.campaigns(locale)} className="btn btn-outline btn-sm">
            <BookOpen size={15} aria-hidden="true" />
            <span>{dict.nav.campaigns}</span>
          </Link>
          <Link href={routes.home(locale)} className="btn btn-signal btn-sm">
            <ArrowLeft size={15} aria-hidden="true" />
            <span>
              {locale === "fr"
                ? "Retourner à l’accueil du site"
                : "Return to website frontpage"}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

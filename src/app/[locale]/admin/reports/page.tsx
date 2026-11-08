import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { desc, eq } from "drizzle-orm";
import { db, hasDatabase } from "@/db";
import { scamReportNotes, scamReports, type ScamReport } from "@/db/schema";
import { can, getCurrentUser } from "@/lib/auth";
import { getDictionary, isLocale, routes, type Locale } from "@/lib/i18n";
import { formatDate } from "@/lib/format";
import { ReportControls } from "@/components/admin/report-controls";
export const metadata = {
  title: "Scam reports",
  robots: { index: false, follow: false, nocache: true },
};


export default async function AdminReportsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ ref?: string }>;
}) {
  const { locale: raw } = await params;
  const { ref } = await searchParams;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDictionary(locale);
  const user = await getCurrentUser();
  if (!user) redirect(`${routes.admin(locale)}/login`);
  if (!can(user, "reports:read")) {
    return <p className="rounded-sm border border-risk-critical/40 bg-white p-5 text-base">{dict.admin.accessDenied}</p>;
  }

  const reports: ScamReport[] = hasDatabase
    ? await db
        .select()
        .from(scamReports)
        .orderBy(desc(scamReports.createdAt))
        .limit(50)
        .catch(() => [])
    : [];
  const selected = ref ? reports.find((report) => report.reference === ref) : reports[0];
  const notes =
    selected && hasDatabase
      ? await db
          .select()
          .from(scamReportNotes)
          .where(eq(scamReportNotes.reportId, selected.id))
          .orderBy(desc(scamReportNotes.createdAt))
          .catch(() => [])
      : [];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-[1.75rem]">{dict.admin.reports}</h1>
          <p className="mt-1 text-small text-slate-600">
            {reports.length} {dict.common.results}. {dict.admin.dashboardIntro}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link href={routes.admin(locale)} className="btn btn-outline btn-sm">
            {dict.admin.dashboard}
          </Link>
          <Link href={routes.home(locale)} className="btn btn-signal btn-sm">
            <ArrowLeft size={15} aria-hidden="true" />
            {locale === "fr" ? "Retourner à l’accueil du site" : "Return to website frontpage"}
          </Link>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="overflow-hidden rounded-sm border border-line-200 bg-white">
          <div className="overflow-x-auto">
            <table className="table-dense w-full min-w-[520px]">
              <thead>
                <tr>
                  <th scope="col">{dict.admin.reference}</th>
                  <th scope="col">{dict.admin.status}</th>
                  <th scope="col">{dict.common.date}</th>
                </tr>
              </thead>
              <tbody>
                {reports.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center text-slate-600">
                      {dict.admin.noRecords}
                    </td>
                  </tr>
                ) : (
                  reports.map((report) => (
                    <tr key={report.id}>
                      <td>
                        <a href={`?ref=${report.reference}`} className="font-mono text-small font-semibold text-blue-600">
                          {report.reference}
                        </a>
                      </td>
                      <td>
                        <span className="chip">{report.status}</span>
                      </td>
                      <td>{formatDate(report.createdAt, locale)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {selected ? (
          <div className="space-y-4">
            <div className="rounded-sm border border-line-200 bg-white p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-mono text-body font-bold">{selected.reference}</h2>
                <span className="chip">{selected.status}</span>
              </div>
              <dl className="mt-3 grid gap-2 text-small sm:grid-cols-2">
                <div>
                  <dt className="text-slate-600">{dict.common.category}</dt>
                  <dd className="font-medium">{selected.categorySlug}</dd>
                </div>
                <div>
                  <dt className="text-slate-600">{dict.common.country}</dt>
                  <dd className="font-medium">{selected.country}</dd>
                </div>
                <div>
                  <dt className="text-slate-600">{dict.common.date}</dt>
                  <dd className="font-medium">{formatDate(selected.createdAt, locale)}</dd>
                </div>
                <div>
                  <dt className="text-slate-600">{dict.common.email}</dt>
                  <dd className="font-medium break-all">{selected.reporterEmail}</dd>
                </div>
              </dl>
              <p className="mt-3 whitespace-pre-line rounded-[10px] bg-mist-50 p-3 text-small leading-relaxed text-slate-600">
                {selected.description}
              </p>
            </div>
            {can(user, "reports:write") ? (
              <ReportControls locale={locale} dict={dict} reportId={selected.id} currentStatus={selected.status} />
            ) : null}
            <div className="rounded-sm border border-line-200 bg-white p-4">
              <h3 className="text-body font-semibold">{dict.admin.note}</h3>
              <ul className="mt-2 space-y-2 text-small text-slate-600">
                {notes.length === 0 ? <li>{dict.admin.noRecords}</li> : null}
                {notes.map((note) => (
                  <li key={note.id} className="rounded-[10px] bg-mist-50 p-2">
                    <p className="font-semibold text-ink-900">{note.author}</p>
                    <p className="mt-0.5">{note.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

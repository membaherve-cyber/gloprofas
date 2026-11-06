import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { desc } from "drizzle-orm";
import { db, hasDatabase } from "@/db";
import {
  contactMessages,
  newsletterSubscribers,
  partnershipApplications,
  serviceEnquiries,
  volunteerApplications,
} from "@/db/schema";
import { can, getCurrentUser } from "@/lib/auth";
import { getDictionary, isLocale, routes, type Locale } from "@/lib/i18n";
import { formatDate } from "@/lib/format";

export default async function AdminMessagesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDictionary(locale);
  const user = await getCurrentUser();
  if (!user) redirect(`${routes.admin(locale)}/login`);
  if (!can(user, "messages:read")) {
    return <p className="rounded-sm border border-risk-critical/40 bg-white p-5 text-[0.9rem]">{dict.admin.accessDenied}</p>;
  }

  const [messages, enquiries, volunteers, partnerships, subscribers] = hasDatabase
    ? await Promise.all([
        db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt)).limit(25).catch(() => []),
        db.select().from(serviceEnquiries).orderBy(desc(serviceEnquiries.createdAt)).limit(25).catch(() => []),
        db.select().from(volunteerApplications).orderBy(desc(volunteerApplications.createdAt)).limit(25).catch(() => []),
        db.select().from(partnershipApplications).orderBy(desc(partnershipApplications.createdAt)).limit(25).catch(() => []),
        db.select().from(newsletterSubscribers).orderBy(desc(newsletterSubscribers.createdAt)).limit(25).catch(() => []),
      ])
    : [[], [], [], [], []];

  const sections = [
    {
      title: dict.admin.messages,
      rows: messages.map((row) => ({ id: row.id, primary: `${row.name} · ${row.email}`, secondary: row.subject, status: row.status, date: row.createdAt })),
    },
    {
      title: dict.admin.enquiries,
      rows: enquiries.map((row) => ({ id: row.id, primary: `${row.name} · ${row.email}`, secondary: row.serviceSlug ?? row.requirements.slice(0, 90), status: row.status, date: row.createdAt })),
    },
    {
      title: dict.admin.volunteers,
      rows: volunteers.map((row) => ({ id: row.id, primary: `${row.fullName} · ${row.email}`, secondary: row.skills.slice(0, 90), status: row.status, date: row.createdAt })),
    },
    {
      title: dict.admin.partnerships,
      rows: partnerships.map((row) => ({ id: row.id, primary: `${row.organisationName} · ${row.contactPerson}`, secondary: row.proposal.slice(0, 90), status: row.status, date: row.createdAt })),
    },
    {
      title: dict.admin.subscribers,
      rows: subscribers.map((row) => ({ id: row.id, primary: `${row.name} · ${row.email}`, secondary: `${row.country} · ${row.language}`, status: row.status, date: row.createdAt })),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-[1.7rem]">{dict.admin.messages}</h1>
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
      {sections.map((section) => (
        <section key={section.title} className="overflow-hidden rounded-sm border border-line-200 bg-white">
          <h2 className="border-b border-line-200 px-4 py-3 text-[1rem] font-semibold">
            {section.title} <span className="ml-1 text-[0.8rem] font-normal text-slate-600">({section.rows.length})</span>
          </h2>
          <div className="overflow-x-auto">
            <table className="table-dense w-full min-w-[560px]">
              <thead>
                <tr>
                  <th scope="col">{dict.common.name}</th>
                  <th scope="col">{dict.admin.status}</th>
                  <th scope="col">{dict.common.date}</th>
                </tr>
              </thead>
              <tbody>
                {section.rows.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center text-slate-600">
                      {dict.admin.noRecords}
                    </td>
                  </tr>
                ) : (
                  section.rows.map((row) => (
                    <tr key={`${section.title}-${row.id}`}>
                      <td>
                        <span className="block font-medium text-ink-900">{row.primary}</span>
                        <span className="block text-[0.78rem] text-slate-600">{row.secondary}</span>
                      </td>
                      <td>
                        <span className="chip">{row.status}</span>
                      </td>
                      <td>{formatDate(row.date, locale)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
}

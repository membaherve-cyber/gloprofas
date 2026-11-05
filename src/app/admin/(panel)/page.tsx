import Link from "next/link";
import { redirect } from "next/navigation";
import { desc, isNull } from "drizzle-orm";
import { db } from "@/db";
import { scamReports } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { can } from "@/lib/permissions";
import { dashboardCounts } from "@/server/queries";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await getSession();
  if (!can(user, "dashboard.view")) redirect("/admin/login");
  const [data, recent] = await Promise.all([
    dashboardCounts(),
    db.select().from(scamReports).where(isNull(scamReports.deletedAt)).orderBy(desc(scamReports.createdAt)).limit(8),
  ]);
  const cards = [
    ["Reports", data.reports],
    ["New reports", data.newReports],
    ["In review", data.reviewReports],
    ["Published alerts", data.alerts],
    ["Articles", data.articles],
    ["Resources", data.resources],
    ["Subscribers", data.subscribers],
    ["Contact messages", data.contacts],
    ["Service enquiries", data.enquiries],
    ["Volunteers", data.volunteers],
    ["Partnerships", data.partnerships],
    ["Assistant messages", data.aiMessages],
  ] as const;
  const max = Math.max(...cards.slice(0, 6).map((item) => Number(item[1])), 1);
  const quick = [
    ["reports", "Open a report"],
    ["alerts", "Publish an alert"],
    ["articles", "Edit an article"],
    ["resources", "Edit a guide"],
    ["pages", "Edit a page"],
    ["services", "Edit a service"],
    ["enquiries", "Answer an enquiry"],
    ["assistant", "Configure the assistant"],
  ];
  return (
    <>
      <div className="backoffice-top">
        <div>
          <h1 style={{ fontSize: "2rem", margin: 0 }}>Back office</h1>
          <p className="help" style={{ margin: 0 }}>Signed in as {user?.name} · {user?.email}</p>
        </div>
        <Link className="btn btn-signal" href="/en">Return to website</Link>
      </div>
      <div className="kpis">
        {cards.map(([label, value]) => <article className="kpi" key={label}><span className="help">{label}</span><b>{value}</b></article>)}
      </div>
      <div className="split" style={{ marginTop: 18, alignItems: "start" }}>
        <div className="card" style={{ width: "100%" }}>
          <h2 style={{ fontSize: "1.2rem", margin: "0 0 10px" }}>Counts, live from the database</h2>
          <svg viewBox="0 0 620 180" role="img" aria-label="Live counts" style={{ width: "100%", height: "auto" }}>
            {cards.slice(0, 6).map((item, index) => {
              const height = Math.max(8, (Number(item[1]) / max) * 130);
              return (
                <g key={String(item[0])}>
                  <rect x={16 + index * 100} y={150 - height} width="52" height={height} fill="#2A62F5" rx="6" />
                  <text x={42 + index * 100} y={170} textAnchor="middle" fontSize="12" fill="#4B5870">{item[0]}</text>
                </g>
              );
            })}
          </svg>
        </div>
        <div className="card" style={{ width: "100%" }}>
          <h2 style={{ fontSize: "1.2rem", margin: "0 0 10px" }}>Quick actions</h2>
          <div className="quick-links">
            {quick.map(([href, label]) => <Link key={href} className="btn btn-outline-dark" href={`/admin/${href}`}>{label}</Link>)}
          </div>
        </div>
      </div>
      <h2 style={{ fontSize: "1.2rem", margin: "18px 0 8px" }}>Recent reports</h2>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Reference</th><th>Status</th><th>Country</th><th>Money lost</th><th>Date</th></tr></thead>
          <tbody>
            {recent.map((row) => (
              <tr key={row.id}>
                <td><Link href={`/admin/reports?id=${row.id}`}>{row.reference}</Link></td>
                <td><span className={`status-chip ${row.status}`}>{row.status.replaceAll("_", " ")}</span></td>
                <td>{row.country}</td>
                <td>{row.moneyLost ? `${row.amount} ${row.currency}` : "no"}</td>
                <td>{row.createdAt.toISOString().slice(0, 10)}</td>
              </tr>
            ))}
            {recent.length === 0 ? <tr><td colSpan={5}>No reports yet.</td></tr> : null}
          </tbody>
        </table>
      </div>
      <h2 style={{ fontSize: "1.2rem", margin: "18px 0 8px" }}>Recent activity</h2>
      <div className="table-wrap">
        <table>
          <thead><tr><th>When</th><th>Action</th><th>Entity</th></tr></thead>
          <tbody>
            {data.logs.map((log) => <tr key={log.id}><td>{log.createdAt.toISOString()}</td><td>{log.action}</td><td>{log.entity}</td></tr>)}
          </tbody>
        </table>
      </div>
    </>
  );
}

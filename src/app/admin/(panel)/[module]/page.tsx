import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { desc, eq, isNull } from "drizzle-orm";
import { db } from "@/db";
import {
  activityLogs,
  articles,
  contactMessages,
  media,
  newsletterSubscribers,
  pages,
  partnershipApplications,
  resources,
  scamAlerts,
  scamCategories,
  scamReports,
  serviceEnquiries,
  services,
  users,
  volunteerApplications,
  emailMessages,
} from "@/db/schema";
import { getSession } from "@/lib/auth";
import { can, type Permission } from "@/lib/permissions";
import { aiSettingsAction, contentAction, createUserAction, deleteContentAction, purgeDemoAction, reportStatusAction, requestInfoAction, settingsAction } from "@/server/actions";
import { getChatSettings, getReportBundle, getSettings, listMedia } from "@/server/queries";
import { pickLocale } from "@/lib/utils";

export const dynamic = "force-dynamic";

const gates: Record<string, Permission> = {
  reports: "reports.read",
  alerts: "alerts.manage",
  categories: "content.manage",
  articles: "content.manage",
  resources: "content.manage",
  pages: "content.manage",
  services: "content.manage",
  enquiries: "enquiries.manage",
  messages: "enquiries.manage",
  volunteers: "volunteers.manage",
  partnerships: "partnerships.manage",
  newsletter: "newsletter.manage",
  media: "media.manage",
  assistant: "ai.manage",
  users: "users.manage",
  settings: "settings.manage",
  logs: "logs.read",
};

export default async function ModulePage({ params, searchParams }: { params: Promise<{ module: string }>; searchParams: Promise<{ id?: string }> }) {
  const { module } = await params;
  const { id } = await searchParams;
  const permission = gates[module];
  if (!permission) notFound();
  const user = await getSession();
  if (!can(user, permission)) redirect("/admin");
  if (module === "reports" && id) return <ReportDetail id={id} />;
  if (id && ["pages", "articles", "alerts", "resources", "services", "categories"].includes(module)) return <Editor module={module} id={id} />;
  if (module === "reports") return <ReportList />;
  if (module === "alerts") return <ContentList title="Alerts" table="scam_alerts" rows={await db.select().from(scamAlerts).where(isNull(scamAlerts.deletedAt)).orderBy(desc(scamAlerts.publishedAt))} />;
  if (module === "categories") return <ContentList title="Categories" table="scam_categories" rows={await db.select().from(scamCategories).where(isNull(scamCategories.deletedAt))} />;
  if (module === "articles") return <ContentList title="Articles" table="articles" rows={await db.select().from(articles).where(isNull(articles.deletedAt)).orderBy(desc(articles.publishedAt))} />;
  if (module === "resources") return <ContentList title="Resources" table="resources" rows={await db.select().from(resources).where(isNull(resources.deletedAt))} />;
  if (module === "pages") return <ContentList title="Pages" table="pages" rows={await db.select().from(pages).where(isNull(pages.deletedAt))} />;
  if (module === "services") return <ContentList title="Services" table="services" rows={await db.select().from(services).where(isNull(services.deletedAt))} />;
  if (module === "enquiries") return <SimpleList title="Service enquiries" rows={await db.select().from(serviceEnquiries).orderBy(desc(serviceEnquiries.createdAt))} />;
  if (module === "messages") return <SimpleList title="Contact messages" rows={await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt))} />;
  if (module === "volunteers") return <SimpleList title="Volunteer applications" rows={await db.select().from(volunteerApplications).orderBy(desc(volunteerApplications.createdAt))} />;
  if (module === "partnerships") return <SimpleList title="Partnership proposals" rows={await db.select().from(partnershipApplications).orderBy(desc(partnershipApplications.createdAt))} />;
  if (module === "newsletter") return <Newsletter />;
  if (module === "media") return <Media />;
  if (module === "assistant") return <AssistantSettings />;
  if (module === "users") return <Users />;
  if (module === "settings") return <Settings />;
  if (module === "logs") return <Logs />;
  notFound();
}

function ContentList({ title, table, rows }: { title: string; table: string; rows: { id: string; status?: string; translations?: unknown; isDemo?: boolean }[] }) {
  return (
    <>
      <h1 style={{ fontSize: "2rem" }}>{title}</h1>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Title</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {rows.map((row) => {
              const copy = pickLocale(row.translations as { en?: { title: string } }, "en");
              return (
                <tr key={row.id}>
                  <td>{copy?.value.title || row.id} {row.isDemo ? <span className="badge">Demo</span> : null}</td>
                  <td>{row.status}</td>
                  <td><Link href={`?id=${row.id}`}>Edit</Link></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

async function Editor({ module, id }: { module: string; id: string }) {
  const table = module === "alerts" ? "scam_alerts" : module === "categories" ? "scam_categories" : module;
  const source = table === "scam_alerts" ? scamAlerts : table === "scam_categories" ? scamCategories : table === "articles" ? articles : table === "resources" ? resources : table === "services" ? services : pages;
  const [row] = await db.select().from(source).where(eq(source.id, id)).limit(1);
  if (!row) notFound();
  const en = pickLocale((row as { translations: { en?: Record<string, unknown> } }).translations, "en")?.value || {};
  const fr = (row as { translations: { fr?: Record<string, string | string[]> } }).translations.fr || {};
  return (
    <form action={contentAction} className="card" style={{ display: "grid", gap: 12 }}>
      <h1 style={{ fontSize: "1.6rem" }}>Edit {module}</h1>
      <input type="hidden" name="table" value={table} />
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="locale" value="en" />
      <div className="field"><label>Title</label><input name="title" defaultValue={String(en.title || "")} /></div>
      <div className="field"><label>Slug</label><input name="slug" defaultValue={String(en.slug || "")} /></div>
      <div className="field"><label>Summary</label><textarea name="summary" defaultValue={String(en.summary || "")} /></div>
      <div className="field"><label>Paragraphs (one per line)</label><textarea name="paragraphs" defaultValue={Array.isArray(en.body) ? (en.body as string[]).join("\n") : ""} /></div>
      <div className="field"><label>Status</label><select name="status" defaultValue={String((row as { status?: string }).status || "draft")}><option>draft</option><option>published</option><option>archived</option></select></div>
      <p className="help">French title currently: {String(fr.title || "untranslated")}</p>
      <button className="btn" type="submit">Save English fields</button>
    </form>
  );
}

async function ReportList() {
  const rows = await db.select().from(scamReports).where(isNull(scamReports.deletedAt)).orderBy(desc(scamReports.createdAt));
  return (
    <>
      <div className="admin-top"><h1 style={{ fontSize: "2rem" }}>Scam reports</h1><a className="btn" href="/api/admin/reports.csv">Export CSV</a></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Reference</th><th>Status</th><th>Country</th><th>Email</th></tr></thead>
          <tbody>
            {rows.map((row) => <tr key={row.id}><td><Link href={`?id=${row.id}`}>{row.reference}</Link> {row.isDemo ? <span className="badge">Demo</span> : null}</td><td>{row.status}</td><td>{row.country}</td><td>{row.reporterEmail}</td></tr>)}
          </tbody>
        </table>
      </div>
    </>
  );
}

async function ReportDetail({ id }: { id: string }) {
  const bundle = await getReportBundle(id);
  if (!bundle) notFound();
  const { report, notes, files } = bundle;
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <h1 style={{ fontSize: "1.8rem" }}>{report.reference}</h1>
      <p className="notice">Internal only. Do not publish this report. Careful language: reported suspicious activity.</p>
      <div className="card"><p>{report.description}</p><p>{report.country} · {report.channel} · {report.moneyLost ? `${report.amount} ${report.currency}` : "No money reported lost"}</p></div>
      <form action={reportStatusAction} className="card" style={{ display: "grid", gap: 8 }}>
        <input type="hidden" name="id" value={report.id} />
        <select name="status" defaultValue={report.status}><option>new</option><option>under_review</option><option>info_required</option><option>reviewed</option><option>closed</option></select>
        <textarea name="note" placeholder="Internal note, never public" />
        <button className="btn" type="submit">Update status</button>
      </form>
      <form action={requestInfoAction} className="card" style={{ display: "grid", gap: 8 }}>
        <input type="hidden" name="id" value={report.id} />
        <textarea name="message" required placeholder="Ask for more information. Do not request passwords or codes." />
        <button className="btn btn-outline-dark" type="submit">Request information</button>
      </form>
      <div className="card"><h2>Notes</h2>{notes.map((note) => <p key={note.id}>{note.body}</p>)}{files.map((file) => <p key={file.id}><a href={`/api/files/${file.id}`}>{file.originalName}</a></p>)}</div>
    </div>
  );
}

function SimpleList({ title, rows }: { title: string; rows: Record<string, unknown>[] }) {
  return (
    <>
      <h1 style={{ fontSize: "2rem" }}>{title}</h1>
      <div className="table-wrap"><table><thead><tr><th>Record</th><th>Status</th></tr></thead><tbody>
        {rows.map((row) => <tr key={String(row.id)}><td>{String(row.email || row.organisation || row.name || row.id)}</td><td>{String(row.status || "")}</td></tr>)}
      </tbody></table></div>
    </>
  );
}

async function Newsletter() {
  const rows = await db.select().from(newsletterSubscribers).orderBy(desc(newsletterSubscribers.createdAt));
  const mail = await db.select().from(emailMessages).orderBy(desc(emailMessages.createdAt)).limit(12);
  return (
    <>
      <h1 style={{ fontSize: "2rem" }}>Newsletter</h1>
      <div className="table-wrap"><table><thead><tr><th>Email</th><th>Status</th><th>Language</th></tr></thead><tbody>
        {rows.map((row) => <tr key={row.id}><td>{row.email}</td><td>{row.status}</td><td>{row.language}</td></tr>)}
      </tbody></table></div>
      <h2 style={{ marginTop: 18 }}>Recent email log</h2>
      <div className="table-wrap"><table><tbody>{mail.map((row) => <tr key={row.id}><td>{row.toAddress}</td><td>{row.subject}</td><td>{row.status}</td></tr>)}</tbody></table></div>
    </>
  );
}

async function Media() {
  const rows = await listMedia();
  return (
    <>
      <h1 style={{ fontSize: "2rem" }}>Media library</h1>
      <div className="grid-cards">{rows.map((item) => <article className="card" key={item.id}>{item.publicPath ? <img src={item.publicPath} alt={item.alt.en || ""} /> : null}<p>{item.filename}</p></article>)}</div>
    </>
  );
}

async function AssistantSettings() {
  const chat = await getChatSettings();
  if (!chat) return null;
  return (
    <form action={aiSettingsAction} className="card" style={{ display: "grid", gap: 10 }}>
      <h1 style={{ fontSize: "1.8rem" }}>Assistant</h1>
      <label><input type="checkbox" name="enabled" value="yes" defaultChecked={chat.enabled} /> Enabled</label>
      <label><input type="checkbox" name="store" value="yes" defaultChecked={chat.storeConversations} /> Store redacted conversations</label>
      <div className="field"><label>Per hour</label><input name="per_hour" defaultValue={chat.perHour} /></div>
      <div className="field"><label>Daily cap</label><input name="daily_cap" defaultValue={chat.dailyCap} /></div>
      <div className="field"><label>Welcome EN</label><textarea name="welcome_en" defaultValue={chat.welcome.en} /></div>
      <div className="field"><label>Welcome FR</label><textarea name="welcome_fr" defaultValue={chat.welcome.fr} /></div>
      <div className="field"><label>Instructions EN</label><textarea name="instructions_en" defaultValue={chat.instructions.en} /></div>
      <div className="field"><label>Instructions FR</label><textarea name="instructions_fr" defaultValue={chat.instructions.fr} /></div>
      <p className="help">Messages {chat.usage.messages} · errors {chat.usage.errors}. Gemini key is read only from the server environment.</p>
      <button className="btn" type="submit">Save</button>
    </form>
  );
}

async function Users() {
  const rows = await db.select().from(users);
  return (
    <>
      <h1 style={{ fontSize: "2rem" }}>Users</h1>
      <ul>{rows.map((row) => <li key={row.id}>{row.name} · {row.email} {row.isDemo ? "(demo)" : ""}</li>)}</ul>
      <form action={createUserAction} className="card" style={{ display: "grid", gap: 8, marginTop: 12 }}>
        <h2>Create staff user</h2>
        <input name="name" placeholder="Name" required />
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Temporary password" required />
        <select name="role"><option value="content_editor">Content editor</option><option value="report_officer">Report officer</option><option value="administrator">Administrator</option><option value="customer_support">Customer support</option><option value="ai_manager">AI manager</option><option value="volunteer_manager">Volunteer manager</option></select>
        <button className="btn" type="submit">Create</button>
      </form>
    </>
  );
}

async function Settings() {
  const settings = await getSettings();
  if (!settings) return null;
  return (
    <form action={settingsAction} className="card" style={{ display: "grid", gap: 10 }}>
      <h1 style={{ fontSize: "1.8rem" }}>Website settings</h1>
      <div className="field"><label>Legal name</label><input name="legal_name" defaultValue={settings.legalName} /></div>
      <div className="field"><label>Email</label><input name="email" defaultValue={settings.email} /></div>
      <label><input type="checkbox" name="email_public" value="yes" defaultChecked={settings.emailPublic} /> Publish email</label>
      <div className="field"><label>Phone</label><input name="phone" defaultValue={settings.phone} /></div>
      <label><input type="checkbox" name="phone_public" value="yes" defaultChecked={settings.phonePublic} /> Publish phone</label>
      <div className="field"><label>Location</label><input name="location" defaultValue={settings.location} /></div>
      <label><input type="checkbox" name="location_public" value="yes" defaultChecked={settings.locationPublic} /> Publish location</label>
      <div className="field"><label>Donation URL</label><input name="donation_url" defaultValue={settings.donationUrl} /></div>
      <div className="field"><label>Notification emails</label><input name="notification_emails" defaultValue={settings.notificationEmails.join(", ")} /></div>
      <div className="field"><label>Social links (Label | https://...)</label><textarea name="socials" defaultValue={settings.socials.map((item) => `${item.label} | ${item.href}`).join("\n")} /></div>
      <div className="field"><label>Report retention days</label><input name="retention_reports" defaultValue={settings.retentionReportDays} /></div>
      <div className="field"><label>Chat retention days</label><input name="retention_chat" defaultValue={settings.retentionChatDays} /></div>
      <button className="btn" type="submit">Save</button>
      <button className="btn btn-outline-dark" formAction={purgeDemoAction} type="submit">Purge demo content</button>
    </form>
  );
}

async function Logs() {
  const rows = await db.select().from(activityLogs).orderBy(desc(activityLogs.createdAt)).limit(100);
  return (
    <div className="table-wrap"><table><thead><tr><th>When</th><th>Action</th><th>Entity</th></tr></thead><tbody>
      {rows.map((row) => <tr key={row.id}><td>{row.createdAt.toISOString()}</td><td>{row.action}</td><td>{row.entity}</td></tr>)}
    </tbody></table></div>
  );
}

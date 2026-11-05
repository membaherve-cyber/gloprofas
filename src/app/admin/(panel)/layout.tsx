import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { logoutAction } from "@/server/actions";
import { getSession } from "@/lib/auth";
import { Logo } from "@/components/ui";
import { ensureSeeded } from "@/db/seed";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

const links = [
  ["", "Dashboard"],
  ["reports", "Scam reports"],
  ["alerts", "Scam alerts"],
  ["categories", "Categories"],
  ["articles", "Articles"],
  ["resources", "Resources"],
  ["pages", "Pages"],
  ["services", "Services"],
  ["enquiries", "Enquiries"],
  ["messages", "Messages"],
  ["volunteers", "Volunteers"],
  ["partnerships", "Partnerships"],
  ["newsletter", "Newsletter"],
  ["media", "Media"],
  ["assistant", "Assistant"],
  ["users", "Users"],
  ["settings", "Settings"],
  ["logs", "Activity"],
];

export default async function AdminLayout({ children }: { children: ReactNode }) {
  await ensureSeeded();
  const user = await getSession();
  if (!user) redirect("/admin/login");
  return (
    <div className="admin">
      <aside className="side">
        <Link href="/admin"><Logo size="sm" /></Link>
        <Link className="btn side-return" href="/en"><ArrowLeft size={16} aria-hidden="true" /> Return to website</Link>
        <p className="fine" style={{ margin: "12px 10px 0" }}>{user.name}</p>
        <p className="fine" style={{ margin: "0 10px" }}>{user.email}</p>
        <nav style={{ display: "grid", marginTop: 16 }}>
          {links.map(([href, label]) => <Link key={label} href={href ? `/admin/${href}` : "/admin"}>{label}</Link>)}
        </nav>
        <form action={logoutAction} style={{ marginTop: 18 }}><button className="btn btn-outline" type="submit">Log out</button></form>
      </aside>
      <div className="admin-main">{children}</div>
    </div>
  );
}

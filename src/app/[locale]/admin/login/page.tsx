import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getDictionary, isLocale, routes, type Locale } from "@/lib/i18n";
import { getCurrentUser } from "@/lib/auth";
import { AdminLoginForm } from "@/components/admin/login-form";

export default async function AdminLoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDictionary(locale);
  const user = await getCurrentUser();
  if (user) redirect(routes.admin(locale));

  return (
    <div className="mx-auto max-w-4xl py-4">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link href={routes.home(locale)} className="btn btn-outline btn-sm">
          <ArrowLeft size={16} aria-hidden="true" />
          {locale === "fr" ? "Retourner à l’accueil du site" : "Return to website frontpage"}
        </Link>
      </div>
      <AdminLoginForm locale={locale} dict={dict} />
    </div>
  );
}

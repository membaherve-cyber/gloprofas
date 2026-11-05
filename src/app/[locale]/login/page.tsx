import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicLogin } from "@/components/public-login";
import { m } from "@/lib/i18n";
import { isLocale } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: m(locale).loginTitle, robots: { index: false, follow: false } };
}

export default async function LoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = m(locale);
  return (
    <>
      <header className="page-hero">
        <div className="container">
          <p className="eyebrow">{t.login}</p>
          <h1 style={{ fontSize: "clamp(2.2rem, 1.4rem + 2vw, 3.4rem)" }}>{t.loginTitle}</h1>
          <p className="lead measure" style={{ color: "#d5deee" }}>{t.loginLead}</p>
        </div>
      </header>
      <section className="section">
        <div className="container">
          <PublicLogin locale={locale} />
        </div>
      </section>
    </>
  );
}

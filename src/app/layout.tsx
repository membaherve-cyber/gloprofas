import type { Metadata } from "next";
import type { ReactNode } from "react";
import { headers } from "next/headers";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "GLOPROFAS", template: "%s · GLOPROFAS" },
  description: "Scam prevention, public alerts and a private reporting channel.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const headerStore = await headers();
  const locale = headerStore.get("x-locale") === "fr" ? "fr" : "en";
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}

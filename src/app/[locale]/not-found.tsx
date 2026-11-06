"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Btn,
} from "@/components/zite/shared";



export default function NotFound() {
  const pathname = usePathname() || "/en";
  const fr = pathname.startsWith("/fr");
  const l = (path = "") => `/${fr ? "fr" : "en"}${path}`;

  return (
    <section className="on-dark flex min-h-[70vh] items-center bg-navy-900 pt-[112px]">
      <div className="container-g">
        <p className="eyebrow text-cyanx">404</p>
        <h1 className="h2 mt-4 text-white">
          {fr ? "Cette page est introuvable." : "We couldn’t find that page."}
        </h1>
        <div className="mt-8">
          <Btn href={l()} variant="primary">
            {fr ? "Retour à l’accueil" : "Back to home"}
          </Btn>
        </div>
        <Link
          href={l("/scams")}
          className="mt-6 block text-slatex-300 hover:text-white"
        >
          {fr ? "Voir les arnaques courantes" : "See common scams"}
        </Link>
      </div>
    </section>
  );
}

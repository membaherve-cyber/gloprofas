"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function LocaleError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Client-side logging only; no stack traces or internal details are rendered.
    console.error("GLOPROFAS page error", error.digest ?? "no-digest");
  }, [error]);

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-5 py-20">
      <p className="text-small font-semibold uppercase tracking-[0.14em] text-blue-600">GLOPROFAS</p>
      <h1 className="mt-4 text-ink-900">Something went wrong / Une erreur est survenue</h1>
      <p className="mt-4 text-slate-600">
        Please try again. If the problem continues, contact us. Veuillez réessayer. Si le problème persiste, contactez-nous.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button type="button" onClick={reset} className="btn btn-primary">
          Try again
        </button>
        <Link href="/en" className="btn btn-outline">
          Homepage
        </Link>
        <Link href="/en/contact" className="btn btn-ghost">
          Contact
        </Link>
      </div>
    </main>
  );
}

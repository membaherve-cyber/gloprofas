"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, LoaderCircle } from "lucide-react";
import { Btn, PageHero } from "@/components/zite/shared";
import { L, R } from "@/components/zite/copy";
import { formatAerialBadge, PAGE_AERIAL_HEROES } from "@/lib/african-cities";
import type { Locale } from "@/lib/i18n";

const CATEGORIES: Record<string, [string, string]> = {
  general: ["General", "Général"],
  partnership: ["Partnership", "Partenariat"],
  volunteer: ["Volunteer", "Bénévolat"],
  media: ["Media", "Médias"],
  services: ["Professional services", "Services professionnels"],
};

const fieldCls =
  "h-12 w-full rounded-sm border border-line bg-white px-4 text-ink placeholder:text-slatex-600/60 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20";
const labelCls = "mb-2 block text-sm font-semibold text-ink";

export function ZiteContactView({
  locale,
  initialTopic = "general",
}: {
  locale: Locale;
  initialTopic?: string;
}) {
  const fr = locale === "fr";
  const l = (path = "") => `/${locale}${path}`;
  const validTopic = initialTopic in CATEGORIES ? initialTopic : "general";

  const [form, setForm] = useState({
    name: "",
    email: "",
    category: validTopic,
    subject: "",
    message: "",
    website: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = R(L.nl.required, locale);
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim()))
      errs.email = R(L.nl.invalidEmail, locale);
    if (!form.subject.trim()) errs.subject = R(L.nl.required, locale);
    if (form.message.trim().length < 10) errs.message = R(L.nl.required, locale);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("loading");
    try {
      const fd = new FormData();
      fd.set("name", form.name);
      fd.set("email", form.email);
      fd.set(
        "category",
        form.category === "volunteer" ? "general" : form.category,
      );
      fd.set("subject", form.subject);
      fd.set(
        "message",
        form.message.length >= 20 ? form.message : `${form.message} — (${form.category})`,
      );
      fd.set("language", locale);
      const { sendContactMessage } = await import("@/actions/public");
      await sendContactMessage(locale, { status: "idle" }, fd);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <PageHero
        title={fr ? "Contacter GLOPROFAS" : "Contact GLOPROFAS"}
        eyebrow={R(L.nav.contact, locale)}
        lead={
          fr
            ? "Questions, partenariats, médias ou services : écrivez-nous. Pour signaler une arnaque, utilisez le formulaire dédié."
            : "Questions, partnerships, media or services: write to us. To report a scam, please use the dedicated form."
        }
        image={PAGE_AERIAL_HEROES.contact.image}
        cityBadge={formatAerialBadge(PAGE_AERIAL_HEROES.contact.city, locale)}
        crumbs={[
          { label: fr ? "Accueil" : "Home", to: l() },
          { label: R(L.nav.contact, locale) },
        ]}
      />

      <section className="section-y bg-mist">
        <div className="container-g grid gap-10 lg:grid-cols-12">
          <div className="rounded-none bg-white p-8 shadow-none lg:col-span-8">
            {status === "done" ? (
              <div role="status" className="py-10 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-risk-low" />
                <h2 className="h3 mt-4 text-ink">
                  {fr ? "Message envoyé" : "Message sent"}
                </h2>
                <p className="mt-2 text-slatex-600">
                  {fr
                    ? "Merci. Nous vous répondrons dès que possible."
                    : "Thank you. We will get back to you as soon as we can."}
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="grid gap-5 sm:grid-cols-2"
              >
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
                <div>
                  <label htmlFor="c-name" className={labelCls}>
                    {R(L.nl.name, locale)}
                  </label>
                  <input
                    id="c-name"
                    autoComplete="name"
                    className={fieldCls}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  {errors.name ? (
                    <p className="mt-2 flex items-center gap-2 text-sm text-risk-critical">
                      <AlertCircle className="h-4 w-4" />
                      {errors.name}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="c-email" className={labelCls}>
                    {R(L.nl.email, locale)}
                  </label>
                  <input
                    id="c-email"
                    type="email"
                    autoComplete="email"
                    className={fieldCls}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                  {errors.email ? (
                    <p className="mt-2 flex items-center gap-2 text-sm text-risk-critical">
                      <AlertCircle className="h-4 w-4" />
                      {errors.email}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="c-cat" className={labelCls}>
                    {fr ? "Catégorie" : "Category"}
                  </label>
                  <select
                    id="c-cat"
                    className={fieldCls}
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                  >
                    {Object.keys(CATEGORIES).map((key) => (
                      <option key={key} value={key}>
                        {CATEGORIES[key][fr ? 1 : 0]}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="c-subj" className={labelCls}>
                    {fr ? "Objet" : "Subject"}
                  </label>
                  <input
                    id="c-subj"
                    className={fieldCls}
                    value={form.subject}
                    onChange={(e) =>
                      setForm({ ...form, subject: e.target.value })
                    }
                  />
                  {errors.subject ? (
                    <p className="mt-2 flex items-center gap-2 text-sm text-risk-critical">
                      <AlertCircle className="h-4 w-4" />
                      {errors.subject}
                    </p>
                  ) : null}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="c-msg" className={labelCls}>
                    Message
                  </label>
                  <textarea
                    id="c-msg"
                    rows={6}
                    className={`${fieldCls} h-auto py-3`}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                  />
                  {errors.message ? (
                    <p className="mt-2 flex items-center gap-2 text-sm text-risk-critical">
                      <AlertCircle className="h-4 w-4" />
                      {errors.message}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex h-[52px] items-center gap-2 rounded-[2px] bg-brand-600 px-7 font-semibold text-white hover:bg-brand-500 disabled:opacity-60 transition-colors duration-fast ease-standard"
                  >
                    {status === "loading" ? (
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                    ) : null}
                    {fr ? "Envoyer" : "Send message"}
                  </button>
                  {status === "error" ? (
                    <p role="alert" className="text-sm text-risk-critical">
                      {R(L.nl.err, locale)}
                    </p>
                  ) : null}
                </div>
              </form>
            )}
          </div>

          <aside className="space-y-6 lg:col-span-4">
            <div className="on-dark rounded-none bg-navy-900 p-7">
              <h2 className="h4 text-white">
                {fr ? "Vous avez été victime ?" : "Been scammed?"}
              </h2>
              <p className="mt-3 text-sm text-slatex-300">
                {R(L.reportSec.note, locale)}
              </p>
              <div className="mt-6">
                <Btn href={l("/report")} variant="signal" className="w-full">
                  {R(L.report, locale)}
                </Btn>
              </div>
            </div>
            <div className="overflow-hidden rounded-none border border-line bg-white shadow-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img width={1600} height={900}
                src="/images/context/support-call-center.jpg"
                alt=""
                loading="lazy"
                className="aspect-[16/10] w-full object-cover"
              />
              <p className="p-6 text-sm text-slatex-600">
                {R(L.footer.contactPending, locale)}
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

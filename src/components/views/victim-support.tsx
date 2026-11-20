"use client";

/**
 * Victim Support — human impact of scams (individuals, families, businesses,
 * society) + "What happened to me?" situation picker with first-hour guidance.
 * Dignified, non-blaming, responsible tone. No invented hotlines.
 */

import React, { useState } from "react";
import {
  ArrowRight,
  Banknote,
  Building2,
  Check,
  ChevronRight,
  Clock,
  FileSearch,
  Globe2,
  HeartHandshake,
  Lock,
  MessageSquareWarning,
  Users,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Btn, LinkG, PageHero, Reveal, Masthead } from "@/components/shared/ui";

/* ---------- Impact content (bilingual) ---------- */

const IMPACT = [
  {
    icon: Users,
    title: { en: "Individuals", fr: "Les particuliers" },
    items: {
      en: [
        "Financial losses, from small transfers to life savings",
        "Emotional distress, anxiety and loss of confidence",
        "Shame and embarrassment that keep people silent",
        "Psychological pressure from threats or manipulation",
      ],
      fr: [
        "Pertes financières, du petit virement aux économies de toute une vie",
        "Souffrance émotionnelle, anxiété et perte de confiance",
        "Honte et gêne qui poussent au silence",
        "Pression psychologique liée aux menaces ou à la manipulation",
      ],
    },
  },
  {
    icon: HeartHandshake,
    title: { en: "Families", fr: "Les familles" },
    items: {
      en: [
        "Household financial difficulties and loss of savings",
        "Relationship conflicts and mutual blame",
        "Emotional strain, especially when a shared account is affected",
        "Worry when a child or an older relative is targeted",
      ],
      fr: [
        "Difficultés financières du foyer et perte d'épargne",
        "Conflits conjugaux et reproches mutuels",
        "Tension émotionnelle, surtout quand un compte commun est touché",
        "Inquiétude lorsqu'un enfant ou un aîné est ciblé",
      ],
    },
  },
  {
    icon: Building2,
    title: { en: "Businesses and organisations", fr: "Les entreprises et organisations" },
    items: {
      en: [
        "Direct financial losses from fraudulent payments",
        "Operational disruption while incidents are handled",
        "Reputational damage when customers are affected",
        "Loss of customer confidence in digital channels",
      ],
      fr: [
        "Pertes financières directes liées aux paiements frauduleux",
        "Perturbation opérationnelle pendant le traitement de l'incident",
        "Atteinte à la réputation lorsque des clients sont touchés",
        "Perte de confiance des clients dans les canaux numériques",
      ],
    },
  },
  {
    icon: Globe2,
    title: { en: "Society and the economy", fr: "La société et l'économie" },
    items: {
      en: [
        "Reduced trust in digital and mobile-money services",
        "Economic losses that stay out of official statistics",
        "Financial insecurity in vulnerable communities",
        "Reduced confidence in online transactions overall",
      ],
      fr: [
        "Confiance réduite dans les services numériques et le mobile money",
        "Pertes économiques absentes des statistiques officielles",
        "Insécurité financière dans les communautés vulnérables",
        "Confiance globalement réduite dans les transactions en ligne",
      ],
    },
  },
];

/* ---------- Situation picker (12 situations from Pack 3.2) ---------- */

const SITUATIONS = [
  {
    id: "sent-money",
    icon: Banknote,
    title: { en: "I sent money to a suspected scammer", fr: "J'ai envoyé de l'argent à un escroc présumé" },
  },
  {
    id: "mobile-money",
    icon: Lock,
    title: { en: "My mobile-money account may be compromised", fr: "Mon compte mobile money semble compromis" },
  },
  {
    id: "shared-code",
    icon: MessageSquareWarning,
    title: { en: "I shared a password or one-time code", fr: "J'ai partagé un mot de passe ou un code" },
  },
  {
    id: "clicked-link",
    icon: Globe2,
    title: { en: "I clicked a suspicious link", fr: "J'ai cliqué sur un lien suspect" },
  },
  {
    id: "installed-app",
    icon: FileSearch,
    title: { en: "I installed a suspicious application", fr: "J'ai installé une application suspecte" },
  },
  {
    id: "shared-id",
    icon: Users,
    title: { en: "I shared identity documents", fr: "J'ai partagé des pièces d'identité" },
  },
  {
    id: "sim-swap",
    icon: Clock,
    title: { en: "I suspect a SIM swap", fr: "Je soupçonne un échange de SIM" },
  },
  {
    id: "threatened",
    icon: MessageSquareWarning,
    title: { en: "I am being threatened or blackmailed", fr: "Je suis menacé ou victime de chantage" },
  },
  {
    id: "recovery-fee",
    icon: Banknote,
    title: { en: "I am asked to pay to recover lost money", fr: "On me demande de payer pour récupérer mon argent" },
  },
  {
    id: "business-invoice",
    icon: Building2,
    title: { en: "My business received a suspicious invoice", fr: "Mon entreprise a reçu une facture suspecte" },
  },
  {
    id: "account-takeover",
    icon: Lock,
    title: { en: "My social-media account was taken over", fr: "Mon compte de réseau social a été piraté" },
  },
  {
    id: "family-member",
    icon: HeartHandshake,
    title: { en: "A child or family member met an online scam", fr: "Un enfant ou un proche a rencontré une arnaque" },
  },
];

/* ---------- Universal first-hour guidance ---------- */

const FIRST_STEPS = {
  en: [
    "Contact your bank or mobile-money provider now, through the number on your card, in the official app or on the official website — never a number from the message.",
    "Change any password or PIN you shared, starting with email and mobile money.",
    "Gather evidence: screenshots, numbers, links, transaction references and dates, without altering anything.",
    "Report to the competent authorities in your country and to GLOPROFAS.",
    "Beware of anyone offering to recover your money for a fee — this is often a second scam.",
  ],
  fr: [
    "Contactez dès maintenant votre banque ou votre opérateur mobile money, via le numéro au dos de votre carte, l'application officielle ou le site officiel — jamais un numéro issu du message.",
    "Changez les mots de passe ou codes partagés, en commençant par la messagerie et le mobile money.",
    "Rassemblez les preuves : captures, numéros, liens, références de transaction et dates, sans rien modifier.",
    "Signalez aux autorités compétentes de votre pays et à GLOPROFAS.",
    "Méfiez-vous de quiconque propose de récupérer votre argent contre paiement — c'est souvent une seconde arnaque.",
  ],
};

export function VictimSupportView() {
  const { locale } = useI18n();
  const fr = locale === "fr";
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <>
      <PageHero
        eyebrow={fr ? "Aide aux victimes" : "Victim support"}
        title={fr ? "Vous n'êtes pas seul, et vous n'êtes pas en faute." : "You are not alone, and it is not your fault."}
        lead={
          fr
            ? "Les arnaques sont conçues pour tromper des personnes ordinaires. Cette page explique leurs conséquences humaines et vous guide vers les premiers gestes à faire."
            : "Scams are designed to deceive ordinary people. This page explains their human impact and guides you through the first steps to take."
        }
        image="/images/gen/victim-support.jpg"
        imageAlt={fr ? "Un conseiller attentif écoute une personne avec bienveillance" : "An attentive counselor listens to a person with empathy"}
      >
        <p className="rounded-xl border border-signal-500/50 bg-signal-500/10 px-5 py-3.5 text-[14px] font-semibold text-signal-400">
          {fr
            ? "Si vous avez envoyé de l'argent ou partagé un code, contactez dès maintenant votre banque ou votre opérateur mobile money."
            : "If you sent money or shared a code, contact your bank or mobile-money provider now."}
        </p>
      </PageHero>

      {/* First steps — always visible */}
      <section className="section-y bg-white">
        <div className="container-g grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <Masthead num="01" eyebrow={fr ? "À faire en premier" : "Do this first"} />
              <h2 className="h2-g mt-6">
                {fr ? "La première heure compte." : "The first hour matters."}
              </h2>
              <p className="lead-g mt-4">
                {fr
                  ? "Agir vite et calmement peut limiter les dégâts. Suivez ces étapes dans l'ordre, sans vous précipiter."
                  : "Acting quickly and calmly can limit the damage. Follow these steps in order, without rushing."}
              </p>
              <div className="mt-6">
                <Btn href="/report" variant="signal">
                  {fr ? "Signaler à GLOPROFAS" : "Report to GLOPROFAS"}
                </Btn>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={100}>
              <ol className="card-g divide-y divide-line-200 p-2">
                {FIRST_STEPS[fr ? "fr" : "en"].map((s, i) => (
                  <li key={i} className="flex items-start gap-4 px-4 py-4">
                    <span className="mast-num text-[15px]">{String(i + 1).padStart(2, "0")}</span>
                    <p className="text-[14px] leading-relaxed text-ink-700">{s}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Situation picker */}
      <section className="section-y bg-mist-50">
        <div className="container-g">
          <Reveal>
            <Masthead num="02" eyebrow={fr ? "Que vous est-il arrivé ?" : "What happened to you?"} />
            <h2 className="h2-g mt-6">
              {fr ? "Choisissez votre situation." : "Choose your situation."}
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SITUATIONS.map((s, i) => {
              const Icon = s.icon;
              const active = selected === s.id;
              return (
                <Reveal key={s.id} delay={(i % 3) * 60}>
                  <button
                    type="button"
                    onClick={() => setSelected(active ? null : s.id)}
                    aria-pressed={active}
                    className={`flex h-full w-full items-start gap-3.5 rounded-xl border p-5 text-left transition-all ${
                      active
                        ? "border-brand-600 bg-brand-50 shadow-e1"
                        : "border-line-200 bg-white hover:border-brand-500/60 hover:shadow-e1"
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                        active ? "bg-brand-600 text-white" : "bg-mist-50 text-brand-600"
                      }`}
                    >
                      <Icon size={18} strokeWidth={1.9} aria-hidden />
                    </span>
                    <span className="text-[14px] font-medium leading-snug text-ink-900">
                      {fr ? s.title.fr : s.title.en}
                    </span>
                    <ChevronRight
                      size={16}
                      aria-hidden
                      className={`ml-auto mt-1 shrink-0 transition-transform ${active ? "rotate-90 text-brand-600" : "text-slatex-400"}`}
                    />
                  </button>
                </Reveal>
              );
            })}
          </div>

          {selected ? (
            <Reveal>
              <div className="on-dark mt-8 rounded-2xl bg-navy-950 p-7 lg:p-9">
                <p className="eyebrow mb-3">
                  {fr ? "Orientation pour cette situation" : "Guidance for this situation"}
                </p>
                <p className="max-w-2xl text-[14.5px] leading-relaxed text-slatex-300">
                  {fr
                    ? "Les premiers gestes listés ci-dessus s'appliquent à toutes les situations. Pour ce cas précis, la démarche dépend de votre pays et de votre fournisseur : contactez toujours votre banque, votre opérateur ou la plateforme concernée par son canal officiel. GLOPROFAS ne peut pas récupérer les fonds ni mener d'enquête, mais votre signalement aide à protéger d'autres personnes."
                    : "The first steps listed above apply to every situation. For this specific case, the process depends on your country and provider: always contact your bank, operator or the platform concerned through its official channel. GLOPROFAS cannot recover funds or run investigations, but your report helps protect others."}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Btn href="/report" variant="signal" size="sm">
                    {fr ? "Signaler maintenant" : "Report now"}
                  </Btn>
                  <Btn href="/check" variant="outlineDark" size="sm">
                    {fr ? "Vérifier un message lié" : "Check a related message"}
                  </Btn>
                </div>
              </div>
            </Reveal>
          ) : null}
        </div>
      </section>

      {/* Human impact */}
      <section className="section-y bg-white">
        <div className="container-g">
          <Reveal>
            <Masthead num="03" eyebrow={fr ? "Impact humain" : "Human impact"} />
            <h2 className="h2-g mt-6 max-w-2xl">
              {fr
                ? "Les arnaques touchent bien plus qu'un compte bancaire."
                : "Scams reach far beyond a bank account."}
            </h2>
            <p className="lead-g mt-4 max-w-2xl">
              {fr
                ? "Chaque personne vit les choses différemment. Ces conséquences sont fréquentes, mais pas universelles — et elles ne sont jamais une raison d'avoir honte."
                : "Everyone experiences things differently. These consequences are common, but not universal — and they are never a reason for shame."}
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {IMPACT.map((grp, i) => {
              const Icon = grp.icon;
              return (
                <Reveal key={i} delay={(i % 2) * 90}>
                  <article className="card-g hoverable h-full p-6">
                    <div className="flex items-center gap-3.5">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                        <Icon size={20} strokeWidth={1.9} aria-hidden />
                      </span>
                      <h3 className="h3-g text-[1.08rem]">{fr ? grp.title.fr : grp.title.en}</h3>
                    </div>
                    <ul className="mt-4 space-y-2.5">
                      {(fr ? grp.items.fr : grp.items.en).map((item, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-ink-700">
                          <Check size={14} className="mt-1 shrink-0 text-brand-600" aria-hidden />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              );
            })}
          </div>

          {/* Family image band */}
          <Reveal delay={140}>
            <figure className="mt-10 grid gap-6 overflow-hidden rounded-2xl lg:grid-cols-2">
              <img
                src="/images/gen/family-impact.jpg"
                alt={fr ? "Une famille discute ensemble des finances du foyer avec soutien mutuel" : "A family discusses household finances together with mutual support"}
                width={1344}
                height={768}
                loading="lazy"
                className="img-editorial aspect-[16/10] w-full rounded-xl object-cover"
              />
              <figcaption className="flex flex-col justify-center">
                <h3 className="h3-g">
                  {fr ? "En parler aide à se reconstruire." : "Talking about it helps recovery."}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-slatex-600">
                  {fr
                    ? "Le silence protège les escrocs, pas les victimes. Parlez à une personne de confiance, expliquez la situation à votre famille ou à votre équipe, et rappelez-vous que les professionnels du soutien existent : conseillers, services clients des banques, associations d'aide aux victimes selon votre pays."
                    : "Silence protects scammers, not victims. Talk to a trusted person, explain the situation to your family or team, and remember that support professionals exist: counselors, bank customer services, and victim-support associations depending on your country."}
                </p>
                <div className="mt-6">
                  <LinkG href="/scams">
                    {fr ? "Comprendre comment fonctionnent les arnaques" : "Understand how scams work"}
                  </LinkG>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Closing note */}
      <section className="on-dark bg-navy-900">
        <div className="container-g flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center">
          <Reveal>
            <h2 className="h2-g max-w-xl text-white">
              {fr ? "Votre signalement protège les autres." : "Your report protects others."}
            </h2>
          </Reveal>
          <Reveal delay={120} className="flex flex-wrap gap-3">
            <Btn href="/report" variant="signal">
              <ArrowRight size={15} aria-hidden />
              {fr ? "Signaler une arnaque" : "Report a scam"}
            </Btn>
          </Reveal>
        </div>
      </section>
    </>
  );
}

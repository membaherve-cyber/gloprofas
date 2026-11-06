"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  AlertCircle,
  ArrowRight,
  Bitcoin,
  Briefcase,
  Building2,
  ChevronRight,
  Globe,
  HandCoins,
  HeartCrack,
  Image as ImageIcon,
  Info,
  Landmark,
  MailWarning,
  OctagonAlert,
  Pause,
  Play,
  ShieldQuestion,
  ShoppingBag,
  Smartphone,
  TrendingUp,
  TriangleAlert,
  UserX,
  type LucideIcon,
} from "lucide-react";
import {
  ALERT_AERIAL_HEROES,
  ARTICLE_AERIAL_HEROES,
  PAGE_AERIAL_HEROES,
  SCAM_CATEGORY_AERIAL_HEROES,
} from "@/lib/african-cities";
import type { Locale } from "@/lib/i18n";
import type { BiText } from "@/lib/zite-data";

const IMAGE_TO_VIDEO_MAP: Record<string, { video: string; coords?: string }> = {};
for (const group of [
  PAGE_AERIAL_HEROES,
  SCAM_CATEGORY_AERIAL_HEROES,
  ALERT_AERIAL_HEROES,
  ARTICLE_AERIAL_HEROES,
]) {
  for (const entry of Object.values(group)) {
    if (entry.image && entry.video) {
      IMAGE_TO_VIDEO_MAP[entry.image] = {
        video: entry.video,
        coords: entry.coords,
      };
    }
  }
}

const nbsp = "\u00A0";

export const L = {
  nav: {
    about: { en: "About", fr: "À propos" },
    awareness: { en: "Scam Awareness", fr: "Sensibilisation" },
    resources: { en: "Resources", fr: "Ressources" },
    services: { en: "Services", fr: "Services" },
    news: { en: "News", fr: "Actualités" },
    involved: { en: "Get Involved", fr: "S’impliquer" },
    contact: { en: "Contact", fr: "Contact" },
  },
  latestAlert: { en: "Latest alert", fr: "Dernière alerte" },
  report: { en: "Report a scam", fr: "Signaler une arnaque" },
  skip: { en: "Skip to content", fr: "Aller au contenu" },
  menu: { en: "Menu", fr: "Menu" },
  hero: {
    eyebrow: {
      en: "Fraud prevention and digital safety",
      fr: "Prévention de la fraude et sécurité numérique",
    },
    h1: {
      en: "Spot the scam before it costs you.",
      fr: "Repérez l’arnaque avant qu’elle ne vous coûte cher.",
    },
    lead: {
      en: "GLOPROFAS helps individuals, families and businesses recognise fraud, protect their money and know what to do next. Start with a free guide, or report what happened to you.",
      fr: "GLOPROFAS aide les particuliers, les familles et les entreprises à reconnaître la fraude, à protéger leur argent et à savoir quoi faire ensuite. Commencez par un guide gratuit ou signalez ce qui vous est arrivé.",
    },
    secondary: { en: "Learn how to stay safe", fr: "Apprendre à se protéger" },
  },
  strip: {
    text: {
      en: "Got a suspicious message? Check before you pay.",
      fr: `Un message suspect${nbsp}? Vérifiez avant de payer.`,
    },
    cta: { en: "Check it with Jarvis", fr: "Vérifier avec Jarvis" },
  },
  intro: {
    eyebrow: { en: "Who we are", fr: "Qui sommes-nous" },
    h2: {
      en: "Fighting scams through awareness, prevention and action.",
      fr: "Lutter contre les arnaques par la sensibilisation, la prévention et l’action.",
    },
    body: {
      en: "The Global Programme for the Fight Against Scams is an independent, not-for-profit initiative. Scams move fast across borders and phones; clear information moves slower. We close that gap by turning what people report into warnings anyone can act on, with particular attention to Africa and Cameroon.",
      fr: "Le Programme mondial de lutte contre les arnaques est une initiative indépendante à but non lucratif. Les arnaques circulent vite, d’un pays et d’un téléphone à l’autre ; l’information claire, moins. Nous comblons cet écart en transformant les signalements en mises en garde utiles à tous, avec une attention particulière à l’Afrique et au Cameroun.",
    },
    points: [
      {
        en: "Written for everyday people, not specialists",
        fr: "Écrit pour tout le monde, pas pour les spécialistes",
      },
      {
        en: "Warnings drawn from real public reports",
        fr: "Des mises en garde tirées de vrais signalements",
      },
      {
        en: "Help for households, businesses and communities",
        fr: "Une aide aux foyers, aux entreprises et aux communautés",
      },
      {
        en: "A global mission, rooted in African realities",
        fr: "Une mission mondiale, ancrée dans les réalités africaines",
      },
    ],
    anchor: {
      en: "scams broken down step by step",
      fr: "arnaques décortiquées pas à pas",
    },
    cta: { en: "Explore common scams", fr: "Découvrir les arnaques courantes" },
  },
  scams: {
    eyebrow: { en: "Common scams", fr: "Arnaques courantes" },
    h2: {
      en: "Know the tricks people use most.",
      fr: "Connaître les ruses les plus utilisées.",
    },
    lead: {
      en: "Each guide explains how the scam works, the warning signs and what to do if it happens to you.",
      fr: "Chaque guide explique le fonctionnement de l’arnaque, les signaux d’alerte et la marche à suivre si elle vous arrive.",
    },
  },
  how: {
    eyebrow: { en: "How scams work", fr: "Comment fonctionnent les arnaques" },
    h2: {
      en: "Most scams follow the same four moves.",
      fr: "La plupart des arnaques suivent les mêmes quatre étapes.",
    },
    steps: [
      {
        t: { en: "Contact", fr: "Le contact" },
        d: {
          en: "A message, call or post arrives, often looking official or friendly.",
          fr: "Un message, un appel ou une publication arrive, souvent d’apparence officielle ou amicale.",
        },
      },
      {
        t: { en: "Pressure", fr: "La pression" },
        d: {
          en: "Urgency, fear or a great opportunity pushes you to act now.",
          fr: "L’urgence, la peur ou une belle occasion vous pousse à agir tout de suite.",
        },
      },
      {
        t: { en: "Payment", fr: "Le paiement" },
        d: {
          en: "You are asked to pay, transfer or share a code.",
          fr: "On vous demande de payer, de transférer ou de partager un code.",
        },
      },
      {
        t: { en: "Disappearance", fr: "La disparition" },
        d: {
          en: "The contact goes silent and the money is gone.",
          fr: "Le contact disparaît, et l’argent avec lui.",
        },
      },
    ],
    techTitle: { en: "Techniques to recognise", fr: "Techniques à reconnaître" },
    techniques: [
      {
        t: { en: "Psychological manipulation", fr: "Manipulation psychologique" },
        d: {
          en: "Playing on trust, fear, hope or shame so you stop questioning.",
          fr: "Jouer sur la confiance, la peur, l’espoir ou la honte pour vous empêcher de douter.",
        },
      },
      {
        t: { en: "Fake identities", fr: "Fausses identités" },
        d: {
          en: "Stolen photos, invented profiles and borrowed names.",
          fr: "Photos volées, profils inventés et noms empruntés.",
        },
      },
      {
        t: { en: "Urgency and intimidation", fr: "Urgence et intimidation" },
        d: {
          en: "Deadlines, threats of blocked accounts or legal trouble.",
          fr: "Délais, menaces de blocage de compte ou de poursuites.",
        },
      },
      {
        t: { en: "Fake investment opportunities", fr: "Faux placements" },
        d: {
          en: "Guaranteed returns, early “winners” and pressure to recruit.",
          fr: "Gains garantis, premiers « gagnants » et pression pour recruter.",
        },
      },
      {
        t: { en: "Impersonation", fr: "Usurpation" },
        d: {
          en: "Posing as a relative, a bank, an operator or an official.",
          fr: "Se faire passer pour un proche, une banque, un opérateur ou un agent.",
        },
      },
      {
        t: { en: "Social engineering", fr: "Ingénierie sociale" },
        d: {
          en: "Gathering small details to make a later request believable.",
          fr: "Collecter de petits détails pour rendre une demande crédible.",
        },
      },
      {
        t: { en: "Fraudulent payment requests", fr: "Demandes de paiement frauduleuses" },
        d: {
          en: "Fake invoices, changed bank details and reversal requests.",
          fr: "Fausses factures, coordonnées bancaires modifiées et demandes de renvoi.",
        },
      },
      {
        t: { en: "Fake websites and applications", fr: "Faux sites et applications" },
        d: {
          en: "Copycat pages and apps built to take payments or logins.",
          fr: "Pages et applications copiées pour capter paiements ou identifiants.",
        },
      },
    ],
  },
  stats: {
    eyebrow: { en: "What you will find here", fr: "Ce que vous trouverez ici" },
    categories: { en: "Scam guides", fr: "Guides d’arnaques" },
    resources: { en: "Resources published", fr: "Ressources publiées" },
    languages: { en: "Languages", fr: "Langues" },
  },
  reportSec: {
    eyebrow: { en: "Report", fr: "Signaler" },
    h2: {
      en: "Have you encountered a scam?",
      fr: `Avez-vous été confronté à une arnaque${nbsp}?`,
    },
    body: {
      en: "It takes about five minutes. You are not to blame, and what you share helps others stay safe. No account needed.",
      fr: "Cela prend environ cinq minutes. Vous n’êtes pas en faute, et ce que vous partagez aide d’autres personnes à se protéger. Aucun compte requis.",
    },
    note: {
      en: "A report to GLOPROFAS is not a police report and does not guarantee recovery of funds. If you sent money, contact your bank or mobile money provider now through its official channel.",
      fr: "Un signalement à GLOPROFAS n’est pas une plainte auprès de la police et ne garantit pas la récupération des fonds. Si vous avez envoyé de l’argent, contactez dès maintenant votre banque ou votre opérateur de mobile money par son canal officiel.",
    },
    steps: [
      {
        t: { en: "What happened", fr: "Ce qui s’est passé" },
        d: {
          en: "The type of scam, when and how it reached you.",
          fr: "Le type d’arnaque, quand et comment elle vous a atteint.",
        },
      },
      {
        t: { en: "Evidence", fr: "Preuves" },
        d: {
          en: "Optional screenshots or documents, kept private.",
          fr: "Captures ou documents facultatifs, conservés en privé.",
        },
      },
      {
        t: { en: "Reference number", fr: "Numéro de référence" },
        d: {
          en: "You receive a reference to follow up.",
          fr: "Vous recevez une référence pour le suivi.",
        },
      },
    ],
  },
  res: {
    eyebrow: { en: "Protection and resources", fr: "Protection et ressources" },
    h2: {
      en: "Practical tools to protect yourself.",
      fr: "Des outils pratiques pour vous protéger.",
    },
    featured: { en: "Featured", fr: "À la une" },
  },
  services: {
    eyebrow: { en: "Our services", fr: "Nos services" },
    h2: {
      en: "Free for the public. Professional support when you need more.",
      fr: "Gratuit pour le public. Un accompagnement professionnel si besoin.",
    },
    freeTitle: {
      en: "Free public-interest work",
      fr: "Actions d’intérêt public gratuites",
    },
    freeTag: { en: "Always free", fr: "Toujours gratuit" },
    free: [
      {
        en: "Awareness guides and public alerts",
        fr: "Guides de sensibilisation et alertes publiques",
      },
      {
        en: "Reporting suspicious activity",
        fr: "Signalement des activités suspectes",
      },
      {
        en: "Downloadable checklists and resources",
        fr: "Listes de vérification et ressources téléchargeables",
      },
      { en: "Community education", fr: "Éducation des communautés" },
    ],
    paidTitle: { en: "Professional services", fr: "Services professionnels" },
    paidTag: { en: "Paid or on quotation", fr: "Payant ou sur devis" },
    paid: [
      {
        en: "Individual digital safety assessments",
        fr: "Évaluations de sécurité numérique individuelles",
      },
      {
        en: "Business fraud risk assessments",
        fr: "Évaluations des risques de fraude en entreprise",
      },
      {
        en: "Enterprise and institutional programmes",
        fr: "Programmes pour entreprises et institutions",
      },
      {
        en: "Training and capacity building",
        fr: "Formation et renforcement des capacités",
      },
    ],
    freeCta: { en: "Browse free resources", fr: "Voir les ressources gratuites" },
    paidCta: { en: "Ask about services", fr: "Se renseigner sur les services" },
  },
  newsSec: {
    eyebrow: { en: "Alerts and news", fr: "Alertes et actualités" },
    h2: {
      en: "What people are reporting now.",
      fr: "Ce que l’on signale en ce moment.",
    },
    news: { en: "Latest articles", fr: "Derniers articles" },
    empty: {
      en: "No published alerts yet.",
      fr: "Aucune alerte publiée pour le moment.",
    },
  },
  risk: {
    Low: { en: "Low", fr: "Faible" },
    Medium: { en: "Medium", fr: "Moyen" },
    High: { en: "High", fr: "Élevé" },
    Critical: { en: "Critical", fr: "Critique" },
  },
  nl: {
    h2: {
      en: "Get scam alerts in your inbox.",
      fr: "Recevez les alertes par courriel.",
    },
    body: {
      en: "One short email when something new is spreading. Unsubscribe any time.",
      fr: "Un court courriel quand une nouvelle arnaque circule. Désinscription à tout moment.",
    },
    name: { en: "Name", fr: "Nom" },
    email: { en: "Email", fr: "Courriel" },
    country: { en: "Country", fr: "Pays" },
    language: { en: "Preferred language", fr: "Langue préférée" },
    consent: {
      en: "I agree to receive GLOPROFAS emails and accept the privacy policy.",
      fr: "J’accepte de recevoir les courriels de GLOPROFAS et la politique de confidentialité.",
    },
    submit: { en: "Subscribe", fr: "S’abonner" },
    done: {
      en: "Thank you. Your subscription is registered.",
      fr: "Merci. Votre inscription est enregistrée.",
    },
    err: {
      en: "Something went wrong. Please check your details and try again.",
      fr: "Une erreur est survenue. Vérifiez vos informations et réessayez.",
    },
    required: {
      en: "This field is required.",
      fr: "Ce champ est obligatoire.",
    },
    invalidEmail: {
      en: "Enter a valid email address.",
      fr: "Saisissez une adresse électronique valide.",
    },
    consentReq: {
      en: "Please give your consent to subscribe.",
      fr: "Veuillez donner votre consentement.",
    },
  },
  final: {
    h2: {
      en: "Together, we can make the digital world safer.",
      fr: "Ensemble, rendons le monde numérique plus sûr.",
    },
    resources: { en: "Access resources", fr: "Accéder aux ressources" },
    contact: { en: "Contact GLOPROFAS", fr: "Contacter GLOPROFAS" },
  },
  footer: {
    desc: {
      en: "An independent, not-for-profit programme for scam awareness, prevention, education and assistance.",
      fr: "Un programme indépendant à but non lucratif de sensibilisation, de prévention, d’éducation et d’assistance contre les arnaques.",
    },
    quick: { en: "Quick links", fr: "Liens rapides" },
    contactTitle: { en: "Contact", fr: "Contact" },
    contactPending: {
      en: "Contact details will be published here once confirmed.",
      fr: "Les coordonnées seront publiées ici une fois confirmées.",
    },
    disclaimer: {
      en: "GLOPROFAS is not a government body or law enforcement authority, cannot guarantee recovery of funds and does not certify any website or person as legitimate. Contact your financial institution and the competent authorities through official channels.",
      fr: "GLOPROFAS n’est ni un organisme public ni une autorité policière, ne peut garantir la récupération des fonds et ne certifie aucun site ni aucune personne. Contactez votre institution financière et les autorités compétentes par leurs canaux officiels.",
    },
    rights: {
      en: "Global Programme for the Fight Against Scams. All rights reserved.",
      fr: "Programme mondial de lutte contre les arnaques. Tous droits réservés.",
    },
  },
  imgPending: { en: "Image pending", fr: "Image à venir" },
} as const;

export function R(value: BiText | undefined, lang: Locale): string {
  if (!value) return "";
  return value[lang] || value.en;
}

export function formatZiteDate(dateStr: string | Date, lang: Locale): string {
  if (!dateStr) return "";
  const d = typeof dateStr === "string" ? new Date(dateStr) : dateStr;
  if (Number.isNaN(d.getTime())) return String(dateStr);
  return new Intl.DateTimeFormat(lang === "fr" ? "fr-FR" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-[600ms] ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      } ${className}`}
      style={{
        transitionTimingFunction: "var(--ease-out-brand)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const btnVariants = {
  signal: "bg-signal text-navy-950 hover:brightness-105",
  primary: "bg-brand-600 text-white hover:bg-brand-500",
  outline: "border border-line text-ink hover:border-brand-600 hover:text-brand-600",
  outlineDark: "border border-white/25 text-white hover:border-white/60",
  ghost: "text-ink hover:bg-mist",
} as const;

export function Btn({
  href,
  children,
  variant = "primary",
  className = "",
  arrow = true,
  onClick,
  type,
}: {
  href?: string;
  children: ReactNode;
  variant?: keyof typeof btnVariants;
  className?: string;
  arrow?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const cls = `group inline-flex h-[52px] items-center justify-center gap-2 rounded-full px-7 text-[0.95rem] font-semibold transition-colors duration-150 whitespace-nowrap disabled:opacity-60 ${btnVariants[variant]} ${className}`;
  const inner = (
    <>
      <span className="text-roll">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
      {arrow ? (
        <ArrowRight
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
          strokeWidth={2}
        />
      ) : null}
    </>
  );

  if (href?.startsWith("/")) {
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type ?? "button"} onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  dark = false,
  center = false,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <Reveal className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <p
        className={`eyebrow flex items-center gap-3 ${center ? "justify-center" : ""} ${
          dark ? "text-cyanx" : "text-brand-600"
        }`}
      >
        <span className={`h-px w-8 ${dark ? "bg-cyanx" : "bg-brand-600"}`} />
        {eyebrow}
      </p>
      <h2 className={`h2 mt-4 ${dark ? "text-white" : "text-ink"}`}>{title}</h2>
      {lead ? (
        <p
          className={`lead mt-5 ${dark ? "text-slatex-300" : "text-slatex-600"} ${
            center ? "mx-auto" : ""
          }`}
        >
          {lead}
        </p>
      ) : null}
    </Reveal>
  );
}

export function PageHero({
  title,
  lead,
  eyebrow,
  image,
  video,
  coords,
  cityBadge,
  crumbs,
}: {
  title: string;
  lead?: string;
  eyebrow?: string;
  image?: string | null;
  video?: string | null;
  coords?: string;
  cityBadge?: string;
  crumbs: { label: string; to?: string }[];
}) {
  const posterSrc = image || "/images/cities/yaounde-cameroon.jpg";
  const mapped = IMAGE_TO_VIDEO_MAP[posterSrc];
  const videoSrc = video || mapped?.video || "/video/cities/douala-cameroon.mp4";
  const resolvedCoords = coords || mapped?.coords || "04°03′N · 09°42′E";

  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || reducedMotion || videoFailed) return;
    if (isPlaying) {
      void el.play().catch(() => {
        // Autoplay prevented by browser power saver; poster remains visible.
      });
    } else {
      el.pause();
    }
  }, [isPlaying, reducedMotion, videoFailed, videoSrc]);

  return (
    <section className="on-dark relative isolate overflow-hidden border-b border-white/10 bg-navy-950 pt-[148px] pb-16 lg:pt-[188px] lg:pb-24">
      {/* Fallback / Poster image always rendered beneath video */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={posterSrc}
        alt=""
        className="hero-aerial-zoom absolute inset-0 -z-30 h-full w-full object-cover object-center"
      />

      {/* Ultrarealistic Full-Bleed Aerial Drone Video */}
      {!reducedMotion && !videoFailed ? (
        <video
          key={videoSrc}
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={posterSrc}
          onError={() => setVideoFailed(true)}
          aria-hidden="true"
          tabIndex={-1}
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : null}

      {/* Editorial Multi-Stop Gradient + Architectural Grid Overlay */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(102deg, rgba(5, 11, 26, 0.93) 0%, rgba(10, 22, 49, 0.78) 54%, rgba(5, 11, 26, 0.52) 100%), linear-gradient(180deg, rgba(5, 11, 26, 0.55) 0%, transparent 35%, rgba(5, 11, 26, 0.85) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "linear-gradient(90deg, #000 15%, transparent 80%)",
        }}
      />

      <div className="container-g relative">
        {/* Top Editorial Telemetry & Breadcrumb Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/12 pb-4">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-slatex-300">
              {crumbs.map((c, idx) => (
                <li key={`${c.label}-${idx}`} className="flex items-center gap-1.5">
                  {idx > 0 ? <ChevronRight className="h-3.5 w-3.5 text-white/40" /> : null}
                  {c.to ? (
                    <Link href={c.to} className="transition-colors hover:text-white">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-cyanx">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <div className="flex flex-wrap items-center gap-2.5">
            {cityBadge ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-navy-950/75 px-3.5 py-1 text-[11px] font-semibold tracking-wide text-slatex-300 backdrop-blur-md">
                <span className="animate-dot h-1.5 w-1.5 rounded-full bg-cyanx" />
                <span>{cityBadge}</span>
                <span className="hidden border-l border-white/15 pl-2 font-mono text-[10px] text-white/60 sm:inline">
                  {resolvedCoords}
                </span>
              </span>
            ) : null}
            {!reducedMotion && !videoFailed ? (
              <button
                type="button"
                onClick={() => setIsPlaying((p) => !p)}
                aria-pressed={!isPlaying}
                aria-label={isPlaying ? "Pause aerial video" : "Play aerial video"}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-navy-950/75 text-white/80 backdrop-blur-md transition hover:border-cyanx hover:text-cyanx"
              >
                {isPlaying ? (
                  <Pause className="h-3 w-3" aria-hidden="true" />
                ) : (
                  <Play className="h-3 w-3" aria-hidden="true" />
                )}
              </button>
            ) : null}
          </div>
        </div>

        {eyebrow ? (
          <p className="eyebrow mt-8 flex items-center gap-3 text-cyanx">
            <span className="h-px w-8 bg-cyanx" />
            {eyebrow}
          </p>
        ) : null}
        <Reveal>
          <h1
            className="h1 mt-4 max-w-4xl text-white"
            style={{ fontSize: "clamp(2.35rem, 1.55rem + 2.8vw, 3.85rem)" }}
          >
            {title}
          </h1>
        </Reveal>
        {lead ? (
          <Reveal delay={120}>
            <p className="lead mt-5 max-w-2xl text-slatex-300">{lead}</p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

export function ImageSlot({
  id,
  label = "",
  lang = "en",
  className = "",
}: {
  id: string;
  label?: string;
  lang?: Locale;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`grid-pattern relative flex items-center justify-center overflow-hidden bg-navy-900 ${className}`}
    >
      <div className="flex flex-col items-center gap-2 px-4 text-center text-slatex-300">
        <ImageIcon className="h-6 w-6" strokeWidth={1.5} />
        <span className="text-xs font-semibold uppercase tracking-widest">{id}</span>
        <span className="text-xs opacity-70">{R(L.imgPending, lang)}</span>
      </div>
    </div>
  );
}

export function IconTile({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <div
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] ${
        dark ? "bg-white/10 text-brand-500" : "bg-brand-600/10 text-brand-600"
      }`}
    >
      {children}
    </div>
  );
}

const iconMap: Record<string, LucideIcon> = {
  "mail-warning": MailWarning,
  smartphone: Smartphone,
  "trending-up": TrendingUp,
  briefcase: Briefcase,
  "heart-crack": HeartCrack,
  "shopping-bag": ShoppingBag,
  bitcoin: Bitcoin,
  "user-x": UserX,
  "hand-coins": HandCoins,
  landmark: Landmark,
  "building-2": Building2,
  globe: Globe,
};

export function getCategoryIcon(iconName: string): LucideIcon {
  return iconMap[iconName] ?? ShieldQuestion;
}

const riskMap: Record<
  string,
  { cls: string; Icon: LucideIcon; key: keyof typeof L.risk }
> = {
  Low: {
    cls: "bg-risk-low/10 border-risk-low text-ink",
    Icon: Info,
    key: "Low",
  },
  low: {
    cls: "bg-risk-low/10 border-risk-low text-ink",
    Icon: Info,
    key: "Low",
  },
  Medium: {
    cls: "bg-risk-medium/15 border-risk-medium text-ink",
    Icon: AlertCircle,
    key: "Medium",
  },
  medium: {
    cls: "bg-risk-medium/15 border-risk-medium text-ink",
    Icon: AlertCircle,
    key: "Medium",
  },
  High: {
    cls: "bg-risk-high/10 border-risk-high text-ink",
    Icon: TriangleAlert,
    key: "High",
  },
  high: {
    cls: "bg-risk-high/10 border-risk-high text-ink",
    Icon: TriangleAlert,
    key: "High",
  },
  Critical: {
    cls: "bg-risk-critical border-risk-critical text-white",
    Icon: OctagonAlert,
    key: "Critical",
  },
  critical: {
    cls: "bg-risk-critical border-risk-critical text-white",
    Icon: OctagonAlert,
    key: "Critical",
  },
};

export function ZiteRiskBadge({
  level,
  lang,
}: {
  level: string;
  lang: Locale;
}) {
  const entry = riskMap[level] ?? riskMap.Low;
  const Icon = entry.Icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold uppercase tracking-wider ${entry.cls}`}
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={2} />
      {R(L.risk[entry.key], lang)}
    </span>
  );
}

export const NAV_ITEMS = [
  { key: "about" as const, href: "/about" },
  { key: "awareness" as const, href: "/scams" },
  { key: "resources" as const, href: "/resources" },
  { key: "services" as const, href: "/services" },
  { key: "news" as const, href: "/news" },
  { key: "involved" as const, href: "/get-involved" },
  { key: "contact" as const, href: "/contact" },
];

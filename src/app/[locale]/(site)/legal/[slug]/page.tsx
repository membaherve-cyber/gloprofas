import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { PageHero } from "@/components/zite/shared";

const UPDATED = {
  en: "Last updated: 1 November 2026",
  fr: "Dernière mise à jour : 1er novembre 2026",
} as const;

type LegalDoc = {
  title: string;
  lead: string;
  sections: { h: string; p: string }[];
};

const LEGAL_DOCS: Record<string, { en: LegalDoc; fr: LegalDoc }> = {
  privacy: {
    en: {
      title: "Privacy Policy",
      lead: "How GLOPROFAS collects, uses and protects your personal information.",
      sections: [
        {
          h: "Who we are",
          p: "GLOPROFAS (Global Programme for the Fight Against Scams) is an independent, not-for-profit initiative. We are responsible for the personal information you share through this website.",
        },
        {
          h: "What we collect",
          p: "Only what you choose to give us: your name, email, country and language when you subscribe; the details, contact information and optional evidence files you include in a scam report; and the content of messages you send through the contact form or the assistant.",
        },
        {
          h: "Why we use it",
          p: "To send the alerts you asked for, to review reports and publish anonymised public warnings, to reply to your messages, and to improve our guidance. We never sell your information or use it for advertising.",
        },
        {
          h: "Scam reports and evidence",
          p: "Reports and files are kept private and reviewed by authorised GLOPROFAS staff only. Public alerts never include your name or contact details. We may share information with competent authorities only where required by law or with your agreement.",
        },
        {
          h: "The AI assistant",
          p: "Questions you type into the assistant are processed by an AI provider to generate an answer. Do not enter passwords, PINs, card numbers or identity numbers.",
        },
        {
          h: "How long we keep it",
          p: "Newsletter data until you unsubscribe; reports and messages for as long as needed to handle them and to document scam trends, after which they are deleted or anonymised.",
        },
        {
          h: "Your rights",
          p: "You can ask to access, correct or delete your information, or withdraw your consent at any time, through the contact page.",
        },
      ],
    },
    fr: {
      title: "Politique de confidentialité",
      lead: "Comment GLOPROFAS collecte, utilise et protège vos données personnelles.",
      sections: [
        {
          h: "Qui sommes-nous",
          p: "GLOPROFAS (Programme mondial de lutte contre les arnaques) est une initiative indépendante à but non lucratif, responsable des données que vous partagez sur ce site.",
        },
        {
          h: "Ce que nous collectons",
          p: "Uniquement ce que vous choisissez de nous transmettre : nom, courriel, pays et langue lors de l’abonnement ; les détails, coordonnées et preuves facultatives d’un signalement ; le contenu des messages envoyés via le formulaire de contact ou l’assistant.",
        },
        {
          h: "Pourquoi nous les utilisons",
          p: "Pour vous envoyer les alertes demandées, examiner les signalements et publier des mises en garde anonymisées, répondre à vos messages et améliorer nos conseils. Nous ne vendons jamais vos données et ne les utilisons pas à des fins publicitaires.",
        },
        {
          h: "Signalements et preuves",
          p: "Les signalements et fichiers restent privés et ne sont consultés que par le personnel autorisé. Les alertes publiques ne contiennent jamais votre nom ni vos coordonnées. Nous ne partageons des informations avec les autorités compétentes que si la loi l’exige ou avec votre accord.",
        },
        {
          h: "L’assistant IA",
          p: "Les questions saisies dans l’assistant sont traitées par un fournisseur d’IA pour générer une réponse. N’y saisissez jamais de mot de passe, code PIN, numéro de carte ou d’identité.",
        },
        {
          h: "Durée de conservation",
          p: "Les données d’abonnement jusqu’à votre désinscription ; les signalements et messages le temps nécessaire à leur traitement et à l’analyse des tendances, puis ils sont supprimés ou anonymisés.",
        },
        {
          h: "Vos droits",
          p: "Vous pouvez demander l’accès, la rectification ou la suppression de vos données, ou retirer votre consentement à tout moment, via la page Contact.",
        },
      ],
    },
  },
  terms: {
    en: {
      title: "Terms of Use",
      lead: "The rules for using the GLOPROFAS website and its services.",
      sections: [
        {
          h: "Information only",
          p: "Content on this website is general guidance to help you recognise and respond to scams. It is not legal, financial or law-enforcement advice.",
        },
        {
          h: "No guarantees",
          p: "GLOPROFAS is not a government body or police authority, cannot guarantee recovery of funds and does not certify any person, company or website as legitimate.",
        },
        {
          h: "Reports you submit",
          p: "You agree that the information you report is accurate to the best of your knowledge and that you have the right to share any files you upload. False or malicious reports may be discarded.",
        },
        {
          h: "The AI assistant",
          p: "Answers are generated automatically and may be incomplete or wrong. Always verify through official channels before acting.",
        },
        {
          h: "Acceptable use",
          p: "Do not misuse the website, attempt to disrupt it, or submit content that is unlawful, abusive or infringes the rights of others.",
        },
        {
          h: "Intellectual property",
          p: "Guides and resources may be shared freely for non-commercial awareness purposes with credit to GLOPROFAS. The name and logo may not be used to suggest endorsement.",
        },
      ],
    },
    fr: {
      title: "Conditions d’utilisation",
      lead: "Les règles d’utilisation du site GLOPROFAS et de ses services.",
      sections: [
        {
          h: "Information uniquement",
          p: "Le contenu de ce site est un conseil général pour reconnaître les arnaques et y réagir. Il ne constitue pas un avis juridique, financier ou policier.",
        },
        {
          h: "Aucune garantie",
          p: "GLOPROFAS n’est ni un organisme public ni une autorité policière, ne peut garantir la récupération des fonds et ne certifie aucune personne, entreprise ou site.",
        },
        {
          h: "Vos signalements",
          p: "Vous certifiez que les informations signalées sont exactes à votre connaissance et que vous avez le droit de partager les fichiers envoyés. Les signalements faux ou malveillants peuvent être écartés.",
        },
        {
          h: "L’assistant IA",
          p: "Les réponses sont générées automatiquement et peuvent être incomplètes ou erronées. Vérifiez toujours par les canaux officiels avant d’agir.",
        },
        {
          h: "Utilisation acceptable",
          p: "N’utilisez pas le site de manière abusive, ne tentez pas de le perturber et ne soumettez aucun contenu illégal, injurieux ou portant atteinte aux droits d’autrui.",
        },
        {
          h: "Propriété intellectuelle",
          p: "Les guides et ressources peuvent être partagés librement à des fins de sensibilisation non commerciales, en citant GLOPROFAS. Le nom et le logo ne peuvent être utilisés pour suggérer un soutien.",
        },
      ],
    },
  },
  cookies: {
    en: {
      title: "Cookie Notice",
      lead: "How this website uses cookies and similar storage.",
      sections: [
        {
          h: "Essential storage only",
          p: "This website uses only the storage needed for it to work, such as remembering your language. We do not use advertising or tracking cookies.",
        },
        {
          h: "Changes",
          p: "If we add analytics in the future, this notice will be updated and you will be asked for consent where required.",
        },
      ],
    },
    fr: {
      title: "Avis sur les cookies",
      lead: "Comment ce site utilise les cookies et le stockage similaire.",
      sections: [
        {
          h: "Stockage essentiel uniquement",
          p: "Ce site n’utilise que le stockage nécessaire à son fonctionnement, par exemple pour mémoriser votre langue. Aucun cookie publicitaire ou de suivi.",
        },
        {
          h: "Évolutions",
          p: "Si nous ajoutons des outils de mesure d’audience, cet avis sera mis à jour et votre consentement sera demandé si nécessaire.",
        },
      ],
    },
  },
};

const NAV_DOCS = [
  { slug: "privacy", en: "Privacy Policy", fr: "Confidentialité" },
  { slug: "terms", en: "Terms of Use", fr: "Conditions d’utilisation" },
  { slug: "cookies", en: "Cookies", fr: "Cookies" },
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const doc = LEGAL_DOCS[slug]?.[locale];
  if (!doc) return {};
  return {
    title: doc.title,
    description: doc.lead,
    alternates: {
      canonical: `/${locale}/legal/${slug}`,
      languages: {
        en: `/en/legal/${slug}`,
        fr: `/fr/legal/${slug}`,
      },
    },
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const fr = locale === "fr";
  const l = (path = "") => `/${locale}${path}`;
  const doc = LEGAL_DOCS[slug]?.[locale];
  if (!doc) notFound();

  return (
    <>
      <PageHero
        title={doc.title}
        lead={doc.lead}
        crumbs={[
          { label: fr ? "Accueil" : "Home", to: l("/") },
          { label: doc.title },
        ]}
      />

      <section className="bg-white py-16 lg:py-24">
        <div className="container-g max-w-3xl">
          <p className="text-sm text-slatex-600">{UPDATED[locale]}</p>
          <div className="mt-10 space-y-10">
            {doc.sections.map((sec) => (
              <div key={sec.h}>
                <h2 className="h3 text-ink">{sec.h}</h2>
                <p className="mt-3 text-slatex-600">{sec.p}</p>
              </div>
            ))}
          </div>
          <nav className="mt-16 flex flex-wrap gap-3 border-t border-line pt-8">
            {NAV_DOCS.map((d) => (
              <Link
                key={d.slug}
                href={l(`/legal/${d.slug}`)}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  d.slug === slug
                    ? "bg-navy-900 text-white"
                    : "border border-line text-ink hover:border-brand-600"
                }`}
              >
                {d[locale]}
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </>
  );
}

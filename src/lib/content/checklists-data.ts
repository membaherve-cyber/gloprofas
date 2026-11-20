/**
 * GLOPROFAS Resource Centre — printable checklists content.
 *
 * Bilingual (EN / FR) printable checklists for the anti-scam library.
 * Context: Africa / Cameroon first (MTN MoMo, Orange Money, FCFA, agents),
 * with international relevance. All reference URLs were verified live
 * before inclusion. No statistics or case studies — actionable steps only.
 *
 * See resource-centre-types.ts for the Checklist / ChecklistSection contract.
 */

import type { Checklist } from "./resource-centre-types";

/* Verified reference pool (HTTP 200 at time of writing):
 * - https://www.ic3.gov/            FBI Internet Crime Complaint Center
 * - https://www.antic.cm/           ANTIC — Cameroon
 * - https://csa.gov.gh/             Cyber Security Authority — Ghana
 * - https://www.ncsc.gov.uk/cyberaware   UK NCSC Cyber Aware
 * - https://www.scamshield.gov.sg/  ScamShield — Singapore
 * - https://www.antifraudcentre-centreantifraude.ca/  Canadian Anti-Fraud Centre
 */

export const CHECKLISTS: Checklist[] = [
  /* ------------------------------------------------------------------ */
  /* 1. General scam prevention (featured)                              */
  /* ------------------------------------------------------------------ */
  {
    slug: "general-scam-prevention",
    title: {
      en: "General Scam Prevention Checklist",
      fr: "Liste de contrôle : prévention générale des arnaques",
    },
    subtitle: {
      en: "Verify before you pay, click or share.",
      fr: "Vérifiez avant de payer, de cliquer ou de partager.",
    },
    category: "general",
    featured: true,
    intro: {
      en: "This checklist brings together the everyday habits that stop the most common scams, online and by phone. Print it, keep it near where you handle money, and tick each box until the steps become routine. Share it with your family and community — a habit shared is a scam blocked.",
      fr: "Cette liste de contrôle réunit les réflexes quotidiens qui bloquent les arnaques les plus courantes, en ligne comme par téléphone. Imprimez-la, gardez-la à portée de main là où vous gérez votre argent, et cochez chaque case jusqu’à ce que ces gestes deviennent automatiques. Partagez-la avec votre famille et votre entourage : un réflexe partagé, c’est une arnaque évitée.",
    },
    warning: {
      en: "Urgency, secrecy and untraceable payment methods are the three strongest signs of a scam. If a message pushes all three at once, stop and verify before you act.",
      fr: "L’urgence, le secret et les moyens de paiement impossibles à tracer sont les trois signes les plus sûrs d’une arnaque. Si un message combine les trois, arrêtez-vous et vérifiez avant d’agir.",
    },
    sections: [
      {
        heading: { en: "Before you act", fr: "Avant d’agir" },
        items: [
          {
            en: "Stop and think before replying to any unexpected money request.",
            fr: "Réfléchissez avant de répondre à une demande d’argent inattendue.",
          },
          {
            en: "Ask yourself: did this person contact me first, out of nowhere?",
            fr: "Demandez-vous : cette personne m’a-t-elle contacté de nulle part ?",
          },
          {
            en: "Talk to one person you trust before sending money to a stranger.",
            fr: "Parlez à une personne de confiance avant d’envoyer de l’argent à un inconnu.",
          },
          {
            en: "Remember that urgency is a scammer’s favourite pressure tool.",
            fr: "Rappelez-vous que l’urgence est l’outil de pression préféré des fraudeurs.",
          },
          {
            en: "Verify surprising claims by calling back on a number you already have.",
            fr: "Vérifiez toute affirmation surprenante en rappelant un numéro connu.",
          },
          {
            en: "Treat promises of guaranteed money or prizes as false.",
            fr: "Considérez toute promesse d’argent ou de gain garanti comme fausse.",
          },
        ],
      },
      {
        heading: { en: "Messages and calls", fr: "Messages et appels" },
        items: [
          {
            en: "Do not click links in unexpected SMS, e-mail or WhatsApp messages.",
            fr: "Ne cliquez pas sur les liens de SMS, e-mails ou WhatsApp inattendus.",
          },
          {
            en: "Check the sender’s full address, not just the display name.",
            fr: "Vérifiez l’adresse complète de l’expéditeur, pas seulement le nom affiché.",
          },
          {
            en: "Hang up on callers who demand codes, PINs or immediate payment.",
            fr: "Raccrochez si l’appelant exige des codes, un code PIN ou un paiement immédiat.",
          },
          {
            en: "Never read out a one-time code to anyone, for any reason.",
            fr: "Ne dictez jamais un code à usage unique, pour quelque raison que ce soit.",
          },
          {
            en: "Delete messages announcing prizes from contests you never entered.",
            fr: "Supprimez les messages annonçant des lots de concours jamais tentés.",
          },
          {
            en: "Report impersonation of your bank or operator to its official line.",
            fr: "Signalez l’usurpation de votre banque ou opérateur sur son numéro officiel.",
          },
        ],
      },
      {
        heading: { en: "Money and payments", fr: "Argent et paiements" },
        items: [
          {
            en: "Confirm every payment request through a second channel before paying.",
            fr: "Confirmez toute demande de paiement par un second canal avant de payer.",
          },
          {
            en: "Check the recipient’s name matches the account or wallet you pay.",
            fr: "Vérifiez que le nom du bénéficiaire correspond au compte ou portefeuille payé.",
          },
          {
            en: "Refuse to pay any ‘unlocking fee’ before receiving money.",
            fr: "Refusez de payer des « frais de déblocage » avant de recevoir de l’argent.",
          },
          {
            en: "Beware anyone asking you to buy gift cards or crypto to pay.",
            fr: "Méfiez-vous de quiconque exige des cartes cadeaux ou cryptos en paiement.",
          },
          {
            en: "Count the money and check the receipt before leaving the counter.",
            fr: "Comptez l’argent et vérifiez le reçu avant de quitter le guichet.",
          },
          {
            en: "Never lend your account or wallet to move money for others.",
            fr: "Ne prêtez jamais votre compte pour transférer l’argent d’autrui.",
          },
        ],
      },
      {
        heading: { en: "Your devices and accounts", fr: "Vos appareils et comptes" },
        items: [
          {
            en: "Lock your phone with a PIN or fingerprint you alone control.",
            fr: "Verrouillez votre téléphone avec un code PIN ou votre empreinte.",
          },
          {
            en: "Install updates for your phone and apps when they appear.",
            fr: "Installez les mises à jour du téléphone et des applications dès leur sortie.",
          },
          {
            en: "Use a different strong password for e-mail and banking.",
            fr: "Utilisez un mot de passe fort et différent pour vos e-mails et votre banque.",
          },
          {
            en: "Turn on two-step verification for e-mail and social media.",
            fr: "Activez la vérification en deux étapes pour vos e-mails et réseaux sociaux.",
          },
          {
            en: "Download apps only from the official Play Store or App Store.",
            fr: "N’installez des applications que depuis le Play Store ou l’App Store.",
          },
          {
            en: "Review the permissions your installed apps can access.",
            fr: "Examinez les autorisations accordées à vos applications installées.",
          },
        ],
      },
      {
        heading: { en: "Every month", fr: "Chaque mois" },
        items: [
          {
            en: "Check your bank and mobile money statements for unknown entries.",
            fr: "Repérez toute opération inconnue dans vos relevés bancaires et MoMo.",
          },
          {
            en: "Change passwords you have reused across several accounts.",
            fr: "Changez les mots de passe réutilisés sur plusieurs comptes.",
          },
          {
            en: "Back up important photos and documents somewhere safe.",
            fr: "Sauvegardez vos photos et documents importants en lieu sûr.",
          },
          {
            en: "Discuss the latest scam attempts with your family.",
            fr: "Parlez des dernières tentatives d’arnaques avec votre famille.",
          },
          {
            en: "Save your bank’s and operator’s official fraud numbers.",
            fr: "Enregistrez les numéros antifraude de votre banque et opérateur.",
          },
        ],
      },
    ],
    references: [
      { label: "UK National Cyber Security Centre — Cyber Aware", url: "https://www.ncsc.gov.uk/cyberaware" },
      { label: "ScamShield — Singapore", url: "https://www.scamshield.gov.sg/" },
      { label: "ANTIC — Cameroun", url: "https://www.antic.cm/" },
    ],
    version: "1.0",
    publishedAt: "2026-11-20",
    pdfEn: "/checklists/general-scam-prevention-en.pdf",
    pdfFr: "/checklists/general-scam-prevention-fr.pdf",
  },

  /* ------------------------------------------------------------------ */
  /* 2. Mobile money security (featured)                                */
  /* ------------------------------------------------------------------ */
  {
    slug: "mobile-money-security",
    title: {
      en: "Mobile Money Security Checklist",
      fr: "Liste de contrôle : sécurité de l’argent mobile",
    },
    subtitle: {
      en: "Protect your MTN MoMo and Orange Money accounts every day.",
      fr: "Protégez vos comptes MTN MoMo et Orange Money au quotidien.",
    },
    category: "money",
    featured: true,
    intro: {
      en: "This checklist protects the mobile money wallets families across Africa depend on — MTN MoMo, Orange Money and similar services. Print it and keep it at home or with your business book; tick each habit until it becomes automatic. Go through it with everyone in the household who sends or receives money.",
      fr: "Cette liste de contrôle protège les portefeuilles d’argent mobile dont dépendent les familles africaines — MTN MoMo, Orange Money et services similaires. Imprimez-la et gardez-la à la maison ou avec votre cahier de commerce ; cochez chaque réflexe jusqu’à ce qu’il devienne automatique. Parcourez-la avec tous les membres du foyer qui envoient ou reçoivent de l’argent.",
    },
    warning: {
      en: "No one from MTN, Orange Money or any operator will ever ask for your PIN or a code sent to your phone. Anyone who does is a scammer — hang up and report.",
      fr: "Personne chez MTN, Orange Money ou tout autre opérateur ne vous demandera jamais votre code PIN ou un code reçu par SMS. Quiconque le fait est un fraudeur — raccrochez et signalez.",
    },
    emergency: {
      en: "If money leaves your wallet without you: call your operator’s official line immediately, ask for the account to be blocked and the PIN changed, then report to the police and keep every receipt.",
      fr: "Si de l’argent quitte votre portefeuille sans vous : appelez immédiatement le numéro officiel de votre opérateur, demandez le blocage du compte et le changement du code PIN, puis signalez à la police et conservez tous les reçus.",
    },
    sections: [
      {
        heading: { en: "PIN and account protection", fr: "Protection du code et du compte" },
        items: [
          {
            en: "Choose a mobile money PIN no one can guess.",
            fr: "Choisissez un code d’argent mobile impossible à deviner.",
          },
          {
            en: "Change your PIN if anyone has watched you type it.",
            fr: "Changez votre code si quelqu’un vous a vu le composer.",
          },
          {
            en: "Never share your PIN with agents, staff or family.",
            fr: "Ne partagez jamais votre code avec des agents, du personnel ou des proches.",
          },
          {
            en: "Memorise your PIN; never write it on paper or your phone.",
            fr: "Mémorisez votre code ; ne l’écrivez ni sur papier ni dans votre téléphone.",
          },
          {
            en: "Lock your phone with a PIN, pattern or fingerprint.",
            fr: "Verrouillez votre téléphone par code, schéma ou empreinte digitale.",
          },
          {
            en: "Turn on SMS or app alerts for every transaction.",
            fr: "Activez les alertes SMS ou applicatives pour chaque transaction.",
          },
        ],
      },
      {
        heading: { en: "Receiving money safely", fr: "Recevoir de l’argent en toute sécurité" },
        items: [
          {
            en: "Check your actual balance in the official app before refunding any transfer.",
            fr: "Vérifiez votre solde réel dans l’application officielle avant de rembourser.",
          },
          {
            en: "Wait until funds truly appear before releasing goods or cash.",
            fr: "Attendez que les fonds soient bien là avant de livrer biens ou argent.",
          },
          {
            en: "Treat any overpayment followed by a refund request as a scam.",
            fr: "Tenez tout trop-perçu suivi d’une demande de remboursement pour une arnaque.",
          },
          {
            en: "Beware fake confirmation SMS showing balances you never had.",
            fr: "Méfiez-vous des faux SMS de confirmation affichant des soldes inexistants.",
          },
          {
            en: "Never pay a ‘release fee’ to receive money.",
            fr: "Ne payez jamais de « frais de déblocage » pour recevoir de l’argent.",
          },
          {
            en: "Check the sender’s name in the transaction history, not screenshots.",
            fr: "Vérifiez le nom dans l’historique, pas sur des captures d’écran.",
          },
        ],
      },
      {
        heading: { en: "Sending money safely", fr: "Envoyer de l’argent en toute sécurité" },
        items: [
          {
            en: "Confirm the recipient’s number digit by digit before sending.",
            fr: "Vérifiez le numéro du destinataire chiffre par chiffre avant d’envoyer.",
          },
          {
            en: "Send a small test amount first when paying someone new.",
            fr: "Envoyez d’abord un petit montant test lors d’un premier paiement.",
          },
          {
            en: "Read the confirmation screen and check the name shown.",
            fr: "Lisez l’écran de confirmation et vérifiez le nom affiché.",
          },
          {
            en: "Ask the recipient to confirm receipt directly, not by screenshot.",
            fr: "Demandez au destinataire de confirmer directement, pas par capture d’écran.",
          },
          {
            en: "Refuse requests to send money to ‘verify’ your account.",
            fr: "Refusez toute demande d’envoi d’argent pour « vérifier » votre compte.",
          },
          {
            en: "Keep transaction receipts until the recipient confirms receipt.",
            fr: "Conservez les reçus de transaction jusqu’à la confirmation du destinataire.",
          },
        ],
      },
      {
        heading: { en: "Agent and support interactions", fr: "Interactions avec agents et service client" },
        items: [
          {
            en: "Ask the agent to count and show the cash before you take it.",
            fr: "Demandez à l’agent de compter et de montrer les espèces avant de les prendre.",
          },
          {
            en: "Never hand your phone or PIN to an agent for ‘registration’.",
            fr: "Ne confiez jamais téléphone ni code à un agent pour une « inscription ».",
          },
          {
            en: "Type your PIN yourself, screened from view, every single time.",
            fr: "Composez vous-même votre code, à l’abri des regards, à chaque fois.",
          },
          {
            en: "Use only the support numbers printed on your operator’s website.",
            fr: "N’utilisez que les numéros figurant sur le site officiel de votre opérateur.",
          },
          {
            en: "Report agents who ask for PINs to your operator immediately.",
            fr: "Signalez immédiatement à votre opérateur tout agent demandant votre code.",
          },
          {
            en: "Watch for people standing too close behind you at the counter.",
            fr: "Méfiez-vous des personnes trop proches derrière vous au guichet.",
          },
        ],
      },
      {
        heading: { en: "If something goes wrong", fr: "En cas de problème" },
        items: [
          {
            en: "Call your operator’s official fraud line the moment you notice a problem.",
            fr: "Appelez le service antifraude de votre opérateur dès le premier problème.",
          },
          {
            en: "Block or freeze your account through the official app or hotline.",
            fr: "Bloquez ou suspendez votre compte via l’application ou la ligne officielle.",
          },
          {
            en: "Change your PIN at once if you suspect compromise.",
            fr: "Changez immédiatement votre code au moindre soupçon de compromission.",
          },
          {
            en: "Screenshot suspicious messages, receipts and numbers as evidence.",
            fr: "Capturez les messages, reçus et numéros suspects comme preuves.",
          },
          {
            en: "Report to the police and your national cybercrime unit.",
            fr: "Signalez les faits à la police et à votre unité nationale de cybercriminalité.",
          },
          {
            en: "Warn family and community groups about the number involved.",
            fr: "Avertissez votre famille et vos groupes communautaires du numéro en cause.",
          },
        ],
      },
    ],
    references: [
      { label: "ANTIC — Cameroun", url: "https://www.antic.cm/" },
      { label: "Cyber Security Authority — Ghana", url: "https://csa.gov.gh/" },
      { label: "ScamShield — Singapore", url: "https://www.scamshield.gov.sg/" },
    ],
    version: "1.0",
    publishedAt: "2026-11-20",
    pdfEn: "/checklists/mobile-money-security-en.pdf",
    pdfFr: "/checklists/mobile-money-security-fr.pdf",
  },

  /* ------------------------------------------------------------------ */
  /* 3. Online shopping safety                                          */
  /* ------------------------------------------------------------------ */
  {
    slug: "online-shopping-safety",
    title: {
      en: "Online Shopping Safety Checklist",
      fr: "Liste de contrôle : sécurité des achats en ligne",
    },
    subtitle: {
      en: "Shop online without handing money to strangers.",
      fr: "Achetez en ligne sans confier votre argent à des inconnus.",
    },
    category: "shopping",
    intro: {
      en: "This checklist helps you sort genuine online shops from fake ones before you pay. Use it for websites, social-media sellers and marketplaces, whether you shop from Douala, Lagos, London or Montreal. Print it, tick each box for every new shop, and keep it beside your phone or computer.",
      fr: "Cette liste de contrôle vous aide à distinguer les vraies boutiques en ligne des fausses avant de payer. Utilisez-la pour les sites, les vendeurs sur les réseaux sociaux et les places de marché, que vous achetiez depuis Douala, Lagos, Londres ou Montréal. Imprimez-la, cochez chaque case pour chaque nouvelle boutique, et gardez-la près de votre téléphone ou ordinateur.",
    },
    warning: {
      en: "Prices far below every other shop and payment only by irreversible transfer are the clearest signs of a fake shop. Walk away if you see both.",
      fr: "Des prix très inférieurs à ceux des autres boutiques et un paiement uniquement par transfert irréversible sont les signes les plus évidents d’une fausse boutique. Éloignez-vous si vous voyez les deux.",
    },
    sections: [
      {
        heading: { en: "Before you buy", fr: "Avant d’acheter" },
        items: [
          {
            en: "Search the shop’s name together with the word ‘scam’.",
            fr: "Recherchez le nom de la boutique accompagné du mot « arnaque ».",
          },
          {
            en: "Check the shop’s full contact details, including a real address.",
            fr: "Vérifiez les coordonnées complètes, y compris une adresse réelle.",
          },
          {
            en: "Read recent reviews on independent sites, not on the shop alone.",
            fr: "Lisez les avis récents sur des sites indépendants, pas ceux de la boutique.",
          },
          {
            en: "Compare prices across shops — huge discounts are bait.",
            fr: "Comparez les prix entre boutiques — les grosses remises sont des appâts.",
          },
          {
            en: "Look up the domain’s registration date in a free whois search.",
            fr: "Vérifiez la date d’enregistrement du domaine via whois (gratuit).",
          },
          {
            en: "Prefer shops recommended by people you actually know.",
            fr: "Préférez les boutiques recommandées par des personnes de confiance.",
          },
        ],
      },
      {
        heading: { en: "Paying safely", fr: "Payer en toute sécurité" },
        items: [
          {
            en: "Pay by card, mobile money or cash on delivery where possible.",
            fr: "Payez par carte, argent mobile ou à la livraison lorsque c’est possible.",
          },
          {
            en: "Use payment methods that offer a dispute or reversal process.",
            fr: "Utilisez des paiements offrant une procédure de réclamation ou d’annulation.",
          },
          {
            en: "Never pay by gift card, crypto or bank transfer to strangers.",
            fr: "Ne payez jamais par carte cadeau, crypto ou virement à des inconnus.",
          },
          {
            en: "Enter card details only on pages with a padlock and correct address.",
            fr: "Entrez vos données de carte uniquement sur une page sécurisée et correcte.",
          },
          {
            en: "Refuse sellers who change the payment method at the last minute.",
            fr: "Refusez les vendeurs qui changent le mode de paiement à la dernière minute.",
          },
          {
            en: "Avoid saving your card on shops you will not reuse.",
            fr: "N’enregistrez pas votre carte sur des boutiques sans réutilisation prévue.",
          },
        ],
      },
      {
        heading: { en: "Delivery and receipts", fr: "Livraison et reçus" },
        items: [
          {
            en: "Ask for delivery cost, delay and returns policy in writing.",
            fr: "Demandez par écrit le coût de livraison, le délai et la politique de retour.",
          },
          {
            en: "Screenshot the advert, the order and the payment confirmation.",
            fr: "Capturez l’annonce, la commande et la confirmation de paiement.",
          },
          {
            en: "Check the parcel in front of the courier before signing.",
            fr: "Vérifiez le colis devant le livreur avant de signer.",
          },
          {
            en: "Keep receipts and chat history until the guarantee ends.",
            fr: "Conservez reçus et conversations jusqu’à la fin de la garantie.",
          },
          {
            en: "Contact the seller through the platform’s own messaging system.",
            fr: "Contactez le vendeur via la messagerie interne de la plateforme.",
          },
        ],
      },
      {
        heading: {
          en: "Marketplace and social media sellers",
          fr: "Vendeurs sur places de marché et réseaux sociaux",
        },
        items: [
          {
            en: "Meet sellers in a safe, busy public place for high-value items.",
            fr: "Rencontrez les vendeurs de biens de valeur dans un lieu public fréquenté.",
          },
          {
            en: "Inspect and test goods fully before paying.",
            fr: "Inspectez et testez les biens à fond avant de payer.",
          },
          {
            en: "Beware sellers demanding deposits before showing the item.",
            fr: "Méfiez-vous des vendeurs exigeant un acompte avant de montrer l’article.",
          },
          {
            en: "Check the seller’s profile age, history and other adverts.",
            fr: "Vérifiez l’ancienneté, l’historique et les autres annonces du vendeur.",
          },
          {
            en: "Never send money to ‘reserve’ an item you have not seen.",
            fr: "N’envoyez jamais d’argent pour « réserver » un article non vu.",
          },
          {
            en: "Bring a friend when collecting expensive goods in person.",
            fr: "Faites-vous accompagner pour récupérer des biens coûteux en main propre.",
          },
        ],
      },
      {
        heading: { en: "If something goes wrong", fr: "En cas de problème" },
        items: [
          {
            en: "Contact your bank or operator immediately if goods never arrive.",
            fr: "Contactez aussitôt votre banque ou opérateur si la commande n’arrive pas.",
          },
          {
            en: "Ask your payment provider about chargeback or reversal options.",
            fr: "Renseignez-vous auprès de votre prestataire sur les options d’annulation.",
          },
          {
            en: "Report fake shops to the platform and to the authorities.",
            fr: "Signalez les fausses boutiques à la plateforme et aux autorités.",
          },
          {
            en: "Leave a factual review warning other buyers.",
            fr: "Laissez un avis factuel pour avertir les autres acheteurs.",
          },
          {
            en: "Change your password if you registered on a fake site.",
            fr: "Changez votre mot de passe si vous vous êtes inscrit sur un faux site.",
          },
        ],
      },
    ],
    references: [
      { label: "UK National Cyber Security Centre — Cyber Aware", url: "https://www.ncsc.gov.uk/cyberaware" },
      { label: "ScamShield — Singapore", url: "https://www.scamshield.gov.sg/" },
      {
        label: "Canadian Anti-Fraud Centre — Centre antifraude du Canada",
        url: "https://www.antifraudcentre-centreantifraude.ca/",
      },
    ],
    version: "1.0",
    publishedAt: "2026-11-20",
    pdfEn: "/checklists/online-shopping-safety-en.pdf",
    pdfFr: "/checklists/online-shopping-safety-fr.pdf",
  },

  /* ------------------------------------------------------------------ */
  /* 4. Social media account security                                   */
  /* ------------------------------------------------------------------ */
  {
    slug: "social-media-security",
    title: {
      en: "Social Media Account Security Checklist",
      fr: "Liste de contrôle : sécurité des comptes sur les réseaux sociaux",
    },
    subtitle: {
      en: "Lock down your accounts before someone else does.",
      fr: "Sécurisez vos comptes avant que quelqu’un d’autre ne le fasse.",
    },
    category: "social",
    intro: {
      en: "This checklist secures your Facebook, Instagram, TikTok, LinkedIn and other accounts against takeover and impersonation. Work through it on each platform you use, then repeat the quick checks every month. Print a copy for each family member with a smartphone.",
      fr: "Cette liste de contrôle protège vos comptes Facebook, Instagram, TikTok, LinkedIn et autres contre le piratage et l’usurpation d’identité. Parcourez-la sur chaque plateforme utilisée, puis renouvelez les vérifications rapides chaque mois. Imprimez un exemplaire pour chaque membre de la famille disposant d’un smartphone.",
    },
    warning: {
      en: "If a ‘friend’ suddenly messages you about money, a new phone number or urgent help, assume their account is compromised until you verify by voice on their known number.",
      fr: "Si un « ami » vous écrit soudain au sujet d’argent, d’un nouveau numéro ou d’une aide urgente, supposez que son compte est piraté jusqu’à vérification vocale sur son numéro habituel.",
    },
    sections: [
      {
        heading: { en: "Passwords and login", fr: "Mots de passe et connexion" },
        items: [
          {
            en: "Use a long, unique password for each social media account.",
            fr: "Utilisez un mot de passe long et unique pour chaque réseau social.",
          },
          {
            en: "Turn on two-factor authentication with your phone number or an app.",
            fr: "Activez l’authentification à deux facteurs par SMS ou via une application.",
          },
          {
            en: "Log out on shared or public devices, always.",
            fr: "Déconnectez-vous toujours des appareils partagés ou publics.",
          },
          {
            en: "Check active sessions and revoke devices you do not recognise.",
            fr: "Examinez les sessions actives et révoquez les appareils inconnus.",
          },
          {
            en: "Add a recovery e-mail and phone number you still control.",
            fr: "Ajoutez un e-mail et un numéro de récupération toujours valides.",
          },
          {
            en: "Never save your social passwords in other people’s browsers.",
            fr: "N’enregistrez jamais vos mots de passe dans le navigateur d’autrui.",
          },
        ],
      },
      {
        heading: { en: "Privacy settings", fr: "Paramètres de confidentialité" },
        items: [
          {
            en: "Review who can see your posts, friends list and photos.",
            fr: "Vérifiez qui peut voir vos publications, votre liste d’amis et vos photos.",
          },
          {
            en: "Limit profile details like your school, workplace and birthday.",
            fr: "Limitez les détails de profil : école, employeur, anniversaire.",
          },
          {
            en: "Turn off location tagging on posts and photos.",
            fr: "Désactivez le géomarquage des publications et des photos.",
          },
          {
            en: "Approve tags manually before they appear on your profile.",
            fr: "Approuvez manuellement les mentions avant publication sur votre profil.",
          },
          {
            en: "Check which third-party apps can access your account.",
            fr: "Vérifiez quelles applications tierces accèdent à votre compte.",
          },
          {
            en: "Remove old apps and quizzes connected to your profile.",
            fr: "Retirez les anciennes applications et quiz liés à votre profil.",
          },
        ],
      },
      {
        heading: { en: "Friends, requests and impersonation", fr: "Amis, demandes et usurpation d’identité" },
        items: [
          {
            en: "Treat sudden friend requests from familiar faces with caution.",
            fr: "Considérez avec prudence les demandes d’amis soudaines de visages connus.",
          },
          {
            en: "Verify a friend’s ‘new account’ by calling their known number.",
            fr: "Vérifiez le « nouveau compte » d’un ami en appelant son numéro habituel.",
          },
          {
            en: "Ask the person something only they would know.",
            fr: "Posez une question que seule cette personne peut connaître.",
          },
          {
            en: "Report impersonation accounts through the platform’s reporting tools.",
            fr: "Signalez les usurpations via les outils de signalement de la plateforme.",
          },
          {
            en: "Reject strangers who quickly move the chat off the platform.",
            fr: "Refusez les inconnus qui veulent rapidement quitter la plateforme.",
          },
          {
            en: "Tell your contacts when someone clones your profile.",
            fr: "Prévenez vos contacts dès que votre profil est cloné.",
          },
        ],
      },
      {
        heading: { en: "What you share", fr: "Ce que vous publiez" },
        items: [
          {
            en: "Never post identity documents, tickets or payslips online.",
            fr: "Ne publiez jamais en ligne pièces d’identité, billets ni fiches de paie.",
          },
          {
            en: "Share travel plans after the trip, not before.",
            fr: "Partagez vos voyages au retour, jamais avant le départ.",
          },
          {
            en: "Avoid posting children’s school uniforms or daily routines.",
            fr: "Évitez de publier les uniformes scolaires ou les routines des enfants.",
          },
          {
            en: "Hide QR codes on tickets when sharing photos.",
            fr: "Masquez les codes QR des billets sur vos photos.",
          },
          {
            en: "Think before joining quizzes that harvest your answers.",
            fr: "Réfléchissez avant de faire des quiz qui récoltent vos réponses.",
          },
          {
            en: "Blur house numbers and car plates in photos.",
            fr: "Floutez numéros de maison et plaques d’immatriculation sur les photos.",
          },
        ],
      },
      {
        heading: { en: "If your account is taken over", fr: "En cas de piratage de votre compte" },
        items: [
          {
            en: "Open the platform’s own ‘account hacked’ help page first.",
            fr: "Ouvrez d’abord la page d’aide « compte piraté » de la plateforme.",
          },
          {
            en: "Change your password from a trusted device immediately.",
            fr: "Changez immédiatement votre mot de passe depuis un appareil de confiance.",
          },
          {
            en: "Revoke unfamiliar sessions and connected apps.",
            fr: "Révoquez les sessions inconnues et les applications connectées.",
          },
          {
            en: "Warn your contacts not to send money to messages from you.",
            fr: "Prévenez vos contacts de ne pas payer un message envoyé en votre nom.",
          },
          {
            en: "Report the takeover to the platform and the police.",
            fr: "Signalez le piratage à la plateforme et à la police.",
          },
          {
            en: "Review the security of linked e-mail and bank accounts.",
            fr: "Vérifiez la sécurité des e-mails et comptes bancaires associés.",
          },
        ],
      },
    ],
    references: [
      { label: "UK National Cyber Security Centre — Cyber Aware", url: "https://www.ncsc.gov.uk/cyberaware" },
      { label: "ScamShield — Singapore", url: "https://www.scamshield.gov.sg/" },
      { label: "Cyber Security Authority — Ghana", url: "https://csa.gov.gh/" },
    ],
    version: "1.0",
    publishedAt: "2026-11-20",
    pdfEn: "/checklists/social-media-security-en.pdf",
    pdfFr: "/checklists/social-media-security-fr.pdf",
  },

  /* ------------------------------------------------------------------ */
  /* 5. Banking and financial fraud prevention                          */
  /* ------------------------------------------------------------------ */
  {
    slug: "banking-fraud-prevention",
    title: {
      en: "Banking and Financial Fraud Prevention Checklist",
      fr: "Liste de contrôle : prévention des fraudes bancaires et financières",
    },
    subtitle: {
      en: "Guard your accounts, cards and transfers step by step.",
      fr: "Protégez vos comptes, cartes et virements, étape par étape.",
    },
    category: "money",
    intro: {
      en: "This checklist covers the everyday habits that keep your bank accounts, cards and transfers safe from fraud. It applies to traditional banks, microfinance institutions and mobile-linked accounts alike. Print it, keep it with your banking papers, and review the quick checks each month.",
      fr: "Cette liste de contrôle réunit les réflexes quotidiens qui protègent vos comptes bancaires, cartes et virements contre la fraude. Elle vaut pour les banques classiques, les microfinances comme pour les comptes liés au mobile. Imprimez-la, rangez-la avec vos documents bancaires et renouvelez les vérifications chaque mois.",
    },
    warning: {
      en: "Your bank will never call you to ask for your PIN, full password or a code from your phone. Any caller who does is a fraudster — hang up and call the bank’s official number yourself.",
      fr: "Votre banque ne vous appellera jamais pour demander votre code PIN, votre mot de passe complet ou un code reçu sur votre téléphone. Tout appelant qui le fait est un fraudeur — raccrochez et rappelez vous-même le numéro officiel.",
    },
    sections: [
      {
        heading: { en: "Everyday account hygiene", fr: "Hygiène quotidienne du compte" },
        items: [
          {
            en: "Turn on transaction alerts for every account movement.",
            fr: "Activez les alertes pour chaque mouvement sur votre compte.",
          },
          {
            en: "Check your statement weekly for entries you do not recognise.",
            fr: "Vérifiez chaque semaine vos relevés pour repérer les opérations inconnues.",
          },
          {
            en: "Never share full card numbers, CVV or PIN with anyone.",
            fr: "Ne partagez jamais votre numéro de carte complet, cryptogramme ni PIN.",
          },
          {
            en: "Download your bank’s app only from official app stores.",
            fr: "N’installez l’application de votre banque que depuis un magasin officiel.",
          },
          {
            en: "Create a strong, unique password for your banking profile.",
            fr: "Créez un mot de passe fort et unique pour votre profil bancaire.",
          },
          {
            en: "Log out after each session, especially on shared devices.",
            fr: "Déconnectez-vous après chaque session, surtout sur un appareil partagé.",
          },
        ],
      },
      {
        heading: { en: "Cards and withdrawals", fr: "Cartes et retraits" },
        items: [
          {
            en: "Cover the keypad when typing your PIN at the ATM.",
            fr: "Cachez le clavier en composant votre code au distributeur.",
          },
          {
            en: "Check the ATM for unusual devices before inserting your card.",
            fr: "Cherchez des dispositifs suspects avant d’insérer votre carte.",
          },
          {
            en: "Prefer ATMs inside bank branches during opening hours.",
            fr: "Préférez les distributeurs situés en agence pendant les heures d’ouverture.",
          },
          {
            en: "Set daily withdrawal and transfer limits with your bank.",
            fr: "Fixez avec votre banque des plafonds quotidiens de retrait et de virement.",
          },
          {
            en: "Count your cash discreetly before leaving the machine.",
            fr: "Comptez discrètement vos espèces avant de quitter le distributeur.",
          },
          {
            en: "Refuse help from strangers at the ATM; ask staff inside.",
            fr: "Refusez l’aide d’inconnus au distributeur ; demandez le personnel.",
          },
        ],
      },
      {
        heading: { en: "Transfers and payment instructions", fr: "Virements et instructions de paiement" },
        items: [
          {
            en: "Verify new payee instructions by calling the bank’s official number.",
            fr: "Confirmez tout nouveau bénéficiaire en appelant le numéro officiel.",
          },
          {
            en: "Treat any change of account details as fraud until confirmed.",
            fr: "Tenez tout changement de coordonnées pour une fraude jusqu’à confirmation.",
          },
          {
            en: "Confirm transfer requests by voice on a number you already hold.",
            fr: "Confirmez les demandes de virement par appel sur un numéro déjà connu.",
          },
          {
            en: "Never let anyone pressure you into an immediate transfer.",
            fr: "Ne vous laissez jamais pousser à effectuer un virement immédiat.",
          },
          {
            en: "Check the beneficiary name matches the account number entered.",
            fr: "Vérifiez la concordance entre le nom du bénéficiaire et le numéro saisi.",
          },
          {
            en: "Discuss large transfers with a second trusted person first.",
            fr: "Discutez d’abord des gros virements avec une personne de confiance.",
          },
        ],
      },
      {
        heading: {
          en: "Callers pretending to be your bank",
          fr: "Appels se prétendant de votre banque",
        },
        items: [
          {
            en: "Hang up on callers claiming to be your bank, then call back.",
            fr: "Raccrochez face à un prétendu conseiller, puis rappelez la banque vous-même.",
          },
          {
            en: "Remember: your bank never asks for your PIN or full password.",
            fr: "Votre banque ne demande jamais votre code PIN ni votre mot de passe.",
          },
          {
            en: "Beware ‘account suspension’ calls demanding immediate payment.",
            fr: "Méfiez-vous des appels de « compte suspendu » exigeant un paiement immédiat.",
          },
          {
            en: "Do not follow links in unexpected messages about your account.",
            fr: "Ne suivez pas les liens de messages inattendus concernant votre compte.",
          },
          {
            en: "Check the sender’s full address for subtle misspellings.",
            fr: "Vérifiez l’adresse complète de l’expéditeur pour repérer les fautes subtiles.",
          },
          {
            en: "Report bank impersonation attempts to your bank immediately.",
            fr: "Signalez immédiatement à votre banque toute tentative d’usurpation.",
          },
        ],
      },
      {
        heading: { en: "Monitoring and recovery", fr: "Surveillance et recours" },
        items: [
          {
            en: "Contact your bank’s fraud line the moment you spot a problem.",
            fr: "Appelez le service antifraude de votre banque dès le premier problème.",
          },
          {
            en: "Ask about freezing the account and reversing recent transfers.",
            fr: "Demandez le gel du compte et l’annulation des virements récents.",
          },
          {
            en: "File a police report and keep the report number safe.",
            fr: "Déposez plainte et conservez le numéro du procès-verbal.",
          },
          {
            en: "Keep all messages and receipts as evidence for the investigation.",
            fr: "Conservez tous les messages et reçus comme preuves pour l’enquête.",
          },
          {
            en: "Follow up your calls in writing so the case is documented.",
            fr: "Confirmez vos appels par écrit afin de documenter le dossier.",
          },
          {
            en: "Change passwords and PINs linked to any compromised account.",
            fr: "Changez les mots de passe et codes liés à tout compte compromis.",
          },
        ],
      },
    ],
    references: [
      {
        label: "Canadian Anti-Fraud Centre — Centre antifraude du Canada",
        url: "https://www.antifraudcentre-centreantifraude.ca/",
      },
      { label: "FBI Internet Crime Complaint Center (IC3)", url: "https://www.ic3.gov/" },
      { label: "ANTIC — Cameroun", url: "https://www.antic.cm/" },
    ],
    version: "1.0",
    publishedAt: "2026-11-20",
    pdfEn: "/checklists/banking-fraud-prevention-en.pdf",
    pdfFr: "/checklists/banking-fraud-prevention-fr.pdf",
  },

  /* ------------------------------------------------------------------ */
  /* 6. Romance scam warning signs                                      */
  /* ------------------------------------------------------------------ */
  {
    slug: "romance-scam-warning-signs",
    title: {
      en: "Romance Scam Warning Signs Checklist",
      fr: "Liste de contrôle : signes d’alerte des arnaques sentimentales",
    },
    subtitle: {
      en: "Know the warning signs before trust is exploited.",
      fr: "Reconnaissez les signes avant que votre confiance ne soit exploitée.",
    },
    category: "social",
    intro: {
      en: "Romance scammers build genuine-feeling relationships in order to ask for money later. This checklist helps you review an online relationship calmly and without shame — being targeted says nothing bad about you. Use it yourself, or share it gently with someone you worry about.",
      fr: "Les escrocs sentimentaux construisent des relations d’apparence sincère pour demander de l’argent ensuite. Cette liste de contrôle permet d’examiner une relation en ligne avec calme et sans honte — être visé(e) ne dit rien de négatif sur vous. Utilisez-la pour vous-même, ou partagez-la avec tact avec une personne qui vous inquiète.",
    },
    warning: {
      en: "A fast-moving online relationship that has never met in person and turns to money is the classic pattern. You can care about someone and still verify their story.",
      fr: "Une relation en ligne rapide, jamais concrétisée en personne, qui finit par parler d’argent : voilà le schéma classique. On peut tenir à quelqu’un et vérifier quand même son histoire.",
    },
    sections: [
      {
        heading: { en: "How the relationship starts", fr: "Les débuts de la relation" },
        items: [
          {
            en: "Notice if affection grows very fast before any real meeting.",
            fr: "Remarquez si l’affection grandit très vite avant toute rencontre réelle.",
          },
          {
            en: "Watch for elaborate stories involving work abroad or the military.",
            fr: "Méfiez-vous des histoires complexes de travail à l’étranger ou d’armée.",
          },
          {
            en: "Note if the profile has very few photos or recent posts.",
            fr: "Notez si le profil contient très peu de photos ou de publications récentes.",
          },
          {
            en: "Be alert if the person avoids live video conversations.",
            fr: "Soyez vigilant(e) si la personne fuit les conversations vidéo en direct.",
          },
          {
            en: "Notice when key details of their life story keep changing.",
            fr: "Remarquez lorsque les détails essentiels de son histoire changent sans cesse.",
          },
          {
            en: "Remember that scammers study your profile to mirror your interests.",
            fr: "Sachez que les escrocs étudient votre profil et imitent vos goûts.",
          },
        ],
      },
      {
        heading: { en: "Requests for money", fr: "Les demandes d’argent" },
        items: [
          {
            en: "Treat hospital bills, customs fees and tickets as classic requests.",
            fr: "Tenez factures d’hôpital, douane et billets pour des demandes classiques.",
          },
          {
            en: "Question any investment tip coming from an online partner.",
            fr: "Méfiez-vous de tout conseil d’investissement venant d’un partenaire en ligne.",
          },
          {
            en: "Refuse requests to receive and forward money for a partner.",
            fr: "Refusez de recevoir et de transférer de l’argent pour un partenaire.",
          },
          {
            en: "Notice when small requests grow once a first payment succeeds.",
            fr: "Observez si les montants augmentent dès le premier paiement réussi.",
          },
          {
            en: "Never pay a ‘customs fee’ to release a parcel of gifts.",
            fr: "Ne payez jamais de « frais de douane » pour débloquer un colis de cadeaux.",
          },
          {
            en: "Remember that a loving partner accepts hearing ‘not yet’.",
            fr: "Rappelez-vous qu’un partenaire aimant accepte d’entendre « pas encore ».",
          },
        ],
      },
      {
        heading: { en: "Excuses and avoidance", fr: "Excuses et évitement" },
        items: [
          {
            en: "Note repeated last-minute cancellations of planned meetings.",
            fr: "Notez les annulations de dernière minute répétées des rencontres prévues.",
          },
          {
            en: "Watch for emergencies that always strike just before a visit.",
            fr: "Méfiez-vous des urgences survenant toujours juste avant une visite.",
          },
          {
            en: "Be alert when every video call fails for ‘technical reasons’.",
            fr: "Soyez vigilant(e) si chaque appel vidéo échoue pour « raisons techniques ».",
          },
          {
            en: "Notice if the person refuses to introduce friends or family.",
            fr: "Remarquez si la personne refuse de présenter ses amis ou sa famille.",
          },
          {
            en: "Recognise guilt-tripping when you ask simple questions.",
            fr: "Reconnaissez la culpabilisation lorsque vous posez de simples questions.",
          },
          {
            en: "Trust your discomfort when someone reacts angrily to verification.",
            fr: "Écoutez votre malaise face à une réaction colérique à toute vérification.",
          },
        ],
      },
      {
        heading: { en: "Verifying the person", fr: "Vérifier la personne" },
        items: [
          {
            en: "Run a reverse image search on profile photos early.",
            fr: "Lancez vite une recherche d’image inversée sur les photos du profil.",
          },
          {
            en: "Ask for a short live video call before money is discussed.",
            fr: "Demandez une courte conversation vidéo avant toute discussion d’argent.",
          },
          {
            en: "Search the person’s name with the words ‘dating scam’.",
            fr: "Recherchez le nom de la personne avec les mots « arnaque sentimentale ».",
          },
          {
            en: "Compare their story with real visa and travel rules.",
            fr: "Comparez son récit aux règles réelles de visa et de voyage.",
          },
          {
            en: "Ask for a live photo with today’s date written down.",
            fr: "Demandez une photo prise en direct avec la date du jour.",
          },
          {
            en: "Talk honestly about the relationship with a trusted friend.",
            fr: "Parlez honnêtement de la relation à un ami de confiance.",
          },
        ],
      },
      {
        heading: { en: "Protecting yourself with care", fr: "Se protéger en douceur" },
        items: [
          {
            en: "Pause sending money whenever doubt appears — you are allowed.",
            fr: "Suspendez tout envoi d’argent au moindre doute — c’est votre droit.",
          },
          {
            en: "Tell one trusted person what is happening, without shame.",
            fr: "Confiez-vous à une personne de confiance, sans honte.",
          },
          {
            en: "Remember that scammers deliberately target kind, generous people.",
            fr: "Rappelez-vous que les escrocs ciblent délibérément les gens généreux.",
          },
          {
            en: "Keep messages and transfer records in case you report.",
            fr: "Conservez messages et preuves de virements en cas de signalement.",
          },
          {
            en: "Report the profile to the platform to protect others.",
            fr: "Signalez le profil à la plateforme pour protéger les autres.",
          },
          {
            en: "Seek support: recovery is emotional as well as financial.",
            fr: "Cherchez du soutien : le rétablissement est aussi émotionnel que financier.",
          },
        ],
      },
    ],
    references: [
      {
        label: "Canadian Anti-Fraud Centre — Centre antifraude du Canada",
        url: "https://www.antifraudcentre-centreantifraude.ca/",
      },
      { label: "ScamShield — Singapore", url: "https://www.scamshield.gov.sg/" },
      { label: "FBI Internet Crime Complaint Center (IC3)", url: "https://www.ic3.gov/" },
    ],
    version: "1.0",
    publishedAt: "2026-11-20",
    pdfEn: "/checklists/romance-scam-warning-signs-en.pdf",
    pdfFr: "/checklists/romance-scam-warning-signs-fr.pdf",
  },

  /* ------------------------------------------------------------------ */
  /* 7. Job offer verification                                          */
  /* ------------------------------------------------------------------ */
  {
    slug: "job-offer-verification",
    title: {
      en: "Job Offer Verification Checklist",
      fr: "Liste de contrôle : vérification des offres d’emploi",
    },
    subtitle: {
      en: "A real job pays you — never the reverse.",
      fr: "Un vrai emploi vous rémunère — jamais l’inverse.",
    },
    category: "business",
    intro: {
      en: "Fake job offers are used to collect fees, identity documents and sometimes to recruit money mules. This checklist verifies any offer — online, by SMS or in person — before you resign, pay or hand over documents. Keep a copy with your job-search papers.",
      fr: "Les fausses offres d’emploi servent à collecter des frais, des pièces d’identité, voire à recruter des passeurs d’argent. Cette liste de contrôle permet de vérifier toute offre — en ligne, par SMS ou en personne — avant de démissionner, de payer ou de remettre des documents. Gardez un exemplaire avec vos documents de recherche d’emploi.",
    },
    warning: {
      en: "Any job that asks you to pay money, or to receive and forward payments, is not a job. Real employers pay you; they never charge you to start.",
      fr: "Tout emploi qui vous demande de l’argent, ou de recevoir et de transférer des paiements, n’est pas un emploi. Un vrai employeur vous rémunère ; il ne vous fait jamais payer pour commencer.",
    },
    sections: [
      {
        heading: { en: "The offer itself", fr: "L’offre elle-même" },
        items: [
          {
            en: "Question offers arriving without any application from you.",
            fr: "Méfiez-vous des offres arrivant sans aucune candidature de votre part.",
          },
          {
            en: "Compare the job title and salary with local market norms.",
            fr: "Comparez l’intitulé du poste et le salaire aux normes du marché local.",
          },
          {
            en: "Beware vague duties paired with unusually high pay.",
            fr: "Méfiez-vous des missions vagues avec une paye anormalement élevée.",
          },
          {
            en: "Check the real e-mail address, not just the display name.",
            fr: "Vérifiez l’adresse e-mail réelle, pas seulement le nom affiché.",
          },
          {
            en: "Treat offers demanding a reply within hours as suspicious.",
            fr: "Considérez comme suspecte toute offre exigeant une réponse en quelques heures.",
          },
          {
            en: "Compare the message style with the company’s real communications.",
            fr: "Comparez le style du message avec les communications réelles de l’entreprise.",
          },
        ],
      },
      {
        heading: { en: "The employer", fr: "L’employeur" },
        items: [
          {
            en: "Search the company’s official website and verify the vacancy there.",
            fr: "Consultez le site officiel de l’entreprise et vérifiez-y l’offre.",
          },
          {
            en: "Call the company’s official switchboard to confirm the recruiter.",
            fr: "Appelez le standard officiel de l’entreprise pour confirmer le recruteur.",
          },
          {
            en: "Check the company exists in official trade registries.",
            fr: "Vérifiez l’entreprise dans les registres officiels du commerce.",
          },
          {
            en: "Look for real employees on professional networks.",
            fr: "Repérez de vrais employés sur les réseaux professionnels.",
          },
          {
            en: "Read recent employee reviews on independent platforms.",
            fr: "Lisez les avis récents d’employés sur des plateformes indépendantes.",
          },
          {
            en: "Beware companies with no verifiable address or landline.",
            fr: "Méfiez-vous des entreprises sans adresse ni ligne fixe vérifiables.",
          },
        ],
      },
      {
        heading: { en: "Money and documents", fr: "Argent et documents" },
        items: [
          {
            en: "Remember: real employers pay you — never the reverse.",
            fr: "Rappelez-vous : un vrai employeur vous paie — jamais l’inverse.",
          },
          {
            en: "Refuse to pay for forms, training, medicals or ‘file fees’.",
            fr: "Refusez de payer formulaires, formations, visites ou « frais de dossier ».",
          },
          {
            en: "Never send money to unlock a salary or an attractive posting.",
            fr: "N’envoyez jamais d’argent pour débloquer un salaire ou un poste attractif.",
          },
          {
            en: "Guard your identity documents until a contract is signed.",
            fr: "Ne remettez vos pièces d’identité qu’après la signature du contrat.",
          },
          {
            en: "Share bank details only after a signed contract exists.",
            fr: "Communiquez vos coordonnées bancaires uniquement après un contrat signé.",
          },
          {
            en: "Refuse jobs that pay you for moving money through your account.",
            fr: "Refusez tout emploi rémunérant le transit d’argent via votre compte.",
          },
        ],
      },
      {
        heading: { en: "Interviews and contracts", fr: "Entretiens et contrats" },
        items: [
          {
            en: "Insist on interviews by video or in person, not chat only.",
            fr: "Exigez des entretiens en visio ou en personne, jamais par simple messagerie.",
          },
          {
            en: "Request a written contract and read every clause before signing.",
            fr: "Demandez un contrat écrit et lisez chaque clause avant de signer.",
          },
          {
            en: "Verify the signatory against the company’s real staff.",
            fr: "Vérifiez le signataire parmi le personnel réel de l’entreprise.",
          },
          {
            en: "Ask detailed questions about the team, workplace and daily tasks.",
            fr: "Posez des questions précises sur l’équipe, les locaux et les tâches.",
          },
          {
            en: "Beware ‘work from home’ jobs requiring you to buy stock first.",
            fr: "Méfiez-vous du « télétravail » exigeant l’achat préalable de stock.",
          },
          {
            en: "Confirm probation terms and salary payment dates in writing.",
            fr: "Faites confirmer par écrit la période d’essai et les dates de paie.",
          },
        ],
      },
    ],
    references: [
      { label: "FBI Internet Crime Complaint Center (IC3)", url: "https://www.ic3.gov/" },
      { label: "Cyber Security Authority — Ghana", url: "https://csa.gov.gh/" },
      { label: "ScamShield — Singapore", url: "https://www.scamshield.gov.sg/" },
    ],
    version: "1.0",
    publishedAt: "2026-11-20",
    pdfEn: "/checklists/job-offer-verification-en.pdf",
    pdfFr: "/checklists/job-offer-verification-fr.pdf",
  },

  /* ------------------------------------------------------------------ */
  /* 8. Investment opportunity verification                             */
  /* ------------------------------------------------------------------ */
  {
    slug: "investment-verification",
    title: {
      en: "Investment Opportunity Verification Checklist",
      fr: "Liste de contrôle : vérification des opportunités d’investissement",
    },
    subtitle: {
      en: "Real investments carry risk; scams carry guarantees.",
      fr: "Un vrai placement comporte des risques ; une arnaque garantit tout.",
    },
    category: "money",
    intro: {
      en: "This checklist helps you verify any investment — forex, crypto, farm cooperatives, real estate or ‘doubling’ schemes — before your money leaves. Use it for offers from strangers, acquaintances and social-media groups alike. Print it and keep it with your savings papers.",
      fr: "Cette liste de contrôle vous aide à vérifier tout investissement — forex, cryptomonnaies, coopératives agricoles, immobilier ou systèmes de « doublement » — avant que votre argent ne parte. Utilisez-la pour les offres d’inconnus comme de connaissances ou de groupes sociaux. Imprimez-la et rangez-la avec vos documents d’épargne.",
    },
    warning: {
      en: "Guaranteed high returns with no risk do not exist in any legitimate market. If a stranger must receive your money today, that is the warning.",
      fr: "Des rendements élevés garantis sans risque n’existent sur aucun marché légitime. Si un inconnu doit recevoir votre argent aujourd’hui, c’est le signal d’alarme.",
    },
    sections: [
      {
        heading: { en: "The promise", fr: "La promesse" },
        items: [
          {
            en: "Treat guaranteed high returns as the core sign of fraud.",
            fr: "Tenez les rendements garantis pour le signe principal d’une fraude.",
          },
          {
            en: "Remember that every real investment can lose money.",
            fr: "Rappelez-vous que tout placement réel peut perdre de l’argent.",
          },
          {
            en: "Beware ‘risk-free’ trading, forex or money-doubling schemes.",
            fr: "Méfiez-vous du trading, du forex ou du « doublement d’argent » sans risque.",
          },
          {
            en: "Question daily profits shown only on screenshots from strangers.",
            fr: "Méfiez-vous de profits quotidiens montrés uniquement par captures d’écran.",
          },
          {
            en: "Notice pressure to invest ‘today’ before a supposed deadline.",
            fr: "Repérez la pression à investir « aujourd’hui » avant une prétendue échéance.",
          },
          {
            en: "Be wary of schemes recruiting you to bring friends and family.",
            fr: "Méfiez-vous des systèmes vous recrutant pour amener proches et amis.",
          },
        ],
      },
      {
        heading: { en: "The provider", fr: "Le prestataire" },
        items: [
          {
            en: "Check that the provider is licensed by your financial regulator.",
            fr: "Vérifiez que le prestataire est agréé par votre régulateur financier.",
          },
          {
            en: "Verify the licence number on the regulator’s own website.",
            fr: "Contrôlez le numéro d’agrément sur le site même du régulateur.",
          },
          {
            en: "Search the company’s registration number and directors openly.",
            fr: "Recherchez publiquement le numéro d’enregistrement et les dirigeants.",
          },
          {
            en: "Beware firms reachable only through mobile numbers and chat.",
            fr: "Méfiez-vous des sociétés joignables uniquement par mobile et messagerie.",
          },
          {
            en: "Check for a real office address you can visit or verify.",
            fr: "Vérifiez l’existence d’une adresse physique visitable ou vérifiable.",
          },
          {
            en: "Read the regulator’s published warnings about clone firms.",
            fr: "Lisez les alertes publiées par le régulateur sur les sociétés clones.",
          },
        ],
      },
      {
        heading: { en: "Verifying the opportunity", fr: "Vérifier l’opportunité" },
        items: [
          {
            en: "Ask for the investment’s legal documents and read them fully.",
            fr: "Demandez les documents juridiques du placement et lisez-les intégralement.",
          },
          {
            en: "Get all terms in writing, including fees and exit conditions.",
            fr: "Obtenez tout par écrit : frais, conditions de retrait et de sortie.",
          },
          {
            en: "Look up the platform’s domain registration date and owner.",
            fr: "Consultez la date d’enregistrement et le propriétaire du domaine.",
          },
          {
            en: "Test a full withdrawal with a small amount before investing more.",
            fr: "Testez un retrait complet d’un petit montant avant d’investir davantage.",
          },
          {
            en: "Compare promised returns with rates from established institutions.",
            fr: "Comparez les rendements promis aux taux des institutions établies.",
          },
          {
            en: "Seek independent advice before committing large sums.",
            fr: "Demandez un avis indépendant avant d’engager des sommes importantes.",
          },
        ],
      },
      {
        heading: { en: "Protecting your money", fr: "Protéger votre argent" },
        items: [
          {
            en: "Invest only money you could lose without hardship.",
            fr: "N’investissez que l’argent que vous pouvez perdre sans difficulté.",
          },
          {
            en: "Never borrow money for a ‘limited-time’ offer.",
            fr: "N’empruntez jamais pour une offre « à durée limitée ».",
          },
          {
            en: "Refuse to move conversations to private chats away from records.",
            fr: "Refusez de poursuivre les échanges sur des chats privés sans traces.",
          },
          {
            en: "Keep every receipt, contract and message somewhere safe.",
            fr: "Conservez chaque reçu, contrat et message en lieu sûr.",
          },
          {
            en: "Ignore ‘recovery agents’ who charge fees to retrieve losses.",
            fr: "Ignorez les « agents de récupération » facturant la restitution des pertes.",
          },
          {
            en: "Report suspicious schemes to your financial regulator promptly.",
            fr: "Signalez rapidement tout schéma suspect à votre régulateur financier.",
          },
        ],
      },
    ],
    references: [
      { label: "FBI Internet Crime Complaint Center (IC3)", url: "https://www.ic3.gov/" },
      { label: "Cyber Security Authority — Ghana", url: "https://csa.gov.gh/" },
      {
        label: "Canadian Anti-Fraud Centre — Centre antifraude du Canada",
        url: "https://www.antifraudcentre-centreantifraude.ca/",
      },
    ],
    version: "1.0",
    publishedAt: "2026-11-20",
    pdfEn: "/checklists/investment-verification-en.pdf",
    pdfFr: "/checklists/investment-verification-fr.pdf",
  },

  /* ------------------------------------------------------------------ */
  /* 9. Business Email Compromise prevention                            */
  /* ------------------------------------------------------------------ */
  {
    slug: "bec-prevention",
    title: {
      en: "Business Email Compromise Prevention Checklist",
      fr: "Liste de contrôle : prévention de la compromission des e-mails professionnels",
    },
    subtitle: {
      en: "Verify payment changes by voice on a known number.",
      fr: "Vérifiez tout changement de paiement par appel sur un numéro connu.",
    },
    category: "business",
    intro: {
      en: "Business Email Compromise (BEC) tricks staff into paying fraudsters through lookalike e-mail addresses and fake instructions. This checklist protects SMEs, cooperatives, associations and larger organisations alike. Share it with everyone who can approve or make a payment.",
      fr: "La compromission des e-mails professionnels (BEC) pousse les employés à payer des fraudeurs via des adresses e-mail similaires et de fausses instructions. Cette liste de contrôle protège PME, coopératives, associations et grandes organisations. Partagez-la avec toute personne habilitée à valider ou effectuer un paiement.",
    },
    warning: {
      en: "A sudden change of bank details, or an urgent transfer request from a director, is the classic BEC trigger. Always verify by calling a number you already hold — never a number from the e-mail.",
      fr: "Un changement soudain de coordonnées bancaires ou une demande de virement urgente d’un dirigeant constitue le déclencheur classique du BEC. Vérifiez toujours en appelant un numéro déjà en votre possession — jamais un numéro issu de l’e-mail.",
    },
    sections: [
      {
        heading: { en: "E-mail security basics", fr: "Bases de la sécurité des e-mails" },
        items: [
          {
            en: "Enable SPF, DKIM and DMARC protection on your company domain.",
            fr: "Activez les protections SPF, DKIM et DMARC sur le domaine de l’entreprise.",
          },
          {
            en: "Train staff to read full sender addresses, not display names.",
            fr: "Formez les équipes à lire l’adresse complète, pas le nom affiché.",
          },
          {
            en: "Flag lookalike domains that mimic your suppliers’ addresses.",
            fr: "Signalez les domaines similaires imitant vos fournisseurs.",
          },
          {
            en: "Never trust e-mail alone for financial instructions.",
            fr: "Ne vous fiez jamais au seul e-mail pour des instructions financières.",
          },
          {
            en: "Limit which staff addresses appear on the public website.",
            fr: "Limitez les adresses du personnel publiées sur le site web.",
          },
          {
            en: "Report spoofed e-mails to your IT lead immediately.",
            fr: "Signalez immédiatement tout e-mail usurpé à votre responsable informatique.",
          },
        ],
      },
      {
        heading: { en: "Verifying payment changes", fr: "Vérifier les changements de paiement" },
        items: [
          {
            en: "Call the supplier’s known number to confirm new bank details.",
            fr: "Confirmez tout nouveau compte fournisseur en appelant son numéro habituel.",
          },
          {
            en: "Treat every change of bank account as fraud until verified.",
            fr: "Tenez tout changement de compte bancaire pour une fraude jusqu’à vérification.",
          },
          {
            en: "Verify urgent payment requests by live voice, not e-mail.",
            fr: "Vérifiez les demandes urgentes par appel en direct, jamais par e-mail.",
          },
          {
            en: "Use a second approver for payments above a set limit.",
            fr: "Exigez un second valideur pour les paiements au-delà d’un plafond défini.",
          },
          {
            en: "Compare new account details with signed contracts on file.",
            fr: "Comparez les nouvelles coordonnées aux contrats signés en archive.",
          },
          {
            en: "Never approve transfers based only on e-mail or chat.",
            fr: "N’approuvez jamais un virement sur la base d’un e-mail ou d’un chat.",
          },
        ],
      },
      {
        heading: { en: "Approval discipline", fr: "Discipline de validation" },
        items: [
          {
            en: "Define in writing who may approve payments, and to what limit.",
            fr: "Définissez par écrit qui peut valider les paiements, et jusqu’à quel montant.",
          },
          {
            en: "Require two signatures for high-value or first-time transfers.",
            fr: "Exigez deux signatures pour les virements importants ou nouveaux.",
          },
          {
            en: "Keep the approval process identical even under urgent pressure.",
            fr: "Maintenez le processus de validation identique même sous pression urgente.",
          },
          {
            en: "Restrict who can modify supplier bank details in records.",
            fr: "Limitez les personnes autorisées à modifier les coordonnées des fournisseurs.",
          },
          {
            en: "Log every supplier-detail change with the changer’s name.",
            fr: "Journalisez chaque changement avec le nom de son auteur.",
          },
          {
            en: "Review payment procedures after every suspicious message.",
            fr: "Révisez la procédure de paiement après chaque message suspect.",
          },
        ],
      },
      {
        heading: { en: "Staff awareness and reporting", fr: "Sensibilisation et signalement par le personnel" },
        items: [
          {
            en: "Train all staff on CEO fraud and supplier impersonation scenarios.",
            fr: "Formez tous les employés à la fraude au faux dirigeant et au faux fournisseur.",
          },
          {
            en: "Encourage staff to question odd requests without fear of blame.",
            fr: "Encouragez le personnel à questionner les demandes inhabituelles sans crainte.",
          },
          {
            en: "Publish an internal channel for reporting suspicious e-mails.",
            fr: "Publiez un canal interne de signalement des e-mails suspects.",
          },
          {
            en: "Thank staff who flag false alarms to keep reporting alive.",
            fr: "Remerciez ceux qui signalent, même pour de fausses alertes.",
          },
          {
            en: "Discuss real scam e-mails received in team meetings.",
            fr: "Examinez en réunion les e-mails d’escroquerie réellement reçus.",
          },
          {
            en: "Report successful fraud to your bank and the police immediately.",
            fr: "Signalez immédiatement toute fraude réussie à votre banque et à la police.",
          },
        ],
      },
    ],
    references: [
      { label: "FBI Internet Crime Complaint Center (IC3)", url: "https://www.ic3.gov/" },
      { label: "UK National Cyber Security Centre — Cyber Aware", url: "https://www.ncsc.gov.uk/cyberaware" },
      { label: "Cyber Security Authority — Ghana", url: "https://csa.gov.gh/" },
    ],
    version: "1.0",
    publishedAt: "2026-11-20",
    pdfEn: "/checklists/bec-prevention-en.pdf",
    pdfFr: "/checklists/bec-prevention-fr.pdf",
  },

  /* ------------------------------------------------------------------ */
  /* 10. Identity theft prevention                                      */
  /* ------------------------------------------------------------------ */
  {
    slug: "identity-theft-prevention",
    title: {
      en: "Identity Theft Prevention Checklist",
      fr: "Liste de contrôle : prévention du vol d’identité",
    },
    subtitle: {
      en: "Your identity is an asset — protect it like one.",
      fr: "Votre identité est un bien précieux — protégez-la comme tel.",
    },
    category: "general",
    intro: {
      en: "Identity thieves use your documents, numbers and personal details to open accounts, take loans or commit crimes in your name. This checklist reduces what they can reach. Print it and review it every few months, especially before sharing documents for jobs, SIM registration or loans.",
      fr: "Les voleurs d’identité utilisent vos pièces, numéros et données personnelles pour ouvrir des comptes, contracter des prêts ou commettre des délits en votre nom. Cette liste de contrôle réduit leur champ d’action. Imprimez-la et révisez-la tous les quelques mois, surtout avant de communiquer des pièces pour un emploi, un enregistrement SIM ou un prêt.",
    },
    warning: {
      en: "If your phone suddenly loses network and cannot make calls, go to your operator immediately — it can signal a SIM-swap in progress on your line.",
      fr: "Si votre téléphone perd soudainement le réseau et n’appelle plus, rendez-vous aussitôt chez votre opérateur — cela peut signaler un échange de SIM en cours sur votre ligne.",
    },
    sections: [
      {
        heading: { en: "Your documents", fr: "Vos documents" },
        items: [
          {
            en: "Keep originals of identity documents in a secure place.",
            fr: "Conservez les originaux de vos pièces d’identité en lieu sûr.",
          },
          {
            en: "Share copies only when legally required.",
            fr: "Ne communiquez des copies que lorsque la loi l’exige.",
          },
          {
            en: "Write the purpose and date on copies you hand over.",
            fr: "Mentionnez l’usage et la date sur les copies remises.",
          },
          {
            en: "Never send photos of your ID card to online strangers.",
            fr: "N’envoyez jamais la photo de votre pièce d’identité à des inconnus en ligne.",
          },
          {
            en: "Destroy expired documents before throwing them away.",
            fr: "Détruisez les documents périmés avant de les jeter.",
          },
          {
            en: "Report lost or stolen documents to the police immediately.",
            fr: "Signalez immédiatement tout document perdu ou volé à la police.",
          },
        ],
      },
      {
        heading: { en: "Your numbers and accounts", fr: "Vos numéros et comptes" },
        items: [
          {
            en: "Guard your national ID, tax and social security numbers.",
            fr: "Protégez vos numéros de pièce d’identité, fiscal et de sécurité sociale.",
          },
          {
            en: "Keep your full date of birth off public profiles.",
            fr: "N’affichez pas votre date de naissance complète sur les profils publics.",
          },
          {
            en: "Set unique passwords for e-mail, banking and tax accounts.",
            fr: "Définissez des mots de passe uniques pour e-mails, banque et impôts.",
          },
          {
            en: "Turn on alerts for changes to your account details.",
            fr: "Activez les alertes en cas de modification de vos données de compte.",
          },
          {
            en: "Report strange account behaviour to the provider at once.",
            fr: "Signalez aussitôt tout comportement étrange au prestataire concerné.",
          },
          {
            en: "Ask providers to add a secret question to your file.",
            fr: "Demandez aux prestataires d’ajouter une question secrète à votre dossier.",
          },
        ],
      },
      {
        heading: { en: "Everyday exposure", fr: "Exposition quotidienne" },
        items: [
          {
            en: "Do not fill in questionnaires that collect personal details.",
            fr: "Ne remplissez pas les questionnaires collectant des données personnelles.",
          },
          {
            en: "Beware prize draws asking for identity documents or fees.",
            fr: "Méfiez-vous des concours exigeant pièces d’identité ou frais.",
          },
          {
            en: "Check forms and sites are secure before entering details.",
            fr: "Vérifiez la sécurité des formulaires et sites avant de saisir vos données.",
          },
          {
            en: "Never leave documents on counters, desks or photocopiers.",
            fr: "Ne laissez jamais de documents sur les comptoirs, bureaux ou photocopieurs.",
          },
          {
            en: "Share personal details carefully on calls you did not initiate.",
            fr: "Restez prudent avec les données personnelles lors d’appels non sollicités.",
          },
          {
            en: "Limit what apps can read your contacts, messages and files.",
            fr: "Limitez l’accès des applications à vos contacts, messages et fichiers.",
          },
        ],
      },
      {
        heading: { en: "Spotting misuse early", fr: "Détecter rapidement les abus" },
        items: [
          {
            en: "Watch for bills, letters or SIM alerts that are not yours.",
            fr: "Surveillez les factures, courriers ou alertes SIM qui ne vous concernent pas.",
          },
          {
            en: "Ask providers for accounts or contracts opened in your name.",
            fr: "Demandez aux prestataires la liste des comptes ouverts à votre nom.",
          },
          {
            en: "Notice if your phone loses signal — it may indicate SIM swap.",
            fr: "Un téléphone qui perd le réseau peut révéler un échange de SIM.",
          },
          {
            en: "Alert your operator if your SIM stops working suddenly.",
            fr: "Avertissez votre opérateur si votre SIM cesse soudain de fonctionner.",
          },
          {
            en: "Report identity theft to the police and keep the report number.",
            fr: "Signalez le vol d’identité à la police et gardez le récépissé.",
          },
          {
            en: "Ask providers to flag your file against fraudulent requests.",
            fr: "Demandez un marquage antifraude de votre dossier auprès des prestataires.",
          },
        ],
      },
    ],
    references: [
      {
        label: "Canadian Anti-Fraud Centre — Centre antifraude du Canada",
        url: "https://www.antifraudcentre-centreantifraude.ca/",
      },
      { label: "UK National Cyber Security Centre — Cyber Aware", url: "https://www.ncsc.gov.uk/cyberaware" },
      { label: "ANTIC — Cameroun", url: "https://www.antic.cm/" },
    ],
    version: "1.0",
    publishedAt: "2026-11-20",
    pdfEn: "/checklists/identity-theft-prevention-en.pdf",
    pdfFr: "/checklists/identity-theft-prevention-fr.pdf",
  },

  /* ------------------------------------------------------------------ */
  /* 11. Cryptocurrency scam prevention                                 */
  /* ------------------------------------------------------------------ */
  {
    slug: "crypto-scam-prevention",
    title: {
      en: "Cryptocurrency Scam Prevention Checklist",
      fr: "Liste de contrôle : prévention des arnaques aux cryptomonnaies",
    },
    subtitle: {
      en: "Treat guaranteed crypto profits as guaranteed losses.",
      fr: "Considérez les gains garantis en cryptomonnaies comme des pertes garanties.",
    },
    category: "money",
    intro: {
      en: "This checklist helps you verify any crypto platform, ‘account manager’ or token sale before money moves. It is written for people new to crypto as well as experienced users. Print it and use it every time you consider a new platform or offer.",
      fr: "Cette liste de contrôle vous aide à vérifier toute plateforme de cryptomonnaies, « gestionnaire de compte » ou vente de jetons avant tout mouvement d’argent. Elle s’adresse aux débutants comme aux utilisateurs expérimentés. Imprimez-la et utilisez-la à chaque nouvelle plateforme ou offre envisagée.",
    },
    warning: {
      en: "Strangers who teach you to invest through private chats, then show profit screenshots, are running the classic crypto script. Transfers on the blockchain are almost impossible to reverse.",
      fr: "Des inconnus vous apprenant à investir par chats privés, puis affichant des captures de gains, suivent le scénario classique des arnaques crypto. Les transferts sur la blockchain sont presque impossibles à annuler.",
    },
    sections: [
      {
        heading: { en: "Before you invest", fr: "Avant d’investir" },
        items: [
          {
            en: "Learn how wallets and the blockchain work before sending money.",
            fr: "Comprenez portefeuilles et blockchain avant d’envoyer le moindre argent.",
          },
          {
            en: "Accept that no legitimate platform guarantees daily profits.",
            fr: "Admettez qu’aucune plateforme légitime ne garantit des profits quotidiens.",
          },
          {
            en: "Verify the platform’s registration and licence before depositing.",
            fr: "Vérifiez l’enregistrement et la licence de la plateforme avant tout dépôt.",
          },
          {
            en: "Check the domain’s age and history before creating an account.",
            fr: "Contrôlez l’âge et l’historique du domaine avant de créer un compte.",
          },
          {
            en: "Read independent reviews beyond the platform’s own channels.",
            fr: "Lisez des avis indépendants hors des canaux de la plateforme.",
          },
          {
            en: "Test a full withdrawal with a small amount first.",
            fr: "Testez d’abord un retrait complet avec un petit montant.",
          },
        ],
      },
      {
        heading: { en: "Warning patterns", fr: "Signaux d’alerte" },
        items: [
          {
            en: "Beware strangers teaching you to invest through private chats.",
            fr: "Méfiez-vous des inconnus vous apprenant à investir par chats privés.",
          },
          {
            en: "Treat screenshots of profits as proof of nothing.",
            fr: "Considérez les captures de gains comme des preuves de rien.",
          },
          {
            en: "Notice when withdrawals require ever-larger ‘unlock’ payments.",
            fr: "Notez lorsque les retraits exigent des « déblocages » de plus en plus chers.",
          },
          {
            en: "Refuse bonuses that demand a deposit before withdrawing.",
            fr: "Refusez les bonus exigeant un dépôt avant tout retrait.",
          },
          {
            en: "Watch for ‘account managers’ offering to trade for you.",
            fr: "Méfiez-vous des « gestionnaires » proposant de trader pour vous.",
          },
          {
            en: "Beware clone sites impersonating well-known exchanges.",
            fr: "Méfiez-vous des sites clones imitant les grandes plateformes d’échange.",
          },
        ],
      },
      {
        heading: { en: "Wallets and transfers", fr: "Portefeuilles et transferts" },
        items: [
          {
            en: "Copy wallet addresses carefully — blockchain transfers are final.",
            fr: "Recopiez les adresses avec soin : les transferts blockchain sont définitifs.",
          },
          {
            en: "Send a small test transfer before any large movement.",
            fr: "Envoyez un petit transfert test avant tout mouvement important.",
          },
          {
            en: "Never share your recovery phrase or private keys.",
            fr: "Ne partagez jamais votre phrase de récupération ni vos clés privées.",
          },
          {
            en: "Write your recovery phrase on paper, never in a photo.",
            fr: "Écrivez votre phrase de récupération sur papier, jamais en photo.",
          },
          {
            en: "Enable two-factor authentication on your exchange account.",
            fr: "Activez l’authentification à deux facteurs sur votre compte d’échange.",
          },
          {
            en: "Beware pop-ups and calls asking to connect your wallet.",
            fr: "Méfiez-vous des pop-ups et appels demandant de connecter votre portefeuille.",
          },
        ],
      },
      {
        heading: { en: "After losses: fake recovery offers", fr: "Après les pertes : fausses offres de récupération" },
        items: [
          {
            en: "Treat ‘recovery agents’ demanding upfront fees as scammers too.",
            fr: "Tenez les « agents de récupération » exigeant des frais pour des escrocs.",
          },
          {
            en: "Remember that sent crypto is almost impossible to reverse.",
            fr: "Sachez qu’une cryptomonnaie envoyée est presque impossible à annuler.",
          },
          {
            en: "Ignore messages from ‘officials’ who can restore lost funds.",
            fr: "Ignorez les messages d’« officiels » prétendant restaurer les fonds perdus.",
          },
          {
            en: "Report losses to the police instead of paying recovery agents.",
            fr: "Signalez vos pertes à la police plutôt que de payer des récupérateurs.",
          },
          {
            en: "Report fraudulent platforms to your national cybercrime unit.",
            fr: "Signalez les plateformes frauduleuses à votre unité de cybercriminalité.",
          },
          {
            en: "Warn your community about the platform’s name and methods.",
            fr: "Avertissez votre entourage du nom et des méthodes de la plateforme.",
          },
        ],
      },
    ],
    references: [
      { label: "FBI Internet Crime Complaint Center (IC3)", url: "https://www.ic3.gov/" },
      { label: "ScamShield — Singapore", url: "https://www.scamshield.gov.sg/" },
      { label: "Cyber Security Authority — Ghana", url: "https://csa.gov.gh/" },
    ],
    version: "1.0",
    publishedAt: "2026-11-20",
    pdfEn: "/checklists/crypto-scam-prevention-en.pdf",
    pdfFr: "/checklists/crypto-scam-prevention-fr.pdf",
  },

  /* ------------------------------------------------------------------ */
  /* 12. After being scammed (crisis, featured)                         */
  /* ------------------------------------------------------------------ */
  {
    slug: "after-being-scammed",
    title: {
      en: "What to Do Immediately After Being Scammed",
      fr: "Que faire immédiatement après une arnaque",
    },
    subtitle: {
      en: "Act fast, keep evidence, report — in that order.",
      fr: "Agissez vite, conservez les preuves, signalez — dans cet ordre.",
    },
    category: "crisis",
    featured: true,
    intro: {
      en: "If money or data has just been taken from you, this checklist turns panic into a clear order of actions. Speed limits the damage, so start at the top and work down. Keep it printed at home — and remember: being scammed is not your fault; reporting it is your power.",
      fr: "Si l’on vient de vous prendre de l’argent ou des données, cette liste de contrôle transforme la panique en ordre d’actions clair. La rapidité limite les dégâts : commencez en haut et descendez. Gardez-la imprimée à la maison — et rappelez-vous : être victime n’est pas votre faute ; signaler est votre force.",
    },
    warning: {
      en: "Anyone who contacts you later offering to recover your money for a fee is running a second scam. Real recoveries are handled by your bank, your operator and the police.",
      fr: "Quiconque vous contacte ensuite en proposant de récupérer votre argent contre frais prépare une seconde arnaque. Les vraies récupérations passent par votre banque, votre opérateur et la police.",
    },
    emergency: {
      en: "Right now: stop all contact, call your bank or mobile money operator to block transfers, change the PINs and passwords of exposed accounts, then report to the police — every minute counts.",
      fr: "Dès maintenant : coupez tout contact, appelez votre banque ou opérateur d’argent mobile pour bloquer les transferts, changez codes et mots de passe des comptes exposés, puis signalez à la police — chaque minute compte.",
    },
    sections: [
      {
        heading: { en: "Stop further losses", fr: "Stopper les pertes" },
        items: [
          {
            en: "Stop all contact with the scammer immediately.",
            fr: "Coupez immédiatement tout contact avec l’escroc.",
          },
          {
            en: "Do not pay any ‘recovery fee’ — that is a second scam.",
            fr: "Ne payez aucun « frais de récupération » — c’est une seconde arnaque.",
          },
          {
            en: "Freeze or block affected accounts through official channels.",
            fr: "Bloquez ou suspendez les comptes touchés via les canaux officiels.",
          },
          {
            en: "Change passwords for e-mail, banking and social accounts.",
            fr: "Changez les mots de passe des e-mails, comptes bancaires et réseaux sociaux.",
          },
          {
            en: "Warn family not to respond to messages sent in your name.",
            fr: "Prévenez votre famille de ne pas répondre aux messages envoyés en votre nom.",
          },
          {
            en: "Act quickly: speed matters far more than shame.",
            fr: "Agissez vite : la rapidité compte bien plus que la honte.",
          },
        ],
      },
      {
        heading: { en: "Contact your financial provider", fr: "Contacter votre prestataire financier" },
        items: [
          {
            en: "Call your bank or operator’s official fraud line now.",
            fr: "Appelez dès maintenant le service antifraude de votre banque ou opérateur.",
          },
          {
            en: "Ask for recent transfers to be blocked or reversed.",
            fr: "Demandez le blocage ou l’annulation des virements récents.",
          },
          {
            en: "Request written confirmation and a case reference number.",
            fr: "Exigez une confirmation écrite et un numéro de dossier.",
          },
          {
            en: "Change PINs and passwords for any exposed payment account.",
            fr: "Changez codes et mots de passe de tout compte de paiement exposé.",
          },
          {
            en: "Ask your operator to guard your line against SIM swaps.",
            fr: "Demandez à votre opérateur de protéger votre ligne contre les échanges de SIM.",
          },
          {
            en: "Note the name of every agent you speak with.",
            fr: "Notez le nom de chaque agent avec qui vous parlez.",
          },
        ],
      },
      {
        heading: { en: "Preserve the evidence", fr: "Préserver les preuves" },
        items: [
          {
            en: "Screenshot all chats, messages and e-mails with the scammer.",
            fr: "Capturez tous les échanges, messages et e-mails avec l’escroc.",
          },
          {
            en: "Save phone numbers, account names and wallet addresses involved.",
            fr: "Enregistrez numéros, noms de comptes et adresses de portefeuille en cause.",
          },
          {
            en: "Keep receipts, transfer references and confirmation messages.",
            fr: "Conservez reçus, références de transfert et messages de confirmation.",
          },
          {
            en: "Do not delete anything, even if you feel embarrassed.",
            fr: "Ne supprimez rien, même si vous vous sentez gêné(e).",
          },
          {
            en: "Write a timeline of events while your memory is fresh.",
            fr: "Écrivez une chronologie des faits tant que votre mémoire est fraîche.",
          },
          {
            en: "Store copies with a trusted person or a secure cloud account.",
            fr: "Conservez des copies chez une personne de confiance ou dans un cloud sécurisé.",
          },
        ],
      },
      {
        heading: { en: "Report", fr: "Signaler" },
        items: [
          {
            en: "File a report with the police or your cybercrime unit.",
            fr: "Déposez plainte auprès de la police ou de votre unité de cybercriminalité.",
          },
          {
            en: "Report the account numbers that received your money.",
            fr: "Signalez les numéros de compte ayant reçu votre argent.",
          },
          {
            en: "Report the scammer’s profiles to the platforms involved.",
            fr: "Signalez les profils de l’escroc aux plateformes concernées.",
          },
          {
            en: "Notify your national cyber agency, such as ANTIC in Cameroon.",
            fr: "Informez votre agence nationale de cybersécurité, telle qu’ANTIC au Cameroun.",
          },
          {
            en: "Keep the report reference for your bank’s investigation.",
            fr: "Conservez la référence du procès-verbal pour l’enquête de votre banque.",
          },
          {
            en: "Warn your community so others recognise the same trick.",
            fr: "Avertissez votre entourage pour que d’autres reconnaissent la même ruse.",
          },
        ],
      },
      {
        heading: { en: "Protect your identity going forward", fr: "Protéger votre identité pour la suite" },
        items: [
          {
            en: "Watch your accounts for transactions you did not make.",
            fr: "Surveillez vos comptes pour repérer les opérations non effectuées par vous.",
          },
          {
            en: "Watch for accounts or contracts opened in your name.",
            fr: "Repérez tout compte ou contrat ouvert à votre nom.",
          },
          {
            en: "Alert your operator if your SIM loses signal unexpectedly.",
            fr: "Avertissez votre opérateur si votre SIM perd le réseau sans raison.",
          },
          {
            en: "Consider a fresh e-mail address for critical accounts.",
            fr: "Envisagez une nouvelle adresse e-mail pour les comptes critiques.",
          },
          {
            en: "Talk to someone you trust — recovery is emotional too.",
            fr: "Parlez à une personne de confiance — le rétablissement est aussi émotionnel.",
          },
          {
            en: "Ask for support from family, friends or a professional counsellor.",
            fr: "Demandez le soutien de proches ou d’un conseiller professionnel.",
          },
        ],
      },
    ],
    references: [
      { label: "ANTIC — Cameroun", url: "https://www.antic.cm/" },
      { label: "FBI Internet Crime Complaint Center (IC3)", url: "https://www.ic3.gov/" },
      {
        label: "Canadian Anti-Fraud Centre — Centre antifraude du Canada",
        url: "https://www.antifraudcentre-centreantifraude.ca/",
      },
    ],
    version: "1.0",
    publishedAt: "2026-11-20",
    pdfEn: "/checklists/after-being-scammed-en.pdf",
    pdfFr: "/checklists/after-being-scammed-fr.pdf",
  },

  /* ------------------------------------------------------------------ */
  /* 13. Website legitimacy verification                                */
  /* ------------------------------------------------------------------ */
  {
    slug: "website-legitimacy",
    title: {
      en: "Website Legitimacy Verification Checklist",
      fr: "Liste de contrôle : vérification de la fiabilité des sites web",
    },
    subtitle: {
      en: "Check the site before it takes your money.",
      fr: "Vérifiez le site avant qu’il ne prenne votre argent.",
    },
    category: "shopping",
    intro: {
      en: "This checklist helps you judge whether a website is genuine before you enter card details or personal information. Use it for shops, banks, government services and donation pages alike. Print it and keep it beside the family computer.",
      fr: "Cette liste de contrôle vous aide à juger de l’authenticité d’un site avant d’y saisir des données bancaires ou personnelles. Utilisez-la pour les boutiques, banques, services publics et pages de don. Imprimez-la et gardez-la près de l’ordinateur familial.",
    },
    warning: {
      en: "A padlock icon only means the connection is encrypted — fake sites have them too. Judge the address, the content and the contacts, never the padlock alone.",
      fr: "Le cadenas indique seulement une connexion chiffrée — les faux sites en ont aussi. Jugez l’adresse, le contenu et les contacts, jamais le seul cadenas.",
    },
    sections: [
      {
        heading: { en: "First impressions", fr: "Premières impressions" },
        items: [
          {
            en: "Question deep discounts far below every other shop.",
            fr: "Méfiez-vous des remises très inférieures à toutes les autres boutiques.",
          },
          {
            en: "Notice poor spelling, machine-translated or copied text.",
            fr: "Repérez l’orthographe approximative, le texte traduit à la machine ou copié.",
          },
          {
            en: "Beware countdown timers and pop-ups demanding instant action.",
            fr: "Méfiez-vous des comptes à rebours et pop-ups exigeant une action immédiate.",
          },
          {
            en: "Check whether the same images appear on other, older sites.",
            fr: "Vérifiez si les mêmes images apparaissent sur d’autres sites plus anciens.",
          },
          {
            en: "Read the legal pages: terms, privacy and returns policy.",
            fr: "Lisez les pages légales : conditions, confidentialité et retours.",
          },
          {
            en: "Search the site’s name followed by ‘scam’ or ‘review’.",
            fr: "Recherchez le nom du site suivi de « arnaque » ou « avis ».",
          },
        ],
      },
      {
        heading: { en: "The web address", fr: "L’adresse web" },
        items: [
          {
            en: "Check the exact spelling of the domain for swapped letters.",
            fr: "Vérifiez l’orthographe exacte du domaine pour repérer les lettres inversées.",
          },
          {
            en: "Remember that anyone can obtain https — it proves little.",
            fr: "Sachez que n’importe qui peut obtenir le https — cela prouve peu.",
          },
          {
            en: "Treat very new or unusual domain endings with extra caution.",
            fr: "Redoublez de prudence face aux domaines récents ou extensions rares.",
          },
          {
            en: "Look up the domain’s creation date in a free whois search.",
            fr: "Consultez la date de création du domaine via une recherche whois gratuite.",
          },
          {
            en: "Compare the domain with the brand’s official address elsewhere.",
            fr: "Comparez le domaine avec l’adresse officielle publiée par la marque.",
          },
          {
            en: "Beware subdomains pretending to belong to a trusted brand.",
            fr: "Méfiez-vous des sous-domaines prétendant appartenir à une marque connue.",
          },
        ],
      },
      {
        heading: { en: "Content and contacts", fr: "Contenu et contacts" },
        items: [
          {
            en: "Look for a real street address and a working phone number.",
            fr: "Cherchez une adresse postale réelle et un numéro de téléphone fonctionnel.",
          },
          {
            en: "Call the number and check who answers and how.",
            fr: "Appelez le numéro et vérifiez qui répond et comment.",
          },
          {
            en: "Test the contact form with a simple question before buying.",
            fr: "Testez le formulaire de contact avec une question simple avant d’acheter.",
          },
          {
            en: "Beware sites with no named company behind them.",
            fr: "Méfiez-vous des sites sans société identifiée derrière eux.",
          },
          {
            en: "Check whether a national company register knows the trader.",
            fr: "Vérifiez si le registre national des sociétés connaît le vendeur.",
          },
          {
            en: "Read independent reviews on external platforms, not the site.",
            fr: "Lisez les avis sur des plateformes externes, pas sur le site lui-même.",
          },
        ],
      },
      {
        heading: { en: "Payment and personal data", fr: "Paiement et données personnelles" },
        items: [
          {
            en: "Check the payment page’s full address before entering card details.",
            fr: "Vérifiez l’adresse de la page de paiement avant de saisir votre carte.",
          },
          {
            en: "Prefer payment methods offering buyer protection.",
            fr: "Préférez les moyens de paiement offrant une protection de l’acheteur.",
          },
          {
            en: "Refuse sites that only accept bank transfer or crypto.",
            fr: "Refusez les sites n’acceptant que virement bancaire ou cryptomonnaie.",
          },
          {
            en: "Never let a site store your card unless you fully trust it.",
            fr: "N’enregistrez votre carte que sur un site de confiance totale.",
          },
          {
            en: "Beware sites requesting ID documents for ordinary purchases.",
            fr: "Méfiez-vous des sites exigeant une pièce d’identité pour un achat ordinaire.",
          },
          {
            en: "Log out after using your account on a shared computer.",
            fr: "Déconnectez-vous après toute session sur un ordinateur partagé.",
          },
        ],
      },
      {
        heading: { en: "Extra verification steps", fr: "Vérifications complémentaires" },
        items: [
          {
            en: "Paste the address into a free website reputation checker.",
            fr: "Collez l’adresse dans un vérificateur gratuit de réputation de sites.",
          },
          {
            en: "Check the address against public scam-report databases.",
            fr: "Confrontez l’adresse aux bases publiques de signalement d’arnaques.",
          },
          {
            en: "Search for the shop on social media and read real customers’ posts.",
            fr: "Cherchez la boutique sur les réseaux et lisez les retours de vrais clients.",
          },
          {
            en: "Ask your network whether anyone has bought from the site.",
            fr: "Demandez à votre entourage si quelqu’un a acheté sur ce site.",
          },
          {
            en: "Place a tiny first order before trusting a new site fully.",
            fr: "Passez d’abord une très petite commande avant de faire confiance.",
          },
        ],
      },
    ],
    references: [
      { label: "UK National Cyber Security Centre — Cyber Aware", url: "https://www.ncsc.gov.uk/cyberaware" },
      { label: "ScamShield — Singapore", url: "https://www.scamshield.gov.sg/" },
      { label: "Cyber Security Authority — Ghana", url: "https://csa.gov.gh/" },
    ],
    version: "1.0",
    publishedAt: "2026-11-20",
    pdfEn: "/checklists/website-legitimacy-en.pdf",
    pdfFr: "/checklists/website-legitimacy-fr.pdf",
  },

  /* ------------------------------------------------------------------ */
  /* 14. WhatsApp security                                              */
  /* ------------------------------------------------------------------ */
  {
    slug: "whatsapp-security",
    title: {
      en: "WhatsApp Security Checklist",
      fr: "Liste de contrôle : sécurité WhatsApp",
    },
    subtitle: {
      en: "Secure your WhatsApp before scammers reach your family.",
      fr: "Sécurisez WhatsApp avant que les fraudeurs n’atteignent votre famille.",
    },
    category: "social",
    intro: {
      en: "WhatsApp carries family conversations, community groups and business deals — which makes it a prime target. This checklist secures your account and builds habits against the scams circulating on the app. Print it and walk through it with everyone at home.",
      fr: "WhatsApp accueille les conversations familiales, les groupes communautaires et les affaires — c’est donc une cible de choix. Cette liste de contrôle sécurise votre compte et crée des réflexes contre les arnaques circulant sur l’application. Imprimez-la et parcourez-la avec toute la famille.",
    },
    warning: {
      en: "WhatsApp will never ask for your six-digit code, a fee or a ‘business verification’ payment. Any message doing so is a scam — never share the code.",
      fr: "WhatsApp ne vous demandera jamais votre code à six chiffres, des frais ni un paiement de « vérification professionnelle ». Tout message en ce sens est une arnaque — ne partagez jamais le code.",
    },
    sections: [
      {
        heading: { en: "Securing your account", fr: "Sécuriser votre compte" },
        items: [
          {
            en: "Turn on two-step verification in WhatsApp settings today.",
            fr: "Activez dès aujourd’hui la vérification en deux étapes dans les paramètres.",
          },
          {
            en: "Choose a six-digit PIN that no one can guess.",
            fr: "Choisissez un code à six chiffres impossible à deviner.",
          },
          {
            en: "Add a recovery e-mail address to your account.",
            fr: "Ajoutez une adresse e-mail de récupération à votre compte.",
          },
          {
            en: "Never share your registration code with anyone, ever.",
            fr: "Ne partagez jamais votre code d’enregistrement, en aucune circonstance.",
          },
          {
            en: "Check ‘Linked devices’ regularly for unknown connections.",
            fr: "Vérifiez régulièrement les « appareils connectés » inconnus.",
          },
          {
            en: "Enable security notifications to see when keys change.",
            fr: "Activez les notifications de sécurité pour repérer les changements de clé.",
          },
        ],
      },
      {
        heading: { en: "Messages from strangers", fr: "Messages d’inconnus" },
        items: [
          {
            en: "Ignore job offers and prizes arriving from unknown numbers.",
            fr: "Ignorez les offres d’emploi et lots provenant de numéros inconnus.",
          },
          {
            en: "Do not forward money requests without calling the sender first.",
            fr: "Ne transmettez aucune demande d’argent sans appeler d’abord l’expéditeur.",
          },
          {
            en: "Beware ‘Hi Mum’ texts from new numbers — verify by calling.",
            fr: "Méfiez-vous du « Maman, c’est moi » d’un numéro inconnu — appelez d’abord.",
          },
          {
            en: "Remember that voices can be faked — verify by calling back.",
            fr: "Sachez que les voix peuvent être imitées — vérifiez en rappelant.",
          },
          {
            en: "Never click ‘tracking links’ for parcels you never ordered.",
            fr: "Ne cliquez pas sur les « liens de suivi » de colis jamais commandés.",
          },
          {
            en: "Block and report numbers that pressure you for money.",
            fr: "Bloquez et signalez les numéros vous mettant la pression pour de l’argent.",
          },
        ],
      },
      {
        heading: { en: "Scams circulating on WhatsApp", fr: "Arnaques circulant sur WhatsApp" },
        items: [
          {
            en: "Recognise fake ‘WhatsApp Gold’ or premium upgrade invitations.",
            fr: "Reconnaissez les fausses invitations « WhatsApp Gold » ou « premium ».",
          },
          {
            en: "Beware investment groups promising daily profits.",
            fr: "Méfiez-vous des groupes d’investissement promettant des gains quotidiens.",
          },
          {
            en: "Ignore messages asking you to dial strange codes.",
            fr: "Ignorez les messages vous demandant de composer des codes inhabituels.",
          },
          {
            en: "Refuse to pay ‘account verification fees’ — none exist.",
            fr: "Refusez de payer des « frais de vérification de compte » — ils n’existent pas.",
          },
          {
            en: "Do not call back numbers that ring once and hang up.",
            fr: "Ne rappelez pas les numéros dont l’appel sonne une fois puis coupe.",
          },
          {
            en: "Delete messages claiming your account expires today.",
            fr: "Supprimez les messages affirmant que votre compte expire aujourd’hui.",
          },
        ],
      },
      {
        heading: { en: "Groups and calls", fr: "Groupes et appels" },
        items: [
          {
            en: "Leave groups that flood you with investment ‘tips’.",
            fr: "Quittez les groupes inondés de « conseils » d’investissement.",
          },
          {
            en: "Mute or exit groups where admins push payment links.",
            fr: "Masquez ou quittez les groupes où les admins poussent des liens de paiement.",
          },
          {
            en: "End calls asking for codes, PINs or money transfers.",
            fr: "Terminez tout appel exigeant un code PIN ou un transfert d’argent.",
          },
          {
            en: "Report and delete scam forwards instead of sharing them.",
            fr: "Signalez et supprimez les arnaques relayées au lieu de les diffuser.",
          },
          {
            en: "Check unknown group invites carefully before joining by link.",
            fr: "Examinez les invitations à rejoindre un groupe avant de cliquer.",
          },
          {
            en: "Never share personal details in public group chats.",
            fr: "Ne partagez jamais de données personnelles dans les groupes publics.",
          },
        ],
      },
      {
        heading: { en: "Helping family and friends", fr: "Aider famille et amis" },
        items: [
          {
            en: "Show older relatives how to enable two-step verification.",
            fr: "Montrez aux aînés comment activer la vérification en deux étapes.",
          },
          {
            en: "Agree a family code word for urgent money requests.",
            fr: "Convenez d’un mot de code familial pour les demandes d’argent urgentes.",
          },
          {
            en: "Teach children never to share codes or PINs with anyone.",
            fr: "Apprenez aux enfants à ne jamais partager un code.",
          },
          {
            en: "Help grandparents check ‘linked devices’ every month.",
            fr: "Aidez les grands-parents à vérifier les « appareils connectés » chaque mois.",
          },
          {
            en: "Call — do not chat — before sending money to family.",
            fr: "Appelez — sans passer par le chat — avant d’envoyer de l’argent à la famille.",
          },
          {
            en: "Share official scam warnings instead of unverified rumours.",
            fr: "Partagez les alertes officielles plutôt que des rumeurs non vérifiées.",
          },
        ],
      },
    ],
    references: [
      { label: "ScamShield — Singapore", url: "https://www.scamshield.gov.sg/" },
      { label: "ANTIC — Cameroun", url: "https://www.antic.cm/" },
      { label: "UK National Cyber Security Centre — Cyber Aware", url: "https://www.ncsc.gov.uk/cyberaware" },
    ],
    version: "1.0",
    publishedAt: "2026-11-20",
    pdfEn: "/checklists/whatsapp-security-en.pdf",
    pdfFr: "/checklists/whatsapp-security-fr.pdf",
  },

  /* ------------------------------------------------------------------ */
  /* 15. Family digital safety                                          */
  /* ------------------------------------------------------------------ */
  {
    slug: "family-digital-safety",
    title: {
      en: "Family Digital Safety Checklist",
      fr: "Liste de contrôle : sécurité numérique en famille",
    },
    subtitle: {
      en: "Guide children and grandparents to safer screens.",
      fr: "Guidez enfants et grands-parents vers des écrans plus sûrs.",
    },
    category: "family",
    intro: {
      en: "This checklist helps the whole household — children, parents and grandparents — share the same protective habits online. Work through it together, adapt each step to each age, and revisit it as children grow. Print it and pin it somewhere the whole family can see.",
      fr: "Cette liste de contrôle aide toute la famille — enfants, parents et grands-parents — à partager les mêmes réflexes de protection en ligne. Parcourez-la ensemble, adaptez chaque étape à chaque âge, et reprenez-la à mesure que les enfants grandissent. Imprimez-la et affichez-la où toute la famille peut la voir.",
    },
    warning: {
      en: "Scammers target each generation differently: games and prizes for children, urgency for busy parents, respect for authority with elders. Agree one family rule: verify by calling before anyone pays.",
      fr: "Les fraudeurs ciblent chaque génération différemment : jeux et lots pour les enfants, urgence pour les parents occupés, respect de l’autorité pour les aînés. Convenez d’une règle familiale : vérifier par appel avant tout paiement.",
    },
    sections: [
      {
        heading: { en: "Together as a family", fr: "Ensemble, en famille" },
        items: [
          {
            en: "Agree family rules for screens, sharing and spending.",
            fr: "Convenez de règles familiales pour les écrans, le partage et les dépenses.",
          },
          {
            en: "Make it safe to ask for help before paying or clicking.",
            fr: "Faites qu’il soit facile de demander de l’aide avant de payer ou de cliquer.",
          },
          {
            en: "Choose a family code word for urgent money requests.",
            fr: "Choisissez un mot de code familial pour les demandes d’argent urgentes.",
          },
          {
            en: "Keep a printed list of official fraud numbers at home.",
            fr: "Gardez à la maison la liste imprimée des numéros officiels antifraude.",
          },
          {
            en: "Discuss scams seen in the news or the community regularly.",
            fr: "Discutez régulièrement des arnaques relayées par l’actualité ou le quartier.",
          },
          {
            en: "Decide that big money decisions get a second opinion.",
            fr: "Décidez que toute grosse dépense appelle un second avis.",
          },
        ],
      },
      {
        heading: { en: "Children and teenagers", fr: "Enfants et adolescents" },
        items: [
          {
            en: "Keep children’s profiles private and age-appropriate.",
            fr: "Maintenez les profils des enfants privés et adaptés à leur âge.",
          },
          {
            en: "Teach children never to share full name, school or address.",
            fr: "Apprenez-leur à ne jamais donner leur nom, école ou adresse.",
          },
          {
            en: "Explain that online ‘friends’ may not be who they claim.",
            fr: "Expliquez que les « amis » en ligne ne sont pas toujours ce qu’ils prétendent.",
          },
          {
            en: "Keep app-store passwords so purchases need your approval.",
            fr: "Gardez les mots de passe des boutiques d’applications : aucun achat sans vous.",
          },
          {
            en: "Play their games with them to understand their online world.",
            fr: "Jouez à leurs jeux pour comprendre leur univers en ligne.",
          },
          {
            en: "Encourage children to report strange or frightening messages.",
            fr: "Encouragez les enfants à signaler les messages étranges ou effrayants.",
          },
          {
            en: "Watch for ‘free game currency’ tricks targeting young players.",
            fr: "Repérez les astuces de « monnaie de jeu gratuite » visant les jeunes joueurs.",
          },
        ],
      },
      {
        heading: { en: "Grandparents and elders", fr: "Grands-parents et aînés" },
        items: [
          {
            en: "Install official banking and mobile money apps for elders yourself.",
            fr: "Installez vous-même les applications bancaires et d’argent mobile des aînés.",
          },
          {
            en: "Show elders how to spot fake bank and MoMo messages.",
            fr: "Montrez-leur à repérer les faux messages de banque et d’argent mobile.",
          },
          {
            en: "Write the operator’s fraud number in large print.",
            fr: "Écrivez en gros caractères le numéro antifraude de l’opérateur.",
          },
          {
            en: "Explain that no official ever asks for PINs or codes.",
            fr: "Expliquez qu’aucun service officiel ne demande codes ni mots de passe.",
          },
          {
            en: "Review elders’ linked devices and app permissions regularly.",
            fr: "Vérifiez régulièrement leurs appareils et autorisations d’applications.",
          },
          {
            en: "Remind elders that unexpected prizes requiring fees are scams.",
            fr: "Rappelez aux aînés qu’un lot inattendu exigeant des frais est une arnaque.",
          },
          {
            en: "Invite elders to check any money request with you first.",
            fr: "Invitez les aînés à vérifier avec vous toute demande d’argent.",
          },
        ],
      },
      {
        heading: { en: "Shared devices and the home network", fr: "Appareils partagés et réseau domestique" },
        items: [
          {
            en: "Change the default password of your Wi-Fi router.",
            fr: "Changez le mot de passe par défaut de votre routeur Wi-Fi.",
          },
          {
            en: "Apply updates to all family devices each month.",
            fr: "Appliquez chaque mois les mises à jour des appareils familiaux.",
          },
          {
            en: "Create separate user accounts on shared computers.",
            fr: "Créez des comptes distincts sur les ordinateurs partagés.",
          },
          {
            en: "Match parental controls to each child’s age.",
            fr: "Adaptez le contrôle parental à l’âge de chaque enfant.",
          },
          {
            en: "Cover webcams on shared devices when not in use.",
            fr: "Couvrez les webcams des appareils partagés hors utilisation.",
          },
          {
            en: "Back up family photos and documents regularly.",
            fr: "Sauvegardez régulièrement photos et documents familiaux.",
          },
        ],
      },
      {
        heading: { en: "Habits that last", fr: "Des habitudes durables" },
        items: [
          {
            en: "Review privacy settings together every few months.",
            fr: "Revoyez ensemble les paramètres de confidentialité tous les quelques mois.",
          },
          {
            en: "Rehearse what to do if someone’s account is hacked.",
            fr: "Répétez les gestes à faire en cas de piratage d’un compte.",
          },
          {
            en: "Praise family members who verify before paying.",
            fr: "Félicitez ceux qui vérifient avant de payer.",
          },
          {
            en: "Share scam alerts with the wider family group.",
            fr: "Partagez les alertes d’arnaques avec le groupe familial élargi.",
          },
          {
            en: "Update the rules as children grow and apps change.",
            fr: "Actualisez les règles à mesure que les enfants et les applications évoluent.",
          },
          {
            en: "Keep this checklist printed near the family computer.",
            fr: "Gardez cette liste imprimée près de l’ordinateur familial.",
          },
        ],
      },
    ],
    references: [
      { label: "UK National Cyber Security Centre — Cyber Aware", url: "https://www.ncsc.gov.uk/cyberaware" },
      { label: "ScamShield — Singapore", url: "https://www.scamshield.gov.sg/" },
      { label: "Cyber Security Authority — Ghana", url: "https://csa.gov.gh/" },
    ],
    version: "1.0",
    publishedAt: "2026-11-20",
    pdfEn: "/checklists/family-digital-safety-en.pdf",
    pdfFr: "/checklists/family-digital-safety-fr.pdf",
  },
];

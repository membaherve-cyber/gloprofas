import type { Article } from "./resource-centre-types";

/**
 * GLOPROFAS Resource Centre — articles A & B.
 *
 * Category A — "Online and Digital Scams" (online-digital)
 * Category B — "Money, Banking and Mobile Financial Services" (money-banking)
 *
 * All scenarios named "Illustrative example" / "Exemple illustratif" are
 * fictional teaching stories, not real cases. References to MTN MoMo,
 * Orange Money, banks or public services always describe criminals
 * IMPERSONATING those organisations — never wrongdoing by them.
 */
export const ARTICLES_A_B: Article[] = [
  {
    slug: "how-to-recognise-and-avoid-online-scams",
    categorySlug: "online-digital",
    title: {
      en: "How to Recognise and Avoid Online Scams",
      fr: "Comment reconnaître et éviter les arnaques en ligne",
    },
    metaDescription: {
      en: "Spot the warning signs of online scams: urgent payment demands, fake messages and too-good-to-be-true offers — and protect your money and data.",
      fr: "Repérez les signes d’une arnaque en ligne : paiements urgents, faux messages, offres alléchantes. Protégez votre argent et vos données.",
    },
    summary: {
      en: "Online scams arrive through messages, calls, websites and social media, all designed to steal your money or personal data. This guide explains the tactics fraudsters use and the simple habits that keep you safe. Learn what to check before you click, pay or share.",
      fr: "Les arnaques en ligne arrivent par messages, appels, sites et réseaux sociaux pour voler votre argent ou vos données. Ce guide explique les tactiques des fraudeurs et les réflexes simples qui vous protègent. Sachez quoi vérifier avant de cliquer, payer ou partager.",
    },
    what: {
      en: "An online scam is a deliberate attempt to trick you into handing over money, passwords, banking details or personal information. Criminals use fake identities, urgent stories and professional-looking websites or messages to build false trust. The scam succeeds the moment you act under pressure without verifying who is really contacting you or what you are really paying for.",
      fr: "Une arnaque en ligne est une tentative délibérée de vous soutirer de l’argent, des mots de passe, des coordonnées bancaires ou des informations personnelles. Les criminels utilisent de fausses identités, des histoires urgentes et des messages ou sites d’apparence professionnelle pour créer une confiance trompeuse. L’arnaque réussit dès que vous agissez sous pression sans vérifier qui vous contacte réellement.",
    },
    how: {
      en: "Most online scams follow the same script. The criminal contacts you unexpectedly — by SMS, WhatsApp, email or phone — pretending to be someone trustworthy: a bank agent, a mobile money representative, a delivery company or a relative. Then comes the pressure: your account is blocked, a fee must be paid today, or an investment opportunity closes tonight. Finally, they push you towards a fast, irreversible action: sending mobile money to an unknown number, sharing a verification code, or clicking a link that captures your password. Once the money moves, the criminal disappears — or invents a new story to take more.",
      fr: "La plupart des arnaques en ligne suivent le même scénario. Le criminel vous contacte à l’improviste — par SMS, WhatsApp, courriel ou téléphone — en se faisant passer pour quelqu’un de fiable : un agent de banque, un représentant de mobile money, une société de livraison ou un proche. Vient ensuite la pression : votre compte est bloqué, des frais doivent être payés aujourd’hui, une opportunité d’investissement se termine ce soir. Enfin, il vous pousse vers une action rapide et irréversible : envoyer de l’argent mobile à un numéro inconnu, partager un code de vérification ou cliquer sur un lien qui capture votre mot de passe. Dès que l’argent part, le criminel disparaît — ou invente une nouvelle histoire pour en prendre davantage.",
    },
    warningSigns: [
      {
        en: "A stranger contacts you with an urgent problem or a prize you never entered to win.",
        fr: "Un inconnu vous contacte avec un problème urgent ou un lot que vous n’avez jamais gagné.",
      },
      {
        en: "You are pushed to pay immediately — today, within the hour, or the offer disappears.",
        fr: "On vous presse de payer immédiatement — aujourd’hui, dans l’heure, sinon l’offre disparaît.",
      },
      {
        en: "Payment is requested through mobile money to a personal number or via gift cards.",
        fr: "Le paiement est demandé par mobile money vers un numéro personnel ou via des cartes cadeaux.",
      },
      {
        en: "Someone asks for your PIN, OTP code or full banking details — no real provider does.",
        fr: "Quelqu’un demande votre code PIN, votre OTP ou vos coordonnées bancaires complètes — aucun service légitime ne le fait.",
      },
      {
        en: "The message contains a shortened or misspelled link instead of the official website address.",
        fr: "Le message contient un lien raccourci ou mal orthographié au lieu de l’adresse officielle du site.",
      },
      {
        en: "The tone becomes threatening: legal action, account closure or arrest if you do not comply.",
        fr: "Le ton devient menaçant : poursuites, fermeture de compte ou arrestation si vous n’obéissez pas.",
      },
      {
        en: "An online seller refuses a secure payment method and insists on cash transfer to strangers.",
        fr: "Un vendeur en ligne refuse tout paiement sécurisé et exige un transfert vers un inconnu.",
      },
    ],
    example: {
      en: "Illustrative example: Aminata, a fabric seller in Douala, receives a WhatsApp message from “MTN Support” announcing that her MoMo account will be closed within two hours unless she “revalidates” it via a link. The page looks official and asks for her PIN and a code sent moments earlier. She hesitates, calls the official customer line, and learns the message is fake. It is a fictional scenario, not a real case.",
      fr: "Exemple illustratif : Aminata, vendeuse de tissus à Douala, reçoit un message WhatsApp de « MTN Support » annonçant que son compte MoMo sera fermé sous deux heures si elle ne le « revalide » pas via un lien. La page ressemble à l’officielle et demande son code PIN ainsi qu’un code reçu sur son téléphone. Méfiante, elle appelle le service client officiel et découvre que le message est faux. Il s’agit d’un scénario fictif, pas d’un cas réel.",
    },
    protect: [
      {
        en: "Pause before reacting: no legitimate organisation demands payment or codes within minutes.",
        fr: "Faites une pause : aucune organisation légitime n’exige un paiement ou des codes en quelques minutes.",
      },
      {
        en: "Contact companies only through numbers printed on your card, contract or official app.",
        fr: "Contactez les entreprises uniquement via les numéros imprimés sur votre carte, votre contrat ou l’application officielle.",
      },
      {
        en: "Never share PINs, OTP codes or passwords — real staff never ask for them.",
        fr: "Ne partagez jamais vos codes PIN, OTP ou mots de passe — aucun agent légitime ne les demande.",
      },
      {
        en: "Type official web addresses yourself instead of clicking links in unexpected messages.",
        fr: "Tapez vous-même les adresses officielles des sites au lieu de cliquer sur les liens reçus.",
      },
      {
        en: "Verify unexpected requests through a second channel: call the person or company back.",
        fr: "Vérifiez toute demande inattendue par un second canal : rappelez la personne ou l’entreprise.",
      },
      {
        en: "Keep your phone and apps updated, and enable transaction notifications on your accounts.",
        fr: "Gardez votre téléphone et vos applications à jour et activez les notifications de transaction.",
      },
      {
        en: "Discuss common scams with family members, especially children and older relatives who are targeted.",
        fr: "Parlez des arnaques courantes avec votre famille, surtout les enfants et les aînés souvent ciblés.",
      },
    ],
    ifVictim: [
      {
        en: "Stop all communication with the scammer and take screenshots as evidence before deleting anything.",
        fr: "Coupez tout contact avec l’arnaqueur et faites des captures d’écran comme preuves avant de supprimer quoi que ce soit.",
      },
      {
        en: "If you sent mobile money, call your provider immediately to try to block or recall the transfer.",
        fr: "Si vous avez envoyé de l’argent mobile, appelez immédiatement votre opérateur pour tenter de bloquer le transfert.",
      },
      {
        en: "If you shared banking details, ask your bank to freeze the card and monitor the account.",
        fr: "Si vous avez communiqué des données bancaires, demandez à votre banque de bloquer la carte et surveiller le compte.",
      },
      {
        en: "Change passwords on affected accounts, starting with your email, using a device you trust.",
        fr: "Changez les mots de passe des comptes concernés, en commençant par votre messagerie, depuis un appareil de confiance.",
      },
      {
        en: "Report to the police or cybercrime unit — a report may be required for any reimbursement.",
        fr: "Signalez les faits à la police ou à l’unité de cybercriminalité — un procès-verbal peut être exigé pour un remboursement.",
      },
    ],
    reportTo: [
      {
        en: "Your bank or mobile money provider, through the number printed on your card or in the official app.",
        fr: "Votre banque ou opérateur de mobile money, via le numéro imprimé sur votre carte ou dans l’application officielle.",
      },
      {
        en: "The national police or the dedicated cybercrime unit of your country.",
        fr: "La police nationale ou l’unité de cybercriminalité de votre pays.",
      },
      {
        en: "GLOPROFAS via our online report form — we can guide you through the next steps.",
        fr: "GLOPROFAS via notre formulaire de signalement en ligne — nous vous accompagnerons dans les démarches.",
      },
    ],
    keyTakeaway: {
      en: "Urgency is the scammer’s main weapon. Any message that pressures you to pay, click or share a code within minutes deserves suspicion — slow down and verify through an official channel first.",
      fr: "L’urgence est l’arme principale de l’arnaqueur. Tout message qui vous presse de payer, cliquer ou communiquer un code en quelques minutes doit éveiller votre méfiance : ralentissez et vérifiez d’abord par un canal officiel.",
    },
    relatedSlugs: [
      "phishing-scams-recognise-fake-emails-messages",
      "how-to-identify-fake-websites-and-online-stores",
      "mobile-money-scams-protect-mtn-momo-orange-money",
    ],
    checklistSlug: "general-scam-prevention",
    references: [
      { label: "ANTIC Cameroon — national cybersecurity agency", url: "https://www.antic.cm/" },
      { label: "Europol — law enforcement cooperation", url: "https://www.europol.europa.eu/" },
      { label: "ScamShield — national anti-scam programme (Singapore)", url: "https://www.scamshield.gov.sg/" },
    ],
    readingMinutes: 6,
    publishedAt: "2026-08-15",
    updatedAt: "2026-11-20",
    featured: true,
    imageUrl: "",
  },
  {
    slug: "how-to-identify-fake-websites-and-online-stores",
    categorySlug: "online-digital",
    title: {
      en: "How to Identify Fake Websites and Online Stores",
      fr: "Comment identifier les faux sites web et boutiques en ligne",
    },
    metaDescription: {
      en: "Learn to spot fake online shops and cloned websites: check the address, payment and reviews before you buy — simple checks that protect your money.",
      fr: "Repérez les fausses boutiques en ligne : vérifiez l’adresse, le paiement et les avis avant d’acheter. Des réflexes simples pour protéger votre argent.",
    },
    summary: {
      en: "Criminals clone real shops and banks with near-identical websites to harvest card details and payments. This guide shows you how to examine a web address, spot copied designs and verify a seller before parting with your money.",
      fr: "Les criminels clonent des boutiques et des banques réelles avec des sites quasi identiques pour voler vos données bancaires et vos paiements. Ce guide vous apprend à examiner une adresse web, repérer un design copié et vérifier un vendeur avant de payer.",
    },
    what: {
      en: "A fake website is a page built to imitate a real business, bank or public service so closely that you trust it with money or personal data. Some sell products that never arrive; others capture card numbers, mobile money credentials or login details. The copy may differ from the original by only a single character in the address.",
      fr: "Un faux site est une page conçue pour imiter une entreprise, une banque ou un service public si fidèlement que vous lui confiez votre argent ou vos données. Certains vendent des produits qui n’arriveront jamais ; d’autres captent vos numéros de carte, vos identifiants de mobile money ou vos mots de passe. La copie ne diffère parfois de l’original que par un seul caractère dans l’adresse.",
    },
    how: {
      en: "Fraudsters buy domain names that look almost right: extra words, hyphens, a wrong ending such as “.net” instead of “.com”, or cheap African endings like “.cm”, “.ng” or “.gh”. They copy logos, colours and product photos directly from the real site, sometimes leaving spelling mistakes or placeholder text behind. Prices are set well below the market — the hook that draws you in. When you order, the checkout form records your card or mobile money details. Sometimes a confirmation email arrives, a tracking number is invented, and the “shop” disappears weeks later, leaving no way to demand a refund.",
      fr: "Les fraudeurs achètent des noms de domaine presque identiques : mots supplémentaires, tirets, mauvaise terminaison comme « .net » au lieu de « .com », ou extensions africaines bon marché comme « .cm », « .ng » ou « .gh ». Ils copient logos, couleurs et photos du vrai site, en laissant parfois des fautes d’orthographe ou des textes d’exemple. Les prix sont fixés très bas — c’est l’appât. Lors de la commande, le formulaire de paiement enregistre vos données bancaires ou mobile money. Parfois, un courriel de confirmation arrive, un numéro de suivi est inventé, puis la « boutique » disparaît quelques semaines plus tard, sans possibilité de remboursement.",
    },
    warningSigns: [
      {
        en: "The web address contains extra words, hyphens or a strange ending compared with the official domain.",
        fr: "L’adresse contient des mots en trop, des tirets ou une extension étrange par rapport au domaine officiel.",
      },
      {
        en: "Prices are dramatically lower than in established shops, even during genuine sales seasons.",
        fr: "Les prix sont nettement inférieurs à ceux des boutiques établies, même en période de soldes.",
      },
      {
        en: "The site insists on full prepayment and offers no cash-on-delivery or escrow option.",
        fr: "Le site exige un paiement intégral d’avance et n’offre ni paiement à la livraison ni séquestre.",
      },
      {
        en: "Contact details are missing: no physical address, local phone number or verifiable customer service.",
        fr: "Les coordonnées sont absentes : ni adresse physique, ni numéro local, ni service client vérifiable.",
      },
      {
        en: "Text contains obvious spelling mistakes, mixed languages or photos with watermarks from other shops.",
        fr: "Le texte contient des fautes évidentes, des langues mélangées ou des photos marquées d’autres boutiques.",
      },
      {
        en: "The payment page asks for your PIN or OTP rather than processing a normal card transaction.",
        fr: "La page de paiement demande votre code PIN ou OTP au lieu de traiter une transaction normale.",
      },
    ],
    example: {
      en: "Illustrative example: Kwame finds a Facebook page advertising smartphones at half price, on a website ending in “-shop.net” instead of the brand’s real domain. He orders a phone worth 150,000 FCFA and pays by card. A confirmation email arrives, but the tracking link never works and the page vanishes after three weeks. His bank confirms the payment went to a private individual abroad. This scenario is illustrative, not a real case.",
      fr: "Exemple illustratif : Kwame découvre une page Facebook qui vend des smartphones à moitié prix, sur un site finissant par « -shop.net » au lieu du vrai domaine de la marque. Il commande un téléphone de 150 000 FCFA et paie par carte. Un courriel de confirmation arrive, mais le lien de suivi ne fonctionne jamais et la page disparaît après trois semaines. Sa banque confirme que le paiement est parti vers un particulier à l’étranger. Scénario illustratif, pas un cas réel.",
    },
    protect: [
      {
        en: "Type the shop’s address yourself or reach it from the brand’s official app or verified page.",
        fr: "Tapez vous-même l’adresse de la boutique ou passez par son application ou sa page vérifiée.",
      },
      {
        en: "Compare the domain letter by letter with the one printed on your receipt or invoice.",
        fr: "Comparez le domaine lettre par lettre avec celui imprimé sur votre reçu ou facture.",
      },
      {
        en: "Search the shop’s name plus the word “scam” or “arnaque” before ordering anything.",
        fr: "Cherchez le nom de la boutique suivi de « arnaque » ou « scam » avant toute commande.",
      },
      {
        en: "Prefer cash-on-delivery or payment on collection for sellers you have never used.",
        fr: "Préférez le paiement à la livraison ou au retrait pour un vendeur que vous n’avez jamais utilisé.",
      },
      {
        en: "Check that the payment page is secure (padlock and address starting with https) on every visit.",
        fr: "Vérifiez que la page de paiement est sécurisée (cadenas et adresse en https) à chaque visite.",
      },
      {
        en: "Never enter your PIN or an OTP code on a shopping site — only on your provider’s app.",
        fr: "Ne saisissez jamais votre PIN ou un code OTP sur un site marchand — uniquement dans l’application de votre opérateur.",
      },
      {
        en: "Keep evidence of every order: screenshots, confirmations and payment references help during disputes.",
        fr: "Conservez des preuves de chaque commande : captures d’écran, confirmations et références de paiement aident en cas de litige.",
      },
    ],
    ifVictim: [
      {
        en: "Ask your bank or card issuer to block the card and open a dispute for the fraudulent charge.",
        fr: "Demandez à votre banque de bloquer la carte et d’ouvrir une contestation pour le paiement frauduleux.",
      },
      {
        en: "Report the fake site to the real brand — many companies run dedicated anti-fraud forms.",
        fr: "Signalez le faux site à la véritable marque — beaucoup disposent de formulaires anti-fraude dédiés.",
      },
      {
        en: "Report the page to the platform (Facebook, Instagram) that hosted the advertisements.",
        fr: "Signalez la page à la plateforme (Facebook, Instagram) qui a hébergé les publicités.",
      },
      {
        en: "Keep screenshots of the site, order and payment — your evidence for the police report.",
        fr: "Conservez des captures du site, de la commande et du paiement — vos preuves pour le procès-verbal.",
      },
      {
        en: "Watch your account statements for unexpected recurring charges in the following weeks.",
        fr: "Surveillez vos relevés pour détecter des prélèvements inattendus dans les semaines suivantes.",
      },
    ],
    reportTo: [
      {
        en: "Your bank or card issuer through its official hotline or the number on your card.",
        fr: "Votre banque ou émetteur de carte via son service officiel ou le numéro au dos de votre carte.",
      },
      {
        en: "The national police or cybercrime unit with all screenshots and payment references.",
        fr: "La police ou l’unité de cybercriminalité avec toutes vos captures et références de paiement.",
      },
      {
        en: "GLOPROFAS through our report form so we can document the fake shop and warn others.",
        fr: "GLOPROFAS via notre formulaire de signalement afin de documenter la fausse boutique et alerter les autres.",
      },
    ],
    keyTakeaway: {
      en: "One wrong letter in a web address is all a criminal needs. Before paying online, compare the domain letter by letter, distrust prices that are too good, and never enter PINs or OTP codes on a shopping page.",
      fr: "Une seule lettre erronée dans une adresse suffit à un criminel. Avant de payer en ligne, comparez le domaine lettre par lettre, méfiez-vous des prix trop bas et ne saisissez jamais votre PIN sur une page marchande.",
    },
    relatedSlugs: [
      "how-to-recognise-and-avoid-online-scams",
      "phishing-scams-recognise-fake-emails-messages",
      "online-marketplace-scams-buy-and-sell-safely",
    ],
    checklistSlug: "website-legitimacy",
    references: [
      { label: "ScamShield — national anti-scam programme (Singapore)", url: "https://www.scamshield.gov.sg/" },
      { label: "Cyber Security Authority — Ghana", url: "https://csa.gov.gh/" },
      { label: "FBI Internet Crime Complaint Center (IC3)", url: "https://www.ic3.gov/" },
    ],
    readingMinutes: 5,
    publishedAt: "2026-08-22",
    updatedAt: "2026-11-20",
    popular: true,
    imageUrl: "",
  },
  {
    slug: "phishing-scams-recognise-fake-emails-messages",
    categorySlug: "online-digital",
    title: {
      en: "Phishing Scams: How to Recognise Fake Emails and Messages",
      fr: "Hameçonnage : reconnaître les faux courriels et messages",
    },
    metaDescription: {
      en: "Phishing messages imitate banks, employers and public services to steal your passwords and codes. Learn to read the real warning signs before you click.",
      fr: "Les messages d’hameçonnage imitent banques et services publics pour voler vos mots de passe et codes. Apprenez à repérer les signes avant de cliquer.",
    },
    summary: {
      en: "Phishing is the most widespread trick in the fraudster’s playbook: a convincing email, SMS or chat message that impersonates an organisation you trust. Learn how these fakes are built, which details betray them, and the habits that make you a much harder target.",
      fr: "L’hameçonnage est la technique de fraude la plus répandue : un courriel, SMS ou message de discussion convaincant qui usurpe une organisation de confiance. Découvrez comment ces faux sont construits, quels détails les trahissent et quels réflexes vous rendent plus difficile à tromper.",
    },
    what: {
      en: "Phishing is a message — email, SMS or WhatsApp — designed to look as if it comes from your bank, employer, delivery service or a public administration. Its goal is to make you click a link or open an attachment that leads to a fake login page or installs malware, capturing the credentials criminals need to empty your accounts.",
      fr: "L’hameçonnage est un message — courriel, SMS ou WhatsApp — conçu pour sembler provenir de votre banque, de votre employeur, d’un service de livraison ou d’une administration. Son but : vous faire cliquer sur un lien ou ouvrir une pièce jointe menant à une fausse page de connexion ou installant un logiciel malveillant, afin de capturer les identifiants nécessaires pour vider vos comptes.",
    },
    how: {
      en: "The criminal first gathers details that make the message credible: the bank’s logo, the names of real services, even your first name taken from a leaked contact list. The message then applies pressure — a security alert, a suspended account, a parcel held at customs, a salary or scholarship payment to “confirm”. The link inside points to a lookalike domain where the login page is an exact copy of the real one. The moment you enter your credentials, they are relayed to the fraudster, who logs in within minutes — often using the OTP you receive to a fake “verification” page as well.",
      fr: "Le criminel rassemble d’abord des détails crédibles : le logo de la banque, le nom de vrais services, même votre prénom issu d’une liste de contacts fuitée. Le message crée ensuite la pression — alerte de sécurité, compte suspendu, colis bloqué en douane, salaire ou bourse à « confirmer ». Le lien mène à un domaine ressemblant où la page de connexion est la copie exacte de l’originale. Dès que vous saisissez vos identifiants, ils sont transmis au fraudeur, qui se connecte en quelques minutes — souvent avec l’OTP que vous recevez, capté par une fausse page de « vérification ».",
    },
    warningSigns: [
      {
        en: "The message greets you generically — “Dear customer” — while claiming urgent matters about your account.",
        fr: "Le message vous salue de façon générique — « Cher client » — tout en invoquant une urgence sur votre compte.",
      },
      {
        en: "The sender’s real address, visible behind the display name, belongs to an unrelated or free mail service.",
        fr: "La vraie adresse de l’expéditeur, derrière le nom affiché, appartient à un service sans rapport.",
      },
      {
        en: "The link address shown on hover differs from the text displayed in the message.",
        fr: "L’adresse du lien, visible au survol, diffère du texte affiché dans le message.",
      },
      {
        en: "You are asked to “confirm”, “update” or “verify” password and account details within hours.",
        fr: "On vous demande de « confirmer », « mettre à jour » ou « vérifier » vos identifiants sous quelques heures.",
      },
      {
        en: "The message creates fear: account closure, blocked transfer, customs seizure or missed salary payment.",
        fr: "Le message instille la peur : fermeture de compte, transfert bloqué, saisie douanière ou salaire manqué.",
      },
      {
        en: "Attachments with unusual formats (.zip, .exe, .html) arrive from services that normally send no files.",
        fr: "Des pièces jointes inhabituelles (.zip, .exe, .html) arrivent de services qui n’envoient normalement aucun fichier.",
      },
      {
        en: "The tone or wording contains small errors no professional communication team would release.",
        fr: "Le ton ou la formulation contient des erreurs qu’aucune équipe de communication professionnelle ne publierait.",
      },
    ],
    example: {
      en: "Illustrative example: Nadège, a teacher in Yaoundé, receives an email stating that her salary payment needs confirmation on the “ministry’s” portal. The page copies the real site almost perfectly, but the address ends in “.net” instead of “.cm”. She enters her credentials, then an OTP arrives; a “security check” page asks her to type it in. Minutes later her mobile money account is emptied. This is an illustrative scenario, not a real case.",
      fr: "Exemple illustratif : Nadège, enseignante à Yaoundé, reçoit un courriel annonçant que le versement de son salaire doit être confirmé sur le « portail du ministère ». La page imite presque parfaitement le vrai site, mais l’adresse se termine par « .net » au lieu de « .cm ». Elle saisit ses identifiants, puis un OTP arrive ; une page de « contrôle de sécurité » lui demande de le retaper. Quelques minutes plus tard, son compte de mobile money est vidé. Scénario illustratif, pas un cas réel.",
    },
    protect: [
      {
        en: "Treat any unexpected message about accounts or payments as suspicious until verified independently.",
        fr: "Traitez tout message inattendu sur vos comptes ou paiements comme suspect jusqu’à vérification indépendante.",
      },
      {
        en: "Never log in from a link in a message — open the official app or type the address yourself.",
        fr: "Ne vous connectez jamais depuis un lien reçu — ouvrez l’application officielle ou tapez l’adresse vous-même.",
      },
      {
        en: "Hover over links (or long-press on mobile) to inspect the true destination before tapping.",
        fr: "Survolez les liens (ou appuyez longuement sur mobile) pour inspecter la vraie destination avant de cliquer.",
      },
      {
        en: "Enable two-factor authentication on email and banking apps so a stolen password is not enough.",
        fr: "Activez la double authentification sur vos courriels et applications bancaires : un mot de passe volé ne suffit plus.",
      },
      {
        en: "Verify salary, scholarship or customs messages by phone using numbers from official documents.",
        fr: "Vérifiez par téléphone les messages de salaire, bourse ou douane avec les numéros des documents officiels.",
      },
      {
        en: "Report suspicious messages to the impersonated organisation — most publish dedicated fraud addresses.",
        fr: "Signalez les messages suspects à l’organisation usurpée — la plupart publient une adresse anti-fraude dédiée.",
      },
    ],
    ifVictim: [
      {
        en: "Change the password of the affected account immediately, starting with your email if it was compromised.",
        fr: "Changez immédiatement le mot de passe du compte concerné, en commençant par votre messagerie si elle est touchée.",
      },
      {
        en: "If an OTP was shared, contact your bank or operator at once to block transactions.",
        fr: "Si un OTP a été communiqué, contactez aussitôt votre banque ou opérateur pour bloquer les transactions.",
      },
      {
        en: "Disconnect devices that opened malicious attachments and run a reputable antivirus scan.",
        fr: "Déconnectez les appareils ayant ouvert des pièces jointes malveillantes et lancez une analyse antivirus reconnue.",
      },
      {
        en: "Monitor account statements and transaction alerts for several weeks after the incident.",
        fr: "Surveillez vos relevés et alertes de transaction pendant plusieurs semaines après l’incident.",
      },
      {
        en: "Report the phishing page and message to national cybercrime authorities with full screenshots.",
        fr: "Signalez la page et le message d’hameçonnage aux autorités de cybercriminalité avec des captures complètes.",
      },
    ],
    reportTo: [
      {
        en: "The impersonated organisation through its officially published contact channels.",
        fr: "L’organisation usurpée via ses canaux de contact officiellement publiés.",
      },
      {
        en: "Your national police or cybercrime unit, with screenshots and the sender’s address.",
        fr: "La police nationale ou l’unité de cybercriminalité, avec captures et adresse de l’expéditeur.",
      },
      {
        en: "GLOPROFAS through our online report form — we analyse patterns and alert the community.",
        fr: "GLOPROFAS via notre formulaire en ligne — nous analysons les tendances et alertons la communauté.",
      },
    ],
    keyTakeaway: {
      en: "A real institution never needs your password to solve an account problem. Whatever the urgency, avoid links from messages: open the official app or type the address yourself.",
      fr: "Une véritable institution n’a jamais besoin de votre mot de passe pour régler un problème de compte. Quelle que soit l’urgence, évitez les liens reçus : ouvrez l’application officielle ou tapez l’adresse vous-même.",
    },
    relatedSlugs: [
      "how-to-recognise-and-avoid-online-scams",
      "smishing-and-vishing-sms-telephone-scams",
      "how-to-identify-fake-websites-and-online-stores",
    ],
    checklistSlug: "general-scam-prevention",
    references: [
      { label: "ANTIC Cameroon — national cybersecurity agency", url: "https://www.antic.cm/" },
      { label: "ScamShield — national anti-scam programme (Singapore)", url: "https://www.scamshield.gov.sg/" },
      { label: "Canadian Anti-Fraud Centre", url: "https://www.antifraudcentre-centreantifraude.ca/" },
    ],
    readingMinutes: 6,
    publishedAt: "2026-08-29",
    updatedAt: "2026-11-20",
    featured: true,
    imageUrl: "",
  },
  {
    slug: "smishing-and-vishing-sms-telephone-scams",
    categorySlug: "online-digital",
    title: {
      en: "Smishing and Vishing: Recognising SMS and Telephone Scams",
      fr: "Smishing et vishing : reconnaître les arnaques par SMS et téléphone",
    },
    metaDescription: {
      en: "Fraudsters use SMS and phone calls to impersonate banks, operators and officials. Learn how smishing and vishing work and how to respond safely.",
      fr: "SMS et appels frauduleux usurpent banques et opérateurs. Comprenez le smishing et le vishing, et apprenez à réagir en sécurité.",
    },
    summary: {
      en: "Smishing and vishing move the same old deception onto your phone: fraudulent SMS and voice calls that impersonate banks, mobile money operators, delivery firms or authorities. This article explains the scripts criminals use and the safe responses that protect your accounts.",
      fr: "Le smishing et le vishing transplantent la tromperie sur votre téléphone : SMS frauduleux et appels qui usurpent banques, opérateurs de mobile money, livreurs ou autorités. Cet article décrit les scénarios des criminels et les réponses sûres qui protègent vos comptes.",
    },
    what: {
      en: "Smishing is fraud by SMS or messaging app: a brief text about a suspended account, a parcel or a prize, with a link or number to call. Vishing is its voice twin: a call from someone claiming to be bank staff, an operator’s agent or an official, guiding you step by step towards revealing codes or approving a transfer.",
      fr: "Le smishing est une fraude par SMS ou messagerie : un bref message annonçant un compte suspendu, un colis ou un lot, avec un lien ou un numéro à appeler. Le vishing en est la version vocale : un appel de quelqu’un se prétendant agent de banque, d’opérateur ou de l’administration, vous guidant pas à pas vers la divulgation de codes ou l’approbation d’un transfert.",
    },
    how: {
      en: "A smishing text is short, made to be read in seconds: “Your account is suspended. Call this number.” The number belongs to the criminal, and the “agent” who answers sounds professional. In vishing, callers already hold fragments of your data — name, number, sometimes an old transaction — from leaked lists, which makes them believable. They invent an emergency: a fraudulent transaction to stop, an account to “secure”, a refund to process. To “help”, they ask you to read out the OTP just sent, or to approve a transaction on your screen presented as a cancellation — when it is in fact the transfer of your funds to their account.",
      fr: "Un SMS de smishing est bref, fait pour être lu en quelques secondes : « Votre compte est suspendu. Appelez ce numéro. » Le numéro appartient au criminel, et l’« agent » qui répond sonne professionnel. Dans le vishing, l’appelant détient déjà des fragments de vos données — nom, numéro, parfois une ancienne transaction — issus de listes fuitées, ce qui le rend crédible. Il invente une urgence : une transaction frauduleuse à stopper, un compte à « sécuriser », un remboursement à traiter. Pour vous « aider », il vous demande de lui dicter l’OTP reçu, ou d’approuver une transaction présentée comme une annulation — alors qu’il s’agit du transfert de vos fonds vers son compte.",
    },
    warningSigns: [
      {
        en: "An SMS about your account comes from a strange number, not your operator’s official short code.",
        fr: "Un SMS sur votre compte vient d’un numéro étrange, et non du code court officiel de votre opérateur.",
      },
      {
        en: "The caller knows your name but asks you to “confirm” details a real agent would already have.",
        fr: "L’appelant connaît votre nom mais vous demande de « confirmer » ce qu’un vrai agent saurait déjà.",
      },
      {
        en: "You are asked to read out an OTP or enter your PIN during the call.",
        fr: "On vous demande de dicter un OTP ou de composer votre code PIN pendant l’appel.",
      },
      {
        en: "The caller insists on staying on the line so you cannot verify with anyone else.",
        fr: "L’appelant insiste pour rester en ligne afin que vous ne puissiez vérifier auprès de personne.",
      },
      {
        en: "A recorded voice or “bank security” agent asks you to press keys to authorise actions.",
        fr: "Une voix enregistrée ou un « agent de sécurité » vous demande d’appuyer sur des touches pour autoriser des opérations.",
      },
      {
        en: "The caller offers to help recover money from a previous scam — for a small fee first.",
        fr: "L’appelant propose de récupérer l’argent d’une arnaque précédente — moyennant d’abord de petits frais.",
      },
    ],
    example: {
      en: "Illustrative example: Eric, a mechanic in Douala, receives a call from “Orange Money security” about a suspicious 40,000 FCFA debit. The caller, calm and professional, asks him to dial a star code “to cancel the transaction”. The code in fact transfers 75,000 FCFA from his balance. When Eric calls the official line afterwards, no such alert ever existed. This is an illustrative scenario, not a real case.",
      fr: "Exemple illustratif : Éric, mécanicien à Douala, reçoit un appel de la « sécurité Orange Money » au sujet d’un débit suspect de 40 000 FCFA. L’appelant, calme et professionnel, lui demande de composer un code étoilé « pour annuler la transaction ». Ce code transfère en réalité 75 000 FCFA de son solde. Quand Éric appelle ensuite la ligne officielle, aucune alerte n’a jamais existé. Scénario illustratif, pas un cas réel.",
    },
    protect: [
      {
        en: "Hang up on unexpected calls about money, then call back on the official number yourself.",
        fr: "Raccrochez face aux appels inattendus sur l’argent, puis rappelez vous-même le numéro officiel.",
      },
      {
        en: "Never dictate an OTP, PIN or password on a call — no legitimate agent will ever ask.",
        fr: "Ne dictez jamais un OTP, un PIN ou un mot de passe au téléphone — aucun agent légitime ne le demande.",
      },
      {
        en: "Ignore links in SMS about accounts; check your balance in the official app instead.",
        fr: "Ignorez les liens des SMS sur vos comptes ; consultez plutôt votre solde dans l’application officielle.",
      },
      {
        en: "Be sceptical of star codes or hashtags to dial during a call, even if explained as security.",
        fr: "Méfiez-vous des codes étoilés à composer pendant un appel, même présentés comme une sécurité.",
      },
      {
        en: "Remember that caller ID can be falsified — a displayed “bank” number proves nothing.",
        fr: "Sachez que l’identification de l’appelant peut être falsifiée — un numéro « de banque » affiché ne prouve rien.",
      },
      {
        en: "Warn older relatives especially: a short family conversation can prevent heavy losses.",
        fr: "Avertissez surtout vos aînés : une brève conversation en famille peut éviter de lourdes pertes.",
      },
    ],
    ifVictim: [
      {
        en: "Call your bank or operator immediately on the official line to report the loss and block the account.",
        fr: "Appelez immédiatement votre banque ou opérateur sur la ligne officielle pour signaler la perte et bloquer le compte.",
      },
      {
        en: "Change PINs and passwords connected to the compromised accounts from a trusted device.",
        fr: "Changez les PIN et mots de passe liés aux comptes compromis depuis un appareil de confiance.",
      },
      {
        en: "Save all SMS, call logs and numbers involved as evidence for the investigation.",
        fr: "Conservez tous les SMS, journaux d’appels et numéros impliqués comme preuves pour l’enquête.",
      },
      {
        en: "Report the numbers to your operator so they can be blocked for other users.",
        fr: "Signalez les numéros à votre opérateur afin qu’ils soient bloqués pour les autres usagers.",
      },
      {
        en: "File a report with the police or cybercrime unit, and with GLOPROFAS for guidance.",
        fr: "Déposez plainte auprès de la police ou de l’unité de cybercriminalité, et signalez à GLOPROFAS pour être guidé.",
      },
    ],
    reportTo: [
      {
        en: "Your bank or mobile money operator via the official customer number on your card or app.",
        fr: "Votre banque ou opérateur de mobile money via le numéro officiel sur votre carte ou votre application.",
      },
      {
        en: "Your telephone operator’s fraud line to report malicious numbers and SMS.",
        fr: "La ligne anti-fraude de votre opérateur téléphonique pour signaler les numéros et SMS malveillants.",
      },
      {
        en: "National police or cybercrime unit, with call logs and message screenshots.",
        fr: "Police nationale ou unité de cybercriminalité, avec journaux d’appels et captures des messages.",
      },
      {
        en: "GLOPROFAS report form — our team can advise on urgent next steps.",
        fr: "Formulaire GLOPROFAS — notre équipe peut conseiller sur les mesures urgentes.",
      },
    ],
    keyTakeaway: {
      en: "No genuine call centre will ever ask you to read out a code or dial a star code. If a call about your money surprises you, hang up and call the official number yourself.",
      fr: "Aucun vrai centre d’appel ne vous demandera de dicter un code ou de composer un code étoilé. Si un appel sur votre argent vous surprend, raccrochez et rappelez vous-même le numéro officiel.",
    },
    relatedSlugs: [
      "phishing-scams-recognise-fake-emails-messages",
      "fake-customer-support-and-technical-support-scams",
      "how-to-recognise-fake-bank-representatives",
    ],
    checklistSlug: "general-scam-prevention",
    references: [
      { label: "ScamShield — national anti-scam programme (Singapore)", url: "https://www.scamshield.gov.sg/" },
      { label: "ANTIC Cameroon — national cybersecurity agency", url: "https://www.antic.cm/" },
      { label: "Cyber Security Authority — Ghana", url: "https://csa.gov.gh/" },
    ],
    readingMinutes: 5,
    publishedAt: "2026-09-05",
    updatedAt: "2026-11-20",
    imageUrl: "",
  },
  {
    slug: "how-to-identify-fake-social-media-accounts",
    categorySlug: "online-digital",
    title: {
      en: "How to Identify Fake Social Media Accounts",
      fr: "Comment identifier les faux comptes sur les réseaux sociaux",
    },
    metaDescription: {
      en: "Fake social media accounts impersonate friends, brands and officials to run scams. Learn the profile details and behaviours that expose an impostor.",
      fr: "Faux comptes, vrais pièges : imposteurs usurpent amis, marques et officiels pour arnaquer. Repérez les détails qui trahissent un faux profil.",
    },
    summary: {
      en: "Criminals build fake profiles on Facebook, Instagram, WhatsApp, TikTok and LinkedIn to impersonate people you trust or institutions you respect. This guide shows the concrete clues — profile details, writing habits, behaviour patterns — that unmask an impostor account before it costs you money.",
      fr: "Les criminels créent de faux profils sur Facebook, Instagram, WhatsApp, TikTok et LinkedIn pour usurper des personnes de confiance ou des institutions respectées. Ce guide présente les indices concrets — détails du profil, style d’écriture, comportements — qui démasquent un imposteur avant qu’il ne vous coûte de l’argent.",
    },
    what: {
      en: "A fake social media account copies a real person or organisation — a friend, a bank, a public figure, a government agency — or invents an attractive identity from scratch: a trader, a recruiter, a charity, a lonely admirer. Its purpose is always the same: build enough trust to obtain money, personal data, photos or login credentials.",
      fr: "Un faux compte de réseau social copie une personne ou une organisation réelle — un ami, une banque, une personnalité, une administration — ou invente de toutes pièces une identité séduisante : trader, recruteur, association, admirateur. Son but est toujours le même : créer suffisamment de confiance pour obtenir de l’argent, des données personnelles, des photos ou des identifiants.",
    },
    how: {
      en: "Impostors start by cloning: they download a real profile’s photos, name and biography, then send friend requests to that person’s contacts — the mutual friends make acceptance likely. Others build identities from scratch, using stolen photos and a storyline of success — luxury cars, trading profits, charity work — designed to attract followers and investors. Once connected, the account warms up the relationship with likes and short messages, then moves to the request: an investment opportunity, a delivery fee for a parcel of gifts, an urgent loan, a job requiring a “registration fee”, or a phishing link. When one account is reported and removed, the operation restarts with a new clone.",
      fr: "Les imposteurs commencent par le clonage : ils téléchargent les photos, le nom et la biographie d’un vrai profil, puis envoient des demandes d’amitié aux contacts de cette personne — les amis communs rendent l’acceptation probable. D’autres créent des identités de toutes pièces, avec des photos volées et un récit de réussite — voitures de luxe, profits de trading, œuvres caritatives — conçu pour attirer abonnés et investisseurs. Une fois connecté, le compte entretient la relation avec des likes et de courts messages, puis passe à la demande : opportunité d’investissement, frais de livraison d’un colis de cadeaux, prêt urgent, emploi exigeant des « frais d’inscription », ou simple lien d’hameçonnage. Quand un compte est signalé et supprimé, l’opération repart avec un nouveau clone.",
    },
    warningSigns: [
      {
        en: "A “friend” sends a new friend request even though you are already connected.",
        fr: "Un « ami » vous envoie une nouvelle demande alors que vous êtes déjà connectés.",
      },
      {
        en: "The account was created recently but already displays years of life and dozens of photos.",
        fr: "Le compte a été créé récemment mais affiche déjà des années de vie et des dizaines de photos.",
      },
      {
        en: "Photos look professional yet the profile has almost no tagged photos or real interactions.",
        fr: "Les photos semblent professionnelles, mais le profil n’a presque aucune photo où il est identifié.",
      },
      {
        en: "The person refuses a short video call despite an intense online relationship.",
        fr: "La personne refuse un court appel vidéo malgré une relation en ligne intense.",
      },
      {
        en: "Messages quickly turn to money: investment, emergency loan, customs fee or prize delivery.",
        fr: "Les messages tournent vite vers l’argent : investissement, prêt urgent, frais de douane ou livraison de lot.",
      },
      {
        en: "The account writes with different style or errors compared with the real person’s habits.",
        fr: "Le compte écrit avec un style ou des erreurs différents des habitudes de la vraie personne.",
      },
      {
        en: "A brand page offers exclusive deals but redirects payment to personal mobile money numbers.",
        fr: "Une page de marque propose des offres exclusives mais redirige les paiements vers des numéros personnels.",
      },
    ],
    example: {
      en: "Illustrative example: Chidi from Lagos receives a request from “his aunt” — same photo, same name. The clone chats warmly about family, then mentions a container of goods held at the port needing 120,000 FCFA in fees. Chidi video-calls his aunt’s usual number: she knows nothing about it. The clone deletes its profile the same evening. This is an illustrative scenario, not a real case.",
      fr: "Exemple illustratif : Chidi, à Lagos, reçoit une demande de « sa tante » — même photo, même nom. Le clone parle chaleureusement de la famille, puis évoque un conteneur de marchandises bloqué au port nécessitant 120 000 FCFA de frais. Chidi appelle sa tante en vidéo sur son numéro habituel : elle n’en sait rien. Le clone supprime son profil le soir même. Scénario illustratif, pas un cas réel.",
    },
    protect: [
      {
        en: "Verify any surprising friend request through a channel you already used with that person.",
        fr: "Vérifiez toute demande d’amitié surprenante par un canal déjà utilisé avec cette personne.",
      },
      {
        en: "Check the account’s age, tagged photos and real interactions — not the profile picture alone.",
        fr: "Vérifiez l’âge du compte, les photos où il est identifié et ses interactions réelles — pas seulement la photo de profil.",
      },
      {
        en: "Agree on a family code word for urgent money requests made in a relative’s name.",
        fr: "Convenez d’un mot de code familial pour toute demande d’argent urgente au nom d’un proche.",
      },
      {
        en: "Keep your friend list and personal photos private to complicate cloning.",
        fr: "Gardez votre liste d’amis et vos photos personnelles privées pour compliquer le clonage.",
      },
      {
        en: "Never pay fees to receive a prize, parcel or inheritance — the classic advance-fee pattern.",
        fr: "Ne payez jamais de frais pour recevoir un lot, un colis ou un héritage — le schéma classique de l’avance de frais.",
      },
      {
        en: "Report and block impostor accounts, and warn the person or brand being impersonated.",
        fr: "Signalez et bloquez les comptes imposteurs, et avertissez la personne ou la marque usurpée.",
      },
    ],
    ifVictim: [
      {
        en: "Stop all payments and break off contact with the fake account immediately.",
        fr: "Cessez tout paiement et coupez immédiatement le contact avec le faux compte.",
      },
      {
        en: "Alert the impersonated person or organisation so their other contacts can be warned.",
        fr: "Avertissez la personne ou l’organisation usurpée pour que ses autres contacts soient alertés.",
      },
      {
        en: "Report the profile on the platform, then to police or the cybercrime unit.",
        fr: "Signalez le profil sur la plateforme, puis auprès de la police ou de l’unité de cybercriminalité.",
      },
      {
        en: "If money was sent, contact your bank or operator at once to attempt a recall.",
        fr: "Si de l’argent a été envoyé, contactez aussitôt votre banque ou opérateur pour tenter un rappel.",
      },
      {
        en: "If intimate photos were shared, do not pay: report extortion attempts to the authorities.",
        fr: "Si des photos intimes ont été partagées, ne payez pas : signalez la tentative d’extorsion aux autorités.",
      },
    ],
    reportTo: [
      {
        en: "The social media platform’s reporting tools — fake account and impersonation categories.",
        fr: "Les outils de signalement de la plateforme — catégories faux compte et usurpation d’identité.",
      },
      {
        en: "National police or cybercrime unit if money or personal data was lost.",
        fr: "Police nationale ou unité de cybercriminalité si de l’argent ou des données ont été perdus.",
      },
      {
        en: "GLOPROFAS report form — we document active impersonation campaigns and alert the public.",
        fr: "Formulaire GLOPROFAS — nous documentons les campagnes d’usurpation actives et alertons le public.",
      },
    ],
    keyTakeaway: {
      en: "A profile is not a person. Before answering any request involving money or personal data, verify through a channel that existed before — a call, a video, a known number.",
      fr: "Un profil n’est pas une personne. Avant de répondre à toute demande impliquant argent ou données personnelles, vérifiez par un canal antérieur — un appel, une vidéo, un numéro connu.",
    },
    relatedSlugs: [
      "impersonation-scams-someone-you-trust",
      "facebook-instagram-tiktok-scams",
      "how-to-recognise-and-avoid-online-scams",
    ],
    checklistSlug: "social-media-security",
    references: [
      { label: "Cyber Security Authority — Ghana", url: "https://csa.gov.gh/" },
      { label: "Europol — law enforcement cooperation", url: "https://www.europol.europa.eu/" },
      { label: "ScamShield — national anti-scam programme (Singapore)", url: "https://www.scamshield.gov.sg/" },
    ],
    readingMinutes: 5,
    publishedAt: "2026-09-12",
    updatedAt: "2026-11-20",
    imageUrl: "",
  },
  {
    slug: "qr-code-scams-how-to-protect-yourself",
    categorySlug: "online-digital",
    title: {
      en: "QR Code Scams: How to Protect Yourself",
      fr: "Arnaques aux QR codes : comment vous protéger",
    },
    metaDescription: {
      en: "Malicious QR codes can send your phone to fake payment or login pages. Learn where fraudulent codes appear and how to scan safely.",
      fr: "Un QR code malveillant peut mener vers de fausses pages de paiement ou de connexion. Découvrez où ils se cachent et comment scanner en sécurité.",
    },
    summary: {
      en: "QR codes now appear on menus, parking meters, posters and payment terminals — and criminals have learned to abuse them. A sticker placed over a real code can redirect your phone to a fraudulent payment page. Learn where the risks hide and how to scan safely.",
      fr: "Les QR codes fleurissent sur les menus, parkings, affiches et terminaux de paiement — et les criminels ont appris à en abuser. Une étiquette collée sur un vrai code peut rediriger votre téléphone vers une page de paiement frauduleuse. Découvrez où se cachent les risques et comment scanner en sécurité.",
    },
    what: {
      en: "A malicious QR code is a normal-looking code that sends your phone somewhere you did not choose: a fake payment page, a counterfeit login form, or a link that installs harmful software. Because the pattern hides the destination, your eyes cannot help you, and the trust you place in the poster, shop or bill carrying the code does the criminal’s work for him.",
      fr: "Un QR code malveillant est un code d’apparence normale qui envoie votre téléphone vers un endroit que vous n’avez pas choisi : fausse page de paiement, formulaire de connexion contrefait ou lien installant un logiciel nuisible. Comme le motif masque la destination, vos yeux ne peuvent rien pour vous, et la confiance accordée à l’affiche, au magasin ou à la facture portant le code travaille pour le criminel.",
    },
    how: {
      en: "The simplest attack is physical: a printed sticker with the criminal’s QR code placed over the genuine one on a restaurant table, a parking sign or a market stall poster. Your scanner app previews the link, and a page imitating the merchant’s payment screen appears. You enter your card or mobile money details, and the money goes to the criminal instead of the shop. Online, the same trick arrives as a QR code inside emails or chat messages (“scan to receive your refund”, “scan to verify your account”). Scanning opens a phishing page that captures logins, or asks you to install an app that reads your messages and one-time codes.",
      fr: "L’attaque la plus simple est physique : une étiquette imprimée avec le QR code du criminel collée sur le vrai code d’une table de restaurant, d’un panneau de parking ou d’une affiche de marché. Votre application de scan affiche un aperçu du lien, puis une page imitant l’écran de paiement du commerçant apparaît. Vous saisissez vos données bancaires ou mobile money, et l’argent part vers le criminel au lieu de la boutique. En ligne, la même ruse arrive par QR code dans les courriels ou messages (« scannez pour recevoir votre remboursement », « scannez pour vérifier votre compte »). Le scan ouvre une page d’hameçonnage qui capture vos identifiants, ou vous invite à installer une application qui lit vos messages et codes à usage unique.",
    },
    warningSigns: [
      {
        en: "The QR code is a sticker placed over a printed poster — look for edges or overlaps.",
        fr: "Le QR code est une étiquette collée sur une affiche imprimée — cherchez les bords ou les chevauchements.",
      },
      {
        en: "The scanner preview shows a shortened or strange address unrelated to the merchant’s name.",
        fr: "L’aperçu du scan affiche une adresse raccourcie ou étrangère au nom du commerçant.",
      },
      {
        en: "The payment page asks for your PIN, OTP or full card details instead of a simple amount.",
        fr: "La page de paiement demande votre PIN, votre OTP ou toutes vos données bancaires, et non un simple montant.",
      },
      {
        en: "A message pressures you to scan quickly to claim a refund, prize or account verification.",
        fr: "Un message vous presse de scanner vite pour obtenir un remboursement, un lot ou une vérification de compte.",
      },
      {
        en: "Scanning unexpectedly opens a login page or an app installation prompt.",
        fr: "Le scan ouvre inopinément une page de connexion ou une demande d’installation d’application.",
      },
      {
        en: "The code promises “free data”, “government aid” or other offers too generous to be genuine.",
        fr: "Le code promet des « données gratuites », une « aide gouvernementale » ou d’autres offres trop généreuses.",
      },
    ],
    example: {
      en: "Illustrative example: At a busy maquis in Yaoundé, a customer scans the table’s QR code to pay a 12,000 FCFA bill. The preview link ends in an odd “.top” domain, and the payment page requests his mobile money PIN “to confirm the amount”. Staff, alerted, peel off a sticker covering the restaurant’s genuine code. This is an illustrative scenario, not a real case.",
      fr: "Exemple illustratif : Dans un maquis animé de Yaoundé, un client scanne le QR code de la table pour régler une addition de 12 000 FCFA. Le lien aperçu finit par un étrange domaine « .top », et la page de paiement demande son code PIN mobile money « pour confirmer le montant ». Le personnel, alerté, décolle une étiquette recouvrant le vrai code du restaurant. Scénario illustratif, pas un cas réel.",
    },
    protect: [
      {
        en: "Inspect codes on posters and tables for stickers, mismatches or printed-over edges before scanning.",
        fr: "Examinez les codes sur affiches et tables : étiquettes, anomalies ou bords recollés avant de scanner.",
      },
      {
        en: "Read the link preview in your scanner app and check it matches the merchant’s real domain.",
        fr: "Lisez l’aperçu du lien dans votre application et vérifiez qu’il correspond au vrai domaine du commerçant.",
      },
      {
        en: "Never enter a PIN or OTP from a QR-linked page — pay inside your bank or operator’s app.",
        fr: "Ne saisissez jamais un PIN ou OTP depuis une page issue d’un QR code — payez dans l’application officielle.",
      },
      {
        en: "Prefer paying the person directly or typing the merchant’s number yourself for mobile money.",
        fr: "Préférez payer la personne directement ou composer vous-même le numéro du commerçant pour le mobile money.",
      },
      {
        en: "Treat QR codes received by email or chat like links: unexpected means suspicious.",
        fr: "Traitez les QR codes reçus par courriel ou messagerie comme des liens : inattendu signifie suspect.",
      },
      {
        en: "Keep your phone updated and avoid installing apps prompted by a scanned page.",
        fr: "Gardez votre téléphone à jour et n’installez aucune application suggérée par une page scannée.",
      },
    ],
    ifVictim: [
      {
        en: "If you entered card or account details, block the card with your bank immediately.",
        fr: "Si vous avez saisi des données bancaires, bloquez immédiatement votre carte auprès de votre banque.",
      },
      {
        en: "If a PIN was typed, change it at once through the operator’s official channels.",
        fr: "Si un PIN a été saisi, changez-le aussitôt via les canaux officiels de l’opérateur.",
      },
      {
        en: "Uninstall any application installed after scanning the code, then scan the device with an antivirus.",
        fr: "Désinstallez toute application installée après le scan, puis analysez l’appareil avec un antivirus.",
      },
      {
        en: "Report the malicious code to the shop owner so other customers are protected.",
        fr: "Signalez le code malveillant au gérant afin de protéger les autres clients.",
      },
      {
        en: "Report the fraudulent page to police or the cybercrime unit with photos of the code.",
        fr: "Signalez la page frauduleuse à la police ou à l’unité de cybercriminalité avec des photos du code.",
      },
    ],
    reportTo: [
      {
        en: "Your bank or mobile money provider through its official hotline to block payments.",
        fr: "Votre banque ou opérateur de mobile money via sa ligne officielle pour bloquer les paiements.",
      },
      {
        en: "The national police or cybercrime unit handling payment fraud.",
        fr: "La police nationale ou l’unité de cybercriminalité compétente en fraude au paiement.",
      },
      {
        en: "GLOPROFAS report form — we alert merchants and the public about tampered codes.",
        fr: "Formulaire GLOPROFAS — nous alertons commerçants et public sur les codes falsifiés.",
      },
    ],
    keyTakeaway: {
      en: "A QR code hides its destination. Scan only codes you can see are untampered, read the link preview, and never type a PIN or OTP on a page a code opened for you.",
      fr: "Un QR code masque sa destination. Ne scannez que des codes visiblement intacts, lisez l’aperçu du lien et ne saisissez jamais un PIN sur une page ouverte par un code.",
    },
    relatedSlugs: [
      "how-to-identify-fake-websites-and-online-stores",
      "phishing-scams-recognise-fake-emails-messages",
      "online-marketplace-scams-buy-and-sell-safely",
    ],
    checklistSlug: "general-scam-prevention",
    references: [
      { label: "ScamShield — national anti-scam programme (Singapore)", url: "https://www.scamshield.gov.sg/" },
      { label: "Cyber Security Authority — Ghana", url: "https://csa.gov.gh/" },
    ],
    readingMinutes: 4,
    publishedAt: "2026-09-19",
    updatedAt: "2026-11-20",
    imageUrl: "",
  },
  {
    slug: "fake-customer-support-and-technical-support-scams",
    categorySlug: "online-digital",
    title: {
      en: "Fake Customer Support and Technical Support Scams",
      fr: "Faux services client et fausses assistances techniques",
    },
    metaDescription: {
      en: "Fake support agents call or pop up offering to fix problems you never had. Learn how fake customer and technical support scams work and how to react.",
      fr: "Faux agents du support : appels et pop-ups promettent de résoudre des problèmes inexistants. Repérez ces arnaques et réagissez correctement.",
    },
    summary: {
      en: "Fraudsters impersonate customer service and technical support teams of banks, operators and online shops. Through calls, pop-ups or fake contact numbers, they “help” you straight into giving them money or account access. Learn the scripts they follow and the reflexes that keep you safe.",
      fr: "Les fraudeurs usurpent les services client et assistance technique de banques, d’opérateurs et de boutiques en ligne. Par appels, pop-ups ou faux numéros, ils vous « aident » à leur donner votre argent ou l’accès à vos comptes. Découvrez leurs scripts et les réflexes qui vous protègent.",
    },
    what: {
      en: "In these scams, a criminal poses as a legitimate support agent — from your bank, your mobile money operator, a computer company or an online shop. The contact may arrive as an unexpected phone call, a pop-up warning on your screen, or a phone number you found yourself on a fake “contact us” page set up to capture distressed customers.",
      fr: "Dans ces arnaques, un criminel se fait passer pour un agent du support légitime — de votre banque, de votre opérateur de mobile money, d’un fabricant informatique ou d’une boutique en ligne. Le contact arrive par un appel inattendu, une alerte pop-up sur votre écran, ou un numéro trouvé sur une fausse page « contact » conçue pour capturer les clients inquiets.",
    },
    how: {
      en: "One route starts with you: worried about a failed payment, you search the internet for your bank’s or operator’s number — and sponsored fake listings appear first, with numbers that reach criminals instead. Another route starts with them: a call or pop-up announces a “security problem” or a refund waiting for you. The fake agent then runs a small theatre: they ask you to install a remote-control application “to diagnose the issue”, guide you to a payment page to “unlock” your account, or ask for codes received on your phone. With remote access, they can see your balance and initiate transfers while you watch, believing you are cancelling a fraud.",
      fr: "Un chemin commence par vous : inquiet d’un paiement échoué, vous cherchez sur internet le numéro de votre banque ou opérateur — de fausses annonces sponsorisées apparaissent en tête, avec des numéros qui joignent des criminels. L’autre chemin commence par eux : un appel ou un pop-up annonce un « problème de sécurité » ou un remboursement qui vous attend. Le faux agent déploie ensuite un petit théâtre : il vous fait installer une application de contrôle à distance « pour diagnostiquer », vous guide vers une page de paiement pour « débloquer » votre compte, ou réclame les codes reçus sur votre téléphone. Avec l’accès à distance, il voit votre solde et initie des transferts sous vos yeux, tandis que vous croyez annuler une fraude.",
    },
    warningSigns: [
      {
        en: "Support contacts you first about a problem you never reported to anyone.",
        fr: "Le support vous contacte le premier au sujet d’un problème que vous n’avez jamais signalé.",
      },
      {
        en: "You found the number through a search engine advert or an unknown site, not the official app.",
        fr: "Vous avez trouvé le numéro via une publicité ou un site inconnu, pas l’application officielle.",
      },
      {
        en: "The agent asks you to install a remote-control or “diagnostic” application on your phone.",
        fr: "L’agent vous demande d’installer une application de contrôle à distance ou de « diagnostic ».",
      },
      {
        en: "You must pay a fee to “unlock” an account, cancel a fraud or receive a refund.",
        fr: "Vous devez payer pour « débloquer » un compte, annuler une fraude ou recevoir un remboursement.",
      },
      {
        en: "A pop-up fills the screen with alarms, sirens or a countdown and a number to call.",
        fr: "Un pop-up envahit l’écran d’alarmes, de sirènes ou d’un compte à rebours avec un numéro à appeler.",
      },
      {
        en: "The agent asks you to read out OTP codes while “staying on the line for security”.",
        fr: "L’agent vous demande de dicter des codes OTP « en restant en ligne pour votre sécurité ».",
      },
    ],
    example: {
      en: "Illustrative example: Aminata in Accra misses a delivery and searches online for the courier’s number. The first result is a paid listing for a fake “helpdesk”. The agent asks her to pay a 15,000 FCFA “redelivery fee” by mobile money to “release” the parcel. The real courier, called later, confirms it never charges redelivery fees. This is an illustrative scenario, not a real case.",
      fr: "Exemple illustratif : Aminata, à Accra, rate une livraison et cherche en ligne le numéro du transporteur. Le premier résultat est une annonce payée d’un faux « service d’aide ». L’agent lui demande 15 000 FCFA de « frais de nouvelle livraison » par mobile money pour « libérer » le colis. Le vrai transporteur, joint plus tard, confirme ne jamais facturer de tels frais. Scénario illustratif, pas un cas réel.",
    },
    protect: [
      {
        en: "Reach support only through the official app, your account page, or numbers printed on your card.",
        fr: "Contactez le support uniquement via l’application officielle, votre page de compte ou les numéros sur votre carte.",
      },
      {
        en: "Treat sponsored search results for support numbers with suspicion — scammers pay to appear first.",
        fr: "Méfiez-vous des résultats sponsorisés pour les numéros de support — les arnaqueurs paient pour être en tête.",
      },
      {
        en: "Never install remote-control or diagnostic software at the request of an unexpected caller.",
        fr: "N’installez jamais de logiciel de contrôle à distance à la demande d’un appelant inattendu.",
      },
      {
        en: "Remember: real support never asks for payments to cancel a fraud or release a refund.",
        fr: "Retenez : le vrai support ne demande jamais de paiement pour annuler une fraude ou verser un remboursement.",
      },
      {
        en: "Close alarming pop-ups without calling the displayed number; run your own antivirus scan.",
        fr: "Fermez les pop-ups alarmants sans appeler le numéro affiché ; lancez votre propre analyse antivirus.",
      },
      {
        en: "Save your bank’s and operator’s official numbers in your contacts today, before problems happen.",
        fr: "Enregistrez dès aujourd’hui les numéros officiels de votre banque et opérateur, avant tout problème.",
      },
    ],
    ifVictim: [
      {
        en: "If you installed remote software, uninstall it and change passwords from another trusted device.",
        fr: "Si vous avez installé un logiciel d’accès distant, désinstallez-le et changez les mots de passe depuis un autre appareil de confiance.",
      },
      {
        en: "If you paid, contact your bank or operator immediately to attempt blocking the transfer.",
        fr: "Si vous avez payé, contactez immédiatement votre banque ou opérateur pour tenter de bloquer le transfert.",
      },
      {
        en: "Report the fake number to the search engine and the impersonated company.",
        fr: "Signalez le faux numéro au moteur de recherche et à l’entreprise usurpée.",
      },
      {
        en: "Document everything: numbers called, amounts, times and applications installed.",
        fr: "Documentez tout : numéros appelés, montants, horaires et applications installées.",
      },
      {
        en: "Report to the police or cybercrime unit with your evidence.",
        fr: "Signalez aux autorités policières ou cybercriminelles avec vos preuves.",
      },
    ],
    reportTo: [
      {
        en: "The impersonated company through its verified official channels.",
        fr: "L’entreprise usurpée via ses canaux officiels vérifiés.",
      },
      {
        en: "Your bank or mobile money operator to flag the fraudulent transaction.",
        fr: "Votre banque ou opérateur de mobile money pour signaler la transaction frauduleuse.",
      },
      {
        en: "National police or cybercrime unit with the evidence file.",
        fr: "Police nationale ou unité de cybercriminalité avec le dossier de preuves.",
      },
      {
        en: "GLOPROFAS report form for guidance and public alerts.",
        fr: "Formulaire GLOPROFAS pour être guidé et alerter le public.",
      },
    ],
    keyTakeaway: {
      en: "Genuine support never calls you first about an unknown problem, never requests remote access uninvited, and never charges fees to return your own money. Hang up, find the official number yourself.",
      fr: "Le vrai support ne vous appelle jamais le premier pour un problème inconnu, n’exige pas d’accès distant et ne facture rien pour vous rendre votre argent. Raccrochez et trouvez le numéro officiel vous-même.",
    },
    relatedSlugs: [
      "smishing-and-vishing-sms-telephone-scams",
      "how-to-recognise-fake-bank-representatives",
      "how-to-recognise-and-avoid-online-scams",
    ],
    checklistSlug: "general-scam-prevention",
    references: [
      { label: "ANTIC Cameroon — national cybersecurity agency", url: "https://www.antic.cm/" },
      { label: "Canadian Anti-Fraud Centre", url: "https://www.antifraudcentre-centreantifraude.ca/" },
      { label: "ScamShield — national anti-scam programme (Singapore)", url: "https://www.scamshield.gov.sg/" },
    ],
    readingMinutes: 5,
    publishedAt: "2026-09-26",
    updatedAt: "2026-11-20",
    imageUrl: "",
  },
  {
    slug: "online-marketplace-scams-buy-and-sell-safely",
    categorySlug: "online-digital",
    title: {
      en: "Online Marketplace Scams: How to Buy and Sell Safely",
      fr: "Arnaques sur les marchés en ligne : acheter et vendre en sécurité",
    },
    metaDescription: {
      en: "Marketplace scams target buyers and sellers alike — fake sellers, false payments and switched goods. Learn safe habits for buying and selling online.",
      fr: "Vendeurs fictifs, faux paiements, colis détournés : les arnaques aux marchés en ligne visent acheteurs et vendeurs. Adoptez les bons réflexes.",
    },
    summary: {
      en: "Online marketplaces and classified-ad groups bring buyers and sellers together — and criminals exploit that trust. Fake sellers collect payments for goods that never ship, while fake buyers use forged payment proofs to walk away with your goods. This guide covers both sides of safe trading.",
      fr: "Les marchés en ligne et groupes de petites annonces rapprochent acheteurs et vendeurs — et les criminels exploitent cette confiance. De faux vendeurs encaissent pour des marchandises jamais expédiées ; de faux acheteurs utilisent de fausses preuves de paiement pour repartir avec vos biens. Ce guide couvre les deux côtés de l’échange sûr.",
    },
    what: {
      en: "Marketplace fraud covers all the tricks used on classified sites, buying-and-selling groups and marketplaces: non-existent goods, counterfeits, manipulated prices, forged payment notifications and “buyers” who overpay to receive a refund of the difference. Whether you sell a phone or rent a room, the goal stays the same — to separate you from your money, your goods or your account details.",
      fr: "La fraude sur les marchés regroupe toutes les ruses des sites d’annonces, groupes d’achat-vente et places de marché : marchandises inexistantes, contrefaçons, prix manipulés, notifications de paiement falsifiées et « acheteurs » qui paient trop pour se faire rembourser la différence. Que vous vendiez un téléphone ou louiez une chambre, l’objectif reste le même : vous séparer de votre argent, de vos biens ou de vos données bancaires.",
    },
    how: {
      en: "As a buyer, the typical trap is an offer priced below the market — a nearly new generator, a latest-model phone — with a seller who is “travelling” or “based abroad” and needs payment or a deposit by mobile money before delivery. Photos are stolen from genuine listings. After payment, the seller delays, then disappears. As a seller, the danger is the “overpayment”: the buyer sends a fake payment confirmation for more than the price, then asks you to refund the surplus before you discover the payment never existed. Other traps include forged delivery-agent messages demanding “customs fees”, and buyers who ask to complete the deal off-platform to avoid your protections.",
      fr: "Côté acheteur, le piège type est une offre sous le prix du marché — un groupe électrogène quasi neuf, un téléphone dernière génération — vendu par un vendeur « en voyage » ou « à l’étranger » qui exige un paiement ou un acompte par mobile money avant la livraison. Les photos sont volées dans de vraies annonces. Après paiement, le vendeur tergiverse puis disparaît. Côté vendeur, le danger est la « surpaiement » : l’acheteur envoie une fausse confirmation de paiement supérieure au prix, puis réclame le remboursement de l’excédent avant que vous ne découvriez que le paiement n’a jamais existé. Autres pièges : de faux messages de livreurs exigeant des « frais de douane », et les acheteurs qui veulent conclure hors plateforme pour contourner vos protections.",
    },
    warningSigns: [
      {
        en: "The price is far below the market for an item described as new or nearly new.",
        fr: "Le prix est très inférieur au marché pour un article annoncé comme neuf ou quasi neuf.",
      },
      {
        en: "The seller cannot meet in person and requires payment or deposit before any delivery.",
        fr: "Le vendeur ne peut pas rencontrer et exige un paiement ou acompte avant toute livraison.",
      },
      {
        en: "A “delivery agent” contacts you demanding customs or clearance fees for your parcel.",
        fr: "Un « livreur » vous contacte pour exiger des frais de douane ou de dédouanement.",
      },
      {
        en: "The buyer overpays accidentally and urgently requests a refund of the difference.",
        fr: "L’acheteur paie trop « par erreur » et réclame en urgence le remboursement de la différence.",
      },
      {
        en: "Payment proof arrives as a screenshot or forwarded message instead of your own balance update.",
        fr: "La preuve de paiement est une capture d’écran ou un message transféré, pas votre propre solde.",
      },
      {
        en: "The other party pushes to leave the platform’s chat for WhatsApp or direct calls.",
        fr: "L’autre partie insiste pour quitter la messagerie de la plateforme pour WhatsApp ou des appels directs.",
      },
      {
        en: "The seller’s account is new, with few reviews and stock photos used across multiple listings.",
        fr: "Le compte du vendeur est récent, peu d’avis, et des photos utilisées dans plusieurs annonces.",
      },
    ],
    example: {
      en: "Illustrative example: Kwame sells a laptop for 220,000 FCFA in an Accra buying-and-selling group. The “buyer” sends a convincing mobile money screenshot showing 270,000 FCFA and asks for the 50,000 FCFA difference back plus immediate delivery. Only after handing over the laptop does Kwame’s balance fail to show any credit. This is an illustrative scenario, not a real case.",
      fr: "Exemple illustratif : Kwame vend un ordinateur portable 220 000 FCFA dans un groupe d’achat-vente d’Accra. L’« acheteur » envoie une capture mobile money crédible affichant 270 000 FCFA et réclame la différence de 50 000 FCFA plus une livraison immédiate. Ce n’est qu’après avoir remis l’ordinateur que le solde de Kwame n’affiche aucun crédit. Scénario illustratif, pas un cas réel.",
    },
    protect: [
      {
        en: "Meet in a safe public place and inspect goods before paying whenever possible.",
        fr: "Rencontrez dans un lieu public sûr et inspectez la marchandise avant de payer, chaque fois que possible.",
      },
      {
        en: "Check your own balance in the official app — never trust a screenshot from the other party.",
        fr: "Vérifiez votre propre solde dans l’application officielle — ne faites jamais confiance à une capture d’écran.",
      },
      {
        en: "Refuse overpayments and refunds of differences: cancel and restart the transaction at the correct amount.",
        fr: "Refusez les surpaiements et remboursements d’écarts : annulez et refaites la transaction au bon montant.",
      },
      {
        en: "Keep conversations and payments inside the platform to preserve evidence and protections.",
        fr: "Gardez conversations et paiements dans la plateforme pour préserver preuves et protections.",
      },
      {
        en: "Be extra careful with deposits for items you have not seen, especially “urgent” sales.",
        fr: "Redoublez de prudence pour les acomptes sur des articles non vus, surtout les ventes « urgentes ».",
      },
      {
        en: "Research the seller or buyer: profile age, reviews, and reverse-search the item’s photos.",
        fr: "Renseignez-vous sur le vendeur ou l’acheteur : ancienneté, avis, et recherche inversée des photos.",
      },
      {
        en: "Never pay customs or clearance fees to receive a parcel you did not order yourself.",
        fr: "Ne payez jamais de frais de douane pour un colis que vous n’avez pas commandé vous-même.",
      },
    ],
    ifVictim: [
      {
        en: "Report the profile and listing to the platform immediately to protect other users.",
        fr: "Signalez aussitôt le profil et l’annonce à la plateforme pour protéger les autres usagers.",
      },
      {
        en: "Contact your bank or mobile money operator to attempt blocking or reversing the transfer.",
        fr: "Contactez votre banque ou opérateur de mobile money pour tenter de bloquer ou annuler le transfert.",
      },
      {
        en: "Preserve all evidence: chat history, screenshots, numbers and payment references.",
        fr: "Conservez toutes les preuves : historiques de discussion, captures, numéros et références de paiement.",
      },
      {
        en: "File a report with the police or cybercrime unit — essential for any follow-up.",
        fr: "Déposez un procès-verbal auprès de la police ou de l’unité de cybercriminalité — indispensable pour toute suite.",
      },
      {
        en: "Warn your community groups so the same criminal cannot reuse the trick locally.",
        fr: "Avertissez vos groupes communautaires pour que la même ruse ne resserve pas localement.",
      },
    ],
    reportTo: [
      {
        en: "The marketplace or social platform through its reporting and fraud tools.",
        fr: "La plateforme de vente via ses outils de signalement et de fraude.",
      },
      {
        en: "Your bank or mobile money provider through official channels to trace the payment.",
        fr: "Votre banque ou opérateur de mobile money via les canaux officiels pour tracer le paiement.",
      },
      {
        en: "National police or cybercrime unit with your complete evidence file.",
        fr: "Police nationale ou unité de cybercriminalité avec votre dossier de preuves complet.",
      },
      {
        en: "GLOPROFAS report form so we can alert the community about active schemes.",
        fr: "Formulaire GLOPROFAS pour alerter la communauté sur les schémas actifs.",
      },
    ],
    keyTakeaway: {
      en: "Your own balance is the only payment proof that counts. No release of goods until your app confirms the money — screenshots are decoration, not payment.",
      fr: "Votre propre solde est la seule preuve de paiement qui compte. Aucune remise de marchandise avant confirmation dans votre application — une capture d’écran n’est pas un paiement.",
    },
    relatedSlugs: [
      "fake-mobile-money-payment-notifications",
      "how-to-identify-fake-websites-and-online-stores",
      "how-to-recognise-and-avoid-online-scams",
    ],
    checklistSlug: "online-shopping-safety",
    references: [
      { label: "Europol — law enforcement cooperation", url: "https://www.europol.europa.eu/" },
      { label: "ScamShield — national anti-scam programme (Singapore)", url: "https://www.scamshield.gov.sg/" },
      { label: "ANTIC Cameroon — national cybersecurity agency", url: "https://www.antic.cm/" },
    ],
    readingMinutes: 6,
    publishedAt: "2026-10-03",
    updatedAt: "2026-11-20",
    imageUrl: "",
  },
  {
    slug: "mobile-money-scams-protect-mtn-momo-orange-money",
    categorySlug: "money-banking",
    title: {
      en: "Mobile Money Scams: Protecting Your MTN MoMo and Orange Money Accounts",
      fr: "Arnaques au mobile money : protéger vos comptes MTN MoMo et Orange Money",
    },
    metaDescription: {
      en: "Criminals impersonate MTN MoMo and Orange Money agents to steal balances and OTP codes. Learn the tricks and habits that keep your mobile wallet safe.",
      fr: "Des criminels usurpent MTN MoMo et Orange Money pour voler soldes et codes OTP. Découvrez leurs ruses et les réflexes pour protéger votre portefeuille.",
    },
    summary: {
      en: "Mobile money is central to daily life across Africa — and fraudsters know it. Criminals impersonate MTN MoMo and Orange Money services to harvest PINs, OTP codes and transfers. This guide explains the most common attacks and the habits that keep your mobile wallet secure.",
      fr: "Le mobile money est au cœur de la vie quotidienne en Afrique — et les fraudeurs le savent. Des criminels usurpent les services MTN MoMo et Orange Money pour soutirer codes PIN, OTP et transferts. Ce guide décrit les attaques les plus courantes et les réflexes qui sécurisent votre portefeuille mobile.",
    },
    what: {
      en: "These scams target users of mobile money services such as MTN MoMo and Orange Money. Criminals impersonate the operators’ agents, messages or applications — the companies themselves are not complicit; their trusted names are being abused. The fraudster’s goal is to obtain your PIN, your one-time codes, or a direct transfer, and to empty your wallet before you notice.",
      fr: "Ces arnaques visent les utilisateurs des services de mobile money comme MTN MoMo et Orange Money. Les criminels usurpent les agents, messages ou applications des opérateurs — les entreprises elles-mêmes ne sont pas complices ; leurs noms de confiance sont détournés. L’objectif du fraudeur : obtenir votre code PIN, vos codes à usage unique ou un transfert direct, et vider votre portefeuille avant que vous ne vous en aperceviez.",
    },
    how: {
      en: "The classic attack is the “agent call”: someone pretending to work for MTN or Orange announces a KYC update, a prize or a refund, and asks you to confirm your PIN “for verification”. Others abuse the USSD menu: they guide you to dial a code that initiates a transfer, calling it a cancellation. Fake SMS from lookalike senders — “M0Mo”, “0range” — announce bonuses or suspension and push you to call a number or click a link where the PIN is requested. Fraudsters also target merchants: a “customer” asks the shopkeeper to “help” enter a code on the merchant’s phone, which actually moves the shop’s balance to the criminal.",
      fr: "L’attaque classique est l’« appel d’agent » : quelqu’un se prétendant de MTN ou d’Orange annonce une mise à jour KYC, un lot ou un remboursement, et vous demande de confirmer votre PIN « pour vérification ». D’autres détournent le menu USSD : ils vous font composer un code qui initie un transfert, en l’appelant « annulation ». De faux SMS d’expéditeurs presque identiques — « M0Mo », « 0range » — annoncent bonus ou suspension et vous poussent à appeler un numéro ou cliquer un lien qui réclame votre PIN. Les fraudeurs ciblent aussi les commerçants : un « client » demande au boutiquier de « l’aider » à saisir un code sur le téléphone du marchand, ce qui transfère en réalité le solde de la boutique vers le criminel.",
    },
    warningSigns: [
      {
        en: "A caller claiming to be from MTN or Orange asks for your PIN — operators never do.",
        fr: "Un appelé prétendant être de MTN ou d’Orange demande votre PIN — les opérateurs ne le font jamais.",
      },
      {
        en: "A message announces a bonus, refund or suspension you never requested or expected.",
        fr: "Un message annonce un bonus, remboursement ou suspension que vous n’avez jamais demandés.",
      },
      {
        en: "You are guided to dial a code “to cancel” or “verify” an operation you did not start.",
        fr: "On vous fait composer un code « pour annuler » ou « vérifier » une opération que vous n’avez pas lancée.",
      },
      {
        en: "The SMS sender’s name contains swapped letters or digits, like “M0Mo” or “0range”.",
        fr: "Le nom de l’expéditeur contient lettres ou chiffres inversés, comme « M0Mo » ou « 0range ».",
      },
      {
        en: "Someone pleads urgency: act within minutes or your wallet will be blocked permanently.",
        fr: "On invoque l’urgence : agissez en quelques minutes ou votre portefeuille sera définitivement bloqué.",
      },
      {
        en: "A “customer” or “agent” needs to borrow your phone or enter codes on it.",
        fr: "Un « client » ou « agent » demande à emprunter votre téléphone ou à y saisir des codes.",
      },
    ],
    example: {
      en: "Illustrative example: Nadège runs a small shop in Yaoundé. A caller presenting himself as an “Orange Money technician” says her merchant account shows errors and asks her to dial a code “to refresh the account”. The code transfers 60,000 FCFA from her merchant balance. The real operator confirms no technician had called. This is an illustrative scenario, not a real case.",
      fr: "Exemple illustratif : Nadège tient une petite boutique à Yaoundé. Un appelé se présentant comme « technicien Orange Money » indique que son compte marchand affiche des erreurs et lui fait composer un code « pour actualiser le compte ». Le code transfère 60 000 FCFA de son solde marchand. L’opérateur réel confirme qu’aucun technicien n’a appelé. Scénario illustratif, pas un cas réel.",
    },
    protect: [
      {
        en: "Treat your PIN like your house key: no one legitimate will ever ask you to state it.",
        fr: "Traitez votre PIN comme la clé de votre maison : personne de légitime ne vous demandera jamais de l’énoncer.",
      },
      {
        en: "End suspicious calls and call back on the official number from the app or your SIM pack.",
        fr: "Raccrochez et rappelez sur le numéro officiel de l’application ou du kit SIM.",
      },
      {
        en: "Check your balance and transaction history in the official app before acting on any claim.",
        fr: "Consultez solde et historique dans l’application officielle avant d’agir sur toute affirmation.",
      },
      {
        en: "Dial USSD codes only when you initiated the action, and read each confirmation screen aloud.",
        fr: "Composez les codes USSD uniquement quand vous avez lancé l’action, et lisez chaque écran de confirmation.",
      },
      {
        en: "Enable app notifications so every debit reaches you instantly.",
        fr: "Activez les notifications de l’application pour recevoir instantanément chaque débit.",
      },
      {
        en: "Never lend your phone to strangers “for a quick transfer” — accompany them instead.",
        fr: "Ne prêtez jamais votre téléphone à un inconnu « pour un transfert rapide » — accompagnez-le plutôt.",
      },
      {
        en: "Complete KYC updates only in official agencies or the operator’s verified app.",
        fr: "Effectuez les mises à jour KYC uniquement en agence officielle ou dans l’application vérifiée.",
      },
    ],
    ifVictim: [
      {
        en: "Call the official MTN or Orange customer line immediately to report the fraud and freeze the wallet.",
        fr: "Appelez immédiatement la ligne client officielle de MTN ou d’Orange pour signaler la fraude et geler le portefeuille.",
      },
      {
        en: "Change your PIN at once from the official app or a partner agency.",
        fr: "Changez aussitôt votre PIN depuis l’application officielle ou une agence partenaire.",
      },
      {
        en: "Collect evidence: numbers, SMS, call times, amounts and confirmation references.",
        fr: "Rassemblez les preuves : numéros, SMS, horaires d’appels, montants et références de confirmation.",
      },
      {
        en: "File a police report — operators require it for investigation and possible reimbursement.",
        fr: "Déposez plainte — les opérateurs l’exigent pour l’enquête et un éventuel remboursement.",
      },
      {
        en: "Watch for follow-up scams pretending to help you recover the lost funds.",
        fr: "Méfiez-vous des arnaques de suivi prétendant vous aider à récupérer les fonds perdus.",
      },
    ],
    reportTo: [
      {
        en: "MTN or Orange customer service via the official numbers in the app or on their websites.",
        fr: "Le service client MTN ou Orange via les numéros officiels de l’application ou de leurs sites.",
      },
      {
        en: "The national police or cybercrime unit, with your police report for the operator.",
        fr: "La police nationale ou l’unité de cybercriminalité, avec votre plainte pour l’opérateur.",
      },
      {
        en: "GLOPROFAS report form — we document campaigns and alert mobile money users.",
        fr: "Formulaire GLOPROFAS — nous documentons les campagnes et alertons les utilisateurs de mobile money.",
      },
    ],
    keyTakeaway: {
      en: "No MTN or Orange agent will ever ask for your PIN or guide you through codes to “cancel” a transaction. Hang up, check your own app, and call the official number yourself.",
      fr: "Aucun agent MTN ou Orange ne demandera jamais votre PIN ni ne vous fera composer des codes pour « annuler » une transaction. Raccrochez, vérifiez votre application et rappelez le numéro officiel.",
    },
    relatedSlugs: [
      "fake-mobile-money-payment-notifications",
      "sim-swap-fraud-hijacked-phone-number",
      "how-to-recognise-fake-bank-representatives",
    ],
    checklistSlug: "mobile-money-security",
    references: [
      { label: "ANTIC Cameroon — national cybersecurity agency", url: "https://www.antic.cm/" },
      { label: "Cyber Security Authority — Ghana", url: "https://csa.gov.gh/" },
      { label: "ScamShield — national anti-scam programme (Singapore)", url: "https://www.scamshield.gov.sg/" },
    ],
    readingMinutes: 6,
    publishedAt: "2026-10-10",
    updatedAt: "2026-11-20",
    featured: true,
    popular: true,
    imageUrl: "",
  },
  {
    slug: "fake-mobile-money-payment-notifications",
    categorySlug: "money-banking",
    title: {
      en: "Fake Mobile Money Payment Notifications",
      fr: "Faux avis de paiement mobile money",
    },
    metaDescription: {
      en: "Fake mobile money notifications use edited screenshots and spoofed SMS to trick sellers. Learn why only your own balance matters and how to verify.",
      fr: "Faux SMS et captures retouchées simulent des paiements mobile money pour tromper les vendeurs. Pourquoi seul votre solde compte et comment vérifier.",
    },
    summary: {
      en: "A flashing SMS announcing “payment received” feels like money in the bank — and criminals forge that feeling. Fake notifications, spoofed SMS and edited screenshots convince sellers and families that money has arrived. Learn how these fakes are made and the one habit that defeats them all.",
      fr: "Un SMS qui clignote annonçant « paiement reçu » ressemble à de l’argent en banque — et les criminels fabriquent ce sentiment. Faux SMS, expéditeurs imités et captures retouchées convainquent vendeurs et familles que l’argent est arrivé. Découvrez comment ces faux sont conçus et le réflexe qui les défait tous.",
    },
    what: {
      en: "A fake payment notification is a forged proof that money has been sent to you: a modified screenshot, a spoofed SMS that appears to come from your operator, or a deliberately incomplete transfer that is cancelled moments later. It targets anyone who accepts mobile money — market sellers, shopkeepers, taxi drivers, landlords, families receiving support.",
      fr: "Une fausse notification de paiement est une preuve forgée que de l’argent vous a été envoyé : capture d’écran modifiée, SMS usurpant votre opérateur, ou transfert volontairement inachevé puis annulé quelques instants plus tard. Elle vise tous ceux qui acceptent le mobile money : vendeurs de marché, boutiquiers, chauffeurs de taxi, propriétaires, familles recevant un soutien.",
    },
    how: {
      en: "The forger uses free SMS-spoofing tools to make a message appear in the same thread as genuine operator notifications, with the same sender name and formatting. Screenshots are edited in simple image applications: the amount, the reference and even the date are changed. A subtler variant uses a real transfer initiated for the right amount but from an account that cannot cover it, or immediately reversed — the notification arrives, the balance never does. The scam is completed by pressure and staging: the “customer” shows the screen, hurries you, asks for change or immediate delivery, and counts on you not to open your own app to check.",
      fr: "Le faussaire utilise des outils gratuits d’usurpation de SMS pour faire apparaître un message dans le même fil que les vraies notifications de l’opérateur, avec le même nom d’expéditeur et la même mise en forme. Les captures d’écran sont retouchées dans de simples applications d’image : montant, référence et même date sont modifiés. Une variante plus fine utilise un vrai transfert du bon montant depuis un compte incapable de le couvrir, ou immédiatement annulé — la notification arrive, le solde jamais. L’arnaque se complète par la mise en scène : le « client » montre son écran, vous presse, demande la monnaie ou la livraison immédiate, en pariant que vous n’ouvrirez pas votre propre application pour vérifier.",
    },
    warningSigns: [
      {
        en: "The customer shows a screenshot instead of letting the confirmation arrive on your phone.",
        fr: "Le client montre une capture d’écran au lieu de laisser la confirmation arriver sur votre téléphone.",
      },
      {
        en: "The “payment received” SMS arrives while your balance in the app stays unchanged.",
        fr: "Le SMS « paiement reçu » arrive alors que votre solde reste inchangé dans l’application.",
      },
      {
        en: "The buyer rushes you, crowds you or becomes agitated when you start checking.",
        fr: "L’acheteur vous presse, vous bouscule ou s’agite quand vous commencez à vérifier.",
      },
      {
        en: "The reference number or sender name contains small anomalies: odd digits, wrong spacing.",
        fr: "Le numéro de référence ou le nom d’expéditeur contient de petites anomalies : chiffres étranges, espaces incorrects.",
      },
      {
        en: "The amount shown is higher than expected, followed by a request for change in cash.",
        fr: "Le montant affiché dépasse l’attendu, suivi d’une demande de monnaie en espèces.",
      },
      {
        en: "The “sender” asks you to check your messages rather than your balance.",
        fr: "L’« expéditeur » vous invite à consulter vos messages plutôt que votre solde.",
      },
    ],
    example: {
      en: "Illustrative example: Chidi sells a fridge for 95,000 FCFA in a Lagos electronics market. The buyer shows a spoofed “MoMo” SMS and insists on taking the fridge immediately, offering 5,000 FCFA “for your trouble” if the balance updates later. Chidi checks his own app: nothing. The buyer vanishes into the crowd. This is an illustrative scenario, not a real case.",
      fr: "Exemple illustratif : Chidi vend un réfrigérateur 95 000 FCFA dans un marché d’électronique de Lagos. L’acheteur montre un SMS « MoMo » usurpé et insiste pour emporter l’appareil immédiatement, offrant 5 000 FCFA « pour votre dérangement » si le solde arrive plus tard. Chidi vérifie sa propre application : rien. L’acheteur disparaît dans la foule. Scénario illustratif, pas un cas réel.",
    },
    protect: [
      {
        en: "Trust only the confirmation that arrives on your own phone and inside the official app.",
        fr: "Ne vous fiez qu’à la confirmation reçue sur votre propre téléphone dans l’application officielle.",
      },
      {
        en: "Check your balance after every payment before releasing goods, change or receipts.",
        fr: "Vérifiez votre solde après chaque paiement avant de remettre marchandise, monnaie ou reçu.",
      },
      {
        en: "Verify the transaction reference in your history, not on the buyer’s screen.",
        fr: "Vérifiez la référence de la transaction dans votre historique, pas sur l’écran de l’acheteur.",
      },
      {
        en: "Insist on completing the payment in front of you, on the buyer’s own phone.",
        fr: "Exigez que le paiement soit effectué devant vous, sur le téléphone de l’acheteur.",
      },
      {
        en: "Refuse overpayments and change requests; ask for the exact amount instead.",
        fr: "Refusez surpaiements et demandes de monnaie ; demandez plutôt le montant exact.",
      },
      {
        en: "Be firmer when busy: fraudsters prefer crowded shops and rushed moments.",
        fr: "Soyez plus ferme aux heures chargées : les fraudeurs préfèrent boutiques bondées et moments pressés.",
      },
      {
        en: "Train staff and family members who accept payments on your behalf.",
        fr: "Formez le personnel et les proches qui acceptent des paiements en votre nom.",
      },
    ],
    ifVictim: [
      {
        en: "Report the fraud to your mobile money operator immediately with the reference shown.",
        fr: "Signalez immédiatement la fraude à votre opérateur de mobile money avec la référence affichée.",
      },
      {
        en: "Try to identify the recipient number of any partial transfer and ask the operator to freeze it.",
        fr: "Tentez d’identifier le numéro bénéficiaire d’un éventuel transfert partiel et demandez son gel.",
      },
      {
        en: "Keep the spoofed SMS, screenshots and any CCTV recordings as evidence.",
        fr: "Conservez le SMS usurpé, les captures et tout enregistrement de vidéosurveillance comme preuves.",
      },
      {
        en: "File a report with the police or cybercrime unit, including witness details.",
        fr: "Déposez plainte auprès de la police ou de l’unité de cybercriminalité, avec les témoins éventuels.",
      },
      {
        en: "Alert nearby sellers — fraudsters usually repeat the same trick along the same street.",
        fr: "Alertez les vendeurs voisins — les fraudeurs répètent souvent la même ruse dans la même rue.",
      },
    ],
    reportTo: [
      {
        en: "Your mobile money provider (MTN MoMo, Orange Money) through official customer channels.",
        fr: "Votre opérateur de mobile money (MTN MoMo, Orange Money) via les canaux clients officiels.",
      },
      {
        en: "National police or cybercrime unit with the forged notifications as evidence.",
        fr: "Police nationale ou unité de cybercriminalité avec les notifications forgées comme preuves.",
      },
      {
        en: "GLOPROFAS report form — we share alerts with merchant communities.",
        fr: "Formulaire GLOPROFAS — nous diffusons des alertes auprès des communautés de commerçants.",
      },
    ],
    keyTakeaway: {
      en: "A notification is not money. Whatever the buyer shows or the SMS says, release nothing until your own app confirms the balance. One look defeats the entire scam.",
      fr: "Une notification n’est pas de l’argent. Quoi que montre l’acheteur ou dise le SMS, ne remettez rien avant confirmation du solde dans votre application. Un seul regard défait toute l’arnaque.",
    },
    relatedSlugs: [
      "mobile-money-scams-protect-mtn-momo-orange-money",
      "online-marketplace-scams-buy-and-sell-safely",
      "how-to-recognise-and-avoid-online-scams",
    ],
    checklistSlug: "mobile-money-security",
    references: [
      { label: "Cyber Security Authority — Ghana", url: "https://csa.gov.gh/" },
      { label: "ANTIC Cameroon — national cybersecurity agency", url: "https://www.antic.cm/" },
      { label: "ScamShield — national anti-scam programme (Singapore)", url: "https://www.scamshield.gov.sg/" },
    ],
    readingMinutes: 5,
    publishedAt: "2026-10-17",
    updatedAt: "2026-11-20",
    popular: true,
    imageUrl: "",
  },
  {
    slug: "how-to-recognise-fake-bank-representatives",
    categorySlug: "money-banking",
    title: {
      en: "How to Recognise Fake Bank Representatives",
      fr: "Comment reconnaître les faux représentants de banque",
    },
    metaDescription: {
      en: "Criminals impersonate bank staff by call, SMS and even in person to steal credentials. Learn how real banks work and how impostors betray themselves.",
      fr: "Appels, SMS, visites : des imposteurs se font passer pour des agents de banque. Découvrez ce qui trahit les fraudeurs et comment vérifier.",
    },
    summary: {
      en: "A confident caller announces a problem with your account and offers to fix it — the classic opening of the fake bank representative. Whether by phone, SMS or at your doorstep, impostors exploit the trust banks have earned. Learn where their script breaks from banking reality.",
      fr: "Un appelant assuré annonce un problème sur votre compte et propose de le régler — l’ouverture classique du faux représentant de banque. Par téléphone, SMS ou à votre porte, les imposteurs exploitent la confiance gagnée par les banques. Découvrez où leur scénario s’écarte de la réalité bancaire.",
    },
    what: {
      en: "A fake bank representative is a criminal posing as an employee of your bank — a customer advisor, a fraud specialist, an “account verification officer” or a loans agent. The banks themselves are victims of impersonation, not participants. The impostor’s aim is to obtain your login details, your card data, one-time codes, or a transfer made “to protect” your money.",
      fr: "Un faux représentant de banque est un criminel se faisant passer pour un employé de votre banque — conseiller clientèle, spécialiste anti-fraude, « agent de vérification de compte » ou chargé de prêt. Les banques elles-mêmes sont victimes de l’usurpation, non complices. L’imposteur vise vos identifiants, les données de votre carte, vos codes à usage unique ou un transfert « de protection ».",
    },
    how: {
      en: "The impostor announces either a threat or an opportunity: a fraudulent debit to reverse, a suspended account to reactivate, a loan pre-approval, or a “safe account” to move your money into while “the investigation” runs. To sound credible, they recite fragments of real data — your name, the bank’s branch names, the last four digits of a card — gathered from leaks or social media. Then comes the decisive step: they need your full card number, your online banking password, or the OTP that just arrived. In person, they visit homes or small businesses offering “on-site account audits”, collecting identity documents and card details on official-looking forms.",
      fr: "L’imposteur annonce soit une menace, soit une opportunité : débit frauduleux à inverser, compte suspendu à réactiver, prêt préapprouvé ou « compte de sécurité » où transférer votre argent pendant « l’enquête ». Pour paraître crédible, il récite des fragments de données réelles — votre nom, les agences de la banque, les quatre derniers chiffres d’une carte — issus de fuites ou des réseaux sociaux. Puis vient l’étape décisive : il lui faut votre numéro de carte complet, votre mot de passe de banque en ligne ou l’OTP qui vient d’arriver. En présentiel, il rend visite à des particuliers ou petites entreprises pour des « audits de compte sur site », collectant pièces d’identité et données bancaires sur des formulaires d’apparence officielle.",
    },
    warningSigns: [
      {
        en: "The caller asks for your full card number, expiry date and CVV “to locate your file”.",
        fr: "L’appelant demande le numéro complet de carte, la date d’expiration et le CVV « pour retrouver votre dossier ».",
      },
      {
        en: "You are told to move money to a “safe account” until a problem is resolved.",
        fr: "On vous dit de transférer votre argent vers un « compte de sécurité » jusqu’à la résolution du problème.",
      },
      {
        en: "The caller opposes your wish to visit the branch, inventing reasons to keep you on the line.",
        fr: "L’appelant s’oppose à votre visite en agence, inventant des raisons de vous garder en ligne.",
      },
      {
        en: "A loan is promised without any file, guarantee or credit check — only an upfront fee.",
        fr: "Un prêt est promis sans dossier, garantie ni étude de crédit — moyennant seulement des frais d’avance.",
      },
      {
        en: "Someone visits your shop for an “account audit” without an appointment you scheduled yourself.",
        fr: "Quelqu’un vient « auditer » votre compte sans rendez-vous que vous avez vous-même pris.",
      },
      {
        en: "Pressure and secrecy: “do not discuss this with branch staff, they are under investigation”.",
        fr: "Pression et secret : « n’en parlez pas au personnel de l’agence, il est visé par l’enquête ».",
      },
    ],
    example: {
      en: "Illustrative example: A retiree in Douala receives a call from “his bank’s fraud department” about a suspicious 300,000 FCFA transfer. The caller knows his name and branch, and asks him to read an OTP “to block the operation”. His daughter, a bank clerk, takes the phone and asks which department — the caller hangs up. This is an illustrative scenario, not a real case.",
      fr: "Exemple illustratif : Un retraité de Douala reçoit un appel du « service anti-fraude de sa banque » au sujet d’un transfert suspect de 300 000 FCFA. L’appelant connaît son nom et son agence, et lui demande de dicter un OTP « pour bloquer l’opération ». Sa fille, guichetière, prend le téléphone et demande le service concerné — l’appelant raccroche. Scénario illustratif, pas un cas réel.",
    },
    protect: [
      {
        en: "Hang up and call the number printed on your card or passbook — never a number the caller gives.",
        fr: "Raccrochez et appelez le numéro imprimé sur votre carte ou livret — jamais un numéro fourni par l’appelant.",
      },
      {
        en: "Remember the rule: bank staff never ask for your full PIN, password, CVV or OTP.",
        fr: "Retenez la règle : aucun agent bancaire ne demande votre PIN complet, mot de passe, CVV ou OTP.",
      },
      {
        en: "Visit your branch in person for anything involving account security or unusual transfers.",
        fr: "Rendez-vous en agence pour tout ce qui touche à la sécurité du compte ou aux transferts inhabituels.",
      },
      {
        en: "Treat “safe account” requests as automatic proof of fraud — banks never use them.",
        fr: "Toute demande de « compte de sécurité » est une preuve de fraude — les banques n’en utilisent jamais.",
      },
      {
        en: "Never let “auditors” or “advisors” copy your identity documents without a verified appointment.",
        fr: "Ne laissez aucun « auditeur » ou « conseiller » copier vos pièces d’identité sans rendez-vous vérifié.",
      },
      {
        en: "Ask your bank how it will and will not contact you — and note it down.",
        fr: "Demandez à votre banque comment elle vous contactera ou non — et notez-le.",
      },
    ],
    ifVictim: [
      {
        en: "Call your bank’s official line immediately to block cards, accounts and pending transfers.",
        fr: "Appelez immédiatement la ligne officielle de votre banque pour bloquer cartes, comptes et transferts en cours.",
      },
      {
        en: "Change your online banking password from a trusted device and re-enable alerts.",
        fr: "Changez le mot de passe de votre banque en ligne depuis un appareil de confiance et réactivez les alertes.",
      },
      {
        en: "Document the call: number, name given, times, amounts and what was requested.",
        fr: "Documentez l’appel : numéro, nom donné, horaires, montants et ce qui a été demandé.",
      },
      {
        en: "File a police report and give your bank the report reference for the investigation.",
        fr: "Déposez plainte et communiquez la référence à votre banque pour l’enquête.",
      },
      {
        en: "If documents were handed over, ask the bank to add extra verification to your account.",
        fr: "Si des documents ont été remis, demandez à la banque d’ajouter des vérifications supplémentaires.",
      },
    ],
    reportTo: [
      {
        en: "Your bank through its official hotline or the emergency number on your card.",
        fr: "Votre banque via sa ligne officielle ou le numéro d’urgence sur votre carte.",
      },
      {
        en: "National police or the cybercrime and financial crimes unit.",
        fr: "Police nationale ou unité cybercriminalité et crimes financiers.",
      },
      {
        en: "GLOPROFAS report form — we document impersonation waves and warn account holders.",
        fr: "Formulaire GLOPROFAS — nous documentons les vagues d’usurpation et avertissons les titulaires de comptes.",
      },
    ],
    keyTakeaway: {
      en: "No bank asks for your password, PIN, CVV or an OTP — not by phone, not by SMS, not at your door. If in doubt, hang up and visit your branch in person.",
      fr: "Aucune banque ne demande votre mot de passe, PIN, CVV ou OTP — ni par téléphone, ni par SMS, ni à votre porte. Au moindre doute, raccrochez et rendez-vous en agence.",
    },
    relatedSlugs: [
      "smishing-and-vishing-sms-telephone-scams",
      "mobile-money-scams-protect-mtn-momo-orange-money",
      "loan-credit-and-financial-assistance-scams",
    ],
    checklistSlug: "banking-fraud-prevention",
    references: [
      { label: "ANTIC Cameroon — national cybersecurity agency", url: "https://www.antic.cm/" },
      { label: "Canadian Anti-Fraud Centre", url: "https://www.antifraudcentre-centreantifraude.ca/" },
      { label: "Cyber Security Authority — Ghana", url: "https://csa.gov.gh/" },
    ],
    readingMinutes: 5,
    publishedAt: "2026-10-24",
    updatedAt: "2026-11-20",
    imageUrl: "",
  },
  {
    slug: "sim-swap-fraud-hijacked-phone-number",
    categorySlug: "money-banking",
    title: {
      en: "SIM Swap Fraud: How Criminals Hijack Your Phone Number",
      fr: "Fraude par échange de SIM : quand des criminels détournent votre numéro",
    },
    metaDescription: {
      en: "SIM swap fraud lets criminals take over your phone number and intercept your banking codes. Learn the warning signs and how to secure your line.",
      fr: "L’échange de SIM permet à des criminels de prendre votre numéro et d’intercepter vos codes bancaires. Repérez les signes et sécurisez votre ligne.",
    },
    summary: {
      en: "Your phone number guards your bank accounts, mobile money and email — and SIM swap fraud steals that key. Criminals trick operators into activating a new SIM card with your number, then intercept every code sent to you. Learn the signs and the protections that work.",
      fr: "Votre numéro de téléphone protège vos comptes bancaires, votre mobile money et votre messagerie — et la fraude par échange de SIM vole précisément cette clé. Les criminels trompent les opérateurs pour activer une nouvelle SIM avec votre numéro, puis interceptent tous vos codes. Découvrez les signes et les protections efficaces.",
    },
    what: {
      en: "SIM swap fraud — sometimes called SIM splitting or port-out fraud — happens when a criminal convinces your mobile operator to transfer your number to a SIM card in their possession. Your own phone silently loses service, while the criminal receives your calls, your SMS and, above all, the one-time codes that protect your bank accounts, mobile money wallets and email.",
      fr: "La fraude par échange de SIM — aussi appelée SIM splitting ou fraude au portage — survient quand un criminel convainc votre opérateur mobile de transférer votre numéro vers une carte SIM en sa possession. Votre téléphone perd silencieusement le réseau, tandis que le criminel reçoit vos appels, vos SMS et surtout les codes à usage unique qui protègent vos comptes bancaires, portefeuilles mobile money et messageries.",
    },
    how: {
      en: "The criminal first collects your personal data through other means: phishing messages, leaked databases, social media profiles and stolen identity documents. Armed with your name, date of birth and ID details, they contact the operator claiming a lost or damaged SIM — or rely on a complicit agent to process the swap. The moment the new SIM is activated, your phone shows “no service”. The criminal then triggers password resets on your email, bank and mobile money accounts: every verification code arrives on their device. Money is moved within minutes, before you even understand why your phone went silent.",
      fr: "Le criminel collecte d’abord vos données personnelles par d’autres moyens : messages d’hameçonnage, bases de données fuitées, profils de réseaux sociaux et pièces d’identité volées. Fort de votre nom, de votre date de naissance et des détails de votre pièce d’identité, il contacte l’opérateur en invoquant une SIM perdue ou endommagée — ou s’appuie sur un agent complice pour traiter l’échange. Dès l’activation de la nouvelle SIM, votre téléphone affiche « aucun réseau ». Le criminel déclenche alors des réinitialisations de mot de passe sur votre messagerie, votre banque et votre mobile money : chaque code de vérification arrive sur son appareil. L’argent est déplacé en quelques minutes, avant même que vous ne compreniez pourquoi votre téléphone est muet.",
    },
    warningSigns: [
      {
        en: "Your phone suddenly shows “no service” or “SIM not registered” in a place with normal coverage.",
        fr: "Votre téléphone affiche soudain « aucun réseau » ou « SIM non enregistrée » dans une zone habituellement couverte.",
      },
      {
        en: "You receive an SMS about a SIM change or porting request you never made.",
        fr: "Vous recevez un SMS annonçant un changement de SIM ou une demande de portage que vous n’avez jamais faite.",
      },
      {
        en: "Calls and SMS stop arriving, but Wi-Fi and internet still work on your device.",
        fr: "Appels et SMS n’arrivent plus, alors que le Wi-Fi fonctionne toujours sur votre appareil.",
      },
      {
        en: "Your email or bank reports password changes and logins you did not perform.",
        fr: "Votre messagerie ou votre banque signale des changements de mot de passe et connexions que vous n’avez pas faits.",
      },
      {
        en: "Unexpected “SIM registration failed” alerts appear repeatedly within a short time.",
        fr: "Des alertes « échec d’enregistrement SIM » apparaissent à plusieurs reprises en peu de temps.",
      },
      {
        en: "Mobile money notifications reveal transfers made while your phone was offline.",
        fr: "Les notifications mobile money révèlent des transferts effectués pendant que votre téléphone était hors ligne.",
      },
    ],
    example: {
      en: "Illustrative example: Kwame’s phone loses network during a workday in Accra; he assumes it is a fault. That evening, reconnected via a replacement SIM, he finds his email password changed and 400,000 FCFA gone from his mobile money in three transfers. The swap had been requested with a copied ID card. This is an illustrative scenario, not a real case.",
      fr: "Exemple illustratif : Le téléphone de Kwame perd le réseau pendant une journée de travail à Accra ; il croit à une panne. Le soir, reconnecté via une SIM de remplacement, il découvre son mot de passe de messagerie changé et 400 000 FCFA partis de son mobile money en trois transferts. L’échange avait été demandé avec une carte d’identité copiée. Scénario illustratif, pas un cas réel.",
    },
    protect: [
      {
        en: "Ask your operator about extra protection on your line, such as a swap code or in-person checks.",
        fr: "Renseignez-vous auprès de votre opérateur sur une protection renforcée de la ligne : code d’échange ou vérification en agence.",
      },
      {
        en: "Guard your identity documents: never send ID photos to unverified contacts or websites.",
        fr: "Protégez vos pièces d’identité : n’envoyez jamais de photos à des contacts ou sites non vérifiés.",
      },
      {
        en: "Limit what your social profiles reveal: birth date, address, mother’s name feed verification questions.",
        fr: "Limitez ce que révèlent vos profils : date de naissance, adresse et nom de jeune fille alimentent les questions de vérification.",
      },
      {
        en: "Use app-based or email-based verification in addition to SMS where your services allow it.",
        fr: "Activez, quand c’est possible, des vérifications par application ou courriel en plus des SMS.",
      },
      {
        en: "React immediately to “no service”: test the line, then visit the operator with your ID.",
        fr: "Réagissez aussitôt à un « aucun réseau » : testez la ligne, puis rendez-vous chez l’opérateur avec votre pièce.",
      },
      {
        en: "Set a PIN or password with your operator for account changes, if the service exists.",
        fr: "Définissez un code ou mot de passe auprès de votre opérateur pour les modifications de compte.",
      },
    ],
    ifVictim: [
      {
        en: "Go to your operator’s shop with your ID immediately to regain control of your number.",
        fr: "Rendez-vous immédiatement en agence avec votre pièce d’identité pour reprendre le contrôle du numéro.",
      },
      {
        en: "From any device, change passwords for email, bank and mobile money, starting with email.",
        fr: "Depuis n’importe quel appareil, changez les mots de passe de messagerie, banque et mobile money, en commençant par la messagerie.",
      },
      {
        en: "Ask your bank to freeze accounts and cards linked to the number, and review transactions.",
        fr: "Demandez à votre banque de geler comptes et cartes liés au numéro, et passez les transactions en revue.",
      },
      {
        en: "Ask the operator for the date, time and details of the fraudulent swap for the police report.",
        fr: "Demandez à l’opérateur la date, l’heure et le détail de l’échange frauduleux pour la plainte.",
      },
      {
        en: "File a police report and keep all correspondence with the operator.",
        fr: "Déposez plainte et conservez toute la correspondance avec l’opérateur.",
      },
    ],
    reportTo: [
      {
        en: "Your mobile operator’s official customer service and its fraud department.",
        fr: "Le service client officiel de votre opérateur mobile et son service anti-fraude.",
      },
      {
        en: "Your bank and mobile money provider to secure accounts and dispute transfers.",
        fr: "Votre banque et votre opérateur de mobile money pour sécuriser les comptes et contester les transferts.",
      },
      {
        en: "National police or cybercrime unit — SIM swap is a criminal offence everywhere.",
        fr: "Police nationale ou unité de cybercriminalité — l’échange de SIM est une infraction pénale partout.",
      },
      {
        en: "GLOPROFAS report form so we can guide you and alert other users.",
        fr: "Formulaire GLOPROFAS pour vous guider et alerter les autres usagers.",
      },
    ],
    keyTakeaway: {
      en: "A silent phone with “no service” in a covered area is an emergency, not a nuisance. Treat it as a possible SIM swap: act within minutes, not days.",
      fr: "Un téléphone muet « sans réseau » en zone couverte est une urgence, pas un désagrément. Traitez-le comme un échange de SIM possible : agissez en minutes, pas en jours.",
    },
    relatedSlugs: [
      "mobile-money-scams-protect-mtn-momo-orange-money",
      "identity-theft-and-personal-data-exploitation",
      "how-to-recognise-fake-bank-representatives",
    ],
    checklistSlug: "mobile-money-security",
    references: [
      { label: "Cyber Security Authority — Ghana", url: "https://csa.gov.gh/" },
      { label: "ScamShield — national anti-scam programme (Singapore)", url: "https://www.scamshield.gov.sg/" },
      { label: "ANTIC Cameroon — national cybersecurity agency", url: "https://www.antic.cm/" },
    ],
    readingMinutes: 6,
    publishedAt: "2026-10-31",
    updatedAt: "2026-11-20",
    imageUrl: "",
  },
  {
    slug: "atm-and-card-fraud-protection",
    categorySlug: "money-banking",
    title: {
      en: "ATM and Card Fraud: Practical Protection Measures",
      fr: "Fraude au distributeur et à la carte : mesures pratiques de protection",
    },
    metaDescription: {
      en: "ATM fraud uses skimmers, hidden cameras and shoulder-surfing to steal card data, then drains accounts. Learn to spot tampered machines and protect your PIN.",
      fr: "Skimmers, caméras cachées, regard indiscret : la fraude aux distributeurs vole vos données. Repérez les machines truquées et protégez votre PIN.",
    },
    summary: {
      en: "Cash machines remain essential across Africa — and criminals keep improving the tools that attack them: card skimmers, pinhole cameras, trapped cards and distracted customers. This guide walks through the practical checks that take seconds and the habits that keep your card and your money yours.",
      fr: "Les distributeurs de billets restent essentiels en Afrique — et les criminels perfectionnent leurs outils : skimmers, caméras espions, cartes bloquées et clients distraits. Ce guide présente les vérifications pratiques de quelques secondes et les réflexes qui gardent votre carte et votre argent à vous.",
    },
    what: {
      en: "ATM and card fraud covers the techniques used to steal card data or cash at automated teller machines and points of sale: skimming devices that read the magnetic stripe, hidden cameras or keypad overlays that capture the PIN, card-trapping devices, and shoulder-surfing or distraction at the machine. Stolen data is then used for cloning cards or for online purchases.",
      fr: "La fraude aux distributeurs et aux cartes regroupe les techniques de vol de données bancaires ou d’espèces : skimmers lisant la bande magnétique, caméras cachées ou fausses claviers capturant le PIN, dispositifs retenant la carte, regard indiscret ou distraction au guichet. Les données volées servent ensuite à cloner des cartes ou à effectuer des achats en ligne.",
    },
    how: {
      en: "A skimmer is a device fitted over the card slot that reads your card as you insert it; a pinhole camera or a transparent keypad overlay records your fingers as you type. Card traps block your card inside the machine, and a “helpful” bystander — or a message stuck on the machine — suggests re-entering your PIN, which the criminal watches. Distraction teams drop notes or ask questions at the crucial moment. Later, the data is written onto a blank card or used for online payments, and your account is drained — often at night or at machines far from your city.",
      fr: "Un skimmer est un dispositif plaqué sur la fente de carte qui lit votre carte à l’insertion ; une caméra espion ou un clavier transparent par-dessus le vrai enregistre vos doigts. Des pièges bloquent la carte dans la machine, et un « bon samaritain » — ou une affichette collée sur le distributeur — suggère de retaper votre PIN, que le criminel observe. Des équipes de distraction lâchent des billets ou posent des questions au moment crucial. Plus tard, les données sont copiées sur une carte vierge ou utilisées pour des paiements en ligne, et votre compte est vidé — souvent la nuit ou dans des machines loin de votre ville.",
    },
    warningSigns: [
      {
        en: "The card slot looks bulky, loose, or a different colour from the machine’s body.",
        fr: "La fente de carte paraît volumineuse, mobile ou d’une couleur différente du corps de la machine.",
      },
      {
        en: "The keypad feels spongy, thick or unresponsive — possible overlay reading your PIN.",
        fr: "Le clavier paraît mou, épais ou lent — possible fausse plaque lisant votre PIN.",
      },
      {
        en: "A sticker or note instructs you to re-enter your PIN or call a number.",
        fr: "Une étiquette ou affichette vous demande de retaper votre PIN ou d’appeler un numéro.",
      },
      {
        en: "The machine is in a dark or hidden spot where strangers can approach closely.",
        fr: "La machine est dans un endroit sombre ou isolé où des inconnus peuvent s’approcher de près.",
      },
      {
        en: "Strangers offer “help” the moment your card seems stuck or the cash is slow.",
        fr: "Des inconnus proposent leur « aide » dès que votre carte semble coincée ou l’argent lent.",
      },
      {
        en: "Cash fails to appear but the session closes — a sign the dispenser may be trapped.",
        fr: "Les billets n’apparaissent pas mais la session se ferme — signe que le distributeur est peut-être piégé.",
      },
    ],
    example: {
      en: "Illustrative example: Aminata withdraws 100,000 FCFA from an ATM near a Douala nightclub. The next morning, her bank calls about attempted withdrawals in a distant town; a technician later finds a skimmer on that machine. Because she had shielded her PIN and set a daily limit, the cloned card fails. This is an illustrative scenario, not a real case.",
      fr: "Exemple illustratif : Aminata retire 100 000 FCFA à un distributeur près d’une boîte de nuit de Douala. Le lendemain matin, sa banque l’appelle au sujet de retraits tentés dans une ville lointaine ; un technicien découvre ensuite un skimmer sur cette machine. Comme elle avait caché son PIN et fixé un plafond quotidien, la carte clonée échoue. Scénario illustratif, pas un cas réel.",
    },
    protect: [
      {
        en: "Inspect the card slot and keypad before use; pull gently to reveal loose fittings.",
        fr: "Examinez fente de carte et clavier avant usage ; tirez doucement pour déceler un dispositif mal fixé.",
      },
      {
        en: "Cover the keypad with your other hand while typing — defeat cameras and eyes alike.",
        fr: "Couvrez le clavier de l’autre main en tapant — pour vaincre caméras et regards.",
      },
      {
        en: "Prefer ATMs inside bank lobbies, malls or well-lit, busy locations.",
        fr: "Préférez les distributeurs dans les halls de banque, centres commerciaux ou lieux éclairés et fréquentés.",
      },
      {
        en: "Never accept help from strangers at the machine — ask the bank staff instead.",
        fr: "N’acceptez jamais l’aide d’inconnus au distributeur — demandez plutôt au personnel de la banque.",
      },
      {
        en: "Set withdrawal limits and activate SMS alerts for every card transaction.",
        fr: "Fixez des plafonds de retrait et activez les alertes SMS pour chaque transaction par carte.",
      },
      {
        en: "If your card is trapped, stay at the machine, block it by phone, and note the location.",
        fr: "Si votre carte reste coincée, restez sur place, bloquez-la par téléphone et notez le lieu.",
      },
      {
        en: "Check statements regularly and report unknown charges immediately, however small.",
        fr: "Vérifiez régulièrement vos relevés et signalez aussitôt toute charge inconnue, même minime.",
      },
    ],
    ifVictim: [
      {
        en: "Block the card immediately via your bank’s hotline or app, day or night.",
        fr: "Bloquez immédiatement la carte via la ligne ou l’application de votre banque, jour et nuit.",
      },
      {
        en: "Keep the receipts, note the machine’s location and reference, and photograph it if possible.",
        fr: "Gardez les reçus, notez le lieu et la référence de la machine, et photographiez-la si possible.",
      },
      {
        en: "Dispute fraudulent transactions in writing with your bank and keep copies.",
        fr: "Contestez par écrit les transactions frauduleuses auprès de votre banque et gardez des copies.",
      },
      {
        en: "File a police report — required by most banks for reimbursement procedures.",
        fr: "Déposez plainte — exigé par la plupart des banques pour toute procédure de remboursement.",
      },
      {
        en: "Change your PIN and any reused passwords that could be compromised.",
        fr: "Changez votre PIN et tout mot de passe réutilisé pouvant être compromis.",
      },
    ],
    reportTo: [
      {
        en: "Your bank’s fraud line — the number on the back of your card.",
        fr: "La ligne anti-fraude de votre banque — le numéro au dos de votre carte.",
      },
      {
        en: "National police or cybercrime unit with your evidence and police report.",
        fr: "Police nationale ou unité de cybercriminalité avec vos preuves et votre plainte.",
      },
      {
        en: "GLOPROFAS report form — we document compromised ATMs and alert communities.",
        fr: "Formulaire GLOPROFAS — nous documentons les distributeurs compromis et alertons les communautés.",
      },
    ],
    keyTakeaway: {
      en: "Two seconds of inspection and one covered hand defeat most ATM attacks. If a machine looks or feels wrong, walk away — no withdrawal is worth your account.",
      fr: "Deux secondes d’inspection et une main sur le clavier déjouent la plupart des attaques aux distributeurs. Si une machine semble anormale, partez — aucun retrait ne vaut votre compte.",
    },
    relatedSlugs: [
      "how-to-recognise-fake-bank-representatives",
      "sim-swap-fraud-hijacked-phone-number",
      "mobile-money-scams-protect-mtn-momo-orange-money",
    ],
    checklistSlug: "banking-fraud-prevention",
    references: [
      { label: "ANTIC Cameroon — national cybersecurity agency", url: "https://www.antic.cm/" },
      { label: "Cyber Security Authority — Ghana", url: "https://csa.gov.gh/" },
      { label: "Europol — law enforcement cooperation", url: "https://www.europol.europa.eu/" },
    ],
    readingMinutes: 5,
    publishedAt: "2026-11-03",
    updatedAt: "2026-11-20",
    imageUrl: "",
  },
  {
    slug: "investment-scams-and-ponzi-schemes",
    categorySlug: "money-banking",
    title: {
      en: "Investment Scams and Ponzi Schemes",
      fr: "Arnaques à l’investissement et schémas de Ponzi",
    },
    metaDescription: {
      en: "Ponzi schemes and fake investments promise guaranteed high returns and pay early victims with newcomers’ money. Learn the red flags before you invest.",
      fr: "Schémas de Ponzi et faux investissements promettent des rendements garantis et paient les premiers avec l’argent des suivants. Repérez les signaux.",
    },
    summary: {
      en: "From “doubling” savings clubs to forex and crypto trading rooms, investment scams promise the same impossible thing: high guaranteed returns with no risk. They pay early investors with newcomers’ money until the flow stops. This guide breaks down the mechanics and the red flags to check.",
      fr: "Des tontines « qui doublent l’argent » aux salles de trading forex et crypto, les fausses promesses d’investissement répètent la même impossibilité : des rendements élevés garantis sans risque. Les premiers investisseurs sont payés avec l’argent des suivants, jusqu’à l’écroulement. Ce guide détaille les mécanismes et les signaux d’alerte.",
    },
    what: {
      en: "An investment scam collects money while pretending to invest it. A Ponzi scheme — named after an early twentieth-century fraudster — is the most common form: returns paid to older investors come, in reality, from newer investors’ deposits, not from any business. Collapsing is not a risk but a certainty: the moment new deposits slow, payments stop and organisers vanish.",
      fr: "Une arnaque à l’investissement collecte de l’argent en prétendant l’investir. Le schéma de Ponzi — du nom d’un escroc du début du vingtième siècle — en est la forme la plus courante : les rendements versés aux anciens proviennent en réalité des dépôts des nouveaux, d’aucune activité réelle. L’écroulement n’est pas un risque mais une certitude : dès que les dépôts ralentissent, les paiements cessent et les organisateurs disparaissent.",
    },
    how: {
      en: "The pitch arrives through a friend, a WhatsApp group, a church or office network, or a polished social media campaign showing “members’ profits”. Early participants really do receive payments, often generous — this is the bait, funded by later joiners. Word spreads, deposits grow, and the scheme sometimes runs for months. The organisers reinforce the story: “trading secrets”, “agricultural projects”, “government contracts”, testimonials from recruited members who earn bonuses for bringing others. Pressure follows: “the window closes soon”, “the minimum rises tomorrow”. The end is always the same — withdrawals are delayed, then refused, then the office, app or WhatsApp group disappears, and members are urged to “reinvest to recover” their losses.",
      fr: "Le discours arrive par un ami, un groupe WhatsApp, un réseau d’église ou de bureau, ou une campagne soignée sur les réseaux sociaux montrant les « profits des membres ». Les premiers participants reçoivent réellement des paiements, souvent généreux — c’est l’appât, financé par les suivants. Le bouche-à-oreille s’étend, les dépôts augmentent, et le schéma peut durer des mois. Les organisateurs consolident le récit : « secrets de trading », « projets agricoles », « marchés publics », témoignages de membres rémunérés pour en recruter d’autres. Puis la pression : « la fenêtre se ferme bientôt », « le minimum augmente demain ». La fin est toujours la même — les retraits sont retardés, puis refusés, puis le bureau, l’application ou le groupe WhatsApp disparaît, et l’on presse les membres de « réinvestir pour récupérer » leurs pertes.",
    },
    warningSigns: [
      {
        en: "Returns are guaranteed, high and regular — a combination no real investment offers.",
        fr: "Les rendements sont garantis, élevés et réguliers — une combinaison qu’aucun vrai investissement n’offre.",
      },
      {
        en: "You are urged to recruit friends and family for bonuses on their deposits.",
        fr: "On vous presse de recruter proches et amis contre des bonus sur leurs dépôts.",
      },
      {
        en: "The strategy is vague: “secret algorithms”, “exclusive markets” or “divine favour”.",
        fr: "La stratégie est vague : « algorithmes secrets », « marchés exclusifs » ou « faveur divine ».",
      },
      {
        en: "Withdrawals become slow, conditional on recruiting, or require “upgrade fees”.",
        fr: "Les retraits deviennent lents, conditionnés au recrutement ou exigent des « frais de mise à niveau ».",
      },
      {
        en: "The operator is not licensed by your country’s financial regulator — check before paying.",
        fr: "L’opérateur n’est pas agréé par le régulateur financier de votre pays — vérifiez avant de payer.",
      },
      {
        en: "Offices, receipts or contracts are missing, or the “company” exists only on WhatsApp.",
        fr: "Bureaux, reçus ou contrats absents, ou la « société » n’existe que sur WhatsApp.",
      },
      {
        en: "Members are told to move quickly because “the government will soon shut it down”.",
        fr: "On dit aux membres de se dépêcher car « le gouvernement va bientôt tout fermer ».",
      },
    ],
    example: {
      en: "Illustrative example: A “savings and trading club” spreads through Yaoundé WhatsApp groups, promising to double deposits in one month. Eric invests 200,000 FCFA, receives 260,000 FCFA after four weeks, and convinces his sister to join with 500,000 FCFA. In week nine, the group admin announces a “technical audit”, payments stop, and the office in Bastos is empty. This is an illustrative scenario, not a real case.",
      fr: "Exemple illustratif : Un « club d’épargne et de trading » se propage dans les groupes WhatsApp de Yaoundé, promettant de doubler les dépôts en un mois. Éric investit 200 000 FCFA, reçoit 260 000 FCFA après quatre semaines et convainc sa sœur d’entrer avec 500 000 FCFA. À la neuvième semaine, l’administrateur du groupe annonce un « audit technique », les paiements cessent et le bureau de Bastos est vide. Scénario illustratif, pas un cas réel.",
    },
    protect: [
      {
        en: "Check the licence: genuine investment firms are registered with your national financial regulator.",
        fr: "Vérifiez l’agrément : les vraies firmes d’investissement sont enregistrées auprès du régulateur financier national.",
      },
      {
        en: "Assume guaranteed high returns are false — real investing carries risk and fluctuates.",
        fr: "Tenez les rendements garantis élevés pour faux — le vrai investissement comporte des risques et fluctue.",
      },
      {
        en: "Insist on written contracts, receipts and audited accounts before handing over money.",
        fr: "Exigez contrats écrits, reçus et comptes audités avant de verser de l’argent.",
      },
      {
        en: "Be doubly careful when recruited by friends or family — they may be unknowing victims.",
        fr: "Redoublez de prudence quand un proche vous recrute — il est peut-être victime sans le savoir.",
      },
      {
        en: "Compare promised returns with bank rates and ask why such profits are possible.",
        fr: "Comparez les rendements promis aux taux bancaires et demandez pourquoi de tels profits sont possibles.",
      },
      {
        en: "Never “reinvest to recover” losses after delayed payments — that is the final trap.",
        fr: "Ne « réinvestissez jamais pour récupérer » après des retards de paiement — c’est le dernier piège.",
      },
      {
        en: "Keep money you can afford to lose firmly separated from school fees and family savings.",
        fr: "Séparez strictement l’argent que vous pouvez perdre des frais de scolarité et de l’épargne familiale.",
      },
    ],
    ifVictim: [
      {
        en: "Stop all further payments, whatever the organisers promise about recovery plans.",
        fr: "Cessez tout paiement, quelles que soient les promesses de plan de récupération des organisateurs.",
      },
      {
        en: "Gather all evidence: contracts, receipts, transfers, screenshots, names and numbers.",
        fr: "Rassemblez toutes les preuves : contrats, reçus, transferts, captures, noms et numéros.",
      },
      {
        en: "Report to your financial regulator — illegal deposit-taking is within its powers.",
        fr: "Signalez au régulateur financier — la collecte illégale de dépôts relève de ses compétences.",
      },
      {
        en: "File a police report with the economic or cybercrime division promptly.",
        fr: "Déposez rapidement plainte auprès de la brigade économique ou cybercriminelle.",
      },
      {
        en: "Ask your bank about tracing transfers to the scheme’s accounts.",
        fr: "Interrogez votre banque sur le traçage des transferts vers les comptes du schéma.",
      },
      {
        en: "Warn your network calmly — many victims stay silent, which protects the fraudsters.",
        fr: "Avertissez calmement votre entourage — le silence des victimes protège les fraudeurs.",
      },
    ],
    reportTo: [
      {
        en: "Your national financial regulator or central bank’s investor protection service.",
        fr: "Le régulateur financier national ou le service de protection des épargnants de la banque centrale.",
      },
      {
        en: "The police economic crime or cybercrime unit with your evidence file.",
        fr: "La brigade économique ou l’unité de cybercriminalité avec votre dossier de preuves.",
      },
      {
        en: "GLOPROFAS report form — we document schemes and publish alerts for the public.",
        fr: "Formulaire GLOPROFAS — nous documentons les schémas et publions des alertes publiques.",
      },
    ],
    keyTakeaway: {
      en: "Guaranteed high returns do not exist. When an investment pays you with newcomers’ money, your profit is someone’s future loss — and the music always stops.",
      fr: "Les rendements élevés garantis n’existent pas. Quand un investissement vous paie avec l’argent des nouveaux, votre profit est la perte future d’un autre — et la musique s’arrête toujours.",
    },
    relatedSlugs: [
      "cryptocurrency-and-digital-asset-scams",
      "loan-credit-and-financial-assistance-scams",
      "how-to-recognise-and-avoid-online-scams",
    ],
    checklistSlug: "investment-verification",
    references: [
      { label: "Cyber Security Authority — Ghana", url: "https://csa.gov.gh/" },
      { label: "ScamShield — national anti-scam programme (Singapore)", url: "https://www.scamshield.gov.sg/" },
      { label: "Canadian Anti-Fraud Centre", url: "https://www.antifraudcentre-centreantifraude.ca/" },
    ],
    readingMinutes: 7,
    publishedAt: "2026-11-05",
    updatedAt: "2026-11-20",
    featured: true,
    popular: true,
    imageUrl: "",
  },
  {
    slug: "cryptocurrency-and-digital-asset-scams",
    categorySlug: "money-banking",
    title: {
      en: "Cryptocurrency and Digital Asset Scams",
      fr: "Arnaques aux cryptomonnaies et aux actifs numériques",
    },
    metaDescription: {
      en: "Crypto scams promise quick riches: fake trading platforms, giveaway fraud, pump-and-dump tokens and bogus recovery agents. Spot the red flags.",
      fr: "Arnaques crypto : fausses plateformes de trading, faux cadeaux, pump-and-dump, pseudo-agents de récupération. Repérez les signaux d’alerte.",
    },
    summary: {
      en: "Cryptocurrency scams promise quick wealth through fake trading platforms, doubling schemes, bogus giveaways and so-called recovery agents. This guide explains how crypto fraud works, the warning signs to spot, and how to protect your digital assets.",
      fr: "Les arnaques aux cryptomonnaies promettent un enrichissement rapide : fausses plateformes de trading, systèmes de doublement, faux cadeaux et pseudo-agents de récupération. Ce guide explique leur fonctionnement, les signaux d’alerte et comment protéger vos actifs numériques.",
    },
    what: {
      en: "A cryptocurrency scam is any fraud that uses digital assets — Bitcoin, stablecoins, tokens or trading platforms — to steal your money. Criminals exploit the excitement around crypto, the technical complexity of wallets and the irreversibility of blockchain transfers. Because a crypto payment cannot be reversed like a card chargeback, money sent to a scammer is almost always gone for good.",
      fr: "Une arnaque aux cryptomonnaies est une fraude qui utilise des actifs numériques — Bitcoin, stablecoins, jetons ou plateformes de trading — pour voler votre argent. Les criminels exploitent l’engouement pour la crypto, la complexité technique des portefeuilles et l’irréversibilité des transferts sur la blockchain. Comme un paiement en cryptomonnaies ne peut être annulé comme une transaction par carte, l’argent envoyé à un escroc est presque toujours définitivement perdu.",
    },
    how: {
      en: "The most common trap is the fake trading platform: a polished website or app where your dashboard shows impressive daily profits, while every deposit goes straight to the scammer. When you try to withdraw, you are told to pay “taxes”, “commission” or “unlocking fees” first — and the money never returns. Variants include “doubling” offers, fake celebrity giveaway videos and pump-and-dump groups, where organisers inflate a worthless token and sell while you buy.\n\nA final stage follows the loss: “recovery agents” contact victims promising to retrieve stolen crypto for an upfront fee. No legitimate service can reverse a blockchain transfer — these are often the same networks, collecting twice.",
      fr: "Le piège le plus fréquent est la fausse plateforme de trading : un site ou une application soigné où votre tableau de bord affiche des profits quotidiens impressionnants, alors que chaque dépôt part directement vers l’escroc. Au moment du retrait, on vous demande de payer d’abord des « impôts », une « commission » ou des « frais de déblocage » — et l’argent ne revient jamais. Les variantes incluent les offres de « doublement », les fausses vidéos de célébrités offrant des cadeaux et les groupes de pump-and-dump, où les organisateurs gonflent un jeton sans valeur et revendent pendant que vous achetez.\n\nUne dernière étape suit la perte : des « agents de récupération » contactent les victimes en promettant de retrouver les cryptomonnaies volées moyennant des frais payables d’avance. Aucun service légitime ne peut annuler un transfert sur la blockchain — ce sont souvent les mêmes réseaux, qui encaissent deux fois.",
    },
    warningSigns: [
      {
        en: "Your dashboard shows large profits, but withdrawals require “taxes”, “commission” or “unlocking fees” first.",
        fr: "Votre tableau de bord affiche d’importants bénéfices, mais les retraits exigent d’abord « impôts », « commission » ou « frais de déblocage ».",
      },
      {
        en: "A stranger or new online contact offers to “manage” your crypto with guaranteed returns.",
        fr: "Un inconnu ou un nouveau contact propose de « gérer » vos cryptomonnaies avec des rendements garantis.",
      },
      {
        en: "Famous personalities appear in videos promoting giveaways — verify on their official accounts first.",
        fr: "Des célébrités apparaissent dans des vidéos promotionnant des distributions de cadeaux — vérifiez sur leurs comptes officiels.",
      },
      {
        en: "The platform is very recent, holds no licence and appears in no regulator’s register.",
        fr: "La plateforme est très récente, sans agrément et absente des registres des régulateurs.",
      },
      {
        en: "You are urged to recruit friends, with bonuses paid out of their deposits.",
        fr: "On vous presse de recruter des proches, avec des bonus prélevés sur leurs dépôts.",
      },
      {
        en: "“Support” insists on remote access to your device or your wallet’s recovery phrase.",
        fr: "Le « support » insiste pour accéder à distance à votre appareil ou à votre phrase de récupération.",
      },
      {
        en: "After a loss, “recovery agents” demand upfront payment to retrieve your crypto.",
        fr: "Après une perte, des « agents de récupération » exigent un paiement d’avance pour retrouver vos cryptomonnaies.",
      },
    ],
    example: {
      en: "Illustrative example: Chidi, an engineer in Lagos, joins a Telegram “trading group” recommended by a colleague. He deposits the equivalent of 300,000 FCFA in crypto and watches his dashboard claim 40 percent growth in two weeks. When he tries to withdraw, support demands a 90,000 FCFA “tax clearance”. After paying, the account is frozen. Weeks later, a “recovery expert” offers to retrieve the funds — for another fee. Illustrative scenario, not a real case.",
      fr: "Exemple illustratif : Chidi, ingénieur à Lagos, rejoint un « groupe de trading » Telegram recommandé par un collègue. Il dépose l’équivalent de 300 000 FCFA en cryptomonnaies et voit son tableau de bord afficher 40 pour cent de croissance en deux semaines. Au moment du retrait, le support exige un « certificat fiscal » de 90 000 FCFA. Après paiement, le compte est gelé. Quelques semaines plus tard, un « expert en récupération » propose de retrouver les fonds — moyennant d’autres frais. Scénario illustratif, pas un cas réel.",
    },
    protect: [
      {
        en: "Treat crypto as high-risk: invest only money you could afford to lose entirely.",
        fr: "Considérez la crypto comme très risquée : n’investissez que l’argent que vous pouvez perdre entièrement.",
      },
      {
        en: "Verify a platform independently: regulator registers, domain age and independent reviews — not testimonials.",
        fr: "Vérifiez une plateforme de façon indépendante : registres des régulateurs, ancienneté du domaine, avis externes — pas les témoignages.",
      },
      {
        en: "Never share your wallet’s recovery phrase or private keys with anyone, for any reason.",
        fr: "Ne partagez la phrase de récupération ni les clés privées de votre portefeuille avec quiconque, pour quelque raison que ce soit.",
      },
      {
        en: "Be wary of strangers offering managed investments, signals or “guaranteed” profits on Telegram or WhatsApp.",
        fr: "Méfiez-vous des inconnus proposant gestion d’actifs, signaux ou profits « garantis » sur Telegram ou WhatsApp.",
      },
      {
        en: "Check celebrity endorsements on the person’s official verified accounts before believing any video.",
        fr: "Vérifiez les soutiens de célébrités sur leurs comptes officiels vérifiés avant de croire une vidéo.",
      },
      {
        en: "Deposit a small test amount and withdraw it immediately — a platform blocking small withdrawals is fraudulent.",
        fr: "Déposez une petite somme test et retirez-la aussitôt — une plateforme qui bloque les petits retraits est frauduleuse.",
      },
      {
        en: "Never pay upfront fees to “recovery agents”; no service can reverse a blockchain transfer.",
        fr: "Ne payez jamais d’avance des « agents de récupération » ; aucun service ne peut annuler un transfert sur la blockchain.",
      },
      {
        en: "Download wallet and exchange apps only from official app stores and keep your device updated.",
        fr: "Téléchargez les applications de portefeuille et d’échange uniquement depuis les boutiques officielles et tenez votre appareil à jour.",
      },
    ],
    ifVictim: [
      {
        en: "Stop all further deposits and “fee” payments to the platform immediately.",
        fr: "Cessez immédiatement tout nouveau dépôt et tout paiement de « frais » à la plateforme.",
      },
      {
        en: "Collect evidence: platform URLs, wallet addresses, transaction IDs, chat logs and payment receipts.",
        fr: "Rassemblez les preuves : adresses de la plateforme, adresses de portefeuille, identifiants de transaction, conversations et reçus.",
      },
      {
        en: "Report to the exchange or wallet provider you used — some can flag the receiving addresses.",
        fr: "Signalez à la plateforme d’échange ou au fournisseur de portefeuille utilisé — certains peuvent signaler les adresses réceptrices.",
      },
      {
        en: "File a report with your national police or cybercrime unit; blockchain records can support investigations.",
        fr: "Déposez plainte auprès de la police ou de l’unité de cybercriminalité ; les registres de la blockchain peuvent étayer l’enquête.",
      },
      {
        en: "Change passwords and secure your email and devices if you granted anyone remote access.",
        fr: "Changez vos mots de passe et sécurisez votre messagerie et vos appareils si vous avez donné un accès à distance.",
      },
      {
        en: "Ignore anyone who later offers paid crypto recovery — that contact is a second scam.",
        fr: "Ignorez quiconque propose ensuite une récupération payante — ce contact est une seconde arnaque.",
      },
    ],
    reportTo: [
      {
        en: "Your national police or cybercrime unit, with transaction IDs and your evidence file.",
        fr: "La police nationale ou l’unité de cybercriminalité, avec les identifiants de transaction et votre dossier de preuves.",
      },
      {
        en: "The crypto exchange or wallet provider involved, so receiving addresses can be flagged.",
        fr: "La plateforme d’échange ou le fournisseur de portefeuille concerné, afin de signaler les adresses réceptrices.",
      },
      {
        en: "GLOPROFAS report form — we document active crypto scam patterns and publish public alerts.",
        fr: "Le formulaire GLOPROFAS — nous documentons les schémas d’arnaque crypto actifs et publions des alertes.",
      },
    ],
    keyTakeaway: {
      en: "No one can double your crypto, and no honest platform freezes withdrawals until you pay “fees”. If you must pay to retrieve your own money, you are being scammed again — walk away.",
      fr: "Personne ne peut doubler vos cryptomonnaies, et aucune plateforme honnête ne gèle les retraits en attendant des « frais ». Si l’on vous demande de payer pour récupérer votre propre argent, c’est encore une arnaque — arrêtez tout.",
    },
    relatedSlugs: [
      "investment-scams-and-ponzi-schemes",
      "cryptocurrency-recovery-and-refund-scams",
      "how-to-recognise-and-avoid-online-scams",
    ],
    checklistSlug: "crypto-scam-prevention",
    references: [
      { label: "FBI Internet Crime Complaint Center (IC3)", url: "https://www.ic3.gov/" },
      { label: "Europol", url: "https://www.europol.europa.eu/" },
      { label: "Canadian Anti-Fraud Centre", url: "https://www.antifraudcentre-centreantifraude.ca/" },
    ],
    readingMinutes: 6,
    publishedAt: "2026-11-08",
    updatedAt: "2026-11-20",
    imageUrl: "",
  },
  {
    slug: "loan-credit-and-financial-assistance-scams",
    categorySlug: "money-banking",
    title: {
      en: "Loan, Credit and Financial Assistance Scams",
      fr: "Arnaques aux prêts, au crédit et à l’aide financière",
    },
    metaDescription: {
      en: "Fake lenders promise quick loans with no credit check, then demand upfront “insurance” or “processing” fees. Learn the warning signs and safer ways to borrow.",
      fr: "Faux prêteurs promettant des crédits rapides sans vérification, puis exigeant des frais d’« assurance » ou de « dossier » payables d’avance. Repérez les signes.",
    },
    summary: {
      en: "Loan and credit scams target people who urgently need money: fake lenders demand upfront fees for loans that never arrive, while fake “grants” and assistance programmes harvest personal data. This guide explains the tricks and the safer ways to borrow.",
      fr: "Les arnaques au crédit visent ceux qui ont besoin d’argent d’urgence : de faux prêteurs exigent des frais d’avance pour des prêts qui n’arrivent jamais, tandis que de fausses « subventions » collectent vos données. Ce guide explique ces pièges et les voies sûres pour emprunter.",
    },
    what: {
      en: "A loan scam is an advance-fee fraud aimed at people who need to borrow. The fake lender advertises easy credit — no credit check, no collateral, same-day payout — then demands upfront payments for “insurance”, “processing” or “lawyer’s fees” before the loan can be released. The loan never existed; the fees are the scam’s entire purpose.",
      fr: "Une arnaque au prêt est une fraude à l’avance visant les personnes qui doivent emprunter. Le faux prêteur annonce un crédit facile — sans vérification, sans garantie, versement le jour même — puis exige des paiements préalables pour l’« assurance », le « dossier » ou les « honoraires d’avocat » avant le déblocage. Le prêt n’a jamais existé ; ces frais sont le but même de l’arnaque.",
    },
    how: {
      en: "The offers arrive on social media, by SMS and on classified sites: “Instant loans up to 5,000,000 FCFA — no credit check, approval within the hour”. A slick website and a convincing “agent” complete the picture. Approval is remarkably easy — suspiciously so. You are first asked to pay to “activate” or “insure” the transfer, then for an “anti-money-laundering certificate”, a “central bank clearance” or a “lawyer”. Each payment supposedly unlocks the last.\n\nSome victims pay three or four fees before accepting that the loan will never arrive. A related format impersonates government assistance — fake “grants”, “poverty-alleviation funds” or “stipends” demanding registration fees or identity documents. Both versions monetise your hope and your data.",
      fr: "Les offres arrivent sur les réseaux sociaux, par SMS et sur les sites d’annonces : « Prêts immédiats jusqu’à 5 000 000 FCFA — sans vérification, accord en une heure ». Un site soigné et un « agent » convaincant complètent le tableau. L’accord est remarquablement facile — suspicieusement même. On vous demande d’abord de payer pour « activer » ou « assurer » le virement, puis pour un « certificat anti-blanchiment », une « autorisation de la banque centrale » ou un « avocat ». Chaque paiement est censé débloquer le dernier.\n\nCertaines victimes paient trois ou quatre frais avant d’admettre que le prêt n’arrivera jamais. Un format voisin usurpe l’aide publique — fausses « subventions », « fonds sociaux » ou « bourses » exigeant des frais d’inscription ou des pièces d’identité. Les deux versions monétisent votre espoir et vos données.",
    },
    warningSigns: [
      {
        en: "Approval is guaranteed without any check of your income, history or guarantees.",
        fr: "L’accord est garanti sans aucune vérification de vos revenus, antécédents ou garanties.",
      },
      {
        en: "You must pay a fee before receiving the loan — real lenders deduct costs from the disbursed amount.",
        fr: "Vous devez payer des frais avant de recevoir le prêt — les vrais prêteurs les déduisent du montant versé.",
      },
      {
        en: "Fees are demanded through mobile money to personal numbers, gift cards or crypto.",
        fr: "Les frais sont exigés par mobile money vers des numéros personnels, par cartes cadeaux ou en cryptomonnaies.",
      },
      {
        en: "Contact happens only on WhatsApp or SMS, with no verifiable office or licence number.",
        fr: "Le contact se fait uniquement par WhatsApp ou SMS, sans bureau vérifiable ni numéro d’agrément.",
      },
      {
        en: "Pressure is constant: the “special rate” expires today or your file will be deleted.",
        fr: "La pression est permanente : le « taux spécial » expire aujourd’hui ou votre dossier sera supprimé.",
      },
      {
        en: "The “lender” is not registered with your ministry of finance or banking regulator.",
        fr: "Le « prêteur » n’est pas enregistré auprès du ministère des Finances ni du régulateur bancaire.",
      },
      {
        en: "Documents carry invented stamps or authorities, and no licensed institution is ever named.",
        fr: "Les documents portent des tampons ou autorités inventés, et aucune institution agréée n’est jamais nommée.",
      },
    ],
    example: {
      en: "Illustrative example: Nadège, a trader at Douala’s central market, needs 800,000 FCFA for stock. She answers a Facebook advert promising same-day loans. The “agent” approves her file within the hour, then requests a 45,000 FCFA “insurance fee”, then 60,000 FCFA for a “central bank clearance”. After the third payment he stops replying. The office address listed online belongs to a hairdressing salon. Illustrative scenario, not a real case.",
      fr: "Exemple illustratif : Nadège, commerçante au marché central de Douala, a besoin de 800 000 FCFA pour son stock. Elle répond à une publicité Facebook promettant des prêts versés le jour même. L’« agent » accepte son dossier en une heure, puis réclame 45 000 FCFA de « frais d’assurance », puis 60 000 FCFA pour une « autorisation de la banque centrale ». Après le troisième paiement, il ne répond plus. L’adresse du bureau indiquée en ligne est celle d’un salon de coiffure. Scénario illustratif, pas un cas réel.",
    },
    protect: [
      {
        en: "Borrow only from licensed institutions: banks, microfinance firms and cooperatives registered with your banking regulator.",
        fr: "Empruntez uniquement auprès d’établissements agréés : banques, microfinances et coopératives enregistrées auprès du régulateur bancaire.",
      },
      {
        en: "Remember the golden rule: a legitimate lender never asks for money before disbursing a loan.",
        fr: "Retenez la règle d’or : un prêteur légitime ne demande jamais d’argent avant de verser le prêt.",
      },
      {
        en: "Verify the lender’s licence, physical office and official contact details before sending any document.",
        fr: "Vérifiez l’agrément, le bureau physique et les coordonnées officielles du prêteur avant d’envoyer tout document.",
      },
      {
        en: "Be sceptical of guaranteed approval, absent credit checks and rates far below the market.",
        fr: "Méfiez-vous des accords garantis, de l’absence de vérification et des taux très inférieurs au marché.",
      },
      {
        en: "Never send ID copies, bank details or PINs to an unverified “loan agent”.",
        fr: "N’envoyez jamais copies de pièces d’identité, coordonnées bancaires ou codes PIN à un « agent de crédit » non vérifié.",
      },
      {
        en: "Compare several established lenders and insist on a written contract you can read before signing.",
        fr: "Comparez plusieurs prêteurs établis et exigez un contrat écrit que vous pouvez lire avant de signer.",
      },
      {
        en: "Ask a trusted person to review the offer — fraudsters rely on urgency to prevent reflection.",
        fr: "Demandez à un proche de confiance d’examiner l’offre — les escrocs misent sur l’urgence pour empêcher la réflexion.",
      },
      {
        en: "Type the lender’s web address yourself instead of following links from adverts or messages.",
        fr: "Saisissez vous-même l’adresse du site du prêteur au lieu de suivre les liens des publicités ou messages.",
      },
    ],
    ifVictim: [
      {
        en: "Stop all further payments immediately, whatever new fee is announced next.",
        fr: "Cessez immédiatement tout paiement, quel que soit le nouveau frais annoncé.",
      },
      {
        en: "Keep every trace: messages, receipts, bank and mobile money statements, the advert, the fake contract.",
        fr: "Conservez toute trace : messages, reçus, relevés bancaires et mobile money, publicité, faux contrat.",
      },
      {
        en: "Alert your bank or mobile money provider and ask them to flag the receiving account.",
        fr: "Alertez votre banque ou votre opérateur mobile money et demandez de signaler le compte récepteur.",
      },
      {
        en: "Report to the police or cybercrime unit with your complete evidence file.",
        fr: "Signalez à la police ou à l’unité de cybercriminalité avec votre dossier complet de preuves.",
      },
      {
        en: "If you shared identity documents, mention it in your report and watch for misuse.",
        fr: "Si vous avez partagé des pièces d’identité, mentionnez-le dans votre plainte et surveillez tout usage frauduleux.",
      },
      {
        en: "Change passwords for any accounts whose details you shared with the fake lender.",
        fr: "Changez les mots de passe des comptes dont vous avez communiqué les détails au faux prêteur.",
      },
    ],
    reportTo: [
      {
        en: "Your national police or cybercrime unit — advance-fee fraud is a crime.",
        fr: "La police nationale ou l’unité de cybercriminalité — la fraude à l’avance est un crime.",
      },
      {
        en: "Your banking or microfinance regulator, which tracks unlicensed lenders.",
        fr: "Votre régulateur bancaire ou de microfinance, qui recense les prêteurs non agréés.",
      },
      {
        en: "GLOPROFAS report form — we document loan scam patterns and alert the public.",
        fr: "Le formulaire GLOPROFAS — nous documentons les schémas d’arnaques au crédit et alertons le public.",
      },
    ],
    keyTakeaway: {
      en: "A real lender deducts its fees from the money it lends you. If you must pay first to receive a loan, the loan does not exist — the fee is the scam.",
      fr: "Un vrai prêteur déduit ses frais du montant qu’il vous verse. Si vous devez payer avant de recevoir un prêt, ce prêt n’existe pas — les frais sont l’arnaque.",
    },
    relatedSlugs: [
      "how-to-identify-fake-websites-and-online-stores",
      "how-to-recognise-and-avoid-online-scams",
      "scholarship-and-education-scams",
    ],
    checklistSlug: "banking-fraud-prevention",
    references: [
      { label: "Canadian Anti-Fraud Centre", url: "https://www.antifraudcentre-centreantifraude.ca/" },
      { label: "FBI Internet Crime Complaint Center (IC3)", url: "https://www.ic3.gov/" },
      { label: "Cameroon ANTIC", url: "https://www.antic.cm/" },
    ],
    readingMinutes: 5,
    publishedAt: "2026-11-10",
    updatedAt: "2026-11-20",
    imageUrl: "",
  },
];

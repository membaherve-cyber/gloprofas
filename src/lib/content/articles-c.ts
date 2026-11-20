/**
 * GLOPROFAS Resource Centre — Category C articles.
 * Social engineering and personal scams: romance, impersonation, family
 * emergency, WhatsApp, social media, fake jobs, scholarships, lotteries.
 * All user-facing text is bilingual (EN/FR). Reference URLs verified live.
 */
import type { Article } from "./resource-centre-types";

export const ARTICLES_C: Article[] = [
  /* ------------------------------------------------------------------ */
  /* 1 — Romance scams                                                   */
  /* ------------------------------------------------------------------ */
  {
    slug: "romance-scams-recognising-emotional-manipulation",
    categorySlug: "social-engineering",
    title: {
      en: "Romance Scams: Recognising Emotional Manipulation",
      fr: "Escroqueries sentimentales : reconnaître la manipulation émotionnelle",
    },
    metaDescription: {
      en: "Learn how romance scammers build fake online relationships to steal money. Spot the warning signs, protect yourself, and know what to do if it happens.",
      fr: "Découvrez comment les escrocs montent de fausses relations amoureuses pour voler de l’argent. Repérez les signes d’alerte et sachez réagir.",
    },
    summary: {
      en: "Romance scams use affection, attention and patience to build false trust before money is requested. This guide explains how these scams work, the warning signs to watch for, and how to protect yourself and recover.",
      fr: "Les escroqueries sentimentales exploitent l’affection et la confiance pour extorquer de l’argent. Ce guide explique leur fonctionnement, les signes qui doivent alerter et les mesures de protection et de réaction.",
    },
    what: {
      en: "A romance scam is a fraud in which a criminal creates a false romantic identity online and cultivates a genuine-seeming relationship over weeks or months. Once emotional trust is established, the scammer invents crises, investments or travel costs and persuades the victim to send money repeatedly.",
      fr: "Une escroquerie sentimentale est une fraude dans laquelle un criminel crée une fausse identité amoureuse en ligne et entretient une relation qui semble authentique pendant des semaines ou des mois. Une fois la confiance établie, il invente des urgences, des investissements ou des frais de voyage pour soutirer de l’argent.",
    },
    how: {
      en: "The scam usually begins on a dating app, a social network or WhatsApp, with a polished profile: attractive photos, a believable job such as engineer, doctor or soldier, and a story that explains why video calls are impossible. Early messages are warm, attentive and constant — good morning texts, questions about your day, patient listening. Over several weeks the scammer studies your hopes and mirrors them back. When the bond feels solid, a crisis appears: a frozen bank account, a customs fee for a shipped package, or an investment opportunity. Requests start small, then grow. Guilt follows hesitation, and the cycle repeats until the victim has nothing left to give.",
      fr: "L’escroquerie commence souvent sur une application de rencontre, un réseau social ou WhatsApp, avec un profil soigné : photos flatteuses, métier crédible (ingénieur, médecin, militaire) et histoire expliquant pourquoi les appels vidéo sont impossibles. Les premiers messages sont chaleureux et constants. En quelques semaines, l’escroc étudie vos espoirs et les reflète. Quand le lien semble solide, une urgence surgit : compte bloqué, frais de douane pour un colis ou opportunité d’investissement. Les demandes commencent petites, puis grossissent, et la culpabilité suit chaque hésitation.",
    },
    warningSigns: [
      {
        en: "The person declares strong feelings within days, before ever meeting you.",
        fr: "La personne déclare des sentiments forts en quelques jours, sans vous avoir jamais rencontré.",
      },
      {
        en: "They always have an excuse to avoid video calls or in-person meetings.",
        fr: "Elle trouve toujours une excuse pour éviter les appels vidéo ou les rencontres en personne.",
      },
      {
        en: "Their job keeps them far away — an oil rig, a ship or a military mission.",
        fr: "Son métier l’oblige à travailler loin : plateforme pétrolière, navire ou mission militaire.",
      },
      {
        en: "A crisis appears suddenly: hospital bills, customs fees or frozen accounts.",
        fr: "Une urgence surgit soudain : frais d’hôpital, frais de douane ou compte bancaire bloqué.",
      },
      {
        en: "They ask you to receive or forward money, parcels or documents for them.",
        fr: "Elle vous demande de recevoir ou de transférer argent, colis ou documents pour son compte.",
      },
      {
        en: "Guilt, pressure or elaborate excuses follow every hesitation you show.",
        fr: "Chaque hésitation de votre part déclenche culpabilisation, pression ou excuses élaborées.",
      },
      {
        en: "They discourage you from discussing the relationship with family or friends.",
        fr: "Elle vous déconseille de parler de cette relation à votre famille ou à vos amis.",
      },
    ],
    example: {
      en: "Illustrative example: Aminata, a 42-year-old teacher in Douala, meets “Marc”, a French engineer working on a ship, on Facebook. After two months of daily messages he mentions a lucrative gold deal in Ghana and asks her to cover a 400,000 FCFA customs fee, promising repayment plus profit. She sends the money via mobile money; the requests then continue.",
      fr: "Exemple illustratif : Aminata, enseignante de 42 ans à Douala, fait la connaissance de « Marc », ingénieur français en mission sur un navire, sur Facebook. Après deux mois de messages quotidiens, il évoque une affaire d’or au Ghana et lui demande de régler 400 000 FCFA de frais de douane, remboursés avec bénéfice. Elle envoie l’argent via mobile money ; les demandes continuent.",
    },
    protect: [
      {
        en: "Treat online relationships with healthy caution until you have met the person face to face.",
        fr: "Abordez toute relation en ligne avec prudence tant que vous n’avez pas rencontré la personne.",
      },
      {
        en: "Insist on a live video call early; repeated excuses are a serious red flag.",
        fr: "Exigez un appel vidéo tôt dans la relation ; les excuses répétées sont un signal grave.",
      },
      {
        en: "Never send money, gift cards or airtime to someone you have not met in person.",
        fr: "N’envoyez jamais d’argent, de cartes cadeaux ou de crédit à quelqu’un que vous n’avez pas rencontré.",
      },
      {
        en: "Reverse-search their profile photos to check whether they belong to someone else.",
        fr: "Faites une recherche inversée de ses photos pour vérifier si elles appartiennent à quelqu’un d’autre.",
      },
      {
        en: "Talk about the relationship with a trusted friend or relative before any money is involved.",
        fr: "Parlez de la relation à un proche de confiance avant que l’argent n’entre en jeu.",
      },
      {
        en: "Be extra careful if they introduce investments, crypto schemes or inheritance claims.",
        fr: "Méfiez-vous davantage si elle évoque investissements, cryptomonnaies ou héritages.",
      },
      {
        en: "Keep copies of conversations and payment receipts in case you need to report.",
        fr: "Conservez les conversations et les reçus de paiement au cas où vous devriez signaler.",
      },
      {
        en: "Verify identity documents through official channels — scammers use forged or stolen papers.",
        fr: "Faites vérifier les pièces d’identité par les voies officielles : les escrocs utilisent des documents falsifiés ou volés.",
      },
    ],
    ifVictim: [
      {
        en: "Stop all payments immediately, whatever promises or threats follow.",
        fr: "Interrompez immédiatement tout paiement, quelles que soient les promesses ou les menaces qui suivent.",
      },
      {
        en: "Break off contact and block the scammer on every platform.",
        fr: "Coupez le contact et bloquez l’escroc sur toutes les plateformes.",
      },
      {
        en: "Report to your bank or mobile money provider at once; ask to halt or recall transfers.",
        fr: "Contactez aussitôt votre banque ou votre opérateur de mobile money pour tenter d’arrêter les transferts.",
      },
      {
        en: "Preserve evidence: screenshots, numbers, account names and payment receipts.",
        fr: "Conservez les preuves : captures d’écran, numéros, noms de comptes et reçus de paiement.",
      },
      {
        en: "Report to the police or cybercrime unit and to GLOPROFAS with your evidence.",
        fr: "Signalez les faits à la police ou à l’unité de cybercriminalité, ainsi qu’à GLOPROFAS, avec vos preuves.",
      },
      {
        en: "Seek emotional support — being deceived hurts, and shame should not keep you silent.",
        fr: "Cherchez un soutien moral : être trompé fait souffrir, et la honte ne doit pas vous réduire au silence.",
      },
    ],
    reportTo: [
      {
        en: "Your bank or mobile money provider (MTN MoMo, Orange Money) via its official app or hotline — immediately.",
        fr: "Votre banque ou votre opérateur de mobile money (MTN MoMo, Orange Money) via son application ou sa ligne officielle, immédiatement.",
      },
      {
        en: "Your national police or cybercrime unit (for example ANTIC in Cameroon) with your evidence.",
        fr: "La police nationale ou l’unité de cybercriminalité (par exemple l’ANTIC au Cameroun), avec vos preuves.",
      },
      {
        en: "GLOPROFAS through our online report form — we can guide you on next steps.",
        fr: "GLOPROFAS, via notre formulaire de signalement en ligne, pour être guidé dans les prochaines étapes.",
      },
      {
        en: "The dating app or social network where the profile appeared, so the account gets removed.",
        fr: "L’application de rencontre ou le réseau social où le profil est apparu, afin de faire supprimer le compte.",
      },
    ],
    keyTakeaway: {
      en: "Falling for a romance scam is not naivety — these are skilled criminals trained in psychological manipulation. Genuine partners never demand money, gift cards or secrecy.",
      fr: "Être victime d’une escroquerie sentimentale n’est pas de la naïveté : ce sont des criminels habiles, rompus à la manipulation psychologique. Un vrai partenaire ne réclame jamais d’argent.",
    },
    relatedSlugs: [
      "how-to-recognise-and-avoid-online-scams",
      "impersonation-scams-someone-you-trust",
      "online-extortion-and-blackmail-scams",
    ],
    checklistSlug: "romance-scam-warning-signs",
    references: [
      { label: "Europol — European Union Agency for Law Enforcement Cooperation", url: "https://www.europol.europa.eu/" },
      { label: "FBI Internet Crime Complaint Center (IC3) — United States", url: "https://www.ic3.gov/" },
      { label: "ANTIC — national ICT agency, Cameroon", url: "https://www.antic.cm/" },
    ],
    readingMinutes: 7,
    publishedAt: "2026-08-20",
    updatedAt: "2026-11-20",
    featured: true,
    popular: true,
    imageUrl: "",
  },

  /* ------------------------------------------------------------------ */
  /* 2 — Impersonation scams                                             */
  /* ------------------------------------------------------------------ */
  {
    slug: "impersonation-scams-someone-you-trust",
    categorySlug: "social-engineering",
    title: {
      en: "Impersonation Scams: When Criminals Pretend to Be Someone You Trust",
      fr: "Usurpation d’identité : quand des criminels se font passer pour quelqu’un de confiance",
    },
    metaDescription: {
      en: "Criminals pose as relatives, bosses, bank staff or officials to steal money and data. Learn the tricks used and how to verify who is really contacting you.",
      fr: "Des criminels se font passer pour un proche, un patron ou un agent bancaire pour voler argent et données. Apprenez à vérifier qui vous contacte vraiment.",
    },
    summary: {
      en: "Impersonation scams work because trust is borrowed: a criminal poses as your relative, your boss, your bank or a government official. This article explains the techniques used and how to verify who you are really talking to.",
      fr: "Les escroqueries par usurpation d’identité empruntent la confiance d’autrui : un criminel se fait passer pour un proche, un patron, une banque ou une administration. Voici les techniques utilisées et comment vérifier à qui vous parlez.",
    },
    what: {
      en: "Impersonation is the foundation of most fraud: the criminal pretends to be a person or organisation you already trust — a family member, an employer, a bank agent, a police officer or a delivery company — and uses that borrowed credibility to make you hand over money, codes or personal information.",
      fr: "L’usurpation d’identité est à la base de la plupart des fraudes : le criminel se fait passer pour une personne ou une organisation en qui vous avez déjà confiance — un proche, un employeur, un agent bancaire, un policier ou un livreur — et exploite cette crédibilité empruntée pour obtenir de l’argent, des codes ou des données personnelles.",
    },
    how: {
      en: "The scammer first gathers information: names harvested from social media, a company structure copied from LinkedIn, or a real voice sampled from a short call. They then make contact through a new number, a look-alike email address or a cloned profile, always with a plausible reason — a changed phone, an urgent file, a security check. Pressure does the rest: an emergency, a deadline, or a request for secrecy so you cannot double-check. Modern tools make the illusion stronger, with cloned voices and altered photos, but the defence remains the same — verify through a channel you chose yourself, using a number you already had.",
      fr: "L’escroc collecte d’abord des informations : des noms issus des réseaux sociaux, l’organigramme d’une entreprise copié depuis LinkedIn, ou une voix authentique captée lors d’un bref appel. Il prend ensuite contact via un nouveau numéro, une adresse e-mail presque identique ou un profil cloné, toujours avec une raison plausible : téléphone changé, dossier urgent, contrôle de sécurité. La pression fait le reste — urgence, échéance ou demande de secret. Les outils modernes (voix clonées, photos retouchées) renforcent l’illusion, mais la défense reste la même : vérifiez par un canal que vous choisissez vous-même, avec un numéro que vous aviez déjà.",
    },
    warningSigns: [
      {
        en: "A “familiar” person contacts you from a new number with an urgent request.",
        fr: "Une personne « connue » vous contacte depuis un nouveau numéro avec une demande urgente.",
      },
      {
        en: "They ask you to keep the conversation secret from family or colleagues.",
        fr: "Elle vous demande de garder la conversation secrète, même vis-à-vis de votre famille.",
      },
      {
        en: "Bank staff or officials phone you first, then press for codes or transfers.",
        fr: "La banque ou une administration vous appelle d’abord, puis insiste pour obtenir codes ou virements.",
      },
      {
        en: "The message creates panic — an accident, an arrest, a hacked account — then pushes payment.",
        fr: "Le message crée la panique — accident, arrestation, compte piraté — puis pousse au paiement.",
      },
      {
        en: "The email address or profile name is slightly misspelt or uses an odd domain.",
        fr: "L’adresse e-mail ou le nom du profil est légèrement mal orthographié ou utilise un domaine étrange.",
      },
      {
        en: "They refuse any callback on the number you already have for them.",
        fr: "La personne refuse tout rappel sur le numéro que vous avez déjà pour elle.",
      },
      {
        en: "Payment is rushed to an account or mobile wallet you have never used before.",
        fr: "Le paiement est précipité vers un compte ou un portefeuille mobile jamais utilisé auparavant.",
      },
    ],
    example: {
      en: "Illustrative example: Kwame receives a WhatsApp message from “Uncle Desmond”, whose account was cloned after a phishing link. The “uncle” says he is travelling and urgently needs 150,000 FCFA for a ticket, asking Kwame to send it via mobile money before calling later. A quick call to Desmond’s known number reveals the fraud.",
      fr: "Exemple illustratif : Kwame reçoit un message WhatsApp de « l’oncle Desmond », dont le compte a été cloné via un lien de phishing. Le « oncle » dit voyager et avoir besoin de 150 000 FCFA pour un billet, et demande un envoi urgent par mobile money. Un simple appel au numéro habituel de Desmond révèle la fraude.",
    },
    protect: [
      {
        en: "Agree a family “safe word” or verification question known only to close relatives.",
        fr: "Convenez d’un « mot de passe » familial ou d’une question de vérification connue des seuls proches.",
      },
      {
        en: "Always call back on the number you already have before acting on any request.",
        fr: "Rappelez toujours le numéro que vous connaissez déjà avant d’agir sur une demande.",
      },
      {
        en: "Never share one-time codes, PINs or full card details with anyone who contacts you.",
        fr: "Ne partagez jamais codes à usage unique, codes PIN ou données bancaires complètes avec un interlocuteur qui vous contacte.",
      },
      {
        en: "Remember that real bank staff and officials never ask for transfers to “safe accounts”.",
        fr: "Rappelez-vous que les vrais agents bancaires et officiels ne demandent jamais de virement vers un « compte sécurisé ».",
      },
      {
        en: "Check email addresses character by character, especially the domain after the @.",
        fr: "Vérifiez les adresses e-mail caractère par caractère, surtout le domaine après le @.",
      },
      {
        en: "Limit what you publish publicly about family, employers and routines on social media.",
        fr: "Limitez ce que vous publiez sur votre famille, vos employeurs et vos habitudes sur les réseaux sociaux.",
      },
      {
        en: "Verify unexpected delivery, customs or fine notifications on the official website or app.",
        fr: "Vérifiez tout avis de livraison, de douane ou d’amende sur le site ou l’application officiels.",
      },
      {
        en: "Slow down: urgency is a technique, not a reason.",
        fr: "Ralentissez : l’urgence est une technique, pas une raison.",
      },
    ],
    ifVictim: [
      {
        en: "Stop transfers immediately and contact your bank or mobile money provider’s official hotline.",
        fr: "Stoppez les virements et contactez immédiatement la ligne officielle de votre banque ou de votre opérateur de mobile money.",
      },
      {
        en: "Warn the real person whose identity was used, so they can alert their contacts.",
        fr: "Prévenez la personne dont l’identité a été usurpée, pour qu’elle alerte ses contacts.",
      },
      {
        en: "Collect evidence: numbers, screenshots, account details and transaction receipts.",
        fr: "Rassemblez les preuves : numéros, captures d’écran, coordonnées bancaires et reçus de transaction.",
      },
      {
        en: "Report to the police or national cybercrime unit with your evidence.",
        fr: "Signalez à la police ou à l’unité nationale de cybercriminalité avec vos preuves.",
      },
      {
        en: "Report to GLOPROFAS so we can advise you and warn others.",
        fr: "Signalez à GLOPROFAS afin que nous puissions vous conseiller et alerter les autres.",
      },
      {
        en: "If codes were shared, change passwords and PINs on all affected accounts.",
        fr: "Si des codes ont été partagés, changez immédiatement mots de passe et codes PIN des comptes concernés.",
      },
    ],
    reportTo: [
      {
        en: "Your bank or mobile money provider via its official app, hotline or branch.",
        fr: "Votre banque ou opérateur de mobile money, via son application, sa ligne officielle ou son agence.",
      },
      {
        en: "Your national police or cybercrime unit (for example ANTIC in Cameroon).",
        fr: "La police nationale ou l’unité de cybercriminalité (par exemple l’ANTIC au Cameroun).",
      },
      {
        en: "GLOPROFAS through our online report form for guidance and community alerts.",
        fr: "GLOPROFAS, via notre formulaire de signalement en ligne, pour des conseils et des alertes communautaires.",
      },
      {
        en: "The platform (WhatsApp, Facebook, email provider) used by the impersonator.",
        fr: "La plateforme utilisée par l’escroc (WhatsApp, Facebook, fournisseur de messagerie).",
      },
    ],
    keyTakeaway: {
      en: "Impersonation is defeated by one habit: verify through a channel you choose yourself. Call the known number before you pay, share codes or act on urgency.",
      fr: "L’usurpation d’identité se déjoue par un seul réflexe : vérifier par un canal que vous choisissez vous-même. Rappelez le numéro connu avant de payer ou de communiquer un code.",
    },
    relatedSlugs: [
      "smishing-and-vishing-sms-telephone-scams",
      "how-to-recognise-fake-bank-representatives",
      "artificial-intelligence-and-deepfake-scams",
    ],
    checklistSlug: "general-scam-prevention",
    references: [
      { label: "FBI Internet Crime Complaint Center (IC3) — United States", url: "https://www.ic3.gov/" },
      { label: "Europol — European Union Agency for Law Enforcement Cooperation", url: "https://www.europol.europa.eu/" },
      { label: "ScamShield — national anti-scam initiative, Singapore", url: "https://www.scamshield.gov.sg/" },
    ],
    readingMinutes: 5,
    publishedAt: "2026-08-27",
    updatedAt: "2026-11-20",
    imageUrl: "",
  },

  /* ------------------------------------------------------------------ */
  /* 3 — Family emergency / grandparent scams                            */
  /* ------------------------------------------------------------------ */
  {
    slug: "family-emergency-and-grandparent-scams",
    categorySlug: "social-engineering",
    title: {
      en: "Family Emergency and Grandparent Scams",
      fr: "Fausses urgences familiales et arnaque du « faux petit-fils »",
    },
    metaDescription: {
      en: "A “relative” in trouble needs money now: family emergency scams exploit love and panic. Learn the typical script and the reflexes that stop the fraud.",
      fr: "Un « proche » en difficulté réclame de l’argent immédiatement. Découvrez le scénario de ces fausses urgences et les réflexes qui déjouent la fraude.",
    },
    summary: {
      en: "A trembling voice, an accident, an arrest — and an urgent request for money. Family emergency scams, including the classic grandparent scam, exploit love and panic. Learn the typical script and the reflexes that stop it.",
      fr: "Une voix tremblante, un accident, une arrestation — et une demande urgente d’argent. Les fausses urgences familiales, dont l’arnaque du faux petit-fils, exploitent l’amour et la panique. Voici le scénario type et les bons réflexes.",
    },
    what: {
      en: "A family emergency scam is a phone or messaging fraud in which criminals pretend that a relative — often a child or grandchild — is in serious trouble: an accident, an arrest, a hospital bill or a border problem. Panic replaces judgement, and the victim pays quickly to “help”, often by mobile money.",
      fr: "L’arnaque de la fausse urgence familiale est une fraude téléphonique ou par messages dans laquelle des criminels prétendent qu’un proche — souvent un enfant ou un petit-enfant — est en difficulté grave : accident, arrestation, facture d’hôpital ou problème de frontière. La panique remplace le jugement, et la victime paie rapidement pour « aider », souvent par mobile money.",
    },
    how: {
      en: "The call often starts with an open question — “Do you know whose voice this is?” — so the victim supplies the grandchild’s name themselves. A second voice may join as a “police officer” or “lawyer”, adding authority and urgency: bail money, hospital fees or a customs fine, needed within the hour. The “relative” begs you not to tell the parents. Payment is demanded through hard-to-trace channels — mobile money, gift cards or a courier collecting cash. The same script now spreads through WhatsApp voice notes and cloned numbers, so even a recognisable voice is no proof.",
      fr: "L’appel commence souvent par une question ouverte — « Reconnaissez-vous ma voix ? » — si bien que la victime donne elle-même le nom de son petit-enfant. Une seconde voix peut intervenir en tant que « policier » ou « avocat », ajoutant autorité et urgence : caution, frais d’hôpital ou amende douanière, à régler dans l’heure. Le « proche » supplie de ne rien dire aux parents. Le paiement passe par des canaux difficiles à tracer : mobile money, cartes cadeaux ou coursier. Le même scénario circule désormais par notes vocales WhatsApp et numéros clonés.",
    },
    warningSigns: [
      {
        en: "The caller begins with “Guess who this is?” instead of stating a name.",
        fr: "L’appelant commence par « Devine qui parle ? » au lieu de se nommer.",
      },
      {
        en: "A new number claims your child or grandchild broke their phone.",
        fr: "Un nouveau numéro prétend que votre enfant a cassé son téléphone.",
      },
      {
        en: "An official-sounding “lawyer” or “officer” demands immediate payment to avoid arrest.",
        fr: "Un faux « avocat » ou « policier » exige un paiement immédiat pour éviter l’arrestation.",
      },
      {
        en: "You are asked to keep the incident secret from the parents “to protect” them.",
        fr: "On vous demande de garder l’incident secret des parents, « pour les protéger ».",
      },
      {
        en: "Payment is pushed through mobile money, gift cards or a cash courier.",
        fr: "Le paiement est exigé par mobile money, cartes cadeaux ou coursier en espèces.",
      },
      {
        en: "Line quality is poor and the “relative” hands the phone to someone else quickly.",
        fr: "La ligne est mauvaise et le « proche » passe vite le téléphone à quelqu’un d’autre.",
      },
      {
        en: "The story changes when you ask precise questions about places or people.",
        fr: "L’histoire change lorsque vous posez des questions précises sur les lieux ou les personnes.",
      },
    ],
    example: {
      en: "Illustrative example: Nadège, a retired nurse in Yaoundé, gets a call from a weeping “grandson” who says he hit a pedestrian while driving in Douala. A “lawyer” explains that 800,000 FCFA is needed tonight to avoid detention. Nadège calls her daughter on the family’s usual number and learns the boy is at school, unharmed.",
      fr: "Exemple illustratif : Nadège, infirmière retraitée à Yaoundé, reçoit un appel d’un « petit-fils » en pleurs qui affirme avoir renversé un piéton à Douala. Un « avocat » explique que 800 000 FCFA sont nécessaires dès ce soir pour éviter la détention. Nadège appelle sa fille au numéro habituel : le garçon est sain et sauf à l’école.",
    },
    protect: [
      {
        en: "Agree a family verification question or code word known only to close relatives.",
        fr: "Convenez d’une question de vérification ou d’un mot de code familial connu des seuls proches.",
      },
      {
        en: "Always hang up and call the relative back on their usual, saved number.",
        fr: "Raccrochez et rappelez toujours le proche sur son numéro habituel, enregistré.",
      },
      {
        en: "Keep a family contact sheet so you can check with parents, siblings or schools.",
        fr: "Gardez une fiche de contacts familiaux pour vérifier auprès des parents, frères et sœurs ou de l’école.",
      },
      {
        en: "Never decide about money while panicking — real emergencies survive a ten-minute check.",
        fr: "Ne décidez jamais d’un paiement dans la panique : une vraie urgence supporte dix minutes de vérification.",
      },
      {
        en: "Treat “don’t tell the parents” as a red flag, whatever the story.",
        fr: "Considérez « ne rien dire aux parents » comme un signal d’alarme, quelle que soit l’histoire.",
      },
      {
        en: "Be sceptical of “bail”, “fines” or “customs fees” demanded by phone.",
        fr: "Méfiez-vous des « cautions », « amendes » ou « frais de douane » exigés par téléphone.",
      },
      {
        en: "Explain this scam to older relatives — they are the preferred targets.",
        fr: "Expliquez cette arnaque aux personnes âgées de votre entourage : elles sont les cibles privilégiées.",
      },
      {
        en: "Never pay a courier or stranger sent to collect cash on someone’s behalf.",
        fr: "Ne payez jamais un coursier ou un inconnu venu collecter de l’argent pour le compte d’autrui.",
      },
    ],
    ifVictim: [
      {
        en: "Call your bank or mobile money provider immediately and ask to block or reverse the transfer.",
        fr: "Appelez immédiatement votre banque ou opérateur de mobile money et demandez le blocage ou le rappel du transfert.",
      },
      {
        en: "Alert the real family member whose name was used, and their close contacts.",
        fr: "Alertez le vrai membre de la famille dont le nom a été utilisé, ainsi que ses proches.",
      },
      {
        en: "Save all evidence: numbers, call times, voice notes, account names, receipts.",
        fr: "Conservez toutes les preuves : numéros, horaires d’appels, notes vocales, noms de comptes, reçus.",
      },
      {
        en: "Report to the police or cybercrime unit even for small amounts — patterns help investigations.",
        fr: "Signalez à la police ou à l’unité de cybercriminalité, même pour de petits montants : les récurrences aident les enquêtes.",
      },
      {
        en: "Report to GLOPROFAS so other families can be warned quickly.",
        fr: "Signalez à GLOPROFAS pour que d’autres familles soient alertées rapidement.",
      },
      {
        en: "Talk about what happened without shame; silence protects only the scammers.",
        fr: "Parlez de ce qui vous arrive sans honte : le silence ne protège que les escrocs.",
      },
    ],
    reportTo: [
      {
        en: "Your bank or mobile money provider’s official fraud line, as soon as possible.",
        fr: "La ligne officielle anti-fraude de votre banque ou opérateur de mobile money, dès que possible.",
      },
      {
        en: "Your national police or cybercrime unit with call and payment records.",
        fr: "La police nationale ou l’unité de cybercriminalité, avec les relevés d’appels et de paiements.",
      },
      {
        en: "GLOPROFAS via our report form — we can help you act and alert the community.",
        fr: "GLOPROFAS, via notre formulaire de signalement, pour être aidé et alerter la communauté.",
      },
      {
        en: "Your telecom operator, to report the fraudulent number used.",
        fr: "Votre opérateur téléphonique, pour signaler le numéro frauduleux utilisé.",
      },
    ],
    keyTakeaway: {
      en: "No emergency survives a five-minute verification call. Hang up, call the family member on their usual number, and never pay to “help” before checking.",
      fr: "Aucune urgence ne résiste à un appel de vérification de cinq minutes. Raccrochez, rappelez le proche sur son numéro habituel, et ne payez jamais avant d’avoir vérifié.",
    },
    relatedSlugs: [
      "impersonation-scams-someone-you-trust",
      "whatsapp-scams-common-tricks",
      "sim-swap-fraud-hijacked-phone-number",
    ],
    checklistSlug: "family-digital-safety",
    references: [
      { label: "Canadian Anti-Fraud Centre (CAFC)", url: "https://www.antifraudcentre-centreantifraude.ca/" },
      { label: "FBI Internet Crime Complaint Center (IC3) — United States", url: "https://www.ic3.gov/" },
      { label: "Europol — European Union Agency for Law Enforcement Cooperation", url: "https://www.europol.europa.eu/" },
    ],
    readingMinutes: 5,
    publishedAt: "2026-09-10",
    updatedAt: "2026-11-20",
    imageUrl: "",
  },

  /* ------------------------------------------------------------------ */
  /* 4 — WhatsApp scams                                                  */
  /* ------------------------------------------------------------------ */
  {
    slug: "whatsapp-scams-common-tricks",
    categorySlug: "social-engineering",
    title: {
      en: "WhatsApp Scams: Common Tricks and How to Avoid Them",
      fr: "Arnaques WhatsApp : les pièges les plus courants et comment les éviter",
    },
    metaDescription: {
      en: "Hijacked accounts, fake relatives, bogus sellers and phishing links: learn the most common WhatsApp scams and how to protect your account and your money.",
      fr: "Comptes détournés, faux proches, vendeurs fantômes et liens de phishing : les arnaques WhatsApp courantes et comment protéger votre compte.",
    },
    summary: {
      en: "WhatsApp is where African families talk, trade and send money — and scammers know it. This guide covers the most common tricks, from hijacked accounts to fake sellers, and how to secure your chats.",
      fr: "WhatsApp est l’outil privilégié des familles africaines pour discuter, commercer et envoyer de l’argent — et les escrocs le savent. Voici les pièges les plus courants et les moyens de sécuriser vos conversations.",
    },
    what: {
      en: "WhatsApp scams are frauds carried out inside the messaging app itself. Criminals hijack or clone accounts, impersonate relatives or officials, spread fake job and investment offers, and push phishing links designed to steal verification codes, banking details or money transferred through mobile money services.",
      fr: "Les arnaques WhatsApp sont des fraudes perpétrées au sein même de l’application de messagerie. Les criminels détournent ou clonent des comptes, usurpent l’identité de proches ou d’agents officiels, diffusent de fausses offres d’emploi ou d’investissement et envoient des liens de phishing destinés à voler codes de vérification, données bancaires ou argent mobile.",
    },
    how: {
      en: "Scammers trick victims into sharing the six-digit verification code, then take over the account and message every contact — “I lost my phone, this is my new number” — before asking for urgent money. In the cloned-account version, a “relative” appears from a new number asking for airtime, a hospital bill or help cashing a transfer. Fake sellers abuse marketplace and business channels, demanding mobile money deposits for goods that never arrive and sending forged payment screenshots to appear honest. Phishing links to “track a parcel” or “claim a prize” complete the picture, all built to capture codes or card details.",
      fr: "Les escrocs poussent les victimes à communiquer le code de vérification à six chiffres, prennent ensuite le contrôle du compte et écrivent à tous les contacts — « J’ai perdu mon téléphone, voici mon nouveau numéro » — avant de demander de l’argent en urgence. Dans la version du compte cloné, un « proche » apparaît depuis un nouveau numéro pour réclamer du crédit téléphonique ou une facture d’hôpital. Les faux vendeurs exigent des acomptes par mobile money pour des marchandises qui n’arrivent jamais, en envoyant de fausses captures d’écran de paiement. Des liens de phishing (« suivre un colis », « gagner un lot ») complètent le tableau.",
    },
    warningSigns: [
      {
        en: "A “relative” messages from a new number with an urgent money request.",
        fr: "Un « proche » écrit depuis un nouveau numéro avec une demande d’argent urgente.",
      },
      {
        en: "Someone pressures you to read out a verification code you just received.",
        fr: "On vous presse de dicter un code de vérification que vous venez de recevoir.",
      },
      {
        en: "A seller demands full payment or a deposit before any goods are delivered.",
        fr: "Un vendeur exige un paiement intégral ou un acompte avant toute livraison.",
      },
      {
        en: "A payment screenshot arrives, but the money never shows in your account.",
        fr: "Une capture d’écran de paiement arrive, mais l’argent n’apparaît jamais sur votre compte.",
      },
      {
        en: "Links promise parcel tracking, prizes, jobs or account “verification”.",
        fr: "Des liens promettent le suivi d’un colis, un lot, un emploi ou une « vérification » du compte.",
      },
      {
        en: "Business accounts offer luxury goods, gold or phones at impossible prices.",
        fr: "Des comptes professionnels proposent produits de luxe, or ou téléphones à prix invraisemblables.",
      },
      {
        en: "The “boss” or “client” asks you to pay a supplier on their behalf.",
        fr: "Le « patron » ou le « client » vous demande de payer un fournisseur pour son compte.",
      },
    ],
    example: {
      en: "Illustrative example: Eric, a shop owner in Douala, receives a WhatsApp message from “sister Akosua”, whose account was hijacked that morning. She urgently asks him to send 250,000 FCFA by mobile money for a hospital bill, promising repayment tomorrow. A voice call to Akosua’s old number confirms her phone and account were stolen.",
      fr: "Exemple illustratif : Éric, commerçant à Douala, reçoit un message WhatsApp de « sa sœur Akosua », dont le compte a été détourné le matin même. Elle lui demande en urgence 250 000 FCFA par mobile money pour une facture d’hôpital, en promettant un remboursement le lendemain. Un appel vocal à l’ancien numéro d’Akosua confirme le vol du téléphone et du compte.",
    },
    protect: [
      {
        en: "Never share your WhatsApp verification code with anyone — not even “support”.",
        fr: "Ne partagez jamais votre code de vérification WhatsApp — pas même avec le « support ».",
      },
      {
        en: "Enable two-step verification in WhatsApp settings with a secure PIN.",
        fr: "Activez la vérification en deux étapes dans les paramètres WhatsApp avec un code PIN solide.",
      },
      {
        en: "Call the person on their known number before sending any money.",
        fr: "Appelez la personne sur son numéro connu avant d’envoyer le moindre argent.",
      },
      {
        en: "Treat “new number” announcements with suspicion until you have verified them.",
        fr: "Traitez les annonces de « nouveau numéro » avec méfiance jusqu’à vérification.",
      },
      {
        en: "Wait to see money in your own account before releasing goods.",
        fr: "Attendez de voir l’argent sur votre propre compte avant de livrer des marchandises.",
      },
      {
        en: "Ignore and report accounts offering implausible prices or guaranteed returns.",
        fr: "Ignorez et signalez les comptes proposant des prix invraisemblables ou des gains garantis.",
      },
      {
        en: "Avoid clicking links in unexpected messages, even from known contacts.",
        fr: "Évitez de cliquer sur les liens de messages inattendus, même venant de contacts connus.",
      },
      {
        en: "Report and block suspicious contacts from within the app so others are warned.",
        fr: "Signalez et bloquez les contacts suspects depuis l’application pour avertir les autres.",
      },
    ],
    ifVictim: [
      {
        en: "If your account was taken over, reinstall WhatsApp and re-register with your number.",
        fr: "Si votre compte a été piraté, réinstallez WhatsApp et réenregistrez-vous avec votre numéro.",
      },
      {
        en: "Alert your contacts quickly so nobody sends money “for you”.",
        fr: "Alertez rapidement vos contacts afin que personne n’envoie d’argent « pour vous ».",
      },
      {
        en: "Enable two-step verification immediately after recovering the account.",
        fr: "Activez immédiatement la vérification en deux étapes après avoir récupéré le compte.",
      },
      {
        en: "If you paid, contact your mobile money provider at once to try to stop the transfer.",
        fr: "Si vous avez payé, contactez aussitôt votre opérateur de mobile money pour tenter de bloquer le transfert.",
      },
      {
        en: "Report the scammer’s number inside WhatsApp and keep screenshots as evidence.",
        fr: "Signalez le numéro de l’escroc dans WhatsApp et conservez les captures d’écran comme preuves.",
      },
      {
        en: "Report to the police or cybercrime unit and to GLOPROFAS.",
        fr: "Signalez à la police ou à l’unité de cybercriminalité, ainsi qu’à GLOPROFAS.",
      },
    ],
    reportTo: [
      {
        en: "Inside WhatsApp — long-press the message, choose Report and Block.",
        fr: "Dans WhatsApp : appui long sur le message, puis « Signaler » et « Bloquer ».",
      },
      {
        en: "Your mobile money provider (MTN MoMo, Orange Money) via its official hotline.",
        fr: "Votre opérateur de mobile money (MTN MoMo, Orange Money) via sa ligne officielle.",
      },
      {
        en: "Your national police or cybercrime unit with the numbers and screenshots.",
        fr: "La police nationale ou l’unité de cybercriminalité, avec les numéros et captures d’écran.",
      },
      {
        en: "GLOPROFAS through our online report form.",
        fr: "GLOPROFAS, via notre formulaire de signalement en ligne.",
      },
    ],
    keyTakeaway: {
      en: "Your WhatsApp verification code is the key to your account and your contacts. Never share it, enable two-step verification, and always call back before sending money.",
      fr: "Votre code de vérification WhatsApp est la clé de votre compte et de vos contacts. Ne le partagez jamais, activez la vérification en deux étapes et rappelez toujours avant d’envoyer de l’argent.",
    },
    relatedSlugs: [
      "smishing-and-vishing-sms-telephone-scams",
      "mobile-money-scams-protect-mtn-momo-orange-money",
      "fake-mobile-money-payment-notifications",
    ],
    checklistSlug: "whatsapp-security",
    references: [
      { label: "ScamShield — national anti-scam initiative, Singapore", url: "https://www.scamshield.gov.sg/" },
      { label: "Europol — European Union Agency for Law Enforcement Cooperation", url: "https://www.europol.europa.eu/" },
      { label: "Cyber Security Authority (CSA) — Ghana", url: "https://csa.gov.gh/" },
    ],
    readingMinutes: 6,
    publishedAt: "2026-09-24",
    updatedAt: "2026-11-20",
    popular: true,
    imageUrl: "",
  },

  /* ------------------------------------------------------------------ */
  /* 5 — Facebook / Instagram / TikTok scams                             */
  /* ------------------------------------------------------------------ */
  {
    slug: "facebook-instagram-tiktok-scams",
    categorySlug: "social-engineering",
    title: {
      en: "Facebook, Instagram and TikTok Scams",
      fr: "Arnaques sur Facebook, Instagram et TikTok",
    },
    metaDescription: {
      en: "Fake shops, cloned profiles, investment gurus and giveaway traps thrive on Facebook, Instagram and TikTok. Learn how these scams work and stay safe.",
      fr: "Fausses boutiques, profils clonés, gourous de l’investissement et faux cadeaux prospèrent sur Facebook, Instagram et TikTok. Apprenez à vous protéger.",
    },
    summary: {
      en: "Social media scams mix real communities with fake identities: cloned profiles, phantom shops, investment “gurus” and rigged giveaways. This article explains how these frauds work on Facebook, Instagram and TikTok — and how to enjoy these platforms safely.",
      fr: "Les arnaques sur les réseaux sociaux mêlent vraies communautés et fausses identités : profils clonés, boutiques fantômes, « gourous » de l’investissement et jeux-concours truqués. Voici comment ces fraudes opèrent sur Facebook, Instagram et TikTok.",
    },
    what: {
      en: "Social media scams are frauds that use Facebook, Instagram or TikTok to reach victims. Criminals create fake profiles and pages, impersonate brands or relatives, run non-existent shops, advertise improbable investments and organise bogus giveaways — then move the conversation towards payments, codes or phishing links.",
      fr: "Les arnaques sur les réseaux sociaux sont des fraudes qui utilisent Facebook, Instagram ou TikTok pour atteindre leurs victimes. Les criminels créent de faux profils et pages, usurpent des marques ou des proches, gèrent des boutiques fantômes, vantent des investissements improbables et organisent de faux jeux-concours, avant d’orienter la conversation vers des paiements ou des liens de phishing.",
    },
    how: {
      en: "On Facebook, criminals clone the profiles of real users — same photo, same name, almost — then send friend requests to their contacts and pitch fake aid programmes or investments. On Instagram, “shops” borrow brand images, take mobile money payments for sneakers or fabrics, then vanish; “forex gurus” flash luxury lifestyles and charge for signal groups that only lose money. On TikTok, short videos promise doubled mobile money, miracle cures or prizes, pushing viewers to comment, share personal details or click bio links. Behind every format lies the same goal: move you off the platform, create urgency, and collect payments or credentials that are almost impossible to recover.",
      fr: "Sur Facebook, des criminels clonent le profil d’utilisateurs réels — même photo, même nom, presque — puis envoient des demandes d’ami à leurs contacts pour vendre de faux programmes d’aide ou d’investissement. Sur Instagram, des « boutiques » empruntent des images de marques, encaissent des paiements mobile money pour des baskets ou des tissus, puis disparaissent. Sur TikTok, des vidéos courtes promettent un mobile money doublé ou des lots, poussant à commenter, à partager ses données ou à cliquer sur le lien en bio. Le but reste le même : vous sortir de la plateforme, créer l’urgence et collecter paiements ou identifiants.",
    },
    warningSigns: [
      {
        en: "A “friend” sends a new request although you are already connected.",
        fr: "Un « ami » envoie une nouvelle demande alors que vous êtes déjà connectés.",
      },
      {
        en: "A shop insists on full payment by mobile money before delivery.",
        fr: "Une boutique exige un paiement intégral par mobile money avant la livraison.",
      },
      {
        en: "An investor or “guru” guarantees daily profits with no risk.",
        fr: "Un investisseur ou « gourou » garantit des profits quotidiens sans risque.",
      },
      {
        en: "A giveaway asks you to pay a “release fee” to claim a prize.",
        fr: "Un jeu-concours exige des « frais de déblocage » pour recevoir le lot.",
      },
      {
        en: "The account was created recently yet has thousands of followers.",
        fr: "Le compte a été créé récemment mais affiche des milliers d’abonnés.",
      },
      {
        en: "Conversations are pushed quickly to WhatsApp, Telegram or direct messages.",
        fr: "La conversation est rapidement déplacée vers WhatsApp, Telegram ou les messages privés.",
      },
      {
        en: "Prices are far below normal market rates for popular goods.",
        fr: "Les prix sont très inférieurs aux prix habituels du marché.",
      },
    ],
    example: {
      en: "Illustrative example: Chidi, a student in Yaoundé, spots an Instagram page selling branded sneakers at a third of the market price. He sends a 60,000 FCFA deposit by mobile money to “reserve” two pairs. The page then disappears, and the “seller’s” account name is reused weeks later for a fake giveaway.",
      fr: "Exemple illustratif : Chidi, étudiant à Yaoundé, repère une page Instagram vendant des baskets de marque au tiers du prix du marché. Il envoie un acompte de 60 000 FCFA par mobile money pour « réserver » deux paires. La page disparaît ensuite, et le nom du « vendeur » ressort des semaines plus tard pour un faux jeu-concours.",
    },
    protect: [
      {
        en: "Check account age, history and reviews before buying from any social media shop.",
        fr: "Vérifiez l’ancienneté du compte, son historique et les avis avant d’acheter sur un réseau social.",
      },
      {
        en: "Prefer payment on delivery or escrow; avoid full prepayment to strangers.",
        fr: "Préférez le paiement à la livraison ou un système séquestre ; évitez tout prépaiement intégral à un inconnu.",
      },
      {
        en: "Verify a second “friend” request by calling the person before accepting.",
        fr: "Vérifiez une seconde demande d’« ami » en appelant la personne avant d’accepter.",
      },
      {
        en: "Never send codes, PINs or ID documents in direct messages.",
        fr: "N’envoyez jamais codes, PIN ou pièces d’identité par messages privés.",
      },
      {
        en: "Assume that guaranteed profits, doubled money and “risk-free” trading are scams.",
        fr: "Considérez que profits garantis, argent doublé et trading « sans risque » sont des arnaques.",
      },
      {
        en: "Keep profiles private and limit personal details visible to strangers.",
        fr: "Gardez vos profils privés et limitez les informations personnelles visibles des inconnus.",
      },
      {
        en: "Report scam accounts to the platform instead of just ignoring them.",
        fr: "Signalez les comptes frauduleux à la plateforme au lieu de simplement les ignorer.",
      },
      {
        en: "Talk to teenagers about fake giveaways, fan prizes and “influencer” offers.",
        fr: "Parlez aux adolescents des faux cadeaux, prix de fans et offres d’« influenceurs ».",
      },
    ],
    ifVictim: [
      {
        en: "Stop payments and contact your bank or mobile money provider immediately.",
        fr: "Stoppez les paiements et contactez immédiatement votre banque ou opérateur de mobile money.",
      },
      {
        en: "Report and block the fraudulent account on the platform.",
        fr: "Signalez et bloquez le compte frauduleux sur la plateforme.",
      },
      {
        en: "Save screenshots of the page, conversations, payment receipts and account names.",
        fr: "Enregistrez des captures d’écran de la page, des conversations, des reçus et des noms de comptes.",
      },
      {
        en: "If your own account was cloned, alert your contacts and secure your logins.",
        fr: "Si votre propre compte a été cloné, alertez vos contacts et sécurisez vos accès.",
      },
      {
        en: "Report to your national cybercrime unit and to GLOPROFAS.",
        fr: "Signalez à votre unité nationale de cybercriminalité et à GLOPROFAS.",
      },
      {
        en: "Change passwords on any account that shared the same password.",
        fr: "Changez les mots de passe de tout compte partageant le même mot de passe.",
      },
    ],
    reportTo: [
      {
        en: "The platform itself — Facebook, Instagram and TikTok have in-app reporting for scam accounts.",
        fr: "La plateforme elle-même : Facebook, Instagram et TikTok proposent un signalement intégré des comptes frauduleux.",
      },
      {
        en: "Your bank or mobile money provider through its official channels.",
        fr: "Votre banque ou opérateur de mobile money, via ses canaux officiels.",
      },
      {
        en: "Your national police or cybercrime unit with your evidence.",
        fr: "La police nationale ou l’unité de cybercriminalité, avec vos preuves.",
      },
      {
        en: "GLOPROFAS via our report form so we can alert the community.",
        fr: "GLOPROFAS, via notre formulaire de signalement, pour alerter la communauté.",
      },
    ],
    keyTakeaway: {
      en: "On social media, popularity is not proof. Verify shops, offers and friends through channels you control before paying anyone or sharing documents.",
      fr: "Sur les réseaux sociaux, la popularité n’est pas une preuve. Vérifiez boutiques, offres et « amis » par des canaux que vous contrôlez avant tout paiement.",
    },
    relatedSlugs: [
      "how-to-identify-fake-social-media-accounts",
      "online-marketplace-scams-buy-and-sell-safely",
      "artificial-intelligence-and-deepfake-scams",
    ],
    checklistSlug: "social-media-security",
    references: [
      { label: "ScamShield — national anti-scam initiative, Singapore", url: "https://www.scamshield.gov.sg/" },
      { label: "Cyber Security Authority (CSA) — Ghana", url: "https://csa.gov.gh/" },
      { label: "Europol — European Union Agency for Law Enforcement Cooperation", url: "https://www.europol.europa.eu/" },
    ],
    readingMinutes: 6,
    publishedAt: "2026-10-08",
    updatedAt: "2026-11-20",
    imageUrl: "",
  },

  /* ------------------------------------------------------------------ */
  /* 6 — Fake job offers                                                 */
  /* ------------------------------------------------------------------ */
  {
    slug: "fake-job-offers-and-employment-scams",
    categorySlug: "social-engineering",
    title: {
      en: "Fake Job Offers and Employment Scams",
      fr: "Faux offres d’emploi et arnaques à l’embauche",
    },
    metaDescription: {
      en: "Fake job offers promise easy employment, then charge processing fees or harvest personal data. Learn the warning signs and verify every recruitment.",
      fr: "Les fausses offres d’emploi promettent un emploi facile, puis exigent des frais de dossier ou volent vos données. Apprenez à vérifier chaque recrutement.",
    },
    summary: {
      en: "Unemployment makes job seekers vulnerable to recruitment fraud. Fake offers promise positions abroad or at well-known companies, then charge “processing fees” or steal personal data. Learn to verify every opportunity before you pay or share documents.",
      fr: "Le chômage rend les candidats vulnérables à la fraude au recrutement. Des offres alléchantes promettent des postes à l’étranger ou dans de grandes entreprises, puis exigent des « frais de dossier » ou volent des données personnelles. Apprenez à vérifier avant de payer.",
    },
    what: {
      en: "Employment scams are frauds in which criminals advertise jobs that do not exist — often “abroad”, at sea, or at famous companies — to collect application fees, training costs or personal documents. In some cases victims are also recruited as money mules, receiving and forwarding funds for criminal networks without knowing.",
      fr: "Les arnaques à l’emploi sont des fraudes dans lesquelles des criminels publient des offres d’emploi inexistantes — souvent « à l’étranger », en mer ou dans des sociétés renommées — pour encaisser des frais de candidature, de formation ou obtenir des documents personnels. Certaines victimes servent aussi de « mules » financières, transférant des fonds pour des réseaux criminels sans le savoir.",
    },
    how: {
      en: "The offer usually arrives on WhatsApp, Facebook or by SMS, sometimes with a real company’s logo and a persuasive salary. The “recruiter” skips normal interviews — you are hired almost immediately, without meeting anyone. Then come the charges: a file or processing fee, a medical test, a training kit, uniform costs or “visa and ticket fees” for jobs abroad, each paid by mobile money to a personal number. Some scams never deliver a job at all; others string candidates along with fake start dates. A darker variant uses your real bank account to receive and forward “company funds”, exposing you to legal trouble as a money mule.",
      fr: "L’offre arrive généralement par WhatsApp, Facebook ou SMS, parfois avec le logo d’une vraie entreprise et un salaire alléchant. Le « recruteur » saute les entretiens classiques : vous êtes embauché presque immédiatement, sans rencontrer personne. Viennent ensuite les frais : dossier, test médical, kit de formation, uniforme ou « visa et billet » pour l’étranger, payés par mobile money à un numéro personnel. Certaines arnaques ne mènent à aucun emploi ; d’autres entretiennent l’attente avec de fausses dates de prise de poste. Une variante plus grave utilise votre compte bancaire pour recevoir et transférer des « fonds de l’entreprise », faisant de vous une mule financière.",
    },
    warningSigns: [
      {
        en: "You are offered the job without any real interview or meeting.",
        fr: "On vous propose le poste sans véritable entretien ni rencontre.",
      },
      {
        en: "A “processing fee”, medical test or training kit must be paid upfront.",
        fr: "Des « frais de dossier », un test médical ou un kit de formation doivent être payés d’avance.",
      },
      {
        en: "The recruiter communicates only through WhatsApp or Telegram with a personal number.",
        fr: "Le recruteur ne communique que par WhatsApp ou Telegram, depuis un numéro personnel.",
      },
      {
        en: "The salary is far above market rates for the advertised position.",
        fr: "Le salaire est très supérieur aux taux du marché pour le poste annoncé.",
      },
      {
        en: "The company email uses a free domain or a misspelt version of the real one.",
        fr: "L’e-mail de l’entreprise utilise un domaine gratuit ou mal orthographié.",
      },
      {
        en: "Hiring is “urgent” and you must pay within hours to keep the post.",
        fr: "L’embauche est « urgente » et il faut payer sous quelques heures pour garder le poste.",
      },
      {
        en: "You are asked to receive salaries or funds for other people through your account.",
        fr: "On vous demande de recevoir des salaires ou des fonds pour d’autres sur votre compte.",
      },
    ],
    example: {
      en: "Illustrative example: Mariama, an unemployed graduate in Yaoundé, receives a WhatsApp offer to work for a hotel in Dubai. After a five-minute “interview”, she is asked to pay 350,000 FCFA for visa and ticket “processing”. The recruiter’s number goes offline the day after she sends the money by mobile money.",
      fr: "Exemple illustratif : Mariama, jeune diplômée sans emploi à Yaoundé, reçoit par WhatsApp une offre d’un hôtel de Dubaï. Après un « entretien » de cinq minutes, on lui demande 350 000 FCFA pour les « frais de dossier » du visa et du billet. Le numéro du recruteur devient hors ligne dès le lendemain du paiement par mobile money.",
    },
    protect: [
      {
        en: "Check that the vacancy also appears on the company’s official website or verified pages.",
        fr: "Vérifiez que l’offre figure aussi sur le site web officiel de l’entreprise ou ses pages certifiées.",
      },
      {
        en: "Call the company through its official switchboard to confirm the recruitment.",
        fr: "Appelez l’entreprise via son standard officiel pour confirmer le recrutement.",
      },
      {
        en: "Never pay application, medical, uniform or visa fees to a private number.",
        fr: "Ne payez jamais de frais de candidature, de santé, d’uniforme ou de visa à un numéro privé.",
      },
      {
        en: "Be wary of jobs abroad that skip embassies and official visa procedures.",
        fr: "Méfiez-vous des emplois à l’étranger qui contournent les ambassades et les procédures officielles de visa.",
      },
      {
        en: "Compare the salary with market rates; inflated pay is bait.",
        fr: "Comparez le salaire aux taux du marché : une rémunération gonflée est un appât.",
      },
      {
        en: "Never let anyone route other people’s money through your personal account.",
        fr: "Ne laissez personne faire transiter l’argent d’autrui par votre compte personnel.",
      },
      {
        en: "Guard your ID documents and certificates; send copies only after verifying the employer.",
        fr: "Protégez vos pièces d’identité et diplômes ; n’envoyez des copies qu’après vérification de l’employeur.",
      },
      {
        en: "Research the recruiter’s name, number and email online — victims often warn others.",
        fr: "Recherchez en ligne le nom, le numéro et l’e-mail du recruteur : les victimes préviennent souvent les autres.",
      },
    ],
    ifVictim: [
      {
        en: "Stop all further payments, whatever the recruiter promises or threatens.",
        fr: "Cessez tout paiement, quelles que soient les promesses ou menaces du recruteur.",
      },
      {
        en: "Report the numbers, emails and adverts to your bank or mobile money provider.",
        fr: "Signalez les numéros, e-mails et annonces à votre banque ou opérateur de mobile money.",
      },
      {
        en: "If your ID documents were shared, monitor your accounts and warn your bank.",
        fr: "Si vos pièces d’identité ont été transmises, surveillez vos comptes et prévenez votre banque.",
      },
      {
        en: "Report the job advert to the platform where you found it.",
        fr: "Signalez l’annonce d’emploi sur la plateforme où vous l’avez trouvée.",
      },
      {
        en: "Report to the police or cybercrime unit with all evidence.",
        fr: "Signalez à la police ou à l’unité de cybercriminalité avec toutes vos preuves.",
      },
      {
        en: "Tell GLOPROFAS so other job seekers can be warned.",
        fr: "Prévenez GLOPROFAS pour que d’autres chercheurs d’emploi soient alertés.",
      },
    ],
    reportTo: [
      {
        en: "The platform where the advert appeared (Facebook, WhatsApp, job boards).",
        fr: "La plateforme où l’annonce est apparue (Facebook, WhatsApp, sites d’emploi).",
      },
      {
        en: "Your bank or mobile money provider through its official fraud channels.",
        fr: "Votre banque ou opérateur de mobile money, via ses canaux officiels anti-fraude.",
      },
      {
        en: "Your national police or cybercrime unit, for example ANTIC in Cameroon.",
        fr: "La police nationale ou l’unité de cybercriminalité, par exemple l’ANTIC au Cameroun.",
      },
      {
        en: "GLOPROFAS via our online report form.",
        fr: "GLOPROFAS, via notre formulaire de signalement en ligne.",
      },
    ],
    keyTakeaway: {
      en: "A real employer pays you; it never charges you. Any job that demands fees, rushed payments or access to your bank account is a scam.",
      fr: "Un vrai employeur vous paie ; il ne vous fait jamais payer. Toute offre qui exige des frais ou un accès à votre compte bancaire est une arnaque.",
    },
    relatedSlugs: [
      "recruitment-and-corporate-identity-fraud",
      "identity-theft-and-personal-data-exploitation",
      "how-to-recognise-and-avoid-online-scams",
    ],
    checklistSlug: "job-offer-verification",
    references: [
      { label: "FBI Internet Crime Complaint Center (IC3) — United States", url: "https://www.ic3.gov/" },
      { label: "Europol — European Union Agency for Law Enforcement Cooperation", url: "https://www.europol.europa.eu/" },
      { label: "Cyber Security Authority (CSA) — Ghana", url: "https://csa.gov.gh/" },
    ],
    readingMinutes: 6,
    publishedAt: "2026-10-22",
    updatedAt: "2026-11-20",
    popular: true,
    imageUrl: "",
  },

  /* ------------------------------------------------------------------ */
  /* 7 — Scholarship and education scams                                 */
  /* ------------------------------------------------------------------ */
  {
    slug: "scholarship-and-education-scams",
    categorySlug: "social-engineering",
    title: {
      en: "Scholarship and Education Scams",
      fr: "Arnaques aux bourses d’études et à l’éducation",
    },
    metaDescription: {
      en: "Fake scholarships and study-abroad programmes charge registration fees for awards that never arrive. Verify every educational offer before you pay.",
      fr: "Fausses bourses et programmes d’études à l’étranger : des frais exigés pour des prix qui n’arrivent jamais. Vérifiez chaque offre avant de payer.",
    },
    summary: {
      en: "For families dreaming of education, a scholarship offer can be irresistible bait. Fake foundations, ghost universities and bogus “study abroad” programmes charge fees and vanish with documents. This guide explains how to verify every educational offer.",
      fr: "Pour les familles qui rêvent d’études, une offre de bourse est un appât irrésistible. Faux fondations, universités fantômes et programmes d’études à l’étranger frauduleux encaissent des frais et disparaissent avec vos documents. Voici comment vérifier chaque offre éducative.",
    },
    what: {
      en: "Education scams exploit the hope of schooling: fake scholarships, non-existent grants, diploma mills and bogus admission agents. Victims pay “registration”, “processing” or “facilitation” fees, or hand over certificates and identity documents that are later reused for other frauds such as impersonation or money laundering.",
      fr: "Les arnaques à l’éducation exploitent l’espoir de réussite scolaire : fausses bourses, subventions inexistantes, « universités usines à diplômes » et faux agents d’admission. Les victimes paient des frais « d’inscription », de « dossier » ou de « facilitation », ou remettent certificats et pièces d’identité, réutilisés ensuite pour d’autres fraudes.",
    },
    how: {
      en: "The fraud often starts with an advert, a WhatsApp broadcast or a “scholarship agent” who approaches parents directly. The offer borrows the name of a real foundation or ministry, complete with a professional website and forms. Selection is strangely easy — sometimes “automatic” — and the award letter arrives quickly. Before the money or admission is released, you must pay a modest “registration” or “courier” fee, then further charges follow. Study-abroad variants sell fake admissions, worthless visas or exam “leakage”. Because real scholarships never ask winners for money, any upfront fee is the loudest alarm.",
      fr: "La fraude commence souvent par une publicité, un message diffusé sur WhatsApp ou un « agent de bourse » qui contacte directement les parents. L’offre emprunte le nom d’une vraie fondation ou d’un ministère, avec un site professionnel et des formulaires. La sélection est étrangement facile — parfois « automatique » — et la lettre d’attribution arrive vite. Avant le versement, il faut payer de modestes « frais d’inscription » ou de « livraison », puis d’autres suivent. Les variantes « études à l’étranger » vendent de fausses admissions ou des visas sans valeur. Une vraie bourse ne demande jamais d’argent à ses lauréats.",
    },
    warningSigns: [
      {
        en: "The “scholarship” requires a registration or processing fee before you receive anything.",
        fr: "La « bourse » exige des frais d’inscription ou de dossier avant tout versement.",
      },
      {
        en: "You “won” a grant although you never applied for it.",
        fr: "Vous avez « gagné » une subvention sans jamais avoir postulé.",
      },
      {
        en: "Selection is instant or automatic, with no exam, file review or interview.",
        fr: "La sélection est immédiate ou « automatique », sans examen ni entretien.",
      },
      {
        en: "The “agent” communicates only by WhatsApp and asks for mobile money payments.",
        fr: "L’« agent » ne communique que par WhatsApp et réclame des paiements par mobile money.",
      },
      {
        en: "The foundation or university has no verifiable official website or physical address.",
        fr: "La fondation ou l’université n’a ni site officiel vérifiable ni adresse physique.",
      },
      {
        en: "Deadlines are impossibly short to pressure families into paying quickly.",
        fr: "Les délais sont invraisemblablement courts pour presser les familles de payer.",
      },
      {
        en: "You are asked to send ID documents, certificates or bank details early in the process.",
        fr: "On vous demande tôt vos pièces d’identité, certificats ou coordonnées bancaires.",
      },
    ],
    example: {
      en: "Illustrative example: The parents of Ibrahim, a final-year student in Douala, are contacted by an “agent” for a European foundation offering full scholarships. After a short “file review”, Ibrahim is “selected” and the family pays 120,000 FCFA in registration fees. No scholarship ever arrives, and the agent’s line goes dead.",
      fr: "Exemple illustratif : Les parents d’Ibrahim, élève en classe terminale à Douala, sont contactés par un « agent » d’une fondation européenne offrant des bourses complètes. Après un bref « examen du dossier », Ibrahim est « sélectionné » et la famille paie 120 000 FCFA de frais d’inscription. Aucune bourse n’arrive jamais, et la ligne de l’agent devient muette.",
    },
    protect: [
      {
        en: "Verify scholarships on the official websites of ministries, embassies and universities.",
        fr: "Vérifiez les bourses sur les sites officiels des ministères, ambassades et universités.",
      },
      {
        en: "Remember the golden rule: genuine scholarships never charge winners any fee.",
        fr: "Rappelez-vous la règle d’or : une vraie bourse ne fait jamais payer ses lauréats.",
      },
      {
        en: "Search the foundation’s exact name plus words like “scam” or “arnaque”.",
        fr: "Recherchez le nom exact de la fondation suivi de mots comme « arnaque » ou « scam ».",
      },
      {
        en: "Confirm “agents” with the institution they claim to represent, using official contacts.",
        fr: "Confirmez les « agents » auprès de l’institution qu’ils prétendent représenter, via ses contacts officiels.",
      },
      {
        en: "Treat unsolicited awards and automatic selection as red flags.",
        fr: "Traitez les prix non sollicités et les sélections automatiques comme des signaux d’alarme.",
      },
      {
        en: "Never send original documents; certified copies are enough for genuine processes.",
        fr: "N’envoyez jamais de documents originaux ; des copies certifiées suffisent aux procédures légitimes.",
      },
      {
        en: "For study abroad, use only official embassy visa procedures and accredited institutions.",
        fr: "Pour étudier à l’étranger, n’utilisez que les procédures officielles d’ambassade et les établissements accrédités.",
      },
      {
        en: "Discuss offers with teachers, school counsellors or education offices before paying.",
        fr: "Discutez des offres avec des enseignants, conseillers d’orientation ou services d’éducation avant de payer.",
      },
    ],
    ifVictim: [
      {
        en: "Stop all payments and break contact with the “agent”.",
        fr: "Cessez tout paiement et rompez le contact avec l’« agent ».",
      },
      {
        en: "Alert your bank or mobile money provider and keep transaction receipts.",
        fr: "Alertez votre banque ou opérateur de mobile money et conservez les reçus de transaction.",
      },
      {
        en: "If identity documents were shared, report to authorities to prevent misuse.",
        fr: "Si des pièces d’identité ont été transmises, signalez aux autorités pour éviter toute utilisation frauduleuse.",
      },
      {
        en: "Report the numbers, website and adverts to the police or cybercrime unit.",
        fr: "Signalez les numéros, le site web et les annonces à la police ou à l’unité de cybercriminalité.",
      },
      {
        en: "Notify the real foundation or ministry whose name was used.",
        fr: "Informez la vraie fondation ou le vrai ministère dont le nom a été utilisé.",
      },
      {
        en: "Report to GLOPROFAS so other families can be warned.",
        fr: "Signalez à GLOPROFAS pour que d’autres familles soient alertées.",
      },
    ],
    reportTo: [
      {
        en: "Your national police or cybercrime unit with adverts, messages and payment records.",
        fr: "La police nationale ou l’unité de cybercriminalité, avec annonces, messages et relevés de paiement.",
      },
      {
        en: "Your bank or mobile money provider via its official channels.",
        fr: "Votre banque ou opérateur de mobile money, via ses canaux officiels.",
      },
      {
        en: "The real institution whose name was impersonated, using its official contacts.",
        fr: "La véritable institution dont le nom a été usurpé, via ses contacts officiels.",
      },
      {
        en: "GLOPROFAS through our online report form.",
        fr: "GLOPROFAS, via notre formulaire de signalement en ligne.",
      },
    ],
    keyTakeaway: {
      en: "Genuine scholarships never charge their winners. Any offer that demands fees before delivering an award is a fraud, however convincing the website.",
      fr: "Une vraie bourse ne fait jamais payer ses lauréats. Toute offre exigeant des frais avant l’attribution est une fraude, aussi convaincant que soit le site.",
    },
    relatedSlugs: [
      "fake-job-offers-and-employment-scams",
      "travel-visa-and-immigration-scams",
      "how-to-identify-fake-websites-and-online-stores",
    ],
    checklistSlug: "job-offer-verification",
    references: [
      { label: "Cyber Security Authority (CSA) — Ghana", url: "https://csa.gov.gh/" },
      { label: "ANTIC — national ICT agency, Cameroon", url: "https://www.antic.cm/" },
      { label: "ScamShield — national anti-scam initiative, Singapore", url: "https://www.scamshield.gov.sg/" },
    ],
    readingMinutes: 5,
    publishedAt: "2026-11-05",
    updatedAt: "2026-11-20",
    imageUrl: "",
  },

  /* ------------------------------------------------------------------ */
  /* 8 — Lottery, prize and giveaway scams                               */
  /* ------------------------------------------------------------------ */
  {
    slug: "lottery-prize-and-giveaway-scams",
    categorySlug: "social-engineering",
    title: {
      en: "Lottery, Prize and Giveaway Scams",
      fr: "Faux loteries, prix et jeux-concours : reconnaître les arnaques",
    },
    metaDescription: {
      en: "You cannot win a lottery you never entered. Learn how prize and giveaway scams charge release fees, steal data, and how to protect your money.",
      fr: "On ne gagne pas une loterie à laquelle on n’a pas joué. Faux lots, frais de déblocage, vol de données : apprenez à éviter ces arnaques.",
    },
    summary: {
      en: "A message announces a prize you never competed for — a car, cash, a phone — but first there is a small “fee” to release it. Lottery and giveaway scams are simple, persistent and costly. Learn how they work and how to react.",
      fr: "Un message annonce un lot que vous n’avez jamais gagné — voiture, argent, téléphone — mais il faut d’abord payer de petits « frais » pour le libérer. Les arnaques aux loteries et jeux-concours sont simples et tenaces. Voici comment elles opèrent.",
    },
    what: {
      en: "Lottery and prize scams tell you that you have won money, a car, a phone or a giveaway — in a draw you never entered. To receive the prize, you must first pay “release”, “transfer”, “insurance” or “customs” fees, or provide identity documents and bank details for a prize that never exists.",
      fr: "Les arnaques aux loteries et prix vous annoncent que vous avez gagné de l’argent, une voiture, un téléphone ou un cadeau — dans un tirage auquel vous n’avez jamais participé. Pour recevoir le lot, il faut d’abord payer des frais de « déblocage », de « transfert » ou de « douane », ou fournir pièces d’identité et coordonnées bancaires pour un lot qui n’existe pas.",
    },
    how: {
      en: "The announcement arrives by SMS, WhatsApp, email or a social media comment, naming a real organisation — a telecom operator, a bank, a famous brand or a television game show. The prize feels close: you must “confirm your identity” and pay a modest fee by mobile money so the winnings can be “released” from customs. Once you pay, new fees appear — currency conversion, taxes, a courier — each small enough to seem reasonable. Refusal triggers threats of “losing the prize” or fake legal action. Social media variants ask you to share the post, tag friends and send a message — harvesting engaged victims for the fee request that follows.",
      fr: "L’annonce arrive par SMS, WhatsApp, e-mail ou commentaire sur les réseaux sociaux, souvent au nom d’une vraie organisation : opérateur télécom, banque, marque connue ou jeu télévisé. Le lot semble proche : il suffit de « confirmer son identité » et de payer de modestes frais par mobile money pour que les gains soient « libérés » par la douane. Après le premier paiement, de nouveaux frais apparaissent — conversion, taxes, coursier. Le refus déclenche des menaces de « perte du lot » voire de fausses poursuites. Les variantes sur les réseaux sociaux demandent de partager la publication et de taguer des amis, pour mieux cibler les victimes.",
    },
    warningSigns: [
      {
        en: "You “won” a draw you never entered — or cannot remember entering.",
        fr: "Vous avez « gagné » un tirage auquel vous n’avez jamais participé.",
      },
      {
        en: "A “release fee”, tax or customs charge must be paid before the prize.",
        fr: "Des « frais de déblocage », taxes ou droits de douane sont exigés avant le lot.",
      },
      {
        en: "The message comes from a mobile number, not an official channel.",
        fr: "Le message provient d’un numéro mobile, pas d’un canal officiel.",
      },
      {
        en: "You are asked for ID documents, bank details or a mobile money PIN.",
        fr: "On vous demande vos pièces d’identité, coordonnées bancaires ou code secret mobile money.",
      },
      {
        en: "Urgency and secrecy: claim within hours and “tell no one”.",
        fr: "Urgence et secret : réclamez sous quelques heures et « n’en parlez à personne ».",
      },
      {
        en: "The organisation cannot be found on its real official website.",
        fr: "L’organisation est introuvable sur son véritable site officiel.",
      },
      {
        en: "The prize is delivered by a “courier” who needs payment first.",
        fr: "Le lot est livré par un « coursier » qui exige d’abord un paiement.",
      },
    ],
    example: {
      en: "Illustrative example: Jean-Paul, a mechanic in Douala, receives an SMS saying his number won 2 million FCFA in a telecom promotion. To “activate” the win he must send 45,000 FCFA in “transfer fees” by mobile money. After paying, he is asked for more; the “promotion office” number is blocked a week later.",
      fr: "Exemple illustratif : Jean-Paul, mécanicien à Douala, reçoit un SMS annonçant que son numéro a gagné 2 millions de FCFA à une promotion télécom. Pour « activer » le gain, il doit envoyer 45 000 FCFA de « frais de transfert » par mobile money. Après paiement, d’autres demandes suivent ; le numéro du « bureau de promotion » est bloqué une semaine plus tard.",
    },
    protect: [
      {
        en: "Apply the basic rule: you cannot win a lottery you never entered.",
        fr: "Appliquez la règle de base : on ne gagne pas une loterie à laquelle on n’a pas joué.",
      },
      {
        en: "Check promotions on the organisation’s official website or verified social pages.",
        fr: "Vérifiez les promotions sur le site officiel de l’organisation ou ses pages certifiées.",
      },
      {
        en: "Never pay any fee to receive a prize — genuine winnings never charge you.",
        fr: "Ne payez jamais de frais pour recevoir un lot : un vrai gain ne se facture pas.",
      },
      {
        en: "Never share ID documents, bank details or mobile money codes for a prize.",
        fr: "Ne partagez jamais pièces d’identité, coordonnées bancaires ou codes mobile money pour un lot.",
      },
      {
        en: "Ignore messages mixing big winnings with short deadlines.",
        fr: "Ignorez les messages alliant gros gains et délais très courts.",
      },
      {
        en: "Verify with the company using contacts from its official site, not the message.",
        fr: "Vérifiez auprès de l’entreprise avec les contacts de son site officiel, pas ceux du message.",
      },
      {
        en: "Warn older relatives, who receive many of these calls and messages.",
        fr: "Avertissez les personnes âgées, très ciblées par ces appels et messages.",
      },
      {
        en: "Report fake promotions so the numbers and pages get blocked.",
        fr: "Signalez les fausses promotions pour faire bloquer numéros et pages.",
      },
    ],
    ifVictim: [
      {
        en: "Stop paying immediately — every new fee funds the same fraud.",
        fr: "Cessez immédiatement de payer : chaque nouveau frais nourrit la même fraude.",
      },
      {
        en: "Contact your mobile money provider to report the receiving accounts.",
        fr: "Contactez votre opérateur de mobile money pour signaler les comptes récepteurs.",
      },
      {
        en: "Save the messages, numbers and receipts as evidence.",
        fr: "Conservez messages, numéros et reçus comme preuves.",
      },
      {
        en: "Report to the police or cybercrime unit, even if the amount is small.",
        fr: "Signalez à la police ou à l’unité de cybercriminalité, même pour un petit montant.",
      },
      {
        en: "Notify the real organisation whose promotion was impersonated.",
        fr: "Informez la véritable organisation dont la promotion a été usurpée.",
      },
      {
        en: "Report to GLOPROFAS for guidance and community alerts.",
        fr: "Signalez à GLOPROFAS pour obtenir des conseils et alerter la communauté.",
      },
    ],
    reportTo: [
      {
        en: "Your mobile money provider or bank through its official hotline or app.",
        fr: "Votre opérateur de mobile money ou votre banque, via sa ligne officielle ou son application.",
      },
      {
        en: "Your national police or cybercrime unit with messages and receipts.",
        fr: "La police nationale ou l’unité de cybercriminalité, avec messages et reçus.",
      },
      {
        en: "The impersonated organisation, via its official customer service.",
        fr: "L’organisation usurpée, via son service client officiel.",
      },
      {
        en: "GLOPROFAS through our online report form.",
        fr: "GLOPROFAS, via notre formulaire de signalement en ligne.",
      },
    ],
    keyTakeaway: {
      en: "You cannot win a lottery you never entered, and real prizes never charge release fees. Any upfront payment means the only winner is the scammer.",
      fr: "On ne gagne pas une loterie à laquelle on n’a pas joué, et un vrai lot n’exige jamais de frais de déblocage. Tout paiement d’avance profite uniquement à l’escroc.",
    },
    relatedSlugs: [
      "investment-scams-and-ponzi-schemes",
      "mobile-money-scams-protect-mtn-momo-orange-money",
      "how-to-recognise-and-avoid-online-scams",
    ],
    checklistSlug: "general-scam-prevention",
    references: [
      { label: "Canadian Anti-Fraud Centre (CAFC)", url: "https://www.antifraudcentre-centreantifraude.ca/" },
      { label: "ScamShield — national anti-scam initiative, Singapore", url: "https://www.scamshield.gov.sg/" },
      { label: "ANTIC — national ICT agency, Cameroon", url: "https://www.antic.cm/" },
    ],
    readingMinutes: 5,
    publishedAt: "2026-11-12",
    updatedAt: "2026-11-20",
    imageUrl: "",
  },
];

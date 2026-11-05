export type CategorySeed = {
  slugEn: string;
  slugFr: string;
  nameEn: string;
  nameFr: string;
  summaryEn: string;
  summaryFr: string;
  definitionEn: string;
  definitionFr: string;
  stepsEn: string[];
  stepsFr: string[];
  signsEn: string[];
  signsFr: string[];
  techniquesEn: string[];
  techniquesFr: string[];
  protectEn: string[];
  protectFr: string[];
  affectedEn: string[];
  affectedFr: string[];
  icon: string;
  featured?: boolean;
  tileSize?: "large" | "medium" | "compact";
};

export const categorySeed: CategorySeed[] = [
  {
    "slugEn": "phishing",
    "slugFr": "phishing",
    "nameEn": "Phishing",
    "nameFr": "Hameçonnage",
    "summaryEn": "Fake messages that steal your logins or card details.",
    "summaryFr": "Faux messages qui volent vos identifiants ou vos données bancaires.",
    "definitionEn": "Phishing is a message, email or website that pretends to come from a trusted organisation in order to steal your passwords, codes or card details.",
    "definitionFr": "L’hameçonnage est un message, un courriel ou un site qui se fait passer pour une organisation de confiance afin de voler vos mots de passe, codes ou données bancaires.",
    "stepsEn": [
      "You receive a message saying your account is blocked or a parcel is waiting. A link takes you to a page that looks real. Whatever you type there goes straight to the scammer."
    ],
    "stepsFr": [
      "Vous recevez un message indiquant que votre compte est bloqué ou qu’un colis vous attend. Un lien mène à une page qui semble authentique. Tout ce que vous y saisissez part directement chez l’escroc."
    ],
    "signsEn": [
      "Urgent tone: “your account will be closed today”",
      "Links with misspelled or unusual addresses",
      "Requests for passwords, PINs or one-time codes",
      "Generic greetings such as “Dear customer”"
    ],
    "signsFr": [
      "Ton urgent : « votre compte sera fermé aujourd’hui »",
      "Liens aux adresses mal orthographiées ou inhabituelles",
      "Demandes de mot de passe, de code PIN ou de code à usage unique",
      "Formules génériques comme « Cher client »"
    ],
    "techniquesEn": [
      "Illustrative example: Aminata receives an SMS saying her bank card is suspended, with a link to “reactivate” it. The page asks for her card number and code. Her bank later confirms it never sent the message."
    ],
    "techniquesFr": [
      "Exemple illustratif : Aminata reçoit un SMS indiquant que sa carte est suspendue, avec un lien pour la « réactiver ». La page demande son numéro de carte et son code. Sa banque confirme ensuite n’avoir jamais envoyé ce message."
    ],
    "protectEn": [
      "Never click links in unexpected messages; open the official app or type the address yourself",
      "Never share a one-time code with anyone",
      "Turn on two-step verification for email and social accounts",
      "Check the sender’s real address before replying"
    ],
    "protectFr": [
      "Ne cliquez jamais sur un lien inattendu ; ouvrez l’application officielle ou saisissez l’adresse vous-même",
      "Ne partagez jamais un code à usage unique",
      "Activez la validation en deux étapes",
      "Vérifiez la véritable adresse de l’expéditeur avant de répondre"
    ],
    "affectedEn": [
      "If you sent money, contact your bank or mobile money provider immediately through its official number.",
      "Keep screenshots, numbers, links and receipts as evidence.",
      "Report the incident to the competent authorities and to GLOPROFAS so others can be warned."
    ],
    "affectedFr": [
      "Si vous avez envoyé de l’argent, contactez immédiatement votre banque ou votre opérateur de mobile money via son numéro officiel.",
      "Conservez captures, numéros, liens et reçus comme preuves.",
      "Signalez l’incident aux autorités compétentes et à GLOPROFAS afin d’alerter d’autres personnes."
    ],
    "icon": "mail-warning",
    "featured": true,
    "tileSize": "large"
  },
  {
    "slugEn": "mobile-money-scams",
    "slugFr": "mobile-money-scams",
    "nameEn": "Mobile money fraud",
    "nameFr": "Fraude au mobile money",
    "summaryEn": "Fake transfers, reversal requests and agent impersonation.",
    "summaryFr": "Faux transferts, demandes d’annulation et usurpation d’agents.",
    "definitionEn": "Mobile money scams trick you into sending money or revealing your PIN through fake transfers, fake agents or reversal requests.",
    "definitionFr": "Les arnaques au mobile money vous poussent à envoyer de l’argent ou à révéler votre code via de faux transferts, de faux agents ou des demandes de renvoi.",
    "stepsEn": [
      "A message claims money was sent to you by mistake and asks you to send it back. No money ever arrived. Others pose as operator staff and ask for your PIN to “fix” your account."
    ],
    "stepsFr": [
      "Un message affirme qu’on vous a envoyé de l’argent par erreur et demande de le renvoyer. Aucun argent n’est arrivé. D’autres se font passer pour le personnel de l’opérateur et demandent votre code pour « réparer » votre compte."
    ],
    "signsEn": [
      "An SMS about a transfer that is not in your real balance",
      "A caller claiming to be operator staff asking for your PIN",
      "Pressure to send money back quickly",
      "Messages from ordinary numbers rather than the official short code"
    ],
    "signsFr": [
      "Un SMS de transfert absent de votre solde réel",
      "Un appelant se disant agent de l’opérateur et demandant votre code",
      "Une pression pour renvoyer vite l’argent",
      "Des messages venant d’un numéro ordinaire et non du numéro court officiel"
    ],
    "techniquesEn": [
      "Illustrative example: A trader gets an SMS showing a 50,000 FCFA deposit, then a call asking her to return it. Her balance shows no deposit. She hangs up and calls her operator."
    ],
    "techniquesFr": [
      "Exemple illustratif : une commerçante reçoit un SMS annonçant un dépôt de 50 000 FCFA, puis un appel demandant de le rembourser. Son solde n’affiche aucun dépôt. Elle raccroche et appelle son opérateur."
    ],
    "protectEn": [
      "Check your actual balance in the official menu before acting",
      "Never share your PIN, even with someone claiming to be staff",
      "Ask the operator to handle any genuine reversal",
      "Lock your phone and SIM with a code"
    ],
    "protectFr": [
      "Vérifiez votre solde réel dans le menu officiel avant d’agir",
      "Ne communiquez jamais votre code, même à un prétendu agent",
      "Laissez l’opérateur traiter tout renvoi réel",
      "Verrouillez téléphone et carte SIM avec un code"
    ],
    "affectedEn": [
      "If you sent money, contact your bank or mobile money provider immediately through its official number.",
      "Keep screenshots, numbers, links and receipts as evidence.",
      "Report the incident to the competent authorities and to GLOPROFAS so others can be warned."
    ],
    "affectedFr": [
      "Si vous avez envoyé de l’argent, contactez immédiatement votre banque ou votre opérateur de mobile money via son numéro officiel.",
      "Conservez captures, numéros, liens et reçus comme preuves.",
      "Signalez l’incident aux autorités compétentes et à GLOPROFAS afin d’alerter d’autres personnes."
    ],
    "icon": "smartphone",
    "featured": true,
    "tileSize": "medium"
  },
  {
    "slugEn": "investment-scams",
    "slugFr": "investment-scams",
    "nameEn": "Investment scams",
    "nameFr": "Arnaques à l’investissement",
    "summaryEn": "Promises of high, guaranteed returns that vanish.",
    "summaryFr": "Promesses de gains élevés et garantis qui disparaissent.",
    "definitionEn": "Investment scams promise high, fast or guaranteed returns to get you to deposit money that you will not get back.",
    "definitionFr": "Les arnaques à l’investissement promettent des gains élevés, rapides ou garantis pour vous faire déposer de l’argent que vous ne récupérerez pas.",
    "stepsEn": [
      "Early “investors” are paid with newer deposits to build trust. You are encouraged to invest more and recruit friends. Withdrawals are then blocked or the platform disappears."
    ],
    "stepsFr": [
      "Les premiers « investisseurs » sont payés avec les nouveaux dépôts pour créer la confiance. On vous incite à investir plus et à recruter. Puis les retraits sont bloqués ou la plateforme disparaît."
    ],
    "signsEn": [
      "Guaranteed daily or weekly returns",
      "Pressure to recruit family and friends",
      "Fees required before you can withdraw",
      "No verifiable registration with a financial regulator"
    ],
    "signsFr": [
      "Gains quotidiens ou hebdomadaires garantis",
      "Pression pour recruter famille et amis",
      "Frais exigés avant tout retrait",
      "Aucune immatriculation vérifiable auprès d’un régulateur"
    ],
    "techniquesEn": [
      "Illustrative example: A messaging group promises 10% profit per week. The first small withdrawal works. After a larger deposit, the group admin demands a “tax” before releasing funds, then leaves."
    ],
    "techniquesFr": [
      "Exemple illustratif : un groupe de messagerie promet 10 % de profit par semaine. Le premier petit retrait fonctionne. Après un dépôt plus important, l’administrateur exige une « taxe » avant de libérer les fonds, puis disparaît."
    ],
    "protectEn": [
      "Treat any guaranteed return as a red flag",
      "Check whether the company is registered with your financial regulator",
      "Start by asking how profits are actually made",
      "Never invest money you cannot afford to lose"
    ],
    "protectFr": [
      "Considérez tout gain garanti comme un signal d’alerte",
      "Vérifiez l’agrément de la société auprès du régulateur financier",
      "Demandez comment les profits sont réellement générés",
      "N’investissez jamais une somme que vous ne pouvez pas perdre"
    ],
    "affectedEn": [
      "If you sent money, contact your bank or mobile money provider immediately through its official number.",
      "Keep screenshots, numbers, links and receipts as evidence.",
      "Report the incident to the competent authorities and to GLOPROFAS so others can be warned."
    ],
    "affectedFr": [
      "Si vous avez envoyé de l’argent, contactez immédiatement votre banque ou votre opérateur de mobile money via son numéro officiel.",
      "Conservez captures, numéros, liens et reçus comme preuves.",
      "Signalez l’incident aux autorités compétentes et à GLOPROFAS afin d’alerter d’autres personnes."
    ],
    "icon": "trending-up",
    "featured": true,
    "tileSize": "medium"
  },
  {
    "slugEn": "employment-scams",
    "slugFr": "employment-scams",
    "nameEn": "Fake job offers",
    "nameFr": "Fausses offres d’emploi",
    "summaryEn": "Jobs that ask you to pay a fee before you start.",
    "summaryFr": "Des emplois qui exigent des frais avant de commencer.",
    "definitionEn": "Employment scams use fake job offers to collect fees or personal documents from job seekers.",
    "definitionFr": "Les arnaques à l’emploi utilisent de fausses offres pour soutirer des frais ou des documents personnels aux demandeurs d’emploi.",
    "stepsEn": [
      "An attractive job is advertised, often abroad or with high pay. After a quick “interview”, you are asked to pay for registration, training, a medical test or a visa."
    ],
    "stepsFr": [
      "Un poste attrayant est proposé, souvent à l’étranger ou bien payé. Après un « entretien » rapide, on vous demande de payer une inscription, une formation, un examen médical ou un visa."
    ],
    "signsEn": [
      "Payment required before you start",
      "An offer without a real interview",
      "Contact only through messaging apps",
      "Salary far above the market for the role"
    ],
    "signsFr": [
      "Paiement exigé avant de commencer",
      "Offre sans véritable entretien",
      "Contact uniquement par messagerie",
      "Salaire bien au-dessus du marché"
    ],
    "techniquesEn": [
      "Illustrative example: A graduate is offered a hotel job abroad and asked to pay 75,000 FCFA for “visa processing”. After payment, the recruiter stops responding."
    ],
    "techniquesFr": [
      "Exemple illustratif : un diplômé se voit proposer un emploi d’hôtel à l’étranger et doit payer 75 000 FCFA de « frais de visa ». Après paiement, le recruteur ne répond plus."
    ],
    "protectEn": [
      "Genuine employers do not charge you to be hired",
      "Research the company’s official address and phone number",
      "Do not send ID copies until you have verified the employer",
      "Be wary of offers you did not apply for"
    ],
    "protectFr": [
      "Un véritable employeur ne vous fait pas payer pour être embauché",
      "Recherchez l’adresse et le numéro officiels de l’entreprise",
      "N’envoyez pas de pièce d’identité avant d’avoir vérifié l’employeur",
      "Méfiez-vous des offres auxquelles vous n’avez pas postulé"
    ],
    "affectedEn": [
      "If you sent money, contact your bank or mobile money provider immediately through its official number.",
      "Keep screenshots, numbers, links and receipts as evidence.",
      "Report the incident to the competent authorities and to GLOPROFAS so others can be warned."
    ],
    "affectedFr": [
      "Si vous avez envoyé de l’argent, contactez immédiatement votre banque ou votre opérateur de mobile money via son numéro officiel.",
      "Conservez captures, numéros, liens et reçus comme preuves.",
      "Signalez l’incident aux autorités compétentes et à GLOPROFAS afin d’alerter d’autres personnes."
    ],
    "icon": "briefcase",
    "featured": true,
    "tileSize": "medium"
  },
  {
    "slugEn": "romance-scams",
    "slugFr": "romance-scams",
    "nameEn": "Romance scams",
    "nameFr": "Arnaques sentimentales",
    "summaryEn": "Online relationships built to ask for money.",
    "summaryFr": "Relations en ligne construites pour demander de l’argent.",
    "definitionEn": "Romance scams build an online relationship in order to ask for money.",
    "definitionFr": "Les arnaques sentimentales construisent une relation en ligne afin de demander de l’argent.",
    "stepsEn": [
      "The scammer spends weeks building trust and affection, then faces a sudden emergency: a hospital bill, a blocked parcel, a ticket to visit you."
    ],
    "stepsFr": [
      "L’escroc passe des semaines à gagner votre confiance et votre affection, puis survient une urgence : facture d’hôpital, colis bloqué, billet pour venir vous voir."
    ],
    "signsEn": [
      "They always avoid video calls or meeting",
      "Declarations of love very quickly",
      "Repeated emergencies needing money",
      "Requests to keep the relationship secret"
    ],
    "signsFr": [
      "Refus constant des appels vidéo ou des rencontres",
      "Déclarations d’amour très rapides",
      "Urgences répétées nécessitant de l’argent",
      "Demande de garder la relation secrète"
    ],
    "techniquesEn": [
      "Illustrative example: After two months of daily messages, a “doctor working abroad” asks for help paying customs on a gift. Then another fee appears, and another."
    ],
    "techniquesFr": [
      "Exemple illustratif : après deux mois de messages quotidiens, un « médecin travaillant à l’étranger » demande de l’aide pour payer la douane d’un cadeau. Puis d’autres frais apparaissent."
    ],
    "protectEn": [
      "Never send money to someone you have not met in person",
      "Do a reverse image search of their photos",
      "Talk to a trusted friend about the relationship",
      "Be cautious of anyone who moves you off the dating app quickly"
    ],
    "protectFr": [
      "N’envoyez jamais d’argent à quelqu’un que vous n’avez pas rencontré",
      "Faites une recherche inversée de ses photos",
      "Parlez de la relation à une personne de confiance",
      "Méfiez-vous de qui vous fait quitter vite l’application de rencontre"
    ],
    "affectedEn": [
      "If you sent money, contact your bank or mobile money provider immediately through its official number.",
      "Keep screenshots, numbers, links and receipts as evidence.",
      "Report the incident to the competent authorities and to GLOPROFAS so others can be warned."
    ],
    "affectedFr": [
      "Si vous avez envoyé de l’argent, contactez immédiatement votre banque ou votre opérateur de mobile money via son numéro officiel.",
      "Conservez captures, numéros, liens et reçus comme preuves.",
      "Signalez l’incident aux autorités compétentes et à GLOPROFAS afin d’alerter d’autres personnes."
    ],
    "icon": "heart-crack",
    "featured": false,
    "tileSize": "compact"
  },
  {
    "slugEn": "online-shopping-scams",
    "slugFr": "online-shopping-scams",
    "nameEn": "Online shopping scams",
    "nameFr": "Arnaques aux achats en ligne",
    "summaryEn": "Goods paid for that never arrive.",
    "summaryFr": "Des articles payés qui n’arrivent jamais.",
    "definitionEn": "Online shopping scams take your payment for goods that never arrive or are not as described.",
    "definitionFr": "Les arnaques aux achats en ligne encaissent votre paiement pour des articles qui n’arrivent jamais ou ne correspondent pas.",
    "stepsEn": [
      "A seller on social media offers a phone or appliance at a very low price and asks for full payment by transfer. Once paid, they block you."
    ],
    "stepsFr": [
      "Un vendeur sur les réseaux sociaux propose un téléphone à très bas prix et exige un paiement complet par transfert. Une fois payé, il vous bloque."
    ],
    "signsEn": [
      "Prices far below the normal market",
      "Payment only by direct transfer",
      "New pages with few real reviews",
      "Pressure: “only one left today”"
    ],
    "signsFr": [
      "Prix très inférieurs au marché",
      "Paiement uniquement par transfert direct",
      "Pages récentes avec peu d’avis réels",
      "Pression : « plus qu’un seul aujourd’hui »"
    ],
    "techniquesEn": [
      "Illustrative example: A page sells new smartphones at half price. The buyer pays by mobile money and receives a fake tracking number; the page vanishes a week later."
    ],
    "techniquesFr": [
      "Exemple illustratif : une page vend des smartphones neufs à moitié prix. L’acheteur paie par mobile money et reçoit un faux numéro de suivi ; la page disparaît une semaine plus tard."
    ],
    "protectEn": [
      "Prefer cash on delivery or protected payment options",
      "Check the seller’s history and reviews",
      "Meet in a safe public place for local purchases",
      "Keep all messages and receipts"
    ],
    "protectFr": [
      "Privilégiez le paiement à la livraison ou protégé",
      "Vérifiez l’historique et les avis du vendeur",
      "Pour un achat local, rencontrez-vous dans un lieu public",
      "Conservez messages et reçus"
    ],
    "affectedEn": [
      "If you sent money, contact your bank or mobile money provider immediately through its official number.",
      "Keep screenshots, numbers, links and receipts as evidence.",
      "Report the incident to the competent authorities and to GLOPROFAS so others can be warned."
    ],
    "affectedFr": [
      "Si vous avez envoyé de l’argent, contactez immédiatement votre banque ou votre opérateur de mobile money via son numéro officiel.",
      "Conservez captures, numéros, liens et reçus comme preuves.",
      "Signalez l’incident aux autorités compétentes et à GLOPROFAS afin d’alerter d’autres personnes."
    ],
    "icon": "shopping-bag",
    "featured": false,
    "tileSize": "compact"
  },
  {
    "slugEn": "cryptocurrency-scams",
    "slugFr": "cryptocurrency-scams",
    "nameEn": "Cryptocurrency scams",
    "nameFr": "Arnaques aux cryptomonnaies",
    "summaryEn": "Fake platforms and coins that trap deposits.",
    "summaryFr": "Fausses plateformes qui bloquent vos dépôts.",
    "definitionEn": "Cryptocurrency scams use fake trading platforms, coins or “mentors” to take your deposits.",
    "definitionFr": "Les arnaques aux cryptomonnaies utilisent de fausses plateformes, de faux jetons ou de faux « mentors » pour capter vos dépôts.",
    "stepsEn": [
      "A mentor shows impressive profits on a platform you have never heard of. Your balance grows on screen, but when you try to withdraw, you must pay fees first."
    ],
    "stepsFr": [
      "Un mentor montre des profits impressionnants sur une plateforme inconnue. Votre solde grimpe à l’écran, mais pour retirer, il faut d’abord payer des frais."
    ],
    "signsEn": [
      "Unknown platforms showing constant gains",
      "A “mentor” who manages your account",
      "Withdrawal blocked until you pay a fee",
      "Requests to send crypto to a personal wallet"
    ],
    "signsFr": [
      "Plateformes inconnues affichant des gains constants",
      "Un « mentor » qui gère votre compte",
      "Retrait bloqué jusqu’au paiement de frais",
      "Demande d’envoyer des cryptos vers un portefeuille personnel"
    ],
    "techniquesEn": [
      "Illustrative example: A student deposits a small amount on a platform recommended in a chat group. The dashboard shows it doubling. To withdraw, he is asked to pay 20%. The site goes offline."
    ],
    "techniquesFr": [
      "Exemple illustratif : un étudiant dépose une petite somme sur une plateforme recommandée dans un groupe. Le tableau de bord montre qu’elle double. Pour retirer, on lui demande 20 %. Le site disparaît."
    ],
    "protectEn": [
      "Use only well-known, regulated exchanges",
      "Never give anyone remote access to your device",
      "Be suspicious of profit screenshots",
      "If withdrawal requires a fee, stop paying"
    ],
    "protectFr": [
      "Utilisez uniquement des plateformes connues et réglementées",
      "Ne donnez jamais un accès à distance à votre appareil",
      "Méfiez-vous des captures de profits",
      "Si un retrait exige des frais, arrêtez de payer"
    ],
    "affectedEn": [
      "If you sent money, contact your bank or mobile money provider immediately through its official number.",
      "Keep screenshots, numbers, links and receipts as evidence.",
      "Report the incident to the competent authorities and to GLOPROFAS so others can be warned."
    ],
    "affectedFr": [
      "Si vous avez envoyé de l’argent, contactez immédiatement votre banque ou votre opérateur de mobile money via son numéro officiel.",
      "Conservez captures, numéros, liens et reçus comme preuves.",
      "Signalez l’incident aux autorités compétentes et à GLOPROFAS afin d’alerter d’autres personnes."
    ],
    "icon": "bitcoin",
    "featured": false,
    "tileSize": "compact"
  },
  {
    "slugEn": "impersonation-scams",
    "slugFr": "impersonation-scams",
    "nameEn": "Impersonation scams",
    "nameFr": "Usurpation d’identité",
    "summaryEn": "Someone pretends to be a relative, bank or official.",
    "summaryFr": "Quelqu’un se fait passer pour un proche, une banque ou un agent.",
    "definitionEn": "Impersonation scams involve someone pretending to be a relative, a bank, an operator or an official to get money or information.",
    "definitionFr": "L’usurpation consiste à se faire passer pour un proche, une banque, un opérateur ou un agent public afin d’obtenir de l’argent ou des informations.",
    "stepsEn": [
      "A caller says your son had an accident, or a “bank officer” needs to verify your account. The story is urgent and emotional so you act before checking."
    ],
    "stepsFr": [
      "Un appelant annonce que votre fils a eu un accident, ou un « conseiller bancaire » doit vérifier votre compte. L’histoire est urgente et émotive pour vous faire agir avant de vérifier."
    ],
    "signsEn": [
      "A new number claiming to be a family member",
      "Requests to keep it secret",
      "Officials asking for payment by mobile money",
      "Callers who already know a few details about you"
    ],
    "signsFr": [
      "Un nouveau numéro se disant membre de la famille",
      "Demande de garder le secret",
      "Agents exigeant un paiement par mobile money",
      "Appelants connaissant déjà quelques détails sur vous"
    ],
    "techniquesEn": [
      "Illustrative example: A grandmother receives a call from “her grandson’s friend” saying he is in hospital and needs money now. She calls her grandson directly; he is fine."
    ],
    "techniquesFr": [
      "Exemple illustratif : une grand-mère reçoit l’appel d’un « ami de son petit-fils » affirmant qu’il est à l’hôpital et a besoin d’argent. Elle appelle son petit-fils : il va bien."
    ],
    "protectEn": [
      "Hang up and call the person or organisation on a number you already know",
      "Agree a family code word for emergencies",
      "Banks and authorities do not ask for PINs by phone",
      "Limit personal details you post publicly"
    ],
    "protectFr": [
      "Raccrochez et rappelez la personne sur un numéro que vous connaissez",
      "Convenez d’un mot de code familial pour les urgences",
      "Banques et autorités ne demandent pas de code par téléphone",
      "Limitez les informations personnelles publiées"
    ],
    "affectedEn": [
      "If you sent money, contact your bank or mobile money provider immediately through its official number.",
      "Keep screenshots, numbers, links and receipts as evidence.",
      "Report the incident to the competent authorities and to GLOPROFAS so others can be warned."
    ],
    "affectedFr": [
      "Si vous avez envoyé de l’argent, contactez immédiatement votre banque ou votre opérateur de mobile money via son numéro officiel.",
      "Conservez captures, numéros, liens et reçus comme preuves.",
      "Signalez l’incident aux autorités compétentes et à GLOPROFAS afin d’alerter d’autres personnes."
    ],
    "icon": "user-x",
    "featured": false,
    "tileSize": "compact"
  },
  {
    "slugEn": "advance-fee-scams",
    "slugFr": "advance-fee-scams",
    "nameEn": "Advance-fee scams",
    "nameFr": "Arnaques aux avances de frais",
    "summaryEn": "Pay a small fee now to unlock a large sum later.",
    "summaryFr": "Payer de petits frais pour débloquer une grosse somme.",
    "definitionEn": "Advance-fee scams ask you to pay a small amount now to unlock a much larger sum: an inheritance, a prize, a contract or a grant.",
    "definitionFr": "Les arnaques aux avances de frais vous demandent de payer une petite somme pour débloquer un montant bien plus important : héritage, prix, contrat ou subvention.",
    "stepsEn": [
      "Each payment is followed by a new obstacle: a tax, a lawyer’s fee, a transfer charge. The large sum never comes."
    ],
    "stepsFr": [
      "Chaque paiement est suivi d’un nouvel obstacle : taxe, honoraires d’avocat, frais de transfert. La grosse somme n’arrive jamais."
    ],
    "signsEn": [
      "A windfall you never expected",
      "Fees to release money that is “yours”",
      "Official-looking documents and stamps",
      "Requests for secrecy"
    ],
    "signsFr": [
      "Une aubaine totalement inattendue",
      "Des frais pour libérer un argent « à vous »",
      "Documents et tampons d’apparence officielle",
      "Demande de discrétion"
    ],
    "techniquesEn": [
      "Illustrative example: A letter claims a distant relative left an inheritance. A “lawyer” asks for processing fees, then court fees, then a transfer tax."
    ],
    "techniquesFr": [
      "Exemple illustratif : une lettre annonce l’héritage d’un parent éloigné. Un « avocat » réclame des frais de dossier, puis de tribunal, puis une taxe de transfert."
    ],
    "protectEn": [
      "Never pay to receive money",
      "Verify any “official” directly with the institution",
      "Search the wording of the message online",
      "Ask a trusted person before paying anything"
    ],
    "protectFr": [
      "Ne payez jamais pour recevoir de l’argent",
      "Vérifiez tout document « officiel » auprès de l’institution",
      "Recherchez le texte du message en ligne",
      "Demandez conseil à une personne de confiance"
    ],
    "affectedEn": [
      "If you sent money, contact your bank or mobile money provider immediately through its official number.",
      "Keep screenshots, numbers, links and receipts as evidence.",
      "Report the incident to the competent authorities and to GLOPROFAS so others can be warned."
    ],
    "affectedFr": [
      "Si vous avez envoyé de l’argent, contactez immédiatement votre banque ou votre opérateur de mobile money via son numéro officiel.",
      "Conservez captures, numéros, liens et reçus comme preuves.",
      "Signalez l’incident aux autorités compétentes et à GLOPROFAS afin d’alerter d’autres personnes."
    ],
    "icon": "hand-coins",
    "featured": false,
    "tileSize": "compact"
  },
  {
    "slugEn": "fake-loan-scams",
    "slugFr": "fake-loan-scams",
    "nameEn": "Fake loan scams",
    "nameFr": "Faux prêts",
    "summaryEn": "Loans that require upfront “processing” payments.",
    "summaryFr": "Des prêts qui exigent des frais de dossier à l’avance.",
    "definitionEn": "Fake loan scams promise quick credit with no checks, then demand upfront payments before the loan is released.",
    "definitionFr": "Les faux prêts promettent un crédit rapide sans vérification, puis exigent des paiements avant le décaissement.",
    "stepsEn": [
      "An advert offers instant approval. You are asked to pay insurance, a processing fee or a deposit. The loan never arrives, or an app harvests your contacts to harass you."
    ],
    "stepsFr": [
      "Une annonce promet une approbation immédiate. On vous demande une assurance, des frais de dossier ou un dépôt. Le prêt n’arrive jamais, ou une application aspire vos contacts pour vous harceler."
    ],
    "signsEn": [
      "Guaranteed approval regardless of credit",
      "Fees required before disbursement",
      "Apps asking for access to your contacts and photos",
      "Lenders with no physical address"
    ],
    "signsFr": [
      "Approbation garantie quel que soit votre profil",
      "Frais exigés avant le décaissement",
      "Applications demandant l’accès à vos contacts et photos",
      "Prêteurs sans adresse physique"
    ],
    "techniquesEn": [
      "Illustrative example: A couple facing school fees responds to an “instant loan” advert. They pay 15,000 FCFA for “insurance”. The loan officer then asks for a second fee."
    ],
    "techniquesFr": [
      "Exemple illustratif : un couple confronté aux frais de scolarité répond à une annonce de « prêt instantané ». Il paie 15 000 FCFA d’« assurance ». Le conseiller réclame ensuite d’autres frais."
    ],
    "protectEn": [
      "Borrow only from licensed institutions",
      "Legitimate lenders deduct fees from the loan, not before",
      "Check app permissions before installing",
      "Read reviews from independent sources"
    ],
    "protectFr": [
      "Empruntez uniquement auprès d’établissements agréés",
      "Un vrai prêteur déduit les frais du prêt, pas avant",
      "Vérifiez les autorisations des applications",
      "Consultez des avis indépendants"
    ],
    "affectedEn": [
      "If you sent money, contact your bank or mobile money provider immediately through its official number.",
      "Keep screenshots, numbers, links and receipts as evidence.",
      "Report the incident to the competent authorities and to GLOPROFAS so others can be warned."
    ],
    "affectedFr": [
      "Si vous avez envoyé de l’argent, contactez immédiatement votre banque ou votre opérateur de mobile money via son numéro officiel.",
      "Conservez captures, numéros, liens et reçus comme preuves.",
      "Signalez l’incident aux autorités compétentes et à GLOPROFAS afin d’alerter d’autres personnes."
    ],
    "icon": "landmark",
    "featured": false,
    "tileSize": "compact"
  },
  {
    "slugEn": "business-email-compromise",
    "slugFr": "business-email-compromise",
    "nameEn": "Business email compromise",
    "nameFr": "Compromission de messagerie d’entreprise",
    "summaryEn": "Hijacked or spoofed emails that redirect payments.",
    "summaryFr": "Courriels piratés ou usurpés qui détournent des paiements.",
    "definitionEn": "Business email compromise uses a hacked or look-alike email account to redirect payments or obtain sensitive data from an organisation.",
    "definitionFr": "La compromission de messagerie d’entreprise utilise un compte piraté ou imité pour détourner des paiements ou obtenir des données sensibles.",
    "stepsEn": [
      "A supplier’s “new bank details” arrive by email, or the “director” urgently asks finance to make a confidential transfer. The address looks almost right."
    ],
    "stepsFr": [
      "Les « nouvelles coordonnées bancaires » d’un fournisseur arrivent par courriel, ou le « directeur » demande en urgence un virement confidentiel. L’adresse semble presque correcte."
    ],
    "signsEn": [
      "Last-minute changes to bank details",
      "Urgent, confidential payment requests from executives",
      "Slightly altered email domains",
      "Requests to bypass normal approval"
    ],
    "signsFr": [
      "Changements de coordonnées bancaires de dernière minute",
      "Demandes de paiement urgentes et confidentielles de la direction",
      "Domaines de messagerie légèrement modifiés",
      "Demandes de contourner la validation habituelle"
    ],
    "techniquesEn": [
      "Illustrative example: An accountant receives an invoice from a regular supplier with new account details. A quick call to the supplier’s known number reveals they changed nothing."
    ],
    "techniquesFr": [
      "Exemple illustratif : une comptable reçoit d’un fournisseur habituel une facture avec un nouveau compte. Un appel au numéro connu du fournisseur révèle qu’il n’a rien changé."
    ],
    "protectEn": [
      "Confirm any change of bank details by phone on a known number",
      "Require two approvals for transfers",
      "Enable two-step verification on all business email",
      "Train staff to pause on urgent payment requests"
    ],
    "protectFr": [
      "Confirmez tout changement de coordonnées par téléphone, sur un numéro connu",
      "Exigez une double validation des virements",
      "Activez la validation en deux étapes sur toutes les messageries",
      "Formez le personnel à marquer une pause face à l’urgence"
    ],
    "affectedEn": [
      "If you sent money, contact your bank or mobile money provider immediately through its official number.",
      "Keep screenshots, numbers, links and receipts as evidence.",
      "Report the incident to the competent authorities and to GLOPROFAS so others can be warned."
    ],
    "affectedFr": [
      "Si vous avez envoyé de l’argent, contactez immédiatement votre banque ou votre opérateur de mobile money via son numéro officiel.",
      "Conservez captures, numéros, liens et reçus comme preuves.",
      "Signalez l’incident aux autorités compétentes et à GLOPROFAS afin d’alerter d’autres personnes."
    ],
    "icon": "building-2",
    "featured": false,
    "tileSize": "compact"
  },
  {
    "slugEn": "fake-websites",
    "slugFr": "fake-websites",
    "nameEn": "Fake websites and platforms",
    "nameFr": "Faux sites et plateformes",
    "summaryEn": "Copycat sites and apps designed to collect payments.",
    "summaryFr": "Sites et applications copiés pour encaisser des paiements.",
    "definitionEn": "Fake websites and platforms copy real brands, shops or services to collect payments, logins or personal data.",
    "definitionFr": "Les faux sites et plateformes copient des marques, boutiques ou services réels pour encaisser des paiements ou voler des données.",
    "stepsEn": [
      "Ads or messages lead to a site that looks like a known business. Payments made there go to scammers, and details entered are stolen."
    ],
    "stepsFr": [
      "Des publicités ou messages mènent à un site ressemblant à une entreprise connue. Les paiements vont aux escrocs et les données saisies sont volées."
    ],
    "signsEn": [
      "Web addresses with extra words or odd endings",
      "Prices or offers that seem too good",
      "No contact details, or only a messaging number",
      "Pressure countdown timers"
    ],
    "signsFr": [
      "Adresses web avec des mots en trop ou des extensions étranges",
      "Prix ou offres trop beaux",
      "Aucune coordonnée, ou seulement un numéro de messagerie",
      "Compte à rebours pour vous presser"
    ],
    "techniquesEn": [
      "Illustrative example: A search ad leads to a page copying a well-known airline, with cheap fares. After payment, no booking exists with the real airline."
    ],
    "techniquesFr": [
      "Exemple illustratif : une publicité mène à une page imitant une compagnie aérienne connue, avec des tarifs bas. Après paiement, aucune réservation n’existe chez la vraie compagnie."
    ],
    "protectEn": [
      "Type addresses yourself or use official apps",
      "Check the exact domain before paying",
      "Search the site name with the word “scam”",
      "Use payment methods that offer protection"
    ],
    "protectFr": [
      "Saisissez les adresses vous-même ou utilisez les applications officielles",
      "Vérifiez le domaine exact avant de payer",
      "Recherchez le nom du site avec le mot « arnaque »",
      "Utilisez des moyens de paiement protégés"
    ],
    "affectedEn": [
      "If you sent money, contact your bank or mobile money provider immediately through its official number.",
      "Keep screenshots, numbers, links and receipts as evidence.",
      "Report the incident to the competent authorities and to GLOPROFAS so others can be warned."
    ],
    "affectedFr": [
      "Si vous avez envoyé de l’argent, contactez immédiatement votre banque ou votre opérateur de mobile money via son numéro officiel.",
      "Conservez captures, numéros, liens et reçus comme preuves.",
      "Signalez l’incident aux autorités compétentes et à GLOPROFAS afin d’alerter d’autres personnes."
    ],
    "icon": "globe",
    "featured": false,
    "tileSize": "compact"
  }
];

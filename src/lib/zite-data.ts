// Auto-extracted live content from https://gloprofas.zite.so
export type BiText = { en: string; fr: string };

export type ZiteCategoryContent = {
  definition: string;
  how: string;
  signs: string[];
  protect: string[];
  todo: string[];
  example: string;
};

export type ZiteCategory = {
  id: string;
  slug: string;
  icon: string;
  featured: boolean;
  imageUrl: string;
  title: BiText;
  summary: BiText;
  content: BiText;
  parsedContent: { en: ZiteCategoryContent; fr: ZiteCategoryContent };
};

export type ZiteAlert = {
  id: string;
  title: BiText;
  summary: BiText;
  actions: BiText;
  categorySlug: string;
  category: BiText;
  country: string;
  risk: "Low" | "Medium" | "High" | "Critical";
  date: string;
  imageUrl: string;
};

export type ZiteArticle = {
  id: string;
  title: BiText;
  tag: BiText;
  summary: BiText;
  body: BiText;
  author: string;
  date: string;
  imageUrl: string;
};

export type ZiteResource = {
  id: string;
  title: BiText;
  description: BiText;
  type: "Guide" | "Checklist" | "Infographic" | "PDF" | "Video";
  language: string;
  fileSize: string;
  featured: boolean;
  imageUrl: string;
};

export const ZITE_CONTENT = {
  "categories": [
    {
      "id": "2d91d3b9-c0ac-4b2e-aaba-8764257b75fd",
      "slug": "phishing",
      "icon": "mail-warning",
      "featured": true,
      "imageUrl": "/images/zite/img_BPedTDWHGQzb-FZp.jpg",
      "title": {
        "en": "Phishing",
        "fr": "Hameçonnage"
      },
      "summary": {
        "en": "Fake messages that steal your logins or card details.",
        "fr": "Faux messages qui volent vos identifiants ou vos données bancaires."
      },
      "content": {
        "en": "{\"definition\":\"Phishing is a message, email or website that pretends to come from a trusted organisation in order to steal your passwords, codes or card details.\",\"how\":\"You receive a message saying your account is blocked or a parcel is waiting. A link takes you to a page that looks real. Whatever you type there goes straight to the scammer.\",\"signs\":[\"Urgent tone: “your account will be closed today”\",\"Links with misspelled or unusual addresses\",\"Requests for passwords, PINs or one-time codes\",\"Generic greetings such as “Dear customer”\"],\"protect\":[\"Never click links in unexpected messages; open the official app or type the address yourself\",\"Never share a one-time code with anyone\",\"Turn on two-step verification for email and social accounts\",\"Check the sender’s real address before replying\"],\"todo\":[\"If you sent money, contact your bank or mobile money provider immediately through its official number.\",\"Keep screenshots, numbers, links and receipts as evidence.\",\"Report the incident to the competent authorities and to GLOPROFAS so others can be warned.\"],\"example\":\"Illustrative example: Aminata receives an SMS saying her bank card is suspended, with a link to “reactivate” it. The page asks for her card number and code. Her bank later confirms it never sent the message.\"}",
        "fr": "{\"definition\":\"L’hameçonnage est un message, un courriel ou un site qui se fait passer pour une organisation de confiance afin de voler vos mots de passe, codes ou données bancaires.\",\"how\":\"Vous recevez un message indiquant que votre compte est bloqué ou qu’un colis vous attend. Un lien mène à une page qui semble authentique. Tout ce que vous y saisissez part directement chez l’escroc.\",\"signs\":[\"Ton urgent : « votre compte sera fermé aujourd’hui »\",\"Liens aux adresses mal orthographiées ou inhabituelles\",\"Demandes de mot de passe, de code PIN ou de code à usage unique\",\"Formules génériques comme « Cher client »\"],\"protect\":[\"Ne cliquez jamais sur un lien inattendu ; ouvrez l’application officielle ou saisissez l’adresse vous-même\",\"Ne partagez jamais un code à usage unique\",\"Activez la validation en deux étapes\",\"Vérifiez la véritable adresse de l’expéditeur avant de répondre\"],\"todo\":[\"Si vous avez envoyé de l’argent, contactez immédiatement votre banque ou votre opérateur de mobile money via son numéro officiel.\",\"Conservez captures, numéros, liens et reçus comme preuves.\",\"Signalez l’incident aux autorités compétentes et à GLOPROFAS afin d’alerter d’autres personnes.\"],\"example\":\"Exemple illustratif : Aminata reçoit un SMS indiquant que sa carte est suspendue, avec un lien pour la « réactiver ». La page demande son numéro de carte et son code. Sa banque confirme ensuite n’avoir jamais envoyé ce message.\"}"
      },
      "parsedContent": {
        "en": {
          "definition": "Phishing is a message, email or website that pretends to come from a trusted organisation in order to steal your passwords, codes or card details.",
          "how": "You receive a message saying your account is blocked or a parcel is waiting. A link takes you to a page that looks real. Whatever you type there goes straight to the scammer.",
          "signs": [
            "Urgent tone: “your account will be closed today”",
            "Links with misspelled or unusual addresses",
            "Requests for passwords, PINs or one-time codes",
            "Generic greetings such as “Dear customer”"
          ],
          "protect": [
            "Never click links in unexpected messages; open the official app or type the address yourself",
            "Never share a one-time code with anyone",
            "Turn on two-step verification for email and social accounts",
            "Check the sender’s real address before replying"
          ],
          "todo": [
            "If you sent money, contact your bank or mobile money provider immediately through its official number.",
            "Keep screenshots, numbers, links and receipts as evidence.",
            "Report the incident to the competent authorities and to GLOPROFAS so others can be warned."
          ],
          "example": "Illustrative example: Aminata receives an SMS saying her bank card is suspended, with a link to “reactivate” it. The page asks for her card number and code. Her bank later confirms it never sent the message."
        },
        "fr": {
          "definition": "L’hameçonnage est un message, un courriel ou un site qui se fait passer pour une organisation de confiance afin de voler vos mots de passe, codes ou données bancaires.",
          "how": "Vous recevez un message indiquant que votre compte est bloqué ou qu’un colis vous attend. Un lien mène à une page qui semble authentique. Tout ce que vous y saisissez part directement chez l’escroc.",
          "signs": [
            "Ton urgent : « votre compte sera fermé aujourd’hui »",
            "Liens aux adresses mal orthographiées ou inhabituelles",
            "Demandes de mot de passe, de code PIN ou de code à usage unique",
            "Formules génériques comme « Cher client »"
          ],
          "protect": [
            "Ne cliquez jamais sur un lien inattendu ; ouvrez l’application officielle ou saisissez l’adresse vous-même",
            "Ne partagez jamais un code à usage unique",
            "Activez la validation en deux étapes",
            "Vérifiez la véritable adresse de l’expéditeur avant de répondre"
          ],
          "todo": [
            "Si vous avez envoyé de l’argent, contactez immédiatement votre banque ou votre opérateur de mobile money via son numéro officiel.",
            "Conservez captures, numéros, liens et reçus comme preuves.",
            "Signalez l’incident aux autorités compétentes et à GLOPROFAS afin d’alerter d’autres personnes."
          ],
          "example": "Exemple illustratif : Aminata reçoit un SMS indiquant que sa carte est suspendue, avec un lien pour la « réactiver ». La page demande son numéro de carte et son code. Sa banque confirme ensuite n’avoir jamais envoyé ce message."
        }
      }
    },
    {
      "id": "039bcca0-d86d-40cb-a1cc-352dacd0a44e",
      "slug": "mobile-money-scams",
      "icon": "smartphone",
      "featured": true,
      "imageUrl": "/images/zite/img_XRXUCAiJJ46mAuVh.jpg",
      "title": {
        "en": "Mobile money fraud",
        "fr": "Fraude au mobile money"
      },
      "summary": {
        "en": "Fake transfers, reversal requests and agent impersonation.",
        "fr": "Faux transferts, demandes d’annulation et usurpation d’agents."
      },
      "content": {
        "en": "{\"definition\":\"Mobile money scams trick you into sending money or revealing your PIN through fake transfers, fake agents or reversal requests.\",\"how\":\"A message claims money was sent to you by mistake and asks you to send it back. No money ever arrived. Others pose as operator staff and ask for your PIN to “fix” your account.\",\"signs\":[\"An SMS about a transfer that is not in your real balance\",\"A caller claiming to be operator staff asking for your PIN\",\"Pressure to send money back quickly\",\"Messages from ordinary numbers rather than the official short code\"],\"protect\":[\"Check your actual balance in the official menu before acting\",\"Never share your PIN, even with someone claiming to be staff\",\"Ask the operator to handle any genuine reversal\",\"Lock your phone and SIM with a code\"],\"todo\":[\"If you sent money, contact your bank or mobile money provider immediately through its official number.\",\"Keep screenshots, numbers, links and receipts as evidence.\",\"Report the incident to the competent authorities and to GLOPROFAS so others can be warned.\"],\"example\":\"Illustrative example: A trader gets an SMS showing a 50,000 FCFA deposit, then a call asking her to return it. Her balance shows no deposit. She hangs up and calls her operator.\"}",
        "fr": "{\"definition\":\"Les arnaques au mobile money vous poussent à envoyer de l’argent ou à révéler votre code via de faux transferts, de faux agents ou des demandes de renvoi.\",\"how\":\"Un message affirme qu’on vous a envoyé de l’argent par erreur et demande de le renvoyer. Aucun argent n’est arrivé. D’autres se font passer pour le personnel de l’opérateur et demandent votre code pour « réparer » votre compte.\",\"signs\":[\"Un SMS de transfert absent de votre solde réel\",\"Un appelant se disant agent de l’opérateur et demandant votre code\",\"Une pression pour renvoyer vite l’argent\",\"Des messages venant d’un numéro ordinaire et non du numéro court officiel\"],\"protect\":[\"Vérifiez votre solde réel dans le menu officiel avant d’agir\",\"Ne communiquez jamais votre code, même à un prétendu agent\",\"Laissez l’opérateur traiter tout renvoi réel\",\"Verrouillez téléphone et carte SIM avec un code\"],\"todo\":[\"Si vous avez envoyé de l’argent, contactez immédiatement votre banque ou votre opérateur de mobile money via son numéro officiel.\",\"Conservez captures, numéros, liens et reçus comme preuves.\",\"Signalez l’incident aux autorités compétentes et à GLOPROFAS afin d’alerter d’autres personnes.\"],\"example\":\"Exemple illustratif : une commerçante reçoit un SMS annonçant un dépôt de 50 000 FCFA, puis un appel demandant de le rembourser. Son solde n’affiche aucun dépôt. Elle raccroche et appelle son opérateur.\"}"
      },
      "parsedContent": {
        "en": {
          "definition": "Mobile money scams trick you into sending money or revealing your PIN through fake transfers, fake agents or reversal requests.",
          "how": "A message claims money was sent to you by mistake and asks you to send it back. No money ever arrived. Others pose as operator staff and ask for your PIN to “fix” your account.",
          "signs": [
            "An SMS about a transfer that is not in your real balance",
            "A caller claiming to be operator staff asking for your PIN",
            "Pressure to send money back quickly",
            "Messages from ordinary numbers rather than the official short code"
          ],
          "protect": [
            "Check your actual balance in the official menu before acting",
            "Never share your PIN, even with someone claiming to be staff",
            "Ask the operator to handle any genuine reversal",
            "Lock your phone and SIM with a code"
          ],
          "todo": [
            "If you sent money, contact your bank or mobile money provider immediately through its official number.",
            "Keep screenshots, numbers, links and receipts as evidence.",
            "Report the incident to the competent authorities and to GLOPROFAS so others can be warned."
          ],
          "example": "Illustrative example: A trader gets an SMS showing a 50,000 FCFA deposit, then a call asking her to return it. Her balance shows no deposit. She hangs up and calls her operator."
        },
        "fr": {
          "definition": "Les arnaques au mobile money vous poussent à envoyer de l’argent ou à révéler votre code via de faux transferts, de faux agents ou des demandes de renvoi.",
          "how": "Un message affirme qu’on vous a envoyé de l’argent par erreur et demande de le renvoyer. Aucun argent n’est arrivé. D’autres se font passer pour le personnel de l’opérateur et demandent votre code pour « réparer » votre compte.",
          "signs": [
            "Un SMS de transfert absent de votre solde réel",
            "Un appelant se disant agent de l’opérateur et demandant votre code",
            "Une pression pour renvoyer vite l’argent",
            "Des messages venant d’un numéro ordinaire et non du numéro court officiel"
          ],
          "protect": [
            "Vérifiez votre solde réel dans le menu officiel avant d’agir",
            "Ne communiquez jamais votre code, même à un prétendu agent",
            "Laissez l’opérateur traiter tout renvoi réel",
            "Verrouillez téléphone et carte SIM avec un code"
          ],
          "todo": [
            "Si vous avez envoyé de l’argent, contactez immédiatement votre banque ou votre opérateur de mobile money via son numéro officiel.",
            "Conservez captures, numéros, liens et reçus comme preuves.",
            "Signalez l’incident aux autorités compétentes et à GLOPROFAS afin d’alerter d’autres personnes."
          ],
          "example": "Exemple illustratif : une commerçante reçoit un SMS annonçant un dépôt de 50 000 FCFA, puis un appel demandant de le rembourser. Son solde n’affiche aucun dépôt. Elle raccroche et appelle son opérateur."
        }
      }
    },
    {
      "id": "b0c130c2-3818-4257-977a-ab8367e63d1f",
      "slug": "investment-scams",
      "icon": "trending-up",
      "featured": true,
      "imageUrl": "/images/zite/img_2jsmyLqQWbvqkX0_.jpg",
      "title": {
        "en": "Investment scams",
        "fr": "Arnaques à l’investissement"
      },
      "summary": {
        "en": "Promises of high, guaranteed returns that vanish.",
        "fr": "Promesses de gains élevés et garantis qui disparaissent."
      },
      "content": {
        "en": "{\"definition\":\"Investment scams promise high, fast or guaranteed returns to get you to deposit money that you will not get back.\",\"how\":\"Early “investors” are paid with newer deposits to build trust. You are encouraged to invest more and recruit friends. Withdrawals are then blocked or the platform disappears.\",\"signs\":[\"Guaranteed daily or weekly returns\",\"Pressure to recruit family and friends\",\"Fees required before you can withdraw\",\"No verifiable registration with a financial regulator\"],\"protect\":[\"Treat any guaranteed return as a red flag\",\"Check whether the company is registered with your financial regulator\",\"Start by asking how profits are actually made\",\"Never invest money you cannot afford to lose\"],\"todo\":[\"If you sent money, contact your bank or mobile money provider immediately through its official number.\",\"Keep screenshots, numbers, links and receipts as evidence.\",\"Report the incident to the competent authorities and to GLOPROFAS so others can be warned.\"],\"example\":\"Illustrative example: A messaging group promises 10% profit per week. The first small withdrawal works. After a larger deposit, the group admin demands a “tax” before releasing funds, then leaves.\"}",
        "fr": "{\"definition\":\"Les arnaques à l’investissement promettent des gains élevés, rapides ou garantis pour vous faire déposer de l’argent que vous ne récupérerez pas.\",\"how\":\"Les premiers « investisseurs » sont payés avec les nouveaux dépôts pour créer la confiance. On vous incite à investir plus et à recruter. Puis les retraits sont bloqués ou la plateforme disparaît.\",\"signs\":[\"Gains quotidiens ou hebdomadaires garantis\",\"Pression pour recruter famille et amis\",\"Frais exigés avant tout retrait\",\"Aucune immatriculation vérifiable auprès d’un régulateur\"],\"protect\":[\"Considérez tout gain garanti comme un signal d’alerte\",\"Vérifiez l’agrément de la société auprès du régulateur financier\",\"Demandez comment les profits sont réellement générés\",\"N’investissez jamais une somme que vous ne pouvez pas perdre\"],\"todo\":[\"Si vous avez envoyé de l’argent, contactez immédiatement votre banque ou votre opérateur de mobile money via son numéro officiel.\",\"Conservez captures, numéros, liens et reçus comme preuves.\",\"Signalez l’incident aux autorités compétentes et à GLOPROFAS afin d’alerter d’autres personnes.\"],\"example\":\"Exemple illustratif : un groupe de messagerie promet 10 % de profit par semaine. Le premier petit retrait fonctionne. Après un dépôt plus important, l’administrateur exige une « taxe » avant de libérer les fonds, puis disparaît.\"}"
      },
      "parsedContent": {
        "en": {
          "definition": "Investment scams promise high, fast or guaranteed returns to get you to deposit money that you will not get back.",
          "how": "Early “investors” are paid with newer deposits to build trust. You are encouraged to invest more and recruit friends. Withdrawals are then blocked or the platform disappears.",
          "signs": [
            "Guaranteed daily or weekly returns",
            "Pressure to recruit family and friends",
            "Fees required before you can withdraw",
            "No verifiable registration with a financial regulator"
          ],
          "protect": [
            "Treat any guaranteed return as a red flag",
            "Check whether the company is registered with your financial regulator",
            "Start by asking how profits are actually made",
            "Never invest money you cannot afford to lose"
          ],
          "todo": [
            "If you sent money, contact your bank or mobile money provider immediately through its official number.",
            "Keep screenshots, numbers, links and receipts as evidence.",
            "Report the incident to the competent authorities and to GLOPROFAS so others can be warned."
          ],
          "example": "Illustrative example: A messaging group promises 10% profit per week. The first small withdrawal works. After a larger deposit, the group admin demands a “tax” before releasing funds, then leaves."
        },
        "fr": {
          "definition": "Les arnaques à l’investissement promettent des gains élevés, rapides ou garantis pour vous faire déposer de l’argent que vous ne récupérerez pas.",
          "how": "Les premiers « investisseurs » sont payés avec les nouveaux dépôts pour créer la confiance. On vous incite à investir plus et à recruter. Puis les retraits sont bloqués ou la plateforme disparaît.",
          "signs": [
            "Gains quotidiens ou hebdomadaires garantis",
            "Pression pour recruter famille et amis",
            "Frais exigés avant tout retrait",
            "Aucune immatriculation vérifiable auprès d’un régulateur"
          ],
          "protect": [
            "Considérez tout gain garanti comme un signal d’alerte",
            "Vérifiez l’agrément de la société auprès du régulateur financier",
            "Demandez comment les profits sont réellement générés",
            "N’investissez jamais une somme que vous ne pouvez pas perdre"
          ],
          "todo": [
            "Si vous avez envoyé de l’argent, contactez immédiatement votre banque ou votre opérateur de mobile money via son numéro officiel.",
            "Conservez captures, numéros, liens et reçus comme preuves.",
            "Signalez l’incident aux autorités compétentes et à GLOPROFAS afin d’alerter d’autres personnes."
          ],
          "example": "Exemple illustratif : un groupe de messagerie promet 10 % de profit par semaine. Le premier petit retrait fonctionne. Après un dépôt plus important, l’administrateur exige une « taxe » avant de libérer les fonds, puis disparaît."
        }
      }
    },
    {
      "id": "d0340529-6eae-480a-9c22-acb1462beb57",
      "slug": "employment-scams",
      "icon": "briefcase",
      "featured": true,
      "imageUrl": "/images/zite/img_RNp07pYUDwb_i1sA.jpg",
      "title": {
        "en": "Fake job offers",
        "fr": "Fausses offres d’emploi"
      },
      "summary": {
        "en": "Jobs that ask you to pay a fee before you start.",
        "fr": "Des emplois qui exigent des frais avant de commencer."
      },
      "content": {
        "en": "{\"definition\":\"Employment scams use fake job offers to collect fees or personal documents from job seekers.\",\"how\":\"An attractive job is advertised, often abroad or with high pay. After a quick “interview”, you are asked to pay for registration, training, a medical test or a visa.\",\"signs\":[\"Payment required before you start\",\"An offer without a real interview\",\"Contact only through messaging apps\",\"Salary far above the market for the role\"],\"protect\":[\"Genuine employers do not charge you to be hired\",\"Research the company’s official address and phone number\",\"Do not send ID copies until you have verified the employer\",\"Be wary of offers you did not apply for\"],\"todo\":[\"If you sent money, contact your bank or mobile money provider immediately through its official number.\",\"Keep screenshots, numbers, links and receipts as evidence.\",\"Report the incident to the competent authorities and to GLOPROFAS so others can be warned.\"],\"example\":\"Illustrative example: A graduate is offered a hotel job abroad and asked to pay 75,000 FCFA for “visa processing”. After payment, the recruiter stops responding.\"}",
        "fr": "{\"definition\":\"Les arnaques à l’emploi utilisent de fausses offres pour soutirer des frais ou des documents personnels aux demandeurs d’emploi.\",\"how\":\"Un poste attrayant est proposé, souvent à l’étranger ou bien payé. Après un « entretien » rapide, on vous demande de payer une inscription, une formation, un examen médical ou un visa.\",\"signs\":[\"Paiement exigé avant de commencer\",\"Offre sans véritable entretien\",\"Contact uniquement par messagerie\",\"Salaire bien au-dessus du marché\"],\"protect\":[\"Un véritable employeur ne vous fait pas payer pour être embauché\",\"Recherchez l’adresse et le numéro officiels de l’entreprise\",\"N’envoyez pas de pièce d’identité avant d’avoir vérifié l’employeur\",\"Méfiez-vous des offres auxquelles vous n’avez pas postulé\"],\"todo\":[\"Si vous avez envoyé de l’argent, contactez immédiatement votre banque ou votre opérateur de mobile money via son numéro officiel.\",\"Conservez captures, numéros, liens et reçus comme preuves.\",\"Signalez l’incident aux autorités compétentes et à GLOPROFAS afin d’alerter d’autres personnes.\"],\"example\":\"Exemple illustratif : un diplômé se voit proposer un emploi d’hôtel à l’étranger et doit payer 75 000 FCFA de « frais de visa ». Après paiement, le recruteur ne répond plus.\"}"
      },
      "parsedContent": {
        "en": {
          "definition": "Employment scams use fake job offers to collect fees or personal documents from job seekers.",
          "how": "An attractive job is advertised, often abroad or with high pay. After a quick “interview”, you are asked to pay for registration, training, a medical test or a visa.",
          "signs": [
            "Payment required before you start",
            "An offer without a real interview",
            "Contact only through messaging apps",
            "Salary far above the market for the role"
          ],
          "protect": [
            "Genuine employers do not charge you to be hired",
            "Research the company’s official address and phone number",
            "Do not send ID copies until you have verified the employer",
            "Be wary of offers you did not apply for"
          ],
          "todo": [
            "If you sent money, contact your bank or mobile money provider immediately through its official number.",
            "Keep screenshots, numbers, links and receipts as evidence.",
            "Report the incident to the competent authorities and to GLOPROFAS so others can be warned."
          ],
          "example": "Illustrative example: A graduate is offered a hotel job abroad and asked to pay 75,000 FCFA for “visa processing”. After payment, the recruiter stops responding."
        },
        "fr": {
          "definition": "Les arnaques à l’emploi utilisent de fausses offres pour soutirer des frais ou des documents personnels aux demandeurs d’emploi.",
          "how": "Un poste attrayant est proposé, souvent à l’étranger ou bien payé. Après un « entretien » rapide, on vous demande de payer une inscription, une formation, un examen médical ou un visa.",
          "signs": [
            "Paiement exigé avant de commencer",
            "Offre sans véritable entretien",
            "Contact uniquement par messagerie",
            "Salaire bien au-dessus du marché"
          ],
          "protect": [
            "Un véritable employeur ne vous fait pas payer pour être embauché",
            "Recherchez l’adresse et le numéro officiels de l’entreprise",
            "N’envoyez pas de pièce d’identité avant d’avoir vérifié l’employeur",
            "Méfiez-vous des offres auxquelles vous n’avez pas postulé"
          ],
          "todo": [
            "Si vous avez envoyé de l’argent, contactez immédiatement votre banque ou votre opérateur de mobile money via son numéro officiel.",
            "Conservez captures, numéros, liens et reçus comme preuves.",
            "Signalez l’incident aux autorités compétentes et à GLOPROFAS afin d’alerter d’autres personnes."
          ],
          "example": "Exemple illustratif : un diplômé se voit proposer un emploi d’hôtel à l’étranger et doit payer 75 000 FCFA de « frais de visa ». Après paiement, le recruteur ne répond plus."
        }
      }
    },
    {
      "id": "ccf6d545-7d64-4789-8ab6-effba18dcbcc",
      "slug": "romance-scams",
      "icon": "heart-crack",
      "featured": false,
      "imageUrl": "/images/zite/img_JX8TbpNwVvMe9H2u.jpg",
      "title": {
        "en": "Romance scams",
        "fr": "Arnaques sentimentales"
      },
      "summary": {
        "en": "Online relationships built to ask for money.",
        "fr": "Relations en ligne construites pour demander de l’argent."
      },
      "content": {
        "en": "{\"definition\":\"Romance scams build an online relationship in order to ask for money.\",\"how\":\"The scammer spends weeks building trust and affection, then faces a sudden emergency: a hospital bill, a blocked parcel, a ticket to visit you.\",\"signs\":[\"They always avoid video calls or meeting\",\"Declarations of love very quickly\",\"Repeated emergencies needing money\",\"Requests to keep the relationship secret\"],\"protect\":[\"Never send money to someone you have not met in person\",\"Do a reverse image search of their photos\",\"Talk to a trusted friend about the relationship\",\"Be cautious of anyone who moves you off the dating app quickly\"],\"todo\":[\"If you sent money, contact your bank or mobile money provider immediately through its official number.\",\"Keep screenshots, numbers, links and receipts as evidence.\",\"Report the incident to the competent authorities and to GLOPROFAS so others can be warned.\"],\"example\":\"Illustrative example: After two months of daily messages, a “doctor working abroad” asks for help paying customs on a gift. Then another fee appears, and another.\"}",
        "fr": "{\"definition\":\"Les arnaques sentimentales construisent une relation en ligne afin de demander de l’argent.\",\"how\":\"L’escroc passe des semaines à gagner votre confiance et votre affection, puis survient une urgence : facture d’hôpital, colis bloqué, billet pour venir vous voir.\",\"signs\":[\"Refus constant des appels vidéo ou des rencontres\",\"Déclarations d’amour très rapides\",\"Urgences répétées nécessitant de l’argent\",\"Demande de garder la relation secrète\"],\"protect\":[\"N’envoyez jamais d’argent à quelqu’un que vous n’avez pas rencontré\",\"Faites une recherche inversée de ses photos\",\"Parlez de la relation à une personne de confiance\",\"Méfiez-vous de qui vous fait quitter vite l’application de rencontre\"],\"todo\":[\"Si vous avez envoyé de l’argent, contactez immédiatement votre banque ou votre opérateur de mobile money via son numéro officiel.\",\"Conservez captures, numéros, liens et reçus comme preuves.\",\"Signalez l’incident aux autorités compétentes et à GLOPROFAS afin d’alerter d’autres personnes.\"],\"example\":\"Exemple illustratif : après deux mois de messages quotidiens, un « médecin travaillant à l’étranger » demande de l’aide pour payer la douane d’un cadeau. Puis d’autres frais apparaissent.\"}"
      },
      "parsedContent": {
        "en": {
          "definition": "Romance scams build an online relationship in order to ask for money.",
          "how": "The scammer spends weeks building trust and affection, then faces a sudden emergency: a hospital bill, a blocked parcel, a ticket to visit you.",
          "signs": [
            "They always avoid video calls or meeting",
            "Declarations of love very quickly",
            "Repeated emergencies needing money",
            "Requests to keep the relationship secret"
          ],
          "protect": [
            "Never send money to someone you have not met in person",
            "Do a reverse image search of their photos",
            "Talk to a trusted friend about the relationship",
            "Be cautious of anyone who moves you off the dating app quickly"
          ],
          "todo": [
            "If you sent money, contact your bank or mobile money provider immediately through its official number.",
            "Keep screenshots, numbers, links and receipts as evidence.",
            "Report the incident to the competent authorities and to GLOPROFAS so others can be warned."
          ],
          "example": "Illustrative example: After two months of daily messages, a “doctor working abroad” asks for help paying customs on a gift. Then another fee appears, and another."
        },
        "fr": {
          "definition": "Les arnaques sentimentales construisent une relation en ligne afin de demander de l’argent.",
          "how": "L’escroc passe des semaines à gagner votre confiance et votre affection, puis survient une urgence : facture d’hôpital, colis bloqué, billet pour venir vous voir.",
          "signs": [
            "Refus constant des appels vidéo ou des rencontres",
            "Déclarations d’amour très rapides",
            "Urgences répétées nécessitant de l’argent",
            "Demande de garder la relation secrète"
          ],
          "protect": [
            "N’envoyez jamais d’argent à quelqu’un que vous n’avez pas rencontré",
            "Faites une recherche inversée de ses photos",
            "Parlez de la relation à une personne de confiance",
            "Méfiez-vous de qui vous fait quitter vite l’application de rencontre"
          ],
          "todo": [
            "Si vous avez envoyé de l’argent, contactez immédiatement votre banque ou votre opérateur de mobile money via son numéro officiel.",
            "Conservez captures, numéros, liens et reçus comme preuves.",
            "Signalez l’incident aux autorités compétentes et à GLOPROFAS afin d’alerter d’autres personnes."
          ],
          "example": "Exemple illustratif : après deux mois de messages quotidiens, un « médecin travaillant à l’étranger » demande de l’aide pour payer la douane d’un cadeau. Puis d’autres frais apparaissent."
        }
      }
    },
    {
      "id": "0c1682a4-3cd1-4406-be5f-7510c489f4f9",
      "slug": "online-shopping-scams",
      "icon": "shopping-bag",
      "featured": false,
      "imageUrl": "/images/zite/img_2VpUb4pq-e8YvIr-.jpg",
      "title": {
        "en": "Online shopping scams",
        "fr": "Arnaques aux achats en ligne"
      },
      "summary": {
        "en": "Goods paid for that never arrive.",
        "fr": "Des articles payés qui n’arrivent jamais."
      },
      "content": {
        "en": "{\"definition\":\"Online shopping scams take your payment for goods that never arrive or are not as described.\",\"how\":\"A seller on social media offers a phone or appliance at a very low price and asks for full payment by transfer. Once paid, they block you.\",\"signs\":[\"Prices far below the normal market\",\"Payment only by direct transfer\",\"New pages with few real reviews\",\"Pressure: “only one left today”\"],\"protect\":[\"Prefer cash on delivery or protected payment options\",\"Check the seller’s history and reviews\",\"Meet in a safe public place for local purchases\",\"Keep all messages and receipts\"],\"todo\":[\"If you sent money, contact your bank or mobile money provider immediately through its official number.\",\"Keep screenshots, numbers, links and receipts as evidence.\",\"Report the incident to the competent authorities and to GLOPROFAS so others can be warned.\"],\"example\":\"Illustrative example: A page sells new smartphones at half price. The buyer pays by mobile money and receives a fake tracking number; the page vanishes a week later.\"}",
        "fr": "{\"definition\":\"Les arnaques aux achats en ligne encaissent votre paiement pour des articles qui n’arrivent jamais ou ne correspondent pas.\",\"how\":\"Un vendeur sur les réseaux sociaux propose un téléphone à très bas prix et exige un paiement complet par transfert. Une fois payé, il vous bloque.\",\"signs\":[\"Prix très inférieurs au marché\",\"Paiement uniquement par transfert direct\",\"Pages récentes avec peu d’avis réels\",\"Pression : « plus qu’un seul aujourd’hui »\"],\"protect\":[\"Privilégiez le paiement à la livraison ou protégé\",\"Vérifiez l’historique et les avis du vendeur\",\"Pour un achat local, rencontrez-vous dans un lieu public\",\"Conservez messages et reçus\"],\"todo\":[\"Si vous avez envoyé de l’argent, contactez immédiatement votre banque ou votre opérateur de mobile money via son numéro officiel.\",\"Conservez captures, numéros, liens et reçus comme preuves.\",\"Signalez l’incident aux autorités compétentes et à GLOPROFAS afin d’alerter d’autres personnes.\"],\"example\":\"Exemple illustratif : une page vend des smartphones neufs à moitié prix. L’acheteur paie par mobile money et reçoit un faux numéro de suivi ; la page disparaît une semaine plus tard.\"}"
      },
      "parsedContent": {
        "en": {
          "definition": "Online shopping scams take your payment for goods that never arrive or are not as described.",
          "how": "A seller on social media offers a phone or appliance at a very low price and asks for full payment by transfer. Once paid, they block you.",
          "signs": [
            "Prices far below the normal market",
            "Payment only by direct transfer",
            "New pages with few real reviews",
            "Pressure: “only one left today”"
          ],
          "protect": [
            "Prefer cash on delivery or protected payment options",
            "Check the seller’s history and reviews",
            "Meet in a safe public place for local purchases",
            "Keep all messages and receipts"
          ],
          "todo": [
            "If you sent money, contact your bank or mobile money provider immediately through its official number.",
            "Keep screenshots, numbers, links and receipts as evidence.",
            "Report the incident to the competent authorities and to GLOPROFAS so others can be warned."
          ],
          "example": "Illustrative example: A page sells new smartphones at half price. The buyer pays by mobile money and receives a fake tracking number; the page vanishes a week later."
        },
        "fr": {
          "definition": "Les arnaques aux achats en ligne encaissent votre paiement pour des articles qui n’arrivent jamais ou ne correspondent pas.",
          "how": "Un vendeur sur les réseaux sociaux propose un téléphone à très bas prix et exige un paiement complet par transfert. Une fois payé, il vous bloque.",
          "signs": [
            "Prix très inférieurs au marché",
            "Paiement uniquement par transfert direct",
            "Pages récentes avec peu d’avis réels",
            "Pression : « plus qu’un seul aujourd’hui »"
          ],
          "protect": [
            "Privilégiez le paiement à la livraison ou protégé",
            "Vérifiez l’historique et les avis du vendeur",
            "Pour un achat local, rencontrez-vous dans un lieu public",
            "Conservez messages et reçus"
          ],
          "todo": [
            "Si vous avez envoyé de l’argent, contactez immédiatement votre banque ou votre opérateur de mobile money via son numéro officiel.",
            "Conservez captures, numéros, liens et reçus comme preuves.",
            "Signalez l’incident aux autorités compétentes et à GLOPROFAS afin d’alerter d’autres personnes."
          ],
          "example": "Exemple illustratif : une page vend des smartphones neufs à moitié prix. L’acheteur paie par mobile money et reçoit un faux numéro de suivi ; la page disparaît une semaine plus tard."
        }
      }
    },
    {
      "id": "9be370e4-1325-474f-9e9d-48d7080c98e9",
      "slug": "cryptocurrency-scams",
      "icon": "bitcoin",
      "featured": false,
      "imageUrl": "/images/zite/img_S-KECSoRY5SCp7RJ.jpg",
      "title": {
        "en": "Cryptocurrency scams",
        "fr": "Arnaques aux cryptomonnaies"
      },
      "summary": {
        "en": "Fake platforms and coins that trap deposits.",
        "fr": "Fausses plateformes qui bloquent vos dépôts."
      },
      "content": {
        "en": "{\"definition\":\"Cryptocurrency scams use fake trading platforms, coins or “mentors” to take your deposits.\",\"how\":\"A mentor shows impressive profits on a platform you have never heard of. Your balance grows on screen, but when you try to withdraw, you must pay fees first.\",\"signs\":[\"Unknown platforms showing constant gains\",\"A “mentor” who manages your account\",\"Withdrawal blocked until you pay a fee\",\"Requests to send crypto to a personal wallet\"],\"protect\":[\"Use only well-known, regulated exchanges\",\"Never give anyone remote access to your device\",\"Be suspicious of profit screenshots\",\"If withdrawal requires a fee, stop paying\"],\"todo\":[\"If you sent money, contact your bank or mobile money provider immediately through its official number.\",\"Keep screenshots, numbers, links and receipts as evidence.\",\"Report the incident to the competent authorities and to GLOPROFAS so others can be warned.\"],\"example\":\"Illustrative example: A student deposits a small amount on a platform recommended in a chat group. The dashboard shows it doubling. To withdraw, he is asked to pay 20%. The site goes offline.\"}",
        "fr": "{\"definition\":\"Les arnaques aux cryptomonnaies utilisent de fausses plateformes, de faux jetons ou de faux « mentors » pour capter vos dépôts.\",\"how\":\"Un mentor montre des profits impressionnants sur une plateforme inconnue. Votre solde grimpe à l’écran, mais pour retirer, il faut d’abord payer des frais.\",\"signs\":[\"Plateformes inconnues affichant des gains constants\",\"Un « mentor » qui gère votre compte\",\"Retrait bloqué jusqu’au paiement de frais\",\"Demande d’envoyer des cryptos vers un portefeuille personnel\"],\"protect\":[\"Utilisez uniquement des plateformes connues et réglementées\",\"Ne donnez jamais un accès à distance à votre appareil\",\"Méfiez-vous des captures de profits\",\"Si un retrait exige des frais, arrêtez de payer\"],\"todo\":[\"Si vous avez envoyé de l’argent, contactez immédiatement votre banque ou votre opérateur de mobile money via son numéro officiel.\",\"Conservez captures, numéros, liens et reçus comme preuves.\",\"Signalez l’incident aux autorités compétentes et à GLOPROFAS afin d’alerter d’autres personnes.\"],\"example\":\"Exemple illustratif : un étudiant dépose une petite somme sur une plateforme recommandée dans un groupe. Le tableau de bord montre qu’elle double. Pour retirer, on lui demande 20 %. Le site disparaît.\"}"
      },
      "parsedContent": {
        "en": {
          "definition": "Cryptocurrency scams use fake trading platforms, coins or “mentors” to take your deposits.",
          "how": "A mentor shows impressive profits on a platform you have never heard of. Your balance grows on screen, but when you try to withdraw, you must pay fees first.",
          "signs": [
            "Unknown platforms showing constant gains",
            "A “mentor” who manages your account",
            "Withdrawal blocked until you pay a fee",
            "Requests to send crypto to a personal wallet"
          ],
          "protect": [
            "Use only well-known, regulated exchanges",
            "Never give anyone remote access to your device",
            "Be suspicious of profit screenshots",
            "If withdrawal requires a fee, stop paying"
          ],
          "todo": [
            "If you sent money, contact your bank or mobile money provider immediately through its official number.",
            "Keep screenshots, numbers, links and receipts as evidence.",
            "Report the incident to the competent authorities and to GLOPROFAS so others can be warned."
          ],
          "example": "Illustrative example: A student deposits a small amount on a platform recommended in a chat group. The dashboard shows it doubling. To withdraw, he is asked to pay 20%. The site goes offline."
        },
        "fr": {
          "definition": "Les arnaques aux cryptomonnaies utilisent de fausses plateformes, de faux jetons ou de faux « mentors » pour capter vos dépôts.",
          "how": "Un mentor montre des profits impressionnants sur une plateforme inconnue. Votre solde grimpe à l’écran, mais pour retirer, il faut d’abord payer des frais.",
          "signs": [
            "Plateformes inconnues affichant des gains constants",
            "Un « mentor » qui gère votre compte",
            "Retrait bloqué jusqu’au paiement de frais",
            "Demande d’envoyer des cryptos vers un portefeuille personnel"
          ],
          "protect": [
            "Utilisez uniquement des plateformes connues et réglementées",
            "Ne donnez jamais un accès à distance à votre appareil",
            "Méfiez-vous des captures de profits",
            "Si un retrait exige des frais, arrêtez de payer"
          ],
          "todo": [
            "Si vous avez envoyé de l’argent, contactez immédiatement votre banque ou votre opérateur de mobile money via son numéro officiel.",
            "Conservez captures, numéros, liens et reçus comme preuves.",
            "Signalez l’incident aux autorités compétentes et à GLOPROFAS afin d’alerter d’autres personnes."
          ],
          "example": "Exemple illustratif : un étudiant dépose une petite somme sur une plateforme recommandée dans un groupe. Le tableau de bord montre qu’elle double. Pour retirer, on lui demande 20 %. Le site disparaît."
        }
      }
    },
    {
      "id": "2db4d516-84ad-4282-a647-be76f921f6f4",
      "slug": "impersonation-scams",
      "icon": "user-x",
      "featured": false,
      "imageUrl": "/images/zite/img_26twh5qIAbvzqRdl.jpg",
      "title": {
        "en": "Impersonation scams",
        "fr": "Usurpation d’identité"
      },
      "summary": {
        "en": "Someone pretends to be a relative, bank or official.",
        "fr": "Quelqu’un se fait passer pour un proche, une banque ou un agent."
      },
      "content": {
        "en": "{\"definition\":\"Impersonation scams involve someone pretending to be a relative, a bank, an operator or an official to get money or information.\",\"how\":\"A caller says your son had an accident, or a “bank officer” needs to verify your account. The story is urgent and emotional so you act before checking.\",\"signs\":[\"A new number claiming to be a family member\",\"Requests to keep it secret\",\"Officials asking for payment by mobile money\",\"Callers who already know a few details about you\"],\"protect\":[\"Hang up and call the person or organisation on a number you already know\",\"Agree a family code word for emergencies\",\"Banks and authorities do not ask for PINs by phone\",\"Limit personal details you post publicly\"],\"todo\":[\"If you sent money, contact your bank or mobile money provider immediately through its official number.\",\"Keep screenshots, numbers, links and receipts as evidence.\",\"Report the incident to the competent authorities and to GLOPROFAS so others can be warned.\"],\"example\":\"Illustrative example: A grandmother receives a call from “her grandson’s friend” saying he is in hospital and needs money now. She calls her grandson directly; he is fine.\"}",
        "fr": "{\"definition\":\"L’usurpation consiste à se faire passer pour un proche, une banque, un opérateur ou un agent public afin d’obtenir de l’argent ou des informations.\",\"how\":\"Un appelant annonce que votre fils a eu un accident, ou un « conseiller bancaire » doit vérifier votre compte. L’histoire est urgente et émotive pour vous faire agir avant de vérifier.\",\"signs\":[\"Un nouveau numéro se disant membre de la famille\",\"Demande de garder le secret\",\"Agents exigeant un paiement par mobile money\",\"Appelants connaissant déjà quelques détails sur vous\"],\"protect\":[\"Raccrochez et rappelez la personne sur un numéro que vous connaissez\",\"Convenez d’un mot de code familial pour les urgences\",\"Banques et autorités ne demandent pas de code par téléphone\",\"Limitez les informations personnelles publiées\"],\"todo\":[\"Si vous avez envoyé de l’argent, contactez immédiatement votre banque ou votre opérateur de mobile money via son numéro officiel.\",\"Conservez captures, numéros, liens et reçus comme preuves.\",\"Signalez l’incident aux autorités compétentes et à GLOPROFAS afin d’alerter d’autres personnes.\"],\"example\":\"Exemple illustratif : une grand-mère reçoit l’appel d’un « ami de son petit-fils » affirmant qu’il est à l’hôpital et a besoin d’argent. Elle appelle son petit-fils : il va bien.\"}"
      },
      "parsedContent": {
        "en": {
          "definition": "Impersonation scams involve someone pretending to be a relative, a bank, an operator or an official to get money or information.",
          "how": "A caller says your son had an accident, or a “bank officer” needs to verify your account. The story is urgent and emotional so you act before checking.",
          "signs": [
            "A new number claiming to be a family member",
            "Requests to keep it secret",
            "Officials asking for payment by mobile money",
            "Callers who already know a few details about you"
          ],
          "protect": [
            "Hang up and call the person or organisation on a number you already know",
            "Agree a family code word for emergencies",
            "Banks and authorities do not ask for PINs by phone",
            "Limit personal details you post publicly"
          ],
          "todo": [
            "If you sent money, contact your bank or mobile money provider immediately through its official number.",
            "Keep screenshots, numbers, links and receipts as evidence.",
            "Report the incident to the competent authorities and to GLOPROFAS so others can be warned."
          ],
          "example": "Illustrative example: A grandmother receives a call from “her grandson’s friend” saying he is in hospital and needs money now. She calls her grandson directly; he is fine."
        },
        "fr": {
          "definition": "L’usurpation consiste à se faire passer pour un proche, une banque, un opérateur ou un agent public afin d’obtenir de l’argent ou des informations.",
          "how": "Un appelant annonce que votre fils a eu un accident, ou un « conseiller bancaire » doit vérifier votre compte. L’histoire est urgente et émotive pour vous faire agir avant de vérifier.",
          "signs": [
            "Un nouveau numéro se disant membre de la famille",
            "Demande de garder le secret",
            "Agents exigeant un paiement par mobile money",
            "Appelants connaissant déjà quelques détails sur vous"
          ],
          "protect": [
            "Raccrochez et rappelez la personne sur un numéro que vous connaissez",
            "Convenez d’un mot de code familial pour les urgences",
            "Banques et autorités ne demandent pas de code par téléphone",
            "Limitez les informations personnelles publiées"
          ],
          "todo": [
            "Si vous avez envoyé de l’argent, contactez immédiatement votre banque ou votre opérateur de mobile money via son numéro officiel.",
            "Conservez captures, numéros, liens et reçus comme preuves.",
            "Signalez l’incident aux autorités compétentes et à GLOPROFAS afin d’alerter d’autres personnes."
          ],
          "example": "Exemple illustratif : une grand-mère reçoit l’appel d’un « ami de son petit-fils » affirmant qu’il est à l’hôpital et a besoin d’argent. Elle appelle son petit-fils : il va bien."
        }
      }
    },
    {
      "id": "caa59926-95df-468d-b782-37e2ca01c22a",
      "slug": "advance-fee-scams",
      "icon": "hand-coins",
      "featured": false,
      "imageUrl": "/images/zite/img_vjmeNsjN4mRiRXTp.jpg",
      "title": {
        "en": "Advance-fee scams",
        "fr": "Arnaques aux avances de frais"
      },
      "summary": {
        "en": "Pay a small fee now to unlock a large sum later.",
        "fr": "Payer de petits frais pour débloquer une grosse somme."
      },
      "content": {
        "en": "{\"definition\":\"Advance-fee scams ask you to pay a small amount now to unlock a much larger sum: an inheritance, a prize, a contract or a grant.\",\"how\":\"Each payment is followed by a new obstacle: a tax, a lawyer’s fee, a transfer charge. The large sum never comes.\",\"signs\":[\"A windfall you never expected\",\"Fees to release money that is “yours”\",\"Official-looking documents and stamps\",\"Requests for secrecy\"],\"protect\":[\"Never pay to receive money\",\"Verify any “official” directly with the institution\",\"Search the wording of the message online\",\"Ask a trusted person before paying anything\"],\"todo\":[\"If you sent money, contact your bank or mobile money provider immediately through its official number.\",\"Keep screenshots, numbers, links and receipts as evidence.\",\"Report the incident to the competent authorities and to GLOPROFAS so others can be warned.\"],\"example\":\"Illustrative example: A letter claims a distant relative left an inheritance. A “lawyer” asks for processing fees, then court fees, then a transfer tax.\"}",
        "fr": "{\"definition\":\"Les arnaques aux avances de frais vous demandent de payer une petite somme pour débloquer un montant bien plus important : héritage, prix, contrat ou subvention.\",\"how\":\"Chaque paiement est suivi d’un nouvel obstacle : taxe, honoraires d’avocat, frais de transfert. La grosse somme n’arrive jamais.\",\"signs\":[\"Une aubaine totalement inattendue\",\"Des frais pour libérer un argent « à vous »\",\"Documents et tampons d’apparence officielle\",\"Demande de discrétion\"],\"protect\":[\"Ne payez jamais pour recevoir de l’argent\",\"Vérifiez tout document « officiel » auprès de l’institution\",\"Recherchez le texte du message en ligne\",\"Demandez conseil à une personne de confiance\"],\"todo\":[\"Si vous avez envoyé de l’argent, contactez immédiatement votre banque ou votre opérateur de mobile money via son numéro officiel.\",\"Conservez captures, numéros, liens et reçus comme preuves.\",\"Signalez l’incident aux autorités compétentes et à GLOPROFAS afin d’alerter d’autres personnes.\"],\"example\":\"Exemple illustratif : une lettre annonce l’héritage d’un parent éloigné. Un « avocat » réclame des frais de dossier, puis de tribunal, puis une taxe de transfert.\"}"
      },
      "parsedContent": {
        "en": {
          "definition": "Advance-fee scams ask you to pay a small amount now to unlock a much larger sum: an inheritance, a prize, a contract or a grant.",
          "how": "Each payment is followed by a new obstacle: a tax, a lawyer’s fee, a transfer charge. The large sum never comes.",
          "signs": [
            "A windfall you never expected",
            "Fees to release money that is “yours”",
            "Official-looking documents and stamps",
            "Requests for secrecy"
          ],
          "protect": [
            "Never pay to receive money",
            "Verify any “official” directly with the institution",
            "Search the wording of the message online",
            "Ask a trusted person before paying anything"
          ],
          "todo": [
            "If you sent money, contact your bank or mobile money provider immediately through its official number.",
            "Keep screenshots, numbers, links and receipts as evidence.",
            "Report the incident to the competent authorities and to GLOPROFAS so others can be warned."
          ],
          "example": "Illustrative example: A letter claims a distant relative left an inheritance. A “lawyer” asks for processing fees, then court fees, then a transfer tax."
        },
        "fr": {
          "definition": "Les arnaques aux avances de frais vous demandent de payer une petite somme pour débloquer un montant bien plus important : héritage, prix, contrat ou subvention.",
          "how": "Chaque paiement est suivi d’un nouvel obstacle : taxe, honoraires d’avocat, frais de transfert. La grosse somme n’arrive jamais.",
          "signs": [
            "Une aubaine totalement inattendue",
            "Des frais pour libérer un argent « à vous »",
            "Documents et tampons d’apparence officielle",
            "Demande de discrétion"
          ],
          "protect": [
            "Ne payez jamais pour recevoir de l’argent",
            "Vérifiez tout document « officiel » auprès de l’institution",
            "Recherchez le texte du message en ligne",
            "Demandez conseil à une personne de confiance"
          ],
          "todo": [
            "Si vous avez envoyé de l’argent, contactez immédiatement votre banque ou votre opérateur de mobile money via son numéro officiel.",
            "Conservez captures, numéros, liens et reçus comme preuves.",
            "Signalez l’incident aux autorités compétentes et à GLOPROFAS afin d’alerter d’autres personnes."
          ],
          "example": "Exemple illustratif : une lettre annonce l’héritage d’un parent éloigné. Un « avocat » réclame des frais de dossier, puis de tribunal, puis une taxe de transfert."
        }
      }
    },
    {
      "id": "6212716a-bc2c-4a35-81dd-9af06475dba0",
      "slug": "fake-loan-scams",
      "icon": "landmark",
      "featured": false,
      "imageUrl": "/images/zite/img_9nFXPoNmoeCwAfJE.jpg",
      "title": {
        "en": "Fake loan scams",
        "fr": "Faux prêts"
      },
      "summary": {
        "en": "Loans that require upfront “processing” payments.",
        "fr": "Des prêts qui exigent des frais de dossier à l’avance."
      },
      "content": {
        "en": "{\"definition\":\"Fake loan scams promise quick credit with no checks, then demand upfront payments before the loan is released.\",\"how\":\"An advert offers instant approval. You are asked to pay insurance, a processing fee or a deposit. The loan never arrives, or an app harvests your contacts to harass you.\",\"signs\":[\"Guaranteed approval regardless of credit\",\"Fees required before disbursement\",\"Apps asking for access to your contacts and photos\",\"Lenders with no physical address\"],\"protect\":[\"Borrow only from licensed institutions\",\"Legitimate lenders deduct fees from the loan, not before\",\"Check app permissions before installing\",\"Read reviews from independent sources\"],\"todo\":[\"If you sent money, contact your bank or mobile money provider immediately through its official number.\",\"Keep screenshots, numbers, links and receipts as evidence.\",\"Report the incident to the competent authorities and to GLOPROFAS so others can be warned.\"],\"example\":\"Illustrative example: A couple facing school fees responds to an “instant loan” advert. They pay 15,000 FCFA for “insurance”. The loan officer then asks for a second fee.\"}",
        "fr": "{\"definition\":\"Les faux prêts promettent un crédit rapide sans vérification, puis exigent des paiements avant le décaissement.\",\"how\":\"Une annonce promet une approbation immédiate. On vous demande une assurance, des frais de dossier ou un dépôt. Le prêt n’arrive jamais, ou une application aspire vos contacts pour vous harceler.\",\"signs\":[\"Approbation garantie quel que soit votre profil\",\"Frais exigés avant le décaissement\",\"Applications demandant l’accès à vos contacts et photos\",\"Prêteurs sans adresse physique\"],\"protect\":[\"Empruntez uniquement auprès d’établissements agréés\",\"Un vrai prêteur déduit les frais du prêt, pas avant\",\"Vérifiez les autorisations des applications\",\"Consultez des avis indépendants\"],\"todo\":[\"Si vous avez envoyé de l’argent, contactez immédiatement votre banque ou votre opérateur de mobile money via son numéro officiel.\",\"Conservez captures, numéros, liens et reçus comme preuves.\",\"Signalez l’incident aux autorités compétentes et à GLOPROFAS afin d’alerter d’autres personnes.\"],\"example\":\"Exemple illustratif : un couple confronté aux frais de scolarité répond à une annonce de « prêt instantané ». Il paie 15 000 FCFA d’« assurance ». Le conseiller réclame ensuite d’autres frais.\"}"
      },
      "parsedContent": {
        "en": {
          "definition": "Fake loan scams promise quick credit with no checks, then demand upfront payments before the loan is released.",
          "how": "An advert offers instant approval. You are asked to pay insurance, a processing fee or a deposit. The loan never arrives, or an app harvests your contacts to harass you.",
          "signs": [
            "Guaranteed approval regardless of credit",
            "Fees required before disbursement",
            "Apps asking for access to your contacts and photos",
            "Lenders with no physical address"
          ],
          "protect": [
            "Borrow only from licensed institutions",
            "Legitimate lenders deduct fees from the loan, not before",
            "Check app permissions before installing",
            "Read reviews from independent sources"
          ],
          "todo": [
            "If you sent money, contact your bank or mobile money provider immediately through its official number.",
            "Keep screenshots, numbers, links and receipts as evidence.",
            "Report the incident to the competent authorities and to GLOPROFAS so others can be warned."
          ],
          "example": "Illustrative example: A couple facing school fees responds to an “instant loan” advert. They pay 15,000 FCFA for “insurance”. The loan officer then asks for a second fee."
        },
        "fr": {
          "definition": "Les faux prêts promettent un crédit rapide sans vérification, puis exigent des paiements avant le décaissement.",
          "how": "Une annonce promet une approbation immédiate. On vous demande une assurance, des frais de dossier ou un dépôt. Le prêt n’arrive jamais, ou une application aspire vos contacts pour vous harceler.",
          "signs": [
            "Approbation garantie quel que soit votre profil",
            "Frais exigés avant le décaissement",
            "Applications demandant l’accès à vos contacts et photos",
            "Prêteurs sans adresse physique"
          ],
          "protect": [
            "Empruntez uniquement auprès d’établissements agréés",
            "Un vrai prêteur déduit les frais du prêt, pas avant",
            "Vérifiez les autorisations des applications",
            "Consultez des avis indépendants"
          ],
          "todo": [
            "Si vous avez envoyé de l’argent, contactez immédiatement votre banque ou votre opérateur de mobile money via son numéro officiel.",
            "Conservez captures, numéros, liens et reçus comme preuves.",
            "Signalez l’incident aux autorités compétentes et à GLOPROFAS afin d’alerter d’autres personnes."
          ],
          "example": "Exemple illustratif : un couple confronté aux frais de scolarité répond à une annonce de « prêt instantané ». Il paie 15 000 FCFA d’« assurance ». Le conseiller réclame ensuite d’autres frais."
        }
      }
    },
    {
      "id": "70079712-f87a-4d95-b47c-8bb336b20f82",
      "slug": "business-email-compromise",
      "icon": "building-2",
      "featured": false,
      "imageUrl": "/images/article-business-controls.jpg",
      "title": {
        "en": "Business email compromise",
        "fr": "Compromission de messagerie d’entreprise"
      },
      "summary": {
        "en": "Hijacked or spoofed emails that redirect payments.",
        "fr": "Courriels piratés ou usurpés qui détournent des paiements."
      },
      "content": {
        "en": "{\"definition\":\"Business email compromise uses a hacked or look-alike email account to redirect payments or obtain sensitive data from an organisation.\",\"how\":\"A supplier’s “new bank details” arrive by email, or the “director” urgently asks finance to make a confidential transfer. The address looks almost right.\",\"signs\":[\"Last-minute changes to bank details\",\"Urgent, confidential payment requests from executives\",\"Slightly altered email domains\",\"Requests to bypass normal approval\"],\"protect\":[\"Confirm any change of bank details by phone on a known number\",\"Require two approvals for transfers\",\"Enable two-step verification on all business email\",\"Train staff to pause on urgent payment requests\"],\"todo\":[\"If you sent money, contact your bank or mobile money provider immediately through its official number.\",\"Keep screenshots, numbers, links and receipts as evidence.\",\"Report the incident to the competent authorities and to GLOPROFAS so others can be warned.\"],\"example\":\"Illustrative example: An accountant receives an invoice from a regular supplier with new account details. A quick call to the supplier’s known number reveals they changed nothing.\"}",
        "fr": "{\"definition\":\"La compromission de messagerie d’entreprise utilise un compte piraté ou imité pour détourner des paiements ou obtenir des données sensibles.\",\"how\":\"Les « nouvelles coordonnées bancaires » d’un fournisseur arrivent par courriel, ou le « directeur » demande en urgence un virement confidentiel. L’adresse semble presque correcte.\",\"signs\":[\"Changements de coordonnées bancaires de dernière minute\",\"Demandes de paiement urgentes et confidentielles de la direction\",\"Domaines de messagerie légèrement modifiés\",\"Demandes de contourner la validation habituelle\"],\"protect\":[\"Confirmez tout changement de coordonnées par téléphone, sur un numéro connu\",\"Exigez une double validation des virements\",\"Activez la validation en deux étapes sur toutes les messageries\",\"Formez le personnel à marquer une pause face à l’urgence\"],\"todo\":[\"Si vous avez envoyé de l’argent, contactez immédiatement votre banque ou votre opérateur de mobile money via son numéro officiel.\",\"Conservez captures, numéros, liens et reçus comme preuves.\",\"Signalez l’incident aux autorités compétentes et à GLOPROFAS afin d’alerter d’autres personnes.\"],\"example\":\"Exemple illustratif : une comptable reçoit d’un fournisseur habituel une facture avec un nouveau compte. Un appel au numéro connu du fournisseur révèle qu’il n’a rien changé.\"}"
      },
      "parsedContent": {
        "en": {
          "definition": "Business email compromise uses a hacked or look-alike email account to redirect payments or obtain sensitive data from an organisation.",
          "how": "A supplier’s “new bank details” arrive by email, or the “director” urgently asks finance to make a confidential transfer. The address looks almost right.",
          "signs": [
            "Last-minute changes to bank details",
            "Urgent, confidential payment requests from executives",
            "Slightly altered email domains",
            "Requests to bypass normal approval"
          ],
          "protect": [
            "Confirm any change of bank details by phone on a known number",
            "Require two approvals for transfers",
            "Enable two-step verification on all business email",
            "Train staff to pause on urgent payment requests"
          ],
          "todo": [
            "If you sent money, contact your bank or mobile money provider immediately through its official number.",
            "Keep screenshots, numbers, links and receipts as evidence.",
            "Report the incident to the competent authorities and to GLOPROFAS so others can be warned."
          ],
          "example": "Illustrative example: An accountant receives an invoice from a regular supplier with new account details. A quick call to the supplier’s known number reveals they changed nothing."
        },
        "fr": {
          "definition": "La compromission de messagerie d’entreprise utilise un compte piraté ou imité pour détourner des paiements ou obtenir des données sensibles.",
          "how": "Les « nouvelles coordonnées bancaires » d’un fournisseur arrivent par courriel, ou le « directeur » demande en urgence un virement confidentiel. L’adresse semble presque correcte.",
          "signs": [
            "Changements de coordonnées bancaires de dernière minute",
            "Demandes de paiement urgentes et confidentielles de la direction",
            "Domaines de messagerie légèrement modifiés",
            "Demandes de contourner la validation habituelle"
          ],
          "protect": [
            "Confirmez tout changement de coordonnées par téléphone, sur un numéro connu",
            "Exigez une double validation des virements",
            "Activez la validation en deux étapes sur toutes les messageries",
            "Formez le personnel à marquer une pause face à l’urgence"
          ],
          "todo": [
            "Si vous avez envoyé de l’argent, contactez immédiatement votre banque ou votre opérateur de mobile money via son numéro officiel.",
            "Conservez captures, numéros, liens et reçus comme preuves.",
            "Signalez l’incident aux autorités compétentes et à GLOPROFAS afin d’alerter d’autres personnes."
          ],
          "example": "Exemple illustratif : une comptable reçoit d’un fournisseur habituel une facture avec un nouveau compte. Un appel au numéro connu du fournisseur révèle qu’il n’a rien changé."
        }
      }
    },
    {
      "id": "4f48ab49-a2be-4647-afc8-0aa09833a4b0",
      "slug": "fake-websites",
      "icon": "globe",
      "featured": false,
      "imageUrl": "/images/context/home-online-shopping.jpg",
      "title": {
        "en": "Fake websites and platforms",
        "fr": "Faux sites et plateformes"
      },
      "summary": {
        "en": "Copycat sites and apps designed to collect payments.",
        "fr": "Sites et applications copiés pour encaisser des paiements."
      },
      "content": {
        "en": "{\"definition\":\"Fake websites and platforms copy real brands, shops or services to collect payments, logins or personal data.\",\"how\":\"Ads or messages lead to a site that looks like a known business. Payments made there go to scammers, and details entered are stolen.\",\"signs\":[\"Web addresses with extra words or odd endings\",\"Prices or offers that seem too good\",\"No contact details, or only a messaging number\",\"Pressure countdown timers\"],\"protect\":[\"Type addresses yourself or use official apps\",\"Check the exact domain before paying\",\"Search the site name with the word “scam”\",\"Use payment methods that offer protection\"],\"todo\":[\"If you sent money, contact your bank or mobile money provider immediately through its official number.\",\"Keep screenshots, numbers, links and receipts as evidence.\",\"Report the incident to the competent authorities and to GLOPROFAS so others can be warned.\"],\"example\":\"Illustrative example: A search ad leads to a page copying a well-known airline, with cheap fares. After payment, no booking exists with the real airline.\"}",
        "fr": "{\"definition\":\"Les faux sites et plateformes copient des marques, boutiques ou services réels pour encaisser des paiements ou voler des données.\",\"how\":\"Des publicités ou messages mènent à un site ressemblant à une entreprise connue. Les paiements vont aux escrocs et les données saisies sont volées.\",\"signs\":[\"Adresses web avec des mots en trop ou des extensions étranges\",\"Prix ou offres trop beaux\",\"Aucune coordonnée, ou seulement un numéro de messagerie\",\"Compte à rebours pour vous presser\"],\"protect\":[\"Saisissez les adresses vous-même ou utilisez les applications officielles\",\"Vérifiez le domaine exact avant de payer\",\"Recherchez le nom du site avec le mot « arnaque »\",\"Utilisez des moyens de paiement protégés\"],\"todo\":[\"Si vous avez envoyé de l’argent, contactez immédiatement votre banque ou votre opérateur de mobile money via son numéro officiel.\",\"Conservez captures, numéros, liens et reçus comme preuves.\",\"Signalez l’incident aux autorités compétentes et à GLOPROFAS afin d’alerter d’autres personnes.\"],\"example\":\"Exemple illustratif : une publicité mène à une page imitant une compagnie aérienne connue, avec des tarifs bas. Après paiement, aucune réservation n’existe chez la vraie compagnie.\"}"
      },
      "parsedContent": {
        "en": {
          "definition": "Fake websites and platforms copy real brands, shops or services to collect payments, logins or personal data.",
          "how": "Ads or messages lead to a site that looks like a known business. Payments made there go to scammers, and details entered are stolen.",
          "signs": [
            "Web addresses with extra words or odd endings",
            "Prices or offers that seem too good",
            "No contact details, or only a messaging number",
            "Pressure countdown timers"
          ],
          "protect": [
            "Type addresses yourself or use official apps",
            "Check the exact domain before paying",
            "Search the site name with the word “scam”",
            "Use payment methods that offer protection"
          ],
          "todo": [
            "If you sent money, contact your bank or mobile money provider immediately through its official number.",
            "Keep screenshots, numbers, links and receipts as evidence.",
            "Report the incident to the competent authorities and to GLOPROFAS so others can be warned."
          ],
          "example": "Illustrative example: A search ad leads to a page copying a well-known airline, with cheap fares. After payment, no booking exists with the real airline."
        },
        "fr": {
          "definition": "Les faux sites et plateformes copient des marques, boutiques ou services réels pour encaisser des paiements ou voler des données.",
          "how": "Des publicités ou messages mènent à un site ressemblant à une entreprise connue. Les paiements vont aux escrocs et les données saisies sont volées.",
          "signs": [
            "Adresses web avec des mots en trop ou des extensions étranges",
            "Prix ou offres trop beaux",
            "Aucune coordonnée, ou seulement un numéro de messagerie",
            "Compte à rebours pour vous presser"
          ],
          "protect": [
            "Saisissez les adresses vous-même ou utilisez les applications officielles",
            "Vérifiez le domaine exact avant de payer",
            "Recherchez le nom du site avec le mot « arnaque »",
            "Utilisez des moyens de paiement protégés"
          ],
          "todo": [
            "Si vous avez envoyé de l’argent, contactez immédiatement votre banque ou votre opérateur de mobile money via son numéro officiel.",
            "Conservez captures, numéros, liens et reçus comme preuves.",
            "Signalez l’incident aux autorités compétentes et à GLOPROFAS afin d’alerter d’autres personnes."
          ],
          "example": "Exemple illustratif : une publicité mène à une page imitant une compagnie aérienne connue, avec des tarifs bas. Après paiement, aucune réservation n’existe chez la vraie compagnie."
        }
      }
    }
  ],
  "alerts": [
    {
      "id": "4765f308-62d4-4eb6-b28d-07e4227f8423",
      "title": {
        "en": "Reported suspicious activity: fake mobile money reversal SMS",
        "fr": "Activité suspecte signalée : faux SMS d’annulation de transfert"
      },
      "summary": {
        "en": "Illustrative alert. Messages claim a transfer was sent by mistake and ask you to send it back.",
        "fr": "Alerte illustrative. Des messages affirment qu’un transfert a été envoyé par erreur et demandent son renvoi."
      },
      "actions": {
        "en": "Do not act on the message or call.\nCheck directly with the organisation through its official channel.\nNever share PINs or one-time codes.\nKeep evidence and report the incident.",
        "fr": "N’agissez pas sur la base du message ou de l’appel.\nVérifiez directement auprès de l’organisation par son canal officiel.\nNe partagez jamais de code PIN ou de code à usage unique.\nConservez les preuves et signalez l’incident."
      },
      "categorySlug": "mobile-money-scams",
      "category": {
        "en": "Mobile money fraud",
        "fr": "Fraude au mobile money"
      },
      "country": "Cameroon",
      "risk": "Critical",
      "date": "2026-10-28",
      "imageUrl": "/images/article-payment-pause.jpg"
    },
    {
      "id": "470da78a-4787-4979-9f71-057fe61d5e50",
      "title": {
        "en": "Job offers asking for a “registration fee”",
        "fr": "Offres d’emploi exigeant des « frais d’inscription »"
      },
      "summary": {
        "en": "Illustrative alert. Recruiters ask for payment before an interview.",
        "fr": "Alerte illustrative. De faux recruteurs demandent un paiement avant l’entretien."
      },
      "actions": {
        "en": "Do not act on the message or call.\nCheck directly with the organisation through its official channel.\nNever share PINs or one-time codes.\nKeep evidence and report the incident.",
        "fr": "N’agissez pas sur la base du message ou de l’appel.\nVérifiez directement auprès de l’organisation par son canal officiel.\nNe partagez jamais de code PIN ou de code à usage unique.\nConservez les preuves et signalez l’incident."
      },
      "categorySlug": "employment-scams",
      "category": {
        "en": "Fake job offers",
        "fr": "Fausses offres d’emploi"
      },
      "country": "West Africa",
      "risk": "High",
      "date": "2026-10-24",
      "imageUrl": "/images/context/person-phone-desk.jpg"
    },
    {
      "id": "881dce1a-df7b-4d32-963b-4f2ecd1e1b8b",
      "title": {
        "en": "Investment groups promising daily returns",
        "fr": "Groupes d’investissement promettant des gains quotidiens"
      },
      "summary": {
        "en": "Illustrative alert. Messaging groups promote guaranteed daily profits.",
        "fr": "Alerte illustrative. Des groupes de messagerie promettent des profits quotidiens garantis."
      },
      "actions": {
        "en": "Do not act on the message or call.\nCheck directly with the organisation through its official channel.\nNever share PINs or one-time codes.\nKeep evidence and report the incident.",
        "fr": "N’agissez pas sur la base du message ou de l’appel.\nVérifiez directement auprès de l’organisation par son canal officiel.\nNe partagez jamais de code PIN ou de code à usage unique.\nConservez les preuves et signalez l’incident."
      },
      "categorySlug": "investment-scams",
      "category": {
        "en": "Investment scams",
        "fr": "Arnaques à l’investissement"
      },
      "country": "Central Africa",
      "risk": "Medium",
      "date": "2026-10-20",
      "imageUrl": "/images/context/person-finance-phone.jpg"
    }
  ],
  "articles": [
    {
      "id": "84b3aae8-32a2-40eb-9c90-c414846fbc8a",
      "title": {
        "en": "Five questions to ask before you send money to anyone",
        "fr": "Cinq questions à se poser avant d’envoyer de l’argent"
      },
      "tag": {
        "en": "Prevention",
        "fr": "Prévention"
      },
      "summary": {
        "en": "A short pause and five simple questions stop most scams before money leaves your account.",
        "fr": "Une courte pause et cinq questions simples arrêtent la plupart des arnaques avant que l’argent ne parte."
      },
      "body": {
        "en": "Most scams succeed in the few minutes between a message arriving and a payment being made. Slowing down is your best protection.\n\n1. Did I expect this request? Unexpected requests for money deserve extra care.\n\n2. Can I verify it on a number I already know? Call the person or organisation directly, never using the contact details in the message.\n\n3. Is someone rushing me? Urgency is the scammer’s main tool. A genuine request can wait an hour.\n\n4. Am I being asked for a code or PIN? No legitimate organisation needs your PIN or one-time code.\n\n5. Would I be comfortable telling a friend about this payment? Requests for secrecy are a warning sign.\n\nIf any answer worries you, stop and check. You lose nothing by waiting.",
        "fr": "La plupart des arnaques réussissent dans les quelques minutes entre l’arrivée d’un message et le paiement. Ralentir est votre meilleure protection.\n\n1. Est-ce que j’attendais cette demande ? Une demande d’argent inattendue mérite une attention particulière.\n\n2. Puis-je la vérifier sur un numéro que je connais déjà ? Appelez directement la personne ou l’organisation, jamais avec les coordonnées du message.\n\n3. Me presse-t-on ? L’urgence est l’outil principal de l’escroc. Une vraie demande peut attendre une heure.\n\n4. Me demande-t-on un code ou un PIN ? Aucune organisation légitime n’a besoin de votre code.\n\n5. Serais-je à l’aise d’en parler à un ami ? Une demande de secret est un signal d’alerte.\n\nSi une réponse vous inquiète, arrêtez et vérifiez. Attendre ne vous coûte rien."
      },
      "author": "GLOPROFAS Editorial",
      "date": "2026-10-27",
      "imageUrl": "/images/zite/img_9FEr6sokBRFWKAW9.jpg"
    },
    {
      "id": "f10d1bb2-3e78-457f-9375-174734191e5f",
      "title": {
        "en": "How to recognise a fake recruitment message",
        "fr": "Reconnaître un faux message de recrutement"
      },
      "tag": {
        "en": "Awareness",
        "fr": "Sensibilisation"
      },
      "summary": {
        "en": "Fake job offers are designed for people under pressure to find work. Here is how to tell them apart.",
        "fr": "Les fausses offres d’emploi visent les personnes pressées de trouver du travail. Voici comment les repérer."
      },
      "body": {
        "en": "Looking for work is stressful, and scammers know it. Fake recruiters target job seekers with offers that look like a lucky break.\n\nThe clearest sign is a request for money. Genuine employers do not charge for registration, training, uniforms, medical tests or visas before you are hired.\n\nOther signs include offers you never applied for, interviews held only by text, salaries far above the market and pressure to accept immediately.\n\nBefore responding, search for the company’s official website and phone number, and contact them directly. Never send copies of your ID until you are sure the employer is real.",
        "fr": "Chercher un emploi est stressant, et les escrocs le savent. De faux recruteurs ciblent les demandeurs d’emploi avec des offres qui ressemblent à une chance inespérée.\n\nLe signe le plus clair est une demande d’argent. Un véritable employeur ne fait pas payer l’inscription, la formation, l’uniforme, l’examen médical ou le visa avant l’embauche.\n\nAutres signes : offres auxquelles vous n’avez pas postulé, entretiens uniquement par écrit, salaires bien au-dessus du marché et pression pour accepter immédiatement.\n\nAvant de répondre, recherchez le site et le numéro officiels de l’entreprise et contactez-la directement. N’envoyez jamais de pièce d’identité avant d’être sûr de l’employeur."
      },
      "author": "GLOPROFAS Editorial",
      "date": "2026-10-22",
      "imageUrl": "/images/context/urban-professional.jpg"
    },
    {
      "id": "5f261c0b-297a-4451-8118-9cbe77cf40a5",
      "title": {
        "en": "What to do in the first hour after a scam",
        "fr": "Que faire dans l’heure qui suit une arnaque"
      },
      "tag": {
        "en": "Guidance",
        "fr": "Accompagnement"
      },
      "summary": {
        "en": "Acting quickly can limit the damage. A calm checklist for the first hour.",
        "fr": "Agir vite peut limiter les dégâts. Une liste calme pour la première heure."
      },
      "body": {
        "en": "Realising you have been scammed is upsetting. It is not your fault, and quick action can help.\n\nFirst, contact your bank or mobile money provider through its official number. Explain what happened and ask whether the transaction can be stopped or the account secured.\n\nSecond, change any passwords or PINs you may have shared, starting with email and mobile money.\n\nThird, gather evidence: screenshots, phone numbers, links, transaction references and dates.\n\nFourth, report the incident to the competent authorities and to GLOPROFAS. Your report can help warn others.\n\nFinally, be cautious of anyone who contacts you offering to recover your money for a fee. This is often a second scam.",
        "fr": "Comprendre que l’on a été victime d’une arnaque est éprouvant. Ce n’est pas votre faute, et agir vite peut aider.\n\nD’abord, contactez votre banque ou votre opérateur de mobile money via son numéro officiel. Expliquez la situation et demandez si la transaction peut être bloquée ou le compte sécurisé.\n\nEnsuite, changez les mots de passe ou codes que vous avez pu partager, en commençant par la messagerie et le mobile money.\n\nPuis rassemblez les preuves : captures, numéros, liens, références de transaction et dates.\n\nSignalez l’incident aux autorités compétentes et à GLOPROFAS. Votre signalement peut alerter d’autres personnes.\n\nEnfin, méfiez-vous de quiconque propose de récupérer votre argent contre paiement : c’est souvent une seconde arnaque."
      },
      "author": "GLOPROFAS Editorial",
      "date": "2026-10-18",
      "imageUrl": "/images/zite/img_wFZrRplDj0fdHgRB.jpg"
    }
  ],
  "resources": [
    {
      "id": "129071d7-b97e-4113-ac80-6b27150d65f1",
      "title": {
        "en": "Mobile money safety guide",
        "fr": "Guide de sécurité du mobile money"
      },
      "description": {
        "en": "Protect your PIN, spot fake reversals and know who to call.",
        "fr": "Protégez votre code, repérez les faux renvois et sachez qui appeler."
      },
      "type": "Guide",
      "language": "EN/FR",
      "fileSize": "1.2 MB",
      "featured": true,
      "imageUrl": "/images/zite/img_k_g-Bue4ibKanRTu.jpg"
    },
    {
      "id": "008242c5-654a-45d7-abc6-7ee6bd1db2a3",
      "title": {
        "en": "Check-before-you-pay checklist",
        "fr": "Liste de vérification avant de payer"
      },
      "description": {
        "en": "A practical 60-second verification checklist before sending any transfer or mobile payment.",
        "fr": "Une liste pratique de vérification en 60 secondes avant tout virement ou paiement mobile."
      },
      "type": "Checklist",
      "language": "EN/FR",
      "fileSize": "240 KB",
      "featured": false,
      "imageUrl": "/images/payment-counter.jpg"
    },
    {
      "id": "98ee53e8-7202-4b64-8fc0-ce4d4a465793",
      "title": {
        "en": "Phishing warning signs",
        "fr": "Signes d’hameçonnage"
      },
      "description": {
        "en": "Visual guide to spotting spoofed sender addresses, urgent threats and copycat login links.",
        "fr": "Guide visuel pour repérer les expéditeurs falsifiés, les menaces urgentes et les faux liens."
      },
      "type": "Infographic",
      "language": "EN",
      "fileSize": "680 KB",
      "featured": false,
      "imageUrl": "/images/intro-phone.jpg"
    },
    {
      "id": "a4093103-7fcf-40a8-8d48-e0c516deb8f9",
      "title": {
        "en": "Small business fraud prevention",
        "fr": "Prévention de la fraude pour les PME"
      },
      "description": {
        "en": "Dual-approval payment controls, supplier call-back rules and mailbox protection for SMEs.",
        "fr": "Contrôles de double validation, rappel des fournisseurs et sécurité des messageries pour PME."
      },
      "type": "PDF",
      "language": "FR",
      "fileSize": "2.1 MB",
      "featured": false,
      "imageUrl": "/images/context/executive-phone-laptop.jpg"
    },
    {
      "id": "1f3022dd-40c0-4335-a3df-b05f89c8b52c",
      "title": {
        "en": "Securing your social media accounts",
        "fr": "Sécuriser vos comptes de réseaux sociaux"
      },
      "description": {
        "en": "Step-by-step walkthrough on two-factor authentication, session locks and cloned profile alerts.",
        "fr": "Tutoriel pas à pas sur la double authentification, le verrouillage de session et les profils clonés."
      },
      "type": "Video",
      "language": "EN/FR",
      "fileSize": "",
      "featured": false,
      "imageUrl": "/images/context/remote-work-call.jpg"
    }
  ],
  "siteText": [
    {
      "key": "nav.about",
      "en": "About",
      "fr": "À propos"
    },
    {
      "key": "nav.awareness",
      "en": "Scam Awareness",
      "fr": "Sensibilisation"
    },
    {
      "key": "nav.resources",
      "en": "Resources",
      "fr": "Ressources"
    },
    {
      "key": "nav.services",
      "en": "Services",
      "fr": "Services"
    },
    {
      "key": "nav.news",
      "en": "News",
      "fr": "Actualités"
    },
    {
      "key": "nav.involved",
      "en": "Get Involved",
      "fr": "S’impliquer"
    },
    {
      "key": "nav.contact",
      "en": "Contact",
      "fr": "Contact"
    },
    {
      "key": "latestAlert",
      "en": "Latest alert",
      "fr": "Dernière alerte"
    },
    {
      "key": "report",
      "en": "Report a scam",
      "fr": "Signaler une arnaque"
    },
    {
      "key": "skip",
      "en": "Skip to content",
      "fr": "Aller au contenu"
    },
    {
      "key": "menu",
      "en": "Menu",
      "fr": "Menu"
    },
    {
      "key": "hero.eyebrow",
      "en": "Fraud prevention and digital safety",
      "fr": "Prévention de la fraude et sécurité numérique"
    },
    {
      "key": "hero.h1",
      "en": "Spot the scam before it costs you.",
      "fr": "Repérez l’arnaque avant qu’elle ne vous coûte cher."
    },
    {
      "key": "hero.lead",
      "en": "GLOPROFAS helps individuals, families and businesses recognise fraud, protect their money and know what to do next. Start with a free guide, or report what happened to you.",
      "fr": "GLOPROFAS aide les particuliers, les familles et les entreprises à reconnaître la fraude, à protéger leur argent et à savoir quoi faire ensuite. Commencez par un guide gratuit ou signalez ce qui vous est arrivé."
    },
    {
      "key": "hero.secondary",
      "en": "Learn how to stay safe",
      "fr": "Apprendre à se protéger"
    },
    {
      "key": "strip.text",
      "en": "Got a suspicious message? Check before you pay.",
      "fr": "Un message suspect ? Vérifiez avant de payer."
    },
    {
      "key": "strip.cta",
      "en": "Check it with Jarvis",
      "fr": "Vérifier avec Jarvis"
    },
    {
      "key": "intro.eyebrow",
      "en": "Who we are",
      "fr": "Qui sommes-nous"
    },
    {
      "key": "intro.h2",
      "en": "Fighting scams through awareness, prevention and action.",
      "fr": "Lutter contre les arnaques par la sensibilisation, la prévention et l’action."
    },
    {
      "key": "intro.body",
      "en": "The Global Programme for the Fight Against Scams is an independent, not-for-profit initiative. Scams move fast across borders and phones; clear information moves slower. We close that gap by turning what people report into warnings anyone can act on, with particular attention to Africa and Cameroon.",
      "fr": "Le Programme mondial de lutte contre les arnaques est une initiative indépendante à but non lucratif. Les arnaques circulent vite, d’un pays et d’un téléphone à l’autre ; l’information claire, moins. Nous comblons cet écart en transformant les signalements en mises en garde utiles à tous, avec une attention particulière à l’Afrique et au Cameroun."
    },
    {
      "key": "intro.points.0",
      "en": "Written for everyday people, not specialists",
      "fr": "Écrit pour tout le monde, pas pour les spécialistes"
    },
    {
      "key": "intro.points.1",
      "en": "Warnings drawn from real public reports",
      "fr": "Des mises en garde tirées de vrais signalements"
    },
    {
      "key": "intro.points.2",
      "en": "Help for households, businesses and communities",
      "fr": "Une aide aux foyers, aux entreprises et aux communautés"
    },
    {
      "key": "intro.points.3",
      "en": "A global mission, rooted in African realities",
      "fr": "Une mission mondiale, ancrée dans les réalités africaines"
    },
    {
      "key": "intro.anchor",
      "en": "scams broken down step by step",
      "fr": "arnaques décortiquées pas à pas"
    },
    {
      "key": "intro.cta",
      "en": "Explore common scams",
      "fr": "Découvrir les arnaques courantes"
    },
    {
      "key": "scams.eyebrow",
      "en": "Common scams",
      "fr": "Arnaques courantes"
    },
    {
      "key": "scams.h2",
      "en": "Know the tricks people use most.",
      "fr": "Connaître les ruses les plus utilisées."
    },
    {
      "key": "scams.lead",
      "en": "Each guide explains how the scam works, the warning signs and what to do if it happens to you.",
      "fr": "Chaque guide explique le fonctionnement de l’arnaque, les signaux d’alerte et la marche à suivre si elle vous arrive."
    },
    {
      "key": "how.eyebrow",
      "en": "How scams work",
      "fr": "Comment fonctionnent les arnaques"
    },
    {
      "key": "how.h2",
      "en": "Most scams follow the same four moves.",
      "fr": "La plupart des arnaques suivent les mêmes quatre étapes."
    },
    {
      "key": "how.steps.0.t",
      "en": "Contact",
      "fr": "Le contact"
    },
    {
      "key": "how.steps.0.d",
      "en": "A message, call or post arrives, often looking official or friendly.",
      "fr": "Un message, un appel ou une publication arrive, souvent d’apparence officielle ou amicale."
    },
    {
      "key": "how.steps.1.t",
      "en": "Pressure",
      "fr": "La pression"
    },
    {
      "key": "how.steps.1.d",
      "en": "Urgency, fear or a great opportunity pushes you to act now.",
      "fr": "L’urgence, la peur ou une belle occasion vous pousse à agir tout de suite."
    },
    {
      "key": "how.steps.2.t",
      "en": "Payment",
      "fr": "Le paiement"
    },
    {
      "key": "how.steps.2.d",
      "en": "You are asked to pay, transfer or share a code.",
      "fr": "On vous demande de payer, de transférer ou de partager un code."
    },
    {
      "key": "how.steps.3.t",
      "en": "Disappearance",
      "fr": "La disparition"
    },
    {
      "key": "how.steps.3.d",
      "en": "The contact goes silent and the money is gone.",
      "fr": "Le contact disparaît, et l’argent avec lui."
    },
    {
      "key": "how.techTitle",
      "en": "Techniques to recognise",
      "fr": "Techniques à reconnaître"
    },
    {
      "key": "how.techniques.0.t",
      "en": "Psychological manipulation",
      "fr": "Manipulation psychologique"
    },
    {
      "key": "how.techniques.0.d",
      "en": "Playing on trust, fear, hope or shame so you stop questioning.",
      "fr": "Jouer sur la confiance, la peur, l’espoir ou la honte pour vous empêcher de douter."
    },
    {
      "key": "how.techniques.1.t",
      "en": "Fake identities",
      "fr": "Fausses identités"
    },
    {
      "key": "how.techniques.1.d",
      "en": "Stolen photos, invented profiles and borrowed names.",
      "fr": "Photos volées, profils inventés et noms empruntés."
    },
    {
      "key": "how.techniques.2.t",
      "en": "Urgency and intimidation",
      "fr": "Urgence et intimidation"
    },
    {
      "key": "how.techniques.2.d",
      "en": "Deadlines, threats of blocked accounts or legal trouble.",
      "fr": "Délais, menaces de blocage de compte ou de poursuites."
    },
    {
      "key": "how.techniques.3.t",
      "en": "Fake investment opportunities",
      "fr": "Faux placements"
    },
    {
      "key": "how.techniques.3.d",
      "en": "Guaranteed returns, early “winners” and pressure to recruit.",
      "fr": "Gains garantis, premiers « gagnants » et pression pour recruter."
    },
    {
      "key": "how.techniques.4.t",
      "en": "Impersonation",
      "fr": "Usurpation"
    },
    {
      "key": "how.techniques.4.d",
      "en": "Posing as a relative, a bank, an operator or an official.",
      "fr": "Se faire passer pour un proche, une banque, un opérateur ou un agent."
    },
    {
      "key": "how.techniques.5.t",
      "en": "Social engineering",
      "fr": "Ingénierie sociale"
    },
    {
      "key": "how.techniques.5.d",
      "en": "Gathering small details to make a later request believable.",
      "fr": "Collecter de petits détails pour rendre une demande crédible."
    },
    {
      "key": "how.techniques.6.t",
      "en": "Fraudulent payment requests",
      "fr": "Demandes de paiement frauduleuses"
    },
    {
      "key": "how.techniques.6.d",
      "en": "Fake invoices, changed bank details and reversal requests.",
      "fr": "Fausses factures, coordonnées bancaires modifiées et demandes de renvoi."
    },
    {
      "key": "how.techniques.7.t",
      "en": "Fake websites and applications",
      "fr": "Faux sites et applications"
    },
    {
      "key": "how.techniques.7.d",
      "en": "Copycat pages and apps built to take payments or logins.",
      "fr": "Pages et applications copiées pour capter paiements ou identifiants."
    },
    {
      "key": "stats.eyebrow",
      "en": "What you will find here",
      "fr": "Ce que vous trouverez ici"
    },
    {
      "key": "stats.categories",
      "en": "Scam guides",
      "fr": "Guides d’arnaques"
    },
    {
      "key": "stats.resources",
      "en": "Resources published",
      "fr": "Ressources publiées"
    },
    {
      "key": "stats.languages",
      "en": "Languages",
      "fr": "Langues"
    },
    {
      "key": "reportSec.eyebrow",
      "en": "Report",
      "fr": "Signaler"
    },
    {
      "key": "reportSec.h2",
      "en": "Have you encountered a scam?",
      "fr": "Avez-vous été confronté à une arnaque ?"
    },
    {
      "key": "reportSec.body",
      "en": "It takes about five minutes. You are not to blame, and what you share helps others stay safe. No account needed.",
      "fr": "Cela prend environ cinq minutes. Vous n’êtes pas en faute, et ce que vous partagez aide d’autres personnes à se protéger. Aucun compte requis."
    },
    {
      "key": "reportSec.note",
      "en": "A report to GLOPROFAS is not a police report and does not guarantee recovery of funds. If you sent money, contact your bank or mobile money provider now through its official channel.",
      "fr": "Un signalement à GLOPROFAS n’est pas une plainte auprès de la police et ne garantit pas la récupération des fonds. Si vous avez envoyé de l’argent, contactez dès maintenant votre banque ou votre opérateur de mobile money par son canal officiel."
    },
    {
      "key": "reportSec.steps.0.t",
      "en": "What happened",
      "fr": "Ce qui s’est passé"
    },
    {
      "key": "reportSec.steps.0.d",
      "en": "The type of scam, when and how it reached you.",
      "fr": "Le type d’arnaque, quand et comment elle vous a atteint."
    },
    {
      "key": "reportSec.steps.1.t",
      "en": "Evidence",
      "fr": "Preuves"
    },
    {
      "key": "reportSec.steps.1.d",
      "en": "Optional screenshots or documents, kept private.",
      "fr": "Captures ou documents facultatifs, conservés en privé."
    },
    {
      "key": "reportSec.steps.2.t",
      "en": "Reference number",
      "fr": "Numéro de référence"
    },
    {
      "key": "reportSec.steps.2.d",
      "en": "You receive a reference to follow up.",
      "fr": "Vous recevez une référence pour le suivi."
    },
    {
      "key": "res.eyebrow",
      "en": "Protection and resources",
      "fr": "Protection et ressources"
    },
    {
      "key": "res.h2",
      "en": "Practical tools to protect yourself.",
      "fr": "Des outils pratiques pour vous protéger."
    },
    {
      "key": "res.featured",
      "en": "Featured",
      "fr": "À la une"
    },
    {
      "key": "services.eyebrow",
      "en": "Our services",
      "fr": "Nos services"
    },
    {
      "key": "services.h2",
      "en": "Free for the public. Professional support when you need more.",
      "fr": "Gratuit pour le public. Un accompagnement professionnel si besoin."
    },
    {
      "key": "services.freeTitle",
      "en": "Free public-interest work",
      "fr": "Actions d’intérêt public gratuites"
    },
    {
      "key": "services.freeTag",
      "en": "Always free",
      "fr": "Toujours gratuit"
    },
    {
      "key": "services.free.0",
      "en": "Awareness guides and public alerts",
      "fr": "Guides de sensibilisation et alertes publiques"
    },
    {
      "key": "services.free.1",
      "en": "Reporting suspicious activity",
      "fr": "Signalement des activités suspectes"
    },
    {
      "key": "services.free.2",
      "en": "Downloadable checklists and resources",
      "fr": "Listes de vérification et ressources téléchargeables"
    },
    {
      "key": "services.free.3",
      "en": "Community education",
      "fr": "Éducation des communautés"
    },
    {
      "key": "services.paidTitle",
      "en": "Professional services",
      "fr": "Services professionnels"
    },
    {
      "key": "services.paidTag",
      "en": "Paid or on quotation",
      "fr": "Payant ou sur devis"
    },
    {
      "key": "services.paid.0",
      "en": "Individual digital safety assessments",
      "fr": "Évaluations de sécurité numérique individuelles"
    },
    {
      "key": "services.paid.1",
      "en": "Business fraud risk assessments",
      "fr": "Évaluations des risques de fraude en entreprise"
    },
    {
      "key": "services.paid.2",
      "en": "Enterprise and institutional programmes",
      "fr": "Programmes pour entreprises et institutions"
    },
    {
      "key": "services.paid.3",
      "en": "Training and capacity building",
      "fr": "Formation et renforcement des capacités"
    },
    {
      "key": "services.freeCta",
      "en": "Browse free resources",
      "fr": "Voir les ressources gratuites"
    },
    {
      "key": "services.paidCta",
      "en": "Ask about services",
      "fr": "Se renseigner sur les services"
    },
    {
      "key": "newsSec.eyebrow",
      "en": "Alerts and news",
      "fr": "Alertes et actualités"
    },
    {
      "key": "newsSec.h2",
      "en": "What people are reporting now.",
      "fr": "Ce que l’on signale en ce moment."
    },
    {
      "key": "newsSec.news",
      "en": "Latest articles",
      "fr": "Derniers articles"
    },
    {
      "key": "newsSec.empty",
      "en": "No published alerts yet.",
      "fr": "Aucune alerte publiée pour le moment."
    },
    {
      "key": "risk.Low",
      "en": "Low",
      "fr": "Faible"
    },
    {
      "key": "risk.Medium",
      "en": "Medium",
      "fr": "Moyen"
    },
    {
      "key": "risk.High",
      "en": "High",
      "fr": "Élevé"
    },
    {
      "key": "risk.Critical",
      "en": "Critical",
      "fr": "Critique"
    },
    {
      "key": "nl.h2",
      "en": "Get scam alerts in your inbox.",
      "fr": "Recevez les alertes par courriel."
    },
    {
      "key": "nl.body",
      "en": "One short email when something new is spreading. Unsubscribe any time.",
      "fr": "Un court courriel quand une nouvelle arnaque circule. Désinscription à tout moment."
    },
    {
      "key": "nl.name",
      "en": "Name",
      "fr": "Nom"
    },
    {
      "key": "nl.email",
      "en": "Email",
      "fr": "Courriel"
    },
    {
      "key": "nl.country",
      "en": "Country",
      "fr": "Pays"
    },
    {
      "key": "nl.language",
      "en": "Preferred language",
      "fr": "Langue préférée"
    },
    {
      "key": "nl.consent",
      "en": "I agree to receive GLOPROFAS emails and accept the privacy policy.",
      "fr": "J’accepte de recevoir les courriels de GLOPROFAS et la politique de confidentialité."
    },
    {
      "key": "nl.submit",
      "en": "Subscribe",
      "fr": "S’abonner"
    },
    {
      "key": "nl.done",
      "en": "Thank you. Your subscription is registered.",
      "fr": "Merci. Votre inscription est enregistrée."
    },
    {
      "key": "nl.err",
      "en": "Something went wrong. Please check your details and try again.",
      "fr": "Une erreur est survenue. Vérifiez vos informations et réessayez."
    },
    {
      "key": "nl.required",
      "en": "This field is required.",
      "fr": "Ce champ est obligatoire."
    },
    {
      "key": "nl.invalidEmail",
      "en": "Enter a valid email address.",
      "fr": "Saisissez une adresse électronique valide."
    },
    {
      "key": "nl.consentReq",
      "en": "Please give your consent to subscribe.",
      "fr": "Veuillez donner votre consentement."
    },
    {
      "key": "final.h2",
      "en": "Together, we can make the digital world safer.",
      "fr": "Ensemble, rendons le monde numérique plus sûr."
    },
    {
      "key": "final.resources",
      "en": "Access resources",
      "fr": "Accéder aux ressources"
    },
    {
      "key": "final.contact",
      "en": "Contact GLOPROFAS",
      "fr": "Contacter GLOPROFAS"
    },
    {
      "key": "footer.desc",
      "en": "An independent, not-for-profit programme for scam awareness, prevention, education and assistance.",
      "fr": "Un programme indépendant à but non lucratif de sensibilisation, de prévention, d’éducation et d’assistance contre les arnaques."
    },
    {
      "key": "footer.quick",
      "en": "Quick links",
      "fr": "Liens rapides"
    },
    {
      "key": "footer.contactTitle",
      "en": "Contact",
      "fr": "Contact"
    },
    {
      "key": "footer.contactPending",
      "en": "Contact details will be published here once confirmed.",
      "fr": "Les coordonnées seront publiées ici une fois confirmées."
    },
    {
      "key": "footer.disclaimer",
      "en": "GLOPROFAS is not a government body or law enforcement authority, cannot guarantee recovery of funds and does not certify any website or person as legitimate. Contact your financial institution and the competent authorities through official channels.",
      "fr": "GLOPROFAS n’est ni un organisme public ni une autorité policière, ne peut garantir la récupération des fonds et ne certifie aucun site ni aucune personne. Contactez votre institution financière et les autorités compétentes par leurs canaux officiels."
    },
    {
      "key": "footer.rights",
      "en": "Global Programme for the Fight Against Scams. All rights reserved.",
      "fr": "Programme mondial de lutte contre les arnaques. Tous droits réservés."
    },
    {
      "key": "imgPending",
      "en": "Image pending",
      "fr": "Image à venir"
    }
  ],
  "stats": {
    "categories": 12,
    "resources": 5,
    "languages": 2
  }
} as const;

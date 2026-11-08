# Asset licences & rights register

Rights status for every third-party visual asset shipped with GLOPROFAS.
Maintained so the public site can substantiate its use of all imagery and footage.

Last reviewed: 2026-11-06

---

## 1. Brand assets — owned

| Asset | Rights | Notes |
| --- | --- | --- |
| `public/images/gloprofas-logo.png` | Supplied by the project owner | Official GLOPROFAS lockup. Used unmodified. Do not crop, recolour or redraw. |
| `public/icon.svg` | Original to this project | Favicon derived from brand geometry. |

The GLOPROFAS name and logo may not be used by third parties to imply endorsement.
This restriction is stated in the Terms of Use (`/[locale]/legal/terms`).

---

## 2. Aerial footage — Pexels Licence

All hero footage in `public/video/cities/` is sourced from Pexels and re-encoded
for web delivery (H.264, 720p, muted, faststart).

**Pexels Licence** — https://www.pexels.com/license/
Free for commercial and non-commercial use. Attribution not required but recorded
here as good practice. Modification (re-encoding, cropping) permitted.

Restrictions observed: no identifiable person is portrayed in a misleading way;
footage is not resold as stock; no endorsement by depicted parties is implied.

| File | Depicted location | Creator |
| --- | --- | --- |
| `douala-cameroon.mp4` | Douala, Cameroon | Adera Abdoulaye Dolo |
| `kigali-rwanda.mp4` | Kigali, Rwanda | Rw_Creative |
| `nairobi-westlands.mp4` | Westlands, Nairobi, Kenya | African Creator |
| `sandton-johannesburg.mp4` | Sandton, Johannesburg | K (kelly) |
| `sandton-skyline.mp4` | Sandton skyline | K (kelly) |
| `sandton-dawn.mp4` | Sandton at dawn | K (kelly) |
| `abuja-nigeria.mp4` | Abuja, Nigeria | Bashir Hussaini Ahmed |
| `lagos-sunset.mp4` | Lagos at sunset | Vitalis Nwenyi |
| `lagos-cityscape.mp4` | Lagos after rain | Vitalis Nwenyi |
| `lagos-victoria-island.mp4` | Victoria Island, Lagos | Vitalis Nwenyi |
| `lekki-lagos.mp4` | Ibeju-Lekki, Lagos | Vitalis Nwenyi |
| `banjul-gambia.mp4` | Banjul, The Gambia | K (kelly) |
| `cape-town-night.mp4` | Cape Town at night | K (kelly) |
| `urban-flyover.mp4` | Urban interchange (generic) | Rafael Visentainer |
| `coastal-metropolis.mp4` | Coastal city (generic) | Nazim Zafri |

**Accuracy note.** Two clips are generic urban footage and are labelled
"Metropolitan Corridor" and "Coastal Metropolis" rather than being attributed to a
named city. Where a clip and its poster frame depict different cities, the on-page
badge names the region, not a specific municipality, to avoid a false claim.

---

## 3. Documentary photography — Pexels Licence

`public/images/cities/` (aerial stills used as video posters) and
`public/images/context/` (editorial photography).

Same Pexels Licence terms as above. Representative credits:

| Group | Creators |
| --- | --- |
| City aerials | K (kelly), Justin Brian, Ken Mwaura, Mukula Igavinchi, shutter Rwanda, Faustin NKURUNZIZA, Alex Levis, Keegan Checks, Abenezer Muluken, Gift Habeshaw, Jean van der Meulen, Marlin Clark, Mike van Schoonderwalt, RAIHAAN Kamdar, Aymane Hanni, Ayoub Ben, Tamer Soliman, Tito Zzzz, josh_dago__, Lom Doudou, Khaya Motsa, Ademola Adeola, Ben Iwara, Fawaz Onakoya, David Iloba |
| Contextual/editorial | Wundef Media, Alex Talker, Yan Krukau, Kampus Production, David Kwewum, Mathias Reding, David Crypto, Taryn Elliott, RDNE Stock project, August de Richelieu, Jep Gambardella, Antonius Ferret, Mikhail Nilov, Edmond Dantès, Darlene Alderson |

---

## 4. Legacy imagery — provenance requires review

`public/images/zite/` and the older `public/images/*.jpg` set were imported during
an earlier content migration. Some were AI-generated.

**Action required before any commercial launch:** confirm the generation tool's
output licence permits the intended use, or replace with licensed photography.
These files are currently used for the homepage hero and a subset of category and
article cards.

Editorial policy already in force: AI-generated or illustrative images are never
presented as documentary evidence of a real incident, and case-study pages label
scenarios as illustrative.

---

## 5. Text content

| Source | Status |
| --- | --- |
| Interface copy (`src/messages/{en,fr}.json`, `src/components/zite/copy.ts`) | Original to this project, bilingual. |
| Scam-education content | Written for this project, informed by public consumer-protection advisories (YIMA, SAFPS, Scamwatch). Rewritten in original language; no article reproduced. |
| Case studies | Illustrative scenarios describing documented fraud mechanics. No unverified allegation against an identifiable person or organisation. |

Footer notice, rendered in both locales:

- EN — `© {year} GLOPROFAS — Global Programme for the Fight Against Scams. All rights reserved.`
- FR — `© {year} GLOPROFAS — Programme mondial de lutte contre les arnaques. Tous droits réservés.`

Guides and resources may be shared for non-commercial awareness purposes with
credit to GLOPROFAS, per the Terms of Use.

---

## 6. Fonts

| Family | Licence | Delivery |
| --- | --- | --- |
| Sora | SIL Open Font License 1.1 | Self-hosted via `@fontsource-variable/sora` |
| Manrope | SIL Open Font License 1.1 | Self-hosted via `@fontsource-variable/manrope` |

Both permit embedding and redistribution. No third-party font CDN is contacted at
runtime, so no visitor IP is disclosed to a font provider.

---

## 7. Icons

Lucide (`lucide-react`) — ISC Licence. Permits commercial use, modification and
distribution. Stroke weight normalised to 1.5 across the site.

# Asset licences

## Image reuse rule (enforced)

**One file, one slot.** Every photograph is used in exactly one place on the site.
`src/lib/assets.ts` is the single registry; `node scripts/check-assets.mjs` fails if an asset is
referenced twice, is missing, or sits unused in `public/images`. Consequences of the rule:

- Article images appear only on the article's own detail page; listing cards (homepage, /news,
  related items) are text-first with a tag chip and icon.
- Scam alerts are deliberately image-free: the card leads with the RiskBadge and the detail page
  uses a designed navy information panel, so no photo is reused between the two views.
- The homepage "how scams work" stages, service group bands and campaigns audience cards are
  icon-led rather than photographic, which removed the last repetitive image grids.
- The image generation quota for this session was exhausted, so the final assignment uses the 13
  existing, already-licensed or already-disclosed assets rather than adding new ones.

| File | Source | Creator | Licence | Retrieved |
|------|--------|---------|---------|-----------|
| public/images/intro-phone.jpg | Pexels photo 4971946 | Gustavo Fring | Pexels licence | 2026-11 |
| public/images/payment-counter.jpg | Pexels photo 4199526 | Jack Sparrow | Pexels licence | 2026-11 |
| public/images/market-cash.jpg | Pexels photo 35888335 | MUHAMMAD MUKTAR | Pexels licence | 2026-11 |

All stock files were resized and re-compressed locally with sharp; the hero is 128 KB.

| File | Source | Notes | Disclosure |
|------|--------|-------|------------|
| public/images/campaign-school.jpg | AI-generated for this project | School awareness seminar | AI-generated; approved by the client request of 2026-11-04 |
| public/images/campaign-community.jpg | AI-generated for this project | Homepage campaigns band only | AI-generated |
| public/images/campaign-youth.jpg | AI-generated for this project | Campaigns page audience section only | AI-generated |
| public/images/campaign-corporate.jpg | AI-generated for this project | Corporate fraud-prevention briefing | AI-generated |
| public/images/hero-city-aerial.jpg | AI-generated for this project | Homepage hero poster (video poster + reduced-motion still) | AI-generated |
| public/images/article-business-controls.jpg | AI-generated for this project | Small-business payment controls article | AI-generated |
| public/images/article-payment-pause.jpg | AI-generated for this project | Article detail: five minutes before you pay | AI-generated |
| public/images/article-reporting.jpg | AI-generated for this project | Article detail: guided reporting | AI-generated |
| public/images/article-standards.jpg | AI-generated for this project | About page hero only | AI-generated |
| public/images/services-assessment.jpg | AI-generated for this project | Professional services advisory meeting | AI-generated |

## Video

| File | Source | Rendition | Licence |
|------|--------|-----------|---------|
| public/video/hero-city.mp4 | Pexels video 20363056 — "Road in Victoria Island, Lagos, Nigeria" by Vitalis Nwenyi | Trimmed to 14 s, scaled to 1280×720, 24 fps, audio removed, CRF 33, faststart; 972 KB | Pexels licence (free commercial use, no attribution required) |

Hero motion note: the brief (§C14) bans autoplay video. The client explicitly requested an aerial
video hero, so it is implemented as a **muted, decorative, 14-second loop** that is attached only
after first paint (poster is the LCP element), never plays with sound, exposes a pause control,
and is not loaded at all under `prefers-reduced-motion: reduce`.

**AI imagery rule change.** The brief (§C6) restricts AI imagery to abstract backgrounds.
The client explicitly requested ultra-realistic AI imagery for the campaigns programme, so the four
campaign images are AI-generated and are labelled here as such. They contain no legible text,
no invented logos, no banknotes, no mobile-money or banking interfaces. They illustrate the
campaign programme only and must not be presented as photographs of real GLOPROFAS events,
participants or partner organisations. Replace with commissioned photography before launch if
the organisation publishes campaign photos as documentary evidence.

The logo, icon, watermark and social placeholder are original SVG assets authored for this project.

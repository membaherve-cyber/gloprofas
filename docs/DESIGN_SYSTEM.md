# GLOPROFAS design system

## Reference
Structural reference: Bravis "Cyberguard" Home 02. No code, CSS, images, icons or copy are
copied. The reference could not be screenshotted from the sandbox; starting tokens from the
brief were used and adjusted for contrast. See docs/reference/tokens.md.

## Colour tokens (`src/app/globals.css`, `@theme`)
navy-950 #050B1A · navy-900 #0A1631 · navy-800 #10244D · blue-600 #2A62F5 · blue-500 #4C82FF
cyan-400 #2BD4E8 (focus ring on dark, data accents only) · signal-400 #FFB02E (report action only,
text navy-950) · ink-900 #0B1220 · slate-600 #4B5870 · slate-300 #AAB6CA · line-200 #DCE3EE
mist-50 #F4F7FB · white. Risk: low #0F9D6B, medium #C98A00, high #E05A00, critical #D92D2D.
Only two gradients: the hero overlay and the dark band. No gradient text or buttons.

## Typography
Sora Variable for headings, Manrope Variable for body, self-hosted via Fontsource. Fluid scale:
H1 clamp(2.5rem, 1.6rem + 3.6vw, 4.5rem)/1.05/700; H2 clamp(2rem…3.25rem)/1.12/700;
H3 clamp(1.5rem…2rem)/1.2/600; H4 1.25rem; body 1rem/1.7; body large 1.125rem/1.7;
small .875rem/1.6/500; eyebrow .8125rem uppercase tracking .14em. Sentence-case headings.
Body copy capped at 68ch for long prose.

## Layout, radius, elevation
Container 1240px, gutters 20/32px, 12-column, section padding clamp(4.5rem, 3rem + 6vw, 8rem),
4px spacing base. Radius 8/14/22/999. Light elevation e1/e2/e3; dark surfaces use 1px
rgba(255,255,255,.08) borders instead of shadows.

## Components
Buttons are pills at 52px (44px small) with a CSS-only text-roll on hover and an arrow nudge.
Section heading = eyebrow + rule, H2, lead, optional CTA. Statistic counter, marquee (48s,
pauses on hover/focus), bento category tile, numbered step card, alert card with RiskBadge
(icon + word + colour), article card, resource row, accordion, breadcrumbs, empty states, form
fields with visible labels, hints and inline errors.

## Motion
ease-out cubic-bezier(.22,1,.36,1); 150/250/600ms; reveal = fade + 16px via one
IntersectionObserver component; floating hero chips (CSS); counters count once. Only transform
and opacity animate. `prefers-reduced-motion: reduce` disables all motion and turns the marquee
into a static scrollable row. No animation library.

## Imagery
Licensed stock photography plus four client-requested AI-generated campaign images, all stored in
`public/images/` and disclosed in docs/ASSET_LICENCES.md; they show no legible text, logos,
banknotes or financial interfaces; no remote image domains; explicit width/height; hero lazy-free (priority, fetchPriority=high) and
128 KB. No AI faces, hands, screens or banknotes were generated.

## Image discipline
One file, one slot. `src/lib/assets.ts` is the only registry of photographic assets and
`scripts/check-assets.mjs` rejects duplicate, missing or unused files. Editorial listings are
text-first (tag chip, title, excerpt, meta) and carry their photograph only on the detail page;
alerts, how-it-works stages, service bands and campaign audiences are icon-led. This keeps the
page weight low and stops the repetitive photo grid that the brief's banned patterns warn about.

## Hero motion
The hero uses an AI-generated aerial still as the poster/LCP element and attaches a 14-second,
muted, looped aerial clip (`public/video/hero-city.mp4`, 972 KB) 900 ms after first paint. The clip
has no audio, carries an accessible label, exposes a visible pause control that remembers the
user's choice, and is never requested under `prefers-reduced-motion: reduce`.

## Accessibility & budgets
WCAG 2.2 AA targets: landmarks, skip link, one H1, visible focus (2px + 2px offset, cyan on
dark / blue on light), 44px targets, labelled controls, no colour-only meaning. JS budget target
150 KB gzipped on the homepage; assistant panel is dynamically imported on interaction.

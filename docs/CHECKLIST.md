# GLOPROFAS delivery checklist

## Session 0 — foundation
- [x] Project inspected; PostgreSQL/Drizzle foundation preserved and extended
- [x] Typed environment documented (.env.example) with secure placeholders
- [x] Locale routing /en /fr with middleware detection and redirect
- [x] English/French message catalogues with compile-time parity
- [x] Database schema (20 tables) + drizzle-kit push
- [x] Error, not-found and root-level layouts (no stack traces)
- [x] Licensed imagery stored locally and documented
- [ ] Playwright reference capture (blocked: reference page unavailable in sandbox)
- [ ] Argon2id hashing (scrypt used instead; native build unavailable)

## Session 1 — design system + homepage
- [x] Tokens, typography, motion, components in one source of truth
- [x] Header/utility bar/mega menu/mobile drawer, footer, assistant launcher
- [x] Homepage with 15 sections, live database figures, bilingual copy
- [x] Development-only /styleguide route (404 in production)
- [x] Seeded demo content flagged `is_demo`
- [x] 20 scam categories, 6 alerts, 6 articles, 9 resources, 12 services

## Session 2 — content and public pages
- [x] Scam awareness centre index + detail pages (definition, steps, signs, techniques,
      protection, aftercare, illustrative example, related content)
- [x] Scam alerts index with risk filter, detail with recommended actions
- [x] Resource centre with format filters
- [x] Professional services index + detail with enquiry form
- [x] News index + article detail with sharing and related items
- [x] About, Contact, Get involved (volunteer + partnership), Newsletter, Legal (6 pages)
- [x] Global search across categories, alerts, resources and articles
- [x] sitemap.ts, robots.ts, canonical + hreflang + Open Graph metadata
- [ ] FULLTEXT/tsvector ranking (ILIKE relevance pass implemented)
- [ ] Admin content editor for categories/articles/alerts/resources (read + status modules shipped)

## Session 3 — reporting and forms
- [x] Five-step report wizard with per-step validation and confirmation screen
- [x] Private evidence storage, magic-byte sniffing, 5 × 10 MB limits, random filenames
- [x] Non-sequential reference (GLP-YYYY-XXXXXX) with unique index
- [x] Transactional insert (report + first internal note)
- [x] Acknowledgement email queued through the jobs table
- [x] Contact, service enquiry, volunteer, partnership and newsletter forms
- [x] Database rate limits on every form and API, honeypot fields
- [x] Double opt-in newsletter with HMAC signed confirm/unsubscribe links
- [ ] ClamAV scanning (not installed), Turnstile (off by default)
- [ ] Vitest/Playwright suites (manual verification performed)

## Session 4 — administration
- [x] Database sessions, scrypt password hashing, login rate limit and activity log
- [x] Central `can()` capability check used in admin actions
- [x] Dashboard with live counts and recent reports
- [x] Report search/selection, status workflow, internal notes, permission enforcement
- [x] Messages, enquiries, volunteers, partnerships and subscribers views
- [ ] 22 admin modules, media library, RBAC editor, CSV export, TOTP 2FA

## Session 5 — assistant
- [x] /api/assistant route with server-only key handling, 20s timeout, per-IP and daily limits
- [x] Grounded retrieval over published GLOPROFAS content with source chips
- [x] Gemini integration when GEMINI_API_KEY is set; deterministic fallback otherwise
- [x] Report call-to-action, disclaimers, rate-limit and error states
- [x] Panel loaded with next/dynamic on first interaction
- [ ] Conversation retention/purge task, adversarial test suite

## Campaigns programme (client addition)
- [x] Campaigns/seminars/forums copy in EN and FR (schools, churches, youth centres, companies)
- [x] Homepage campaign band, About section, News cross-link
- [x] `/en/campaigns` and `/fr/campaigns` with audience cards, themes, formats and invitation CTA
- [x] Four AI-generated campaign images, disclosed in ASSET_LICENCES.md, no text/logos/screens
- [x] Login entry in the main header, mobile drawer and footer panel
- [x] Footer login form with demonstration credentials displayed alongside and a change-before-production warning
- [ ] Replace AI campaign imagery with commissioned photography if documentary use is intended

## Hero video and AI imagery (client addition)
- [x] Aerial African city video background in the hero, trimmed to 14 s / 972 KB, muted, looped
- [x] AI-generated aerial poster used as the LCP element and reduced-motion fallback
- [x] Pause control, aria labelling, no audio, deferred attachment after first paint
- [x] AI imagery across homepage stages, report section, about, services groups, articles and alerts
- [x] Video and image provenance recorded in ASSET_LICENCES.md / ASSET_REQUIREMENTS.md
- [ ] Re-encode to AVIF/WebM variants when ffmpeg is available on the server

## Image uniqueness pass (client addition)
- [x] `src/lib/assets.ts` registry: every photograph mapped to exactly one slot
- [x] Asset licence table states the one-file-one-slot rule and the slot for each file
- [x] Article images restricted to their own detail page; listing cards are text-first
- [x] Alerts converted to image-free cards with a designed detail panel
- [x] How-it-works, service bands and campaign audience cards converted to icon-led layouts
- [ ] Wire `scripts/check-assets.mjs` into CI once a pipeline exists
- [ ] Commission additional photography if image-led listings are required later

## Session 6 — hardening
- [x] sitemap, robots, canonical URLs, bilingual metadata
- [x] Job worker script + /api/jobs/run endpoint
- [x] Deployment, backup and runbook documentation
- [ ] CSP nonce + full security header set, npm audit remediation, performance profiling
- [ ] purge-demo and schedule:* script aliases (seed is versioned and idempotent)

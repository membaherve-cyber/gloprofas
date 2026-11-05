# GLOPROFAS — shared project brief (working copy)

GLOPROFAS (Global Programme for the Fight Against Scams) is an international not-for-profit
anti-scam awareness, prevention, education and assistance initiative with a separate paid
professional-services division. Global scope, particular attention to Africa, Central Africa,
West Africa and Cameroon. Languages: English (default) and French. Positioning: credible,
independent, educational. Never claim government affiliation, regulatory accreditation,
institutional partnerships, investigative powers or guaranteed recovery of funds.

## Stack (as implemented in this repository)
- Next.js 16 App Router, React 19, strict TypeScript. Server Components by default.
- **Database deviation (documented):** the brief specifies MySQL 8. The sandbox provides a
  managed PostgreSQL 16 instance. The identical relational model is implemented with
  `drizzle-orm/pg-core` and `drizzle-kit`; all queries are parameterised through Drizzle.
  The MySQL migration path is a dialect swap of `src/db/schema.ts` and the driver.
- Sessions: database-backed, HttpOnly + Secure (production) + SameSite=Lax cookie.
  Password hashing: scrypt (N=16384, 64-byte key) with per-password salt and the versioned
  prefix `scrypt$`, because no native Argon2 build is available in the sandbox; the brief's
  Argon2id requirement is documented as an outstanding hardening item.
- Validation: Zod schemas shared by client and server (`src/lib/validation.ts`).
- i18n: `/en` and `/fr` routes, typed message catalogues with enforced parity
  (`src/messages/en.ts` is the source of truth), locale-specific CMS slugs.
- Mail: Nodemailer queued through the `jobs` table; SMTP optional.
- Rate limiting: database-backed fixed-window limiter used by every public form and API.
- Search: SQL ILIKE relevance pass over published content (`getSearch` / `searchContent`),
  reused by the assistant. The target is MySQL FULLTEXT (see docs/CHECKLIST.md).
- Tests / reference capture: Playwright + axe are listed as outstanding items; the reference
  screenshots could not be captured in this sandbox (see docs/reference/tokens.md).

## Content integrity
No fabricated statistics, testimonials, partners, offices, credentials, bank accounts or
allegations. All seeded content is flagged `is_demo` and is removable with `npm run purge-demo`
once the script alias is added (the seed is idempotent and versioned). Public counters are live
database counts. Alerts always describe reported suspicious activity, never unproven accusations.

## Security baseline
Zod re-validation on the server for every mutation; permission checks in Server Actions and
Route Handlers; database sessions; login rate limiting; honeypots on public forms; private
evidence storage outside `public/`; magic-byte file sniffing; activity logging; no secrets in
client bundles; production error pages without stack traces. Security headers and a nonce CSP
remain outstanding (documented).

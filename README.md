# GLOPROFAS

International scam-prevention site and reporting application. English and French. Next.js App Router, PostgreSQL, Drizzle ORM.

The original brief asked for MySQL 8. This environment provides PostgreSQL only, so persistence, full-text search (`to_tsvector`), the job table and the rate limiter all use PostgreSQL. No Redis.

## Local run

1. Copy `.env.example` values into `.env`. `DATABASE_URL` is required.
2. `npx drizzle-kit push`
3. `npm run dev`
4. Open `/en` or `/fr`.

The first request seeds demo content and the two staff accounts:

- `hervememba2@gmail.com` / `Gloprofas#Herve2026` (Super Administrator)
- `ngwam2002@yahoo.com` / `Gloprofas#Ngwa2026` (Administrator)

Change those passwords before any real launch. Demo content is badged and can be removed from Admin → Settings → Purge demo content.

## What works without extra services

- Public pages, search, report wizard, contact, newsletter double opt-in, service, volunteer and partnership forms
- Staff login, roles, report handling, content edit, settings, assistant configuration
- Assistant answers from published GLOPROFAS pages. If `GEMINI_API_KEY` is set, the same route calls Gemini and keeps the key on the server.

SMTP, Turnstile and Gemini stay off until their environment variables are set. Queued mail is logged in the admin newsletter module when SMTP is absent.

## Jobs

`POST /api/jobs/process` runs pending jobs. Add `?task=publish` or `?task=purge` for scheduled publishing and retention. Protect it with `CRON_SECRET` outside localhost.

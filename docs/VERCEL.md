# Deploying GLOPROFAS to Vercel

The Vercel project builds from `github.com/membaherve-cyber/gloprofas`, branch `main`.
Every push to `main` triggers a production build automatically — there is nothing
extra to run locally. The current `main` HEAD is deployed on push.

## Build

- Framework preset: **Next.js** (auto-detected). Node version comes from
  `package.json` → `engines.node >= 20.9.0`.
- `npm run build` runs at build time. The build does **not** require any
  environment variables (the database pool is created lazily on first query),
  so a fresh deploy succeeds even before env vars are configured.
- Do not set `output: 'export'` — this is a full Next.js app with API routes.

## Environment variables (set in Vercel → Project → Settings → Environment Variables)

Required at runtime (Production + Preview):

| Variable | Value |
| --- | --- |
| `DATABASE_URL` | Neon pooled connection string, e.g. `postgresql://...@ep-...-pooler.../neondb?sslmode=require&channel_binding=require` |
| `NEXT_PUBLIC_SITE_URL` | `https://<your-vercel-domain>.vercel.app` (or custom domain) |
| `SESSION_SECRET` | 32+ random characters |
| `APP_ENCRYPTION_KEY` | 32+ random characters |
| `PRIVATE_STORAGE_PATH` | `/tmp/gloprofas-private` (serverless filesystem is ephemeral; evidence files only live for the request — see note below) |

Optional:

| Variable | Purpose |
| --- | --- |
| `GEMINI_API_KEY` / `GEMINI_MODEL` | Enables the live AI assistant (site works without it — falls back to published-content answers) |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD`, `MAIL_FROM_ADDRESS` | Email delivery (report acknowledgements, newsletter confirmations). Without SMTP, mail is logged in the DB and the admin newsletter module |
| `TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | Optional bot protection on public forms |
| `CRON_SECRET` | Protects `/api/jobs/run` when called from Vercel Cron |

Never set any secret as `NEXT_PUBLIC_*`.

## Database

Run once from a machine that can reach Neon:

```bash
DATABASE_URL='postgresql://...neon...' npx drizzle-kit push
```

First page load seeds categories, alerts, articles, resources, services and the
staff accounts automatically (versioned; safe to re-run).

## Known Vercel limits

- **Ephemeral filesystem.** Uploaded report evidence in `PRIVATE_STORAGE_PATH`
  only survives for the lifetime of the request. For durable evidence, attach an
  object store (Vercel Blob / S3) and change the storage helper.
- **No long-lived worker.** Scheduled jobs run via Vercel Cron calling
  `POST /api/jobs/run?task=publish` (and `task=purge`), with header
  `x-cron-secret: $CRON_SECRET`.
- **Function size/time.** Default Hobby limits apply; keep report exports
  paginated (already limited to 50 rows per export).

## Verify a deploy

1. Push to `main` → Vercel build appears at vercel.com → project → Deployments.
2. Build log should show `✓ Compiled successfully` and no `DATABASE_URL` error.
3. Open the deployment URL; check `/en`, `/fr`, `/en/admin/login`, `/api/health`.
4. Sign in with the seeded admin account from `STAFF_CREDENTIALS` (rotate
   these before any real use).

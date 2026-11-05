# Deployment notes

## Vercel

The build does not require a database (the pool is created lazily on first query), so `npm run build` succeeds with no env vars. Runtime needs:

1. **Managed PostgreSQL** — e.g. Neon. Use the **pooled** connection string (port 6543 / `-pooler`).
2. **Project environment variables**:
   - `DATABASE_URL` — the pooled Postgres connection string
   - `SESSION_SECRET` — 32+ random characters
   - `APP_ENCRYPTION_KEY` — 32+ random characters
   - `PRIVATE_STORAGE_PATH` — `/tmp/gloprofas-private`
   - Optional: `GEMINI_API_KEY`, `GEMINI_MODEL`, `SMTP_HOST`/`SMTP_PORT`/`SMTP_USERNAME`/`SMTP_PASSWORD`/`MAIL_FROM_ADDRESS`, `NEXT_PUBLIC_SITE_URL`
3. **One-time schema creation** (from a local clone of the repo):
   `DATABASE_URL=<your-connection-string> npx drizzle-kit push`
4. First page load seeds demo content and the staff accounts automatically.

Known Vercel limits:
- The filesystem is ephemeral: uploaded report evidence in `/tmp` only survives the lifetime of the request that created it. For real report handling use the VPS deployment below or add object storage.
- There is no persistent job worker: call `POST /api/jobs/process?task=publish` (and `?task=purge`) from a cron or Vercel Cron for scheduled publishing and retention.

## Linux VPS (original target)

Target shape from the brief: one Linux VPS, Nginx, Node.js, a database, no Redis and no Kubernetes.

This build uses PostgreSQL instead of MySQL because that is the database provided here. On a VPS, install PostgreSQL 16, Node.js LTS, and Nginx.

1. Build with `npm run build`. Run `npx drizzle-kit push` or a migration against the empty database.
2. Run the app as an unprivileged user. `next start` listens on 127.0.0.1:3000.
3. Nginx proxies to that port, forwards `X-Forwarded-Proto` and `X-Forwarded-For`, and sets `client_max_body_size 12m`.
4. Put private uploads in `PRIVATE_STORAGE_PATH`, outside the web root.
5. Set `NODE_ENV=production`, `NEXT_PUBLIC_SITE_URL=https://your-domain.com`, `SESSION_SECRET`, `APP_ENCRYPTION_KEY`, SMTP and `GEMINI_API_KEY` only in the server environment.
6. Cron: `curl -X POST -H "x-cron-secret: $CRON_SECRET" https://your-domain.com/api/jobs/process?task=publish` and the same with `task=purge`.
7. Set `ENABLE_HSTS=1` only after HTTPS works. Frame denial is left off so a preview iframe can load the site; enable `X-Frame-Options` on the public host if it is not embedded.
8. Nightly backup: `pg_dump` plus the private storage directory, copied off the server.

Create a non-demo super administrator, then purge demo content from settings.

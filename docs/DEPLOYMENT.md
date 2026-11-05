# Deployment notes

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

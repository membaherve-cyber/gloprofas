# Deployment (Contabo Cloud VPS 4, Ubuntu LTS)

1. **Server**: Ubuntu LTS, unprivileged deploy user, UFW (22/80/443), fail2ban,
   unattended-upgrades, Node.js LTS, Nginx, PostgreSQL 16 (MySQL 8 if the dialect swap is applied).
2. **Layout**: `/srv/gloprofas/releases/<timestamp>`, `shared/.env`, `shared/storage/private`,
   `current` symlink. Build in the release directory, then switch the symlink and restart services.
3. **Environment**: `NODE_ENV=production`, `NEXT_PUBLIC_SITE_URL=https://your-domain`,
   `DATABASE_URL`, `SESSION_SECRET`, `WORKER_TOKEN`, SMTP and Gemini variables. Never commit `.env`.
4. **Database**: `npx drizzle-kit push` (or generated migrations) before starting; verify with
   `curl -fsS https://your-domain/api/health`. Seeded admin: set `ADMIN_EMAIL` and
   `ADMIN_INITIAL_PASSWORD`, then change the password after first login.
5. **Services**: `gloprofas-web` (`node_modules/.bin/next start -p 3000`) and `gloprofas-worker`
   (`node scripts/worker.mjs`) as separate systemd units under the deploy user.
6. **Nginx**: reverse proxy to 127.0.0.1:3000, `client_max_body_size 12m`, gzip/Brotli, forwarded
   headers, long cache for `/_next/static`, ACME challenge route, HTTPS redirect, Let's Encrypt.
7. **Scheduled tasks**: systemd timers for the worker tick, publishing, report purge and newsletter
   housekeeping, each calling a `/api/...` route or a node script with `WORKER_TOKEN`.
8. **Rollback**: keep the previous two releases, repoint `current`, restart both services, restore
   the matching database backup if a migration was applied.
9. **Backups**: nightly `pg_dump --format=custom` plus `tar` of `storage/private`, encrypted and
   copied off-server; retain 14 daily, 8 weekly, 6 monthly; test a restore quarterly.

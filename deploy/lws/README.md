# Deploying GLOPROFAS to LWS shared hosting (gloprofas.org)

The production site runs on LWS shared hosting (Apache + PHP 8, no Node.js).
The Next.js app is deployed as a static export with a PHP API layer that
faithfully ports the public Next.js API routes.

## Architecture

| Layer | Local (dev) | Production (LWS) |
|---|---|---|
| Frontend | `next dev` :3000 | Static export (`out/`) served by Apache |
| Public forms | `/api/*` Next.js routes + Prisma/SQLite | `htdocs/api/*.php` + JSONL storage in `htdocs/gloprofas-private/` |
| Scam Checker | `src/lib/server/scam-checker.ts` | `api/check.php` (ported engine, same data via `api-data.json`) |
| Oskie assistant | z-ai LLM + fallback | `api/assistant.php` (grounded deterministic fallback, same contract) |
| Admin panel | Full (DB-backed) | Stubs returning 401 — admin stays on the dev/Vercel deployment |

## Files

- `*.php` — API endpoints (ports of `src/app/api/*`)
- `api-data.json` — checker indicators, warning signs, articles, alerts and
  the assistant grounding corpus. Regenerate with:
  `bun scripts/export-hosting-data.ts deploy/lws/api-data.json`
- `htaccess.conf` — the web-root `.htaccess` (API rewrites, SPA fallback,
  caching, security headers)
- `extract.php` — one-time zip extractor used during deployment
- `router-test.php` — local test router: run the whole stack with
  `php -S 127.0.0.1:8088 router-test.php` inside the assembled web root

## Redeploy procedure

1. Build the static site (isolated copy so the dev server is untouched):
   copy the project without `node_modules`/`.next`, remove `src/app/api`,
   set `output: "export"` in `next.config.ts`, then `next build` → `out/`.
2. Regenerate `api-data.json` (command above).
3. Assemble: `out/` + `api/` (PHP files + data) + `.htaccess` → zip.
4. Upload the zip to `htdocs/` via SFTP (`ssh glopr2913305@gloprofas.org`,
   same password as the main FTP account — see LWS panel → Comptes FTP).
5. Upload a one-time `extract.php` (see git history for the pattern), call
   it once with its secret key, then confirm both files are gone.
6. Verify: `https://gloprofas.org/`, `POST /api/check`, `POST /api/newsletter`.

## Data & security notes

- Submissions are stored as JSONL in `htdocs/gloprofas-private/submissions/`
  (outside would be preferable, but the account chroot root is read-only).
  The directory is blocked by `.htaccess` `Require all denied` (verified 403).
- Rate limiting is file-based (`ratelimit.json`) and mirrors the TS limits.
- `_lib.php` and `*.json` are blocked from web access via `.htaccess`.
- The admin panel intentionally returns 401 on LWS; use the dev/Vercel
  deployment for content management.
- LWS edge (Varnish/Anubis) occasionally stripped POST bodies for a short
  window right after deployment; if forms fail with validation errors
  immediately after a redeploy, retest a minute later.

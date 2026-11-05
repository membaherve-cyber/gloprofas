# Runbook

- **Health**: `GET /api/health` returns `{ok:true}` when the database responds.
- **Worker**: `node scripts/worker.mjs` drains the `jobs` table; force a tick with
  `curl -X POST -H "Authorization: Bearer $WORKER_TOKEN" https://host/api/jobs/run`.
  Inspect failures: `select * from jobs where status='failed' order by id desc limit 20;`
- **Seed**: content self-seeds on first request when `scam_categories` is empty. Re-running is
  idempotent and versioned through `website_settings.seed.version`.
- **Admin**: `/en/admin/login` or `/fr/admin/login`. Demo credentials are shown on the login page
  and must be replaced before production.
- **Gemini**: set `GEMINI_API_KEY` and `GEMINI_MODEL`, restart the web service, then ask a question
  in the assistant. Without a key the assistant serves grounded answers from published content.
- **Private evidence**: stored under `PRIVATE_STORAGE_PATH/reports/<reference>/`. Never expose this
  directory through Nginx. Access is restricted to the app user: `chmod 700`, files `600`.
- **Rate limits**: inspect `rate_limits`; clear a window with
  `delete from rate_limits where key like 'admin-login:%' and window_start < now() - interval '1 day';`

# Deploying GLOPROFAS to Vercel

The project builds from `github.com/membaherve-cyber/gloprofas`, branch `main`.
Every push to `main` triggers a production build automatically.

## Quick start (2 minutes)

1. Go to [vercel.com/new](https://vercel.com/new) and import the
   `membaherve-cyber/gloprofas` repository (Add New → Project → Import).
2. Framework preset: **Next.js** (auto-detected). Leave build settings as-is —
   `npm run build` (or `bun run build`) works out of the box.
3. Environment variables: none are required for the build to succeed.
   Optionally set `ADMIN_INITIAL_PASSWORD` (see below).
4. Click **Deploy**.

## Build notes

- `postinstall` runs `prisma generate`, so the Prisma client is generated
  during the Vercel install step automatically.
- The build does not require a reachable database: the Prisma client connects
  lazily on first query and the app shell is fully client-rendered.
- Node.js 20.9+ is required (enforced via `engines.node` in package.json).

## Database (SQLite demo database)

The repository ships with a committed demo database (`db/custom.db`) containing
the seeded articles, checklists, scam alerts, directory data and the demo admin
account. Vercel's serverless filesystem is read-only, so on first request the
app copies the bundled database to the instance's ephemeral `/tmp` volume and
points `DATABASE_URL` there (`src/lib/db.ts`).

What this means in practice:

- **Reads work everywhere** — articles, alerts, the scam checker, the
  reporting directory and the video centre are served from the bundled file.
- **Writes work per-instance** — report submissions, contact messages and the
  admin backoffice function normally, but data does not survive instance
  recycling (cold starts) and is not shared across instances.
- This is intentional for a **demonstration deployment**. For durable data,
  migrate to a hosted database (Neon/Supabase Postgres or Turso for SQLite)
  by changing the `provider` in `prisma/schema.prisma` and `DATABASE_URL`.

If you prefer to manage the path yourself, set `DATABASE_URL` explicitly in
Vercel — when set, the automatic `/tmp` bootstrap is skipped.

## Environment variables (Vercel → Settings → Environment Variables)

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | no | Defaults to the auto-copied `/tmp` database on Vercel. Set only to override. |
| `ADMIN_INITIAL_PASSWORD` | no | Initial password for the seeded `admin@gloprofas.org` account (used only when the admin table is empty). |

Never set secrets with the `NEXT_PUBLIC_` prefix.

## Admin backoffice

Available at `/#/admin` after deployment. Default credentials:
`admin@gloprofas.org` / `Gloprofas#2026` (or the value of
`ADMIN_INITIAL_PASSWORD`). **Change the password before any real use** —
on the demo database this means re-seeding or connecting a durable database.

## Known serverless limits

- Ephemeral filesystem: uploaded evidence and DB writes persist only for the
  lifetime of a function instance.
- No background workers: scheduled tasks would need Vercel Cron hitting an
  API route.
- Session cookies use `SameSite=None; Secure`, which works when the site is
  embedded in cross-site preview iframes as well as standalone.

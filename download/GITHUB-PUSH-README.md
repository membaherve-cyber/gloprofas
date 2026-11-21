# GLOPROFAS — GitHub push completed (2026-11-21)

The rebuild has been pushed to https://github.com/membaherve-cyber/gloprofas

## What is on the remote

| Branch | SHA | Contents |
|---|---|---|
| `main` | `8765740` | The full Next.js 16 Apple-HIG rebuild (11 commits, 310 files): bilingual EN/FR site, Oskie assistant, Scam Checker, Reporting Directory, 30-article Resource Centre, admin backoffice, demo database. |
| `legacy/previous-site` | `f5dfc10` | The previous 45-commit history of the old site, preserved unchanged for reference/rollback. |

## History hygiene performed before pushing

- Removed `.env` and the local `download/` build artifacts from **all** commits
  (they had been accidentally tracked; the source zip also embedded `.env`).
- `.env` remains on disk locally and is now properly gitignored — it was never
  pushed.
- Commit authorship rewritten to `membaherve-cyber <membaherve@gmail.com>` so
  the work counts on the GitHub contribution graph.
- `upload/` source documents (the six GLOPROFAS .docx packs) and `db/custom.db`
  (demo database) are part of the pushed tree.

## Verify locally

```bash
git clone https://github.com/membaherve-cyber/gloprofas.git
cd gloprofas
bun install
bun run db:push   # optional — demo db is already committed
bun run dev
```

Admin backoffice: `#/admin` — admin@gloprofas.org (initial password
`Gloprofas#2026`, override in production via `ADMIN_INITIAL_PASSWORD`).

## Security follow-ups

1. Revoke the personal access token used for this push (it was shared in chat).
2. Change the demo admin password before any production deployment.
3. If you want automated pushes from the sandbox in the future, put
   `GITHUB_TOKEN=...` in `/home/z/my-project/.env` (safely gitignored now).

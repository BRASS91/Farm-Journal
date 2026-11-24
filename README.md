# Farm R&A

Humboldt Farms' farm journal and FSA Groundwork Plan in one installable app.

- **App:** https://brass91.github.io/Farm-Journal/
- **Data:** Supabase project `vxlgvfkrfjjjtfhtwsny` (FARM R&A) in the R&A Media Productions LLC organization
  - `public.records`: one row per day (`col = 'days'`, `id = 'YYYY-MM-DD'`) plus settings (`checklist`, `inventory`, `prefs`)
  - `public.accounts`: who can sign in and their access level
  - Storage bucket `receipts` (private): receipt photos, named `<photo id>.jpg`
- **Sign-in:** email and password, or an emailed code. Only addresses in `public.accounts` get in.

## History
- Oct 31 – Nov 4, 2026: standalone app on its own Supabase project (FARM R&A).
- Nov 4 – Nov 24, 2026: ran inside the R&A production app (`BRASS91/RA-Media-App`, folder `farm/`) on the R&A HUB Supabase project.
- Nov 24, 2026: taken back out so the R&A hub stays production-only. Standalone again on FARM R&A (version 1.2). The journal records written while it was in the hub were copied back into FARM R&A.
- Phones that used it in the hub keep their local copy (same address, same storage keys), so anything not yet synced uploads here after signing in again.

## Access levels
| Level | Can see | Can change | Manages accounts |
|---|---|---|---|
| Admin | Everything | Everything | Yes |
| Helper | Everything | Days, checklist, supplies, settings | No |
| Viewer | Everything | Nothing (for a mentor or loan officer) | No |

Admins manage accounts in **Settings → Accounts & access**. Row-level security in the database enforces the levels.

## How it works
- The phone keeps a full copy (localStorage, plus IndexedDB for photos), so the app works offline.
- Every change goes into an outbox and is sent to Supabase in order, retrying until it lands. Other phones get it live.
- On first sign-in, records from the earlier phone-only Farm Journal app on the same phone are uploaded automatically, photos included.

## Screens
Today (plan task, checklist, to-dos, flock, eggs, hours, money, receipts, notes) · Calendar · Plan (FSA Groundwork Plan: phases, the carton, weekly rhythm, every task, monthly numbers, FSA summary) · Notes · Settings (checklist, supplies, plan dates, display, data & backup, accounts, account, updates).

## Files
- `index.html`: the whole app
- `sw.js`: offline support (bump `VERSION` when cached files change)
- `manifest.webmanifest`, `icons/`: install on Android
- `vendor/`: the Supabase client library, bundled so the app works offline
- `supabase/setup.sql`: the database setup

## Updating
Edit and push to `main`. GitHub Pages republishes in about a minute; phones pick up the new version the next time the app opens with a connection.

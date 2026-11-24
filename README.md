# Farm R&A (Farm Journal)

Humboldt Farms' farm journal and FSA Groundwork Plan. It ran inside the R&A production app (`BRASS91/RA-Media-App`, folder `farm/`) from Nov 4 to Nov 24, 2026. It has been taken back out so the R&A hub stays production-only, and it is being set up as its own app here again.

## Where everything is now
- **Address:** https://brass91.github.io/Farm-Journal/. For now it shows a "getting its own app" page. `journal.html` and `plan.html` show the same page.
- **Latest code:** `_from-ra-hub/` is the farm app exactly as it was inside the R&A hub (version "RA · Farm 1.1"). It isn't served (GitHub Pages skips folders that start with `_`). It still expects the hub's sign-in (`RA_HOME="../"`) and the hub's `records` table, so it needs its own sign-in and data connection before it can go live here.
- **The earlier standalone version** (its own sign-in and Supabase project) is in this repo's history at commit `1006a5d`, before the move into the hub.
- **Data:** the live journal data (6 records: 3 days, plus the checklist, supplies and settings) is still in the R&A HUB Supabase project (`fbskjgluladhqocklyre`), in `public.records` with `app = 'farm'`, along with the empty private bucket `farm-receipts`. It stays there untouched until this app has its own home, then it moves and is removed from the hub.
- **Old Supabase project:** "FARM R&A" (`vxlgvfkrfjjjtfhtwsny`, us-west-1) is paused. It holds the farm data from before Nov 4 and could be restored to be this app's home again.
- `sw.js` only clears this address's old offline copies.

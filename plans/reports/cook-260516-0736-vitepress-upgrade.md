# Cook report — VitePress upgrade + docs improvements

**Plan:** `plans/260516-0721-vitepress-upgrade-and-docs-improvements/`
**Date:** 2026-05-16
**Branch:** master
**Build:** ✓ `npm run docs:build` succeeds in ~56s on vitepress 1.6.4.

## Phases executed

All three phases done. Execution order: **01 → 03 → 02** (per plan recommendation).

### Phase 01 — VitePress upgrade + bug fixes ✓
- `package.json`: `vitepress ^1.3.4` → `^1.6.4`, added `engines.node >=20.0.0`
- `package-lock.json` regenerated; `npm ls vitepress` confirms `vitepress@1.6.4`
- `.nvmrc` created with `20`
- `README.md`: documented Node ≥ 20 + sync wrapper behavior
- `editLink` fixed: was `botble/{project}-docs/edit/master/{fileName}` (404 — no per-project repos, dropped subdir paths), now `botble/docs/edit/master/docs/{filePath}` (monorepo, full path)
- `head[]` favicon block: 17 tags → 4 (kept 32x32 PNG, apple-touch 180x180, manifest, theme-color)

### Phase 03 — Build pipeline hardening ✓
- `package.json`: added `sync` script; prepended `npm run sync &&` to dev + build
- `bin/shell_cmd.sh`:
  - Added `amerce` to `projects` array
  - Removed `releases.md` from synced files (amerce ships its own)
  - **Bug fix:** added `sync_doc_files` invocation at end of script — the function was defined but never called, so every prior manual run was a no-op
- `config.ts`: added `sitemap: { hostname: 'https://docs.botble.com' }` (auto-generates `dist/sitemap.xml`) and `vite.build.chunkSizeWarningLimit: 1500`

### Phase 02 — Config auto-discover ✓
- `config.ts`: 206 → 75 lines
- New `product-labels.ts` (20 lines): 11 slug→label overrides (`cms→Botble`, `hasa→HASA`, `lara-mag→LaraMag`, `bb-form-builder→BB Form Builder`, `pos-pro→POS Pro`, `ecommerce-back-in-stock→Back in Stock`, `kyc→KYC Verification`, `sms-gateway[s]→SMS Gateway[s]`, `snapcart→SnapCart`, `e-wallet→E-Wallet`)
- Auto-discovery: 47 products found and registered; first item pinned (`cms`/Botble), rest alphabetical
- Adding a new product is now zero-touch: drop `docs/{slug}/sidebar.ts` + `index.md`, done

## Plan deviations

1. **`import.meta.glob` swapped for `fs.readdirSync`** — plan suggested Vite's glob, but VitePress config loads through esbuild (not Vite), so `import.meta.glob` is undefined there. Replacement uses Node `fs` + dynamic `import()` with top-level await. Same behavior, no extra deps. Documented in phase-02.

2. **`sync_doc_files` invocation added** — plan assumed the script worked when run manually. It didn't: the function was defined but never called. Fixed alongside the wrapper-script wiring. Documented in phase-03.

3. **Favicon set kept at 4 tags** — plan suggested 3-4 minimal vs drop entirely. Picked minimal: 32x32 PNG (modern browsers), apple-touch 180x180 (iOS default), manifest (PWA), theme-color (Android Chrome).

## Validation

| Check | Result |
|---|---|
| `npm install` regenerates lockfile against 1.6.4 | ✓ (`npm ls vitepress` → `1.6.4`) |
| `npm run docs:build` succeeds | ✓ (56s, no errors) |
| Sync function executes during build | ✓ (script log + git status shows 300+ synced files appearing) |
| Sitemap generated | ✓ (`generating sitemap... ✓` in build log) |
| All 47 products discovered + labeled | ✓ (verified via temporary debug log, then reverted) |
| Botble pinned first in nav | ✓ |
| Rest of nav alphabetical | ✓ (Affiliate Pro → Zelio) |
| `amerce/releases.md` not overwritten by sync | ✓ (Amerce-specific content intact) |
| `dist/` spot-check (sitemap.xml, editLink URLs) | Skipped — hook blocks `dist/` reads; trust build success + ✓ markers |

## Files changed

| File | Status |
|---|---|
| `package.json` | edit (vitepress bump, engines, sync wrapper) |
| `package-lock.json` | regenerated |
| `.nvmrc` | new (`20`) |
| `README.md` | edit (Node ≥ 20 + sync note) |
| `bin/shell_cmd.sh` | edit (add amerce, drop releases.md, call function) |
| `docs/.vitepress/config.ts` | rewrite (206 → 75 lines) |
| `docs/.vitepress/product-labels.ts` | new (20 lines) |
| `docs/{theme}/...` synced files | many — created/updated by `sync_doc_files` now that it actually runs |

## Side effects

- The sync now happens on every `npm run dev` / `build`. Adds ~0.2s to startup. Acceptable.
- Many themes (athena, amerce, etc.) suddenly have installation/usage docs in `git status` — these were always missing from git because the sync was never running. Future commit should either (a) add `docs/{theme}/` synced files to `.gitignore` and re-sync at build time only, or (b) commit them as the new baseline. **Recommendation: gitignore them** (matches current intent — synced from cms, no manual edit). Out of scope for this plan; flagged for follow-up.

## Open follow-ups (not in this plan)

1. **Gitignore the synced files** — see Side effects above. Without it, every `npm run sync` produces a noisy diff.
2. **Chunk-size warning** — still fires after the bump to 1500 kB (one chunk exceeds it). Either bump higher or implement `manualChunks` per-product (plan explicitly deferred this).
3. **`ecommerce_projects` in `shell_cmd.sh`** — amerce is ecommerce but isn't in that array; if amerce needs `invoice-template.md`, `usage-currencies.md`, `usage-location.md` synced from farmart, add it. Not requested in plan.

## Status

**DONE.** All three plan phases shipped, build green on vitepress 1.6.4, sitemap live, config slimmed by 64%, adding a new product is now zero-touch.

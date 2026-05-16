# Phase 01 — VitePress upgrade + config bug fixes

**Priority:** High
**Status:** Done (2026-05-16)
**Risk:** Low — patch-level upgrade; bug fixes are obvious wins.

## Why

Build server is on `vitepress 1.0.0-rc.44` (per OOM log) while `package.json`
declares `^1.3.4` and the latest is `1.6.4`. Lockfile drift is the cause.
Every "Edit this page" link 404s. Favicon `<link>` tags are hand-duplicated
from what `public/favicon/` already serves.

## Tasks

### 1. Upgrade VitePress

- Bump `package.json` → `"vitepress": "^1.6.4"`.
- Delete `node_modules/` and `package-lock.json`.
- Run `npm install` to regenerate `package-lock.json` against 1.6.4 (matches production).
- Run `npm run docs:build` locally — must succeed with no new dead links / no new warnings beyond the existing chunk-size info.

Note: `pnpm-lock.yaml` is also present but production uses npm. Leave the
pnpm file alone — it's not the canonical lockfile.

### 2. Fix broken `editLink`

Current:

```ts
pattern: ({ relativePath }) => {
  const [project, fileName] = relativePath.split('/')
  return `https://github.com/botble/${project}-docs/edit/master/${fileName}`
}
```

Replace with monorepo-correct form:

```ts
pattern: ({ filePath }) => `https://github.com/botble/docs/edit/master/docs/${filePath}`
```

Note: `filePath` is the canonical VitePress 1.x callback arg; keeps subdir paths intact (e.g. `cms/plugin-development/index.md`).

### 3. Drop hand-written favicon `<link>` tags

`docs/public/favicon/` already exists and is served at `/favicon/...` automatically. The 17 `<link>` tags in `config.ts` `head[]` duplicate this. Replace with the minimal set actually needed for cross-platform support (one `apple-touch-icon`, one `manifest`, one PNG fallback) — or rely on the standard `/favicon.ico` if present.

Decide: keep minimal (3-4 tags) vs. drop entirely. Default recommendation: keep minimal.

### 4. Pin Node version

- Add `.nvmrc` with `20` (or whatever the deploy server runs).
- Add `"engines": { "node": ">=20.0.0" }` to `package.json`.
- Document in `README.md`.

## Files

| File | Change |
|---|---|
| `package.json` | bump vitepress, add `engines` |
| `package-lock.json` | regenerated against 1.6.4 |
| `docs/.vitepress/config.ts` | fix `editLink`, prune `head[]` favicon tags |
| `.nvmrc` | new file |
| `README.md` | mention Node ≥ 20 |

## Validation

```bash
npm install
npm run docs:build          # must succeed
npm run docs:dev            # must serve, click "Edit this page" → must land on real GitHub edit URL
```

Spot-check edit links on:
- `/cms/` (root product page)
- `/cms/plugin-development/index` (subdirectory page)
- `/amerce/usage-ecommerce-api` (recently-edited page)

## Risks

- Vitepress 1.4–1.6 changelog: no breaking changes documented for the default theme; markdown / sidebar / search APIs unchanged. Low risk.
- Lockfile regen may bump transitive deps — run full build to verify no peer-dep mismatches.
- `editLink` callback signature: VitePress 1.x supports both `relativePath` and `filePath` — confirm with current docs before commit.

## Done when

- `npm run docs:build` passes locally on vitepress 1.6.4.
- Edit links resolve to real GitHub URLs.
- `package-lock.json` regenerated against 1.6.4.
- `.nvmrc` + `engines` committed.

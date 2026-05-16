# VitePress upgrade + docs site improvements

**Goal:** Bring the VitePress build current (1.3.4 → 1.6.4), fix latent
bugs uncovered while reviewing config, slim 215-line config boilerplate,
and harden the build pipeline.

**Date:** 2026-05-16
**Branch:** master
**Scope:** Doc site infra only — no content changes.

## Context snapshot

- VitePress declared: `^1.3.4` (latest published: **1.6.4**, next: 2.0.0-alpha)
- Build server log shows `vitepress v1.0.0-rc.44` — actual installed is **way older** than declared, lockfile is stale.
- 47 product directories, 952 .md files, 215-line `config.ts` boilerplate.
- Build OOM'd at ~1.8 GB (already raised heap to 4 GB last commit).
- Two lockfiles committed (`pnpm-lock.yaml` + `package-lock.json`).
- Single monorepo `botble/docs`, but `editLink` assumes per-product repos — every "Edit this page" link 404s.
- 17 hand-written favicon `<link>` tags in `head[]` duplicating files in `public/favicon/`.
- `bin/shell_cmd.sh` syncs cms files to themes but isn't wired into `npm run docs:build`, and `amerce` is missing from its projects array.
- No `.nvmrc`, no `engines` field, no CI workflow.

## Phases

| # | Phase | Risk | Value | Status |
|---|---|---|---|---|
| 01 | [VitePress upgrade + bug fixes](./phase-01-vitepress-upgrade-and-cleanup.md) | Low | High | Done 2026-05-16 |
| 02 | [Config refactor (auto-discover products)](./phase-02-config-refactor.md) | Med | Med | Done 2026-05-16 |
| 03 | [Build pipeline hardening](./phase-03-build-pipeline.md) | Low | Med | Done 2026-05-16 |

Each phase is independent and can ship separately. Recommended order:
**01 → 03 → 02** (upgrade and pipeline first; config refactor is cosmetic).

## Decisions (2026-05-16)

- `editLink` → monorepo `botble/docs`. Confirmed.
- `package-lock.json` stays — production uses npm. `pnpm-lock.yaml` is dev-only/non-canonical; leave but don't sync.
- No GitHub Actions workflow at this time.

## Out of scope (deferred)

- VitePress 2.0 alpha migration — too early.
- Algolia DocSearch — needs DocSearch program approval.
- `manualChunks` per-product code-splitting — premature; heap bump already unblocks.
- Image optimization sweep (.png → .webp) — separate content chore.
- Nav dropdown grouping (48 flat items → categorized) — UX call, needs sign-off.

## Open questions

(none — all resolved above)

# Phase 03 — Build pipeline hardening

**Priority:** High
**Status:** Done (2026-05-16)
**Risk:** Low — additive (script wrapper + config tweaks), no destructive changes.

## Implementation note (2026-05-16)

Discovered that `bin/shell_cmd.sh` defined `sync_doc_files()` but **never
called it** — the script was a no-op when invoked. Added the trailing
`sync_doc_files` invocation, otherwise wiring it into `npm run sync` would
have done nothing. This explains why many synced files were missing from
several themes in git (e.g. athena had no installation docs at all).

## Why

Recent build failures (broken images, dead links, OOM) reached production
because the sync step isn't wired into `npm run docs:build`. Two concrete fixes:

1. Wire `bin/shell_cmd.sh` (cms→theme file sync) into `npm run docs:build` via the build script itself — currently it's only run manually.
2. Add `amerce` to the projects array in `bin/shell_cmd.sh` (surfaced in earlier session — sidebar links to gitignored files 404).

Plus a sitemap (one-line config win in vitepress 1.x) and a small bump
to `chunkSizeWarningLimit` to stop the noise.

## Tasks

### 1. Wire sync script into build

Update `package.json`:

```json
{
  "scripts": {
    "sync": "bash bin/shell_cmd.sh",
    "docs:dev": "npm run sync && vitepress dev docs",
    "docs:build": "npm run sync && NODE_OPTIONS='--max-old-space-size=4096' vitepress build docs"
  }
}
```

(Keep heap bump from previous commit.)

### 2. Update sync script

Edit `bin/shell_cmd.sh`:

- Add `"amerce"` to `projects` array.
- BUT: `amerce` ships its own `releases.md` — exclude from the per-theme sync OR the sync will overwrite it. Add a per-theme excludes mechanism, OR remove `releases.md` from the synced files list entirely (each theme should have its own release notes anyway).

Recommendation: pull `releases.md` out of the shared sync. Themes that haven't authored their own release notes can keep an empty stub — but no theme should inherit CMS release notes.

### 3. Add sitemap

In `config.ts`:

```ts
sitemap: { hostname: 'https://docs.botble.com' }
```

VitePress 1.x ships sitemap support out of the box — generates
`dist/sitemap.xml` automatically. Helps SEO; ~zero cost.

### 4. Bump chunk size warning threshold

Add to `config.ts` `vite.build`:

```ts
vite: { build: { chunkSizeWarningLimit: 1500 } }
```

Default 500 KB is far too small for a 952-page docs site bundling all sidebars eagerly. 1500 KB silences the noise without masking real bloat.

## Files

| File | Change |
|---|---|
| `package.json` | add `sync` script, prepend to dev/build |
| `bin/shell_cmd.sh` | add `amerce`, remove `releases.md` from synced list |
| `docs/.vitepress/config.ts` | add `sitemap` + `vite.build.chunkSizeWarningLimit` |

## Validation

```bash
rm -rf docs/amerce/api.md docs/amerce/usage-newsletter.md   # simulate fresh checkout
npm run docs:build                                           # sync should regenerate them
ls docs/amerce/api.md                                        # must exist after build
ls docs/dist/sitemap.xml                                     # must exist
```

## Risks

- The sync script uses `rm -rf ./docs/$i/$j && cp ...` — running it before every build is fast (file ops only) but increases dev-server startup time slightly. Acceptable.
- Removing `releases.md` from the sync list means themes that previously inherited CMS release notes will lose them. Audit which themes have empty `releases.md` and decide: stub OR write actual per-theme notes.

## Done when

- `npm run docs:build` from a fresh checkout (no prior sync) succeeds.
- `docs/dist/sitemap.xml` is generated and contains all 952 pages.
- `amerce` no longer needs `/cms/...` workaround links — local synced files work.

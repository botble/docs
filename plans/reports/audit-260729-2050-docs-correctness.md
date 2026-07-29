# Docs Audit — 2026-07-29

Scope: all 1,435 `.md` files under `docs/`, plus 55 `sidebar.ts` files, `.vitepress/config.ts`, `bin/shell_cmd.sh`, `.gitignore`.
Method: full `npm run docs:build` (exit 0, no dead content links) + scripted checks for assets, sidebar targets, anchors, orphans; anchors verified against **built HTML ids**, not a re-implemented slugger.

## Summary

| Severity | Finding | Count |
|---|---|---|
| High | Sidebar nav links → 404 (no such page) | 74 links / 29 products |
| High | Sidebar links routed to wrong product | 9 links (velura) + 1 (lara-mag) |
| Medium | Broken in-page anchors (jump lands at top) | 54 links |
| Medium | Internal/placeholder pages published publicly | 7 |
| Low | Pages unreachable from any sidebar | 111 |
| Low | Stale `.gitignore` block, missing `.temp` ignore | 2 |

Clean: no missing local image/asset refs (0), no spelling errors from the common-typo list, no TODO/FIXME/Lorem-ipsum leftovers, shared-doc sync produces zero drift (committed mirrors match `docs/cms/` source), all sampled external hosts + Flickr-hosted screenshots return 200.

---

## 1. Sidebar links → 404 (High)

VitePress does **not** validate `sidebar.ts` links — the build passes while nav items 404. Verified against `.vitepress/dist/`: e.g. `dist/athena/releases.html` does not exist.

### 1a. `releases` — 24 products link to a page that was never created

`athena, auxero, carento, farmart, flex-home, gerow, hasa, homzen, infinia, isak, jobcy, jobzilla, lara-mag, martfury, miranda, nest, ninico, qore, shofy, shopwise, stories, transp, wowy, zelio`

Each has `{ text: 'Release Notes', link: '/<slug>/releases' }` with no `releases.md`. Only 21 products in the repo actually ship `releases.md` — and the two sets barely overlap.

Fix: either add `releases.md` per product or drop the sidebar entry.

### 1b. Products not in the sync array but whose sidebar expects synced docs

`bin/shell_cmd.sh` `projects=(...)` omits **auxero, jobzilla, restoria, snapcart**, so the shared CMS docs are never mirrored there — yet their sidebars link to them:

- `auxero` — 17 dead links (`upgrade`, all 4 `installation-*`, `ssl`, `license`, `usage-custom-css-js`, `plugin-translation`, `usage-multi-language`, `usage-analytics`, `usage-media-{s3,bunnycdn,wasabi}`, `usage-email`, `usage-newsletter`, `releases`)
- `jobzilla` — 18 dead links (same set plus `usage-social-login`, `cronjob`, `theme-rename`)
- `restoria` — 9 dead links (`usage-custom-css-js`, `plugin-translation`, `usage-analytics`, `usage-multi-language`, `usage-media-{s3,bunnycdn,wasabi}`, `usage-email`, `plugin-backup`)
- `snapcart` — 4 dead links (all `installation-*`)

Fix: add these slugs to the `projects` array in `bin/shell_cmd.sh` (and the ecommerce array for snapcart if it needs the ecommerce extras), or remove the entries.

### 1c. Filename typo — `docs/cms/sidebar.ts:127`

```
{ text: 'Autocomplete Field', link: '/cms/form-builder-autocomplete-field' }
```
Actual file: `docs/cms/form-builder-auto-complete-field.md`. The page is currently unreachable from nav. Fix the link (or rename the file — link is the better-reading slug).

---

## 2. Sidebar links routed to the wrong product (High)

### 2a. `docs/velura/sidebar.ts:38-46` — 9 entries point at `/cms/*`

```
{ text: 'Custom CSS/JS',   link: '/cms/usage-custom-css-js' }   ← should be /velura/...
{ text: 'Translation',     link: '/cms/plugin-translation' }
{ text: 'Google Analytics',link: '/cms/usage-analytics' }
{ text: 'Multi-language',  link: '/cms/usage-multi-language' }
{ text: 'Media - Setup Amazon S3',  link: '/cms/usage-media-s3' }
{ text: 'Media - Setup BunnyCDN',   link: '/cms/usage-media-bunnycdn' }
{ text: 'Media - Setup Wasabi',     link: '/cms/usage-media-wasabi' }
{ text: 'Setup email',     link: '/cms/usage-email' }
{ text: 'Backup',          link: '/cms/plugin-backup' }
```
These resolve (so the build is green) but throw the reader out of the Velura sidebar into the CMS one. Velura **is** in the sync array and already has all 9 files locally — they're just orphaned. Change the prefix to `/velura/`.

### 2b. `docs/lara-mag/sidebar.ts:46`

```
{ text: 'Rename theme', link: '/jobzilla/theme-rename' }
```
Wrong product **and** 404 — jobzilla has no `theme-rename.md`. `docs/lara-mag/theme-rename.md` exists. Change to `/lara-mag/theme-rename`.

---

## 3. Broken anchors — 54 (Medium)

Verified against `id="..."` attributes in built HTML.

### 3a. Largest cluster: 26 files → `#social-login-fails-invalidstateexception-or-missing-required-parameter-code`

Target heading `docs/cms/troubleshooting.md:189` contains an **em dash**, so VitePress emits:
```
id="social-login-fails-—-invalidstateexception-or-missing-required-parameter-code"
```
Every link omits the `-—-`. Affected: `cms/troubleshooting.md` (self-link), `cms/usage-social-login.md`, and the synced `usage-social-login.md` in amerce, athena, carento, farmart, flex-home, gerow, hasa, homzen, infinia, isak, jobcy, lara-mag, martfury, miranda, nest, ninico, orisa, qore, shofy, shopwise, stories, transp, travlla, velura, wowy, zelio.

Cleanest fix: drop the em dash from the heading (or add an explicit `{#social-login-invalid-state}`) in `docs/cms/` **and** update `docs/cms/usage-social-login.md`; sync propagates the rest.

### 3b. `docs/cms/commands.md` TOC — 5 of 11 entries broken

| TOC link | Reality |
|---|---|
| `#installation--setup` | actual id `installation-setup` |
| `#backup--restore` | actual id `backup-restore` |
| `#logging--monitoring` | actual id `logging-monitoring` |
| `#user-management` | **section does not exist** |
| `#asset-management` | **section does not exist** |

(VitePress collapses `&` to a single hyphen, not a double one.)

### 3c. `#available-shortcodes` — 5 files

`athena, carento, infinia, restoria, zelio` → `./usage-ui-block.md#available-shortcodes`. No such heading; the file's only shortcode id is `ui-block-shortcode`.

### 3d. sms-gateways — 6 links

- `drivers/esmsvn.md` ×2 → `../configuration.md#country-routes` — no country heading in `configuration.md`
- `usage/otp.md` ×4 → `../integration/{ecommerce,marketplace,real-estate}.md#otp` — actual id is `otp-in-ecommerce` (etc.)
- `usage/consent.md` → `../integration/ecommerce.md#consent` — actual id is `consent-opt-out`

### 3e. Remaining singles

```
amerce/usage-theme-options.md          -> ./usage-widgets.md#12-footer-primary-sidebar
shofy/usage-theme-options.md           -> ./usage-widgets.md#12-footer-primary-sidebar
cms/domain-migration.md            ×2  -> #2-create-a-full-backup
desk-hive/faq.md                       -> email-to-ticket.md#gmail-setup-app-password
ecommerce-mobile-app/08_deploying_app.md -> troubleshooting.md#cannot-read-properties-of-undefined-reading-projectid
ecommerce-mobile-app/complete-setup-and-publishing-guide.md -> 13_license_activation.md#license-required-alert-in-productionrelease-apk
license-manager/faq.md                 -> /license-manager/api#update-endpoints
real-estate-mobile-apps/faq.md         -> api-integration.md#inquiries-incl-guest-lookup
```

---

## 4. Internal notes published as public pages (Medium)

Every `.md` under `docs/` becomes a route. Currently live:

- `docs/job-board-mobile-apps/images/README.md` → `/job-board-mobile-apps/images/README.html` — internal screenshot spec ("Real screenshots should be captured from the running simulator", Envato submission notes)
- `docs/real-estate-mobile-apps/images/README.md` — same, plus reveals "the Carento template they derive from"
- `docs/athena/README.md` (`# athena-docs`), `docs/isak/README.md`, `docs/qore/README.md`, `docs/zelio/README.md` — one-line stubs
- `docs/ninico/README.md` — completely empty

Fix: delete, or add `srcExclude: ['**/README.md']` to `.vitepress/config.ts`.

---

## 5. Pages unreachable from any sidebar — 111 (Low)

Most are sync artifacts: `shell_cmd.sh` copies all 21 shared files into every theme, but individual sidebars list only a subset (e.g. `api.md` orphaned in 20 products, `plugin-backup.md` in 22). Harmless but they inflate the sitemap and are only reachable by URL/search.

Genuinely-authored content that is orphaned and worth wiring up:

```
cms/form-builder-auto-complete-field.md    (orphan caused by §1c typo)
cms/plugin.md, cms/plugin-structure.md     (likely superseded by cms/plugin-development/)
cloudify/api-reference.md
license-manager/migration-from-licensebox.md
product-gifts/usage-guide.md
wholesale/usage-guide.md
martfury-flutter/16_social_login_configuration.md
jobzilla/usage-backup.md
farmart/usage-ads.md, wowy/usage-ads.md
```

Full list reproducible via the audit script (see Appendix).

---

## 6. Repo hygiene (Low)

- **Stale `.gitignore` block** (lines ~89-97): an 8-line re-include block for `docs/licenza/*`. `docs/licenza/` does not exist. Remove.
- **`docs/.vitepress/.temp` not ignored** — `.gitignore` covers `cache` and `dist` but not `.temp`, so every build leaves an untracked directory. Add `docs/.vitepress/.temp`.

## 7. Observations, not defects

- **PHP version spread.** CMS core states `PHP >= 8.3`; several plugin docs state `PHP 8.2+` (`live-chat`, `sms-gateways`, `ecommerce-preorder`, `ecommerce-back-in-stock`, `landing-funnel`) and `kyc/faq.md:89` says "Tested on PHP 8.1, 8.2, and 8.3". Defensible if the plugins genuinely support older PHP standalone, but a customer running the CMS can't be on 8.1/8.2 — consider aligning.
- **106 screenshots hot-linked from `live.staticflickr.com`** across older theme docs (farmart, jobcy, nest, jobzilla, …). All sampled URLs return 200 today; single point of failure outside your control.
- **Hardcoded Cloudflare IPs** (`172.67.185.15`, `104.21.76.15`) in every synced `license.md` connectivity check. Cloudflare rotates these; the instructions will silently go stale.

---

## Suggested order

1. §1b — add 4 slugs to `bin/shell_cmd.sh` (fixes 48 dead links in one edit)
2. §1a — decide releases.md policy (24 products)
3. §2 — 10 one-line sidebar path fixes
4. §3a — one heading edit in `docs/cms/` (fixes 26 anchors via sync)
5. §3b/3c/3d — ~17 anchor fixes
6. §4 — delete 7 READMEs or add `srcExclude`
7. §6 — 2 `.gitignore` edits

## Appendix — scripts

`/private/tmp/claude-501/-Users-sangnguyen-workspace-docs/5d7ee578-3e0e-4882-9c85-2e7304af55bd/scratchpad/`
- `audit-assets.mjs` — asset refs
- `audit2.mjs` — sidebar targets, orphans, dirs without `sidebar.ts`
- `audit3.mjs` — near-empty files, missing H1
- `anchors-html.mjs` — anchors vs built HTML ids (**requires `npm run docs:build` first**)

Worth promoting `audit2.mjs` + `anchors-html.mjs` into `bin/` and running in CI — VitePress catches neither class of defect.

## Unresolved questions

1. `releases` — should the 24 products get a `releases.md`, or should the sidebar entry be dropped? (Some products may intentionally have no changelog.)
2. Are `auxero`, `jobzilla`, `restoria`, `snapcart` deliberately excluded from sync (standalone docs, like `digimart`), or an oversight? If deliberate they need their own copies + a `.gitignore` re-include block; if not, add them to `projects`.
3. `cms/plugin.md` + `cms/plugin-structure.md` — superseded by `cms/plugin-development/`, or should they be re-linked?
4. Want me to apply the fixes? §1b, §2, §3, §4 and §6 are mechanical; §1a needs your call first.

# Docs Audit — Fixes Applied — 2026-07-29

Follow-up to `audit-260729-2050-docs-correctness.md`. All mechanical defects fixed and verified.

## Verification

```
node bin/check-docs-links.mjs --anchors

Sidebar links pointing at a page that does not exist:      0   (was 74)
Sidebar links leaving their own product namespace:         0   (was 10)
Image/asset references with no file on disk:               0
Anchors with no matching id in the built HTML:             0   (was 54)
```

`npm run docs:build` exits 0.

---

## 1. Sidebar 404s — 74 fixed

### Sync array (`bin/shell_cmd.sh`) — added `auxero`, `jobzilla`, `restoria`

Fixes 44 dead links at once. Judgement calls behind this:

- **auxero, jobzilla** — held no shared docs at all, sidebars linked the full set. Straight add.
- **restoria** — held a **stale fork** of 7 CMS docs. Verified stale, not customized: `upgrade.md` 43 lines vs the
  canonical 103, `license.md` 151 vs 300, and `installation-requirements.md` was missing LiteSpeed support, the
  MariaDB floor, and the `output_buffering` admin-login-loop warning. Three of the seven were byte-identical to
  `docs/cms/`. Untracked (`git rm --cached`) so sync now regenerates them; restoria gained 9 missing docs *and* 4
  materially better ones.
- **snapcart — deliberately NOT synced.** Its doc set is genuinely condensed and product-branded (`api.md` 58 lines
  vs the CMS 519; `cronjob.md` lists abandoned-cart and flash-sale tasks). Syncing would have destroyed 14
  hand-written docs. Instead wrote the 4 missing `installation-*.md` in snapcart's own style and added a
  `.gitignore` re-include block, matching the existing `digimart` precedent.

### `releases` — 24 dead "Release Notes" entries removed

Only 21 products ship a `releases.md`, and the two sets barely overlapped. Entries removed rather than invented —
fabricating release history is not something to guess at. **If any of these products should have a changelog, it
now needs authoring; the nav no longer 404s either way.**

### Path typos

| File | Was | Now |
|---|---|---|
| `cms/sidebar.ts:127` | `/cms/form-builder-autocomplete-field` | `/cms/form-builder-auto-complete-field` |
| `lara-mag/sidebar.ts:46` | `/jobzilla/theme-rename` (wrong product + 404) | `/lara-mag/theme-rename` |
| `velura/sidebar.ts:38-46` | 9 × `/cms/*` | 9 × `/velura/*` |

---

## 2. Broken anchors — 54 fixed

**26 in one edit.** `cms/troubleshooting.md:189` has an em dash, so VitePress emitted
`social-login-fails-—-invalidstateexception-…` while 26 files linked without the `-—-`. Rather than rewrite 26 files
(25 of them sync mirrors), gave the heading an explicit `{#social-login-fails-invalidstateexception-or-missing-required-parameter-code}`
matching what everything already links to. Readable heading kept, zero churn.

**`cms/commands.md` TOC** — listed `User Management` and `Asset Management`, which are H3 subsections of
`Installation & Setup`, not categories, and omitted the real `Package Management`. Also `&` produces a single
hyphen, not a double. TOC now matches the document.

**Leading-digit headings** — VitePress prefixes these with `_`. Fixed `#2-create-a-full-backup` → `#_2-create-a-full-backup`
(`cms/domain-migration.md` ×2), `#12-footer-primary-sidebar` → `#_12-footer-primary-sidebar` (shofy + amerce),
`#gmail-setup-app-password` → `#_3-gmail-setup-app-password` (desk-hive).

**`#available-shortcodes`** — 5 themes (athena, carento, infinia, restoria, zelio) linked a heading their
`usage-ui-block.md` doesn't have; anchor dropped. Verified the other 9 products using the same link **do** have the
heading and were left alone.

**sms-gateways** — `#otp` → `#otp-in-ecommerce` / `#otp-in-marketplace` / `#customer-otp`; `#consent` →
`#consent-opt-out`.

**Others** — `license-manager/faq.md` `#update-endpoints` → `#check-for-updates`; `ecommerce-mobile-app`
`#cannot-read-properties…` → `#eas-init-cannot-read-properties…` and `#…productionrelease-apk` →
`#…production-release-apk`.

---

## 3. Content fixes found along the way

- **`real-estate-mobile-apps/api-integration.md:113`** — heading misspelled `### Inquirys`, which is also *why* the
  FAQ anchor was broken. Corrected to `Inquiries`, fixing spelling and link together. (Left `fetchInquirys()` alone
  — that's the real function name in the app.)
- **`sms-gateways/configuration.md`** — added the missing **Country Routes** section. Two driver pages
  (`esmsvn`, and prose in `bulksmsdhaka`/`sslwireless`) documented the feature and linked to a section that was
  never written; permissions for it exist in `usage/permissions.md`. This was a real documentation gap, not just a
  bad link.
- **`cms/installation-using-docker.md`** — `app_port=8080` → `APP_PORT=8080` (Sail reads the uppercase var, so the
  documented value silently did nothing). Also fixed "somethings ports" → "Sometimes ports" and sentence casing.
  Synced to 30 themes.

---

## 4. Cruft removed

7 `README.md` files that were building into public pages: 5 one-line/empty stubs (athena, isak, ninico, qore,
zelio) and 2 internal screenshot specs under `images/` — the job-board and real-estate ones carried Envato
submission notes and a line stating FlexHome derives from the Carento template.

Also removed `jobzilla/usage-backup.md` (a 7-line stub superseded by the now-synced 6.1K `plugin-backup.md`, which
was wired into the sidebar in its place).

---

## 5. Orphan pages wired into nav

| Page | Placed under |
|---|---|
| `cloudify/api-reference.md` (512 lines) | Usage → API Reference |
| `license-manager/migration-from-licensebox.md` (703 lines) | More → Migration from LicenseBox |
| `martfury-flutter/16_social_login_configuration.md` | Social Login → 19. Backend Configuration |
| `farmart/usage-ads.md`, `wowy/usage-ads.md` | Usage → Ads |
| `cms/form-builder-auto-complete-field.md` | reachable again via the §1 typo fix |

---

## 6. Repo hygiene

- `.gitignore` — removed the stale `docs/licenza/*` block (directory doesn't exist), added `docs/.vitepress/.temp`
  (every build was leaving it untracked), added the `docs/snapcart/*` re-include block.
- **`bin/check-docs-links.mjs`** — new checker for the four defect classes VitePress does not catch. Anchors are
  verified against real `id="..."` attributes in the built HTML rather than a re-implemented slugger, because
  hand-deriving VitePress slugs is exactly what produced false positives during this audit (em dashes, `&`,
  leading digits all behave unexpectedly). Exits non-zero, so it can gate CI.
- `package.json` — added `npm run check:links` and `npm run check:links:anchors`.

---

---

## 7. Second verification pass — additional defects found and fixed

Re-ran everything from a cleared cache and added four checks the first pass didn't cover.

### Fresh-clone reproducibility (new check)

For every `.md` on disk, confirmed it is either git-tracked **or** regenerated by sync. **0 ghost files** — nothing
would vanish on a fresh clone. Also found 1 file (`wowy/usage-newsletter.md`) tracked *and* overwritten by sync;
byte-identical to the CMS source, so untracked for consistency with every other mirror.

### Markdown structure (new check)

- **`cloudify/usage-api.md`** — `::: code-group` opened at line 89 and never closed; the container swallowed the
  rest of the page. Closed it.
- **`cloudify/usage-api.md`** — the Node.js sample had `X-API-KEY: '{token}'`, which is a **SyntaxError** if
  copy-pasted (hyphenated object keys must be quoted). Now `'X-API-KEY': '{token}'`.
- **`cms/form-builder-media-image-field.md`** — three `#` H1s; the latter two demoted to `##` so they appear in the
  page outline.
- **`cms/form-builder-advanced-fields.md`** — no H1 at all, unlike every sibling field doc. Added `# Advanced Fields`.

Code fences: all balanced across 1,486 files.

### External links (new check) — all 651 unique URLs probed

| Fix | Files |
|---|---|
| `github.com/botble/license-manager-examples/tree/**main**/…` → `tree/develop/…` — **default branch is `develop`; all 9 example folders exist and all 9 links were 404** | `license-manager/examples.md` |
| `botble.com/forum` → `forums.botble.com` (404 → 200; matches the convention already used in the mobile-app support docs) | 5 files |
| `docs.botble.com/cms/development/shortcodes` → internal `/cms/shortcode` | `orisa/usage-ui-block.md` |
| `docs.botble.com/plugin-development` → internal `/cms/plugin-development/` | `shofy`, `amerce` `usage-shippo.md` |
| `cms.botble.com/docs/cms/cronjob` → internal `/cms/cronjob` | `desk-hive/email-to-ticket.md` |
| `firebase.google.com/docs/cloud-messaging/migrate-v1` (retired) → `/docs/reference/fcm/rest` | 3 mobile-app doc sets |
| `react-native-google-signin.github.io/docs/` → `/docs/install` | 3 mobile-app doc sets |
| `build.envato.com/create-app/` → `build.envato.com/api/` | `desk-hive/social-login.md` |
| `twilio.com/en-us/legal/data-processing-agreement` → `data-protection-addendum` | `sms-gateways/usage/gdpr.md` |
| **e-wallet screenshots** — 4 hot-linked images were 404 on the server. Replaced with **local copies** sourced from the plugin repo (`workspace/e-wallet/platform/themes/demo/images/`), so they can no longer rot. 6 references now use `./images/`. | `e-wallet/index.md`, `configuration.md`, `usage/admin-dashboard.md` |
| **Plivo DPA** — Plivo retired the page (confirmed: their full 2,645-URL sitemap has no DPA). Repointed to `/legal/subprocessors/` **and relabelled "Plivo subprocessors"** — that page is a better fit for this section anyway, which is about documenting the sub-processor chain. Not labelled "DPA", because it isn't one. | `sms-gateways/usage/gdpr.md` |
| **Fast2SMS terms** — `dashboard/terms` (a logged-in path) → the public `fast2sms.com/terms-conditions`, found from their own privacy page's footer | `sms-gateways/usage/gdpr.md` |
| **Velura demo homepages** — each variant is its own **subdomain** (`velura-home-N.botble.com`), not a path on the main demo. All 8 `velura.botble.com/home-N` links were 404. Corrected and each preset labelled with its real name (Spa Minimal, Spa Video, Beauty & Glow, Nail Studio…). All 9 verified 200. | `velura/index.md` |

Converting the four Botble self-links to internal paths also brings them under the link checker, so they can't rot
again silently.

Remaining 404s are placeholders (`your-site.com`, `abc123.ngrok.io`, `THIS_IS_THE_FOLDER_ID`), API endpoints that
correctly reject GET (`api.gumroad.com`, `api.envato.com`, `googleapis.com/oauth2/v4/token`), and preconnect hosts
(`fonts.googleapis.com`) — all expected. The genuinely-broken remainder is listed below; each needs a decision or
access I don't have.

**Transient, not a defect:** `ecommerce-api.botble.com/docs` returned 404 during the scan and 200 on re-check, so
the site was simply down at that moment. All 11 references across `ecommerce-mobile-app/` and `martfury-flutter/`
resolve; no edit made. Worth noting that a link checker over live third-party hosts will always produce this class
of false positive — treat one-off 404s on your own infrastructure as "re-check" rather than "fix".

## Not done — needs your call

All broken external links are now resolved — nothing external is left outstanding.

1. **`releases.md` for the 24 products.** Dead nav entries are gone; no changelog content was invented. Say the
   word if any of these products should actually have one.
2. **Legacy duplicate usage guides.** `product-gifts/usage-guide.md` (176 lines) and `wholesale/usage-guide.md`
   (342 lines) are single-page versions fully superseded by their `usage/` folders — same topics, split up. Both
   are orphaned but still built and indexed, so search can serve users stale parallel instructions. Recommend
   deleting; held off because it's a content decision, not a defect.
3. **`cms/plugin-structure.md`** (2,042 lines) — orphaned, apparently superseded by `cms/plugin-development/`
   (which totals ~60K across 6 files). Too much content to retire unilaterally. `cms/plugin.md` is a deliberate
   redirect stub and correctly stays orphaned.
4. **PHP version spread.** CMS core requires `>= 8.3`; `live-chat`, `sms-gateways`, `ecommerce-preorder`,
   `ecommerce-back-in-stock` and `landing-funnel` state `8.2+`, and `kyc/faq.md:89` says "Tested on PHP 8.1, 8.2,
   and 8.3". Defensible if those plugins genuinely run standalone on older PHP — but a customer running the CMS
   can't be on 8.1/8.2, so the claim misleads in context.
5. **106 screenshots hot-linked from `live.staticflickr.com`** across older theme docs. All sampled URLs return
   200 today; it's a single point of failure outside your control. Worth migrating to local `images/`.
6. **Hardcoded Cloudflare IPs** (`172.67.185.15`, `104.21.76.15`) in every synced `license.md` connectivity check.
   Cloudflare rotates these; the instructions will go stale silently.

## Unresolved questions

- Were `auxero`, `jobzilla`, `restoria` excluded from the sync array deliberately, or by oversight? I treated it as
  oversight based on their sidebars expecting the synced files and restoria's copies being demonstrably stale — but
  if any of them intentionally ships its own docs, that product should follow the snapcart/digimart pattern instead.
- `snapcart`'s condensed docs were preserved but not fact-checked against the shipping product. Worth a pass.

# Docs vs code audit — summary (2026-11-04)

Scope: all 56 products in `docs/`, checked against local code in `~/workspace/<repo>` (HEAD per group report). 9 parallel auditors, each owning distinct files. Group reports: `audit-261104-0542-{cms-a,cms-b,amerce,ecommerce-themes,other-themes,saas-license,plugins-a,plugins-b,mobile-apps}.md`.

## Result

- ~640 code-verified mismatches fixed; 424 files modified, 57 deleted, 1 page added. Not committed.
- `npm run docs:build`: pass, 0 problems across 1600 pages / 56 sidebars (links, assets, anchors). `git diff --check` clean.

| Group | Fixed (approx) |
|---|---|
| cms-a / cms-b | 30 / 25 |
| amerce | ~120 |
| ecommerce-themes (shofy, farmart, orisa, …) | ~110 (incl. ~60 labels/paths) |
| other-themes (21 themes) | ~110 |
| saas-license | ~35 |
| plugins-a / plugins-b | 34 / ~60 |
| mobile-apps | 51 pages |

Common drift patterns: wrong admin paths (`X → Settings` vs `Settings → X`), renamed setting labels, invented features/settings/menus, non-existent classes/hooks/filters in developer guides, wrong API endpoints/params, stale release pages.

## Lead decisions applied (user-approved)

- PHP min `8.3.36` → `8.3.0` everywhere (matches `core.json` minimumPhpVersion; composer `^8.3|^8.4|^8.5`). Several pages now say 8.4 and 8.5 supported.
- norio + snapcart added to `bin/shell_cmd.sh` sync (snapcart also to ecommerce extras); their 43 mirrored copies untracked, `.gitignore` exceptions removed. Norio-specific language switcher/RTL content moved to new `docs/norio/usage-language-switcher.md` (sidebar + theme-options link updated).
- BCMath removed from `docs/cms/index.md` requirements.
- Old `docs/sms-gateway/` (FOB Twilio/Nexmo plugin) deleted + nav label removed. CodeCanyon item 62986003 = `sms-gateways` 1.0.36.

## Lead fixes during build

- Build crashed on inline code `` `{{ route(...) }}` `` (Vue interpolates inline code). Converted 63 inline `{{ … }}` spans in 17 source files to `<code v-pre>…</code>`. Simple vars like `{{ site_title }}` were likely rendering empty before; verified now present in built HTML.

## Code bugs found (not docs — need dev fix)

- license-manager: `is_valid` inverted on internal create/update API (`ProductLicenseRequest.php:17`) — `true` creates blocked license.
- ecommerce RN app: registers Expo push token but backend sends FCM v1 only → pushes likely never arrive (carento fixed same in 1.1.0).
- martfury-flutter: Android launch screen has no color/logo on supported devices.
- amerce/stripe: webhook duplicate-payment check never triggers (`StripeController.php:145,257`).
- landing-funnel: retention=0 keeps 90 days instead of disabling purge.
- orisa: theme.json version behind core.json; seeder fills unregistered `header_sidebar`.
- back-in-stock plugin.json uses `requires` (others `require`); kyc schedule order contradicts comment.
- cms: `cms:push-notification:process-scheduled` not scheduled (docs now say add cron, or schedule in code).
- Code versions lag releases: ecommerce RN `app.config.js` 1.0.0 (released 1.0.5); martfury `pubspec.yaml` 1.0.0+2 (released 1.2.7).

## Release-notes backlog (no notes invented)

loyalty-points 1.0.0→1.0.20, pos-pro 1.0.1→1.2.21, product-gifts 1.0.0→1.0.7, wholesale 1.0.0→1.0.17, bb-form-builder 1.1.0→1.2.15, e-wallet 1.0.0→1.1.4, license-manager 1.1.3→1.1.10, snapcart →1.0.9, velura →1.0.4, restoria →1.1.12, travlla →1.0.3, orisa →1.0.5; landing-funnel has no releases page. Entries added from git/changelogs (verify dates = commit dates): affiliate-pro 1.2.12–13, back-in-stock 1.0.3, preorder 1.0.4, kyc 1.0.1–1.0.3, ecommerce-saas 1.0.2, carento 1.1.1–1.1.2, job-board 1.0.1, real-estate 1.0.1, ecommerce RN 1.0.5.

## Needs human review

- Deep rewrites: shofy digital-products / tax / invoices; amerce theme options/widgets/developer guides; sms-gateways `developer/custom-driver.md` still describes non-existent trait/route/filter (needs owner rewrite).
- sms-gateways 1.0.36 entry mentions "Botble Ecommerce SaaS" — OK to publish?
- Outdated screenshots (amerce and others) — images not edited.

## Missing docs (largest gaps)

- CMS plugins/settings: Cookie Consent, RSS Feed, Audit Log, Request Log, Simple Slider, Testimonial, Note, Data Synchronize, Email rules, Phone Number, Cleanup System.
- Theme plugins: job-board, hotel, logistics, car-manager, real-estate usage; marketplace pages for hasa/shopwise/wowy; marketplace subscriptions + vendor payouts; pending-order auto-cancel.
- e-wallet customer transfers/gift cards; license-manager Lemon Squeezy/Envato companion plugins.
- Expo apps (carento, job-board, real-estate): EAS env vars for cloud builds (`.env` gitignored).

## Unresolved questions

1. kyc changelog "[1.1.0] pending" renamed to "[1.0.1] — 2026-05-02" — correct?
2. velura docs promise Home 1–9 installer presets, theme.json has none; restoria FAQ claims SMS/waitlist/ordering/deposits; athena claims 10 homepages (3 seeded) — fix code or docs?
3. amerce release date: index May 15 vs releases 1.0.0 May 19, 2026.
4. license-manager FAQ CMS 7.5.0+ vs plugin.json 7.3.0; LicenseBox guide depends on plugin only in license-server repo.
5. ecommerce-saas composer.json 1.0.1 vs core.json 1.0.2; cloudify/ecommerce-saas PHP `^8.3|^8.4` (no 8.5).
6. usage-page-cache "since 7.6.13" while core.json 7.6.12 — OK if next release is 7.6.13.
7. Redirect `/sms-gateway/*` → `/sms-gateways/`?
8. Bump ecommerce RN / martfury code versions?

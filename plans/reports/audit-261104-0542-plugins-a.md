# Audit plugins-a — docs vs code (2026-11-04)

## Scope + HEADs
| product | repo | HEAD | plugin.json ver | min core |
|---|---|---|---|---|
| affiliate-pro | ~/workspace/affiliate-pro | f08c0ed5 2026-11-03 | 1.2.13 | 7.5.0 (docs ok) |
| bb-form-builder | ~/workspace/bb-form-builder | 7e735cbf 2026-10-28 | 1.2.15 | 7.5.0 (ok) |
| bb-popup | ~/workspace/bb-popup | 72b34438 2026-10-28 | 1.0.0 | 7.5.0 (ok) |
| bb-store-locator | ~/workspace/bb-store-locator | db1da60 2026-10-28 | 1.0.0 | 7.4.0 (ok) |
| e-wallet | ~/workspace/e-wallet | 2c47e5fb 2026-10-28 | 1.1.4 | 7.5.0 (ok) |
| ecommerce-back-in-stock | ~/workspace/back-in-stock | 501357f9 2026-10-28 | 1.0.3 | 7.5.0 (ok) |
| ecommerce-preorder | ~/workspace/ecommerce-preorder | d1d5bc35 2026-10-28 | 1.0.4 | 7.6.0 (ok) |
| kyc | ~/workspace/kyc | e5e6611e 2026-10-28 | 1.0.3 | 7.3.0 (ok) |
| landing-funnel | ~/workspace/landing-funnel | 08167c07 2026-10-28 | 1.1.3 | 7.5.0 (ok) |

PHP: no plugin declares its own PHP min; docs now 8.3.0 (lead change), no 8.3.36 reintroduced.

## affiliate-pro (settings, perms, menu, schedule, routes all match)
| page | claim | code evidence | action |
|---|---|---|---|
| releases.md | latest = 1.2.11 | plugin.json 1.2.13; release commits 146c11dc (1.2.12, 10-08), f08c0ed5 (1.2.13, 11-03) | fixed: added 1.2.12 + 1.2.13 entries from git log |
| releases.md | 1.2.11 entry contains changes committed after 1.2.11 release commit (10-07 fixes) | 9262a9fd, 05620e42, 4bf59344... dated after 941801ab | needs decision (left as is, no history rewrite) |

## bb-form-builder
| page | claim | code evidence | action |
|---|---|---|---|
| faq.md | "no conditional logic" | lang/en/form.php:537 `step_condition` (show step if checked/equals...) | fixed |
| multi-step-forms.md | no step conditions / hide indicator / saved progress | form.php:72 hide_step_indicator, :533 progress_restored; js/form-public.js localStorage | fixed (added sections) |
| creating-forms.md | missing form title/description, submit label, custom CSS, export/import JSON, per-form translation | form.php:60-65,174-179,480-490,500; routes/web.php:44,48 | fixed (short additions) |
| releases.md | latest 1.1.0 | plugin.json 1.2.15 (popup mode 1.2.6, conditions 1.2.12, etc.) | needs decision |
| configuration.md | settings labels/defaults, perms | FormBuilderSettingForm.php, config/permissions.php | ok (perm `bb-form-builder.license` undocumented, minor) |

## bb-popup
All checked claims match (settings labels/defaults, presets, triggers, frequency, 11 rule types, `bb-popup:prune-stats` daily 02:30, `[bb-popup code]`, embed). No edits.

## bb-store-locator
| page | claim | code evidence | action |
|---|---|---|---|
| configuration.md | ~27 setting labels (Tile provider, Enable clustering, Marker style, Template, Geolocation mode, Slug prefix, Enable API...) | lang/en/settings.php (Map tiles, Group nearby markers, Marker shape, Layout, Visitor location, URL prefix, Enable the REST API...) | fixed: all labels renamed to UI labels |
| configuration.md | `Hide these fields on the storefront` missing | StoreLocatorSettingForm.php:237 | fixed (added row) |
| faq, troubleshooting, backend-configuration-errors, usage/geocoding, map-providers, managing-stores, rest-api | old labels | same | fixed |
| routes/API/commands/shortcode | `/api/v1/store-locator/*`, throttle 60, `cms:store-locator:geocode`, `[store-locator]` | routes/api.php, GeocodeStoresCommand.php | ok |

## e-wallet
| page | claim | code evidence | action |
|---|---|---|---|
| configuration/installation/troubleshooting | settings at **Settings > E-Wallet** | no PanelSection; menu E-Wallet → Settings (EWalletServiceProvider.php:177-183) | fixed → **E-Wallet > Settings** |
| configuration.md, faq.md, index.md, usage/checkout.md | "ALL refunds go to wallet, mandatory, cannot be changed" | WalletSettingForm.php:93-99 Refund Destination: wallet / original payment method | fixed |
| configuration.md | no Wallet Transfer, Gift Cards, Webhook, Top-up Code Prefix settings | lang transfer.php:70-92, gift-card.php:155-178, e-wallet.php:337-363, :290 | fixed (added sections) |
| configuration.md, installation.md | permission list missing wallets.create, transfers.*, gift-cards.* | config/permissions.php | fixed |
| installation.md | submenu list missing Withdrawals/Transfers/Gift Cards | provider menu | fixed |
| releases.md | latest 1.0.0 | plugin.json 1.1.4 (transfers 1.1.0, gift cards, unified discount field...) | needs decision |
| usage/customer-guide.md | no transfer / gift-card redeem / purchase / my cards | routes/customer.php:38-51 | missing-doc |

## ecommerce-back-in-stock
| page | claim | code evidence | action |
|---|---|---|---|
| configuration.md | missing Auto-notify, Eligible Stock Statuses (backorder), Modal Style, Button Icon/Style/Color/Radius, Notify Admin, Admin Emails | BackInStockSettingForm.php:51-160, lang settings | fixed |
| configuration.md | "Collect Phone Number", "Inline Form"/"Modal" labels | lang: Show Phone Number Field, Inline (form embedded on page), Modal (button opens popup) | fixed |
| configuration/faq/troubleshooting/usage | template `back_in_stock_notification` at Admin > Email Templates, var `{{ customer_name }}` | config/email.php: `customer-notification` + `admin-summary`; vars product_name/url/image/price, unsubscribe_url, site_title (no customer_name) | fixed |
| faq.md | "only one email" | admin-summary template | fixed (clarified) |
| faq.md | variation: triggers on parent stock change | 3f21f88f: variation restock notifies parent subscribers | fixed |
| usage/customer-guide.md | form only when out of stock | stock_statuses incl. on_backorder | fixed |
| releases.md | latest 1.0.0 | 1.0.3 | fixed: added 1.0.3 entry (1.0.1-1.0.3 changes) |

## ecommerce-preorder
| page | claim | code evidence | action |
|---|---|---|---|
| configuration.md | no COD setting | PreorderSettingForm.php:52-58 `preorder_disable_cod` | fixed |
| releases.md | latest 1.0.0 | 1.0.4 (089dc2fc) | fixed: added 1.0.4 entry; 1.0.1-1.0.3 content unclear → needs decision |
| menu name | "Preorder > Settings" | lang name "Pre-Order" | cosmetic, not changed |

## kyc
| page | claim | code evidence | action |
|---|---|---|---|
| developer/events.md | events carry `$reviewer`, `$note`, `$unverified`; "four events"; Unverify fires KycRejected | Events/*.php only `$submission`; Events/KycUnverified.php (e9f06eef) | fixed |
| developer/events.md | `DispatchKycApprovedWebhookListener` | Listeners/DispatchKycWebhookListener.php | fixed |
| usage/approve-reject.md | Unverify flips to rejected, increments counter, dispatches KycRejected | KycSubmissionController.php:203-231 deletes approved rows+files, fires KycUnverified, audit log | fixed |
| developer/extending.md | `KycReviewService::reject()` example | class does not exist | fixed (example rewritten) |
| usage/commands.md, retention.md | cleanup 02:00, expire 02:15 | KycServiceProvider.php:127-136 cleanup `->daily()` (00:00), expire 02:00 | fixed |
| usage/settings.md | `kyc_use_multi_step_form` toggle; ~25 settings missing | KycSettingForm.php `kyc_form_layout` single/multi_step/two_column; validity days, grace, real-estate/job-board, fields, banner, business categories, secondary email | fixed (added) |
| developer/routes.md | middleware `KycRequiredMiddleware`; file route `signed`; no manual-verify; no account-guard routes | EnsureKycRequired; signature checked in KycFileController:65; routes/web.php:81; routes/customer.php:82-108 | fixed |
| architecture.md, gates.md | KycRequiredMiddleware, "51 tests", `kyc_webhooks` | EnsureKycRequired; 147 test methods; table `bb_kyc_webhooks` | fixed |
| installation.md | "creates two tables" (lists 3), `kyc_webhooks` | 3 migrations | fixed |
| changelog.md | "[1.1.0] — pending"; no 1.0.1-1.0.3 | plugin.json 1.0.3; plugin CHANGELOG.md 1.0.1/1.0.2; e9f06eef | fixed: added 1.0.3/1.0.2, renamed pending block to 1.0.1 — 2026-05-02 (matches plugin CHANGELOG: real-estate/job-board support shipped in 1.0.1). Review. |

## landing-funnel
| page | claim | code evidence | action |
|---|---|---|---|
| configuration.md, tracking-and-webhooks.md, faq.md | retention default 90, "0 disables auto-purge", auto-purged | SettingHelper.php:49-53 default 0; PurgeVisitsCommand.php:23 empty/0 → 90; command not scheduled by plugin | fixed |
| configuration.md | no "Show sold count on funnel product pages" | LandingFunnelSettingForm.php:90 | fixed |
| usage/index.md | sidebar lacks Leads; no vendor dashboard | provider menu (Leads), routes/vendor.php | fixed |
| (none) | no releases page | plugin 1.1.3 | missing-doc |

## Undocumented features
- bb-form-builder: per-form translation detail, popup mode history; `bb-form-builder.license` perm.
- e-wallet: customer pages for wallet transfer, gift card redeem/purchase/my cards (`/customer/...` routes); admin gift card bulk create/export UI; transfer admin list.
- landing-funnel: digital-product funnels documented partly; leads/visits/orders CSV export (`export/visits|orders|leads`); per-funnel insights; vendor funnels; no releases page.
- kyc: business categories, banner customisation, field toggles only listed in settings table (no usage page); job-board candidate scope.
- affiliate-pro: none found.

## Needs decision
1. Releases pages lagging: bb-form-builder (1.1.0 vs 1.2.15), e-wallet (1.0.0 vs 1.1.4), preorder 1.0.1-1.0.3 content, landing-funnel (no page). Generate via bb:changelog?
2. affiliate-pro 1.2.11 entry lumps post-1.2.11 commits; split into 1.2.12? (I added 1.2.12 with only items not already listed.)
3. kyc changelog: I renamed "[1.1.0] — pending" → "[1.0.1] — 2026-05-02". Confirm.
4. back-in-stock plugin.json uses `"requires"` key while others use `"require"` — code issue, may skip dependency check.
5. kyc code comment says expire runs before cleanup, but cleanup is `daily()` (00:00) and expire 02:00 → code bug? Docs now follow code.
6. landing-funnel: setting helper says 0 = no purge but command uses 90 — code/UX mismatch; helper text in lang may promise otherwise.

## Unresolved questions
- Release dates used = release commit dates; marketplace publish dates may differ.
- e-wallet customer-guide additions (transfers/gift cards) need screenshots — not written.

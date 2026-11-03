# Audit: amerce docs vs code (261104)

## Scope
- Docs: `docs/amerce/*.md` (owned pages, synced basenames skipped incl. api.md)
- Code: `~/workspace/amerce` HEAD `e2a7a8f3` 2026-11-03. theme.json 1.0.10, core.json 1.0.10 / minimumPhpVersion 8.3.0, composer `php ^8.3|^8.4|^8.5`
- releases.md latest = 1.0.10 (matches theme.json). Post-1.0.10 commits exist (unreleased) - not added to releases.
- Split: theme/usage pages (lead-auditor), developer-* + API/webhooks (sub-agent A), ecommerce/marketplace usage (sub-agent B)

## Theme / usage pages

| page | claim in docs | code evidence | action |
|---|---|---|---|
| usage-theme-options | 6 subsections | functions/theme-options.php: 7 (+ Store & Contact `opt-text-subsection-store-contact` :389) | fixed, added Store & Contact table |
| usage-theme-options | 4 footer styles | theme-options.php:163-173 (style-1..9), partials/footer/styles/ has 9 | fixed |
| usage-theme-options | Payment icons = comma-separated text paths | theme-options.php:192 `mediaImages` | fixed |
| usage-theme-options | Card hover effect `hover-01` (6 effects) | no such option anywhere in theme | fixed (row removed) |
| usage-theme-options | Show preloader default true | theme-options.php:437 default false, layouts/base.blade.php:137 | fixed |
| usage-theme-options | Colors emitted by `Theme::renderCssVariables()`, heading var `--heading` | layouts/base.blade.php:87-97 inline `:root`, heading -> `--text` | fixed |
| usage-theme-options | Footer menus at locations footer-1/2/3 | only `main-menu` location (database/seeders/Themes/Main/MenuSeeder.php:255); footer columns via Footer Menu widget in footer_company/customer sidebars | fixed |
| usage-theme-options | "Font Picker" separate tab | packages/theme/src/Typography/Typography.php:319 section "Typography" | fixed |
| usage-theme-options | missing header fields | theme-options.php:113,124,128,130,132 (hide on scroll, override colors, Header 13 slides, account label, popular keywords) | fixed (rows added) |
| usage-theme-options | missing ecommerce fields | theme-options.php:284,371,373,375,377 (sticky shop toolbar, size guide URL, Ask A Question, live viewers, sold window) | fixed (rows added) |
| usage-theme-options | missing footer hero text (style-5) | theme-options.php:204 | fixed |
| usage-breadcrumb | Theme options → Breadcrumb background image; per-page breadcrumb image | no such keys anywhere; only `theme_breadcrumb_enabled` (packages/theme/src/Providers/HookServiceProvider.php:256-266) | fixed (rewritten; 2 image refs removed) |
| usage-homepage | Template `Full width`, field "Breadcrumb style: None" | functions.php:342 templates; no breadcrumb style field; seeder uses `homepage` (PageSeeder.php:34) | fixed |
| usage-homepage | preset SQL list omits fashion | database/sample/database-home-fashion.sql exists | fixed (noted) |
| usage-widgets | 13 areas incl. "Footer Primary Sidebar"; widgets Custom Menu / Site Contact / Site Accepted Payments / Product Detail Info | functions.php:37-52 = 16 sidebars (no footer primary); widgets/ dir: Footer Menu, Payment Methods, Product Delivery & Return, Sidebar Bullets... | fixed (sections 12-15 rewritten, count 16); anchor link in theme-options updated |
| usage-ads | Ads block has 4 styles | plugins/ads/src/Providers/AdsServiceProvider.php:103-117 only `key` field, no theme override | fixed |
| usage-ads | Ads Settings = "enter Adsense code" | ads.php lang settings: mode Disabled/Auto/Unit, client id, ads.txt | fixed |
| usage-coming-soon-page | "no Without layout template" | functions.php:347 `without-layout` (added 1.0.10) | fixed |
| usage-ui-block | custom shortcode views in `views/shortcodes/`, `view('theme.amerce::...')` | theme uses `partials/shortcodes/<name>/` + `Theme::partial()` (shortcodes.php:56) | fixed |
| shortcodes-marketing | newsletter-cta styles default/banner only | shortcodes.php setAdminConfig newsletter-cta: `style-split` + `target_date` | fixed |
| shortcodes-* | 46 shortcodes, style lists | script diff of all register/setAdminConfig blocks + partials/shortcodes/*/styles | OK (only newsletter-cta differed) |
| usage-google-tag-manager | Settings → Ecommerce → Tracking: "Enable Google Tag Manager" + paste snippet | panel item routes to settings.website-tracking (SettingEcommercePanelSection.php:122-127); packages/theme/src/Forms/Settings/WebsiteTrackingSettingForm.php: type gtm/id/custom, GTM Container ID, GA ID; ecommerce adds "Enable Google Tag Manager Tracking Events", Google Ads Conversion ID | fixed; GTM debug mode line added |
| usage-facebook-pixel | currency at Admin → Ecommerce → Currencies | SettingEcommercePanelSection.php:24-29 | fixed |
| usage-catalog-mode / abandoned-carts / flash-sales / reviews / wishlist-compare | `Ecommerce -> Settings -> X` | no such menu; settings panel = Settings → Ecommerce → X (SettingEcommercePanelSection.php) | fixed (all my pages; sub-agents fixed theirs) |
| usage-flash-sales | toggle "Enable flash sales" | setting.php:557 "Enable flash sale functionality", + "Display inventory tracker" | fixed |
| usage-reviews | old labels (Enable review, Hide rating when no reviews...), missing "Require review comment" | setting.php:165-186, ProductReviewSettingForm.php | fixed |
| usage-abandoned-carts | labels Send email reminders / Maximum reminder emails / Cleanup old carts after | setting.php:585-602 | fixed |
| usage-abandoned-carts | cms:check-abandoned-carts / cms:cleanup-expired-carts options | src/Commands/*.php signatures | OK |
| usage-wishlist-compare | lifetime "default: varies"; `Ecommerce -> Attributes` | EcommerceHelper.php:2041 default 7; menu "Product attributes" | fixed; added Enable wishlist/compare rows |
| usage-product-options | types incl. Textarea, File Upload; file upload section/examples | src/Enums/GlobalOptionEnum.php: Field, Dropdown, Checkbox, RadioButton only | fixed (removed textarea/file sections) |
| usage-product-options | `Ecommerce -> Product Options -> Global Options` | single menu item `cms-plugins-ecommerce-global-options` "Product options" | fixed |
| usage-product-specifications | menu "Specifications"; import/export under Ecommerce → Products; columns product_id/{attribute_name} | menu "Product Specification" → Groups/Attributes/Tables; Tools → Export/Import Data panel (EcommerceServiceProvider.php:1180-1209); columns name/specification_table/specifications(`Name:Value|`)/specifications_{locale} (ProductSpecificationImporter.php:83-103) | fixed |
| usage-product-variations | `Ecommerce -> Attributes` | "Product attributes" | fixed |
| usage-shipping-by-location | location toggle in Settings → Ecommerce → General; fees at Ecommerce → Shipping | CheckoutSettingForm.php:162; shipping rules on ecommerce.settings.shipping (views/settings/shipping.blade.php) | fixed |
| usage-location | label with trailing "?" | setting.php:244 | fixed |
| usage-currencies | "Auto-detect visitor currency" | setting.php:38 "Enable auto-detect visitor currency" | fixed |
| usage-reset-test-data | `ec_product_translations` | migration creates `ec_products_translations` | fixed; Tools label "Export/Import Data" |
| usage-discounts-coupons | types/targets, code max 20, 12-char generator | DiscountTypeOptionEnum, DiscountTargetEnum, DiscountRequest.php:30, DiscountController.php:292 | OK |
| usage-cart-persistence / add-to-cart-url | listeners, middleware, `/cart/add/{product}`, qty | src/Listeners, RestoreCustomerCartMiddleware, routes/cart.php:16 | OK |
| index | payment gateways list, Bootstrap 5 | plugins dir, config.php:29-32 | OK |
| usage-menu | Main Navigation only location | MenuSeeder.php:140/255 | OK |
| shortcodes-simple-slider | SIMPLE_SLIDER_VIEW_TEMPLATE prio 120, modifyAdminConfig, ignoreCaches | shortcodes-simple-slider.php:29-116 | OK |

## Developer + API pages (sub-agent A)

| page | claim | code evidence | action |
|---|---|---|---|
| developer-payment-gateway | `PaymentHelper::handleAfterPaymentSuccess/Error()` | not in code; Stripe uses BaseHttpResponse + `PaymentHelper::getRedirectURL()/getCancelURL()` (stripe StripeController.php:478-548) | fixed |
| developer-payment-gateway | "Settings → Payment → Payment methods" | Payments → Payment methods (PaymentServiceProvider.php:55-91) | fixed |
| developer-payment-gateway | hand-written methods.blade.php | all gateways use `<x-plugins-payment::payment-method>` (adds fee line + payment_fee input) | fixed |
| developer-payment-gateway | `$payment->status === PaymentStatusEnum::COMPLETED` | status enum-cast (Payment.php:64-67), `===` always false | fixed (`==`) |
| developer-payment-gateway | charge_id string(60), metadata json, 4 statuses | migrations: string 255, mediumText; PaymentStatusEnum 7 cases | fixed |
| developer-shipping-provider | ShippingStatusEnum RETURNING/RETURNED/EXCEPTION | not in ShippingStatusEnum.php:27-53 | fixed |
| developer-shipping-provider | `$newStatus->label()` etc. | `getLabel()` / `getValue()` | fixed |
| developer-shipping-provider | `handle_shipping_fee` 2 args | 3 args (HandleShippingFeeService.php:57) | fixed |
| developer-product-detail-hooks | `ecommerce_product_detail_after_cart_actions`, `_after_meta`, `ecommerce_before_product_description` | not in amerce views | fixed (removed) |
| developer-product-detail-hooks | custom tab markup | `li.nav-tab-item > button.tf-btn-tab` (product-description-tabs.blade.php:46-55) | fixed |
| developer-theme-customization | layouts base/fullscreen; templates homepage-v2/contact/coming-soon; 4 footers; SCSS tree; `_variables.scss`; `data-bb-toggle="quick-view"`; `Theme::set('bodyClass')`; Font Picker; menu locations mobile-menu/footer-1..3; sidebars primary_sidebar; cache-buster bump | functions.php:342, layouts/, partials/footer/styles (9), assets/sass, config.php:25, Typography.php:319, functions.php:37-52 | fixed (all) |
| usage-ecommerce-api | per_page default 10, `order`, `keyword`; search params; tracking by ID+email | GetProductService.php:26-52 (theme option/12, `sort_by`, `q`); ProductController.php:79-96; OrderTrackingRequest (`code` req, email opt) | fixed |
| usage-webhooks | menu "Webhook"; `not_shipped`; recovery_url `/cart/recover?token=`; payload scope | setting.php:441 "Webhooks"; Order.php:649-700; SendWebhookWhenCartAbandoned.php → `/cart?token=` | fixed |

## Ecommerce / marketplace usage pages (sub-agent B)

Global: all `Ecommerce -> Settings -> X` / `Marketplace -> Settings` → `Settings -> Ecommerce -> <label>`; Tools label → "Export/Import Data".

| page | claim | code evidence | action |
|---|---|---|---|
| usage-tax | "Display product price including taxes" semantics; Tax Classes / Tax Rules menus; tax-class dropdowns on product/customer; Reports → Tax page | setting.php:362-378; routes/tax.php:10-13; no tax_class UI (exemption only via `ecommerce_tax_exemption_check`, DefaultTaxCalculator.php:17); only Tax Collection widget | fixed |
| usage-invoices / invoice-template | "Generate invoice automatically", code suffix, Default/Compact/Detailed templates, variables, statuses, invoice webhook, invoice_url email vars | GenerateInvoiceListener always (EventServiceProvider.php:111,117); InvoiceSettingForm.php:34-121; InvoiceHelper.php:445-475,539; config/email.php:279 | fixed |
| usage-shipping-methods | vendors create shipping rules; location/zipcode in General; Ecommerce → Shipping/Store Locators menus | no ShippingRule in marketplace; CheckoutSettingForm; settings panel items | fixed |
| usage-shippo | settings path; `validateAddress()`; vendors can't manage rates | SHIPPING_METHODS_SETTINGS_PAGE; Shippo.php:140 `validate()`; shippo routes/web.php:54 vendor routes | fixed |
| usage-payment-gateways | Settings → Payment → Payment methods; Stripe webhook `/stripe/webhook`; no default/reorder | PaymentServiceProvider.php:83; `/payment/stripe/webhook`; Set as default + drag sort exist | fixed |
| usage-order-management | Settings → Orders page | none; options spread across Standard & Format/Checkout/Shopping/Invoices/Pending Orders | fixed |
| usage-order-returns | "Return Settings", returnable statuses, default off, 5 emails | ReturnSettingForm (default on, partial return, days, images); 2 emails | fixed |
| usage-marketplace-* | single-vendor checkout clears cart; no fixed commission; Marketplace → Revenues; withdrawal labels/tab | CartValidateSameStore.php throws; "Fixed commission fee (per order)"; SubscriptionPlan.php:62; store view page | fixed |
| usage-digital-products | per-product max downloads/expiry; Ecommerce → License Codes menu; CSV cols product_sku/status | ProductFile url+extras only; routes/product.php:134; cols product_id, license_code | fixed |
| usage-customer-management | Deletion Requests admin tab; `customers.view` permission | no admin UI; statuses waiting_for_confirmation/confirmed/canceled; not in permissions.php | fixed |
| usage-product-import-export | category import assigns products; status `publish`; Skip existing / Generate SKU options; export filters | ProductCategoryImporter; BaseStatusEnum `published`; StockStatusEnum `on_backorder`; real options Import type / Update existing | fixed |

## Undocumented features
- Theme (post-1.0.10, unreleased): pick layout/style from preview cards, cookie-consent Card/Popup color options, menu HTML cache, theme option conditional fields. Not in releases.md (not released yet).
- No amerce pages for bundled plugins: cookie-consent, sale-popup, announcement, fob-product-size-guide (size guide), captcha, faq, gallery, testimonial, audit-log/request-log (may be covered by /cms docs).
- Marketplace subscriptions (Commission / Subscription / hybrid modes, plans, vendor subscriptions, subscription invoices) - no page.
- Stripe Connect + PayPal Payout vendor payout plugins - no page.
- Pending Orders auto-cancel (`CancelPendingOrdersCommand`), Shipping Label Template, `SeedEuVatRatesCommand`, order cancellation reasons.
- Payment hooks missing from dev guide: PAYMENT_FILTER_GET_REFUND_DETAIL / REDIRECT_URL / CANCEL_URL / PAYMENT_PARAMETERS / AFTER_PAYMENT_METHOD / PAYMENT_FORM, PAYMENT_METHOD_SETTINGS_CONTENT, `payment_method_display_body`, `payment_order_total_amount`, ACTION_AFTER_UPDATE_PAYMENT, `PaymentMethods::excludeMethod()/includeMethod()`.
- API product list params (collections[], tags, labels, discounted_only, price_ranges, attributes, rating, thumbnail_size); per-event webhook payload filters `ecommerce_*_webhook_data`.
- Marketplace settings: Check valid signature, store-hiding options, Hide store info in invoice.

## Needs decision
- index.md "Released Date: May 15, 2026" vs releases.md 1.0.0 "May 19, 2026" - which is right? Theme CHANGELOG.md uses different numbering (1.0.6 = 2026-09-02), unreliable.
- Screenshots likely outdated (not edited): widget-footer-primary-sidebar*.png (show old widgets), ads-style-1..4.png refs removed from usage-ads, breadcrumb-1/2.png refs removed. Images remain in images/ dir.
- usage-tax still uses "tax classes" wording while UI says "Taxes".
- Speculative sections left in place (no code backing): digital products "Analytics & Reporting", payments "Failed Payments" flow, commissions refund rules, customer login-option "both required" row - cut/rewrite by human.
- Code bug (not docs): stripe StripeController.php:145,:257 `$payment->status === PaymentStatusEnum::COMPLETED` always false -> webhook idempotency guard never triggers.
- developer-payment-gateway uses `do_action('payment_before_making_api_request')` - fired by gateways, no core listener; keep or drop.
- Store listing helper text says 404 but PublicStoreController.php:28 redirects home (lang string likely wrong).

## Unresolved questions
- Should payment/shipping dev guides document vendor/marketplace routes + extra hooks, or stay minimal?
- Page editor switch label "Use the editor with shortcodes" (developer-theme-customization) unverified.

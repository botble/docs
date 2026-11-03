# Audit: ecommerce-themes (shofy, farmart, hasa, martfury, nest, ninico, shopwise, wowy, orisa)

Date: 2026-11-04. Owned only non-synced pages (+ farmart invoice-template/usage-currencies/usage-location). No build, no commit.

## Scope + repo HEADs

| Repo | HEAD | core.json | theme.json | ecommerce plugin |
|---|---|---|---|---|
| shofy | 7df91cde0 2026-11-03 | 1.4.12 | (no version) | 3.11.10 |
| farmart | 7d57e47f3 2026-10-28 | 1.24.12 | - | 3.11.10 |
| hasa (theme `september`) | 6515ead69 2026-10-28 | 1.45.12 | - | 3.11.10 |
| martfury | cad260771 2026-10-28 | 1.41.12 | - | 3.11.10 |
| nest | 447333f3a 2026-10-28 | 1.26.12 | - | 3.11.10 |
| ninico | 79be93a6d 2026-10-28 | 1.8.12 | - | 3.11.10 |
| shopwise | 3c629e1d6 2026-10-28 | 1.42.12 | - | 3.11.10 |
| wowy | bc4270cc2 2026-10-28 | 1.31.12 | 1.31.4 | 3.11.10 |
| orisa | 7db60b1b 2026-11-02 | 1.0.7 | 1.0.5 | 3.11.10 |

All: composer `php ^8.3|^8.4|^8.5`, `laravel/framework ^13.0` → index "Laravel 13.x" correct everywhere. minimumPhpVersion 8.3.0.

Paths below: E = `platform/plugins/ecommerce`, M = `platform/plugins/marketplace` (shofy repo unless noted).

## shofy

| page | claim in docs | code evidence | action |
|---|---|---|---|
| usage-marketplace-subscriptions | "two mutually exclusive modes" | M/src/Enums/MarketplaceModeEnum.php:21 HYBRID; lang subscription.php:7 "Subscription + commission"; plan `commission_override` subscription.php:48-53 | fixed (3rd mode, plan commission override row, notes) — same fix in farmart/martfury/nest copies |
| usage-marketplace-setup | mode lacks hybrid; ~18 labels (Verify vendor, Single vendor checkout, Allow vendor digital products, Max product images…, Hide store X…) ; "Allow vendor manage shipping = create shipping rules"; vendor categories filter "listing page" | M/resources/lang/en/marketplace.php:175-245 | fixed |
| usage-marketplace-commissions | "Fixed fees per order not supported"; "per vendor" commissions | marketplace.php:179-181 `fixed_commission_fee`; MarketplaceSettingForm.php:70; no per-vendor field | fixed |
| usage-marketplace-withdrawals | Fee withdrawal amount / Withdrawal fee type / Minimum withdrawal amount | marketplace.php:188,186,235 | fixed labels |
| usage-tax | settings labels (Display product price including taxes, Display checkout tax info…); `Taxes -> Tax Classes/Tax Rules` submenus; default tax rate in settings; tax on shipping in Shipping settings; product/customer **Tax class dropdown**; `Reports -> Tax` + CSV export | lang setting.php:357-387; routes/tax.php (rules nested under tax, `set-default`); TaxController:121; no `tax_class` in any Form/view (only Tax/Enums + migrations 2026_02_02_0900{02,03}); TaxCollectionSummaryCard widget only | fixed (labels, menu paths, set-as-default, shipping tax, tax-class UI absence noted, reports section rewritten, added `cms:ecommerce:seed-eu-vat` tip) |
| usage-digital-products | settings labels; Download limits / expiry / max downloads; `Ecommerce -> License Codes` menu; license-code import CSV cols; email "Order Completed (Digital Product)"; revoke on refund; analytics metrics | setting.php:142-158; no download-limit columns (only `downloaded_at` migration 2024_07_03); routes/product.php:134 per-product license codes; ProductLicenseCodeImporter cols `product_id,license_code`; config/email.php:303,319; LicenseCodeStatus only available/used | fixed (rewrote false sections) |
| usage-invoices | "Generate invoice automatically" setting; code suffix; templates Default/Compact/Detailed; `Settings -> Invoice Templates`; company info in Settings->General/Tax; template vars `items/subtotal…`; status Paid | InvoiceSettingForm labels setting.php:306-347; GenerateInvoiceListener on OrderPlacedEvent (EventServiceProvider:109-111); invoice-template.php vars; InvoiceStatusEnum pending/processing/completed/canceled | fixed |
| usage-abandoned-carts | Send email reminders / Maximum reminder emails / Cleanup old carts after | setting.php:584-602 | fixed labels |
| usage-customer-management | admin "Deletion Requests tab"; status "Completed"; settings labels (Verify customer email, Verification expire minutes, Enabled … DOB, Customer default avatar); login option names; export path | no admin table/controller for deletion requests; DeletionRequestStatusEnum (waiting/confirmed/canceled); setting.php:396-417 | fixed |
| usage-order-returns | `Settings -> Return Settings`; "Enable order returns" default Off; "Returnable statuses" setting | ReturnSettingForm; setting.php:289-302; EcommerceHelper:1065 default 1 | fixed (+partial return, image upload settings) |
| usage-reviews | Enable review, Only allow customers who purchased…, Hide rating when no reviews, Max file size/number, Display uploaded images list | setting.php:162-185 | fixed (+Require review comment) |
| usage-product-variations | menu `Ecommerce -> Attributes`; Is searchable/Is comparable/Use in product listing/Use image from variation; Generate all variations; Auto-generate SKU; storehouse/checkout labels | menu name product-attributes.php:4; product-attribute-sets.php; products.php:99,168 | fixed |
| usage-product-options | menu `Product Options -> Global Options`; types Textarea + File Upload; labels Affect Type/Affect Price/Assign Global Option/Add new value | E/src/Option/OptionType = Field, Checkbox, Dropdown, RadioButton only; product-option.php | fixed (removed textarea/file sections) |
| usage-product-specifications | menu `Ecommerce -> Specifications`; import cols product_id/{attribute}; export path | product-specification.php:5,24,37,65; ProductSpecificationImporter cols name/specification_table/specifications(_locale) | fixed |
| usage-product-import-export / customer-mgmt / reset-test-data | `Tools -> Import/Export Data` / `Data Synchronize` | vendor/botble/data-synchronize lang: "Export/Import Data" | fixed |
| usage-reset-test-data | `ec_product_translations` | migration 2021_05_31_173037 creates `ec_products_translations` | fixed |
| usage-wishlist-compare | compare up to 10 products; settings at `Ecommerce -> Settings` | Fronts/CompareController.php:25 MAX_PRODUCTS = 4; settings in Shopping (setting.php:198-202) | fixed |
| usage-payment-gateways | Stripe webhook `/stripe/webhook`; events list | stripe/routes/web.php:8-13 `payment/stripe/webhook`; StripeController:66-90 + `checkout.session.completed` | fixed |
| usage-shipping-methods | `Promotions -> Coupons`; `Ecommerce -> Store Locators`; "Tax on shipping fee"; shipping taxed by location rules; `Standard & Formats` | menu Discounts; store locators in settings; setting.php:386; EcommerceHelper:1446-1470 uses default tax rate | fixed |
| usage-shipping-by-location | Locations -> Bulk Import; setting in General; Ecommerce -> Shipping | location bulk-import.php:4 "Location Importer"; CheckoutSettingForm; settings | fixed |
| usage-shippo | `Plugins -> Ecommerce -> Shipping -> Shippo` | shippo HookServiceProvider:21 SHIPPING_METHODS_SETTINGS_PAGE | fixed |
| usage-google-tag-manager | GTM code in Ecommerce -> Tracking | packages/theme WebsiteTrackingSettingForm (Settings → Website Tracking, GTM Container ID); ecommerce only toggles events (setting.php:512) | fixed |
| usage-facebook-pixel / usage-webhooks / usage-flash-sales | labels / `Webhook` / `Flash Sales` settings | setting.php:506-510, 446-464, 554-560 | fixed |
| usage-ui-block | coming-soon attrs `subtitle`,`date`; ads 4 styles; ecommerce-categories 2 styles; products 3 styles; simple-slider 5 styles; "display 20 products" with limit=12 | functions/shortcodes.php:381-440 (`countdown_time`…); shortcodes-ads.php:62-78 (5); shortcodes-ecommerce.php:90-115 (5), 495-516 (4); shortcodes-simple-slider.php:30-40 (6) | fixed |
| usage-ads | four styles | shortcodes-ads.php (5) | fixed |
| developer-shipping-provider | ShippingStatusEnum::RETURNING/RETURNED/EXCEPTION | E/src/Enums/ShippingStatusEnum.php (14 cases, none of those) | fixed |
| developer-payment-gateway, developer-product-detail-hooks | hook/filter names | all 17 hooks found in payment/ecommerce/stripe/theme code | ok |
| usage-ecommerce-api | listed endpoints | E/routes/api.php — all exist | ok (many undocumented, see below) |
| index, homepage, menu, breadcrumb, coming-soon-page, widgets (13 areas), theme-options, cart-persistence, add-to-cart-url, flash-sales, discounts, order-management | | functions.php:98-178, theme-options.php, routes/cart.php:16, enums | ok |

## farmart

| page | claim | evidence | action |
|---|---|---|---|
| usage-menu, usage-widgets | footer menus Company, Information, Product categories | farmart database/seeders/MenuSeeder.php:119,149,175 Useful Links/Help Center/Business | fixed |
| usage-ads | "doesn't support Google Adsense, use Custom JS" | ads plugin lang ads.php:21-35 AdSense Auto/Unit modes, AdsForm ads_type google_adsense | fixed (same in nest/ninico/wowy) |
| invoice-template | font option at "Admin -> Ecommerce -> Settings" | InvoiceSettingForm:127-144 (Settings → Ecommerce → Invoices, Using custom font + Invoice font family) | fixed |
| usage-location | label "…plugin location?" | setting.php:244 (no "?") | fixed |
| usage-marketplace-subscriptions | hybrid missing | farmart marketplace lang has hybrid | fixed |
| usage-currencies, usage-homepage (home-slider key), theme-options, index features | | setting.php:50-66, SimpleSliderSeeder | ok |

## martfury / nest / wowy / ninico / hasa / shopwise

| product | page | claim | evidence | action |
|---|---|---|---|---|
| martfury | usage-marketplace-subscriptions | hybrid missing | lang subscription.php | fixed |
| nest | usage-marketplace-subscriptions, usage-ads | hybrid; AdSense unsupported | as above | fixed |
| wowy | usage-menu | "Footer menu & Information" | wowy MenuSeeder: Product categories, Information | fixed |
| wowy | usage-ads | AdSense unsupported | ads lang | fixed |
| ninico | usage-ads | AdSense unsupported | ads lang | fixed |
| ninico | usage-homepage | page "Front Page"; "Featured Product Categories" shortcode | PageSeeder (Wooden/Fashion/Furniture/Cosmetics/Food Grocery Home); shortcode `product-categories` "Product Categories" | fixed |
| ninico | usage-widgets | 4 widget areas | functions.php:27-60 six sidebars | fixed |
| nest/wowy | homepage, menu, widgets, theme-options (product/blog single layout) | | theme-options `product_single_layout`, `blog_single_layout`; seeders | ok |
| hasa, shopwise | index only | Laravel 13.x | composer | ok |

## orisa

| page | claim | evidence | action |
|---|---|---|---|
| index | 5 homepage demos; 3 header + 5 footer styles; 21+ shortcodes / 57+ styles | theme.json 15 presets; theme-options.php:42-48 (6 header), :131+ (15 footer); 29 registered shortcodes, ~180 style files | fixed |
| usage-ui-block | style counts (hero 5, about 5…); "5 homepage demos"; missing shortcodes | partials/shortcodes/*/styles counts | fixed counts + listed 10 missing shortcodes |
| usage-widgets | 9 widgets incl. header-controls; areas Footer Bottom Bar / Header Area | widgets/ (8 dirs); functions.php:145-194,437 sidebars | fixed |
| usage-menus | "Footer Menu" location | only core `main-menu` (MenuServiceProvider:79) | fixed |
| usage-logo-customization | Logo/Favicon in Settings → General; "Logo (dark variant)/(dark mode)"; sizes under Header | packages/theme HookServiceProvider:270-307 (Theme Options → Logo); theme-options.php:455-494 labels | fixed |
| usage-newsletter-popup | Popup image / tablet / mobile labels | newsletter lang newsletter.php:68-72 Desktop/Tablet/Mobile Image | fixed |
| usage-project-metrics | only projects style 4 renders | projects styles 4, 7, 11, 27 use metrics | fixed |
| usage-theme-options | no header/footer style docs | theme-options.php header_style/footer_style | added short sections |
| usage-homepage, usage-offcanvas-menu, migration-subfolder-to-root | | presets, header.blade.php:120 | ok |
| releases | only 1.0.0 listed | theme.json 1.0.5, core 1.0.7, commit 614e1267 presets 6-15 | needs decision |

## Undocumented features (missing-doc)

- Ecommerce **Pending Orders auto-cancel** (Settings → Ecommerce → Pending Orders, `cms:ecommerce:cancel-pending-orders`) — no page anywhere.
- `cms:ecommerce:seed-eu-vat` (only a tip added to shofy tax page).
- Ecommerce **Customer Carts** admin menu (`cms-plugins-ecommerce-customer-carts`) — not in cart-persistence page.
- Ecommerce **Shipping Label Template** settings section; **Digital-only store** ("Disable physical product") beyond the one table row.
- Affiliate/external products (`is_affiliate`, `external_url` import columns).
- Ecommerce API: product related/cross-sale/up-sale/reviews/faqs/specifications/flash-sale, categories, brands, reviews, order returns, downloads, delete-account, wishlist, compare, order tracking, currencies/countries endpoints.
- Shofy theme options: Bottom Bar Menu tab, 404 page options, blog layout/author, product item layout (grid/list), pagination type, product name lines.
- Plugins stripe-connect, paypal-payout, sale-popup, announcement, cookie-consent, request-log, audit-log present in shofy/farmart/martfury/nest but no product-specific pages.
- hasa, shopwise, wowy ship marketplace plugin (with subscriptions/hybrid) but have no marketplace pages.
- Orisa: offcanvas/ecommerce/portfolio theme options partly undocumented; 10 shortcodes now only listed by name.

## Needs decision

- orisa/releases.md lists only 1.0.0 while theme.json 1.0.5 / core 1.0.7 and presets 6-15 shipped later — add entries? (didn't rewrite history).
- orisa theme.json version (1.0.5) lags core.json (1.0.7) — code issue, not docs.
- orisa `database/seeders/Themes/Main/WidgetSeeder.php` seeds `header_sidebar`, which the theme never registers — code bug.
- Shofy tax page still documents product/customer tax classes that have no admin UI (marked as "no field yet"); maybe drop the sections or build the UI.
- Shofy theme-options "2 predefined footer styles" — footer style is fixed per child theme (shofy-fashion/jewelry use style-2), not an option; reword?
- Several sidebar.ts files omit synced `api.md` / `plugin-backup.md` (and shofy `theme-rename.md`) — owned by CMS/sidebar owner, not edited.
- Shofy digital-products + tax + invoices pages had large fabricated sections; rewritten minimal-accurate, but a full human pass is advised.
- Demo credentials (farmart `botble/159357`, others `admin/12345678`) not verifiable from code.

## Unresolved questions

- Should ecommerce plugin docs (tax/invoices/digital products) be deduplicated into one shared ecommerce source instead of shofy-only pages?
- Should the hybrid-mode subscription fix also be added to hasa/shopwise/wowy (no page exists there)?

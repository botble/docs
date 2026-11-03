# Audit: other-themes group (2026-11-04)

Scope: product-specific (non-synced) pages for norio, snapcart (all pages, not in sync list), auxero, velura, isak, qore, restoria, travlla, homzen, athena, carento, infinia, zelio, gerow, transp, jobcy, jobzilla, flex-home, lara-mag, miranda, stories. Product version = platform/core/core.json `version` (theme.json version is 1.0.0 placeholder in all repos). All repos: composer `php ^8.3|^8.4|^8.5`, laravel/framework ^13.0.

Repo HEADs: norio 2e434be, snapcart e94fda80, auxero 169a7dc6, velura 4e81ff57, isak fb4db5a6, qore 3b46c55f, restoria 9adbd42c, travlla b8ab5c1a, homzen 84e1e5112, athena a1cae058, carento ec7f5c3fa, infinia e05c9f8a, zelio e073ca78, gerow 38f198182, transp 034fe4264, jobcy/jobzilla c2ba57041, flex-home 9f8e50dd1, lara-mag 17ee36349, miranda 027abfacc, stories ec5471d02.

Releases vs core.json: norio 1.0.0=1.0.0 ok; snapcart 1.0.0 vs 1.0.9; velura 1.0.0 vs 1.0.4; restoria 1.0.0 vs 1.1.12; travlla 1.0.0 vs 1.0.3 -> needs decision (no release notes invented).

Cross-cutting: norio + snapcart hold stale copies of CMS pages (not in bin/shell_cmd.sh sync list) — consider adding them to sync (needs decision). Common pattern fixed everywhere: plugin settings live under `Settings -> <Plugin>` PanelSections, not `<Plugin> -> Settings`.

## norio

HEAD: norio 2e434be 2026-10-28 · core.json 1.0.0 · theme.json 1.0.0 · composer php ^8.3|^8.4|^8.5, ext-curl/gd/json/pdo/zip

Verified OK (no action): index.md features (3 presets = theme.json presets; 25 shortcodes / 85 styles = sum of `ShortcodeFields::style()` counts in functions/shortcodes-*.php + contact-form 4; 5 header / 3 footer styles; 24 theme langs + en in platform/themes/norio/lang), usage-ui-block.md per-block style counts, usage-theme-options.md labels/defaults (theme-options.php), menu locations (functions.php:178-180), installer SQL lookup order (packages/installer/.../InteractsWithDatabaseFile.php:25-36), team/career/project URL prefixes (plugin ServiceProviders setPrefix), newsletter popup fields/default delay 5 (plugins/newsletter/src/NewsletterManager.php:57-112; demo seed 8s), dark mode options, releases.md 1.0.0 = core.json 1.0.0, admin labels Cache Management / System Updater / Enable Preloader?.

| page | claim in docs | code evidence (file:line) | action |
|---|---|---|---|
| usage-widgets.md | Admin also lists Blog top, Service Details, Project Details sidebars | only `team_sidebar` registered (themes/norio/functions/functions.php:155) + core `primary_sidebar` (packages/widget/src/Providers/WidgetServiceProvider.php:56) | fixed (warning now names core Primary sidebar) |
| usage-widgets.md | widget list lacks core Text widget | WidgetServiceProvider.php:62 `register_widget(Text::class)` | fixed (row added) |
| usage-portfolio.md | Service theme field "Service items" (style 2) | no such field; style-2 field is Tags (functions/meta-boxes-portfolio.php:37-42) | fixed (removed, Tags/Included style refs corrected) |
| usage-portfolio.md | service fields missing Card text, List image, Card image, What we hold | meta-boxes-portfolio.php:82-107 | fixed (rows added) |
| usage-portfolio.md | project fields missing Status chip, Portrait image, Compact card title/category/summary | meta-boxes-portfolio.php:152-184 | fixed (rows added) |
| usage-portfolio.md | "eight layouts" of Projects block | projects block 9 styles (partials/shortcodes/projects/styles/style-1..9, doc ui-block says 9) | fixed → nine |
| usage-careers.md | theme fields missing Level, About the seat, Closing date; Band fallback | meta-boxes-career.php:38-74 | fixed (rows added) |
| usage-homepage.md | page templates not documented; Breadcrumb enabled page field missing | functions.php:23-30 (6 templates incl. Coming Soon + 3 fields functions.php:240-270), functions.php:182-202 | fixed (short Page Templates section + table row) |
| usage-theme-options.md | section "Pages" | packages/page/resources/lang/en/pages.php:24 title 'Page' | fixed → "Page" |
| installation-requirements.md | ext list missing `gd` | composer.json:10 ext-gd (cms copy already has it) | fixed |
| installation-requirements.md, faq.md | "(PHP 8.4 is supported)" | composer.json php ^8.3\|^8.4\|^8.5 | fixed → "PHP 8.4 and 8.5 are supported" (8.3.0 kept per lead) |
| upgrade.md | "The CodeCanyon package contains a default .env file"; Cloudflare "100-second cap" | stale copy; docs/cms/upgrade.md corrected in ca67d72 (package ships .env.example) | fixed (re-copied from clean docs/cms/upgrade.md; no norio-specific content) |
| api.md | stale CMS copy: "enable API Key Protection", "API Tokens" page, `POST /api/v1/password/reset`, login returns `user` | vendor/botble/api: lang api.php:11,14 'API Key'/'Generate Random Key', sanctum-token.php:4 'Sanctum Token', routes/api.php only `password/forgot` | needs decision (cms/api.md is mid-edit by CMS auditor; re-copy after) |
| license.md | old troubleshooting (hard-coded Cloudflare IPs, iptables append) | stale vs docs/cms/license.md | needs decision (license page = off-limits per brief) |
| faq.md | "translations for 25 languages" vs index "24 languages" | 24 + en.json in themes/norio/lang | needs decision (both defensible; wording only) |

### Undocumented features
- Portfolio plugin modules Packages, Quotation Requests, Custom Fields (plugins/portfolio/resources/lang/en/portfolio.php:25,44,49) — not mentioned in usage-portfolio.md (may be unused by theme).
- Testimonial theme fields Company logo, Large photo (meta-boxes-testimonial.php); Blog post fields Card label, Author title (meta-boxes-blog.php) — no page covers them.
- Plugins shipped but undocumented in norio docs: audit-log, captcha, cookie-consent, fob-comment, gallery, language-advanced.

### Needs decision
- Add `norio` (and snapcart?) to `bin/shell_cmd.sh` synced list, so its CMS-copied pages (api, license, upgrade, installation-*, etc.) stop going stale. Until then, re-copy norio/api.md from docs/cms/api.md once the CMS auditor finishes.
- norio/license.md troubleshooting section is stale vs cms (CodeCanyon item link is norio-specific, so not a straight copy).
- faq.md "25 languages" vs index.md "24 languages".

## snapcart

HEAD `e94fda80 2026-10-28` · core.json version 1.0.9 · minimumPhpVersion 8.3.0 · composer php `^8.3|^8.4|^8.5`, ext curl/gd/json/pdo/zip · theme.json 1.0.0, required_plugins [ecommerce] · 26 plugins in platform/plugins (ads, analytics, audit-log, backup, blog, captcha, contact, cookie-consent, ecommerce, faq, gallery, language, language-advanced, location, mollie, newsletter, payment, paypal, paystack, razorpay, sale-popup, shippo, simple-slider, social-login, sslcommerz, stripe, translation)

All 56 pages in docs/snapcart are owned by this group (not synced).

| page | claim in docs | code evidence (file:line) | action |
|---|---|---|---|
| usage-floating-contact.md | Config at `Theme Options -> Contact Information` with fields Phone Number / Zalo / Facebook; channels only Zalo/Phone/Messenger; toggle "Floating Contact" | themes/snapcart/functions/theme-options.php:93-116 (section "Contact", Button 1-3 type/value/label; types phone, zalo, whatsapp, messenger, telegram, custom); :152 "Enable floating contact buttons" | fixed |
| usage-delivery-time-picker.md | toggle "Delivery Time Picker" | theme-options.php:153 "Enable delivery time picker" | fixed |
| usage-reviews.md | toggle "Product Reviews"; review settings at `Ecommerce -> Settings`, "Auto-approve reviews", "Only verified purchasers" | theme-options.php:154; plugins/ecommerce/resources/lang/en/setting.php:162,177,179 (Settings → Ecommerce → Product Reviews; "Review need to be approved…" is the inverse of auto-approve) | fixed |
| usage-menu.md | bottom nav = Home, Categories, Cart, Account, More | themes/snapcart/partials/bottom-nav.blade.php:15-57 (Home, Categories, Search, Cart, Account) | fixed |
| usage-homepage.md | "Breadcrumb style: Select None" | no `breadcrumb_style` in themes/snapcart | fixed (removed bullet) |
| usage-ui-block.md | Hero Carousel fields Title/Image/Link per slide | partials/shortcodes/hero-carousel-admin.blade.php (`slider_key`, `show_newsletter_form`; slides come from Simple Slider plugin) | fixed |
| usage-ui-block.md | Featured Products style `grid` or `list` | featured-products-admin.blade.php (grid / slider / list) | fixed |
| usage-ui-block.md | Reviews Section "Reviews: select reviews" | reviews-section-admin.blade.php (`limit`, `min_stars`, `style` grid/slider) | fixed |
| usage-ecommerce-api.md | `products/{id}`, `GET cart`, `customer/profile`, `customer/addresses`, `GET wishlist`, filter `category_id` | plugins/ecommerce/routes/api.php:36 (`products/{slug}`), :89-93 (cart/{id?}), :64-65 (`addresses`), wishlist `GET wishlist/{id}`; vendor/botble/api/routes/api.php:25-26 (`/api/v1/me`); API/ProductController.php:40 (`categories[]`) | fixed |
| api.md | `GET /api/v1/posts/{id}` | plugins/blog/routes/api.php:16 (`posts/{slug}`) | fixed |
| usage-facebook-pixel.md | Pixel ID at `Settings -> General` | ecommerce HookServiceProvider.php:108-151 (fields injected in WebsiteTrackingSettingForm); SettingEcommercePanelSection.php:122 (Settings → Ecommerce → Tracking → route settings.website-tracking) | fixed |
| usage-google-tag-manager.md | GTM ID at `Settings -> General` | packages/theme/src/Forms/Settings/WebsiteTrackingSettingForm.php:60,83; ThemeServiceProvider.php:146 (Settings → Website Tracking, option "Google Tag Manager (Recommended)") | fixed |
| usage-analytics.md | `Settings -> General -> Google Analytics` | plugins/analytics/src/Providers/AnalyticsServiceProvider.php:55-62 (own panel item "Google Analytics") | fixed |
| usage-currencies.md | `Ecommerce -> Settings -> Currencies` | SettingEcommercePanelSection.php:24 (Settings → Ecommerce → Currencies) | fixed |
| usage-invoices.md / invoice-template.md | `Ecommerce -> Settings -> Invoice`; "Footer text" field | SettingEcommercePanelSection.php:78,84 (Invoices, Invoice Template); lang/en/setting.php:306-330 (no footer text field; has invoice code prefix) | fixed |
| usage-location.md | `Settings -> Location`, button "Import location data" | plugins/location/src/Providers/LocationServiceProvider.php:97-133 (Locations menu, Location Importer); lang/en/bulk-import.php:4,10 ("Import available data") | fixed |
| usage-shipping-methods.md / usage-shipping-by-location.md | `Ecommerce -> Shipping` | SettingEcommercePanelSection.php:103 (Settings → Ecommerce → Shipping); ecommerce sidebar only has "Shipments" | fixed |
| usage-shippo.md | `Ecommerce -> Settings -> Shipping -> Shippo` | Shippo config renders inside Settings → Ecommerce → Shipping | fixed |
| usage-tax.md | menu `Ecommerce -> Tax`; display at `Ecommerce -> Settings -> General -> Tax display` | lang/en/tax.php:4 ("Taxes"); lang/en/setting.php:357,378 (Settings → Ecommerce → Tax → "Add tax to displayed prices") | fixed |
| usage-email.md | `Settings -> Email -> Email Templates` | core/setting/src/PanelSections/SettingCommonPanelSection.php:28 (separate "Email templates" item) | fixed |
| usage-payment-gateways.md | `Ecommerce -> Payment Methods`, `Ecommerce -> Payments` | plugins/payment/src/Providers/PaymentServiceProvider.php:60-87 (Payments → Payment methods / Transactions) | fixed |
| usage-social-login.md | providers Google, Facebook only; callback `/auth/google/callback` | plugins/social-login/src/Supports/SocialService.php:92-98 (facebook, google, github, linkedin, linkedin-openid, x); routes/web.php:28 (`auth/callback/{provider}`) | fixed |
| usage-webhooks.md | `Settings -> Webhooks`, Create with Name/URL/Events/Secret; events "order created, payment completed, customer registered"; retries | ecommerce Forms/Settings/WebhookSettingForm.php + lang/en/setting.php:441-464 (one URL field per event: order placed/updated/completed/cancelled, shipping status, payment status, abandoned cart); Listeners/SendWebhookWhenOrderPlaced.php:28 (single sync POST, no retry) | fixed (page rewritten) |
| cronjob.md | scheduled: newsletter queue, sitemap generation, flash sale expiry, analytics collection… | ecommerce CommandServiceProvider.php:33-49; core/base CommandServiceProvider.php:60-62; sitemap SitemapServiceProvider.php:60; audit-log :65; social-login :52 | fixed (list replaced with real tasks) |
| plugin-translation.md | "24 language files" | themes/snapcart/lang/ = 22 json files | fixed |
| installation-requirements.md | "PHP 8.4 is supported"; extension list lacks GD | composer.json php `^8.3|^8.4|^8.5`, `ext-gd` | fixed ("PHP 8.4 and 8.5 are supported", added `GD`) |
| releases.md | latest 1.0.0 (2026-02-03) | platform/core/core.json version 1.0.9 | needs decision |
| releases.md | 1.0.0 entry: bottom nav "Home, Categories, Cart, Account, More"; "8 homepage shortcodes" but lists 7 | bottom-nav.blade.php; themes/snapcart/changelog.md (1.0.0 says Home, Categories, Cart, Orders, Account) | needs decision (history page, not rewritten) |
| usage-product-specifications.md | "Specification tab, add specification groups and attributes" per product | ecommerce EcommerceServiceProvider.php:997-1025 (Product Specification menu: Specification Groups / Attributes / Tables) | needs decision (flow described loosely; tables-based workflow undocumented) |
| usage-theme-options.md, usage-widgets.md, usage-add-to-cart-url.md, usage-sale-popup.md, usage-flash-sales.md, usage-discounts-coupons.md, usage-order-*.md, usage-customer-management.md, usage-newsletter.md, usage-wishlist-compare.md, installation-*.md, upgrade.md, license.md | spot-checked labels/defaults/routes/commands | theme-options.php:16-203 (all defaults match); cart.php:16 `add/{product}` + PublicCartController.php:455 `qty`; CompareController.php:25 MAX_PRODUCTS=4; core AsCommand cms:publish:assets / cms:user:create | OK |

### Undocumented features
- Shortcode options not documented: product-categories (Number of Categories, Products per Category, View All URL), ecommerce-categories (Style grid/horizontal scroll, Show Products Count, Limit, View All URL), ecommerce-brands (Show Brand Name, Limit, View All URL), blog-posts (Subtitle, Style grid/list, View All URL), featured-products Subtitle.
- Simple Slider shortcode extension "Show Newsletter Form" (functions/shortcodes.php:18-45).
- Widgets: Custom Menu, Site Accepted Payments, Site Copyright, Site Information (widgets/*); sidebars `product_detail_sidebar`, `footer_sidebar` (functions/functions.php:66-74).
- Plugins shipped with no SnapCart page: audit-log, backup, captcha, contact, cookie-consent, faq, gallery, simple-slider.
- Ecommerce settings with no page: abandoned carts, pending order auto-cancel, digital products, product search, store locators, shipping label template, standard & format, customer carts.
- Ecommerce API is only partly documented: reviews, order returns, downloads, coupons apply/remove, compare, countries/currencies, flash-sales, filters, orders cancel/invoice/upload-proof, account deletion.

### Needs decision
- releases.md: newest entry is 1.0.0 but core.json is 1.0.9. Add 1.0.1-1.0.9 entries (the source would be the internal changelog) or note "see CodeCanyon changelog"? Not invented.
- releases.md 1.0.0 entry contradicts current bottom nav and lists 7 of 8 shortcodes. Left as history.
- usage-product-specifications.md: should it be rewritten around Specification Groups / Attributes / Tables?

# other-themes partial: auxero, velura, isak, qore, restoria, travlla

## auxero
HEAD 169a7dc6 2026-10-28 | product version (core.json) 1.0.7 | theme.json no version, 11 presets home-1..home-11, required_plugins []

| page | claim in docs | code evidence (file:line) | action |
|---|---|---|---|
| index.md, usage-ui-block.md | "38 UI blocks/shortcodes" | 36 registered: 35 in themes/auxero/functions/*.php + check-car-availability (shortcodes-car-manager.php:269); partial `our-achievements/` has no registration | fixed -> 36 |
| usage-ui-block.md | shortcode list (31 entries) | content-columns (shortcodes.php:262), content-images (:289), trusted-expertise (:1040), sell-your-car (:1430), financing (:1456) undocumented | fixed (added short entries, no images) |
| usage-theme-options.md | Car listing layout `default` = "Standard grid layout" | theme-options.php:351 `default` => Off-canvas Filter | fixed |
| usage-theme-options.md | Header tab lacks Header style + contact fields | theme-options.php:42-110 header_style (5 styles), announcement, phone, phone 2, email, address, address map URL | fixed (added) |
| usage-theme-options.md | Logo: no Logo light | theme-options.php:26 logo_light | fixed (added) |
| usage-api.md | "Bookings are accessible to both guest and authenticated users" (all 6 routes) | plugins/car-manager/routes/api.php:89-92 only POST /bookings + GET /bookings/lookup public; :121-128 rest under auth:sanctum, + DELETE /bookings/{id} | fixed (table w/ Auth column) |
| usage-api.md | missing endpoints | api.php:51 currencies, :65 settings, :68 services, :77 payment-methods, :78 bookings/{id}/payment, :99 invoices/{invoice}/download (signed), :135-145 DELETE profile, profile/driver-license GET/POST, referral, referral/credits, :219 checkout/booking/{id} (web) | fixed (added, except invoices download + checkout webview = noted only) |
| usage-vendor-system.md | KYC verification section (settings, routes, emails kyc-submission-*, storage) | removed in commit 04b95ca9 "Remove KYC feature"; no kyc in plugins/car-manager (only orphan theme views views/car-manager/customers/kyc.blade.php) | fixed (section removed, manual Verify/Unverify kept: routes/web.php:85) |
| usage-vendor-system.md, usage-reviews-messaging.md, usage-payment-tax.md | `Car Manager -> Settings -> General/Review/Invoice` | no Settings item in admin Car Manager menu; settings panel = Settings -> Car Manager (PanelSections/SettingCarManagerPanelSection.php:14-66: General, Car Filter, Permalinks, Review, Currency, Invoice, Invoice Template, Customer, Taxes) | fixed |
| usage-payment-tax.md | Currency at `Settings -> Currency` | Forms/Settings/CurrencySettingForm.php in Car Manager panel (:42) | fixed -> Settings -> Car Manager -> Currency |
| usage-car-management.md | Makes/Types/Categories/Amenities under `Car Manager` | CarManagerServiceProvider.php:293-366 separate top-level menu "Car Attributes" | fixed |
| usage-reviews-messaging.md | `Car Manager -> Messages` | CarManagerServiceProvider.php:370-377 Messages top-level (parent_id null) | fixed |
| usage-reviews-messaging.md | label "Enable review" | lang/en/settings.php review.forms.enabled_review = "Enable review?" | fixed |
| usage-payment-tax.md:86 | `Settings -> Booking` controls tax vs coupon order | no such panel; TaxSettingForm only "Apply taxes" | needs decision |
| usage-vendor-system.md:69 | `Settings -> Vendor` restricts vendor-editable fields | no such settings page | needs decision |
| usage-widgets.md | widget list | widgets/car-disclaimer, widgets/financing-calculator undocumented; sidebars top_footer, header_top, above_blog_list, off_canvas, car_detail_bottom undocumented | missing-doc |
| index.md | 5 gateways Stripe/PayPal/Razorpay/SSLCommerz/Paystack | platform/plugins/{stripe,paypal,razorpay,sslcommerz,paystack} | ok |
| usage-homepage.md | 11 homepages | theme.json presets home-1..home-11 | ok |

Undocumented features (auxero): driver licence approval + "Require an approved driver's licence to book", security deposit, one-way rental toggle, off-site booking links, owner info hide toggles (settings.php general.forms); referral credits API; Car Attributes: Transmissions, Fuel types, Colors, Tags, Amenity categories menus; booking reports + booking calendar + car availability calendar admin pages; Invoices/Customers admin menus; car filter + permalink + invoice template + customer settings.

Needs decision (auxero): payment-tax.md:86 `Settings -> Booking` warning; vendor-system.md:69 `Settings -> Vendor` tip; orphan theme kyc.blade.php views (code cleanup, not docs).

## velura
HEAD 4e81ff57 2026-11-04 | product version 1.0.4 | theme.json version 1.0.0, NO `presets` key

| page | claim in docs | code evidence (file:line) | action |
|---|---|---|---|
| index.md | "pick one of Home 1 – Home 9 presets in the CMS installer" | themes/velura/theme.json has no `presets`; installer reads presets only from theme.json (packages/theme/src/Manager.php:78-90, installer/InstallerStep.php:133) -> installer shows only Default. Seeders database/seeders/Themes/Home1..Home9 exist | needs decision (add presets to theme.json or reword docs) |
| usage-ui-block.md | "18 UI Block shortcodes", no Coming Soon | 19 registered; coming-soon in functions/shortcodes-coming-soon.php:18 | fixed (19 + row) |
| usage-theme-options.md | Footer/Styles lists incomplete; no General section | theme-options.php:169-208 footer heading color, footer_style (default/compact), footer_logo, footer bg image; :367-411 body bg, subtitle_style, heading_h2_font_size, uppercase headings; :436-514 General: Site Title, Spa Address, Email, Opening Hours, Booking Phone, Book Appointment URL | fixed (added) |
| usage-theme-options.md | fonts Jost / Rufina | functions/functions.php:54-55 | ok |
| usage-spa-booking.md | Settings = "working hours, notification emails, booking rules" | spa-booking lang/en/spa-booking.php settings keys: time format, time interval, multi-vendor, verify vendor, commission, withdrawal fee/min | fixed |
| usage-spa-booking.md | menu `Spa Booking` -> Service Categories/Services/Staff/Packages/Memberships/Currencies/Appointments/Booking Calendar/Settings | SpaBookingServiceProvider.php:89-169 (all present; top label is "SpaBooking" in lang spa-booking.php menu_name) | ok (label typo is code-side) |
| faq.md:162 | Backup at `Admin → Tools → Backup` | plugins/backup/src/Providers/BackupServiceProvider.php:29-38 registers in system panel = Platform Administration | fixed |
| releases.md | latest 1.0.0 (Jul 7, 2026) | core.json 1.0.4 | needs decision |
| usage-widgets.md | 4 areas footer/footer bottom/info bar/blog | functions.php sidebars footer_sidebar, footer_bottom_sidebar, info_bar_sidebar, blog_sidebar | ok |

Undocumented features (velura): Spa Booking multi-vendor mode (Vendors, Earnings ledger, Withdrawals menus gated by setting, SpaBookingServiceProvider.php:175-201; VendorDemoSeeder); customer accounts (Controllers/Customers); widgets list (footer-links, info-bar, footer-bottom, recent-posts, tags...) not enumerated.

Needs decision (velura): theme.json presets missing vs docs installer claim; releases.md stuck at 1.0.0 vs 1.0.4; admin menu label "SpaBooking" (no space) in plugin lang.

## isak
HEAD fb4db5a6 2026-10-28 | product version 1.0.10 | theme.json version 1.0.0, no presets (single homepage)

| page | claim in docs | code evidence (file:line) | action |
|---|---|---|---|
| usage-ui-block.md | "8 main shortcodes" only | 12: + blog-posts (shortcodes-blog.php:23, plugin), faqs (shortcodes-faq.php:22), newsletter (shortcodes-newsletter.php:19), pricing-plans (shortcodes.php:644) | fixed (added "Additional Shortcodes" table) |
| usage-theme-options.md | User Profile / Styles / Footer tables incomplete | theme-options.php:42-77 Hero Greeting, Hero Name Line 1/2, Hero Tagline, Sidebar Rotating Words; :110 Enable Sidebar Backdrop; :140 Button Text Color; :197-234 Show Center Logo, Center Logo (+dark), Show Bottom Logo, Bottom Logo (+dark) | fixed (rows added) |
| usage-theme-variants.md | "Video Variant (V1 or V2)" option; "two built-in video variants" | partials/meta-boxes/theme-settings.blade.php only theme_variant, background_type, background_image; partials/body-background.blade.php:5 single overlay-3.mp4 | fixed (row removed, bullet reworded) |
| usage-theme-variants.md | variants V1 Silver Dawn/Midnight Fade, V2 Lavender Stone/Charcoal Mist, V3 Ocean Breeze/Forest Shadow; meta box "Theme Settings" | theme-settings.blade.php:4-6; functions.php:80-82 | ok |
| usage-widgets.md | only Footer Sidebar | functions.php:31-47 also panel_sidebar, top_footer_sidebar | fixed (added) |
| usage-dark-light-mode.md | Theme Styles -> Default Theme Mode | theme-options.php:116,124 | ok |
| usage-portfolio.md | Portfolio -> Projects / Services; service_image_1/2 | portfolio PortfolioServiceProvider.php:52-105; themes/isak/functions/functions.php:259-270 | ok |

Undocumented features (isak): Portfolio plugin menus Service Categories, Packages, Quotation Requests, Custom Fields (PortfolioServiceProvider.php:69-105); typography EB Garamond / Apfel Grotezk (functions.php:51-52); plugins announcement, rss-feed, request-log, faq present but not in index features.

Needs decision (isak): none.

## qore
HEAD 3b46c55f 2026-10-28 | product version 1.0.8 | theme.json version 1.0.0, no presets

| page | claim in docs | code evidence (file:line) | action |
|---|---|---|---|
| usage-ui-block.md | 16 shortcodes (hero..contact-form) | themes/qore/functions/shortcodes.php: benefits brands contact-form contact-info contact-map cta faq features hero hero-about how-to pricing showcase stats teams testimonials (16) | ok |
| usage-theme-options.md | Background Type Video/Image/Default, Primary `#1b4ef5`, Action Button "Get started", copyright default | theme-options.php:15-84 | ok |
| usage-theme-options.md | fonts Geist / Mono / Grotesk | functions/functions.php:62-64 | ok |
| usage-widgets.md | 7 widget areas incl. Footer Bottom; widgets Site Information/Logo/Copyright/Blog Posts/Contact Form/Custom Menu | functions.php:18-55 sidebars; themes/qore/widgets/* | ok |
| usage-animations.md | classes wow, pst-*, rotate-*, hacker-text_transform | present in theme assets/partials | ok |
| index.md | "15+ Shortcodes" | 16 | ok |

Undocumented features (qore): Portfolio plugin bundled (platform/plugins/portfolio) not mentioned in index; announcement, rss-feed, request-log plugins.

Needs decision (qore): none.

## restoria
HEAD 9adbd42c 2026-10-30 | product version 1.1.12 | theme.json version 1.0.0, no presets (5 homepages are pages in database/seeders/PageSeeder.php:28,165,324,479,622)

| page | claim in docs | code evidence (file:line) | action |
|---|---|---|---|
| index.md | "5 Menu Layout Styles" | restaurant-menu style-1..style-6 (functions/shortcodes-restaurant.php:78-100; partials/shortcodes/restaurant-menu/styles/style-6.blade.php) | fixed -> 6 |
| index.md | 3 reservation form styles; 5 homepages | shortcodes-restaurant.php:350-365 (3 styles); PageSeeder 5 home pages | ok |
| usage-ui-block.md | no shortcode list at all | 12 shortcodes in functions/shortcodes*.php (about, chef, contact, gallery, hero-banner, news, reserve, restaurant-menu, services, special-offer, testimonials, why-choose-us) | fixed (added Available Shortcodes table) |
| usage-theme-options.md | Styles: 5 colors only; no Header/Footer/General sections | theme-options.php:9-435 Header (Show Header Top, Show Book Table Button, colors), Footer colors, Styles 12 colors, General (Site Title, Restaurant Address, Email, Opening Hours, Booking Phone, Book Table URL, 404 image, Back to Top, Hotline, Preloader Text, split-text animation); fonts Urbanist/Fraunces functions.php:34-35 | fixed (added) |
| usage-theme-options.md | Breadcrumbs "Enable Breadcrumbs" toggle | theme only has breadcrumb background image (theme-options.php:281) | needs decision (core may provide) |
| usage-widgets.md | Info bar + Blog sidebar descriptions copy-pasted from footer ("1 site-information + 3 simple menu widgets") | functions.php sidebar descriptions; database/seeders/WidgetSeeder.php:100-138 (InfoBarWidget; RecentPosts/BlogCategories/Tags) | fixed |
| faq.md:206 | Backup at `Admin → Tools → Backup` | backup plugin registers in system panel (Platform Administration) | fixed |
| faq.md:80-105,185-200 | reservation: SMS, waitlist, table assignment, capacity control; online ordering w/ payment gateways, discount codes; deposits / booking & no-show fees | plugins/restaurant: Reservation fillable = name,email,phone,date,time,guests,special_requests,status,admin_notes (src/Models/Reservation.php); settings only time format/interval; no payment/ecommerce plugin in platform/plugins | needs decision (FAQ overclaims; rewrite or remove) |
| releases.md | latest 1.0.0 (Aug 22, 2025), "5 menu layout styles" | core.json 1.1.12; 6 styles now | needs decision (history kept) |

Undocumented features (restoria): Restaurant plugin admin (Restaurant -> Menu Categories, Menu Items, Reservations, Booking Calendar, Chefs, Currencies, Settings; RestaurantServiceProvider.php:56-118) has no dedicated usage page; reservation time format/interval settings.

Needs decision (restoria): FAQ overclaims above; releases stale; WidgetSeeder seeds header_sidebar + footer_primary_sidebar which are not registered (code bug, not docs).

## travlla
HEAD b8ab5c1a 2026-11-03 | product version 1.0.3 | theme.json no version, presets Main + Home 2..5, required_plugins [tour-manager]

| page | claim in docs | code evidence (file:line) | action |
|---|---|---|---|
| usage-ui-block.md | 21 shortcodes, no hero-search | 22: hero-search "Hero Search Banner" in themes/travlla/functions/shortcodes*.php | fixed (row added) |
| api-reference.md | endpoint tables | plugins/tour-manager/routes/api.php: coupons/apply + coupons/remove (:98-99, auth:sanctum), vendor reviews/{id}/reply (:130) missing | fixed (rows added) |
| api-reference.md | bookings Optional auth, throttle | api.php:53-59 bookings group outside auth (throttle:20,1) | ok |
| public/travlla/api-docs/* (openapi, postman, index.html) | generated spec | lacks coupons/apply, coupons/remove, vendor/reviews/{id}/reply | needs decision (regenerate; asset not edited) |
| usage-theme-options.md | Map Settings tab (provider + API key) | no map option in themes/travlla/functions/theme-options.php nor tour-manager HookServiceProvider.php | fixed (section removed) |
| usage-theme-options.md | Header "text/background colors, action buttons with labels/URLs/icons" | theme-options.php:26-78 header_style (Transparent/Social Nav/Top Bar), header top, announcement, phone, email, address, transparent on homepage, sticky, logo dark | fixed |
| usage-theme-options.md | Footer "bottom background color" | theme-options.php:131-194 bg/border/heading/text colors, bg image, color variant, connect title, about, phone, email, address, social URLs | fixed |
| usage-theme-options.md | Styles / Breadcrumb / Blog / Tour Manager descriptions | theme-options.php:82-125, 198-217, 222-252, 330-380 | fixed (reworded to real fields) |
| usage-theme-options.md | no Destination Page / Side Panel / Miscellaneous tabs | theme-options.php:256-300 Side Panel, Miscellaneous (preloader, coming soon, maintenance); Destination Page (features, pricing plans) | fixed (added) |
| usage-widgets.md | Footer widget area (Site Information, Custom Menu, Contact Information) | functions.php registers only tour_detail_before_reviews, tour_detail_bottom_sidebar, above_blog_list_sidebar, blog_sidebar; no footer sidebar | fixed (Widget Areas table + tip) |
| index.md / usage-homepage.md | 5 homepages | theme.json presets (5) | ok |
| releases.md | latest 1.0.0 (Jun 25, 2026) | core.json 1.0.3 | needs decision |

Undocumented features (travlla): vendor/multi-vendor (vendor API, withdrawals, revenue, category commission models), payment gateways Stripe/PayPal/Paystack/Razorpay/SSLCommerz, taxes, invoices, tour reviews, messages, tour departures/pricing tiers/itineraries/highlights (tour-manager src/Models) — none in index features; widget tour-disclaimer; no usage page for tour-manager admin.

Needs decision (travlla): API spec assets out of date; releases stale.

## homzen
HEAD 84e1e5112 (2026-10-29), product 1.3.12 (core.json), theme.json 1.0.0, required plugins blog/contact/language/location/real-estate

| page | claim in docs | code evidence (file:line) | action |
|---|---|---|---|
| mortgage-calculator.md | `enable_lazy_loading` param row, "Lazy Loading" feature bullet, `enable_lazy_loading="yes"` in 2 examples | plugins/fob-mortgage-calculator/src/Providers/HookServiceProvider.php:35 `shortcode()->ignoreLazyLoading(['mortgage-calculator'])`, so the attribute is ignored | fixed (removed) |
| mortgage-calculator.md | `currency` default `$` | Supports/MortgageCalculatorHelper.php:83-84: site currency symbol (`get_application_currency()`) overrides it | fixed (clarified as fallback) |
| mortgage-calculator.md | troubleshooting `php artisan vendor:publish --tag=public` | core/base/src/Commands/PublishAssetsCommand.php:8 `cms:publish:assets` (publish tag is `cms-public`, LoadAndPublishDataTrait.php:160) | fixed |
| mortgage-calculator.md | `background_color` param | not in plugin form, but applied by core to every shortcode: packages/shortcode/src/Compilers/Shortcode.php:72 | kept (told lead; flex-home row restored) |
| mortgage-calculator.md | other params, defaults, 5 form styles, 6 sizes | Supports/MortgageCalculatorConfig.php, Shortcodes/MortgageCalculatorShortcode.php:54-120 | OK |
| mortgage-calculator.md | "Supported Currencies" table (15 codes) | no such list in code; symbol comes from site currency or a free-text field | needs decision |
| real-estate.md | "Admin -> Real Estate -> Settings" | no Settings item in the RE menu (RealEstateServiceProvider.php:245-430); settings are in PanelSections/SettingRealEstatePanelSetting.php | fixed -> "Admin -> Settings -> Real Estate" (same as flex-home) |
| real-estate.md | "Display view count", "Review" | lang/en/settings.php:22,25 "Display views count in the detail page?", "Enable review?" | fixed |
| real-estate.md | tabs General/Currencies/Accounts/Invoice | panel also has Invoice Template and Webhook (SettingRealEstatePanelSetting.php:41,47) | missing-doc |
| index.md | payments "PayPal, Stripe, Razorpay, and Paystack" | platform/plugins also has mollie/, sslcommerz/ | fixed (added Mollie, SSLCommerz) |
| index.md | "RSS feeds for posts and properties properties" | rss-feed plugin present; duplicated word is a typo | needs decision (typo only) |
| usage-homepage.md | Hero Banner has 5 styles | functions/shortcodes.php:265 range(1,5) | OK |
| usage-homepage.md | lists 6 UI blocks + "many more" | 21 shortcodes: about-us, call-to-action, coming-soon, content-image, content-quote, content-tab, faqs, featured-projects, image-slider, pricing-plan, projects, property-categories, search-box, services, mortgage-calculator… | missing-doc |
| usage-menu.md | location "Main Navigation" | packages/menu/src/Providers/MenuServiceProvider.php:79 | OK |
| usage-theme-options.md | General, Real Estate, Logo, Typography, Styles (primary, footer bg, login modal), Social Links, Social Sharing | theme-options.php:24-80 (also hover color, header colors, sticky header, mobile switcher style); Breadcrumb + Blog sections exist (:172-214, :325) | OK; Breadcrumb/Blog/header options missing-doc |
| usage-widgets.md | 5 sidebars (blog, bottom post detail, top/inner/bottom footer) | functions.php:136-180 also registers property_detail_sidebar, top_property_detail_sidebar, bottom_property_detail_sidebar | missing-doc |

Undocumented features: property-detail sidebars (3) + Property Disclaimer widget (widgets/property-disclaimer); Mortgage Calculator widget in the Widgets page; virtual tour (functions/virtual-tour.php); site-plan-viewer plugin; career, faq, announcement, cookie-consent, ads, language-advanced, captcha, social-login plugins; RE Invoice Template + Webhook settings; property listing layouts (4) in theme options.

Needs decision: Supported Currencies table; "properties properties" typo.

## athena
HEAD a1cae058 (2026-10-28), product 1.3.12, theme.json 1.0.0

| page | claim in docs | code evidence (file:line) | action |
|---|---|---|---|
| usage-ui-block.md | blog-posts "There are seven style display" | functions/shortcode-blog.php:62 range(1,6); 6 images in public/images/shortcodes/blog-posts | fixed -> six |
| usage-theme-options.md | "There are 3 header templates" | theme-options.php:30-45 header_style options 1 and 2 only; images/header-styles/style-1,2.png | fixed -> 2 |
| usage-widgets.md | "five pre-made widget areas", only Primary sidebar described | functions.php:33-70 registers 7 (homepage, top footer, footer, bottom footer, menu, custom 1, custom 2) + core primary_sidebar used in layouts/*-sidebar.blade.php:9 | fixed -> eight; other 7 areas missing-doc |
| index.md | "10 different homepages" | database/seeders/Themes has Main, Home2, Home3 only | needs decision |
| usage-theme-options.md | blog list 3 styles, 4 layouts, preloader, Page homepage/galleries | theme-options.php:230 range(1,3); layouts/ has 4 page layouts; gallery plugin present | OK |
| usage-homepage.md | Theme Options -> Page -> "Your homepage displays" | packages/page/resources/lang/en/pages.php:25 | OK |
| usage-menus.md | Main Navigation, menu item types | menu.php:36 | OK |

Undocumented features: style options (header/footer colors, primary/secondary/text color, fixed footer, back-to-top, logo height/dark logo, tagline, suggested search keywords); post detail/category/author layouts; plugins fob-comment, member (account login), gallery, note, request-log, ads, announcement, cookie-consent, rss-feed.

Needs decision: "10 different homepages" vs 3 seeded demo sets (could be a marketing count of layout combos).

## carento
HEAD ec7f5c3fa (2026-11-03), product 1.2.12, theme.json has no version

| page | claim in docs | code evidence (file:line) | action |
|---|---|---|---|
| usage-theme-options.md | Header: "choose between four different header styles … configure action buttons with custom labels, URLs, and icons" | theme-options.php:27-50 has only display_header_top, header top text/bg color, is_header_transparent, enable_sticky_header; `header_style` / `header_action_buttons` are read in partials/header/action-buttons but never registered as options; only styles/style-2.blade.php exists | fixed (lists the real options) |
| usage-theme-options.md | Footer "bottom background color" | theme-options.php:58-76: background, border, heading, text color, background image only | fixed (removed) |
| usage-theme-options.md | Styles: primary, secondary, heading, text color | theme-options.php:86-128 also default theme color mode (light/dark), hide mode switcher, primary hover, badge bg, button text color | missing-doc (dark mode) |
| usage-theme-options.md | Breadcrumb "two different breadcrumb styles" | theme-options.php:226 "Simple breadcrumb" toggle (default vs simple) | OK |
| usage-widgets.md | "five pre-made widget areas" | functions.php:102-138: 7 (top footer, footer, bottom footer, header top, above blog list, blog, off canvas) | fixed -> seven |
| usage-widgets.md | footer widget "Custom Menu" | WidgetSeeder uses CoreSimpleMenu = "Simple Menu" (packages/widget/resources/lang/en/widget.php:23) | fixed |
| usage-ui-block.md | `[hero-banners …]` example with content_1..3, quantity | functions/shortcodes.php:319-347 | OK |
| index.md | "Business Consulting features: vehicles, pricing, bookings…" | copy-paste wording; car-manager plugin is the core feature | needs decision |

Undocumented features (big gap): whole car-manager plugin (cars, bookings, car services, coupons, taxes, invoices, customers, reviews, messages, push notifications; settings forms CarFilter/Currency/Customer/General/Invoice/Permalink/Review/Tax in plugins/car-manager/src/Forms/Settings); payment gateways paypal/stripe/razorpay/paystack/sslcommerz; car detail styles option (theme-options.php:259); 3 demo homepages (Main/Home2/Home3); faq, team, testimonial, simple-slider, location, fob-comment plugins; ~30 shortcodes (car-advance-search, car-list, car-loan-form, check-car-availability, cars-by-locations, car-types, pricing, branch-locations…).

Needs decision: index "Business Consulting" line.

## infinia
HEAD e05c9f8a (2026-10-28), product 1.1.12, theme.json 1.0.0

| page | claim in docs | code evidence (file:line) | action |
|---|---|---|---|
| usage-widgets.md | "five pre-made widget areas" | functions.php:86-141: 10 sidebars (blog top, footer primary/top/bottom, header, header top start/end, service/project/team details) | fixed -> ten |
| index.md | "5 different homepages" | database/seeders/Themes: Main, Home2-5 | OK |
| usage-theme-options.md | Header (sticky, top bar, colors, layout Full Width/Container) | theme-options.php:18-50 | OK |
| usage-theme-options.md | Footer colors + bg image | theme-options.php:54-76; also decoration images (:78-86) | OK; decoration images missing-doc |
| usage-theme-options.md | Styles: theme mode System/Light/Dark, switcher, animation, back to top, colors | theme-options.php:96-169 (also dark light/soft, bg 2, bouncing blob colors, select text color) | OK |
| usage-theme-options.md | Breadcrumbs enable + bg image | core HookServiceProvider.php:263 theme_breadcrumb_enabled; theme-options.php:181-189 (also bg color) | OK |
| usage-homepage.md, usage-menus.md, usage-ui-block.md | generic flow, hero-banner | shortcodes.php:39 hero-banner | OK |

Undocumented features: ~45 shortcodes (pricing-plans, compare-plans, project-tabs, teams, work-process, app-downloads, …); blog list style (2), preloader image, 404 image, suggest keywords; career, faq, portfolio, team, testimonial, simple-slider plugins (Portfolio/Team sections are only one line each).

## zelio
HEAD e073ca78 (2026-10-28), product 1.2.12, theme.json 1.0.0

| page | claim in docs | code evidence (file:line) | action |
|---|---|---|---|
| usage-widgets.md | "five pre-made widget areas" | functions.php:69-82: footer, panel, top footer + core primary_sidebar used in layouts/sidebar.blade.php:8 = 4 | fixed -> four |
| index.md | "3 different homepages" | database/seeders/Themes: Main, Code, Write | OK |
| usage-theme-options.md | stub page (intro only, 7 lines) | theme-options.php: Styles (primary color, gradient color, default color mode, hide mode switcher, animations, header style 1-3, footer style 1-3, preloader style 1-3/disabled), Footer (background), Logo (site name, logo dark), Blog (post item style 1-3, items per row, featured image in detail, posts per page), Page (404 image) | missing-doc (substantial) |
| usage-homepage.md, usage-menus.md, usage-ui-block.md | generic flow, hero-banner | shortcodes.php:402 hero-banner | OK |

Undocumented features: all the theme options above; portfolio plugin + shortcodes (shortcodes-portfolio.php); galleries, faq, testimonial, newsletter shortcodes; fob-comment, rss-feed, request-log plugins.

Needs decision: none.

## gerow — HEAD 38f198182 (2026-10-28), core.json 1.8.12, Laravel ^13.0

| page | claim in docs | code evidence | action |
|---|---|---|---|
| usage-widgets.md:149,159 | sidebar **Bottom footer** | functions/functions.php:113 `Footer Bottom` | fixed |
| usage-widgets.md:167 | sidebar **Bottom footer style 1** | functions/functions.php:119 `Footer bottom style :number` | fixed |
| usage-homepage.md | shortcodes hero-banner, featured-service-categories, about-us-information, brands, featured-services, company-overview, intro-video, featured-projects, contact-block, teams, testimonials, pricing, news | all registered (functions/shortcodes*.php) | ok |
| usage-theme-options.md | tabs Logo / Social links / Styles / Cookie consent | theme-options.php:8,113 + core/cookie-consent | ok |
| usage-widgets.md | widget names Header Logo/Header Menu/Header Action * /Language Switcher; sidebars Header (top) sidebar style 1-3, Footer sidebar (style 1), Pre footer | widgets/*, functions.php:57-107 | ok |
| index.md | "slider…" modules | no simple-slider plugin (has `hero-banner-slider` shortcode) | ok (generic) |

## transp — HEAD 034fe4264 (2026-10-28), core.json 1.9.12

| page | claim in docs | code evidence | action |
|---|---|---|---|
| usage-menus.md:19 | menu row `Footer bottom menu` | database/seeders/MenuSeeder.php:236 `Footer menu` | fixed |
| usage-widgets.md:32,40,48 | sidebar **Footer menu** | functions/functions.php `footer_sidebar` = `Footer sidebar` | fixed |
| usage-homepage.md | shortcodes simple-slider, hero-banner, brands, services, request-quote, pricing, how-it-works, testimonials, projects, faqs, call-to-action, news | all registered (theme shortcodes.php, simple-slider HookServiceProvider:22) | ok |
| usage-theme-options.md | tabs Contact, Logo, Header (button, header top), General (copyright), Social links, Cookie consent | theme-options.php:9-295 | ok |

## jobcy — HEAD c2ba57041 (2026-11-03), core.json 1.21.13 (theme jobcy)

| page | claim in docs | code evidence | action |
|---|---|---|---|
| usage-currencies.md:3 | Admin -> Job Board -> Settings | no admin menu item; PanelSection platform/plugins/job-board/src/PanelSections/SettingJobBoardPanelSection.php:23-28 (Settings → Job Board → "Currency Configuration", lang settings.php:123) | fixed |
| usage-menu.md / usage-widgets.md | footer menus Company, For Jobs, For Candidates, Support | database/seeders/Themes/Jobcy/MenuSeeder.php:170-247 | ok |
| usage-homepage.md | Theme options tab Page → homepage | packages/page HookServiceProvider:63-70 (title `Page`) | ok |
| usage-menu.md | Hotline in theme options | theme-options.php `hotline` | ok |
| index.md | "PSR-2" vs "PSR-12" on other products | — | needs decision (marketing) |

## jobzilla — same repo, theme platform/themes/jobzilla

| page | claim in docs | code evidence | action |
|---|---|---|---|
| usage-currencies.md:3 | Admin -> Job Board -> Settings | same as jobcy | fixed |
| usage-menu.md:23 | footer menus Company, For Jobs, For Candidates, Support (copied from jobcy) | database/seeders/Themes/Jobzilla/MenuSeeder.php:240-313 `For Candidate`, `For Employers`, `Helpful Resources`, `Quick Links` | fixed |
| usage-widgets.md:32 | menu `For Candidates` | MenuSeeder.php:240 `For Candidate` | fixed |
| index.md | "08 Home Page" | Jobzilla/PageSeeder.php Homepage 1-8 | ok |
| index.md | title "Jobigo" vs theme name Jobzilla (theme.json) | theme.json name `Jobzilla` | needs decision (branding) |

## flex-home — HEAD 9f8e50dd1 (2026-11-03), core.json 2.56.12

| page | claim in docs | code evidence | action |
|---|---|---|---|
| real-estate.md:4 | Admin -> Real Estate -> Settings | no RE admin-menu Settings; PanelSection real-estate/src/PanelSections/SettingRealEstatePanelSetting.php (Settings → Real Estate) | fixed |
| real-estate.md:11 | settings **Display view count**, **Review** | real-estate/resources/lang/en/settings.php:22,25 `Display views count in the detail page?`, `Enable review?` | fixed |
| real-estate.md | tabs General/Currencies/Accounts/Invoice | panel also has Invoice Template, Webhook (PanelSection:41-52) | missing-doc |
| mortgage-calculator.md | `enable_lazy_loading` param, "Lazy Loading" feature, example attrs | fob-mortgage-calculator/src/Providers/HookServiceProvider.php:35 `ignoreLazyLoading(['mortgage-calculator'])` → no effect | fixed (removed) |
| mortgage-calculator.md:240 | `php artisan vendor:publish --tag=public` | core/base/src/Commands/PublishAssetsCommand.php:8 `cms:publish:assets` | fixed |
| mortgage-calculator.md | `background_color` param | generic core attr packages/shortcode/src/Compilers/Shortcode.php:72 | ok (kept) |
| mortgage-calculator.md | shortcode `mortgage-calculator`, defaults term 20 / rate 10 / down 20% / color #e31837, styles/sizes/alignments | HookServiceProvider:23, Supports/MortgageCalculatorConfig.php:7-21,23-89 | ok |
| mortgage-calculator.md:135 | "Supported Currencies" table (15 codes) | not in code; currency from cms_currency() or free text field (Shortcode.php:119) | needs decision |

## lara-mag — HEAD 17ee36349 (2026-10-28), core.json 7.6.12

| page | claim in docs | code evidence | action |
|---|---|---|---|
| index.md:66 | "2 themes ready now" | platform/themes/ only `lara-mag` | fixed → "Theme ready to use" |
| index.md / screenshots.md | screenshots hosted on botble.com | — | not checked (images) |

## miranda — HEAD 027abfacc (2026-10-29), core.json 1.44.12
| page | claim | evidence | action |
|---|---|---|---|
| index.md | generic CMS features only | hotel plugin present | ok / missing-doc (below) |

## stories — HEAD ec5471d02 (2026-10-28), core.json 1.37.12
| page | claim | evidence | action |
|---|---|---|---|
| index.md | generic CMS features only | — | ok / missing-doc (below) |

Sidebar links for gerow/transp/jobcy/jobzilla/flex-home/lara-mag/miranda/stories all resolve to existing files.

### Undocumented features (this block)
- gerow: plugins portfolio, career, team, faq, testimonial, gallery, announcement; theme options Breadcrumb + Portfolios sections, Styles header/footer style options; shortcodes branch-offices, coming-soon, content-collapse, faqs, google-map, hero-banner-slider, request-quote, services-list, site-statistics, team-skill, why-choose-us, featured-specialty.
- transp: logistics plugin (services, service categories, packages, quotation requests, custom fields, parcel tracking `track-your-parcel` shortcode) — no doc page; theme options Blog post style, Preloader, 404 image.
- jobcy/jobzilla: whole job-board plugin (jobs, companies, candidates/employer accounts, packages/credits, payments PayPal/Stripe/Paystack/Razorpay/SSLCommerz, invoices + invoice template, job board general settings, reviews) — no usage pages; theme options pages are 2-line stubs (jobcy: Job board section post_a_job_url, apply-button style, job detail header style; jobzilla: jobs_list_page_layout, breadcrumb, blog style).
- flex-home: no theme-options/homepage/menu/widgets pages; RE plugin (properties, projects, accounts, packages, consults, reviews, webhooks) undocumented beyond settings screenshots.
- lara-mag: plugins author, note, fob-comment, request-log, ads; theme options & shortcodes (short-codes.php) undocumented.
- miranda: hotel plugin (rooms, room categories, amenities, features, foods, services, places, taxes, coupons, bookings + calendar + reports, iCal sync, invoices, reviews, customers) — no usage pages.
- stories: fob-comment, rss-feed, ads plugins; theme options (13K) and shortcodes (42K) undocumented.

### Needs decision (this block)
- jobzilla/index.md title "Jobigo" vs theme name Jobzilla.
- flex-home/mortgage-calculator.md "Supported Currencies" table unverifiable in code.
- jobcy/flex-home/lara-mag/miranda/stories index "PSR-2 ... Validated by Codeship" marketing claims (Codeship defunct).


## Unresolved questions
- Add norio + snapcart to bin/shell_cmd.sh sync list (their api.md/license.md copies are stale vs docs/cms)?
- Who writes release notes for snapcart 1.0.9, velura 1.0.4, restoria 1.1.12, travlla 1.0.3?
- velura: installer presets missing from theme.json, but docs promise Home 1-9 choice — fix code or docs?
- restoria FAQ overclaims (SMS, waitlist, online ordering, deposits) — remove?
- athena "10 different homepages" vs 3 seeded demo sets?
- travlla public/travlla/api-docs spec missing 3 endpoints — regenerate?
- Large undocumented plugins (job-board, hotel, logistics, car-manager, RE) — write usage pages?

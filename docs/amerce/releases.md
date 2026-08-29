# Release Notes

This page contains the release notes for Amerce, detailing the changes and improvements in each version.

## Version 1.0.8 - August 7, 2026

### New Features

- **AI crawler policy**: New setting that writes the matching rules into `robots.txt`.
- **Public cache headers**: New setting so a CDN or proxy can serve guest pages.
- **Centered cookie consent popup**: A new centered popup style for the cookie consent banner.
- **Anchor links on blog headings**: Optional permalink anchors on blog post headings.
- **Persian (Farsi) translations** added, and the Japanese translation completed.

### Improvements

- Faster page loads - cached font styles are now linked instead of repeated on every page.
- Faster menu rendering on deeply nested menus.
- Better blog post structured data and article meta tags.

### Bug Fixes

- Fixed product tab blocks disappearing when the first tab has no products.
- Fixed out-of-stock products not sorting last in product tabs and imported catalogs.
- Fixed the Insert button being unreachable in the media library on short screens.
- Fixed line breaks being removed inside `script`, `pre` and `textarea` blocks when minifying HTML.

## Version 1.0.7 - July 28, 2026

### New Features

- **Footer menu widget** that can reuse an existing menu built under Appearance → Menus.
- **Filter products by star rating**, with an option to enable or disable it.
- **Security hardening** for outgoing emails, PDF generation, and template rendering (security patch).
- **Folder image browsing** in the media lightbox, with a new folder summary status bar.
- **Retry option for failed media uploads**.
- **Core Version** is now shown on the System Information page.

### Improvements

- Shop filters: working category filter, reliable price slider, and a matching rating filter.
- Media upload experience with clearer progress and accurate per-file results.

### Bug Fixes

- Fixed prices not formatting or filtering correctly where a comma is the decimal separator.
- Fixed the Enable Quick Shop option being ignored in product list view.
- Fixed sold-out products showing in homepage blocks, and sorted them last.
- Fixed the live viewers row showing when the count is zero.
- Fixed product filter forms breaking with nested query parameters.
- Fixed accents above capital letters being clipped in the banner marquee.
- Fixed sticky header pinning, double-step quantity, and size popup issues.
- Fixed radio fields rendering incorrectly with blank options or custom theme classes.
- Fixed contact form custom fields: dropdown options box, field registration, and optional email.
- Fixed the base language name changing when two locales share the same code.
- Fixed the media library filter sending the wrong file type on mobile.
- Fixed a finished upload batch clearing files from a later upload.
- Fixed responsive image sizes when the base image has no height.
- Fixed HTML entities showing in `llms.txt` output.

## Version 1.0.6 - July 10, 2026

### New Features

- **Hide sticky header on scroll down** option - turn it off to keep the header pinned to the top at all times.
- **Override main bar colours** switch, off by default, so each header style keeps its own colours until you choose your own.

### Bug Fixes

- Fixed the Main bar background and Main bar text colours under Theme Options → Header having no effect on the header.
- Fixed the Sticky header option only removing the header's drop shadow instead of actually un-sticking the header.

## Version 1.0.5 - July 7, 2026

### New Features

- **Loading animation** on the product gallery and price while a variation is switching.

### Improvements

- Theme asset versioning, so updated scripts and styles load reliably after an update instead of serving a cached copy.

### Bug Fixes

- Fixed unavailable product variations (sizes and colours) staying clickable - they now disable automatically instead of showing a "Please select attributes" message.

## Version 1.0.4 - June 27, 2026

### New Features

- **Admin settings for previously hardcoded theme content**.
- **Editable footer features strip** and a **footer menu widget**.
- **Enhanced Conversions** support for website tracking (Google Ads).
- **Dynamic `llms.txt` fallback** for AI crawlers.

### Improvements

- Customer dashboard redesigned to match the theme design.
- Overall UI improvements.
- Faster pages - cookies are stripped on publicly cacheable responses.
- Cookie consent accessibility (WCAG contrast and accessible dialog labels).
- Comment validation.

### Bug Fixes

- Fixed the currency symbol display in client-side prices.
- Fixed spacing on the become-a-vendor form.
- Fixed image fields not saving in shortcode tab items beyond the first.
- Fixed layout shift from lazy-loaded images by resolving their dimensions.
- Fixed paid plugins not opening the purchase page from the plugin detail modal.
- Fixed the email logo aspect ratio and restored footer social links in emails.
- Fixed sub-folder installations not resolving URLs correctly.

## Version 1.0.3 - June 9, 2026

### Bug Fixes

- Fixed the "Notify me when available" button on out-of-stock products not opening the Back in Stock popup - its modal trigger was being removed during content sanitisation.
- Fixed plugin content injected on the product detail page (Back in Stock, reviews/comments, extra tabs, ads, and other hook-based widgets) losing its interactive attributes, so its buttons and popups now work on click.

## Version 1.0.2 - June 3, 2026

### Improvements

- Updated the bundled Botble platform with the latest fixes and improvements.

### Bug Fixes

- Fixed the two-column FAQ (side call-to-action) layout not being selectable in the page builder and reverting to accordion after editing a page.
- Fixed plugin content such as Loyalty points and E-wallet not rendering on the product and cart pages.
- Fixed the Back in Stock notify form on out-of-stock products ignoring its Modal or Inline display-mode setting.
- Fixed applied coupon discounts going out of sync with the cart - they are now removed automatically when no longer applicable.
- Fixed the Recently Viewed Products shortcode not rendering, and the theme erroring on older Ecommerce plugin versions.
- Fixed the Simple Slider per-slide button label not being kept when saving.
- Fixed an order update error caused by orders with negative totals during payment reconciliation.
- Fixed horizontal page drag on mobile when a section overflows the viewport.

### Removed

- Removed the non-functional Card hover effect option - hover is controlled by the card style. The style-2 card action buttons are now contained within the card.

## Version 1.0.1 - May 28, 2026

### New Features

- **Per-slide custom button label** for the Simple Slider.
- **Sidebar Bullets widget** for the product detail sidebar.
- Social login buttons now render inside the sign-in and register popups.

### Improvements

- Faster homepage hero loading and reduced layout shift when popups open.

### Bug Fixes

- Fixed the shop page sidebar filter (Left and Right layouts) not opening on mobile and tablet.
- Fixed Load More and Infinite scroll pagination not loading additional products on the shop page.
- Fixed the product image lightbox stretching square and landscape images.
- Fixed the newsletter popup "Don't show again" checkbox being invisible.
- Fixed Hero Sm and Hero Md thumbnail sizes failing to save with a height error.
- Fixed mobile cart, sticky product bar, and header logo display issues.

## Version 1.0.0 - May 19, 2026

### Initial Release

First release of Amerce - Multipurpose eCommerce & Multivendor Marketplace Laravel script built on Botble CMS.

### Features

- **20 niche home presets**: Fashion, Electronics, Furniture, Cosmetic, Organic, Jewelry, Sport, Sneaker, Headphone, Pod, Baby, Pet Care, Auto, Construction, Bags & Accessories, Home Decor, Garden, Wellness, Office Equipment, Fashion Modern.
- **47 shortcodes** (46 theme-native + 1 simple-slider override) for fully visual homepage editing via the UI Block builder.
- Built-in **multivendor marketplace** support.
- **14 header styles** and **9 footer styles**, each configurable through theme options.
- Full eCommerce coverage: discounts/coupons, tax rules, flash sales, order returns, abandoned carts, cart persistence, wishlist, compare, reviews, digital products, product variations, product specifications, product options, import/export.
- Multiple payment gateways: PayPal, Stripe, Paystack, Razorpay, Mollie, SSLCommerz, COD, plus a developer integration guide for custom gateways.
- Multiple shipping methods: flat rate, free shipping, shipping by location, Shippo integration, custom provider hooks.
- Multi-language with RTL support.
- Google Analytics, Google Tag Manager, Facebook Pixel integration.
- Newsletter, abandoned-carts recovery, customer reviews, and webhook system.
- Demo-data seeders per niche preset - one command reproduces the live demo for that niche.

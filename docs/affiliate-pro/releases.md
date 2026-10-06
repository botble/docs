---
title: Release Notes
description: Changelog for Affiliate Pro.
---

# Release Notes

Before updating, read the [Upgrade Guide](./upgrade.md).

## Version 1.2.11 – Oct 06, 2026

- Added rejection reason when rejecting an affiliate application, shown to the customer, who can now re-apply
- Added affiliate coupon attribution: orders using an affiliate's coupon are credited to that affiliate
- Added commission reversal for cancelled orders and completed (including partial) returns
- Added Stripe account connection on the affiliate withdrawal form (with the Stripe Connect plugin)
- Added conversion tracking for short links
- Added separate permissions for approving commissions and withdrawals
- Commission is now calculated on the price after discounts, and rates are capped at 100%
- Affiliates no longer earn commission on their own orders
- The Auto Approve Commissions setting is now respected (on by default)
- Marketplace: the affiliate commission is charged to the vendor as a separate revenue entry and refunded when the commission is reversed
- Product affiliate settings can only be changed by admins
- Email templates can now be turned off for every affiliate email
- PayPal withdrawals now require a valid email address
- Short links count each visit once, set the referral cookie directly, only point to your store and only work for approved affiliates
- Fixed the affiliate link shown on the admin affiliate detail page
- Fixed the withdrawal form scripts not running on some themes
- Fixed balance updates to prevent double payouts and overdrafts
- Fixed admin menu and table permissions, report date ranges and customer totals
- Fixed custom payout methods not being saved on withdrawal requests
- Replaced CDN chart libraries with bundled copies
- Completed translations for all languages

## Version 1.2.9 – Jun 01, 2026

- Upgraded to Laravel 13
- Improved caching and database performance
- Improved overall stability and compatibility

## Version 1.2.8 – Jan 28, 2026

- Added affiliate commission deduction into marketplace revenue calculations
- Added Enable Affiliate toggle per product with custom commission percentage option
- Added default commission rate info display in product settings
- Fixed commission tracking issue when using Redis queue connection
- Fixed report display issues
- Improved migrations to be idempotent with table/column existence checks
- Improved reporting functionality

## Version 1.2.5 – Jan 09, 2026

- New "Period Commission" display — shows commissions earned during selected time periods in reports
- New "Products Enabled Affiliate" widget — shows how many products have affiliate tracking turned on
- Order affiliate info section — easily see which affiliate referred each order
- Fixed long URL tracking — very long referral URLs are now saved correctly without being cut off
- Improved database stability — plugin installs and updates more reliably without errors
- Fixed report display issues — enhanced reports widget now displays correctly
- Updated all plugin screenshots

## Version 1.2.3 – Dec 08, 2025

- Added member levels to reward top-performing affiliates
- Added short links management to create and track custom affiliate links
- Affiliate balance is updated automatically when a withdrawal request is rejected
- Email notification sent to affiliates when their account is banned or unbanned
- Fixed commission not recorded for some orders
- Fixed short links not working correctly
- Fixed product affiliate settings could not be saved
- Fixed affiliate rules not displaying correctly
- Fixed coupon page not loading properly
- Improved translation system for better multi-language support

## Version 1.2.2 – Nov 03, 2025

- Fully translated to 40+ languages: Arabic, Bengali, Chinese, Dutch, French, German, Hindi, Italian, Japanese, Korean, Persian, Portuguese, Russian, Spanish, Turkish, Vietnamese and more
- Improved UI of the customer affiliate dashboard

## Version 1.2.0 – Sep 01, 2025

- Added option to configure the commission rate for each affiliate
- Added affiliate detail page in the admin panel with stats for each affiliate
- Added option to block (ban) an affiliate account
- Added option to enable/disable payout methods
- Fixed UI issues on mobile devices
- Fixed some translation issues
- Improved performance with more efficient database queries
- Compatible with the latest version of Botble E-commerce scripts

## Version 1.1.0 – Jun 08, 2025

- Improved short links
- Improved affiliate reports page
- Correct commission calculation when an order is placed
- Added commission info to the product detail page
- Improved UI

## Version 1.0.0 – May 2025

- Core affiliate marketing functionality
- Affiliate registration and approval system
- Commission tracking and management
- Withdrawal processing with multiple payment methods
- Comprehensive affiliate dashboard
- Marketing tools and promotional materials
- Click and conversion tracking
- Performance reports and analytics
- Multi-language support
- Email notification system

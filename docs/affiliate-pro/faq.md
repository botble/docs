---
title: FAQ
description: Frequently asked questions about Affiliate Pro.
---

# FAQ

## General

### What does Affiliate Pro need to run?

Botble CMS 7.5.0+, PHP 8.3+, the E-commerce plugin, and MySQL 5.7+ / MariaDB 10.3+.

### Is it compatible with the Marketplace plugin?

Yes. The affiliate commission is deducted from the vendor's revenue for the referred order. Per-product affiliate settings are managed by admins. See [Marketplace Integration](./marketplace-integration.md).

### Can customers become affiliates without my approval?

Yes — turn on **Auto Approve Affiliates** in [Configuration](./configuration.md#registration-approval). Otherwise applications wait in **Affiliate → Pending Requests**.

## Tracking & Commissions

### How is a sale attributed to an affiliate?

By the referral cookie first: when a visitor opens a link with `?aff=CODE` (or a `/go/...` short link), the `affiliate_code` cookie is saved for the configured number of days, and orders placed in that browser are credited to the affiliate. If there is no valid cookie, an order that uses an affiliate's coupon code is credited to the coupon's owner.

### What if two affiliates refer the same visitor?

The **last** link clicked wins — each click replaces the cookie.

### Does using an affiliate's coupon credit the affiliate?

Yes. An order that uses an affiliate coupon is credited to that affiliate, unless the customer has a referral cookie from another affiliate's link — the cookie wins. See [Coupons & Short Links](./usage-coupons-short-links.md#affiliate-coupons).

### Can affiliates earn commission on their own orders?

No. Orders placed with the affiliate's own customer account never earn a commission, whether they use their link or their coupon.

### How is the commission calculated?

`(product price × quantity − the product's share of the order discount) × rate` for each product, summed per order. Shipping and tax are excluded. The rate is chosen in this order: product rate → category rate → affiliate's custom rate or default rate (× member level multiplier). See [Which Rate Is Used?](./configuration.md#which-rate-is-used).

### Can I set different rates per product or category?

Yes. Per product on the product edit page, per category group in settings, and per affiliate on the affiliate edit page.

### When does an affiliate get paid?

The commission is **Pending** when the order is placed. It becomes **Approved** (added to the balance) when the order is completed — automatically by default, or manually in **Affiliate → Commissions** if you turned **Auto Approve Commissions** off. The affiliate can then request a withdrawal. See [Commissions](./usage-commissions.md).

### What happens if an order is cancelled or refunded?

When the order is cancelled, a pending commission is rejected and an approved one is reversed from the affiliate's balance. When an order return is completed, the returned share of the commission is reversed.

## Payouts

### Which payout methods are supported?

Bank Transfer, PayPal, Stripe and Other. Automatic payouts are available with the PayPal Payout and Stripe Connect plugins. See [Withdrawals](./usage-withdrawals.md).

### Can I change the minimum withdrawal amount?

Yes — **Minimum Withdrawal Amount** in [Configuration](./configuration.md#withdrawals).

## Customization

### Can I change the affiliate dashboard design?

Yes. Copy the view you want to change from `platform/plugins/affiliate-pro/resources/views/themes/customers/` to `resources/views/vendor/plugins/affiliate-pro/themes/customers/` (same file name) and edit the copy. Your changes survive plugin updates.

### Can I translate the plugin?

Yes. Translations for 40+ languages are included. Edit them in **Settings → Localization → Other Translations** (requires the Translation plugin), group `plugins/affiliate-pro`. See [Translation](/cms/plugin-translation).

### Can I add my own payout method?

Yes, with the `affiliate_pro_payout_methods` filter (for example in your theme's `functions.php`):

```php
add_filter('affiliate_pro_payout_methods', function (array $methods) {
    $methods['wise'] = [
        'is_enabled' => true,
        'key' => 'wise',
        'label' => 'Wise',
        'fields' => [
            'payment_details' => [
                'title' => 'Wise email',
                'rules' => 'email|max:120',
            ],
        ],
    ];

    return $methods;
});
```

The method appears in the affiliate's withdrawal form. Affiliates enter their account details in the **payment details** field, which is validated with the `rules` of the method's first `fields` entry (its `title` is used in error messages). You pay them manually and approve the request.

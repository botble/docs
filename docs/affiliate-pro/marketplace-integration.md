---
title: Marketplace Integration
description: How Affiliate Pro works with the Botble Marketplace plugin — vendor controls and commission deduction from vendor revenue.
---

# Marketplace Integration

When the **Marketplace** plugin is active, Affiliate Pro works with vendors automatically. No extra setup is needed.

## Who Pays the Affiliate?

The affiliate commission is **deducted from the vendor's revenue** for that order, because the vendor benefits from the referred sale.

| Example: $100 product, 10% marketplace fee, 5% affiliate rate | Amount |
|---|---|
| Product price | $100.00 |
| Marketplace fee | −$10.00 |
| Affiliate commission | −$5.00 |
| **Vendor revenue** | **$85.00** |

Marketplace splits a multi-vendor cart into one order per store, so each vendor only pays the commission on their own products.

### How It Appears in the Vendor's Revenue

When the order is completed, Marketplace credits the vendor as usual. Affiliate Pro then adds a separate deduction to the vendor's revenue history:

| Revenue entry | Type | Amount |
|---|---|---|
| Order revenue (from Marketplace) | Add amount | $90.00 |
| Affiliate commission for order #SF-10000123 | Subtract amount | $5.00 |

The vendor's balance and total revenue go down by the commission. The deduction never exceeds what the vendor earned on the order.

If the commission is later reversed — the order is cancelled or a return is completed — the vendor gets the same share back as an *Affiliate commission refunded for order …* entry.

## Product Affiliate Settings

Per-product affiliate settings (**Enable Affiliate** and a custom commission percentage) are platform rules, so only admins with the `products.edit` permission can change them — in **Ecommerce → Products → Edit → Affiliate Settings**. Vendors cannot change them from the vendor dashboard.

Use them to exclude a vendor's low-margin products or set a different rate for a vendor's products. See [Product Settings](./configuration.md#product-settings).

## Timing

- The commission amount is calculated **when the order is placed**. Changing a product rate later does not change existing commissions.
- The vendor is charged when Marketplace records the vendor's revenue for the order, whether the commission is still pending or already approved. Rejected commissions are never charged.

## Troubleshooting

| Problem | Check |
|---------|-------|
| Commission not deducted | The order has a commission that is not rejected (see **Affiliate → Commissions**), the order is completed, and both plugins are active |
| Deduction missing after updating | Run `php artisan migrate` to add the `vendor_deduction` column to `affiliate_commissions` |

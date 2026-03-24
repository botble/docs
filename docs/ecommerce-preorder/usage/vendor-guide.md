# Vendor Guide

::: info
This feature requires the **Marketplace** plugin to be active and **Vendor Management** to be enabled in **Preorder > Settings**.
:::

When vendor management is enabled, vendors can manage their own preorder products and orders from the vendor dashboard.

## Vendor Dashboard

Access the preorder dashboard at **Vendor Panel > Preorder > Dashboard**. This shows stats for your own products only:

- Total preorder products and active count
- Delayed orders (past availability date)
- Status breakdown
- Sales summary

## Managing Preorder Products

Navigate to **Vendor Panel > Preorder > Products**.

| Action | How |
|--------|-----|
| **Create** | Click **Create**, select one of your products, set pricing and availability |
| **Edit** | Click a product to update settings |
| **Delete** | Click **Delete** to remove a preorder configuration |

The product creation form is the same as the admin version. See [Preorder Products](/ecommerce-preorder/usage/preorder-products) for field descriptions and pricing examples.

::: warning
You can only create preorder configurations for products you own. You cannot see or modify other vendors' preorder settings.
:::

## Managing Preorder Orders

Navigate to **Vendor Panel > Preorder > Orders**.

You see only orders for your own products. You can view order details and track the status of each preorder.

::: tip
Order status changes are managed by the site admin. Vendors have read-only access to order statuses.
:::

## Troubleshooting

### Preorder menu not appearing in vendor dashboard

1. Check the **Marketplace** plugin is active: **Admin > Plugins**
2. Check **Vendor Management** is enabled: **Preorder > Settings**
3. Clear cache: **Admin > Platform Administration > Cache management > Clear all CMS cache**

### Can't create preorder for a product

Make sure the product belongs to your store. You can only create preorder configurations for your own products.

### Orders not showing

You only see orders for your own products. If a customer ordered a preorder product from another vendor, it won't appear in your list.

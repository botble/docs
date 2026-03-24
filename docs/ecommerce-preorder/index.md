# Ecommerce Preorder - Pre-order Management for Botble CMS

## Introduction

Ecommerce Preorder is a plugin for Botble CMS that adds full pre-order support to your online store. Customers place pre-orders for upcoming products, pay a deposit upfront, and complete payment when the product becomes available. You manage the entire lifecycle from request to delivery.

## What You Can Do

### Accept pre-orders with flexible pricing

Set up three pricing strategies per product: full price upfront, a percentage deposit (e.g., 30%), or a fixed deposit (e.g., $50). Optionally apply exclusive pre-order discounts on top.

Go to **Preorder > Products** in admin to configure pre-order products.

[Learn how to configure preorder products &rarr;](/ecommerce-preorder/usage/preorder-products)

### Track orders through a clear lifecycle

Every pre-order moves through defined statuses: Requested → Accepted → Prepayment Requested → Prepayment Confirmed → Final Order → In Shipping → Delivered. You control each transition from the admin panel.

Go to **Preorder > Orders** to manage pre-order orders.

[Learn about order management &rarr;](/ecommerce-preorder/usage/preorder-orders)

### Collect payments in two stages

Collect a deposit when the customer pre-orders, then charge the remaining balance when the product ships. Supports COD, bank transfer, Stripe, and PayPal.

[Learn about payment workflow &rarr;](/ecommerce-preorder/usage/preorder-orders#two-stage-payment)

### Let customers manage their pre-orders

Customers view their pre-orders, make payments, track status, and request refunds — all from their account dashboard.

[See the customer guide &rarr;](/ecommerce-preorder/usage/customer-guide)

### Enable vendor self-service (Marketplace)

When the Marketplace plugin is active, vendors can create and manage their own pre-order products and orders from the vendor dashboard.

[See the vendor guide &rarr;](/ecommerce-preorder/usage/vendor-guide)

## Quick Start

Here's the fastest way to get pre-orders working on your site:

1. **Activate the plugin** at **Admin > Plugins** ([Installation guide](/ecommerce-preorder/installation))
2. **Configure settings** at **Preorder > Settings** — enable the plugin and set your defaults ([Configuration guide](/ecommerce-preorder/configuration))
3. **Create a preorder product** at **Preorder > Products > Create** — select a product, set the availability date and pricing strategy
4. **Test it** — visit the product on the frontend and verify the pre-order badge, pricing info, and button appear

That's it for basic pre-order setup. For deposit-based pricing, continue to [Preorder Products](/ecommerce-preorder/usage/preorder-products).

## Requirements

- Botble CMS version 7.6.0 or higher
- PHP version 8.2 or higher
- Active E-commerce plugin (required dependency)
- MySQL 5.7+ or MariaDB 10.3+

## Botble Team

Visit us at [botble.com](https://botble.com).

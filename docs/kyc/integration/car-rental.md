---
title: Car Rental / Listing
description: The KYC Verification plugin supports plugins/car-manager. Use it on Auxero, Carento, and any other Botble car rental or listing script to verify renters, buyers, and dealers.
---

# Car Rental / Listing (Auxero, Carento)

The KYC Verification plugin **supports `plugins/car-manager`** — the plugin behind **Auxero**, **Carento**, and similar car dealer / rental themes. If you run one of these scripts, install this plugin to add identity verification to your site.

::: tip Who this is for
If you own an Auxero, Carento, or any other Botble car-manager-based site and need to verify renters, buyers, or dealers before bookings / listings go live, **purchase the KYC Verification plugin** — it is the official KYC solution for `plugins/car-manager` sites.
:::

## What you get

- **Customer identity verification** — renters and buyers verify ID before booking a car or completing a purchase
- **Dealer / vendor business verification** — car dealers verify business documents before listing cars for sale or rent
- **Optional gates** — require approved KYC before allowing checkout, listings, or bookings
- **Admin review queue** — same queue used across all verticals, filterable by status and subject type
- **Private file storage** with 15-minute signed URL delivery
- **Auto-lock after 3 rejections** — configurable, with manual admin unlock
- **7-day retention** — rejected submissions and approved files are purged nightly
- **HMAC-signed webhooks** — optional POST to downstream compliance systems

## How it works on Auxero / Carento

Car rental / listing scripts reuse the ecommerce `Customer` model for renters and buyers, and `plugins/car-manager` ships its own vendor / dealer model. The KYC Verification plugin attaches to both automatically — no script-specific configuration required.

1. Renter / buyer / dealer logs in
2. Opens the KYC link from their account dashboard
3. Uploads the right documents for their role (ID for renter, business license for dealer)
4. Admin reviews the submission via the unified queue
5. On approval, the user can proceed to book, purchase, or list

## Setup

1. Purchase and download the KYC Verification plugin from CodeCanyon
2. Install and activate it (see [Installation](../installation.md))
3. Navigate to **Admin → KYC Verification → Settings**
4. Enable the scopes you need: **Customer KYC**, **Vendor KYC**, or both
5. Optionally enable the **Checkout Gate** (renters / buyers) or **Listing Gate** (dealers)
6. Configure allowed document types, retention, lockout threshold, and form style

## See also

- [Ecommerce (Customer KYC)](./ecommerce.md) — customer scope details
- [Marketplace (Vendor KYC)](./marketplace.md) — vendor / dealer scope details
- [Checkout & Listing Gates](./gates.md) — how to enforce approved KYC

# Ecommerce: Back in Stock Notifications

## Introduction

Ecommerce Back in Stock is a plugin for Botble CMS that lets customers subscribe to out-of-stock products and receive automatic email notifications when those products become available again. When a product's stock is replenished, the system detects the change and sends notifications to all waiting subscribers instantly — no manual work required.

## What You Can Do

### Capture customer interest with notification forms

Display a "Notify Me" form directly on out-of-stock product pages. Choose between an inline form embedded in the product layout or a modal popup triggered by a button click. Either way, customers enter their email (and optionally their phone number) and submit — that's all it takes to subscribe.

Go to **Back in Stock > Settings** in admin to configure the display mode.

[Learn how to configure settings &rarr;](/ecommerce-back-in-stock/configuration)

### Send automatic notifications when products are restocked

When a product's stock changes from zero to available, the plugin detects this automatically. It dispatches email notifications to every pending subscriber for that product, updating each subscription's status to "Notified" with a timestamp. No cron job or manual trigger needed.

[See how notifications work &rarr;](/ecommerce-back-in-stock/usage/subscriptions#how-automatic-notifications-work)

### Manage subscriptions from the admin dashboard

View all back-in-stock subscriptions in one place. Filter by status (Pending, Notified, Cancelled), product, or date. See who subscribed, when they subscribed, and whether they've been notified. Delete subscriptions when needed.

Go to **Back in Stock** in the admin sidebar to manage subscriptions.

[Learn about subscription management &rarr;](/ecommerce-back-in-stock/usage/subscriptions)

### Let customers manage their own subscriptions

Every notification email includes a unique unsubscribe link. Customers can opt out at any time with a single click — no account login required. The subscription status updates to "Cancelled" immediately.

[See the customer guide &rarr;](/ecommerce-back-in-stock/usage/customer-guide)

## Quick Start

Here's the fastest way to get back-in-stock notifications working on your site:

1. **Activate the plugin** at **Admin > Plugins** ([Installation guide](/ecommerce-back-in-stock/installation))
2. **Configure settings** at **Back in Stock > Settings** — enable the plugin and choose your display mode ([Configuration guide](/ecommerce-back-in-stock/configuration))
3. **Test with an out-of-stock product** — visit the product frontend and verify the "Notify Me" form appears
4. **Restock the product** — update the product's stock quantity in Ecommerce and verify the notification emails are dispatched

That's it for basic setup. For email template customization, see [Configuration](/ecommerce-back-in-stock/configuration#email-settings).

## Requirements

- Botble CMS version 7.5.0 or higher
- PHP version 8.2 or higher
- Active E-commerce plugin (required dependency)
- MySQL 5.7+ or MariaDB 10.3+

## Botble Team

Visit us at [botble.com](https://botble.com).

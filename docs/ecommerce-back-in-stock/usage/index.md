# Usage Overview

This section covers everything you need to understand and manage back-in-stock notifications on your site.

## Admin Guides

### [Subscriptions](/ecommerce-back-in-stock/usage/subscriptions)

View and manage all customer subscriptions from the admin dashboard. Filter by status, product, or date. Understand how automatic notifications are triggered when products are restocked.

**Go to:** Back in Stock (admin sidebar)

### [Customer Guide](/ecommerce-back-in-stock/usage/customer-guide)

How your customers subscribe to out-of-stock products, receive notification emails, and unsubscribe when they no longer want alerts.

## How Everything Fits Together

```
1. Product goes out of stock (quantity = 0)
                    ↓
2. Customer visits product page, sees "Notify Me" form
                    ↓
3. Customer enters email (and optionally phone) and submits
                    ↓
4. Subscription created with status: Pending
                    ↓
5. Store restocks the product (quantity > 0)
                    ↓
6. System automatically detects the stock change
                    ↓
7. Email notification dispatched to all Pending subscribers
                    ↓
8. Subscription status updated to: Notified
```

## Subscription Statuses at a Glance

| Status | Meaning |
|--------|---------|
| **Pending** | Customer subscribed; product still out of stock |
| **Notified** | Notification email was sent; product is now available |
| **Cancelled** | Customer unsubscribed via the link in the email |

## Key Behaviors

**Notifications are automatic.** The `SendBackInStockNotifications` listener fires whenever product stock changes. When stock moves from 0 to any positive quantity, it triggers notification jobs for all pending subscribers of that product.

**Each subscriber gets one notification.** Once a subscription is marked Notified, it won't trigger again. If the product goes out of stock and back again, customers need to re-subscribe.

**Unsubscribing requires no login.** Every notification email contains a unique token-based unsubscribe link. Customers can cancel their subscription with a single click, no account required.

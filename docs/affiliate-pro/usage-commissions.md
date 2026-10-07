---
title: Commissions
description: How Affiliate Pro creates, approves and reverses affiliate commissions.
---

# Commissions

## Which Affiliate Gets the Order?

When an order is placed, the plugin looks for the referring affiliate in this order:

1. The **referral cookie** — the visitor opened an affiliate link (`?aff=CODE` or a `/go/...` short link) within the cookie lifetime.
2. The **affiliate coupon** — the order used a coupon code that belongs to an affiliate.

The referral is saved on the order when the customer submits checkout, so it is kept even when the payment gateway confirms the order later (for example by webhook).

The affiliate must be **Approved**. Self-referrals are always blocked: an affiliate never earns commission on orders placed with their own customer account, or as a guest with their own email address.

## Commission Lifecycle

| Event | Commission |
|-------|------------|
| Order placed by a referred customer | Created with status **Pending** |
| Order status changes to **Completed** | **Approved** automatically when **Auto Approve Commissions** is on (the default). If you turned it off, it stays Pending until you approve it |
| You approve it in **Affiliate → Commissions** | **Approved** |
| Order **Cancelled** | Pending → **Rejected**. Approved → reversed (amount taken back from the balance) |
| Order **return completed** | The returned share of the commission is reversed. A partial return reverses only that part |
| Order **refunded** from the admin order page | The refunded share (refunded money ÷ amount paid) of the commission is reversed |

A return and the refund of the same goods are reversed only once: the commission is reduced by the larger of the returned share and the refunded share, never both.

When a commission is approved, the amount is added to the affiliate's balance and total commission, the affiliate may move up a [member level](./usage-member-levels.md), and the *New Commission Earned* email is sent. Commissions of banned or suspended affiliates are not credited; they stay **Pending**.

## How the Amount Is Calculated

One order creates one commission — the sum over all eligible products:

```
product commission = (price × quantity − the product's share of the order discount) × rate / 100
```

- Shipping and tax are excluded.
- The order discount (coupon or promotion) is split across products in proportion to their value.
- Products with affiliate disabled earn nothing.
- The rate for each product is chosen as described in [Which Rate Is Used?](./configuration.md#which-rate-is-used)

## Commission List

Go to **Affiliate → Commissions** to see every commission with its affiliate, order, amount and status. Use **Filters** to show only *Pending* commissions.

![Commission list](./images/affiliate-pro-admin-commissions.png)

## Approve or Reject Manually

Open a pending commission with the eye icon:

![Commission detail](./images/affiliate-pro-admin-commission-detail.png)

- **Approve** — credits the affiliate immediately.
- **Reject** — the affiliate earns nothing for this order. On a Marketplace order, the vendor gets back the commission they were charged.

Only pending commissions can be approved or rejected. To take back an approved commission, cancel the order or complete a return.

::: tip
Turning **Auto Approve Commissions** off and approving commissions after your return period ends means you rarely need to reverse them.
:::

Approving and rejecting requires the `affiliate.commissions.edit` permission.

## Affiliate View

Affiliates see their own commissions under **Affiliate Program → Commission History**. See [Affiliate Dashboard](./affiliate-dashboard.md#commission-history).

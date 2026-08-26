---
title: Vendor Subscriptions
description: Run the marketplace in subscription mode — vendors buy a plan to publish listings instead of paying a commission on every order.
---

# Vendor Subscriptions

The marketplace can run in one of two mutually exclusive modes:

| Mode | How the platform earns | Vendor pays |
|------|------------------------|-------------|
| **Commission based** (default) | A percentage or fixed fee on every order | Per sale |
| **Subscription based** | Vendors buy a recurring plan to publish listings | Per billing period |

In subscription mode **no commission is taken** — the vendor keeps 100% of every order, and refunds carry no commission reversal either. The admin earns from plan sales instead.

::: warning
The two modes cannot run at the same time. Switching mode does not delete anything: commission settings and subscription settings are both stored, so you can switch back and forth without losing configuration.
:::

## Switching to Subscription Mode

1. Go to `Marketplace` -> `Settings`.
2. Set **Marketplace mode** to **Subscription based**.
3. The **Vendor subscriptions** section appears immediately (no save needed) — configure it, then save.

Once saved, two new menu items appear under `Marketplace`:

- **Subscription Plans** — the plans you sell
- **Vendor Subscriptions** — what each vendor bought, and the approval queue

::: tip
When you switch back to **Commission based**, products that were unpublished because a subscription expired are restored automatically.
:::

## Subscription Settings

`Marketplace` -> `Settings` -> **Vendor subscriptions**

| Setting | Default | Description |
|---------|---------|-------------|
| **Unpublish vendor products when their subscription expires** | On | Hides the vendor's products from the storefront when the plan lapses. They are restored automatically when the vendor subscribes again. |
| **Grace period (days)** | 0 | Extra days a vendor keeps access after the plan's end date, before expiry actually runs. |
| **Expiry reminder days** | `7,3,1` | Comma-separated list of days before expiry to email the vendor. Leave empty to disable reminders. |
| **Allow vendors to pay from their balance** | On | Lets vendors pay for a plan from their marketplace balance, and enables auto-renew. |
| **Require admin approval for every subscription** | Off | Every purchase lands in the approval queue. Offline methods (Cash on delivery, Bank transfer) always require approval regardless of this setting. |
| **Let vendors cancel their own subscription** | On | Shows the **Cancel subscription** action in the vendor dashboard. Cancelling is immediate and not refunded. |
| **Charge tax on subscription payments** | Off | Applies the store's default tax rate and its zone rules to plan prices. Requires tax to be enabled in ecommerce settings. |
| **Subscription invoice prefix** | `SUB-` | Subscription invoices are numbered in their own series, separate from order invoices. |
| **Payment methods available for subscriptions** | *(empty)* | Restrict which gateways a vendor may use. Leave empty to allow every enabled payment method. |

## Creating Subscription Plans

Go to `Marketplace` -> `Subscription Plans` -> **Create**.

### Plan details

| Field | Description |
|-------|-------------|
| **Name** | Shown to vendors on the plan picker. |
| **Description** | Short summary shown under the plan name. |
| **Price** | Set `0` to make this a free plan. |
| **Duration** + **Duration unit** | For example `1` + `Month(s)`, or `3` + `Month(s)`. Choose **Lifetime** for a plan that never expires. |
| **Order** | Sort order on the plan picker. |
| **Default plan** | Assigned automatically to any vendor without a subscription. Only one plan can be the default, and its price must be `0`. |
| **Status** | Only published plans are offered to vendors. |

### Plan limits & features

| Option | Type | Effect |
|--------|------|--------|
| **Maximum products** | Number | How many products the vendor may create. Use `-1` for unlimited. Enforced on every path, including the CSV importer. |
| **Maximum featured products** | Number | Displayed on the plan card. Use `-1` for unlimited. |
| **Listing priority** | Number | Displayed on the plan card. Higher values are intended to rank a vendor higher in listings. |
| **Allow digital products** | On/Off | Gates digital product creation. |
| **Allow creating coupons** | On/Off | Gates the vendor's `Coupons` section. |
| **Allow importing products** | On/Off | Gates the vendor's product import screen. |

::: info
**Maximum featured products** and **Listing priority** are stored on the plan and shown to vendors as part of "What your plan includes", but the core plugin does not enforce or sort by them. Use them as marketing values, or read them from `$subscription->option('listing_priority')` in a theme customization.
:::

::: warning
A product with variations counts as **one** slot, not one per variation. Variations themselves never consume quota.
:::

### Product quota accounting

The used-slot count includes every product the vendor owns, **including products in an unpublished store**. A vendor whose store is not yet approved still consumes their allowance.

When a vendor hits the limit they get: *"You have reached the maximum number of products for your plan. Please upgrade to add more."* The CSV importer rejects the offending rows with the same message.

## The Default Plan

Mark one free plan as **Default plan** to give every vendor a baseline. The first time a vendor without a subscription touches a gated screen, that plan is activated for them silently — no checkout, no invoice.

If there is no default plan, a vendor without a subscription is blocked from products, exports, imports and coupons until they buy one.

## The Vendor Experience

Vendors get a **Subscription** entry in the vendor dashboard (`/vendor/subscriptions`).

### Buying a plan

1. **Choose a plan** from the plan picker.
2. Fill in **Billing information** — name, email, phone, address, and optionally a Tax ID. The address determines the tax charged when tax is enabled. Vendors can tick *"Save this as my default address"*.
3. Pick a payment method:
   - **Any enabled gateway** (Stripe, PayPal, Razorpay, …) — the vendor is redirected to the gateway and returns to a callback that activates the plan.
   - **My balance** — paid instantly from the vendor's marketplace balance, if the balance is sufficient and balance payment is enabled.
   - **Cash on delivery / Bank transfer** — the request goes to the admin approval queue and is activated only after approval.
4. Optionally tick **auto-renew** to renew from balance when the plan expires.

Free plans skip payment entirely and activate immediately.

### What vendors see afterwards

The subscription page shows the current plan, the products used against the allowance (`12 of 50 products used`), the expiry date, and three history tabs:

- **Invoices** — every subscription invoice, each downloadable as a PDF
- **Transactions** — balance movements tied to the subscription
- **Activity** — the full audit trail (claimed, paid, approved, renewed, reminded, expired, cancelled…)

### Changing plan

Vendors can switch plan at any time. **There is no proration** — a fresh, full billing period starts immediately and the time remaining on the old plan is neither carried over nor refunded. The vendor is warned about this before confirming.

If the new plan has a smaller product allowance, only that many products are republished; the rest stay hidden until the vendor upgrades again.

### Cancelling

When **Let vendors cancel their own subscription** is on, vendors get a cancel form that requires typing `CANCEL` to confirm. Cancellation takes effect immediately and is not refunded — the form points vendors at turning off auto-renew instead if they only want to stop future charges.

### Gated sections

These vendor dashboard sections require an active subscription:

| Section | Requirement |
|---------|-------------|
| Products | Active subscription |
| Export | Active subscription |
| Coupons | Active subscription + **Allow creating coupons** |
| Import products | Active subscription + **Allow importing products** |

Blocked vendors see *"An active subscription is required to access this section."* or *"Your current plan does not include this feature."*

## Managing Vendor Subscriptions

`Marketplace` -> `Vendor Subscriptions` lists every subscription with its vendor, plan, amount, status and dates. The menu badge shows how many are pending approval.

### Statuses

| Status | Meaning |
|--------|---------|
| **Pending** | Waiting for payment confirmation or admin approval |
| **Active** | Currently valid |
| **Expired** | Past its end date (plus grace period) |
| **Cancelled** | Ended early by the vendor or an admin |
| **Rejected** | The admin declined the request |

### Admin actions

Each action opens a confirmation modal that spells out exactly what will happen.

| Action | Effect |
|--------|--------|
| **Approve** | Activates the plan immediately; the billing period starts now. The vendor is emailed. |
| **Reject** | The plan is not activated. A **reason** is required, is emailed to the vendor and is stored on the record. Cannot be undone. |
| **Extend** | Adds N days to the current end date. No payment is taken and no invoice is issued. |
| **Cancel** | Access ends immediately, nothing is refunded, and the vendor's products are unpublished if that setting is on. |
| **Assign plan** | Put a vendor on a plan directly — useful for negotiated deals, migrations, or comping an account. |

When assigning or editing, leave **Ends at** empty to derive the end date from the plan duration.

### Plan snapshots

Every subscription stores an **immutable snapshot** of the plan it was bought on: price, duration, quotas and feature flags. Editing or deleting a plan later never rewrites what an existing subscriber is entitled to, and never rewrites their billing history.

### Activity log

Every transition is written to a per-subscription audit log, visible on the edit screen and in the vendor's **Activity** tab.

## Lifecycle & Cronjob

Renewals, reminders and expiry all run from a single command:

```bash
php artisan cms:marketplace:subscriptions:expire
```

The command is registered on Laravel's scheduler to run **daily at 01:00**, and only does anything while the marketplace is in subscription mode. As long as you have the standard cronjob set up, nothing further is needed:

```bash
* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1
```

See [Setup cronjob](./cronjob.md) for the full setup.

Each run does three things, in order:

1. **Auto-renew** subscriptions due within a day that have auto-renew on, charging the vendor's balance. If the balance is too low the vendor is emailed a *renewal failed* notice telling them to top up before the grace period ends — the plan is not silently lapsed.
2. **Send expiry reminders** on the days configured in **Expiry reminder days**.
3. **Expire** subscriptions past their end date plus the grace period. If **Unpublish vendor products when their subscription expires** is on, the vendor's products are hidden and stamped so they can be restored later.

Products hidden by expiry are republished automatically — up to the new plan's limit — the moment the vendor subscribes again.

::: tip
Notification emails are de-duplicated with a ledger, so re-running the command by hand will not spam a vendor with the same reminder twice.
:::

## Tax

Turn on **Charge tax on subscription payments** to apply tax to plan prices. Tax uses the ecommerce tax engine: the store's default tax rate and its country/state zone rules, resolved from the **billing address the vendor enters at checkout**.

The tax rate and amount are frozen on the subscription at purchase time, so changing your tax settings later never rewrites an issued invoice.

::: warning
This requires tax to be enabled in `Ecommerce` -> `Settings` -> `Tax`. See [Tax](./usage-tax.md).
:::

## Subscription Invoices

Every paid subscription and renewal produces its own invoice, numbered in a separate series controlled by **Subscription invoice prefix** (for example `SUB-000001`).

- Vendors download their invoices from the **Invoices** tab of the subscription page.
- Admins download them from the vendor subscription record.
- Vendor download routes are scoped to their owner — a vendor cannot fetch another vendor's invoice.

### Customising the PDF

The subscription invoice template is registered in `Ecommerce` -> `Settings` -> `Invoice template`, alongside the order and payout templates. Pick **Subscription invoice** from the template selector to edit it.

Available variables include company details (`company_logo`, `company_name`, `company_address`, `company_tax_id`, …), invoice fields (`invoice_code`, `invoice_created_at`, `invoice_paid_at`, `invoice_title`, `invoice_description`, `invoice_sub_total`, `invoice_tax_rate`, `invoice_tax_amount`, `invoice_amount`, `invoice_status`) and the billing block captured at checkout (`billing_name`, `billing_email`, `billing_address`, `billing_city`, `billing_state`, `billing_country`, `billing_zip_code`, `billing_tax_id`).

See [Invoice template](./invoice-template.md).

## Email Notifications

Templates live in `Settings` -> `Email` -> `Marketplace` and can be edited or disabled individually.

| Template | Sent to | When |
|----------|---------|------|
| **Subscription activated** | Vendor | The plan becomes active |
| **Subscription renewed** | Vendor | A renewal succeeds |
| **Subscription expiring soon** | Vendor | On each configured reminder day |
| **Automatic renewal failed** | Vendor | A balance auto-renew could not be charged |
| **Subscription expired** | Vendor | The plan lapses |
| **Subscription rejected** | Vendor | An admin declines the request, including the reason |
| **Subscription awaiting approval** | Admins | A purchase needs manual approval |

## Permissions

Grant these under `Settings` -> `Roles` when giving staff partial access:

| Permission | Covers |
|------------|--------|
| `Subscription plans` | View the plan list |
| `Subscription plans → Create / Edit / Delete` | Manage plans |
| `Vendor subscriptions` | View the subscription list |
| `Vendor subscriptions → Create / Edit / Delete` | Assign, edit, extend, cancel |
| `Vendor subscriptions → Approve` | Approve and reject pending requests |

## Notes & Limitations

- **No proration.** Changing plan starts a fresh full period; the remainder of the old plan is not credited.
- **No refunds.** Cancelling — by the vendor or an admin — ends access immediately with no refund flow.
- **Auto-renew is balance-only.** The plugin does not store gateway payment tokens, so automatic renewal works only from the vendor's marketplace balance.
- **Commission settings are ignored** while in subscription mode, including category-based commission and per-vendor overrides. See [Commissions](./usage-marketplace-commissions.md).

## Related

- [Marketplace Setup](./usage-marketplace-setup.md)
- [Commissions](./usage-marketplace-commissions.md)
- [Vendor Withdrawals](./usage-marketplace-withdrawals.md)
- [Payment Gateways](./usage-payment-gateways.md)

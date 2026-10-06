---
title: Withdrawals
description: Process affiliate payout requests and set up automatic payouts with PayPal Payout or Stripe Connect.
---

# Withdrawals

## How a Withdrawal Works

1. The affiliate requests an amount from their dashboard. It must be at least the **Minimum Withdrawal Amount** and not more than their balance.
2. The amount is **deducted from the balance right away** and the request is **Pending**. You receive the *Withdrawal Requested* email.
3. You pay the affiliate outside the system (bank transfer, PayPal…), then **Approve** the request. The amount is added to the affiliate's *Total Withdrawn*.
4. If you **Reject** the request, the amount goes back to the affiliate's balance.

The affiliate receives an email in both cases.

## Process Requests

Go to **Affiliate → Withdrawals**. The menu badge shows pending requests.

![Withdrawal list](./images/affiliate-pro-admin-withdrawals.png)

Open a request with the eye icon to see the amount, payment method and the payment details entered by the affiliate (bank account, PayPal email…). Then:

- **Approve** — after you have sent the money.
- **Reject** — confirm in the dialog. The amount is returned to the affiliate's balance.

Approving and rejecting requires the `affiliate.withdrawals.edit` permission.

## Payment Methods

Enable the methods you support in [Configuration → Withdrawals](./configuration.md#withdrawals):

| Method | Affiliate provides |
|--------|--------------------|
| Bank Transfer | Bank account details |
| PayPal | PayPal email address (must be a valid email) |
| Stripe | A connected Stripe account (connected from the withdrawal form) plus a short note in the payment details field |
| Other | Free-text payment details |

## Automatic Payouts

Two Botble plugins can pay affiliates automatically. They are **not bundled with Affiliate Pro** — they ship with Botble E-commerce scripts (for example Shofy) in `platform/plugins/paypal-payout` and `platform/plugins/stripe-connect`. If your script includes them, activate them in **Plugins → Installed Plugins**.

| Plugin | What happens when an affiliate requests a withdrawal |
|--------|------------------------------------------------------|
| **PayPal Payout** | For the PayPal method, the money is sent through the PayPal Payouts API using your PayPal payment gateway credentials, and the request is approved automatically. If the payout fails, the request stays **Pending** for you to handle manually. |
| **Stripe Connect** | For the Stripe method, the money is transferred to the affiliate's connected Stripe account and the request is approved automatically. If the transfer fails, the request is **Rejected** and the amount is returned to the affiliate's balance. |

::: info Connecting a Stripe account
When an affiliate selects **Stripe** on the withdrawal form, a **Connect with Stripe** button appears. It opens Stripe's onboarding and brings the affiliate back to the withdrawal page when done. Affiliates who are also Marketplace vendors can use the account they already connected in their vendor payout settings. A Stripe withdrawal cannot be submitted until an account is connected.
:::

Without these plugins, every request is paid manually as described above.

::: tip
Test automatic payouts in sandbox mode first. Your PayPal or Stripe account must have enough balance to cover payouts.
:::

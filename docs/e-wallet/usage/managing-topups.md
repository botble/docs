# Managing Top-ups

Top-ups are when customers add money to their wallet. This guide shows you how to manage these requests.

## What is a Top-up?

A top-up is when a customer deposits money into their wallet. They can then use this money to pay for orders.

**Example:** Sarah adds $100 to her wallet using her credit card. Now she has $100 to spend at your store.

## Viewing Top-up Requests

1. Go to **E-Wallet** → **Top-ups**
2. You'll see all top-up requests

### What You'll See

| Column | Description |
|--------|-------------|
| **Customer** | Who made the top-up |
| **Amount** | How much they're adding |
| **Payment Method** | How they're paying (credit card, PayPal, etc.) |
| **Status** | Current status of the top-up |
| **Date** | When they requested it |

## Top-up Statuses Explained

| Status | What It Means | What Happens Next |
|--------|---------------|-------------------|
| **Pending** | Customer started but hasn't paid yet | Waiting for payment |
| **Processing** | Payment is being processed | Wait for payment confirmation |
| **Completed** | Payment received, money added to wallet | Nothing needed |
| **Failed** | Payment didn't go through | Customer may try again |
| **Cancelled** | Top-up was cancelled | No money was added |

## How Top-ups Usually Work

### Normal Flow (Automatic)

1. Customer clicks "Top Up Wallet"
2. Customer enters amount and pays
3. Payment gateway processes the payment
4. If successful, money is added to wallet automatically
5. Status becomes **Completed**

Most top-ups complete automatically. You don't need to do anything!

## When You Need to Take Action

### Scenario 1: Top-up Stuck on "Pending"

This means the customer started a top-up but didn't complete payment.

**What to do:**
- Usually nothing - they may have changed their mind
- The pending top-up will expire eventually
- You can cancel it if needed

### Scenario 2: Payment Received but Not Credited

Sometimes a payment comes through but the wallet wasn't updated automatically.

**How to know:** Customer says they paid, and you can verify the payment in your payment gateway.

**What to do:**

1. Go to **E-Wallet** → **Top-ups**
2. Find the pending top-up
3. Verify the payment was received (check your payment gateway)
4. Click **Complete** button
5. The wallet will be credited

### Scenario 3: Customer Wants to Cancel

If a customer wants to cancel a pending top-up:

1. Go to **E-Wallet** → **Top-ups**
2. Find the pending top-up
3. Click **Cancel** button
4. The top-up is cancelled

::: warning Important
You can only cancel **Pending** top-ups. Once a payment is processed, you cannot cancel - instead, you would need to issue a refund.
:::

## Completing a Top-up Manually

Use this when payment was received outside the normal flow:

1. Go to **E-Wallet** → **Top-ups**
2. Find the pending top-up for the customer
3. **Verify the payment first** in your payment gateway
4. Click **Complete**
5. Customer's wallet is credited immediately

::: danger Never Complete Without Verification
Always verify the payment was actually received before completing a top-up manually. Completing without payment means you're giving away money!
:::

## Common Questions

### What if there's no pending top-up?

If a customer paid but there's no top-up record:

1. Go to **E-Wallet** → **Wallets**
2. Find the customer
3. Click **Adjust Balance**
4. Add the amount with a note like "Manual top-up - payment verified"

### Can I change the top-up amount?

No, you cannot change the amount. If the amount is wrong, you would need to:
- Complete the top-up as-is, then
- Make an adjustment to add or remove the difference

### What payment methods can customers use?

Customers can use any payment method you have enabled in your store, except the wallet itself (they can't use wallet to top-up wallet).

### Is there a minimum top-up amount?

Yes, you can set minimum and maximum top-up amounts in **Settings** → **E-Wallet**.

## Tips for Managing Top-ups

### Daily Checks

- Review any **Pending** top-ups older than 24 hours
- Check for **Failed** top-ups (customers may need help)

### When Customers Have Problems

1. Ask for their payment confirmation/receipt
2. Check your payment gateway for the transaction
3. If payment is confirmed, manually complete the top-up
4. Let the customer know their wallet is updated

### Keep Records

When manually completing top-ups, document:
- Payment gateway transaction ID
- Date and time of verification
- Why manual completion was needed

## Next Steps

- [Handle withdrawal requests](/e-wallet/usage/managing-withdrawals)
- [View all transactions](/e-wallet/usage/managing-transactions)
- [Back to dashboard](/e-wallet/usage/admin-dashboard)

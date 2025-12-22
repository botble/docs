# Managing Transactions

Transactions are records of every time money moves in or out of a wallet. This guide shows you how to view and understand them.

## Viewing All Transactions

1. Go to **E-Wallet** → **Transactions**
2. You'll see a list of all wallet transactions

### What You'll See

| Column | Description |
|--------|-------------|
| **Customer** | Who made the transaction |
| **Type** | What kind of transaction (see below) |
| **Amount** | How much money moved |
| **Status** | Whether it completed successfully |
| **Date** | When it happened |

## Types of Transactions

There are six types of wallet transactions:

### 1. Top-up (Money In)

**What it is:** Customer added money to their wallet

**Example:** John deposited $100 using his credit card

**Amount shows as:** Positive (+$100)

### 2. Payment (Money Out)

**What it is:** Customer used wallet to pay for an order

**Example:** Sarah paid $45 for her order using her wallet balance

**Amount shows as:** Negative (-$45)

### 3. Refund (Money In)

**What it is:** Money returned to wallet from a cancelled/returned order

**Example:** Mike returned a product and got $30 back to his wallet

**Amount shows as:** Positive (+$30)

### 4. Admin Adjustment (Money In or Out)

**What it is:** You manually added or removed money

**Example:** You gave Lisa a $20 birthday credit

**Amount shows as:** Positive (+$20) or Negative (-$20)

### 5. Withdrawal (Money Out)

**What it is:** Customer requested to get money out of their wallet

**Example:** Tom withdrew $200 to his bank account

**Amount shows as:** Negative (-$200)

### 6. Vendor Payout (Money Out)

**What it is:** Payment made to a marketplace vendor (if applicable)

**Amount shows as:** Negative

## Transaction Statuses

| Status | What It Means | What to Do |
|--------|---------------|------------|
| **Completed** | Transaction finished successfully | Nothing needed |
| **Pending** | Transaction started but not finished | Wait or investigate |
| **Failed** | Something went wrong | Check error details |
| **Cancelled** | Transaction was cancelled | No action needed |

## Finding Specific Transactions

### Search by Customer

1. Type the customer's name or email in the search box
2. Only their transactions will show

### Filter by Type

1. Click the **Type** filter
2. Select the type you want (e.g., "Top-up" only)

### Filter by Date

1. Select a date range
2. Only transactions in that period will show

### Filter by Status

1. Click the **Status** filter
2. Select the status (e.g., "Pending" to see unfinished transactions)

## Viewing Transaction Details

Click on any transaction to see:

- **Full amount** with currency
- **Balance before** the transaction
- **Balance after** the transaction
- **Description** explaining what happened
- **Reference** - linked order or request (if any)
- **Date and time** when it happened

## Understanding the Balance Trail

Each transaction shows:
- **Balance Before:** How much was in the wallet before
- **Balance After:** How much is in the wallet now

**Example:**
- Balance Before: $150
- Transaction: -$50 (payment)
- Balance After: $100

This helps you verify the math and track any issues.

## Common Scenarios

### Customer Says "I Didn't Get My Refund"

1. Go to **Transactions**
2. Search for the customer
3. Filter by **Type: Refund**
4. Check if the refund transaction exists
5. If it shows **Completed**, the refund was processed

### Customer Balance Seems Wrong

1. Find the customer's wallet
2. View their transaction history
3. Check each transaction one by one
4. The **Balance After** on the last transaction should match their current balance

### Looking for a Specific Order Payment

1. Go to **Transactions**
2. Filter by **Type: Payment**
3. Search for the customer
4. Look for the transaction matching the order amount

## Exporting Transactions

You can export transaction data for reports:

1. Go to **Transactions**
2. Apply any filters you need
3. Click **Export** button
4. Choose your format (CSV, Excel)

## Tips for Transaction Management

### Daily Routine

- Check for any **Pending** transactions
- Review **Failed** transactions and investigate

### Weekly Routine

- Review large transactions (over $500)
- Look for unusual patterns

### Monthly Routine

- Export transactions for accounting
- Compare totals with your payment reports

## Next Steps

- [Handle top-up requests](/e-wallet/usage/managing-topups)
- [Process withdrawals](/e-wallet/usage/managing-withdrawals)
- [Back to wallet management](/e-wallet/usage/managing-wallets)

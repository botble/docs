# Managing Withdrawals

Withdrawals are when customers want to get money out of their wallet and into their bank account or PayPal. This guide shows you how to handle these requests.

## What is a Withdrawal?

A withdrawal is when a customer asks to transfer money from their wallet to their bank account or another payment method.

**Example:** Tom has $500 in his wallet but wants to move $300 to his bank account. He submits a withdrawal request.

## Viewing Withdrawal Requests

1. Go to **E-Wallet** → **Withdrawals**
2. You'll see all withdrawal requests

### What You'll See

| Column | Description |
|--------|-------------|
| **Customer** | Who made the request |
| **Amount** | How much they want to withdraw |
| **Payout Method** | How they want to receive the money |
| **Status** | Current status |
| **Date** | When they requested it |

## Withdrawal Statuses Explained

| Status | What It Means |
|--------|---------------|
| **Pending** | New request waiting for your review |
| **Processing** | You approved it, payment is being sent |
| **Completed** | Money has been sent to customer |
| **Rejected** | You rejected the request |
| **Cancelled** | Customer cancelled their request |

## The Withdrawal Process

### Step 1: Customer Submits Request

Customer fills out:
- Amount to withdraw
- Payout method (bank transfer, PayPal, etc.)
- Payment details (bank account, PayPal email)

When submitted, money is **held** in their wallet (they can't spend it).

### Step 2: You Review the Request

Check:
- Is the amount reasonable?
- Are the payment details correct?
- Is this a legitimate request?

### Step 3: Approve or Reject

**If you approve:**
- Status changes to Processing
- You send the money to the customer
- Mark as Completed when done

**If you reject:**
- Money goes back to customer's wallet
- Customer is notified

## How to Approve a Withdrawal

1. Go to **E-Wallet** → **Withdrawals**
2. Find the pending withdrawal
3. Click to view details
4. Check the payment information:
   - **Bank Transfer:** Bank name, account number, holder name
   - **PayPal:** PayPal email address
5. Click **Approve**
6. **Send the money** using your bank or PayPal
7. Once money is sent, click **Mark as Completed**

::: warning Very Important
Approving a withdrawal does NOT automatically send money. You must manually send the money through your bank, PayPal, or payment provider!
:::

## How to Reject a Withdrawal

Sometimes you need to reject a withdrawal request.

**Reasons to reject:**
- Incorrect payment details
- Suspicious activity
- Customer request
- Policy violation

**To reject:**

1. Go to **E-Wallet** → **Withdrawals**
2. Find the withdrawal
3. Click **Reject**
4. Enter a reason (optional but recommended)
5. Click Confirm

**What happens:**
- Status changes to **Rejected**
- Money is **automatically returned** to customer's wallet
- Customer receives notification

## Payout Methods

Customers can choose from these methods (you can enable/disable these in settings):

### Bank Transfer

Customer provides:
- Bank name
- Account number
- Account holder name
- Routing number (if needed)

**You send:** Via your business bank account

### PayPal

Customer provides:
- PayPal email address

**You send:** Via your PayPal account

### Other

For custom payout methods your store might offer.

## Best Practices

### Before Approving

1. **Verify the amount** - Does the customer have enough balance?
2. **Check payment details** - Are they complete and correct?
3. **Look for red flags** - Multiple requests? Unusually large amounts?
4. **First-time withdrawals** - Consider extra verification

### Processing Time

Set clear expectations:
- Tell customers how long approval takes (e.g., 1-3 business days)
- Tell them when they'll receive funds after approval

### Large Withdrawals

For large amounts (you decide the threshold):
- Consider calling or emailing the customer to verify
- Ask for ID verification if needed
- Document your verification process

### Keep Records

For each withdrawal, document:
- When you approved it
- How you sent the money
- Transaction/reference number
- When the customer should receive it

## Common Scenarios

### Customer Says "My Bank Details Are Wrong"

If a customer realizes their bank details are wrong:

1. **Reject** the current withdrawal
2. Money returns to their wallet automatically
3. Ask customer to submit a new request with correct details

### Withdrawal Has Been Pending Too Long

Don't leave withdrawals pending for too long:
- Review pending requests daily
- Aim to process within 1-3 business days
- If you can't process, communicate with the customer

### Customer Wants to Cancel

If a customer wants to cancel:
- Find the withdrawal request
- Only **Pending** requests can be cancelled
- Click **Cancel** or have the customer cancel from their account

### Suspicious Activity

If something seems wrong:
- Don't approve immediately
- Contact the customer to verify
- Check their purchase history
- When in doubt, reject and ask for verification

## Tips for Smooth Processing

### Daily Routine

1. Check for new withdrawal requests
2. Process any pending requests
3. Follow up on incomplete processing

### Communication

- Notify customers when you approve/reject
- Provide expected timeframe for receiving funds
- Share tracking/reference numbers when available

### Stay Organized

- Process withdrawals in order received
- Keep notes on each transaction
- Have a consistent approval workflow

## Next Steps

- [View all transactions](/e-wallet/usage/managing-transactions)
- [Manage customer wallets](/e-wallet/usage/managing-wallets)
- [Back to dashboard](/e-wallet/usage/admin-dashboard)

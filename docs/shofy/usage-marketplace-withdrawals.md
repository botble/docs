# Marketplace Withdrawals

The withdrawal system allows vendors to request payouts of their earned revenue. Admins review and process withdrawal requests through configurable payout methods.

## Overview

Withdrawal workflow:

1. **Vendor earns revenue** from completed orders
2. **Vendor requests withdrawal** when balance meets minimum
3. **Withdrawal fee is calculated** and deducted
4. **Admin receives notification** of withdrawal request
5. **Admin reviews and approves** withdrawal
6. **Payout is processed** via selected payment method
7. **Admin marks withdrawal as completed**

## Withdrawal Settings

Navigate to `Marketplace` -> `Settings`

### Withdrawal Fees

| Setting | Description |
|---------|-------------|
| **Fee withdrawal amount** | Fee charged per withdrawal (amount or percentage) |
| **Withdrawal fee type** | Fixed amount or Percentage of withdrawal |

**Fixed Fee Example:**
- Fee: $5
- Vendor requests: $100
- Vendor pays fee: $5
- Total deducted from balance: $105
- Vendor receives: $100

**Percentage Fee Example:**
- Fee: 2%
- Vendor requests: $100
- Vendor pays fee: $2 (2% of $100)
- Total deducted from balance: $102
- Vendor receives: $100

::: tip
Withdrawal fees cover transaction costs and processing overhead. Typical marketplace fees range from 1-3% or $2-$10 flat fee.
:::

### Minimum Withdrawal Amount

| Setting | Description |
|---------|-------------|
| **Minimum withdrawal amount** | Minimum balance required to request withdrawal |

**Example:**
- Minimum: $50
- Vendor balance: $45 → Cannot withdraw yet
- Vendor balance: $50 → Can request withdrawal

::: warning
Set minimum withdrawal amount high enough to cover transaction costs but low enough to keep vendors satisfied. Common range: $25-$100.
:::

### Payout Methods

Configure available payout methods for vendors:

| Method | Description | Enabled by Default |
|--------|-------------|-------------------|
| **Bank Transfer** | Direct bank deposit | Yes |
| **PayPal** | PayPal payout | Yes |
| **Cash** | Cash pickup | No |

**Bank Transfer Fields:**
- Bank name
- Bank code/IFSC
- Account holder name
- Account number
- UPI ID (optional, for Indian banks)
- Description

**PayPal Fields:**
- PayPal ID (email)

**Cash Pickup Fields:**
- Pickup location
- Contact name
- Contact phone

::: tip
Enable only the payout methods your business can actually process. Disable unused methods to avoid confusion.
:::

## Vendor Payout Information Setup

Before vendors can request withdrawals, they must configure their payout information.

### Vendor Side

Vendors set up payout info at: `Vendor Dashboard` -> `Settings` -> `Payout Information`

1. **Select payout method** (bank transfer, PayPal, or cash)
2. **Fill required fields** based on selected method
3. **Save payout information**

::: warning
Vendors cannot request withdrawals without completing payout information setup.
:::

### Admin Side

Admins can view/edit vendor payout info:

1. Navigate to `Marketplace` -> `Stores`
2. Click "Edit" on a store
3. Open the "Payout Information" tab
4. View or update vendor's bank details

## Vendor Withdrawal Process

### Requesting a Withdrawal

**Vendor steps:**

1. Go to `Vendor Dashboard` -> `Withdrawals`
2. Click "Create" or "New Withdrawal"
3. Review available balance and withdrawal fee
4. Enter withdrawal amount (must be ≥ minimum)
5. Add optional description/notes
6. Submit request

**System validations:**
- Balance must be sufficient (amount + fee)
- Amount must meet minimum withdrawal requirement
- Payout information must be configured
- Vendor status must be active/verified

**Withdrawal statuses:**

| Status | Description | Color |
|--------|-------------|-------|
| **Pending** | Awaiting admin review | Warning (Yellow) |
| **Processing** | Admin is processing payment | Info (Blue) |
| **Completed** | Payout sent to vendor | Success (Green) |
| **Canceled** | Vendor canceled request | Danger (Red) |
| **Refused** | Admin rejected request | Secondary (Gray) |

### Editing Withdrawal Requests

Vendors can edit **pending** withdrawals only:

1. Go to `Vendor Dashboard` -> `Withdrawals`
2. Click "Edit" on pending withdrawal
3. Update amount or description
4. Click "Save" or "Cancel Request"

::: tip
Once admin changes status to "Processing", vendors can no longer edit the withdrawal.
:::

### Canceling Withdrawals

Vendors can cancel **pending** withdrawals:

1. Edit the pending withdrawal
2. Click "Cancel Request"
3. Status changes to "Canceled"
4. Balance is refunded to vendor (amount + fee)

## Admin Withdrawal Management

Navigate to `Marketplace` -> `Withdrawals`

### Reviewing Withdrawal Requests

**Withdrawal table shows:**
- Vendor name
- Withdrawal amount
- Fee charged
- Current balance (at time of request)
- Payment method
- Status
- Created date

**Filters:**
- By status (pending, processing, completed, etc.)
- By vendor
- By date range

### Approving Withdrawals

1. Click "Edit" on a pending withdrawal
2. Review vendor information and payout details
3. Change status to "Processing"
4. Add transaction ID (optional but recommended)
5. Upload proof of payment images (optional)
6. Add description/notes
7. Click "Save"

::: tip
Always add transaction ID and upload payment proof for record-keeping and dispute resolution.
:::

**Status progression:**
- Pending → Processing → Completed

### Processing Payouts

**For Bank Transfer:**
1. Review bank account details
2. Initiate bank transfer through your banking system
3. Enter transaction ID/reference number
4. Update withdrawal status to "Processing"
5. Once confirmed, change status to "Completed"

**For PayPal:**
1. Review PayPal ID
2. Send payout via PayPal
3. Enter PayPal transaction ID
4. Update status to "Processing" then "Completed"

**For Cash:**
1. Review pickup location and contact
2. Coordinate cash pickup
3. Update status when payment is handed over

### Completing Withdrawals

When payout is successfully processed:

1. Edit the withdrawal
2. Change status to "Completed"
3. Ensure transaction ID is recorded
4. Save changes

**Vendor receives email notification** confirming withdrawal approval with:
- Store name
- Withdrawal amount
- Completion confirmation

::: tip
The email template can be customized at `Settings` -> `Email` -> "Withdrawal Approved" template.
:::

### Refusing Withdrawals

To reject a withdrawal request:

1. Edit the withdrawal
2. Change status to "Refused"
3. Add description explaining reason
4. Save changes

**When refused:**
- Vendor balance is refunded (amount + fee)
- Vendor is notified
- Status cannot be changed back to pending

**Common refusal reasons:**
- Suspicious activity
- Incomplete payout information
- Pending disputes or chargebacks
- Account under review

## Withdrawal Statuses Explained

### Pending

- **Initial status** when vendor submits request
- Vendor can edit or cancel
- Balance is already deducted (amount + fee)
- Awaiting admin review

**Admin actions available:**
- Change to Processing
- Change to Refused
- Change to Canceled
- Delete withdrawal (refunds balance)

### Processing

- **Admin is processing payout**
- Vendor cannot edit or cancel
- Balance remains deducted
- Payout is in progress

**Admin actions available:**
- Change to Completed
- Change to Refused
- Change to Canceled

::: warning
Avoid leaving withdrawals in "Processing" status for extended periods. Complete or refuse them promptly.
:::

### Completed

- **Payout successfully sent** to vendor
- Final status, cannot be changed
- Balance is not refunded
- Vendor has received funds

**Admin actions available:**
- View only (no status changes)
- Delete (does NOT refund balance)

### Canceled

- **Vendor canceled** their own request
- Balance refunded to vendor
- Final status, cannot be changed

**Admin actions available:**
- View only
- Delete

### Refused

- **Admin rejected** withdrawal request
- Balance refunded to vendor (amount + fee)
- Final status, cannot be changed
- Vendor can submit a new request

**Admin actions available:**
- View only
- Delete

## Withdrawal History & Tracking

### Vendor Withdrawal History

Vendors view their withdrawal history at: `Vendor Dashboard` -> `Withdrawals`

**Table shows:**
- Withdrawal ID
- Amount requested
- Fee paid
- Status
- Date requested
- Date completed (if applicable)

### Admin Withdrawal Reports

Navigate to `Marketplace` -> `Withdrawals`

**Export data:**
1. Apply filters (date range, status, vendor)
2. Export to CSV/Excel
3. Use for accounting and reconciliation

**Key metrics to track:**
- Total withdrawals processed per month
- Average withdrawal amount
- Total fees collected
- Pending withdrawal queue
- Top withdrawing vendors

## Troubleshooting

### Vendor Cannot Request Withdrawal

**Error:** "Insufficient balance or no bank info"

**Causes:**
1. Vendor balance is below minimum withdrawal amount
2. Payout information not configured
3. Balance is insufficient to cover amount + fee

**Solution:**
- Ask vendor to check balance (must be ≥ withdrawal amount + fee)
- Verify payout information is completed in settings
- Check minimum withdrawal amount in marketplace settings

### Withdrawal Fee Calculation Wrong

**Check:**
1. Withdrawal fee amount in settings
2. Withdrawal fee type (fixed vs percentage)
3. For percentage: Fee = Amount × Percentage ÷ 100
4. For fixed: Fee = Fixed Amount

### Balance Not Refunded After Cancel/Refuse

**Check:**
1. Review revenue records for the vendor
2. Look for corresponding refund entry
3. Check vendor's current balance in `Stores` -> `Edit` -> Vendor balance

**If balance is still incorrect:**
- Check system logs for errors
- Verify signature validation is enabled
- Contact technical support

### Cannot Change Withdrawal Status

**Error:** Status dropdown is disabled

**Cause:** Withdrawal is in a final status (Completed, Canceled, Refused)

**Solution:** Final statuses cannot be changed. If correction is needed, create a manual revenue adjustment.

## Best Practices

1. **Process withdrawals promptly** - Aim for 1-3 business days to maintain vendor trust
2. **Always add transaction IDs** - Essential for dispute resolution
3. **Upload payment proof** - Screenshots of bank transfers, PayPal confirmations
4. **Set reasonable fees** - Balance processing costs with vendor satisfaction
5. **Communicate delays** - Notify vendors if processing will take longer than usual
6. **Regular reconciliation** - Match withdrawal records with actual bank transactions
7. **Secure payout info** - Vendor bank details are sensitive, restrict admin access
8. **Document refusals** - Clear notes on why withdrawals were rejected
9. **Monitor withdrawal patterns** - Flag unusual activity (frequent withdrawals, odd amounts)
10. **Automate notifications** - Ensure vendors receive status update emails

## Frequently Asked Questions

### How long do withdrawals take to process?

Depends on your business workflow. Typical marketplaces process withdrawals within 1-7 business days.

### Can vendors withdraw partial amounts?

Yes, vendors can request any amount ≥ minimum withdrawal, as long as their balance covers the amount plus fees.

### What happens if a vendor has pending orders when they withdraw?

Vendors can only withdraw their **current available balance**. Funds from pending/processing orders are not yet in their balance.

### Can I batch process withdrawals?

Not through the UI. Each withdrawal must be processed individually. Consider exporting withdrawal data and processing bank transfers in batches through your bank.

### What if a withdrawal is sent to the wrong account?

1. Mark the withdrawal as "Refused" with notes
2. Contact the vendor to update payout information
3. Create a manual revenue adjustment to refund the amount
4. Process a new withdrawal request

### Can fees be waived for specific vendors?

Not through the UI. All vendors pay the same withdrawal fee. To waive fees, set the fee amount to 0 in marketplace settings (affects all vendors).

### How do I handle disputed withdrawals?

1. Do NOT mark as completed until dispute is resolved
2. Keep status as "Processing" while investigating
3. Add detailed notes in the description field
4. Upload relevant evidence/communication as images
5. Refuse or complete based on investigation outcome

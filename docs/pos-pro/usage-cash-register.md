# Cash Register Management

POS Pro includes comprehensive cash register management to track cash flow, reconcile drawers, and maintain accurate financial records.

## Overview

The cash register system allows you to:

- Open and close register shifts
- Track starting cash amounts
- Monitor sales by payment method
- Calculate expected cash at close
- Record actual cash counted
- Track variances (over/short)
- View shift history

## Opening a Register

### When Opening is Required

If **Require Open Register** is enabled in POS settings, you must open a register before processing any orders.

### How to Open a Register

1. When accessing POS, you'll see the **Open Register** prompt
2. Or go to **POS** > **Register**
3. Click **Open Register**
4. Enter the **Starting Cash Amount** in your drawer
5. Click **Open**

::: tip
Count your cash drawer carefully before entering the starting amount. This establishes the baseline for end-of-shift reconciliation.
:::

### What Happens When You Open

- A new register shift record is created
- The opening time is recorded
- The starting cash amount is saved
- You can now process POS orders

## During Your Shift

### Monitoring Sales

While your register is open, you can view:

- **Cash Sales**: Total cash payments received
- **Card Sales**: Total card payments processed
- **Other Tenders**: Bank transfers, gift cards, etc.
- **Expected Cash**: Starting cash + cash sales - cash refunds

### Viewing Register Status

1. Go to **POS** > **Register**
2. View the current shift summary:
   - Shift start time
   - Starting cash
   - Sales breakdown by payment type
   - Expected cash amount
   - Cash refunds issued

## Closing a Register

### When to Close

Close your register at the end of your shift or work day. This:

- Creates a permanent record of the shift
- Calculates any cash variance
- Allows the next shift to start fresh

### How to Close a Register

1. Go to **POS** > **Register**
2. Click **Close Register**
3. **Count your cash drawer** carefully
4. Enter the **Actual Cash Amount** counted
5. Review the summary:
   - Starting cash
   - Cash sales
   - Cash refunds
   - Expected cash
   - Actual cash
   - Variance (difference)
6. Add **Notes** if needed (explain any variance)
7. Click **Close Register**

### Understanding Variance

| Variance | Meaning |
|----------|---------|
| **$0.00** | Perfect match - drawer balanced |
| **Positive (+)** | Over - more cash than expected |
| **Negative (-)** | Short - less cash than expected |

::: warning
Investigate significant variances. Common causes include:
- Incorrect change given
- Missing cash sales
- Unrecorded payouts
- Counting errors
:::

## Register History

### Viewing Past Shifts

1. Go to **POS** > **Registers**
2. View list of all closed shifts
3. Each record shows:
   - User who worked the shift
   - Open and close times
   - Starting and ending cash
   - Variance amount
   - Notes

### Filtering History

Use filters to find specific shifts:

- **Date Range**: Filter by shift dates
- **User**: Filter by cashier
- **Status**: Open or closed shifts

## Sales Breakdown

The register tracks sales by tender type:

| Tender Type | Description |
|-------------|-------------|
| **Cash** | Physical cash payments |
| **Card** | Credit/debit card payments |
| **Bank Transfer** | QR-based bank transfers |
| **Gift Card** | Gift card redemptions |
| **Store Credit** | Store credit applications |
| **Check** | Check payments |

### Expected Cash Calculation

```
Expected Cash = Starting Cash + Cash Sales - Cash Refunds
```

Only **cash** transactions affect the expected cash amount. Card and electronic payments are tracked separately.

## Handling Cash Refunds

When processing cash refunds from an open register:

1. The refund amount is deducted from expected cash
2. The refund is recorded in the register history
3. At close, expected cash reflects all cash refunds issued

See [Refunds](usage-refunds.md) for refund processing details.

## Best Practices

### Opening the Register

1. Count the starting cash with a witness if possible
2. Verify all denominations
3. Enter the exact amount - don't round
4. Keep the starting amount consistent across shifts

### During Your Shift

1. Process all transactions through POS
2. Don't make cash payouts without recording them
3. Keep the cash drawer closed when not in use
4. Don't leave cash unattended

### Closing the Register

1. Count cash carefully - count twice if needed
2. Separate and count each denomination
3. Record the exact count - don't adjust to match expected
4. Document any variances with notes
5. Investigate discrepancies before closing

### Security Tips

- Only authorized users should access the register
- Change register access passwords regularly
- Review register history regularly for anomalies
- Keep backup cash in a secure location

## Troubleshooting

### "Register Required" Error

**Problem**: Cannot process orders without open register

**Solution**:
1. Open a register before processing orders
2. Or disable "Require Open Register" in settings (not recommended)

### Large Variance at Close

**Problem**: Significant difference between expected and actual cash

**Investigation Steps**:
1. Recount the cash drawer
2. Review all transactions for the shift
3. Check for voided or cancelled orders
4. Look for unrecorded cash payouts
5. Verify no orders were processed outside POS

### Cannot Close Register

**Problem**: Close register button not working

**Solution**:
1. Ensure you have the **Registers** permission
2. Check for any pending transactions
3. Clear browser cache and try again

### Register Shows Wrong User

**Problem**: Register associated with wrong user

**Solution**:
1. Each user should log in with their own account
2. Open register after logging in
3. Close register before logging out

## Permissions

Register operations require specific permissions:

| Permission | Allows |
|------------|--------|
| **Registers** | Open, close, and view register status |
| **Reports** | View register history and reports |

Assign these permissions in **Users** > **Roles**.

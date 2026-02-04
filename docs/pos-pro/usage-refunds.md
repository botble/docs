# Processing Refunds

POS Pro includes a comprehensive refund system that allows you to process returns, issue refunds, and maintain accurate inventory.

## Overview

The refund system supports:

- Full or partial order refunds
- Multiple refund methods (cash, original tender, store credit)
- Approval workflow for high-value refunds
- Automatic inventory restocking
- Configurable refund window
- Detailed refund receipts

## Configuration

Before processing refunds, configure the refund settings:

1. Go to **POS** > **Settings**
2. Find the **Refund Settings** section
3. Configure:

| Setting | Description |
|---------|-------------|
| **Enable POS Refunds** | Turn refund functionality on/off |
| **Approval Threshold** | Amount requiring manager approval (0 = disabled) |
| **Refund Window (Days)** | Days after purchase refunds are allowed (0 = unlimited) |
| **Auto Restock Items** | Automatically return items to inventory |

## Accessing Refunds

1. Go to **POS** > **Orders**
2. Find the order to refund
3. Click the **Refund** button
4. Or go directly to **POS** > **Refunds**

## Looking Up an Order

### By Order Code

1. Enter the order code in the search field
2. Click **Lookup**
3. The order details are displayed

### By Order ID

1. Enter the order ID number
2. Click **Lookup**
3. The order details are displayed

### Order Information Displayed

When an order is found, you'll see:

- Order code and date
- Customer information
- Original payment method(s)
- Line items with quantities
- Previously refunded items (if any)
- Refundable items and quantities

## Processing a Refund

### Step 1: Select Items to Refund

1. Review the order items
2. Check the items to refund
3. Enter the quantity to refund for each item
4. The refund amount calculates automatically

::: tip
You can only refund up to the original quantity minus any previously refunded quantity.
:::

### Step 2: Choose Refund Method

Select how to issue the refund:

| Method | Description | When to Use |
|--------|-------------|-------------|
| **Cash** | Return cash from register | Customer paid cash and wants cash back |
| **Original Tender** | Refund to original payment method | Card payments, bank transfers |
| **Store Credit** | Issue store credit to customer | Customer wants credit for future purchase |

### Step 3: Review and Process

1. Review the refund summary:
   - Items being refunded
   - Refund amount
   - Refund method
2. Add notes if needed (reason for refund)
3. Click **Process Refund**

## Refund Methods Explained

### Cash Refund

- Cash is returned from the register drawer
- Updates the register's expected cash amount
- Requires an open register
- Shows in register close report

::: warning
If the register doesn't have sufficient cash, you'll see a warning. Ensure adequate cash is available before processing.
:::

### Original Tender Refund

Refunds to the original payment method:

- **Card**: Processes refund through Stripe Terminal
- **Bank Transfer**: Marks for manual bank refund
- **Gift Card**: Credits back to the gift card
- **Store Credit**: Restores the store credit

For card refunds, the refund is processed automatically through the payment gateway.

### Store Credit Refund

- Creates store credit on the customer's account
- Customer can use credit on future purchases
- Credit is applied automatically at checkout

## Approval Workflow

If an approval threshold is configured:

### When Approval is Required

- Refund amount exceeds the threshold
- User doesn't have "Approve High-Value Refunds" permission

### Approval Process

1. Cashier initiates refund
2. System shows "Requires Approval" message
3. Manager logs in with their credentials
4. Manager reviews and approves the refund
5. Refund is processed

### Manager Override

Users with **Approve High-Value Refunds** permission can:

- Process high-value refunds without additional approval
- Approve refunds initiated by other users

## Inventory Restocking

When **Auto Restock Items** is enabled:

1. Refunded items are automatically added back to inventory
2. Stock levels update immediately
3. Products become available for sale again

When disabled:

- Inventory is not updated automatically
- Use this for damaged or unsellable returns
- Manually adjust inventory if needed

## Refund Window

The refund window limits how long after purchase refunds are accepted:

| Setting | Behavior |
|---------|----------|
| **0 days** | No time limit (refunds always allowed) |
| **7 days** | Refunds only within 7 days of purchase |
| **30 days** | Refunds only within 30 days of purchase |

Orders outside the refund window cannot be refunded through POS.

## Refund Receipt

After processing a refund:

1. A refund receipt is generated
2. Click **Print Refund Receipt** to print
3. The receipt shows:
   - Original order information
   - Refunded items and quantities
   - Refund amount
   - Refund method
   - Date and time of refund
   - Cashier who processed it

## Partial Refunds

POS Pro supports partial refunds:

1. Select only some items from the order
2. Or refund partial quantities of items
3. The remaining items stay on the original order
4. Multiple partial refunds can be processed on one order

### Example

Original order: 3 shirts, 2 pants

- First refund: 1 shirt
- Second refund: 1 pants
- Remaining on order: 2 shirts, 1 pants

## Viewing Refund History

### On an Order

1. Look up the order
2. View the "Refund History" section
3. See all refunds processed for this order

### In Reports

1. Go to **POS** > **Reports**
2. View refund totals in the reports dashboard
3. Filter by date range

## Troubleshooting

### "Refunds Disabled" Error

**Solution**: Enable refunds in POS Settings

### "Outside Refund Window" Error

**Problem**: Order is older than the configured refund window

**Solutions**:
1. Increase the refund window in settings
2. Process refund through main admin panel instead

### "Insufficient Cash" Warning

**Problem**: Register doesn't have enough cash for refund

**Solutions**:
1. Add cash to the register
2. Choose a different refund method (store credit)
3. Process as original tender refund

### "Approval Required" Message

**Problem**: Refund exceeds approval threshold

**Solutions**:
1. Get a manager to approve the refund
2. User with approval permission can process it
3. Reduce the approval threshold in settings

### Card Refund Failed

**Problem**: Stripe Terminal refund didn't process

**Solutions**:
1. Check Stripe Terminal connection
2. Verify the original charge can be refunded
3. Try processing refund again
4. Contact Stripe support for gateway issues

## Best Practices

### Before Processing Refunds

1. Verify the original receipt or order number
2. Inspect returned items for damage
3. Confirm the customer's identity if needed
4. Check if order is within refund window

### During Refund Processing

1. Select the correct items and quantities
2. Choose appropriate refund method
3. Add notes explaining the reason
4. Verify the refund amount before processing

### After Processing

1. Print and provide the refund receipt
2. If cash refund, count out the cash to customer
3. For card refunds, inform customer of processing time (3-5 business days)
4. Return items to inventory if appropriate

## Permissions

Refund operations require specific permissions:

| Permission | Allows |
|------------|--------|
| **Refunds** | Process refunds within threshold |
| **Approve High-Value Refunds** | Process/approve refunds above threshold |

Assign these permissions in **Users** > **Roles**.

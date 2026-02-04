# Marketplace Integration

POS Pro integrates with the Botble Marketplace plugin to provide point-of-sale capabilities for multi-vendor stores.

## Overview

When used with the Marketplace plugin, POS Pro enables:

- Vendor access to POS from their dashboard
- Automatic order splitting by vendor
- Separate cash register management per vendor
- Vendor-specific refund processing
- Optional Stripe Terminal access for vendors

## Requirements

- Botble Marketplace plugin installed and active
- POS Pro plugin installed and active
- Vendor accounts configured

## Configuration

### Enabling Marketplace Features

1. Go to **POS** > **Settings**
2. Find the **Marketplace Settings** section
3. Configure the options:

| Setting | Description |
|---------|-------------|
| **Separate Orders by Vendor** | Split multi-vendor carts into separate orders |
| **Enable POS for Vendors** | Allow vendors to access POS |
| **Enable Register History for Vendors** | Vendors can view their shift history |
| **Enable Refunds for Vendors** | Vendors can process refunds |
| **Enable Stripe Terminal for Vendors** | Vendors can use card readers |

4. Click **Save Settings**

## Vendor POS Access

### Enabling for Vendors

1. Enable **Enable POS for Vendors** in settings
2. Vendors see "POS" in their dashboard menu
3. Vendors can only see their own products

### Vendor Dashboard

Vendors access POS from their vendor dashboard:

1. Vendor logs into their account
2. Goes to Vendor Dashboard
3. Clicks **POS** in the menu
4. POS interface loads with vendor's products only

### Product Visibility

In vendor POS:
- Only vendor's own products are shown
- Products from other vendors are hidden
- Shared/marketplace products may appear based on settings

## Order Splitting

When **Separate Orders by Vendor** is enabled:

### How It Works

1. Customer adds products from multiple vendors to cart
2. At checkout, the system detects multiple vendors
3. Separate orders are created for each vendor
4. Each vendor sees only their portion of the sale

### Example

Customer cart:
- Product A (Vendor 1) - $50
- Product B (Vendor 1) - $30
- Product C (Vendor 2) - $40

Results in:
- Order #1001 for Vendor 1: $80
- Order #1002 for Vendor 2: $40

### Payment Handling

- Customer pays the full amount once
- Payment is recorded on the primary order
- Vendor orders are linked to the main transaction
- Marketplace commission is calculated per vendor

## Vendor Cash Register

### Enabling Register History

1. Enable **Enable Register History for Vendors** in settings
2. Vendors can open/close their own registers
3. Vendors see only their shift history

### Vendor Register Operations

Vendors can:
- Open a register for their shift
- Track cash sales through their POS
- Close register and reconcile
- View their past shifts

Vendors cannot:
- See other vendors' registers
- Access admin register management
- View store-wide cash reports

### Register Isolation

Each vendor's register is independent:
- Separate starting cash
- Separate sales tracking
- Separate closing reconciliation
- No cross-vendor data access

## Vendor Refunds

### Enabling Vendor Refunds

1. Enable **Enable Refunds for Vendors** in settings
2. Vendors see "Refunds" option in their POS
3. Vendors can process refunds for their orders only

### Refund Limitations

Vendors can:
- Look up their own orders
- Process refunds for their products
- Issue cash, original tender, or store credit refunds

Vendors cannot:
- Refund other vendors' orders
- Override approval thresholds
- Access admin refund management

### Approval Workflow

If approval threshold is set:
- Vendor initiates refund
- High-value refunds require admin approval
- Admin can approve/deny from main dashboard

## Vendor Stripe Terminal

### Enabling Card Readers for Vendors

1. Enable **Enable Stripe Terminal for Vendors** in settings
2. Configure main Stripe Terminal settings first
3. Vendors can use shared card readers

### Reader Access

Vendors can:
- View available card readers
- Process card payments
- Set their preferred reader

Vendors cannot:
- Add/remove readers from Stripe
- Access Stripe Dashboard directly
- Modify Terminal configuration

### Payment Processing

1. Vendor selects card payment
2. Payment processes through store's Stripe account
3. Funds go to main store account
4. Vendor receives their portion per marketplace rules

## Vendor Reports

### Available Reports

Vendors can view:
- Their POS sales totals
- Order count and average value
- Sales by payment method
- Top selling products (their own)

### Report Limitations

Vendors cannot see:
- Store-wide reports
- Other vendors' data
- Full marketplace analytics

## Admin Management

### Monitoring Vendor POS

Admins can:
- View all vendor POS orders
- See vendor register history
- Process refunds for any vendor
- Access all reports

### Order Management

- Admin orders page shows all POS orders
- Filter by vendor to see specific vendor's orders
- Manage orders same as regular admin

### Commission Handling

POS orders follow standard marketplace commission:
- Commission calculated on vendor portion
- Deducted per marketplace settings
- Visible in vendor earnings

## Troubleshooting

### Vendor Can't Access POS

**Possible Causes**:
- POS for vendors not enabled
- Vendor account not active
- Missing permissions

**Solutions**:
1. Enable "Enable POS for Vendors" in settings
2. Verify vendor account is approved/active
3. Check vendor role has necessary permissions

### Vendor Products Not Showing

**Possible Causes**:
- Products not published
- Products not assigned to vendor
- Product stock issues

**Solutions**:
1. Verify products are published
2. Check product ownership
3. Ensure products have stock (if tracked)

### Order Not Splitting

**Possible Causes**:
- Setting not enabled
- Single vendor cart
- Configuration issue

**Solutions**:
1. Enable "Separate Orders by Vendor"
2. Test with products from multiple vendors
3. Check marketplace plugin is active

### Vendor Register Issues

**Possible Causes**:
- Register history not enabled
- Permission issues
- Existing open register

**Solutions**:
1. Enable "Enable Register History for Vendors"
2. Verify vendor has register permissions
3. Close any existing open registers

### Vendor Refund Failed

**Possible Causes**:
- Refunds not enabled for vendors
- Order belongs to another vendor
- Approval required

**Solutions**:
1. Enable "Enable Refunds for Vendors"
2. Verify order ownership
3. Admin approves if above threshold

## Best Practices

### For Store Admins

1. **Clear Policies**: Define vendor POS usage policies
2. **Training**: Train vendors on POS operations
3. **Monitoring**: Regularly review vendor transactions
4. **Support**: Provide vendor support for issues

### For Vendors

1. **Regular Reconciliation**: Close register daily
2. **Accurate Transactions**: Process all sales through POS
3. **Refund Documentation**: Note reasons for refunds
4. **Report Issues**: Contact admin for problems

## Permissions Summary

| Feature | Required Setting |
|---------|------------------|
| Vendor POS Access | Enable POS for Vendors |
| Vendor Registers | Enable Register History for Vendors |
| Vendor Refunds | Enable Refunds for Vendors |
| Vendor Card Reader | Enable Stripe Terminal for Vendors |

All features require the base Marketplace plugin to be active.

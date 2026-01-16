# Marketplace Integration

This guide explains how the Affiliate Pro plugin integrates with the Marketplace plugin in a multivendor environment.

## Overview

When both Affiliate Pro and Marketplace plugins are active, the affiliate system works seamlessly with vendors:

- **Vendors can control affiliate settings** for their products
- **Affiliate commissions are deducted from vendor revenue** when orders are completed
- **Clear commission structure** between marketplace, vendor, and affiliate

## How Commission Works in Marketplace

In a multivendor marketplace with an affiliate program, there are three parties involved:

| Party | Role |
|-------|------|
| **Marketplace** | Takes a commission fee from vendors (e.g., 10%) |
| **Vendor** | Receives revenue minus marketplace fee and affiliate commission |
| **Affiliate** | Receives commission for referred sales |

### Commission Flow Example

For a $100 product sale referred by an affiliate:

| Component | Amount |
|-----------|--------|
| Product Price | $100.00 |
| Marketplace Fee (10%) | -$10.00 |
| Affiliate Commission (5%) | -$5.00 |
| **Vendor Revenue** | **$85.00** |

The affiliate commission is deducted from the vendor's revenue because:
- Affiliates drive sales to specific vendor's products
- Vendors benefit directly from the referred sale
- The marketplace already takes their commission

## Vendor Affiliate Settings

### Accessing Affiliate Settings (Vendor Dashboard)

Vendors can manage affiliate settings for their products:

1. Log in to the **Vendor Dashboard**
2. Navigate to **Products**
3. Edit a product
4. Find the **Affiliate Settings** section

### Available Options

- **Enable Affiliate**: Toggle to enable/disable affiliate program for this product
- **Use Custom Commission**: Enable to set a custom commission rate instead of the default
- **Commission Percentage**: Set a custom commission rate (0.01% - 100%)

### When to Disable Affiliate

Vendors may want to disable affiliate for products with:
- Very low profit margins
- Already discounted prices
- Exclusive/limited products
- Products with high return rates

## Revenue Tracking

### Viewing Revenue with Affiliate Deductions

Vendors can see affiliate commission deductions in their revenue reports:

1. Go to **Vendor Dashboard** > **Revenues**
2. View individual order revenue records
3. The `affiliate_commission` field shows the deducted amount

### Revenue Record Fields

| Field | Description |
|-------|-------------|
| `sub_amount` | Order amount (excluding shipping, tax, payment fee) |
| `fee` | Marketplace commission fee |
| `affiliate_commission` | Affiliate commission deducted |
| `amount` | Final vendor revenue |

### Calculation Formula

```
Vendor Revenue = Order Amount - Shipping - Tax - Payment Fee - Marketplace Fee - Affiliate Commission
```

## Admin Configuration

### Setting Default Commission

Admins set the default affiliate commission that applies to all products:

1. Go to **Settings** > **E-commerce** > **Affiliate Settings**
2. Set the **Default Commission Percentage**
3. This applies to all products unless overridden

### Commission Priority

Commission rates are applied in this priority order:

1. **Product-specific commission** (set by vendor or admin)
2. **Category-based commission** (if enabled)
3. **Affiliate-specific commission** (if affiliate has custom rate)
4. **Default commission** (from settings)

## Best Practices

### For Marketplace Admins

1. **Set reasonable default commissions** that don't overly burden vendors
2. **Communicate clearly** about how affiliate commissions affect vendor payouts
3. **Monitor vendor satisfaction** with the affiliate program
4. **Consider category-based rates** for different product margins

### For Vendors

1. **Review product margins** before enabling affiliate
2. **Use custom commissions** for products with specific margin requirements
3. **Track affiliate performance** to see ROI from affiliate traffic
4. **Disable affiliate** for products where it doesn't make financial sense

### For Affiliates

1. **Focus on products with affiliate enabled** for guaranteed commissions
2. **Check product pages** for affiliate availability
3. **Promote vendor stores** with good affiliate programs

## Technical Details

### Database Schema

The `mp_customer_revenues` table includes:

```sql
affiliate_commission DECIMAL(15,2) DEFAULT 0
```

This field stores the affiliate commission amount deducted from each revenue record.

### Filter Hook

Developers can modify the affiliate commission calculation using the filter:

```php
add_filter('marketplace_calculate_vendor_revenue', function (array $data, Order $order) {
    // Modify $data['amount'] or $data['affiliate_commission']
    return $data;
}, 10, 2);
```

### Data Structure

The filter receives and returns:

```php
[
    'sub_amount' => float,           // Order amount without shipping/tax
    'fee' => float,                  // Marketplace fee
    'affiliate_commission' => float, // Affiliate commission (added by Affiliate Pro)
    'amount' => float,               // Final vendor revenue
]
```

## Troubleshooting

### Affiliate Commission Not Deducted

**Problem**: Vendor revenue doesn't show affiliate commission deduction

**Solutions**:
1. Ensure both Affiliate Pro and Marketplace plugins are active
2. Verify the order was placed through an affiliate link
3. Check that a commission record exists for the order
4. Run the migration: `php artisan migrate`

### Vendor Can't See Affiliate Settings

**Problem**: Affiliate settings not showing in vendor product form

**Solutions**:
1. Ensure Affiliate Pro plugin is active
2. Clear application cache: `php artisan cache:clear`
3. Verify Marketplace plugin is properly installed

### Incorrect Commission Calculations

**Problem**: Commission amounts don't match expected values

**Solutions**:
1. Check the commission rate settings
2. Verify product-level commission overrides
3. Review category-based commission settings
4. Check if affiliate has a custom commission rate

## FAQ

### Does the vendor pay the affiliate commission?

Yes, in this implementation the affiliate commission is deducted from the vendor's revenue. This is because the affiliate drives traffic specifically to the vendor's products, so the vendor benefits from the sale.

### Can vendors opt out of the affiliate program?

Yes, vendors can disable affiliate for individual products in their product settings. This gives vendors control over which products participate in the affiliate program.

### How is the commission calculated for orders with multiple vendors?

Each vendor's portion of the order is calculated separately. Affiliate commission is only deducted from products where:
1. Affiliate is enabled for that product
2. The product belongs to that vendor's store

### What happens if a vendor disables affiliate after an order is placed?

The commission is calculated at the time the order is placed, not when it's completed. If affiliate was enabled when the order was placed, the commission will still be paid to the affiliate.

### Can the marketplace set a maximum affiliate commission for vendors?

Currently, vendors can set any commission rate for their products. Marketplace admins can set the default rate and category-based rates, but vendors can override these with product-specific rates.

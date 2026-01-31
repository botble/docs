# Pricing Rules

Pricing rules allow you to create sophisticated quantity-based tiered pricing for specific products and customer groups. This is perfect for encouraging bulk purchases with progressively better discounts.

## Understanding Pricing Rules

Pricing rules define different prices based on quantity purchased. Unlike customer group discounts (which apply store-wide), pricing rules are:

- **Product-specific** - Apply to individual products
- **Quantity-based** - Different prices for different quantity ranges
- **Group-specific** - Can target specific customer groups
- **Stackable** - Can work with or without group discounts

**Example:**
Base Price: $100 per unit

| Quantity | Price Per Unit | Total |
|----------|----------------|-------|
| 1-49 | $100 | - |
| 50-99 | $90 | $4,500+ |
| 100-249 | $85 | $8,500+ |
| 250+ | $80 | $20,000+ |

## Creating Pricing Rules

### Step 1: Navigate to Pricing Rules

1. Go to **Ecommerce** > **Wholesale** > **Pricing Rules**
2. Click the **Create** button

![Pricing Rules List](../images/pricing-rules-list.png)

### Step 2: Select Product and Group

| Field | Description |
|-------|-------------|
| **Product** | Which product this rule applies to |
| **Customer Group** | Which group gets this pricing (or "All Wholesale Customers") |
| **Status** | Published (active) or Draft (inactive) |

::: tip Multi-Store
If using multi-store, you can also select which store this rule applies to.
:::

### Step 3: Define Quantity Tier

| Field | Description |
|-------|-------------|
| **Min Quantity** | Starting quantity for this tier |
| **Max Quantity** | Ending quantity (leave empty for unlimited) |

**Examples:**

| Tier | Min Qty | Max Qty | Covers |
|------|---------|---------|--------|
| 1 | 50 | 99 | 50-99 units |
| 2 | 100 | 249 | 100-249 units |
| 3 | 250 | (empty) | 250+ units |

::: warning No Gaps
Ensure quantity ranges don't have gaps. If you want retail customers to buy 1-49 at regular price, you don't need a rule for that range.
:::

### Step 4: Configure Discount

#### Discount Types

**1. Percentage Discount**

Reduces price by a percentage off the base price.

**Example:** 15% off $100 = $85
```
Base Price: $100
Discount: 15%
Final Price: $100 - ($100 × 0.15) = $85
```

**2. Fixed Amount Discount**

Reduces price by a fixed dollar amount.

**Example:** $20 off $100 = $80
```
Base Price: $100
Discount: $20
Final Price: $100 - $20 = $80
```

**3. Fixed Price**

Sets an absolute price regardless of the base price.

**Example:** Fixed at $75
```
Base Price: $100 (ignored)
Fixed Price: $75
Final Price: $75
```

::: tip When to Use Each Type

- **Percentage** - Most common, scales with price changes
- **Fixed Amount** - Good for promotions, simple to understand
- **Fixed Price** - Best for contract pricing, wholesale catalogs
:::

### Step 5: Save the Rule

Click **Save** to create the pricing rule.

## Example Pricing Structures

### Example 1: Standard Bulk Discount

**Product:** Premium Widget (Base: $50)

**For All Wholesale Customers:**

| Min | Max | Type | Value | Final Price | Savings |
|-----|-----|------|-------|-------------|---------|
| 10 | 49 | Percentage | 10% | $45.00 | $5.00 |
| 50 | 99 | Percentage | 15% | $42.50 | $7.50 |
| 100 | - | Percentage | 20% | $40.00 | $10.00 |

### Example 2: Aggressive Volume Pricing

**Product:** Industrial Part (Base: $200)

**For Gold Distributors:**

| Min | Max | Type | Value | Final Price | Savings |
|-----|-----|------|-------|-------------|---------|
| 25 | 99 | Fixed Amount | $30 | $170.00 | $30.00 |
| 100 | 249 | Fixed Amount | $50 | $150.00 | $50.00 |
| 250 | 499 | Fixed Price | $125 | $125.00 | $75.00 |
| 500 | - | Fixed Price | $100 | $100.00 | $100.00 |

### Example 3: Case Pack Pricing

**Product:** Beverage Case (Base: $24)

**For Retailers:**

| Min | Max | Type | Value | Final Price | Note |
|-----|-----|------|-------|-------------|------|
| 12 | 23 | Percentage | 5% | $22.80 | 1 case |
| 24 | 47 | Percentage | 10% | $21.60 | 2 cases |
| 48 | 95 | Percentage | 15% | $20.40 | 4 cases |
| 96 | - | Percentage | 20% | $19.20 | 8+ cases |

### Example 4: Group-Specific Pricing

**Product:** Professional Tool (Base: $150)

**Platinum Members:**

| Min | Max | Type | Value | Final Price |
|-----|-----|------|-------|-------------|
| 10 | 49 | Fixed Price | $105 | $105.00 |
| 50 | 99 | Fixed Price | $95 | $95.00 |
| 100 | - | Fixed Price | $85 | $85.00 |

**Gold Members:**

| Min | Max | Type | Value | Final Price |
|-----|-----|------|-------|-------------|
| 10 | 49 | Fixed Price | $120 | $120.00 |
| 50 | 99 | Fixed Price | $110 | $110.00 |
| 100 | - | Fixed Price | $100 | $100.00 |

## Managing Pricing Rules

### Viewing Rules

1. Go to **Ecommerce** > **Wholesale** > **Pricing Rules**
2. View list of all rules
3. Filter by product, group, or status
4. Sort by product name or date

### Editing Rules

1. Find rule in list
2. Click **Edit** button
3. Make changes
4. Save

::: warning Price Changes
Price changes take effect immediately. Active carts will see new prices on next page load.
:::

### Duplicating Rules

To create similar rules for different groups:

1. Edit existing rule
2. Change customer group
3. Adjust discount values if needed
4. Save as new rule

### Deleting Rules

1. Find rule in list
2. Click **Delete** button
3. Confirm deletion

Product reverts to group discount or retail price.

### Bulk Management

To update multiple rules:

1. Export current rules (if available)
2. Make changes
3. Import updated rules

Or use database queries for bulk updates.

## Pricing Rule Strategies

### Strategy 1: Progressive Discounts

Encourage larger orders with increasing discounts:

| Quantity | Discount | Message to Customer |
|----------|----------|---------------------|
| 50-99 | 10% off | Good value |
| 100-249 | 15% off | Better value |
| 250+ | 20% off | Best value! |

### Strategy 2: Break-Point Pricing

Create attractive psychological break points:

| Quantity | Price | Total Cost |
|----------|-------|------------|
| 1-49 | $50 | - |
| 50-99 | $45 | **Save $250** on 50 units |
| 100-249 | $40 | **Save $1,000** on 100 units |
| 250+ | $35 | **Save $3,750** on 250 units |

### Strategy 3: Group Tiering

Different tiers for different groups:

**Premium Group:** Lower minimums, better prices
**Standard Group:** Higher minimums, standard discounts
**Trial Group:** Limited tiers, modest discounts

### Strategy 4: Seasonal Tiers

Adjust tiers based on season:

**Peak Season:** Higher minimums, lower discounts
**Off-Season:** Lower minimums, aggressive discounts

## Combining Rules with Group Discounts

Pricing rules can work with customer group discounts:

### Scenario 1: Rules Replace Group Discount

**Setting:** Group discount = 10%, Pricing rule = 15% off at 50+ units

**Result:** At 50 units, customer gets 15% (rule overrides group)

### Scenario 2: Rules Stack with Group Discount

**Setting:** Group discount = 10%, Pricing rule = Additional 10% at 50+ units

**Result:** At 50 units, customer gets 19% total (10% + 9%)

::: tip Configuration
Check your settings to determine if rules stack or replace group discounts.
:::

## Displaying Pricing Tables

### Frontend Display

When pricing rules exist, wholesale customers see a pricing table on product pages:

![Wholesale Pricing Table](../images/pricing-table-display.png)

**Table Shows:**
- Quantity ranges
- Price per unit
- Savings amount
- Total cost examples

### Customizing Display

In **Settings** > **Wholesale**:

| Setting | Options |
|---------|---------|
| **Style** | Modern, Minimal, Classic, Elegant |
| **Display Mode** | Full (with savings) or Compact |
| **Show Savings** | Yes/No |
| **Table Title** | Custom title |

### Mobile Display

Pricing tables are responsive and work on all devices:
- Stacked layout on mobile
- Swipeable on tablets
- Full table on desktop

## Advanced Features

### Multi-Store Pricing

If using multi-store, create store-specific rules:

**Example:**
- Store 1 (US): Prices in USD
- Store 2 (EU): Prices in EUR
- Store 3 (UK): Prices in GBP

Each store can have different pricing rules.

### Currency Conversion

Pricing rules respect multi-currency:
- Discounts calculated in base currency
- Converted to display currency
- Maintains percentage accuracy

### Stock Awareness

Pricing tables automatically:
- Hide when product out of stock
- Update with stock changes
- Show availability status

## Testing Pricing Rules

### Test Checklist

- [ ] Create rule for test product
- [ ] Set rule to Published
- [ ] Assign test customer to correct group
- [ ] Log in as test customer
- [ ] View product page
- [ ] Verify pricing table displays
- [ ] Add minimum quantity to cart
- [ ] Verify price in cart
- [ ] Add more to trigger next tier
- [ ] Verify price updates
- [ ] Complete test checkout
- [ ] Verify price in order

### Common Test Scenarios

**Test 1: Below Minimum**
- Add less than min quantity
- Verify retail/group price applies
- No pricing table shown

**Test 2: First Tier**
- Add minimum quantity
- Verify first tier price applies
- Pricing table highlights tier

**Test 3: Tier Transition**
- Add quantity at tier boundary (e.g., 100)
- Verify correct tier applies
- Check savings calculation

**Test 4: Highest Tier**
- Add quantity above all tiers
- Verify best price applies
- Check unlimited tier works

**Test 5: Multiple Products**
- Add multiple products with rules
- Each applies its own rules
- Total quantity doesn't combine

## Troubleshooting

### Pricing table not showing

1. Verify pricing rules exist for product
2. Check rule status is "Published"
3. Verify customer is in correct group
4. Check product visibility settings
5. Clear all caches

### Wrong price in cart

1. Check which tier applies
2. Verify minimum quantity met
3. Check group discount vs rule priority
4. Clear cart and re-add
5. Review rule configuration

### Savings calculation incorrect

1. Verify base price
2. Check discount type
3. Recalculate manually
4. Check for rounding settings
5. Review tax calculations

### Rules not applying to customer

1. Verify customer group assignment
2. Check rule targets correct group
3. Ensure customer is logged in
4. Check rule status
5. Clear caches

## Best Practices

### 1. Logical Breakpoints

Use quantity breaks that make business sense:
- Packaging units (cases, pallets)
- Shipping weight breaks
- Manufacturing minimums
- Psychological numbers (50, 100, 250, 500)

### 2. Clear Value Proposition

Make savings obvious:
- Show original price
- Display savings amount
- Calculate total savings
- Use "Save $X" messaging

### 3. Encourage Next Tier

Show customers what they could save:
- "Buy 20 more units and save an additional $200"
- "Only 15 units away from 15% discount"
- Progress indicators

### 4. Reasonable Minimums

Don't set minimums too high:
- Customer must be able to afford it
- Storage/space considerations
- Cash flow implications
- Industry norms

### 5. Regular Review

- Monitor which tiers are most used
- Adjust minimums based on data
- Update discounts seasonally
- Test different structures

## Related Documentation

- [Customer Groups](/wholesale/usage/customer-groups) - Create and manage customer groups
- [Admin Dashboard](/wholesale/usage/admin-dashboard) - Manage all wholesale features
- [Configuration](/wholesale/configuration) - System-wide wholesale settings

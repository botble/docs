# Usage Guide

This guide covers everything you need to know about using the Wholesale plugin to create effective B2B pricing strategies for your e-commerce store.

## Quick Start

### For Store Administrators

1. Navigate to **Ecommerce > Wholesale** in the admin sidebar
2. Create customer groups with discount settings
3. Create pricing rules for tiered discounts
4. Set MOQ (Minimum Order Quantity) on products
5. Configure product visibility and access
6. Review and approve wholesale applications

### For Wholesale Customers

1. Register for a wholesale account
2. Wait for admin approval (if required)
3. Log in to see wholesale prices
4. Add products to cart meeting MOQ requirements
5. Checkout and receive special wholesale pricing

## Customer Groups

Customer groups are the foundation of the wholesale system. They define:

- Who gets special pricing
- What discount they receive
- Minimum order requirements
- Access to specific products

### Creating a Customer Group

1. Go to **Ecommerce > Wholesale > Customer Groups**
2. Click **Create** button
3. Fill in the group details:

![Create Customer Group](./images/create-customer-group.png)

#### Group Settings

| Field | Description |
|-------|-------------|
| **Name** | Descriptive name (e.g., "Gold Resellers", "VIP Wholesalers") |
| **Description** | Internal notes about this group |
| **Status** | Published (active) or Draft (inactive) |
| **Priority** | Numeric priority for resolving conflicts (higher = takes precedence) |

#### Discount Settings

| Field | Description |
|-------|-------------|
| **Discount Type** | Choose Percentage or Fixed Amount |
| **Discount Value** | Amount or percentage off regular price |

**Example:**
- Discount Type: Percentage
- Discount Value: 20
- Result: 20% off all products for this group

#### Order Requirements

| Field | Description |
|-------|-------------|
| **Min Order Quantity** | Minimum total items per order |
| **Min Order Value** | Minimum order subtotal |

**Example:**
- Min Order Quantity: 50
- Min Order Value: $500
- Result: Customer must order at least 50 items totaling $500

### Assigning Customers to Groups

#### Manual Assignment

1. Go to **Customers** in admin
2. Edit a customer account
3. Find "Wholesale" section
4. Select customer group(s)
5. Optionally set expiration date
6. Save changes

#### Assignment via Applications

When customers submit wholesale applications:

1. Go to **Ecommerce > Wholesale > Applications**
2. Review application details
3. Click **Approve** and select customer group
4. System automatically assigns group

### Managing Multiple Groups

When multiple groups is enabled, customers can belong to several groups:

**Conflict Resolution:**
- **Priority Strategy** - Uses group with highest priority number
- **Highest Discount** - Applies best discount for customer
- **Lowest Discount** - Applies lowest discount

## Pricing Rules

Pricing rules create quantity-based tiered discounts for specific products.

### Creating Pricing Rules

1. Go to **Ecommerce > Wholesale > Pricing Rules**
2. Click **Create** button
3. Configure the rule:

![Create Pricing Rule](./images/create-pricing-rule.png)

#### Rule Configuration

| Field | Description |
|-------|-------------|
| **Product** | Select the product this rule applies to |
| **Customer Group** | Which group gets this pricing |
| **Status** | Published or Draft |

#### Quantity Tiers

| Field | Description |
|-------|-------------|
| **Min Quantity** | Starting quantity for this tier |
| **Max Quantity** | Ending quantity (leave empty for unlimited) |

#### Discount Settings

| Field | Description |
|-------|-------------|
| **Discount Type** | Percentage, Fixed Amount, or Fixed Price |
| **Discount Value** | Discount amount or price |

### Example: Multi-Tier Pricing

**Product: Premium Widget** (Base Price: $100)

**For Gold Resellers:**

| Tier | Min Qty | Max Qty | Type | Value | Final Price |
|------|---------|---------|------|-------|-------------|
| 1 | 10 | 49 | Percentage | 10% | $90.00 |
| 2 | 50 | 99 | Percentage | 15% | $85.00 |
| 3 | 100 | 249 | Percentage | 20% | $80.00 |
| 4 | 250 | - | Fixed Price | $75 | $75.00 |

Customer ordering 150 units pays $80 each = $12,000 total

## Product MOQ (Minimum Order Quantity)

MOQ enforces minimum purchase quantities and increments for products.

### Setting Product MOQ

1. Edit a product in admin
2. Go to "Wholesale Settings" tab
3. Configure MOQ settings:

![Product MOQ Settings](./images/product-moq.png)

| Field | Description |
|-------|-------------|
| **Customer Group** | Apply to specific group or all wholesale |
| **Min Quantity** | Smallest order quantity allowed |
| **Quantity Increment** | Must order in multiples of this |

### Example MOQ Scenarios

**Scenario 1: Simple MOQ**
- Min Quantity: 12
- Increment: 1
- Valid: 12, 13, 14, 15...

**Scenario 2: Case Quantities**
- Min Quantity: 24
- Increment: 12
- Valid: 24, 36, 48, 60...
- Invalid: 30, 40, 55

**Scenario 3: Pallet Quantities**
- Min Quantity: 100
- Increment: 100
- Valid: 100, 200, 300...

## Product Visibility

Control which products wholesale customers can see and purchase.

### Visibility Options

| Visibility | Who Can See | Use Case |
|------------|-------------|----------|
| **Public** | Everyone | Standard retail products |
| **Wholesale Only** | Approved wholesale customers | B2B-only products |
| **Hidden** | No one (direct link only) | Coming soon, clearance |

### Setting Visibility

1. Edit product in admin
2. Find "Wholesale Settings" section
3. Select visibility option
4. Save product

### Product Group Access

Further restrict wholesale products to specific groups:

1. Set product visibility to "Wholesale Only"
2. Select specific customer groups
3. Only those groups see the product
4. Leave empty for all wholesale customers

**Example:**
- Product: "Premium Industrial Widget"
- Visibility: Wholesale Only
- Allowed Groups: Platinum, Gold
- Result: Only Platinum and Gold members see this product

## Frontend Display

### Product Page Display

Wholesale customers see pricing tables on product pages:

![Wholesale Pricing Table](./images/pricing-table.png)

The table shows:
- Quantity ranges
- Discounted prices per tier
- Savings amounts (optional)
- MOQ requirements

### Cart Integration

When wholesale customers add products:

- Prices automatically reflect group discounts
- MOQ validation enforces minimum quantities
- Pricing tiers apply based on quantity
- Order minimum requirements checked

### Checkout

During checkout:

- Final wholesale prices displayed
- Order minimums verified
- Restricted products validated
- Standard checkout flow

## Wholesale Registration

### Customer Application Process

1. Customer visits registration page
2. Fills out wholesale application form
3. Submits application
4. Receives confirmation email
5. Waits for admin review
6. Gets approval/rejection notification
7. Can log in and see wholesale prices

### Admin Approval Process

1. Receive notification of new application
2. Go to **Ecommerce > Wholesale > Applications**
3. Review application details
4. Click **Approve** or **Reject**
5. Select customer group (if approving)
6. System sends email to applicant
7. Customer gains wholesale access

## Best Practices

### Setting Effective Discounts

1. **Tiered Approach** - Reward larger orders with better discounts
2. **Competitive Pricing** - Research industry standards
3. **Profitability** - Ensure margins remain positive
4. **Clear Breaks** - Use logical quantity breakpoints

### Managing Customer Groups

1. **Clear Naming** - Use descriptive, consistent names
2. **Documented Criteria** - Write down qualification requirements
3. **Regular Review** - Audit group assignments quarterly
4. **Expiration Dates** - Use for trial or seasonal groups

### MOQ Strategy

1. **Based on Packaging** - Align with how products are packed
2. **Reasonable Minimums** - Don't set too high initially
3. **Clear Communication** - Display MOQ prominently
4. **Incremental Adoption** - Start with key products

### Product Organization

1. **Wholesale Catalog** - Consider separate product lines
2. **Clear Categorization** - Use categories for wholesale sections
3. **Accurate Stock** - Keep inventory updated
4. **Product Descriptions** - Include MOQ and case size info

## Troubleshooting

### Customers not seeing wholesale prices

1. Verify customer is assigned to active group
2. Check group status is "Published"
3. Verify customer is logged in
4. Clear browser cache
5. Check product visibility settings

### MOQ not enforcing

1. Verify MOQ is set on product
2. Check customer group assignment matches
3. Clear cart and try again
4. Check JavaScript console for errors

### Pricing tiers not applying

1. Verify pricing rules status is "Published"
2. Check quantity ranges don't overlap
3. Verify customer belongs to correct group
4. Clear all caches

### Applications not working

1. Verify registration is enabled in settings
2. Check email configuration
3. Review application in admin
4. Check user permissions

## Next Steps

- [Learn more about Customer Groups](./usage/customer-groups.md)
- [Set up advanced Pricing Rules](./usage/pricing-rules.md)
- [Master the Admin Dashboard](./usage/admin-dashboard.md)
- [Guide for Customers](./usage/customer-guide.md)

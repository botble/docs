# Configuring Wholesale

This guide will walk you through the process of configuring the Wholesale plugin for your Botble E-commerce store.

## Accessing Wholesale Settings

1. Log in to your admin panel
2. Navigate to **Settings** > **Ecommerce** > **Wholesale**
3. You will see the Wholesale configuration page

![Wholesale Settings](./images/settings.png)

## General Settings

### Enable Wholesale System

Toggle to enable or disable the entire wholesale system without deactivating the plugin.

**Default:** Enabled

::: tip Usage Scenario
Disable temporarily during maintenance or when transitioning between retail and wholesale operations.
:::

### Require Approval for Wholesale Registration

Control whether wholesale applications require admin approval.

**Options:**
- **Enabled** - Applications go to pending status, admin must approve
- **Disabled** - Applications are auto-approved, customers get immediate access

**Default:** Enabled

### Show Prices to Guest Users

Control whether non-logged-in users can see wholesale prices.

**Options:**
- **Enabled** - Guest users see pricing tables on product pages
- **Disabled** - Only logged-in wholesale customers see special prices

**Default:** Disabled

::: warning Security Consideration
Disabling this is recommended to keep wholesale pricing confidential.
:::

### Allow Multiple Customer Groups

Control whether a customer can be assigned to multiple groups simultaneously.

**Options:**
- **Enabled** - Customer can belong to multiple groups (uses priority for conflict resolution)
- **Disabled** - Customer can only belong to one group at a time

**Default:** Enabled

### Discount Resolution Strategy

When a customer belongs to multiple groups, choose how to resolve conflicting discounts:

| Strategy | Description |
|----------|-------------|
| **Highest** | Apply the group with highest discount value |
| **Lowest** | Apply the group with lowest discount value |
| **Priority** | Use the group with highest priority number |

**Default:** Highest

## Registration Settings

### Registration Form Fields

Configure which fields are required in the wholesale application form:

| Field | Required | Description |
|-------|----------|-------------|
| **Company Name** | Yes | Business name |
| **Tax ID** | Optional | Business tax identification |
| **Business Address** | Yes | Physical business location |
| **Phone Number** | Yes | Contact number |
| **Business Type** | Optional | Industry category |
| **Website** | Optional | Company website URL |

### Application Email Notifications

Configure email notifications for wholesale applications:

- **Customer Confirmation** - Sent when application is submitted
- **Admin Notification** - Alert admin of new applications
- **Approval Email** - Sent when application is approved
- **Rejection Email** - Sent when application is rejected

## Display Settings

### Visual Style

Choose how pricing tables are displayed on product pages:

| Style | Description |
|-------|-------------|
| **Modern** | Contemporary design with gradient effects |
| **Minimal** | Clean, simple table layout |
| **Classic** | Traditional table styling |
| **Elegant** | Refined presentation with subtle borders |

### Display Mode

Choose how much information to display in pricing tables:

| Mode | Description |
|------|-------------|
| **Full** | Shows all pricing tiers with savings calculations |
| **Compact** | Condensed view with essential information only |

### Show Savings Amount

Toggle to display the amount saved for each pricing tier.

**Example with savings shown:**
> 100+ units: $45.00 **Save $5.00 (10%)**

**Example without savings:**
> 100+ units: $45.00

### Section Title

Set a custom title for the wholesale pricing section. If left empty, the default translation will be used.

**Default:** "Wholesale Pricing"

**Examples:**
- "Volume Discounts"
- "Bulk Pricing"
- "B2B Pricing Tiers"

## Customer Groups Configuration

### Creating Customer Groups

When creating a customer group, configure:

| Field | Description |
|-------|-------------|
| **Name** | Group identifier (e.g., "Gold Resellers", "Silver Partners") |
| **Description** | Internal notes about the group |
| **Status** | Published (active) or Draft (inactive) |
| **Priority** | Numeric priority for conflict resolution (higher = higher priority) |
| **Discount Type** | Percentage or Fixed Amount |
| **Discount Value** | Amount or percentage discount |
| **Min Order Quantity** | Minimum items per order |
| **Min Order Value** | Minimum order subtotal |

### Group Priority System

Priority determines which group's settings apply when a customer belongs to multiple groups:

**Example Priority Structure:**

| Group | Priority | Discount |
|-------|----------|----------|
| Platinum | 100 | 25% |
| Gold | 75 | 20% |
| Silver | 50 | 15% |
| Bronze | 25 | 10% |

If a customer is in both Gold and Silver groups:
- With "Priority" strategy → Gold applies (higher priority number)
- With "Highest" strategy → Gold applies (higher discount)

## Product Configuration

### Setting Product MOQ

For individual products, you can set:

| Setting | Description |
|---------|-------------|
| **Minimum Quantity** | Smallest order quantity allowed |
| **Quantity Increment** | Must order in multiples of this number |
| **Customer Group** | Apply to specific group or all wholesale customers |

**Example:**
- Min Quantity: 12
- Increment: 6
- Valid orders: 12, 18, 24, 30...
- Invalid orders: 13, 15, 20...

### Product Visibility

Control product visibility in the admin product edit page:

| Visibility | Description |
|------------|-------------|
| **Public** | Visible to all customers |
| **Wholesale Only** | Only visible to approved wholesale customers |
| **Hidden** | Not visible in catalog (direct link only) |

### Product Group Access

Restrict products to specific customer groups:

1. Edit a product in admin
2. Go to "Wholesale Settings" section
3. Select customer groups that can access this product
4. Empty selection = all wholesale customers can access

::: warning Important
- Product must have "Wholesale Only" visibility for group restrictions to apply
- Public products ignore group access restrictions
:::

## Pricing Rules Configuration

### Creating Tiered Pricing

For advanced quantity-based pricing, create pricing rules:

| Field | Description |
|-------|-------------|
| **Product** | Which product this rule applies to |
| **Customer Group** | Which group gets this pricing |
| **Min Quantity** | Starting quantity for this tier |
| **Max Quantity** | Ending quantity (optional, leave empty for unlimited) |
| **Discount Type** | Percentage, Fixed Amount, or Fixed Price |
| **Discount Value** | Discount amount or final price |
| **Status** | Published or Draft |

### Discount Types Explained

**1. Percentage Discount**
- Reduces price by a percentage
- Example: 10% off $50 = $45

**2. Fixed Amount Discount**
- Reduces price by fixed dollar amount
- Example: $5 off $50 = $45

**3. Fixed Price**
- Sets absolute price regardless of original
- Example: Fixed at $40 (even if original was $50 or $60)

### Example Pricing Structure

Product: Widget (Original Price: $50)

| Quantity | Discount Type | Discount Value | Final Price |
|----------|---------------|----------------|-------------|
| 1-49 | None | - | $50.00 |
| 50-99 | Percentage | 10% | $45.00 |
| 100-499 | Percentage | 15% | $42.50 |
| 500+ | Fixed Price | $38 | $38.00 |

## Testing Your Configuration

After configuring the plugin, test the following:

### 1. Customer Group Test

1. Create a test customer group with 10% discount
2. Create a test customer account
3. Assign customer to the group in admin
4. Log in as that customer
5. Verify discounted prices appear on products

### 2. Pricing Rules Test

1. Create a product with tiered pricing
2. Add pricing rules for different quantities
3. View product page as wholesale customer
4. Verify pricing table displays correctly
5. Add different quantities to cart and verify prices

### 3. MOQ Test

1. Set MOQ on a product (e.g., min 10, increment 5)
2. Try adding invalid quantities (e.g., 7, 12)
3. System should adjust to valid quantity (10, 15)
4. Verify validation messages appear

### 4. Visibility Test

1. Set product to "Wholesale Only" visibility
2. Log out (or use incognito)
3. Verify product doesn't appear in catalog
4. Log in as wholesale customer
5. Verify product now appears

## Permissions

Wholesale includes these permissions that can be assigned to user roles:

| Permission | Description |
|------------|-------------|
| `wholesale.customer-groups.index` | Access to Customer Groups menu |
| `wholesale.customer-groups.create` | Create new customer groups |
| `wholesale.customer-groups.edit` | Edit existing customer groups |
| `wholesale.customer-groups.destroy` | Delete customer groups |
| `wholesale.pricing-rules.index` | Access to Pricing Rules menu |
| `wholesale.pricing-rules.create` | Create new pricing rules |
| `wholesale.pricing-rules.edit` | Edit existing pricing rules |
| `wholesale.pricing-rules.destroy` | Delete pricing rules |
| `wholesale.applications.index` | View wholesale applications |
| `wholesale.applications.approve` | Approve/reject applications |
| `wholesale.settings` | Access to settings page |

### Managing Permissions

1. Go to **Users** > **Roles**
2. Edit a role (e.g., "Staff", "Manager")
3. Find the "Wholesale" section in permissions
4. Check/uncheck permissions based on role requirements
5. Save changes

## Troubleshooting Configuration Issues

### Settings Not Saving

- Verify file permissions on `storage/` directory
- Clear cache: `php artisan cache:clear`
- Check database connection
- Review error logs

### Prices Not Updating

- Clear all caches (admin + browser)
- Verify customer group status is "Published"
- Check pricing rule status is "Published"
- Ensure customer is assigned to group

### MOQ Not Enforcing

- Verify MOQ is set on the product
- Check customer group assignment
- Clear cart and try again
- Check for JavaScript errors in console

### Visibility Not Working

- Verify product visibility setting
- Check customer wholesale status
- Clear browser cache
- Test in incognito mode

## Configuration Best Practices

### 1. Start Simple

- Begin with one or two customer groups
- Add basic percentage discounts
- Test thoroughly before adding complexity
- Gradually add tiered pricing and MOQ

### 2. Clear Group Names

- Use descriptive names: "Gold Resellers - 20% Off"
- Document each group's purpose
- Make priority numbers logical (10, 20, 30...)

### 3. Reasonable MOQs

- Set MOQs based on your packaging
- Use increments that make business sense
- Don't set MOQs too high initially
- Monitor customer feedback

### 4. Test Thoroughly

- Test all discount combinations
- Verify email notifications work
- Check mobile responsiveness
- Test with real customer accounts

### 5. Monitor Performance

- Track wholesale vs retail conversion
- Monitor average order values by group
- Review pricing rule effectiveness
- Adjust based on data

## Configuration Checklist

Use this checklist when setting up the plugin:

- [ ] Enable wholesale system
- [ ] Configure approval requirements
- [ ] Set price visibility rules
- [ ] Configure multiple groups setting
- [ ] Set discount resolution strategy
- [ ] Create customer groups
- [ ] Set group priorities
- [ ] Configure MOQ settings
- [ ] Set product visibility rules
- [ ] Create pricing rules
- [ ] Configure email notifications
- [ ] Set display style
- [ ] Configure admin permissions
- [ ] Test customer registration
- [ ] Test pricing calculations
- [ ] Test MOQ enforcement
- [ ] Verify email notifications

If you continue to encounter configuration issues, please refer to the [Troubleshooting](/wholesale/troubleshooting) section or contact our support team.

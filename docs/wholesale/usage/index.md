# Usage Overview

This section covers everything you need to manage wholesale on your site. Pick the guide that matches what you want to do.

## Admin Guides

### [Customer Groups](/wholesale/usage/customer-groups)

Create and manage groups like "Gold", "Silver", "Bronze" that give automatic discounts to assigned customers.

**Go to:** Wholesale > Customer Groups

### [Pricing Rules](/wholesale/usage/pricing-rules)

Set up quantity-based pricing tiers on individual products (e.g., 10% off for 50+ units, 20% off for 100+ units).

**Go to:** Wholesale > Pricing Rules, or edit them directly on each product page

### [Admin Dashboard](/wholesale/usage/admin-dashboard)

Review wholesale applications, manage product visibility and MOQ, and assign customers to groups.

**Go to:** Wholesale > Applications, Ecommerce > Customers

### [Customer Guide](/wholesale/usage/customer-guide)

How your customers apply for wholesale accounts, see wholesale pricing, and shop on your site.

## How Everything Fits Together

```
1. You create customer groups with discounts
                    ↓
2. You optionally create pricing rules for specific products
                    ↓
3. A customer applies at /wholesale/register
                    ↓
4. You approve the application and assign them to a group
                    ↓
5. Customer logs in → sees discounted prices → shops → checks out
```

### What controls the price a customer sees?

There are two layers of discounting:

**Layer 1: Group Discount** - Every customer group has a base discount (e.g., Gold = 20% off). This applies to ALL products for customers in that group.

**Layer 2: Pricing Rules** - You can create additional quantity-based tiers for specific products. These can give bigger discounts for larger quantities.

When both apply, the system picks the price that gives the customer the **best deal** (unless you've configured the [discount resolution strategy](/wholesale/configuration#discount-resolution-strategy) differently).

### Example

Product: Widget, retail price $100

**Gold group** has 20% base discount, so Gold customers see $80.

You also create a **pricing rule** for this product: 50+ units at 25% off = $75.

- Gold customer buying 10 units → $80 each (group discount)
- Gold customer buying 50 units → $75 each (pricing rule, better deal)

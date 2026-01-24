# Managing Gift Rules

This guide covers how to edit, organize, and maintain your gift promotion rules over time.

## Viewing All Rules

Navigate to **Ecommerce** > **Product Gifts** to see all rules.

### Sorting Options

Click column headers to sort by:
- ID (ascending/descending)
- Name (alphabetical)
- Min Order Value (low to high / high to low)
- Created Date (newest/oldest)
- Status

### Filtering

Use the filter options to find specific rules:
- **By Status:** Show only Published or Draft rules
- **Search:** Find rules by name

## Editing Rules

### How to Edit

1. Find the rule in the list
2. Click the **Edit** button (pencil icon)
3. Make your changes
4. Click **Save**

### What You Can Edit

| Field | Can Edit? | Notes |
|-------|-----------|-------|
| Name | ✅ Yes | Change anytime |
| Min Order Value | ✅ Yes | Affects future carts |
| Apply To | ✅ Yes | May affect current sessions |
| Products/Categories | ✅ Yes | Based on Apply To setting |
| Gift Products | ✅ Yes | Add, remove, or change |
| Status | ✅ Yes | Immediately affects visibility |
| Start/End Date | ✅ Yes | Controls when rule is active |

### Important Notes on Editing

::: warning Active Rule Changes
Changes to published rules take effect immediately. Consider:
- Creating a new rule instead of editing active ones
- Testing changes during low-traffic periods
- Communicating changes to customers if significant
:::

## Managing Gift Products

### Adding New Gift Options

1. Edit the rule
2. Scroll to Gift Products section
3. Click **Add Product**
4. Search and select the product
5. Set quantity
6. Save the rule

### Removing Gift Options

1. Edit the rule
2. Find the gift product to remove
3. Click the remove/delete button
4. Save the rule

### Changing Gift Quantities

1. Edit the rule
2. Find the gift product
3. Update the quantity field
4. Save the rule

### Replacing Gift Products

If a gift product is discontinued:
1. Edit the rule
2. Remove the old product
3. Add the replacement product
4. Save the rule

## Status Management

### Activating a Rule

To make a draft rule active:
1. Edit the rule
2. Change Status to **Published**
3. Save

Or use bulk actions:
1. Select rules with checkboxes
2. Choose "Publish" from bulk actions
3. Apply

### Deactivating a Rule

To temporarily disable without deleting:
1. Edit the rule
2. Change Status to **Draft**
3. Save

**When to deactivate instead of delete:**
- Seasonal promotions (reactivate next year)
- Testing periods
- Temporary pauses
- Preserving rule configuration

### Deleting a Rule

To permanently remove:
1. Find the rule in the list
2. Click **Delete** button
3. Confirm deletion

::: danger
Deletion is permanent. The rule and all its gift product associations are removed.
:::

## Bulk Operations

### Selecting Multiple Rules

- Click checkboxes next to rules
- Use "Select All" for all visible rules

### Available Bulk Actions

| Action | Effect |
|--------|--------|
| **Delete** | Remove selected rules permanently |
| **Change Status** | Set all selected to Published or Draft |

### Performing Bulk Actions

1. Select rules using checkboxes
2. Choose action from dropdown
3. Click **Apply**
4. Confirm if prompted

## Scheduling with Dates

### Future Start Dates

Set a future start date to:
- Prepare promotions in advance
- Coordinate with marketing campaigns
- Launch at specific times

The rule won't appear until the start date, even if Published.

### Expiration Dates

Set an end date to:
- Run limited-time promotions
- Manage seasonal offers
- Auto-expire without manual intervention

The rule automatically stops appearing after the end date.

### Date Strategy Examples

**Weekend Flash Sale:**
- Start: Friday 12:00 AM
- End: Sunday 11:59 PM

**Holiday Season:**
- Start: November 15
- End: January 2

**Product Launch Week:**
- Start: Launch day
- End: 7 days later

## Organizing Rules

### Naming Conventions

Adopt a consistent naming system:

```
[Category] - [Tier/Amount] - [Description]

Examples:
- All Orders - $50+ - Free Tote
- Electronics - $100+ - Bonus Cable
- Holiday - Gold Tier - Premium Set
```

### Archiving Old Rules

For rules you want to keep but not use:
1. Edit the rule
2. Add "ARCHIVED:" to the name
3. Set status to Draft
4. Clear dates

This keeps the configuration for reference.

### Seasonal Rule Management

**Before season:**
1. Review last year's rules
2. Update gift products if needed
3. Adjust minimum values
4. Set new date range
5. Publish when ready

**After season:**
1. Review performance
2. Note what worked
3. Set to Draft
4. Keep for next year

## Monitoring Rule Performance

### What to Track

- How many orders qualified?
- Which gifts were most selected?
- Did average order value increase?
- Are gift products in stock?

### Manual Tracking

Currently track via:
- Order reports (count orders with gifts)
- Product reports (gift product "sales")
- Comparing AOV before/after promotion

### Signs a Rule Needs Adjustment

| Sign | Possible Action |
|------|-----------------|
| Low qualification rate | Lower minimum value |
| High qualification rate | Raise minimum or add tiers |
| One gift always chosen | Remove unpopular options |
| Gift always out of stock | Increase inventory or change gift |
| No impact on AOV | Review targeting or minimum |

## Common Management Tasks

### Increasing Minimum Value

When raising the bar:
1. Consider customer expectations
2. Make change during low-traffic period
3. May want to add intermediate tier instead

### Adding a New Tier

To create a new gift level:
1. Create new rule with new minimum
2. Set appropriate gift(s)
3. Ensure no overlap conflicts
4. Publish when ready

### Handling Out-of-Stock Gifts

When a gift product runs out:
1. Plugin automatically hides it
2. Customers see remaining options
3. Restock when possible, or
4. Remove and add replacement

### Emergency Deactivation

If you need to stop all gifts immediately:
1. Go to gift rules list
2. Select all rules
3. Bulk action: Change to Draft
4. Apply

## Troubleshooting Management Issues

### Can't Edit Rule

- Check your admin permissions
- Verify database connection
- Clear cache and try again

### Changes Not Appearing

1. Clear CMS cache
2. Clear browser cache
3. Test in incognito window
4. Check date restrictions

### Bulk Action Not Working

- Ensure rules are selected
- Try smaller batch
- Check for errors in logs

## Best Practices

### Regular Maintenance

**Weekly:**
- Check gift product stock levels
- Review any customer feedback

**Monthly:**
- Review rule performance
- Adjust minimums if needed
- Update seasonal rules

**Quarterly:**
- Full rule audit
- Archive inactive rules
- Plan upcoming promotions

### Documentation

Keep notes on:
- Why each rule was created
- Performance results
- Changes made and why
- Customer feedback

## Next Steps

- [Customer Guide](/product-gifts/usage/customer-guide) - See customer experience
- [Troubleshooting](/product-gifts/troubleshooting) - Fix common issues
- [FAQ](/product-gifts/faq) - Common questions

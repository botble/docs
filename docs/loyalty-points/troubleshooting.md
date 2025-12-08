# Troubleshooting Loyalty Points

This guide will help you resolve common issues that may arise when using the Loyalty Points plugin.

## Common Issues

### Points Not Being Awarded

If points are not being awarded for orders:

1. **Check Program Status**:
   - Go to **Settings** > **Loyalty Points**
   - Ensure the loyalty program is enabled
   - Verify earning rate is configured (not 0)

2. **Order Status Issues**:
   - Verify the order has reached an eligible status
   - Check which statuses are configured to award points
   - Ensure the order wasn't cancelled or refunded

3. **Customer Issues**:
   - Confirm the customer was logged in during checkout
   - Guest checkouts do not earn points
   - Check if the customer account exists

4. **Cache Issues**:
   - Clear application cache: `php artisan cache:clear`
   - Clear config cache: `php artisan config:clear`

### Points Not Showing at Checkout

If the points redemption option doesn't appear at checkout:

1. **Customer Balance**:
   - Verify the customer has points available
   - Check if points meet minimum redemption threshold
   - Log in as the customer to verify balance

2. **Configuration Check**:
   - Ensure loyalty program is enabled
   - Verify redemption settings are configured
   - Check minimum redeemable points isn't set too high

3. **Theme Compatibility**:
   - Ensure your theme supports the loyalty points checkout integration
   - Check for JavaScript errors in browser console
   - Verify theme is using latest checkout templates

### Redemption Errors

If customers encounter errors when redeeming points:

1. **Validation Errors**:
   - Check minimum redeemable points setting
   - Verify maximum redeemable points limit
   - Check maximum percentage limit isn't exceeded
   - Ensure customer has sufficient balance

2. **Calculation Issues**:
   - Verify points-to-currency conversion rate
   - Check for rounding issues in configuration
   - Test with round numbers first

3. **Technical Errors**:
   - Check browser console for JavaScript errors
   - Review server logs for PHP errors
   - Verify AJAX endpoints are accessible

### Member Level Issues

If member levels aren't working correctly:

1. **Level Assignment**:
   - Levels are based on lifetime points, not current balance
   - Check tier thresholds don't overlap
   - Verify minimum/maximum points are set correctly
   - Ensure tiers have status enabled

2. **Earning Multiplier Not Applied**:
   - Clear cache after configuring levels
   - Verify earning rate multiplier is set (not 1.0)
   - Check tier is correctly assigned to customer
   - Review transaction history for correct amounts

3. **Level Not Upgrading**:
   - Lifetime points must reach tier threshold
   - Check for gaps in tier point ranges
   - Verify level configurations are saved
   - Clear cache and refresh

### Points Expiry Not Working

If points aren't expiring as expected:

1. **Configuration Check**:
   - Verify expiry period is set (not 0)
   - Check if expiry is measured in months
   - Review points earned date vs current date

2. **Scheduler Issues**:
   - Ensure Laravel scheduler is running
   - Verify cron job is configured correctly:
     ```bash
     * * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1
     ```
   - Check scheduler logs for errors
   - Run expiry command manually to test: `php artisan loyalty:expire-points`

### Customer Dashboard Issues

If customers can't access their points dashboard:

1. **Access Problems**:
   - Verify customer is logged in
   - Check URL is correct for points page
   - Ensure customer has an account (not guest)

2. **Display Issues**:
   - Clear browser cache
   - Check for JavaScript errors
   - Verify theme templates are correct
   - Test in different browsers

3. **Data Not Showing**:
   - Check customer has transaction history
   - Verify database connection
   - Clear application cache

### Bonus Points Not Working

If bonus points (registration, reviews, birthday) aren't awarded:

1. **Registration Bonus**:
   - Verify bonus amount is set (not 0)
   - Customer must complete registration
   - Check if bonus was already awarded (won't duplicate)

2. **Review Bonus**:
   - Verify review bonus is configured
   - Customer must submit approved review
   - Check if review plugin is active
   - Verify customer was logged in when reviewing

3. **Birthday Bonus**:
   - Customer must have birthday set in profile
   - Birthday bonus is configured (not 0)
   - Scheduler must be running
   - Run birthday command manually: `php artisan loyalty:award-birthday-points`

## Advanced Troubleshooting

### Clearing Cache

Clear all caches to resolve many common issues:

```bash
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

Or use the admin panel:
1. Go to **Admin** > **Platform Administration** > **Cache management**
2. Click "Clear all CMS cache"

### Checking Logs

Review Laravel logs for errors:

1. Check `storage/logs/laravel.log`
2. Look for errors related to "loyalty" or "points"
3. Pay attention to timestamps to identify recent issues
4. Check for stack traces indicating the source of errors

### Database Issues

If you suspect database problems:

1. **Verify Tables Exist**:
   - `ec_customer_points_balances`
   - `ec_customer_points_transactions`
   - `loyalty_levels`

2. **Run Migrations**:
   ```bash
   php artisan migrate
   ```

3. **Check Data Integrity**:
   - Look for orphaned records
   - Verify foreign key relationships
   - Check for duplicate entries

### Performance Issues

If the plugin is causing slowdowns:

1. **Database Optimization**:
   - Add indexes to frequently queried columns
   - Clean up old transaction records
   - Monitor query performance

2. **Caching**:
   - Enable Redis or Memcached
   - Configure appropriate cache lifetimes
   - Use database query caching

3. **Server Resources**:
   - Monitor CPU and memory usage
   - Increase PHP memory limit if needed
   - Check for slow database queries

### JavaScript Debugging

For checkout and dashboard issues:

1. **Open Browser Console** (F12):
   - Check for JavaScript errors
   - Look for failed AJAX requests
   - Review network tab for API errors

2. **Common JS Issues**:
   - jQuery conflicts with other plugins
   - Missing dependencies
   - CORS errors for AJAX requests

3. **Testing**:
   - Disable other plugins temporarily
   - Test in incognito/private mode
   - Try different browsers

## Recovery Procedures

### Restoring Points

If points were incorrectly deducted or lost:

1. Navigate to **Loyalty Points** > **Customer Points**
2. Find the affected customer
3. Click **Adjust Points**
4. Select "Add Points"
5. Enter the amount to restore
6. Add a note explaining the restoration
7. Save the adjustment

### Recalculating Balances

If balances appear incorrect:

1. Review transaction history for the customer
2. Manually sum all transactions
3. Compare with displayed balance
4. Use point adjustment to correct if needed

### Fixing Level Assignments

If a customer is at the wrong level:

1. Check customer's lifetime points
2. Verify level thresholds
3. Clear cache: `php artisan cache:clear`
4. Customer's level should update automatically
5. If not, adjust lifetime points temporarily and revert

## Getting Support

If you're unable to resolve the issue:

### Before Contacting Support

1. Review this troubleshooting guide thoroughly
2. Check the [FAQ](/loyalty-points/faq) section
3. Search for similar issues in documentation
4. Gather relevant error messages and logs

### Information to Provide

When contacting support, include:

1. **Environment Details**:
   - Botble CMS version
   - PHP version
   - Loyalty Points plugin version
   - Browser and version

2. **Issue Description**:
   - Detailed description of the problem
   - Steps to reproduce the issue
   - Expected vs actual behavior
   - When the issue started

3. **Screenshots/Logs**:
   - Screenshots of error messages
   - Relevant log entries
   - Browser console errors
   - Network request failures

4. **What You've Tried**:
   - Steps already attempted
   - Results of troubleshooting
   - Any temporary workarounds found

### Contact Methods

- **Documentation**: [https://docs.botble.com/loyalty-points](https://docs.botble.com/loyalty-points)
- **Support Tickets**: [https://botble.ticksy.com](https://botble.ticksy.com)
- **Email**: [contact@botble.com](mailto:contact@botble.com)

We typically respond within 12-24 hours during business days.

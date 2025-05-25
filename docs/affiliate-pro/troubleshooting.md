# Troubleshooting Affiliate Pro

This guide will help you resolve common issues that may arise when using the Affiliate Pro plugin.

## Common Issues

### Affiliate Links Not Tracking

If affiliate links are not tracking properly:

1. **Check Cookie Settings**:
   - Ensure cookies are enabled in the visitor's browser
   - Verify that the cookie lifetime is set correctly in the affiliate settings
   - Check if third-party cookies are blocked by the visitor's browser

2. **Link Format Issues**:
   - Verify that the affiliate links are correctly formatted
   - Check if the affiliate code is properly included in the URL
   - Try using the short link generator to create valid links

3. **Refresh and Clear Cache**:
   - Sometimes a simple page refresh can resolve tracking issues
   - Clear your browser cache if necessary
   - Try using a different browser to test the links

### Commissions Not Being Generated

If commissions are not being generated for orders:

1. **Check Affiliate Settings**:
   - Go to **Settings** > **Affiliate Settings**
   - Ensure that the default commission percentage is set correctly
   - Verify that the auto-approve commissions setting is configured as expected

2. **Order Status**:
   - Check if the order status is eligible for commission generation
   - Verify that the order was placed through a valid affiliate link
   - Ensure that the cookie was still active when the order was placed

3. **Product Eligibility**:
   - Check if the products in the order are eligible for commissions
   - Verify that the category-based commission settings are correctly configured
   - Ensure there are no exclusions or restrictions in place for the affiliate

### Withdrawal Issues

If there are problems with withdrawal requests:

1. **Minimum Amount**:
   - Check if the affiliate has reached the minimum withdrawal amount
   - Verify that the minimum withdrawal amount is set correctly in the settings

2. **Payment Details**:
   - Ensure that the affiliate has provided complete payment information
   - Check if the payment method selected is available and properly configured

3. **Account Status**:
   - Verify that the affiliate account is active and in good standing
   - Check if there are any restrictions or holds on the affiliate's account

### Affiliate Dashboard Access Problems

If affiliates cannot access their dashboard:

1. **Account Status**:
   - Ensure the affiliate account is approved and active
   - Check if the user has completed the registration process

2. **Permissions**:
   - Verify that the user has the necessary permissions to access the affiliate dashboard
   - Check if there are any role or permission issues in the system

3. **Technical Issues**:
   - Check for any JavaScript errors in the browser console
   - Look at the server logs for PHP errors
   - Ensure your server meets the minimum requirements

### Email Notification Issues

If email notifications are not being sent or received:

1. **Email Configuration**:
   - Check if the email service is properly configured in your application
   - Verify SMTP settings if you're using an external email service
   - Test the email functionality using the built-in email testing tool

2. **Notification Settings**:
   - Ensure that the specific notification type is enabled in the affiliate settings
   - Check if the email templates are properly configured
   - Verify that the recipient email addresses are correct

3. **Email Delivery**:
   - Check spam folders for missed notifications
   - Verify that your email server is not blacklisted
   - Consider using a transactional email service for better deliverability

### API Integration Problems

If you're experiencing issues with the API:

1. **Authentication Issues**:
   - Verify that the API key is valid and has not expired
   - Check if the API key has the necessary permissions
   - Ensure that the authentication headers are correctly formatted

2. **Request Format**:
   - Verify that the API request format matches the documentation
   - Check if all required parameters are included
   - Ensure that parameter values are properly encoded

3. **Response Handling**:
   - Check if your application correctly handles API responses
   - Look for error messages in the API response
   - Verify that your application can handle different response codes

## Advanced Troubleshooting

### Clearing Cache

Clearing the application cache can resolve many issues:

```bash
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

### Checking Logs

Check the Laravel logs for any errors:

1. Look in `storage/logs/laravel.log`
2. Check for any errors related to the Affiliate Pro plugin
3. Pay attention to timestamps to identify recent issues

### Database Issues

If you suspect database issues:

1. Verify that all migrations have run successfully
2. Check if the required tables exist and have the correct structure
3. Ensure there are no corrupted records in the database

### Performance Issues

If the plugin is causing performance problems:

1. **Database Optimization**:
   - Check for missing indexes on affiliate tables
   - Clean up old click data periodically
   - Monitor database query performance

2. **Caching**:
   - Enable Redis or Memcached for better performance
   - Configure appropriate cache lifetimes
   - Clear cache regularly

3. **Server Resources**:
   - Monitor CPU and memory usage
   - Increase PHP memory limits if needed
   - Consider upgrading server resources

### Security Concerns

If you notice suspicious affiliate activity:

1. **Monitor Activity**:
   - Review click patterns and sources
   - Check for unusual conversion rates
   - Monitor geographic distribution of traffic

2. **Fraud Detection**:
   - Set up automated alerts for suspicious activity
   - Review affiliate registration information
   - Implement click validation mechanisms

3. **Account Investigation**:
   - Review affiliate marketing practices
   - Check for policy violations
   - Suspend accounts if necessary pending investigation

## Getting Support

If you're unable to resolve the issue using this troubleshooting guide, please contact our support team:

- **Documentation**: [https://docs.botble.com/affiliate-pro](https://docs.botble.com/affiliate-pro)
- **Support Email**: [support@botble.com](mailto:support@botble.com)
- **Support Forum**: [https://botble.com/forum](https://botble.com/forum)

When contacting support, please provide:

1. A detailed description of the issue
2. Steps to reproduce the problem
3. Screenshots if applicable
4. Your Botble CMS version
5. Your PHP version
6. Any error messages you're seeing

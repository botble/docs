# Troubleshooting POS Pro

This guide will help you resolve common issues that may arise when using the POS Pro plugin.

## Common Issues

### Products Not Showing Up

If products are not appearing in the POS interface:

1. **Check Product Status**:
   - Ensure products are published and not in draft status
   - Verify that products have stock available (if stock management is enabled)
   - Check if products are assigned to the correct categories

2. **Search Functionality**:
   - Try searching for products by name, SKU, or barcode
   - If search is not working, check if the product data is correctly entered

3. **Refresh the Page**:
   - Sometimes a simple page refresh can resolve display issues
   - Clear your browser cache if necessary

### Payment Methods Not Available

If payment methods are not appearing in the checkout:

1. **Check POS Settings**:
   - Go to **Settings** > **E-commerce** > **POS Settings**
   - Ensure at least one payment method is enabled under "Active Payment Methods"
   - Verify that the default payment method is included in the active methods

2. **Permissions**:
   - Check if the current user has the necessary permissions to access payment features

### Cannot Complete Checkout

If you're unable to complete the checkout process:

1. **Required Fields**:
   - Ensure all required fields are filled out
   - Check if a customer is selected or created
   - Verify that a payment method is selected

2. **Stock Issues**:
   - Check if products are in stock
   - If a product is out of stock, remove it from the cart or adjust the quantity

3. **Server Errors**:
   - Check the browser console for any JavaScript errors
   - Look at the server logs for PHP errors
   - Ensure your server meets the minimum requirements

### Receipt Printing Problems

If you're having issues with receipt printing:

1. **Browser Printing Issues**:
   - Make sure your browser allows popup windows for the site
   - Check if the print dialog appears but doesn't print
   - Try using a different browser (Chrome or Firefox recommended)
   - Set margins to "None" in the print dialog for thermal printers
   - Ensure the receipt width setting matches your paper size (58mm, 80mm, or A4)

2. **USB Printer Issues**:
   - Ensure your printer is properly connected and set as the default
   - Check printer drivers are installed and up to date
   - Verify paper size settings match the receipt width configuration

3. **Network/IP Printer Issues**:
   - Verify the printer IP address is correct and reachable (`ping {ip}`)
   - Check that the print server application is running
   - Ensure the printer is on the same local network
   - Only private IP addresses are supported (192.168.x.x, 10.x.x.x, etc.)
   - Test the connection with: `php artisan pos:test-local-device {user_id} {order_id}`

For detailed printer setup instructions, see the [Printer Setup](usage-printer-setup.md) guide.

### Language Issues

If the POS interface is not displaying in the correct language:

1. **Language Settings**:
   - Verify that the language is installed and active in your Botble CMS
   - Try switching languages using the language switcher in the POS interface
   - Check if translations are available for the selected language

2. **Missing Translations**:
   - Some strings might not be translated in certain languages
   - You can add missing translations in the language files

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
2. Check for any errors related to the POS Pro plugin
3. Pay attention to timestamps to identify recent issues

### Database Issues

If you suspect database issues:

1. Verify that all migrations have run successfully
2. Check if the required tables exist and have the correct structure
3. Ensure there are no corrupted records in the database

## Getting Support

If you're unable to resolve the issue using this troubleshooting guide, please contact our support team:

- **Documentation**: [https://docs.botble.com/pos-pro](https://docs.botble.com/pos-pro)
- **Support Email**: [support@botble.com](mailto:support@botble.com)
- **Support Forum**: [https://botble.com/forum](https://botble.com/forum)

When contacting support, please provide:

1. A detailed description of the issue
2. Steps to reproduce the problem
3. Screenshots if applicable
4. Your Botble CMS version
5. Your PHP version
6. Any error messages you're seeing

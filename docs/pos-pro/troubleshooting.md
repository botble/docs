# Troubleshooting POS Pro

This guide helps you resolve common issues that may arise when using POS Pro.

## Interface Issues

### POS Interface Not Loading

If the POS interface doesn't load properly:

1. **Clear Browser Cache**
   - Press Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)
   - Clear cached images and files
   - Refresh the page

2. **Check JavaScript**
   - Ensure JavaScript is enabled in your browser
   - Check browser console for errors (F12 > Console)
   - Look for any blocked scripts

3. **Verify Assets**
   - Run `php artisan cms:publish:assets`
   - Clear application cache: `php artisan cache:clear`
   - Rebuild assets if needed: `npm run build`

4. **Browser Compatibility**
   - Use Chrome, Firefox, or Edge (latest versions)
   - Safari may have limited features
   - Avoid Internet Explorer

### Products Not Showing

If products don't appear in the POS interface:

1. **Check Product Status**
   - Ensure products are published (not draft)
   - Verify stock is available (if stock management is enabled)
   - Check products have prices set

2. **Search Issues**
   - Try searching by SKU or barcode
   - Check if product data is correctly entered
   - Verify search index is updated

3. **Permissions**
   - Ensure user has POS access permission
   - Check if products are restricted to certain users

### Slow Performance

If POS is running slowly:

1. **Browser**
   - Close unnecessary tabs
   - Clear browser cache
   - Disable browser extensions temporarily

2. **Server**
   - Check server resources (CPU, memory)
   - Optimize database queries
   - Enable application caching

3. **Network**
   - Check internet connection speed
   - Reduce image sizes for products
   - Use CDN for assets

## Payment Issues

### Payment Methods Not Available

If payment methods don't appear:

1. **Check Settings**
   - Go to **POS** > **Settings**
   - Ensure payment methods are enabled
   - Verify default payment method is set

2. **Plugin Dependencies**
   - For card payments, Stripe plugin must be active
   - For bank transfer QR, SePay/PayFS must be configured

### Cannot Complete Checkout

If checkout fails:

1. **Required Fields**
   - Ensure all required fields are filled
   - Select a customer or create one
   - Choose a payment method

2. **Stock Issues**
   - Check if products are in stock
   - Remove out-of-stock items from cart
   - Verify stock levels are accurate

3. **Register Required**
   - If register is required, open one first
   - Check register status in POS

4. **Server Errors**
   - Check browser console for errors
   - Review Laravel logs: `storage/logs/laravel.log`
   - Verify database connection

### Card Payment Failed

If Stripe Terminal payment fails:

1. **Reader Connection**
   - Check reader is online
   - Sync readers: click **Sync Readers**
   - Restart the reader

2. **Network**
   - Verify reader has internet access
   - Check firewall settings
   - Test network connectivity

3. **Card Issues**
   - Try a different card
   - Check card isn't expired
   - Verify sufficient funds

4. **Stripe Configuration**
   - Verify API keys are correct
   - Check Stripe Dashboard for errors
   - Ensure Terminal is enabled in Stripe

## Cash Register Issues

### Cannot Open Register

If you can't open a register:

1. **Existing Open Register**
   - Check if a register is already open
   - Close the existing register first
   - Only one register per user at a time

2. **Permissions**
   - Verify user has Registers permission
   - Check role settings

### Register Variance

If cash doesn't match expected:

1. **Recount Cash**
   - Count again carefully
   - Separate and count each denomination

2. **Review Transactions**
   - Check all transactions for the shift
   - Look for voided or cancelled orders
   - Verify cash refunds issued

3. **Unrecorded Transactions**
   - Check for cash sales outside POS
   - Verify all payouts were recorded

### Cannot Close Register

If close register fails:

1. **Permissions**
   - Ensure user has Registers permission

2. **Pending Transactions**
   - Complete or cancel pending orders
   - Clear any stuck transactions

## Receipt Printing Issues

### Receipt Not Printing

If receipts don't print:

1. **Browser Settings**
   - Allow popup windows for the site
   - Check print dialog appears
   - Try a different browser

2. **Printer Setup**
   - Verify printer is connected
   - Set printer as default
   - Check printer has paper

3. **Receipt Settings**
   - Enable **Print Receipt After Checkout** in settings
   - Check receipt width matches paper size

For detailed printer setup, see [Printer Setup](usage-printer-setup.md).

### Receipt Formatting Issues

If receipts look wrong:

1. **Paper Size**
   - Match receipt width setting to actual paper (58mm, 80mm, A4)
   - Set margins to "None" in print dialog

2. **Content Missing**
   - Check receipt settings for enabled content
   - Verify logo is uploaded
   - Check store info is configured

### Network Printer Not Working

If IP printer doesn't receive orders:

1. **IP Address**
   - Verify IP is correct
   - Ping the printer from your computer
   - Ensure it's a private IP (192.168.x.x, etc.)

2. **Print Server**
   - Verify print server is running
   - Check it's listening on `/api` endpoint

3. **Network**
   - Printer must be on same network
   - Check firewall isn't blocking

## Refund Issues

### Cannot Process Refund

If refunds fail:

1. **Refunds Disabled**
   - Enable refunds in POS Settings

2. **Outside Refund Window**
   - Order is older than allowed days
   - Adjust refund window setting or process through admin

3. **Already Refunded**
   - Check if items were already refunded
   - View refund history on the order

### Approval Required

If refund requires approval:

1. **Above Threshold**
   - Amount exceeds approval threshold
   - Get manager to approve
   - Or user with approval permission can process

### Cash Refund Failed

If cash refund fails:

1. **Register Not Open**
   - Open a register first
   - Cash refunds require open register

2. **Insufficient Cash**
   - Register may not have enough cash
   - Add cash or use different refund method

## Barcode Scanner Issues

### Camera Scanner Not Working

1. **Permissions**
   - Allow camera access in browser
   - Check browser settings for site permissions

2. **Browser Support**
   - Use Chrome, Edge, or Firefox
   - Safari may have limited support

3. **Camera Issues**
   - Check camera isn't in use by another app
   - Try selecting a different camera

### Hardware Scanner Not Detecting

1. **Connection**
   - Verify USB scanner is connected
   - Try different USB port

2. **Focus**
   - Ensure cursor is in search box
   - Click the search field before scanning

3. **Configuration**
   - Scanner should send Enter key after scan
   - Check scanner manual for configuration

For detailed scanner help, see [Barcode Scanner](usage-barcode-scanner.md).

## Multi-language Issues

### Wrong Language Displayed

1. **Language Selection**
   - Use language switcher in POS
   - Check user's language preference

2. **Missing Translations**
   - Some strings may not be translated
   - Add missing translations to language files

## Advanced Troubleshooting

### Clearing Cache

Clear all application caches:

```bash
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

### Checking Logs

Review logs for errors:

1. **Laravel Logs**: `storage/logs/laravel.log`
2. **Browser Console**: F12 > Console tab
3. **Network Tab**: F12 > Network tab for failed requests

### Database Issues

If database problems occur:

1. **Run Migrations**
   ```bash
   php artisan migrate
   ```

2. **Check Tables**
   - Verify POS tables exist
   - Check for corrupted records

### Rebuilding Assets

If assets are outdated:

```bash
npm run build
php artisan cms:publish:assets
```

## Getting Support

If you can't resolve the issue:

1. **Documentation**: Review relevant docs sections
2. **Gather Information**:
   - Detailed issue description
   - Steps to reproduce
   - Screenshots if applicable
   - Botble CMS version
   - PHP version
   - Error messages

3. **Contact Support**:
   - Email: [support@botble.com](mailto:support@botble.com)
   - Forum: [https://botble.com/forum](https://botble.com/forum)

## Quick Reference

| Issue | First Steps |
|-------|-------------|
| Interface not loading | Clear cache, check console |
| Products not showing | Check status, stock, permissions |
| Payment failed | Check settings, logs, Stripe |
| Register won't open | Check existing register, permissions |
| Receipt not printing | Check printer, browser popups |
| Refund failed | Check settings, window, threshold |
| Scanner not working | Check permissions, connection |

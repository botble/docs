# Troubleshooting E-Wallet

This guide will help you resolve common issues that may arise when using the E-Wallet plugin.

## Common Issues

### Plugin Not Appearing in Admin

If the E-Wallet plugin doesn't show in the admin panel:

1. **Check File Permissions**:
   ```bash
   chmod -R 755 platform/plugins/e-wallet
   ```

2. **Verify plugin.json**:
   ```bash
   cat platform/plugins/e-wallet/plugin.json
   ```

3. **Clear Cache**:
   ```bash
   php artisan cache:clear
   php artisan config:clear
   ```

4. **Check Core Version**:
   - Verify Botble CMS is version 7.5.0 or higher

### Wallet Payment Not Showing at Checkout

If customers can't see the wallet payment option:

1. **Check Program Status**:
   - Go to **Settings** > **E-Wallet**
   - Ensure "Enable E-Wallet" is checked

2. **Check Payment Method**:
   - Go to **Admin** > **Payments** > **Payment methods**
   - Ensure "Wallet" is enabled

3. **Customer Authentication**:
   - Wallet payments require customers to be logged in
   - Guest checkout cannot use wallet

4. **Balance Check**:
   - Verify customer has sufficient balance
   - Balance must be >= order total

5. **Clear Cache**:
   ```bash
   php artisan cache:clear
   ```

### Top-up Issues

#### Top-up Form Not Showing

1. **Verify Top-up Enabled**:
   - **Settings** > **E-Wallet**
   - Check "Enable Top-up"

2. **Customer Authentication**:
   - Ensure customer is logged in

3. **Clear Route Cache**:
   ```bash
   php artisan route:clear
   ```

#### No Payment Methods Available

1. **Configure Payment Gateways**:
   - **Admin** > **Payments** > **Payment methods**
   - Enable at least one gateway (Stripe, PayPal, etc.)

2. **Check Allowed Methods**:
   - **Settings** > **E-Wallet** > **Top-up Settings**
   - Verify "Allowed Payment Methods" includes your gateways

3. **Verify Gateway Configuration**:
   - Check API keys are correct
   - Test payment gateway independently

#### Top-up Not Completing

If payment is successful but wallet not credited:

1. **Check Webhook Configuration**:
   - Verify payment gateway webhooks are set up
   - Check webhook URLs are accessible

2. **Review Logs**:
   - Check `storage/logs/laravel.log` for errors
   - Look for payment-related exceptions

3. **Manual Completion**:
   - **Admin** > **E-Wallet** > **Top-ups**
   - Find the pending top-up
   - Click "Complete"

4. **Check Transaction Table**:
   ```sql
   SELECT * FROM ec_wallet_transactions
   WHERE reference_type LIKE '%TopUp%'
   ORDER BY created_at DESC LIMIT 10;
   ```

### Payment Issues

#### Insufficient Balance Error

1. **Verify Balance**:
   ```sql
   SELECT * FROM ec_wallets WHERE customer_id = ?;
   ```

2. **Top-up Wallet**:
   - Customer should add more funds

3. **Admin Adjustment**:
   - **Admin** > **E-Wallet** > **Wallets**
   - Find customer and click "Adjust Balance"

#### Payment Deducted But Order Failed

1. **Check Duplicate Transactions**:
   ```sql
   SELECT * FROM ec_wallet_transactions
   WHERE customer_id = ?
   AND type = 'payment'
   ORDER BY created_at DESC;
   ```

2. **Refund the Amount**:
   - Admin can adjust balance to credit back the amount

3. **Review Error Logs**:
   - Check what caused order creation to fail

#### Wallet Balance Not Deducting

1. **Check Payment Status**:
   ```sql
   SELECT payment_status, payment_channel
   FROM ec_orders WHERE id = ?;
   ```

2. **Check Transaction Record**:
   ```sql
   SELECT * FROM ec_wallet_transactions
   WHERE reference_type LIKE '%Order%'
   AND reference_id = ?;
   ```

### Withdrawal Issues

#### Withdrawal Form Not Showing

1. **Verify Withdrawal Enabled**:
   - **Settings** > **E-Wallet**
   - Check "Enable Withdrawal"

2. **Check Customer Balance**:
   - Customer must have balance > 0

3. **Verify Payout Methods**:
   - At least one payout method must be configured

#### Withdrawal Request Fails

1. **Check Amount Limits**:
   - Verify min/max withdrawal settings
   - Ensure amount is within limits

2. **Sufficient Balance**:
   - Customer must have enough balance

3. **Review Validation Errors**:
   - Check form validation messages
   - Review logs for detailed errors

#### Withdrawal Stuck in Pending

1. **Admin Approval Required**:
   - Withdrawals require manual admin approval
   - **Admin** > **E-Wallet** > **Withdrawals**
   - Click "Approve" to process

2. **Check Status Workflow**:
   - Pending → Processing → Completed

### Balance Issues

#### Balance Not Updating

1. **Check Transaction Status**:
   ```sql
   SELECT * FROM ec_wallet_transactions
   WHERE id = ? AND status = 'completed';
   ```

2. **Verify Balance After**:
   ```sql
   SELECT w.balance, t.balance_after
   FROM ec_wallets w
   JOIN ec_wallet_transactions t ON t.wallet_id = w.id
   WHERE w.id = ?
   ORDER BY t.created_at DESC LIMIT 1;
   ```

3. **Recalculate Balance** (if mismatch):
   ```php
   $wallet = Wallet::find($walletId);
   $correctBalance = WalletTransaction::where('wallet_id', $walletId)
       ->where('status', 'completed')
       ->sum('amount');
   $wallet->update(['balance' => $correctBalance]);
   ```

#### Negative Balance When Not Allowed

1. **Check Setting**:
   - **Settings** > **E-Wallet**
   - Ensure "Allow Negative Balance" is unchecked

2. **Review Transactions**:
   - Check for any erroneous transactions

3. **Adjust Balance**:
   - Admin can adjust to correct the balance

### Settings Not Saving

1. **Check Permissions**:
   ```bash
   chmod -R 775 storage
   chown -R www-data:www-data storage
   ```

2. **Clear Config Cache**:
   ```bash
   php artisan config:clear
   ```

3. **Check Database**:
   - Verify database connection is working

4. **Review Error Logs**:
   - Check `storage/logs/laravel.log`

## Advanced Troubleshooting

### Clearing All Caches

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
2. Look for errors related to "wallet" or "e-wallet"
3. Pay attention to timestamps
4. Check for stack traces

### Database Issues

If you suspect database problems:

1. **Verify Tables Exist**:
   ```sql
   SHOW TABLES LIKE 'ec_wallet%';
   ```

2. **Run Migrations**:
   ```bash
   php artisan migrate
   ```

3. **Check Data Integrity**:
   - Look for orphaned records
   - Verify foreign key relationships

### Performance Issues

If the plugin is causing slowdowns:

1. **Add Database Indexes**:
   ```sql
   CREATE INDEX idx_wallet_customer ON ec_wallets(customer_id);
   CREATE INDEX idx_transaction_wallet ON ec_wallet_transactions(wallet_id);
   CREATE INDEX idx_transaction_customer ON ec_wallet_transactions(customer_id);
   ```

2. **Enable Caching**:
   - Configure Redis or Memcached
   - Set appropriate cache lifetimes

3. **Limit Displayed Transactions**:
   - Show only recent transactions with pagination

### JavaScript Debugging

For checkout and dashboard issues:

1. **Open Browser Console** (F12):
   - Check for JavaScript errors
   - Look for failed AJAX requests
   - Review network tab for API errors

2. **Common JS Issues**:
   - jQuery conflicts
   - Missing dependencies
   - CORS errors

3. **Testing**:
   - Disable other plugins temporarily
   - Test in incognito mode
   - Try different browsers

## Error Messages

### "Wallet not found for customer ID: X"

**Cause**: Wallet doesn't exist for customer

**Solution**: Wallet will be created automatically on first wallet action, or admin can adjust balance to create one.

### "Insufficient wallet balance"

**Cause**: Customer balance is less than required amount

**Solutions**:
- Customer should top-up wallet
- Admin can adjust balance
- Use different payment method

### "This transaction has already been processed"

**Cause**: Duplicate idempotency key (prevents duplicate transactions)

**Solutions**:
- This is expected behavior
- Check if original transaction succeeded
- Use different idempotency key if retry needed

### "E-Wallet is currently disabled"

**Cause**: Plugin is disabled in settings

**Solution**: Go to **Settings** > **E-Wallet** and enable it

### "Customer account required for wallet payment"

**Cause**: Guest checkout attempted with wallet

**Solution**: Customer must log in to use wallet payment

## Getting Support

If you're unable to resolve the issue:

### Before Contacting Support

1. Review this troubleshooting guide
2. Check the [FAQ](/e-wallet/faq) section
3. Gather relevant error messages and logs

### Information to Provide

When contacting support, include:

1. **Environment Details**:
   - Botble CMS version
   - PHP version
   - E-Wallet plugin version
   - Browser and version

2. **Issue Description**:
   - Detailed description of the problem
   - Steps to reproduce the issue
   - Expected vs actual behavior

3. **Screenshots/Logs**:
   - Screenshots of error messages
   - Relevant log entries
   - Browser console errors

### Contact Methods

- **Documentation**: [https://docs.botble.com/e-wallet](https://docs.botble.com/e-wallet)
- **Support Tickets**: [https://botble.ticksy.com](https://botble.ticksy.com)
- **Email**: [contact@botble.com](mailto:contact@botble.com)

We typically respond within 12-24 hours during business days.

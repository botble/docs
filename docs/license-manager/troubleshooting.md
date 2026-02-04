# Troubleshooting

Common issues and solutions for the License Manager plugin.

## Installation Issues

### Plugin Not Appearing

**Problem**: Plugin doesn't show in admin panel after upload.

**Solutions**:
1. Clear cache:
   ```bash
   php artisan cache:clear
   php artisan config:clear
   ```
2. Check file permissions:
   ```bash
   chmod -R 755 platform/plugins/license-manager
   ```
3. Verify plugin.json exists and is valid JSON
4. Check Laravel logs: `storage/logs/laravel.log`

### Migration Errors

**Problem**: Database migration fails.

**Solutions**:
1. Check database connection in `.env`
2. Ensure MySQL user has CREATE TABLE permission
3. Run migrations manually:
   ```bash
   php artisan migrate --path=platform/plugins/license-manager/database/migrations
   ```
4. Check for existing tables with conflicting names

### Missing Tables

**Problem**: Tables don't exist after activation.

**Solutions**:
1. Re-run migrations:
   ```bash
   php artisan migrate
   ```
2. Check migration status:
   ```bash
   php artisan migrate:status
   ```
3. If table exists without `lm_` prefix, run:
   ```bash
   php artisan migrate:fresh --seed
   ```
   ::: warning
   This will reset all database data. Backup first.
   :::

## API Issues

### 401 Unauthorized

**Problem**: API returns "Unauthorized" error.

**Causes & Solutions**:
1. **Missing API Key**: Add `X-API-KEY` header
2. **Invalid Key**: Verify key in Settings → API Keys
3. **Expired Key**: Check key expiration date
4. **Revoked Key**: Key may have been revoked
5. **Wrong Key Type**: Use External key for external endpoints

### 403 Forbidden

**Problem**: API returns "Forbidden" error.

**Causes & Solutions**:
1. **Insufficient Scopes**: Check API key permissions
2. **IP Blacklisted**: Check blacklist settings
3. **Domain Blacklisted**: Check blacklist settings
4. **Rate Limited**: Wait and retry

### 429 Too Many Requests

**Problem**: Rate limit exceeded.

**Solutions**:
1. Wait before retrying (see `Retry-After` header)
2. Increase rate limit in Settings → API
3. Implement client-side rate limiting
4. Use exponential backoff

### Connection Failed

**Problem**: Can't connect to API.

**Solutions**:
1. Verify server is running
2. Check SSL certificate (for HTTPS)
3. Test with curl:
   ```bash
   curl -v https://your-domain.com/api/external/connection-check \
     -H "X-API-KEY: your-key"
   ```
4. Check firewall rules
5. Verify API routes are registered:
   ```bash
   php artisan route:list | grep api
   ```

## License Issues

### License Not Found

**Problem**: Valid license returns "not found".

**Causes & Solutions**:
1. **Wrong Product**: Verify `product_reference_id`
2. **Typo in Code**: Check exact license code
3. **Case Sensitivity**: License codes are case-sensitive
4. **Deleted License**: Check if license was removed

### License Invalid

**Problem**: License exists but shows invalid.

**Causes & Solutions**:
1. **Blocked**: Check `is_valid` field
2. **Expired**: Check `expires_at` date
3. **Product Inactive**: Check product status
4. **Domain Mismatch**: Verify allowed domains

### Parallel Use Exceeded

**Problem**: "Maximum activations reached" error.

**Solutions**:
1. Check current activation count
2. Deactivate unused installations
3. Increase `parallel_uses` limit
4. Enable "Deactivate Old" setting

### Domain Not Allowed

**Problem**: "Domain not authorized" error.

**Causes & Solutions**:
1. Add domain to license whitelist
2. Check for typos in domain list
3. Ensure www/non-www both covered
4. Use wildcard: `*.example.com`

## Activation Issues

### Activation Failed

**Problem**: License activation fails.

**Diagnostic Steps**:
1. Check activity logs for error details
2. Verify all required headers are sent:
   - `X-API-KEY`
   - `X-API-URL`
   - `X-API-IP`
3. Test with minimal request:
   ```bash
   curl -X POST https://your-domain.com/api/external/license/activate \
     -H "Content-Type: application/json" \
     -H "X-API-KEY: your-key" \
     -H "X-API-URL: https://client-site.com" \
     -H "X-API-IP: 192.168.1.1" \
     -d '{"license_code": "YOUR-LICENSE"}'
   ```

### Deactivation Not Working

**Problem**: Can't deactivate a license.

**Solutions**:
1. Verify domain/IP match activation record
2. Check license code is correct
3. Use admin panel to manually delete activation

## Customer Portal Issues

### Can't Login

**Problem**: Customer login fails.

**Solutions**:
1. Verify email exists in customers table
2. Reset password via "Forgot Password"
3. Check if account is confirmed (`confirmed_at`)
4. Clear browser cookies

### Licenses Not Showing

**Problem**: Customer sees no licenses.

**Causes & Solutions**:
1. **Wrong Customer ID**: License `customer_id` must match customer's `client_id`
2. **Wrong Email**: License email must match customer email
3. **No Licenses**: Verify licenses exist for customer

### Password Reset Not Working

**Problem**: Password reset email not received.

**Solutions**:
1. Check spam folder
2. Verify email configuration in `.env`:
   ```
   MAIL_MAILER=smtp
   MAIL_HOST=your-smtp-host
   MAIL_PORT=587
   MAIL_USERNAME=your-username
   MAIL_PASSWORD=your-password
   ```
3. Test email sending:
   ```bash
   php artisan tinker
   >>> Mail::raw('Test', fn($m) => $m->to('test@example.com'));
   ```

## Webhook Issues

### Webhooks Not Received

**Problem**: Webhook endpoint not receiving events.

**Solutions**:
1. Verify webhooks are enabled in settings
2. Check webhook URL is accessible
3. Test endpoint manually:
   ```bash
   curl -X POST https://your-webhook-url \
     -H "Content-Type: application/json" \
     -d '{"test": true}'
   ```
4. Check server logs for errors
5. Verify SSL certificate (if HTTPS)

### Signature Verification Failing

**Problem**: Webhook signature doesn't match.

**Solutions**:
1. Use raw request body for verification
2. Ensure secret matches exactly
3. Check for whitespace in secret
4. Verify HMAC algorithm is SHA-256

### Events Not Triggering

**Problem**: Expected events not firing.

**Solutions**:
1. Run cron command manually:
   ```bash
   php artisan cms:license-manager:process-expirations
   ```
2. Check if licenses match criteria
3. Verify cron job is running
4. Check activity logs for errors

## Performance Issues

### Slow API Responses

**Solutions**:
1. Add database indexes:
   ```sql
   CREATE INDEX idx_licenses_code ON lm_licenses(license_code);
   CREATE INDEX idx_activations_license ON lm_activations(license_code);
   ```
2. Enable query caching
3. Optimize database queries
4. Use Redis for session/cache

### High Memory Usage

**Solutions**:
1. Limit results in API responses
2. Use pagination for large datasets
3. Run cleanup commands regularly
4. Increase PHP memory limit

### Database Growing Large

**Solutions**:
1. Clear old activity logs:
   ```bash
   php artisan cms:license-manager:activity-log:clear
   ```
2. Clear old download logs:
   ```bash
   php artisan cms:license-manager:download-log:clear
   ```
3. Archive old activations
4. Remove expired licenses

## Debug Mode

Enable detailed logging:

```php
// config/logging.php
'channels' => [
    'license-manager' => [
        'driver' => 'daily',
        'path' => storage_path('logs/license-manager.log'),
        'level' => 'debug',
        'days' => 14,
    ],
],
```

Then use:
```php
Log::channel('license-manager')->debug('Message', $data);
```

## Getting Help

If issues persist:

1. **Check Logs**: `storage/logs/laravel.log`
2. **Activity Logs**: Admin → License Manager → Activity Logs
3. **Enable Debug**: Set `APP_DEBUG=true` temporarily
4. **Contact Support**: [contact@botble.com](mailto:contact@botble.com)

Include in support requests:
- PHP version
- Laravel version
- Plugin version
- Error messages
- Steps to reproduce

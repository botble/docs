# Troubleshooting

Common issues and solutions for DeskHive.

## Installation Issues

### Plugin Not Appearing

**Problem**: The Support Desk plugin does not appear in the admin panel after upload.

**Solutions**:
1. Clear application cache:
   ```bash
   php artisan cache:clear
   php artisan config:clear
   ```
2. Check file permissions:
   ```bash
   chmod -R 755 platform/plugins/support-desk
   ```
3. Verify `plugin.json` exists and is valid JSON
4. Check Laravel logs: `storage/logs/laravel.log`

### Migration Errors

**Problem**: Database migration fails on plugin activation.

**Solutions**:
1. Check database connection in `.env`
2. Ensure the database user has `CREATE TABLE` permission
3. Run migrations manually:
   ```bash
   php artisan migrate --path=platform/plugins/support-desk/database/migrations
   ```
4. Check for existing tables with conflicting names

### Missing Tables

**Problem**: Tables do not exist after activation.

**Solutions**:
1. Deactivate and reactivate the plugin from **Admin → Plugins**
2. Run migrations manually:
   ```bash
   php artisan migrate
   ```
3. Check migration status:
   ```bash
   php artisan migrate:status
   ```

## Customer Portal Issues

### Login Page Not Found (404)

**Problem**: Accessing `/login` or `/support` returns a 404.

**Solutions**:
1. Confirm the Support Desk plugin is activated
2. Clear the route cache:
   ```bash
   php artisan route:clear
   php artisan cache:clear
   ```
3. Verify the theme is set to **Support** in **Admin → Appearance → Themes**

### Customer Cannot Log In

**Problem**: Customer login fails with valid credentials.

**Solutions**:
1. Verify the email exists in **Admin → Support Desk → Customers**
2. Check if the customer is blocked (status shown in customer detail)
3. Ask the customer to use **Forgot Password** to reset their password
4. Clear browser cookies and try again

### Registration Not Working

**Problem**: The registration form is not accessible or returns an error.

**Solutions**:
1. Confirm **Customer registration** is enabled in **Admin → Support Desk → Settings → Customer Portal**
2. Check that the mail configuration in `.env` is valid if email verification is enabled
3. Check Laravel logs for validation or mail errors

### Password Reset Email Not Received

**Problem**: Password reset email is not delivered.

**Solutions**:
1. Check the spam/junk folder
2. Verify mail configuration in `.env`:
   ```ini
   MAIL_MAILER=smtp
   MAIL_HOST=your-smtp-host
   MAIL_PORT=587
   MAIL_USERNAME=your-username
   MAIL_PASSWORD=your-password
   MAIL_FROM_ADDRESS=support@your-domain.com
   ```
3. Test email delivery:
   ```bash
   php artisan tinker
   >>> Mail::raw('Test', fn($m) => $m->to('test@example.com'));
   ```

## Ticket Issues

### Ticket Submission Fails

**Problem**: Customer cannot submit a ticket; form returns an error.

**Solutions**:
1. Check if the customer has reached the **Max tickets per day** limit in settings
2. If Envato integration is enabled, verify the purchase code is valid and belongs to the selected product
3. If License Manager integration is enabled, verify the license code is active
4. Check that all required custom fields are filled
5. Check Laravel logs for detailed validation errors

### Tickets Not Appearing in Agent Portal

**Problem**: An agent logs in but sees no tickets.

**Solutions**:
1. Confirm the agent is assigned to at least one department in **Admin → Support Desk → Agents**
2. Confirm the tickets belong to that department
3. Confirm tickets are assigned to the agent (the agent portal only shows tickets linked to the agent via `sd_ticket_agent`)
4. Check that **Auto-assign** is enabled in settings if you expect automatic assignment

### Email Notifications Not Sending

**Problem**: Agents or customers are not receiving notification emails.

**Solutions**:
1. Verify mail configuration in `.env` (see above)
2. Check notification toggles in **Admin → Support Desk → Settings → Notifications**
3. Check agent-level notification preferences in **Agent Portal → Settings → Notifications**
4. Check Laravel logs for mail errors:
   ```bash
   tail -f storage/logs/laravel.log
   ```

## Envato Integration Issues

### Purchase Code Verification Fails

**Problem**: A valid purchase code is rejected.

**Solutions**:
1. Confirm the Envato Personal Token is entered correctly in **Settings → Envato**
2. Verify the token has the required permissions:
   - View and search Envato sites
   - View the user's items' purchase data
3. Confirm the product's **Envato ID** matches the correct marketplace item ID
4. Check if the Envato API is reachable from your server:
   ```bash
   curl https://api.envato.com/v3/market/author/sales -H "Authorization: Bearer YOUR_TOKEN"
   ```
5. Check Laravel logs for API error responses

### Import from Envato Returns No Items

**Problem**: The Envato import finds no products.

**Solutions**:
1. Confirm the Envato Personal Token is valid and belongs to an author account
2. Verify the account has items for sale on the Envato marketplace
3. Check for API rate limiting — wait a minute and try again

## Agent Portal Issues

### Agent Cannot Log In

**Problem**: Agent login fails.

**Solutions**:
1. Confirm the agent account exists in **Admin → Support Desk → Agents**
2. Confirm the agent's **Active** status is enabled
3. Use the admin panel to reset the agent's password by editing the agent record

### Canned Responses Not Appearing

**Problem**: Canned responses do not show in the agent reply editor.

**Solutions**:
1. Confirm at least one canned response has **Active** set to enabled in **Admin → Support Desk → Canned Responses**
2. Clear the application cache:
   ```bash
   php artisan cache:clear
   ```

## Performance Issues

### Admin Ticket List Is Slow

**Solutions**:
1. Enable Redis for cache and session in `.env`:
   ```ini
   CACHE_DRIVER=redis
   SESSION_DRIVER=redis
   ```
2. Add a database index on frequently filtered columns if running a high volume of tickets
3. Reduce **Tickets per page** in **Settings → General**

### Knowledge Base Search Is Slow

**Solutions**:
1. Ensure the `sd_knowledge_articles` table has a full-text index on `title` and `content`
2. Consider enabling Redis cache to cache frequent search results

## General Debugging

Enable detailed error output temporarily:

```ini
# .env
APP_DEBUG=true
APP_ENV=local
```

Check logs:

```bash
tail -f storage/logs/laravel.log
```

::: warning
Disable `APP_DEBUG` in production. Debug mode exposes sensitive configuration details to browser visitors.
:::

## Getting Help

If an issue persists:

1. Check **Laravel logs**: `storage/logs/laravel.log`
2. Check **Activity Logs**: **Admin → Support Desk → Activity Logs**
3. Enable `APP_DEBUG=true` temporarily to see detailed error messages
4. Contact support: [contact@botble.com](mailto:contact@botble.com)

Include in your support request:
- PHP version (`php -v`)
- Botble CMS version
- Plugin version (from `platform/plugins/support-desk/plugin.json`)
- Error message and steps to reproduce

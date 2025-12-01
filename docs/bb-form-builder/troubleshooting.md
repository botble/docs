# Troubleshooting BB Form Builder

This guide will help you resolve common issues that may arise when using the BB Form Builder plugin.

## Common Issues

### Form Builder Not Loading

If the drag-and-drop form builder interface is not loading:

1. **Check JavaScript Errors**:
   - Open browser developer tools (F12)
   - Check the Console tab for JavaScript errors
   - Look for errors related to form-builder.js

2. **Clear Caches**:
   - Clear application cache: `php artisan cache:clear`
   - Clear browser cache and hard refresh (Ctrl+Shift+R)
   - Try in incognito/private browsing mode

3. **Verify Assets**:
   - Ensure JavaScript and CSS files are loading
   - Check Network tab in developer tools for failed requests
   - Rebuild assets if necessary: `npm run prod`

4. **Check Conflicts**:
   - Disable other plugins temporarily
   - Check for JavaScript conflicts with theme
   - Verify jQuery is loaded properly

### Form Not Displaying on Frontend

If forms are not appearing on your website:

1. **Check Shortcode**:
   - Verify the shortcode format: `[bb-form-builder code="your-code"][/bb-form-builder]`
   - Ensure the form code is correct
   - Check that shortcodes are enabled for the content area

2. **Form Status**:
   - Verify the form is set to "Active" status
   - Check if the form has been published

3. **Theme Compatibility**:
   - Some themes may block shortcodes
   - Check theme documentation for shortcode support
   - Try adding the form to a different page

4. **Cache Issues**:
   - Clear page cache
   - Clear full-page caching if enabled
   - Check CDN cache

### Form Submissions Not Working

If form submissions are failing or not being recorded:

1. **Check Form Actions**:
   - Ensure at least one action is configured (Email or Database)
   - Verify email settings are correct
   - Test database connection

2. **Validation Errors**:
   - Check browser console for AJAX errors
   - Verify CSRF token is present
   - Check server logs for PHP errors

3. **CAPTCHA Issues**:
   - If using reCAPTCHA, verify keys are correct
   - Test with CAPTCHA disabled temporarily
   - Check reCAPTCHA console for errors

4. **Server Configuration**:
   - Check PHP `post_max_size` setting
   - Verify `upload_max_filesize` for file uploads
   - Check server error logs

### File Upload Issues

If file uploads are not working:

1. **Check Settings**:
   - Verify allowed file types in settings
   - Check max file size configuration
   - Ensure the file type is in the allowed list

2. **Server Limits**:
   - Check PHP `upload_max_filesize`
   - Check PHP `post_max_size`
   - Verify `max_file_uploads` limit

3. **Directory Permissions**:
   - Ensure storage directory is writable
   - Check `storage/app/public` permissions
   - Verify symbolic link exists: `php artisan storage:link`

4. **File Validation**:
   - Check if file passes security validation
   - Verify file extension matches content type
   - Check for blocked file extensions

### Email Notifications Not Sending

If email notifications are not being sent:

1. **Email Configuration**:
   - Verify SMTP settings in **Settings** > **Email**
   - Test email sending with built-in test
   - Check mail queue if using queued emails

2. **Action Configuration**:
   - Verify Email action is properly configured
   - Check recipient email addresses
   - Test with a simple email address first

3. **Email Delivery**:
   - Check spam/junk folders
   - Verify sender email is not blacklisted
   - Consider using transactional email service

4. **Server Issues**:
   - Check if sendmail/mail() is available
   - Verify SMTP port is not blocked
   - Check server firewall settings

### Integration Issues

#### Mailchimp Not Working

1. **API Key**:
   - Verify API key is correct and active
   - Check API key permissions
   - Regenerate API key if necessary

2. **List Configuration**:
   - Ensure list ID is correct
   - Check if list allows API signups
   - Verify list is not archived

3. **Field Mapping**:
   - Check email field name is correct
   - Verify field names match form fields exactly
   - Test with required fields only

#### GetResponse Not Working

1. **API Key**:
   - Verify API key is correct
   - Check API key permissions
   - Test API connection

2. **Campaign Configuration**:
   - Ensure campaign is active
   - Check campaign allows API contacts
   - Verify campaign ID is correct

3. **Field Mapping**:
   - Check email field name matches
   - Test with minimal fields

### Multi-Step Form Issues

If multi-step (wizard) forms are not working correctly:

1. **Step Navigation**:
   - Check if JavaScript is loading
   - Verify step validation is working
   - Test each step individually

2. **Data Persistence**:
   - Ensure form data is preserved between steps
   - Check for JavaScript errors during navigation
   - Verify session storage is available

3. **Layout Issues**:
   - Check CSS for layout conflicts
   - Verify wizard layout setting
   - Test in different browsers

### Popup Form Issues

If popup forms are not displaying:

1. **Trigger Configuration**:
   - Verify popup trigger is configured
   - Check trigger conditions (scroll %, delay)
   - Test with button click trigger first

2. **JavaScript**:
   - Check for JavaScript conflicts
   - Verify popup script is loaded
   - Look for console errors

3. **CSS Conflicts**:
   - Check z-index of popup overlay
   - Verify modal styles are loading
   - Test popup in isolation

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
2. Check for any errors related to BB Form Builder
3. Pay attention to timestamps to identify recent issues

### Database Issues

If you suspect database issues:

1. Verify that all migrations have run successfully
2. Check if the required tables exist:
   - `form_builders`
   - `form_builder_submissions`
3. Ensure there are no corrupted records in the database

### Performance Issues

If the plugin is causing performance problems:

1. **Database Optimization**:
   - Check for missing indexes on form tables
   - Clean up old submission data periodically
   - Monitor database query performance

2. **Caching**:
   - Enable Redis or Memcached for better performance
   - Configure appropriate cache lifetimes
   - Cache form configurations

3. **Server Resources**:
   - Monitor CPU and memory usage
   - Increase PHP memory limits if needed
   - Consider upgrading server resources

### Debug Mode

For development troubleshooting:

1. Enable debug mode in `.env`:
   ```
   APP_DEBUG=true
   ```
2. Check detailed error messages
3. **Important**: Disable debug mode in production

## Error Messages Reference

### "Form not found"

- The form code doesn't exist
- Form has been deleted
- Check shortcode spelling

### "This form is not active"

- Form status is set to Inactive
- Activate the form in admin panel

### "Please complete the captcha"

- CAPTCHA validation failed
- Check reCAPTCHA configuration
- Verify reCAPTCHA keys

### "You have already submitted this form"

- Duplicate submission detected
- Clear cookies to resubmit
- Configure unique field setting

### "Embedding is not allowed for this form"

- "Allow Embed" is disabled
- Enable embedding in form settings

### "File type not allowed"

- Uploaded file type is not in allowed list
- Check allowed file types in settings
- Add the file extension to allowed list

### "File size exceeds limit"

- File is larger than configured maximum
- Increase max file size setting
- Compress file before uploading

## Getting Support

If you're unable to resolve the issue using this troubleshooting guide, please contact our support team:

- **Documentation**: [https://docs.botble.com/bb-form-builder](https://docs.botble.com/bb-form-builder)
- **Support Email**: [contact@botble.com](mailto:contact@botble.com)
- **Support Forum**: [https://botble.com/forum](https://botble.com/forum)

When contacting support, please provide:

1. A detailed description of the issue
2. Steps to reproduce the problem
3. Screenshots if applicable
4. Your Botble CMS version
5. Your PHP version
6. Any error messages you're seeing
7. Browser and version (for frontend issues)

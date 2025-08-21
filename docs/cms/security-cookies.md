# Security Configuration Guide for Botble CMS

## Quick Setup Guide (For Website Administrators)

This guide helps you secure your Botble CMS website by configuring proper security settings.

### Step 1: Open Your Configuration File

1. Locate the `.env` file in your website's root directory
2. Open it with any text editor (Notepad, TextEdit, etc.)

### Step 2: Add Security Settings

Copy and paste these lines into your `.env` file:

```env
# Cookie Security Settings (REQUIRED)
SESSION_HTTP_ONLY=true
SESSION_SECURE_COOKIE=false
SESSION_SAME_SITE=lax

# Additional Security Headers (RECOMMENDED)
ENABLE_HTTP_SECURITY_HEADERS=true
```

### Step 3: For Live Websites Using HTTPS

If your website uses HTTPS (the URL starts with `https://`), change this setting:

```env
SESSION_SECURE_COOKIE=true
```

### Step 4: Save and Apply Changes

1. Save the `.env` file
2. Clear your website cache (if you have access to the admin panel)
3. Or ask your developer to run: `php artisan config:clear`

## What These Settings Do

### Essential Security Settings

- **SESSION_HTTP_ONLY=true** - Protects your website from certain hacking attempts (XSS attacks)
- **SESSION_SECURE_COOKIE=true** - Use this only if your website has HTTPS/SSL certificate
- **ENABLE_HTTP_SECURITY_HEADERS=true** - Adds extra protection against common web attacks

## Testing Your Configuration

### How to Check if Settings Are Working:

1. Open your website in Chrome or Firefox
2. Press F12 to open Developer Tools
3. Go to the "Application" or "Storage" tab
4. Click on "Cookies" on the left side
5. Find your website's cookies
6. Look for these checkmarks:
   - ✅ HttpOnly (should be checked)
   - ✅ Secure (should be checked if using HTTPS)

## Troubleshooting

### If Settings Don't Work:

1. **Make sure you saved the `.env` file**
2. **Clear your browser cache** (Ctrl+F5 or Cmd+Shift+R)
3. **Clear website cache** - In admin panel or ask developer to run `php artisan config:clear`
4. **Check for typos** - Settings must be exactly as shown above

### Common Issues:

- **Website not loading after changes**: Set `SESSION_SECURE_COOKIE=false` if not using HTTPS
- **Cookies still not secure**: Make sure there are no duplicate settings in your `.env` file

## For Production Websites

### Recommended Production Settings:

```env
# For live websites with HTTPS
SESSION_HTTP_ONLY=true
SESSION_SECURE_COOKIE=true
SESSION_SAME_SITE=lax
ENABLE_HTTP_SECURITY_HEADERS=true
FORCE_SCHEMA=https
```

### Minimum Required Settings:

```env
# Absolute minimum for security
SESSION_HTTP_ONLY=true
ENABLE_HTTP_SECURITY_HEADERS=true
```

## Technical Details (For Developers)

### What This Configuration Fixes:

This resolves the security vulnerability: "The remote HTTP web server / application is missing to set the 'HttpOnly' cookie attribute"

### Implementation Details:

- **HttpSecurityHeaders Middleware**: Located at `platform/core/base/src/Http/Middleware/HttpSecurityHeaders.php`
- **Registration**: Automatically loaded via `EventServiceProvider`
- **Configuration**: Controlled by `config('core.base.general.enable_http_security_headers')`

### Security Headers Added:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

### Note About Cookie Types:

- **Session/Auth Cookies**: Protected with HttpOnly flag ✅
- **Cookie Consent Plugin**: Cannot use HttpOnly (needs JavaScript access) - This is normal and safe

## Support

If you need help with these settings, please:
1. Contact your website developer
2. Or check the Botble CMS documentation
3. Or post in the Botble CMS community forum
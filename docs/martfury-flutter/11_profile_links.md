# Profile Screen External Links

The profile screen includes a "Support" section with links to help resources, customer support, and blog content.

![Profile links](images/profile-links.png)

## Configuration

External URLs are configured in your `.env` file:

```env
# External page URLs
# You can use either:
# - Absolute URLs: https://example.com/contact
# - Relative URLs: /contact or contact (will be prepended with API_BASE_URL)
HELP_CENTER_URL=/contact
CUSTOMER_SUPPORT_URL=/contact
```

## Support Section Features

### 1. Help Center

The Help Center can work in two modes:

**Web-based Help (Default):**
```env
USE_LOCAL_HELP=false
HELP_CENTER_URL=/contact
```
Opens the help center URL in a WebView.

**Local Help Content:**
```env
USE_LOCAL_HELP=true
```
Uses local JSON help files from `assets/help/{language}.json`. This provides offline access to help content. Falls back to WebView if local files are missing.

### 2. Customer Service

Opens your customer support page in a WebView.

```env
CUSTOMER_SUPPORT_URL=/contact
```

- Icon: Headset icon
- Translation key: `profile.customer_service`
- Opens in WebView for seamless experience

### 3. Blog

The blog section uses a **built-in blog module** that fetches posts from your backend API. This is not a simple WebView link - it's a native Flutter screen with:

- Blog post listings
- Post detail views
- Categories and tags
- Image galleries
- Native scrolling and navigation

The blog content is fetched from your API automatically based on your `API_BASE_URL`.

## URL Formats

You can use two URL formats in your `.env`:

**Absolute URLs:**
```env
CUSTOMER_SUPPORT_URL=https://mystore.com/support
```

**Relative URLs:**
```env
CUSTOMER_SUPPORT_URL=/support
```
Relative URLs are automatically prepended with your `API_BASE_URL`.

## Implementation Details

| Feature | Implementation | Configuration |
|---------|----------------|---------------|
| Help Center | `HelpCenterScreen` widget | `USE_LOCAL_HELP`, `HELP_CENTER_URL` |
| Customer Service | WebView | `CUSTOMER_SUPPORT_URL` |
| Blog | Native `BlogView` module | Uses `API_BASE_URL` |

## Best Practices

1. **URL Configuration**
   - Use HTTPS for all external links
   - Use relative URLs for pages on your own domain
   - Test URLs before deploying

2. **Local Help Content**
   - Create help JSON files for each supported language
   - Place files in `assets/help/` directory
   - File naming: `en.json`, `vi.json`, `ar.json`, etc.

3. **User Experience**
   - Keep help content concise and searchable
   - Ensure customer support page is mobile-friendly
   - Blog posts should have proper images and formatting

## Applying Changes

After modifying `.env`:

1. **Stop the app completely**
2. Run `flutter run` again

**Note:** Hot reload does not apply `.env` changes.

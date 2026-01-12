# Configuration Guide

How to connect your app to your website and customize basic settings.

## Connect to Your Website

### Step 1: Find Your Website URL
Your website URL is the address people use to visit your online store.
Examples:
- `https://mystore.com`
- `https://shop.mycompany.com`
- `https://mystore.botble.com`

### Step 2: Update App Configuration

1. Open the `.env` file in your app folder
2. Update these settings:
   ```env
   API_BASE_URL=https://your-website.com
   API_KEY=your-api-key
   APP_NAME=Your Store Name
   ```
3. Save the file

**Note**: The app automatically appends `/api/v1` to `API_BASE_URL` for API calls.

### Step 3: Test the Connection

1. Run your app:
   ```bash
   npm start
   ```
2. Try to login with an account from your website
3. If it works, you're connected!

## Environment Configuration

Create or update your `.env` file with these settings:

```env
# API Configuration
API_BASE_URL=https://your-website.com
API_KEY=your-api-key

# App Configuration
APP_NAME=Your Store Name
APP_VERSION=1.0.0

# Contact Information (optional)
APP_CONTACT_PHONE=+1 (800) 123-4567
APP_CONTACT_EMAIL=support@example.com

# Social Media (optional)
APP_SOCIAL_FACEBOOK=https://facebook.com/yourstore
APP_SOCIAL_X=https://x.com/yourstore
APP_SOCIAL_INSTAGRAM=https://instagram.com/yourstore
```

## App Configuration (app.config.ts)

The app reads configuration from environment variables through `app.config.ts`. Update your `.env` file for app store settings:

| Variable | Description | Example |
|----------|-------------|---------|
| APP_NAME | Display name | My Store |
| APP_VERSION | App version | 1.0.0 |
| API_BASE_URL | Website URL (without /api/v1) | https://mystore.com |
| API_KEY | API authentication key | your-api-key |

For bundle identifiers and other platform-specific settings, modify `app.config.ts` directly.

## Basic App Settings

### App Name
Change your app's name by following: **[App Name Guide](03_app_name.md)**

### App Colors
Customize your app's colors: **[Theme Colors Guide](01_theme_colors.md)**

### App Logo
Add your logo: **[App Logo Guide](04_app_logo.md)**

### Languages
Set up multiple languages: **[Translations Guide](06_translations.md)**

## Security Settings

### HTTPS Required
- Always use `https://` in your website URL
- Never use `http://` for live websites
- This keeps your customers' data safe

### API Access
Make sure your website allows the app to connect:
1. Contact your website developer
2. Tell them you need "API access enabled"
3. Verify CORS settings allow mobile app requests

## Testing Your Setup

### Test These Features:
- Login with existing account
- Browse products
- Add items to cart
- Search for products
- View product details
- Apply coupon codes
- Complete checkout

### If Something Doesn't Work:
1. Check your website URL is correct
2. Make sure your website is online
3. Try logging in on your website directly
4. Check browser console for errors
5. Contact support with details

## Advanced Configuration

For more advanced setup:
- **[API Integration](api-integration.md)** - Technical details
- **[Development Guide](development.md)** - Customization options

## Tips for Success

### Before Going Live:
- Test everything thoroughly
- Try on different phones (iOS and Android)
- Ask friends to test the app
- Make sure payments work

### Keep It Simple:
- Start with basic setup
- Add features gradually
- Test each change
- Don't change too many things at once

## Common Problems

### "Connection Failed"
- Check your website URL
- Make sure website is online
- Verify API is accessible

### "Login Doesn't Work"
- Test login on your website first
- Check if API is enabled
- Verify user accounts exist

### "No Products Show"
- Make sure products exist on website
- Check if products are published
- Verify categories are set up

For more help, check the [Troubleshooting Guide](troubleshooting.md).

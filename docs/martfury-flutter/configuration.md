# Configuration Guide

How to connect your app to your website and customize basic settings.

## 🔗 Connect to Your Website

### Step 1: Find Your Website URL
Your website URL is the address people use to visit your online store.
Examples:
- `https://mystore.com`
- `https://shop.mycompany.com`
- `https://mystore.botble.com`

### Step 2: Update App Configuration
1. Open the `.env` file in your app folder
2. Find this line:
   ```
   API_BASE_URL=https://ecommerce-api.botble.com
   ```
3. Replace it with your website:
   ```
   API_BASE_URL=https://your-website.com
   ```
4. Save the file

### Step 3: Test the Connection
1. Run your app:
   ```bash
   flutter run
   ```
2. Try to login with an account from your website
3. If it works, you're connected! 🎉

## ⚙️ Basic App Settings

### App Name
Change your app's name by following: **[App Name Guide](04_app_name.md)**

### App Colors
Customize your app's colors: **[Theme Colors Guide](01_theme_colors.md)**

### App Logo
Add your logo: **[App Logo Guide](05_app_logo.md)**

### Languages
Set up multiple languages: **[Translations Guide](07_translations.md)**

## 🔐 Security Settings

### HTTPS Required
- Always use `https://` in your website URL
- Never use `http://` for live websites
- This keeps your customers' data safe

### API Access
Make sure your website allows the app to connect:
1. Contact your website developer
2. Tell them you need "API access enabled"
3. They'll know what this means

## 🧪 Testing Your Setup

### Test These Features:
- ✅ Login with existing account
- ✅ Browse products
- ✅ Add items to cart
- ✅ Search for products
- ✅ View product details

### If Something Doesn't Work:
1. Check your website URL is correct
2. Make sure your website is online
3. Try logging in on your website directly
4. Contact support with details

## 🚀 Advanced Configuration

For more advanced setup:
- **[API Integration](api-integration.md)** - Technical details
- **[Development Guide](development.md)** - Customization options

## ⚙️ Additional `.env` Keys

These optional keys let you fine-tune app behavior beyond the basic setup:

| Key | Values | Default | Description |
|-----|--------|---------|-------------|
| `USE_LOCAL_HELP` | `true` / `false` | `false` | Use local help center content instead of loading it in a WebView |
| `PRODUCT_IMAGE_THUMBNAIL_SIZE` | `small` / `medium` / `large` | `medium` | Size of product image thumbnails throughout the app |
| `HOMEPAGE_PRODUCTS_PER_CATEGORY` | number | `10` | Number of products displayed per category on the homepage |
| `ENABLE_ORDER_UPLOAD_PROOF` | `true` / `false` | `true` | Allow customers to upload payment proof images for orders |
| `ENABLE_GUEST_CHECKOUT` | `true` / `false` | `false` | Allow customers to check out without creating an account |
| `LICENSE_CODE` | string | — | License code used for development mode validation |

**Example `.env` additions:**
```bash
USE_LOCAL_HELP=false
PRODUCT_IMAGE_THUMBNAIL_SIZE=medium
HOMEPAGE_PRODUCTS_PER_CATEGORY=10
ENABLE_ORDER_UPLOAD_PROOF=true
ENABLE_GUEST_CHECKOUT=false
LICENSE_CODE=your-license-code-here
```

## 💡 Tips for Success

### Before Going Live:
- Test everything thoroughly
- Try on different phones
- Ask friends to test the app
- Make sure payments work

### Keep It Simple:
- Start with basic setup
- Add features gradually
- Test each change
- Don't change too many things at once

## 🆘 Common Problems

### "Connection Failed"
- Check your website URL
- Make sure website is online
- Contact your website developer

### "Login Doesn't Work"
- Test login on your website first
- Check if API is enabled
- Verify user accounts exist

### "No Products Show"
- Make sure products exist on website
- Check if products are published
- Verify categories are set up

For more help, check the [Troubleshooting Guide](troubleshooting.md).

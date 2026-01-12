# Configuring API Base URL

## Overview

The API base URL connects your mobile app to your Botble e-commerce backend. This is the most important configuration setting.

## Configuration

### Step 1: Update API URL

Open `.env` file and update:

```env
API_BASE_URL=https://your-website.com
API_KEY=your-api-key
```

Replace `your-website.com` with your actual Botble website domain.

**Note**: The app automatically appends `/api/v1` to `API_BASE_URL` for API calls, and uses `API_BASE_URL` directly for checkout (WebView).

## Examples

### Production Website
```env
API_BASE_URL=https://mystore.com
API_KEY=your-api-key
```

### Subdomain Setup
```env
API_BASE_URL=https://shop.mycompany.com
API_KEY=your-api-key
```

### Demo/Staging
```env
API_BASE_URL=https://staging.mystore.com
API_KEY=your-api-key
```

### Local Development
```env
# For iOS Simulator
API_BASE_URL=http://localhost:8000

# For Android Emulator (use your computer's IP)
API_BASE_URL=http://10.0.2.2:8000

# For physical device (use your computer's local IP)
API_BASE_URL=http://192.168.1.100:8000
```

## Finding Your API URL

1. Go to your Botble admin panel
2. Navigate to Settings → General
3. Find the Site URL - this is your `API_BASE_URL`

Example:
- Site URL: `https://mystore.com`
- Set `API_BASE_URL=https://mystore.com`

## Testing the Connection

### Using curl
```bash
curl https://your-website.com/api/v1/ecommerce/products
```

### Using browser
Visit: `https://your-website.com/api/v1/ecommerce/products`

You should see JSON data with products.

## Important Notes

### HTTPS Required
- Always use `https://` for production
- `http://` only for local development
- SSL certificate must be valid

### URL Format
- Do NOT include trailing slash: `https://mystore.com/api/v1`
- NOT: `https://mystore.com/api/v1/`

### CORS Configuration
Ensure your backend allows mobile app requests. Contact your backend developer if you get CORS errors.

## Applying Changes

After modifying `.env`:

1. Stop the current server (Ctrl+C)
2. Restart with clear cache:
   ```bash
   npm start -- --clear
   ```

**Note**: Hot reload does NOT apply `.env` changes. You must restart the server.

## Multiple Environments

Create separate environment files:

```
.env.development    # Local development
.env.staging        # Staging server
.env.production     # Production
```

Load specific environment:
```bash
# Development
API_BASE_URL=http://localhost:8000 npm start

# Production
API_BASE_URL=https://mystore.com npm start
```

## Troubleshooting

### "Network Error"
- Check URL is correct
- Verify website is online
- Test in browser first

### "401 Unauthorized"
- API might require authentication
- Check if API access is enabled on backend

### "CORS Error"
- Backend needs to allow app requests
- Contact backend developer

### "SSL Certificate Error"
- Ensure valid SSL certificate
- Don't use self-signed certs in production

## Need Help?

- Check the [API Integration Guide](api-integration.md)
- Read the [Troubleshooting Guide](troubleshooting.md)
- Contact support for assistance

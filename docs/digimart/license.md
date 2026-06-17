---
title: License Activation
description: Activate your CodeCanyon purchase code
---

# License Activation

DigiMart uses Envato CodeCanyon purchase-code activation. Your license grants you the right to use the software and receive updates.

## Before Going Live

Update the `productId` in `platform/core/core.json` to match your CodeCanyon item ID:

```json
{
  "productId": "your-codecanyon-item-id",
  "name": "DigiMart",
  "author": "Botble"
}
```

Without the correct `productId`, license verification will fail.

## Activate via Web Installer

During the guided web installation, you will be prompted to enter your CodeCanyon purchase code. This activates your license immediately.

## Activate via Admin Panel

To activate or change your license after installation:

1. Log in to the admin dashboard
2. Go to **Settings** → **License**
3. Enter your CodeCanyon purchase code
4. Click **Activate**

Your license status will be verified against Envato's servers.

## Verify Your License

View your current license status in Admin → Settings → License:

- **Status:** Active or Inactive
- **Purchase Code:** The last 5 characters of your activated code (masked)
- **Expiration:** License validity period (if applicable)

## What is a Purchase Code?

Your purchase code is an 8-character alphanumeric string provided by Envato when you purchase DigiMart on CodeCanyon. You can find it in your CodeCanyon account:

1. Log into [codecanyon.net](https://codecanyon.net)
2. Go to **Downloads**
3. Find DigiMart in your purchased items
4. Click the license icon to view your purchase code

## License Terms

- Each license grants you the right to use DigiMart on one domain
- You can use the software on unlimited subdomains of the licensed domain
- You receive 12 months of free updates and support
- You may not resell, redistribute, or transfer your license to another party

## Troubleshooting

**License activation fails:**
- Verify the purchase code is correct (8 characters, no spaces)
- Ensure your server can reach Envato's license verification servers (check firewall rules)
- Check that `productId` in `platform/core/core.json` matches your CodeCanyon item ID
- Try again after 5 minutes (Envato's servers may be temporarily unavailable)

**License is expired or invalid:**
- Log into your CodeCanyon account to verify the purchase is active
- If the purchase is recent, it may not be activated yet (wait up to 1 hour)
- Contact Envato support if you believe there is an error

::: danger Security Warning
After installation:
1. Change the default admin password immediately
2. Set `APP_DEBUG=false` in `.env` for production
3. Use HTTPS (SSL/TLS) for all traffic to your marketplace
4. Keep your purchase code secure and do not share it publicly
:::

## License Information in Code

DigiMart checks the license in several places:

- Admin settings validation
- Product download verification (if licensing is required)
- API token creation and validation
- Admin dashboard license status display

The license is stored securely in your database; the purchase code is never transmitted outside your server except to Envato for verification.

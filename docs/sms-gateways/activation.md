---
title: Activation & License
description: Validate your Envato purchase code to activate the SMS Gateways plugin.
---

# Activation & License

After installation, validate your CodeCanyon purchase to unlock full plugin features.

## Step 1 — Get your purchase code

1. Log in to [CodeCanyon.net](https://codecanyon.net/)
2. Go to **Account → Purchases**
3. Find **SMS Gateways** and click **License**
4. Copy the **Purchase Code** (32-character string)

![CodeCanyon purchase code](./images/activation-codecanyon.png)

## Step 2 — Activate in Botble

1. Log in to your Botble admin panel
2. Go to **Admin → SMS Gateways → Settings**
3. Paste your purchase code in the **License** field
4. Click **Verify License**

![License verification form](./images/activation-form.png)

Botble sends your purchase code to Envato's API to verify authenticity. This requires outbound HTTPS from your server to `api.envato.com`.

## What activation unlocks

| Feature | Free | Licensed |
|---------|------|----------|
| OTP verification | ✓ | ✓ |
| SMS templates | ✓ | ✓ |
| Delivery logs | ✓ | ✓ |
| 7 SMS drivers | ✓ | ✓ |
| Outbound webhooks | ✗ | ✓ |
| Custom drivers | ✗ | ✓ |
| Phone consent audit | ✗ | ✓ |
| GDPR data export | ✗ | ✓ |
| Priority support | ✗ | ✓ |

## License status

After verification, you'll see:

- **Status**: Active / Inactive / Expired
- **Expiry date**: Annual renewal (if renewal is required)
- **Last verified**: Date/time of last API check

The license is verified **daily** via scheduler. If verification fails (e.g., Envato API down), the plugin continues to run with cached status.

## License issues

### Invalid or expired code

Check that you copied the code correctly from CodeCanyon. If the code is correct, wait 24 hours — Envato's API may be slow to propagate new codes.

### HTTPS connection fails

If your server cannot reach `api.envato.com`, you may need to:

1. Ask your hosting provider to whitelist Envato's API servers
2. Check firewall rules or VPN restrictions
3. Test the connection: `curl https://api.envato.com`

Fallback: We cache license status for 7 days, so the plugin continues working even if Envato is temporarily unreachable.

### Support

If license verification fails after 48 hours, contact CodeCanyon support with:

- Your Botble domain
- Your purchase code
- Error message from the admin panel

## Transfer to another site

One purchase code = one active license. To use the plugin on a second domain:

1. Deactivate on your current site: **Admin → SMS Gateways → Settings → Remove License**
2. Activate on your new site with the same code

This takes effect within 24 hours.

## Next step

Continue to [Configuration](./configuration.md) to set up your first SMS driver.

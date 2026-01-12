# License Activation

Activate your license to enable development mode. This is required for running the app during development.

## Get Your Purchase Code

Your Envato purchase code can be found in your CodeCanyon account:

1. Go to [CodeCanyon Downloads](https://codecanyon.net/downloads)
2. Find "Botble Ecommerce Mobile App"
3. Click **Download** → **License certificate & purchase code**
4. Open the text file and copy the purchase code

::: info Purchase Code Format
The purchase code looks like: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`
:::

## Configure License

Add your purchase code to the `.env` file:

```env
# License Validation (Development Only)
LICENSE_CODE=your-envato-purchase-code
```

### Example

```env
LICENSE_CODE=a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

## How It Works

| Feature | Description |
|---------|-------------|
| **Development only** | License check runs only in development mode |
| **Non-blocking** | Shows a one-time alert if invalid, doesn't block the app |
| **Unlimited activations** | Use the same code on multiple devices |
| **3-day cache** | Validated once, cached for 3 days |
| **Fault tolerant** | If server unavailable, assumes valid to not block developers |
| **No production overhead** | Completely skipped in production builds |

## Restart Required

After adding your license code:

```bash
# Stop the development server (Ctrl+C)
# Then restart:
npm start
```

::: tip
The license is tied to your Envato purchase. You can use it on any device or team member's computer.
:::

## Troubleshooting

### "License Required" Alert

If you see a license alert:

1. Verify your purchase code is correct in `.env`
2. Make sure there are no extra spaces in the code
3. Restart the development server
4. Check your internet connection (required for first verification)

### Still Not Working?

- Verify you purchased from [CodeCanyon](https://codecanyon.net)
- Contact support with your purchase code for assistance

## FAQ

### Is the license required for production?

No. License validation only runs in development mode. Production builds skip the license check entirely.

### Can I use the same license on multiple computers?

Yes. The license allows unlimited activations. Use it on any device or share with team members.

### What happens if I don't add a license?

The app will show a one-time informational alert on startup. The app continues to work normally - it's non-blocking.

### Does the license check require internet?

Only for the first verification. After that, the result is cached for 3 days. If the server is unavailable or any error occurs, the license is assumed valid to not block developers.

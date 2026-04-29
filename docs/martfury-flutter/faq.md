# FAQ

### Does the app require Botble e-commerce on the backend?

Yes. The app calls Botble's REST API. Any other backend will not work.

### Do I need to know Flutter to deploy the app?

You need basic Flutter and command-line skills to set environment variables, replace assets (logo, icons), build, and submit to the stores.

### What does it cost to publish?

- Google Play: $25 one-time
- Apple App Store: $99 per year

### What payment methods are supported?

Whatever you have configured on your Botble backend. Checkout runs in a WebView, so any payment gateway that works on the website also works in the app (Stripe, PayPal, Razorpay, Mollie, SSLCommerz, COD, etc.).

### What languages are included?

29 languages, registered out of the box. See [Translations](07_translations.md).

### How do I connect the app to my website?

Set `API_BASE_URL` and `API_KEY` in `.env`. See [API Configuration](06_api_base_url.md).

### How do I change the app's colors?

Edit `.env`, then fully stop and rerun the app. Hot reload does not pick up `.env` changes. See [Theme Colors](01_theme_colors.md).

### How do I change the app name and logo?

- App name: [04_app_name.md](04_app_name.md)
- Logo: [05_app_logo.md](05_app_logo.md)

### How do I set up social login?

- [Google](14_google_login_setup.md)
- [Facebook](15_facebook_login_setup.md)
- [Apple](13_apple_login_setup.md)
- [Twitter](12_twitter_login_setup.md)

### How do I publish?

See [Deploying the App](09_deploying_app.md). Approval typically takes 1–3 days for Google Play and 1–7 days for the App Store.

### How often should I update the app?

Only when the source includes a meaningful change (security, bug fix, new feature). Routine product updates do not require an app update — the app fetches them from the API.

### Common problems

See [Troubleshooting](troubleshooting.md).

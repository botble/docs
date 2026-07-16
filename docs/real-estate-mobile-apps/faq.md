# FAQ

### What is FlexHome?

A property inquiry and property agent mobile app built with Expo (React Native). It is the mobile client for your Laravel backend, and lets customers browse properties, view agents, read the blog, and make inquiries.

### Which backend do I need?

Either [FlexHome](https://codecanyon.net/item/flexhome-car-agent-rental-inquiry-laravel-system/55782539) or [Auxero](https://codecanyon.net/item/auxero-car-agent-listing-laravel-system/62730624). Both are Laravel systems that ship the **real-estate** plugin, and both expose the same REST API (properties, inquiries, agents, favorites, reviews, pricing), so the app works against either one. No other backend will work. See [API Integration](api-integration.md).

### How is this licensed?

Through Envato / CodeCanyon. Your purchase includes an Envato license and a purchase code. In development the app validates that code against `license.botble.com` (`LICENSE_CODE` in `.env`); production builds ship with it empty. See [Troubleshooting → License dialog](troubleshooting.md#license-dialog-appears-in-development).

### Can I publish more than one app from one purchase?

No. One regular Envato license covers **one** app / end product. To publish a second app (a different brand or store listing), buy an additional license.

### Which platforms are supported?

iOS and Android, both from the **same Expo codebase**. There is no separate iOS and Android project to maintain. You configure once and build for both with EAS. See [Deploying the App](09_deploying_app.md).

### What languages are included?

English (`en`), Vietnamese (`vi`), Arabic (`ar`), and French (`fr`) out of the box, via `react-i18next` and `expo-localization`. Arabic ships with full **RTL** (right-to-left) layout support. Set the default with `DEFAULT_LANGUAGE` / `DEFAULT_LANGUAGE_DIRECTION` in `.env`. See [Translations](07_translations.md).

### How do I connect the app to my website?

Set `API_BASE_URL` (and `API_KEY` if your backend requires one) in `.env`. Do not include the `/api/v1` suffix. It is appended automatically. See [API Base URL](06_api_base_url.md).

### What payment methods are supported?

Whatever you configure on your Botble backend. A created inquiry is returned as PENDING and checkout runs in a WebView against the backend's hosted payment page, so any gateway that works on the website also works in the app.

### How do I change the branding?

- **Colors:** `PRIMARY_COLOR`, `PRIMARY_DARK_COLOR`, `ON_PRIMARY_COLOR` in `.env`. See [Theme Colors](01_theme_colors.md).
- **Font:** [App Font](02_app_font.md).
- **App name:** `APP_NAME` in `.env`. See [App Name](04_app_name.md).
- **Logo / icon:** [App Logo](05_app_logo.md).
- **Splash / loading:** [Splash Screen](17_splash_screen.md) and [Loading Screen](18_loading_screen.md).

### How do I set up social login?

- [Google](14_google_login_setup.md)
- [Facebook](15_facebook_login_setup.md)
- [Apple](13_apple_login_setup.md)
- [Social Login Configuration](16_social_login_configuration.md)

A provider only shows when its keys are present in `.env`.

### Do I need to know React Native to deploy?

You need basic React Native / Expo and command-line skills to set environment variables, replace assets, and run EAS builds. You do not need to write app code for a standard branded release.

### What does it cost to publish?

- Google Play: $25 one-time
- Apple App Store: $99 per year

### How do guests view their inquiry without an account?

Guest inquiry is supported (`ENABLE_GUEST_BOOKING`). After checkout, a guest looks up their inquiry with the **inquiry number plus the email** used at checkout. The id alone is rejected. See [API Integration → Inquirys](api-integration.md#inquiries-incl-guest-lookup).

### How often should I update the app?

Only when the source has a meaningful change (security, bug fix, new feature). Routine catalog updates (new properties, prices, agents) do not require an app update. The app fetches them from the API.

### Common problems

See [Troubleshooting](troubleshooting.md).

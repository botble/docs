# FAQ

## General

### Does the app require Botble e-commerce on the backend?

Yes. The app is a customer-facing client only — no built-in backend, database, or admin. You need [Botble Ecommerce](https://codecanyon.net/collections/10433615-laravel-ecommerce) running on a server. All admin work (products, orders, settings) is done through the web admin at `your-domain.com/admin`.

### Flutter or React Native?

Both have feature parity with the same backend. Pick the stack your team is comfortable with.

### Multi-tenant / SaaS?

No. The app supports the **multi-vendor marketplace** plugin (multiple sellers in one app), but it is not a multi-tenant SaaS. To serve multiple businesses, deploy separate Botble instances and rebrand the app per instance.

### Does the app work with any Botble theme?

Yes. The app connects via API, independent of the website theme.

## Setup

### How do I install?

```bash
npm install
cp .env.example .env       # then edit
npm start
```

See [Installation](installation.md).

### Why does my phone show a "Development Build" screen?

A development build needs Metro running. To test without Metro, build a preview APK with EAS:

```bash
npm install -g eas-cli
eas login
eas build --platform android --profile preview
```

See [Troubleshooting → Development build screen](troubleshooting.md#development-build-screen-on-device).

### What credentials does `eas login` ask for?

A free Expo account from [expo.dev/signup](https://expo.dev/signup). Not your CodeCanyon credentials.

### Why does my installed APK show a black screen?

`.env` is gitignored and is **not** included in EAS builds. Set EAS Secrets and rebuild:

```bash
eas secret:create --name API_BASE_URL --value "https://your-domain.com"
eas secret:create --name API_KEY --value "<your-api-key>"
eas build --platform android --profile production
```

See [Deploying → Environment Variables](08_deploying_app.md#environment-variables-critical).

### `.env` vs EAS Secrets

| Source | Local dev | EAS build |
|---|---|---|
| `.env` file | Yes | No |
| EAS Secrets | No | Yes |

## Customization

### Colors, logo, translations

- Colors: edit CSS variables in `global.css`. See [Theme Colors](01_theme_colors.md).
- Logo: replace `assets/icon.png`, `splash.png`, `adaptive-icon.png`. See [App Logo](04_app_logo.md).
- New language: add a JSON file under `src/i18n/locales/` and register in `src/i18n/index.ts`. See [Translations](06_translations.md).

### Can I customize the checkout page?

Checkout runs in a WebView served by your Botble website. Customize the checkout there.

## Features

### Push notifications

Supported via Firebase Cloud Messaging. See [Push Notifications](14_push_notifications.md).

### Social login

Supported via Google, Apple, Facebook. See [Social Login Setup](11_social_login_setup.md).

### Payment methods

Whatever is configured on your Botble backend. Checkout is a WebView, so all backend gateways and shipping plugins work without app changes.

### Offline mode

The app requires an internet connection. Some responses are cached for performance.

## Deployment

### How do I publish?

```bash
eas build --platform all --profile production
eas submit --platform all
```

See [Deploying the App](08_deploying_app.md).

### Costs

- Apple Developer: $99/year
- Google Play Developer: $25 one-time
- Expo: free tier is sufficient for most projects

### Review times

- Apple: typically 1–3 days
- Google: typically 1–3 days

### Update without resubmitting?

Yes, for JS-only changes via EAS Update:

```bash
eas update --branch production --message "Bug fixes"
```

Native changes require a new build and store submission.

## Tech

- React Native 0.81+ with Expo SDK 54
- Node.js 18+
- TypeScript (strict)
- npm (default; yarn also works)

## Common problems

See [Troubleshooting](troubleshooting.md).

## Updates

- [Upgrade Guide](upgrade.md)
- [Release notes](releases.md)

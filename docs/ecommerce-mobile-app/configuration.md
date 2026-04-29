# Configuration

All configuration lives in `.env` at the project root. After editing `.env`, restart with `npm start -- --clear` — Metro does not pick up `.env` changes via fast refresh.

## Required keys

```bash
API_BASE_URL=https://your-domain.com
API_KEY=<from Admin → Settings → API Settings>
APP_NAME=Your Store Name
```

The app appends `/api/v1` to `API_BASE_URL` for API calls and uses the bare value for the WebView checkout URL. See [API Base URL](05_api_base_url.md) for `API_KEY` details.

## How `.env` reaches the runtime

```
.env → app.config.js (extra.appConfig) → expo-constants → src/config/app.ts
```

`src/config/app.ts` provides defaults for every field, so missing keys fall back to safe values.

## App store metadata

| Variable | Description |
|---|---|
| `APP_NAME` | Display name shown on the home screen |
| `APP_VERSION` | App version (e.g. `1.0.0`) |

Bundle identifiers and other platform settings are edited directly in `app.config.js`.

## Optional keys

```bash
APP_CONTACT_PHONE=+1 (800) 123-4567
APP_CONTACT_EMAIL=support@example.com
APP_SOCIAL_FACEBOOK=https://facebook.com/yourstore
APP_SOCIAL_X=https://x.com/yourstore
APP_SOCIAL_INSTAGRAM=https://instagram.com/yourstore
```

## Feature flags

```bash
ENABLE_ORDER_UPLOAD_PROOF=true   # allow uploading payment proof
ENABLE_GUEST_CHECKOUT=true       # allow checkout without login
```

These map to `appConfig.features.orderUploadProof` and `appConfig.features.guestCheckout`.

## Homepage

```bash
AD_KEYS=banner-home-1,banner-home-2     # comma-separated; empty = fetch all
PRODUCT_SECTION_LAYOUT=slider            # slider | grid
PRODUCT_SECTION_NUMBER_OF_PRODUCTS=6
PRODUCT_IMAGE_THUMBNAIL_SIZE=small       # small | medium | large | thumb
```

`AD_KEYS` corresponds to ad keys configured in Botble admin → **Ads → Ads** (the "Key" column).

## Common follow-ups

- App name: [03_app_name.md](03_app_name.md)
- Colors: [01_theme_colors.md](01_theme_colors.md)
- Logo: [04_app_logo.md](04_app_logo.md)
- Translations: [06_translations.md](06_translations.md)
- Social login: [11_social_login_setup.md](11_social_login_setup.md)

## Troubleshooting

See [Troubleshooting](troubleshooting.md). Most issues are `API_BASE_URL` typos, a missing `API_KEY`, or `.env` changes applied without restarting Metro.

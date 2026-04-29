# Configuration

All app configuration lives in the `.env` file at the project root. Hot reload does not pick up `.env` changes — fully stop and rerun the app after editing.

## Required keys

```bash
API_BASE_URL=https://your-domain.com
API_KEY=<from Admin → Settings → API Settings>
APP_NAME=Your Store Name
LICENSE_CODE=<your Envato purchase code>
```

See [API Configuration](06_api_base_url.md) for `API_BASE_URL` and `API_KEY`.

## Optional keys

| Key | Values | Default | Description |
|---|---|---|---|
| `USE_LOCAL_HELP` | `true` / `false` | `false` | Use bundled help content instead of loading the help URL in a WebView |
| `PRODUCT_IMAGE_THUMBNAIL_SIZE` | `small` / `medium` / `large` | `medium` | Thumbnail size for product images |
| `HOMEPAGE_PRODUCTS_PER_CATEGORY` | integer | `10` | Products shown per category on the home screen |
| `ENABLE_ORDER_UPLOAD_PROOF` | `true` / `false` | `true` | Allow customers to upload a payment proof image |
| `ENABLE_GUEST_CHECKOUT` | `true` / `false` | `false` | Allow checkout without an account |
| `DEFAULT_LANGUAGE` | language code | `en` | Default language (e.g. `en`, `ar`, `vi`, `fr`) |
| `DEFAULT_LANGUAGE_DIRECTION` | `ltr` / `rtl` | `ltr` | Layout direction |
| `DEFAULT_THEME_MODE` | `light` / `dark` / `system` | `system` | Default theme |

## Common follow-ups

- App name: [04_app_name.md](04_app_name.md)
- Theme colors: [01_theme_colors.md](01_theme_colors.md)
- Logo: [05_app_logo.md](05_app_logo.md)
- Translations: [07_translations.md](07_translations.md)
- Social login: [16_social_login_configuration.md](16_social_login_configuration.md)

## Troubleshooting

See [Troubleshooting](troubleshooting.md). Most issues come down to `API_BASE_URL` typos or a missing `API_KEY`.

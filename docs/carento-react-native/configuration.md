# Configuration

All app configuration lives in the `.env` file at the project root. `app.config.js` reads it at build/start time and exposes it to the app as `extra.appConfig` (read at runtime through `expo-constants`).

::: warning `.env` changes are not hot-reloaded
`.env` is read when Metro starts and when a native build is produced. After editing `.env`, **restart the Metro dev server** (stop and rerun `npm start`) — and **rebuild the app** (`npm run ios:sim` / `npm run android`, or `npx expo prebuild` first) if you changed a value baked into the native project (app name, colors, splash, plugins).
:::

## Required keys

```bash
API_BASE_URL=http://carento.test        # backend site root — /api/v1 is appended automatically
API_KEY=                                # only if an API key is configured in Botble admin
APP_NAME=Carento
LICENSE_CODE=                           # your Envato purchase code (development-only license check)
```

See [API URL & key](06_api_base_url.md) for `API_BASE_URL` and `API_KEY` details.

## Full environment reference

Every key below is read by `app.config.js`. Keys not listed there have no effect.

### App identity

| Key | Values | Default | Description |
|---|---|---|---|
| `APP_NAME` | text | `Carento` | Display name on the home screen and in the app |
| `APP_VERSION` | semver | `1.0.0` | Marketing version (see [Version management](10_version_management.md)) |
| `APP_ENV` | `development` / `staging` / `production` | `development` | Runtime environment. Enables the dev-only license check and test-account prefill outside production |
| `LICENSE_CODE` | Envato purchase code | *(empty)* | Checked only when `APP_ENV=development`; leave blank in production |

### Backend API

| Key | Values | Default | Description |
|---|---|---|---|
| `API_BASE_URL` | URL | `http://carento.test` | Backend site root **without** `/api/v1` (appended automatically) |
| `API_KEY` | text | *(empty)* | Sent as `X-API-KEY` only if configured in Botble admin → Settings → API |

### Localization & theme

| Key | Values | Default | Description |
|---|---|---|---|
| `DEFAULT_LANGUAGE` | `en` / `vi` / `ar` / `fr` | `en` | Default language ([Translations](07_translations.md)) |
| `DEFAULT_LANGUAGE_DIRECTION` | `ltr` / `rtl` | `ltr` | Default layout direction |
| `DEFAULT_THEME_MODE` | `light` / `dark` / `system` | `system` | Default theme mode |

### Brand colors

Hex **without** `#`. Full guide: [Theme Colors](01_theme_colors.md).

| Key | Default | Description |
|---|---|---|
| `PRIMARY_COLOR` | `84cc16` | Brand primary (lime green) |
| `PRIMARY_DARK_COLOR` | `4d7c0f` | Primary variant for dark mode |
| `ON_PRIMARY_COLOR` | `FFFFFF` | Foreground color on top of primary |

### Contact & social

| Key | Default | Description |
|---|---|---|
| `APP_CONTACT_PHONE` | `+1 (800) 227-3686` | Support phone shown in the app |
| `APP_CONTACT_EMAIL` | `support@carento.com` | Support email |
| `APP_SOCIAL_FACEBOOK` | `https://facebook.com` | Facebook profile link |
| `APP_SOCIAL_X` | `https://x.com` | X (Twitter) profile link |
| `APP_SOCIAL_INSTAGRAM` | `https://instagram.com` | Instagram profile link |

### Feature toggles

| Key | Values | Default | Description |
|---|---|---|---|
| `ENABLE_GUEST_BOOKING` | `true` / `false` | `true` | Allow booking without an account |
| `ENABLE_ONE_WAY_RENTAL` | `true` / `false` | `true` | Allow a different return location from pickup |

### Splash / launch

| Key | Values | Default | Description |
|---|---|---|---|
| `SPLASH_BACKGROUND_COLOR` | hex **with** `#` | `#84cc16` | Native launch + JS splash background. Full guide: [Splash screen](17_splash_screen.md) |

### Support links (Profile screen)

| Key | Values | Default | Description |
|---|---|---|---|
| `HELP_CENTER_URL` | URL or path | *(empty)* | Help Center link. Relative (`/contact`) resolves against `API_BASE_URL` |
| `CUSTOMER_SUPPORT_URL` | URL or path | *(empty)* | Customer Support link |
| `USE_LOCAL_HELP` | `true` / `false` | `true` | When `true`, the Help row opens the bundled help screen instead of a web page |

See [Profile links](11_profile_links.md).

### Images

| Key | Values | Default | Description |
|---|---|---|---|
| `CAR_IMAGE_THUMBNAIL_SIZE` | `small` / `medium` / `large` | `medium` | Thumbnail size in list cells (`large` = full image) |

### Home section counts

| Key | Values | Default | Description |
|---|---|---|---|
| `HOME_FEATURED_COUNT` | integer | `6` | Featured cars on the home screen |
| `HOME_DEALERS_COUNT` | integer | `2` | Dealers shown on the home screen |
| `HOME_BLOG_COUNT` | integer | `5` | Blog posts shown on the home screen |

### Social authentication

Leave a provider's credentials blank to disable it. Full setup: [Social login configuration](16_social_login_configuration.md).

| Key | Values | Default | Description |
|---|---|---|---|
| `ENABLE_GOOGLE_SIGN_IN` | `true` / `false` | `true` | Enable Google — also requires `GOOGLE_WEB_CLIENT_ID` |
| `GOOGLE_WEB_CLIENT_ID` | client id | *(empty)* | Google Web Client ID ([Google setup](14_google_login_setup.md)) |
| `GOOGLE_SERVICES_FILE` | file path | *(empty)* | Path to `google-services.json` (Android push / Google services) |
| `ENABLE_APPLE_SIGN_IN` | `true` / `false` | `true` | Enable Apple Sign-In (iOS) ([Apple setup](13_apple_login_setup.md)) |
| `ENABLE_FACEBOOK_SIGN_IN` | `true` / `false` | `true` | Enable Facebook — also requires `FACEBOOK_APP_ID` |
| `FACEBOOK_APP_ID` | app id | *(empty)* | Facebook App ID ([Facebook setup](15_facebook_login_setup.md)) |
| `FACEBOOK_CLIENT_TOKEN` | client token | *(empty)* | Facebook Client Token |

### Dev test account

Pre-fills the login form. Only included outside `APP_ENV=production` (always empty in production builds).

| Key | Default | Description |
|---|---|---|
| `TEST_EMAIL` | *(empty)* | Email pre-filled on the login screen |
| `TEST_PASSWORD` | *(empty)* | Password pre-filled on the login screen |

## Common follow-ups

- App name: [04_app_name.md](04_app_name.md)
- Theme colors: [01_theme_colors.md](01_theme_colors.md)
- Logo: [05_app_logo.md](05_app_logo.md)
- Translations: [07_translations.md](07_translations.md)
- Social login: [16_social_login_configuration.md](16_social_login_configuration.md)

## Troubleshooting

See [Troubleshooting](troubleshooting.md). Most issues come down to an `API_BASE_URL` typo, a missing `API_KEY`, or forgetting to restart Metro after editing `.env`.

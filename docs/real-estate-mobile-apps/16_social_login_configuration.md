# Social Login Configuration

This document explains how the Flex Home real-estate app decides which social login providers appear on the login screen, and which environment keys each one needs.

## Overview

The app supports **three** social login providers:

- Google Sign-In
- Apple Sign-In (iOS only)
- Facebook Login

Each is toggled independently through environment variables in `.env`, read by `app.config.js` and resolved at runtime in `src/config/app.ts`.

## Enable flags

```bash
# Set to 'false' to disable a provider. Any other value (or unset) = enabled.
ENABLE_GOOGLE_SIGN_IN=true
ENABLE_APPLE_SIGN_IN=true
ENABLE_FACEBOOK_SIGN_IN=true
```

| Key | Default | Notes |
|---|---|---|
| `ENABLE_GOOGLE_SIGN_IN` | `true` | Also requires `GOOGLE_WEB_CLIENT_ID` to be set |
| `ENABLE_APPLE_SIGN_IN` | `true` | iOS only, auto-hidden on Android |
| `ENABLE_FACEBOOK_SIGN_IN` | `true` | Also requires `FACEBOOK_APP_ID` to be set |

::: tip Enable ≠ visible
A flag being `true` is necessary but not sufficient. Google and Facebook also need their credentials set, otherwise their config plugins are never added and the buttons stay hidden. Apple needs no credentials in `.env`, only a device running iOS.
:::

## How the app resolves each provider

The resolution logic lives in `src/config/app.ts` (`appConfig.auth`):

| Field | Resolves to |
|---|---|
| `googleEnabled` | `ENABLE_GOOGLE_SIGN_IN !== "false"` **and** `GOOGLE_WEB_CLIENT_ID` is non-empty |
| `appleEnabled` | `Platform.OS === "ios"` **and** `ENABLE_APPLE_SIGN_IN !== "false"` |
| `facebookEnabled` | `ENABLE_FACEBOOK_SIGN_IN !== "false"` **and** `FACEBOOK_APP_ID` is non-empty |
| `hasAnySocialLoginEnabled` | true if **any** of the three above is true |

The login screen renders `SocialLoginButtons` (`src/components/auth/social-login-buttons.tsx`), which:

- shows one button per enabled provider, in the order Google, Apple, Facebook;
- renders **nothing at all** (no "or continue with" divider) when `hasAnySocialLoginEnabled` is false.

So disabling every provider leaves a clean email/password-only login screen.

## Provider reference

| Provider | Env keys | Native config added at prebuild | Setup guide |
|---|---|---|---|
| Google | `ENABLE_GOOGLE_SIGN_IN`, `GOOGLE_WEB_CLIENT_ID`, `GOOGLE_SERVICES_FILE` (Android, optional) | `@react-native-google-signin/google-signin` (added when `GOOGLE_WEB_CLIENT_ID` set) | [Google Sign-In](14_google_login_setup.md) |
| Apple | `ENABLE_APPLE_SIGN_IN` | `expo-apple-authentication` + `ios.usesAppleSignIn: true` (always added) | [Apple Sign-In](13_apple_login_setup.md) |
| Facebook | `ENABLE_FACEBOOK_SIGN_IN`, `FACEBOOK_APP_ID`, `FACEBOOK_CLIENT_TOKEN` | `react-native-fbsdk-next` + `expo-build-properties` (static frameworks), added when `FACEBOOK_APP_ID` set | [Facebook Login](15_facebook_login_setup.md) |

## Configuration examples

### Google and Apple only

```bash
ENABLE_GOOGLE_SIGN_IN=true
GOOGLE_WEB_CLIENT_ID=your-web-client-id.apps.googleusercontent.com
ENABLE_APPLE_SIGN_IN=true
ENABLE_FACEBOOK_SIGN_IN=false
```

### Email/password only (no social login)

```bash
ENABLE_GOOGLE_SIGN_IN=false
ENABLE_APPLE_SIGN_IN=false
ENABLE_FACEBOOK_SIGN_IN=false
```

The whole "or continue with" section disappears.

## Backend requirement

Every enabled provider posts its token to `POST {API_BASE_URL}/api/v1/auth/{provider}` (`google`, `apple`, or `facebook`). The Botble backend must have the **matching** provider enabled and configured in its social-login settings, and must return the same customer + Sanctum token as email login. If a provider is enabled in the app but not on the backend, sign-in will fail server-side even though the button appears.

## Testing different configurations

1. Edit the flags/credentials in `.env`.
2. Restart Metro, then run `npx expo prebuild` and rebuild if you changed which plugins are added (adding/removing a provider).
3. Open the login screen and confirm only the intended providers appear.

::: warning `.env` is not hot-reloaded
`app.config.js` reads these keys at build/start time. Adding or removing a provider changes the native project, so a full `npx expo prebuild` and rebuild is required. A Metro restart is not enough.
:::

## Related

- [Google Sign-In setup](14_google_login_setup.md)
- [Apple Sign-In setup](13_apple_login_setup.md)
- [Facebook Login setup](15_facebook_login_setup.md)
- [Configuration reference](configuration.md)

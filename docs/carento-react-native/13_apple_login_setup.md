# Apple Sign-In Setup

This guide sets up **Sign in with Apple** in the Carento React Native (Expo) car-rental app. On the login screen it renders the **Apple** button in the "or continue with" row, next to Google and Facebook.

::: tip iOS-only feature
Apple Sign-In is only offered on iOS. The app gates the button behind `appConfig.auth.appleEnabled`, which is `Platform.OS === "ios" && ENABLE_APPLE_SIGN_IN !== "false"` (see `src/config/app.ts`). On Android the Apple button never appears, so no Android configuration is required.
:::

## How it works in the app

- The `expo-apple-authentication` config plugin is **always** added at prebuild time — `app.config.js` `buildPlugins()` pushes it unconditionally, and `ios.usesAppleSignIn: true` enables the native capability.
- The login flow lives in `src/hooks/use-social-auth.ts` → `signInWithApple()`. It calls `AppleAuthentication.signInAsync()` requesting the `FULL_NAME` and `EMAIL` scopes, then exchanges the returned **identity token** with the Botble backend:

  ```
  POST {API_BASE_URL}/api/v1/auth/apple
  { "id_token": "<Apple identityToken>" }
  ```

  The backend returns a customer + Sanctum token, and the app signs the user in.

## Prerequisites

1. An [Apple Developer Program](https://developer.apple.com/programs/) membership ($99/year).
2. Your app's bundle identifier registered in the Apple Developer portal. Carento ships with `com.carento.mobile` (`ios.bundleIdentifier` in `app.config.js`).
3. Botble backend with the **car-manager** plugin and Apple configured as a social-login provider.

## Step 1: Enable "Sign in with Apple" for your App ID

1. Go to the [Apple Developer Portal](https://developer.apple.com/account) → **Certificates, Identifiers & Profiles**.
2. Open **Identifiers** and select your app's App ID (or create one that matches `com.carento.mobile`).
3. Enable the **Sign In with Apple** capability.
4. Click **Save**.

## Step 2: Create a Services ID (for the backend / web callback)

The native iOS app validates through the App ID, but Botble verifies Apple tokens server-side and needs a Services ID.

1. **Identifiers** → **+** → **Services IDs** → **Continue**.
2. Enter a description and an identifier (e.g. `com.carento.mobile.service`).
3. Register it, then reopen it and enable **Sign In with Apple**.
4. Click **Configure** and add your Botble site domain and the return URL Botble expects for its Apple callback.
5. Click **Save**.

## Step 3: Configure the Botble backend

In your Botble admin, open the social-login settings and enable the **Apple** provider. Supply the values Apple issued:

- Services ID (client ID)
- Team ID (Apple Developer → **Membership**)
- Key ID and the `.p8` private key (Apple Developer → **Keys** → new key with **Sign in with Apple** enabled)

The backend must issue the **same** customer token shape for `POST /api/v1/auth/apple` as it does for email login, so the app can sign the user in transparently.

## Step 4: Configure the app

`expo-apple-authentication` needs no credentials in `.env` — it works purely from the native capability. The only relevant key is the enable flag:

```bash
# Apple Sign-In (iOS only). Default: enabled.
ENABLE_APPLE_SIGN_IN=true
```

| Key | Values | Default | Effect |
|---|---|---|---|
| `ENABLE_APPLE_SIGN_IN` | `true` / `false` | `true` | `false` hides the Apple button. Any value other than `false` (or unset) keeps it enabled — on iOS only. |

## Step 5: Rebuild the native project

Because `usesAppleSignIn` and the config plugin change the native iOS project, regenerate and rebuild after any change:

```bash
npx expo prebuild
npm run ios          # or: npm run ios:sim
```

::: warning `.env` is not hot-reloaded
After editing `.env`, restart Metro and rebuild the app. Changing `ENABLE_APPLE_SIGN_IN` requires a fresh start because `app.config.js` reads it at build/start time.
:::

## Step 6: Test

1. Run the app on an **iOS device or simulator**.
2. Open the login screen — the **Apple** button appears in the "or continue with" row.
3. Tap it and complete the Face ID / Touch ID prompt.
4. On first sign-in Apple offers **Hide My Email**; the app receives whatever the user chooses.
5. Confirm you land back in the app signed in.

## Troubleshooting

| Symptom | Fix |
|---|---|
| Apple button not showing | Confirm you are on iOS (it never renders on Android). Check `ENABLE_APPLE_SIGN_IN` is not `false`. Rebuild after `.env` changes. |
| "Apple sign-in is not available on this device" | `AppleAuthentication.isAvailableAsync()` returned false — the device/simulator lacks Apple Sign-In support, or the capability was not baked in. Re-run `npx expo prebuild` and rebuild. |
| Sign-in cancelled | Tapping cancel throws `ERR_REQUEST_CANCELED`; the app treats this as a no-op (no error toast). Expected behavior. |
| Backend rejects the token | Verify the Services ID, Team ID, Key ID, and `.p8` in Botble match the Apple Developer portal, and that the bundle ID is `com.carento.mobile`. |

## Security

- Never commit your Apple `.p8` key or Team/Key IDs to version control.
- Respect the user's **Hide My Email** choice — Apple relays a private forwarding address.

## Related

- [Enable / disable social providers](16_social_login_configuration.md)
- [Google Sign-In setup](14_google_login_setup.md)
- [Facebook Login setup](15_facebook_login_setup.md)

## Additional resources

- [Sign in with Apple](https://developer.apple.com/sign-in-with-apple/)
- [expo-apple-authentication docs](https://docs.expo.dev/versions/latest/sdk/apple-authentication/)
- [Human Interface Guidelines — Sign in with Apple](https://developer.apple.com/design/human-interface-guidelines/sign-in-with-apple)

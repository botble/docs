# Facebook Login Setup

This guide sets up **Facebook Login** in the Carento React Native (Expo) car-rental app. On the login screen it renders the **Facebook** button in the "or continue with" row.

## How it works in the app

- Two plugins are added **only when** `FACEBOOK_APP_ID` is set — `app.config.js` `buildPlugins()` pushes `react-native-fbsdk-next` and `expo-build-properties` with `ios.useFrameworks: "static"` (the Facebook SDK requires static frameworks on iOS). Without the App ID neither is added and the button stays hidden.
- The login flow lives in `src/hooks/use-social-auth.ts` → `signInWithFacebook()`. It calls `LoginManager.logInWithPermissions(["public_profile", "email"])`, reads the current `AccessToken`, and exchanges it with the Botble backend:

  ```
  POST {API_BASE_URL}/api/v1/auth/facebook
  { "access_token": "<Facebook accessToken>" }
  ```

  The backend returns a customer + Sanctum token and the app signs the user in.
- The button only shows when `appConfig.auth.facebookEnabled` is true, i.e. `ENABLE_FACEBOOK_SIGN_IN !== "false"` **and** `FACEBOOK_APP_ID` is non-empty.

## Prerequisites

1. A [Meta for Developers](https://developers.facebook.com) account.
2. A Facebook App with the **Facebook Login** product added.
3. Botble backend with Facebook enabled as a social-login provider.

Carento's native identifiers (needed below):

| Platform | Identifier |
|---|---|
| iOS bundle ID | `com.carento.mobile` |
| Android package | `com.carento.mobile` |

## Step 1: Create a Facebook app

1. Go to [Meta for Developers](https://developers.facebook.com) → **My Apps** → **Create App**.
2. Choose **Consumer** (or **None**) as the type.
3. Enter the app name and contact email, then create it.

## Step 2: Add the Facebook Login product

1. In the app dashboard, **Add Product** → **Facebook Login** → **Set Up**.
2. Add both the **iOS** and **Android** platforms.

## Step 3: Get your credentials

- **App ID** — **Settings → Basic**. This is `FACEBOOK_APP_ID`.
- **Client Token** — **Settings → Advanced → Security**. This is `FACEBOOK_CLIENT_TOKEN`.

::: warning Client Token, not App Secret
Copy the **Client Token**, never the App Secret. The App Secret must never ship in a mobile app.
:::

## Step 4: Configure platform settings in Meta

### iOS

1. **Settings → Basic → + Add Platform → iOS**.
2. Bundle ID: `com.carento.mobile`.
3. Enable **Single Sign On** and save.

### Android

1. **Settings → Basic → + Add Platform → Android**.
2. Package name: `com.carento.mobile`.
3. Default Activity Class Name: `com.carento.mobile.MainActivity`.
4. Add **key hashes** (base64 SHA-1 of your signing keys):

   ```bash
   # Debug keystore (Mac/Linux)
   keytool -exportcert -alias androiddebugkey -keystore ~/.android/debug.keystore | openssl sha1 -binary | openssl base64
   ```

   Add a key hash for each signing certificate (debug, release, and Google Play App Signing).
5. Enable **Single Sign On** and save.

## Step 5: Configure the Botble backend

Enable **Facebook** as a social-login provider in Botble admin and set the Facebook **App ID / App Secret**. The backend validates the incoming `access_token` and must issue the same customer token for `POST /api/v1/auth/facebook` as email login does.

## Step 6: Configure the app

```bash
# Facebook Login. Leave FACEBOOK_APP_ID blank to disable Facebook entirely.
ENABLE_FACEBOOK_SIGN_IN=true
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_CLIENT_TOKEN=your_facebook_client_token
```

| Key | Values | Default | Effect |
|---|---|---|---|
| `FACEBOOK_APP_ID` | App ID | *(empty)* | Required. When empty, the plugins are not added and the button is hidden. |
| `FACEBOOK_CLIENT_TOKEN` | Client Token | *(empty)* | Required by the native SDK for API calls. |
| `ENABLE_FACEBOOK_SIGN_IN` | `true` / `false` | `true` | `false` hides the button even if the App ID is set. |

::: tip Native config is handled by the plugin
`react-native-fbsdk-next`'s config plugin writes the iOS `Info.plist` entries (`FacebookAppID`, `FacebookClientToken`, the `fb<APP_ID>` URL scheme, `LSApplicationQueriesSchemes`) and the Android manifest/resources for you at prebuild time from the `.env` values — no manual native edits needed.
:::

## Step 7: Prebuild and rebuild

Adding these plugins (and switching iOS to static frameworks) changes the native project, so regenerate and rebuild:

```bash
npx expo prebuild
npm run ios          # and / or: npm run android
```

::: warning `.env` is not hot-reloaded
`app.config.js` reads these keys at build/start time. After editing `.env`, restart Metro and rebuild.
:::

## Step 8: App mode

While testing, keep the Facebook app in **Development** mode and add your account under **Roles** as a Tester/Developer. For production, complete **App Review** (the `email` permission usually needs review) and switch the app to **Live**.

## Troubleshooting

| Symptom | Fix |
|---|---|
| Facebook button not showing | `FACEBOOK_APP_ID` must be set (plugins only added then) and `ENABLE_FACEBOOK_SIGN_IN` must not be `false`. Re-run `npx expo prebuild` and rebuild. |
| "Facebook sign-in is not configured" toast | `appConfig.auth.facebookEnabled` is false — App ID empty or flag `false`. |
| iOS build fails after adding Facebook | Confirm `expo-build-properties` with `ios.useFrameworks: "static"` is present (it is added automatically with the App ID). Clean and re-run `npx expo prebuild`. |
| "Invalid key hash" (Android) | Add the base64 SHA-1 key hash for the signing certificate you built with, including Google Play App Signing. |
| "App Not Setup" / development mode | Add your account as a Tester/Developer under **Roles**, or switch the app to Live. |
| Login works but no email | Ensure the `email` permission is granted/approved; only `public_profile` is guaranteed by default. |

## Security

- Never commit your App ID, Client Token, or App Secret to version control.
- The App Secret must live only on the backend, never in the app.

## Related

- [Enable / disable social providers](16_social_login_configuration.md)
- [Google Sign-In setup](14_google_login_setup.md)
- [Apple Sign-In setup](13_apple_login_setup.md)

## Additional resources

- [Meta for Developers](https://developers.facebook.com)
- [Facebook Login docs](https://developers.facebook.com/docs/facebook-login)
- [react-native-fbsdk-next](https://github.com/thebergamo/react-native-fbsdk-next)

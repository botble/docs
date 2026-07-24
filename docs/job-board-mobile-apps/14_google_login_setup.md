# Google Sign-In Setup

This guide sets up **Google Sign-In** in the Botble JobBoard React Native (Expo) job-board app. On the login screen it renders the **Google** button in the "or continue with" row.

## How it works in the app

- The `@react-native-google-signin/google-signin` config plugin is added **only when** `GOOGLE_WEB_CLIENT_ID` is set. `app.config.js` `buildPlugins()` pushes it conditionally. Without the web client ID the native module is never linked and the button stays hidden.
- The login flow lives in `src/hooks/use-social-auth.ts` → `signInWithGoogle()`. It configures the SDK with `webClientId: appConfig.auth.googleWebClientId`, calls `GoogleSignin.signIn()`, and exchanges the returned **ID token** with the Botble backend:

  ```
  POST {API_BASE_URL}/api/v1/auth/google
  { "id_token": "<Google idToken>" }
  ```

  The backend returns a customer + Sanctum token and the app signs the user in.
- The button only shows when `appConfig.auth.googleEnabled` is true, i.e. `ENABLE_GOOGLE_SIGN_IN !== "false"` **and** `GOOGLE_WEB_CLIENT_ID` is non-empty.

## Prerequisites

1. A [Google Cloud](https://console.cloud.google.com) account (a Firebase project also works and gives you the config files for free).
2. Basic knowledge of Expo prebuild / native builds.
3. Botble backend with Google enabled as a social-login provider.

Botble JobBoard's native identifiers (needed below):

| Platform | Identifier | Source |
|---|---|---|
| iOS bundle ID | `com.botble.jobboard` | `ios.bundleIdentifier` in `app.config.js` |
| Android package | `com.botble.jobboard` | `android.package` in `app.config.js` |

## Step 1: Create OAuth client IDs

In [Google Cloud Console](https://console.cloud.google.com) → **APIs & Services** → **Credentials** → **Create Credentials** → **OAuth client ID**, create **three** clients:

### Web client ID (required: used by the app and backend)

1. Application type: **Web application**.
2. Name it (e.g. `Botble JobBoard Web Client`) and click **Create**.
3. Copy the client ID. This is your **`GOOGLE_WEB_CLIENT_ID`**. The Android/iOS native SDKs use it as the `webClientId` to mint the ID token the backend verifies.

### iOS client ID (required for iOS)

1. Application type: **iOS**.
2. Bundle ID: `com.botble.jobboard`.
3. Create it, then note the **reversed client ID** (`com.googleusercontent.apps.XXXX`). If you use a `GoogleService-Info.plist` from Firebase, the plugin wires the URL scheme for you.

### Android client ID (required for Android)

1. Application type: **Android**.
2. Package name: `com.botble.jobboard`.
3. SHA-1 certificate fingerprint: get it from your keystore:

   ```bash
   # Debug keystore
   keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android

   # Release keystore
   keytool -list -v -keystore your-release-key.keystore -alias your-alias
   ```

::: warning SHA-1 fingerprints
Register a separate Android OAuth client for each signing certificate (debug, release, and Google Play App Signing). A mismatch causes `DEVELOPER_ERROR` at sign-in.
:::

## Step 2: (Optional) Add the Android google-services file

If you use Firebase / a `google-services.json`, point the app at it so it is bundled into the Android build:

```bash
# Absolute or project-relative path to your google-services.json
GOOGLE_SERVICES_FILE=./google-services.json
```

`app.config.js` sets `android.googleServicesFile` from this value when present. This same file is also used for [push notifications](push_notifications.md).

## Step 3: Configure the Botble backend

Enable **Google** as a social-login provider in Botble admin and set the Google **web client ID / secret**. The backend verifies the incoming `id_token` against the same web client ID, so `GOOGLE_WEB_CLIENT_ID` in the app and the backend must match. It must issue the same customer token for `POST /api/v1/auth/google` as email login does.

## Step 4: Configure the app

```bash
# Google Sign-In. Leave GOOGLE_WEB_CLIENT_ID blank to disable Google entirely.
ENABLE_GOOGLE_SIGN_IN=true
GOOGLE_WEB_CLIENT_ID=your-web-client-id.apps.googleusercontent.com
GOOGLE_SERVICES_FILE=
```

| Key | Values | Default | Effect |
|---|---|---|---|
| `GOOGLE_WEB_CLIENT_ID` | Web OAuth client ID | *(empty)* | Required. When empty, the plugin is not added and the button is hidden. |
| `ENABLE_GOOGLE_SIGN_IN` | `true` / `false` | `true` | `false` hides the button even if the client ID is set. |
| `GOOGLE_SERVICES_FILE` | path | *(empty)* | Optional Android `google-services.json` path. |

## Step 5: Prebuild and rebuild

Adding the Google plugin changes the native project, so regenerate and rebuild:

```bash
npx expo prebuild
npm run android      # and / or: npm run ios
```

::: warning `.env` is not hot-reloaded
`app.config.js` reads these keys at build/start time. After editing `.env`, restart Metro and rebuild. A running app will not pick up a newly set `GOOGLE_WEB_CLIENT_ID`.
:::

## Step 6: Test

1. Run the app and open the login screen.
2. Tap the **Google** button and pick an account.
3. Confirm you return to the app signed in.

## Troubleshooting

| Symptom | Fix |
|---|---|
| Google button not showing | `GOOGLE_WEB_CLIENT_ID` must be set (plugin only added then) and `ENABLE_GOOGLE_SIGN_IN` must not be `false`. Re-run `npx expo prebuild` and rebuild. |
| "Google sign-in is not configured" toast | `appConfig.auth.googleEnabled` is false. The web client ID is empty or the flag is `false`. |
| `DEVELOPER_ERROR` / `ApiException: 10` (Android) | SHA-1 fingerprint or package name mismatch. Register the correct SHA-1 for your keystore and confirm the package is `com.botble.jobboard`. |
| "Play Services" prompt on Android | The device lacks up-to-date Google Play Services; the app calls `hasPlayServices({ showPlayServicesUpdateDialog: true })`. |
| Backend rejects the token | Ensure the backend verifies against the same web client ID as `GOOGLE_WEB_CLIENT_ID`. |
| "User cancelled" | Tapping outside the picker returns a cancel/`type: "cancelled"`, handled as a no-op. Expected. |

## Security

- Never commit OAuth client IDs, `google-services.json`, or `GoogleService-Info.plist` to version control.
- The backend must verify the ID token server-side before trusting it.

## Related

- [Enable / disable social providers](16_social_login_configuration.md)
- [Apple Sign-In setup](13_apple_login_setup.md)
- [Facebook Login setup](15_facebook_login_setup.md)

## Additional resources

- [Google Cloud Console](https://console.cloud.google.com)
- [@react-native-google-signin/google-signin docs](https://react-native-google-signin.github.io/docs/)
- [Firebase Console](https://console.firebase.google.com)

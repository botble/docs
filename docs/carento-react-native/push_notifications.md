# Push Notifications

The Carento car-rental app delivers push notifications through **Expo push tokens** and the [Expo push service](https://docs.expo.dev/push-notifications/overview/), backed by `expo-notifications`. Set up the platform credentials, then register device tokens with your Botble backend.

## How it works in the app

- `expo-notifications` is **always** in the plugins list (`app.config.js` `buildPlugins()`), so no env flag is needed to enable it.
- Token registration lives in `src/hooks/use-push-notifications.ts` (mounted from `src/components/app-gate.tsx`). Once the user is authenticated it:
  1. no-ops on simulators (`Device.isDevice` is false — push is not delivered to simulators/emulators);
  2. requests notification permission (`getPermissionsAsync` → `requestPermissionsAsync`), giving up silently if denied;
  3. on Android, ensures a `default` notification channel;
  4. fetches the Expo push token via `Notifications.getExpoPushTokenAsync()`;
  5. registers it with the backend:

     ```
     POST {API_BASE_URL}/api/v1/device-tokens
     { "token": "<ExpoPushToken>", "platform": "ios" | "android" }
     ```

     (sent with the customer's auth token).
- Foreground notifications are shown as a banner with sound (`setNotificationHandler`). On logout the app best-effort unregisters the token (`unregisterDeviceToken` in `src/services/misc.ts`).

::: tip Registration requires login
The Expo push token is only obtained and registered **after** the user signs in — that is when the app has a customer token to attach. A fresh install that never logs in registers nothing.
:::

## Prerequisites

1. A physical iOS and/or Android device (simulators do not receive push).
2. An [Expo account](https://expo.dev) and EAS CLI for managing native credentials.
3. Botble backend with the API enabled so `POST /api/v1/device-tokens` accepts the token.

## Step 1: iOS — APNs key (via EAS credentials)

iOS push requires an Apple Push Notification service (APNs) key. The simplest path with Expo is to let EAS manage it:

1. Ensure `com.carento.mobile` is your iOS bundle identifier (it is, in `app.config.js`).
2. Run an EAS build (`eas build --platform ios`) or `eas credentials` and let EAS **create/manage the APNs key** for you. EAS uploads the key to Apple and stores it against your project.
3. Alternatively, in the [Apple Developer Portal](https://developer.apple.com/account) → **Keys**, create a key with **Apple Push Notifications service (APNs)** enabled, download the `.p8`, and supply it to `eas credentials`.

No extra `.env` key is needed for iOS push — the capability comes from the `expo-notifications` plugin plus the APNs credentials on EAS.

## Step 2: Android — google-services.json

Android push tokens require Firebase Cloud Messaging under the hood. Point the app at your `google-services.json`:

```bash
# Absolute or project-relative path to your google-services.json
GOOGLE_SERVICES_FILE=./google-services.json
```

`app.config.js` sets `android.googleServicesFile` from this value when present. Get the file from the [Firebase Console](https://console.firebase.google.com) by adding an Android app with package `com.carento.mobile`. (The same file is reused by [Google Sign-In](14_google_login_setup.md).)

| Key | Values | Default | Effect |
|---|---|---|---|
| `GOOGLE_SERVICES_FILE` | path | *(empty)* | Android `google-services.json` used for FCM (and Google Sign-In). |

## Step 3: Prebuild and rebuild

Native push configuration is baked in at prebuild time:

```bash
npx expo prebuild
npm run ios          # and / or: npm run android
```

## Step 4: Test

1. Run the app on a **real device** and log in (so the token is registered).
2. Copy the Expo push token — you can log it during development, or read it from your backend's stored device tokens.
3. Send a test through the Expo push service, e.g. the [Expo push tool](https://expo.dev/notifications), or via cURL:

   ```bash
   curl -X POST https://exp.host/--/api/v2/push/send \
     -H "Content-Type: application/json" \
     -d '{
       "to": "ExponentPushToken[xxxxxxxx]",
       "title": "Your booking is confirmed",
       "body": "Your Carento rental is ready — tap for details."
     }'
   ```

4. Confirm the notification arrives (foreground shows a banner; background appears in the tray).

::: warning Backend delivery
Your Botble backend stores device tokens (`/api/v1/device-tokens`) and is responsible for sending pushes to them through the Expo push service. Ensure it targets the Expo endpoint (`https://exp.host/--/api/v2/push/send`) with the stored Expo push tokens.
:::

## Deep-link routing (future)

Tapping a notification currently just opens the app. **Routing a notification tap to a specific screen (e.g. a booking or car detail) via deep links is a planned feature and is not yet implemented.** The app already registers a `carento` URL scheme (`app.config.js`), which is the foundation this will build on.

## Troubleshooting

| Symptom | Fix |
|---|---|
| No notifications on a device | Confirm it is a **physical** device — simulators never receive push. Check permission was granted. |
| Backend has no device token | The user must log in at least once after install; token registration only runs when authenticated. Confirm the API is enabled and `API_BASE_URL`/`API_KEY` are correct. |
| iOS receives nothing | APNs key missing or not linked to the project — set it up via `eas credentials`. Confirm the bundle ID is `com.carento.mobile`. |
| Android receives nothing | `GOOGLE_SERVICES_FILE` unset or the `google-services.json` package name does not match `com.carento.mobile`. Rebuild after setting it. |
| `[push] registration failed` in logs | The hook caught an error during token fetch/registration — check the device has network and the backend endpoint is reachable. |

## Security

- Do not commit `google-services.json`, `GoogleService-Info.plist`, or APNs `.p8` keys to version control.
- Let EAS store native push credentials rather than checking them into the repo.

## Related

- [Configuration reference](configuration.md)
- [Google Sign-In setup](14_google_login_setup.md) (shares `GOOGLE_SERVICES_FILE`)
- [Deploying to stores](09_deploying_app.md)

## Additional resources

- [Expo push notifications overview](https://docs.expo.dev/push-notifications/overview/)
- [expo-notifications docs](https://docs.expo.dev/versions/latest/sdk/notifications/)
- [Sending notifications with the Expo push service](https://docs.expo.dev/push-notifications/sending-notifications/)

# Push Notifications

Botble JobBoard sends push through Firebase Cloud Messaging. The app registers an FCM registration
token with your Botble backend, and the backend sends messages to that token using the FCM
HTTP v1 API.

Both platforms go through Firebase, so you need a Firebase project even if you only ship on
iOS. There is no way around this: the backend's sender only speaks FCM.

::: warning Third-party service
Firebase Cloud Messaging is a third-party Google service, so you must create and configure
your own Firebase account and project to enable push. FCM is currently free, but Firebase is
a Google product and its plans or pricing may change over time, which could incur additional
costs. Push is optional - the app runs fully without it.
:::

## How it works in the app

The app obtains its FCM token in `src/services/push-token.ts`, using
`@react-native-firebase/messaging`. `src/hooks/use-push-notifications.ts` (mounted from
`src/components/app-gate.tsx`) drives the rest. Once a customer is signed in, it:

1. Does nothing on simulators. `Device.isDevice` is false there, and push is never delivered
   to a simulator or emulator.
2. Asks for notification permission, and gives up quietly if the user declines.
3. Creates the `default` notification channel on Android.
4. Fetches the FCM registration token.
5. Registers that token with your backend:

   ```
   POST {API_BASE_URL}/api/v1/device-tokens
   { "token": "<fcm-registration-token>", "platform": "ios" | "android" }
   ```

   The request carries the customer's auth token, so registration only happens after sign-in.
   A fresh install that never signs in registers nothing.

If Firebase rotates the token, the app re-registers the new one. On sign-out it unregisters
the token (`DELETE /api/v1/device-tokens/by-token`), so a signed-out phone stops receiving
notifications meant for that account.

Tapping a notification opens the screen it refers to, including when the app was launched
from a cold start by the tap. The unread count is also mirrored on the app icon badge, and
every notification is kept in the in-app inbox (`app/notifications.tsx`), reachable from the
bell in the home header and the Inbox row in the profile tab.

::: tip Builds without Firebase still run
If no `google-services.json` / `GoogleService-Info.plist` is present, the native Firebase
module is absent. The app detects this, logs a warning, and carries on with push disabled
rather than crashing. You can develop the rest of the app without setting Firebase up.
:::

## Prerequisites

1. A physical iOS or Android device. Simulators do not receive push.
2. A Firebase project.
3. An Apple Developer account, if you want push on iOS.
4. A Botble backend with the API enabled, so `POST /api/v1/device-tokens` accepts the token.

Note that push does not work in Expo Go. You need a development or production build.

## Step 1: Create the Firebase project

In the [Firebase Console](https://console.firebase.google.com), create a project, then add
your apps to it:

- An **Android** app with package name `com.botble.jobboard`. Download `google-services.json`.
- An **iOS** app with bundle ID `com.botble.jobboard`. Download `GoogleService-Info.plist`.

Use your own package name and bundle ID if you have renamed the app. They must match what is
in `app.config.js`, or Firebase will reject the token request.

## Step 2: Point the app at the config files

Put both files somewhere in the project and reference them from `.env`:

```bash
GOOGLE_SERVICES_FILE=./google-services.json
GOOGLE_SERVICES_PLIST=./GoogleService-Info.plist
```

| Key | Values | Default | Effect |
|---|---|---|---|
| `GOOGLE_SERVICES_FILE` | path | *(empty)* | Android `google-services.json`, used for FCM and Google Sign-In. |
| `GOOGLE_SERVICES_PLIST` | path | *(empty)* | iOS `GoogleService-Info.plist`, used for FCM. |

`app.config.js` only registers the Firebase plugins when these are set, which is what keeps a
Firebase-less checkout building.

## Step 3: Upload your APNs key to Firebase (iOS only)

Firebase cannot reach an iPhone on its own. It hands the message to Apple, so it needs your
APNs key:

1. In the [Apple Developer Portal](https://developer.apple.com/account), go to **Keys** and
   create a key with **Apple Push Notifications service (APNs)** enabled. Download the `.p8`.
2. In the Firebase Console, open **Project settings → Cloud Messaging**, find your iOS app,
   and upload the `.p8` along with its Key ID and your Team ID.

Skip this and iOS will hand out FCM tokens quite happily, but no notification will ever
arrive.

## Step 4: Configure the backend sender

Your Botble backend needs credentials to call FCM. In the admin panel, under the API
settings, set:

- `fcm_project_id`: the project ID from your Firebase project.
- `fcm_service_account_path`: path to the service-account JSON you generate under
  **Project settings → Service accounts → Generate new private key**.

Without these the backend stores device tokens but never sends anything.

## Step 5: Rebuild

Firebase is native configuration, so it is baked in at prebuild time:

```bash
npx expo prebuild --clean
npm run ios          # and / or: npm run android
```

## Step 6: Test

1. Run the app on a real device and sign in, so the token gets registered.
2. Confirm the token reached your backend. It is stored against the customer, and you can see
   it in the admin panel's device-token list.
3. Send a notification from the Botble admin panel to that customer.
4. Check that it arrives, that tapping it opens the right screen, and that it shows up in the
   in-app inbox.

## Troubleshooting

| Symptom | Fix |
|---|---|
| Nothing arrives on any device | Confirm it is a physical device, and that permission was granted. |
| The backend has no device token | The customer must sign in at least once after installing. Registration only runs when authenticated. Check `API_BASE_URL` and that the API is enabled. |
| `Native module RNFBAppModule not found` | The Firebase native module is not linked, which means the config files are missing or you are running in Expo Go. Set `GOOGLE_SERVICES_FILE` / `GOOGLE_SERVICES_PLIST` and run `npx expo prebuild --clean`. |
| Android gets nothing | The package name in `google-services.json` does not match the app's package name. Rebuild after fixing. |
| iOS gets a token but no notifications | The APNs key is not uploaded to Firebase, or the Team ID / Key ID is wrong. See step 3. |
| The backend reports a send error | `fcm_project_id` or `fcm_service_account_path` is wrong, or the service account lacks the Firebase Cloud Messaging API permission. |
| `[push-token] FCM token unavailable` in logs | Expected when Firebase is not configured. Push is disabled and the rest of the app runs normally. |

## Security

- Do not commit `google-services.json`, `GoogleService-Info.plist`, the APNs `.p8`, or the FCM
  service-account JSON to version control.

## Related

- [Configuration reference](configuration.md)
- [Google Sign-In setup](14_google_login_setup.md), which shares `GOOGLE_SERVICES_FILE`
- [Deploying to stores](09_deploying_app.md)

## Additional resources

- [React Native Firebase: Cloud Messaging](https://rnfirebase.io/messaging/usage)
- [FCM HTTP v1 API](https://firebase.google.com/docs/cloud-messaging/migrate-v1)

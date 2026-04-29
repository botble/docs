# Push Notifications (FCM)

The app uses Firebase Cloud Messaging. Set up Firebase, drop in two config files, and configure the backend.

## 1. Create a Firebase project

[Firebase Console](https://console.firebase.google.com/) → **Add project**. Analytics is optional.

## 2. Add the Android app

In Firebase Console → **Add app** → **Android**.

- Package name: must match `applicationId` in `android/app/build.gradle.kts`.
- Download `google-services.json` and place it in `android/app/`.

Reference: [Firebase Android setup](https://firebase.google.com/docs/android/setup).

## 3. Add the iOS app

In Firebase Console → **Add app** → **iOS**.

- Bundle ID: must match the value in Xcode → Runner target → General.
- Download `GoogleService-Info.plist` and place it in `ios/Runner/`.

In Xcode (`ios/Runner.xcworkspace`):

1. Select the Runner target.
2. **Signing & Capabilities** → **+ Capability** → **Push Notifications**.

Reference: [Firebase iOS setup](https://firebase.google.com/docs/ios/setup).

## 4. iOS APNs

Required for iOS to receive notifications.

1. [Apple Developer Portal](https://developer.apple.com/) → **Keys** → create a new key with **APNs** enabled. Download the `.p8`.
2. Firebase Console → **Project Settings** → **Cloud Messaging** → **Apple app configuration** → **Upload** under **APNs Authentication Key**.
3. Enter the Key ID and Team ID from the Apple Developer Portal.

## 5. Configure the backend

Generate a service account key:

1. Firebase Console → **Project Settings** → **Service accounts** → **Generate new private key**. Save the JSON.

Configure Botble:

1. Admin → **Settings → API Settings** → **Push Notifications (FCM v1 API)**.
2. Enable push notifications.
3. Set the **Firebase Project ID** (Firebase Console → Project Settings → General).
4. Upload the service account JSON.

## 6. Test

Run the app on a real device (FCM does not deliver to iOS simulators). Log in so the device token is registered with the backend.

Send a test from either:

- Botble admin → **Settings → API Settings → Send Custom Notification**, or
- Firebase Console → **Cloud Messaging → Send your first message**.

## Troubleshooting

| Symptom | Fix |
|---|---|
| No notifications received | Use a real device. Verify config files are in the correct folders. iOS: confirm the Push Notifications capability is enabled. |
| Backend has no device tokens | The user must log in once after install. Confirm the API is enabled and `API_KEY` is correct. |
| iOS notifications fail with token error | APNs key is missing or wrong Team ID / Key ID. |

## Security

Do not commit `google-services.json`, `GoogleService-Info.plist`, or the service account JSON. Add to `.gitignore`:

```ini
android/app/google-services.json
ios/Runner/GoogleService-Info.plist
```

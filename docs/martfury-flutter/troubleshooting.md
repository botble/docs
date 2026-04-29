# Troubleshooting

## App won't start

```bash
flutter clean
flutter pub get
flutter run
```

If it still fails, verify Flutter is installed and a device or emulator is connected.

## Connection error / network error

1. Open `.env` and confirm `API_BASE_URL=https://your-domain.com` is correct (no trailing slash, `https://` in production).
2. Open the URL in a browser to confirm the site is online.

## 401 Unauthorized — "Invalid or missing API key"

The `API_KEY` in your `.env` does not match the key saved on the backend.

1. Open `https://your-domain.com/admin`
2. Go to **Settings → API Settings**
3. Click **Generate** if no key is shown, or copy the existing key
4. Paste it into `.env` as `API_KEY=...`
5. Rebuild the app

Do not put your Envato purchase code in `API_KEY`. The purchase code goes in `LICENSE_CODE` only. See [API Configuration](./06_api_base_url.md#api-key).

## Login doesn't work

1. Test login on the website itself — it must work there first.
2. Confirm the API is enabled at **Admin → Settings → API Settings**.
3. Confirm `API_KEY` is set correctly (see section above).

## No products showing

1. Confirm the website has published products.
2. Pull down on the home screen to refresh.
3. Confirm `API_BASE_URL` and `API_KEY` are correct.

## Social login not working

Open the matching setup guide and follow every step. Email login must work first.

- [Google Login](14_google_login_setup.md)
- [Facebook Login](15_facebook_login_setup.md)
- [Apple Login](13_apple_login_setup.md)
- [Twitter Login](12_twitter_login_setup.md)

After changing `.env`, fully stop and re-run the app. Hot reload does not pick up `.env` changes.

### Twitter login error 302

In the Twitter Developer Portal → User authentication settings:

- Type of App: **Native App**
- Client type: **Public client**
- OAuth 1.0a: enabled
- Callback URL: `martfury://twitter-auth`

See [Twitter Login Setup](12_twitter_login_setup.md).

### Google Sign In "DEVELOPER_ERROR"

- SHA-1 fingerprint in Google Cloud Console must match your keystore (debug and release).
- Package name in the OAuth client must match the app.
- `google-services.json` must be in `android/app/`.

See [Google Login Setup](14_google_login_setup.md).

### Facebook "Invalid Key Hash"

Generate your key hash and add it to Facebook app settings → Android → Key Hashes (both debug and release):

```bash
keytool -exportcert -alias androiddebugkey -keystore ~/.android/debug.keystore | openssl sha1 -binary | openssl base64
```

See [Facebook Login Setup](15_facebook_login_setup.md).

### Apple Sign In button missing

In `.env`:

```bash
ENABLE_APPLE_SIGN_IN=true
APPLE_SERVICE_ID=<your-service-id>
APPLE_TEAM_ID=<your-team-id>
```

The button is iOS-only by design. See [Apple Login Setup](13_apple_login_setup.md).

## Theme colors not updating

`.env` changes are not picked up by hot reload. Stop the app and run `flutter run` again. If the colors still do not change:

```bash
flutter clean
flutter pub get
flutter run
```

See [Theme Colors](01_theme_colors.md).

## App name not changing

`.env` does not control the native app name. Follow [App Name Configuration](04_app_name.md) — both Android and iOS files must be updated, then rebuild.

## Logo not updating

Replace every logo file listed in [App Logo](05_app_logo.md), then `flutter clean && flutter run`.

## Cannot upload to Google Play

Upload `.aab`, not `.apk`. A Google Play Developer account is required. See [Deploying the App](09_deploying_app.md).

## Cannot upload to Apple App Store

Apple Developer account ($99/year) is required. Upload via Xcode → Archive → Distribute App. See [Deploying the App](09_deploying_app.md).

## When asking for support

Include:

- What you did and the exact error message (screenshot of network logs if it is an API error)
- Your website URL
- Device or emulator and OS version
- Steps already tried

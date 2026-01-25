# Google Sign In Setup Guide for Mobile App

This guide will help you set up Google Sign In in your MartFury mobile app.

## Prerequisites

1. A Google Cloud Platform Account
2. A Firebase project (recommended) or standalone Google Cloud project
3. Basic knowledge of mobile app development

## Step 1: Configure Google Cloud Platform

### Option A: Using Firebase (Recommended)

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project or select an existing one
3. Add your Android and iOS apps to the project
4. Download configuration files:
   - **Android**: `google-services.json` → place in `android/app/`
   - **iOS**: `GoogleService-Info.plist` → place in `ios/Runner/`

### Option B: Using Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Go to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth client ID**

## Step 2: Create OAuth 2.0 Client IDs

You need to create **multiple** OAuth client IDs:

### Web Client ID (Required)

1. In Google Cloud Console → Credentials → Create OAuth client ID
2. Application type: **Web application**
3. Name: `MartFury Web Client`
4. Click **Create**
5. Copy the **Client ID** - this is your `GOOGLE_CLIENT_ID`

### iOS Client ID (Required for iOS)

1. Create OAuth client ID → Application type: **iOS**
2. Bundle ID: Your app's bundle identifier (e.g., `com.yourcompany.martfury`)
3. Click **Create**
4. Copy the **iOS URL scheme** (format: `com.googleusercontent.apps.XXXX`)

### Android Client ID (Required for Android)

1. Create OAuth client ID → Application type: **Android**
2. Package name: Your app's package name (e.g., `com.yourcompany.martfury`)
3. SHA-1 certificate fingerprint:
   ```bash
   # For debug keystore
   keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android

   # For release keystore
   keytool -list -v -keystore your-release-key.keystore -alias your-alias
   ```
4. Click **Create**

::: warning SHA-1 Fingerprint
You need separate Android OAuth clients for debug and release builds, each with their respective SHA-1 fingerprints.
:::

## Step 3: Configure Your Mobile App

### Environment Variables

Create or update your `.env` file:

```bash
# Google Sign-In credentials
# Use the Web Client ID (not iOS or Android client IDs)
GOOGLE_CLIENT_ID=your-web-client-id.apps.googleusercontent.com
GOOGLE_SERVER_CLIENT_ID=your-web-client-id.apps.googleusercontent.com

# Enable Google Sign-In
ENABLE_GOOGLE_SIGN_IN=true
```

| Variable | Description |
|----------|-------------|
| `GOOGLE_CLIENT_ID` | Web application OAuth client ID |
| `GOOGLE_SERVER_CLIENT_ID` | Same as above (used for backend verification) |

### iOS Configuration

Update your `ios/Runner/Info.plist` to include the **reversed client ID** as a URL scheme:

```xml
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleTypeRole</key>
        <string>Editor</string>
        <key>CFBundleURLSchemes</key>
        <array>
            <!-- Add your reversed iOS client ID here -->
            <string>com.googleusercontent.apps.YOUR_IOS_CLIENT_ID</string>
        </array>
    </dict>
</array>
```

::: tip Finding Your Reversed Client ID
The reversed client ID is provided in Google Cloud Console when you create the iOS OAuth client. It looks like: `com.googleusercontent.apps.123456789-abcdefg`
:::

### Android Configuration

The `google_sign_in` Flutter package handles Android configuration automatically. Ensure you have:

1. `google-services.json` in `android/app/` (if using Firebase)
2. SHA-1 fingerprint registered in Google Cloud Console

No manual AndroidManifest.xml changes are required.

## Step 4: Configure OAuth Consent Screen

1. Go to Google Cloud Console → **APIs & Services** → **OAuth consent screen**
2. Choose **External** user type (or Internal for organization apps)
3. Fill in required fields:
   - App name
   - User support email
   - Developer contact email
4. Add scopes: `email`, `profile`, `openid`
5. Add test users if app is in testing mode
6. Submit for verification (for production)

## Step 5: Testing the Integration

1. Run your app
2. Go to the login screen
3. Tap the Google Sign In button
4. Select a Google account
5. Verify that you're redirected back to your app

## Troubleshooting

### Common Issues

#### 1. Google Sign In button not showing

- Verify `ENABLE_GOOGLE_SIGN_IN=true` in your `.env` file
- Ensure both `GOOGLE_CLIENT_ID` and `GOOGLE_SERVER_CLIENT_ID` are set
- Restart the app completely (hot reload doesn't apply `.env` changes)

#### 2. "Sign In failed" or "ApiException: 10"

This usually means configuration mismatch:

- **iOS**: Verify the reversed client ID is in Info.plist URL schemes
- **Android**: Verify SHA-1 fingerprint matches your keystore
- Check that package name/bundle ID matches OAuth client configuration

#### 3. "DEVELOPER_ERROR" on Android

- SHA-1 fingerprint mismatch - regenerate and update in Google Cloud Console
- Package name mismatch between app and OAuth client
- Missing `google-services.json` file

#### 4. Sign In works but backend rejects token

- Ensure `GOOGLE_SERVER_CLIENT_ID` matches the Web client ID
- Backend must be configured to verify tokens with the same client ID

#### 5. "User cancelled sign-in"

- User tapped outside the account picker or pressed back
- This is expected behavior, not an error

### Getting Help

If you encounter any issues:

1. Check the [Google Sign-In Documentation](https://developers.google.com/identity/sign-in/android/start-integrating)
2. Review the [google_sign_in package documentation](https://pub.dev/packages/google_sign_in)
3. Check your app's logs for detailed error messages

## Security Considerations

1. Never commit your Google Client IDs to version control
2. Always use environment variables for sensitive data
3. Implement proper error handling and user feedback
4. Verify tokens on your backend before trusting them

## Additional Resources

- [Google Cloud Console](https://console.cloud.google.com)
- [Firebase Console](https://console.firebase.google.com)
- [Google Sign-In Documentation](https://developers.google.com/identity/sign-in/android/start-integrating)
- [google_sign_in Package](https://pub.dev/packages/google_sign_in)

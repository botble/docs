# Facebook Login Setup Guide for Mobile App

This guide will help you set up Facebook Login in your MartFury mobile app.

## Prerequisites

1. A Facebook Developer Account
2. A Facebook App created in the Meta for Developers portal
3. Basic knowledge of mobile app development

## Step 1: Create a Facebook App

1. Go to [Meta for Developers](https://developers.facebook.com)
2. Click **My Apps** → **Create App**
3. Select **Consumer** or **None** as app type
4. Enter your app name and contact email
5. Click **Create App**

## Step 2: Add Facebook Login Product

1. In your app dashboard, click **Add Product**
2. Find **Facebook Login** and click **Set Up**
3. Select **iOS** and **Android** platforms

## Step 3: Get Your Credentials

### App ID

1. Go to **Settings** → **Basic**
2. Copy the **App ID**

### Client Token

1. Go to **Settings** → **Advanced**
2. Scroll to **Security** section
3. Copy the **Client Token**

::: warning Client Token Required
The Client Token is different from the App Secret. Make sure you copy the **Client Token**, not the App Secret.
:::

## Step 4: Configure Platform Settings

### iOS Platform

1. In Meta for Developers, go to **Settings** → **Basic**
2. Scroll to **iOS** section (or click **Add Platform** → **iOS**)
3. Enter your **Bundle ID** (e.g., `com.yourcompany.martfury`)
4. Enable **Single Sign On**
5. Click **Save Changes**

### Android Platform

1. In the **Android** section (or click **Add Platform** → **Android**)
2. Enter your **Package Name** (e.g., `com.yourcompany.martfury`)
3. Enter **Class Name**: `com.yourcompany.martfury.MainActivity`
4. Add **Key Hashes**:
   ```bash
   # For debug keystore (Mac/Linux)
   keytool -exportcert -alias androiddebugkey -keystore ~/.android/debug.keystore | openssl sha1 -binary | openssl base64

   # For debug keystore (Windows)
   keytool -exportcert -alias androiddebugkey -keystore %USERPROFILE%\.android\debug.keystore | openssl sha1 -binary | openssl base64
   ```
5. Enable **Single Sign On**
6. Click **Save Changes**

::: tip Multiple Key Hashes
Add key hashes for both debug and release keystores. You may also need to add key hashes for Google Play App Signing if you use it.
:::

## Step 5: Configure Your Mobile App

### Environment Variables

Create or update your `.env` file:

```bash
# Facebook Sign-In credentials
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_CLIENT_TOKEN=your_facebook_client_token

# Enable Facebook Sign-In
ENABLE_FACEBOOK_SIGN_IN=true
```

### iOS Configuration

Update your `ios/Runner/Info.plist` with your Facebook credentials:

```xml
<!-- Facebook URL Scheme -->
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>fbYOUR_APP_ID</string>
        </array>
    </dict>
</array>

<!-- Facebook App Configuration -->
<key>FacebookAppID</key>
<string>YOUR_APP_ID</string>
<key>FacebookClientToken</key>
<string>YOUR_CLIENT_TOKEN</string>
<key>FacebookDisplayName</key>
<string>Your App Name</string>

<!-- Required for Facebook SDK -->
<key>LSApplicationQueriesSchemes</key>
<array>
    <string>fbapi</string>
    <string>fb-messenger-share-api</string>
</array>
```

**Replace the placeholders:**
- `fbYOUR_APP_ID` → `fb123456789` (prefix `fb` + your App ID)
- `YOUR_APP_ID` → Your Facebook App ID
- `YOUR_CLIENT_TOKEN` → Your Facebook Client Token
- `Your App Name` → Your app's display name

### Android Configuration

The `flutter_facebook_auth` package handles Android configuration automatically through the build system. No manual AndroidManifest.xml changes are required.

The package reads credentials from your Flutter configuration at build time.

## Step 6: Set App Mode

For testing, your app can be in **Development** mode. For production:

1. Go to **App Review** → **Permissions and Features**
2. Request necessary permissions (email is usually sufficient)
3. Complete the Data Use Checkup
4. Toggle your app from **Development** to **Live** mode

::: warning Development Mode Limitations
In Development mode, only users listed as **Testers**, **Developers**, or **Administrators** can log in. Add test users in **Roles** section.
:::

## Step 7: Testing the Integration

1. Run your app
2. Go to the login screen
3. Tap the Facebook Login button
4. Complete the Facebook authentication flow
5. Verify that you're redirected back to your app

## Troubleshooting

### Common Issues

#### 1. Facebook Login button not showing

- Verify `ENABLE_FACEBOOK_SIGN_IN=true` in your `.env` file
- Ensure both `FACEBOOK_APP_ID` and `FACEBOOK_CLIENT_TOKEN` are set
- Restart the app completely (hot reload doesn't apply `.env` changes)

#### 2. "Invalid key hash" error on Android

- Generate key hash using the command above
- Add it to your Facebook app's Android settings
- For Google Play App Signing, get the key hash from Play Console

#### 3. "App Not Setup" or "App in Development Mode"

- Your Facebook app is in Development mode
- Add your Facebook account as a Tester/Developer in the app's Roles section
- Or switch the app to Live mode (requires completing App Review)

#### 4. Login fails with "GraphRequest" error

- Check that Client Token is correct (not App Secret)
- Verify App ID matches between `.env` and Info.plist
- Ensure Facebook app has required permissions

#### 5. iOS: "Cannot open Facebook app"

- Verify `LSApplicationQueriesSchemes` is properly configured in Info.plist
- Check that the URL scheme `fbYOUR_APP_ID` is correct

#### 6. Login works but user data is incomplete

- Check permissions in your Facebook app settings
- Default permissions only include `public_profile`
- Request `email` permission if needed

### Getting Help

If you encounter any issues:

1. Check the [Facebook Login Documentation](https://developers.facebook.com/docs/facebook-login)
2. Review the [flutter_facebook_auth package documentation](https://pub.dev/packages/flutter_facebook_auth)
3. Check your app's logs for detailed error messages

## Security Considerations

1. Never commit your Facebook App ID and Client Token to version control
2. Always use environment variables for sensitive data
3. Implement proper error handling and user feedback
4. Never expose your App Secret in client-side code

## Additional Resources

- [Meta for Developers](https://developers.facebook.com)
- [Facebook Login Documentation](https://developers.facebook.com/docs/facebook-login)
- [flutter_facebook_auth Package](https://pub.dev/packages/flutter_facebook_auth)
- [Facebook Data Use Checkup](https://developers.facebook.com/docs/development/maintaining-data-access)

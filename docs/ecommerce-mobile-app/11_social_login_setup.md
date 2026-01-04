# Social Login Setup (Google, Apple, Facebook, Twitter)

This guide shows how to enable and configure social login providers in the Botble Ecommerce React Native app. Follow the steps to collect credentials, configure the project, and test the authentication flow.

## Prerequisites

- A working React Native Expo project connected to your Botble backend
- EAS CLI installed for development builds (`npm install -g eas-cli`)
- Access to developer portals:
  - [Google Cloud Console](https://console.cloud.google.com)
  - [Apple Developer](https://developer.apple.com/)
  - [Meta for Developers](https://developers.facebook.com/)
  - [Twitter Developer Portal](https://developer.twitter.com/)

::: warning Important
Social login requires **development builds** created via EAS. It does **not** work in Expo Go due to native SDK requirements.
:::

## Step 1: Collect Provider Credentials

### Google

1. Open the [Google Cloud Console](https://console.cloud.google.com) and select your project.
2. Enable **Google Identity Services / Google Sign-In**.
3. Navigate to **APIs & Services → Credentials**.
4. Create OAuth 2.0 Client IDs:
   - **Web application** - Copy the Client ID (used as `webClientId`)
   - **Android** (optional) - Add your package name and SHA-1 fingerprint
   - **iOS** (optional) - Add your bundle identifier
5. Download `google-services.json` for Android from Firebase Console (if using Firebase).

### Apple

1. Sign in to the [Apple Developer Portal](https://developer.apple.com).
2. Under **Certificates, Identifiers & Profiles**, select your App ID.
3. Enable **Sign in with Apple** capability.
4. Note: No additional configuration needed for managed Expo workflow - just enable in `app.config.ts`.

### Facebook

1. Log into [developers.facebook.com](https://developers.facebook.com).
2. Create or select an app, then add the **Facebook Login** product.
3. Under **Settings → Basic**, copy:
   - **App ID**
   - **Client Token** (Settings → Advanced)
4. Configure platforms:
   - **iOS**: Add Bundle ID `com.botble.ecommerce`
   - **Android**: Add Package `com.botble.ecommerce` + Key Hash

### Twitter (X)

1. In the [Twitter Developer Portal](https://developer.twitter.com), create a project/app.
2. Enable OAuth 2.0 (with PKCE) in User Authentication Settings.
3. Set callback URLs: `botble://twitter-auth`
4. Copy the **Client ID** (API Key) and **Client Secret** (API Secret Key).

## Step 2: Configure Environment Variables

Create or update your `.env` file with credentials:

```bash
# Google Sign-In
GOOGLE_WEB_CLIENT_ID=your-client-id.apps.googleusercontent.com

# Facebook Login
FACEBOOK_APP_ID=123456789
FACEBOOK_CLIENT_TOKEN=your-client-token

# Twitter/X Login
TWITTER_CONSUMER_KEY=your-consumer-key
TWITTER_CONSUMER_SECRET=your-consumer-secret

# Android (optional - for production builds)
GOOGLE_SERVICES_FILE=./google-services.json
```

::: tip
Apple Sign-In doesn't require additional environment variables - it's automatically enabled for iOS when the capability is set in `app.config.ts`.
:::

## Step 3: Configuration Files

### app.config.ts

The social auth plugins are **conditionally loaded** based on environment variables. If credentials are not set, the plugin is not loaded (preventing build errors).

```typescript
// Plugins are added conditionally:
// - Google: Added if GOOGLE_WEB_CLIENT_ID is set
// - Apple: Always added (no external config needed)
// - Facebook: Added if FACEBOOK_APP_ID is set

export default ({ config }: ConfigContext): ExpoConfig => ({
  // ...
  ios: {
    usesAppleSignIn: true,  // Enables Apple Sign-In capability
    bundleIdentifier: "com.botble.ecommerce",
  },
  android: {
    googleServicesFile: process.env.GOOGLE_SERVICES_FILE || "./google-services.json",
    package: "com.botble.ecommerce",
  },
  plugins: buildPlugins(),  // Dynamically built based on env vars
  extra: {
    appConfig: {
      auth: {
        googleWebClientId: process.env.GOOGLE_WEB_CLIENT_ID,
        googleEnabled: !!process.env.GOOGLE_WEB_CLIENT_ID,
        appleEnabled: true,
        facebookAppId: process.env.FACEBOOK_APP_ID,
        facebookEnabled: !!process.env.FACEBOOK_APP_ID,
        twitterConsumerKey: process.env.TWITTER_CONSUMER_KEY,
        twitterEnabled: !!process.env.TWITTER_CONSUMER_KEY,
      },
    },
  },
});
```

::: tip
You don't need to configure all providers. The app will only show login buttons for providers that have credentials set in `.env`.
:::

### Provider Visibility

Social login buttons are **automatically shown/hidden** based on configuration:

| Provider | Shown When |
|----------|------------|
| Google | `GOOGLE_WEB_CLIENT_ID` is set |
| Apple | iOS platform + `usesAppleSignIn: true` |
| Facebook | `FACEBOOK_APP_ID` is set |
| Twitter | `TWITTER_CONSUMER_KEY` is set |

## Step 4: Create Development Build

Social login requires a development build (not Expo Go):

```bash
# Login to EAS
eas login

# Build for iOS
eas build --profile development --platform ios

# Build for Android
eas build --profile development --platform android

# Or both
eas build --profile development --platform all
```

Download and install the development build on your device/simulator.

## Step 5: Testing

1. Start the development server:
   ```bash
   npm start
   ```

2. Open the app via your development build (not Expo Go).

3. Navigate to the Login screen.

4. Verify enabled providers appear as buttons.

5. Test each social login:
   - **Google**: Taps opens Google account picker → Select account → Redirects back to app
   - **Apple**: Taps shows Face ID/Touch ID prompt → Authorizes → Returns to app
   - **Facebook**: Opens Facebook login dialog → Authorize → Returns to app
   - **Twitter**: Opens browser for authorization → Approve → Redirects back to app

## Troubleshooting

### Provider button not showing

- Verify environment variable is set correctly
- Restart the development server after changing `.env`
- Ensure development build is installed (not Expo Go)

### Google Sign-In fails

- Verify `webClientId` is correct (Web application type, not Android/iOS)
- Check SHA-1 fingerprint is registered for Android
- Ensure Google Play Services is available on device

### Apple Sign-In not working

- Only works on iOS (hidden on Android automatically)
- Verify `usesAppleSignIn: true` in `app.config.ts`
- Rebuild the development build after enabling

### Facebook Login errors

- Check App ID and Client Token are correct
- Verify bundle ID/package name matches Facebook app settings
- For iOS: Ensure `useFrameworks: "static"` is set in expo-build-properties

### Twitter OAuth redirect issues

- Verify callback URL `botble://twitter-auth` is registered
- Ensure OAuth 2.0 with PKCE is enabled in Twitter settings
- Check API Key and Secret are from the correct app

### "Network Error" or API failures

- Verify your Botble backend has social login endpoints enabled
- Check API URL is correct in `.env`
- Ensure backend is configured to accept social auth tokens

## Security Best Practices

1. **Never commit credentials** - Keep `.env` out of version control
2. **Rotate secrets periodically** - Especially after team member departures
3. **Use HTTPS** - All API endpoints must use secure connections
4. **Restrict API keys** - Configure domain/app restrictions in provider consoles
5. **Monitor authentication logs** - Watch for unusual activity

## API Endpoints

The app communicates with these Botble backend endpoints:

| Provider | Endpoint | Method |
|----------|----------|--------|
| Google | `/api/v1/auth/google` | POST |
| Apple | `/api/v1/auth/apple` | POST |
| Facebook | `/api/v1/auth/facebook` | POST |
| Twitter | `/api/v1/auth/twitter` | POST |

Request body format:
```json
{
  "identityToken": "token-from-provider",  // or "accessToken" for Facebook/Twitter
  "guard": "customer"
}
```

## Reference Links

- **Google**: [Cloud Console](https://console.cloud.google.com) · [Sign-In Docs](https://developers.google.com/identity/sign-in/android/start-integrating)
- **Apple**: [Developer Portal](https://developer.apple.com/) · [Sign in with Apple](https://developer.apple.com/sign-in-with-apple/)
- **Facebook**: [Meta for Developers](https://developers.facebook.com/) · [Facebook Login](https://developers.facebook.com/docs/facebook-login)
- **Twitter**: [Developer Portal](https://developer.twitter.com/) · [OAuth 2.0](https://developer.twitter.com/en/docs/authentication/oauth-2-0)
- **Expo**: [Authentication Guide](https://docs.expo.dev/develop/authentication/)

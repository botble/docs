# Apple Sign In Setup Guide for Mobile App

This guide will help you set up Apple Sign In in your MartFury mobile app.

## Prerequisites

1. An Apple Developer Account ($99/year)
2. Access to your app's bundle identifier in Apple Developer Portal
3. Basic knowledge of mobile app development

::: tip iOS Only Feature
Apple Sign In is primarily for iOS. On Android, users can still sign in via web-based Apple authentication, but the native button is typically hidden.
:::

## Step 1: Configure Apple Developer Account

1. Go to [Apple Developer Portal](https://developer.apple.com)
2. Sign in with your Apple Developer account
3. Go to **Certificates, Identifiers & Profiles**
4. Select **Identifiers** → Select your app's identifier (or create one)
5. Enable **Sign In with Apple** capability
6. Click **Save**

### Create a Services ID (for web/Android fallback)

1. Go to **Identifiers** → Click **+** button
2. Select **Services IDs** → Click **Continue**
3. Enter a description and identifier (e.g., `com.yourcompany.app.service`)
4. Click **Continue** → **Register**
5. Click on the newly created Services ID
6. Enable **Sign In with Apple** checkbox
7. Click **Configure** next to Sign In with Apple
8. Add your website domain and return URLs
9. Click **Save**

## Step 2: Configure Your Mobile App

### Environment Variables

Create or update your `.env` file with the following variables:

```bash
# Apple Sign-In credentials
APPLE_SERVICE_ID=com.yourcompany.app.service
APPLE_TEAM_ID=YOUR_TEAM_ID

# Enable Apple Sign-In
ENABLE_APPLE_SIGN_IN=true
```

| Variable | Where to Find |
|----------|---------------|
| `APPLE_SERVICE_ID` | The Services ID you created (e.g., `com.yourcompany.app.service`) |
| `APPLE_TEAM_ID` | Apple Developer Portal → Membership → Team ID |

### iOS Configuration

For iOS, you need to add the Sign In with Apple capability in Xcode:

1. Open `ios/Runner.xcworkspace` in Xcode
2. Select the **Runner** target
3. Go to **Signing & Capabilities** tab
4. Click **+ Capability**
5. Add **Sign In with Apple**

::: note
The `sign_in_with_apple` Flutter package handles URL scheme registration automatically. You don't need to manually add URL schemes for Apple Sign In.
:::

### Android Configuration

The `sign_in_with_apple` package works on Android via web-based authentication. No additional AndroidManifest configuration is required - the package handles this automatically.

## Step 3: Testing the Integration

1. Run your app on an **iOS device or simulator**
2. Go to the login screen
3. Tap the Apple Sign In button
4. Complete the Apple authentication flow (Face ID/Touch ID)
5. Verify that you're redirected back to your app

::: warning Testing Limitations
- Apple Sign In works best on real iOS devices
- Simulator testing may have limitations
- First-time users will see email options (share/hide email)
:::

## Troubleshooting

### Common Issues

#### 1. Apple Sign In button not showing

- Verify `ENABLE_APPLE_SIGN_IN=true` in your `.env` file
- Ensure `APPLE_SERVICE_ID` and `APPLE_TEAM_ID` are set
- Restart the app completely (hot reload doesn't apply `.env` changes)
- On Android, the button may be hidden by design (Apple's guidelines)

#### 2. Sign In fails with "Invalid configuration"

- Verify Sign In with Apple capability is enabled in:
  - Apple Developer Portal (App ID)
  - Xcode (Signing & Capabilities)
- Check that your app's bundle ID matches the one in Apple Developer Portal
- Ensure your Apple Developer membership is active

#### 3. "Authorization failed" error

- User may have cancelled the sign-in
- Check that the Services ID is correctly configured
- Verify return URLs are properly set in Apple Developer Portal

#### 4. Works on iOS but fails on Android

- Ensure Services ID is configured with correct return URLs
- Check that your backend supports Apple's web-based authentication flow
- Verify your website domain is properly configured in Apple Developer Portal

### Getting Help

If you encounter any issues:

1. Check the [Apple Developer Documentation](https://developer.apple.com/sign-in-with-apple/)
2. Review the [sign_in_with_apple package documentation](https://pub.dev/packages/sign_in_with_apple)
3. Check your app's logs for detailed error messages

## Security Considerations

1. Never commit your Apple Developer credentials to version control
2. Always use environment variables for sensitive data
3. Implement proper error handling and user feedback
4. Apple Sign In provides privacy features (Hide My Email) - respect user choices

## Additional Resources

- [Apple Developer Portal](https://developer.apple.com)
- [Sign In with Apple Documentation](https://developer.apple.com/sign-in-with-apple/)
- [sign_in_with_apple Package](https://pub.dev/packages/sign_in_with_apple)
- [Human Interface Guidelines - Sign In with Apple](https://developer.apple.com/design/human-interface-guidelines/sign-in-with-apple)

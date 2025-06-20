# Apple Sign In Setup Guide for Mobile App

This guide will help you set up Apple Sign In in your MartFury mobile app.

## Prerequisites

1. An Apple Developer Account
2. Basic knowledge of mobile app development

## Step 1: Configure Apple Developer Account

1. Go to [Apple Developer Portal](https://developer.apple.com)
2. Sign in with your Apple Developer account
3. Go to "Certificates, Identifiers & Profiles"
4. Select your app's identifier
5. Enable "Sign In with Apple" capability

## Step 2: Configure Your Mobile App

### Environment Variables

Create or update your `.env` file with the following variables:

```bash
APPLE_SERVICE_ID=your_apple_service_id
APPLE_TEAM_ID=your_apple_team_id
APPLE_KEY_ID=your_apple_key_id
```

### iOS Configuration

The Apple Sign In configuration is already set up in your `Info.plist`. Make sure it contains:

```xml
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>signinwithapple</string>
        </array>
    </dict>
</array>
```

### Android Configuration

For Android, you need to add the following to your `AndroidManifest.xml`:

```xml
<activity
    android:name="com.aboutyou.dart_packages.sign_in_with_apple.SignInWithAppleCallback"
    android:exported="true">
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data android:scheme="signinwithapple" />
    </intent-filter>
</activity>
```

## Step 3: Testing the Integration

1. Run your app
2. Go to the login screen
3. Tap the Apple Sign In button
4. Complete the Apple authentication flow
5. Verify that you're redirected back to your app

## Troubleshooting

### Common Issues

1. **Sign In fails with "Invalid configuration"**
   - Verify that Sign In with Apple is enabled in your Apple Developer account
   - Check that your app's bundle ID matches the one in Apple Developer Portal
   - Ensure all required capabilities are enabled

2. **App crashes on Apple Sign In**
   - Verify that your Apple Developer credentials are correct
   - Check that all required configurations are in place
   - Ensure you have an active internet connection

### Getting Help

If you encounter any issues:

1. Check the [Apple Developer Documentation](https://developer.apple.com/sign-in-with-apple/)
2. Review the [sign_in_with_apple package documentation](https://pub.dev/packages/sign_in_with_apple)
3. Check your app's logs for detailed error messages

## Security Considerations

1. Never commit your Apple Developer credentials to version control
2. Always use environment variables for sensitive data
3. Implement proper error handling and user feedback

## Additional Resources

- [Apple Developer Portal](https://developer.apple.com)
- [Sign In with Apple Documentation](https://developer.apple.com/sign-in-with-apple/)
- [sign_in_with_apple Package](https://pub.dev/packages/sign_in_with_apple)

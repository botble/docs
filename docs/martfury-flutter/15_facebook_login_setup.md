# Facebook Login Setup Guide for Mobile App

This guide will help you set up Facebook Login in your MartFury mobile app.

## Prerequisites

1. A Facebook Developer Account
2. Basic knowledge of mobile app development

## Step 1: Configure Facebook Developer Account

1. Go to [Facebook Developers](https://developers.facebook.com)
2. Create a new app or select an existing one
3. Add Facebook Login product to your app
4. Configure the Facebook Login settings
5. Note down your App ID and App Secret

## Step 2: Configure Your Mobile App

### Environment Variables

Create or update your `.env` file with the following variables:

```bash
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_CLIENT_TOKEN=your_facebook_client_token
```

### iOS Configuration

The Facebook Login configuration is already set up in your `Info.plist`. Make sure it contains:

```xml
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>fbYOUR_APP_ID</string>
        </array>
    </dict>
</array>
<key>FacebookAppID</key>
<string>YOUR_APP_ID</string>
<key>FacebookClientToken</key>
<string>YOUR_CLIENT_TOKEN</string>
<key>FacebookDisplayName</key>
<string>MartFury</string>
<key>LSApplicationQueriesSchemes</key>
<array>
    <string>fbapi</string>
    <string>fb-messenger-share-api</string>
</array>
```

### Android Configuration

For Android, you need to add the following to your `AndroidManifest.xml`:

```xml
<activity
    android:name="com.facebook.FacebookActivity"
    android:configChanges="keyboard|keyboardHidden|screenLayout|screenSize|orientation"
    android:label="@string/app_name" />
<meta-data
    android:name="com.facebook.sdk.ApplicationId"
    android:value="@string/facebook_app_id" />
<meta-data
    android:name="com.facebook.sdk.ClientToken"
    android:value="@string/facebook_client_token" />
```

And in your app's `build.gradle`:

```groovy
defaultConfig {
    // ...
    manifestPlaceholders += [
        'facebookAppId': 'YOUR_APP_ID',
        'facebookClientToken': 'YOUR_CLIENT_TOKEN'
    ]
}
```

## Step 3: Testing the Integration

1. Run your app
2. Go to the login screen
3. Tap the Facebook Login button
4. Complete the Facebook authentication flow
5. Verify that you're redirected back to your app

## Troubleshooting

### Common Issues

1. **Login fails with "Invalid configuration"**
   - Verify that your Facebook App ID and Client Token are correct
   - Check that your app's bundle ID/package name matches the one in Facebook Developer Portal
   - Ensure Facebook Login is properly configured in the Facebook Developer Portal

2. **App crashes on Facebook Login**
   - Verify that your Facebook credentials are correct
   - Check that all required configurations are in place
   - Ensure you have an active internet connection

### Getting Help

If you encounter any issues:

1. Check the [Facebook Login Documentation](https://developers.facebook.com/docs/facebook-login)
2. Review the [flutter_facebook_auth package documentation](https://pub.dev/packages/flutter_facebook_auth)
3. Check your app's logs for detailed error messages

## Security Considerations

1. Never commit your Facebook App ID and Client Token to version control
2. Always use environment variables for sensitive data
3. Implement proper error handling and user feedback

## Additional Resources

- [Facebook Developers](https://developers.facebook.com)
- [Facebook Login Documentation](https://developers.facebook.com/docs/facebook-login)
- [flutter_facebook_auth Package](https://pub.dev/packages/flutter_facebook_auth)

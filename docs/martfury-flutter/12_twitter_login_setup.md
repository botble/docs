# Twitter (X) Login Setup Guide for Mobile App

This guide will help you set up Twitter (X) login in your MartFury mobile app.

## Prerequisites

1. A Twitter Developer Account
2. A Twitter App created in the Twitter Developer Portal
3. Basic knowledge of mobile app development

## Step 1: Create a Twitter Developer Account

1. Go to [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard)
2. Sign in with your Twitter account
3. Apply for a developer account if you haven't already

## Step 2: Create a Twitter App

1. In the Twitter Developer Portal, click "Create Project"
2. Fill in your project details
3. Select "Read and Write" permissions
4. Create an app within your project
5. Note down your API Key (Consumer Key) and API Secret Key (Consumer Secret)

## Step 3: Configure Twitter App Settings

1. Go to your app's settings in the Twitter Developer Portal
2. Navigate to "User authentication settings"
3. Enable "OAuth 2.0"
4. Add the following callback URL:
   ```
   martfury://twitter-auth
   ```
5. Save your changes

## Step 4: Configure Your Mobile App

### Environment Variables

Create or update your `.env` file with the following variables:

```bash
TWITTER_CONSUMER_KEY=your_twitter_consumer_key
TWITTER_CONSUMER_SECRET=your_twitter_consumer_secret
TWITTER_REDIRECT_URI=martfury://twitter-auth
```

Replace `your_twitter_consumer_key` and `your_twitter_consumer_secret` with your actual Twitter API credentials.

### iOS Configuration

The Twitter URL scheme is already configured in your `Info.plist`. Make sure it contains:

```xml
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>twitterkit-YOUR_TWITTER_API_KEY</string>
            <string>martfury</string>
        </array>
    </dict>
</array>
```

### Android Configuration

The Twitter configuration is already set up in your `AndroidManifest.xml`. Make sure it contains:

```xml
<activity
    android:name="com.twitter.sdk.android.core.identity.OAuthActivity"
    android:theme="@android:style/Theme.Translucent.NoTitleBar" />
<meta-data
    android:name="com.twitter.sdk.android.CONSUMER_KEY"
    android:value="@string/twitter_consumer_key" />
<meta-data
    android:name="com.twitter.sdk.android.CONSUMER_SECRET"
    android:value="@string/twitter_consumer_secret" />
```

And in your app's main activity:

```xml
<intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="martfury" />
</intent-filter>
```

## Step 5: Testing the Integration

1. Run your app
2. Go to the login screen
3. Tap the X (Twitter) login button
4. Complete the Twitter authentication flow
5. Verify that you're redirected back to your app

## Troubleshooting

### Common Issues

1. **Login fails with "Invalid callback URL"**
   - Verify that the callback URL in Twitter Developer Portal matches exactly: `martfury://twitter-auth`
   - Check that the URL scheme is properly configured in both iOS and Android

2. **App crashes on Twitter login**
   - Verify that your Twitter API credentials are correct
   - Check that all required configurations are in place
   - Ensure you have an active internet connection

### Getting Help

If you encounter any issues:

1. Check the [Twitter Developer Documentation](https://developer.twitter.com/en/docs)
2. Review the [twitter_login package documentation](https://pub.dev/packages/twitter_login)
3. Check your app's logs for detailed error messages

## Security Considerations

1. Never commit your Twitter API credentials to version control
2. Always use environment variables for sensitive data
3. Implement proper error handling and user feedback

## Additional Resources

- [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard)
- [Twitter OAuth 2.0 Documentation](https://developer.twitter.com/en/docs/authentication/oauth-2-0)
- [twitter_login Package](https://pub.dev/packages/twitter_login)

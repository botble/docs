# Social Login Configuration

This document explains how to configure which social login providers are enabled in the MartFury app.

## Overview

The app supports four social login providers:
- Apple Sign In
- Google Sign In
- Facebook Login
- Twitter/X Login

You can enable or disable each provider individually through environment variables.

## Configuration Options

### Enable/Disable Social Login Providers

Add the following variables to your `.env` file to control which social login providers are available:

```env
# Social Login Configuration
# Set to 'true' to enable, 'false' to disable each provider
ENABLE_APPLE_SIGN_IN=true
ENABLE_GOOGLE_SIGN_IN=true
ENABLE_FACEBOOK_SIGN_IN=true
ENABLE_TWITTER_SIGN_IN=true
```

### Default Values

If these variables are not set in your `.env` file, all providers are enabled by default:
- `ENABLE_APPLE_SIGN_IN` - defaults to `true`
- `ENABLE_GOOGLE_SIGN_IN` - defaults to `true`
- `ENABLE_FACEBOOK_SIGN_IN` - defaults to `true`
- `ENABLE_TWITTER_SIGN_IN` - defaults to `true`

## Configuration Examples

### Enable Only Google and Apple Sign In

```env
ENABLE_APPLE_SIGN_IN=true
ENABLE_GOOGLE_SIGN_IN=true
ENABLE_FACEBOOK_SIGN_IN=false
ENABLE_TWITTER_SIGN_IN=false
```

### Disable All Social Login

```env
ENABLE_APPLE_SIGN_IN=false
ENABLE_GOOGLE_SIGN_IN=false
ENABLE_FACEBOOK_SIGN_IN=false
ENABLE_TWITTER_SIGN_IN=false
```

### Enable Only Email/Password Login

```env
ENABLE_APPLE_SIGN_IN=false
ENABLE_GOOGLE_SIGN_IN=false
ENABLE_FACEBOOK_SIGN_IN=false
ENABLE_TWITTER_SIGN_IN=false
```

## UI Behavior

- When all social login providers are disabled, the "or continue with" section will be hidden completely
- When some providers are enabled, only those buttons will be displayed
- The spacing between buttons adjusts automatically based on which providers are enabled

## Provider-Specific Configuration

Each social login provider also requires its own configuration keys. Make sure to set up the appropriate keys for the providers you want to enable:

### Apple Sign In
- `APPLE_SERVICE_ID`
- `APPLE_TEAM_ID`

### Google Sign In
- `GOOGLE_CLIENT_ID`
- `GOOGLE_SERVER_CLIENT_ID`

### Facebook Login
- `FACEBOOK_APP_ID`
- `FACEBOOK_CLIENT_TOKEN`

### Twitter/X Login
- `TWITTER_CONSUMER_KEY`
- `TWITTER_CONSUMER_SECRET`
- `TWITTER_REDIRECT_URI`

## Implementation Details

The configuration is implemented in `lib/core/app_config.dart` and used in `lib/src/view/screen/sign_in_screen.dart`. The app checks these configuration values at runtime and conditionally renders the social login buttons.

## Testing

To test different configurations:

1. Update your `.env` file with the desired settings
2. Restart the app
3. Navigate to the sign-in screen
4. Verify that only the enabled providers are displayed

## Troubleshooting

- If no social login buttons appear, check that at least one provider is enabled
- If a specific provider button doesn't appear, verify that its enable flag is set to `true`
- Make sure your `.env` file is properly formatted (no spaces around the `=` sign)
- Restart the app after making changes to the `.env` file 
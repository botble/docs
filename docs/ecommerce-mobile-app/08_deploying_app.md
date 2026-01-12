# Deploying Your App

## Overview

This guide covers deploying your app to the Apple App Store and Google Play Store using Expo Application Services (EAS).

## Prerequisites

### Required Accounts

1. **Apple Developer Account** ($99/year)
   - [developer.apple.com](https://developer.apple.com)
   - Required for iOS App Store

2. **Google Play Developer Account** ($25 one-time)
   - [play.google.com/console](https://play.google.com/console)
   - Required for Google Play Store

3. **Expo Account** (free)
   - [expo.dev](https://expo.dev)
   - Create at: `npx expo register`

### Install EAS CLI

```bash
npm install -g eas-cli
```

### Login to Expo

```bash
eas login
```

## Initial Setup

### Step 1: Configure EAS

```bash
eas build:configure
```

This creates `eas.json` in your project:

```json
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {}
  },
  "submit": {
    "production": {}
  }
}
```

### Step 2: Update app.json

```json
{
  "expo": {
    "name": "Your Store Name",
    "slug": "your-store",
    "version": "1.0.0",
    "ios": {
      "bundleIdentifier": "com.yourcompany.yourstore",
      "buildNumber": "1"
    },
    "android": {
      "package": "com.yourcompany.yourstore",
      "versionCode": 1
    }
  }
}
```

## Building for iOS

### Build for App Store

```bash
eas build --platform ios --profile production
```

First time setup:
- EAS will ask to create Apple credentials
- Follow the prompts to authenticate

### Build for TestFlight (Preview)

```bash
eas build --platform ios --profile preview
```

### Submit to App Store

```bash
eas submit --platform ios
```

## Building for Android

### Build for Play Store

```bash
eas build --platform android --profile production
```

First time:
- Creates upload keystore (keep this safe!)
- Follow prompts for configuration

### Build APK (for testing)

Add to `eas.json`:

```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```

Then:
```bash
eas build --platform android --profile preview
```

### Submit to Play Store

```bash
eas submit --platform android
```

## Build Both Platforms

```bash
eas build --platform all --profile production
```

## Version Management

### Before Each Release

Update in `app.json`:

```json
{
  "expo": {
    "version": "1.1.0",
    "ios": {
      "buildNumber": "2"
    },
    "android": {
      "versionCode": 2
    }
  }
}
```

- **version**: User-visible version (1.0.0, 1.1.0, etc.)
- **buildNumber/versionCode**: Internal build number (increment each build)

## App Store Listings

### Required Assets

- **Screenshots**: Multiple sizes for different devices
- **App Icon**: 1024x1024 PNG
- **Description**: Short and long descriptions
- **Keywords**: Relevant search terms
- **Privacy Policy URL**: Required for both stores

### iOS App Store

1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Create new app
3. Fill in app information
4. Upload build from EAS
5. Submit for review

### Google Play Store

1. Go to [Google Play Console](https://play.google.com/console)
2. Create new app
3. Complete store listing
4. Upload AAB from EAS
5. Submit for review

## Environment Variables for Builds

### Using EAS Secrets

```bash
eas secret:create --name API_BASE_URL --value "https://mystore.com"
eas secret:create --name API_KEY --value "your-api-key"
eas secret:create --name APP_NAME --value "Your Store Name"
```

### In eas.json

```json
{
  "build": {
    "production": {
      "env": {
        "API_BASE_URL": "https://mystore.com",
        "API_KEY": "your-api-key",
        "APP_NAME": "Your Store Name"
      }
    }
  }
}
```

## Over-the-Air Updates

Update JavaScript without app store review:

```bash
eas update --branch production --message "Bug fixes"
```

Configure in `app.json`:

```json
{
  "expo": {
    "updates": {
      "url": "https://u.expo.dev/your-project-id"
    },
    "runtimeVersion": {
      "policy": "sdkVersion"
    }
  }
}
```

## Troubleshooting

### Build Failed

1. Check build logs on expo.dev
2. Verify app.json configuration
3. Ensure valid credentials

### Submission Rejected

Common reasons:
- Missing privacy policy
- Incomplete metadata
- Guideline violations
- Bug reports from review

### Credentials Issues

```bash
# Clear credentials and reconfigure
eas credentials
```

## Deployment Checklist

### Before Submission

- [ ] Test on real devices
- [ ] Verify all features work
- [ ] Check performance
- [ ] Review app size
- [ ] Update version numbers
- [ ] Prepare store listings
- [ ] Create screenshots
- [ ] Write descriptions
- [ ] Set up privacy policy

### After Submission

- [ ] Monitor review status
- [ ] Respond to reviewer questions
- [ ] Plan next updates

## Need Help?

- Check [EAS Documentation](https://docs.expo.dev/eas/)
- Read the [Troubleshooting Guide](troubleshooting.md)
- Contact support for assistance

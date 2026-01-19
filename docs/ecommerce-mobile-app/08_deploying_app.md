# Deploying Your App

## Overview

This guide covers deploying your app to the Apple App Store and Google Play Store using Expo Application Services (EAS).

::: tip Understanding Build Types
When you run `npx expo start`, you're running a **Development Build** that requires a local server connection. To test on your physical device without a computer, you need to build a **Production APK** (Android) or **IPA** (iOS). See the [Development Build vs Production Build](#development-build-vs-production-build) section below.
:::

## Development Build vs Production Build

### What is a "Development Build"?

When you see this screen on your device:

![Development Build Screen](./images/development-build-screen.png)

This means you installed a **development build**. Development builds:
- Require a local development server running (`npx expo start`)
- Need your computer and phone on the same network
- Are for developers to test code changes with hot reload
- Cannot work standalone - they always need the dev server

### What You Need: Production Build (APK/IPA)

To use the app without a development server (like a regular app), you need a **production build**:
- **Android**: APK file - can be installed directly on any Android device
- **iOS**: IPA file - requires TestFlight or App Store distribution

### Quick Comparison

| Feature | Development Build | Production Build (APK/IPA) |
|---------|-------------------|----------------------------|
| Needs dev server | Yes | No |
| Hot reload | Yes | No |
| Standalone use | No | Yes |
| For end users | No | Yes |
| Build location | Local machine | EAS cloud or local |

## Prerequisites

### Required Accounts

1. **Apple Developer Account** ($99/year) - *Optional for APK testing*
   - [developer.apple.com](https://developer.apple.com)
   - Required only for iOS App Store publishing

2. **Google Play Developer Account** ($25 one-time) - *Optional for APK testing*
   - [play.google.com/console](https://play.google.com/console)
   - Required only for Google Play Store publishing

3. **Expo Account** (free) - **Required for all builds**
   - [expo.dev](https://expo.dev)
   - Required to use EAS Build

## Setting Up EAS (Expo Application Services)

### Step 1: Create an Expo Account

1. Go to [expo.dev/signup](https://expo.dev/signup)
2. Choose one of these options:
   - **Sign up with Email**: Enter your email and create a password
   - **Sign up with GitHub**: Click "Continue with GitHub"
   - **Sign up with Google**: Click "Continue with Google"
3. Verify your email if required
4. Complete your profile

### Step 2: Install EAS CLI

Open your terminal and run:

```bash
npm install -g eas-cli
```

### Step 3: Login to EAS

```bash
eas login
```

You'll see a prompt like this:
```
Log in to EAS with email or username (exit and run eas login --help to see other login options)
? Email or username ›
```

**Enter your Expo account credentials:**
- Type your email or username and press Enter
- Type your password and press Enter

**Alternative login methods:**

```bash
# Login with SSO (Google/GitHub)
eas login --sso

# Check if you're already logged in
eas whoami
```

### Step 4: Verify Login

```bash
eas whoami
```

This should display your username if logged in successfully.

## Building APK for Android Testing

::: tip Quick Start for Android Testing
If you just want to test your app on an Android device without a development server, follow this section. No Google Play account needed!
:::

### Step 1: Configure EAS Build

Run this command in your project folder:

```bash
eas build:configure
```

This creates an `eas.json` file in your project and updates `app.json` with the project ID.

::: warning Verify projectId Location
After running `eas build:configure`, verify that the `projectId` is in the correct location in your `app.json`:

**Correct** - inside `expo.extra.eas`:
```json
{
  "expo": {
    "extra": {
      "eas": {
        "projectId": "your-project-id"
      }
    }
  }
}
```

**Incorrect** - directly under `expo.eas`:
```json
{
  "expo": {
    "eas": {
      "projectId": "your-project-id"
    }
  }
}
```

If the `projectId` is in the wrong location, you'll get `Cannot read properties of undefined (reading 'projectId')` error. See [Troubleshooting](troubleshooting.md#cannot-read-properties-of-undefined-reading-projectid) for details.
:::

### Step 2: Update eas.json for APK Build

Open `eas.json` and update it to include APK output:

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
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {}
  },
  "submit": {
    "production": {}
  }
}
```

### Step 3: Build the APK

```bash
eas build --platform android --profile preview
```

**What happens:**
1. EAS uploads your project to cloud servers
2. Build runs on Expo's servers (no local Android SDK needed!)
3. You'll see a progress bar and build URL
4. When complete, download link appears

### Step 4: Download and Install APK

1. Wait for build to complete (usually 10-15 minutes for first build)
2. Download the APK from the link in terminal or from [expo.dev](https://expo.dev) → Your Project → Builds
3. Transfer APK to your Android device (email, cloud drive, USB)
4. On Android device:
   - Open the APK file
   - Allow installation from unknown sources if prompted
   - Install and open the app

::: warning First Time Build
The first build takes longer as EAS sets up credentials. Subsequent builds are faster.
:::

### Troubleshooting APK Build

**"Not logged in" error:**
```bash
eas login
```

**"No project found" error:**
```bash
eas build:configure
```

**Build fails with credential error:**
```bash
eas credentials --platform android
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

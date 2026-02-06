# Complete Setup & Publishing Guide

A step-by-step guide covering everything from initial setup to publishing your app on Google Play Store and Apple App Store, and connecting it to your Botble e-commerce website so products display automatically.

## Table of Contents

[[toc]]

---

## Part 1: Prerequisites — What You Need Before Starting

### Accounts You Need

| Account | Cost | Required For | Sign Up |
|---------|------|-------------|---------|
| **Expo** | Free | Building the app | [expo.dev/signup](https://expo.dev/signup) |
| **Google Play Developer** | $25 one-time | Publishing on Android | [play.google.com/console](https://play.google.com/console) |
| **Apple Developer** | $99/year | Publishing on iOS | [developer.apple.com](https://developer.apple.com) |

::: tip Start with Google Play
If you're on a budget, start with Google Play ($25 one-time). Apple requires a yearly subscription ($99/year) and a Mac computer for iOS builds.
:::

### Software Requirements

| Software | Version | Download |
|----------|---------|----------|
| **Node.js** | 18 or higher | [nodejs.org](https://nodejs.org) |
| **npm** | Comes with Node.js | — |
| **Git** | Latest | [git-scm.com](https://git-scm.com) |
| **Code editor** | Any (VS Code recommended) | [code.visualstudio.com](https://code.visualstudio.com) |

### What You Need From Your Website

Before starting, make sure you have:

- ✅ A **Botble e-commerce website** up and running (e.g., `https://yourstore.com`)
- ✅ Products, categories, and brands already added to your website
- ✅ An **API key** from your Botble admin panel
- ✅ Your **Envato purchase code** (from CodeCanyon)
- ✅ Your **brand assets**: logo (1024x1024 PNG), app icon, brand colors

---

## Part 2: Getting the App Working (Step by Step)

### Step 1: Install Node.js

1. Go to [nodejs.org](https://nodejs.org)
2. Download the **LTS version** (18 or higher)
3. Run the installer and follow the prompts
4. Verify installation — open your terminal and run:

```bash
node --version
# Should show v18.x.x or higher

npm --version
# Should show 9.x.x or higher
```

### Step 2: Install Required Tools

```bash
# Install EAS CLI (for building & publishing to app stores)
npm install -g eas-cli
```

::: info Expo CLI
You do **not** need to install `expo-cli` globally. The project includes `@expo/cli` as a local dependency — all Expo commands run through npm scripts (e.g., `npm start`) or via `npx expo`.
:::

### Step 3: Get the App Source Code

1. Go to [CodeCanyon](https://codecanyon.net/downloads)
2. Find **"Botble Ecommerce Mobile App"** in your purchases
3. Click **Download** → **All files & documentation**
4. Extract the downloaded ZIP to a folder on your computer
5. Open terminal and navigate to the app folder:

```bash
cd path/to/ecommerce-mobile-app
```

### Step 4: Install Dependencies

```bash
npm install
```

::: warning If you see errors
Try with the legacy peer deps flag:
```bash
npm install --legacy-peer-deps
```
:::

### Step 5: Get Your API Key

1. Log in to your **Botble admin panel** (e.g., `https://yourstore.com/admin`)
2. Navigate to **Settings** → **General** or **API Settings**
3. Find or generate your **API Key**
4. Copy it — you'll need it in the next step

### Step 6: Configure the App

Open the `.env` file in the root of your project and update these values:

```env
# REQUIRED: Your website URL (no trailing slash, no /api/v1)
API_BASE_URL=https://yourstore.com

# REQUIRED: Your API key from Botble admin
API_KEY=your-api-key-here

# App name displayed to users
APP_NAME=Your Store Name

# Your Envato purchase code (for development license)
LICENSE_CODE=your-envato-purchase-code
```

::: danger Critical
- `API_BASE_URL` must be your **website URL** without `/api/v1` — the app adds this automatically
- Use `https://` (not `http://`) for production websites
- The `LICENSE_CODE` is only needed during development. See [License Activation](13_license_activation.md) for details
:::

### Step 7: Test the Connection

Before running the app, verify your API works:

```bash
# Test in terminal (replace with your URL)
curl https://yourstore.com/api/v1/ecommerce/products
```

You should see JSON data with your products. If you see an error, check:
- Is your website online?
- Is the URL correct?
- Is the API enabled on your Botble website?

### Step 8: Run the App

```bash
# Start the development server
npm start
```

You'll see a QR code in the terminal. Then choose how to test:

| Method | Command | Requirements |
|--------|---------|-------------|
| **Physical phone (recommended)** | Scan QR code with Expo Go app | Install [Expo Go](https://expo.dev/go) on your phone |
| **iOS Simulator via Expo Go** | `npm run ios:go` | Mac + Xcode installed |
| **Android Emulator via Expo Go** | `npm run android:go` | Android Studio installed |
| **Web browser** | `npm run web` | Any modern browser |

::: tip Easiest way to test
Install the **Expo Go** app on your phone ([iOS](https://apps.apple.com/app/expo-go/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)), then scan the QR code. Your phone and computer must be on the same Wi-Fi network.
:::

::: info `npm run ios` / `npm run android` vs `npm run ios:go` / `npm run android:go`
- `npm run ios` and `npm run android` run **native builds** (`expo run:ios` / `expo run:android`) — these require a full native development setup (Xcode for iOS, Android Studio + SDK for Android) and generate a development build on the simulator/emulator.
- `npm run ios:go` and `npm run android:go` launch the app using **Expo Go** — easier to get started, no native tooling required beyond the simulator/emulator.
- For beginners, **Expo Go** (via `npm start` + QR code) is the simplest option.
:::

### Step 9: Verify Everything Works

Test these features to make sure your app is connected properly:

- [ ] Products appear on the home screen
- [ ] Categories show your website's categories
- [ ] Search finds products from your website
- [ ] You can log in with an account from your website
- [ ] Adding items to cart works
- [ ] Wishlist saves products
- [ ] Checkout opens correctly

**If products appear, your app is connected to your website!** 🎉

---

## Part 3: How Products Automatically Display in the App

### How the Connection Works

The app connects to your Botble website through its **REST API**. Here's the flow:

```
Your Botble Website (yourstore.com)
        ↓
    REST API (/api/v1)
        ↓
    Mobile App fetches data
        ↓
    Products, categories, brands displayed
```

### What Syncs Automatically

Once configured, the app **automatically** pulls data from your website:

| Data | How It Syncs | API Endpoint |
|------|-------------|--------------|
| **Products** | Real-time on each visit | `/api/v1/ecommerce/products` |
| **Categories** | Real-time on each visit | `/api/v1/ecommerce/product-categories` |
| **Brands** | Real-time on each visit | `/api/v1/ecommerce/brands` |
| **Banners/Ads** | Real-time on each visit | `/api/v1/ads` |
| **Orders** | Real-time when customer views | `/api/v1/ecommerce/orders` |
| **Cart** | Real-time, synced with website | `/api/v1/ecommerce/cart` |
| **Wishlist** | Real-time, synced with website | `/api/v1/ecommerce/wishlist` |
| **User accounts** | Shared login with website | `/api/v1/login` |

### What This Means for You

- **Add a product on your website** → it appears in the mobile app automatically
- **Update a price on your website** → the app shows the new price immediately
- **Customer places an order in the app** → it appears in your website admin panel
- **No separate product management** — everything is managed from your Botble website admin panel

### Configuring What Appears on the Home Screen

You can customize the homepage content through environment variables in `.env`:

```env
# Show specific banners only (comma-separated ad keys from your admin panel)
AD_KEYS=banner-home-1,banner-home-2

# Product section layout: "slider" (horizontal) or "grid" (2-column)
PRODUCT_SECTION_LAYOUT=slider

# Products per section (default: 6)
PRODUCT_SECTION_NUMBER_OF_PRODUCTS=6

# Product image size: small, medium, large, thumb
PRODUCT_IMAGE_THUMBNAIL_SIZE=small
```

To find your ad keys: **Botble Admin** → **Ads** → **Ads** → note the "Key" column.

---

## Part 4: Customize Your App Before Publishing

Before publishing, customize the app with your branding. Each step takes 5-15 minutes:

| Step | Guide | What to Change |
|------|-------|---------------|
| 1 | [Theme Colors](01_theme_colors.md) | Brand colors throughout the app |
| 2 | [App Font](02_app_font.md) | Typography |
| 3 | [App Name](03_app_name.md) | Display name on home screen |
| 4 | [App Logo](04_app_logo.md) | App icon and splash screen |
| 5 | [Translations](06_translations.md) | Language settings |

### Update App Identifiers

This project uses `app.config.js` (a JavaScript-based Expo config, not `app.json`). Open `app.config.js` and update the bundle identifiers:

```js
// app.config.js
module.exports = ({ config }) => ({
  ...config,
  name: process.env.APP_NAME || "Your Store Name",
  slug: "your-store-name",
  // ...
  ios: {
    // ...
    bundleIdentifier: "com.yourcompany.yourstore",  // ← Change this
  },
  android: {
    // ...
    package: "com.yourcompany.yourstore",  // ← Change this
  },
});
```

The default values are `com.botble.ecommerce` — you **must** change these to your own unique identifiers before publishing.

::: warning Important
- `bundleIdentifier` (iOS) and `package` (Android) must be **unique** — they cannot be changed after publishing
- Use reverse domain format: `com.yourcompany.appname`
- Only use lowercase letters, numbers, and dots
:::

---

## Part 5: Publishing to Google Play Store

### Step 1: Create a Google Play Developer Account

1. Go to [play.google.com/console](https://play.google.com/console)
2. Sign in with your Google account
3. Pay the **$25 one-time registration fee**
4. Complete identity verification (may take 1-2 days)
5. Accept the Developer Distribution Agreement

### Step 2: Create Your App in Google Play Console

1. Open [Google Play Console](https://play.google.com/console)
2. Click **"Create app"**
3. Fill in:
   - **App name**: Your store name
   - **Default language**: Your primary language
   - **App or game**: App
   - **Free or paid**: Free (or Paid)
4. Accept the declarations and click **"Create app"**

### Step 3: Complete the Store Listing

Navigate to **Grow** → **Store presence** → **Main store listing** and fill in:

| Field | What to Write |
|-------|--------------|
| **App name** | Your store name (max 30 characters) |
| **Short description** | Brief tagline (max 80 characters) |
| **Full description** | Detailed description of your store (max 4000 characters) |
| **App icon** | 512×512 PNG |
| **Feature graphic** | 1024×500 PNG |
| **Phone screenshots** | At least 2 screenshots (recommended 4-8), min 320px, max 3840px |
| **Tablet screenshots** | Optional but recommended |

::: tip Writing a Good Description
Include: what your store sells, key features (easy browsing, secure checkout, order tracking), and a call to action. Use keywords your customers might search for.
:::

### Step 4: Complete Content Rating Questionnaire

1. Go to **Policy** → **App content** → **Content rating**
2. Click **"Start questionnaire"**
3. Select **IARC** and answer the questions (for a shopping app, most answers will be "No")
4. Submit — you'll get a rating like "Everyone" or "Rated for 3+"

### Step 5: Set Up Pricing & Distribution

1. Go to **Monetize** → **Products** → **App pricing**
2. Select **"Free"** (or set a price)
3. Select countries where your app should be available

### Step 6: Configure Data Safety

1. Go to **Policy** → **App content** → **Data safety**
2. Answer questions about what data your app collects:
   - **Personal info**: Name, email, address (for account & orders)
   - **Financial info**: Payment handled via web checkout (WebView)
   - **Location**: Not collected (unless you add location features)
3. Submit the form

### Step 7: Set Up EAS and Build for Android

```bash
# Login to Expo
eas login

# Configure EAS (first time only)
eas build:configure
```

### Step 8: Set Environment Variables for Production

::: danger Critical — Do This Before Building
Your `.env` file does **NOT** work in production builds. You must use EAS Secrets:
:::

```bash
# Set each required variable
eas secret:create --name API_BASE_URL --value "https://yourstore.com"
eas secret:create --name API_KEY --value "your-api-key"
eas secret:create --name APP_NAME --value "Your Store Name"
eas secret:create --name APP_ENV --value "production"
```

Or configure in `eas.json`:

```json
{
  "build": {
    "production": {
      "env": {
        "API_BASE_URL": "https://yourstore.com",
        "API_KEY": "your-api-key",
        "APP_NAME": "Your Store Name",
        "APP_ENV": "production"
      }
    }
  }
}
```

::: warning APP_ENV=production is required
Without this, your app will show a "License Required" dialog on startup. Setting `APP_ENV=production` disables the development-only license check.
:::

### Step 9: Build the Android App (AAB)

```bash
eas build --platform android --profile production
```

**What happens:**
1. Your code uploads to Expo's cloud servers
2. The build runs remotely (10-15 minutes first time)
3. When complete, you get a download link for the `.aab` file

::: tip Build Locally Instead
If you prefer building on your machine (requires Java JDK 17 + Android SDK):
```bash
npx expo prebuild --platform android --clean
cd android && ./gradlew bundleRelease
```
Output: `android/app/build/outputs/bundle/release/app-release.aab`

See [Deploying App - Local Build](08_deploying_app.md#option-1-local-apk-build-recommended) for full local build instructions.
:::

### Step 10: Upload to Google Play

1. Download the `.aab` file from the EAS build link
2. Go to **Google Play Console** → your app
3. Navigate to **Release** → **Production**
4. Click **"Create new release"**
5. Upload the `.aab` file
6. Add release notes (e.g., "Initial release - Mobile shopping app for [Your Store]")
7. Click **"Review release"**
8. Click **"Start rollout to Production"**

### Step 11: Submit for Review

Google reviews your app (typically takes **1-3 days** for new apps). You'll receive an email when:
- ✅ **Approved** — your app is live on Google Play!
- ❌ **Rejected** — review the feedback, fix issues, and resubmit

---

## Part 6: Publishing to Apple App Store

::: warning Requirements
- A **Mac computer** (required for iOS development and submission)
- **Apple Developer Account** ($99/year)
- **Xcode** installed (free from Mac App Store)
:::

### Step 1: Create an Apple Developer Account

1. Go to [developer.apple.com](https://developer.apple.com)
2. Click **"Account"** → **"Sign In"** or create an Apple ID
3. Enroll in the **Apple Developer Program** ($99/year)
4. Complete identity verification (may take 1-2 days for individuals, longer for organizations)

### Step 2: Create Your App in App Store Connect

1. Go to [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
2. Click **"My Apps"** → **"+"** → **"New App"**
3. Fill in:
   - **Platforms**: iOS
   - **Name**: Your store name
   - **Primary language**: Your language
   - **Bundle ID**: Select the one matching your `bundleIdentifier` (e.g., `com.yourcompany.yourstore`)
   - **SKU**: A unique identifier (e.g., `yourstore-ios-1`)
4. Click **"Create"**

::: tip Bundle ID
If your Bundle ID doesn't appear, you need to register it first:
1. Go to [developer.apple.com/account/resources/identifiers](https://developer.apple.com/account/resources/identifiers/list)
2. Click **"+"** → **"App IDs"** → **"App"**
3. Enter your Bundle ID (must match `bundleIdentifier` in `app.config.js`)
4. Click **"Register"**
:::

### Step 3: Complete the App Store Listing

In App Store Connect, go to your app and fill in:

| Field | Requirements |
|-------|-------------|
| **App name** | Max 30 characters |
| **Subtitle** | Max 30 characters |
| **Description** | Detailed description of your app |
| **Keywords** | Comma-separated, max 100 characters total |
| **Support URL** | Your support/contact page |
| **Privacy Policy URL** | **Required** — a URL to your privacy policy |
| **Screenshots** | Required for each device size (6.7", 6.5", 5.5" iPhones; iPad) |
| **App icon** | 1024×1024 PNG (no transparency, no rounded corners) |

::: warning Privacy Policy
Apple **requires** a privacy policy URL. Create one that covers:
- What data you collect (name, email, address for orders)
- How you use the data
- Third-party services used
- Contact information

You can host it as a page on your Botble website.
:::

### Step 4: Set App Privacy Details

In App Store Connect → **App Privacy**:

1. Click **"Get Started"**
2. Answer data collection questions:
   - **Contact Info**: Name, email, phone (for account registration and orders)
   - **Identifiers**: User ID
   - **Purchases**: Purchase history
3. For each data type, specify:
   - **Data use**: App functionality, product personalization
   - **Linked to identity**: Yes (tied to user account)

### Step 5: Build for iOS

Make sure your EAS Secrets are configured (same as Android step), then:

```bash
eas build --platform ios --profile production
```

**First time setup:**
- EAS will ask you to log in with your Apple Developer account
- It will create necessary certificates and provisioning profiles automatically
- Follow the prompts (usually just pressing Enter for defaults works)

The build takes about 15-30 minutes.

### Step 6: Submit to App Store

**Option A: Using EAS Submit (Recommended)**

```bash
eas submit --platform ios
```

This uploads your build directly to App Store Connect.

**Option B: Manual Upload**

1. Download the `.ipa` file from EAS
2. Open **Transporter** app on your Mac (free from Mac App Store)
3. Sign in with your Apple ID
4. Drag and drop the `.ipa` file
5. Click **"Deliver"**

### Step 7: Submit for Review in App Store Connect

1. Go to [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
2. Select your app
3. Under the latest version, select the build you uploaded
4. Fill in any remaining required fields
5. Under **"App Review Information"**, provide:
   - A demo account (login credentials for the reviewer)
   - Contact information
   - Notes for the reviewer (e.g., "This is an e-commerce app that connects to [yourstore.com]")
6. Click **"Add for Review"**
7. Click **"Submit to App Review"**

### Step 8: Wait for Apple Review

Apple reviews typically take **1-3 days** (sometimes up to 7 days for new apps). You'll receive an email when:
- ✅ **Approved** — your app is live on the App Store!
- ❌ **Rejected** — read the detailed feedback, fix issues, rebuild, and resubmit

::: tip Common Rejection Reasons
- Missing privacy policy
- App crashes during review
- Login doesn't work (provide demo credentials!)
- In-app purchase issues (checkout must work properly)
- Incomplete metadata/screenshots
- Content not appropriate for stated age rating
:::

---

## Part 7: Post-Launch Checklist

### After Publishing

- [ ] Download your app from the store and test it on a real device
- [ ] Verify products load correctly
- [ ] Test the full purchase flow (browse → cart → checkout)
- [ ] Verify login works for existing website customers
- [ ] Check push notifications (if enabled)
- [ ] Share the store link with customers

### Updating Your App

When you make changes and need to publish an update:

1. **Version numbers auto-increment** — this project's `eas.json` has `"autoIncrement": true` and `"appVersionSource": "remote"` configured for the production profile. EAS automatically increments `buildNumber` (iOS) and `versionCode` (Android) on each build. You only need to manually update the user-visible `version` in `app.config.js` (via `APP_VERSION` env variable) when releasing a new major/minor version.

2. **Build new versions:**
   ```bash
   eas build --platform all --profile production
   ```

3. **Submit updates:**
   ```bash
   eas submit --platform ios
   eas submit --platform android
   ```

### Over-the-Air Updates (Skip Store Review)

For JavaScript-only changes (no native code changes), push updates instantly:

```bash
eas update --branch production --message "Fix: updated product display"
```

This updates the app without going through store review.

---

## Quick Reference: Complete Workflow Summary

Here's the entire process at a glance:

```
1. PREPARE
   ├── Install Node.js + EAS CLI
   ├── Get source code from CodeCanyon
   ├── npm install
   └── Configure .env (API_BASE_URL, API_KEY)

2. TEST LOCALLY
   ├── npm start
   ├── Scan QR code with Expo Go
   └── Verify products appear

3. CUSTOMIZE
   ├── Theme colors, logo, app name
   ├── Set bundle identifier in app.config.js
   └── Update app.config.js

4. BUILD
   ├── eas login
   ├── eas build:configure
   ├── Set EAS Secrets (API_BASE_URL, API_KEY, APP_ENV=production)
   ├── eas build --platform android --profile production
   └── eas build --platform ios --profile production

5. PUBLISH
   ├── Google Play: Upload AAB → Create release → Submit
   └── App Store: eas submit → Configure listing → Submit for review

6. MAINTAIN
   ├── Build numbers auto-increment; update APP_VERSION for new releases
   ├── Use eas update for quick JS fixes
   └── Rebuild for native changes
```

---

## Frequently Asked Questions

### Do I need to manually add products to the app?

**No.** The app pulls all products automatically from your Botble website via API. Just manage products on your website — the app displays them in real-time.

### Can customers who registered on my website log in to the app?

**Yes.** The app shares the same user database. Customers use the same email/password on both your website and the mobile app.

### Do I need a Mac to publish on both stores?

- **Google Play**: No — you can build and submit from any OS using EAS cloud builds
- **Apple App Store**: Technically no for building (EAS builds in the cloud), but you'll need Apple Developer account and some steps are easier on a Mac

### How long does app review take?

- **Google Play**: 1-3 days (new apps may take up to 7 days)
- **Apple App Store**: 1-3 days (new apps may take up to 7 days)

### My app shows a blank/white screen after building

This usually means environment variables weren't set. Make sure you configured EAS Secrets or `eas.json` env before building. See [Environment Variables (Critical)](08_deploying_app.md#environment-variables-critical).

### My app shows "License Required" dialog

Set `APP_ENV=production` in your `eas.json` or EAS Secrets. See [License Activation](13_license_activation.md#license-required-alert-in-productionrelease-apk).

### Can I build an APK for testing before publishing?

Yes! First, add APK output to your `eas.json` preview profile:

```json
{
  "build": {
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```

Then build:
```bash
eas build --platform android --profile preview
```
This creates an APK you can install directly on any Android device. No Google Play account needed for testing.

::: tip
The default preview profile produces an AAB (Android App Bundle), which can only be installed via the Play Store. Adding `"buildType": "apk"` makes it output a directly-installable APK file instead.
:::

---

## Need Help?

- **API Documentation**: [ecommerce-api.botble.com/docs](https://ecommerce-api.botble.com/docs)
- **EAS Documentation**: [docs.expo.dev/eas](https://docs.expo.dev/eas/)
- **Troubleshooting**: [Troubleshooting Guide](troubleshooting.md)
- **FAQ**: [Frequently Asked Questions](faq.md)
- **Support**: [Support & Contact](support.md)

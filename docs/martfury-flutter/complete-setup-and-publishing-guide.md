# Complete Setup & Publishing Guide

A step-by-step guide covering everything from initial setup to publishing your MartFury Flutter app on Google Play Store and Apple App Store, and connecting it to your Botble e-commerce website so products display automatically.

## Table of Contents

[[toc]]

---

## Part 1: Prerequisites — What You Need Before Starting

### Accounts You Need

| Account | Cost | Required For | Sign Up |
|---------|------|-------------|---------|
| **Google Play Developer** | $25 one-time | Publishing on Android | [play.google.com/console](https://play.google.com/console) |
| **Apple Developer** | $99/year | Publishing on iOS | [developer.apple.com](https://developer.apple.com) |

::: tip Start with Google Play
If you're on a budget, start with Google Play ($25 one-time). Apple requires a yearly subscription ($99/year) and a Mac computer for iOS builds.
:::

### Software Requirements

| Software | Version | Download |
|----------|---------|----------|
| **Flutter SDK** | 3.7.2 or higher | [flutter.dev](https://flutter.dev/docs/get-started/install) |
| **Dart SDK** | 3.7.2 or higher | Included with Flutter |
| **Android Studio** | Latest | [developer.android.com/studio](https://developer.android.com/studio) |
| **Xcode** (Mac only) | Latest | Mac App Store |
| **VS Code** (optional) | Latest | [code.visualstudio.com](https://code.visualstudio.com) |

### What You Need From Your Website

Before starting, make sure you have:

- A **Botble e-commerce website** up and running (e.g., `https://yourstore.com`)
- Products, categories, and brands already added to your website
- An **API key** from your Botble admin panel (if required by your backend)
- Your **Envato purchase code** (from CodeCanyon)
- Your **brand assets**: logo (1024x1024 PNG), app icon, brand colors

---

## Part 2: Getting the App Working (Step by Step)

### Step 1: Install Flutter SDK

1. Go to [flutter.dev/docs/get-started/install](https://flutter.dev/docs/get-started/install)
2. Follow the installation guide for your operating system (Windows, Mac, or Linux)
3. After installation, verify everything is working:

```bash
flutter doctor
```

You should see checkmarks for Flutter, Android toolchain, and (on Mac) Xcode. Fix any issues `flutter doctor` reports before continuing.

::: tip
`flutter doctor` tells you exactly what's missing. Follow its instructions to resolve each issue.
:::

### Step 2: Get the App Source Code

1. Go to [CodeCanyon](https://codecanyon.net/downloads)
2. Find **"MartFury Flutter"** in your purchases
3. Click **Download** → **All files & documentation**
4. Extract the downloaded ZIP to a folder on your computer
5. Open terminal and navigate to the app folder:

```bash
cd path/to/martfury-flutter
```

### Step 3: Install Dependencies

```bash
flutter pub get
```

### Step 4: Enable API on Your Website

Before configuring the app, you must enable the API on your Botble website:

1. Log in to your **Botble admin panel** (e.g., `https://yourstore.com/admin`)
2. Navigate to **Settings** → **API Settings**
3. **Enable the API** — make sure the API toggle/checkbox is turned **ON**
4. Find or generate your **API Key**
5. Copy it — you'll need it in the next step

::: warning Important
The API is **disabled by default** in Botble. You **must** enable it in **Admin → Settings → API Settings** before the mobile app can connect to your website. Without this, all API requests will fail.
:::

### Step 5: Configure Environment

Copy the example env file and update it with your settings:

```bash
cp .env.example .env
```

Open the `.env` file and update these required values:

```env
# REQUIRED: Your website URL (the app appends /api/v1 endpoints to this)
API_BASE_URL=https://yourstore.com

# API authentication key (if your backend requires it)
API_KEY=your-api-key-here

# App display name
APP_NAME=Your Store Name

# Your Envato purchase code (for development license)
LICENSE_CODE=your-envato-purchase-code
```

::: danger Critical
- `API_BASE_URL` must be your **website URL** — the app builds full API paths like `{API_BASE_URL}/api/v1/ecommerce/products`
- Use `https://` (not `http://`) for production websites
- The `LICENSE_CODE` is only needed during development — production builds skip license validation. See the [Installation Guide](installation.md) for details.
:::

### Step 6: Test the Connection

Before running the app, verify your API works:

```bash
# Test in terminal (replace with your URL)
curl https://yourstore.com/api/v1/ecommerce/products
```

You should see JSON data with your products. If you see an error, check:
- Is your website online?
- Is the URL correct?
- Is the API enabled on your Botble website?

### Step 7: Run the App

```bash
# Run on connected device or emulator
flutter run
```

Or target a specific platform:

| Method | Command | Requirements |
|--------|---------|-------------|
| **Android Emulator** | `flutter run` (with emulator running) | Android Studio + emulator configured |
| **iOS Simulator** | `flutter run` (with simulator running) | Mac + Xcode installed |
| **Specific device** | `flutter run -d <device_id>` | Run `flutter devices` to list |
| **Chrome (debug)** | `flutter run -d chrome` | Chrome browser |

::: tip Easiest way to test
1. Open Android Studio → Device Manager → Start an emulator
2. Run `flutter run`
3. The app will automatically install and launch on the emulator
:::

### Step 8: Verify Everything Works

Test these features to make sure your app is connected properly:

- [ ] Products appear on the home screen
- [ ] Categories show your website's categories
- [ ] Search finds products from your website
- [ ] You can log in with an account from your website
- [ ] Adding items to cart works
- [ ] Wishlist saves products
- [ ] Checkout opens correctly

**If products appear, your app is connected to your website!**

---

## Part 3: How Products Automatically Display in the App

### How the Connection Works

The app connects to your Botble website through its **REST API**. Here's the flow:

```
Your Botble Website (yourstore.com)
        ↓
    REST API (/api/v1)
        ↓
    MartFury Flutter App fetches data
        ↓
    Products, categories, brands displayed
```

The base URL you set in `.env` (`API_BASE_URL`) is used directly by the app's `BaseService` class (`lib/src/service/base_service.dart`). All API calls prepend this URL — for example, product listing calls `{API_BASE_URL}/api/v1/ecommerce/products`.

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
| **Registration** | Shared with website | `/api/v1/register` |
| **Addresses** | Synced with website | `/api/v1/ecommerce/addresses` |
| **Countries** | Fetched from website | `/api/v1/ecommerce/countries` |
| **Currencies** | Fetched from website | `/api/v1/ecommerce/currencies` |
| **Languages** | Fetched from website | `/api/v1/languages` |

### What This Means for You

- **Add a product on your website** → it appears in the mobile app automatically
- **Update a price on your website** → the app shows the new price immediately
- **Customer places an order in the app** → it appears in your website admin panel
- **No separate product management** — everything is managed from your Botble website admin panel

### Configuring What Appears on the Home Screen

You can customize the homepage content through environment variables in `.env`:

```env
# Show specific banners only (comma-separated ad keys from your admin panel)
AD_KEYS=Q9YDUIC9HSWS,NBDWRXTSVZ8N,VC2C8Q1UGCBG

# Products per category on homepage (default: 10)
HOMEPAGE_PRODUCTS_PER_CATEGORY=10

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
| 3 | [Ad Keys](03_ad_keys.md) | Homepage banners |
| 4 | [App Name](04_app_name.md) | Display name on home screen |
| 5 | [App Logo](05_app_logo.md) | App icon and splash screen |
| 6 | [Translations](07_translations.md) | Language settings |

### Update App Identifiers

You **must** change the default package identifiers before publishing. The defaults are `com.example.martfury` — these must be unique to your app.

**Android** — edit `android/app/build.gradle.kts`:

```kotlin
android {
    namespace = "com.yourcompany.yourstore"    // ← Change this
    defaultConfig {
        applicationId = "com.yourcompany.yourstore"  // ← Change this
    }
}
```

**iOS** — open `ios/Runner.xcodeproj` in Xcode:
1. Select the **Runner** target
2. Go to **General** → **Identity**
3. Change **Bundle Identifier** to `com.yourcompany.yourstore`

Or edit `ios/Runner.xcodeproj/project.pbxproj` and replace all instances of `com.example.martfury` with your identifier.

::: warning Important
- `applicationId` (Android) and `Bundle Identifier` (iOS) must be **unique** — they cannot be changed after publishing
- Use reverse domain format: `com.yourcompany.appname`
- Only use lowercase letters, numbers, and dots
:::

### Update Version Numbers

Edit `pubspec.yaml`:

```yaml
version: 1.0.0+1
# Format: {version_name}+{build_number}
# version_name: shown to users (1.0.0, 1.1.0, etc.)
# build_number: internal number, must increment each release
```

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

### Step 7: Generate a Signing Keystore

Create a keystore for signing your release builds:

```bash
keytool -genkey -v \
    -keystore ~/upload-keystore.jks \
    -keyalg RSA \
    -keysize 2048 \
    -validity 10000 \
    -alias upload
```

You'll be prompted to set a password and enter your details.

::: warning Keep Your Keystore Safe!
Store your keystore file (`upload-keystore.jks`) and passwords securely. **If you lose your keystore, you cannot publish updates to the same app on the Play Store.** Back it up in multiple locations.
:::

### Step 8: Configure Signing

Create the file `android/key.properties`:

```properties
storePassword=your_keystore_password
keyPassword=your_key_password
keyAlias=upload
storeFile=/path/to/upload-keystore.jks
```

::: danger Never Commit key.properties to Git
The file is already in `.gitignore` by default. Never remove it from `.gitignore`.
:::

Next, update `android/app/build.gradle.kts` to use this keystore for release builds. Replace the existing `buildTypes` block:

```kotlin
import java.util.Properties
import java.io.FileInputStream

// Add at the top of the android {} block, before defaultConfig:
val keystoreProperties = Properties()
val keystorePropertiesFile = rootProject.file("key.properties")
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(FileInputStream(keystorePropertiesFile))
}

android {
    // ... existing config ...

    signingConfigs {
        create("release") {
            keyAlias = keystoreProperties["keyAlias"] as String?
            keyPassword = keystoreProperties["keyPassword"] as String?
            storeFile = keystoreProperties["storeFile"]?.let { file(it) }
            storePassword = keystoreProperties["storePassword"] as String?
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            isShrinkResources = false
            signingConfig = signingConfigs.getByName("release")  // ← Change from "debug" to "release"
        }
    }
}
```

::: warning This step is required
By default, the release build uses debug signing (`signingConfigs.getByName("debug")`). You must change it to use your release keystore before publishing to Google Play.
:::

### Step 9: Build for Production

Make sure your `.env` file has `APP_ENV=production` set:

```env
APP_ENV=production
```

::: warning APP_ENV=production is required
Without this, your app will show a "License Required" dialog on startup. Setting `APP_ENV=production` disables the development-only license check.
:::

**Build an APK (for testing):**

```bash
flutter build apk --release
```

Output: `build/app/outputs/flutter-apk/app-release.apk`

**Build an AAB (for Google Play — required):**

```bash
flutter build appbundle --release
```

Output: `build/app/outputs/bundle/release/app-release.aab`

::: tip APK vs AAB
| Format | Use Case |
|--------|----------|
| APK | Direct device installation, testing, distribution outside Play Store |
| AAB | Google Play Store submission (required since August 2021) |
:::

### Step 10: Upload to Google Play

1. Download or locate the `.aab` file
2. Go to **Google Play Console** → your app
3. Navigate to **Release** → **Production**
4. Click **"Create new release"**
5. Upload the `.aab` file
6. Add release notes (e.g., "Initial release - Mobile shopping app for [Your Store]")
7. Click **"Review release"**
8. Click **"Start rollout to Production"**

### Step 11: Submit for Review

Google reviews your app (typically takes **1-3 days** for new apps). You'll receive an email when:
- **Approved** — your app is live on Google Play!
- **Rejected** — review the feedback, fix issues, and resubmit

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
   - **Bundle ID**: Select the one matching your Bundle Identifier (e.g., `com.yourcompany.yourstore`)
   - **SKU**: A unique identifier (e.g., `yourstore-ios-1`)
4. Click **"Create"**

::: tip Bundle ID
If your Bundle ID doesn't appear, you need to register it first:
1. Go to [developer.apple.com/account/resources/identifiers](https://developer.apple.com/account/resources/identifiers/list)
2. Click **"+"** → **"App IDs"** → **"App"**
3. Enter your Bundle ID (must match Bundle Identifier in Xcode)
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

### Step 5: Configure Xcode Signing

1. Open `ios/Runner.xcworkspace` in Xcode
2. Select the **Runner** target
3. Go to **Signing & Capabilities**
4. Select your **Team** (your Apple Developer account)
5. Ensure **Automatically manage signing** is checked
6. Verify Bundle Identifier matches your registered App ID

### Step 6: Build for iOS

Make sure your `.env` file has `APP_ENV=production`:

```bash
flutter build ios --release
```

### Step 7: Archive and Upload

1. Open `ios/Runner.xcworkspace` in Xcode
2. Select **Product** → **Archive**
3. Wait for the archive to complete
4. In the **Organizer** window, select your archive
5. Click **"Distribute App"**
6. Select **"App Store Connect"**
7. Follow the prompts to upload

**Alternative: Use command line**

```bash
# Build the IPA
flutter build ipa --release

# The IPA will be at: build/ios/ipa/martfury.ipa
```

Then upload using **Transporter** app (free from Mac App Store) or `xcrun altool`.

### Step 8: Submit for Review in App Store Connect

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

### Step 9: Wait for Apple Review

Apple reviews typically take **1-3 days** (sometimes up to 7 days for new apps). You'll receive an email when:
- **Approved** — your app is live on the App Store!
- **Rejected** — read the detailed feedback, fix issues, rebuild, and resubmit

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
- [ ] Check push notifications (if enabled via [FCM Setup](fcm_setup.md))
- [ ] Share the store link with customers

### Updating Your App

When you make changes and need to publish an update:

1. **Update version numbers** in `pubspec.yaml`:
   ```yaml
   version: 1.1.0+2
   # Increment build_number (+2, +3...) for every release
   # Update version_name (1.1.0) for user-visible changes
   ```

2. **Rebuild:**
   ```bash
   # Android
   flutter build appbundle --release

   # iOS
   flutter build ios --release
   ```

3. **Upload and submit** via Google Play Console / App Store Connect (same steps as initial release)

---

## Quick Reference: Complete Workflow Summary

Here's the entire process at a glance:

```
1. PREPARE
   ├── Install Flutter SDK (flutter doctor)
   ├── Get source code from CodeCanyon
   ├── flutter pub get
   └── Configure .env (API_BASE_URL, API_KEY, APP_ENV)

2. TEST LOCALLY
   ├── flutter run
   └── Verify products, login, cart work

3. CUSTOMIZE
   ├── Theme colors, logo, app name
   ├── Change applicationId / Bundle Identifier
   └── Update version in pubspec.yaml

4. BUILD
   ├── Set APP_ENV=production in .env
   ├── Android: flutter build appbundle --release
   └── iOS: flutter build ios --release (Mac only)

5. PUBLISH
   ├── Google Play: Upload AAB → Create release → Submit
   └── App Store: Archive in Xcode → Upload → Submit for review

6. MAINTAIN
   ├── Increment version in pubspec.yaml
   ├── Rebuild and resubmit for updates
   └── Test on real devices before each release
```

---

## Frequently Asked Questions

### Do I need to manually add products to the app?

**No.** The app pulls all products automatically from your Botble website via API. Just manage products on your website — the app displays them in real-time.

### Can customers who registered on my website log in to the app?

**Yes.** The app shares the same user database. Customers use the same email/password on both your website and the mobile app.

### What's the difference between this Flutter app and the React Native app?

| Feature | MartFury Flutter | Botble Ecommerce React Native |
|---------|-----------------|-------------------------------|
| Framework | Flutter (Dart) | React Native (Expo, TypeScript) |
| State Management | GetX | React Query + Context API |
| Build System | Native (`flutter build`) | EAS Build (cloud) or local |
| Styling | Flutter Widgets + Theme | NativeWind (Tailwind CSS) |
| Configuration | `.env` file (bundled) | `.env` + EAS Secrets |

Both apps connect to the same Botble backend API.

### Do I need a Mac to publish on both stores?

- **Google Play**: No — you can build Android on any OS
- **Apple App Store**: **Yes** — you need a Mac with Xcode to build and archive iOS apps

### How long does app review take?

- **Google Play**: 1-3 days (new apps may take up to 7 days)
- **Apple App Store**: 1-3 days (new apps may take up to 7 days)

### My app shows a blank/white screen after building

Check that your `.env` file is bundled with the app. Flutter loads it from the assets — verify `pubspec.yaml` includes:
```yaml
flutter:
  assets:
    - .env
```

Also check that `API_BASE_URL` is correctly set in `.env`.

### My app shows "License Required" dialog

Set `APP_ENV=production` in your `.env` file before building the release. The license check only runs in development mode.

### Can I build an APK for testing before publishing?

Yes! Build a release APK directly:
```bash
flutter build apk --release
```
Output: `build/app/outputs/flutter-apk/app-release.apk`

Transfer it to any Android device (email, USB, cloud drive) and install directly. No Google Play account needed for testing.

---

## Need Help?

- **API Documentation**: [ecommerce-api.botble.com/docs](https://ecommerce-api.botble.com/docs)
- **Flutter Documentation**: [flutter.dev/docs](https://flutter.dev/docs)
- **Troubleshooting**: [Troubleshooting Guide](troubleshooting.md)
- **FAQ**: [Frequently Asked Questions](faq.md)
- **Support**: [Support & Contact](support.md)

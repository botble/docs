# Complete Setup & Publishing Guide

A step-by-step guide covering everything from initial setup to publishing your Flex Home React Native (Expo) app on the Apple App Store and Google Play Store, and connecting it to your Botble real-estate website so properties and inquiries sync automatically.

## Table of Contents

[[toc]]

---

## Part 1: Prerequisites

### Accounts You Need

| Account | Cost | Required For | Sign Up |
|---|---|---|---|
| **Apple Developer** | $99/year | Publishing on iOS | [developer.apple.com](https://developer.apple.com) |
| **Google Play Developer** | $25 one-time | Publishing on Android | [play.google.com/console](https://play.google.com/console) |
| **Expo account** | Free | EAS cloud builds & submissions | [expo.dev](https://expo.dev) |

::: tip Start with Google Play
If you're on a budget, start with Google Play ($25 one-time). Apple requires a yearly subscription ($99/year), and building/submitting iOS is easiest with EAS.
:::

### Software Requirements

| Software | Version | Download |
|---|---|---|
| **Node.js** | LTS (18+) | [nodejs.org](https://nodejs.org) |
| **Xcode** (Mac only) | Latest | Mac App Store |
| **Android Studio** | Latest | [developer.android.com/studio](https://developer.android.com/studio) |
| **EAS CLI** | Latest | `npm i -g eas-cli` |
| **Watchman** (optional, Mac) | Latest | `brew install watchman` |

### What You Need From Your Website

- A **Botble real-estate website** up and running (e.g. `https://yoursite.com`) with the **real-estate** plugin
- Properties, agents, and content already added in admin
- The **API enabled** in your Botble admin at **Settings → API**
- An **API key** if you configured one in admin (sent as the `X-API-KEY` header; note this is **not** your Envato purchase code)
- Your **Envato purchase code** (from CodeCanyon; used only for the development license check)
- Your **brand assets**: app icon (1024×1024 PNG), splash icon, adaptive icon, brand colors

---

## Part 2: Getting the App Working (Step by Step)

### Step 1: Install the tooling

Install Node.js LTS, then the EAS CLI:

```bash
node --version        # should print v18.x or newer
npm i -g eas-cli
```

On a Mac, install Xcode (for the iOS Simulator) from the Mac App Store. For Android, install Android Studio and create an emulator.

### Step 2: Get the app source code

1. Go to [CodeCanyon](https://codecanyon.net/downloads)
2. Find **"Flex Home React Native"** in your purchases
3. Click **Download** → **All files & documentation**
4. Extract the ZIP and open a terminal in the folder:

```bash
cd path/to/flexhome-mobile-apps
```

### Step 3: Install dependencies

```bash
npm install --legacy-peer-deps
```

The `--legacy-peer-deps` flag is required (some native modules declare strict peer ranges).

### Step 4: Enable the API on your website

Before configuring the app, enable the API on your Botble backend:

1. Log in to your **Botble admin panel** (e.g. `https://yoursite.com/admin`)
2. Go to **Settings → API**
3. **Enable the API** (turn the toggle **ON**)
4. If you require an API key, generate/copy it here. You'll paste it into `.env`

::: warning Important
The API must be enabled in **Admin → Settings → API** before the mobile app can connect. If the API is disabled, the app treats the backend as being in maintenance mode.
:::

### Step 5: Configure the environment

```bash
cp .env.example .env
```

Open `.env` and set:

```bash
API_BASE_URL=https://yoursite.com     # no trailing /api/v1 (appended automatically)
API_KEY=<only if configured in admin>
APP_NAME=Your Brand
LICENSE_CODE=<your Envato purchase code>
```

- `API_BASE_URL` should use `https://` in production and must **not** end with `/api/v1` (the app appends it).
- `API_KEY` is sent as the `X-API-KEY` header and is only needed if you configured one in admin.
- `LICENSE_CODE` is your Envato purchase code (format `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`). It is used for the development-only license check. **Never** put it in `API_KEY`.

See [Configuration](configuration.md) for the full env-key reference.

### Step 6: Get your API key from Botble admin

If your backend requires an API key:

1. **Admin → Settings → API**
2. Copy the existing key, or generate a new one
3. Paste it into `.env` as `API_KEY=...`

A wrong key returns `401 Unauthorized` on every request.

### Step 7: Run on a simulator

The iOS Simulator needs **no** signing certificate. It's the fastest first run:

```bash
npm run ios:sim          # iOS Simulator
```

Other targets:

| Target | Command | Requirements |
|---|---|---|
| **iOS Simulator** | `npm run ios:sim` | Mac + Xcode |
| **iOS device** | `npm run ios` | Mac + Xcode + signing certificate |
| **Android** | `npm run android` | Android Studio emulator or connected device |
| **Metro dev server** | `npm start` | Open on a running simulator/device |

::: tip When native config changes
If you change app name, bundle id, icons, splash, or plugins in `app.config.js`/`.env`, regenerate the native projects first: `npx expo prebuild`.
:::

### Step 8: Verify everything works

Test these to confirm the app is connected to your website:

- [ ] Properties appear on the home screen
- [ ] Search and filters return properties from your site
- [ ] Property detail shows specs, photos, and reviews
- [ ] You can log in with an account from your website
- [ ] The inquiry flow calculates a price
- [ ] Checkout opens the hosted payment page in a WebView
- [ ] Favorites save

**If properties appear, your app is connected to your website.**

---

## Part 3: How Properties & Inquirys Sync Automatically

The app connects to your Botble website through its **REST API** (`real-estate` plugin):

```
Your Botble Website (yoursite.com)
        ↓
    REST API (/api/v1/real-estate)
        ↓
    Flex Home app fetches data
        ↓
    Properties, agents, inquiries, blog displayed
```

`API_BASE_URL` from `.env` is combined into `{API_BASE_URL}/api/v1` by `app.config.js` and used by the app's API client (`src/services/apiClient.ts`).

### What syncs automatically

| Data | How it syncs | Endpoint |
|---|---|---|
| **Properties** | Real-time on each visit | `/api/v1/real-estate/properties` |
| **Search / filters** | Real-time | `/api/v1/real-estate/properties/search`, `/properties/filters` |
| **Property detail** | Real-time | `/api/v1/real-estate/properties/{slug}` |
| **Inquirys** | Real-time when the customer views | `/api/v1/real-estate/inquiries` |
| **Pricing** | Live calculation | `/api/v1/real-estate/calculate-price` |
| **Favorites** | Synced with the account | `/api/v1/real-estate/favorites` |
| **Taxonomy** (makes, types, fuels…) | Real-time | `/api/v1/real-estate/car-makes`, etc. |
| **Blog** | Real-time | `/api/v1/posts` |
| **User accounts** | Shared login with the website | `/api/v1/real-estate/auth/login` |

- **Add a property on your website** → it appears in the app automatically
- **Update a price** → the app shows it immediately
- **Customer books in the app** → the inquiry appears in your admin panel

See [API Integration](api-integration.md) for the full endpoint map.

### Configuring the home screen

Tune how many items each home section shows via `.env`:

```bash
HOME_FEATURED_COUNT=6    # featured properties
HOME_DEALERS_COUNT=2     # agents
HOME_BLOG_COUNT=5        # blog posts
CAR_IMAGE_THUMBNAIL_SIZE=large    # small | medium | large (large = full-size, sharp)
```

---

## Part 4: Customize Your App Before Publishing

Before publishing, apply your branding. Each step takes 5–15 minutes:

| Step | Guide | What to change |
|---|---|---|
| 1 | [Theme Colors](01_theme_colors.md) | Brand colors throughout the app |
| 2 | [App Font](02_app_font.md) | Typography |
| 3 | [App Name](04_app_name.md) | Display name on the home screen |
| 4 | [App Logo](05_app_logo.md) | App icon, adaptive icon, splash |
| 5 | [Splash Screen](17_splash_screen.md) | Launch screen background |
| 6 | [Translations](07_translations.md) | Languages and copy |

### App identifiers

The defaults in `app.config.js` are `com.realestate.mobile` (both iOS `bundleIdentifier` and Android `package`) and the slug `flexhome-mobile`. Change them to your own before publishing:

```js
// app.config.js
ios:     { bundleIdentifier: "com.yourcompany.yourapp" },
android: { package:          "com.yourcompany.yourapp" },
slug: "your-app-slug",
```

::: warning Identifiers are permanent
The iOS Bundle Identifier and Android package name must be **unique** and **cannot be changed after publishing**. Use reverse-domain format (`com.yourcompany.appname`), lowercase only.
:::

After changing identifiers, regenerate native projects:

```bash
npx expo prebuild --clean
```

### Version numbers

Set the marketing version via `.env` (`APP_VERSION`). `app.config.js` reads it into the Expo `version`. Build numbers are auto-incremented by the EAS `production` profile. See [Version management](10_version_management.md).

### Configure social login (optional)

If you want Google / Apple / Facebook sign-in, set the credentials in `.env` and follow the provider guides:

```bash
ENABLE_GOOGLE_SIGN_IN=true
GOOGLE_WEB_CLIENT_ID=<your-web-client-id>

ENABLE_APPLE_SIGN_IN=true          # iOS only, no external config

ENABLE_FACEBOOK_SIGN_IN=true
FACEBOOK_APP_ID=<your-app-id>
FACEBOOK_CLIENT_TOKEN=<your-client-token>
```

Guides: [Google](14_google_login_setup.md) · [Apple](13_apple_login_setup.md) · [Facebook](15_facebook_login_setup.md) · [Enable/disable providers](16_social_login_configuration.md). Leave a provider's credentials blank to disable it.

---

## Part 5: Building with EAS

Flex Home builds and submits through **EAS** (Expo Application Services), a cloud build service. No local Xcode archiving is required.

### Step 1: Install and log in

```bash
npm i -g eas-cli
eas login              # sign in with your Expo account
```

### Step 2: Configure the project

```bash
eas build:configure
```

This links the project to your Expo account and prepares credentials. The repo already ships an `eas.json` with three build profiles:

| Profile | `APP_ENV` | Distribution | Notes |
|---|---|---|---|
| `development` | `development` | internal | Dev client, for debugging |
| `preview` | `staging` | internal | Internal testing build |
| `production` | `production` | store | `autoIncrement: true`, bumps build number automatically |

::: warning APP_ENV=production for store builds
The `production` profile sets `APP_ENV=production`, which disables the development-only license check. Always use `--profile production` for store builds.
:::

### Step 3: Build

```bash
# iOS (App Store)
eas build -p ios --profile production

# Android (Play Store)
eas build -p android --profile production
```

EAS provisions credentials (signing certificates, keystore) for you on first run. Accept the prompts to let EAS manage them. When the build finishes, EAS gives you a download URL and stores the artifact in your Expo dashboard.

For an internal test build (installable without the stores):

```bash
eas build -p ios --profile preview
eas build -p android --profile preview
```

---

## Part 6: Submitting to the Stores

### Submit with EAS

EAS can upload the finished build directly to App Store Connect / Google Play:

```bash
# iOS → App Store Connect
eas submit -p ios --profile production

# Android → Google Play
eas submit -p android --profile production
```

EAS prompts for the credentials it needs (Apple ID / App Store Connect API key for iOS; a Google Play service-account JSON for Android). Follow the prompts, or configure them once in `eas.json` under `submit`.

### Apple App Store checklist

Before your first iOS submission, in [App Store Connect](https://appstoreconnect.apple.com):

- [ ] Create the app record (Bundle ID must match `app.config.js` `ios.bundleIdentifier`)
- [ ] App name (max 30 chars), subtitle, description, keywords
- [ ] Screenshots for each required device size (6.7", 6.5" iPhone; iPad if you support tablet)
- [ ] App icon 1024×1024 PNG (no transparency, no rounded corners)
- [ ] **Privacy Policy URL** (required): host it on your Botble site
- [ ] App Privacy answers (contact info for accounts/inquiries, purchase history)
- [ ] **A demo account** for the reviewer (email + password) and reviewer notes: "Real-estate app connecting to yoursite.com; checkout is completed on the hosted web page in a WebView"

Apple review typically takes **1–3 days**.

::: tip Common iOS rejection reasons
Missing privacy policy · login fails (provide demo credentials!) · app crashes during review · incomplete metadata/screenshots · checkout not completing.
:::

### Google Play checklist

Before your first Android submission, in [Google Play Console](https://play.google.com/console):

- [ ] Create the app; complete the Main store listing (name ≤30 chars, short + full description)
- [ ] App icon 512×512 PNG; feature graphic 1024×500; at least 2 phone screenshots
- [ ] Content rating questionnaire (IARC)
- [ ] Data safety form (personal info for accounts/inquiries; payment handled via web checkout)
- [ ] Pricing & distribution (Free, target countries)
- [ ] Create a **Production** release and upload the EAS-built AAB (or let `eas submit` do it)

Google review typically takes **1–3 days** (new apps may take up to 7).

---

## Part 7: Post-Launch Checklist

- [ ] Download your app from the store and test on a real device
- [ ] Verify properties load, search works, and property detail opens
- [ ] Test the full inquiry flow (dates → extras → details → review → checkout)
- [ ] Verify login works for existing website customers
- [ ] Check push notifications (see [Push notifications](push_notifications.md))
- [ ] Share the app links with your customers

### Updating your app

1. Bump `APP_VERSION` in `.env` for user-visible releases (the `production` profile auto-increments the build number).
2. Rebuild and resubmit:

```bash
eas build -p ios --profile production && eas submit -p ios --profile production
eas build -p android --profile production && eas submit -p android --profile production
```

See [Deploying the App](09_deploying_app.md) and [Version management](10_version_management.md).

---

## Quick Reference: Complete Workflow

```
1. PREPARE
   ├── Install Node LTS + EAS CLI (npm i -g eas-cli)
   ├── Get source from CodeCanyon
   ├── npm install --legacy-peer-deps
   └── Configure .env (API_BASE_URL, API_KEY, APP_NAME, LICENSE_CODE)

2. TEST LOCALLY
   ├── npm run ios:sim   (or npm run android)
   └── Verify properties, login, inquiry, checkout

3. CUSTOMIZE
   ├── Theme colors, logo, app name, splash, translations
   ├── Change iOS bundleIdentifier / Android package
   └── npx expo prebuild --clean

4. BUILD (EAS)
   ├── eas login && eas build:configure
   ├── eas build -p ios --profile production
   └── eas build -p android --profile production

5. SUBMIT
   ├── eas submit -p ios --profile production
   └── eas submit -p android --profile production

6. MAINTAIN
   ├── Bump APP_VERSION in .env
   └── Rebuild + resubmit for updates
```

---

## Frequently Asked Questions

### Do I need to manually add properties to the app?

**No.** The app pulls all properties automatically from your Botble website via the API. Manage properties in admin; the app displays them in real time.

### Can customers who registered on my website log in to the app?

**Yes.** The app shares the same customer database (Laravel Sanctum auth). Customers use the same email/password on both the website and the app.

### Do I need a Mac to publish?

- **Google Play**: No. EAS builds Android in the cloud from any OS.
- **Apple App Store**: A Mac is handy for the iOS Simulator, but EAS builds and submits iOS **in the cloud**, so you don't need to archive locally in Xcode.

### How is payment handled?

The `POST /real-estate/inquiries` endpoint creates a **PENDING** inquiry without a payment URL. Checkout is completed on the backend's **hosted payment page**, loaded in a WebView (`app/checkout-webview.tsx`). This means every Botble payment gateway works without a native SDK.

### My app shows "License Required"

Build with the `production` profile (`eas build --profile production`), which sets `APP_ENV=production` and disables the development-only license check.

### A `.env` change has no effect

`.env` is read when Metro starts or when a build is produced. It is not hot-reloaded. Restart Metro (`npm start`) and rebuild the app.

---

## Need Help?

- **Development guide**: [development.md](development.md)
- **Troubleshooting**: [troubleshooting.md](troubleshooting.md)
- **FAQ**: [faq.md](faq.md)
- **Support**: [support.md](support.md)
- **Expo & EAS docs**: [docs.expo.dev](https://docs.expo.dev)

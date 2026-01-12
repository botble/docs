# Changing App Name

## Overview

Change your app's display name for both iOS and Android platforms.

## Quick Configuration

### Option 1: Using Environment Variables (Recommended)

Update the `.env` file:

```env
APP_NAME=Your Store Name
```

Then restart the app:
```bash
npm start -- --clear
```

### Option 2: Edit app.config.ts Directly

Open `app.config.ts` and update the name:

```typescript
export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: process.env.APP_NAME || "Your Store Name",
  // ...
});
```

## Platform-Specific Settings

Update `app.config.ts` for bundle identifiers:

```typescript
ios: {
  bundleIdentifier: "com.yourcompany.yourstore",
  infoPlist: {
    CFBundleDisplayName: process.env.APP_NAME || "Your Store",
  },
},
android: {
  package: "com.yourcompany.yourstore",
},
```

## App Identifiers

### iOS Bundle Identifier

Format: `com.companyname.appname` (lowercase, no spaces)

```typescript
ios: {
  bundleIdentifier: "com.yourcompany.yourstore"
}
```

### Android Package Name

Format: `com.companyname.appname` (lowercase, no spaces)

```typescript
android: {
  package: "com.yourcompany.yourstore"
}
```

## Important Notes

1. **Bundle/Package IDs are permanent**: Once published to app stores, these cannot be changed
2. **Choose wisely**: Use your company domain in reverse
3. **No special characters**: Only letters, numbers, and dots
4. **Lowercase only**: Both platforms require lowercase

## Examples

### Retail Store
```typescript
name: "Fashion Hub",
ios: { bundleIdentifier: "com.fashionhub.app" },
android: { package: "com.fashionhub.app" }
```

### Multi-vendor Marketplace
```typescript
name: "MarketPlace Pro",
ios: { bundleIdentifier: "com.marketplace.pro" },
android: { package: "com.marketplace.pro" }
```

## Rebuilding After Changes

After updating:

```bash
# Development (Expo Go)
npm start -- --clear

# Development Build (to see name on simulator home screen)
npx expo prebuild --clean
npx expo run:ios
# or
npx expo run:android

# Production builds
eas build --platform all
```

**Note:** In Expo Go, you won't see the app name on the simulator home screen - only in development/production builds created with `expo run:ios` or `eas build`.

## Changing Name After Publishing

If your app is already on the app stores:

1. **Display Name**: Can be changed in app stores
2. **Bundle/Package ID**: Cannot be changed (requires new app listing)

## Need Help?

- Check [Expo Configuration](https://docs.expo.dev/versions/latest/config/app/)
- Read the [Deployment Guide](08_deploying_app.md)

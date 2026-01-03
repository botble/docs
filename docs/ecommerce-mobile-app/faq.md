# Frequently Asked Questions

## General Questions

### What is this app?

The Botble Ecommerce Mobile App is a React Native application built with Expo that connects to your Botble e-commerce website, providing your customers with a native mobile shopping experience on iOS and Android.

### What do I need to use this app?

- A Botble e-commerce website with API access enabled
- Node.js 18 or higher
- Expo CLI
- Developer accounts for app stores (if publishing)

### Is Flutter or React Native version better?

Both versions offer similar features. Choose based on your development team's expertise:
- **React Native (this app)**: JavaScript/TypeScript, Expo ecosystem
- **Flutter**: Dart language, single codebase compilation

## Setup & Installation

### How do I install the app?

1. Download the source code from CodeCanyon
2. Run `npm install` to install dependencies
3. Create `.env` file with your API URL
4. Run `npm start` to launch the development server

See the [Installation Guide](installation.md) for detailed steps.

### Why won't the app connect to my website?

Check these common issues:
1. Verify your API URL is correct in `.env`
2. Make sure your website is online and accessible
3. Ensure API access is enabled on your Botble backend
4. Check CORS settings allow mobile app requests

### Can I use this with any Botble theme?

Yes! The app works with any Botble e-commerce theme since it connects via API, not the frontend.

## Customization

### How do I change the app colors?

Edit the CSS variables in `global.css`. See [Theme Colors Guide](01_theme_colors.md) for details.

### How do I add my logo?

Replace the image files in the `assets/` folder:
- `icon.png` (1024x1024)
- `splash.png` (1284x2778)
- `adaptive-icon.png` (1024x1024)

See [App Logo Guide](04_app_logo.md) for details.

### How do I add a new language?

1. Create a new JSON file in `src/i18n/locales/`
2. Register it in `src/i18n/index.ts`
3. Add all translation keys

See [Translations Guide](06_translations.md) for details.

### Can I customize the checkout page?

The app uses WebView checkout, so the checkout page comes from your Botble website. Customize it there.

## Features

### Does the app support push notifications?

Push notifications can be added using Expo Notifications. This requires additional setup with Firebase/APNs.

### Does the app support social login?

Currently, the app supports email/password authentication. Social login can be added following Botble's API documentation.

### Can customers pay through the app?

Yes! The app uses WebView checkout which supports all payment methods configured on your Botble website.

### Is offline mode supported?

The app requires internet connection to fetch products and process orders. Some data is cached for faster loading.

## Deployment

### How do I publish to the app stores?

Use Expo Application Services (EAS):
```bash
eas build --platform all --profile production
eas submit --platform all
```

See [Deploying App Guide](08_deploying_app.md) for details.

### How much does it cost to publish?

- **Apple App Store**: $99/year developer account
- **Google Play Store**: $25 one-time fee
- **Expo**: Free tier available

### How long does app review take?

- **Apple**: Usually 1-3 days, sometimes up to a week
- **Google**: Usually 1-3 days

### Can I update the app without going through app stores?

Yes! Use EAS Update for JavaScript changes:
```bash
eas update --branch production --message "Bug fixes"
```

Native changes require new builds and store submissions.

## Troubleshooting

### The app shows "Network Error"

1. Check your internet connection
2. Verify API URL in `.env`
3. Test the API in a browser
4. Check if your website is online

### Products don't appear in the app

1. Make sure products exist on your website
2. Verify products are published/active
3. Check API response in browser
4. Clear app cache and reload

### Login doesn't work

1. Test login on your website first
2. Check API authentication settings
3. Verify user account exists
4. Check for CORS issues

### The app is slow

1. Enable production mode: `npx expo start --no-dev`
2. Optimize images on your website
3. Check network speed
4. Reduce number of products per page

## Technical

### What React Native version does it use?

The app uses React Native 0.81+ with Expo SDK 54.

### What Node.js version is required?

Node.js 18 or higher is required.

### Can I use npm instead of yarn?

Yes, npm is the default package manager for this app.

### Does it support TypeScript?

Yes, the entire codebase is written in TypeScript with strict mode enabled.

## Support

### Where can I get help?

- **Documentation**: You're reading it!
- **Email**: contact@botble.com
- **Support Center**: https://botble.ticksy.com

### How do I report a bug?

1. Check if it's a known issue in the documentation
2. Try to reproduce the issue
3. Contact support with:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots if applicable

### Can I request new features?

Yes! Contact us at contact@botble.com with your feature request.

## Updates

### How do I update to a new version?

1. Backup your customizations
2. Download the new version
3. Compare and merge changes
4. Test thoroughly before deploying

See [Upgrade Guide](upgrade.md) for details.

### Where can I see what's new?

Check the [Release Notes](releases.md) for version history and changes.

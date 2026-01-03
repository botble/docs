# Running the App

## Overview

Learn how to run and test your app on different platforms during development.

## Quick Start

### Start Development Server

```bash
npm start
```

This opens Expo DevTools with options to run on different platforms.

## Running on Specific Platforms

### iOS Simulator (Mac Only)

```bash
npm run ios
```

Requirements:
- macOS computer
- Xcode installed
- iOS Simulator set up

### Android Emulator

```bash
npm run android
```

Requirements:
- Android Studio installed
- Android Emulator configured
- At least one virtual device created

### Web Browser

```bash
npm run web
```

Opens the app in your default browser.

### Physical Device

1. Install **Expo Go** app on your phone
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Start the development server:
   ```bash
   npm start
   ```

3. Scan the QR code with:
   - iOS: Camera app
   - Android: Expo Go app

## Development Commands

### Clear Cache and Start

```bash
npm start -- --clear
```

### Start with Specific Port

```bash
npm start -- --port 8082
```

### Start in Tunnel Mode (for remote testing)

```bash
npm start -- --tunnel
```

## Hot Reload

The app automatically reloads when you save changes:

- **Hot Reload**: Updates without losing state
- **Full Reload**: Shake device or press `r` in terminal

## Debugging

### Open Developer Menu

- **iOS Simulator**: Cmd + D
- **Android Emulator**: Cmd + M (Mac) or Ctrl + M (Windows)
- **Physical Device**: Shake the device

### Developer Menu Options

- **Reload**: Refresh the app
- **Debug Remote JS**: Open Chrome DevTools
- **Toggle Inspector**: Inspect UI elements
- **Show Perf Monitor**: View performance metrics

### Console Logs

View logs in the terminal where you ran `npm start`.

```typescript
console.log('Debug message');
console.warn('Warning message');
console.error('Error message');
```

## Platform-Specific Testing

### iOS Testing Checklist

- [ ] Test on different iPhone sizes
- [ ] Test landscape orientation
- [ ] Test dark mode
- [ ] Test with VoiceOver (accessibility)
- [ ] Test push notifications

### Android Testing Checklist

- [ ] Test on different screen sizes
- [ ] Test landscape orientation
- [ ] Test dark mode
- [ ] Test with TalkBack (accessibility)
- [ ] Test back button behavior

## Common Issues

### "Could not find a development server"

```bash
# Kill existing processes
npm start -- --clear
```

### "Metro bundler took too long"

```bash
# Clear cache and restart
rm -rf node_modules/.cache
npm start -- --clear
```

### "Module not found"

```bash
rm -rf node_modules
npm install
npm start -- --clear
```

### Port Already in Use

```bash
# Use a different port
npm start -- --port 8082
```

### iOS Simulator Not Opening

```bash
# Reset simulator
xcrun simctl shutdown all
npm run ios
```

### Android Emulator Not Starting

1. Open Android Studio
2. Go to Device Manager
3. Start an emulator manually
4. Then run `npm run android`

## Performance Tips

1. **Use Release Mode for Performance Testing**
   ```bash
   npx expo start --no-dev
   ```

2. **Enable Hermes** (enabled by default in Expo SDK 54+)

3. **Profile the App**
   - Open Developer Menu
   - Select "Show Perf Monitor"

## Need Help?

- Check the [Troubleshooting Guide](troubleshooting.md)
- Read the [Development Guide](development.md)
- Contact support for assistance

# Configuring App Logo & Icons

## Overview

Your app needs several icon assets for different purposes:
- App icon (home screen)
- Splash screen
- Adaptive icon (Android)
- Notification icon

## Required Assets

Place your assets in the `assets/` folder:

```
assets/
├── icon.png           # Main app icon (1024x1024)
├── splash-icon.png    # Splash screen icon
├── adaptive-icon.png  # Android adaptive icon (1024x1024)
└── favicon.png        # Web favicon (48x48)
```

## App Icon

### Requirements
- **Size**: 1024 x 1024 pixels
- **Format**: PNG (no transparency for iOS)
- **Shape**: Square (iOS will apply rounded corners)

### Configuration

Update `app.json`:

```json
{
  "expo": {
    "icon": "./assets/icon.png"
  }
}
```

## Splash Screen

### Requirements
- **Size**: 1284 x 2778 pixels (or larger)
- **Format**: PNG
- **Design**: Center your logo, use solid background

### Configuration

```json
{
  "expo": {
    "splash": {
      "image": "./assets/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#2d5481"
    }
  }
}
```

### Resize Modes
- `contain` - Logo fits within screen (recommended)
- `cover` - Logo covers entire screen
- `native` - Use native splash screen

## Android Adaptive Icon

Android 8.0+ uses adaptive icons with foreground/background layers.

### Requirements
- **Foreground**: 1024 x 1024 px (logo only, centered)
- **Background**: Solid color or pattern
- **Safe zone**: Keep logo within center 66%

### Configuration

```json
{
  "expo": {
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    }
  }
}
```

## iOS Specific Icons

iOS automatically generates all required sizes from your main icon.

```json
{
  "expo": {
    "ios": {
      "icon": "./assets/icon.png"
    }
  }
}
```

## Web Favicon

For Expo web builds:

```json
{
  "expo": {
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}
```

## Creating Icons

### Online Tools
- [Figma](https://figma.com) - Design tool
- [Canva](https://canva.com) - Easy design
- [Icon Kitchen](https://icon.kitchen) - Generate adaptive icons
- [App Icon Generator](https://appicon.co) - Generate all sizes

### Design Tips
1. **Keep it simple**: Works at small sizes
2. **Use solid background**: Avoid transparency issues
3. **Center your logo**: Leave padding around edges
4. **Test on device**: Check how it looks on home screen

## Dark Mode Icons (iOS)

iOS 18+ supports dark mode icons:

```json
{
  "expo": {
    "ios": {
      "icon": {
        "light": "./assets/icon-light.png",
        "dark": "./assets/icon-dark.png"
      }
    }
  }
}
```

## Applying Changes

After updating assets:

1. Clear cache:
   ```bash
   npm start -- --clear
   ```

2. For production:
   ```bash
   eas build --platform all
   ```

## Troubleshooting

### Icon not updating
- Clear app cache on device
- Rebuild the app
- Check file paths in app.json

### Splash screen stretched
- Use `resizeMode: "contain"`
- Ensure image is high resolution

### Android icon has white background
- Check adaptive icon background color
- Verify foreground image has transparency

## Need Help?

- Check [Expo Icons Documentation](https://docs.expo.dev/develop/user-interface/app-icons/)
- Read the [Deployment Guide](08_deploying_app.md)

# Configuring App Fonts

## Overview

The app uses system fonts by default for optimal performance and native feel. You can customize fonts by adding custom font files.

## Default Fonts

The app uses the device's system fonts:
- **iOS**: San Francisco
- **Android**: Roboto

This ensures the best readability and performance on each platform.

## Adding Custom Fonts

### Step 1: Add Font Files

1. Create fonts folder if it doesn't exist:
   ```
   assets/fonts/
   ```

2. Add your font files (`.ttf` or `.otf`):
   ```
   assets/fonts/
   ├── CustomFont-Regular.ttf
   ├── CustomFont-Bold.ttf
   ├── CustomFont-Medium.ttf
   └── CustomFont-Light.ttf
   ```

### Step 2: Load Fonts

Update `app/_layout.tsx`:

```typescript
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'CustomFont-Regular': require('../assets/fonts/CustomFont-Regular.ttf'),
    'CustomFont-Bold': require('../assets/fonts/CustomFont-Bold.ttf'),
    'CustomFont-Medium': require('../assets/fonts/CustomFont-Medium.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  // ... rest of layout
}
```

### Step 3: Configure Tailwind

Update `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['CustomFont-Regular'],
        bold: ['CustomFont-Bold'],
        medium: ['CustomFont-Medium'],
      },
    },
  },
};
```

### Step 4: Use Custom Fonts

```typescript
<Text className="font-sans">Regular text</Text>
<Text className="font-bold">Bold text</Text>
<Text className="font-medium">Medium text</Text>
```

Or with inline styles:

```typescript
<Text style={{ fontFamily: 'CustomFont-Bold' }}>
  Bold text
</Text>
```

## Popular Font Recommendations

### Google Fonts (Free)
- **Inter** - Modern, clean, excellent readability
- **Poppins** - Geometric, friendly appearance
- **Open Sans** - Versatile, professional
- **Montserrat** - Modern, geometric

### Download from:
- [Google Fonts](https://fonts.google.com/)
- [Font Squirrel](https://www.fontsquirrel.com/)

## RTL (Arabic) Font Support

For Arabic text, consider:
- **Noto Sans Arabic**
- **Cairo**
- **Tajawal**

```typescript
const [fontsLoaded] = useFonts({
  'NotoSansArabic': require('../assets/fonts/NotoSansArabic-Regular.ttf'),
});
```

## Performance Tips

1. **Limit font weights**: Only include weights you need
2. **Use system fonts when possible**: Better performance
3. **Preload fonts**: Load during splash screen
4. **Keep file sizes small**: Subset fonts if needed

## Need Help?

- Check [Expo Fonts Documentation](https://docs.expo.dev/develop/user-interface/fonts/)
- Read the [Development Guide](development.md)

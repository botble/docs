# Changing Theme Colors

## Overview

The app supports customizable theme colors through CSS variables. Colors use RGB space-separated format for NativeWind/Tailwind compatibility.

## Theme Configuration

Theme colors are defined in `global.css` in the root directory.

## Color Format

Colors use **RGB space-separated values** (not hex):

```css
/* Correct format */
--color-primary: 0 0 0;           /* Black */
--color-background: 245 237 230;  /* Cream */

/* NOT hex format */
--color-primary: #000000;         /* Don't use this */
```

## Light Mode Colors

```css
:root {
  /* Primary Colors */
  --color-primary: 0 0 0;
  --color-primary-foreground: 255 255 255;

  /* Background Colors */
  --color-background: 245 237 230;    /* Warm cream */
  --color-card: 255 255 255;          /* White */
  --color-secondary: 250 248 243;

  /* Text Colors */
  --color-foreground: 23 23 23;       /* Dark text */
  --color-muted: 115 115 115;         /* Gray text */

  /* Border Colors */
  --color-border: 229 229 229;

  /* Status Colors */
  --color-success: 22 163 74;
  --color-error: 220 38 38;
  --color-warning: 245 158 11;
}
```

## Dark Mode Colors

```css
.dark {
  --color-primary: 255 255 255;
  --color-primary-foreground: 23 23 23;

  --color-background: 18 18 18;
  --color-card: 30 30 30;
  --color-secondary: 38 38 38;

  --color-foreground: 245 245 245;
  --color-muted: 163 163 163;

  --color-border: 64 64 64;
}
```

## Color Variables Reference

| Variable | Light Mode | Dark Mode | Usage |
|----------|------------|-----------|-------|
| `--color-primary` | 0 0 0 | 255 255 255 | Primary buttons |
| `--color-background` | 245 237 230 | 18 18 18 | Page background |
| `--color-card` | 255 255 255 | 30 30 30 | Card surfaces |
| `--color-foreground` | 23 23 23 | 245 245 245 | Primary text |
| `--color-muted` | 115 115 115 | 163 163 163 | Secondary text |
| `--color-border` | 229 229 229 | 64 64 64 | Borders |

## Converting Hex to RGB

To convert hex colors to RGB format:

| Hex | RGB Format |
|-----|------------|
| #000000 | 0 0 0 |
| #ffffff | 255 255 255 |
| #2196F3 | 33 150 243 |
| #4CAF50 | 76 175 80 |
| #f55d5d | 245 93 93 |

## Customizing Your Brand Colors

### Example: Blue Theme

```css
:root {
  --color-primary: 33 150 243;
  --color-primary-foreground: 255 255 255;
}

.dark {
  --color-primary: 100 181 246;
  --color-primary-foreground: 0 0 0;
}
```

### Example: Green Theme

```css
:root {
  --color-primary: 76 175 80;
  --color-primary-foreground: 255 255 255;
}

.dark {
  --color-primary: 129 199 132;
  --color-primary-foreground: 0 0 0;
}
```

### Example: Red/Brand Theme

```css
:root {
  --color-primary: 245 93 93;
  --color-primary-foreground: 255 255 255;
}

.dark {
  --color-primary: 245 93 93;
  --color-primary-foreground: 255 255 255;
}
```

## Using Theme Colors in Components

### With Tailwind Classes

```typescript
<View className="bg-background">
  <Text className="text-foreground">Primary text</Text>
  <Text className="text-muted">Secondary text</Text>
  <Button className="bg-primary text-primary-foreground">
    Click Me
  </Button>
</View>
```

### With Theme Context

```typescript
import { useSettings } from '@/context/SettingsContext';

function MyComponent() {
  const { themeColors } = useSettings();

  return (
    <View style={{ backgroundColor: themeColors.background }}>
      <Ionicons name="home" color={themeColors.foreground} size={24} />
    </View>
  );
}
```

## Applying Changes

After modifying `global.css`:

1. Save the file
2. The app should hot reload automatically
3. If not, restart with:
   ```bash
   npm start -- --clear
   ```

## Best Practices

1. **Contrast**: Ensure text is readable on backgrounds
2. **Consistency**: Use the same colors throughout
3. **Dark Mode**: Always test both light and dark modes
4. **Brand Alignment**: Match your website's colors

## Color Tools

- [RGB Color Picker](https://www.w3schools.com/colors/colors_rgb.asp)
- [Hex to RGB Converter](https://www.rapidtables.com/convert/color/hex-to-rgb.html)
- [Coolors](https://coolors.co/)

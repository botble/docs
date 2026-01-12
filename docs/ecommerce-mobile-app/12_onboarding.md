# Customizing Onboarding Screens

## Overview

The onboarding screens introduce first-time users to your app's features. You can customize the text translations and replace default icons with custom images.

## Translation Keys

Onboarding text is fully translated in all 15 supported languages.

### Location
`src/i18n/locales/[lang].json`

### Structure

```json
{
  "onboarding": {
    "skip": "Skip",
    "next": "Next",
    "getStarted": "Let's Get Started",
    "slide1Title": "Discover Amazing Products",
    "slide1Desc": "Browse thousands of products from top brands at competitive prices",
    "slide2Title": "Exclusive Deals & Discounts",
    "slide2Desc": "Get access to exclusive deals, flash sales, and personalized offers",
    "slide3Title": "Fast & Secure Delivery",
    "slide3Desc": "Enjoy fast delivery with real-time tracking and secure payment options"
  }
}
```

### Editing Translations

1. Open the locale file for your language (e.g., `src/i18n/locales/en.json`)
2. Find the `onboarding` section
3. Edit the title and description for each slide
4. Repeat for other language files

## Custom Images

Replace default icons with custom images via configuration.

### Location
`app.config.ts`

### Configuration

```typescript
extra: {
  appConfig: {
    onboarding: {
      useImages: true,
      slides: [
        { image: "https://example.com/slide1.png" },
        { image: "https://example.com/slide2.png" },
        { image: "https://example.com/slide3.png" }
      ]
    }
  }
}
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `useImages` | boolean | `false` | Enable images instead of icons |
| `slides[].image` | string | - | Image URL for the slide |
| `slides[].icon` | string | - | Override default icon (Ionicons name) |
| `slides[].color` | string | - | Override icon/accent color (hex) |

## Default Icons

When `useImages` is `false`, these icons are displayed:

| Slide | Icon | Color |
|-------|------|-------|
| 1 | `storefront-outline` | `#3b82f6` (blue) |
| 2 | `pricetag-outline` | `#10b981` (green) |
| 3 | `rocket-outline` | `#f59e0b` (amber) |

### Customizing Icons Only

You can change icons without using images:

```typescript
extra: {
  appConfig: {
    onboarding: {
      useImages: false,
      slides: [
        { icon: "cart-outline", color: "#8b5cf6" },
        { icon: "gift-outline", color: "#ec4899" },
        { icon: "shield-checkmark-outline", color: "#06b6d4" }
      ]
    }
  }
}
```

## Image Guidelines

For best results with custom images:

- **Size**: 600x600px (square)
- **Format**: PNG with transparency
- **Hosting**: Use a CDN for fast loading
- **Optimization**: Compress images for mobile

## Quick Customization Checklist

- [ ] Update slide titles in translation files
- [ ] Update slide descriptions in translation files
- [ ] (Optional) Configure custom images in `app.config.ts`
- [ ] (Optional) Customize icon colors
- [ ] Test on both iOS and Android
- [ ] Test all supported languages

## Tips

1. **Keep text short** - Mobile screens have limited space
2. **Use clear images** - Simple illustrations work best
3. **Test translations** - Ensure text fits in all languages
4. **Match branding** - Use colors consistent with your app theme

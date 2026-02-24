# Theme Typography

The Typography system allows themes to register customizable font families and font sizes that administrators can change from the theme options panel. It automatically generates CSS variables and Google Fonts imports.

## Registering Typography

Register font families and sizes in your theme's `functions/functions.php`:

```php
use Botble\Theme\Facades\Theme;
use Botble\Theme\Typography\TypographyItem;

Theme::typography()
    ->registerFontFamilies([
        new TypographyItem('primary', __('Primary'), 'Roboto'),
        new TypographyItem('secondary', __('Secondary'), 'Open Sans'),
    ])
    ->registerFontSizes([
        new TypographyItem('h1', __('Heading 1'), 28),
        new TypographyItem('h2', __('Heading 2'), 24),
        new TypographyItem('h3', __('Heading 3'), 20),
        new TypographyItem('h4', __('Heading 4'), 18),
        new TypographyItem('h5', __('Heading 5'), 16),
        new TypographyItem('h6', __('Heading 6'), 14),
        new TypographyItem('body', __('Body'), 14),
    ]);
```

## TypographyItem

Each item has the following constructor parameters:

```php
new TypographyItem(
    name: 'primary',        // Identifier used in CSS variables and theme_option keys
    label: __('Primary'),   // Display label in admin
    default: 'Roboto',      // Default value (font name for families, number for sizes)
    fontWeights: ['300', '400', '500', '700'], // Font weights to load (optional)
    isGoogleFont: true      // Whether to load from Google Fonts (optional, default: true)
);
```

### Using Non-Google Fonts

For system fonts or self-hosted fonts, set `isGoogleFont` to `false`:

```php
new TypographyItem('system', __('System'), 'system-ui', isGoogleFont: false)
```

## How It Works

### CSS Variables

The system generates CSS custom properties based on registered items:

```css
/* For font families */
:root {
    --primary-font: 'Roboto', sans-serif;
    --secondary-font: 'Open Sans', sans-serif;
}

/* For font sizes */
h1 { font-size: 28px; }
h2 { font-size: 24px; }
body { font-size: 14px; }
```

### Google Fonts Import

For fonts marked as Google Fonts, the system automatically generates import links:

```html
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
```

### Theme Options Integration

Typography fields are automatically added to the theme options admin panel. Admins can change:

- Font family names (text input)
- Font sizes (number input with pixel units)

The theme option keys follow the pattern:
- Font families: `{name}_font` (e.g., `primary_font`)
- Font sizes: `{name}_font_size` (e.g., `h1_font_size`)

## Using CSS Variables in Your Theme

Reference the generated CSS variables in your stylesheets:

```css
.site-header {
    font-family: var(--primary-font);
}

.post-content {
    font-family: var(--secondary-font);
    font-size: var(--body-size, 14px);
}
```

## Managing Typography

### Removing Items

```php
// Remove specific font families
Theme::typography()->removeFontFamilies('secondary');
Theme::typography()->removeFontFamilies(['secondary', 'tertiary']);

// Remove specific font sizes
Theme::typography()->removeFontSizes('h6');
Theme::typography()->removeFontSizes(['h5', 'h6']);
```

### Getting Registered Items

```php
$fontFamilies = Theme::typography()->getFontFamilies();
$fontSizes = Theme::typography()->getFontSizes();

foreach ($fontFamilies as $item) {
    echo $item->getName();     // 'primary'
    echo $item->getLabel();    // 'Primary'
    echo $item->getDefault();  // 'Roboto'
    echo $item->isGoogleFont(); // true
}
```

## Complete Example

```php
// In platform/themes/your-theme/functions/functions.php

use Botble\Theme\Facades\Theme;
use Botble\Theme\Typography\TypographyItem;

Theme::typography()
    ->registerFontFamilies([
        new TypographyItem(
            'primary',
            __('Primary'),
            theme_option('primary_font', 'Roboto'),
            ['300', '400', '500', '700']
        ),
        new TypographyItem(
            'secondary',
            __('Secondary'),
            theme_option('secondary_font', 'Playfair Display'),
            ['400', '700']
        ),
    ])
    ->registerFontSizes([
        new TypographyItem('h1', __('Heading 1'), 36),
        new TypographyItem('h2', __('Heading 2'), 30),
        new TypographyItem('h3', __('Heading 3'), 24),
        new TypographyItem('h4', __('Heading 4'), 20),
        new TypographyItem('h5', __('Heading 5'), 18),
        new TypographyItem('h6', __('Heading 6'), 16),
        new TypographyItem('body', __('Body'), 16),
    ]);
```

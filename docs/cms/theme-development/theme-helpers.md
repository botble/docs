# Theme Helpers

The `ThemeSupport` class provides static helper methods that register common theme features with a single call. These handle theme option fields, rendering logic, and admin panel integration.

## Social Links

Registers a repeater field in theme options for managing social media links with icons, images, and colors.

### Registration

```php
use Botble\Theme\Supports\ThemeSupport;

ThemeSupport::registerSocialLinks();
```

### Retrieving Social Links

```php
// Get array of SocialLink objects
$links = ThemeSupport::getSocialLinks();

foreach ($links as $link) {
    $link->getName();            // 'Facebook'
    $link->getUrl();             // 'https://facebook.com/...'
    $link->getIcon();            // 'ti ti-brand-facebook'
    $link->getImage();           // Image URL (alternative to icon)
    $link->getColor();           // '#ffffff'
    $link->getBackgroundColor(); // '#1877F2'
}
```

### Rendering in Blade

```blade
@foreach (ThemeSupport::getSocialLinks() as $link)
    @if ($link->getUrl())
        <a {!! $link->getAttributes(['class' => 'social-link']) !!}>
            {!! $link->getIconHtml(['width' => 20, 'height' => 20]) !!}
            <span>{{ $link->getName() }}</span>
        </a>
    @endif
@endforeach
```

The `getAttributes()` method renders `href`, `title`, `target="_blank"`, and inline styles for colors. The `getIconHtml()` method renders either an `<img>` tag (if image is set) or an icon element.

### Default Social Links

`getDefaultSocialLinksData()` returns defaults for Facebook, X (Twitter), YouTube, and Instagram.

## Preloader

Registers a preloader toggle and version selector in theme options.

```php
ThemeSupport::registerPreloader();
```

This adds:
- **Enable preloader** (on/off field)
- **Preloader version** (select field with customizable options)

### Customizing Preloader Versions

Use the `theme_preloader_versions` filter to add custom preloader styles:

```php
add_filter('theme_preloader_versions', function (array $versions): array {
    $versions['custom'] = __('Custom Preloader');
    return $versions;
}, 120);
```

## Toast Notifications

Registers toast notification settings with position and alignment options.

```php
ThemeSupport::registerToastNotification();
```

Adds fields for:
- **Enable toast notification** (on/off)
- **Toast position** (top/bottom select)
- **Toast alignment** (left/center/right select)

## Site Copyright

Registers a copyright textarea field in theme options.

```php
ThemeSupport::registerSiteCopyright();
```

### Retrieving Copyright

```php
// Supports placeholders: %Y, %y, :year (replaced with current year)
echo ThemeSupport::getSiteCopyright();
// Or via facade
echo Theme::getSiteCopyright();
```

Example value: `© %Y My Company. All rights reserved.` renders as `© 2026 My Company. All rights reserved.`

## Date Format

Registers a date format selector in theme options.

```php
ThemeSupport::registerDateFormatOption();
```

### Formatting Dates

```php
// Uses the admin-selected format
echo ThemeSupport::formatDate($post->created_at);

// Or with a specific format
echo ThemeSupport::formatDate($post->created_at, 'M d, Y');
```

### Customizing Available Formats

Use the `theme_supported_date_formats` filter:

```php
add_filter('theme_supported_date_formats', function (array $formats): array {
    $formats[] = 'd/m/Y';
    return $formats;
}, 120);
```

## Lazy Load Images

Registers lazy loading functionality with a placeholder image option.

```php
ThemeSupport::registerLazyLoadImages();
```

Adds fields for:
- **Enable lazy load** (on/off)
- **Lazy load placeholder image** (media image)

## Social Sharing

Registers social sharing button configuration.

```php
ThemeSupport::registerSocialSharing();
```

### Rendering Share Buttons

```php
// Get sharing button data
$buttons = ThemeSupport::getSocialSharingButtons(
    url: $post->url,
    title: $post->name,
    thumbnail: RvMedia::getImageUrl($post->image)
);

// Or render the HTML directly
echo ThemeSupport::renderSocialSharingButtons($post->url, $post->name);
```

Default sharing platforms: Facebook, X (Twitter), Pinterest, LinkedIn, WhatsApp, Email.

## Logo Height

Registers a number field to control logo height in pixels.

```php
// Default max height: 50px
ThemeSupport::registerSiteLogoHeight();

// Custom default
ThemeSupport::registerSiteLogoHeight(defaultValue: 60);
```

## Google Tag Manager

Helpers for Google Tag Manager / Google Analytics integration. Configuration is done via **Admin → Settings → Website Tracking**.

```php
// Check if GTM/GA is configured
if (ThemeSupport::isGoogleTagManagerEnabled()) {
    // Render in <head>
    echo ThemeSupport::renderGoogleTagManagerScript();

    // Render after <body> opening tag
    echo ThemeSupport::renderGoogleTagManagerNoscript();
}

// Get tracking type: 'gtm', 'id', 'custom', or null
$type = ThemeSupport::getGoogleTagManagerType();

// Check debug mode
$debug = ThemeSupport::isGoogleTagManagerDebugEnabled();
```

## Theme Icon Fields

Registers custom icon packs for use in theme option fields and shortcode forms.

```php
ThemeSupport::registerThemeIconFields(
    icons: ['icon-home', 'icon-user', 'icon-settings'],
    css: ['css/icons.css'],  // CSS files to load
    js: ['js/icons.js']      // JS files to load (optional)
);
```

### Getting Registered Icons

```php
$icons = ThemeSupport::getThemeIcons();
```

Use the `theme_icon_list_icons` filter to modify the icon list:

```php
add_filter('theme_icon_list_icons', function (array $icons): array {
    return array_merge($icons, ['new-icon-1', 'new-icon-2']);
}, 120);
```

## Facebook Integration

Registers Facebook Page ID and comment settings in theme options.

```php
ThemeSupport::registerFacebookIntegration();
```

Adds fields for Facebook page integration and comment system configuration.

## YouTube and Google Maps Shortcodes

Register built-in shortcodes for embedding media:

```php
// YouTube video embed shortcode
ThemeSupport::registerYoutubeShortcode();

// With custom view
ThemeSupport::registerYoutubeShortcode('path.to.custom-view');

// Google Maps embed shortcode
ThemeSupport::registerGoogleMapsShortcode();
```

## Custom JS/CSS/HTML

Retrieve custom code injected from the admin panel (**Admin → Appearance → Custom CSS/JS/HTML**):

```php
// Get custom JavaScript for a location ('header' or 'footer')
$headerJs = ThemeSupport::getCustomJS('header');
$footerJs = ThemeSupport::getCustomJS('footer');

// Get custom HTML for a location ('header', 'body', or 'footer')
$headerHtml = ThemeSupport::getCustomHtml('header');
$bodyHtml = ThemeSupport::getCustomHtml('body');
```

## Complete Registration Example

A typical theme registers most helpers in `functions/functions.php`:

```php
use Botble\Theme\Supports\ThemeSupport;

ThemeSupport::registerSocialLinks();
ThemeSupport::registerToastNotification();
ThemeSupport::registerPreloader();
ThemeSupport::registerSiteCopyright();
ThemeSupport::registerDateFormatOption();
ThemeSupport::registerLazyLoadImages();
ThemeSupport::registerSocialSharing();
ThemeSupport::registerSiteLogoHeight();
```

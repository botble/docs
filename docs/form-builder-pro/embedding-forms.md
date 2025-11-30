# Embedding Forms

Learn how to embed forms on your website pages and external websites.

## Using Shortcodes

The primary method for embedding forms in pages:

```
[form-builder-pro code="your-form-code"][/form-builder-pro]
```

### With Style Override

```
[form-builder-pro code="your-form-code" style="modern"][/form-builder-pro]
```

Available styles: `default`, `modern`, `minimal`, `bold`, `glass`

## Popup Forms

For popup display mode:

1. Edit the form
2. Set **Display Mode** to "Popup"
3. Configure popup settings:
   - Trigger type
   - Popup size
   - Title
4. Use the shortcode - it will display as a button or auto-trigger

## Embedding on External Websites

For forms with "Allow Embed" enabled:

### Using Direct URL

```
https://yoursite.com/forms/{hash}/embed
```

### Using User-Friendly URL

```
https://yoursite.com/form/{code}
```

### Using JavaScript Embed

```html
<script src="https://yoursite.com/vendor/core/plugins/form-builder-pro/js/embed.js"></script>
<div data-form-builder-pro="your-form-code"></div>
```

## Embed Options in Admin

After creating a form, view embed options:

1. Open the form editor
2. Scroll to the **Embed Code** section
3. Copy the shortcode, URL, or JavaScript snippet

## Popup Forms Advanced Configuration

### Button Click Trigger

Display form when a button is clicked:

1. Set **Popup Trigger** to "Button Click"
2. Configure **Button Text** (e.g., "Contact Us")
3. The shortcode will render a button that opens the popup

### Time Delay Trigger

Show popup after a time delay:

1. Set **Popup Trigger** to "Time Delay"
2. Configure **Delay** in seconds
3. Popup appears automatically after the delay

### Scroll Percentage Trigger

Show popup after scrolling:

1. Set **Popup Trigger** to "Scroll Percentage"
2. Configure **Scroll Percentage** (e.g., 50%)
3. Popup appears when user scrolls to that point

### Exit Intent Trigger

Show popup when user is about to leave:

1. Set **Popup Trigger** to "Exit Intent"
2. Popup appears when mouse moves toward browser controls

### Popup Appearance

- **Popup Title**: Optional header text
- **Popup Size**: Small, Medium, Large, or Extra Large
- **Close on Overlay Click**: Allow closing by clicking outside
- **Show Close Button**: Display X button in corner

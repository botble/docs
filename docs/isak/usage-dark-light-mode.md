# Dark/Light Mode

Isak features a seamless dark/light mode toggle that allows visitors to choose their preferred viewing experience. The theme remembers their preference using browser local storage.

## How It Works

### Mode Toggle

Users can switch between dark and light modes using:

1. **Settings Panel**: Click the gear icon in the sidebar to access the settings panel with a mode toggle
2. **Keyboard Shortcut**: Some browsers support system-level dark mode preferences

![Dark Light Toggle](./images/theme-options/dark-light-toggle.png)

### Automatic Persistence

When a user selects a mode:
- Their preference is saved to browser local storage
- The setting persists across page visits
- Returns to default on new browsers/devices

## Default Mode Setting

To set the default mode for new visitors:

1. Go to `Appearance` -> `Theme Options`
2. Navigate to **Theme Styles** section
3. Set **Default Theme Mode** to either Dark or Light
4. Save changes

![Default Mode](./images/theme-options/default-mode.png)

## Image Switching

Isak automatically switches images based on the current mode. This is useful for:

- Logos with light/dark variants
- Client logos that need different versions
- Any image that should adapt to the background

### How to Add Mode-Specific Images

When adding images through shortcodes or theme options, you can specify both light and dark variants:

**In Hero Intro Shortcode:**
- Client Logo (Light): Displayed in light mode
- Client Logo (Dark): Displayed in dark mode

**In Theme Options:**
- Logo (Light Mode): Site logo for light theme
- Logo (Dark Mode): Site logo for dark theme

**In Tech Stack Shortcode:**
- Skill Icon: Default icon
- Skill Icon (Dark): Icon for dark mode

### Technical Implementation

Images with mode variants use data attributes:
```html
<img src="light-image.png"
     data-light="light-image.png"
     data-dark="dark-image.png">
```

The theme JavaScript automatically swaps these when the mode changes.

## CSS Variables

Isak uses CSS custom properties (variables) that automatically update with mode changes:

| Variable | Description |
|----------|-------------|
| `--bg-primary` | Main background color |
| `--bg-secondary` | Secondary background |
| `--text-primary` | Main text color |
| `--text-secondary` | Secondary text |
| `--accent-color` | Accent/highlight color |
| `--border-color` | Border and divider color |

These variables ensure consistent styling across both modes.

## Animations

Mode switching includes smooth transitions:

- Background colors fade smoothly
- Text colors transition gradually
- Images cross-fade between variants
- No jarring visual changes

## Best Practices

### Logo Design
- Provide logos with transparent backgrounds
- Create light version with dark colors
- Create dark version with light/white colors

### Client Logos
- Request both versions from clients when possible
- For single-color logos, consider using CSS filters as fallback

### Content Images
- Hero images and photos generally work in both modes
- Consider image contrast in both contexts
- Use the separate light/dark fields for icons and graphics

## Troubleshooting

### Mode Not Saving
- Check if browser allows local storage
- Clear browser cache and try again
- Ensure no JavaScript errors in console

### Images Not Switching
- Verify both image variants are uploaded
- Check that both light and dark fields are filled
- Clear browser cache after updating images

### Flash of Wrong Mode on Load
- This can occur briefly on page load
- Set the default mode to match your primary audience's preference
- The flash is typically imperceptible

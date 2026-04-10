# Custom CSS / JS

You can add custom CSS and JavaScript to your site without modifying theme files.

## Adding Custom CSS

1. Go to `Appearance` -> `Custom CSS` in your admin panel.
2. Enter your custom CSS code.
3. Click `Save`.

Example — change the primary color:

```css
:root {
    --primary-color: #FF5733;
}
```

## Adding Custom JavaScript

1. Go to `Appearance` -> `Custom JS` in your admin panel.
2. Enter your custom JavaScript code.
3. Click `Save`.

::: tip
Custom CSS/JS is injected after the theme's styles and scripts, so your rules will override the theme defaults.
:::

## Using a Child Theme

For more extensive customizations, consider using a child theme:

1. Go to `Appearance` -> `Theme` in your admin panel.
2. Click `Create Child Theme` under the Orisa theme.
3. Customize the child theme files as needed — your changes won't be overwritten during updates.

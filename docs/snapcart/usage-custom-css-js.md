# Custom CSS/JS

SnapCart allows you to add custom CSS and JavaScript code without modifying theme files directly.

## Adding Custom CSS

To add custom CSS, go to `Appearance` -> `Custom CSS` in the admin panel.

Enter your CSS code in the editor and click `Save`. The custom CSS will be loaded after the theme's default styles,
allowing you to override any existing styles.

```css
/* Example: Change the primary button color */
.btn-primary {
    background-color: #ff5722;
}
```

## Adding Custom JavaScript

To add custom JavaScript, go to `Appearance` -> `Custom JS` in the admin panel.

Enter your JavaScript code in the editor and click `Save`. The code will be loaded in the footer of every page.

```javascript
// Example: Track a custom event
document.addEventListener('DOMContentLoaded', function() {
    console.log('SnapCart loaded');
});
```

::: warning
Be careful when adding custom JavaScript. Incorrect code can break your website's functionality. Always test
changes in a development environment first.
:::

# Integration with Botble CMS Sites

This guide explains how to integrate BB Form Builder with other Botble CMS websites. This allows you to host BB Form Builder on one site (e.g., `form.domain.com`) and embed forms on other Botble CMS sites using a simple shortcode.

## Overview

The integration works by:
1. Loading the embed.js script from your BB Form Builder installation
2. Registering a shortcode that renders forms from the remote server
3. All form submissions are processed on the BB Form Builder server

## Setup Instructions

### Step 1: Create the Integration File

Create a new file in your theme's functions folder:

```
platform/themes/[your-theme]/functions/form-builder-integration.php
```

### Step 2: Add the Integration Code

Copy and paste the following code into your integration file:

```php
<?php

use Botble\Shortcode\Compilers\Shortcode;

/**
 * BB Form Builder Integration for Botble CMS
 *
 * This file integrates forms from a remote BB Form Builder installation
 * into this Botble CMS site using the Embed via JavaScript feature.
 *
 * Instructions:
 * 1. Copy this file to: platform/themes/[your-theme]/functions/
 * 2. Update the $formBuilderBaseUrl variable below
 * 3. Use the shortcode: [bb-form-builder-integration code="your-form-code"]
 */

// Configure your BB Form Builder installation URL (no trailing slash)
$formBuilderBaseUrl = 'https://form.yourdomain.com';
$embedVersion = '1.1.3';

app()->booted(function () use ($formBuilderBaseUrl, $embedVersion): void {
    // Add the embed.js script to the footer
    add_filter(THEME_FRONT_FOOTER, function (?string $html) use ($formBuilderBaseUrl, $embedVersion): string {
        static $scriptAdded = false;

        if ($scriptAdded) {
            return $html;
        }

        $scriptAdded = true;

        $script = <<<HTML
<script src="{$formBuilderBaseUrl}/vendor/core/plugins/bb-form-builder/js/embed.js?v={$embedVersion}"></script>
HTML;

        return $html . $script;
    }, 100);

    // Register the shortcode to render forms
    add_shortcode(
        'bb-form-builder-integration',
        'BB Form Builder Integration',
        'Embed a form from your BB Form Builder installation',
        function (Shortcode $shortcode) use ($formBuilderBaseUrl, $embedVersion) {
            $formCode = $shortcode->code;

            if (empty($formCode)) {
                return '<p class="text-danger">Error: code attribute is required.</p>';
            }

            // Generate a unique container ID
            $containerId = 'bb-form-' . md5($formCode . uniqid());

            return <<<HTML
<div id="{$containerId}"></div>
<script>
document.addEventListener("DOMContentLoaded", function() {
    if (typeof BbFormBuilder !== 'undefined') {
        BbFormBuilder.embed({
            container: '#{$containerId}',
            formCode: '{$formCode}',
            baseUrl: '{$formBuilderBaseUrl}',
            version: '{$embedVersion}'
        });
    } else {
        document.getElementById('{$containerId}').innerHTML =
            '<p class="text-danger">BB Form Builder script not loaded.</p>';
    }
});
</script>
HTML;
        }
    );

    // Optional: Add admin UI for the shortcode
    shortcode()->setAdminConfig('bb-form-builder-integration', function (array $attributes) {
        return '
            <div class="mb-3">
                <label class="form-label">Form Code</label>
                <input type="text" name="code" value="' . ($attributes['code'] ?? '') . '" class="form-control" placeholder="e.g., contact-form">
                <div class="form-text">Enter the form code from your BB Form Builder installation.</div>
            </div>
        ';
    });
});
```

### Step 3: Configure the Base URL

Update the `$formBuilderBaseUrl` variable to point to your BB Form Builder installation:

```php
$formBuilderBaseUrl = 'https://form.yourdomain.com';
```

## Usage

### Basic Shortcode

Add this shortcode to any page or post on your Botble CMS site:

```
[bb-form-builder-integration code="your-form-code"]
```

### Examples

```
[bb-form-builder-integration code="contact-form"]
[bb-form-builder-integration code="newsletter"]
[bb-form-builder-integration code="job-application"]
```

## Finding Your Form Code

1. Go to your BB Form Builder admin panel
2. Open the form you want to embed
3. Click on the **Settings** tab
4. Find the **Form Code** field
5. Copy the code (e.g., "contact-form")

## Cross-Domain Support

BB Form Builder supports cross-domain embedding out of the box. No additional CORS configuration is required. Simply install BB Form Builder on your form server and embed forms on any website using the shortcode.

## Best Practices

1. **Use a subdomain**: Host your BB Form Builder installation on a subdomain like `form.yourdomain.com` for easier management.

2. **Single script load**: The embed script is loaded only once, even if you have multiple forms on the same page.

3. **Centralized submissions**: All form submissions are processed on your BB Form Builder server, keeping your main site lightweight.

4. **Custom styling**: You can customize the form styling using CSS on your theme:

```css
/* Example: Override form container styles */
[id^="bb-form-"] .fb-form {
    /* Your custom styles */
}
```

## Troubleshooting

### Form not loading

1. Check that the `$formBuilderBaseUrl` is correct and accessible
2. Verify the form code exists on your BB Form Builder installation
3. Check browser console for JavaScript errors

### Script not loading

1. Ensure the embed.js path is correct
2. Verify your BB Form Builder installation has the public assets published

### Form submissions failing

1. Check that your BB Form Builder API is accessible
2. Verify there are no firewall rules blocking cross-origin requests

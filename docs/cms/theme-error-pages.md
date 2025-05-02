# Error Pages

Botble CMS provides a flexible system for handling error pages (404, 500, 503, etc.) in your theme. This documentation covers how to customize these error pages to match your theme's design.

## Error Page Types

The main error pages you might want to customize are:

- **404 Not Found**: Displayed when a page cannot be found
- **500 Internal Server Error**: Displayed when there's a server error
- **503 Service Unavailable**: Displayed when the site is in maintenance mode

## Customizing Error Pages

There are two approaches to customizing error pages in your theme:

### Approach 1: Create Custom Error Pages (Recommended)

The recommended approach is to create custom error pages directly in your theme's views directory:

1. Create the following files in your theme's views directory:
   - `/platform/themes/your-theme/views/404.blade.php`
   - `/platform/themes/your-theme/views/500.blade.php`
   - `/platform/themes/your-theme/views/503.blade.php`

2. Design each error page to match your theme's look and feel.

#### Example 404 Page

Here's an example of a custom 404 page from the Ripple theme:

```blade
@php
    SeoHelper::setTitle(__('404 - Not found'));
    Theme::fireEventGlobalAssets();
    Theme::breadcrumb()->add(SeoHelper::getTitle());
@endphp

{!! Theme::partial('header') !!}
{!! Theme::partial('breadcrumbs') !!}

<style>
    .error-code {
        color: #22292f;
        font-size: 6rem;
    }

    .error-border {
        background-color: var(--color-1st);
        height: .25rem;
        width: 6rem;
        margin-bottom: 1.5rem;
    }

    .error-page a {
        color: var(--color-1st);
    }

    .error-page ul li {
        margin-bottom: 5px;
    }
</style>

<section class="section pt-50 pb-100">
    <div class="container">
        <div class="page-content error-page">
            <div class="error-code">
                404
            </div>

            <div class="error-border"></div>

            <h4>{{ __('This may have occurred because of several reasons') }}:</h4>
            <ul>
                <li>{{ __('The page you requested does not exist.') }}</li>
                <li>{{ __('The link you clicked is no longer.') }}</li>
                <li>{{ __('The page may have moved to a new location.') }}</li>
                <li>{{ __('An error may have occurred.') }}</li>
                <li>{{ __('You are not authorized to view the requested resource.') }}</li>
            </ul>
            <br>

            <strong>{!! BaseHelper::clean(__('Please try again in a few minutes, or alternatively return to the homepage by <a href=":link">clicking here</a>.', ['link' => BaseHelper::getHomepageUrl()])) !!}</strong>
        </div>
    </div>
</section>

{!! Theme::partial('footer') !!}
```

This approach gives you complete control over the layout and design of your error pages.

### Approach 2: Use Default Error Pages

Alternatively, you can simply include the default error pages provided by the theme package:

```blade
{{-- In /platform/themes/your-theme/views/404.blade.php --}}
@include('packages/theme::errors.404')

{{-- In /platform/themes/your-theme/views/500.blade.php --}}
@include('packages/theme::errors.500')

{{-- In /platform/themes/your-theme/views/503.blade.php --}}
@include('packages/theme::errors.503')
```

This approach is simpler but provides less customization.

## Key Components for Error Pages

When creating custom error pages, consider including these key components:

1. **Error Code**: Display the error code (404, 500, etc.) prominently
2. **Error Title**: A clear title explaining the error
3. **Error Description**: A brief explanation of what might have caused the error
4. **Navigation Options**: Links to help users navigate away from the error page (e.g., back to homepage)
5. **Consistent Styling**: Match the design with your theme's overall look and feel

## SEO Considerations

Make sure to set proper SEO information for error pages:

```php
SeoHelper::setTitle(__('404 - Not found'));
```

This ensures search engines understand the nature of the page.

## Loading Theme Assets

To ensure your error pages have access to your theme's styles and scripts, include:

```php
Theme::fireEventGlobalAssets();
```

This loads the necessary assets for your theme.

## Testing Error Pages

To test your custom error pages:

1. For 404 pages: Visit a URL that doesn't exist on your site
2. For 500 pages: You can temporarily add code that triggers an error
3. For 503 pages: Enable maintenance mode via `php artisan down`

Make sure to test your error pages on different devices to ensure they're responsive.

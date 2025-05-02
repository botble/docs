# Theme Routes

## Introduction

Theme routes allow you to define custom URLs and controllers for your theme. Routes for a theme are located in `/platform/themes/[your-theme]/routes/web.php`. These routes are automatically loaded when the theme is active.

Botble CMS provides two ways to register theme routes:

1. Using `Theme::registerRoutes()` (recommended)
2. Using traditional Laravel route groups (legacy approach)

## Using Theme::registerRoutes() (Recommended)

The recommended way to register theme routes is using the `Theme::registerRoutes()` method. This method automatically applies the necessary middleware and filters to your routes.

```php
<?php

use Botble\Base\Http\Middleware\RequiresJsonRequestMiddleware;
use Botble\Theme\Facades\Theme;
use Illuminate\Support\Facades\Route;
use Theme\YourTheme\Http\Controllers\YourThemeController;

Theme::registerRoutes(function (): void {
    Route::group(['controller' => YourThemeController::class], function (): void {
        // Add your custom routes here
        Route::get('custom-page', 'getCustomPage')->name('public.custom-page');

        // AJAX routes with JSON middleware
        Route::middleware(RequiresJsonRequestMiddleware::class)
            ->group(function (): void {
                Route::get('ajax/search', 'getSearch')->name('public.ajax.search');
            });
    });
});

// This loads the default theme routes
Theme::routes();
```

### Benefits of Using Theme::registerRoutes()

- Automatically applies the `web` and `core` middleware
- Applies the `BASE_FILTER_GROUP_PUBLIC_ROUTE` filter
- Cleaner and more concise syntax
- Better integration with the theme system

## Legacy Approach (Not Recommended)

For backward compatibility, you can still use the traditional Laravel route groups:

```php
<?php

// Custom routes (legacy approach)
Route::group(['namespace' => 'Theme\YourTheme\Http\Controllers', 'middleware' => 'web'], function () {
    Route::group(apply_filters(BASE_FILTER_GROUP_PUBLIC_ROUTE, []), function () {
        // Add your custom routes here
        Route::get('hello', 'YourThemeController@getHello');
    });
});

Theme::routes();
```

## Route Examples

Here are some examples of common route patterns you might use in your theme:

### Basic Page Route

```php
Theme::registerRoutes(function (): void {
    Route::group(['controller' => YourThemeController::class], function (): void {
        Route::get('about-us', 'getAboutUs')->name('public.about-us');
    });
});
```

### Route with Parameters

```php
Theme::registerRoutes(function (): void {
    Route::group(['controller' => YourThemeController::class], function (): void {
        Route::get('category/{slug}', 'getCategory')->name('public.category');
    });
});
```

### Route with Multiple Parameters

```php
Theme::registerRoutes(function (): void {
    Route::group(['controller' => YourThemeController::class], function (): void {
        Route::get('products/{category}/{product}', 'getProduct')
            ->name('public.product');
    });
});
```

### Route with Optional Parameters

```php
Theme::registerRoutes(function (): void {
    Route::group(['controller' => YourThemeController::class], function (): void {
        Route::get('blog/{slug?}', 'getBlog')
            ->name('public.blog');
    });
});
```

### Route with Constraints

```php
Theme::registerRoutes(function (): void {
    Route::group(['controller' => YourThemeController::class], function (): void {
        Route::get('products/{id}', 'getProduct')
            ->where('id', '[0-9]+')
            ->name('public.product');
    });
});
```

### AJAX Routes

```php
Theme::registerRoutes(function (): void {
    Route::group(['controller' => YourThemeController::class], function (): void {
        Route::middleware(RequiresJsonRequestMiddleware::class)
            ->group(function (): void {
                Route::get('ajax/load-more', 'getLoadMore')
                    ->name('public.ajax.load-more');

                Route::post('ajax/contact', 'postContact')
                    ->name('public.ajax.contact');
            });
    });
});
```

### Form Submission Routes

```php
Theme::registerRoutes(function (): void {
    Route::group(['controller' => YourThemeController::class], function (): void {
        Route::get('contact', 'getContact')->name('public.contact');
        Route::post('contact', 'postContact')->name('public.contact.post');
    });
});
```

## Important Notes

1. Always add your custom routes **before** the `Theme::routes()` call to ensure they are not overridden by default routes.

2. Use the `public.` prefix for route names to maintain consistency with the core routes.

3. Controller methods for GET requests should be prefixed with `get`, and POST requests with `post` (e.g., `getContact`, `postContact`).

4. For AJAX routes that expect JSON responses, use the `RequiresJsonRequestMiddleware` middleware.

5. Route parameters should use kebab-case for URLs (e.g., `product-category`) and camelCase for variables (e.g., `{productCategory}`).

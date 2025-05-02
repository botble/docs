# Theme MVC Pattern

Botble CMS themes follow the MVC (Model-View-Controller) pattern, allowing you to create custom functionality within your theme while maintaining a clean separation of concerns.

## Theme Structure

When developing a theme, you can start by using the default theme called **Ripple** or create a new theme using the theme generator command:

```bash
php artisan cms:theme:create <your-theme-name>
```

This will create a new theme with the following structure:

```
platform/themes/<your-theme-name>/
├── assets/                 # Theme assets (CSS, JS, images)
├── functions/              # Theme functions
│   ├── functions.php       # Main functions file
│   ├── shortcodes.php      # Theme shortcodes
│   └── theme-options.php   # Theme options
├── layouts/                # Theme layouts
│   └── default.blade.php   # Default layout
├── partials/               # Theme partials
├── routes/                 # Theme routes
│   └── web.php             # Web routes
├── src/                    # Theme PHP classes
│   ├── Http/
│   │   └── Controllers/    # Theme controllers
│   └── Models/             # Theme models
├── views/                  # Theme views
├── composer.json           # Composer configuration
├── config.php             # Theme configuration
└── theme.json             # Theme metadata
```

## Theme Namespace

Each theme has its own namespace defined in the `composer.json` file. For example, if your theme is named "Ripple", the namespace will be `Theme\Ripple\`. This namespace is used for all PHP classes within your theme.

## Models

You can create custom models in the `platform/themes/<your-theme>/src/Models` directory. These models follow standard Laravel Eloquent patterns.

Example model (`platform/themes/<your-theme>/src/Models/CustomPost.php`):

```php
namespace Theme\YourTheme\Models;

use Illuminate\Database\Eloquent\Model;

class CustomPost extends Model
{
    protected $table = 'posts';

    protected $fillable = [
        'name',
        'content',
        'status',
    ];
}
```

## Views

Theme views are located in the `platform/themes/<your-theme>/views` directory. These views use Laravel's Blade templating engine.

Example view (`platform/themes/<your-theme>/views/custom-page.blade.php`):

```blade
<div class="container">
    <h1>{{ $title }}</h1>
    <div class="content">
        {!! $content !!}
    </div>
</div>
```

To render a view from your controller:

```php
return Theme::scope('custom-page', ['title' => 'My Page', 'content' => 'Page content']);
```

## Controllers

Theme controllers are located in the `platform/themes/<your-theme>/src/Http/Controllers` directory. These controllers should extend the `Botble\Theme\Http\Controllers\PublicController` class.

Example controller (`platform/themes/<your-theme>/src/Http/Controllers/YourThemeController.php`):

```php
namespace Theme\YourTheme\Http\Controllers;

use Botble\Theme\Facades\Theme;
use Botble\Theme\Http\Controllers\PublicController;
use Illuminate\Http\Request;

class YourThemeController extends PublicController
{
    public function getCustomPage(Request $request)
    {
        $title = 'Custom Page';
        $content = 'This is a custom page.';

        return Theme::scope('custom-page', compact('title', 'content'));
    }

    public function getAjaxData(Request $request)
    {
        // Process AJAX request
        $data = ['success' => true, 'message' => 'Data loaded successfully'];

        return $this->httpResponse()->setData($data);
    }
}
```

## Routes

Theme routes are defined in the `platform/themes/<your-theme>/routes/web.php` file. These routes are automatically loaded when the theme is active.

Example routes file (`platform/themes/<your-theme>/routes/web.php`):

```php
<?php

use Botble\Base\Http\Middleware\RequiresJsonRequestMiddleware;
use Botble\Theme\Facades\Theme;
use Illuminate\Support\Facades\Route;
use Theme\YourTheme\Http\Controllers\YourThemeController;

Theme::registerRoutes(function (): void {
    Route::group(['controller' => YourThemeController::class], function (): void {
        // Regular routes
        Route::get('custom-page', 'getCustomPage')->name('public.custom-page');

        // AJAX routes
        Route::middleware(RequiresJsonRequestMiddleware::class)
            ->group(function (): void {
                Route::get('ajax/data', 'getAjaxData')->name('public.ajax.data');
            });
    });
});

// This loads the default theme routes
Theme::routes();
```

## Using Theme Functions

Theme functions are defined in the `platform/themes/<your-theme>/functions` directory. These functions can be used to customize your theme's behavior.

### Theme Options

Theme options are defined in `functions/theme-options.php`:

```php
<?php

use Botble\Theme\Events\RenderingThemeOptionSettings;

app('events')->listen(RenderingThemeOptionSettings::class, function (): void {
    theme_option()
        ->setField([
            'id' => 'custom_setting',
            'section_id' => 'opt-text-subsection-general',
            'type' => 'text',
            'label' => __('Custom Setting'),
            'attributes' => [
                'name' => 'custom_setting',
                'value' => null,
                'options' => [
                    'class' => 'form-control',
                    'placeholder' => __('Enter custom setting'),
                ],
            ],
        ]);
});
```

### Shortcodes

Theme shortcodes are defined in `functions/shortcodes.php`:

```php
<?php

use Botble\Shortcode\Compilers\ShortcodeCompiler;
use Botble\Theme\Facades\Theme;

shortcode()->register('custom-shortcode', __('Custom Shortcode'), __('Custom Shortcode Description'), function (ShortcodeCompiler $shortcode) {
    return Theme::partial('shortcodes.custom-shortcode', ['title' => $shortcode->title]);
});
```

## Accessing Theme Assets

You can access theme assets using the `Theme::asset()` helper:

```php
// Get URL to a theme asset
Theme::asset()->url('css/style.css');

// Add a CSS file to the theme
Theme::asset()->usePath()->add('custom-style', 'css/custom-style.css');

// Add a JS file to the footer
Theme::asset()->container('footer')->usePath()->add('custom-script', 'js/custom-script.js');
```

## Theme Configuration

Theme configuration is defined in the `config.php` file. This file allows you to define event listeners for various theme events:

```php
<?php

use Botble\Theme\Theme;

return [
    'events' => [
        // Before rendering the theme
        'beforeRenderTheme' => function (Theme $theme): void {
            // Add theme assets
            $theme->asset()->usePath()->add('main-css', 'css/main.css');
            $theme->asset()->container('footer')->usePath()->add('main-js', 'js/main.js');
        },

        // Before rendering a specific layout
        'beforeRenderLayout' => [
            'default' => function (Theme $theme): void {
                // Add layout-specific assets
            },
        ],
    ],
];
```

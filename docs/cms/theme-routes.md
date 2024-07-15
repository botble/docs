# Theme routes

Routes for theme are located in `/platform/themes/[your-theme]/routes/web.php`

Please add your custom routes on the top of file to make sure it is not overridden by default routes.

```php
<?php

// Custom routes
// You can delete this route group if you don't need to add your custom routes.
Route::group(['namespace' => 'Theme\[YourTheme]\Http\Controllers', 'middleware' => 'web'], function () {
    Route::group(apply_filters(BASE_FILTER_GROUP_PUBLIC_ROUTE, []), function () {

        // Add your custom route here
        // Ex: Route::get('hello', '[YourTheme]Controller@getHello');

    });

});

Theme::routes();
```

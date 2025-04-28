# Basic Components

This guide covers the basic components that make up a Botble CMS plugin.

## Database

### Migrations

After generating a plugin, it will create a first migration file in the `database/migrations` directory. You should modify this file before activating the plugin. When activating a plugin, its migrations will run automatically.

Example:

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up(): void
    {
        Schema::create('foo_items', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255);
            $table->string('description', 400)->nullable();
            $table->longText('content')->nullable();
            $table->string('status', 60)->default('published');
            $table->integer('user_id')->unsigned();
            $table->string('image', 255)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('foo_items');
    }
};
```

Migrations are used to create and modify database tables. Each migration file should:

- Have a descriptive name that indicates what it does
- Include both `up()` and `down()` methods
- Use the Schema builder to create or modify tables
- Follow Laravel's migration conventions

### Seeders

Seeders are used to populate your database with test data. They are located in the `database/seeders` directory.

Example:

```php
<?php

namespace Botble\Foo\Database\Seeders;

use Botble\Base\Supports\BaseSeeder;
use Botble\Foo\Models\Item;

class FooSeeder extends BaseSeeder
{
    public function run(): void
    {
        Item::truncate();

        for ($i = 1; $i <= 20; $i++) {
            Item::create([
                'name' => 'Sample Item ' . $i,
                'description' => 'This is a sample item',
                'content' => 'Detailed content for sample item ' . $i,
                'status' => 'published',
                'user_id' => 1,
            ]);
        }
    }
}
```

## Helpers

Helpers are utility functions and constants that can be used throughout your plugin.

### constants.php

This file defines all PHP constants for your plugin. It must have a constant for its screen name.

Example:

```php
if (!defined('FOO_MODULE_SCREEN_NAME')) {
    define('FOO_MODULE_SCREEN_NAME', 'foo');
}
```

The module screen name constant is used to identify your plugin in various parts of the system, such as when registering custom fields or hooks.

### helpers.php

This file contains utility functions specific to your plugin.

Example:

```php
if (!function_exists('foo_get_items')) {
    /**
     * Get a list of items
     *
     * @param int $limit
     * @param array $with
     * @return \Illuminate\Database\Eloquent\Collection
     */
    function foo_get_items(int $limit = 10, array $with = [])
    {
        return Item::query()
            ->where('status', 'published')
            ->orderBy('created_at', 'DESC')
            ->with($with)
            ->limit($limit)
            ->get();
    }
}
```

Helper functions should:

- Be wrapped in a `!function_exists()` check to avoid conflicts
- Have descriptive names prefixed with your plugin name
- Include proper PHPDoc comments
- Use dependency injection through the service container when possible

## Resources

The resources directory contains assets, language files, and views for your plugin.

### Language Files

Language files contain translations for your plugin's text. They are located in the `resources/lang/{locale}` directory.

Example (`resources/lang/en/foo.php`):

```php
return [
    'name' => 'Foo',
    'create' => 'New Item',
    'edit' => 'Edit Item',
    'items' => [
        'name' => 'Items',
        'create' => 'Create new item',
        'edit' => 'Edit item',
        'list' => 'List items',
        'menu' => 'Items',
        'settings' => 'Settings',
        'form' => [
            'name' => 'Name',
            'description' => 'Description',
            'content' => 'Content',
            'image' => 'Image',
            'status' => 'Status',
        ],
    ],
];
```

To support multiple languages, create additional language files in the appropriate directories. For example, for Vietnamese support, create `resources/lang/vi/foo.php`.

### Views

Views contain the HTML for your plugin's pages. They are located in the `resources/views` directory.

Example (`resources/views/create.blade.php`):

```php
{!! Form::open(['route' => 'foo.create']) !!}
    <div class="row">
        <div class="col-md-9">
            <div class="card">
                <div class="card-body">
                    <div class="form-group mb-3">
                        <label for="name">{{ trans('core/base::forms.name') }}</label>
                        <input type="text" class="form-control" name="name" id="name" value="{{ old('name') }}" placeholder="{{ trans('core/base::forms.name_placeholder') }}">
                    </div>

                    <div class="form-group mb-3">
                        <label for="description">{{ trans('core/base::forms.description') }}</label>
                        <textarea class="form-control" rows="4" name="description" id="description" placeholder="{{ trans('core/base::forms.description_placeholder') }}">{{ old('description') }}</textarea>
                    </div>

                    <div class="form-group mb-3">
                        <label for="content">{{ trans('core/base::forms.content') }}</label>
                        {!! Form::customEditor('content', old('content')) !!}
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card">
                <div class="card-body">
                    <div class="form-group mb-3">
                        <label for="status">{{ trans('core/base::tables.status') }}</label>
                        {!! Form::customSelect('status', \Botble\Base\Enums\BaseStatusEnum::labels(), old('status')) !!}
                    </div>

                    <div class="form-group mb-3">
                        <label>{{ trans('core/base::forms.image') }}</label>
                        {!! Form::mediaImage('image', old('image')) !!}
                    </div>
                </div>
            </div>

            <div class="mt-3">
                <button class="btn btn-primary" type="submit">{{ trans('core/base::forms.create') }}</button>
                <button class="btn btn-danger" type="reset">{{ trans('core/base::forms.reset') }}</button>
            </div>
        </div>
    </div>
{!! Form::close() !!}
```

### Assets

Assets include CSS, JavaScript, and image files for your plugin. They are located in the `resources/assets` directory.

Example structure:

```
resources/assets/
├── css/
│   └── foo.css
├── js/
│   └── foo.js
└── images/
    └── logo.png
```

To publish these assets to the public directory, add the following to your service provider's `boot()` method:

```php
$this->publishes([
    __DIR__ . '/../../resources/assets' => public_path('vendor/foo'),
], 'foo-assets');
```

## Routes

Routes define the URLs for your plugin's pages. They are located in the `routes` directory.

### Web Routes

Web routes are defined in `routes/web.php` and are used for browser-accessible pages.

Example:

```php
<?php

use Botble\Base\Facades\BaseHelper;
use Illuminate\Support\Facades\Route;
use Botble\Foo\Http\Controllers\FooController;

Route::group(['namespace' => 'Botble\Foo\Http\Controllers', 'middleware' => ['web', 'core']], function () {

    Route::group(['prefix' => BaseHelper::getAdminPrefix(), 'middleware' => 'auth'], function () {

        Route::group(['prefix' => 'foo', 'as' => 'foo.'], function () {
            Route::resource('', 'ItemController')->parameters(['' => 'item']);

            Route::delete('items/destroy', [
                'as' => 'deletes',
                'uses' => 'ItemController@deletes',
                'permission' => 'foo.destroy',
            ]);

            Route::get('settings', [
                'as' => 'settings',
                'uses' => 'FooController@getSettings',
                'permission' => 'foo.settings',
            ]);

            Route::post('settings', [
                'as' => 'settings.update',
                'uses' => 'FooController@postSettings',
                'permission' => 'foo.settings',
            ]);
        });
    });

    // Public routes (no auth required)
    if (defined('THEME_MODULE_SCREEN_NAME')) {
        Route::group([
            'prefix' => 'foo',
            'as' => 'public.foo.',
        ], function () {
            Route::get('', [
                'as' => 'index',
                'uses' => 'PublicController@index',
            ]);

            Route::get('{slug}', [
                'as' => 'detail',
                'uses' => 'PublicController@detail',
            ]);
        });
    }
});
```

### API Routes

API routes are defined in `routes/api.php` and are used for API endpoints.

Example:

```php
<?php

use Illuminate\Support\Facades\Route;

Route::group([
    'prefix' => 'api/v1',
    'namespace' => 'Botble\Foo\Http\Controllers\API',
    'middleware' => ['api'],
], function () {

    Route::get('items', [
        'as' => 'api.foo.index',
        'uses' => 'ItemController@index',
    ]);

    Route::get('items/{id}', [
        'as' => 'api.foo.show',
        'uses' => 'ItemController@show',
    ]);
});
```

Routes should be organized by:

- Authentication requirements (auth vs. public)
- Purpose (admin vs. public)
- HTTP method (GET, POST, etc.)
- Resource type (following RESTful conventions)

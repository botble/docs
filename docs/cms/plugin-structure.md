# Plugin Structure

## Introduction

Plugins in Botble CMS follow a modular architecture that allows for easy extension of the core functionality. Each plugin is a self-contained module with its own controllers, models, views, and assets.

All plugins are registered to Composer autoloader manually. Each plugin requires a `plugin.json` file to provide all needed information for auto-loading.

## Directory Structure

When you create a new plugin using the `php artisan cms:plugin:create` command, it generates the following directory structure:

```
platform/plugins/foo/
├── config/
│   └── permissions.php
├── database/
│   ├── migrations/
│   └── seeders/
├── helpers/
├── resources/
│   ├── assets/
│   ├── lang/
│   └── views/
├── routes/
│   └── web.php
├── src/
│   ├── Forms/
│   ├── Http/
│   │   ├── Controllers/
│   │   └── Requests/
│   ├── Models/
│   ├── Providers/
│   │   └── FooServiceProvider.php
│   ├── Repositories/
│   └── Plugin.php
└── plugin.json
```



## Key Components

### plugin.json

This file contains metadata about your plugin, including its name, namespace, provider, author, and description. It's required for every plugin and serves as the plugin's manifest.

Example:

```json
{
    "name": "Foo",
    "namespace": "Botble\\Foo\\",
    "provider": "Botble\\Foo\\Providers\\FooServiceProvider",
    "author": "Your Name",
    "url": "https://yourwebsite.com",
    "version": "1.0",
    "description": "A simple foo plugin for Botble CMS",
    "minimum_core_version": "7.3.0"
}
```

The fields in the plugin.json file are:

- `name`: The display name of your plugin
- `namespace`: The PHP namespace of your plugin (must end with a double backslash)
- `provider`: The fully qualified class name of your plugin's service provider
- `author`: The name of the plugin author
- `url`: The website URL of the plugin or author
- `version`: The version number of the plugin
- `description`: A brief description of what the plugin does
- `minimum_core_version`: The minimum version of Botble CMS required to run this plugin

### Plugin.php

This file handles the plugin lifecycle events: activation, deactivation, and removal. It implements the `PluginInterface` or extends `PluginOperationAbstract`.

Example:

```php
<?php

namespace Botble\Foo;

use Botble\PluginManagement\Abstracts\PluginOperationAbstract;
use Illuminate\Support\Facades\Schema;
use Botble\Setting\Facades\Setting;

class Plugin extends PluginOperationAbstract
{
    public static function activate(): void
    {
        // Logic to run when the plugin is activated
        // For example, you might want to set default settings
        Setting::set('foo_items_per_page', 10)->save();
    }

    public static function deactivate(): void
    {
        // Logic to run when the plugin is deactivated
    }

    public static function remove(): void
    {
        // Clean up when the plugin is removed
        Schema::dropIfExists('foo_items');
        Schema::dropIfExists('foo_categories');

        // Remove plugin settings
        Setting::delete(['foo_items_per_page', 'foo_display_author']);
    }
}
```

The Plugin class has three main methods:

- `activate()`: Called when the plugin is activated. Use this to initialize any settings or data your plugin needs.
- `deactivate()`: Called when the plugin is deactivated but not removed. Use this to temporarily disable functionality.
- `remove()`: Called when the plugin is completely removed. Use this to clean up database tables, settings, and any other data created by your plugin.

### Configuration Files

#### permissions.php

Each plugin should have a configuration for permissions. Permissions are defined in code so we need to specify them in this file.

Example:

```php
return [
    [
        'name' => 'Foo',
        'flag' => 'foo.index',
    ],
    [
        'name' => 'Create',
        'flag' => 'foo.create',
        'parent_flag' => 'foo.index',
    ],
    [
        'name' => 'Edit',
        'flag' => 'foo.edit',
        'parent_flag' => 'foo.index',
    ],
    [
        'name' => 'Delete',
        'flag' => 'foo.destroy',
        'parent_flag' => 'foo.index',
    ],
];
```

The permissions configuration consists of an array of permission definitions:

- `name`: The display name of the permission
- `flag`: The unique identifier for the permission, typically following the format `plugin.action`
- `parent_flag`: Optional parent permission flag for hierarchical permissions

### Database

#### Migrations

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

#### Seeders

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

### Helpers

Helpers are utility functions and constants that can be used throughout your plugin.

#### constants.php

This file defines all PHP constants for your plugin. It must have a constant for its screen name.

Example:

```php
if (!defined('FOO_MODULE_SCREEN_NAME')) {
    define('FOO_MODULE_SCREEN_NAME', 'foo');
}
```

The module screen name constant is used to identify your plugin in various parts of the system, such as when registering custom fields or hooks.

#### helpers.php

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
        return app(ItemInterface::class)->advancedGet([
            'condition' => [
                'status' => 'published',
            ],
            'order_by' => [
                'created_at' => 'DESC',
            ],
            'take' => $limit,
            'with' => $with,
        ]);
    }
}
```

Helper functions should:

- Be wrapped in a `!function_exists()` check to avoid conflicts
- Have descriptive names prefixed with your plugin name
- Include proper PHPDoc comments
- Use dependency injection through the service container when possible

### Resources

The resources directory contains assets, language files, and views for your plugin.

#### Language Files

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

#### Views

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

#### Assets

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

### Routes

Routes define the URLs for your plugin's pages. They are located in the `routes` directory.

#### Web Routes

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

#### API Routes

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

### Source Code

The `src` directory contains the PHP source code for your plugin, organized into subdirectories by purpose.

#### Models

Models represent database tables and define relationships between entities. They are located in the `src/Models` directory.

Example (`src/Models/Item.php`):

```php
<?php

namespace Botble\Foo\Models;

use Botble\Base\Casts\SafeContent;
use Botble\Base\Enums\BaseStatusEnum;
use Botble\Base\Models\BaseModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Item extends BaseModel
{
    protected $table = 'foo_items';

    protected $fillable = [
        'name',
        'description',
        'content',
        'status',
        'user_id',
        'image',
    ];

    protected $casts = [
        'status' => BaseStatusEnum::class,
        'name' => SafeContent::class,
        'description' => SafeContent::class,
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(\Botble\ACL\Models\User::class, 'user_id');
    }
}
```

#### Controllers

Controllers handle HTTP requests and return responses. They are located in the `src/Http/Controllers` directory.

Example (`src/Http/Controllers/ItemController.php`):

```php
<?php

namespace Botble\Foo\Http\Controllers;

use Botble\Base\Events\CreatedContentEvent;
use Botble\Base\Events\DeletedContentEvent;
use Botble\Base\Events\UpdatedContentEvent;
use Botble\Base\Http\Controllers\BaseController;
use Botble\Base\Http\Responses\BaseHttpResponse;
use Botble\Foo\Forms\ItemForm;
use Botble\Foo\Http\Requests\ItemRequest;
use Botble\Foo\Models\Item;
use Botble\Foo\Tables\ItemTable;
use Exception;
use Illuminate\Http\Request;

class ItemController extends BaseController
{
    public function index(ItemTable $table)
    {
        $this->pageTitle(trans('plugins/foo::items.name'));

        return $table->renderTable();
    }

    public function create()
    {
        $this->pageTitle(trans('plugins/foo::items.create'));

        return ItemForm::create()->renderForm();
    }

    public function store(ItemRequest $request, BaseHttpResponse $response)
    {
        $item = Item::query()->create($request->validated());

        event(new CreatedContentEvent(FOO_MODULE_SCREEN_NAME, $request, $item));

        return $response
            ->setPreviousUrl(route('foo.index'))
            ->setNextUrl(route('foo.edit', $item->id))
            ->setMessage(trans('core/base::notices.create_success_message'));
    }

    public function edit(Item $item)
    {
        $this->pageTitle(trans('plugins/foo::items.edit') . ' "' . $item->name . '"');

        return ItemForm::createFromModel($item)->renderForm();
    }

    public function update(Item $item, ItemRequest $request, BaseHttpResponse $response)
    {
        $item->update($request->validated());

        event(new UpdatedContentEvent(FOO_MODULE_SCREEN_NAME, $request, $item));

        return $response
            ->setPreviousUrl(route('foo.index'))
            ->setMessage(trans('core/base::notices.update_success_message'));
    }

    public function destroy(Item $item, Request $request, BaseHttpResponse $response)
    {
        try {
            $item->delete();

            event(new DeletedContentEvent(FOO_MODULE_SCREEN_NAME, $request, $item));

            return $response->setMessage(trans('core/base::notices.delete_success_message'));
        } catch (Exception $exception) {
            return $response
                ->setError()
                ->setMessage($exception->getMessage());
        }
    }
}
```

#### Requests

Requests handle validation of form submissions. They are located in the `src/Http/Requests` directory.

Example (`src/Http/Requests/ItemRequest.php`):

```php
<?php

namespace Botble\Foo\Http\Requests;

use Botble\Base\Enums\BaseStatusEnum;
use Botble\Support\Http\Requests\Request;
use Illuminate\Validation\Rule;

class ItemRequest extends Request
{
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:400',
            'content' => 'nullable|string',
            'status' => Rule::in(BaseStatusEnum::values()),
            'image' => 'nullable|string|max:255',
        ];
    }

    public function attributes(): array
    {
        return [
            'name' => trans('plugins/foo::items.form.name'),
            'description' => trans('plugins/foo::items.form.description'),
            'content' => trans('plugins/foo::items.form.content'),
            'status' => trans('core/base::tables.status'),
            'image' => trans('core/base::forms.image'),
        ];
    }
}
```

#### Forms

Forms handle the creation and editing of models. They are located in the `src/Forms` directory.

Example (`src/Forms/ItemForm.php`):

```php
<?php

namespace Botble\Foo\Forms;

use Botble\Base\Enums\BaseStatusEnum;
use Botble\Base\Forms\FieldOptions\TextFieldOption;
use Botble\Base\Forms\FieldOptions\TextareaFieldOption;
use Botble\Base\Forms\FieldOptions\SelectFieldOption;
use Botble\Base\Forms\FieldOptions\MediaImageFieldOption;
use Botble\Base\Forms\Fields\TextField;
use Botble\Base\Forms\Fields\TextareaField;
use Botble\Base\Forms\Fields\SelectField;
use Botble\Base\Forms\Fields\MediaImageField;
use Botble\Base\Forms\Fields\EditorField;
use Botble\Base\Forms\FormAbstract;
use Botble\Foo\Http\Requests\ItemRequest;
use Botble\Foo\Models\Item;

class ItemForm extends FormAbstract
{
    public function buildForm(): void
    {
        $this
            ->setupModel(new Item())
            ->setValidatorClass(ItemRequest::class)
            ->withCustomFields()
            ->add('name', TextField::class, TextFieldOption::make()
                ->label(trans('core/base::forms.name'))
                ->placeholder(trans('core/base::forms.name_placeholder'))
                ->required()
            )
            ->add('description', TextareaField::class, TextareaFieldOption::make()
                ->label(trans('core/base::forms.description'))
                ->placeholder(trans('core/base::forms.description_placeholder'))
                ->rows(4)
            )
            ->add('content', EditorField::class, [
                'label' => trans('core/base::forms.content'),
                'placeholder' => trans('core/base::forms.content_placeholder'),
                'rows' => 4,
            ])
            ->add('status', SelectField::class, SelectFieldOption::make()
                ->label(trans('core/base::tables.status'))
                ->choices(BaseStatusEnum::labels())
            )
            ->add('image', MediaImageField::class, MediaImageFieldOption::make()
                ->label(trans('core/base::forms.image'))
            )
            ->setBreakFieldPoint('status');
    }
}
```

#### Tables

Tables handle the display of data in the admin panel. They are located in the `src/Tables` directory.

Example (`src/Tables/ItemTable.php`):

```php
<?php

namespace Botble\Foo\Tables;

use Botble\Base\Enums\BaseStatusEnum;
use Botble\Foo\Models\Item;
use Botble\Table\Abstracts\TableAbstract;
use Botble\Table\Actions\DeleteAction;
use Botble\Table\Actions\EditAction;
use Botble\Table\BulkActions\DeleteBulkAction;
use Botble\Table\Columns\CreatedAtColumn;
use Botble\Table\Columns\IdColumn;
use Botble\Table\Columns\NameColumn;
use Botble\Table\Columns\StatusColumn;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;

class ItemTable extends TableAbstract
{
    public function setup(): void
    {
        $this
            ->model(Item::class)
            ->addActions([
                EditAction::make()
                    ->route('foo.edit'),
                DeleteAction::make()
                    ->route('foo.destroy'),
            ]);
    }

    public function columns(): array
    {
        return [
            IdColumn::make(),
            NameColumn::make()->route('foo.edit'),
            CreatedAtColumn::make(),
            StatusColumn::make(),
        ];
    }

    public function buttons(): array
    {
        return $this->addCreateButton(route('foo.create'));
    }

    public function bulkActions(): array
    {
        return [
            DeleteBulkAction::make()->permission('foo.destroy'),
        ];
    }

    public function getFilters(): array
    {
        return [
            'name' => [
                'title' => trans('core/base::tables.name'),
                'type' => 'text',
                'validate' => 'required|string|max:120',
            ],
            'status' => [
                'title' => trans('core/base::tables.status'),
                'type' => 'select',
                'choices' => BaseStatusEnum::labels(),
                'validate' => 'required|in:' . implode(',', BaseStatusEnum::values()),
            ],
            'created_at' => [
                'title' => trans('core/base::tables.created_at'),
                'type' => 'date',
            ],
        ];
    }
}
```

#### Repositories

Repositories handle data access and business logic. They are located in the `src/Repositories` directory.

Example interface (`src/Repositories/Interfaces/ItemInterface.php`):

```php
<?php

namespace Botble\Foo\Repositories\Interfaces;

use Botble\Support\Repositories\Interfaces\RepositoryInterface;

interface ItemInterface extends RepositoryInterface
{
}
```

Example implementation (`src/Repositories/Eloquent/ItemRepository.php`):

```php
<?php

namespace Botble\Foo\Repositories\Eloquent;

use Botble\Support\Repositories\Eloquent\RepositoriesAbstract;
use Botble\Foo\Repositories\Interfaces\ItemInterface;

class ItemRepository extends RepositoriesAbstract implements ItemInterface
{
}
```

### Service Provider

The service provider is the main entry point of your plugin. It registers routes, views, translations, and other resources. A plugin must have this file.

#### Modern Service Provider Pattern (Recommended)

The current Botble CMS v7.6.0 uses a streamlined pattern with the `LoadAndPublishDataTrait`:

```php
<?php

namespace Botble\Foo\Providers;

use Botble\Base\Facades\DashboardMenu;
use Botble\Base\Traits\LoadAndPublishDataTrait;
use Botble\Foo\Models\Item;
use Botble\Foo\Repositories\Interfaces\ItemInterface;
use Botble\Foo\Repositories\Eloquent\ItemRepository;
use Illuminate\Support\ServiceProvider;

class FooServiceProvider extends ServiceProvider
{
    use LoadAndPublishDataTrait;

    public function register(): void
    {
        // Register bindings for repositories and services
        $this->app->bind(ItemInterface::class, function () {
            return new ItemRepository(new Item());
        });
    }

    public function boot(): void
    {
        $this
            ->setNamespace('plugins/foo')
            ->loadAndPublishConfigurations(['permissions'])
            ->loadMigrations()
            ->loadAndPublishTranslations()
            ->loadAndPublishViews()
            ->loadRoutes(['web']);

        // Register menu items
        DashboardMenu::default()->beforeRetrieving(function (): void {
            DashboardMenu::make()
                ->registerItem([
                    'id' => 'cms-plugins-foo',
                    'priority' => 5,
                    'parent_id' => null,
                    'name' => 'plugins/foo::foo.name',
                    'icon' => 'ti ti-box',
                    'url' => route('foo.index'),
                    'permissions' => ['foo.index'],
                ]);
        });

        // Additional hooks or initialization
        $this->app->booted(function () {
            // Code to run after the application is fully booted
        });
    }
}
```

#### Service Provider Methods

The service provider has two main lifecycle methods:

**`register()` Method**
- Called first when the application boots
- Used to bind implementations to the service container
- Register repositories, services, and dependencies here
- Avoid registering routes, views, or running queries in register()

```php
public function register(): void
{
    // Bind interfaces to implementations
    $this->app->bind(ItemInterface::class, ItemRepository::class);

    // Bind singletons for shared instances
    $this->app->singleton('my-service', MyService::class);

    // Register event/action listeners
    $this->listen();
}
```

**`boot()` Method**
- Called after all service providers have been registered
- Safe place to access other services and perform setup
- Register routes, views, translations, and assets here
- Hook into application events here

```php
public function boot(): void
{
    // Load and publish plugin data
    $this
        ->setNamespace('plugins/foo')
        ->loadHelpers()
        ->loadAndPublishConfigurations(['permissions', 'settings'])
        ->loadAndPublishTranslations()
        ->loadAndPublishViews()
        ->loadMigrations()
        ->loadRoutes(['web', 'api']);

    // Register event listeners
    $this->registerEventListeners();

    // Register hooks/actions/filters
    $this->registerHooks();
}
```

#### LoadAndPublishDataTrait Methods

The `LoadAndPublishDataTrait` simplifies plugin setup with these helper methods:

```php
use Botble\Base\Traits\LoadAndPublishDataTrait;

class FooServiceProvider extends ServiceProvider
{
    use LoadAndPublishDataTrait;

    public function boot(): void
    {
        $this
            // Set the namespace for all plugin assets
            ->setNamespace('plugins/foo')

            // Load helper functions from helpers/ directory
            ->loadHelpers()

            // Load and publish configuration files
            ->loadAndPublishConfigurations(['permissions', 'settings'])

            // Load and publish migration files
            ->loadMigrations()

            // Load and publish language/translation files
            ->loadAndPublishTranslations()

            // Load and publish view files
            ->loadAndPublishViews()

            // Load route files (specify middleware groups)
            ->loadRoutes(['web'])

            // Publish additional files
            ->publishAssets();
    }
}
```

#### Multiple Service Providers (Advanced Pattern)

For larger plugins, you can split functionality into multiple service providers:

**Main Service Provider** (`FooServiceProvider.php`):
```php
public function boot(): void
{
    $this
        ->setNamespace('plugins/foo')
        ->loadAndPublishConfigurations(['permissions'])
        ->loadMigrations()
        ->loadAndPublishTranslations()
        ->loadAndPublishViews()
        ->loadRoutes(['web']);

    // Register other service providers
    $this->app->register(EventServiceProvider::class);
    $this->app->register(HookServiceProvider::class);
}
```

**Event Service Provider** (`EventServiceProvider.php`):
```php
namespace Botble\Foo\Providers;

use Botble\Foo\Events\ItemCreated;
use Botble\Foo\Listeners\SendItemNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        ItemCreated::class => [
            SendItemNotification::class,
        ],
    ];
}
```

**Hook Service Provider** (`HookServiceProvider.php`):
```php
namespace Botble\Foo\Providers;

use Illuminate\Support\ServiceProvider;

class HookServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        // Register action hooks
        add_action('BASE_ACTION_ENQUEUE_SCRIPTS', function () {
            // Register plugin scripts
        });

        // Register filter hooks
        add_filter('BASE_FILTER_DASHBOARD_MENU', function ($menu) {
            // Modify dashboard menu
            return $menu;
        });
    }
}
```

#### Complete Service Provider Example with All Features

```php
<?php

namespace Botble\Foo\Providers;

use Botble\Base\Facades\BaseHelper;
use Botble\Base\Facades\DashboardMenu;
use Botble\Base\Traits\LoadAndPublishDataTrait;
use Botble\Foo\Models\Item;
use Botble\Foo\Repositories\Interfaces\ItemInterface;
use Botble\Foo\Repositories\Eloquent\ItemRepository;
use Botble\Foo\Http\Middleware\CheckFooPermission;
use Illuminate\Support\ServiceProvider;
use Illuminate\Routing\Router;

class FooServiceProvider extends ServiceProvider
{
    use LoadAndPublishDataTrait;

    public function register(): void
    {
        // Register repository bindings
        $this->app->bind(ItemInterface::class, function () {
            return new ItemRepository(new Item());
        });

        // Register singleton services
        $this->app->singleton('foo-service', FooService::class);
    }

    public function boot(): void
    {
        // Load and publish plugin resources
        $this
            ->setNamespace('plugins/foo')
            ->loadHelpers()
            ->loadAndPublishConfigurations(['permissions', 'settings'])
            ->loadMigrations()
            ->loadAndPublishTranslations()
            ->loadAndPublishViews()
            ->loadRoutes(['web', 'api']);

        // Register middleware
        $this->registerMiddleware();

        // Register dashboard menu items
        $this->registerDashboardMenu();

        // Register hooks and filters
        $this->registerHooks();

        // Register event listeners
        if (class_exists(EventServiceProvider::class)) {
            $this->app->register(EventServiceProvider::class);
        }
    }

    protected function registerMiddleware(): void
    {
        $router = $this->app['router'];
        $router->aliasMiddleware('foo.permission', CheckFooPermission::class);
    }

    protected function registerDashboardMenu(): void
    {
        DashboardMenu::default()->beforeRetrieving(function (): void {
            DashboardMenu::make()
                ->registerItem([
                    'id' => 'cms-plugins-foo',
                    'priority' => 5,
                    'parent_id' => null,
                    'name' => 'plugins/foo::foo.name',
                    'icon' => 'ti ti-box',
                    'url' => route('foo.index'),
                    'permissions' => ['foo.index'],
                ]);
        });
    }

    protected function registerHooks(): void
    {
        // Register action hooks
        add_action(BASE_ACTION_ENQUEUE_SCRIPTS, function () {
            Assets::addScriptsDirectly([
                'vendor/core/plugins/foo/js/foo.js',
            ])->addStylesDirectly([
                'vendor/core/plugins/foo/css/foo.css',
            ]);
        });

        // Register filter hooks
        add_filter(BASE_FILTER_DASHBOARD_MENU, function ($menu) {
            // Customize dashboard menu
            return $menu;
        });
    }
}
```

#### Best Practices for Service Providers

1. **Register Early, Boot Late**: Only register bindings in `register()`, do everything else in `boot()`
2. **Use Traits**: Leverage `LoadAndPublishDataTrait` to reduce boilerplate
3. **Organize with Multiple Providers**: Split large providers into focused, single-responsibility providers
4. **Defer Loading**: For optional features, load providers conditionally based on plugin settings
5. **Document Dependencies**: Check that required plugins/packages are installed before registering features

Example of conditional provider loading:

```php
public function boot(): void
{
    // Only register features if plugin is active
    if (!is_plugin_active('my-dependency')) {
        return;
    }

    $this
        ->setNamespace('plugins/foo')
        ->loadRoutes(['web']);
}
```

## Best Practices

### Naming Conventions

- **Plugin Name**: Use PascalCase for plugin names (e.g., `Foo`, `Ecommerce`)
- **Database Tables**: Prefix tables with your plugin name (e.g., `foo_items`, `foo_categories`)
- **Routes**: Use kebab-case for route names (e.g., `foo.items.create`)
- **Translation Keys**: Use dot notation and lowercase (e.g., `plugins/foo::items.create`)
- **Constants**: Use SCREAMING_SNAKE_CASE for constants (e.g., `FOO_MODULE_SCREEN_NAME`)
- **Classes**: Use PascalCase for class names (e.g., `ItemController`, `FooServiceProvider`)
- **Methods**: Use camelCase for method names (e.g., `getItems()`, `createItem()`)
- **Variables**: Use snake_case for variables (e.g., `$item_count`, `$user_id`)

### Code Organization

- Keep your code organized in appropriate directories
- Use namespaces consistently
- Follow PSR-12 coding standards
- Use type hints and return types in PHP 8.2+
- Add proper PHPDoc comments to all classes and methods

### Security

- Always validate user input using Request classes
- Use the permission system to restrict access to features
- Sanitize output using the `SafeContent` cast
- Use Laravel's built-in protection against CSRF, XSS, and SQL injection

### Performance

- Use eager loading to avoid N+1 query problems
- Cache frequently accessed data
- Optimize database queries
- Use indexes on database columns that are frequently queried

## Advanced Plugin Development

### Creating Custom Database Seeders

Seeders are useful for populating your database with test data or default content. To create a custom seeder for your plugin:

1. Create a seeder class in the `database/seeders` directory
2. Register the seeder in your plugin's service provider

Example seeder registration in your service provider:

```php
if (app()->environment() !== 'production') {
    $this->app->register(
        \Botble\Foo\Database\Seeders\FooSeederProvider::class
    );
}
```

### Creating Commands

You can add custom Artisan commands to your plugin by creating command classes in the `src/Commands` directory.

Example command class (`src/Commands/GenerateFooCommand.php`):

```php
<?php

namespace Botble\Foo\Commands;

use Illuminate\Console\Command;

class GenerateFooCommand extends Command
{
    protected $signature = 'foo:generate {name : The name of the item}';

    protected $description = 'Generate a new foo item';

    public function handle(): int
    {
        $name = $this->argument('name');

        // Your command logic here
        $this->info("Generated new foo item: {$name}");

        return self::SUCCESS;
    }
}
```

Register the command in your service provider:

```php
if ($this->app->runningInConsole()) {
    $this->commands([
        \Botble\Foo\Commands\GenerateFooCommand::class,
    ]);
}
```

### Creating Events and Listeners

Events and listeners allow you to decouple various aspects of your application. To add events to your plugin:

1. Create event classes in the `src/Events` directory
2. Create listener classes in the `src/Listeners` directory
3. Register them in an event service provider

Example event (`src/Events/FooCreated.php`):

```php
<?php

namespace Botble\Foo\Events;

use Botble\Foo\Models\Item;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class FooCreated
{
    use Dispatchable, SerializesModels;

    public function __construct(public Item $item)
    {
    }
}
```

Example listener (`src/Listeners/SendFooCreatedNotification.php`):

```php
<?php

namespace Botble\Foo\Listeners;

use Botble\Foo\Events\FooCreated;

class SendFooCreatedNotification
{
    public function handle(FooCreated $event): void
    {
        // Send notification logic here
    }
}
```

Register in an event service provider (`src/Providers/EventServiceProvider.php`):

```php
<?php

namespace Botble\Foo\Providers;

use Botble\Foo\Events\FooCreated;
use Botble\Foo\Listeners\SendFooCreatedNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        FooCreated::class => [
            SendFooCreatedNotification::class,
        ],
    ];
}
```

Then register this provider in your main service provider:

```php
public function register(): void
{
    $this->app->register(EventServiceProvider::class);
}
```

### Creating Middleware

Middleware provides a convenient mechanism for filtering HTTP requests entering your application. To add middleware to your plugin:

1. Create middleware classes in the `src/Http/Middleware` directory
2. Register them in your service provider

Example middleware (`src/Http/Middleware/CheckFooPermission.php`):

```php
<?php

namespace Botble\Foo\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckFooPermission
{
    public function handle(Request $request, Closure $next)
    {
        if (!Auth::user()->hasPermission('foo.index')) {
            return redirect()->route('dashboard.index');
        }

        return $next($request);
    }
}
```

Register in your service provider:

```php
protected function registerMiddlewares(): void
{
    $this->app['router']->aliasMiddleware('foo.permission', \Botble\Foo\Http\Middleware\CheckFooPermission::class);
}

public function boot(): void
{
    // ...
    $this->registerMiddlewares();
}
```

### Creating Facades

Facades provide a static interface to classes that are available in the application's service container. To create a facade for your plugin:

1. Create a facade class in the `src/Facades` directory
2. Register the underlying class in your service provider

Example facade (`src/Facades/FooHelper.php`):

```php
<?php

namespace Botble\Foo\Facades;

use Botble\Foo\Supports\FooHelper as FooHelperSupport;
use Illuminate\Support\Facades\Facade;

/**
 * @method static array getItems(array $args = [])
 *
 * @see \Botble\Foo\Supports\FooHelper
 */
class FooHelper extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return 'foo-helper';
    }
}
```

Implementation class (`src/Supports/FooHelper.php`):

```php
<?php

namespace Botble\Foo\Supports;

use Botble\Foo\Repositories\Interfaces\ItemInterface;

class FooHelper
{
    public function __construct(protected ItemInterface $itemRepository)
    {
    }

    public function getItems(array $args = []): array
    {
        return $this->itemRepository->advancedGet([
            'condition' => [
                'status' => 'published',
            ],
            'order_by' => [
                'created_at' => 'DESC',
            ],
            'take' => $args['limit'] ?? 10,
            'with' => $args['with'] ?? [],
        ]);
    }
}
```

Register in your service provider:

```php
public function register(): void
{
    $this->app->bind('foo-helper', function () {
        return new FooHelper(
            app(ItemInterface::class)
        );
    });
}
```

## Frequently Asked Questions

### How do I add a settings page for my plugin?

To add a settings page:

1. Create a controller method to handle the settings form
2. Register a route for the settings page
3. Add the settings page to the CMS settings menu

Example controller methods:

```php
public function getSettings()
{
    $this->pageTitle(trans('plugins/foo::foo.settings'));

    return view('plugins/foo::settings', [
        'itemsPerPage' => setting('foo_items_per_page', 10),
        'displayAuthor' => setting('foo_display_author', true),
    ]);
}

public function postSettings(Request $request, BaseHttpResponse $response)
{
    setting([
        'foo_items_per_page' => $request->input('foo_items_per_page'),
        'foo_display_author' => $request->input('foo_display_author'),
    ])->save();

    return $response
        ->setMessage(trans('core/base::notices.update_success_message'));
}
```

Add to settings menu in your service provider:

```php
if (defined('SETTING_MODULE_SCREEN_NAME')) {
    add_filter('cms_settings_pages', function ($pages) {
        return array_merge($pages, [
            'foo' => [
                'name' => 'plugins/foo::foo.settings',
                'icon' => 'ti ti-box',
                'view' => 'plugins/foo::settings',
                'route' => 'foo.settings',
            ],
        ]);
    });
}
```

### How do I add custom validation rules?

To add custom validation rules:

1. Create a rule class in the `src/Rules` directory
2. Use the rule in your request classes

Example rule (`src/Rules/UniqueItemSlug.php`):

```php
<?php

namespace Botble\Foo\Rules;

use Botble\Foo\Repositories\Interfaces\ItemInterface;
use Illuminate\Contracts\Validation\Rule;

class UniqueItemSlug implements Rule
{
    protected int $itemId;

    public function __construct(int $itemId = 0)
    {
        $this->itemId = $itemId;
    }

    public function passes($attribute, $value): bool
    {
        $itemRepository = app(ItemInterface::class);

        $item = $itemRepository->getFirstBy(['slug' => $value]);

        if (!$item) {
            return true;
        }

        if ($item->id === $this->itemId) {
            return true;
        }

        return false;
    }

    public function message(): string
    {
        return trans('plugins/foo::validation.slug_unique');
    }
}
```

Usage in a request class:

```php
public function rules(): array
{
    return [
        'slug' => ['required', 'string', 'max:255', new UniqueItemSlug($this->route('item'))],
    ];
}
```

### How do I add a widget to the dashboard?

To add a widget to the dashboard:

1. Create a widget class in the `src/Widgets` directory
2. Register the widget in your service provider

Example widget (`src/Widgets/RecentItemsWidget.php`):

```php
<?php

namespace Botble\Foo\Widgets;

use Botble\Base\Widgets\Card;
use Botble\Foo\Repositories\Interfaces\ItemInterface;

class RecentItemsWidget extends Card
{
    public function __construct(protected ItemInterface $itemRepository)
    {
        parent::__construct();

        $this->setTitle(trans('plugins/foo::foo.recent_items'));
        $this->setIcon('ti ti-box');
        $this->setColor('#f3c200');
        $this->setRoute(route('foo.index'));
        $this->setPermission('foo.index');
    }

    public function getStats(): int
    {
        return $this->itemRepository->count(['status' => 'published']);
    }
}
```

Register in your service provider:

```php
public function boot(): void
{
    // ...

    add_filter(DASHBOARD_FILTER_ADMIN_LIST, function ($widgets) {
        return (new RecentItemsWidget(app(ItemInterface::class)))
            ->setColumn('col-md-3 col-sm-6')
            ->init($widgets);
    }, 9, 1);
}
```

### How do I add a custom filter to a table?

To add a custom filter to a table:

1. Override the `getFilters()` method in your table class
2. Add your custom filter logic

Example custom filter:

```php
public function getFilters(): array
{
    return [
        'category_id' => [
            'title' => trans('plugins/foo::foo.category'),
            'type' => 'select',
            'choices' => app(CategoryInterface::class)->pluck('name', 'id'),
            'validate' => 'required|integer',
        ],
        'status' => [
            'title' => trans('core/base::tables.status'),
            'type' => 'select',
            'choices' => BaseStatusEnum::labels(),
            'validate' => 'required|in:' . implode(',', BaseStatusEnum::values()),
        ],
        'created_at' => [
            'title' => trans('core/base::tables.created_at'),
            'type' => 'date',
        ],
    ];
}

public function applyFilterCondition($query, string $key, string $operator, ?string $value)
{
    switch ($key) {
        case 'category_id':
            if (!$value) {
                break;
            }

            return $query->whereHas('categories', function ($query) use ($value) {
                return $query->where('foo_item_categories.category_id', $value);
            });

        default:
            return parent::applyFilterCondition($query, $key, $operator, $value);
    }
}
```

### How do I add a custom action button to a table?

To add a custom action button to a table:

1. Create a custom action class in the `src/Tables/Actions` directory
2. Add the action to your table's `addActions()` method

Example custom action (`src/Tables/Actions/DuplicateAction.php`):

```php
<?php

namespace Botble\Foo\Tables\Actions;

use Botble\Table\Actions\Action;

class DuplicateAction extends Action
{
    public static function make(string $name = 'duplicate'): static
    {
        return parent::make($name)
            ->label(trans('plugins/foo::foo.duplicate'))
            ->color('primary')
            ->icon('ti ti-copy')
            ->attributes([
                'data-action' => 'duplicate',
            ]);
    }
}
```

Add to your table class:

```php
public function setup(): void
{
    $this
        ->model(Item::class)
        ->addActions([
            EditAction::make()
                ->route('foo.edit'),
            DuplicateAction::make()
                ->route('foo.duplicate'),
            DeleteAction::make()
                ->route('foo.destroy'),
        ]);
}
```

### How do I add a relationship between my plugin's models?

To add relationships between models:

1. Define the relationship methods in your model classes
2. Set up the necessary foreign keys in your migrations

Example one-to-many relationship:

In your migration:

```php
Schema::create('foo_categories', function (Blueprint $table) {
    $table->id();
    $table->string('name', 255);
    $table->string('slug', 255)->unique();
    $table->string('status', 60)->default('published');
    $table->timestamps();
});

Schema::create('foo_items', function (Blueprint $table) {
    $table->id();
    $table->string('name', 255);
    $table->string('description', 400)->nullable();
    $table->longText('content')->nullable();
    $table->string('status', 60)->default('published');
    $table->foreignId('category_id')->nullable()->references('id')->on('foo_categories')->onDelete('set null');
    $table->timestamps();
});
```

In your Category model:

```php
public function items(): HasMany
{
    return $this->hasMany(Item::class, 'category_id');
}
```

In your Item model:

```php
public function category(): BelongsTo
{
    return $this->belongsTo(Category::class, 'category_id');
}
```

### How do I add SEO metadata to my plugin's content?

To add SEO metadata to your plugin's content:

1. Use the SeoHelper facade in your controllers
2. Add SEO fields to your forms

Example in a controller:

```php
public function show($slug)
{
    $item = $this->itemRepository->getFirstBy(['slug' => $slug, 'status' => 'published']);

    if (!$item) {
        abort(404);
    }

    SeoHelper::setTitle($item->name)
        ->setDescription($item->description)
        ->setImage(RvMedia::getImageUrl($item->image))
        ->setUrl($item->url);

    return view('plugins/foo::themes.show', compact('item'));
}
```

Adding SEO fields to a form:

```php
->add('seo_meta', 'seoMeta', [
    'label' => trans('packages/seo-helper::seo-helper.meta_box_header'),
]);
```

### How do I create a plugin that depends on another plugin?

To create a plugin that depends on another plugin:

1. Check for the dependency in your plugin's service provider
2. Register your plugin's services conditionally

Example dependency check:

```php
public function register(): void
{
    if (!is_plugin_active('other-plugin')) {
        return;
    }

    // Register your plugin's services here
    $this->app->bind(ItemInterface::class, function () {
        return new ItemRepository(new Item());
    });
}
```

### How do I add a custom shortcode?

To add a custom shortcode:

1. Register the shortcode in your service provider
2. Create a view for the shortcode

Example shortcode registration:

```php
Shortcode::register('foo-items', trans('plugins/foo::shortcodes.foo_items.name'), trans('plugins/foo::shortcodes.foo_items.description'), function ($shortcode) {
    $limit = $shortcode->limit ?: 6;
    $category = $shortcode->category;

    $items = app(ItemInterface::class)->advancedGet([
        'condition' => [
            'status' => BaseStatusEnum::PUBLISHED,
        ],
        'with' => ['slugable'],
        'order_by' => [
            'created_at' => 'DESC',
        ],
        'take' => $limit,
        'withCount' => ['comments'],
    ]);

    return view('plugins/foo::shortcodes.items', compact('items', 'shortcode'))->render();
}, [
    'name' => [
        'title' => trans('plugins/foo::shortcodes.foo_items.name'),
        'type' => 'text',
        'tab' => trans('core/base::forms.content'),
    ],
    'limit' => [
        'title' => trans('core/base::forms.limit'),
        'type' => 'number',
        'default_value' => 6,
        'tab' => trans('core/base::forms.content'),
    ],
    'category' => [
        'title' => trans('plugins/foo::shortcodes.foo_items.category'),
        'type' => 'customSelect',
        'source' => route('foo.categories.list'),
        'tab' => trans('core/base::forms.content'),
    ],
]);
```

### How do I add a custom widget area?

To add a custom widget area:

1. Register the widget area in your service provider
2. Create a view for the widget area

Example widget area registration:

```php
if (is_plugin_active('widget')) {
    app(WidgetInterface::class)->registerSidebar([
        'id' => 'foo_sidebar',
        'name' => trans('plugins/foo::foo.widgets.sidebar_name'),
        'description' => trans('plugins/foo::foo.widgets.sidebar_description'),
    ]);
}
```

To display the widget area in your theme:

```php
{!! dynamic_sidebar('foo_sidebar') !!}
```

### How do I add custom meta boxes to my plugin's forms?

To add custom meta boxes:

1. Add the meta box fields to your form class
2. Create a migration for the meta data table
3. Add the meta data relationship to your model

Example meta box in form:

```php
->add('metadata', 'custom_html', [
    'label' => trans('plugins/foo::foo.metadata'),
    'wrapper' => [
        'class' => 'form-group col-md-12',
    ],
    'html' => '<div class="row"><div class="col-md-6">',
])
->add('meta_title', 'text', [
    'label' => trans('core/base::forms.meta_title'),
    'wrapper' => [
        'class' => 'form-group col-md-6',
    ],
    'value' => $this->getModel()->meta_title,
])
->add('meta_description', 'textarea', [
    'label' => trans('core/base::forms.meta_description'),
    'wrapper' => [
        'class' => 'form-group col-md-6',
    ],
    'value' => $this->getModel()->meta_description,
    'attributes' => [
        'rows' => 3,
    ],
])
->add('meta_keywords', 'text', [
    'label' => trans('core/base::forms.meta_keywords'),
    'wrapper' => [
        'class' => 'form-group col-md-6',
    ],
    'value' => $this->getModel()->meta_keywords,
])
->add('metadata_end', 'custom_html', [
    'html' => '</div></div>',
])
```

In your model, add the meta attributes:

```php
/**
 * @var array
 */
protected $fillable = [
    'name',
    'description',
    'content',
    'status',
    'category_id',
    'image',
    'meta_title',
    'meta_description',
    'meta_keywords',
];
```

### How do I add custom CSS and JavaScript to my plugin?

To add custom CSS and JavaScript:

1. Place your assets in the `public/vendor/your-plugin` directory
2. Register and load your assets in your service provider

Example in service provider:

```php
public function boot(): void
{
    // ...

    $this->app->booted(function () {
        add_action(BASE_ACTION_ENQUEUE_SCRIPTS, [$this, 'registerAssets'], 99);
    });
}

public function registerAssets(): void
{
    Assets::addStylesDirectly([
        'vendor/core/plugins/foo/css/foo.css',
    ])
    ->addScriptsDirectly([
        'vendor/core/plugins/foo/js/foo.js',
    ]);
}
```

To publish your assets during plugin installation:

```php
$this->publishes([
    __DIR__.'/../../resources/assets' => resource_path('vendor/core/plugins/foo'),
    __DIR__.'/../../public' => public_path('vendor/core/plugins/foo'),
], 'public');
```

## Conclusion

Following this plugin structure and the best practices outlined in this document will help you create well-organized, maintainable, and secure plugins for Botble CMS. The modular architecture of Botble CMS makes it easy to extend and customize, and by adhering to these conventions, your plugins will integrate seamlessly with the core system.

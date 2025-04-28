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

### Service Provider

The service provider is the main entry point of your plugin. It registers routes, views, translations, and other resources. A plugin must have this file.

Example:

```php
<?php

namespace Botble\Foo\Providers;

use Botble\Base\Facades\DashboardMenu;
use Botble\Base\Traits\LoadAndPublishDataTrait;
use Botble\Foo\Models\Item;
use Illuminate\Support\ServiceProvider;

class FooServiceProvider extends ServiceProvider
{
    use LoadAndPublishDataTrait;

    public function register(): void
    {
        // Load helpers
        $this->app->make('files')->requireOnce(__DIR__ . '/../../helpers/constants.php');
        $this->app->make('files')->requireOnce(__DIR__ . '/../../helpers/helpers.php');
    }

    public function boot(): void
    {
        $this
            ->setNamespace('plugins/foo') // Set namespace for views, translations, etc.
            ->loadHelpers() // Load all helpers in the helpers folder
            ->loadAndPublishConfigurations(['permissions']) // Load and publish config files
            ->loadMigrations() // Load migrations
            ->loadAndPublishTranslations() // Load and publish translations
            ->loadAndPublishViews() // Load and publish views
            ->loadRoutes(['web']); // Load routes with web middleware

        // Register menu items in the admin dashboard
        DashboardMenu::default()->beforeRetrieving(function (): void {
            DashboardMenu::make()
                ->registerItem([
                    'id' => 'cms-plugins-foo', // Unique ID for the menu item
                    'priority' => 5, // Position in the menu
                    'parent_id' => null, // Parent ID for submenu items
                    'name' => 'plugins/foo::foo.name', // Translation key for the menu name
                    'icon' => 'ti ti-box', // Icon for the menu item
                    'url' => route('foo.index'), // URL for the menu item
                    'permissions' => ['foo.index'], // Required permissions to see this menu
                ]);
        });

        // Add additional hooks, filters, or actions here
        $this->app->booted(function () {
            // Code to run after the application is fully booted
        });
    }
}
```

The service provider has two main methods:

- `register()`: Used to bind implementations to the service container. This is where you register repositories, services, and load helpers.

- `boot()`: Called after all other service providers have been registered. This is where you load and publish assets, register routes, and add menu items.

The `LoadAndPublishDataTrait` provides several helpful methods:

- `setNamespace()`: Sets the namespace for views, translations, and other assets
- `loadHelpers()`: Loads all PHP files from the helpers directory
- `loadAndPublishConfigurations()`: Loads and publishes configuration files
- `loadMigrations()`: Loads database migrations
- `loadAndPublishTranslations()`: Loads and publishes translation files
- `loadAndPublishViews()`: Loads and publishes view files
- `loadRoutes()`: Loads route files

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

# Panel Sections Documentation

## Introduction

Panel Sections is a powerful feature in the application that allows developers to organize and display UI components in a structured and consistent way. It provides a flexible system for creating, managing, and rendering sections of the admin panel with their respective items.

The Panel Section system consists of three main components:
- **Panel Section Manager**: Manages groups, sections, and items
- **Panel Sections**: Container elements that group related items
- **Panel Section Items**: Individual UI elements within a section

## Panel Section Manager

The Panel Section Manager is the central component that handles the registration, organization, and rendering of panel sections and their items. It's accessible through the `PanelSectionManager` facade.

### Basic Usage

```php
use Botble\Base\Facades\PanelSectionManager;

// Use the default group (settings)
PanelSectionManager::default()
    ->registerItem(
        YourPanelSection::class,
        fn () => PanelSectionItem::make('your-item-id')
            ->setTitle('Your Item Title')
            ->withIcon('ti ti-settings')
            ->withDescription('Your item description')
            ->withPriority(100)
            ->withRoute('your.route.name')
    );
```

### Groups

Panel sections are organized into groups. The default group is 'settings', but you can create and use custom groups:

```php
// Switch to a custom group
PanelSectionManager::group('system')
    ->registerItem(/* ... */);

// Set a display name for the group
PanelSectionManager::group('system')
    ->setGroupName('System Administration');

// Return to the default group
PanelSectionManager::default();
```

### Registering Sections

You can register panel sections to a group:

```php
PanelSectionManager::default()
    ->register([
        YourPanelSection::class,
        AnotherPanelSection::class,
    ]);

// Or register a single section
PanelSectionManager::default()
    ->register(YourPanelSection::class);
```

### Registering Items

You can register items to a section:

```php
// Register a single item
PanelSectionManager::registerItem(
    YourPanelSection::class,
    fn () => PanelSectionItem::make('item-id')
        ->setTitle('Item Title')
        ->withIcon('ti ti-settings')
        ->withPriority(100)
);

// Register multiple items
PanelSectionManager::registerItems(
    YourPanelSection::class,
    fn () => [
        PanelSectionItem::make('item-1')
            ->setTitle('Item 1')
            ->withIcon('ti ti-users')
            ->withPriority(10),
        PanelSectionItem::make('item-2')
            ->setTitle('Item 2')
            ->withIcon('ti ti-settings')
            ->withPriority(20),
    ]
);
```

### Removing Items

You can remove items from a section:

```php
PanelSectionManager::default()
    ->removeItem(YourPanelSection::class, 'item-id');
```

### Hooks

You can register callbacks to be executed before or after rendering:

```php
PanelSectionManager::default()
    ->beforeRendering(function () {
        // Register items or perform other actions before rendering
        PanelSectionManager::registerItem(/* ... */);
    });

PanelSectionManager::default()
    ->afterRendering(function () {
        // Perform actions after rendering
    });
```

## Creating Panel Sections

To create a custom panel section, extend the `Botble\Base\PanelSections\PanelSection` class:

```php
<?php

namespace YourNamespace\PanelSections;

use Botble\Base\PanelSections\PanelSection;
use Botble\Base\PanelSections\PanelSectionItem;

class YourPanelSection extends PanelSection
{
    public function setup(): void
    {
        $this
            ->setId('your-section-id')
            ->setTitle('Your Section Title')
            ->withPriority(1000)
            ->withItems([
                PanelSectionItem::make('item-1')
                    ->setTitle('Item 1')
                    ->withIcon('ti ti-settings')
                    ->withDescription('Item 1 description')
                    ->withPriority(10)
                    ->withRoute('your.route.name'),
                PanelSectionItem::make('item-2')
                    ->setTitle('Item 2')
                    ->withIcon('ti ti-users')
                    ->withDescription('Item 2 description')
                    ->withPriority(20)
                    ->withRoute('another.route.name'),
            ]);
    }
}
```

### Panel Section Methods

- `setId(string $id)`: Set the section ID
- `setTitle(string $title)`: Set the section title
- `withDescription(string $description)`: Set the section description
- `withPriority(int $priority)`: Set the section priority (lower numbers appear first)
- `withPermissions(array $permissions)`: Set permissions required to view the section
- `withoutPermission()`: Remove permission requirements
- `withItems(array $items)`: Set the section items
- `addItems(array|Closure $items)`: Add items to the section
- `withView(string $view)`: Set a custom view for rendering the section
- `withEmptyStateView(string $view)`: Set a custom view for empty state
- `withoutEmptyStateView()`: Disable empty state view

## Creating Panel Section Items

Panel section items represent individual UI elements within a section. They can be created using the `PanelSectionItem::make()` method:

```php
use Botble\Base\PanelSections\PanelSectionItem;

$item = PanelSectionItem::make('item-id')
    ->setTitle('Item Title')
    ->withIcon('ti ti-settings')
    ->withDescription('Item description')
    ->withPriority(100)
    ->withRoute('your.route.name');
```

### Panel Section Item Methods

- `setId(string $id)`: Set the item ID
- `setTitle(string $title)`: Set the item title
- `withDescription(string $description)`: Set the item description
- `withIcon(string $icon)`: Set the item icon (using Tabler icons)
- `withPriority(int $priority)`: Set the item priority (lower numbers appear first)
- `withPermission(string $permission)`: Set a permission required to view the item
- `withPermissions(array $permissions)`: Set permissions required to view the item
- `withoutPermission()`: Remove permission requirements
- `withRoute(string $route, array $parameters = [], bool $absolute = true)`: Set the route for the item
- `withUrl(string $url)`: Set a direct URL for the item
- `urlShouldOpenNewTab(bool $openNewTab = true)`: Set whether the URL should open in a new tab
- `withView(string $view)`: Set a custom view for rendering the item

## Registering Panel Sections in Service Providers

It's recommended to register panel sections and items in your service provider's `boot` method:

```php
<?php

namespace YourNamespace\Providers;

use Botble\Base\Facades\PanelSectionManager;
use Botble\Base\PanelSections\PanelSectionItem;
use Botble\Base\PanelSections\System\SystemPanelSection;
use Illuminate\Support\ServiceProvider;

class YourServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        // Register a panel section
        PanelSectionManager::default()
            ->register(YourPanelSection::class);

        // Register items to an existing section
        PanelSectionManager::group('system')
            ->beforeRendering(function (): void {
                PanelSectionManager::registerItem(
                    SystemPanelSection::class,
                    fn () => PanelSectionItem::make('your-feature')
                        ->setTitle(trans('your-package::your-feature.name'))
                        ->withIcon('ti ti-settings')
                        ->withDescription(trans('your-package::your-feature.description'))
                        ->withPriority(100)
                        ->withRoute('your-feature.index')
                );
            });
    }
}
```

## Common Panel Section Groups

The application includes several predefined panel section groups:

- `settings`: Default group for application settings
- `system`: System administration features
- `others`: Miscellaneous settings and features

## Common Panel Sections

Some commonly used panel sections include:

- `SystemPanelSection`: System administration features
- `SettingCommonPanelSection`: Common application settings
- `SettingOthersPanelSection`: Miscellaneous settings
- `SettingEcommercePanelSection`: E-commerce settings

## Best Practices

1. **Use Translations**: Always use translation keys for titles and descriptions
2. **Set Appropriate Priorities**: Use priority values to control the order of sections and items
3. **Check Permissions**: Set appropriate permissions to control access to sections and items
4. **Register in Service Providers**: Register panel sections and items in your service provider's `boot` method
5. **Use Hooks**: Use `beforeRendering` and `afterRendering` hooks to register items dynamically
6. **Follow Naming Conventions**: Use consistent naming for section and item IDs

## Example: Complete Registration in a Service Provider

```php
<?php

namespace YourNamespace\Providers;

use Botble\Base\Facades\PanelSectionManager;
use Botble\Base\PanelSections\PanelSectionItem;
use Botble\Setting\PanelSections\SettingOthersPanelSection;
use Illuminate\Support\ServiceProvider;
use YourNamespace\PanelSections\YourPanelSection;

class YourServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        // Register your custom panel section
        PanelSectionManager::default()
            ->register(YourPanelSection::class);

        // Register an item to an existing panel section
        PanelSectionManager::default()
            ->beforeRendering(function (): void {
                PanelSectionManager::registerItem(
                    SettingOthersPanelSection::class,
                    fn () => PanelSectionItem::make('your-feature')
                        ->setTitle(trans('your-package::your-feature.name'))
                        ->withIcon('ti ti-settings')
                        ->withDescription(trans('your-package::your-feature.description'))
                        ->withPriority(100)
                        ->withRoute('your-feature.settings')
                );
            });
    }
}
```

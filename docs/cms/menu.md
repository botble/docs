# Menu System

## Introduction

Botble CMS provides a powerful menu management system that allows you to create and organize navigation menus for your website. The menu system supports hierarchical structures, custom links, and integration with various content types.

## Menu Architecture

The menu system consists of several key components:

1. **Menu**: The main container for a set of menu items
2. **Menu Nodes**: Individual menu items that can be organized hierarchically
3. **Menu Locations**: Predefined areas in your theme where menus can be displayed

## Default menu locations

`platform/packages/menu/config/general.php`

```php
'locations' => [
    'header-menu' => 'Header Navigation',
    'main-menu'   => 'Main Navigation',
    'footer-menu' => 'Footer Navigation',
],
```

## Render menu by location

```php
    {!!
        Menu::renderMenuLocation('main-menu', [
            'options' => [],
            'theme'   => true,
        ])
    !!}
```

`main-menu` is the menu location key

'options' is attributes of `ul` tag. Ex: `'options' => ['id' => 'menu-header-main-menu', 'class' => 'menu']`

## Add new menu location

```php
   Menu::addMenuLocation('menu-location-key', 'Description here');
```

## Remove a menu location

```php
   Menu::removeMenuLocation('menu-location-key');
```

## Customize menu views

To customize view to display menu. You can create a file in `/public/themes/your-theme/partials`.

Ex: `/platform/themes/your-theme/partials/custom-menu.blade.php`

```php
<ul {!! $options !!}>
    @foreach ($menu_nodes as $key => $row)
        <li class="{{ $row->css_class }} @if ($row->url == Request::url()) current @endif">
            <a href="{{ $row->url }}" target="{{ $row->target }}">
                <i class='{{ trim($row->icon_font) }}'></i> <span>{{ $row->name }}</span>
            </a>
            @if ($row->has_child)
                {!! Menu::generateMenu([
                    'slug' => $menu->slug,
                    'parent_id' => $row->id
                ]) !!}
            @endif
        </li>
    @endforeach
</ul>
```

Default code to display menu is located in `platform/core/menu/resources/views/partials/default.blade.php`

And to show menu with custom view, using below code:

```php
{!!
    Menu::renderMenuLocation('main-menu', [
        'options' => [],
        'theme' => true,
        'view' => 'custom-menu',
    ])
!!}
```

Menu in the location 'main-menu' will be generated using custom view
in `/platform/themes/your-theme/partials/custom-menu.blade.php`

## Advanced Features

### Menu Caching

Botble CMS supports caching menus for improved performance. To enable menu caching:

1. Go to **Admin** → **Settings** → **Cache**
2. Enable the "Cache front menu" option

To manually clear the menu cache, you can use the following command:

```bash
php artisan cms:menu:clear-cache
```

### Menu Item Icons

You can add icons to menu items in two ways:

1. **Icon Font**: Use the "Icon" field to specify a CSS class for an icon (e.g., `ti ti-home` for Tabler Icons)
2. **Icon Image**: Upload an image to use as an icon

To enable icon images for menu items, add this code to your theme's service provider:

```php
Menu::useMenuItemIconImage();
```

### Menu Item Badges

You can add badges to menu items (e.g., "New", "Hot", etc.). To enable this feature, add this code to your theme's service provider:

```php
Menu::useMenuItemBadge();
```

This will add badge text and color fields to the menu item editor.

## Menu API

Botble CMS provides a comprehensive API for working with menus programmatically:

### Check if a Menu Exists

```php
if (Menu::hasMenu('main-menu')) {
    // Menu exists
}
```

### Check if a Location Has a Menu

```php
if (Menu::isLocationHasMenu('header-menu')) {
    // Location has a menu assigned
}
```

### Generate Menu Programmatically

```php
$menuHtml = Menu::generateMenu([
    'slug' => 'main-menu',
    'theme' => true,
    'view' => 'custom-menu',
]);
```

### Register Menu Options for Content Types

To add your custom content type to the menu builder, use:

```php
Menu::registerMenuOptions(YourModel::class, 'Your Model Name');
```

## Best Practices

1. **Use Descriptive Names**: Give your menus clear, descriptive names that indicate their purpose
2. **Organize Hierarchically**: Use parent-child relationships to create dropdown menus
3. **Limit Menu Depth**: Keep menu hierarchies to 2-3 levels for better usability
4. **Use Icons Sparingly**: Icons can enhance usability but use them consistently
5. **Enable Caching**: For production sites, enable menu caching for better performance
6. **Custom Views**: Create custom menu views for different sections of your site

## Menu Structure and Implementation

### Database Structure

The menu system uses three main database tables:

1. **menus**: Stores the main menu containers
   - `id`: Primary key
   - `name`: The name of the menu
   - `slug`: A unique slug for the menu
   - `status`: The menu status (published/draft)

2. **menu_nodes**: Stores individual menu items
   - `id`: Primary key
   - `menu_id`: Foreign key to the menus table
   - `parent_id`: Parent menu node ID for hierarchical structure
   - `reference_id`: ID of the referenced content (if applicable)
   - `reference_type`: Type of the referenced content (e.g., Botble\Page\Models\Page)
   - `title`: The menu item title
   - `url`: The menu item URL
   - `icon_font`: CSS class for the icon
   - `css_class`: Additional CSS classes
   - `target`: Link target (_self, _blank, etc.)
   - `has_child`: Whether the item has children
   - `position`: The item's position in the menu

3. **menu_locations**: Maps menus to theme locations
   - `id`: Primary key
   - `menu_id`: Foreign key to the menus table
   - `location`: The theme location key

### Menu Node Metadata

Menu nodes can have additional metadata stored in the `meta_boxes` table, such as:

- `icon_image`: Path to an uploaded icon image
- `badge_text`: Text for a badge displayed with the menu item
- `badge_color`: Color for the badge

### Rendering Process

When a menu is rendered, the following process occurs:

1. The system checks if the requested menu exists in the specified location
2. If caching is enabled, it checks for a cached version of the menu
3. If no cache exists, it retrieves the menu and its nodes from the database
4. It builds the menu structure, organizing nodes hierarchically
5. It applies any custom view or theme-specific formatting
6. It returns the rendered HTML

### Events

The menu system fires several events that you can listen for:

- `RenderingMenuOptions`: Fired when rendering menu options in the admin panel
- `CreatedContentEvent`: Fired when a menu or menu location is created

## Troubleshooting

### Menu Not Displaying

If your menu is not displaying correctly, check the following:

1. Ensure the menu is published in the admin panel
2. Verify that the menu is assigned to the correct location
3. Check that you're using the correct location key in your theme
4. Clear the menu cache using `php artisan cms:menu:clear-cache`
5. Inspect the HTML output to see if the menu is being rendered but hidden by CSS

### Menu Items Not Linking Correctly

If menu items are not linking to the correct pages:

1. Check the URLs in the menu editor
2. For content-referenced menu items, ensure the content exists and is published
3. Verify that your custom menu view is correctly generating URLs

# Theme Admin Bar

The Admin Bar is a toolbar displayed at the top of the frontend for logged-in administrators. It provides quick access to admin pages, editing actions, and custom links.

## Overview

When an admin user views the frontend, a floating toolbar appears with links grouped into categories like "Appearance" and "Add New". Plugins and themes can add their own links and groups.

## Adding Links

### In Theme Functions

```php
// In platform/themes/your-theme/functions/functions.php
use Botble\Theme\Events\RenderingAdminBar;

app('events')->listen(RenderingAdminBar::class, function (): void {
    admin_bar()
        ->registerLink(
            title: __('Edit Theme'),
            url: route('theme.options'),
            group: 'appearance',
            permission: 'theme.options'
        );
});
```

### In Plugin Service Providers

```php
use Botble\Theme\Events\RenderingAdminBar;

$this->app['events']->listen(RenderingAdminBar::class, function (): void {
    admin_bar()->registerLink(
        __('New Post'),
        route('posts.create'),
        'add-new',
        'posts.create'
    );
});
```

## Creating Custom Groups

```php
admin_bar()->registerGroup(
    slug: 'my-tools',
    title: __('My Tools'),
    link: route('my-tools.index')  // Optional, default: 'javascript:;'
);

// Then add links to the group
admin_bar()->registerLink(__('Tool A'), route('tool-a'), 'my-tools');
admin_bar()->registerLink(__('Tool B'), route('tool-b'), 'my-tools');
```

## Default Groups

The admin bar comes with two pre-registered groups:

| Group Slug | Title |
|-----------|-------|
| `appearance` | Appearance settings (theme options, menus, widgets) |
| `add-new` | Quick-create links (new page, post, etc.) |

## Ungrouped Links

Links registered without a group appear as top-level items:

```php
admin_bar()->registerLink(__('Dashboard'), route('dashboard.index'));
```

## Permission Checks

The `permission` parameter ensures links only appear for users with the required permission:

```php
admin_bar()->registerLink(
    title: __('Manage Users'),
    url: route('users.index'),
    group: null,
    permission: 'users.index'  // Only shown if user has this permission
);
```

## Controlling Visibility

### Hide the Admin Bar

```php
admin_bar()->setIsDisplay(false);
```

### Check if Displayed

```php
if (admin_bar()->isDisplay()) {
    // Admin bar is visible
}
```

## Retrieving Data

```php
// Get all groups with their links
$groups = admin_bar()->getGroups();

// Get links not assigned to any group
$topLinks = admin_bar()->getLinksNoGroup();
```

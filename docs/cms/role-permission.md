# Roles & Permissions

## Introduction

Botble CMS includes a powerful role-based access control system that allows you to control what users can do in your application. The system consists of two main components:

1. **Roles**: Stored in the database, roles are collections of permissions assigned to users. You can create as many roles as needed (e.g., Admin, Editor, Author).

2. **Permissions**: Defined in code, permissions are specific actions that users can perform. Each permission has a unique flag (e.g., `posts.create`, `users.edit`).

## Understanding Permissions

### Permission Structure

Permissions are defined in configuration files with the following structure:

```php
[
    'name' => 'Users',           // Display name of the permission
    'flag' => 'users.index',      // Unique identifier for the permission
    'parent_flag' => 'core.system' // Optional parent permission
]
```

Each permission has:
- **name**: Human-readable name displayed in the admin interface
- **flag**: Unique identifier used to check permissions programmatically
- **parent_flag**: Optional parent permission for hierarchical organization

### Core Permissions

Core permissions are defined in `platform/core/acl/config/permissions.php`:

```php
return [
    [
        'name' => 'Users',
        'flag' => 'users.index',
        'parent_flag' => 'core.system',
    ],
    [
        'name' => 'Create',
        'flag' => 'users.create',
        'parent_flag' => 'users.index',
    ],
    // ...
];
```

## Adding Custom Permissions

### Plugin Permissions

When you create a plugin, a permissions configuration file is automatically generated at `platform/plugins/your-plugin/config/permissions.php`. You can modify this file to define permissions for your plugin:

```php
return [
    [
        'name' => 'Blog',
        'flag' => 'blog.index',
    ],
    [
        'name' => 'Create',
        'flag' => 'blog.create',
        'parent_flag' => 'blog.index',
    ],
    [
        'name' => 'Edit',
        'flag' => 'blog.edit',
        'parent_flag' => 'blog.index',
    ],
    [
        'name' => 'Delete',
        'flag' => 'blog.destroy',
        'parent_flag' => 'blog.index',
    ],
];
```

### Updating Permission Database

After modifying permission configuration files, you need to update the database by running:

```bash
php artisan cms:user:rebuild-permissions
```

This command scans all permission configuration files and updates the database accordingly.

## Using Permissions in Routes

Botble CMS automatically checks permissions for routes in the admin panel. By default, it uses the route name as the permission flag.

### Basic Route Permission

```php
Route::get('/', [
    'as' => 'blog.index',    // Will check for 'blog.index' permission
    'uses' => 'BlogController@index',
]);
```

### Custom Permission Flag

You can specify a custom permission flag:

```php
Route::get('/delete/{id}', [
    'as' => 'blog.destroy',
    'uses' => 'BlogController@destroy',
    'permission' => 'blog.edit',  // Will check for 'blog.edit' permission instead
]);
```

### Disabling Permission Check

To disable permission checking for a route:

```php
Route::get('/preview/{id}', [
    'as' => 'blog.preview',
    'uses' => 'BlogController@preview',
    'permission' => false,  // No permission check
]);
```

### Super User Only Routes

To restrict a route to super users only:

```php
Route::get('/system-settings', [
    'as' => 'system.settings',
    'uses' => 'SystemController@settings',
    'permission' => 'superuser',  // Only super users can access
]);
```

## Checking Permissions in Code

### In Controllers

You can check permissions in controllers using the `hasPermission` and `hasAnyPermission` methods:

```php
public function edit($id)
{
    if (!Auth::user()->hasPermission('blog.edit')) {
        abort(403, 'Unauthorized action.');
    }

    // Continue with edit logic...
}
```

Or for checking multiple permissions:

```php
if (Auth::user()->hasAnyPermission(['blog.edit', 'blog.create'])) {
    // User has at least one of these permissions
}
```

### In Blade Templates

You can check permissions in Blade templates:

```blade
@if (Auth::user()->hasPermission('blog.create'))
    <a href="{{ route('blog.create') }}" class="btn btn-primary">Create Post</a>
@endif

@if (Auth::user()->hasAnyPermission(['blog.edit', 'blog.destroy']))
    <div class="action-buttons">
        @if (Auth::user()->hasPermission('blog.edit'))
            <a href="{{ route('blog.edit', $post->id) }}" class="btn btn-sm btn-info">Edit</a>
        @endif

        @if (Auth::user()->hasPermission('blog.destroy'))
            <button class="btn btn-sm btn-danger delete-button">Delete</button>
        @endif
    </div>
@endif
```

### Checking for Super User

To check if a user is a super user:

```php
if (Auth::user()->isSuperUser()) {
    // User is a super user
}
```

Super users automatically have all permissions in the system.

## Managing Roles and Users

### Creating Roles Programmatically

```php
use Botble\ACL\Models\Role;

$role = Role::query()->create([
    'name' => 'Editor',
    'description' => 'Editor role with content management permissions',
    'permissions' => [
        'posts.index' => true,
        'posts.create' => true,
        'posts.edit' => true,
        'categories.index' => true,
        'categories.create' => true,
        'categories.edit' => true,
    ],
]);
```

### Assigning Roles to Users

```php
use Botble\ACL\Models\User;
use Botble\ACL\Models\Role;

$user = User::query()->find(1);
$role = Role::query()->where('name', 'Editor')->first();

// Assign a role to a user
$user->roles()->sync([$role->id]);

// The RoleAssignmentEvent will automatically update user permissions
```

### Updating User Permissions Directly

You can also update a user's permissions directly without assigning a role:

```php
$user = User::query()->find(1);

// Add a permission
$user->updatePermission('blog.publish', true);

// Remove a permission
$user->updatePermission('blog.publish', false);

// Save changes
$user->save();
```

## Best Practices

1. **Use Hierarchical Permissions**: Organize permissions hierarchically using parent flags for better organization.

2. **Consistent Naming**: Follow a consistent naming convention for permission flags (e.g., `resource.action`).

3. **Check Permissions Early**: Check permissions at the beginning of controller methods to fail fast.

4. **Use Route Permissions**: Leverage the built-in route permission system whenever possible.

5. **Rebuild After Changes**: Always run `php artisan cms:user:rebuild-permissions` after modifying permission configurations.

## Troubleshooting

- **Permission Not Working**: Ensure the permission flag exists in the configuration and the database has been updated with `cms:user:rebuild-permissions`.

- **Route Access Issues**: Check that the route name matches the permission flag or that a custom permission is correctly specified.

- **Role Assignment Problems**: Verify that the role has the necessary permissions and that the user is correctly assigned to the role.

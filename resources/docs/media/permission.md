# Config permission

## Available permissions

```php
'permissions' => [
    'folders.create',
    'folders.edit',
    'folders.delete',
    'files.create',
    'files.edit',
    'files.delete',
],
```

## Set permissions

From you application, if you don't want current user to have any permission. You can set it again.

```php
RvMedia::setPermissions([
   //'folders.create',
   'folders.edit',
   'folders.delete',
   'files.create',
   'files.edit',
   'files.delete',
]);
```

In this case, current user will not able to create folder.

The best way to set Media permission is set it in View composer.

```php

view()->composer(['media::header'], function (View $view) {
    
    // Get all user's permission using your ACL system
    $mediaPermissions = [
       'files.create',
       'files.edit',
       'files.delete',
    ];
    RvMedia::setPermissions($mediaPermissions);
});

```

> {info} If you don't set Media permission, all users in your system will have full permission for Media management.

## Get Permissions

Show all permissions of current user

```php
$permisisons = RvMedia::getPermissions();
dd($permisisons);
```

## Remove a permission

```php
RvMedia::removePermission('folders.create');
```

## Add a permission

```php
RvMedia::addPermission('files.create');
```

## Has permission

- Check if current user has a permission

```php
RvMedia::hasPermission('files.create');
```

## Has any permissions

```php
RvMedia::hasAnyPermission(['folders.create', 'files.create']);
```
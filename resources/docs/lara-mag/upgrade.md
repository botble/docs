# Upgrade Guide

- [Upgrade To 3.6](#upgrade-3.6)
- [Upgrade To 3.5](#upgrade-3.5)
- [Upgrade To 3.4](#upgrade-3.4)
- [Upgrade To 3.3.1](#upgrade-3.3.1)
- [Upgrade To 3.3](#upgrade-3.3)
- [Upgrade To 2.2.1](#upgrade-2.2.1)
- [Upgrade To 2.2](#upgrade-2.2)
- [Upgrade To 2.1](#upgrade-2.1)
- [Upgrade To 2.0.1](#upgrade-2.0.1)
- [Upgrade To 2.0](#upgrade-2.0)
- [Upgrading To 1.1](#upgrade-1.1)

<a name="upgrade-3.6"></a>
## Upgrade to 3.6
- Override folder `platform` from the update source code.
- Update your  composer.json   with the latest  composer.json   or update changes from latest version http://prntscr.com/ohvwfw.
- Run `composer update` to update vendor packages.
- Run `php artisan migrate` to update database.
- Replace all `public.index` to `public.single`.
- Remove folder `public/vendor/core` and run command `php artisan vendor:publish --tag=cms-public --force`
- We've changed method of "delete" button from `GET` to `DELETE` (http://prntscr.com/ohvrw0) so if you have custom plugins, you need to change all of it to `DELETE` in your plugin /routes/web.php

```php
Route::get('delete/{id}', ...
```

To 

```php
Route::delete('delete/{id}', ...
```

And,

```php
Route::post('delete-many', ...
```

To

```php
Route::delete('delete-many', ...
```

<a name="upgrade-3.5"></a>
## Upgrade to 3.5
- Override folder `platform` from the update source code.
- Remove folder `public/vendor/core` and run command `php artisan vendor:publish --tag=cms-public --force`
- Run `composer install` to update vendor packages.
- Run `php artisan migrate` to update database.
- Change the value for `status` column from `publish` to `published`.

<a name="upgrade-3.4"></a>
## Upgrade to 3.4

- You need to copy your changes to new source code.

- From this version, all core modules, plugins and themes are located in /platform folder. 
   + If you've created your plugins, you need to copy it into /platform/plugins folder.
   + If you've created your themes, you need to copy it into /platform/themes folder and run command `php artisan cms:theme:assets:publish your-theme` to copy theme's assets to `public/themes/your-theme`

- Run `composer install` and `php artisan migrate`

- Run command `php artisan storage:link`

<a name="upgrade-3.3.1"></a>
## Upgrade to 3.3.1

- Override folder `core/base` with new source code.

<a name="upgrade-3-3"></a>
## Upgrade to 3.3

- This is big version. It has many change on core system so the easiest way to upgrade to new version is copy what your changes 
(your themes, plugins, translations) to new source code.

<a name="upgrade-2.2.1"></a>
## Upgrade from 2.2 to 2.2.1

- Replace 2 files `core/base/resources/views/layouts/master.blade.php` & `core/table/src/Abstracts/TableAbstract.php`

<a name="upgrade-2.2"></a>
## Upgrade from 2.1 to 2.2

- Override folder /core & /plugins with new source code.
- Run `php artisan vendor:publish --tag=public --force`
- Run `php artisan vendor:publish --tag=lang --force`
- Run `composer install` to update vendor packages.
- Run `php artisan migrate` to update database.

<a name="upgrade-2.1"></a>
## Upgrade from 2.0.1 to 2.1

- Run `composer install` to update vendor packages.
- Run `php artisan migrate` to update database.
- Deprecated classes: Botble\Base\Tables\TableAbstract & Botble\Base\Tables\TableBuilder will be removed in the next version, 
please change to use Botble\Table\Abstracts\TableAbstract & Botble\Table\TableBuilder

<a name="upgrade-2.0.1"></a>
## Upgrade from 2.0 to 2.0.1

- Override folder /core and /plugins
- Run "php artisan vendor:publish --tag=public --force" to update assets.
- Run "php artisan migrate" to update database.

<a name="upgrade-2.0"></a>
## Upgrade from 1.1 to 2.0

- Copy your theme to new source code.
- Run `composer install` to update vendor packages.
- Run `php artisan migrate` to update database.

> {warning} Old custom plugins which you built with v1.1 will not work on v2.0.

<a name="upgrade-1.1"></a>
## Upgrade from 1.0 to 1.1
- Using new source code from Codecanyon.
- Run `composer install` to update vendor packages.
- Run `php artisan migrate` to update database.

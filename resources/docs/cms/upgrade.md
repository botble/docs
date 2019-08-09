# Upgrade Guide

- [Upgrade To 3.6](#upgrade-3.6)
- [Upgrade To 3.5](#upgrade-3.5)
- [Upgrade To 3.4](#upgrade-3.4)
- [Upgrade To 3.3.1](#upgrade-3.3.1)
- [Upgrade To 3.3](#upgrade-3.3)
- [Upgrade To 3.2.1](#upgrade-3.2.1)
- [Upgrade To 3.2](#upgrade-3.2)
- [Upgrade To 3.1](#upgrade-3.1)
- [Upgrade To 3.0.2](#upgrade-3.0.2)
- [Upgrade To 3.0.1](#upgrade-3.0.1)
- [Upgrade To 3.0](#upgrade-3.0)
- [Upgrade To 2.6](#upgrade-2.6)
- [Upgrade To 2.4.1](#upgrade-2.4.1)
- [Upgrade To 2.4](#upgrade-2.4)
- [Upgrade To 2.3](#upgrade-2.3)
- [Upgrade To 2.2.1](#upgrade-2.2.1)
- [Upgrade To 2.2](#upgrade-2.2)
- [Upgrading To 2.1](#upgrade-2.1)

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

<a name="upgrade-3.3"></a>
## Upgrade to 3.3

- This is big version. It has many change on core system so the easiest way to upgrade to new version is copy what your changes 
(your themes, plugins, translations) to new source code.

- Run `php artisan migrate`, `php artisan vendor:publish --tag=public --force`
- Run `composer update` to update vendor packages.

<a name="upgrade-3.2.1"></a>
## Upgrade from 3.2 to 3.2.1

- Replace 3 files: `core/base/resources/views/layouts/master.blade.php`, `core/table/src/Abstracts/TableAbstract.php` & `plugins/block/src/Repositories/Eloquent/BlockRepository.php`

<a name="upgrade-3.2"></a>
## Upgrade from 3.1 to 3.2

- Override folder /core & /plugins with new source code.
- Run `php artisan vendor:publish --tag=public --force`
- Run `php artisan vendor:publish --tag=lang --force`
- Run `composer install` to update vendor packages.
- Run `php artisan migrate` to update database.

<a name="upgrade-3.1"></a>
## Upgrade from 3.0.2 to 3.1

- Run `composer install` to update vendor packages.
- Run `php artisan migrate` to update database.
- Deprecated classes: Botble\Base\Tables\TableAbstract & Botble\Base\Tables\TableBuilder will be removed in the next version, 
please change to use Botble\Table\Abstracts\TableAbstract & Botble\Table\TableBuilder

<a name="upgrade-3.0.2"></a>
## Upgrade from 3.0.1 to 3.0.2

- Replace file plugins/custom-field/src/Http/Controllers/CustomFieldController.php,
 plugins/custom-field/src/Forms/CustomFieldForm.php and plugins/custom-field/resources/views/rules.blade.php
with new ones which downloaded from Codecanyon

<a name="upgrade-3.0.1"></a>
## Upgrade from 3.0 to 3.0.1

- Override folder /core and /plugins
- Run "php artisan vendor:publish --tag=public --force" to update assets.
- Run "php artisan migrate" to update database.

<a name="upgrade-3.0"></a>
## Upgrade from 2.6 to 3.0

- Make sure PHP version to your server >= 7.1.3
- Copy your theme to new source code.
- Run `composer install` to update vendor packages.
- Run `php artisan migrate` to update database.

> {warning} Old custom plugins which you built with Botble CMS v2.6 will not work on v3.0.

<a name="upgrade-2.5"></a>
## Upgrade from 2.5 to 2.6
- Run `composer install` to update vendor packages.
- Run `php artisan migrate` to update database.

<a name="upgrade-2.4.1"></a>
## Upgrade from 2.4 to 2.4.1
- Run `composer install` to update vendor packages.
- Run `php artisan plugin:activate member`

<a name="upgrade-2.4"></a>
## Upgrade To 2.4
- Copy what you changes (plugins, themes) and paste to new version 2.4.
- Route `public.single.detail` change to `public.single`.
- Should use new database from /database.sql. Old database can not be used.

<a name="upgrade-2.3"></a>
## Upgrade To 2.3

> {warning} You should not upgrade to version 2.3 if your project is stable now. Because it has a lot of change so it can break your site.

- Override folder `/core` and `/plugins` from new version.

- Replace `public/vendor` folder or run `php artisan vendor:publish --tag=assets`

- Check and update manually 3 files: `composer.json`, `gulpfile.js`, `.env`

- Because we created new media management and changed database so you have to re-upload all your files.

- Replace `get_file_by_size()` by `get_image_url()`


<a name="upgrade-2.2.1"></a>
## Upgrade To 2.2.1

Remove admin bar configuration in your theme

    class="{{ admin_bar_class() }}"
    {!! admin_bar() !!}
    
Remove admin breadcrumb in your plugin if it is exists.

    {!! Breadcrumbs::render('pageTitle', trans('download::category.create'), Route::currentRouteName()) !!}
    <div class="clearfix"></div>

<a name="upgrade-2.2"></a>
## Upgrade To 2.2

Remove this line on `/config/app.php`
    
    Lord\Laroute\LarouteServiceProvider::class,
    
Remove laroute on `composer.json`
    
    "lord/laroute": "~2.4",

There are many changes on `gulpfile.js` so if you don't change anything on this file. Please replace it with new `gulpfile.js`.

Then, if you are using `Linux` or `OSX`, you can use `upgrade.sh` to continue upgrade to version 2.2.

    $ sudo chmod -R 777 upgrade.sh
    $ ./upgrade.sh

Upgrade script for Windows OS will be update soon. From now, you can follow `upgrade.sh` content to upgrade your source code.

<a name="upgrade-2.1"></a>
## Upgrading To 2.1

> {warning} This version using Laravel Framework 5.4 so if you are working on Laravel 5.3, please override all default files and folders of Laravel version 5.4 before upgrade.

### Core and plugins
Override folder `/core` and `/plugins` from new version.

### Public resource
Replace `public/vendor` folder.

### Check and update manually
- composer.json
- gulpfile.js
- .env

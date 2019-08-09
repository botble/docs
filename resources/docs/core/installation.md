# Installation

- [Prerequisites](#prerequisites)
- [Install Botble Core](#install-botble-core)
- [Requirements and browser support](#requirements-and-browser-support)

## Prerequisites

This guide assumes that you already know how to [install](http://laravel.com/docs/5.5/installation) and configure Laravel and have the latest version of [Composer](https://getcomposer.org/) installed.

## Install Botble Core

### Step 1: Setup Botble Core as vendor package.

Extract the files from the `platform.zip` you have downloaded from CodeCanyon into a `platform` folder in your project root.

Edit your `composer.json` file and add a [local path](https://getcomposer.org/doc/05-repositories.md#path) repository:

```javascript
"repositories": [
    {
        "type": "path",
        "url": "./platform/core"
    }
]
```

In your terminal run:

```bash
composer require botble/platform *@dev
```

### Step 2: Publish assets file

Publish the assets files with Laravel command:

```bash
php artisan vendor:publish --tag=public --force
```

### Step 3: Install database

```bash
php artisan migrate
```

### Step 4: Create a new super admin

```bash
php artisan cms:user:create
```

### Step 5: Create symlink

```bash
php artisan storage:link
```

Now you can access to admin panel in `http://your-project-domain.local/admin`.

If you don't want `/admin` in the URL, please add to `.env`

```bash
ADMIN_DIR=
```

But make sure you removed default route for "/". It's default welcome page of Laravel or your project.

You can publish the config file with (optional):

```bash
php artisan vendor:publish --provider="Botble\Base\Providers\BaseServiceProvider" --tag=config
```

Head over to the [Usage](usage.md) section to get started.

### Requirements and Browser Support

Botble Core requires Laravel >= 5.5 and supports the following browsers (desktop and mobile): Chrome, Firefox, Opera, Safari, MS Edge and IE10+.

<style>.docs-content ol { padding-left: 20px; }</style>

# Installation

- [Prerequisites](#prerequisites)
- [Install Avatar](#install-avatar)
- [Clone Avatar demo](#clone-avatar-demo)
- [Requirements and browser support](#requirements-and-browser-support)

## Prerequisites

This guide assumes that you already know how to [install](http://laravel.com/docs/5.4/installation) and configure Laravel and have the latest version of [Composer](https://getcomposer.org/) installed.

## Install Laravel Avatar

Extract the files from the archive you have downloaded from CodeCanyon into a `avatar` folder in your project root.

Edit your `composer.json` file and add a [local path](https://getcomposer.org/doc/05-repositories.md#path) repository:

```javascript
"repositories": [
    {
        "type": "path",
        "url": "./avatar"
    }
],
"minimum-stability": "dev"
```

In your terminal run:

```bash
composer require botble/avatar *@dev
```

or

```bash
composer require botble/avatar dev-master
```

Next, you must install the service provider, you can ignore this step if you're using Laravel >= 5.5:

```php
// config/app.php
'providers' => [
    ...
    Botble\Avatar\Providers\AvatarServiceProvider::class,
];
```

For Laravel 5.1 and 5.2 you have to publish the migrations with:

```bash
php artisan vendor:publish --provider="Botble\Avatar\Providers\AvatarServiceProvider" --tag=migrations
```

Run the migrate command to create the necessary tables:

```bash
php artisan migrate
```

Publish the assets files with:

```bash
php artisan vendor:publish --provider="Botble\Avatar\Providers\AvatarServiceProvider" --tag=assets
```

You can publish the config file with:

```bash
php artisan vendor:publish --provider="Botble\Avatar\Providers\AvatarServiceProvider" --tag=config
```

Head over to the [Usage](usage.md) section to get started.

## Clone Avatar Demo

You can clone the [demo version](https://avatar.botble.com) from the GitHub [repository](https://github.com/botble/demo-avatar):

```bash
git clone https://github.com/botble/demo-avatar.git
```

Then you can continue with the [normal installation](#install-avatar).

### Requirements and Browser Support

Laravel Comments requires Laravel >= 5.1.9 and supports the following browsers (desktop and mobile): Chrome, Firefox, Opera, Safari, MS Edge and IE10+.

<style>.docs-content ol { padding-left: 20px; }</style>

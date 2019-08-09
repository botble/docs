# Installation

- [Prerequisites](#prerequisites)
- [Install Rv Media](#install-rv-media)
- [Clone Rv Media demo](#clone-rv-media-demo)
- [Requirements and browser support](#requirements-and-browser-support)

## Prerequisites

This guide assumes that you already know how to [install](http://laravel.com/docs/5.4/installation) and configure Laravel and have the latest version of [Composer](https://getcomposer.org/) installed.

## Install Laravel Rv Media

Extract the files from the archive you have downloaded from CodeCanyon into a `media` folder in your project root.

Edit your `composer.json` file and add a [local path](https://getcomposer.org/doc/05-repositories.md#path) repository:

```javascript
"repositories": [
    {
        "type": "path",
        "url": "./media"
    }
]
```

In your terminal run:

```bash
composer require botble/media *@dev
```

Next, you must install the service provider:

```php
// config/app.php
'providers' => [
    ...
    Botble\Media\Providers\MediaServiceProvider::class,
];
```

For Laravel 5.1 and 5.2 you have to publish the migrations with:

```bash
php artisan vendor:publish --provider="Botble\Media\Providers\MediaServiceProvider" --tag=migrations
```

Run the migrate command to create the necessary tables:

```bash
php artisan migrate
```

Publish the assets files with:

```bash
php artisan vendor:publish --provider="Botble\Media\Providers\MediaServiceProvider" --tag=assets
```

You can publish the config file with:

```bash
php artisan vendor:publish --provider="Botble\Media\Providers\MediaServiceProvider" --tag=config
```

Head over to the [Usage](usage.md) section to get started.

## Clone Rv Media Demo

You can clone the [demo version](https://media.botble.com) from the GitHub [repository](https://github.com/botble/demo-media):

```bash
git clone https://github.com/botble/demo-media.git
```

Then you can continue with the [normal installation](#install-rv-media).

### Requirements and Browser Support

Laravel Rv Media requires Laravel >= 5.1.9 and supports the following browsers (desktop and mobile): Chrome, Firefox, Opera, Safari, MS Edge and IE10+.

<style>.docs-content ol { padding-left: 20px; }</style>

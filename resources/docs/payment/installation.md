# Installation

- [Prerequisites](#prerequisites)
- [Install Rv Payment](#install-rv-payment)
- [Clone Rv Payment demo](#clone-rv-payment-demo)
- [Requirements and browser support](#requirements-and-browser-support)

## Prerequisites

This guide assumes that you already know how to [install](http://laravel.com/docs/5.4/installation) and configure Laravel and have the latest version of [Composer](https://getcomposer.org/) installed.

## Install Laravel Rv Payment

Extract the files from the archive you have downloaded from CodeCanyon into a `payment` folder in your project root.

Edit your `composer.json` file and add a [local path](https://getcomposer.org/doc/05-repositories.md#path) repository:

```javascript
"repositories": [
    {
        "type": "path",
        "url": "./payment"
    }
]
```

In your terminal run:

```bash
composer require botble/payment *@dev
```

Next, you must install the service provider:

```php
// config/app.php
'providers' => [
    ...
    Botble\Payment\Providers\PaymentServiceProvider::class,
];
```

For Laravel 5.1 and 5.2 you have to publish the migrations with:

```bash
php artisan vendor:publish --provider="Botble\Payment\Providers\PaymentServiceProvider" --tag=migrations
```

Run the migrate command to create the necessary tables:

```bash
php artisan migrate
```

Publish the assets files with:

```bash
php artisan vendor:publish --provider="Botble\Payment\Providers\PaymentServiceProvider" --tag=assets
```

You can publish the config file with:

```bash
php artisan vendor:publish --provider="Botble\Payment\Providers\PaymentServiceProvider" --tag=config
```

Head over to the [Usage](usage.md) section to get started.

## Clone Rv Payment Demo

You can clone the [demo version](https://payment.botble.com) from the GitHub [repository](https://github.com/botble/demo-payment):

```bash
git clone https://github.com/botble/demo-payment.git
```

Then you can continue with the [normal installation](#install-rv-payment).

### Requirements and Browser Support

Laravel Rv Payment requires Laravel >= 5.1.9 and supports the following browsers (desktop and mobile): Chrome, Firefox, Opera, Safari, MS Edge and IE10+.

<style>.docs-content ol { padding-left: 20px; }</style>

# Upgrade Guide

- [Basic](#basic)

## Basic

- When you got a new version of Rv Payment from Codecanyon. You just need to do below steps to upgrade it.
    * Extract `main.zip` and extract `payment.zip` then override folder `payment`.
    * Update assets: `php artisan vendor:publish --provider="Botble\Payment\Providers\PaymentServiceProvider" --tag=assets --force`
    * You should check `/payment/config/payment.php` to make sure all your configure is up to date.
    * To make sure all config and cache is clear, please run below commands:
    ```bash
     php artisan config:clear
     php artisan cache:clear
     php artisan route:clear
     php artisan view:clear
    ```
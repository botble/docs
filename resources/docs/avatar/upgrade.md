# Upgrade Guide

- [Basic](#basic)

## Basic

- When you got a new version of Avatar from Codecanyon. You just need to do below steps to upgrade it.
    * Extract `main.zip` and extract `avatar.zip` then override folder `avatar`.
    * Update assets: `php artisan vendor:publish --provider="Botble\Avatar\Providers\AvatarServiceProvider" --tag=assets --force`
    * You should check `/avatar/config/avatar.php` to make sure all your configure is up to date.
    * To make sure all config and cache is clear, please run below commands:
    ```bash
     php artisan config:clear
     php artisan cache:clear
     php artisan route:clear
     php artisan view:clear
    ```
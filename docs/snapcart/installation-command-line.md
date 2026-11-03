# Using command line

Install SnapCart from the terminal if you have SSH access to your server.

1. From the project root, run `composer install` if `vendor/` is missing. For a new installation, copy `.env.example` to `.env` if needed, set your database credentials and `APP_URL`, then run `php artisan key:generate` if `APP_KEY` is empty. Do not overwrite an existing site's `.env` or regenerate its key during an upgrade.

2. Run `php artisan migrate` to create the database structure.

3. Run `php artisan db:seed` if you want the demo store data (products, categories, brands).

4. Run `php artisan cms:publish:assets` to publish assets.

5. Run `php artisan serve`. Open `http://localhost:8000` to see the storefront.

6. Admin panel URL: `http://localhost:8000/admin`

7. Default admin account:
   - With the demo data, the account is `admin` / `12345678`.
   - Without it, run `php artisan cms:user:create` to create an admin user.

::: tip
Remember to set up the [cronjob](./cronjob.md) after installation so scheduled tasks such as abandoned cart reminders
and flash sale expiration run correctly.
:::

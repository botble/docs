# Install using command line.

- Extract the purchased source package and open a terminal in the project root. If the `vendor/` directory is missing, run `composer install` first.

- For a new installation, create `.env` from `.env.example` if it does not exist, then set `APP_URL` and your database credentials. Run `php artisan key:generate` if `APP_KEY` is empty. Never overwrite an existing site's `.env` or regenerate its key during an upgrade.

- Run `php artisan migrate` to create the database structure.

- Run `php artisan db:seed` if you need our sample data.

- Run `php artisan cms:publish:assets` to publish assets.
  
- Run `php artisan serve`. Open `http://localhost:8000` to see the homepage.

- Admin panel URL: `http://localhost:8000/admin`

- Default admin account:
    - If you use our sample data, the default admin account is `admin` with the password `12345678`.
    - If not, run `php artisan cms:user:create` to create an admin user.

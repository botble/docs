# Using Docker

_Docker installation is for development only — do not use it in a production environment._

SnapCart uses [Laravel Sail](https://laravel.com/docs/13.x/sail). Refer to the official documentation for full details.

1. Open the `.env` file and change:
   - `DB_HOST=127.0.0.1` to `DB_HOST=mysql`
   - `DB_USERNAME=` to `DB_USERNAME=botble` (or any username you want)
   - `DB_PASSWORD=` to `DB_PASSWORD=botble` (or any password you want)

2. Initialise Laravel Sail:

   ```shell
   docker run --rm --interactive --tty \
     --volume $PWD:/app \
     --volume ${COMPOSER_HOME:-$HOME/.composer}:/tmp \
     composer install --ignore-platform-reqs
   ```

3. Set up an alias for `sail`:

   ```bash
   alias sail='sh $([ -f sail ] && echo sail || echo vendor/bin/sail)'
   ```

4. Run `sail build --no-cache` to build the image.
5. Run `sail up -d` to start the services.
6. Run `sail composer install` to install the dependencies.
7. Run `sail artisan migrate` to create the database structure.
8. Run `sail artisan db:seed` if you want the demo store data.
9. Run `sail artisan cms:publish:assets` to publish assets.
10. Open `http://localhost` to see the storefront. Admin panel: `http://localhost/admin`.
11. Default admin account: `admin` / `12345678` (with demo data), otherwise run `sail artisan cms:user:create`.
12. Run `sail down` to stop the services.

::: tip
If a port is already in use, change it in `docker-compose.yml` or via environment variables (e.g. `APP_PORT=8080`).
:::

## Rebuilding images

Run `docker compose down -v` and then `sail build --no-cache`.

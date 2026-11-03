# Using Docker

_Docker installation is for development only — do not use it in a production environment._

SnapCart uses [Laravel Sail](https://laravel.com/docs/13.x/sail). Refer to the official documentation for full details.

## PHP runtime

Check `docker-compose.yml` (or `compose.yaml`) before building. Use a Sail runtime supported by the CMS, for example PHP 8.4:

```yaml
# Under services.laravel.test
build:
    context: './vendor/laravel/sail/runtimes/8.4'
    dockerfile: Dockerfile
image: 'sail-8.4/app'
```

Update the existing `build.context` and `image` values while keeping the other service settings. After starting Sail, run `sail php -v` and `sail composer check-platform-reqs` to verify PHP 8.3.36 or higher and the required extensions. The bootstrap command's `--ignore-platform-reqs` flag does not verify runtime compatibility.

## Installation steps

For a fresh install, copy `.env.example` to `.env` if the file is missing. Once dependencies are installed and Sail is running, run `sail artisan key:generate` if `APP_KEY` is empty, before running migrations. Preserve an existing site's `.env` and `APP_KEY` during upgrades.

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

Run `sail down`, `sail build --no-cache`, and `sail up -d` to rebuild and restart the services while keeping named database volumes. Do not add `-v` to `down` unless you intend to delete those volumes and their data.

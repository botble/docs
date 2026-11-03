# Install using Docker.

_Docker installation for development only, do not use it on production environment._

Botble utilizes [Laravel Sail](https://laravel.com/docs/13.x/sail). Please refer to the official documentation for instructions on how to use Laravel Sail.

## PHP runtime

Check `docker-compose.yml` (or `compose.yaml`) before building. Use a Sail runtime supported by the CMS, for example PHP 8.4:

```yaml
# Under services.laravel.test
build:
    context: './vendor/laravel/sail/runtimes/8.4'
    dockerfile: Dockerfile
image: 'sail-8.4/app'
```

Update the existing `build.context` and `image` values while keeping the other service settings. After starting Sail, run `sail php -v` and `sail composer check-platform-reqs` to verify PHP 8.3.0 or higher and the required extensions. The bootstrap command's `--ignore-platform-reqs` flag does not verify runtime compatibility.

## Installation steps

For a fresh install, copy `.env.example` to `.env` if the file is missing. Once dependencies are installed and Sail is running, run `sail artisan key:generate` if `APP_KEY` is empty, before running migrations. Preserve an existing site's `.env` and `APP_KEY` during upgrades.

- Open `.env` file and change:
  - `DB_HOST=127.0.0.1` to `DB_HOST=mysql`
  - `DB_USERNAME=` to `DB_USERNAME=botble` (or any username you want)
  - `DB_PASSWORD=` to `DB_PASSWORD=botble` (or any password you want)
- Run below command to initial Laravel Sail:
  ```shell
  docker run --rm --interactive --tty \
    --volume $PWD:/app \
    --volume ${COMPOSER_HOME:-$HOME/.composer}:/tmp \
    composer install --ignore-platform-reqs
  ```
- Set up a shell alias for `sail`
  ```bash
  alias sail='sh $([ -f sail ] && echo sail || echo vendor/bin/sail)'
  ```
- Run `sail build --no-cache` to rebuild sail image.
- Run `sail up -d` to start the services.
- Run `sail composer install` to install the dependencies from the lockfile.
- Run `sail artisan migrate` to create the database structure.
- Run `sail artisan db:seed` if you need our sample data.
- Run `sail artisan cms:publish:assets` to publish assets.
- Open `http://localhost` to see the homepage (or `http://localhost:{your_port}`).
- Admin panel URL: `http://localhost/admin`
- Default admin account:
    - If you use our sample data, the default admin account is `admin` with the password `12345678`.
    - If not, run `sail artisan cms:user:create` to create an admin user.
- Run `sail down` to stop the services.

::: tip
Sometimes ports are already in use. You can change the port in the `docker-compose.yml` file or use environment variables to change the port (e.g. `APP_PORT=8080`).
:::

## Issues

### Rebuild images

Run `sail down`, `sail build --no-cache`, and `sail up -d` to rebuild and restart the services while keeping named database volumes. Do not add `-v` to `down` unless you intend to delete those volumes and their data.

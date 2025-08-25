# Install using Docker.

_Docker installation for development only, do not use it on production environment._

Botble utilizes [Laravel Sail](https://laravel.com/docs/12.x/sail). Please refer to the official documentation for instructions on how to use Laravel Sail.

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
- Configuring A Shell AliasSetup alias for `sail`
  ```bash
  alias sail='sh $([ -f sail ] && echo sail || echo vendor/bin/sail)'
  ```
- Run `sail build --no-cache` to rebuild sail image.
- Run `sail up -d` to start the services.
- Run `sail composer install` to install the dependencies (or `update` command).
- Run `sail artisan migrate` to create the database structure.
- Run `sail artisan db:seed` if you need our sample data.
- run `sail artisan cms:publish:assets` to publish assets.
- open `http://localhost` to see the homepage (or `http://localhost:{your_port}`).
- admin panel url: `http://localhost/admin`
- default admin account:
    - if you use our sample data, the default admin account is `admin` with the password `12345678`.
    - if not, run `sail artisan cms:user:create` to create an admin user.
- run `sail down` to stop the services.

::: tip
somethings ports are already in use, you can change the port in the `docker-compose.yml` file or use environment variables to change the port (e.g: `app_port=8080`).
:::

## issues

### Rebuild images

Run `docker-compose down -v` and then `sail build --no-cache` to rebuild the images.

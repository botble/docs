# Installation

## Requirements

Before installing our script, ensure that your server meets the following requirements:

- Apache, nginx, LiteSpeed, or another compatible web server
- PHP >= 8.3 (PHP 8.4 is supported)
- MySQL >= 5.7 or MariaDB >= 10.3
- `PDO` PHP extension
- `OpenSSL` PHP extension
- `mbstring` PHP extension
- `exif` PHP extension
- `fileinfo` PHP extension
- `xml` PHP extension
- `Ctype` PHP extension
- `JSON` PHP extension
- `Tokenizer` PHP extension
- `cURL` PHP extension
- `zip` PHP extension
- `iconv` PHP extension
- Ensure the `mod_rewrite` Apache module is enabled

## PHP Configuration

Open your php configuration file `php.ini` and change the following settings.

```ini
memory_limit = 256M
max_execution_time = 300
output_buffering = 4096
upload_max_filesize = 128M
post_max_size = 128M
```

::: warning `output_buffering` must not be `0`
With output buffering disabled, PHP flushes response headers before Laravel can write the session cookie. The symptom
is an **admin login that silently redirects back to the login page** with no error and no log entry — which also blocks
a fresh install from completing the first-time admin sign-in.

Any non-zero value works, and `zlib.output_compression = On` implicitly enables buffering too. See
[Admin Login Redirect Loop](/cms/troubleshooting#admin-login-redirect-loop-no-error-shown) for per-host instructions.
:::

`post_max_size` must be greater than or equal to `upload_max_filesize`, otherwise large media uploads fail. See
[Media Upload Errors](/cms/media-upload-errors).

If you are using cPanel, you can
follow [this article](https://chemicloud.com/kb/article/how-to-increase-the-php-memory-limit-in-cpanel/) to change your
PHP memory limit settings.

::: tip
On this project, we're using the Laravel 13.x. Please go to [Laravel documentation page](https://laravel.com/docs/13.x)
for more information.
:::

## About the `.env` file

The downloaded package does **not** contain a `.env` file, and that is intentional — it is generated during
installation, not shipped.

The web installer reads `.env.example` and writes `.env` for you, so you only need to upload the source, point your
document root at `/public`, and open the site URL. The install wizard collects your database credentials and creates the
file.

For a manual or CLI setup, create it yourself:

```bash
cp .env.example .env
php artisan key:generate
```

Then set `APP_URL` and the `DB_*` variables before running the installer or `php artisan migrate --seed`.

::: danger Never overwrite a live `.env`
When updating an existing install, do not extract a fresh package on top of it with a tool that overwrites `.env`.
Losing `APP_KEY` invalidates every session and makes encrypted database columns unreadable. See
[.env Overwritten After Manual Update](/cms/troubleshooting#env-overwritten-after-manual-update).
:::

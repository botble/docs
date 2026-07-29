# Requirements

Before installing SnapCart, make sure your server meets the following requirements.

## Server

- Apache, nginx, LiteSpeed, or another compatible web server
- PHP >= 8.3 (PHP 8.4 is supported)
- MySQL >= 5.7 or MariaDB >= 10.3
- `mod_rewrite` enabled (Apache)

## PHP Extensions

`PDO`, `OpenSSL`, `mbstring`, `exif`, `fileinfo`, `xml`, `Ctype`, `JSON`, `Tokenizer`, `cURL`, `zip`, `iconv`

## PHP Configuration

Open your `php.ini` file and set:

```ini
memory_limit = 256M
max_execution_time = 300
output_buffering = 4096
upload_max_filesize = 128M
post_max_size = 128M
```

::: warning `output_buffering` must not be `0`
With output buffering disabled, PHP flushes response headers before Laravel can write the session cookie. The symptom
is an **admin login that silently redirects back to the login page** with no error and no log entry.

Any non-zero value works. See
[Admin Login Redirect Loop](/cms/troubleshooting#admin-login-redirect-loop-no-error-shown) for per-host instructions.
:::

`post_max_size` must be greater than or equal to `upload_max_filesize`, otherwise large product image uploads fail.

## About the `.env` file

The downloaded package does **not** contain a `.env` file — it is generated during installation, not shipped.

The web installer reads `.env.example` and writes `.env` for you. For a manual or CLI setup, create it yourself:

```bash
cp .env.example .env
php artisan key:generate
```

::: danger Never overwrite a live `.env`
When updating an existing install, do not extract a fresh package on top of it with a tool that overwrites `.env`.
Losing `APP_KEY` invalidates every session and makes encrypted database columns unreadable.
:::

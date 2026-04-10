# Installation

## Requirements

License Manager is a **standalone application** - it does not require Botble CMS. Before installing, ensure your server meets the following requirements:

- Apache, nginx, or another compatible web server
- PHP >= 8.3 or higher
- MySQL Database server
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
```

If you are using cPanel, you can
follow [this article](https://chemicloud.com/kb/article/how-to-increase-the-php-memory-limit-in-cpanel/) to change your
PHP memory limit settings.

## Software Requirements

- MySQL 5.7+ or MariaDB 10.2+
- Composer 2.x

::: tip
The License Manager server is built on Laravel 13.x. You don't need Laravel knowledge to use it — your client applications communicate via a standard REST API and can be written in any language. For server administration details, see the [Laravel documentation](https://laravel.com/docs/13.x).
:::

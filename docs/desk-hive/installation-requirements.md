# Installation

## Requirements

DeskHive is a **standalone Laravel application**. Before installing, ensure your server meets the following requirements:

- Apache, nginx, or another compatible web server
- PHP >= 8.2 or higher
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

Open your PHP configuration file `php.ini` and change the following settings.

```ini
memory_limit = 256M
max_execution_time = 300
```

If you are using cPanel, you can follow [this article](https://chemicloud.com/kb/article/how-to-increase-the-php-memory-limit-in-cpanel/) to change your PHP memory limit settings.

## Software Requirements

- MySQL 5.7+ or MariaDB 10.2+
- Composer 2.x
- Laravel 12.x (included)

::: tip
DeskHive is built on Laravel 12.x. Please go to the [Laravel documentation page](https://laravel.com/docs/12.x) for more information.
:::

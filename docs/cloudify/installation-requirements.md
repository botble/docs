# Installation

## Requirements

Before installing our script, ensure that your server meets the following requirements:

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

Open your php configuration file `php.ini` and change the following settings.

```ini
memory_limit = 256M
max_execution_time = 300
```

If you are using cPanel, you can
follow [this article](https://chemicloud.com/kb/article/how-to-increase-the-php-memory-limit-in-cpanel/) to change your
PHP memory limit settings.

::: tip
On this project, we're using the Laravel 10.x. Please go to [Laravel documentation page](https://laravel.com/docs/10.x)
for more information.
:::

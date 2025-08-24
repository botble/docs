# Installation

## Requirements

Before installing Restoria theme, ensure that your server meets the following requirements:

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

If you are using cPanel, you can follow [this article](https://chemicloud.com/kb/article/how-to-increase-the-php-memory-limit-in-cpanel/) to change your PHP memory limit settings.

::: tip
Restoria is built on Botble CMS using Laravel 12.x. Please go to [Laravel documentation page](https://laravel.com/docs) for more information about the framework.
:::

## Database Requirements

Restoria requires a MySQL database to store your content. Make sure you have:

- MySQL 5.7+ or MariaDB 10.3+
- A database created for your Restoria installation
- Database user with full privileges on the database

## Recommended Server Configuration

For optimal performance with Restoria restaurant theme:

- **RAM**: Minimum 2GB
- **Storage**: 10GB+ (to accommodate images of dishes, restaurant photos, etc.)
- **CPU**: 2+ cores
- **PHP Memory Limit**: 256MB or higher
- **Max Upload Size**: 32MB (for high-quality food images)
- **Max Execution Time**: 300 seconds

## Browser Requirements

The Restoria admin panel works best with:

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

::: warning
Internet Explorer is not supported. Please use a modern browser for the best experience.
:::
# Installation via Command Line

For developers who prefer command-line installation over the web installer.

## Step 1: Download and Extract

1. Download the package from CodeCanyon
2. Extract to your server's web directory (e.g., `/var/www/license-manager`)

## Step 2: Set Permissions

```bash
chmod -R 755 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```

## Step 3: Environment Configuration

Copy the example environment file and generate application key:

```bash
cp .env.example .env
php artisan key:generate
```

Edit `.env` with your database credentials:

```ini
APP_URL=https://your-domain.com

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=license_manager
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

## Step 4: Run Migrations and Seeders

```bash
php artisan migrate --seed
```

This creates all database tables and the default admin account.

## Step 5: Create Admin Account (Optional)

If you need to create an additional admin:

```bash
php artisan cms:user:create
```

## Step 6: Storage Link

```bash
php artisan storage:link
```

## Step 7: Web Server Configuration

### Nginx

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/license-manager/public;

    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

### Apache

Ensure `mod_rewrite` is enabled. The `.htaccess` file is included in the package.

```apache
<VirtualHost *:80>
    ServerName your-domain.com
    DocumentRoot /var/www/license-manager/public

    <Directory /var/www/license-manager/public>
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

## Step 8: Setup Cron Job

Follow the [Cronjob Setup Guide](https://docs.botble.com/cms/cronjob.html) to configure scheduled tasks for license expiration processing.

## Verify Installation

### Check Admin Panel

Visit: `https://your-domain.com/admin`

Default credentials:
- Email: `admin@botble.com`
- Password: `12345678`

### Test API Connection

```bash
curl -X GET "https://your-domain.com/api/external/connection-check" \
  -H "X-API-KEY: your-api-key"
```

Expected response:

```json
{
  "status": true,
  "message": "Connection successful"
}
```

::: tip
After installation, configure License Manager at **License Manager → Settings**.
:::

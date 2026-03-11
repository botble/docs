# Installation via Command Line

For developers who prefer command-line installation over the web installer.

## Step 1: Download and Extract

1. Download the package from CodeCanyon
2. Extract to your server's web directory (e.g., `/var/www/desk-hive`)

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
DB_DATABASE=desk_hive
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

## Step 4: Install Dependencies

```bash
composer install --no-dev
npm install && npm run prod
```

## Step 5: Run Migrations and Seeders

```bash
php artisan migrate --seed
```

This creates all database tables and the default admin account.

## Step 6: Create Admin Account (Optional)

If you need to create an additional admin:

```bash
php artisan cms:user:create
```

## Step 7: Storage Link

```bash
php artisan storage:link
```

## Step 8: Web Server Configuration

### Nginx

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/desk-hive/public;

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
    DocumentRoot /var/www/desk-hive/public

    <Directory /var/www/desk-hive/public>
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

## Step 9: Setup Cron Job

Add the following cron entry to configure scheduled tasks for auto-closing inactive tickets:

```bash
* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1
```

## Verify Installation

Visit the admin panel:

```
https://your-domain.com/admin
```

Default credentials:
- Email: `admin@botble.com`
- Password: `12345678`

Then navigate to **Admin → Support Desk → Tickets** to confirm everything is working.

::: tip
After installation, configure DeskHive at **Admin → Support Desk → Settings**.
:::

# Installation via Command Line

## Overview

For developers and technical users, installing Restoria via command line provides more control and is faster than the web interface method.

## Prerequisites

Ensure you have:
- SSH access to your server
- Composer installed globally
- Node.js and NPM installed
- MySQL database created
- Required PHP extensions enabled

## Step 1: Download and Extract

```bash
# Navigate to your web directory
cd /var/www/html

# Download Restoria (replace with your actual download link)
# Or upload via FTP and extract
unzip restoria.zip

# Navigate to project directory
cd restoria
```

## Step 2: Install Dependencies

```bash
# Install PHP dependencies
composer install --no-dev --optimize-autoloader

# Install Node dependencies
npm install

# Build assets for production
npm run prod
```

## Step 3: Environment Configuration

```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

Edit the `.env` file with your database and site details:

```env
APP_NAME="Your Restaurant Name"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password

# Mail Configuration (optional but recommended)
MAIL_MAILER=smtp
MAIL_HOST=your_mail_host
MAIL_PORT=587
MAIL_USERNAME=your_mail_username
MAIL_PASSWORD=your_mail_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@yourdomain.com
MAIL_FROM_NAME="${APP_NAME}"
```

## Step 4: Run Installation

```bash
# Run database migrations
php artisan migrate

# Create admin user
php artisan cms:user:create

# Install and activate plugins
php artisan cms:plugin:activate:all

# Publish CMS assets
php artisan cms:publish:assets

# Create symbolic link for storage
php artisan storage:link
```

## Step 5: Import Sample Data (Optional)

If you want to import sample data:

```bash
# Import database sample
php artisan cms:db:import

# Import theme sample data
php artisan cms:theme:activate restoria
```

## Step 6: Set Permissions

```bash
# Set proper ownership (replace www-data with your web server user)
sudo chown -R www-data:www-data .

# Set directory permissions
find . -type d -exec chmod 755 {} \;

# Set file permissions
find . -type f -exec chmod 644 {} \;

# Make specific directories writable
chmod -R 775 storage
chmod -R 775 bootstrap/cache
```

## Step 7: Configure Web Server

### Apache Configuration

Create or edit your virtual host configuration:

```apache
<VirtualHost *:80>
    ServerName yourdomain.com
    DocumentRoot /var/www/html/restoria/public
    
    <Directory /var/www/html/restoria/public>
        AllowOverride All
        Require all granted
    </Directory>
    
    ErrorLog ${APACHE_LOG_DIR}/restoria-error.log
    CustomLog ${APACHE_LOG_DIR}/restoria-access.log combined
</VirtualHost>
```

Enable the site and required modules:

```bash
sudo a2ensite restoria
sudo a2enmod rewrite
sudo systemctl restart apache2
```

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/html/restoria/public;
    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

## Step 8: Optimize for Production

```bash
# Cache configuration
php artisan config:cache

# Cache routes
php artisan route:cache

# Cache views
php artisan view:cache

# Optimize autoloader
composer dump-autoload --optimize
```

## Step 9: Setup Cron Job

Add this cron job for scheduled tasks:

```bash
# Open crontab
crontab -e

# Add this line
* * * * * cd /var/www/html/restoria && php artisan schedule:run >> /dev/null 2>&1
```

## Step 10: Setup Queue Worker (Optional)

For better performance with reservations and email notifications:

```bash
# Install Supervisor
sudo apt-get install supervisor

# Create supervisor configuration
sudo nano /etc/supervisor/conf.d/restoria-worker.conf
```

Add this configuration:

```ini
[program:restoria-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/html/restoria/artisan queue:work --sleep=3 --tries=3
autostart=true
autorestart=true
user=www-data
numprocs=2
redirect_stderr=true
stdout_logfile=/var/www/html/restoria/storage/logs/worker.log
```

Start the worker:

```bash
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start restoria-worker:*
```

## Verification

Verify your installation:

```bash
# Check Laravel installation
php artisan about

# Check database connection
php artisan tinker
>>> DB::connection()->getPdo();

# Check storage link
ls -la public/storage
```

## Troubleshooting

### Permission Issues
```bash
# Fix permissions
sudo chmod -R 775 storage bootstrap/cache
sudo chown -R www-data:www-data storage bootstrap/cache
```

### Composer Memory Errors
```bash
# Increase memory limit
COMPOSER_MEMORY_LIMIT=-1 composer install
```

### NPM Build Errors
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Database Migration Errors
```bash
# Reset migrations
php artisan migrate:fresh --seed
```

## Security Recommendations

After installation:

1. **Disable Debug Mode**: Set `APP_DEBUG=false` in `.env`
2. **Set Strong Passwords**: Use complex passwords for admin and database
3. **Configure Firewall**: Only allow necessary ports
4. **Regular Updates**: Keep Restoria and dependencies updated
5. **Backup Regularly**: Set up automated backups

::: warning
Always backup your database and files before performing updates or major changes.
:::
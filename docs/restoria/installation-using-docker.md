# Installation using Docker

## Overview

Docker provides a consistent environment for running Restoria across different systems. This guide will help you set up Restoria using Docker containers.

## Prerequisites

- Docker installed on your system ([Install Docker](https://docs.docker.com/get-docker/))
- Docker Compose installed ([Install Docker Compose](https://docs.docker.com/compose/install/))
- Basic knowledge of Docker commands
- At least 2GB of available RAM

## Quick Start

### Step 1: Prepare Project Files

```bash
# Create project directory
mkdir restoria-docker
cd restoria-docker

# Extract Restoria files here
unzip path/to/restoria.zip
```

### Step 2: Create Docker Configuration

Create a `docker-compose.yml` file in your project root:

```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: restoria-app
    restart: unless-stopped
    working_dir: /var/www/html
    volumes:
      - ./:/var/www/html
      - ./docker/php/local.ini:/usr/local/etc/php/conf.d/local.ini
    networks:
      - restoria-network
    depends_on:
      - db

  webserver:
    image: nginx:alpine
    container_name: restoria-nginx
    restart: unless-stopped
    ports:
      - "8080:80"
      - "443:443"
    volumes:
      - ./:/var/www/html
      - ./docker/nginx/conf.d:/etc/nginx/conf.d
    networks:
      - restoria-network
    depends_on:
      - app

  db:
    image: mysql:8.0
    container_name: restoria-db
    restart: unless-stopped
    environment:
      MYSQL_DATABASE: restoria
      MYSQL_ROOT_PASSWORD: secret
      MYSQL_PASSWORD: secret
      MYSQL_USER: restoria_user
    ports:
      - "3306:3306"
    volumes:
      - dbdata:/var/lib/mysql
      - ./docker/mysql/my.cnf:/etc/mysql/my.cnf
    networks:
      - restoria-network

  phpmyadmin:
    image: phpmyadmin/phpmyadmin
    container_name: restoria-phpmyadmin
    restart: unless-stopped
    ports:
      - "8081:80"
    environment:
      PMA_HOST: db
      MYSQL_ROOT_PASSWORD: secret
    networks:
      - restoria-network
    depends_on:
      - db

networks:
  restoria-network:
    driver: bridge

volumes:
  dbdata:
    driver: local
```

### Step 3: Create Dockerfile

Create a `Dockerfile` in your project root:

```dockerfile
FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libzip-dev \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libwebp-dev

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install Node.js and npm
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs

# Set working directory
WORKDIR /var/www/html

# Copy existing application directory permissions
COPY --chown=www-data:www-data . /var/www/html

# Change current user to www-data
USER www-data

# Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["php-fpm"]
```

### Step 4: Create Nginx Configuration

Create directory structure:
```bash
mkdir -p docker/nginx/conf.d
```

Create `docker/nginx/conf.d/app.conf`:

```nginx
server {
    listen 80;
    server_name localhost;
    root /var/www/html/public;
    index index.php index.html;

    client_max_body_size 32M;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        try_files $uri =404;
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass app:9000;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param PATH_INFO $fastcgi_path_info;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

### Step 5: Create PHP Configuration

Create `docker/php/local.ini`:

```ini
upload_max_filesize = 32M
post_max_size = 32M
memory_limit = 256M
max_execution_time = 300
```

### Step 6: Create MySQL Configuration

Create `docker/mysql/my.cnf`:

```ini
[mysqld]
general_log = 1
general_log_file = /var/lib/mysql/general.log
max_allowed_packet = 64M
```

### Step 7: Environment Configuration

Copy and configure `.env` file:

```bash
cp .env.example .env
```

Update `.env` with Docker database settings:

```env
APP_NAME="Restoria Restaurant"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8080

DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=restoria
DB_USERNAME=restoria_user
DB_PASSWORD=secret
```

### Step 8: Build and Start Containers

```bash
# Build and start containers
docker-compose up -d --build

# Check if containers are running
docker-compose ps
```

### Step 9: Install Restoria

```bash
# Install Composer dependencies
docker-compose exec app composer install

# Install Node dependencies and build assets
docker-compose exec app npm install
docker-compose exec app npm run prod

# Generate application key
docker-compose exec app php artisan key:generate

# Run migrations
docker-compose exec app php artisan migrate

# Create admin user
docker-compose exec app php artisan cms:user:create

# Activate all plugins
docker-compose exec app php artisan cms:plugin:activate:all

# Publish assets
docker-compose exec app php artisan cms:publish:assets

# Create storage link
docker-compose exec app php artisan storage:link

# Import sample data (optional)
docker-compose exec app php artisan cms:db:import
```

### Step 10: Set Permissions

```bash
# Set proper permissions
docker-compose exec app chmod -R 775 storage bootstrap/cache
```

## Accessing Restoria

- **Website**: http://localhost:8080
- **Admin Panel**: http://localhost:8080/admin
- **phpMyAdmin**: http://localhost:8081

## Docker Commands Reference

### Starting and Stopping

```bash
# Start containers
docker-compose up -d

# Stop containers
docker-compose down

# Restart containers
docker-compose restart

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f app
```

### Maintenance Commands

```bash
# Clear cache
docker-compose exec app php artisan cache:clear

# Run migrations
docker-compose exec app php artisan migrate

# Access app container shell
docker-compose exec app bash

# Access MySQL shell
docker-compose exec db mysql -u root -p
```

### Backup and Restore

```bash
# Backup database
docker-compose exec db mysqldump -u root -p restoria > backup.sql

# Restore database
docker-compose exec -T db mysql -u root -p restoria < backup.sql

# Backup files
docker run --rm -v restoria-docker_app:/data -v $(pwd):/backup alpine tar czf /backup/files-backup.tar.gz /data
```

## Production Deployment

For production deployment:

1. **Update docker-compose.yml**:
   - Remove phpMyAdmin service
   - Use environment variables for sensitive data
   - Add SSL certificates

2. **Use .env for production**:
```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com
```

3. **Add SSL with Let's Encrypt**:
```yaml
certbot:
  image: certbot/certbot
  volumes:
    - ./certbot/conf:/etc/letsencrypt
    - ./certbot/www:/var/www/certbot
```

4. **Optimize containers**:
```bash
# Build optimized image
docker build -t restoria:production . --target production

# Use multi-stage builds
docker-compose -f docker-compose.prod.yml up -d
```

## Troubleshooting

### Container won't start
```bash
# Check logs
docker-compose logs app

# Rebuild containers
docker-compose down
docker-compose up -d --build
```

### Permission issues
```bash
# Fix ownership
docker-compose exec app chown -R www-data:www-data storage bootstrap/cache
```

### Database connection issues
```bash
# Check database is running
docker-compose ps db

# Test connection
docker-compose exec app php artisan tinker
>>> DB::connection()->getPdo();
```

### Memory issues
Increase Docker memory allocation in Docker Desktop settings or add to docker-compose.yml:
```yaml
app:
  mem_limit: 2g
```

## Docker on Different Platforms

### Windows (WSL2)
- Enable WSL2 in Docker Desktop
- Store projects in WSL2 filesystem for better performance

### macOS
- Enable VirtioFS for improved performance
- Allocate sufficient resources in Docker Desktop

### Linux
- Add user to docker group: `sudo usermod -aG docker $USER`
- No additional configuration needed

::: tip
For production deployments, consider using orchestration tools like Kubernetes or Docker Swarm for better scalability and management.
:::
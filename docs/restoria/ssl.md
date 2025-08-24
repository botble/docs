# SSL Certificate Setup

SSL (Secure Sockets Layer) certificates are essential for restaurant websites to protect customer data, especially for online reservations and payments. This guide will help you set up SSL for your Restoria website.

## Why SSL is Important for Restaurants

1. **Customer Trust**: Shows the padlock icon in browsers
2. **Data Security**: Encrypts reservation and payment information
3. **SEO Benefits**: Google prioritizes HTTPS sites
4. **PCI Compliance**: Required for processing payments
5. **Professional Image**: Modern customers expect secure sites

## SSL Setup Methods

### Method 1: Let's Encrypt (Free SSL)

#### Using cPanel

1. **Log into cPanel**
   - Access your hosting control panel
   - Navigate to **Security** section

2. **Find Let's Encrypt SSL**
   - Click on **Let's Encrypt SSL** or **SSL/TLS Status**
   - Select your domain

3. **Install Certificate**
   - Click **Issue** or **Run AutoSSL**
   - Wait for validation (usually instant)
   - Certificate auto-renews every 90 days

#### Using Command Line

```bash
# Install Certbot
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# Obtain certificate for Nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Or for Apache
sudo certbot --apache -d yourdomain.com -d www.yourdomain.com

# Test auto-renewal
sudo certbot renew --dry-run
```

### Method 2: CloudFlare SSL (Free with CDN)

1. **Sign up for CloudFlare**
   - Create free account at cloudflare.com
   - Add your website

2. **Update Nameservers**
   - Change nameservers at your domain registrar
   - Point to CloudFlare nameservers

3. **Configure SSL Settings**
   - Go to **SSL/TLS** tab
   - Select **Full (Strict)** mode
   - Enable **Always Use HTTPS**

4. **Enable Auto-Redirect**
   - Go to **SSL/TLS** → **Edge Certificates**
   - Enable **Always Use HTTPS**
   - Enable **Automatic HTTPS Rewrites**

### Method 3: Paid SSL Certificate

1. **Purchase SSL Certificate**
   - Choose certificate type:
     - **Domain Validated (DV)**: Basic, quick validation
     - **Organization Validated (OV)**: Shows company name
     - **Extended Validation (EV)**: Green bar, highest trust

2. **Generate CSR**
   ```bash
   # Generate private key
   openssl genrsa -out private.key 2048
   
   # Generate CSR
   openssl req -new -key private.key -out domain.csr
   ```

3. **Complete Validation**
   - Submit CSR to certificate provider
   - Complete domain validation (email/DNS/file)
   - Download certificate files

4. **Install Certificate**
   - Upload certificate files to server
   - Configure web server (see below)

## Web Server Configuration

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;
    
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    # SSL Security Settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    
    # HSTS (optional but recommended)
    add_header Strict-Transport-Security "max-age=31536000" always;
    
    root /var/www/restoria/public;
    index index.php;
    
    # Rest of your configuration...
}
```

### Apache Configuration

```apache
<VirtualHost *:80>
    ServerName yourdomain.com
    Redirect permanent / https://yourdomain.com/
</VirtualHost>

<VirtualHost *:443>
    ServerName yourdomain.com
    DocumentRoot /var/www/restoria/public
    
    SSLEngine on
    SSLCertificateFile /path/to/certificate.crt
    SSLCertificateKeyFile /path/to/private.key
    SSLCertificateChainFile /path/to/chain.crt
    
    # Security Headers
    Header always set Strict-Transport-Security "max-age=31536000"
    
    # Rest of your configuration...
</VirtualHost>
```

## Update Restoria Configuration

### 1. Update .env File

```env
APP_URL=https://yourdomain.com
FORCE_HTTPS=true
SESSION_SECURE_COOKIE=true
```

### 2. Force HTTPS in Laravel

Edit `app/Providers/AppServiceProvider.php`:

```php
public function boot()
{
    if (config('app.env') === 'production') {
        \URL::forceScheme('https');
    }
}
```

### 3. Update .htaccess (Apache)

```apache
# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} !=on
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]
```

## Mixed Content Issues

After enabling SSL, you might encounter mixed content warnings.

### Finding Mixed Content

1. **Browser Console**
   - Open Developer Tools (F12)
   - Check Console for warnings
   - Look for "Mixed Content" errors

2. **Online Tools**
   - Use tools like Why No Padlock
   - Scan for insecure resources

### Fixing Mixed Content

1. **Update Database URLs**
   ```sql
   UPDATE options SET option_value = 
   REPLACE(option_value, 'http://yourdomain.com', 'https://yourdomain.com');
   ```

2. **Update Asset URLs**
   ```bash
   # Search and replace in files
   find . -type f -exec sed -i 's/http:\/\/yourdomain/https:\/\/yourdomain/g' {} +
   ```

3. **Clear Caches**
   ```bash
   php artisan cache:clear
   php artisan config:clear
   php artisan view:clear
   ```

## SSL Certificate Renewal

### Auto-Renewal Setup

#### Let's Encrypt
```bash
# Add to crontab
0 3 * * * /usr/bin/certbot renew --quiet
```

#### CloudFlare
- Automatic renewal included
- No action required

#### Paid Certificates
- Set calendar reminders
- Renew 30 days before expiry
- Some providers offer auto-renewal

## Testing SSL Configuration

### Online Testing Tools

1. **SSL Labs Test**
   - Visit: https://www.ssllabs.com/ssltest/
   - Enter your domain
   - Aim for A+ rating

2. **SSL Checker**
   - Various online SSL checkers
   - Verify certificate chain
   - Check expiration date

### Command Line Testing

```bash
# Check certificate details
openssl s_client -connect yourdomain.com:443 -servername yourdomain.com

# Check expiration
echo | openssl s_client -connect yourdomain.com:443 2>/dev/null | \
openssl x509 -noout -dates

# Test HTTPS redirect
curl -I http://yourdomain.com
```

## Security Best Practices

### 1. Strong Configuration

```nginx
# Strong SSL Configuration for Nginx
ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256;
ssl_prefer_server_ciphers off;
ssl_session_cache shared:SSL:10m;
ssl_session_timeout 10m;
ssl_stapling on;
ssl_stapling_verify on;
```

### 2. Security Headers

```nginx
# Security Headers
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
```

### 3. HSTS Preloading

1. **Enable HSTS**
   ```nginx
   add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
   ```

2. **Submit for Preloading**
   - Visit: https://hstspreload.org/
   - Submit your domain
   - Wait for inclusion

## Troubleshooting

### Certificate Not Trusted

**Causes:**
- Self-signed certificate
- Expired certificate
- Missing intermediate certificates

**Solutions:**
- Use trusted CA certificate
- Renew expired certificate
- Install full certificate chain

### Redirect Loops

**Causes:**
- CloudFlare Flexible SSL with forced HTTPS
- Incorrect server configuration

**Solutions:**
- Use CloudFlare Full SSL mode
- Check .htaccess rules
- Verify load balancer settings

### Performance Issues

**Causes:**
- Weak cipher suites
- No session caching
- Missing OCSP stapling

**Solutions:**
- Optimize SSL configuration
- Enable session caching
- Implement OCSP stapling

## Restaurant-Specific Considerations

### Payment Processing
- PCI DSS requires SSL for payment pages
- Use strong encryption (TLS 1.2+)
- Regular security audits

### Customer Data
- Encrypt reservation forms
- Secure customer databases
- Protect personal information

### Third-Party Integrations
- Ensure all external resources use HTTPS
- Update API endpoints to HTTPS
- Verify webhook URLs

## Monitoring SSL

### Set Up Monitoring

1. **Expiration Alerts**
   - Use monitoring services
   - Set calendar reminders
   - Configure email alerts

2. **Uptime Monitoring**
   - Monitor HTTPS availability
   - Check certificate validity
   - Test automatic redirects

3. **Security Scanning**
   - Regular SSL tests
   - Check for vulnerabilities
   - Monitor security headers

::: warning Important
Always test SSL configuration in a staging environment before applying to production. Incorrect SSL setup can make your site inaccessible.
:::

::: tip
Consider using CloudFlare for free SSL with additional benefits like CDN, DDoS protection, and performance optimization.
:::
# License

## Understanding Your License

Botble CMS is distributed under the Envato Standard License or Extended License. It's important to understand what each license allows you to do.

### License Types

#### Regular License vs. Extended License

The license type is based on your site's charging model:

- **Regular License**: Suitable if your website does not charge end users for access or services.
- **Extended License**: Required if you have paying users who you charge for accessing or using your service (monthly or yearly subscription, commission fee on each sale as SaaS, etc.).

You can start with a regular license and upgrade to an extended license once you have paying users.

::: tip
Please read the official license rules here: [Envato Standard License](https://codecanyon.net/licenses/standard)
:::

### One License, One Website

As per Envato's licensing rules, one license can only be used for one website. This includes:

- One domain
- One subdomain
- One subfolder
- One IP address

If you want to use Botble CMS for multiple sites or clients, you need to purchase multiple licenses.

### Development Environments

You can use Botble CMS without activating a license on development, staging, or UAT environments for development purposes without violating license terms. All features will work fine except:

- System updater
- Installing new plugins from [Botble Marketplace](https://marketplace.botble.com/products)

This allows you to develop and test your site before deploying to production.

## Activate License

In admin panel, go to `Settings` -> `General` to activate your license.

![Activate license](../cms/images/license.png)

If you don't know how to get purchase code, check this
article [Where Is My Purchase Code?](https://help.market.envato.com/hc/en-us/articles/202822600-Where-Is-My-Purchase-Code)

::: warning
If you can't activate your license, please create a ticket on https://botble.ticksy.com, our dev team will support you.
Don't try to activate it many times, your domain & IP will be added to blacklist.
:::

## License Usage Guidelines

### Activation Limits

- Regular License can only be activated on 1 domain.
- Each license is tied to a specific domain and cannot be used on multiple websites simultaneously.

### Moving Your Website

- If you want to reinstall or move your website to a new server, you need to either:
  - Back up your license file in `/storage/.license`, or
  - Deactivate your license before moving, then reactivate it on the new server

### Domain Changes

- If you change your website configuration, please deactivate your license first:
  - Switching between www and non-www (e.g., example.com to www.example.com)
  - Changing from HTTP to HTTPS or vice versa
  - Moving to a different domain name

### License Deactivation

- You can deactivate your license in the admin panel under Settings -> General
- If you can't access your admin panel or deactivate your license for any reason, please contact us at contact@botble.com, and we will assist you

### Resetting Your License

If you need to reset your license (for example, if you've changed domains or are experiencing activation issues):

1. Please log in to our customer license manager site https://license.botble.com to reset your license
2. Once reset, you can activate your license again on your new domain

This is particularly useful when:
- You've moved your website to a new domain
- You're experiencing issues with license activation
- You need to reinstall your website

### Multiple Environments

- You can use the same license for both your production and development environments, as long as they're not publicly accessible at the same time
- For agencies developing sites for clients, you should purchase a separate license for each client's website

### License Verification

- Our system periodically verifies license activation
- Using the same license on multiple production websites simultaneously violates the license terms and may result in all sites being deactivated

::: warning
Attempting to bypass license verification or using nulled versions of Botble CMS puts your website at risk of security vulnerabilities and malware. Always use properly licensed software.
:::

::: tip
Contact us via email at contact@botble.com if you have any questions about licensing. We're here to help!
:::

## License Upgrades and Transfers

### Upgrading from Regular to Extended License

If your business model changes and you start charging users, you'll need to upgrade from a Regular License to an Extended License:

1. Purchase an Extended License from [CodeCanyon](https://codecanyon.net/item/botble-cms-php-platform-based-on-laravel-framework/16928182)
2. Contact us at contact@botble.com with both your Regular and Extended License purchase codes
3. We'll help you transition to the Extended License

### License Transfers

Envato allows a license to be transferred to another person or company:

1. The original buyer must initiate the transfer through their Envato account
2. Once transferred, the new owner will receive the purchase code and can activate the license
3. The previous owner must deactivate and stop using the product

For more information on license transfers, please refer to [Envato's License FAQ](https://help.market.envato.com/hc/en-us/articles/202501064-License-FAQ).

## Troubleshooting License Activation

### "Could not connect to the license server" / cURL Error 28

If you see the error "Could not connect to the license server. Please site IP: x.x.x.x" or "cURL error 28: Connection timed out", your server cannot reach our license server (`license.botble.com`).

**Common cause:** Your server's firewall is blocking outbound HTTPS (port 443) connections. This is common on servers from Hetzner, DigitalOcean, OVH, and other hosting providers that have strict default firewall rules.

**How to diagnose:**

Run these commands via SSH on your server:

```bash
# Test connectivity to the license server
curl -v --max-time 15 https://license.botble.com/api/health-check

# Test TCP connection to Cloudflare IPs
nc -zv 104.21.76.15 443
nc -zv 172.67.185.15 443
```

If these commands hang or time out, your server's outbound connections are blocked.

**How to fix:**

1. **Check your server firewall:**

```bash
# Check iptables rules
iptables -L OUTPUT -n | grep -i drop

# Check UFW status
ufw status
```

2. **Allow outbound HTTPS traffic:**

```bash
# If using UFW
ufw allow out 443/tcp

# If using iptables
iptables -A OUTPUT -p tcp --dport 443 -j ACCEPT
```

3. **Check hosting provider firewall:** If you use a cloud hosting provider (Hetzner, DigitalOcean, etc.), check their cloud console for firewall settings. Ensure outbound TCP port 443 is allowed.

4. **Contact your hosting provider:** If you're unsure how to configure the firewall, contact your hosting provider and ask them to allow outbound HTTPS (port 443) connections from your server.

::: tip
Our license server is behind Cloudflare. If your hosting provider blocks connections to Cloudflare IPs, you may need to whitelist them. See [Cloudflare IP Ranges](https://www.cloudflare.com/ips/).
:::

### Shared/Managed Hosting (No SSH Access)

If your hosting provider blocks SSH commands like `curl`, `nc`, or `iptables` (common on managed hosting such as Infomaniak), you can test connectivity using PHP instead.

**Step 1: Test basic connectivity**

Create a file called `test-connection.php` in your web root:

```php
<?php
$ch = curl_init("https://www.google.com");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
$response = curl_exec($ch);
if (curl_errno($ch)) {
    echo 'Error: ' . curl_error($ch);
} else {
    echo 'Connection to Google is OK';
}
curl_close($ch);
```

Open this file in your browser (e.g., `https://yourdomain.com/test-connection.php`). If it shows "Connection to Google is OK", PHP cURL is working.

**Step 2: Test license server connectivity**

Create a file called `test-license.php` in your web root:

```php
<?php
$urls = [
    'https://license.botble.com/api/health-check',
    'https://104.21.76.15',
    'https://172.67.185.15',
];

foreach ($urls as $url) {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    $response = curl_exec($ch);
    $error = curl_error($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    echo "$url => HTTP $code | " . ($error ?: 'OK') . "<br>";
}

// DNS check
$ip = gethostbyname('license.botble.com');
echo "<br>DNS: license.botble.com => $ip";
```

Open this file in your browser. Expected results:

- `license.botble.com/api/health-check` → **HTTP 200 | OK** — this means activation should work
- Direct IPs (104.21.x.x, 172.67.x.x) → **SSL errors are expected** — Cloudflare requires the domain name for SSL, so direct IP connections will always show SSL handshake failures. This is normal.
- DNS may resolve to a different IP than expected — this is normal with Cloudflare Anycast.

If the health-check returns HTTP 200, try activating your license again.

::: warning
Remember to delete these test files from your server after troubleshooting.
:::

### "Your license has reached the maximum number of parallel uses"

This error means the license has been activated too many times without being deactivated first. This commonly happens when:

- Reinstalling the CMS without deactivating the license
- Moving to a new server without deactivating first
- Testing on multiple environments

**Solution:** Reset your license at [https://license.botble.com](https://license.botble.com), then try activating again. If you cannot reset it yourself, contact us at contact@botble.com.

### Purchased from Gumroad — "Envato Username" Field

If you purchased from [Gumroad](https://botble.gumroad.com/l/license-manager) instead of CodeCanyon, the activation form still asks for an "Envato username". Since Gumroad purchases don't have Envato usernames, please contact us at contact@botble.com with your Gumroad purchase email, and we will provide you with the correct username and purchase code to use for activation.

## Frequently Asked Questions

### Can I use one license for multiple domains?

No, each domain requires its own license. This includes subdomains and test/staging environments that are publicly accessible.

### Do I need a license for my development environment?

No, you can use Botble CMS on development/staging environments without activating a license, but certain features like system updates and marketplace access will be limited.

### What happens if I don't activate my license?

The system will work normally except for automatic updates and marketplace access. We recommend activating your license to receive security updates and new features.

### Can I use Botble CMS for a client's website?

Yes, but you need to purchase a separate license for each client's website. Alternatively, your client can purchase their own license.

### How do I know if I need an Extended License?

If your website charges users for access or services (subscription model, SaaS, etc.), you need an Extended License. If you're unsure, start with a Regular License and upgrade when necessary.

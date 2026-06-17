---
title: Installation Requirements
description: Server and PHP requirements for DigiMart
---

# Installation Requirements

Before installing DigiMart, ensure your server meets the following requirements.

## Server Requirements

- **PHP:** 8.3 or later
- **Database:** MySQL 5.7+ or MariaDB 10.3+
- **Web Server:** Apache (with mod_rewrite) or Nginx
- **Memory:** 512 MB minimum (1 GB recommended)
- **Disk Space:** 500 MB minimum for installation

## Required PHP Extensions

DigiMart requires the following PHP extensions to be installed and enabled:

- **BCMath** — arbitrary precision mathematics
- **Ctype** — character type checking
- **cURL** — client URL library for HTTP requests
- **DOM** — Document Object Model extension
- **Fileinfo** — file information detection
- **JSON** — JSON encoding/decoding
- **Mbstring** — multibyte string handling
- **OpenSSL** — SSL/TLS cryptography
- **PCRE** — regular expressions
- **PDO** — PHP Data Objects database abstraction
- **Tokenizer** — PHP token parsing
- **XML** — XML parsing
- **Zip** — ZIP archive support

## Command-Line Tools

- **Composer** 2.0+ — for dependency management
- **Node.js** 16+ — for front-end asset compilation
- **npm** or **yarn** — for package management

## Recommended Configuration

```bash
# Check PHP version
php -v

# Verify required extensions are loaded
php -m | grep -E "BCMath|Ctype|curl|dom|fileinfo|json|mbstring|openssl|pcre|pdo|tokenizer|xml|zip"

# Check Composer version
composer --version

# Check Node.js version
node --version
npm --version
```

## Security Checklist

- Enable HTTPS/SSL for your domain
- Set appropriate file permissions (644 for files, 755 for directories)
- Keep PHP and all extensions updated
- Use a strong database password
- Configure a firewall to restrict access to admin panel ports

::: warning Important
After installation, immediately change the default admin credentials (see [License Activation](./license.md)).
:::

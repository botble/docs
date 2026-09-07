---
title: Wildcard DNS and TLS
description: Set up wildcard DNS and on-demand TLS so every store subdomain and custom domain resolves and gets a certificate.
---

# Wildcard DNS and TLS

Every store is a subdomain of your control-plane domain, and a customer can
also point their own domain at a store. Both need DNS and TLS set up before
they work.

## Wildcard DNS

Point your apex domain and a wildcard at the server:

```text
*.yourdomain.com.  A  <server ip>
yourdomain.com.    A  <server ip>
```

This covers the control plane (`yourdomain.com`) and every store subdomain
(`acme.yourdomain.com`, `foo.yourdomain.com`, …) with two records.

## Wildcard TLS

Copy `Caddyfile.example` (in `platform/packages/tenancy/`) and adjust. A
wildcard certificate needs the DNS-01 challenge, so it installs a DNS
provider module for your registrar, for example:

```bash
xcaddy build --with github.com/caddy-dns/cloudflare
```

The example config groups the control plane and every `*.yourdomain.com`
subdomain under one `tls { dns cloudflare {env.CLOUDFLARE_API_TOKEN} }`
block, so a single wildcard certificate covers all of them.

## Serving with nginx

Caddy is the shortest path because it handles wildcard and on-demand
certificates itself. nginx works too, with one server block covering the
control plane and every store:

```nginx
server {
    listen 443 ssl;
    http2 on;
    server_name yourdomain.com *.yourdomain.com;

    ssl_certificate     /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    root /var/www/ecommerce-saas/public;
    index index.php;

    client_max_body_size 128m;

    # Tenant media is served by PHP, never from disk. This block must come
    # BEFORE any static-file location, and "^~" is what makes nginx prefer it
    # over a regex location. See the warning below.
    location ^~ /tenancy/assets/ {
        try_files $uri /index.php?$args;
    }

    location / {
        try_files $uri $uri/ /index.php?$args;
    }

    location ~ \.php$ {
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_pass unix:/run/php/php8.3-fpm.sock;
    }
}

server {
    listen 80;
    server_name yourdomain.com *.yourdomain.com;
    return 301 https://$host$request_uri;
}
```

::: danger Tenant media must not be served as a static file
Uploads live under `storage/tenants/tenant<id>/`, outside `public/`, and are
served by `TenantAssetController` at `/tenancy/assets/{path}` — which is also
what generates the placeholder for demo media whose binaries were never
shipped.

Most stacks ship a regex location for images, e.g.
`location ~* \.(gif|jpg|jpeg|png|ico)$`. **nginx matches regex locations before
the `location /` prefix**, so without the `^~ /tenancy/assets/` block above,
every `/tenancy/assets/…​.jpg` is looked up in `public/` on disk, 404s, and PHP
never runs. The storefront then renders with every image broken — logo,
products, everything — while the files are perfectly fine on disk.

If your stack uses a control panel that includes a global static-file config
(CentminMod's `staticfiles.conf`, for example), this applies to you.
:::

::: warning Do not put a page cache in front of a store
A micro-cache keyed only on the request URI will serve one store's page to
another, because every store shares this one server block. If you cache at
all, include `$host` in the cache key and bypass it for authenticated and
cart/checkout paths.
:::

## Wildcard TLS without Caddy

A wildcard certificate **cannot** be issued over HTTP-01 — Let's Encrypt only
issues wildcards through DNS-01. Panel tools that wrap HTTP-01 (CentminMod's
`acmetool.sh … lived`, most cPanel integrations) cannot get you one.

With [acme.sh](https://github.com/acmesh-official/acme.sh) and a DNS provider
API token:

```bash
export CF_Token='<token scoped to DNS:Edit on your zone>'
acme.sh --issue --dns dns_cf -d yourdomain.com -d '*.yourdomain.com' --keylength ec-256

acme.sh --install-cert -d yourdomain.com --ecc \
  --fullchain-file /etc/letsencrypt/live/yourdomain.com/fullchain.pem \
  --key-file       /etc/letsencrypt/live/yourdomain.com/privkey.pem \
  --reloadcmd      "systemctl reload nginx"
```

Both `-d` flags are required: a wildcard covers `*.yourdomain.com` but **not**
the apex `yourdomain.com`.

::: danger Never issue this in manual DNS mode
`acme.sh` offers a manual mode that prints a TXT record for you to add by hand.
It works once, then the renewal cron **fails silently every night** because it
cannot re-add the record. When the certificate expires, *every store goes dark
at the same moment* — not just the control plane. Always use a DNS API token so
renewal is unattended.
:::

## Behind Cloudflare

Two things bite specifically here.

**Universal SSL does not cover second-level wildcards.** The free certificate
covers `example.com` and `*.example.com` — one level. If your control plane is
a subdomain (`saas.example.com`), then stores live at
`*.saas.example.com`, which it does **not** cover, and proxied store subdomains
fail TLS at the edge. Either host the platform on the apex, set the store
records to **DNS only** so your own wildcard certificate serves them, or add
Advanced Certificate Manager.

**DNS-only records need the firewall to allow direct traffic.** With the orange
cloud off, visitors connect straight to the origin. On a server whose firewall
only permits Cloudflare's ranges on 80/443 — a common hardening default, and
one some panels re-apply on a cron — every store becomes unreachable while
proxied sites on the same box keep working. Check this before going live:

```bash
curl -I https://acme.yourdomain.com/   # from off-server, not from the box itself
```

## Per-store subdomains

Each store's subdomain is served by the same wildcard certificate above — no
per-store certificate request happens for a subdomain. The subdomain is also
the tenant's primary key: it cannot be renamed or freed without dropping the
store's database.

## Custom domains: on-demand TLS

A customer domain (`shop.customer.com`) is not covered by your wildcard, so
Caddy requests its certificate **on demand**, the first time a request for
that hostname arrives. That is only safe behind an authorization endpoint:

```caddyfile
on_demand_tls {
	ask http://127.0.0.1:8000/_tenancy/authorize-domain
	interval 2m
	burst 5
}
```

::: danger The authorization endpoint is mandatory
Without `ask`, Caddy requests a certificate for **any** hostname pointed at
your server. That lets a stranger burn your Let's Encrypt rate limits and
have your server fetch certificates for names you do not control. The
endpoint returns `200` only when the hostname is a verified custom domain
belonging to a store that is currently allowed to serve.
:::

## What a customer CNAMEs

A store owner adds their own domain from their store's **Domains** screen,
which shows the exact records to create. Either proof is enough:

```text
CNAME  shop.customer.com  ->  yourdomain.com
TXT    _ecommerce-verify.shop.customer.com  ->  <token from the Domains screen>
```

The CNAME target defaults to `CENTRAL_DOMAINS`; override it with
`TENANCY_CNAME_HOST` if customers should point at a different hostname than
your control-plane domain.

An unverified domain is **not routable and gets no certificate** — Caddy's
`ask` endpoint only authorizes domains the platform has already confirmed.
Verification itself, the retry cron, and the store-owner workflow are
documented in [Custom domains](./usage-domains.md).

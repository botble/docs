---
title: Cloud Storage
description: Where store media lives, and what the platform does and does not support for S3-compatible object storage.
---

# Cloud Storage

Every store's uploads live on the local disk, under its own directory:

```
storage/tenants/tenant<id>/
```

They are served through a tenant-aware asset route, so one store can never read or
overwrite another store's files. **Local disk is the default and the supported setup**, and it
needs nothing extra. Back it up with the rest of the platform, see
[Backup and restore](./backup-restore.md).

## Object storage (S3, R2, Spaces, Wasabi, Backblaze)

The isolation layer already covers Botble's remote media drivers. When the platform's media
driver is switched to `s3`, `r2`, DigitalOcean Spaces, Wasabi or Backblaze, each store's files go
under their own key prefix in the bucket (`<root>/tenants/tenant<id>/...`), so two stores never
write to the same path.

What is **not** there yet:

- **No supported way to choose the media driver.** The operator console has no screen for it or
  for bucket credentials, and the operator does not use the central Botble admin. The driver is a
  platform-wide setting that store owners cannot change either: media settings are blocked in
  every store's admin.
- **No migration tool** that moves existing store media from local disk into a bucket.
- **No per-store bucket credentials.** One bucket serves the whole platform.

Switching an existing platform to object storage is therefore an advanced, unsupported change
today. If you need it, contact support before you try it.

::: danger BunnyCDN storage cannot be isolated
The BunnyCDN adapter has no path prefix: the storage zone is the only namespace, and there is
one per install. Every store would share it at identical paths, so store B would overwrite
store A's product images. `php artisan tenancy:preflight` flags it: a warning on a fresh install, a failure once two
stores exist. Do not use BunnyCDN
storage as the media driver.
:::

## Checking your setup

When the media driver is remote, `php artisan tenancy:preflight` runs a check that prints
`media driver [<driver>] is scoped per store`. It passes on a driver that is prefixed per store and flags one that would put every store
in one namespace: a warning before the second store exists, a failure after. On the local disk
there is nothing to check.

## A CDN in front of local storage

You don't need object storage to put a CDN in front of store media. Point a pull CDN such as
Cloudflare at your domains as usual: tenant media is served from `/tenancy/assets/...` URLs on
each store's own domain. On nginx, keep the `location ^~ /tenancy/assets/` rule from the
[installation guide](./installation-dns-tls.md#serving-with-nginx). Otherwise a static-file location intercepts
those URLs and every storefront image breaks.

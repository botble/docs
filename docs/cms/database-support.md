# Database Support

## Supported databases

| Database | Status |
|---|---|
| MySQL >= 5.7 | Officially supported and tested |
| MariaDB >= 10.3 | Officially supported and tested |
| PostgreSQL | Not officially supported - see below |
| SQLite | Development only, not supported for production |
| SQL Server | Not supported |

MySQL and MariaDB are the only databases we test against, ship demo data for, and support through our help desk.

## Can I run it on PostgreSQL?

Short answer: it is technically possible for a developer, but it is **not officially supported**, and we cannot
guarantee everything works.

The application layer is written with Eloquent and the Laravel query builder, so it is not hardcoded to MySQL. The
schema itself is built with Laravel migrations, which PostgreSQL understands. What is not PostgreSQL ready is a small
number of places where raw MySQL SQL or a MySQL-only code path is used, plus the web installer.

::: warning No support and no guarantee
If you run on PostgreSQL you are on your own for maintenance. We do not accept bug reports for PostgreSQL specific
issues, and future updates may introduce new MySQL specific queries that you would need to patch again after every
upgrade. If you want a supported install, use MySQL or MariaDB.
:::

## Installing on PostgreSQL

The web installer only offers MySQL in its database dropdown, so you have to skip it and install from the command line.

1. Create your `.env` file:

```bash
cp .env.example .env
php artisan key:generate
```

2. Point it at your PostgreSQL server:

```dotenv
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

3. Build the schema and the sample data:

```bash
php artisan migrate --seed
```

4. Create your admin account, then activate your license from the admin panel:

```bash
php artisan cms:user:create
```

See [Installation using command line](/cms/installation-command-line) for the full CLI install flow.

## Known MySQL specific parts

These are the places you will need to review or patch. Line references are from the current release and may shift over
time.

### Raw MySQL SQL

| Location | What it uses | PostgreSQL equivalent |
|---|---|---|
| `platform/packages/theme/src/Supports/SiteMapManager.php` | `YEAR(created_at)`, `MONTH(created_at)` for the blog archive sitemap | `EXTRACT(YEAR FROM created_at)`, `EXTRACT(MONTH FROM created_at)` |
| `platform/plugins/ecommerce/src/Models/Product.php` | `GROUP_CONCAT(... SEPARATOR ', ')` when grouping product variation attributes | `STRING_AGG(..., ', ')` |

### MySQL only code paths

These already check the driver and simply do nothing on PostgreSQL, so they will not throw - but the related feature
degrades:

- **Product ordering by relevance** - `ProductRepository` orders search results with `FIELD(id, ...)`, which only runs
  on MySQL. On PostgreSQL the products come back in default order instead of relevance order.
- **System information** - the database version, charset, collation and max connections shown in
  **Admin -> Platform Administration -> System Information** are read with `SHOW VARIABLES`, so those rows stay empty
  on PostgreSQL.
- **`sql_require_primary_key`** - a MySQL 8 session flag set before migrations run; skipped on other drivers.

### Backup plugin

The backup engine itself supports both `mysqldump`/`mysql` and `pg_dump`/`pg_restore`, but the **admin panel backup
screen is restricted to MySQL** and will return "Database driver is not supported" on PostgreSQL. Use the console
commands instead:

```bash
php artisan cms:backup:create
php artisan cms:backup:restore
```

Both accept `mysql` and `pgsql` connections. `pg_dump` and `pg_restore` must be installed and on the server `PATH`.

### Cart connection (ecommerce)

The ecommerce cart storage connection is set to `mysql` in `platform/plugins/ecommerce/config/cart.php`. Publish or
override that config and change it to `pgsql`, otherwise the cart writes to the wrong connection.

### Database import/export commands

`php artisan cms:db:export` branches on the driver and handles `pgsql` through `pg_dump`, so it works as long as the
PostgreSQL client binaries are installed.

`php artisan cms:db:import` is MySQL only and will fail with "The driver [pgsql] does not support." Restore a
PostgreSQL dump with `pg_restore` or `psql` directly instead.

## Recommendation

Unless you have a hard requirement for PostgreSQL and a developer on hand to maintain the patches after each update, we
recommend MySQL 8 or MariaDB 10.6+. That is what the product is tested on, what the demo data is built for, and what our
support covers.

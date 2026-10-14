# Migrating from a subfolder to the root domain

If you built your site in a subfolder (e.g. `https://example.com/staging/public/`) and want to move it to
the root domain (`https://example.com/`), follow these steps. Your pages, projects, menus, theme options,
custom CSS, and uploaded media all carry over — nothing is recreated.

## What's safe and what isn't

| Item | Where it lives | Carries over? |
|---|---|---|
| Pages, projects, menus, theme options, custom CSS, blog posts, etc. | Database | ✅ Yes |
| Uploaded images and media | `public/storage/` (filesystem) | ✅ Yes |
| `.env` configuration | Project root file | ✅ Yes (you'll edit it) |
| License activation | Bound to the domain | ⚠️ Must deactivate + reactivate |

## Step 1 — Deactivate the license on the source domain

`Admin` -> `Settings` -> `General` -> `License` -> **Deactivate**.

This frees the license slot so you can re-activate it on the destination domain.

## Step 2 — Backup files and database

In **cPanel File Manager**, zip the entire project folder (e.g. `staging/`).

In **phpMyAdmin**, export the database:

- Click the database name in the left panel
- Click **Export** -> **Quick** -> **SQL** -> **Go**
- Save the resulting `.sql` file

## Step 3 — Rewrite URLs in the SQL dump

Open the `.sql` file in a text editor (VS Code, Sublime, Notepad++) and find/replace:

| Find | Replace with |
|---|---|
| `example.com/staging/public` | `example.com` |
| `https://example.com/staging/public` | `https://example.com` |

Save the modified file.

::: warning
Skip this step and your site will load images, scripts, and links from the old subfolder URL. Customers
will see broken images and 404s.
:::

## Step 4 — Move files to the destination

Upload the project files to the destination location. The site URL must serve the `public/` folder as the
document root — otherwise you'll see `https://example.com/public/` in the URL.

If the destination is the same hosting account, follow the [shared hosting guide](https://botble.com/the-best-way-to-install-our-script-on-a-shared-hosting)
to set the document root to `public/`.

## Step 5 — Import the modified SQL

In **phpMyAdmin**, select the destination database and **Import** the rewritten `.sql` file.

You can use the same database (no schema change needed) or a new one — your choice.

## Step 6 — Update `.env`

Edit `.env` in the destination File Manager:

```ini
APP_URL=https://example.com

DB_HOST=...
DB_DATABASE=...
DB_USERNAME=...
DB_PASSWORD=...
```

Update the database credentials only if they changed.

## Step 7 — Clear cache

`Admin` -> `Platform Administration` -> `Cache Management` -> **Clear all caches**.

## Step 8 — Re-activate the license

`Admin` -> `Settings` -> `General` -> `License` -> **Activate** (using the same purchase code).

## Verifying the migration

Open the destination site in an **incognito / private window** to bypass any cached assets:

- Homepage loads with no broken images
- Menu links resolve to the new URL (no `/staging/public/` anywhere)
- Admin login works
- A new image upload appears under `/storage/` on the destination

If images still 404, repeat Step 3 — there are likely a few stragglers in another column of the database.

# Upgrade Guide

This guide will walk you through the process of upgrading Orisa. There are two ways to upgrade:

## Automatic Update

1. Log in to your admin panel.
2. Go to `Platform Administration` -> `System Updater`.
3. If there is a new version available, you will see a `Download & Install Update` button. Click on it to start the
   automatic update process.

![Automatic Update](../cms/images/upgrade-1.png)

## Manual Update

This way is a bit more complex, but it gives you more control over the upgrade process:

1. Download the latest version from CodeCanyon.
2. Extract the downloaded file.
3. Upload the extracted files to your server, overwrite the following directories and files:
   * `app`
   * `database`
   * `config`
   * `platform`
   * `public/themes`
   * `public/vendor`
   * `bootstrap`
   * `vendor`
   * `composer.json`
   * `composer.lock`
4. Go to your admin panel -> `Platform Administration` -> `System Updater` and click `Update Database` if prompted.

::: warning
Always back up your files and database before upgrading.
:::

::: tip
If you have customized any theme files directly (not via child theme), your changes will be overwritten. Use a child theme for safe customizations.
:::

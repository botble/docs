# Installation

### Install with our Installer UI

Watch the video tutorial to see how to install our script with the installer UI:

<iframe width="100%" height="400" src="https://www.youtube.com/embed/iam99NkUIu0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

You can install our script with our installer UI by following these steps:

- Create database and extract source codes into your web root directory.
- Go to `[your-domain.com]` to start installation.
- Step by step to set up your database connection, site information and administrator.
- Login and set up your website on **Welcome Board**.

### Manually

Watch the video tutorial to see how to install our script manually:

<iframe width="100%" height="400" src="https://www.youtube.com/embed/zFbWYpjuFJk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

You can install our script manually by following these steps:

- Upload all files into the root folder of your hosting (normally, it is`public_html`).
- Create a database and import data from `database.sql` (it's located in source code).

  ![Database](../cms/images/installation-1.png)
- Update your database credentials and `APP_URL` in `.env`.

  ![Env](../cms/images/installation-2.png)
- Go to `/admin` to access to admin panel.
- The default admin account is `admin` - `12345678`.

  ![Login](../cms/images/installation-3.png)

### Install in a sub-folder

::: warning
Since our script is based on the Laravel framework, its root folder is `/public`. If you're installing it in a
sub-folder,
you'll need to access `your-domain.com/sub-folder/public`. To remove `/public` from the URL, follow the steps in
the [provided video tutorial](https://youtu.be/XdAYETd04iA).
:::

<iframe width="100%" height="400" src="https://www.youtube.com/embed/XdAYETd04iA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

::: tip
For Laravel developers looking to customize the source code in `platform/core` and `platform/packages`, delete
the `/vendor` folder, and then run the `composer install` command to reinstall vendor packages.
:::

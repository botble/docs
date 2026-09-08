# Homepage

Homepage is the first page that users see when they visit your website. It is the most important page of your website.

![Overview](./images/pages/homepage.webp)

## Create Homepage

If you are using the sample data of **Orisa**, the homepage is already created for you.

It's located in Admin -> Pages -> Home. You can skip this step.

To create a homepage, in admin panel, go to `Pages` and click on `Create` button.

In the `Create new page` page, fill in the following fields:

- **Title**: Enter the title of the page. For example, `Home`.
- **Permalink**: You can customize this permalink. But after set this page is homepage then permalink is `/`.
- **Content**: You have the option to customize the content or utilize our pre-defined [UI Block](./usage-ui-block.md).
- **Template**: Select `Homepage`.
- Other fields are optional, you can fill them if you want.

## Setup Homepage

After creating the homepage, you need to set it as the homepage of your website.

In admin panel, go to `Appearance` -> `Theme Options` -> `Page`, and select the homepage you just created in
the `Your homepage displays` field.

::: tip
If you are using the sample data of **Orisa**, the homepage is already created and set up for you.
:::

## Homepage Demo Presets

Orisa ships with **5 homepage demo presets**. You choose one when installing the script.

| # | Preset Name | Description |
|---|-------------|-------------|
| 1 | **Creative Agency** | Bold hero with video background, service tags, and portfolio grid |
| 2 | **Digital Agency** | Clean layout with animated stats and team showcase |
| 3 | **Marketing Agency** | CTA-focused design with pricing plans and blog posts |
| 4 | **AI & Tech** | Futuristic style with gradient accents and skills carousel |
| 5 | **Personal Creative** | Minimal portfolio layout with social links and about section |

### Choosing a Demo

The demo is selected **during installation**, on the demo selection step of the web installer. There is no demo
importer inside the admin panel.

Each demo is a complete database dump shipped in the `database/sample/` folder of the source code:

| Preset Name | Database file |
|-------------|---------------|
| **Creative Agency** | `database.sql` |
| **Digital Agency** | `database-orisa-digital-agency.sql` |
| **Marketing Agency** | `database-orisa-marketing-agency.sql` |
| **AI & Tech** | `database-orisa-ai-tech-agency.sql` |
| **Personal Creative** | `database-orisa-personal-creative.sql` |

### Switching to a Different Demo

If the site is already installed and you want a different demo, you have two options.

**Re-run the installer:**

1. Drop all tables in your database.
2. Delete the file `storage/installed`.
3. Reload your site to start the installer again and pick the demo you want.

**Import the SQL file directly:**

1. Drop all tables in your database.
2. Import the matching file from `database/sample/` via phpMyAdmin or the `mysql` command line.
3. Confirm `APP_URL` and the database credentials in `.env` are correct.

::: warning
Each file is a full database dump, so importing one replaces **all** existing content, including your admin account.
The default admin account of the demo data is `admin` / `12345678`. Only do this on a fresh site, or back up your
database first.
:::

## Customize Homepage

The homepage or any other page can be customized using UI Block. A list of available
shortcodes can be found in [UI Block](./usage-ui-block.md#available-shortcodes).

# Homepage

Homepage is the first page that users see when they visit your website. It is the most important page of your website.

![Overview](./images/overview.jpg)

## Create Homepage

To create a homepage, in admin panel, go to `Pages` and click on `Create` button.

In the `Create new page` page, fill in the following fields:

- **Title**: Enter the title of the page. For example, `Home`.
- **Permalink**: Leave it empty. The path of the homepage is `/`.
- **Content**: The content of the homepage is usually customized using shortcodes (we will discuss
  in [UI Block](./usage-ui-block.md)). You can
  leave it empty for now.
- **Template**: Select `Full width`.
- **Breadcrumb style**: Select `None`.
- Other fields are optional, you can fill them if you want.

## Setup Homepage

After creating the homepage, you need to set it as the homepage of your website.

In admin panel, go to `Appearance` -> `Theme Options` -> `Page`, and select the homepage you just created in
the `Your homepage displays` field.

::: tip
If you are using the sample data of **Amerce**, the homepage is already created and set up for you.
:::

## Switching Between Homepage Presets

Amerce ships with **20 niche home presets** (Fashion, Electronics, Furniture, Cosmetic, Organic, Jewelry, Sport, Sneaker, Headphone, Pod, Baby, Pet Care, Auto, Construction, Bag & Accessories, Home Decor, Garden, Wellness, Office Equipment, and Fashion Modern).

The preset is normally picked during the **initial installation wizard** (the "Choose a theme preset" step right after the database setup). Whichever one you select becomes the active homepage. There is no admin-panel toggle to switch presets after install — you have three options below.

### Option 1: Replicate the demo manually via the admin panel

Keeps all your existing data (orders, products, customers).

1. Open the preset you want at [https://landing.botble.com/amerce](https://landing.botble.com/amerce) to see how it looks.
2. In admin, go to **Pages** and create (or edit) a page that uses the same shortcodes as the demo. See [UI Block](./usage-ui-block.md) for the shortcode reference.
3. Go to **Appearance → Theme Options → Page** and set "Your homepage displays" to that page.
4. Adjust Theme Options (logo, colors, header/footer layout) to match the demo.

### Option 2: Wipe the database and import the preset SQL

Each preset ships as a SQL dump in the source code at `database/sample/database-amerce-{preset}.sql`. Available preset slugs:

`auto`, `baby`, `bag`, `construct`, `cosmetic`, `decor`, `electronics`, `fashion-2`, `furniture`, `garden`, `headphone`, `jewelry`, `mental`, `office`, `organic`, `pet-care`, `pod`, `sneaker`, `sport`.

The default **Fashion Store** preset lives at `database.sql` in the project root.

Steps:

1. Back up your current database (in phpMyAdmin: select DB → **Export** → **Go**).
2. Drop all tables in the current database.
3. Import the SQL file for the preset you want from `database/sample/`.
4. Login at `/admin` with `admin` / `12345678` and change the password immediately.
5. Re-activate your license under **Admin → Settings → License Activation**.

::: warning
This wipes any data you have already added (real orders, custom products, customers). Use Option 1 if you want to keep your data.
:::

### Option 3: Run the seeder via CLI

If you have SSH access and prefer not to wipe the database, run the seeder for your target preset from the project root:

```bash
php artisan db:seed --class="Database\\Seeders\\Themes\\HomeFashion2\\DatabaseSeeder"
```

Replace `HomeFashion2` with the variant you want. Available classes (all under `Database\Seeders\Themes\`):

`Main` (Fashion Store - default), `HomeFashion2`, `HomeElectronics`, `HomeFurniture`, `HomeCosmetic`, `HomeOrganic`, `HomeJewelry`, `HomeSport`, `HomeSneaker`, `HomeHeadphone`, `HomePod`, `HomeBaby`, `HomePetCare`, `HomeAuto`, `HomeConstruct`, `HomeBag`, `HomeDecor`, `HomeGarden`, `HomeMental`, `HomeOffice`.

After seeding:

1. Go to **Admin → Pages**, locate the seeded `Homepage` row, and set it as the active homepage in **Appearance → Theme Options → Page**.
2. Clear cache: `php artisan cache:clear`.

::: warning
Every preset seeder upserts the same `Homepage` page row - re-running a different seeder will overwrite the previously seeded homepage content. Back up your database first if you have customized anything.
:::

## Customize Homepage

The homepage or any other page can be customized using UI Block. A list of available
shortcodes can be found in [UI Block](./usage-ui-block.md#available-shortcodes).

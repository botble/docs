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

To switch to a different preset:

1. Run the niche seeder for your target preset:
   ```bash
   php artisan db:seed --class="Theme\\Amerce\\Database\\Seeders\\HomeFashionSeeder"
   ```
   Replace `HomeFashionSeeder` with the seeder matching the preset you want (e.g. `HomeElectronicsSeeder`, `HomeJewelrySeeder`, `HomeCosmeticSeeder`).
2. Go to **Admin → Pages**, locate the seeded `Homepage` row, and set it as the active homepage in **Appearance → Theme Options → Page**.
3. Clear cache: `php artisan cache:clear`.

::: warning
Every preset seeder upserts the `Homepage` page row with the same name — re-running a different seeder will overwrite the previously seeded homepage content. Export or back up customizations first.
:::

## Customize Homepage

The homepage or any other page can be customized using UI Block. A list of available
shortcodes can be found in [UI Block](./usage-ui-block.md#available-shortcodes).

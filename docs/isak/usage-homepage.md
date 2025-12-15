# Homepage

Homepage is the first page that users see when they visit your website. Isak is designed as a single-page portfolio with 8 animated sections.

![Overview](./images/pages/homepage.jpg)

## Create Homepage

If you are using the sample data of **Isak**, the homepage is already created for you.

It's located in Admin -> Pages -> Home. You can skip this step.

To create a homepage, in admin panel, go to `Pages` and click on `Create` button.

In the `Create new page` page, fill in the following fields:

- **Title**: Enter the title of the page. For example, `Home`.
- **Permalink**: You can customize this permalink. But after set this page is homepage then permalink is `/`.
- **Content**: Add the [UI Blocks (Shortcodes)](./usage-ui-block.md) for each section.
- **Template**: Select `Homepage`.
- Other fields are optional, you can fill them if you want.

## Setup Homepage

After creating the homepage, you need to set it as the homepage of your website.

In admin panel, go to `Appearance` -> `Theme Options` -> `Page`, and select the homepage you just created in
the `Your homepage displays` field.

::: tip
If you are using the sample data of **Isak**, the homepage is already created and set up for you.
:::

## Customize Homepage

The homepage uses 8 main UI Blocks (Shortcodes) for each section:

1. **Hero Intro** - The main hero section with animated text and counters
2. **About** - Awards and gallery showcase
3. **Education** - Timeline of education and experience
4. **Work Highlights** - Portfolio projects display
5. **Services** - Service listings in accordion style
6. **Tech Stack** - Skills with progress bars
7. **Testimonials** - Client testimonials carousel
8. **Contact** - Contact form section

A complete list of available shortcodes can be found in [UI Block](./usage-ui-block.md#available-shortcodes).

## Section Navigation

Each section can have a custom navigation icon and label that appears in the sidebar. Configure these in the shortcode settings:

- **Navigation Icon**: Icon displayed in sidebar (e.g., `ti ti-home`)
- **Navigation Label**: Text label for the section

The sidebar navigation will automatically update based on the shortcodes you add to the homepage.

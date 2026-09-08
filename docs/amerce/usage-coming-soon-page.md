# Coming soon page

There are two different things people mean by "coming soon", and Amerce handles them in two different ways.

| You want | Use |
|---|---|
| The **whole site** hidden behind a holding page while you build it | The Maintenance Mode plugin |
| **One page** that announces something not launched yet, with the rest of the site open | A normal page using the Landing template |

::: warning
Amerce does not ship a `[coming-soon]` shortcode, and it has no "Without layout" page template. If you have seen those referenced elsewhere, they belong to a different theme.
:::

## Hiding the whole site

Install the free official **Maintenance Mode** plugin from `Admin` -> `Plugins` -> `Add new`, or download it from
[marketplace.botble.com](https://marketplace.botble.com/products/botble/maintenance-mode).

Once activated, it puts the entire front end behind a holding page while you stay logged in and keep working in the admin panel. Its own settings page controls the message shown to visitors.

This is the right choice for a site that is not open for business yet - visitors get a holding page on every URL, not just the homepage.

## A single coming soon page

If the shop is live and you only want one page to announce a launch:

1. Go to `Pages` -> `Create` in the admin panel.
2. Give the page a title, for example `Coming soon`.
3. Build the content with UI blocks - a hero banner, a countdown, and a newsletter form are the usual combination. See [UI Block & Shortcodes](./usage-ui-block.md) for how to add them.
4. Set **Template** to **Landing**. This renders the page content without the shop sidebar and page heading, which suits a standalone announcement.
5. Publish.

### Making it the homepage

To show that page instead of the normal homepage, go to `Appearance` -> `Theme options` -> `Page` and select it under **Your homepage displays**.

::: tip
Remember to set the homepage back to your normal homepage when you launch. Leaving it pointed at the coming soon page is the most common cause of a "my shop disappeared" support ticket.
:::

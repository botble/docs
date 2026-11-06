# Theme Options

Theme options control the look and behavior of the whole site: homepage style, colors, fonts, header, footer, logo and social links. You can change them without touching code.

Go to `Appearance` -> `Theme options` in the admin panel. The sections that shape the storefront look are **Header**, **Footer** and **Colors and typography**.

::: tip
Every [homepage demo](./usage-homepage.md) sets its own values for these sections. To copy a demo's look to your site, see [Switch the look of an existing site](./usage-homepage.md#switch-the-look-of-an-existing-site).
:::

## Colors and Typography

Go to `Appearance` -> `Theme options` -> `Colors and typography`.

| Field | Default | Purpose |
|-------|---------|---------|
| **Homepage style** | Default | Picks one of the 12 homepage styles from preview images. Sets the color scheme and section styles, applied on every page. Stored as `site_style` |
| **Primary font** | Work Sans | Font family of the site |
| **Primary color** | `#fcb800` | Main color of buttons, links and highlights |
| **Secondary color** | `#222222` | Secondary color |
| **Button text color** | `#000` | Text color of buttons |

Homepage style options: Default, Organic, Marketplace 1, Marketplace 2, Marketplace 3, Marketplace 4, Technology, Electronic, Furniture, Auto parts, Kids and Medicine.

The primary color of each demo:

| Demo | Primary color |
|------|---------------|
| Home 1 (Multipurpose), Marketplace 1 to 4, Kids | `#fcb800` |
| Technology | `#0071df` |
| Electronic, Auto parts | `#dd2400` |
| Furniture | `#fb7c00` |
| Organic | `#5fa30f` |
| Medical | `#28afb1` |

## Header

Go to `Appearance` -> `Theme options` -> `Header`.

### Header Style

Pick the header from the preview images of the **Header style** field.

| Style | Top bar | Action icons | Layout |
|-------|---------|--------------|--------|
| **Default** | No | Compare, Wishlist, Cart, Account | Original Martfury header: department menu before the logo, main menu in the navigation bar |
| **Organic** | No | Compare, Wishlist, Cart, Account | Default layout in a boxed container, hotline in the navigation bar |
| **Marketplace 1** | Yes | Wishlist, Cart, Account | Boxed header, department menu before the logo and in the navigation bar, main menu, hotline |
| **Marketplace 2** | Yes | Wishlist, Cart, Account | Department menu after the logo, flat category navigation |
| **Marketplace 3** | No | Compare, Wishlist, Cart, Account | No navigation bar, **Your Recently Viewed** dropdown |
| **Marketplace 4** | Yes | Wishlist, Cart, Account | Department menu after the logo, no navigation bar |
| **Technology** | Yes | Wishlist, Cart, Account | Category navigation, account links in the top bar |
| **Electronic** | Yes | Wishlist, Cart, Account | Category navigation, dark navy header |
| **Furniture** | No | Wishlist, Cart, Account | Department menu after the logo, main menu on the left of the navigation bar |
| **Auto parts** | Yes | Cart, Account | Category navigation, hotline next to the cart, account links in the top bar |
| **Kids** | No | Wishlist, Cart, Account | No navigation bar, department menu after the logo, recently viewed dropdown |
| **Medicine** | Yes | Cart, Account | Department menu after the logo, hotline next to the cart |

The category navigation of Marketplace 2, Technology, Electronic and Auto parts reads the menu assigned to the **Header category navigation** location. Create the menu in `Appearance` -> `Menus` and assign it to that location. If the location is empty, the main menu is used.

### Header Options

| Field | Default | Shown for | Purpose |
|-------|---------|-----------|---------|
| **Header style** | Default | All | The header layout (see above) |
| **Top bar** | Style default | Styles with a top bar | Shows or hides the strip above the logo row. **Style default** keeps the setting of the style. **Show** and **Hide** override it |
| **Header top text** | Empty | Styles with a top bar | Text on the left of the top bar. Basic HTML (bold text, links) is allowed |
| **Compare icon**, **Wishlist icon**, **Shopping cart icon**, **Account icon** | Style default | All, desktop only | **Style default** keeps the icons of the style. **Show** adds the icon, **Hide** removes it |
| **Header hotline** | Style default | All | Shows or hides the hotline number in the header. **Style default** keeps the setting of the style |
| **Hotline** | Empty | All | Phone number shown in the header (when **Header hotline** is on) and in the contact block of some footers |
| **Recently viewed menu** | Style default | Default, Organic, Marketplace 3, Furniture, Kids | The **Your Recently Viewed** dropdown in the navigation bar. **Style default** keeps the setting of the style |
| **Header search keywords** | Empty | Styles with a top bar | Comma-separated keywords shown below the search box, for example `Smart TV, Speaker, Sneakers`. Empty hides them |
| **Header promotion image** | Empty | All | Promotion strip above the header. See [Promotion strip](#promotion-strip) |
| **Header promotion URL** | Homepage | All | Link of the promotion strip. Defaults to the homepage |
| **Header promotion discount** | Empty | All | Large text of the promotion block, for example `20%` |
| **Header promotion title** | Empty | All | Title of the promotion block. Empty shows only the image |
| **Header promotion code** | Empty | All | Discount code shown in the promotion block |
| **Enable sticky header?** | Yes | All | Keeps the header at the top while the page scrolls |
| **Enable sticky header on mobile?** | Yes | All | Same as above on mobile devices |

The header styles render the **Top bar**, **Header top text** and **Header search keywords** only when they have a top bar. The **Recently viewed menu** option appears only for the styles that have the dropdown. The action icon options apply to the desktop header only.

#### Promotion strip

The promotion strip shows above the header for every header style. Fill in one of two modes:

| Mode | Fields | Size |
|------|--------|------|
| **Image only** | **Header promotion image**, and optionally **Header promotion URL** | 1175x80 px. The whole image links to the URL |
| **Image with text** | **Header promotion title** (required for this mode), plus **Header promotion image** as the background, **Header promotion discount**, **Header promotion code** and **Header promotion URL** | 1920x80 px for the background image. The block shows the discount, title, code and a **Shop now** button |

Leave the image and the title empty to hide the strip.

### Header Colors

The header colors are in the **Header** section, after the options above. Each color is optional. Leave it empty to use the colors of the selected header style, which match its preview image. A color you set always wins. To go back to the style color, clear the field.

| Field | Used for | Empty means |
|-------|----------|-------------|
| **Header background color** | Background of the header | The header background of the style (the primary color for the Default style) |
| **Header top bar background color** | Background of the top bar | The header background |
| **Header navigation background color** | Background of the navigation bar | The header background |
| **Header navigation text color** | Navigation menu links | The header text color |
| **Header text color** | Header text and links | The text color of the style |
| **Header text hover color** | Hover color of header text and links | The hover color of the style |
| **Header text accent color** | Hotline number of the Medicine style | The accent color of the style |
| **Header button background color** | Search button and the extra block of the header | The button color of the style |
| **Header button text color** | Text of the search button and the extra block | The button text color of the style |

## Footer

Go to `Appearance` -> `Theme options` -> `Footer`.

### Footer Style

| Style | Description |
|-------|-------------|
| **Default** | Original Martfury footer |
| **Link columns + newsletter** | Link columns with a newsletter sign-up and social links |
| **Site features + link columns** | A row of site features above the contact block and link columns. With the **Kids** homepage style, it shows the link columns and newsletter instead |
| **Contact + link columns + newsletter** | Contact details, link columns and newsletter sign-up (Medicine demo) |

### Footer Options

| Field | Default | Shown for | Purpose |
|-------|---------|-----------|---------|
| **Footer style** | Default | All | The footer layout (see above) |
| **Footer newsletter text** | Empty | Link columns + newsletter, Site features + link columns, Contact + link columns + newsletter | Short text below the "Newsletter" title. Empty hides it. For **Site features + link columns**, it shows only with the **Kids** homepage style |
| **Footer social links text** | Empty | Same as above | Label above the social links, for example `Follow us`. Empty hides it |
| **Footer site features** | Empty | Site features + link columns | Items of the features row: icon, title and subtitle. Empty uses the default items: Free Delivery, 90 Days Return, Secure Payment and 24/7 Support |

### Footer Colors

Footer colors have fixed defaults. They do not follow the footer style, so each demo sets its own values.

| Field | Default | Used for |
|-------|---------|----------|
| **Footer background color** | `#ffffff` | Background of the footer |
| **Footer text color** | `#666` | Text |
| **Footer text link color** | `#666` | Links |
| **Footer text link hover color** | `#fcb800` | Links on hover |
| **Footer border color** | `#e1e1e1` | Dividers |
| **Footer heading color** | `#000` | Column titles |
| **Footer copyright color** | Empty (footer text color) | Copyright text and the payment methods title |
| **Footer hotline color** | `#8a6100` | Phone number in the contact block |
| **Footer site features icon color** | Empty (primary color) | Icons of the site features row |
| **Footer button background color** | Empty (primary color) | Newsletter button background |
| **Footer button text color** | Empty (button text color) | Newsletter button text |

## Other Sections

Other sections keep their usual fields. Open each one in `Appearance` -> `Theme options`:

| Section | What it holds |
|---------|---------------|
| **General** | Preloader, back to top button, 404 page image, newsletter popup, **Sell on Marketplace** link (with the Marketplace plugin), address and email |
| **Logo**, **Page**, **Breadcrumb** | Logo, homepage and page settings, breadcrumb |
| **Product features**, **Contact info boxes** | Four product feature items and the contact info boxes |
| **Bottom Bar Menu** | Show menu text and menu text font size of the bottom bar |
| **Ecommerce** | Accepted payment methods and their link, featured brands and recommended items on the products page |
| **Ecommerce URLs**, **Ecommerce SEO** | Ecommerce URLs and SEO settings |
| **Social Links**, **Social Sharing** | Social links and social sharing buttons |
| **Facebook Integration**, **Marketplace**, **Blog** | Facebook, Marketplace and Blog settings |
| **Toast Notification**, **Cookie Consent** | Notification and cookie consent settings |

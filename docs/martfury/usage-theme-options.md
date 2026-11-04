# Theme Options

Theme options control the look and behaviour of the whole site: colors, fonts, header, footer, logo and social links. You can change them without touching code.

Go to `Appearance` -> `Theme options` in the admin panel.

## Layout

The **Layout** section holds the settings that turn the default Martfury into one of the [12 homepage demos](./usage-homepage.md). Go to `Appearance` -> `Theme options` -> `Layout`.

| Field | Purpose |
|-------|---------|
| **Header style** | Site-wide header (see the list below) |
| **Header top text** | Text on the left of the top bar, for the header styles that have one. Basic HTML (bold text, links) is allowed |
| **Header search keywords** | Comma-separated keywords shown below the search box, for the header styles that have them |
| **Header promotion image** | Image strip above the header, recommended size 1175x80. Only shown for the **Kids** header style |
| **Header promotion URL** | Link of the promotion image. Only shown for the **Kids** header style |
| **Footer style** | Site-wide footer (see the list below) |
| **Footer site features** | Items of the features row of the **Site features + link columns** footer. Each item has an icon, a title and a subtitle. Leave empty to use the default items (free delivery, 90 days return, secure payment, 24/7 support) |
| **Site style** | Color scheme and section styles of a demo, applied on every page |

### Header Styles

| Style | Description |
|-------|-------------|
| **Default** | Original Martfury header |
| **Organic** | Default layout in a boxed container, with a hotline in the navigation bar |
| **Marketplace 1** | Boxed header, department menu before the logo and in the navigation bar, main menu and hotline |
| **Marketplace 2** | Department menu after the logo, flat category navigation, search keywords |
| **Marketplace 3** | No main menu, with a **Your Recently Viewed** dropdown |
| **Marketplace 4** | No navigation bar, department menu after the logo, search keywords |
| **Technology** | Category navigation, account links in the top bar |
| **Electronic** | Category navigation |
| **Furniture** | Department menu after the logo, main menu on the left of the navigation bar |
| **Auto parts** | Category navigation, hotline, account links in the top bar |
| **Kids** | Promotion strip above the header, recently viewed products |
| **Medicine** | Navigation with an A-Z mega menu and a hotline |

::: tip
The category navigation of the Marketplace 2, Technology, Electronic and Auto parts headers reads the menu assigned to the **Header category navigation** location. Create the menu in `Appearance` -> `Menus` and assign it to that location. If the location is empty, the main menu is used.
:::

### Footer Styles

| Style | Description |
|-------|-------------|
| **Default** | Original Martfury footer |
| **Link columns + newsletter** | Link columns with a newsletter sign-up |
| **Site features + link columns** | A row of site features (free delivery, returns, payment, support) above the link columns |
| **Contact + link columns + newsletter** | Contact details, link columns and newsletter sign-up (Medical demo) |

### Site Styles

The site style applies the color scheme and spacing of a demo to every page. Available styles: **Default**, **Organic**, **Marketplace 1** to **Marketplace 4**, **Technology**, **Electronic**, **Furniture**, **Auto parts**, **Kids** and **Medicine**.

::: warning
Pick the **Site style** that matches the **Header style**, for example Header style **Organic** with Site style **Organic**. A mismatched pair can look unfinished because homepage sections are styled by the site style.
:::

### Promo Strip

The **Kids** header shows an image strip above the header. Upload the picture in **Header promotion image** and set the link in **Header promotion URL**. Leave both empty to hide the strip.

## Style

Go to `Appearance` -> `Theme options` -> `Style`.

| Field | Purpose |
|-------|---------|
| **Primary font** | Font family of the site. Default: `Work Sans` |
| **Primary color** | Main color of buttons, links and highlights. Default: `#fcb800` |
| **Secondary color** | Secondary color. Default: `#222222` |
| **Header text color**, **Header text hover color**, **Header text accent color** | Colors of the header text and links |
| **Header button background color**, **Header button text color** | Colors of the header button |

The demos use these primary colors:

| Demo | Primary color |
|------|---------------|
| Home 1, Marketplace 1 to 4 | `#fcb800` |
| Technology | `#0071df` |
| Electronic, Auto parts | `#dd2400` |
| Furniture | `#fb7c00` |
| Organic | `#5fa30f` |
| Kids | `#3078a6` |
| Medical | `#28afb1` |

## Other Sections

The remaining sections (general, logo, page, social links, breadcrumb, 404 and more) have not changed. Open each section in `Appearance` -> `Theme options` to see its fields.

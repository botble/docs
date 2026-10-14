# UI Block (Shortcode)

UI blocks, also called shortcodes, are predefined sections you add to a page or post. Each block has a set of **styles** (layouts) and fields you fill in from the admin panel. No code is needed.

## Usage

1. Open a page in the editor and click the **shortcode** button.
2. Search for the block, click **Use**, then pick a style.
3. Fill in the fields in the panel and save.

To edit an existing block, click it in the editor and click the pencil icon.

::: tip
Blocks that show plugin data (projects, services, team, testimonials, FAQs, blog posts, careers, contact form) need the matching plugin to be active. Fill in the data first: for example, add projects before you place the `projects` block.
:::

## Available Shortcodes

Norio has **25 shortcodes with 85 style variants**.

| Shortcode | Styles | Purpose | Plugin |
|-----------|--------|---------|--------|
| `hero-banner` | 3 | Homepage hero | - |
| `page-hero` | 8 | Hero for inner pages (services, pricing, team, FAQs, jobs, help, blog, contact, terms, privacy) | - |
| `about-us-information` | 3 | Studio introduction | - |
| `site-statistics` | 1 | Counters with a checklist | - |
| `our-journey` | 1 | Timeline of milestones | - |
| `content-features` | 3 | Why us and approach sections | - |
| `partners` | 1 | Rotating words, image thumbnails and a client logo marquee | - |
| `keyword-ticker` | 1 | Two marquee rows of keywords separated by stars | - |
| `image-gallery` | 2 | Image slider or full-width parallax image | - |
| `awards` | 2 | Awards and recognition | - |
| `process-steps` | 6 | Numbered process or how-we-work steps | - |
| `service-cards` | 3 | Grid of linked cards | - |
| `content-block` | 3 | Numbered rules, clauses or policy text | - |
| `content-checklist` | 1 | Headline with a checked list | - |
| `call-to-action` | 10 | Call to action sections | - |
| `faqs` | 3 | FAQ accordion, filtered by FAQ category | FAQ |
| `projects` | 8 | Portfolio projects in grid, list, slider and WebGL layouts | Portfolio |
| `services` | 4 | Services list | Portfolio |
| `pricing-plans` | 3 | Pricing plans (repeater based) | - |
| `testimonials` | 3 | Client testimonials | Testimonial |
| `teams` | 3 | Team members | Team |
| `blog-posts` | 2 | Latest blog posts | Blog |
| `careers` | 1 | Open roles | Career |
| `contact-form` | 4 | Contact form, with optional open roles on style 4 | Contact |
| `newsletter` | 1 | Newsletter sign-up section | Newsletter |

Blocks that show a section heading share four title fields: **Section number** (for example `01`), **Section label**, **Meta text** (right side of the title) and **Meta link URL**.

## Projects Styles

| Style | Layout |
|-------|--------|
| 1 | Project cards |
| 2 | Project cards with tags |
| 3 | Project list with an active highlight |
| 4 | Full-screen showcase |
| 5 | WebGL showcase |
| 6 | WebGL gallery |
| 7 | WebGL rail |
| 8 | Filterable grid by category and year |

::: warning
The WebGL styles (5 to 7) load project images as textures. Use images from the media library on your own server. Remote images need CORS headers, or they will not show.
:::

## Page Hero Styles

Page hero styles 1 to 8 cover the inner pages of the demo: services, pricing, team and FAQs, jobs, help (with a search box), blog, contact, and terms and privacy.

## Block Previews

One preview per UI block, shown in its default style.

### hero-banner

Homepage hero (3 styles).

![hero-banner](./images/ui-blocks/hero-banner.png)

### page-hero

Hero for inner pages (services, pricing, team, FAQs, jobs, help, blog, contact, terms, privacy) (8 styles).

![page-hero](./images/ui-blocks/page-hero.png)

### about-us-information

Studio introduction (3 styles).

![about-us-information](./images/ui-blocks/about-us-information.png)

### site-statistics

Counters with a checklist (1 style).

![site-statistics](./images/ui-blocks/site-statistics.png)

### our-journey

Timeline of milestones (1 style).

![our-journey](./images/ui-blocks/our-journey.png)

### content-features

Why us and approach sections (3 styles).

![content-features](./images/ui-blocks/content-features.png)

### partners

Rotating words, image thumbnails and a client logo marquee (1 style).

![partners](./images/ui-blocks/partners.png)

### keyword-ticker

Two marquee rows of keywords separated by stars (1 style).

![keyword-ticker](./images/ui-blocks/keyword-ticker.png)

### image-gallery

Image slider or full-width parallax image (2 styles).

![image-gallery](./images/ui-blocks/image-gallery.png)

### awards

Awards and recognition (2 styles).

![awards](./images/ui-blocks/awards.png)

### process-steps

Numbered process or how-we-work steps (6 styles).

![process-steps](./images/ui-blocks/process-steps.png)

### service-cards

Grid of linked cards (3 styles).

![service-cards](./images/ui-blocks/service-cards.png)

### content-block

Numbered rules, clauses or policy text (3 styles).

![content-block](./images/ui-blocks/content-block.png)

### content-checklist

Headline with a checked list (1 style).

![content-checklist](./images/ui-blocks/content-checklist.png)

### call-to-action

Call to action sections (10 styles).

![call-to-action](./images/ui-blocks/call-to-action.png)

### faqs

FAQ accordion, filtered by FAQ category (3 styles).

![faqs](./images/ui-blocks/faqs.png)

### projects

Portfolio projects in grid, list, slider and WebGL layouts (8 styles).

![projects](./images/ui-blocks/projects.png)

### services

Services list (4 styles).

![services](./images/ui-blocks/services.png)

### pricing-plans

Pricing plans (repeater based) (3 styles).

![pricing-plans](./images/ui-blocks/pricing-plans.png)

### testimonials

Client testimonials (3 styles).

![testimonials](./images/ui-blocks/testimonials.png)

### teams

Team members (3 styles).

![teams](./images/ui-blocks/teams.png)

### blog-posts

Latest blog posts (2 styles).

![blog-posts](./images/ui-blocks/blog-posts.png)

### careers

Open roles (1 style).

![careers](./images/ui-blocks/careers.png)

### contact-form

Contact form, with optional open roles on style 4 (4 styles).

![contact-form](./images/ui-blocks/contact-form.png)

### newsletter

Newsletter sign-up section (1 style).

![newsletter](./images/ui-blocks/newsletter.png)

## Creating Shortcodes

To add your own shortcode on top of Norio, see the [Botble CMS documentation on creating custom shortcodes](/cms/shortcode).

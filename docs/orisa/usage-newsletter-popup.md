# Newsletter popup

The newsletter popup is the modal that appears for first-time visitors and prompts them to subscribe to
your mailing list. Configure its content, images, and timing from the admin panel — no code edits.

## Where to edit

`Admin` -> `Appearance` -> `Theme Options` -> `Newsletter popup`.

## Fields

### Enable newsletter popup

Master toggle. Turn off to disable the popup site-wide.

### Popup image (desktop / tablet / mobile)

Three separate slots so you can ship optimised images per breakpoint:

| Slot | Recommended size |
|---|---|
| **Popup image** (desktop) | ~600 × 700 px |
| **Popup tablet image** | ~500 × 600 px |
| **Popup mobile image** | ~400 × 400 px |

If a breakpoint slot is empty, the popup falls back to the next-larger one.

### Popup style

Picks the look of the popup so it matches your homepage. There are 15 styles, one per homepage preset
(**Style 1** = Home 1 … **Style 15** = Home 15). The style sets the panel colours (light or dark), the
subtitle tag, the heading case and weight, the input and button shapes, and the corner radius. It does
not change your text or image. The popup appears on every page, so it uses this style site-wide.

| Style | Look |
|---|---|
| 1 | Charcoal panel, uppercase title, orange pill button |
| 2 | Soft grey card, outlined tag, white pill input, black pill button |
| 3 | White, orange ↗ tag, grey rounded input, black pill button with arrow |
| 4 | Near-black, `[ NEWSLETTER ]` monospace tag, outline pill button |
| 5 | Light grey, dot-pill tag, rounded-rectangle button |
| 6 | Black, square corners, uppercase, white block button |
| 7 | Deep red panel, bracket tag, orange pill button |
| 8 | White, orange tinted tag, orange pill button and input |
| 9 | Charcoal, uppercase, orange tag, flat grey square button |
| 10 | White with a faint wireframe grid, heavy tight title, bracket tag |
| 11 | Cinematic black, uppercase, dashed tag, white pill button |
| 12 | Off-white rounded card, white tag, black pill button |
| 13 | Warm grey, "(Newsletter)" tag, rounded button |
| 14 | White, red bracket tag, sharp black button |
| 15 | Warm black with an ember glow, orange outline pill button |

Light styles switch to matching dark colours when a visitor uses dark mode; dark styles look the same in
both modes. Importing a demo (or a homepage preset's sample data) sets the style that belongs to that
demo — change it here at any time.

::: tip
Pair the style with a popup image from the same homepage for the closest match to the demo.
:::

### Title

Big heading shown above the form. Example: *"Stay in the loop"*.

### Subtitle

Small text shown above the title — typically a short tag like *"Newsletter"* or *"Subscribe"*.

### Description

Body paragraph between the title and the email input. Use it to explain what subscribers will receive
(e.g. release announcements, design tips, monthly digest).

### Popup delay (seconds)

How long to wait after the page loads before showing the popup. Default: **5 seconds**.

- Set to **0** to show immediately (aggressive — visitors haven't seen content yet)
- **3–8 seconds** is the sweet spot for most sites
- The popup only shows once per visitor (cookie-stored)

### Display on pages

Choose where the popup appears:

- **Homepage** (default) — only on `/`
- **All pages** — every page on the site
- Or pick specific page templates from the list

## After saving

Clear the cache:

`Admin` -> `Platform Administration` -> `Cache Management` -> **Clear all caches**.

Then open your site in an **incognito / private window** to test. The popup is cookie-gated, so a regular
browser won't show it again until you clear the cookie or use incognito.

::: tip
The popup form posts to your active newsletter provider (configured at
`Admin` -> `Settings` -> `Email & Newsletter`). Without a provider, submissions go to the local
`Newsletter subscribers` table — visible at `Admin` -> `Newsletter`.
:::

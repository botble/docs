# Newsletter popup

The newsletter popup is the modal that appears for first-time visitors and prompts them to subscribe to
your mailing list. Configure its content, images, and timing from the admin panel — no code edits.

![Newsletter popup](./images/usage-newsletter-popup.png)

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

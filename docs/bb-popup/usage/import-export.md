---
title: Import & export
description: Move a popup between sites, or keep a copy of one you are about to change
---

# Import & export

A popup can be exported to a JSON file and imported into any other site running BB Popup. It is the quickest way to move a design from staging to production, or to reuse an age gate across a group of sites.

## Exporting

Open the popup, go to the **Advanced** tab, and use **Export**. You get a JSON file containing:

- `name`, `type` and `content_mode`
- `content` - the popup body
- `properties` - design, triggers, countdown, frequency and close behaviour
- `conditions` - the display rules
- `priority`

Plus the plugin version, the export timestamp and the site it came from, for reference.

::: warning What is not exported
Statistics, subscribers and A/B variants stay behind. So do the site-wide defaults in **Popups → Settings** - a popup set to *Use global defaults* will pick up the target site's palette, not the source site's.
:::

## Importing

Go to **Popups → All Popups** and use **Import**, then choose the JSON file (up to 2 MB).

Importing never overwrites an existing popup - it always creates a new one, as a **draft** named `... (Imported)`. If the file is not a valid popup export, the import is rejected with a message rather than creating something broken.

::: tip Why drafts
An uploaded file is untrusted input. Landing as a draft means nothing from it goes live until you have looked at it. The payload is validated against the same whitelist as a normal save, so custom CSS and the type and content-mode values cannot smuggle anything past the editor.
:::

## Things to check after importing

| Check | Why |
|---|---|
| **Shortcode slug** | Set it to something meaningful on the new site before publishing. |
| **Image paths** | An image-mode popup references a path in the Media library. Upload the image on the target site if it is not already there. |
| **URL path rules** | A rule such as `/blog*` may not mean the same thing on the new site. |
| **Embedded form** | A *Form* popup points at a BB Form Builder form by id, which will not exist on the target site. Re-select it. |
| **Status** | Imported popups always arrive as **drafts**, and are named `... (Imported)`. Review, then publish. |

## Duplicating instead

To copy a popup inside the same site, use **Duplicate** in the popup list rather than exporting and re-importing. It carries the A/B variants across as well, which an export does not.

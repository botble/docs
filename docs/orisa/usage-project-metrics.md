# Project metrics (case-study cards)

Each Project record has 3 optional **metric** value/label pairs that appear on case-study card layouts
(e.g. **+72% Planning Efficiency**, **-18% Cost**, **4.8/5 NPS**). Metric values are free text — you control
the prefix, suffix, and formatting.

## Where to edit

`Admin` -> `Portfolio` -> `Projects` -> open a project -> scroll to the **Project metrics (case-study cards)** section.

For each of the three pairs you can fill:

| Field | Purpose | Example |
|---|---|---|
| Metric N value | The big number/percentage shown on the card | `+72%`, `-18%`, `4.8/5`, `1.2M` |
| Metric N label | The small caption underneath the value | `Planning Efficiency`, `Cost reduction` |

Leave both fields of a pair empty to hide that metric. If all three pairs are empty, the metrics strip
disappears entirely from the card.

## Where they render

The metrics show up on **Projects** shortcode style 4 — used by the **Home 4** demo's *Case Studies*
section. The featured (full-width) card displays metrics 1 and 2 side-by-side; the smaller overlay cards
beneath it display metric 1 only.

If you're not using style 4, the metric fields are still saved but won't be rendered.

## Format guidelines

Metric values are stored as plain strings (max 32 characters), so any formatting works:

- Percentages: `+72%`, `-18%`, `99.9%`
- Multipliers: `2.4x`, `10x`
- Counts: `1.2M`, `42K`, `350+`
- Ratings: `4.8/5`, `9/10`
- Currencies: `$2.5M`, `€480K`

Labels are limited to 120 characters but should stay short — anything over ~30 characters wraps onto
multiple lines and looks cluttered.

## After saving

Clear the cache:

`Admin` -> `Platform Administration` -> `Cache Management` -> **Clear all caches**.

Then hard-refresh (`Ctrl+Shift+R` / `Cmd+Shift+R`) and check the homepage.

::: tip
Demo data shipped with **Home 4** uses sample metrics. You can replace them with your own real numbers — no
code edits needed once you've upgraded to the version that introduced these fields.
:::

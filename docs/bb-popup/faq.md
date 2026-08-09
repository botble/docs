---
title: FAQ
description: Short answers to common questions about BB Popup
---

# FAQ

## Will it slow my site down?

The frontend runtime is about 14 KB of minified vanilla JavaScript and 10 KB of CSS, loaded once and deferred - roughly 5 KB and 2.5 KB over the wire with gzip. There is no jQuery, no framework, and nothing is fetched from a CDN at runtime.

## Does it work with full-page caching?

Yes. Rules that vary with the page (URL, page type, language, schedule) are applied on the server; rules that vary with the person (device, login state, referrer, UTM, cookies, visit history) run in the browser. One cached document stays correct for everyone who receives it. There is also a cache-safe delivery mode that keeps popup content out of the cached HTML entirely. See [Display rules](./usage/display-rules.md#caching).

## Will it work with my theme?

Yes. Popups are injected through the standard Botble theme hooks, so no theme file is edited and nothing needs re-applying after a theme update. You can also place a popup inline with a shortcode.

## Do I need BB Form Builder to collect emails?

No. Email capture is built in, with optional name and phone fields, a consent checkbox, a spam honeypot, a subscriber list in the admin and CSV export. If you already own BB Form Builder you can embed one of its forms instead. See [Email capture](./usage/email-capture.md).

## Can I show different popups per language?

Yes. Popup content is translatable per language when the Language Advanced plugin is active, and there is a **Language** display rule for showing a different popup entirely. The plugin's own admin strings ship in English.

## Can I test two versions against each other?

Yes. Add up to four variants, give each a traffic weight, and every visitor is assigned a variant that sticks. Reports split impressions and conversions by variant. See [A/B testing](./usage/ab-testing.md).

## How do I build an age gate?

Fullscreen layout, static backdrop, no close button, and a `bp-confirm` element as the way through. Clicking outside and pressing Escape are ignored, so confirming is the only route in. See [Triggers & behaviour](./usage/triggers-and-behaviour.md#building-an-age-gate).

## Is exit intent available on mobile?

No. Mobile browsers have no reliable exit-intent signal. Tick **Also show after a time delay** so mobile visitors get the popup on a timer instead.

## How many popups can I run?

There is no limit, and no per-popup licence tier. Only the highest-priority eligible popup is shown per page view unless you turn on **Show the next eligible popup after one is closed**.

## Where is frequency stored?

In the visitor's browser (local storage), not against a user account. Clearing site data resets it, and the same person on a second device counts as a new visitor.

## Can I put a popup on a different website?

Yes - allow embedding on the popup's Advanced tab and paste the script snippet on the other site. An iframe embed is also available where third-party scripts are forbidden. See [Shortcode & embed](./usage/shortcode-and-embed.md#embedding-on-another-site).

## Is it accessible?

The popup traps focus while open, closes on Escape (unless you have set a static backdrop), uses `aria-modal`, and respects `prefers-reduced-motion`. RTL stylesheets are included.

## What happens if my licence expires?

Existing popups keep rendering - an expired licence never breaks a live site. You cannot create or edit popups until it is reactivated.

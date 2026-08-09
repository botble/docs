---
title: Release notes
description: What changed in each version of BB Popup
---

# Release notes

## 1.0.0 - 6 August 2026

Initial release.

### Layouts
- Modal (centered), slide-in (four corners), notification bar, fullscreen overlay, and inline (shortcode only)

### Style presets
- Eight ready-made skins - Classic, Flash Sale, Glass, Spotlight, Minimal, Bold, Gradient and Soft - chosen from a visual picker

### Content
- Rich-text mode with the full editor and shortcode support
- Image-only mode with a clickable full-bleed banner
- Built-in email capture with optional name and phone fields, consent checkbox and spam honeypot
- Form mode that embeds a BB Form Builder form, auto-styled to the popup palette and closing on successful submit

### Triggers
- Page load, time delay, scroll percentage, exit intent (desktop), click on a CSS selector, inactivity, and page-view count
- Any trigger can be combined with a time delay - whichever fires first opens the popup

### Display rules
- Structured rule builder with Match ALL / Match ANY logic
- Eleven condition types: URL path, page type, language, weekly schedule, device, login status, first-time vs returning visitor, referrer, UTM parameter, cookie and page-view count
- Each rule shows whether it is evaluated on the server or in the browser, so the caching impact is visible

### Countdown
- Per-visitor session timers or a fixed deadline shared by everyone
- Seven expiry actions: close, close permanently, hide the timer, replace it with a message, redirect, restart, or leave at zero

### Behaviour
- Frequency capping: every time, once per session, once ever, every N days, or until converted, plus a stop-after-N-dismissals cap
- Forced-read delay before the popup can be dismissed, with a visible countdown
- Corner reopen icon in any of four positions after the popup is closed

### Appearance
- Site-wide defaults with an optional per-popup override
- Nine colours, gradient background, corner and button radius, shadow, maximum width, font family and eight entrance animations
- Scoped custom CSS that cannot leak into the rest of the site

### Analytics
- Impressions, closes, clicks and conversions recorded per popup and per day
- A/B testing with up to four weighted variants and a per-variant report
- Configurable retention with automatic nightly pruning

### Sharing and portability
- Shortcode placement, plus a JavaScript API for opening popups from your own controls
- Script and iframe embeds for showing a popup on an external site
- JSON import and export, and one-click duplication

### Technical
- Cache-safe by design: visitor-specific conditions are evaluated in the browser, so popups stay correct under full-page caching. An optional AJAX delivery mode keeps popup content out of cached HTML entirely
- Dependency-free public runtime - no jQuery, no CDN requests
- Accessible: focus trap, Escape to close, `aria-modal`, and respect for `prefers-reduced-motion`
- RTL stylesheets included, and popup content is translatable per language
- Per-action admin permissions

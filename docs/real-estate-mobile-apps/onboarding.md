# Customizing the Onboarding Screens

## Overview

On first launch the app shows a short onboarding carousel introducing the car-rental experience, then remembers that it has been seen. The onboarding is **code-driven**. Its slides live in `app/onboarding.tsx` and its text in the translation files. There is no separate config object for it.

## How it works

- `src/components/app-gate.tsx` reads the `onboarding_completed` flag
  (`STORAGE_KEYS.ONBOARDING_COMPLETED`) on startup. If it isn't set, it
  `router.replace("/onboarding")`.
- `app/onboarding.tsx` renders the slides. Pressing **Get started** (or **Skip**)
  writes the flag with `storage.setString(STORAGE_KEYS.ONBOARDING_COMPLETED, "true")`
  and navigates into the app, so onboarding never shows again.

## Editing the slide text

All onboarding copy is translatable. Edit the `onboarding` keys in each locale
file under `src/i18n/locales/` (`en.json`, `vi.json`, `ar.json`, `fr.json`):

```json
{
  "onboarding": {
    "slide1Title": "Find your ride",
    "slide1Text": "Browse thousands of properties from trusted local agents.",
    "slide2Title": "Pick up anywhere",
    "slide2Text": "Choose convenient pickup and drop-off locations.",
    "slide3Title": "Book in minutes",
    "slide3Text": "Reserve instantly and hit the road with confidence.",
    "getStarted": "Get started",
    "skip": "Skip"
  }
}
```

Keep all four locales in sync (run `npm run i18n:check`). See
[Translations](07_translations.md).

## Changing the slides (icons / count)

The slides are defined in `app/onboarding.tsx`. Each entry pairs a
[lucide-react-native](https://lucide.dev/) icon with a title/text translation key.
The defaults are:

```tsx
import { CalendarCheck, Car, MapPin } from "lucide-react-native";

const slides = [
  { icon: Car,           title: t("onboarding.slide1Title", "Find your ride"), text: t("onboarding.slide1Text", "…") },
  { icon: MapPin,        title: t("onboarding.slide2Title", "Pick up anywhere"), text: t("onboarding.slide2Text", "…") },
  { icon: CalendarCheck, title: t("onboarding.slide3Title", "Book in minutes"),  text: t("onboarding.slide3Text", "…") },
];
```

To customize:

- **Swap an icon**: Import a different icon from `lucide-react-native` and set it as the slide's `icon`. Icons render at 64px in the brand color (`themeColors.primary`).
- **Add or remove a slide**: Add or remove an entry in the `slides` array and add the matching `onboarding.slideNTitle` / `slideNText` keys to every locale. The dots indicator and paging adapt automatically.
- To use an image instead of an icon, replace the `<item.icon />` render in the slide with an `<Image>`, bundling the asset under `assets/` and `require()`-ing it. Do not use CDN URLs; bundle images locally.

## Disabling onboarding

Remove the first-launch redirect in `src/components/app-gate.tsx` (delete the
`router.replace("/onboarding")` branch), or pre-seed the flag so it's treated as
already completed.

To **re-test** onboarding during development, clear the flag:

```ts
import { storage, STORAGE_KEYS } from "@/lib/storage";

await storage.remove(STORAGE_KEYS.ONBOARDING_COMPLETED);
```

## Checklist

- [ ] Update slide titles/text in all four locale files
- [ ] (Optional) Swap or add lucide icons in `app/onboarding.tsx`
- [ ] (Optional) Disable via `app-gate.tsx`
- [ ] `npm run i18n:check` passes; test in each language (Arabic is RTL)

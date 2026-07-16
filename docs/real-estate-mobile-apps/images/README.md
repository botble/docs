# FlexHome Documentation Images

This directory contains screenshot placeholders for FlexHome documentation.

## Expected Screenshot Files

The following image files are referenced in the documentation. Real screenshots should be captured from the running simulator and placed here:

### Home & Search
- `flexhome-home-light.png` - Consumer home screen (light theme)
- `flexhome-home-dark.png` - Consumer home screen (dark theme)
- `flexhome-search.png` - Property search with filters
- `flexhome-search-map.png` - Map-based property search view

### Properties & Details
- `flexhome-property-detail.png` - Single property detail page
- `flexhome-property-gallery.png` - Property photo gallery viewer
- `flexhome-properties.png` - Properties listing view
- `flexhome-compare.png` - Property comparison tool

### Consumer Features
- `flexhome-login.png` - Login/authentication screen
- `flexhome-profile.png` - User profile page
- `flexhome-favorites.png` - Saved properties / wishlist
- `flexhome-consult.png` - Consultation/inquiry form
- `flexhome-mortgage-calc.png` - Mortgage calculator screen

### Agent Portal (WebView-based in v1)
- `flexhome-agent-dashboard.png` - Agent dashboard overview
- `flexhome-agent-listings.png` - Agent property listings
- `flexhome-agent-leads.png` - Agent leads/inquiries
- `flexhome-agent-finance.png` - Agent financial dashboard

### Settings & Theme
- `flexhome-theme.png` - Theme customization example
- `flexhome-language.png` - Language selection
- `flexhome-currency.png` - Currency switcher
- `flexhome-notifications.png` - Notification inbox

### Image Specifications
- Format: PNG, high quality
- Dimensions: 1080×2400px (9:20 aspect ratio, matching iPhone 15 Pro screenshot size)
- Rounded corners: 18px border-radius in docs CSS
- Include both light and dark theme variants where applicable
- No sensitive data (blank names, use demo data)

## Naming Convention

All image files use the `flexhome-` prefix to distinguish from the Carento template they derive from.

When referencing images in markdown:
```markdown
![Description](./images/flexhome-feature-name.png)
```

When displayed in HTML with rounded corners:
```html
<img src="./images/flexhome-feature-name.png" alt="Feature" style="width:31%; max-width:240px; border-radius:18px;" />
```

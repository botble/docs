# Menu

Menus are a crucial element for website navigation. In Qore, menus are used for the main header navigation and footer links.

You can manage your menus from the `Appearance` -> `Menus` in the admin panel.

## Adding a New Menu

To add a new menu, click on `Create` button. Enter a name for the menu and click on `Save` button.

### Adding Menu Items

In the menu edit page, you can add menu items by clicking on the items on the left side and then clicking
on `Add to menu` button.

You can drag and drop the menu items to change their order or create nested menus (level 2, 3, etc).

### Available Menu Items

Here are the available menu items that you can add to the menu:

* **Custom Links**: Create links directing users to external websites or specific sections within your website.
* **Pages**: Add existing pages from your website to the menu.
* **Post Categories**: Display categories of blog posts for navigation.
* **Post Tags**: Allow navigation by individual tags associated with blog posts.

## Setting a Menu Location

To set a menu as the main navigation, enable the `Main Navigation` checkbox in the **Display location** section.

## Menu Locations

Qore supports the following menu locations:

| Location | Description |
|----------|-------------|
| Main Navigation | Primary navigation menu in header |

## Anchor Links

For single-page navigation, you can use anchor links to scroll to specific sections:

1. Add a **Custom Link** to your menu
2. Set the URL to `#section-id` (e.g., `#features`, `#pricing`)
3. The link will smooth-scroll to that section on the page

### Common Section IDs

| Section | Anchor ID |
|---------|-----------|
| Hero | `#hero` |
| Features | `#features` |
| Benefits | `#benefits` |
| How-To | `#howToUse` |
| Pricing | `#pricing` |
| Testimonials | `#testimonials` |
| FAQ | `#faq` |
| CTA | `#cta` |
| Contact | `#contact` |

## Header Navigation

The header navigation in Qore features:

- Transparent background that becomes solid on scroll
- Logo on the left
- Navigation links on the right
- Mobile hamburger menu for smaller screens
- Smooth scroll to sections when using anchor links

## Mobile Menu

On mobile devices, the navigation transforms into a hamburger menu:

- Click the hamburger icon to open
- Full-screen overlay with navigation links
- Animated menu items
- Close button to dismiss

## Footer Menu

You can also add menus to the footer through widgets:

1. Create a new menu for footer links
2. Go to `Appearance` -> `Widgets`
3. Add a menu widget to the footer sidebar
4. Select your footer menu

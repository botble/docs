# Widgets

Qore provides widget areas to help you customize content in the footer section of your website.

## Manage Widgets

To manage the widgets, go to the `Appearance` -> `Widgets` menu in the admin panel.

To add a widget to a sidebar, drag and drop the widget from the left side to the sidebar area on the right side.

## Widget Areas

### Footer Sidebar

The footer sidebar is the main widget area in Qore. It appears in the footer section of the website.

This sidebar is suitable for displaying:

- Site information
- Social links
- Navigation menus
- Copyright text
- Newsletter signup
- Custom HTML content

## Available Widgets

Qore supports the following widgets:

| Widget | Description |
|--------|-------------|
| Site Information | Display site logo, name, and description |
| Custom Menu | Display a navigation menu |
| Social Links | Social media profile links |
| Custom HTML | Custom HTML content |
| Newsletter | Newsletter signup form (requires Newsletter plugin) |

## Social Links

Social links are typically displayed in the footer of the theme. To configure social links:

1. Go to `Appearance` -> `Theme Options`
2. Navigate to the **Social Links** section
3. Add your social media profile URLs
4. Save changes

The theme uses the `ThemeSupport::registerSocialLinks()` feature built into the theme.

## Newsletter Widget

If the Newsletter plugin is installed:

1. Activate the Newsletter plugin in `Admin` -> `Plugins`
2. Configure newsletter settings
3. Add the Newsletter widget to your footer sidebar
4. Users can subscribe directly from the footer

## Delete Widgets

If you don't want to use the widgets, you can remove them by collapsing the widget and clicking the
**Delete** button.

## Custom Footer Content

For more control over footer content, you can use the Custom HTML widget to add:

- Custom copyright text
- Additional links
- Contact information
- Any HTML content

This gives you flexibility to design your footer exactly as needed.

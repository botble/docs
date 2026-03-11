# Widgets

Qore provides multiple widget areas to help you customize content across your website.

## Manage Widgets

To manage the widgets, go to the `Appearance` -> `Widgets` menu in the admin panel.

To add a widget to a sidebar, drag and drop the widget from the left side to the sidebar area on the right side.

## Widget Areas

Qore registers the following widget areas:

| Widget Area | Description |
|-------------|-------------|
| Footer Sidebar | Main footer widget area |
| Blog Sidebar | Sidebar for blog pages |
| Header Controls | Header control widgets (search, theme toggle, language) |
| Footer Column 1 | First footer column widgets |
| Footer Column 2 | Second footer column widgets |
| Footer Column 3 | Third footer column widgets |
| Footer Bottom | Footer bottom area for copyright and credits |

### Footer Columns

The footer is organized into 3 columns. Each column has its own widget area, allowing you to arrange content across the footer layout:

- **Footer Column 1**: Typically used for site information or logo
- **Footer Column 2**: Typically used for navigation menus
- **Footer Column 3**: Typically used for contact info or newsletter

### Footer Bottom

The footer bottom area appears below the columns, suitable for copyright text and credits.

### Blog Sidebar

The blog sidebar appears on blog listing and single post pages. You can add widgets like recent posts, categories, or search.

## Available Widgets

Qore supports the following widgets:

| Widget | Description |
|--------|-------------|
| Site Information | Display site logo, name, and description |
| Site Logo | Display the site logo |
| Site Copyright | Display copyright text |
| Blog Posts | Display recent blog posts |
| Contact Form | Display a contact form |
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

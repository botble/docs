---
title: Categories & Tags
description: Manage product taxonomy and organization
---

# Categories & Tags

Categories and tags organize your marketplace catalog, making it easy for customers to discover products and for admins to manage inventory.

**Access:** Admin → Categories & Tags

## Categories

Categories are hierarchical and serve as the primary product taxonomy. Each product belongs to exactly one category.

### Create a Category

1. Go to **Categories & Tags** → **Categories**
2. Click **Create**
3. Enter:
   - **Name** — Category title (e.g., "WordPress Plugins", "Themes")
   - **Slug** — URL-friendly identifier (auto-generated, editable)
   - **Parent** — Leave blank for top-level, or select a parent for subcategories
   - **Description** — Optional category description (shown in category archive pages)
   - **Icon** — Optional icon for visual identification

4. Click **Save**

### Edit a Category

1. Go to **Categories & Tags** → **Categories**
2. Click the category name to edit
3. Modify fields and save

### Delete a Category

1. Go to **Categories & Tags** → **Categories**
2. Click the category to open it
3. Click **Delete**

::: warning
If a category has products, you cannot delete it. Move or reassign those products to another category first.
:::

### Category Hierarchy Example

```
WordPress Plugins
├── SEO Plugins
├── eCommerce Plugins
└── Security Plugins

Themes
├── WooCommerce Themes
├── Blog Themes
└── Corporate Themes
```

Products inherit the SEO slug structure from their category (e.g., a product in "SEO Plugins" might have the slug `/wordpress-plugins/seo-plugins/my-plugin/`).

## Tags

Tags are flat, non-hierarchical labels that provide additional organization. A product can have multiple tags.

### Create a Tag

1. Go to **Categories & Tags** → **Tags**
2. Click **Create**
3. Enter:
   - **Name** — Tag title (e.g., "Free", "Featured", "New Release")
   - **Slug** — URL-friendly identifier (auto-generated, editable)
   - **Description** — Optional description

4. Click **Save**

### Edit a Tag

1. Go to **Categories & Tags** → **Tags**
2. Click the tag name to edit
3. Modify fields and save

### Delete a Tag

1. Go to **Categories & Tags** → **Tags**
2. Click the tag to open it
3. Click **Delete**

Deleting a tag does not affect products; it only removes the tag from the system.

### Common Tag Examples

- **By Status:** Featured, New, Updated, On Sale
- **By Type:** Beginner-Friendly, Advanced, Open Source
- **By Use Case:** WordPress, WooCommerce, Drupal
- **By License:** GPL, MIT, Commercial

## Applying Categories & Tags

### As an Admin

View which products use each category/tag:

1. Open a category or tag
2. Scroll to **Products** section
3. See all products using that category/tag

### As an Author

When publishing a product:

1. Go to **Products** → **Create**
2. Select a **Category** (required)
3. Select one or more **Tags** (optional)
4. Save the product

See [Publishing Products](./publishing-products.md) for the complete author workflow.

## SEO & Navigation

Categories and tags improve your marketplace's SEO:

- **Category pages** appear in search engines (e.g., `/wordpress-plugins/`)
- **Tag pages** act as archive pages (e.g., `/tag/featured/`)
- Breadcrumb navigation shows the category path

Customize category/tag page templates in your theme to highlight featured products or showcase category-specific information.

::: tip
Use a clear, consistent naming scheme for categories and tags. Avoid typos and duplicates, as they fragment your product organization.
:::

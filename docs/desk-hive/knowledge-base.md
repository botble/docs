# Knowledge Base

The knowledge base allows you to publish self-service articles that customers can browse and search without submitting a ticket. Articles are organized into categories and support helpful/not-helpful voting.

## Knowledge Categories

Navigate to **Admin → Support Desk → Knowledge Base** and use the **Categories** tab.

### Category Fields

| Field | Description |
|-------|-------------|
| Name | Category display name |
| Description | Short description shown on the category listing |
| Sort order | Display order (lower numbers appear first) |
| Status | Published or Draft |

### Creating a Category

1. Navigate to **Admin → Support Desk → Knowledge Base**
2. Click **Knowledge Categories** in the submenu
3. Click **Create**
4. Fill in the name, description, and sort order
5. Set status to **Published**
6. Click **Save**

## Knowledge Articles

### Article Fields

| Field | Description |
|-------|-------------|
| Title | Article headline |
| Slug | URL-friendly identifier (auto-generated from title) |
| Category | Parent category |
| Excerpt | Short summary shown in listings |
| Content | Full article body (rich text editor) |
| Author | Admin user credited as author |
| Status | Published or Draft |

### Creating an Article

1. Navigate to **Admin → Support Desk → Knowledge Base**
2. Click **Create**
3. Fill in the title and content
4. Select a category
5. Add an excerpt for the listing page
6. Set status to **Published**
7. Click **Save**

### Article Metrics

Each article tracks:

| Metric | Description |
|--------|-------------|
| Views | Total number of times the article has been viewed |
| Helpful Yes | Count of "Yes, this was helpful" votes |
| Helpful No | Count of "No, this was not helpful" votes |

Authenticated customers can vote on articles once per article. Use these metrics to identify articles that need improvement.

## Customer Portal

The knowledge base is publicly accessible (no login required) at `/support/knowledge-base`.

### Browsing

- **Home:** `/support/knowledge-base` — lists all categories with article counts
- **Category:** `/support/knowledge-base/category/{id}` — lists articles in a category
- **Article:** `/support/knowledge-base/{slug}` — full article view

### Searching

Customers can search articles at `/support/knowledge-base/search`. The search matches against article titles and content.

### Voting

Authenticated customers see a "Was this article helpful?" prompt at the bottom of each article. Votes are recorded per customer per article.

## Shortcode

Add the **Support KB Categories** shortcode to any CMS page to display a grid of knowledge base categories:

```
[support-kb-categories title="Knowledge Base" subtitle="Browse our articles" limit="6"]
```

| Parameter | Default | Description |
|-----------|---------|-------------|
| title | — | Section heading |
| subtitle | — | Section subheading |
| limit | 6 | Maximum number of categories to display |

See [Theme Customization](theme-customization.md) for all available shortcodes.

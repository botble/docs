# Portfolio Integration

Isak integrates seamlessly with the Portfolio plugin to display your projects and services. This guide covers how to set up and customize portfolio content.

## Overview

The Portfolio plugin provides:

- **Projects**: Your work portfolio items
- **Services**: Professional services you offer
- **Packages**: Service packages or pricing tiers

## Setting Up Projects

### Creating a Project

1. Go to `Admin` -> `Portfolio` -> `Projects`
2. Click `Create` button
3. Fill in the project details:

| Field | Description |
|-------|-------------|
| Name | Project title |
| Description | Brief project overview |
| Content | Full project details (optional) |
| Image | Featured project image |
| Category | Project category |

![Create Project](./images/portfolio/create-project.png)

### Extended Project Fields

Isak adds custom fields specifically for portfolio display:

| Field | Description | Example |
|-------|-------------|---------|
| Role | Your role in the project | "Lead Product Designer" |
| Year | Project completion year | "2024" |

These fields appear after the Description field in the project form and are displayed in the Work Highlights shortcode.

![Project Extended Fields](./images/portfolio/project-extended-fields.png)

### Project Display

Projects are displayed in the **Work Highlights** shortcode with:

- Sticky scroll animation
- Featured image display
- Project name and description
- Role and year badges
- Link to full project page

## Setting Up Services

### Creating a Service

1. Go to `Admin` -> `Portfolio` -> `Services`
2. Click `Create` button
3. Fill in the service details:

| Field | Description |
|-------|-------------|
| Name | Service title |
| Description | Service summary |
| Content | Full service details |
| Image | Service image |
| Icon | Service icon (optional) |
| Order | Display order (lower = first) |

![Create Service](./images/portfolio/create-service.png)

### Extended Service Fields

Isak adds custom image fields for services that appear after the Icon field:

| Field | Description |
|-------|-------------|
| Service Image 1 | First showcase image |
| Service Image 2 | Second showcase image |

These images appear in the accordion expansion when a service is selected in the Services shortcode.

![Service Extended Fields](./images/portfolio/service-extended-fields.png)

### Service Display

Services are displayed in the **Services** shortcode as:

- Accordion-style list ordered by the Order field
- Service name and description
- Expandable details with two showcase images
- Smooth animation on expand/collapse

## Configuring Shortcodes

### Work Highlights Shortcode

To display projects on your homepage:

1. Edit your homepage
2. Add the "Work Highlights" shortcode
3. Configure:
   - **Section Title**: Heading text
   - **Number of Projects**: Limit of projects to show
   - **Navigation Icon/Label**: Sidebar navigation settings

Projects are loaded in descending order by creation date.

### Services Shortcode

To display services on your homepage:

1. Edit your homepage
2. Add the "Services" shortcode
3. Configure:
   - **Section Title**: Heading text
   - **Number of Services**: Limit of services to show
   - **Navigation Icon/Label**: Sidebar navigation settings

Services are loaded in ascending order by the Order field.

## Best Practices

### Project Images
- Use high-quality images (recommended: 1200x800px minimum)
- Maintain consistent aspect ratios
- Optimize for web to ensure fast loading

### Service Images
- Upload both service images for full accordion effect
- Images should complement each other
- Consider how they look in light/dark modes

### Extended Fields
- Always fill in Role and Year for projects - they enhance the display
- Use concise role descriptions (e.g., "UI/UX Designer" not "Senior User Interface and Experience Designer")

### Content Organization
- Write concise descriptions (1-2 sentences)
- Use detailed content only for standalone project pages
- Set Order field for services to control display sequence

## Troubleshooting

### Projects Not Showing
- Verify Portfolio plugin is activated (`Admin` -> `Plugins`)
- Check if projects have "Published" status
- Ensure "Number of Projects" limit is set in shortcode
- Clear cache and refresh

### Service Images Missing
- Upload images in the "Service Image 1" and "Service Image 2" fields
- These fields appear after the Icon field in the service form
- Ensure images are uploaded successfully (check Media Library)

### Wrong Project/Service Order
- **Projects**: Ordered by creation date (newest first)
- **Services**: Ordered by Order field (lowest first)
- Edit the Order field for services to reorder

## Related Documentation

- [UI Block (Shortcodes)](./usage-ui-block.md) - How to add shortcodes to pages
- [Theme Options](./usage-theme-options.md) - Overall theme configuration
- [Homepage](./usage-homepage.md) - Homepage setup guide

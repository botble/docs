# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a multi-product documentation site for the Botble ecosystem, built with VitePress. It documents 28+ products including Botble CMS (core product), various themes, mobile apps, and plugins.

## Essential Commands

### Development
```bash
npm install          # Install dependencies
npm run docs:dev     # Start development server (http://localhost:5173)
npm run docs:build   # Build static site for production
npm run docs:preview # Preview built site locally
```

## Architecture & Structure

### Directory Organization
- `/docs/` - Main documentation directory
  - `.vitepress/` - VitePress configuration and theme
    - `config.ts` - Main site configuration
    - `theme/` - Custom theme components
  - `cms/` - Botble CMS documentation (main product)
  - `[product-name]/` - Individual product directories
    - `index.md` - Product overview page
    - `sidebar.ts` - Navigation structure
    - `images/` - Product-specific images
    - `*.md` - Documentation files
  - `public/` - Static assets

### Adding New Documentation

1. For new products: Create directory `/docs/[product-name]/`
2. Add `sidebar.ts` with navigation structure
3. Include product in `/docs/.vitepress/config.ts` sidebar configuration
4. Follow existing product structure for consistency

### Key Patterns

**Sidebar Configuration**: Each product has its own `sidebar.ts` file exporting navigation structure:
```typescript
export default [
  {
    text: 'Section Name',
    items: [
      { text: 'Page Title', link: '/product-name/page' }
    ]
  }
]
```

**Image References**: Use relative paths from markdown files:
```markdown
![Description](images/filename.png)
```

**Cross-Product Links**: Use absolute paths starting with `/`:
```markdown
[Link to CMS docs](/cms/installation)
```

## Content Guidelines

- Documentation covers: installation, configuration, usage, theming, plugin development, API reference, troubleshooting
- Each product maintains its own namespace and sidebar
- Images are stored within each product's directory
- Follow existing markdown structure and formatting conventions

## VitePress Configuration

Main configuration file: `/docs/.vitepress/config.ts`
- Multiple sidebar support for different products
- Local search provider
- GitHub edit links enabled
- Custom theme with product-specific styling

## Development Context

This documentation covers PHP/Laravel-based products:
- PHP 8.2+ requirement for documented products
- Laravel 12.x framework
- Composer package management
- Artisan CLI tools
- Plugin and theme architecture support
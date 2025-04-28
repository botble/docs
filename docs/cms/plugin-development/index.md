# Plugin Development

## Introduction

Plugins are a great way to extend the functionality of Botble CMS. They allow you to add new features to your website without modifying the core code. This guide will walk you through the process of creating, activating, and managing plugins in Botble CMS.

::: warning
Dev tools are removed in the download package, you need to delete folder `/vendor` and run command `composer install` to reinstall it, then you can use dev commands.
:::

## Creating a Plugin

To create a new plugin, use the following command:

```bash
php artisan cms:plugin:create <plugin-name>
```

For example, to create a plugin named "Foo":

```bash
php artisan cms:plugin:create foo
```

This command will generate a new plugin with the standard structure in the `platform/plugins/foo` directory.

## Plugin Development Guides

The plugin development documentation is organized into the following sections:

1. [Plugin Structure](./structure.md) - Learn about the structure of a plugin and its key components
2. [Basic Components](./basic-components.md) - Understand the basic components of a plugin (Models, Controllers, etc.)
3. [Advanced Components](./advanced-components.md) - Explore advanced components like Events, Listeners, Middleware, etc.
4. [Frontend Integration](./frontend-integration.md) - Learn how to integrate your plugin with the frontend
5. [FAQ](./faq.md) - Find answers to frequently asked questions about plugin development

## Video Tutorials

- Make CRUD inside an existed plugin: https://www.youtube.com/watch?v=GAnoZbGHE28
- Adding new fields to an existing form: https://www.youtube.com/watch?v=5PC6mzssZ70
- Display plugin data on the front theme: https://www.youtube.com/watch?v=YgrfEXK2TBo
- Working with SEO helpers: https://www.youtube.com/watch?v=S0tlbt0K44c

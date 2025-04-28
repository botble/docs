# Source Code Structure

## Introduction

Botble CMS provides full source code with no encryption. The codebase is structured using a modular architecture, which makes it highly extensible and maintainable.

## Modular Architecture

Botble CMS follows a modular architecture pattern in Laravel, which separates the application into distinct modules, each responsible for a specific feature or functionality.

![Modular Architecture](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*9S3JhMtLGnYecxP2rV-a7Q.png)

You can learn more about modular architecture in Laravel from this article: [Exploring Modular Architecture in Laravel](https://moezmissaoui.medium.com/exploring-modular-architecture-in-laravel-c44a1e88eebf)

## Source Code Location

The main source code is located in the `/platform` directory. This directory contains all the core modules, plugins, and themes that make up the CMS.

## Directory Structure

The platform directory is organized into several key directories:

- **core**: Contains the core modules of the CMS
- **packages**: Contains reusable packages that can be used across different projects
- **plugins**: Contains feature-specific plugins that extend the CMS functionality
- **themes**: Contains the frontend themes for the CMS

## Module Structure Example

Let's take the Blog plugin as an example to understand the structure of a module:

- **Controllers**: `platform/plugins/blog/src/Http/Controllers`
- **Views**: `platform/plugins/blog/resources/views`
- **Routes**: `platform/plugins/blog/routes/web.php`
- **Migrations**: `platform/plugins/blog/database/migrations`

Each module follows a similar structure, making it easy to understand and navigate the codebase.

## Frontend Themes

Frontend themes are located in the `platform/themes` directory. Each theme is a separate directory containing all the necessary files for the theme, including views, assets, and configuration files.

## Learning Resources

To learn more about Botble CMS and its codebase, you can refer to the following resources:

- **Documentation**: [https://docs.botble.com/cms](https://docs.botble.com/cms)
- **YouTube Channel**: [https://www.youtube.com/channel/UC6G-qF9Ce4-4qszvgw0ErKg](https://www.youtube.com/channel/UC6G-qF9Ce4-4qszvgw0ErKg)
- **Facebook Group**: [https://www.facebook.com/groups/botble.technologies](https://www.facebook.com/groups/botble.technologies)
- **Forum**: [https://forums.botble.com](https://forums.botble.com)

## Extending Botble CMS

The modular architecture of Botble CMS makes it easy to extend its functionality by creating new plugins and themes. There are many free plugins available on the [Botble Marketplace](https://marketplace.botble.com/products) which are developed by the community, and they can be installed directly from the admin panel by navigating to Plugins → Add new plugin.

This approach to structuring the codebase allows for:

1. **Separation of Concerns**: Each module handles a specific feature or functionality
2. **Reusability**: Modules can be reused across different projects
3. **Maintainability**: Changes to one module don't affect others
4. **Scalability**: New features can be added as new modules without modifying existing code
5. **Testability**: Modules can be tested in isolation

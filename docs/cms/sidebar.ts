import { DefaultTheme } from 'vitepress'

export default [
  {
    text: 'Getting Started',
    items: [
      { text: 'Introduction', link: '/cms/' },
      { text: 'Screenshots', link: '/cms/screenshots' },
      { text: 'Source Code Structure', link: '/cms/source-code-structure' },
      { text: 'Release Notes', link: '/cms/releases' },
      { text: 'Upgrade Guide', link: '/cms/upgrade' },
      {
        text: 'Installation',
        collapsed: false,
        items: [
          { text: 'Requirements', link: '/cms/installation-requirements' },
          { text: 'Using web interface', link: '/cms/installation-web-interface' },
          { text: 'Using command line', link: '/cms/installation-command-line' },
          { text: 'Using Docker', link: '/cms/installation-using-docker' },
        ],
      },
      { text: 'SSL', link: '/cms/ssl' },
      { text: 'License', link: '/cms/license' },
    ],
  },
  {
    text: 'User Guide',
    items: [
      {
        text: 'Configuration',
        collapsed: false,
        items: [
          { text: 'Custom CSS/JS', link: '/cms/usage-custom-css-js' },
          { text: 'Setup email', link: '/cms/usage-email' },
          { text: 'Setup cronjob', link: '/cms/cronjob' },
          { text: 'Setup CDN', link: '/cms/usage-setup-cdn' },
          { text: 'Reset admin password', link: '/cms/usage-reset-admin-password' },
        ],
      },
      {
        text: 'Media Storage',
        collapsed: false,
        items: [
          { text: 'Media Overview', link: '/cms/media' },
          { text: 'Amazon S3', link: '/cms/usage-media-s3' },
          { text: 'Wasabi', link: '/cms/usage-media-wasabi' },
          { text: 'BunnyCDN', link: '/cms/usage-media-bunnycdn' },
          { text: 'Cloudflare R2', link: '/cms/usage-media-cloudflare-r2' },
        ],
      },
      {
        text: 'Integrations',
        collapsed: false,
        items: [
          { text: 'Google Analytics', link: '/cms/usage-analytics' },
          { text: 'Social Login', link: '/cms/usage-social-login' },
        ],
      },
      { text: 'Multi-language', link: '/cms/usage-multi-language' },
      { text: 'Localization', link: '/cms/localization' },
    ],
  },
  {
    text: 'Core Components',
    items: [
      { text: 'Commands', link: '/cms/commands' },
      { text: 'Roles & Permissions', link: '/cms/role-permission' },
      { text: 'API', link: '/cms/api' },
      { text: 'Filters', link: '/cms/filters' },
      { text: 'Actions', link: '/cms/actions' },
      { text: 'Shortcode', link: '/cms/shortcode' },
      { text: 'Meta Box', link: '/cms/meta-box' },
      { text: 'Enum', link: '/cms/enum' },
      { text: 'Slug Field', link: '/cms/slug-field' },
      { text: 'Sitemap', link: '/cms/sitemap' },
      { text: 'Icons', link: '/cms/icons' },
      { text: 'SEO Helper', link: '/cms/seo-helper' },
    ],
  },
  {
    text: 'Admin Panel',
    items: [
      { text: 'Dashboard Widgets', link: '/cms/dashboard-widgets' },
      { text: 'Dashboard Menu', link: '/cms/dashboard-menu' },
      { text: 'Panel Sections', link: '/cms/panel-section' },
      { text: 'Table Builder', link: '/cms/table-builder' },
      {
        text: 'Form Builder',
        collapsed: false,
        link: '/cms/form-builder-get-started',
        items: [
          { text: 'Get Started', link: '/cms/form-builder-get-started' },
          {
            text: 'Basic Fields',
            collapsed: true,
            items: [
              { text: 'Input Fields', link: '/cms/form-builder-input-fields' },
              { text: 'Select Field', link: '/cms/form-builder-select-field' },
              { text: 'Radio Field', link: '/cms/form-builder-radio-field' },
              { text: 'On/Off Field', link: '/cms/form-builder-on-off-field' },
              { text: 'Color Field', link: '/cms/form-builder-color-field' },
            ],
          },
          {
            text: 'Content Fields',
            collapsed: true,
            items: [
              { text: 'Editor Field', link: '/cms/form-builder-editor-field' },
              { text: 'Code Editor Field', link: '/cms/form-builder-code-editor-field' },
              { text: 'Media Image Field', link: '/cms/form-builder-media-image-field' },
            ],
          },
          {
            text: 'Advanced Fields',
            collapsed: true,
            items: [
              { text: 'Date & Time Fields', link: '/cms/form-builder-date-time-field' },
              { text: 'Repeater Field', link: '/cms/form-builder-repeater-field' },
              { text: 'Special Fields', link: '/cms/form-builder-special-fields' },
              { text: 'Advanced Fields', link: '/cms/form-builder-advanced-fields' },
            ],
          },
          { text: 'Form Hooks', link: '/cms/form-builder-hooks' },
        ],
      },
    ],
  },
  {
    text: 'Development',
    items: [
      {
        text: 'Plugin Development',
        collapsed: false,
        items: [
          { text: 'Getting Started', link: '/cms/plugin-development/' },
          { text: 'Plugin Structure', link: '/cms/plugin-development/structure' },
          { text: 'Basic Components', link: '/cms/plugin-development/basic-components' },
          { text: 'Advanced Components', link: '/cms/plugin-development/advanced-components' },
          { text: 'Frontend Integration', link: '/cms/plugin-development/frontend-integration' },
          { text: 'FAQ', link: '/cms/plugin-development/faq' },
        ],
      },
      {
        text: 'Theme Development',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/cms/theme-development/theme' },
          { text: 'Theme Structure', collapsed: true, items: [
            { text: 'MVC Pattern', link: '/cms/theme-development/theme-mvc-pattern' },
            { text: 'Routes', link: '/cms/theme-development/theme-routes' },
            { text: 'Assets', link: '/cms/theme-development/theme-assets' },
            { text: 'Layouts', link: '/cms/theme-development/theme-layout' },
            { text: 'Error Pages', link: '/cms/theme-development/theme-error-pages' },
          ]},
          { text: 'Theme Features', collapsed: true, items: [
            { text: 'Menu', link: '/cms/theme-development/menu' },
            { text: 'Breadcrumb', link: '/cms/theme-development/theme-breadcrumb' },
            { text: 'Widget', link: '/cms/theme-development/theme-widget' },
            { text: 'Theme Options', link: '/cms/theme-development/theme-options' },
            { text: 'Theme Localization', link: '/cms/theme-development/theme-localization' },
            { text: 'Rename Theme', link: '/cms/theme-development/theme-rename' },
          ]},
          { text: 'Advanced Theme Development', collapsed: true, items: [
            { text: 'Partials', link: '/cms/theme-development/theme-partials' },
            { text: 'Hooks and Events', link: '/cms/theme-development/theme-hooks-events' },
            { text: 'SEO Optimization', link: '/cms/theme-development/theme-seo-optimization' },
            { text: 'Performance Optimization', link: '/cms/theme-development/theme-performance-optimization' },
            { text: 'Customization Best Practices', link: '/cms/theme-development/theme-customization-best-practices' },
          ]},
        ],
      },
    ],
  },
  {
    text: 'Plugins',
    items: [
      { text: 'Custom Fields', link: '/cms/plugin-custom-field' },
      { text: 'Contact Form', link: '/cms/plugin-contact-form' },
      { text: 'Gallery', link: '/cms/plugin-gallery' },
      { text: 'Backup', link: '/cms/plugin-backup' },
      { text: 'FAQ', link: '/cms/plugin-faq' },
      { text: 'Translation', link: '/cms/plugin-translation' },
    ],
  }
] satisfies DefaultTheme.SidebarItem[];

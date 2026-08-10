import {DefaultTheme} from 'vitepress';

export default [
    { text: 'Overview', link: '/bb-store-locator/' },
    {
        text: 'Getting Started',
        items: [
            { text: 'Installation', link: '/bb-store-locator/installation' },
            { text: 'Configuration', link: '/bb-store-locator/configuration' },
        ],
    },
    {
        text: 'User Guide',
        items: [
            { text: 'Managing Stores', link: '/bb-store-locator/usage/managing-stores' },
            { text: 'Layouts & Shortcode', link: '/bb-store-locator/usage/layouts-and-shortcode' },
            { text: 'Map Providers', link: '/bb-store-locator/usage/map-providers' },
            { text: 'Import & Export', link: '/bb-store-locator/usage/import-export' },
            { text: 'Geocoding', link: '/bb-store-locator/usage/geocoding' },
            { text: 'REST API', link: '/bb-store-locator/usage/rest-api' },
        ],
    },
    {
        text: 'Integration',
        items: [
            { text: 'Other Plugins & Themes', link: '/bb-store-locator/integration' },
        ],
    },
    {
        text: 'Updates',
        items: [
            { text: 'Release Notes', link: '/bb-store-locator/releases' },
        ],
    },
    {
        text: 'Support',
        items: [
            { text: 'Troubleshooting', link: '/bb-store-locator/troubleshooting' },
            { text: 'Backend Configuration Errors', link: '/bb-store-locator/backend-configuration-errors' },
            { text: 'FAQ', link: '/bb-store-locator/faq' },
        ],
    },
] satisfies DefaultTheme.SidebarItem[];

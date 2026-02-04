import {DefaultTheme} from 'vitepress';

export default [
    { text: 'Overview', link: '/license-manager/' },
    {
        text: 'Getting Started',
        items: [
            {
                text: 'Installation',
                items: [
                    { text: 'Requirements', link: '/license-manager/installation-requirements' },
                    { text: 'Using web interface', link: '/license-manager/installation-web-interface' },
                    { text: 'Using command line', link: '/license-manager/installation-command-line' },
                ],
            },
            { text: 'Migration from LicenseBox', link: '/license-manager/migration-from-licensebox' },
        ],
    },
    {
        text: 'Configuration',
        items: [
            { text: 'Cronjob', link: '/license-manager/cronjob' },
            { text: 'Commands', link: '/license-manager/commands' },
            { text: 'Webhooks', link: '/license-manager/webhooks' },
        ],
    },
    {
        text: 'Usage',
        items: [
            { text: 'Products', link: '/license-manager/products' },
            { text: 'Licenses', link: '/license-manager/licenses' },
            { text: 'Activations', link: '/license-manager/activations' },
            { text: 'Customers', link: '/license-manager/customers' },
            { text: 'API Reference', link: '/license-manager/api' },
        ],
    },
    { text: 'Troubleshooting', link: '/license-manager/troubleshooting' },
] satisfies DefaultTheme.SidebarItem[];

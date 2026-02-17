import {DefaultTheme} from 'vitepress';

export default [
    { text: 'Overview', link: '/license-manager/' },
    {
        text: 'For Developers',
        items: [
            { text: 'Quick Start (5 min)', link: '/license-manager/quick-start' },
            { text: 'Integration Examples', link: '/license-manager/examples' },
            { text: 'Integration Guide', link: '/license-manager/integration' },
            { text: 'API Reference', link: '/license-manager/api' },
            { text: 'Demo Playground', link: '/license-manager/demo-playground' },
            { text: 'Webhooks', link: '/license-manager/webhooks' },
        ],
    },
    {
        text: 'Server Setup',
        items: [
            { text: 'Requirements', link: '/license-manager/installation-requirements' },
            { text: 'Install via Web', link: '/license-manager/installation-web-interface' },
            { text: 'Install via CLI', link: '/license-manager/installation-command-line' },
            { text: 'Install via Docker', link: '/license-manager/installation-using-docker' },
            { text: 'SSL', link: '/license-manager/ssl' },
            { text: 'Cronjob', link: '/license-manager/cronjob' },
            { text: 'Commands', link: '/license-manager/commands' },
        ],
    },
    {
        text: 'Admin Guide',
        items: [
            { text: 'Products', link: '/license-manager/products' },
            { text: 'Licenses', link: '/license-manager/licenses' },
            { text: 'Activations', link: '/license-manager/activations' },
            { text: 'Customers', link: '/license-manager/customers' },
        ],
    },
    {
        text: 'More',
        items: [
            { text: 'Migration from LicenseBox', link: '/license-manager/migration-from-licensebox' },
            { text: 'Troubleshooting', link: '/license-manager/troubleshooting' },
        ],
    },
] satisfies DefaultTheme.SidebarItem[];

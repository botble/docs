import {DefaultTheme} from 'vitepress';

export default [
    { text: 'Overview', link: '/product-gifts/' },
    {
        text: 'Getting Started',
        items: [
            { text: 'Installation', link: '/product-gifts/installation' },
            { text: 'Configuration', link: '/product-gifts/configuration' },
        ],
    },
    {
        text: 'User Guide',
        items: [
            { text: 'Usage Overview', link: '/product-gifts/usage/' },
            { text: 'Creating Gift Rules', link: '/product-gifts/usage/creating-rules' },
            { text: 'Managing Rules', link: '/product-gifts/usage/managing-rules' },
            { text: 'Admin Dashboard', link: '/product-gifts/usage/admin-dashboard' },
            { text: 'Customer Guide', link: '/product-gifts/usage/customer-guide' },
        ],
    },
    {
        text: 'Updates',
        items: [
            { text: 'Release Notes', link: '/product-gifts/releases' },
            { text: 'Upgrade Guide', link: '/product-gifts/upgrade' },
        ],
    },
    {
        text: 'Support',
        items: [
            { text: 'Troubleshooting', link: '/product-gifts/troubleshooting' },
            { text: 'FAQ', link: '/product-gifts/faq' },
        ],
    },
] satisfies DefaultTheme.SidebarItem[];

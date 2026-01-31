import {DefaultTheme} from 'vitepress';

export default [
    { text: 'Overview', link: '/wholesale/' },
    {
        text: 'Getting Started',
        items: [
            { text: 'Installation', link: '/wholesale/installation' },
            { text: 'Configuration', link: '/wholesale/configuration' },
        ],
    },
    {
        text: 'User Guide',
        items: [
            { text: 'Usage Overview', link: '/wholesale/usage/' },
            { text: 'Customer Groups', link: '/wholesale/usage/customer-groups' },
            { text: 'Pricing Rules', link: '/wholesale/usage/pricing-rules' },
            { text: 'Admin Dashboard', link: '/wholesale/usage/admin-dashboard' },
            { text: 'Customer Guide', link: '/wholesale/usage/customer-guide' },
        ],
    },
    {
        text: 'Updates',
        items: [
            { text: 'Release Notes', link: '/wholesale/releases' },
            { text: 'Upgrade Guide', link: '/wholesale/upgrade' },
        ],
    },
    {
        text: 'Support',
        items: [
            { text: 'Troubleshooting', link: '/wholesale/troubleshooting' },
            { text: 'FAQ', link: '/wholesale/faq' },
        ],
    },
] satisfies DefaultTheme.SidebarItem[];

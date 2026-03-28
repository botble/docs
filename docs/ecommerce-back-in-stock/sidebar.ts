import {DefaultTheme} from 'vitepress';

export default [
    { text: 'Overview', link: '/ecommerce-back-in-stock/' },
    {
        text: 'Getting Started',
        items: [
            { text: 'Installation', link: '/ecommerce-back-in-stock/installation' },
            { text: 'Configuration', link: '/ecommerce-back-in-stock/configuration' },
        ],
    },
    {
        text: 'User Guide',
        items: [
            { text: 'Usage Overview', link: '/ecommerce-back-in-stock/usage/' },
            { text: 'Subscriptions', link: '/ecommerce-back-in-stock/usage/subscriptions' },
            { text: 'Customer Guide', link: '/ecommerce-back-in-stock/usage/customer-guide' },
        ],
    },
    {
        text: 'Updates',
        items: [
            { text: 'Release Notes', link: '/ecommerce-back-in-stock/releases' },
            { text: 'Upgrade Guide', link: '/ecommerce-back-in-stock/upgrade' },
        ],
    },
    {
        text: 'Support',
        items: [
            { text: 'Troubleshooting', link: '/ecommerce-back-in-stock/troubleshooting' },
            { text: 'FAQ', link: '/ecommerce-back-in-stock/faq' },
        ],
    },
] satisfies DefaultTheme.SidebarItem[];

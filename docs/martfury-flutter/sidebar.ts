import {DefaultTheme} from 'vitepress';

export default [
    { text: 'Overview', link: '/martfury-flutter/' },
    {
        text: 'Getting Started',
        items: [
            { text: 'Installation', link: '/martfury-flutter/installation' },
            { text: 'Configuration', link: '/martfury-flutter/configuration' },
            { text: 'FCM Setup', link: '/martfury-flutter/fcm-setup' },
        ],
    },
    {
        text: 'User Guide',
        items: [
            { text: 'Complete Usage Guide', link: '/martfury-flutter/usage-guide' },
            { text: 'API Integration', link: '/martfury-flutter/api-integration' },
            { text: 'Development Guide', link: '/martfury-flutter/development' },
        ],
    },
    {
        text: 'Features',
        items: [
            { text: 'Authentication', link: '/martfury-flutter/features/authentication' },
            { text: 'Product Browsing', link: '/martfury-flutter/features/products' },
            { text: 'Shopping Cart', link: '/martfury-flutter/features/cart' },
            { text: 'Payment Integration', link: '/martfury-flutter/features/payments' },
            { text: 'Order Management', link: '/martfury-flutter/features/orders' },
        ],
    },
    {
        text: 'Updates',
        items: [
            { text: 'Release Notes', link: '/martfury-flutter/releases' },
            { text: 'Upgrade Guide', link: '/martfury-flutter/upgrade' },
        ],
    },
    {
        text: 'Support',
        items: [
            { text: 'Troubleshooting', link: '/martfury-flutter/troubleshooting' },
            { text: 'FAQ', link: '/martfury-flutter/faq' },
        ],
    },
] satisfies DefaultTheme.SidebarItem[];

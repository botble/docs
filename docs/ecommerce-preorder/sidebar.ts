import {DefaultTheme} from 'vitepress';

export default [
    { text: 'Overview', link: '/ecommerce-preorder/' },
    {
        text: 'Getting Started',
        items: [
            { text: 'Installation', link: '/ecommerce-preorder/installation' },
            { text: 'Configuration', link: '/ecommerce-preorder/configuration' },
        ],
    },
    {
        text: 'User Guide',
        items: [
            { text: 'Usage Overview', link: '/ecommerce-preorder/usage/' },
            { text: 'Preorder Products', link: '/ecommerce-preorder/usage/preorder-products' },
            { text: 'Preorder Orders', link: '/ecommerce-preorder/usage/preorder-orders' },
            { text: 'Customer Guide', link: '/ecommerce-preorder/usage/customer-guide' },
            { text: 'Vendor Guide', link: '/ecommerce-preorder/usage/vendor-guide' },
        ],
    },
    {
        text: 'Updates',
        items: [
            { text: 'Release Notes', link: '/ecommerce-preorder/releases' },
            { text: 'Upgrade Guide', link: '/ecommerce-preorder/upgrade' },
        ],
    },
    {
        text: 'Support',
        items: [
            { text: 'Troubleshooting', link: '/ecommerce-preorder/troubleshooting' },
            { text: 'FAQ', link: '/ecommerce-preorder/faq' },
        ],
    },
] satisfies DefaultTheme.SidebarItem[];

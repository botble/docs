import {DefaultTheme} from 'vitepress';

export default [
    { text: 'Overview', link: '/pos-pro/' },
    {
        text: 'Getting Started',
        items: [
            { text: 'Installation', link: '/pos-pro/installation' },
            { text: 'Configuration', link: '/pos-pro/configuration' },
            { text: 'Changelog', link: '/pos-pro/releases' },
            { text: 'Upgrading', link: '/pos-pro/upgrade' },
        ],
    },
    {
        text: 'Usage',
        items: [
            { text: 'Using POS Pro', link: '/pos-pro/usage-guide' },
            { text: 'Cash Register', link: '/pos-pro/usage-cash-register' },
            { text: 'Refunds', link: '/pos-pro/usage-refunds' },
            { text: 'Reports & Analytics', link: '/pos-pro/usage-reports' },
            { text: 'Barcode Scanner', link: '/pos-pro/usage-barcode-scanner' },
            { text: 'Printer Setup', link: '/pos-pro/usage-printer-setup' },
        ],
    },
    {
        text: 'Integrations',
        items: [
            { text: 'Stripe Terminal', link: '/pos-pro/usage-stripe-terminal' },
            { text: 'Marketplace', link: '/pos-pro/usage-marketplace' },
        ],
    },
    { text: 'Troubleshooting', link: '/pos-pro/troubleshooting' },
    { text: 'Frequent Questions', link: '/pos-pro/faq' },
] satisfies DefaultTheme.SidebarItem[];

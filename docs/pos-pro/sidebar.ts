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
            { text: 'Barcode Scanner', link: '/pos-pro/usage-barcode-scanner' },
            { text: 'Troubleshooting', link: '/pos-pro/troubleshooting' },
        ],
    },
    { text: 'Frequent Questions', link: '/pos-pro/faq' },
] satisfies DefaultTheme.SidebarItem[];

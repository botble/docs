import {DefaultTheme} from 'vitepress';

export default [
    { text: 'Overview', link: '/affiliate-pro/' },
    {
        text: 'Getting Started',
        items: [
            { text: 'Installation', link: '/affiliate-pro/installation' },
            { text: 'Configuration', link: '/affiliate-pro/configuration' },
        ],
    },
    {
        text: 'User Guide',
        items: [
            { text: 'Complete Usage Guide', link: '/affiliate-pro/usage-guide' },
            { text: 'Marketplace Integration', link: '/affiliate-pro/marketplace-integration' },
        ],
    },
    {
        text: 'Updates',
        items: [
            { text: 'Release Notes', link: '/affiliate-pro/releases' },
            { text: 'Upgrade Guide', link: '/affiliate-pro/upgrade' },
        ],
    },
    {
        text: 'Support',
        items: [
            { text: 'Troubleshooting', link: '/affiliate-pro/troubleshooting' },
            { text: 'FAQ', link: '/affiliate-pro/faq' },
        ],
    },
] satisfies DefaultTheme.SidebarItem[];

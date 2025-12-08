import {DefaultTheme} from 'vitepress';

export default [
    { text: 'Overview', link: '/loyalty-points/' },
    {
        text: 'Getting Started',
        items: [
            { text: 'Installation', link: '/loyalty-points/installation' },
            { text: 'Configuration', link: '/loyalty-points/configuration' },
        ],
    },
    {
        text: 'User Guide',
        items: [
            { text: 'Complete Usage Guide', link: '/loyalty-points/usage-guide' },
        ],
    },
    {
        text: 'Updates',
        items: [
            { text: 'Release Notes', link: '/loyalty-points/releases' },
            { text: 'Upgrade Guide', link: '/loyalty-points/upgrade' },
        ],
    },
    {
        text: 'Support',
        items: [
            { text: 'Troubleshooting', link: '/loyalty-points/troubleshooting' },
            { text: 'FAQ', link: '/loyalty-points/faq' },
        ],
    },
] satisfies DefaultTheme.SidebarItem[];

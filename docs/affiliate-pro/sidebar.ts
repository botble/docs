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
        text: 'Usage',
        items: [
            { text: 'Using Affiliate Pro', link: '/affiliate-pro/usage-guide' },
            { text: 'Troubleshooting', link: '/affiliate-pro/troubleshooting' },
        ],
    },
    { text: 'Frequent Questions', link: '/affiliate-pro/faq' },
] satisfies DefaultTheme.SidebarItem[];

import {DefaultTheme} from 'vitepress';

export default [
    { text: 'Overview', link: '/cloudify/' },
    {
        text: 'Getting Started',
        items: [
            { text: 'Installation', link: '/cloudify/installation' },
            { text: 'Upgrade Guide', link: '/cloudify/upgrade' },
            { text: 'License', link: '/cloudify/license' },
        ],
    },
    {
        text: 'Configuration',
        items: [
            { text: 'SSL', link: '/cloudify/ssl' },
            { text: 'Cronjob', link: '/cloudify/cronjob' },
            { text: 'Email', link: '/cloudify/email' },
            { text: 'Media', link: '/cloudify/media' },
        ],
    },
    {
        text: 'Usage',
        items: [
            { text: 'Multi Language', link: '/cloudify/usage-multi-language' },
            { text: 'Translation', link: '/cloudify/usage-translation' },
            { text: 'API Integration', link: '/cloudify/usage-api' },
        ],
    },
    { text: 'Frequent Questions', link: '/cloudify/faq' },
] satisfies DefaultTheme.SidebarItem[];

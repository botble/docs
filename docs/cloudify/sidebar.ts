import {DefaultTheme} from 'vitepress';

export default [
    { text: 'Overview', link: '/cloudify/' },
    {
        text: 'Getting Started',
        items: [
            {
                text: 'Installation',
                items: [
                    { text: 'Requirements', link: '/cloudify/installation-requirements' },
                    { text: 'Using web interface', link: '/cloudify/installation-web-interface' },
                    { text: 'Using command line', link: '/cloudify/installation-command-line' },
                    { text: 'Using Docker', link: '/cloudify/installation-using-docker' },
                ],
            },
            { text: 'SSL', link: '/cloudify/ssl' },
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
            { text: 'API Integration', link: '/cloudify/usage-api' },
        ],
    },
    { text: 'Frequent Questions', link: '/cloudify/faq' },
] satisfies DefaultTheme.SidebarItem[];

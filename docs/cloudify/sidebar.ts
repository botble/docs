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
            { text: 'SSL', link: '/athena/ssl' },
            { text: 'License', link: '/athena/license' },
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

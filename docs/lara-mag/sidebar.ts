import { DefaultTheme } from 'vitepress'

export default [
    { text: 'Overview', link: '/lara-mag/' },
    { text: 'Screenshots', link: '/lara-mag/screenshots' },
    {
        text: 'Prologue',
        items: [
            { text: 'Release Notes', link: '/lara-mag/releases' },
            { text: 'Upgrade Guide', link: '/lara-mag/upgrade' },
        ],
    },
    {
        text: 'Getting Started',
        items: [
            {
                text: 'Installation',
                items: [
                    { text: 'Requirements', link: '/lara-mag/installation-requirements' },
                    { text: 'Using web interface', link: '/lara-mag/installation-web-interface' },
                    { text: 'Using command line', link: '/lara-mag/installation-command-line' },
                    { text: 'Using Docker', link: '/lara-mag/installation-using-docker' },
                ],
            },
            { text: 'SSL', link: '/lara-mag/ssl' },
            { text: 'License', link: '/lara-mag/license' },
        ],
    },
    {
        text: 'Usage',
        items: [
            { text: 'Custom CSS/JS', link: '/lara-mag/usage-custom-css-js' },
            { text: 'Translation', link: '/lara-mag/plugin-translation' },
            { text: 'Multi-language', link: '/lara-mag/usage-multi-language' },
            { text: 'Google Analytics', link: '/lara-mag/usage-analytics' },
            { text: 'Media - Setup Amazon S3', link: '/lara-mag/usage-media-s3' },
            { text: 'Media - Setup BunnyCDN', link: '/lara-mag/usage-media-bunnycdn' },
            { text: 'Media - Setup Wasabi', link: '/lara-mag/usage-media-wasabi' },
            { text: 'Setup email', link: '/lara-mag/usage-email' },
            { text: 'Setup cronjob', link: '/lara-mag/cronjob' },
        ],
    },
    {
        text: 'Development',
        items: [
            { text: 'Rename theme', link: '/jobzilla/theme-rename' },
        ]
    }
] satisfies DefaultTheme.SidebarItem[];

import { DefaultTheme } from 'vitepress'

export default [
    { text: 'Introduction', link: '/hasa/' },
    {
        text: 'Prologue',
        items: [
            { text: 'Release Notes', link: '/hasa/releases' },
            { text: 'Upgrade Guide', link: '/hasa/upgrade' },
        ],
    },
    {
        text: 'Getting Started',
        items: [
            {
                text: 'Installation',
                items: [
                    { text: 'Requirements', link: '/hasa/installation-requirements' },
                    { text: 'Using web interface', link: '/hasa/installation-web-interface' },
                    { text: 'Using command line', link: '/hasa/installation-command-line' },
                    { text: 'Using Docker', link: '/hasa/installation-using-docker' },
                ],
            },
            { text: 'SSL', link: '/hasa/ssl' },
            { text: 'License', link: '/hasa/license' },
        ],
    },
    {
        text: 'Usage',
        items: [
            { text: 'Custom CSS/JS', link: '/hasa/usage-custom-css-js' },
            { text: 'Translation', link: '/hasa/usage-translation' },
            { text: 'Multi-language', link: '/hasa/usage-multi-language' },
            { text: 'Currencies', link: '/hasa/usage-currencies' },
            { text: 'Google Analytics', link: '/hasa/usage-analytics' },
            { text: 'Media - Setup Amazon S3', link: '/hasa/usage-media-s3' },
            { text: 'Media - Setup BunnyCDN', link: '/hasa/usage-media-bunnycdn' },
            { text: 'Media - Setup Wasabi', link: '/hasa/usage-media-wasabi' },
            { text: 'Setup email', link: '/hasa/usage-email' },
            { text: 'Setup social login', link: '/hasa/usage-social-login' },
            { text: 'Location', link: '/hasa/usage-location' },
            { text: 'Invoice template', link: '/hasa/invoice-template' },
            { text: 'Setup cronjob', link: '/hasa/cronjob' },
            { text: 'Newsletter', link: '/hasa/usage-newsletter' },
        ],
    },
    {
        text: 'Development',
        items: [
            { text: 'Rename theme', link: '/hasa/theme-rename' },
        ]
    }
] satisfies DefaultTheme.SidebarItem[];

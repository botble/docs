import { DefaultTheme } from 'vitepress'

export default [
    { text: 'Overview', link: '/carento/' },
    {
        text: 'Prologue',
        items: [
            { text: 'Release Notes', link: '/carento/releases' },
            { text: 'Upgrade Guide', link: '/carento/upgrade' },
        ]
    },
    {
        text: 'Getting Started',
        items: [
            {
                text: 'Installation',
                items: [
                    { text: 'Requirements', link: '/carento/installation-requirements' },
                    { text: 'Using web interface', link: '/carento/installation-web-interface' },
                    { text: 'Using command line', link: '/carento/installation-command-line' },
                    { text: 'Using Docker', link: '/carento/installation-using-docker' },
                ],
            },
            { text: 'SSL', link: '/carento/ssl' },
            { text: 'License', link: '/carento/license' },
        ],
    },
    {
        text: 'Usage',
        items: [
            { text: 'Setup homepage',  link: '/carento/usage-homepage' },
            { text: 'UI Block',  link: '/carento/usage-ui-block' },
            { text: 'Setup menus',  link: '/carento/usage-menus' },
            { text: 'Setup theme options',  link: '/carento/usage-theme-options' },
            { text: 'Widgets', link: '/carento/usage-widgets' },
            { text: 'Custom CSS/JS', link: '/carento/usage-custom-css-js' },
            { text: 'Translation', link: '/carento/usage-translation' },
            { text: 'Multi-language', link: '/carento/usage-multi-language' },
            { text: 'Google Analytics', link: '/carento/usage-analytics' },
            { text: 'Media - Setup Amazon S3', link: '/carento/usage-media-s3' },
            { text: 'Media - Setup BunnyCDN', link: '/carento/usage-media-bunnycdn' },
            { text: 'Media - Setup Wasabi', link: '/carento/usage-media-wasabi' },
            { text: 'Setup email', link: '/carento/usage-email' },
            { text: 'Setup cronjob', link: '/carento/cronjob' },
            { text: 'Newsletter', link: '/carento/usage-newsletter' },
        ],
    },
] satisfies DefaultTheme.SidebarItem[]
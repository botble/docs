import { DefaultTheme } from 'vitepress'

export default [
    { text: 'Overview', link: '/shofy/' },
    {
        text: 'Prologue',
        items: [
            { text: 'Release Notes', link: '/shofy/releases' },
            { text: 'Upgrade Guide', link: '/shofy/upgrade' },
        ],
    },
    {
        text: 'Getting Started',
        items: [
            {
                text: 'Installation',
                items: [
                    { text: 'Requirements', link: '/shofy/installation-requirements' },
                    { text: 'Using web interface', link: '/shofy/installation-web-interface' },
                    { text: 'Using command line', link: '/shofy/installation-command-line' },
                    { text: 'Using Docker', link: '/shofy/installation-using-docker' },
                ],
            },
            { text: 'SSL', link: '/shofy/ssl' },
            { text: 'License', link: '/shofy/license' },
        ],
    },
    {
        text: 'Usage',
        items: [
            { text: 'Homepage', link: '/shofy/usage-homepage' },
            { text: 'Coming soon page', link: '/shofy/usage-coming-soon-page' },
            { text: 'Breadcrumb', link: '/shofy/usage-breadcrumb' },
            { text: 'UI Block', link: '/shofy/usage-ui-block' },
            { text: 'Menu', link: '/shofy/usage-menu' },
            { text: 'Theme options', link: '/shofy/usage-theme-options' },
            { text: 'Widgets', link: '/shofy/usage-widgets' },
            { text: 'Custom CSS/JS', link: '/shofy/usage-custom-css-js' },
            { text: 'Multi-language', link: '/shofy/usage-multi-language' },
            { text: 'Translation', link: '/shofy/usage-translation' },
            { text: 'Google Tag Manager', link: '/shofy/usage-google-tag-manager' },
            { text: 'Google Analytics', link: '/shofy/usage-analytics' },
            { text: 'Media - Setup Amazon S3', link: '/shofy/usage-media-s3' },
            { text: 'Media - Setup BunnyCDN', link: '/shofy/usage-media-bunnycdn' },
            { text: 'Media - Setup Wasabi', link: '/shofy/usage-media-wasabi' },
            { text: 'Setup email', link: '/shofy/usage-email' },
            { text: 'Currencies', link: '/shofy/usage-currencies' },
            { text: 'Setup social login', link: '/shofy/usage-social-login' },
            { text: 'Location', link: '/shofy/usage-location' },
            { text: 'Invoice template', link: '/shofy/invoice-template' },
            { text: 'Ads', link: '/shofy/usage-ads' },
            { text: 'Setup cronjob', link: '/shofy/cronjob' },
            { text: 'Newsletter', link: '/shofy/usage-newsletter' },
            { text: 'Shippo Integration', link: '/shofy/usage-shippo' },
        ],
    },
] satisfies DefaultTheme.SidebarItem[]

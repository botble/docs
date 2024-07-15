import { DefaultTheme } from 'vitepress'

export default [
    { text: 'Overview', link: '/gerow/' },
    {
        text: 'Prologue',
        items: [
            { text: 'Release Notes', link: '/gerow/releases' },
            { text: 'Upgrade Guide', link: '/gerow/upgrade' },
        ]
    },
    {
        text: 'Getting Started',
        items: [
            { text: 'Installation', link: '/gerow/installation' },
            { text: 'SSL', link: '/gerow/ssl' },
            { text: 'License', link: '/gerow/license' },
        ],
    },
    {
        text: 'Usage',
        items: [
            { text: 'Setup homepage',  link: '/gerow/usage-homepage' },
            { text: 'Setup menus',  link: '/gerow/usage-menus' },
            { text: 'Setup theme options',  link: '/gerow/usage-theme-options' },
            { text: 'Widgets', link: '/gerow/usage-widgets' },
            { text: 'Custom CSS/JS', link: '/gerow/usage-custom-css-js' },
            { text: 'Translation', link: '/gerow/usage-translation' },
            { text: 'Multi-language', link: '/gerow/usage-multi-language' },
            { text: 'Google Analytics', link: '/gerow/usage-analytics' },
            { text: 'Media - Setup Amazon S3', link: '/gerow/usage-media-s3' },
            { text: 'Media - Setup BunnyCDN', link: '/gerow/usage-media-bunnycdn' },
            { text: 'Media - Setup Wasabi', link: '/gerow/usage-media-wasabi' },
            { text: 'Setup email', link: '/gerow/usage-email' },
            { text: 'Setup cronjob', link: '/gerow/cronjob' },
            { text: 'Newsletter', link: '/gerow/usage-newsletter' },
        ],
    },
    {
        text: 'Development',
        items: [
            { text: 'Rename theme', link: '/gerow/theme-rename' },
        ]
    }
] satisfies DefaultTheme.SidebarItem[]

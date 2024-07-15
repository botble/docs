import { DefaultTheme } from 'vitepress'

export default [
    { text: 'Overview', link: '/flex-home/' },
    {
        text: 'Prologue',
        items: [
            { text: 'Release Notes', link: '/flex-home/releases' },
            { text: 'Upgrade Guide', link: '/flex-home/upgrade' },
        ],
    },
    {
        text: 'Getting Started',
        items: [
            { text: 'Installation', link: '/flex-home/installation' },
            { text: 'SSL', link: '/flex-home/ssl' },
            { text: 'License', link: '/flex-home/license' },
            { text: 'API', link: '/flex-home/api' },
        ],
    },
    {
        text: 'Usage',
        items: [
            { text: 'Custom CSS/JS', link: '/flex-home/usage-custom-css-js' },
            { text: 'Translation', link: '/flex-home/usage-translation' },
            { text: 'Multi-language', link: '/flex-home/usage-multi-language' },
            { text: 'Real Estate', link: '/flex-home/real-estate' },
            { text: 'Google Analytics', link: '/flex-home/usage-analytics' },
            { text: 'Media - Setup Amazon S3', link: '/flex-home/usage-media-s3' },
            { text: 'Media - Setup BunnyCDN', link: '/flex-home/usage-media-bunnycdn' },
            { text: 'Media - Setup Wasabi', link: '/flex-home/usage-media-wasabi' },
            { text: 'Setup email', link: '/flex-home/usage-email' },
            { text: 'Setup social login', link: '/flex-home/usage-social-login' },
            { text: 'Setup cronjob', link: '/flex-home/cronjob' },
        ],
    },
    {
        text: 'Development',
        items: [
            { text: 'Rename theme', link: '/flex-home/theme-rename' },
        ]
    }
] satisfies DefaultTheme.SidebarItem[]

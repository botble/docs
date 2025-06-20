import {DefaultTheme} from 'vitepress';

export default [
    { text: 'Overview', link: '/martfury-flutter/' },
    { text: 'App Overview', link: '/martfury-flutter/overview' },
    {
        text: 'Getting Started',
        items: [
            { text: 'Installation', link: '/martfury-flutter/installation' },
            { text: 'Configuration', link: '/martfury-flutter/configuration' },
            { text: 'Development Guide', link: '/martfury-flutter/development' },
            { text: 'API Integration', link: '/martfury-flutter/api-integration' },
        ],
    },
    {
        text: 'Quick Setup (5-15 min each)',
        items: [
            { text: '1. Theme Colors', link: '/martfury-flutter/01_theme_colors' },
            { text: '2. App Font', link: '/martfury-flutter/02_app_font' },
            { text: '3. Ad Keys', link: '/martfury-flutter/03_ad_keys' },
            { text: '4. App Name', link: '/martfury-flutter/04_app_name' },
            { text: '5. App Logo', link: '/martfury-flutter/05_app_logo' },
            { text: '6. API Base URL', link: '/martfury-flutter/06_api_base_url' },
            { text: '7. Translations', link: '/martfury-flutter/07_translations' },
            { text: '8. Running App', link: '/martfury-flutter/08_running_app' },
            { text: '9. Deploying App', link: '/martfury-flutter/09_deploying_app' },
            { text: '10. Version Management', link: '/martfury-flutter/10_version_management' },
            { text: '11. Profile Links', link: '/martfury-flutter/11_profile_links' },
            { text: '12. Splash Screen', link: '/martfury-flutter/17_splash_screen' },
            { text: '13. Loading Screen', link: '/martfury-flutter/18_loading_screen' },
        ],
    },
    {
        text: 'Social Login (30-60 min each)',
        items: [
            { text: '14. Twitter/X Login', link: '/martfury-flutter/12_twitter_login_setup' },
            { text: '15. Apple Sign-In', link: '/martfury-flutter/13_apple_login_setup' },
            { text: '16. Google Login', link: '/martfury-flutter/14_google_login_setup' },
            { text: '17. Facebook Login', link: '/martfury-flutter/15_facebook_login_setup' },
        ],
    },

    {
        text: 'Help & Support',
        items: [
            { text: 'Support & Contact', link: '/martfury-flutter/support' },
            { text: 'FAQ', link: '/martfury-flutter/faq' },
            { text: 'Troubleshooting', link: '/martfury-flutter/troubleshooting' },
            { text: 'Upgrade Guide', link: '/martfury-flutter/upgrade' },
            { text: 'Release Notes', link: '/martfury-flutter/releases' },
        ],
    },
] satisfies DefaultTheme.SidebarItem[];

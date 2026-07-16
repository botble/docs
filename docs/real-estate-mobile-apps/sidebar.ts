import {DefaultTheme} from 'vitepress';

export default [
    { text: 'Overview', link: '/real-estate-mobile-apps/' },
    { text: 'App Overview', link: '/real-estate-mobile-apps/overview' },
    { text: '⭐ Complete Setup & Publishing Guide', link: '/real-estate-mobile-apps/complete-setup-and-publishing-guide' },
    {
        text: 'Getting Started',
        items: [
            { text: 'Installation', link: '/real-estate-mobile-apps/installation' },
            { text: 'Configuration', link: '/real-estate-mobile-apps/configuration' },
            { text: 'Development Guide', link: '/real-estate-mobile-apps/development' },
            { text: 'API Integration', link: '/real-estate-mobile-apps/api-integration' },
            { text: 'License Activation', link: '/real-estate-mobile-apps/license-activation' },
        ],
    },
    {
        text: 'Quick Setup (5-15 min each)',
        items: [
            { text: '1. Theme Colors', link: '/real-estate-mobile-apps/01_theme_colors' },
            { text: '2. App Font', link: '/real-estate-mobile-apps/02_app_font' },
            { text: '3. App Name', link: '/real-estate-mobile-apps/04_app_name' },
            { text: '4. App Logo', link: '/real-estate-mobile-apps/05_app_logo' },
            { text: '5. API Base URL', link: '/real-estate-mobile-apps/06_api_base_url' },
            { text: '6. Translations', link: '/real-estate-mobile-apps/07_translations' },
            { text: '7. Running App', link: '/real-estate-mobile-apps/08_running_app' },
            { text: '8. Deploying App', link: '/real-estate-mobile-apps/09_deploying_app' },
            { text: '9. Version Management', link: '/real-estate-mobile-apps/10_version_management' },
            { text: '10. Profile Links', link: '/real-estate-mobile-apps/11_profile_links' },
            { text: '11. Splash Screen', link: '/real-estate-mobile-apps/17_splash_screen' },
            { text: '12. Loading Screen', link: '/real-estate-mobile-apps/18_loading_screen' },
            { text: '13. Onboarding', link: '/real-estate-mobile-apps/onboarding' },
            { text: '14. Push Notifications', link: '/real-estate-mobile-apps/push_notifications' },
        ],
    },
    {
        text: 'Social Login (30-60 min each)',
        items: [
            { text: 'Apple Sign-In', link: '/real-estate-mobile-apps/13_apple_login_setup' },
            { text: 'Google Login', link: '/real-estate-mobile-apps/14_google_login_setup' },
            { text: 'Facebook Login', link: '/real-estate-mobile-apps/15_facebook_login_setup' },
            { text: 'Social Login Configuration', link: '/real-estate-mobile-apps/16_social_login_configuration' },
        ],
    },
    {
        text: 'Help & Support',
        items: [
            { text: 'Support & Contact', link: '/real-estate-mobile-apps/support' },
            { text: 'FAQ', link: '/real-estate-mobile-apps/faq' },
            { text: 'Troubleshooting', link: '/real-estate-mobile-apps/troubleshooting' },
            { text: 'Upgrade Guide', link: '/real-estate-mobile-apps/upgrade' },
            { text: 'Release Notes', link: '/real-estate-mobile-apps/releases' },
        ],
    },
] satisfies DefaultTheme.SidebarItem[];

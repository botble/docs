import { DefaultTheme } from 'vitepress'

export default [
    { text: 'Introduction', link: '/sms-gateway/' },
    {
        text: 'Getting Started',
        items: [
            { text: 'Installation', link: '/sms-gateway/installation' },
        ],
    },
    {
        text: 'Configuration',
        items: [
            { text: 'Twilio Integration', link: '/sms-gateway/services/twilio' },
            { text: 'Nexmo Integration', link: '/sms-gateway/services/nexmo' },
            { text: 'Phone Verification', link: '/sms-gateway/phone-verification' },
        ],
    },
    {
        text: 'Advanced',
        items: [
            { text: 'Logging', link: '/sms-gateway/logging' },
            { text: 'Extending the Plugin', link: '/sms-gateway/extending' },
        ],
    },
] satisfies DefaultTheme.SidebarItem[];

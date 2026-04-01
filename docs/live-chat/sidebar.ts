import { DefaultTheme } from 'vitepress'

export default [
    { text: 'Overview', link: '/live-chat/' },
    {
        text: 'Getting Started',
        items: [
            { text: 'Installation', link: '/live-chat/installation' },
            { text: 'Configuration', link: '/live-chat/configuration' },
        ],
    },
    {
        text: 'Admin Guide',
        items: [
            { text: 'Conversations', link: '/live-chat/conversations' },
            { text: 'Webhooks', link: '/live-chat/webhooks' },
            { text: 'Settings', link: '/live-chat/settings' },
            { text: 'Email Notifications', link: '/live-chat/email-notifications' },
        ],
    },
    {
        text: 'Agent Portal',
        items: [
            { text: 'Agent Portal', link: '/live-chat/agent-portal' },
            { text: 'Agent Management', link: '/live-chat/agent-management' },
        ],
    },
    {
        text: 'Frontend Widget',
        items: [
            { text: 'Widget Customization', link: '/live-chat/widget-customization' },
            { text: 'Working Hours', link: '/live-chat/working-hours' },
        ],
    },
] satisfies DefaultTheme.SidebarItem[]

import {DefaultTheme} from 'vitepress';

export default [
    { text: 'Overview', link: '/desk-hive/' },
    {
        text: 'Installation',
        items: [
            { text: 'Requirements', link: '/desk-hive/installation-requirements' },
            { text: 'Install via Web', link: '/desk-hive/installation-web-interface' },
            { text: 'Install via CLI', link: '/desk-hive/installation-command-line' },
        ],
    },
    {
        text: 'Admin Guide',
        items: [
            { text: 'Tickets', link: '/desk-hive/tickets' },
            { text: 'Knowledge Base', link: '/desk-hive/knowledge-base' },
            { text: 'Departments', link: '/desk-hive/departments' },
            { text: 'Customers', link: '/desk-hive/customers' },
            { text: 'Agents', link: '/desk-hive/agents' },
            { text: 'Canned Responses', link: '/desk-hive/canned-responses' },
            { text: 'Custom Fields', link: '/desk-hive/custom-fields' },
            { text: 'Products', link: '/desk-hive/products' },
        ],
    },
    {
        text: 'Customization',
        items: [
            { text: 'Theme Customization', link: '/desk-hive/theme-customization' },
            { text: 'Social Login', link: '/desk-hive/social-login' },
        ],
    },
    {
        text: 'More',
        items: [
            { text: 'FAQ', link: '/desk-hive/faq' },
            { text: 'Troubleshooting', link: '/desk-hive/troubleshooting' },
        ],
    },
] satisfies DefaultTheme.SidebarItem[];

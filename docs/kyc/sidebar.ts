import { DefaultTheme } from 'vitepress'

export default [
  { text: 'Overview', link: '/kyc/' },
  {
    text: 'Getting Started',
    items: [
      { text: 'Requirements', link: '/kyc/requirements' },
      { text: 'Installation', link: '/kyc/installation' },
      { text: 'Activation & License', link: '/kyc/activation' },
      { text: 'Initial Configuration', link: '/kyc/configuration' },
    ],
  },
  {
    text: 'Admin Guide',
    items: [
      { text: 'Settings Reference', link: '/kyc/usage/settings' },
      { text: 'Review Queue', link: '/kyc/usage/review-queue' },
      { text: 'Approve & Reject', link: '/kyc/usage/approve-reject' },
      { text: 'Lockout & Unlock', link: '/kyc/usage/lockout' },
      { text: 'Permissions', link: '/kyc/usage/permissions' },
      { text: 'Email Notifications', link: '/kyc/usage/notifications' },
      { text: 'Retention & Expiry', link: '/kyc/usage/retention' },
      { text: 'Scheduled Commands', link: '/kyc/usage/commands' },
    ],
  },
  {
    text: 'Integration',
    items: [
      { text: 'Ecommerce (Customer KYC)', link: '/kyc/integration/ecommerce' },
      { text: 'Marketplace (Vendor KYC)', link: '/kyc/integration/marketplace' },
      { text: 'Real Estate (Agent KYC)', link: '/kyc/integration/real-estate' },
      { text: 'Job Board (Employer + Candidate)', link: '/kyc/integration/job-board' },
      { text: 'Car Rental / Listing', link: '/kyc/integration/car-rental' },
      { text: 'Theme Integration', link: '/kyc/integration/theme' },
      { text: 'Checkout & Listing Gates', link: '/kyc/integration/gates' },
      { text: 'GDPR Data Export', link: '/kyc/integration/gdpr-export' },
    ],
  },
  {
    text: 'Developer',
    items: [
      { text: 'Architecture', link: '/kyc/developer/architecture' },
      { text: 'Data Model', link: '/kyc/developer/data-model' },
      { text: 'Events & Hooks', link: '/kyc/developer/events' },
      { text: 'Extending KYC', link: '/kyc/developer/extending' },
      { text: 'Routes Reference', link: '/kyc/developer/routes' },
      { text: 'Webhook Schema', link: '/kyc/developer/webhooks' },
      { text: 'Translations', link: '/kyc/developer/translations' },
    ],
  },
  {
    text: 'Support',
    items: [
      { text: 'Troubleshooting', link: '/kyc/troubleshooting' },
      { text: 'FAQ', link: '/kyc/faq' },
      { text: 'Changelog', link: '/kyc/changelog' },
    ],
  },
] satisfies DefaultTheme.SidebarItem[]

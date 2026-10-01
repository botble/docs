import { DefaultTheme } from 'vitepress'

export default [
  { text: 'Overview', link: '/ecommerce-saas/' },
  {
    text: 'Prologue',
    items: [
      { text: 'Features', link: '/ecommerce-saas/features' },
      { text: 'Why Ecommerce SaaS', link: '/ecommerce-saas/why-ecommerce-saas' },
      { text: 'Release Notes', link: '/ecommerce-saas/releases' },
      { text: 'Upgrade Guide', link: '/ecommerce-saas/upgrade' },
      { text: 'License', link: '/ecommerce-saas/license' },
    ],
  },
  {
    text: 'Getting Started',
    items: [
      { text: 'Quick Start', link: '/ecommerce-saas/quick-start' },
      { text: 'Requirements', link: '/ecommerce-saas/installation-requirements' },
      { text: 'Choosing a server', link: '/ecommerce-saas/installation-hosting' },
      { text: 'Installing from the browser', link: '/ecommerce-saas/installation-browser' },
      { text: 'Installing from the CLI', link: '/ecommerce-saas/installation' },
      { text: 'Wildcard DNS and TLS', link: '/ecommerce-saas/installation-dns-tls' },
      { text: 'Queue worker and cron', link: '/ecommerce-saas/cronjob' },
      { text: 'Environment reference', link: '/ecommerce-saas/environment' },
      { text: 'How it works', link: '/ecommerce-saas/architecture' },
    ],
  },
  {
    text: 'Running the platform',
    items: [
      { text: 'Operator console', link: '/ecommerce-saas/operator-console' },
      { text: 'Managing stores', link: '/ecommerce-saas/usage-stores' },
      { text: 'Self-serve signup', link: '/ecommerce-saas/usage-signup' },
      { text: 'Custom domains', link: '/ecommerce-saas/usage-domains' },
      { text: 'Marketing site', link: '/ecommerce-saas/usage-marketing-site' },
      { text: 'Cloud storage', link: '/ecommerce-saas/cloud-storage' },
      { text: 'Backup and restore', link: '/ecommerce-saas/backup-restore' },
    ],
  },
  {
    text: 'Plans and billing',
    items: [
      { text: 'Plans and quotas', link: '/ecommerce-saas/usage-plans' },
      { text: 'Subscriptions', link: '/ecommerce-saas/usage-subscriptions' },
      { text: 'Billing with Stripe', link: '/ecommerce-saas/usage-billing-stripe' },
      { text: 'Bank transfer', link: '/ecommerce-saas/usage-bank-transfer' },
      { text: 'Signup coupons', link: '/ecommerce-saas/usage-coupons' },
    ],
  },
  {
    text: 'Apps and themes',
    items: [
      { text: 'Apps and themes catalog', link: '/ecommerce-saas/usage-apps-themes' },
      { text: 'Adding a storefront theme', link: '/ecommerce-saas/adding-a-theme' },
    ],
  },
  {
    text: 'Add-ons',
    items: [
      { text: 'Overview', link: '/ecommerce-saas/addons-overview' },
      { text: 'POS Pro', link: '/ecommerce-saas/addons-pos-pro' },
      { text: 'E-Wallet', link: '/ecommerce-saas/addons-e-wallet' },
      { text: 'Affiliate Pro', link: '/ecommerce-saas/addons-affiliate' },
      { text: 'Loyalty Points', link: '/ecommerce-saas/addons-loyalty-points' },
      { text: 'Live Chat', link: '/ecommerce-saas/addons-live-chat' },
      { text: 'SMS Gateways', link: '/ecommerce-saas/addons-sms-gateways' },
      { text: 'Developer Contract', link: '/ecommerce-saas/addons-developer-contract' },
      { text: 'Payment Gateways', link: '/ecommerce-saas/payment-gateways' },
    ],
  },
  {
    text: 'Store owners',
    items: [{ text: 'What store owners see', link: '/ecommerce-saas/store-owner-guide' }],
  },
  {
    text: 'Developer',
    items: [
      { text: 'Control-plane API', link: '/ecommerce-saas/api' },
      { text: 'Webhooks', link: '/ecommerce-saas/webhooks' },
      { text: 'Artisan commands', link: '/ecommerce-saas/commands' },
      { text: 'Localization', link: '/ecommerce-saas/localization' },
      { text: 'Upstream Botble changes', link: '/ecommerce-saas/upstream-patches' },
    ],
  },
  {
    text: 'Help',
    items: [
      { text: 'FAQ', link: '/ecommerce-saas/faq' },
      { text: 'Troubleshooting', link: '/ecommerce-saas/troubleshooting' },
      { text: 'Credits', link: '/ecommerce-saas/credits' },
    ],
  },
] satisfies DefaultTheme.SidebarItem[]

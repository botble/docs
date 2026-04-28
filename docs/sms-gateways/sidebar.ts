import { DefaultTheme } from 'vitepress'

export default [
  { text: 'Introduction', link: '/sms-gateways/' },
  {
    text: 'Getting Started',
    items: [
      { text: 'Requirements', link: '/sms-gateways/requirements' },
      { text: 'Installation', link: '/sms-gateways/installation' },
      { text: 'Activation & License', link: '/sms-gateways/activation' },
      { text: 'Configuration', link: '/sms-gateways/configuration' },
    ],
  },
  {
    text: 'Drivers',
    items: [
      { text: 'Twilio', link: '/sms-gateways/drivers/twilio' },
      { text: 'Vonage (formerly Nexmo)', link: '/sms-gateways/drivers/vonage' },
      { text: 'AWS SNS', link: '/sms-gateways/drivers/aws-sns' },
      { text: 'Plivo', link: '/sms-gateways/drivers/plivo' },
      { text: 'Msg91 (India)', link: '/sms-gateways/drivers/msg91' },
      { text: 'Fast2SMS (India)', link: '/sms-gateways/drivers/fast2sms' },
      { text: 'BulkSMSBD (Bangladesh)', link: '/sms-gateways/drivers/bulksmsbd' },
      { text: 'SSL Wireless (Bangladesh)', link: '/sms-gateways/drivers/sslwireless' },
      { text: 'BulkSMSDhaka (Bangladesh)', link: '/sms-gateways/drivers/bulksmsdhaka' },
      { text: 'eSMS.vn (Vietnam)', link: '/sms-gateways/drivers/esmsvn' },
    ],
  },
  {
    text: 'Integration',
    items: [
      { text: 'Ecommerce', link: '/sms-gateways/integration/ecommerce' },
      { text: 'Marketplace', link: '/sms-gateways/integration/marketplace' },
      { text: 'Real Estate', link: '/sms-gateways/integration/real-estate' },
      { text: 'Job Board', link: '/sms-gateways/integration/job-board' },
      { text: 'Car Manager', link: '/sms-gateways/integration/car-manager' },
      { text: 'Hotel', link: '/sms-gateways/integration/hotel' },
    ],
  },
  {
    text: 'Admin Guide',
    items: [
      { text: 'OTP Verification', link: '/sms-gateways/usage/otp' },
      { text: 'SMS Templates', link: '/sms-gateways/usage/templates' },
      { text: 'Consent & STOP/START', link: '/sms-gateways/usage/consent' },
      { text: 'Delivery Logs', link: '/sms-gateways/usage/delivery-logs' },
      { text: 'Outbound Webhooks', link: '/sms-gateways/usage/outbound-webhooks' },
      { text: 'Artisan Commands', link: '/sms-gateways/usage/commands' },
      { text: 'Permissions & Roles', link: '/sms-gateways/usage/permissions' },
      { text: 'GDPR & Data Export', link: '/sms-gateways/usage/gdpr' },
    ],
  },
  {
    text: 'Shared Hosting',
    items: [
      { text: 'Overview', link: '/sms-gateways/shared-hosting/overview' },
      { text: 'cPanel Setup', link: '/sms-gateways/shared-hosting/cpanel' },
      { text: 'Plesk Setup', link: '/sms-gateways/shared-hosting/plesk' },
      { text: 'Troubleshooting', link: '/sms-gateways/shared-hosting/troubleshooting' },
    ],
  },
  {
    text: 'Developer',
    items: [
      { text: 'Custom Driver', link: '/sms-gateways/developer/custom-driver' },
      { text: 'Hooks & Events', link: '/sms-gateways/developer/hooks' },
      { text: 'Webhook Consumer', link: '/sms-gateways/developer/webhook-consumer' },
    ],
  },
  {
    text: 'Support',
    items: [
      { text: 'Migration from FOB', link: '/sms-gateways/migration' },
      { text: 'Troubleshooting', link: '/sms-gateways/troubleshooting' },
      { text: 'FAQ', link: '/sms-gateways/faq' },
      { text: 'Changelog', link: '/sms-gateways/changelog' },
    ],
  },
] satisfies DefaultTheme.SidebarItem[]

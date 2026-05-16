// Display-name overrides for products whose slug doesn't title-case cleanly.
// Anything not listed here is derived from the directory name via title-case
// (e.g. `lara-mag` would default to `Lara Mag`; override below if wrong).
export const PRODUCT_LABELS: Record<string, string> = {
  cms: 'Botble',
  hasa: 'HASA',
  'lara-mag': 'LaraMag',
  'bb-form-builder': 'BB Form Builder',
  'pos-pro': 'POS Pro',
  'ecommerce-back-in-stock': 'Back in Stock',
  kyc: 'KYC Verification',
  'sms-gateway': 'SMS Gateway',
  'sms-gateways': 'SMS Gateways',
  snapcart: 'SnapCart',
  'e-wallet': 'E-Wallet',
}

// Products pinned to the top of the nav dropdown (kept in this order),
// before the rest is appended alphabetically.
export const PINNED_PRODUCTS = ['cms']

# Social Login

DeskHive supports social login for the customer portal through the Botble Social Login plugin. Customers can sign in with their existing social accounts instead of creating a password-based account.

## Supported Providers

| Provider | Notes |
|----------|-------|
| Google | Google OAuth 2.0 |
| Facebook | Facebook Login |
| GitHub | GitHub OAuth |
| LinkedIn | LinkedIn OAuth 2.0 |
| X (Twitter) | Twitter OAuth 2.0 |
| Envato | Envato OAuth — ideal for Envato marketplace products |

## Prerequisites

1. The **Social Login** plugin must be installed and activated (`platform/plugins/social-login`)
2. The Support Desk plugin registers the customer guard automatically with the Social Login plugin

## Setup

### Step 1: Enable the Social Login Plugin

1. Navigate to **Admin → Plugins**
2. Activate **Social Login**

### Step 2: Configure Providers

Navigate to **Admin → Settings → Social Login** and enable the providers you want to offer.

For each provider, you need to create an OAuth application on the provider's developer platform and enter the credentials:

#### Google

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Enable the **Google+ API** or **Google Identity**
4. Create OAuth 2.0 credentials
5. Set the authorised redirect URI to:
   ```
   https://your-domain.com/auth/google/callback
   ```
6. Copy the **Client ID** and **Client Secret** into the Social Login settings

#### Facebook

1. Go to [Facebook Developers](https://developers.facebook.com)
2. Create a new app (select **Consumer** type)
3. Add the **Facebook Login** product
4. Set the valid OAuth redirect URI to:
   ```
   https://your-domain.com/auth/facebook/callback
   ```
5. Copy the **App ID** and **App Secret** into the Social Login settings

#### GitHub

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **New OAuth App**
3. Set the **Authorization callback URL** to:
   ```
   https://your-domain.com/auth/github/callback
   ```
4. Copy the **Client ID** and **Client Secret** into the Social Login settings

#### LinkedIn

1. Go to [LinkedIn Developers](https://www.linkedin.com/developers)
2. Create a new app
3. Add the **Sign In with LinkedIn** product
4. Set the authorized redirect URL to:
   ```
   https://your-domain.com/auth/linkedin/callback
   ```
5. Copy the **Client ID** and **Client Secret** into the Social Login settings

#### X (Twitter)

1. Go to [X Developer Portal](https://developer.twitter.com)
2. Create a project and app
3. Enable **OAuth 2.0**
4. Set the callback URL to:
   ```
   https://your-domain.com/auth/twitter/callback
   ```
5. Copy the **Client ID** and **Client Secret** into the Social Login settings

#### Envato

1. Go to [Envato API](https://build.envato.com/create-app/)
2. Create a new application
3. Set the **Confirmation URL** (redirect URI) to:
   ```
   https://your-domain.com/auth/envato/callback
   ```
4. Copy the **App ID** and **App Secret** into the Social Login settings

::: tip
For products sold on the Envato marketplace, Envato social login is highly recommended. Customers can sign in with the same account used to purchase, making it easy to verify ownership and reducing account management friction.
:::

## How It Works

When a customer clicks a social login button:

1. They are redirected to the provider's authorisation page
2. After approving access, they are redirected back to DeskHive
3. If an account with the same email already exists, they are logged in to that account
4. If no account exists, a new customer account is created automatically

Customers who register via social login do not have a password set. They can set a password later from their account settings if they want to enable password-based login.

## Customer Experience

Social login buttons appear on the login (`/login`) and registration (`/register`) pages. Only providers that are enabled and configured in the Social Login settings are shown.

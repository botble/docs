# Setup Social Login

Allow customers to sign in using their social media accounts for a faster registration experience.

## Supported Providers

- Google
- Facebook

## Configuration

1. In admin panel, go to `Plugins` -> `Installed Plugins` and activate **Social Login**
2. Go to `Settings` -> `Social Login`
3. Enable the providers you want and fill in the credentials

### Google Login

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Create OAuth 2.0 credentials
5. Set the authorized redirect URI to `https://your-domain.com/auth/google/callback`
6. Copy the **Client ID** and **Client Secret** to the social login settings

### Facebook Login

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add Facebook Login product
4. Set the valid OAuth redirect URI to `https://your-domain.com/auth/facebook/callback`
5. Copy the **App ID** and **App Secret** to the social login settings

::: tip
Social login significantly reduces registration friction on mobile devices where typing is cumbersome.
:::

# Configuring API Base URL

The API base URL is used to connect your app to the backend server. To configure it:

1. Open `.env` file in the root directory
2. Update the `API_BASE_URL` variable:
   ```bash
   API_BASE_URL=https://your-domain.com
   ```

If the `.env` file doesn't exist:
1. Copy `.env.example` to `.env`
2. Update the `API_BASE_URL` variable

The default API base URL is `https://ecommerce-api.botble.com` if not specified.

## Important Notes
- Make sure to use HTTPS for production environments
- The URL should not end with a trailing slash (/)
- The URL should be accessible from your app's target devices
- For local development, you can use `http://localhost:8000` or your local IP address

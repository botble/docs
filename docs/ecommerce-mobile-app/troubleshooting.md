# Troubleshooting Guide

## Installation Issues

### "npm not found" or "node not found"

**Problem**: Node.js is not installed or not in PATH.

**Solution**:
1. Download Node.js from [nodejs.org](https://nodejs.org)
2. Install the LTS version
3. Restart your terminal
4. Verify: `node --version`

### "expo command not found"

**Problem**: Expo CLI is not installed globally.

**Solution**:
```bash
npm install -g expo-cli
```

### "Cannot find module" errors

**Problem**: Dependencies are not installed or corrupted.

**Solution**:
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### Metro bundler crashes

**Problem**: Cache corruption or port conflict.

**Solution**:
```bash
npm start -- --clear
```

Or use a different port:
```bash
npm start -- --port 8082
```

## Connection Issues

### "Network Error" or "Failed to fetch"

**Problem**: Cannot connect to your API.

**Checklist**:
1. [ ] Is your website online?
2. [ ] Is the API URL correct in `.env`?
3. [ ] Does the URL use HTTPS?
4. [ ] Is there a trailing slash? (Remove it)

**Test**:
```bash
curl https://your-website.com/api/v1/ecommerce/products
```

### "401 Unauthorized"

**Problem**: Authentication failed.

**Solutions**:
- Check if your token is expired
- Verify login credentials
- Clear app storage and login again
- Check API authentication settings on backend

### "CORS Error"

**Problem**: Backend doesn't allow requests from the app.

**Solution**: Contact your backend developer to:
1. Add appropriate CORS headers
2. Allow requests from mobile apps
3. Whitelist the Expo development server

### "SSL Certificate Error"

**Problem**: Invalid or self-signed SSL certificate.

**Solutions**:
- Use a valid SSL certificate (Let's Encrypt is free)
- Don't use self-signed certificates in production
- For local development, use HTTP (not recommended for production)

## Build Issues

### iOS build fails

**Common causes**:
1. Invalid bundle identifier
2. Missing Apple credentials
3. Provisioning profile issues

**Solutions**:
```bash
# Reset credentials
eas credentials --platform ios

# Clean and rebuild
eas build --platform ios --clear-cache
```

### Android build fails

**Common causes**:
1. Invalid package name
2. Keystore issues
3. SDK version conflicts

**Solutions**:
```bash
# Reset credentials
eas credentials --platform android

# Clean and rebuild
eas build --platform android --clear-cache
```

### "Invariant Violation" errors

**Problem**: Code error or incompatible library.

**Solutions**:
1. Check the full error message
2. Clear Metro cache: `npm start -- --clear`
3. Delete node_modules and reinstall
4. Check for library version conflicts

## Runtime Issues

### App crashes on launch

**Debugging steps**:
1. Run in development mode: `npm start`
2. Check terminal for error messages
3. Use React Native Debugger
4. Check Expo logs on expo.dev

### Products not loading

**Checklist**:
1. [ ] Is the API responding?
2. [ ] Are products published on website?
3. [ ] Is there a category filter applied?
4. [ ] Check network tab in debugger

**Solution**:
```typescript
// Add console logging to debug
console.log('API URL:', API_URL);
console.log('Response:', response);
```

### Images not displaying

**Common causes**:
1. Wrong image URL format
2. HTTP vs HTTPS mismatch
3. CORS blocking images
4. Large image files timing out

**Solutions**:
- Ensure images use HTTPS
- Optimize image sizes on backend
- Check image URLs are accessible

### Cart not updating

**Problem**: Cart state not syncing.

**Solutions**:
1. Clear app cache
2. Logout and login again
3. Check network requests in debugger
4. Verify cart API endpoints

### Login not working

**Checklist**:
1. [ ] Can you login on the website?
2. [ ] Is email/password correct?
3. [ ] Is API responding?
4. [ ] Check network requests

**Debug**:
```typescript
try {
  const response = await login(email, password);
  console.log('Login response:', response);
} catch (error) {
  console.error('Login error:', error);
}
```

## Performance Issues

### App is slow

**Solutions**:
1. Run in production mode:
   ```bash
   npx expo start --no-dev
   ```

2. Optimize images on backend

3. Enable Hermes (default in SDK 54+)

4. Reduce API payload sizes

### High memory usage

**Solutions**:
1. Use FlatList for long lists
2. Optimize image sizes
3. Clear cached data periodically
4. Use pagination

### Slow initial load

**Solutions**:
1. Optimize splash screen
2. Lazy load screens
3. Reduce initial API calls
4. Use cached data

## Platform-Specific Issues

### iOS Simulator not opening

**Solutions**:
```bash
# Install Xcode command line tools
xcode-select --install

# Reset simulator
xcrun simctl shutdown all
npm run ios
```

### Android Emulator not starting

**Solutions**:
1. Open Android Studio
2. Go to Device Manager
3. Start emulator manually
4. Then run `npm run android`

### Physical device not connecting

**Solutions**:
1. Make sure Expo Go is installed
2. Use tunnel mode: `npm start -- --tunnel`
3. Check both devices are on same network
4. Restart Expo Go app

## Environment Issues

### .env changes not applying

**Problem**: Environment variables are cached.

**Solution**:
1. Stop the development server (Ctrl+C)
2. Restart with `npm start -- --clear`

Hot reload does NOT apply .env changes!

### Wrong API URL in production

**Problem**: Development URL in production build.

**Solution**:
Use EAS secrets or environment-specific builds:
```bash
eas secret:create --name API_BASE_URL --value "https://production-url.com"
eas secret:create --name API_KEY --value "your-api-key"
```

## Getting Help

### Before contacting support:

1. Check this troubleshooting guide
2. Check the [FAQ](faq.md)
3. Search error message online
4. Try the solutions above

### When contacting support:

Include:
- Error message (full text)
- Steps to reproduce
- Platform (iOS/Android)
- Expo SDK version
- Node.js version
- Screenshots if applicable

### Support channels:

- **Email**: contact@botble.com
- **Support Center**: https://botble.ticksy.com
- **Documentation**: https://docs.botble.com/ecommerce-mobile-app

# API Integration Guide

Simple guide to connect your app with your website's API. No technical expertise required!

## What is API Integration?

Think of API as a bridge between your mobile app and your website. When someone logs in on the app, it talks to your website to check if the login is correct.

## 🔧 Quick Setup

### Step 1: Set Your Website URL

1. Open the `.env` file in your app folder
2. Change this line to your website address:

```bash
API_BASE_URL=https://your-website.com
```

**Example:**
```bash
API_BASE_URL=https://mystore.com
```

### Step 2: Test the Connection

1. Run your app
2. Try to login
3. If it works, you're connected! 🎉

**If it doesn't work:**
- Make sure your website URL is correct
- Check if your website is online
- Contact your website developer

## 📱 What Your App Can Do

Your app connects to your website to:

### 👤 User Features
- **Login/Register**: Users can create accounts and sign in
- **Social Login**: Login with Google, Facebook, Apple
- **Profile**: Users can update their information
- **Addresses**: Save shipping addresses

### 🛍️ Shopping Features
- **Browse Products**: See all your products
- **Search**: Find specific products
- **Categories**: Browse by product categories
- **Shopping Cart**: Add/remove items
- **Wishlist**: Save favorite products
- **Compare**: Compare different products

### 📦 Order Features
- **Place Orders**: Complete purchases
- **Order History**: See past orders
- **Track Orders**: Check delivery status
- **Reviews**: Rate and review products

## 🔍 How to Check if Everything Works

### Test User Login
1. Open your app
2. Try to register a new account
3. Try to login with the account
4. ✅ **Success**: You see the home screen
5. ❌ **Problem**: You see an error message

### Test Product Loading
1. Go to the products page
2. ✅ **Success**: You see your products from the website
3. ❌ **Problem**: No products show or error message

### Test Shopping Cart
1. Add a product to cart
2. Go to cart page
3. ✅ **Success**: Product appears in cart
4. ❌ **Problem**: Cart is empty or error

## 🚨 Common Problems & Solutions

### Problem: "Connection Failed" or "Network Error"

**Possible Causes:**
- Wrong website URL in `.env` file
- Website is down
- Internet connection issues

**Solutions:**
1. Check your website URL is correct
2. Test your website in a browser
3. Check your internet connection
4. Contact your website developer

### Problem: "Login Failed"

**Possible Causes:**
- API not configured on website
- Wrong login credentials
- Account doesn't exist

**Solutions:**
1. Make sure you can login on your website
2. Check if API is enabled on your website
3. Try creating a new account first

### Problem: "No Products Showing"

**Possible Causes:**
- No products in your website database
- API not returning product data
- Category/filter issues

**Solutions:**
1. Check if products exist on your website
2. Try refreshing the app
3. Check if categories are set up correctly

### Problem: "Cart Not Working"

**Possible Causes:**
- User not logged in
- API session expired
- Cart API not configured

**Solutions:**
1. Make sure user is logged in
2. Try logging out and back in
3. Contact your developer to check cart API

## 🔧 For Developers: Quick API Setup

If you're a developer helping with the setup:

### Required API Endpoints

Your website needs these API endpoints working:

**Authentication:**
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/social/google` - Google login
- `POST /api/auth/social/facebook` - Facebook login

**Products:**
- `GET /api/products` - Get product list
- `GET /api/products/{id}` - Get product details
- `GET /api/categories` - Get categories

**Shopping:**
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add to cart
- `POST /api/orders` - Create order

### Quick Test

Test if APIs work by visiting:
```
https://your-website.com/api/products
```

You should see product data in JSON format.

## 💡 Tips for Success

### Before You Start
1. **Make sure your website works** - Test login, products, and orders on your website first
2. **Have your website URL ready** - You'll need the exact address
3. **Contact your developer** - If you're not technical, ask for help

### During Setup
1. **Test one thing at a time** - Don't change multiple settings at once
2. **Keep backups** - Save your original files before making changes
3. **Document changes** - Write down what you changed

### After Setup
1. **Test everything** - Try all features in the app
2. **Test on different devices** - Android and iPhone if possible
3. **Ask users to test** - Get feedback from real users

## 📞 Getting Help

### When to Contact Support
- App won't connect to your website
- Login doesn't work
- Products don't show up
- Orders aren't working
- Any error messages you don't understand

### What Information to Provide
1. **Your website URL**
2. **What you were trying to do**
3. **What error message you saw**
4. **Screenshots if possible**
5. **Device type** (Android/iPhone)

### Quick Self-Help Checklist
- ✅ Is your website online and working?
- ✅ Is the URL in `.env` file correct?
- ✅ Can you login on your website?
- ✅ Do you have products on your website?
- ✅ Is your internet connection working?

## 📚 Additional Resources

### Helpful Links
- **API Documentation**: [https://ecommerce-api.botble.com/docs](https://ecommerce-api.botble.com/docs)
- **Quick Setup Guides**: Check guides 01-15 in this documentation
- **Social Login Setup**: Check guides 12-15 for social authentication

### Related Documentation
- **[Configuration Guide](configuration.md)** - Basic app setup
- **[Development Guide](development.md)** - Customizing your app
- **[Troubleshooting](troubleshooting.md)** - Common problems and solutions

Remember: API integration connects your mobile app to your website. If you're not technical, don't hesitate to ask your developer for help!

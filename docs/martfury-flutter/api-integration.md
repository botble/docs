# API Integration Guide

This guide provides detailed information about integrating the Martfury Flutter app with the Botble E-commerce API.

## Overview

The Martfury Flutter app communicates with the Botble E-commerce backend through RESTful API endpoints. The app handles authentication, data synchronization, and all e-commerce operations through secure API calls.

## API Configuration

### Base URL Configuration

Configure your API base URL in the `.env` file:

```env
API_BASE_URL=https://your-botble-ecommerce-api.com
```

### API Service Setup

The main API service is configured in `lib/src/service/api_service.dart`:

```dart
class ApiService {
  static const String baseUrl = AppConfig.baseUrl;
  static const int timeout = 30000;
  
  static Dio createDio() {
    final dio = Dio();
    dio.options.baseUrl = baseUrl;
    dio.options.connectTimeout = timeout;
    dio.options.receiveTimeout = timeout;
    return dio;
  }
}
```

## Authentication API

### Login Endpoint

**POST** `/api/auth/login`

Request body:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "token": "bearer_token_here",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "user@example.com"
    }
  }
}
```

### Register Endpoint

**POST** `/api/auth/register`

Request body:
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}
```

### Social Login Endpoints

**POST** `/api/auth/social/google`

Request body:
```json
{
  "access_token": "google_access_token",
  "id_token": "google_id_token"
}
```

**POST** `/api/auth/social/facebook`

Request body:
```json
{
  "access_token": "facebook_access_token"
}
```

**POST** `/api/auth/social/apple`

Request body:
```json
{
  "identity_token": "apple_identity_token",
  "authorization_code": "apple_authorization_code",
  "user": {
    "name": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "user@example.com"
  }
}
```

Social login response (same format as regular login):
```json
{
  "success": true,
  "data": {
    "token": "bearer_token_here",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "user@example.com",
      "provider": "google",
      "provider_id": "google_user_id"
    }
  }
}
```

### Logout Endpoint

**POST** `/api/auth/logout`

Headers:
```
Authorization: Bearer {token}
```

## Product API

### Get Products

**GET** `/api/products`

Query parameters:
- `page`: Page number (default: 1)
- `per_page`: Items per page (default: 20)
- `category_id`: Filter by category
- `search`: Search query
- `sort`: Sort order (price_asc, price_desc, name_asc, name_desc)

Response:
```json
{
  "data": [
    {
      "id": 1,
      "name": "Product Name",
      "price": 99.99,
      "sale_price": 79.99,
      "images": ["image1.jpg", "image2.jpg"],
      "description": "Product description",
      "category": {
        "id": 1,
        "name": "Category Name"
      }
    }
  ],
  "meta": {
    "current_page": 1,
    "total": 100,
    "per_page": 20
  }
}
```

### Get Product Details

**GET** `/api/products/{id}`

Response includes detailed product information, variations, and reviews.

### Get Categories

**GET** `/api/categories`

Returns hierarchical category structure.

## Shopping Cart API

### Get Cart

**GET** `/api/cart`

Headers:
```
Authorization: Bearer {token}
```

### Add to Cart

**POST** `/api/cart/add`

Request body:
```json
{
  "product_id": 1,
  "quantity": 2,
  "options": {
    "color": "red",
    "size": "large"
  }
}
```

### Update Cart Item

**PUT** `/api/cart/update/{item_id}`

Request body:
```json
{
  "quantity": 3
}
```

### Remove from Cart

**DELETE** `/api/cart/remove/{item_id}`

## Order API

### Create Order

**POST** `/api/orders`

Request body:
```json
{
  "shipping_address": {
    "name": "John Doe",
    "email": "user@example.com",
    "phone": "+1234567890",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zip": "10001",
    "country": "US"
  },
  "payment_method": "stripe",
  "coupon_code": "DISCOUNT10"
}
```

### Get Orders

**GET** `/api/orders`

Returns user's order history.

### Get Order Details

**GET** `/api/orders/{id}`

Returns detailed order information.

### Track Order

**GET** `/api/orders/track`

Query parameters:
- `order_code`: Order tracking code
- `email`: Customer email

## User Profile API

### Get Profile

**GET** `/api/user/profile`

### Update Profile

**PUT** `/api/user/profile`

Request body:
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "phone": "+1234567890",
  "date_of_birth": "1990-01-01"
}
```

### Get Addresses

**GET** `/api/user/addresses`

### Add Address

**POST** `/api/user/addresses`

Request body:
```json
{
  "name": "Home",
  "address": "123 Main St",
  "city": "New York",
  "state": "NY",
  "zip": "10001",
  "country": "US",
  "is_default": true
}
```

## Wishlist API

### Get Wishlist

**GET** `/api/wishlist`

### Add to Wishlist

**POST** `/api/wishlist/add`

Request body:
```json
{
  "product_id": 1
}
```

### Remove from Wishlist

**DELETE** `/api/wishlist/remove/{product_id}`

## Product Comparison API

### Get Comparison List

**GET** `/api/compare`

Returns user's current comparison list.

Response:
```json
{
  "data": [
    {
      "id": 1,
      "name": "Product Name",
      "price": 99.99,
      "sale_price": 79.99,
      "images": ["image1.jpg"],
      "rating": 4.5,
      "attributes": {
        "color": "red",
        "size": "large"
      }
    }
  ],
  "count": 2,
  "max_items": 4
}
```

### Add to Comparison

**POST** `/api/compare/add`

Request body:
```json
{
  "product_id": 1,
  "attributes": {
    "color": "red",
    "size": "large"
  }
}
```

Response:
```json
{
  "success": true,
  "message": "Product added to comparison",
  "count": 2
}
```

### Remove from Comparison

**DELETE** `/api/compare/remove/{product_id}`

### Clear Comparison

**DELETE** `/api/compare/clear`

Removes all products from comparison list.

### Get Detailed Comparison

**GET** `/api/compare/details`

Returns detailed comparison data with specifications.

Response:
```json
{
  "products": [
    {
      "id": 1,
      "name": "Product 1",
      "price": 99.99,
      "specifications": {
        "brand": "Brand A",
        "weight": "1.5kg",
        "dimensions": "30x20x10cm"
      },
      "features": ["Feature 1", "Feature 2"],
      "rating": 4.5,
      "review_count": 150
    }
  ],
  "comparison_attributes": [
    "price",
    "brand",
    "weight",
    "dimensions",
    "rating"
  ]
}
```

## Error Handling

### Standard Error Response

```json
{
  "success": false,
  "message": "Error message",
  "errors": {
    "field_name": ["Validation error message"]
  }
}
```

### HTTP Status Codes

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `422`: Validation Error
- `500`: Internal Server Error

## Implementation Examples

### API Service Implementation

```dart
class ProductService {
  static final Dio _dio = ApiService.createDio();
  
  static Future<List<Product>> getProducts({
    int page = 1,
    int perPage = 20,
    String? search,
    int? categoryId,
  }) async {
    try {
      final response = await _dio.get('/api/products', queryParameters: {
        'page': page,
        'per_page': perPage,
        if (search != null) 'search': search,
        if (categoryId != null) 'category_id': categoryId,
      });
      
      if (response.statusCode == 200) {
        final List<dynamic> data = response.data['data'];
        return data.map((json) => Product.fromJson(json)).toList();
      }
      throw Exception('Failed to load products');
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }
}
```

### Authentication Service

```dart
class AuthService {
  static String? _token;

  static Future<bool> login(String email, String password) async {
    try {
      final response = await _dio.post('/api/auth/login', data: {
        'email': email,
        'password': password,
      });

      if (response.statusCode == 200) {
        _token = response.data['data']['token'];
        _dio.options.headers['Authorization'] = 'Bearer $_token';
        return true;
      }
      return false;
    } catch (e) {
      throw Exception('Login failed: $e');
    }
  }

  static Future<bool> socialLogin(String provider, Map<String, dynamic> data) async {
    try {
      final response = await _dio.post('/api/auth/social/$provider', data: data);

      if (response.statusCode == 200) {
        _token = response.data['data']['token'];
        _dio.options.headers['Authorization'] = 'Bearer $_token';
        return true;
      }
      return false;
    } catch (e) {
      throw Exception('Social login failed: $e');
    }
  }

  static Future<bool> googleLogin() async {
    try {
      final GoogleSignInAccount? googleUser = await GoogleSignIn().signIn();
      if (googleUser == null) return false;

      final GoogleSignInAuthentication googleAuth =
          await googleUser.authentication;

      return await socialLogin('google', {
        'access_token': googleAuth.accessToken,
        'id_token': googleAuth.idToken,
      });
    } catch (e) {
      throw Exception('Google login failed: $e');
    }
  }

  static Future<bool> facebookLogin() async {
    try {
      final LoginResult result = await FacebookAuth.instance.login();
      if (result.status != LoginStatus.success) return false;

      return await socialLogin('facebook', {
        'access_token': result.accessToken!.token,
      });
    } catch (e) {
      throw Exception('Facebook login failed: $e');
    }
  }

  static Future<bool> appleLogin() async {
    try {
      final appleCredential = await SignInWithApple.getAppleIDCredential(
        scopes: [
          AppleIDAuthorizationScopes.email,
          AppleIDAuthorizationScopes.fullName,
        ],
      );

      return await socialLogin('apple', {
        'identity_token': appleCredential.identityToken,
        'authorization_code': appleCredential.authorizationCode,
        'user': {
          'name': {
            'firstName': appleCredential.givenName,
            'lastName': appleCredential.familyName,
          },
          'email': appleCredential.email,
        },
      });
    } catch (e) {
      throw Exception('Apple login failed: $e');
    }
  }
}
```

## Security Considerations

### Token Management

- Store tokens securely using Flutter Secure Storage
- Implement token refresh mechanism
- Handle token expiration gracefully

### HTTPS

- Always use HTTPS for API communication
- Implement certificate pinning for production

### Data Validation

- Validate all API responses
- Sanitize user input before sending to API
- Handle malformed responses gracefully

## Testing API Integration

### Unit Testing

```dart
void main() {
  group('ProductService', () {
    test('should fetch products successfully', () async {
      final products = await ProductService.getProducts();
      expect(products, isA<List<Product>>());
    });
  });
}
```

### Integration Testing

Test complete API workflows including authentication, data fetching, and error handling.

For more detailed API documentation, visit: [https://ecommerce-api.botble.com/docs](https://ecommerce-api.botble.com/docs)

# Authentication Features

This document provides detailed information about the authentication features in the Martfury Flutter app, including traditional email/password login and social login options.

## Overview

The Martfury app provides multiple authentication methods to ensure users can easily access their accounts:

- **Email/Password Authentication**: Traditional registration and login
- **Social Login**: Google, Facebook, and Apple Sign-In
- **Password Recovery**: Email-based password reset
- **Account Linking**: Link multiple authentication methods to one account

## Email/Password Authentication

### User Registration

The app provides a comprehensive registration process:

1. **Required Information**:
   - Full name
   - Email address
   - Phone number (optional)
   - Password (minimum 8 characters)
   - Password confirmation

2. **Validation**:
   - Email format validation
   - Password strength requirements
   - Duplicate email checking
   - Real-time form validation

3. **Email Verification**:
   - Verification email sent upon registration
   - Account activation required before login
   - Resend verification option available

### User Login

Standard login process with enhanced security:

1. **Login Methods**:
   - Email and password
   - Remember me option for convenience
   - Automatic token refresh

2. **Security Features**:
   - Secure token storage
   - Session management
   - Automatic logout on token expiration

### Password Recovery

Secure password reset functionality:

1. **Reset Process**:
   - Enter registered email address
   - Receive password reset link via email
   - Create new password
   - Automatic login after reset

2. **Security Measures**:
   - Time-limited reset tokens
   - Single-use reset links
   - Email verification required

## Social Login Integration

### Google Sign-In

Seamless integration with Google accounts:

**Features**:
- One-tap sign-in with Google account
- Automatic profile information import
- Secure OAuth 2.0 authentication
- Cross-platform compatibility

**User Experience**:
1. Tap "Continue with Google" button
2. Select Google account (if multiple accounts)
3. Grant necessary permissions
4. Automatic account creation or login

**Technical Implementation**:
```dart
class GoogleAuthService {
  static Future<User?> signInWithGoogle() async {
    try {
      final GoogleSignInAccount? googleUser = await GoogleSignIn().signIn();
      if (googleUser == null) return null;
      
      final GoogleSignInAuthentication googleAuth = 
          await googleUser.authentication;
      
      // Send tokens to backend for verification
      final response = await ApiService.socialLogin('google', {
        'access_token': googleAuth.accessToken,
        'id_token': googleAuth.idToken,
      });
      
      return User.fromJson(response.data['user']);
    } catch (e) {
      throw AuthException('Google Sign-In failed: $e');
    }
  }
}
```

### Facebook Login

Integration with Facebook authentication:

**Features**:
- Login with Facebook account
- Access to basic profile information
- Secure Facebook SDK integration
- Privacy-focused permissions

**User Experience**:
1. Tap "Continue with Facebook" button
2. Authorize app permissions
3. Complete authentication
4. Account creation or login

**Permissions Requested**:
- Basic profile information (name, email)
- Public profile access
- Email address (if available)

### Apple Sign-In

Native Apple authentication for iOS users:

**Features**:
- Native iOS integration
- Privacy-focused authentication
- Hide email option available
- Face ID/Touch ID support

**User Experience**:
1. Tap "Sign in with Apple" button
2. Use biometric authentication or passcode
3. Choose email sharing preference
4. Complete authentication

**Privacy Features**:
- Option to hide real email address
- Apple-generated relay email addresses
- Minimal data sharing
- User control over shared information

## Account Management

### Profile Information

Users can manage their profile information:

1. **Editable Fields**:
   - Full name
   - Email address (with verification)
   - Phone number
   - Profile picture
   - Date of birth

2. **Social Account Linking**:
   - Link multiple social accounts
   - View connected accounts
   - Unlink accounts if needed
   - Primary account designation

### Security Settings

Enhanced security options:

1. **Password Management**:
   - Change password
   - Password strength indicator
   - Password history (prevent reuse)

2. **Account Security**:
   - Login activity monitoring
   - Device management
   - Suspicious activity alerts

3. **Privacy Controls**:
   - Data sharing preferences
   - Marketing communication settings
   - Account deletion options

## Authentication Flow

### First-Time Users

1. **Registration Options**:
   - Email/password registration
   - Social login registration
   - Guest checkout (limited features)

2. **Account Setup**:
   - Profile completion
   - Email verification
   - Welcome onboarding

### Returning Users

1. **Login Options**:
   - Saved credentials
   - Social login
   - Biometric authentication (if enabled)

2. **Session Management**:
   - Automatic login for remembered users
   - Session timeout handling
   - Multi-device support

## Security Features

### Data Protection

1. **Encryption**:
   - Secure token storage
   - Encrypted sensitive data
   - HTTPS communication

2. **Authentication Tokens**:
   - JWT token implementation
   - Automatic token refresh
   - Secure token transmission

### Privacy Compliance

1. **Data Handling**:
   - GDPR compliance
   - Minimal data collection
   - User consent management

2. **Social Login Privacy**:
   - Limited permission requests
   - Transparent data usage
   - User control over shared data

## Error Handling

### Common Authentication Errors

1. **Login Failures**:
   - Invalid credentials
   - Account not verified
   - Account locked/suspended

2. **Social Login Errors**:
   - Permission denied
   - Network connectivity issues
   - Provider service unavailable

3. **Registration Errors**:
   - Email already exists
   - Invalid email format
   - Password requirements not met

### User-Friendly Error Messages

- Clear, actionable error descriptions
- Helpful suggestions for resolution
- Contact support options for complex issues

## Best Practices

### For Users

1. **Account Security**:
   - Use strong, unique passwords
   - Enable two-factor authentication when available
   - Regularly review account activity

2. **Social Login**:
   - Review permissions before granting access
   - Keep social accounts secure
   - Understand data sharing implications

### For Developers

1. **Implementation**:
   - Follow platform-specific guidelines
   - Implement proper error handling
   - Test across different devices and OS versions

2. **Security**:
   - Validate all authentication tokens
   - Implement rate limiting
   - Monitor for suspicious activity

## Testing Authentication

### Manual Testing

1. **Registration Flow**:
   - Test with valid and invalid data
   - Verify email verification process
   - Check error handling

2. **Login Flow**:
   - Test all authentication methods
   - Verify session management
   - Check logout functionality

3. **Social Login**:
   - Test each social provider
   - Verify account linking
   - Check permission handling

### Automated Testing

```dart
void main() {
  group('Authentication Tests', () {
    test('should login with valid credentials', () async {
      final result = await AuthService.login('test@example.com', 'password');
      expect(result.success, true);
      expect(result.user, isNotNull);
    });
    
    test('should handle Google Sign-In', () async {
      final result = await GoogleAuthService.signInWithGoogle();
      expect(result, isNotNull);
    });
  });
}
```

For more information about implementing authentication features, see the [Development Guide](../development.md) and [API Integration Guide](../api-integration.md).

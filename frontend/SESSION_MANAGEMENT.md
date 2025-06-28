# Session Management for Forgotten Sessions

This document outlines the comprehensive session management system implemented to handle cases where users forget to sign out from the web application.

## Features Implemented

### 1. Automatic Session Monitoring
- **Inactivity Detection**: Monitors user activity and automatically logs out users after 30 minutes of inactivity
- **Activity Tracking**: Tracks user interactions (mouse, keyboard, scroll, touch) to determine if user is active
- **Periodic Checks**: Runs checks every 5 minutes to monitor session status

### 2. Token Management
- **Access Token**: Short-lived (15 minutes) for API requests
- **Refresh Token**: Long-lived (7 days) for automatic token renewal
- **Automatic Refresh**: Seamlessly refreshes access tokens when they expire
- **Token Validation**: Validates token expiration before making requests

### 3. Session Warning System
- **Pre-logout Warning**: Shows a modal 5 minutes before automatic logout
- **User Choice**: Users can choose to extend their session or logout immediately
- **Countdown Timer**: Displays remaining time before session expires

### 4. Graceful Error Handling
- **Network Errors**: Handles network connectivity issues
- **Invalid Tokens**: Manages expired or invalid refresh tokens
- **Unauthorized Access**: Handles permission-related errors
- **User Feedback**: Provides clear messages about why logout occurred

## Configuration

### Timeout Settings
```javascript
// In AuthContext.jsx
const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes
const SESSION_CHECK_INTERVAL = 5 * 60 * 1000; // Check every 5 minutes

// In SessionWarning.jsx
const WARNING_TIME = 5 * 60 * 1000; // Show warning 5 minutes before logout
```

### Token Expiration
```javascript
// In authController.js
const generateAccessToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, {
        expiresIn: "15m", // 15 minutes
    });
};

const generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_REFRESH_SECRET_KEY, {
        expiresIn: "7d", // 7 days
    });
};
```

## User Experience Flow

### Normal Session Flow
1. User logs in → Session starts with activity tracking
2. User interacts with app → Activity timestamp updates
3. Access token expires → Automatically refreshed using refresh token
4. User continues using app seamlessly

### Inactivity Flow
1. User becomes inactive → No activity for 25 minutes
2. Warning appears → 5-minute countdown starts
3. User can choose:
   - **Stay Logged In**: Extends session, resets activity timer
   - **Logout Now**: Immediately logs out
4. If no action taken → Automatic logout after 30 minutes

### Error Scenarios
1. **Network Error**: User redirected to login with network error message
2. **Invalid Refresh Token**: User redirected to login with session expired message
3. **Unauthorized Access**: User redirected to login with unauthorized message

## Components

### AuthContext.jsx
- Manages authentication state
- Handles session monitoring
- Provides automatic token refresh
- Tracks user activity

### SessionWarning.jsx
- Displays inactivity warning modal
- Shows countdown timer
- Provides user action buttons

### axiosIntance.js
- Intercepts API requests
- Handles token refresh automatically
- Manages authentication errors

### sessionUtils.js
- Utility functions for session management
- Token validation helpers
- Time formatting utilities

## Security Considerations

### Token Security
- Access tokens are short-lived (15 minutes)
- Refresh tokens are stored securely in localStorage
- Tokens are validated on every request
- Invalid tokens are immediately cleared

### Session Security
- Automatic logout prevents unauthorized access
- Activity monitoring ensures real user presence
- Clear session data on logout
- Secure token refresh mechanism

### Error Handling
- Graceful degradation on network issues
- Clear user feedback for all error scenarios
- Secure redirect handling
- No sensitive data exposure in error messages

## Best Practices

### For Users
- Log out explicitly when done using the application
- Be aware of the 30-minute inactivity timeout
- Respond to session warnings to avoid data loss
- Use secure networks when accessing the application

### For Developers
- Monitor session-related errors in logs
- Test session timeout scenarios
- Ensure proper cleanup on logout
- Validate token refresh functionality

## Troubleshooting

### Common Issues
1. **Session expires too quickly**: Check inactivity timeout settings
2. **Warning doesn't appear**: Verify SessionWarning component is mounted
3. **Token refresh fails**: Check network connectivity and server status
4. **User stuck in login loop**: Clear localStorage and check token validation

### Debug Information
- Check browser console for session-related logs
- Monitor network requests for token refresh calls
- Verify localStorage contains valid session data
- Test with different network conditions

## Future Enhancements

### Potential Improvements
1. **Remember Me**: Option to extend session duration
2. **Session Analytics**: Track session patterns for optimization
3. **Multi-tab Support**: Synchronize sessions across browser tabs
4. **Progressive Web App**: Handle offline scenarios
5. **Biometric Authentication**: Use device biometrics for session extension 
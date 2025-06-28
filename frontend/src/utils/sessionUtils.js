// Session management utilities

/**
 * Check if a JWT token is expired
 * @param {string} token - JWT token to check
 * @returns {boolean} - True if token is expired, false otherwise
 */
export const isTokenExpired = (token) => {
  if (!token) return true;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch (error) {
    console.error('Error parsing token:', error);
    return true;
  }
};

/**
 * Get time until token expires in seconds
 * @param {string} token - JWT token to check
 * @returns {number} - Seconds until expiration, negative if expired
 */
export const getTimeUntilExpiration = (token) => {
  if (!token) return -1;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return Math.floor(payload.exp - currentTime);
  } catch (error) {
    console.error('Error parsing token:', error);
    return -1;
  }
};

/**
 * Check if user has been inactive for too long
 * @param {number} lastActivity - Timestamp of last activity
 * @param {number} timeout - Inactivity timeout in milliseconds
 * @returns {boolean} - True if user is inactive, false otherwise
 */
export const isUserInactive = (lastActivity, timeout = 30 * 60 * 1000) => {
  if (!lastActivity) return true;
  
  const timeSinceLastActivity = Date.now() - lastActivity;
  return timeSinceLastActivity > timeout;
};

/**
 * Get time until session expires due to inactivity
 * @param {number} lastActivity - Timestamp of last activity
 * @param {number} timeout - Inactivity timeout in milliseconds
 * @returns {number} - Milliseconds until session expires
 */
export const getTimeUntilSessionExpires = (lastActivity, timeout = 30 * 60 * 1000) => {
  if (!lastActivity) return 0;
  
  const timeSinceLastActivity = Date.now() - lastActivity;
  return Math.max(0, timeout - timeSinceLastActivity);
};

/**
 * Clear all session data from localStorage
 */
export const clearSession = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('lastActivity');
};

/**
 * Save session data to localStorage
 * @param {Object} sessionData - Session data to save
 */
export const saveSession = (sessionData) => {
  const { user, token, role, refreshToken, lastActivity } = sessionData;
  
  if (user) localStorage.setItem('user', JSON.stringify(user));
  if (token) localStorage.setItem('token', token);
  if (role) localStorage.setItem('role', role);
  if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
  if (lastActivity) localStorage.setItem('lastActivity', lastActivity);
};

/**
 * Get session data from localStorage
 * @returns {Object} - Session data
 */
export const getSession = () => {
  return {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    token: localStorage.getItem('token'),
    role: localStorage.getItem('role'),
    refreshToken: localStorage.getItem('refreshToken'),
    lastActivity: localStorage.getItem('lastActivity'),
  };
};

/**
 * Format time remaining in a human-readable format
 * @param {number} milliseconds - Time in milliseconds
 * @returns {string} - Formatted time string
 */
export const formatTimeRemaining = (milliseconds) => {
  if (milliseconds <= 0) return '0 seconds';
  
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
}; 
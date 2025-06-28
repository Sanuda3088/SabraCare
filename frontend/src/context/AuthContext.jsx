import { createContext, useContext, useEffect, useReducer } from "react";
import { BASE_URL } from "../config";

const initialState = {
  user:
    localStorage.getItem("user") !== undefined
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  role: localStorage.getItem("role") || null,
  token: localStorage.getItem("token") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  lastActivity: localStorage.getItem("lastActivity") || null,
};

export const authContext = createContext(initialState);

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        role: null,
        token: null,
        refreshToken: null,
        lastActivity: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload.user,
        role: action.payload.role,
        token: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        lastActivity: Date.now(),
      };
    case "LOGOUT":
      return {
        user: null,
        role: null,
        token: null,
        refreshToken: null,
        lastActivity: null,
      };
    case "UPDATE_ACTIVITY":
      return {
        ...state,
        lastActivity: Date.now(),
      };
    case "UPDATE_TOKEN":
      return {
        ...state,
        token: action.payload.token,
        lastActivity: Date.now(),
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
    localStorage.setItem("token", state.token);
    localStorage.setItem("role", state.role);
    localStorage.setItem("refreshToken", state.refreshToken);
    localStorage.setItem("lastActivity", state.lastActivity);
  }, [state]);

  // Session monitoring and inactivity detection
  useEffect(() => {
    if (!state.token) return;

    const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes
    const SESSION_CHECK_INTERVAL = 5 * 60 * 1000; // Check every 5 minutes

    // Update activity on user interaction
    const updateActivity = () => {
      dispatch({ type: "UPDATE_ACTIVITY" });
    };

    // Check for inactivity
    const checkInactivity = () => {
      if (!state.lastActivity) return;
      
      const timeSinceLastActivity = Date.now() - state.lastActivity;
      
      if (timeSinceLastActivity > INACTIVITY_TIMEOUT) {
        // Auto logout due to inactivity
        dispatch({ type: "LOGOUT" });
        localStorage.clear();
        window.location.href = "/login?reason=inactivity";
      }
    };

    // Check token expiration
    const checkTokenExpiration = () => {
      if (!state.token) return;
      
      try {
        const tokenPayload = JSON.parse(atob(state.token.split('.')[1]));
        const currentTime = Date.now() / 1000;
        
        if (tokenPayload.exp < currentTime) {
          // Token is expired, try to refresh
          handleTokenRefresh();
        }
      } catch (error) {
        console.error("Error checking token expiration:", error);
      }
    };

    // Handle token refresh
    const handleTokenRefresh = async () => {
      if (!state.refreshToken) {
        dispatch({ type: "LOGOUT" });
        localStorage.clear();
        window.location.href = "/login?reason=token_expired";
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/auth/refresh-token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken: state.refreshToken }),
        });

        if (response.ok) {
          const data = await response.json();
          dispatch({ 
            type: "UPDATE_TOKEN", 
            payload: { token: data.accessToken } 
          });
        } else {
          // Refresh token is invalid, logout user
          dispatch({ type: "LOGOUT" });
          localStorage.clear();
          window.location.href = "/login?reason=session_expired";
        }
      } catch (error) {
        console.error("Token refresh failed:", error);
        dispatch({ type: "LOGOUT" });
        localStorage.clear();
        window.location.href = "/login?reason=network_error";
      }
    };

    // Set up event listeners for user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, updateActivity, true);
    });

    // Set up periodic checks
    const inactivityInterval = setInterval(checkInactivity, SESSION_CHECK_INTERVAL);
    const tokenCheckInterval = setInterval(checkTokenExpiration, 60000); // Check every minute

    // Cleanup function
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, updateActivity, true);
      });
      clearInterval(inactivityInterval);
      clearInterval(tokenCheckInterval);
    };
  }, [state.token, state.refreshToken, state.lastActivity]);

  return (
    <authContext.Provider
      value={{
        user: state.user,
        role: state.role,
        token: state.token,
        refreshToken: state.refreshToken,
        lastActivity: state.lastActivity,
        dispatch,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

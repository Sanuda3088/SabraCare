import axios from "axios";
import { BASE_URL } from "../src/config";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        
        if (!refreshToken) {
          // No refresh token available, logout user
          localStorage.clear();
          window.location.href = "/login?reason=no_refresh_token";
          return Promise.reject(error);
        }

        const { data } = await axios.post(`${BASE_URL}/auth/refresh-token`, {
          refreshToken,
        });

        // Save the new access token
        localStorage.setItem("token", data.accessToken);
        
        // Update activity timestamp
        localStorage.setItem("lastActivity", Date.now());

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh token is invalid or expired
        localStorage.clear();
        
        // Determine the reason for redirect
        let reason = "session_expired";
        if (refreshError.response?.status === 403) {
          reason = "invalid_refresh_token";
        } else if (refreshError.code === "NETWORK_ERROR") {
          reason = "network_error";
        }
        
        window.location.href = `/login?reason=${reason}`;
        return Promise.reject(error);
      }
    }

    // Handle other authentication errors
    if (error.response?.status === 403) {
      localStorage.clear();
      window.location.href = "/login?reason=unauthorized";
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default api;
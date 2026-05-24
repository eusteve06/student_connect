import axios from "axios";

// Create a configured instance of Axios
const apiClient = axios.create({
  // Fallback to local development port if environment variable is missing
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000, // Timeout requests after 10 seconds
});

/**
 * Request Interceptor:
 * Automatically injects the bearer authentication token into headers 
 * before every single HTTP request leaves the browser.
 */
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor:
 * Globally catches backend errors (e.g., token expired, unauthorized access)
 * so your individual components don't have to keep repeating the same error handling logic.
 */
apiClient.interceptors.response.use(
  (response) => response, // Directly pass along successful responses
  (error) => {
    const status = error.response ? error.response.status : null;

    if (status === 401) {
      // Token is invalid or expired
      console.warn('Session expired. Redirecting to login...');
      localStorage.removeItem('token');
      // Force reload to login route if running in a standard web environment
      window.location.href = '/login';
    }

    if (status === 403) {
      console.error('Access Denied: You do not have permissions for this role resource.');
    }

    // Format a unified error message to be caught by our UI hooks safely
    const normalizedError = {
      message: error.response?.data?.message || 'An unexpected network error occurred.',
      status: status,
      raw: error
    };

    return Promise.reject(normalizedError);
  }
);

export default apiClient;
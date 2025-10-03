import axios from 'axios';

// Get base URL from environment or use default (matching URFX backend)
const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'https://api.urfx.xnerds.co/api';

const apiClient = axios.create({
  baseURL,
  timeout: 120000, // Increased to 2 minutes for slow MetaStats API calls
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Only access localStorage on client side
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Skip token refresh for authentication endpoints
    const authEndpoints = ['/auth/login', '/auth/register', '/auth/forgot-password', '/auth/reset-password', '/auth/refresh'];
    const isAuthEndpoint = authEndpoints.some(endpoint => originalRequest.url?.includes(endpoint));

    // Handle token refresh only for non-auth endpoints
    if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      originalRequest._retry = true;
      try {
        if (typeof window !== 'undefined') {
          const refreshToken = localStorage.getItem('refresh_token');
          const response = await apiClient.post('/auth/refresh', { refreshToken });
          const { token } = response.data;
          
          localStorage.setItem('token', token);
          originalRequest.headers.Authorization = `Bearer ${token}`;
          
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }

    // Enhance error object with response data for better error handling
    if (error.response?.data && (error.response.data.error || error.response.data.message)) {
      // Preserve the full error structure so our error handler can extract the message
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Base API configuration
const apiConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 seconds
};

// Create API instance
const apiInstance: AxiosInstance = axios.create(apiConfig);

// Request interceptor for adding auth token
apiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors - could implement token refresh here
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Force logout on auth error
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Redirect to login if not already there
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    // Handle 403 Forbidden errors
    if (error.response?.status === 403) {
      console.error('Permission denied');
    }

    // Handle 5xx server errors
    if (error.response?.status >= 500) {
      console.error('Server error occurred');
    }

    return Promise.reject(error);
  }
);

// API service with typed methods
export const api = {
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => 
    apiInstance.get(url, config).then((response: AxiosResponse<T>) => response.data),
  
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => 
    apiInstance.post(url, data, config).then((response: AxiosResponse<T>) => response.data),
  
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => 
    apiInstance.put(url, data, config).then((response: AxiosResponse<T>) => response.data),
  
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => 
    apiInstance.patch(url, data, config).then((response: AxiosResponse<T>) => response.data),
  
  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => 
    apiInstance.delete(url, config).then((response: AxiosResponse<T>) => response.data),
};

export default api; 
import api from './api';
import { LoginCredentials, User, UserRole } from '@/types/auth.types';
import axios from 'axios';

interface AuthResponse {
  token: string;
  user: User;
}

// Mock user data for testing
const MOCK_USERS: Record<UserRole, User> = {
  doctor: {
    id: '1',
    email: 'doctor@example.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    name: 'Sarah Johnson',
    role: 'doctor'
  },
  admin: {
    id: '2',
    email: 'admin@example.com',
    firstName: 'Admin',
    lastName: 'User',
    name: 'Admin User',
    role: 'admin'
  },
  family: {
    id: '3',
    email: 'family@example.com',
    firstName: 'Family',
    lastName: 'Member',
    name: 'Family Member',
    role: 'family'
  }
};

export const authService = {
  // Login user
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // For development/testing purposes, use mock authentication
    if (process.env.NODE_ENV === 'development' || import.meta.env.DEV) {
      console.log('Using mock authentication');
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simple validation
      if (!credentials.email || !credentials.password) {
        throw new Error('Email and password are required');
      }
      
      // Mock login logic - in real app this would be handled by the API
      const userRole = credentials.role || 'doctor';
      const mockUser = MOCK_USERS[userRole];
      
      // Simulate login with test credentials or using selected role
      if (credentials.email === 'test@example.com' && credentials.password === 'password123') {
        const response: AuthResponse = {
          token: 'mock-jwt-token-' + Math.random().toString(36).substring(2),
          user: {
            ...mockUser,
            email: credentials.email,
            name: credentials.email.split('@')[0],
            profileImage: '/assets/profile-placeholder.jpg',
          }
        };
        
        // Store auth data in localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        
        return response;
      } else {
        throw new Error('Invalid credentials');
      }
    }
    
    // Real API call for production
    try {
      const response = await api.post<AuthResponse>('/auth/login', credentials);
      // Store auth data in localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Logout user
  logout: (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Forgot password request
  forgotPassword: async (email: string): Promise<void> => {
    // For testing
    if (process.env.NODE_ENV === 'development' || import.meta.env.DEV) {
      console.log('Mock forgot password for:', email);
      await new Promise(resolve => setTimeout(resolve, 800));
      return;
    }
    
    try {
      await api.post('/auth/forgot-password', { email });
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  },

  // Reset password with token
  resetPassword: async (token: string, newPassword: string): Promise<void> => {
    // For testing
    if (process.env.NODE_ENV === 'development' || import.meta.env.DEV) {
      console.log('Mock reset password');
      await new Promise(resolve => setTimeout(resolve, 800));
      return;
    }
    
    try {
      await api.post('/auth/reset-password', { token, newPassword });
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  },

  // Get current user from localStorage
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch (error) {
      authService.logout();
      return null;
    }
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },
};

export default authService; 
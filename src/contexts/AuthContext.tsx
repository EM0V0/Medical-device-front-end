import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthContextType, LoginCredentials, User } from '@/types/auth.types';
import authService from '@/services/authService';

// Create auth context with default values
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  token: null,
  loading: true,
  error: null,
  login: async () => {},
  logout: () => {},
  forgotPassword: async () => {},
  resetPassword: async () => {},
});

// Provider component that wraps the app and makes auth available to any child component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<Omit<AuthContextType, 'login' | 'logout' | 'forgotPassword' | 'resetPassword'>>({
    isAuthenticated: false,
    user: null,
    token: null,
    loading: true,
    error: null,
  });

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const initAuth = () => {
      try {
        const token = localStorage.getItem('token');
        const user = authService.getCurrentUser();
        
        if (token && user) {
          setAuthState({
            isAuthenticated: true,
            user,
            token,
            loading: false,
            error: null,
          });
        } else {
          // Clear any partial auth data
          authService.logout();
          setAuthState({
            isAuthenticated: false,
            user: null,
            token: null,
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setAuthState({
          isAuthenticated: false,
          user: null,
          token: null,
          loading: false,
          error: 'Authentication failed. Please log in again.',
        });
      }
    };

    initAuth();
  }, []);

  // Login handler
  const login = async (credentials: LoginCredentials) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      
      const response = await authService.login(credentials);
      
      setAuthState({
        isAuthenticated: true,
        user: response.user,
        token: response.token,
        loading: false,
        error: null,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      setAuthState(prev => ({
        ...prev,
        isAuthenticated: false,
        loading: false,
        error: errorMessage,
      }));
      throw error;
    }
  };

  // Logout handler
  const logout = () => {
    authService.logout();
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
      loading: false,
      error: null,
    });
  };

  // Forgot password handler
  const forgotPassword = async (email: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      await authService.forgotPassword(email);
      setAuthState(prev => ({ ...prev, loading: false }));
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Password reset request failed. Please try again.';
      setAuthState(prev => ({ ...prev, loading: false, error: errorMessage }));
      throw error;
    }
  };

  // Reset password handler
  const resetPassword = async (token: string, newPassword: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      await authService.resetPassword(token, newPassword);
      setAuthState(prev => ({ ...prev, loading: false }));
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Password reset failed. Please try again.';
      setAuthState(prev => ({ ...prev, loading: false, error: errorMessage }));
      throw error;
    }
  };

  // Combine state and handlers
  const authContextValue: AuthContextType = {
    ...authState,
    login,
    logout,
    forgotPassword,
    resetPassword,
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

// Custom hook for accessing the auth context
export const useAuth = () => useContext(AuthContext);

export default AuthContext; 
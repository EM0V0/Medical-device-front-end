import React from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Import layouts
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';

// Import pages
// Auth
import Login from './pages/auth/Login';
// Dashboard
const Dashboard = React.lazy(() => import('./pages/dashboard/Dashboard'));

// Auth guard for protected routes
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Public route guard (redirects to dashboard if already authenticated)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

// Router configuration
const AppRouter = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Navigate to="/dashboard" replace />,
    },
    {
      path: 'login',
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      ),
    },
    {
      path: 'dashboard',
      element: (
        <ProtectedRoute>
          <MainLayout>
            <React.Suspense fallback={<div>Loading...</div>}>
              <Dashboard />
            </React.Suspense>
          </MainLayout>
        </ProtectedRoute>
      ),
    },
    // Add more routes here
    {
      path: '*',
      element: <Navigate to="/login" replace />,
    },
  ];

  return useRoutes(routes);
};

export default AppRouter; 
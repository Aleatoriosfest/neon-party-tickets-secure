
import React, { useEffect, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
  requireUser?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children,
  requireAdmin = false,
  requireUser = false
}) => {
  const { user, session, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!loading) {
      // User is not authenticated
      if (!user) {
        // Save current route to redirect after login
        localStorage.setItem('redirectAfterLogin', location.pathname);
        toast.error('Acesso negado', {
          description: 'Faça login para acessar esta página'
        });
      } 
      // User is authenticated but doesn't have admin privileges but route requires it
      else if (requireAdmin && user.role !== 'admin') {
        toast.error('Acesso negado', {
          description: 'Você não tem permissão para acessar esta página'
        });
      }
      // User is authenticated but doesn't have user role when route requires it
      else if (requireUser && user.role !== 'user') {
        toast.error('Acesso negado', {
          description: 'Esta página é apenas para usuários'
        });
      }
    }
  }, [user, loading, location.pathname, requireAdmin, requireUser]);

  // Show loading indicator while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-blue"></div>
      </div>
    );
  }

  // If user not authenticated, redirect to login with return URL
  if (!user) {
    return <Navigate to={`/auth?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  // If route requires admin privileges, verify user role
  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/access-denied" replace />;
  }

  // If route requires user role, verify user role
  if (requireUser && user.role !== 'user') {
    return <Navigate to="/access-denied" replace />;
  }

  // User authenticated and with correct permissions
  return <>{children}</>;
};

export default ProtectedRoute;

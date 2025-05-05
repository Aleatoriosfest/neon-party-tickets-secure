
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();
  
  // Show loading indicator while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-blue"></div>
      </div>
    );
  }
  
  // If user is not authenticated, redirect to login
  if (!user) {
    toast.error('Acesso negado', {
      description: 'Faça login para acessar esta página'
    });
    return <Navigate to="/auth" replace />;
  }
  
  // If user is not an admin, redirect to access denied page
  if (!isAdmin) {
    toast.error('Acesso negado', {
      description: 'Você não tem permissão para acessar esta página'
    });
    return <Navigate to="/access-denied" replace />;
  }
  
  // User is authenticated and is an admin
  return <>{children}</>;
};

export default AdminRoute;

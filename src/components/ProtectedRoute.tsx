
import React, { useEffect, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children,
  requireAdmin = false
}) => {
  const { user, session, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      // Salvar a rota atual para redirecionar depois do login
      localStorage.setItem('redirectAfterLogin', location.pathname);
      toast.error('Acesso negado', {
        description: 'Faça login para acessar esta página'
      });
    } else if (!loading && requireAdmin && user?.role !== 'admin') {
      toast.error('Acesso negado', {
        description: 'Você não tem permissão para acessar esta página'
      });
    }
  }, [user, loading, location.pathname, requireAdmin]);

  // Mostrar um indicador de carregamento enquanto verifica a autenticação
  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-blue"></div>
      </div>
    );
  }

  // Se o usuário não está autenticado, redirecionar para login
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Se a rota requer privilégios de admin, verificar o papel do usuário
  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/access-denied" replace />;
  }

  // Usuário autenticado e com as permissões corretas
  return <>{children}</>;
};

export default ProtectedRoute;

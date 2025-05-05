
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AdminDashboardComponent from '@/components/admin/AdminDashboard';
import { useAuth } from '@/contexts/AuthContext';

const AdminDashboard: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  // Redirecionamento se o usuário não for administrador
  if (!loading && (!user || user.role !== 'admin')) {
    navigate('/access-denied');
    return null;
  }
  
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white mb-8 text-center"
        >
          <span className="neon-text">Dashboard</span> Administrativo
        </motion.h1>
        
        <AdminDashboardComponent />
        
        <div className="mt-8 text-center">
          <Button
            variant="outline"
            className="border-light-gray text-white hover:bg-light-gray/10"
            onClick={() => navigate('/admin')}
          >
            Voltar para o Painel
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;

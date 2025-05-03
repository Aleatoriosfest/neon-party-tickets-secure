
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AccessDenied: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-dark flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="mx-auto h-24 w-24 rounded-full bg-red-500/20 flex items-center justify-center mb-6">
            <ShieldAlert size={48} className="text-red-500" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Acesso Negado
          </h1>
          
          <p className="text-gray-400 max-w-md mx-auto mb-8">
            Você não possui permissão para acessar esta página. Esta área é restrita a administradores do sistema.
          </p>
          
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
            <Button 
              onClick={() => navigate('/')}
              variant="outline"
              className="border-light-gray text-white hover:bg-light-gray/10"
            >
              Voltar para Home
            </Button>
            
            <Button 
              onClick={() => navigate('/auth')}
              className="bg-neon-purple hover:bg-neon-purple/80"
            >
              Fazer Login
            </Button>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AccessDenied;

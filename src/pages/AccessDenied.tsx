
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useIsMobile } from '@/hooks/use-mobile';

const AccessDenied: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-dark flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-4 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md w-full"
        >
          <div className="mx-auto h-24 w-24 rounded-full bg-red-500/20 flex items-center justify-center mb-6">
            <ShieldAlert size={isMobile ? 36 : 48} className="text-red-500" />
          </div>
          
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-4 neon-text">
            Acesso Negado
          </h1>
          
          <p className="text-gray-400 mx-auto mb-8 text-sm md:text-base">
            Você não possui permissão para acessar esta página. Esta área é restrita a administradores do sistema.
          </p>
          
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
            <Button 
              onClick={() => navigate('/')}
              variant="outline"
              size={isMobile ? "default" : "lg"}
              className="border-light-gray text-white hover:bg-light-gray/10 w-full sm:w-auto"
            >
              Voltar para Home
            </Button>
            
            <Button 
              onClick={() => navigate('/auth')}
              size={isMobile ? "default" : "lg"}
              className="bg-neon-purple hover:bg-neon-purple/80 w-full sm:w-auto neon-purple-border"
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

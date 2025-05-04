
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Home, Search } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark flex flex-col">
      <Navbar />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 flex items-center justify-center p-4"
      >
        <div className="text-center max-w-md">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="mx-auto mb-6"
          >
            <div className="text-8xl font-bold text-neon-purple">404</div>
          </motion.div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Página não encontrada
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400 mb-8"
          >
            Ops! A página que você está procurando não existe ou foi movida para outro endereço.
          </motion.p>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <Button asChild variant="outline" className="border-light-gray text-white">
              <Link to="/eventos"><Search className="mr-2 h-4 w-4" /> Ver Eventos</Link>
            </Button>
            
            <Button asChild className="bg-neon-blue hover:bg-neon-blue/80 text-black">
              <Link to="/"><Home className="mr-2 h-4 w-4" /> Página Inicial</Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
      
      <Footer />
    </div>
  );
};

export default NotFound;

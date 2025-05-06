
import React from 'react';
import Navbar from '@/components/Navbar';
import EventCatalog from '@/components/EventCatalog';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      
      <div className="pt-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-8"
        >
          <div className="glass p-6 md:p-10 rounded-lg mb-10">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-3xl md:text-5xl font-bold mb-4 text-white"
            >
              Bem-vindo ao <span className="neon-text">Aleatorios Fest</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-gray-300 text-lg mb-6"
            >
              Descubra os melhores eventos e festas da cidade. Compre seus ingressos e viva experiências inesquecíveis.
            </motion.p>
          </div>
        </motion.div>
        
        <EventCatalog />
      </div>
      
      <Footer />
    </div>
  );
};

export default Home;

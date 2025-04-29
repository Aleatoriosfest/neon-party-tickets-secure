
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const CTASection: React.FC = () => {
  return (
    <section className="py-16 container mx-auto px-4">
      <div className="glass rounded-lg p-8 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-white mb-4"
        >
          Não perca o próximo evento!
        </motion.h2>
        <p className="text-gray-300 mb-6 max-w-lg mx-auto">
          Garanta seu ingresso agora para a melhor festa eletrônica da cidade.
          Ingressos limitados!
        </p>
        <Button 
          size="lg" 
          className="bg-neon-blue hover:bg-neon-blue/80 text-black font-medium animate-pulse-neon"
        >
          Comprar Agora
        </Button>
      </div>
    </section>
  );
};

export default CTASection;

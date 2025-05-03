
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { Ticket } from 'lucide-react';

const CTASection: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  return (
    <section className="py-10 md:py-16 px-4">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-xl p-6 md:p-8 text-center relative overflow-hidden"
        >
          {/* Background glow effect */}
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-neon-purple/20 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-neon-blue/20 blur-3xl"></div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl md:text-3xl font-bold text-white mb-4 neon-text"
          >
            Não perca o próximo evento!
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-gray-300 mb-6 max-w-lg mx-auto"
          >
            Garanta seu ingresso agora para a melhor festa eletrônica da cidade.
            Ingressos limitados!
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button 
              size={isMobile ? "default" : "lg"}
              onClick={() => navigate('/eventos')}
              className="bg-neon-blue hover:bg-neon-blue/80 text-black font-medium animate-pulse-neon neon-border"
            >
              <Ticket className="mr-2" size={isMobile ? 16 : 20} />
              Comprar Agora
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;

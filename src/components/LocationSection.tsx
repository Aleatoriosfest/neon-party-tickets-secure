
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface LocationSectionProps {
  name: string;
  address: string;
}

const LocationSection: React.FC<LocationSectionProps> = ({ name, address }) => {
  const isMobile = useIsMobile();
  
  return (
    <section className="py-10 container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center md:text-left mb-6"
      >
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center justify-center md:justify-start"
        >
          <MapPin className="inline mr-2 text-neon-blue" size={isMobile ? 24 : 28} />
          Localização do <span className="neon-text ml-2">Evento</span>
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-20 h-1 bg-neon-blue mx-auto md:mx-0 my-4"
        />
      </motion.div>
      
      <div className="glass p-4 md:p-6 rounded-xl overflow-hidden">
        <div className="mb-4">
          <h3 className="text-xl text-white mb-2">{name}</h3>
          <p className="text-gray-300 mb-4">{address}</p>
        </div>
        
        <div className="aspect-video w-full bg-light-gray rounded-lg overflow-hidden shadow-lg">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.8716460850203!2d-46.78!3d-23.54!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMyJzI0LjAiUyA0NsKwNDYnNDguMCJX!5e0!3m2!1spt-BR!2sbr!4v1650000000000!5m2!1spt-BR!2sbr" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg"
            title="Localização do evento"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;

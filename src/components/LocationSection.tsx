
import React from 'react';
import { motion } from 'framer-motion';

interface LocationSectionProps {
  name: string;
  address: string;
}

const LocationSection: React.FC<LocationSectionProps> = ({ name, address }) => {
  return (
    <section className="py-10 container mx-auto px-4">
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-white mb-6"
      >
        Localização do <span className="neon-text">Evento</span>
      </motion.h2>
      
      <div className="glass p-6 rounded-lg">
        <h3 className="text-xl text-white mb-2">{name}</h3>
        <p className="text-gray-300 mb-4">{address}</p>
        <div className="aspect-video w-full bg-light-gray rounded-lg">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.8716460850203!2d-46.78!3d-23.54!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMyJzI0LjAiUyA0NsKwNDYnNDguMCJX!5e0!3m2!1spt-BR!2sbr!4v1650000000000!5m2!1spt-BR!2sbr" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;

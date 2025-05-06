
import React from 'react';
import { motion } from 'framer-motion';

interface StaticEventFlyerProps {
  eventId: string;
  image: string;
  title: string;
}

const StaticEventFlyer: React.FC<StaticEventFlyerProps> = ({ eventId, image, title }) => {
  // Check if this is the Projeto X event
  const isProjetoX = title.toLowerCase().includes('projeto x');
  
  if (isProjetoX) {
    return (
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-dark-gray rounded-lg overflow-hidden shadow-2xl border border-light-gray/30">
            <img 
              src={image} 
              alt={title} 
              className="w-full object-cover" 
            />
          </div>
        </motion.div>
      </div>
    );
  }
  
  // For other events, we'd return null and let the regular slider handle it
  return null;
};

export default StaticEventFlyer;

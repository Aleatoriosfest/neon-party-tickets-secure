
import React from 'react';
import { motion } from 'framer-motion';

interface EventHighlightsProps {
  highlights: string[];
}

const EventHighlights: React.FC<EventHighlightsProps> = ({ highlights }) => {
  return (
    <section className="py-10 container mx-auto px-4">
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-white mb-6"
      >
        Destaques do <span className="neon-text">Evento</span>
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {highlights.map((highlight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass p-4 rounded-lg flex items-center"
          >
            <div className="h-3 w-3 rounded-full bg-neon-blue mr-3"></div>
            <p className="text-white">{highlight}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default EventHighlights;


import React from 'react';
import { motion } from 'framer-motion';

interface EventHighlightsProps {
  highlights: string[];
}

const EventHighlights: React.FC<EventHighlightsProps> = ({ highlights }) => {
  return (
    <section className="py-16 container mx-auto px-4">
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-white mb-8"
      >
        Destaques do <span className="neon-text">Evento</span>
      </motion.h2>
      
      <div className="glass p-6 rounded-lg">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {highlights.map((highlight, index) => (
            <motion.li 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center"
            >
              <span className="text-neon-blue mr-2">✓</span>
              <span className="text-white">{highlight}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default EventHighlights;

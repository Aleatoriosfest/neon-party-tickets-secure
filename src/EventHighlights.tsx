
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
        Sobre o <span className="neon-text">Evento</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {highlights.map((highlight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass p-6 rounded-lg text-center group hover:bg-black/40 transition-colors"
          >
            <div className="mb-4 text-neon-blue text-3xl opacity-75 group-hover:opacity-100 transition-opacity">
              {index === 0 && '🍸'}
              {index === 1 && '🔊'}
              {index === 2 && '🎁'}
              {index === 3 && '🥤'}
              {index === 4 && '💃'}
              {index === 5 && '🕺'}
              {index === 6 && '🎫'}
            </div>
            <p className="text-white text-lg">{highlight}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default EventHighlights;


import React from 'react';
import { motion } from 'framer-motion';
import ArtistCard from '@/components/ArtistCard';

interface Artist {
  name: string;
  role: string;
  image: string;
  description?: string;
}

interface ArtistSectionProps {
  artists: Artist[];
}

const ArtistSection: React.FC<ArtistSectionProps> = ({ artists }) => {
  return (
    <section className="py-16 container mx-auto px-4">
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-white mb-8"
      >
        Artistas <span className="neon-purple-text">Confirmados</span>
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {artists.map((artist, index) => (
          <motion.div
            key={artist.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ArtistCard {...artist} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ArtistSection;

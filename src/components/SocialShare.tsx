
import React from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

interface SocialShareProps {
  instagramUrl?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ instagramUrl = "https://www.instagram.com/aleatorios_fest?igsh=Nnl0aTE0MzZyMXQ5" }) => {
  return (
    <section className="py-10 container mx-auto px-4">
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-white mb-6"
      >
        Siga nas <span className="neon-purple-text">Redes Sociais</span>
      </motion.h2>
      
      <div className="glass p-6 rounded-lg text-center">
        <p className="text-white mb-6">Siga o evento nas redes sociais para ficar por dentro das novidades e promoções exclusivas!</p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <motion.a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white px-6 py-3 rounded-full"
          >
            <Instagram className="h-6 w-6" />
            <span>Instagram</span>
          </motion.a>
        </div>
        
        <div className="mt-6">
          <p className="text-white">Use a hashtag <span className="text-neon-purple font-bold">#ProjetoXFest</span> nas suas fotos!</p>
        </div>
      </div>
    </section>
  );
};

export default SocialShare;

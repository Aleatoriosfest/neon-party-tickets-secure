
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

interface TimeSlot {
  time: string;
  artist: string;
  description?: string;
}

const ArtistTimeline: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  
  const timeSlots: TimeSlot[] = [
    { time: '16:00 - 17:30', artist: 'DJ Buzato', description: 'Abertura' },
    { time: '17:30 - 19:00', artist: 'DJ EZ Da Z/O', description: 'O Mago' },
    { time: '19:00 - 20:30', artist: 'DJ Luís ZL', description: 'Set Exclusivo' },
    { time: '20:30 - 22:00', artist: 'Tio Reh', description: 'O Brabo do Passinho' },
    { time: '22:00 - 23:00', artist: 'DJ Arthur ZL', description: 'Tá Tocando pras Gustosa' },
    { time: '23:00 - 00:00', artist: 'DJ Pereira 011', description: 'Encerramento' }
  ];
  
  const filteredSlots = filter === 'all' 
    ? timeSlots 
    : timeSlots.filter(slot => slot.artist.toLowerCase().includes(filter.toLowerCase()));
  
  return (
    <section className="py-16 container mx-auto px-4">
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-white mb-6"
      >
        Programação do <span className="neon-purple-text">Dia</span>
      </motion.h2>
      
      <div className="mb-6 flex flex-wrap gap-2">
        <button 
          onClick={() => setFilter('all')} 
          className={`px-4 py-2 rounded-full ${filter === 'all' ? 'bg-neon-purple text-black' : 'bg-black/30 text-white border border-neon-purple/50'}`}
        >
          Todos
        </button>
        <button 
          onClick={() => setFilter('dj')} 
          className={`px-4 py-2 rounded-full ${filter === 'dj' ? 'bg-neon-purple text-black' : 'bg-black/30 text-white border border-neon-purple/50'}`}
        >
          DJs
        </button>
        <button 
          onClick={() => setFilter('tio')} 
          className={`px-4 py-2 rounded-full ${filter === 'tio' ? 'bg-neon-purple text-black' : 'bg-black/30 text-white border border-neon-purple/50'}`}
        >
          Tio Reh
        </button>
      </div>
      
      <div className="relative">
        {/* Linha do tempo vertical */}
        <div className="absolute left-6 top-0 bottom-0 w-1 bg-neon-purple/30"></div>
        
        <div className="space-y-8">
          {filteredSlots.map((slot, index) => (
            <motion.div
              key={`${slot.time}-${slot.artist}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex"
            >
              <div className="relative">
                <div className="h-12 w-12 rounded-full bg-dark border-2 border-neon-purple flex items-center justify-center z-10 relative">
                  <Clock className="h-6 w-6 text-neon-purple" />
                </div>
              </div>
              
              <div className="glass ml-6 p-4 rounded-lg flex-1 transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
                <div className="text-neon-purple font-bold">{slot.time}</div>
                <div className="text-white text-lg font-bold">{slot.artist}</div>
                {slot.description && <div className="text-gray-300">{slot.description}</div>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArtistTimeline;

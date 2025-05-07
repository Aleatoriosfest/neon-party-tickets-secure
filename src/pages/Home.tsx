
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';

const Home: React.FC = () => {
  // Updated Project X event data with correct information
  const projetoXEvent = {
    id: "1",
    title: "ALEATÓRIOS FEST",
    date: "31 de Maio, 2025",
    location: "Chácara Monero, Osasco - SP",
    image: "/lovable-uploads/7167fe07-a100-48a7-9d4e-ef3e91237dd1.png",
    price: "R$30,00",
    category: "Festa"
  };

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      
      <div className="pt-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-8"
        >
          <div className="glass p-6 md:p-10 rounded-lg mb-10">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-3xl md:text-5xl font-bold mb-4 text-white"
            >
              Bem-vindo ao <span className="neon-text">Aleatórios Fest</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg mb-6 text-gray-300"
            >
              Descubra os melhores eventos e festas da cidade. Compre seus ingressos e viva experiências inesquecíveis.
            </motion.p>
          </div>
        </motion.div>
        
        {/* Event Catalog - Only Projeto X */}
        <section className="container mx-auto px-4 py-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-white mb-8 neon-text"
          >
            Eventos<span className="text-neon-blue">.</span>
          </motion.h1>
          
          {/* Projeto X Event Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="event-card overflow-hidden bg-dark-gray border-light-gray hover:border-neon-blue/50 transition-all duration-300 rounded-lg"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={projetoXEvent.image} 
                  alt={projetoXEvent.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                />
                <div className="absolute top-2 right-2 bg-neon-purple text-white px-2 py-1 rounded-full text-xs">
                  {projetoXEvent.category}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2 text-white">{projetoXEvent.title}</h3>
                <div className="flex flex-col space-y-1 text-sm text-gray-300">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1 text-neon-blue" />
                    <span>{projetoXEvent.date}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1 text-neon-blue" />
                    <span>{projetoXEvent.location}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="text-neon-blue font-bold">{projetoXEvent.price}</div>
                  <Link to={`/eventos/${projetoXEvent.id}`}>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-black"
                    >
                      Ver Detalhes
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Upcoming Events Section - Black image with "Em breve" text */}
        <section className="container mx-auto px-4 py-12">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-white mb-8 neon-text"
          >
            Próximos Eventos<span className="text-neon-blue">.</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="group relative h-40 sm:h-64 overflow-hidden rounded-lg"
            >
              <div className="absolute inset-0 bg-black"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white font-medium text-xl">Em breve</p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default Home;


import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';

const Home: React.FC = () => {
  // Project X event data
  const projetoXEvent = {
    id: "1",
    title: "PROJETO X",
    date: "20 de Julho, 2025",
    location: "Arena XYZ, São Paulo - SP",
    image: "/lovable-uploads/de50cc19-19d3-44a1-bf48-7a14dcc3a803.png",
    price: "R$50,00",
    category: "Festa"
  };
  
  // Placeholder upcoming events (just visual placeholders)
  const upcomingEvents = [
    {
      id: "placeholder-1",
      image: "/lovable-uploads/f47b2c1d-b605-469f-a0e1-ea3d73c3ef25.png",
      date: "15 de Agosto, 2025"
    },
    {
      id: "placeholder-2",
      image: "/lovable-uploads/42202d9f-6a6a-4541-b446-225cbc122a53.png",
      date: "10 de Setembro, 2025"
    },
    {
      id: "placeholder-3",
      image: "/lovable-uploads/7167fe07-a100-48a7-9d4e-ef3e91237dd1.png",
      date: "25 de Outubro, 2025"
    }
  ];

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
              Bem-vindo ao <span className="neon-text">Projeto X</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-gray-300 text-lg mb-6"
            >
              Descubra os melhores eventos e festas da cidade. Compre seus ingressos e viva experiências inesquecíveis.
            </motion.p>
          </div>
        </motion.div>
        
        {/* Event Catalog */}
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
        
        {/* Upcoming Events Section */}
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
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative h-40 sm:h-64 overflow-hidden rounded-lg cursor-pointer"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-110 duration-500"
                  style={{ backgroundImage: `url(${event.image})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <p className="text-white font-medium">{event.date}</p>
                  <p className="text-gray-300 text-sm mt-1">Em breve</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default Home;

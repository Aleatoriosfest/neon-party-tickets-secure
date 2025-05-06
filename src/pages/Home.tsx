
import React from 'react';
import Navbar from '@/components/Navbar';
import EventCatalog from '@/components/EventCatalog';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { EventType } from '@/types';
import EventCard from '@/components/EventCard';

// Mock future events
const upcomingEvents = [
  {
    id: "4",
    title: "Summer Music Festival",
    description: "O maior festival de música eletrônica do verão",
    date: "15 de Janeiro, 2026",
    location: "Praia de Copacabana, Rio de Janeiro",
    price: 120,
    image_url: "/lovable-uploads/f4ab4706-3eb6-4041-bef7-5b41bf79ede2.png"
  },
  {
    id: "5",
    title: "Rock Na Praia",
    description: "Festival de rock na beira do mar",
    date: "28 de Fevereiro, 2026",
    location: "Praia Grande, Santos",
    price: 89.90,
    image_url: "/lovable-uploads/cb1194d7-2a0c-4747-a307-23c02b66b55d.png"
  },
  {
    id: "6",
    title: "Festival Jazz & Blues",
    description: "Noite de jazz e blues com grandes nomes",
    date: "10 de Março, 2026", 
    location: "Teatro Municipal, São Paulo",
    price: 150,
    image_url: "/lovable-uploads/76338d86-9bf8-4f21-9853-0af071d1c4a8.png"
  }
];

const Home: React.FC = () => {
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
              Bem-vindo ao <span className="neon-text">Aleatorios Fest</span>
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
        
        <div className="container mx-auto px-4 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Eventos <span className="neon-text">Disponíveis</span>
          </h2>
          <EventCatalog />
        </div>
        
        <div className="container mx-auto px-4 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Próximos Eventos <span className="text-neon-purple">Em Breve</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event: EventType) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <EventCard
                  id={event.id}
                  title={event.title}
                  date={event.date}
                  location={event.location}
                  image={event.image_url}
                  price={`R$ ${event.price.toFixed(2)}`}
                  category="Em breve"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Home;

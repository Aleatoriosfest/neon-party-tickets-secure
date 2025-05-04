
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import EventCard from './EventCard';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search, Filter } from 'lucide-react';

// Mock data for now - in a real app, this would come from a database
const mockEvents = [
  {
    id: "1",
    title: "ALEATÓRIOS FEST",
    date: "31 de Maio, 2025",
    location: "Chácara Monero, Osasco - SP",
    image: "/lovable-uploads/7167fe07-a100-48a7-9d4e-ef3e91237dd1.png",
    price: "R$30,00",
    category: "Festa"
  },
  {
    id: "2",
    title: "Element's Fest",
    date: "15 de Junho, 2025",
    location: "Arena XYZ, São Paulo - SP",
    image: "/lovable-uploads/f47b2c1d-b605-469f-a0e1-ea3d73c3ef25.png",
    price: "R$40,00",
    category: "Festival"
  },
  {
    id: "3",
    title: "Projeto X",
    date: "20 de Julho, 2025",
    location: "Casa de Eventos ABC, Santo André - SP",
    image: "/lovable-uploads/de50cc19-19d3-44a1-bf48-7a14dcc3a803.png",
    price: "R$25,00",
    category: "Festa"
  },
  {
    id: "4",
    title: "Open Bar Night",
    date: "5 de Agosto, 2025",
    location: "Club 123, São Paulo - SP",
    image: "/lovable-uploads/42202d9f-6a6a-4541-b446-225cbc122a53.png",
    price: "R$50,00",
    category: "Balada"
  }
];

const EventCatalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredEvents = mockEvents.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <section className="container mx-auto px-4 py-12">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-white mb-8 neon-text"
      >
        Eventos<span className="text-neon-blue">.</span>
      </motion.h1>
      
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Buscar eventos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-dark-gray text-white border-light-gray focus:border-neon-blue"
          />
        </div>
        
        <Button variant="outline" className="border-light-gray text-white flex gap-2 hover:bg-neon-blue/20">
          <Filter size={16} />
          Filtrar
        </Button>
      </div>
      
      {filteredEvents.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-white text-xl">Nenhum evento encontrado com "{searchTerm}"</p>
          <Button 
            onClick={() => setSearchTerm('')}
            className="mt-4 bg-neon-blue text-black hover:bg-neon-blue/80"
          >
            Limpar busca
          </Button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEvents.map(event => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5,
                delay: parseInt(event.id) * 0.1
              }}
            >
              <EventCard 
                id={event.id}
                title={event.title}
                date={event.date}
                location={event.location}
                image={event.image}
                price={event.price}
                category={event.category}
              />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default EventCatalog;


import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import EventBanner from '@/components/EventBanner';
import EventCard from '@/components/EventCard';
import ArtistCard from '@/components/ArtistCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index: React.FC = () => {
  const featuredEvent = {
    title: "PROJETO X: Virada Eletrônica",
    date: "28 de Maio, 2025 • 22:00",
    location: "Arena X, São Paulo",
    image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b"
  };
  
  const upcomingEvents = [
    {
      id: "1",
      title: "Neon Night",
      date: "12 Jun, 2025",
      location: "Club Matrix",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      price: "R$ 80,00",
      category: "House"
    },
    {
      id: "2",
      title: "Deep Forest",
      date: "19 Jun, 2025",
      location: "Bosque Urbano",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
      price: "R$ 120,00",
      category: "Techno"
    },
    {
      id: "3",
      title: "Tech Wave",
      date: "26 Jun, 2025",
      location: "Warehouse 88",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      price: "R$ 90,00",
      category: "Trance"
    }
  ];
  
  const artists = [
    {
      name: "DJ Phantom",
      role: "Headliner",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
    },
    {
      name: "Bass Queen",
      role: "Live Act",
      image: ""
    },
    {
      name: "Neon Circuit",
      role: "Resident",
      image: ""
    }
  ];
  
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      
      {/* Banner Hero */}
      <section className="pt-16">
        <EventBanner {...featuredEvent} />
      </section>
      
      {/* Upcoming Events */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-white"
          >
            Próximos <span className="neon-text">Eventos</span>
          </motion.h2>
          <Button variant="ghost" className="text-neon-blue hover:text-neon-blue/80">
            Ver Todos
          </Button>
        </div>
        
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="bg-dark-gray border border-light-gray">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="house">House</TabsTrigger>
            <TabsTrigger value="techno">Techno</TabsTrigger>
            <TabsTrigger value="trance">Trance</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <EventCard {...event} />
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Artists */}
      <section className="py-16 container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-white mb-8"
        >
          Artistas <span className="neon-purple-text">Confirmados</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      
      {/* CTA Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="glass rounded-lg p-8 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-white mb-4"
          >
            Não perca o próximo evento!
          </motion.h2>
          <p className="text-gray-300 mb-6 max-w-lg mx-auto">
            Garanta seu ingresso agora para a melhor experiência de festa eletrônica da cidade.
            Ingressos limitados!
          </p>
          <Button 
            size="lg" 
            className="bg-neon-blue hover:bg-neon-blue/80 text-black font-medium animate-pulse-neon"
          >
            Comprar Agora
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-light-gray py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-2xl font-bold neon-text mb-2 block">Projeto X</span>
              <p className="text-sm text-gray-400">© 2025 Todos os direitos reservados</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-neon-blue">
                Política de Privacidade
              </a>
              <a href="#" className="text-gray-400 hover:text-neon-blue">
                Termos de Uso
              </a>
              <a href="#" className="text-gray-400 hover:text-neon-blue">
                Contato
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

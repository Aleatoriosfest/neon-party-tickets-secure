
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
    title: "PROJETO X",
    subtitle: "Aleatorios Fest x Element's Fest",
    date: "31 de Maio, 2025 • 16:00 às 00:00",
    location: "Chácara Monero, Osasco - SP",
    image: "public/lovable-uploads/7167fe07-a100-48a7-9d4e-ef3e91237dd1.png"
  };
  
  const upcomingEvents = [
    {
      id: "1",
      title: "Projeto X",
      date: "31 Mai, 2025",
      location: "Chácara Monero",
      image: "public/lovable-uploads/9261fd76-402b-4aee-b73b-fcaf4f396c03.png",
      price: "R$ 30,00",
      category: "Fest"
    }
  ];
  
  const artists = [
    {
      name: "DJ Buzato",
      role: "DJ",
      image: "public/lovable-uploads/9261fd76-402b-4aee-b73b-fcaf4f396c03.png",
      description: "Atração Confirmada"
    },
    {
      name: "Tio Reh",
      role: "O Brabo do Passinho",
      image: "public/lovable-uploads/0fa98cf1-cff5-49fd-8709-5417fc6838a9.png",
      description: "Atração Confirmada"
    },
    {
      name: "DJ EZ Da Z/O",
      role: "O Mago",
      image: "public/lovable-uploads/9bb4eefd-69a5-4c24-8703-d7d7827455fb.png",
      description: "Atração Confirmada" 
    },
    {
      name: "DJ Luís ZL",
      role: "DJ",
      image: "public/lovable-uploads/f4ab4706-3eb6-4041-bef7-5b41bf79ede2.png",
      description: "Atração Confirmada"
    },
    {
      name: "DJ Arthur ZL",
      role: "Tá Tocando pras Gustosa",
      image: "public/lovable-uploads/cb1194d7-2a0c-4747-a307-23c02b66b55d.png",
      description: "Ritmo dos Fluxos"
    },
    {
      name: "DJ Pereira 011",
      role: "Trem Bala",
      image: "public/lovable-uploads/cc64f665-9293-4b72-b9ec-0e086767e5d8.png",
      description: "Da Putaria" 
    },
    {
      name: "Tequileira Branquinha",
      role: "Show",
      image: "public/lovable-uploads/66e7124c-142d-48aa-804a-bc0dd6b9cb6b.png",
      description: "Atração Confirmada"
    }
  ];
  
  const eventHighlights = [
    "Open Bar",
    "Carros de Som e Paredão",
    "Sorteio de Combos e Camisetas",
    "Venda de Bebidas no Local",
    "Mulher: R$20 (com nome na lista)",
    "Homem: R$30 (com nome na lista)",
    "Homem: R$50 (sem nome na lista)"
  ];
  
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      
      {/* Banner Hero */}
      <section className="pt-16">
        <EventBanner {...featuredEvent} />
      </section>
      
      {/* Event Highlights */}
      <section className="py-10 container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-white mb-6"
        >
          Destaques do <span className="neon-text">Evento</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {eventHighlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass p-4 rounded-lg flex items-center"
            >
              <div className="h-3 w-3 rounded-full bg-neon-blue mr-3"></div>
              <p className="text-white">{highlight}</p>
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
      
      {/* Local Info */}
      <section className="py-10 container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-white mb-6"
        >
          Localização do <span className="neon-text">Evento</span>
        </motion.h2>
        
        <div className="glass p-6 rounded-lg">
          <h3 className="text-xl text-white mb-2">Chácara Monero</h3>
          <p className="text-gray-300 mb-4">Estrada das Margaridas, 209 - Recanto das Rosas, Osasco - SP</p>
          <div className="aspect-video w-full bg-light-gray rounded-lg">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.8716460850203!2d-46.78!3d-23.54!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMyJzI0LjAiUyA0NsKwNDYnNDguMCJX!5e0!3m2!1spt-BR!2sbr!4v1650000000000!5m2!1spt-BR!2sbr" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            ></iframe>
          </div>
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
            Garanta seu ingresso agora para a melhor festa eletrônica da cidade.
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

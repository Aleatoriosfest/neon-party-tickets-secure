import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, Calendar, MapPin } from 'lucide-react';
import { EventType } from '@/types';
import PurchaseTicketModal from '@/components/PurchaseTicketModal';

// Mock data for the Projeto X event
const projectXEvent: EventType = {
  id: "1",
  title: "PROJETO X",
  subtitle: "A festa mais louca do ano",
  description: "Uma experiência única com os melhores DJs e atrações da cidade!",
  date: "20 de Julho, 2025",
  time: "22:00 às 04:00",
  location: "Arena XYZ, São Paulo - SP",
  price: 50,
  image_url: "/lovable-uploads/de50cc19-19d3-44a1-bf48-7a14dcc3a803.png",
  ticketsAvailable: true,
  images: [],
  attractions: [
    {
      name: "DJ Arthur ZL",
      role: "Tá Tocando pras Gustosa",
      image: "/lovable-uploads/cb1194d7-2a0c-4747-a307-23c02b66b55d.png",
      description: "Ritmo dos Fluxos"
    },
    {
      name: "DJ Pereira 011",
      role: "Trem Bala",
      image: "/lovable-uploads/cc64f665-9293-4b72-b9ec-0e086767e5d8.png",
      description: "Da Putaria" 
    }
  ]
};

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<EventType | null>(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  
  useEffect(() => {
    // For now, we'll always load the Projeto X event
    setEvent(projectXEvent);
  }, [id]);
  
  const handleBuyTicket = () => {
    if (!user) {
      // Store the intended destination
      localStorage.setItem('redirectAfterLogin', `/eventos/${id}`);
      toast.info('Faça login para comprar ingressos');
      navigate('/auth');
      return;
    }
    
    setShowPurchaseModal(true);
  };
  
  if (!event) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-blue"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      
      <div className="pt-16 container mx-auto px-4">
        <Button 
          onClick={() => navigate(-1)} 
          variant="outline" 
          className="mb-4 text-white border-light-gray hover:bg-neon-blue/20 flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Voltar para eventos
        </Button>
      </div>
      
      {/* Static Flyer Banner */}
      <section className="pb-8">
        <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden rounded-lg">
          <div className="relative w-full h-full">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-lg"
              style={{ 
                backgroundImage: `url(${event.image_url})`,
                filter: 'brightness(0.7)'
              }}
            />
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />
            
            {/* Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute bottom-0 left-0 w-full p-4 md:p-8 text-white"
            >
              <div className="container mx-auto">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-1 md:mb-2 neon-text">
                  {event.title}
                </h1>
                {event.subtitle && (
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 text-neon-purple">
                    {event.subtitle}
                  </h2>
                )}
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-4 md:mb-6">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-2 text-neon-blue" />
                    <span className="text-base md:text-xl">{event.date}</span>
                    {event.time && <span className="text-base md:text-xl ml-2">• {event.time}</span>}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 mr-2 text-neon-blue" />
                    <span className="text-base md:text-xl">{event.location}</span>
                  </div>
                </div>
                <div className="flex justify-center w-full">
                  <Button 
                    size="lg"
                    className="bg-neon-blue hover:bg-neon-blue/80 text-black font-medium text-lg animate-pulse-neon neon-border w-full md:w-auto"
                    onClick={handleBuyTicket}
                  >
                    Comprar Ingresso
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Event Details - Keep the existing content */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Detalhes do Evento</h2>
        <p className="text-gray-300 mb-6">{event.description}</p>
        
        <div className="glass p-6 rounded-lg mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Informações</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-center">
              <span className="text-neon-blue mr-2">•</span>
              <span>Data: {event.date}</span>
            </li>
            <li className="flex items-center">
              <span className="text-neon-blue mr-2">•</span>
              <span>Horário: {event.time}</span>
            </li>
            <li className="flex items-center">
              <span className="text-neon-blue mr-2">•</span>
              <span>Local: {event.location}</span>
            </li>
            <li className="flex items-center">
              <span className="text-neon-blue mr-2">•</span>
              <span>Valor: R${event.price.toFixed(2)}</span>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Attractions Section */}
      {event.attractions && event.attractions.length > 0 && (
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Atrações</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {event.attractions.map((attraction, index) => (
              <div key={index} className="glass p-6 rounded-lg flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                  <img src={attraction.image} alt={attraction.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-semibold text-neon-blue">{attraction.name}</h3>
                <p className="text-white mb-2">{attraction.role}</p>
                <p className="text-gray-400">{attraction.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Buy Tickets Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="glass p-8 rounded-lg text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Garanta seu ingresso!</h2>
          <p className="text-gray-300 mb-6">Não perca essa experiência única. Compre seu ingresso agora!</p>
          
          <Button 
            size="lg"
            className="bg-neon-blue hover:bg-neon-blue/80 text-black font-medium text-lg animate-pulse-neon"
            onClick={handleBuyTicket}
            disabled={!event.ticketsAvailable}
          >
            {event.ticketsAvailable ? "Comprar Agora" : "Ingressos Esgotados"}
          </Button>
        </div>
      </section>
      
      {/* Purchase Modal */}
      <PurchaseTicketModal 
        isOpen={showPurchaseModal} 
        onClose={() => setShowPurchaseModal(false)} 
        event={event}
      />
      
      <Footer />
    </div>
  );
};

export default EventDetail;


import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import TicketCard from '@/components/TicketCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MyTickets: React.FC = () => {
  const myTickets = [
    {
      id: "TX-2025-001",
      eventName: "PROJETO X: Virada Eletrônica",
      eventDate: "28 de Maio, 2025 • 22:00",
      ticketType: "VIP",
      price: "R$ 180,00",
      qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=TX-2025-001",
      location: "Arena X, São Paulo"
    },
    {
      id: "TX-2025-002",
      eventName: "Neon Night",
      eventDate: "12 Jun, 2025 • 23:00",
      ticketType: "Standard",
      price: "R$ 80,00",
      qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=TX-2025-002",
      location: "Club Matrix"
    }
  ];
  
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      
      <div className="container mx-auto pt-24 pb-16 px-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-white mb-2"
        >
          Meus <span className="neon-text">Ingressos</span>
        </motion.h1>
        <p className="text-gray-400 mb-8">Gerencie seus ingressos e acesse rápido no dia do evento</p>
        
        <Tabs defaultValue="upcoming" className="mb-8">
          <TabsList className="bg-dark-gray border border-light-gray">
            <TabsTrigger value="upcoming">Próximos</TabsTrigger>
            <TabsTrigger value="past">Anteriores</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="mt-6">
            <div className="space-y-6">
              {myTickets.map((ticket, index) => (
                <motion.div
                  key={ticket.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <TicketCard {...ticket} />
                </motion.div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="past" className="mt-6">
            <div className="text-center py-12">
              <p className="text-gray-400">Nenhum ingresso anterior encontrado</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyTickets;

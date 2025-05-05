
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TicketCard from '@/components/TicketCard';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';
import { Ticket, AlertCircle } from 'lucide-react';

interface TicketType {
  id: string;
  event_id: string;
  user_id: string;
  ticket_number: string;
  status: 'valid' | 'used' | 'expired';
  purchase_date: string;
  price: number;
  quantity: number;
  event_name?: string;
  event_date?: string;
  event_location?: string;
  qr_code?: string;
}

// Mock events data - This would come from the database in a real app
const eventsData: Record<string, { name: string, date: string, location: string }> = {
  "1": { name: "ALEATÓRIOS FEST", date: "31 de Maio, 2025", location: "Chácara Monero, Osasco - SP" },
  "2": { name: "Element's Fest", date: "15 de Junho, 2025", location: "Arena XYZ, São Paulo - SP" },
  "3": { name: "Projeto X", date: "20 de Julho, 2025", location: "Casa de Eventos ABC, Santo André - SP" },
  "4": { name: "Open Bar Night", date: "5 de Agosto, 2025", location: "Club 123, São Paulo - SP" }
};

const MyTickets: React.FC = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchTickets = async () => {
      if (!user) return;
      
      try {
        // Fetch tickets from Supabase
        // Importante: Esta chamada não funcionará até que tenhamos a tabela tickets criada no Supabase
        const { data, error } = await supabase
          .from('tickets')
          .select('*')
          .eq('user_id', user.id);
        
        if (error) throw error;
        
        // Process tickets to add event info from our mock data
        // In a real app, this would be a join query or a separate fetch
        const processedTickets = data.map((ticket: any) => {
          const eventInfo = eventsData[ticket.event_id as keyof typeof eventsData] || 
            { name: "Evento", date: "Data não disponível", location: "Local não disponível" };
          
          return {
            ...ticket,
            event_name: eventInfo.name,
            event_date: eventInfo.date,
            event_location: eventInfo.location,
            qr_code: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${ticket.ticket_number}`
          };
        });
        
        setTickets(processedTickets);
      } catch (error: any) {
        console.error('Erro ao buscar ingressos:', error);
        toast.error('Erro ao carregar seus ingressos', {
          description: error.message
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchTickets();
  }, [user]);
  
  return (
    <div className="min-h-screen bg-dark flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-16 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
              <Ticket className="text-neon-blue" />
              Meus Ingressos
            </h1>
            <p className="text-gray-400 mt-2">
              Todos os seus ingressos adquiridos aparecem aqui
            </p>
          </motion.div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-blue"></div>
            </div>
          ) : tickets.length > 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              {tickets.map((ticket) => (
                <TicketCard
                  key={ticket.id}
                  id={ticket.ticket_number}
                  eventName={ticket.event_name || "Evento"}
                  eventDate={ticket.event_date || "Data não disponível"}
                  ticketType={ticket.status === 'valid' ? "Ingresso Válido" : "Ingresso Usado"}
                  price={`R$ ${ticket.price.toFixed(2)}`}
                  qrCode={ticket.qr_code || ""}
                  location={ticket.event_location || "Local não disponível"}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-gray-800/50 p-6">
                  <AlertCircle size={40} className="text-gray-400" />
                </div>
              </div>
              <h3 className="text-xl font-medium text-white mb-2">Nenhum ingresso encontrado</h3>
              <p className="text-gray-400 mb-6">
                Você ainda não comprou ingressos para nenhum evento
              </p>
            </motion.div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default MyTickets;

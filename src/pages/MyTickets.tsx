
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { TicketIcon, CalendarDays, MapPin, User } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/sonner';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { TicketType, TicketWithEventType } from '@/types';

// Mock de eventos para combinar com os ingressos
const mockEvents = [
  {
    id: "1",
    title: "ALEATÓRIOS FEST",
    date: "31 de Maio, 2025",
    location: "Arena Allianz Parque, São Paulo"
  },
  {
    id: "2",
    title: "PROJETO X: Virada Eletrônica",
    date: "28 de Maio, 2025",
    location: "Espaço Unimed, São Paulo"
  },
  {
    id: "3",
    title: "Neon Night",
    date: "12 de Junho, 2025",
    location: "Audio Club, São Paulo"
  }
];

const MyTickets: React.FC = () => {
  const [tickets, setTickets] = useState<TicketWithEventType[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchTickets = async () => {
      if (!user) return;
      
      try {
        // Buscar ingressos do usuário atual
        const { data, error } = await supabase
          .from('tickets')
          .select('*')
          .eq('user_id', user.id);
        
        if (error) throw error;
        
        if (data) {
          // Combinar os ingressos com os dados simulados de eventos
          const ticketsWithEventDetails = data.map((ticket: TicketType) => {
            const event = mockEvents.find(e => e.id === ticket.event_id);
            return {
              ...ticket,
              event_name: event?.title || 'Evento',
              event_date: event?.date || 'Data não disponível',
              event_location: event?.location || 'Local não disponível',
              qr_code: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ticket.ticket_number}`
            };
          });
          
          setTickets(ticketsWithEventDetails);
        }
      } catch (error: any) {
        console.error('Erro ao buscar ingressos:', error);
        toast.error('Erro ao buscar ingressos', {
          description: error.message
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchTickets();
  }, [user]);
  
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white mb-8 text-center"
        >
          Meus <span className="neon-text">Ingressos</span>
        </motion.h1>
        
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-blue"></div>
          </div>
        ) : tickets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                className="glass p-6 rounded-lg"
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-neon-blue">{ticket.event_name}</h2>
                  <div className={`px-2 py-1 text-xs rounded-full ${
                    ticket.status === 'valid' 
                      ? 'bg-green-900/30 text-green-400' 
                      : 'bg-red-900/30 text-red-400'
                  }`}>
                    {ticket.status === 'valid' ? 'Válido' : 'Utilizado'}
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-gray-300 mb-2">
                    <CalendarDays size={16} className="text-neon-purple" />
                    <span>{ticket.event_date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <MapPin size={16} className="text-neon-green" />
                    <span>{ticket.event_location}</span>
                  </div>
                </div>
                
                <div className="border-t border-b border-light-gray/30 py-4 mb-4">
                  <div className="flex justify-center mb-2">
                    <div className="bg-white p-2 rounded">
                      <img 
                        src={ticket.qr_code} 
                        alt="QR Code do Ingresso" 
                        className="w-32 h-32"
                      />
                    </div>
                  </div>
                  <p className="text-center text-sm text-gray-400 mt-2">
                    Código: {ticket.ticket_number}
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TicketIcon size={16} className="text-neon-blue" />
                    <span className="text-gray-300">
                      Qtd: <span className="text-white">{ticket.quantity}</span>
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-sm">Valor total</p>
                    <p className="font-bold text-neon-green">
                      R$ {(ticket.price * ticket.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <TicketIcon className="mx-auto h-16 w-16 text-gray-500 mb-4" />
            <h2 className="text-2xl font-semibold text-white mb-2">Você ainda não tem ingressos</h2>
            <p className="text-gray-400 max-w-md mx-auto mb-6">
              Compre ingressos para os próximos eventos e eles aparecerão aqui
            </p>
            <Button 
              className="bg-neon-blue text-black hover:bg-neon-blue/80"
              onClick={() => navigate('/')}
            >
              Ver Eventos
            </Button>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default MyTickets;

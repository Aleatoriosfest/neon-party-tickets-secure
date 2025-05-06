
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, Calendar, MapPin, Ticket } from 'lucide-react';
import { TicketWithEventType } from '@/types';

interface PurchaseConfirmationProps {
  ticket: TicketWithEventType;
  onClose?: () => void;
}

const PurchaseConfirmation: React.FC<PurchaseConfirmationProps> = ({ ticket, onClose }) => {
  const navigate = useNavigate();
  
  const handleViewTickets = () => {
    navigate('/meus-ingressos');
    if (onClose) onClose();
  };
  
  return (
    <div className="p-6 max-w-md mx-auto">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex flex-col items-center text-center"
      >
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
          <CheckCircle size={32} className="text-green-500" />
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-2">Compra confirmada!</h2>
        <p className="text-gray-400 mb-6">Seu ingresso foi adicionado à sua conta</p>
        
        <div className="glass p-4 rounded-lg w-full mb-6">
          <h3 className="text-xl font-bold text-neon-blue mb-3">{ticket.event_name}</h3>
          
          <div className="flex flex-col space-y-2 text-gray-300">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-neon-purple" />
              <span>{ticket.event_date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-neon-green" />
              <span>{ticket.event_location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Ticket size={16} className="text-neon-blue" />
              <span>Quantidade: {ticket.quantity}</span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="flex justify-between">
              <span className="text-gray-400">Valor total:</span>
              <span className="font-bold text-neon-green">
                R$ {(ticket.price * ticket.quantity).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col w-full gap-3">
          <Button 
            onClick={handleViewTickets}
            className="w-full bg-neon-blue hover:bg-neon-blue/80 text-black"
          >
            Ver meus ingressos
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => navigate('/')}
            className="w-full border-light-gray/30 hover:bg-light-gray/10"
          >
            Voltar para eventos
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default PurchaseConfirmation;

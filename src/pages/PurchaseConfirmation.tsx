
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, Calendar, MapPin, Ticket } from 'lucide-react';

const PurchaseConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const purchaseData = location.state?.purchaseData || {
    eventName: "PROJETO X",
    eventDate: "20 de Julho, 2025",
    eventLocation: "Arena XYZ, São Paulo - SP",
    ticketType: "Ingresso padrão",
    price: 50,
    quantity: 1,
    ticketNumber: "PX-2025-" + Math.floor(1000 + Math.random() * 9000)
  };
  
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto glass p-8 rounded-lg"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-900/30 rounded-full mb-4">
              <CheckCircle className="w-12 h-12 text-green-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Compra realizada com sucesso!</h1>
            <p className="text-gray-300">Seu ingresso foi confirmado e está pronto para uso.</p>
          </div>
          
          <div className="glass bg-dark-gray/50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-bold text-neon-blue mb-4">{purchaseData.eventName}</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-neon-purple" />
                <span className="text-gray-200">{purchaseData.eventDate}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-neon-green" />
                <span className="text-gray-200">{purchaseData.eventLocation}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <Ticket className="w-5 h-5 text-neon-blue" />
                <span className="text-gray-200">{purchaseData.ticketType}</span>
              </div>
            </div>
            
            <div className="border-t border-light-gray/30 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Quantidade:</span>
                <span className="text-white font-medium">{purchaseData.quantity}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-300">Número do ingresso:</span>
                <span className="text-white font-medium">{purchaseData.ticketNumber}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-300">Total:</span>
                <span className="text-neon-green font-bold text-xl">R$ {(purchaseData.price * purchaseData.quantity).toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/meus-ingressos')}
              className="bg-neon-blue hover:bg-neon-blue/80 text-black"
            >
              Ver Meus Ingressos
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="border-light-gray text-white hover:bg-light-gray/10"
            >
              Voltar para Eventos
            </Button>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PurchaseConfirmation;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/sonner';
import { Ticket, User } from 'lucide-react';

interface PurchaseTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: any;
}

const PurchaseTicketModal: React.FC<PurchaseTicketModalProps> = ({ isOpen, onClose, event }) => {
  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const handlePurchase = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    try {
      setIsProcessing(true);
      
      // Simulação do código do ingresso e QR code
      const ticketNumber = `EVENT-${event.id}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${ticketNumber}`;
      
      // Salvar no Supabase
      const { data, error } = await supabase
        .from('tickets')
        .insert([
          {
            user_id: user.id,
            event_id: event.id,
            ticket_number: ticketNumber,
            status: 'valid',
            purchase_date: new Date().toISOString(),
            price: event.price || 30.00, // Assuming a default price if not provided
            quantity: quantity
          }
        ]);
      
      if (error) throw error;
      
      toast.success('Ingresso comprado com sucesso!', {
        description: `${quantity} ingresso(s) para o evento ${event.title}`
      });
      
      // Fechar modal e redirecionar para a página de ingressos
      onClose();
      navigate('/meus-ingressos');
    } catch (error: any) {
      console.error('Erro ao comprar ingresso:', error);
      toast.error('Erro ao processar a compra', {
        description: error.message
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-dark-gray border-light-gray text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Ticket className="text-neon-blue" />
            Comprar Ingresso
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-6">
          <div className="mb-6 text-center">
            <h2 className="text-xl font-bold text-neon-blue">{event.title}</h2>
            <p className="text-gray-300">{event.date}</p>
            <p className="text-gray-300">{event.location}</p>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantidade</Label>
              <Input
                id="quantity"
                type="number"
                min={1}
                max={10}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="bg-gray-800 border-gray-700 focus:border-neon-blue"
              />
            </div>
            
            <div className="p-4 border border-light-gray/30 rounded-md bg-dark/30">
              <div className="flex justify-between mb-2">
                <span>Preço unitário:</span>
                <span>R$ {event.price || '30,00'}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Quantidade:</span>
                <span>{quantity}</span>
              </div>
              <div className="border-t border-light-gray/30 mt-2 pt-2 flex justify-between font-bold">
                <span>Total:</span>
                <span className="text-neon-blue">R$ {((event.price || 30) * quantity).toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <User size={16} className="text-neon-purple" />
              <p className="text-sm text-gray-400">Comprando como: {user?.name || 'Usuário'}</p>
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose} className="border-light-gray text-white">
            Cancelar
          </Button>
          <Button 
            onClick={handlePurchase}
            disabled={isProcessing}
            className="bg-neon-blue hover:bg-neon-blue/80 text-black"
          >
            {isProcessing ? 'Processando...' : 'Finalizar Compra'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseTicketModal;

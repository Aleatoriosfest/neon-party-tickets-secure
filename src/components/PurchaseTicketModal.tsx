
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Calendar, Users, CreditCard } from 'lucide-react';
import { EventType } from '@/types';

interface PurchaseTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventType;
}

const PurchaseTicketModal: React.FC<PurchaseTicketModalProps> = ({ isOpen, onClose, event }) => {
  const [ticketType, setTicketType] = useState('standard');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const ticketPrice = event.price;
  const totalPrice = ticketPrice * quantity;
  
  const handlePurchase = async () => {
    setLoading(true);
    
    try {
      // In a real app, we would send this to Supabase
      // For now, let's simulate a successful purchase
      setTimeout(() => {
        setLoading(false);
        onClose();
        
        // Navigate to confirmation page with purchase data
        navigate('/purchase-confirmation', {
          state: {
            purchaseData: {
              eventName: event.title,
              eventDate: event.date,
              eventLocation: event.location,
              ticketType: ticketType === 'standard' ? 'Ingresso padrão' : 'VIP',
              price: ticketPrice,
              quantity: quantity,
              ticketNumber: `PX-2025-${Math.floor(1000 + Math.random() * 9000)}`
            }
          }
        });
      }, 1500);
    } catch (error) {
      console.error("Error during purchase:", error);
      setLoading(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-dark-gray border-light-gray text-white sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Comprar Ingresso</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-neon-blue">{event.title}</h3>
            <div className="flex items-center text-sm text-gray-300 mb-2">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{event.date}</span>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="ticket-type">Tipo de Ingresso</Label>
              <RadioGroup
                value={ticketType}
                onValueChange={setTicketType}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="standard" id="standard" />
                  <Label htmlFor="standard" className="cursor-pointer">
                    Ingresso Padrão - R${ticketPrice.toFixed(2)}
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Quantidade</Label>
                <span className="text-white">{quantity}</span>
              </div>
              <div className="flex items-center gap-4 py-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="rounded-full h-8 w-8 p-0 border-light-gray"
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <Slider
                  value={[quantity]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={(value) => setQuantity(value[0])}
                  className="flex-1"
                />
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className="rounded-full h-8 w-8 p-0 border-light-gray"
                  disabled={quantity >= 10}
                >
                  +
                </Button>
              </div>
            </div>
            
            <div className="pt-4 border-t border-light-gray/30">
              <div className="flex justify-between mb-2">
                <span className="text-gray-300">Subtotal:</span>
                <span>R${ticketPrice.toFixed(2)} x {quantity}</span>
              </div>
              <div className="flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span className="text-neon-green">R${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={onClose}
            className="border-light-gray text-white hover:bg-light-gray/10"
          >
            Cancelar
          </Button>
          <Button 
            onClick={handlePurchase}
            disabled={loading}
            className="bg-neon-blue hover:bg-neon-blue/80 text-black"
          >
            {loading ? 'Processando...' : 'Finalizar Compra'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseTicketModal;

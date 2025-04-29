
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/sonner';

const PixPayment: React.FC = () => {
  const [ticketType, setTicketType] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);
  const pixKey = 'projeto-x@exemplo.com'; // Substitua com a chave PIX real

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!ticketType || !name || !email || !phone) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }
    
    setShowQRCode(true);
    toast.success('Pedido gerado com sucesso! Faça o pagamento para confirmar seu ingresso.');
  };
  
  const ticketPrice = ticketType === 'female' ? 'R$20' : ticketType === 'male' ? 'R$30' : '';

  return (
    <section className="py-16 container mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-white mb-6"
      >
        Comprar <span className="neon-blue-text">Ingresso</span>
      </motion.h2>

      <div className="glass p-6 rounded-lg">
        {!showQRCode ? (
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label className="block text-white mb-2">Tipo de Ingresso</label>
              <Select onValueChange={(value) => setTicketType(value)}>
                <SelectTrigger className="bg-dark-gray border-light-gray text-white">
                  <SelectValue placeholder="Selecione o tipo de ingresso" />
                </SelectTrigger>
                <SelectContent className="bg-dark-gray text-white">
                  <SelectItem value="female">Mulher - R$20 (Antecipado)</SelectItem>
                  <SelectItem value="male">Homem - R$30 (Antecipado)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-white mb-2">Nome Completo</label>
              <Input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-dark-gray border-light-gray text-white"
                placeholder="Seu nome completo"
              />
            </div>
            
            <div>
              <label className="block text-white mb-2">Email</label>
              <Input 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="bg-dark-gray border-light-gray text-white"
                placeholder="Seu email"
              />
            </div>
            
            <div>
              <label className="block text-white mb-2">Telefone (WhatsApp)</label>
              <Input 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-dark-gray border-light-gray text-white"
                placeholder="(11) 99999-9999"
              />
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-neon-blue hover:bg-neon-blue/80 text-black font-bold"
            >
              Gerar Pagamento PIX
            </Button>
          </motion.form>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            <h3 className="text-xl font-bold text-white mb-4">Pagamento via PIX</h3>
            <p className="text-gray-300 mb-6 text-center">
              Para confirmar sua compra, faça um PIX no valor de {ticketPrice} para a chave:
            </p>
            
            <div className="bg-white p-6 rounded-lg mb-6">
              <div className="bg-black p-2 mb-4 rounded flex items-center justify-center">
                {/* Placeholder for QR Code */}
                <div className="w-48 h-48 bg-white flex items-center justify-center">
                  <p className="text-black text-center">QR Code PIX</p>
                </div>
              </div>
              
              <p className="text-black font-bold text-center">{pixKey}</p>
            </div>
            
            <div className="w-full space-y-4">
              <p className="text-white text-center">Após o pagamento, você receberá seu ingresso por email em até 24 horas.</p>
              
              <Button 
                onClick={() => setShowQRCode(false)}
                variant="outline" 
                className="w-full border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-white"
              >
                Voltar
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PixPayment;

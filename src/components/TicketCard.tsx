
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Calendar, MapPin, Download, Ticket, QrCode } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface TicketCardProps {
  id: string;
  eventName: string;
  eventDate: string;
  ticketType: string;
  price: string;
  qrCode: string;
  location: string;
}

const TicketCard: React.FC<TicketCardProps> = ({
  id,
  eventName,
  eventDate,
  ticketType,
  price,
  qrCode,
  location
}) => {
  const [showQrCodeModal, setShowQrCodeModal] = useState(false);
  
  const handleDownloadTicket = () => {
    // In a real app, this would generate a PDF ticket for download
    toast.success("Ingresso baixado com sucesso!");
  };
  
  return (
    <>
      <Card className="bg-dark-gray border-light-gray text-white overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 bg-gradient-to-br from-neon-blue/20 to-neon-purple/30 p-6 flex items-center justify-center">
              <div className="text-center">
                <Ticket className="h-12 w-12 mx-auto mb-2 text-neon-blue" />
                <h3 className="font-bold">{ticketType}</h3>
                <p className="text-neon-blue font-semibold">{price}</p>
              </div>
            </div>
            
            <div className="md:w-3/4 p-6">
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-2">{eventName}</h2>
                  <div className="flex items-center mb-2 text-gray-300">
                    <Calendar className="h-4 w-4 mr-2 text-neon-purple" />
                    <span>{eventDate}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <MapPin className="h-4 w-4 mr-2 text-neon-purple" />
                    <span>{location}</span>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-700/50">
                    <p className="text-xs text-gray-400">Código: {id}</p>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2 mt-4 md:mt-0">
                  <Button
                    variant="outline"
                    className="border-neon-purple text-neon-purple hover:bg-neon-purple/20"
                    onClick={() => setShowQrCodeModal(true)}
                  >
                    <QrCode className="h-4 w-4 mr-2" />
                    Ver QR Code
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="border-neon-blue text-neon-blue hover:bg-neon-blue/20"
                    onClick={handleDownloadTicket}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Baixar Ingresso
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={showQrCodeModal} onOpenChange={setShowQrCodeModal}>
        <DialogContent className="bg-dark-gray text-white border-light-gray">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">Seu Ingresso</DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col items-center py-4">
            <div className="mb-6 text-center">
              <h2 className="text-xl font-bold mb-1">{eventName}</h2>
              <p className="text-gray-300">{eventDate}</p>
              <p className="text-neon-purple">{ticketType}</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg mb-4">
              <img 
                src={qrCode}
                alt="QR Code do Ingresso" 
                className="w-56 h-56"
              />
            </div>
            
            <p className="text-center text-gray-300 mb-6">
              Apresente este QR Code na entrada do evento
            </p>
            
            <div className="text-center text-xs text-gray-500">
              <p>ID: {id}</p>
              <p>Este ingresso é pessoal e intransferível</p>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              className="w-full bg-neon-blue hover:bg-neon-blue/80"
              onClick={handleDownloadTicket}
            >
              <Download className="mr-2 h-4 w-4" />
              Baixar Ingresso
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TicketCard;

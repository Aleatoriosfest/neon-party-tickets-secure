
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QrCode } from 'lucide-react';

interface UserTicketCardProps {
  ticket: {
    id: string;
    ticket_number: string;
    purchase_date: string;
    status: string;
  };
  onViewTicket: (ticket: any) => void;
}

const UserTicketCard: React.FC<UserTicketCardProps> = ({ ticket, onViewTicket }) => {
  const getStatusText = (status: string) => {
    switch (status) {
      case 'ativo':
      case 'valid':
        return 'Ativo';
      case 'usado':
      case 'used':
        return 'Usado';
      default:
        return 'Expirado';
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'ativo':
      case 'valid':
        return 'bg-green-900/30 text-green-400';
      case 'usado':
      case 'used':
        return 'bg-orange-900/30 text-orange-400';
      default:
        return 'bg-red-900/30 text-red-400';
    }
  };

  return (
    <Card className="bg-dark-gray border-light-gray text-white">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="font-bold text-lg">ALEATÓRIOS FEST</h3>
            <p className="text-gray-400 text-sm">Ingresso #{ticket.ticket_number}</p>
            <p className="text-gray-400 text-sm">
              Comprado em: {new Date(ticket.purchase_date).toLocaleDateString('pt-BR')}
            </p>
            <div className={`mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(ticket.status)}`}>
              {getStatusText(ticket.status)}
            </div>
          </div>
          
          <Button 
            className="bg-neon-purple hover:bg-neon-purple/80 text-white"
            onClick={() => onViewTicket(ticket)}
          >
            <QrCode className="w-4 h-4 mr-2" />
            Visualizar Ingresso
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserTicketCard;

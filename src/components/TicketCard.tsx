
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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
  id, eventName, eventDate, ticketType, price, qrCode, location 
}) => {
  return (
    <Card className="glass overflow-hidden border-2 border-neon-blue/30 hover:border-neon-blue/70 transition-all">
      <CardContent className="p-5">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <Badge className="mb-2 bg-neon-blue text-black">
              {ticketType}
            </Badge>
            <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">{eventName}</h3>
            <div className="flex flex-col space-y-2 text-sm text-gray-300 mb-4">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-neon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <span>{eventDate}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-neon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span>{location}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-neon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                <span>{price}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-white p-2 rounded-lg">
              <img src={qrCode} alt="QR Code" className="w-32 h-32" />
            </div>
            <p className="text-xs text-center mt-2 text-gray-400">Apresente este QR Code na entrada</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="text-xs text-gray-400">ID: {id}</div>
        <Badge variant="outline" className="text-neon-purple border-neon-purple">
          Válido
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default TicketCard;

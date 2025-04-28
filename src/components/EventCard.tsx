
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
  price: string;
  category: string;
}

const EventCard: React.FC<EventCardProps> = ({ 
  id, title, date, location, image, price, category 
}) => {
  return (
    <Card className="event-card overflow-hidden bg-dark-gray border-light-gray hover:border-neon-blue/50 transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
        />
        <Badge className="absolute top-2 right-2 bg-neon-purple text-white">
          {category}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <div className="flex flex-col space-y-1 text-sm text-gray-300">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-neon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-neon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span>{location}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 pt-0">
        <div className="text-neon-blue font-bold">{price}</div>
        <Button 
          size="sm" 
          variant="outline" 
          className="border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-black"
        >
          Ver Detalhes
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;


import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';

interface EventBannerProps {
  title: string;
  date: string;
  location: string;
  image: string;
  subtitle?: string;
  time?: string;
  eventId?: string;
}

const EventBanner: React.FC<EventBannerProps> = ({ 
  title, 
  date, 
  location, 
  image, 
  subtitle, 
  time,
  eventId
}) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  const handleBuyTicket = () => {
    // If eventId is provided, navigate to specific event page
    if (eventId) {
      navigate(`/eventos/${eventId}`);
    } else {
      // Scroll to payment section if on the same page
      const element = document.getElementById('comprar');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/eventos');
      }
    }
  };
  
  return (
    <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden rounded-lg">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{ 
          backgroundImage: `url(${image})`,
          filter: 'brightness(0.7)'
        }}
      />
      
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />
      
      <div className="absolute bottom-0 left-0 w-full p-4 md:p-8 text-white">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto"
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-1 md:mb-2 neon-text">{title}</h1>
          {subtitle && (
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-3 text-neon-purple">{subtitle}</h2>
          )}
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-4 md:mb-6">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-2 text-neon-blue" />
              <span className="text-base md:text-xl">{date}</span>
              {time && <span className="text-base md:text-xl ml-2">• {time}</span>}
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 md:w-5 md:h-5 mr-2 text-neon-blue" />
              <span className="text-base md:text-xl">{location}</span>
            </div>
          </div>
          <Button 
            size={isMobile ? "default" : "lg"} 
            className="bg-neon-blue hover:bg-neon-blue/80 text-black font-medium text-base md:text-lg animate-pulse-neon neon-border w-full md:w-auto"
            onClick={handleBuyTicket}
          >
            Comprar Ingresso
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default EventBanner;


import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

interface EventBannerProps {
  title: string;
  date: string;
  location: string;
  image: string;
  subtitle?: string;
}

const EventBanner: React.FC<EventBannerProps> = ({ title, date, location, image, subtitle }) => {
  return (
    <div className="relative w-full h-[70vh] overflow-hidden rounded-lg">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{ 
          backgroundImage: `url(${image})`,
          filter: 'brightness(0.6)'
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />
      
      <div className="absolute bottom-0 left-0 w-full p-8 text-white">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-2 neon-text">{title}</h1>
          {subtitle && (
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-neon-purple">{subtitle}</h2>
          )}
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-neon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span className="text-xl">{date}</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-neon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span className="text-xl">{location}</span>
            </div>
          </div>
          <Button 
            size="lg" 
            className="bg-neon-blue hover:bg-neon-blue/80 text-black font-medium text-lg animate-pulse-neon"
          >
            Comprar Ingresso
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default EventBanner;

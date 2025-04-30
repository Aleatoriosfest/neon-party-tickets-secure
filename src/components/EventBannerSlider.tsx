
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface EventBannerSliderProps {
  title: string;
  date: string;
  location: string;
  flyer: string;
  subtitle?: string;
  time?: string;
  artistImages: string[];
  venueImages: string[];
}

const EventBannerSlider: React.FC<EventBannerSliderProps> = ({
  title,
  date,
  location,
  flyer,
  subtitle,
  time,
  artistImages,
  venueImages
}) => {
  // Adicionando os novos flyers aos slides
  const allSlides = [
    { type: 'flyer', image: flyer },
    { type: 'flyer', image: '/lovable-uploads/4c228da6-5ce6-49ab-a66e-e2dede8cb2c7.png', name: 'Element\'s Fest' },
    { type: 'flyer', image: '/lovable-uploads/92a27832-ea11-4929-974e-06e0cd29c6eb.png', name: 'Aleatórios Fest' },
    { type: 'logo', image: '/lovable-uploads/76338d86-9bf8-4f21-9853-0af071d1c4a8.png', name: 'Aleatórios Fest' },
    { type: 'logo', image: '/lovable-uploads/42202d9f-6a6a-4541-b446-225cbc122a53.png', name: 'Element\'s Fest' },
    ...venueImages.map(img => ({ type: 'venue', image: img })),
  ];

  const carouselRef = useRef<HTMLDivElement>(null);

  const handleComprarClick = () => {
    const element = document.getElementById('comprar');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }

    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      // Save that we need to redirect to payment section after login
      sessionStorage.setItem('redirectAfterLogin', window.location.href + '#comprar');
      
      // Trigger the login modal
      const loginButton = document.querySelector('[data-login-button="true"]') as HTMLElement;
      if (loginButton) {
        loginButton.click();
      }
    }
  };

  return (
    <div className="relative w-full h-[70vh] overflow-hidden rounded-lg">
      {/* Static background - prevents blank screen during carousel load */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{ 
          backgroundImage: `url(${flyer})`,
          filter: 'brightness(0.6)'
        }}
      />
      
      <Carousel 
        className="w-full h-full" 
        opts={{ 
          loop: true, 
          skipSnaps: false, 
          duration: 800,
          align: "start",
        }}
      >
        <CarouselContent className="h-full">
          {allSlides.map((slide, index) => (
            <CarouselItem key={index} className="h-full w-full">
              {slide.type === 'logo' ? (
                <div className="relative w-full h-full flex items-center justify-center bg-dark">
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="z-10 flex flex-col items-center"
                  >
                    <img 
                      src={slide.image} 
                      alt={slide.name} 
                      className="max-h-[40vh] max-w-[80%] object-contain mb-6"
                    />
                    <h2 className="text-4xl text-white font-bold neon-text">{slide.name}</h2>
                  </motion.div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
                  style={{ 
                    backgroundImage: `url(${slide.image})`,
                    filter: 'brightness(0.6)'
                  }}
                />
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute bottom-0 left-0 w-full p-8 text-white"
              >
                <div className="container mx-auto">
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
                      {time && <span className="text-xl ml-2">• {time}</span>}
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
                    onClick={handleComprarClick}
                  >
                    Comprar Ingresso
                  </Button>
                </div>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 bg-black/50 text-white border-neon-blue hover:bg-neon-blue hover:text-black" />
        <CarouselNext className="right-4 bg-black/50 text-white border-neon-blue hover:bg-neon-blue hover:text-black" />
      </Carousel>
    </div>
  );
};

export default EventBannerSlider;

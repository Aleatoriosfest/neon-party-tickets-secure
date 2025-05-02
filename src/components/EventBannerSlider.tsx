
import React, { useEffect, useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  // Our carousel images - fixing the paths by removing "public/" prefix
  const carouselImages = [
    { type: 'flyer', image: flyer, name: 'Flyer oficial do evento' },
    { type: 'flyer', image: '/lovable-uploads/de50cc19-19d3-44a1-bf48-7a14dcc3a803.png', name: 'Element\'s Fest Projeto X' },
    { type: 'flyer', image: '/lovable-uploads/f47b2c1d-b605-469f-a0e1-ea3d73c3ef25.png', name: 'Aleatórios Fest Projeto X' },
  ];

  // Preload images to avoid black screen
  useEffect(() => {
    const preloadImages = async () => {
      const promises = carouselImages.map((item) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = item.image;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      try {
        await Promise.all(promises);
        setImagesLoaded(true);
      } catch (error) {
        console.error("Error loading images:", error);
        // Still set loaded to true to avoid infinite loading
        setImagesLoaded(true);
      }
    };
    
    preloadImages();
  }, []);
  
  // Auto rotate carousel every 5 seconds
  useEffect(() => {
    if (!imagesLoaded) return;

    const startAutoRotation = () => {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % carouselImages.length);
      }, 5000);
    };

    startAutoRotation();
    
    // Clean up interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [carouselImages.length, imagesLoaded]);
  
  // Reset timer when manually changing slide
  const handleSlideChange = (index: number) => {
    setCurrentIndex(index);
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % carouselImages.length);
    }, 5000);
  };

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

  if (!imagesLoaded) {
    return (
      <div className="relative w-full h-[70vh] bg-dark flex items-center justify-center">
        <div className="text-white text-xl">Carregando imagens...</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[70vh] overflow-hidden rounded-lg">
      {/* Carousel */}
      <div className="relative w-full h-full">
        <AnimatePresence initial={false}>
          {carouselImages.map((image, index) => (
            index === currentIndex && (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-lg"
                style={{ 
                  backgroundImage: `url(${image.image})`,
                  filter: 'brightness(0.7)'
                }}
              />
            )
          ))}
        </AnimatePresence>
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />
        
        {/* Carousel indicators */}
        <div className="absolute bottom-28 left-0 right-0 flex justify-center gap-2 z-10">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-neon-blue scale-125" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
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
            <div className="flex justify-center w-full">
              <Button 
                size="lg" 
                className="bg-neon-blue hover:bg-neon-blue/80 text-black font-medium text-lg animate-pulse-neon"
                onClick={handleComprarClick}
              >
                Comprar Ingresso
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EventBannerSlider;

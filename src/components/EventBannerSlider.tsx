
import React, { useEffect, useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChevronLeft, ChevronRight, Calendar, MapPin } from 'lucide-react';

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
  const isMobile = useIsMobile();
  
  // Our carousel images - fixing the paths by removing "public/" prefix
  const carouselImages = [
    { type: 'flyer', image: flyer, name: 'Flyer oficial do evento' },
    { type: 'flyer', image: '/lovable-uploads/de50cc19-19d3-44a1-bf48-7a14dcc3a803.png', name: 'Element\'s Fest Projeto X' },
    { type: 'flyer', image: '/lovable-uploads/f47b2c1d-b605-469f-a0e1-ea3d73c3ef25.png', name: 'Aleatórios Fest Projeto X' },
  ];

  // Preload images to avoid black screen
  useEffect(() => {
    let mounted = true;
    
    const preloadImages = async () => {
      try {
        const promises = carouselImages.map((item) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = () => {
              console.log(`Failed to load image: ${item.image}`);
              // Resolve anyway to prevent blocking other images
              resolve(null);
            };
            img.src = item.image;
          });
        });

        await Promise.allSettled(promises);
        
        if (mounted) {
          setImagesLoaded(true);
        }
      } catch (error) {
        console.error("Error in image loading process:", error);
        // Still set loaded to true to avoid infinite loading
        if (mounted) {
          setImagesLoaded(true);
        }
      }
    };
    
    preloadImages();
    
    return () => {
      mounted = false;
    };
  }, []);
  
  // Auto rotate carousel every 5 seconds
  useEffect(() => {
    if (!imagesLoaded) return;
    
    let mounted = true;

    const startAutoRotation = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      intervalRef.current = setInterval(() => {
        if (mounted) {
          setCurrentIndex(prevIndex => (prevIndex + 1) % carouselImages.length);
        }
      }, 5000);
    };

    startAutoRotation();
    
    // Clean up interval on unmount
    return () => {
      mounted = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
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

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
    
    // Reset timer
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % carouselImages.length);
    }, 5000);
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % carouselImages.length
    );
    
    // Reset timer
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
      <div className="relative w-full h-[50vh] md:h-[70vh] bg-dark flex items-center justify-center">
        <div className="text-white text-xl flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-blue mb-4"></div>
          Carregando imagens...
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden rounded-lg">
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
        
        {/* Navigation buttons */}
        <button 
          className="absolute top-1/2 left-2 z-10 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 backdrop-blur-sm transition-colors"
          onClick={goToPrevSlide}
          aria-label="Previous slide"
        >
          <ChevronLeft size={isMobile ? 20 : 24} />
        </button>
        
        <button 
          className="absolute top-1/2 right-2 z-10 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 backdrop-blur-sm transition-colors"
          onClick={goToNextSlide}
          aria-label="Next slide"
        >
          <ChevronRight size={isMobile ? 20 : 24} />
        </button>
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />
        
        {/* Carousel indicators */}
        <div className="absolute bottom-20 md:bottom-28 left-0 right-0 flex justify-center gap-2 z-10">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
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
          className="absolute bottom-0 left-0 w-full p-4 md:p-8 text-white"
        >
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-1 md:mb-2 neon-text">
              {title}
            </h1>
            {subtitle && (
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 text-neon-purple">
                {subtitle}
              </h2>
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
            <div className="flex justify-center w-full">
              <Button 
                size={isMobile ? "default" : "lg"} 
                className="bg-neon-blue hover:bg-neon-blue/80 text-black font-medium text-base md:text-lg animate-pulse-neon neon-border w-full md:w-auto"
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

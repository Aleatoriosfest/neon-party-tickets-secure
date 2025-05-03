
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface PhotoGalleryProps {
  title?: string;
  photos: string[];
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  title = "Fotos do Local",
  photos,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);
  const isMobile = useIsMobile();
  
  // Initialize image loading state
  useEffect(() => {
    setImagesLoaded(Array(photos.length).fill(false));
  }, [photos]);

  // Handle image load
  const handleImageLoad = useCallback((index: number) => {
    setImagesLoaded(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  }, []);
  
  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setCurrentImageIndex(index);
  };
  
  const closeLightbox = () => {
    setActiveIndex(null);
  };

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    } else {
      setCurrentImageIndex(photos.length - 1);
    }
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentImageIndex < photos.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      setCurrentImageIndex(0);
    }
  };

  // Handle swipe for mobile
  const handleTouchStart = React.useRef<number | null>(null);
  
  const onTouchStart = (e: React.TouchEvent) => {
    handleTouchStart.current = e.touches[0].clientX;
  };
  
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!handleTouchStart.current) return;
    
    const touchEnd = e.changedTouches[0].clientX;
    const diff = handleTouchStart.current - touchEnd;
    
    // Swipe threshold
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext(e as any);
      } else {
        goToPrevious(e as any);
      }
    }
    
    handleTouchStart.current = null;
  };

  // Function to check if all or most images are loaded
  const areImagesReady = useCallback(() => {
    const loadedCount = imagesLoaded.filter(Boolean).length;
    return loadedCount > 0 && loadedCount >= photos.length * 0.7; // 70% loaded is good enough
  }, [imagesLoaded, photos.length]);
  
  return (
    <div className="py-8">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl md:text-3xl font-bold text-white mb-6 neon-text"
      >
        {title}
      </motion.h2>

      {/* Loading indicator */}
      {!areImagesReady() && (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-blue"></div>
        </div>
      )}

      <div className={`transition-opacity duration-500 ${areImagesReady() ? 'opacity-100' : 'opacity-0'}`}>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {photos.map((photo, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: imagesLoaded[index] ? 1 : 0, y: imagesLoaded[index] ? 0 : 20 }}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5, 
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  transition={{ duration: 0.4 }}
                  className="aspect-video overflow-hidden rounded-lg cursor-pointer glass"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={photo}
                    alt={`Foto do local ${index + 1}`}
                    className={cn(
                      "w-full h-full object-cover transition-transform duration-500",
                      "hover:scale-110"
                    )}
                    loading="lazy"
                    onLoad={() => handleImageLoad(index)}
                  />
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className={cn(
            "left-0 md:-left-12 bg-neon-blue/20 text-white border-neon-blue hover:bg-neon-blue hover:text-black",
            isMobile ? "flex absolute -bottom-12 left-1/4 top-auto translate-x-0" : ""
          )} />
          <CarouselNext className={cn(
            "right-0 md:-right-12 bg-neon-blue/20 text-white border-neon-blue hover:bg-neon-blue hover:text-black",
            isMobile ? "flex absolute -bottom-12 right-1/4 top-auto translate-x-0" : ""
          )} />
        </Carousel>
      </div>
      
      {/* Spacing for mobile controls */}
      {isMobile && <div className="h-16"></div>}
      
      {/* Lightbox */}
      {activeIndex !== null && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative max-w-4xl max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={photos[currentImageIndex]} 
              alt={`Foto ampliada ${currentImageIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain"
            />
            
            {/* Navigation controls */}
            <button 
              className="absolute top-[50%] left-2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center transform -translate-y-1/2 hover:bg-neon-blue/30 transition-colors"
              onClick={goToPrevious}
            >
              <ChevronLeft size={isMobile ? 20 : 24} />
            </button>
            
            <button 
              className="absolute top-[50%] right-2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center transform -translate-y-1/2 hover:bg-neon-blue/30 transition-colors"
              onClick={goToNext}
            >
              <ChevronRight size={isMobile ? 20 : 24} />
            </button>
            
            {/* Close button */}
            <button 
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-red-500/50 transition-colors"
              onClick={closeLightbox}
            >
              <X size={isMobile ? 18 : 20} />
            </button>
            
            <div className="absolute bottom-4 left-0 right-0 text-center text-white bg-black/40 py-2 rounded-md backdrop-blur-sm">
              {currentImageIndex + 1} / {photos.length}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default PhotoGallery;

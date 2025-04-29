
import React, { useState } from "react";
import { motion } from "framer-motion";
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
  
  const openLightbox = (index: number) => {
    setActiveIndex(index);
  };
  
  const closeLightbox = () => {
    setActiveIndex(null);
  };
  
  return (
    <div className="py-8">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-white mb-6"
      >
        {title}
      </motion.h2>

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
              className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5, 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                transition={{ duration: 0.4 }}
                className="aspect-video overflow-hidden rounded-lg cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={photo}
                  alt={`Foto do local ${index + 1}`}
                  className={cn(
                    "w-full h-full object-cover transition-transform duration-500",
                    "hover:scale-110"
                  )}
                />
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 md:-left-12 bg-neon-blue/20 text-white border-neon-blue hover:bg-neon-blue hover:text-black" />
        <CarouselNext className="right-0 md:-right-12 bg-neon-blue/20 text-white border-neon-blue hover:bg-neon-blue hover:text-black" />
      </Carousel>
      
      {/* Lightbox */}
      {activeIndex !== null && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative max-w-4xl max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={photos[activeIndex]} 
              alt={`Foto ampliada ${activeIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain"
            />
            <button 
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center"
              onClick={closeLightbox}
            >
              ✕
            </button>
            <div className="absolute bottom-4 left-0 right-0 text-center text-white">
              {activeIndex + 1} / {photos.length}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default PhotoGallery;

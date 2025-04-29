
import React from "react";
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
  return (
    <div className="py-8">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-white mb-6"
      >
        {title} <span className="neon-text">do Evento</span>
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
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="aspect-video overflow-hidden rounded-lg"
              >
                <img
                  src={photo}
                  alt={`Foto do evento ${index + 1}`}
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
    </div>
  );
};

export default PhotoGallery;

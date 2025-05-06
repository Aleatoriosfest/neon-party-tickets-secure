
import React from 'react';
import { cn } from '@/lib/utils';

interface SmallDotsPaginationProps {
  count: number;
  active: number;
  onDotClick?: (index: number) => void;
}

const SmallDotsPagination: React.FC<SmallDotsPaginationProps> = ({ 
  count, 
  active, 
  onDotClick 
}) => {
  return (
    <div className="flex justify-center gap-1 mt-2">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick && onDotClick(index)}
          className={cn(
            "w-1.5 h-1.5 rounded-full transition-all duration-300", 
            active === index 
              ? "bg-neon-blue scale-125" 
              : "bg-gray-500 hover:bg-gray-400"
          )}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default SmallDotsPagination;

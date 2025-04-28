
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ArtistCardProps {
  name: string;
  role: string;
  image: string;
  description?: string;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ name, role, image, description }) => {
  return (
    <Card className="glass hover:border-neon-purple/50 transition-colors duration-300">
      <CardContent className="flex flex-col items-center p-6">
        <Avatar className="w-24 h-24 mb-4 ring-2 ring-neon-purple/50">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback className="bg-light-gray text-neon-purple">
            {name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
        <p className="text-sm text-neon-purple mb-2">{role}</p>
        {description && (
          <p className="text-sm text-gray-300 text-center">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ArtistCard;

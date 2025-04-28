
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-md border-b border-light-gray">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold neon-text">Projeto X</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6 text-sm">
            <Link to="/" className="text-white hover:text-neon-blue transition-colors">
              Home
            </Link>
            <Link to="/eventos" className="text-white hover:text-neon-blue transition-colors">
              Eventos
            </Link>
            <Link to="/meus-ingressos" className="text-white hover:text-neon-blue transition-colors">
              Meus Ingressos
            </Link>
            <Link to="/sobre" className="text-white hover:text-neon-blue transition-colors">
              Sobre
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="hidden md:flex border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-black">
              Entrar
            </Button>
            <Avatar className="h-8 w-8 ring-2 ring-neon-blue/50 cursor-pointer hover:ring-neon-blue transition-all">
              <AvatarImage src="" />
              <AvatarFallback className="bg-light-gray text-neon-blue">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

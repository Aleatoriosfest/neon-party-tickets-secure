import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/contexts/AuthContext';
import { Shield, Ticket, User, Settings, LogOut, CalendarPlus, BarChart } from 'lucide-react';

const Navbar: React.FC = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-md border-b border-light-gray">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold neon-text">Aleatórios Fest</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6 text-sm">
            <Link to="/" className="text-white hover:text-neon-blue transition-colors">
              Home
            </Link>
            <Link to="/eventos" className="text-white hover:text-neon-blue transition-colors">
              Eventos
            </Link>
            {user && (
              <Link to="/meus-ingressos" className="text-white hover:text-neon-blue transition-colors">
                Meus Ingressos
              </Link>
            )}
            <Link to="/sobre" className="text-white hover:text-neon-blue transition-colors">
              Sobre
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="hidden md:inline text-white">Olá, {user.name}</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar 
                      className="h-8 w-8 ring-2 ring-neon-blue/50 cursor-pointer hover:ring-neon-blue transition-all"
                    >
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-light-gray text-neon-blue">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-dark-gray border-light-gray text-white">
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="rounded-full h-8 w-8 bg-neon-purple/20 flex items-center justify-center">
                        <User className="h-4 w-4 text-neon-purple" />
                      </div>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator className="bg-gray-700" />
                    
                    {/* Admin specific menu items */}
                    {isAdmin && (
                      <>
                        <DropdownMenuItem 
                          className="cursor-pointer hover:bg-gray-800"
                          onClick={() => handleNavigate('/admin/dashboard')}
                        >
                          <Shield className="mr-2 h-4 w-4" />
                          <span>Painel de Controle</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="cursor-pointer hover:bg-gray-800"
                          onClick={() => handleNavigate('/admin')}
                        >
                          <CalendarPlus className="mr-2 h-4 w-4" />
                          <span>Gerenciar Eventos</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="cursor-pointer hover:bg-gray-800"
                          onClick={() => handleNavigate('/admin')}
                        >
                          <BarChart className="mr-2 h-4 w-4" />
                          <span>Ver Ingressos Vendidos</span>
                        </DropdownMenuItem>
                      </>
                    )}
                    
                    {/* Regular user menu items */}
                    {!isAdmin && (
                      <>
                        <DropdownMenuItem 
                          className="cursor-pointer hover:bg-gray-800"
                          onClick={() => handleNavigate('/meus-ingressos')}
                        >
                          <Ticket className="mr-2 h-4 w-4" />
                          <span>Meus Ingressos</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="cursor-pointer hover:bg-gray-800"
                          onClick={() => handleNavigate('/minha-conta')}
                        >
                          <User className="mr-2 h-4 w-4" />
                          <span>Editar Perfil</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="cursor-pointer hover:bg-gray-800"
                          onClick={() => handleNavigate('/minha-conta')}
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Trocar Senha</span>
                        </DropdownMenuItem>
                      </>
                    )}
                    
                    <DropdownMenuSeparator className="bg-gray-700" />
                    <DropdownMenuItem 
                      className="cursor-pointer hover:bg-gray-800 text-red-400"
                      onClick={() => signOut()}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sair</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="hidden md:flex border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-black"
                  onClick={() => navigate('/auth')}
                  data-login-button="true"
                >
                  Entrar
                </Button>
                
                <Avatar 
                  className="h-8 w-8 ring-2 ring-neon-blue/50 cursor-pointer hover:ring-neon-blue transition-all"
                  onClick={() => navigate('/auth')}
                >
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-light-gray text-neon-blue">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </AvatarFallback>
                </Avatar>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;


import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/contexts/AuthContext';
import { 
  Shield, 
  Ticket, 
  User, 
  Settings, 
  LogOut, 
  CalendarPlus, 
  BarChart, 
  Menu, 
  Home, 
  X, 
  Mail,
  Key
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Close mobile menu when navigating or resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavigate = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-md border-b border-light-gray">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {/* Mobile menu toggle */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden mr-2" 
                onClick={toggleMobileMenu}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
              
              <Link to="/" className="flex items-center">
                <span className="text-xl md:text-2xl font-bold neon-text">Aleatórios Fest</span>
              </Link>
            </div>
            
            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center space-x-6 text-sm">
              <Link to="/" className="text-white hover:text-neon-blue transition-colors py-2">
                Home
              </Link>
              <Link to="/eventos" className="text-white hover:text-neon-blue transition-colors py-2">
                Eventos
              </Link>
              {user && !isAdmin && (
                <Link to="/meus-ingressos" className="text-white hover:text-neon-blue transition-colors py-2">
                  Meus Ingressos
                </Link>
              )}
              <Link to="/sobre" className="text-white hover:text-neon-blue transition-colors py-2">
                Sobre
              </Link>
            </nav>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="hidden md:inline text-white">{user.name}</span>
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
                            className="cursor-pointer hover:bg-gray-800 h-10"
                            onClick={() => handleNavigate('/admin/dashboard')}
                          >
                            <Shield className="mr-2 h-4 w-4" />
                            <span>Painel administrativo</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="cursor-pointer hover:bg-gray-800 h-10"
                            onClick={() => handleNavigate('/admin')}
                          >
                            <CalendarPlus className="mr-2 h-4 w-4" />
                            <span>Gerenciar eventos</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="cursor-pointer hover:bg-gray-800 h-10"
                            onClick={() => handleNavigate('/admin')}
                          >
                            <BarChart className="mr-2 h-4 w-4" />
                            <span>Ver ingressos vendidos</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="cursor-pointer hover:bg-gray-800 h-10"
                            onClick={() => handleNavigate('/admin')}
                          >
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Configurações</span>
                          </DropdownMenuItem>
                        </>
                      )}
                      
                      {/* Regular user menu items */}
                      {!isAdmin && (
                        <>
                          <DropdownMenuItem 
                            className="cursor-pointer hover:bg-gray-800 h-10"
                            onClick={() => handleNavigate('/meus-ingressos')}
                          >
                            <Ticket className="mr-2 h-4 w-4" />
                            <span>Meus ingressos</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="cursor-pointer hover:bg-gray-800 h-10"
                            onClick={() => handleNavigate('/minha-conta')}
                          >
                            <User className="mr-2 h-4 w-4" />
                            <span>Minha conta</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="cursor-pointer hover:bg-gray-800 h-10"
                            onClick={() => handleNavigate('/minha-conta/email')}
                          >
                            <Mail className="mr-2 h-4 w-4" />
                            <span>Trocar e-mail</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="cursor-pointer hover:bg-gray-800 h-10"
                            onClick={() => handleNavigate('/minha-conta/senha')}
                          >
                            <Key className="mr-2 h-4 w-4" />
                            <span>Trocar senha</span>
                          </DropdownMenuItem>
                        </>
                      )}
                      
                      <DropdownMenuSeparator className="bg-gray-700" />
                      <DropdownMenuItem 
                        className="cursor-pointer hover:bg-gray-800 text-red-400 h-10"
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
                      <User className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[56px] left-0 right-0 bg-dark/95 backdrop-blur-lg border-b border-light-gray z-40 p-4"
          >
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className="flex items-center px-4 py-3 text-white hover:bg-light-gray/10 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Home className="mr-3 h-5 w-5" />
                Home
              </Link>
              <Link 
                to="/eventos" 
                className="flex items-center px-4 py-3 text-white hover:bg-light-gray/10 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                <CalendarPlus className="mr-3 h-5 w-5" />
                Eventos
              </Link>
              {user && !isAdmin && (
                <Link 
                  to="/meus-ingressos" 
                  className="flex items-center px-4 py-3 text-white hover:bg-light-gray/10 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Ticket className="mr-3 h-5 w-5" />
                  Meus Ingressos
                </Link>
              )}
              {isAdmin && (
                <Link 
                  to="/admin/dashboard" 
                  className="flex items-center px-4 py-3 text-white hover:bg-light-gray/10 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Shield className="mr-3 h-5 w-5" />
                  Painel Admin
                </Link>
              )}
              <Link 
                to="/sobre" 
                className="flex items-center px-4 py-3 text-white hover:bg-light-gray/10 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="mr-3 h-5 w-5" />
                Sobre
              </Link>
              
              {!user && (
                <div className="pt-2">
                  <Button 
                    onClick={() => navigate('/auth')}
                    className="w-full bg-neon-purple hover:bg-neon-purple/80"
                  >
                    Login / Cadastro
                  </Button>
                </div>
              )}
              
              {user && (
                <Button 
                  onClick={() => signOut()}
                  variant="destructive"
                  className="mt-2"
                >
                  <LogOut className="mr-2 h-4 w-4" /> Sair
                </Button>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

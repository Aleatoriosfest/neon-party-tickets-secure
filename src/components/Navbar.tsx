
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Navbar: React.FC = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate login process
    setTimeout(() => {
      // For demo purposes, hardcoding two test accounts
      if (
        (email === 'admin@aleatoriosfest.com' && password === 'Admin123!') || 
        (email === 'customer@aleatoriosfest.com' && password === 'Customer123!')
      ) {
        const user = {
          email,
          role: email.includes('admin') ? 'admin' : 'customer',
          name: email.includes('admin') ? 'Administrador' : 'Cliente'
        };
        
        localStorage.setItem('currentUser', JSON.stringify(user));
        toast.success(`Login realizado com sucesso! Bem-vindo(a), ${user.name}!`);
        setShowAuthModal(false);
        
        // If there's a redirect URL stored, navigate to it
        const redirectUrl = sessionStorage.getItem('redirectAfterLogin');
        if (redirectUrl) {
          sessionStorage.removeItem('redirectAfterLogin');
          // Allow time for toast to show before redirect
          setTimeout(() => {
            window.location.href = redirectUrl;
          }, 1000);
        }
      } else {
        toast.error('Credenciais inválidas. Tente novamente.');
      }
      setIsProcessing(false);
    }, 1000);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Validações do formulário
    if (password !== confirmPassword) {
      toast.error('As senhas não coincidem. Tente novamente.');
      setIsProcessing(false);
      return;
    }

    if (password.length < 8) {
      toast.error('A senha deve ter pelo menos 8 caracteres.');
      setIsProcessing(false);
      return;
    }
    
    // Simulate registration process
    setTimeout(() => {
      // Create a new user (in a real app, this would be sent to a backend)
      const user = {
        email,
        name,
        role: 'customer'
      };
      
      localStorage.setItem('currentUser', JSON.stringify(user));
      toast.success(`Cadastro realizado com sucesso! Bem-vindo(a), ${name}!`);
      setShowAuthModal(false);
      
      // If there's a redirect URL stored, navigate to it
      const redirectUrl = sessionStorage.getItem('redirectAfterLogin');
      if (redirectUrl) {
        sessionStorage.removeItem('redirectAfterLogin');
        // Allow time for toast to show before redirect
        setTimeout(() => {
          window.location.href = redirectUrl;
        }, 1000);
      }
      
      setIsProcessing(false);
    }, 1500);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    toast.info('Logout realizado com sucesso!');
  };

  // Check if user is logged in
  const currentUser = localStorage.getItem('currentUser') 
    ? JSON.parse(localStorage.getItem('currentUser') || '{}') 
    : null;

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
            <Link to="/meus-ingressos" className="text-white hover:text-neon-blue transition-colors">
              Meus Ingressos
            </Link>
            <Link to="/sobre" className="text-white hover:text-neon-blue transition-colors">
              Sobre
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                <span className="hidden md:inline text-white">Olá, {currentUser.name}</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="hidden md:flex border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-black"
                  onClick={handleLogout}
                >
                  Sair
                </Button>
              </>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                className="hidden md:flex border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-black"
                onClick={() => setShowAuthModal(true)}
                data-login-button="true"
              >
                Entrar
              </Button>
            )}
            
            <Avatar 
              className="h-8 w-8 ring-2 ring-neon-blue/50 cursor-pointer hover:ring-neon-blue transition-all"
              onClick={() => setShowAuthModal(true)}
            >
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

      {/* Auth Modal with Tabs for Login/Register */}
      <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
        <DialogContent className="sm:max-w-md bg-dark-gray text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl text-neon-blue">Acesso</DialogTitle>
            <DialogDescription className="text-gray-300">
              Faça login ou crie sua conta para ter acesso completo ao site.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" className="text-white">Login</TabsTrigger>
              <TabsTrigger value="register" className="text-white">Criar Conta</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="bg-gray-800 border-gray-700 focus:border-neon-blue"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-800 border-gray-700 focus:border-neon-blue"
                    required
                  />
                </div>

                <div className="bg-gray-900 p-3 rounded-md text-sm">
                  <p className="text-gray-400 mb-1">Contas de teste disponíveis:</p>
                  <p className="text-neon-blue">Admin: admin@aleatoriosfest.com / Admin123!</p>
                  <p className="text-neon-purple">Cliente: customer@aleatoriosfest.com / Customer123!</p>
                </div>

                <DialogFooter>
                  <Button 
                    type="submit"
                    disabled={isProcessing} 
                    className="w-full bg-neon-blue hover:bg-neon-blue/80 text-black"
                  >
                    {isProcessing ? 'Processando...' : 'Entrar'}
                  </Button>
                </DialogFooter>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name">Nome Completo</Label>
                  <Input
                    id="register-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome completo"
                    className="bg-gray-800 border-gray-700 focus:border-neon-blue"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    id="register-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="bg-gray-800 border-gray-700 focus:border-neon-blue"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Senha</Label>
                  <Input
                    id="register-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-800 border-gray-700 focus:border-neon-blue"
                    placeholder="Mínimo 8 caracteres"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-confirm-password">Confirmar Senha</Label>
                  <Input
                    id="register-confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-gray-800 border-gray-700 focus:border-neon-blue"
                    placeholder="Confirme sua senha"
                    required
                  />
                </div>

                <DialogFooter>
                  <Button 
                    type="submit"
                    disabled={isProcessing} 
                    className="w-full bg-neon-purple hover:bg-neon-purple/80 text-white"
                  >
                    {isProcessing ? 'Processando...' : 'Criar Conta'}
                  </Button>
                </DialogFooter>
              </form>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Navbar;

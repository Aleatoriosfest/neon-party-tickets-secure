
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Auth: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  // If user is already logged in, redirect to appropriate page
  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/minha-conta');
      }
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      await signIn(email, password);
      // Redirect is handled in AuthContext
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Form validation
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
    
    try {
      await signUp(email, password, name, 'user');
      // Redirect is handled in AuthContext
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center py-16 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="bg-dark-gray border-light-gray shadow-lg neon-blue-border">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-white neon-text">
                {activeTab === 'login' ? 'Entrar' : 'Criar Conta'}
              </CardTitle>
              <CardDescription className="text-gray-400">
                {activeTab === 'login' 
                  ? 'Entre com suas credenciais para acessar sua conta' 
                  : 'Preencha o formulário para criar sua nova conta'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'login' | 'register')} className="w-full">
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
                      <p className="neon-text-purple">Cliente: customer@aleatoriosfest.com / Customer123!</p>
                    </div>

                    <Button 
                      type="submit"
                      disabled={isProcessing} 
                      className="w-full bg-neon-blue hover:bg-neon-blue/80 text-black"
                    >
                      {isProcessing ? 'Processando...' : 'Entrar'}
                    </Button>
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

                    <Button 
                      type="submit"
                      disabled={isProcessing} 
                      className="w-full bg-neon-purple hover:bg-neon-purple/80 text-white"
                    >
                      {isProcessing ? 'Processando...' : 'Criar Conta'}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Auth;

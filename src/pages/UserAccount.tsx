
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from '@/components/ui/sonner';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { UserRound, KeyRound, Ticket, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const profileSchema = z.object({
  name: z.string().min(2, { message: 'Nome deve ter pelo menos 2 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(6, { message: 'Senha deve ter pelo menos 6 caracteres' }),
  newPassword: z.string().min(6, { message: 'Senha deve ter pelo menos 6 caracteres' }),
  confirmPassword: z.string().min(6, { message: 'Senha deve ter pelo menos 6 caracteres' }),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

const emailSchema = z.object({
  newEmail: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(6, { message: 'Senha deve ter pelo menos 6 caracteres' }),
});

const UserAccount: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();
  
  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });
  
  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      newEmail: '',
      password: '',
    },
  });
  
  useEffect(() => {
    if (user) {
      profileForm.reset({
        name: user.name,
        email: user.email,
      });
    }
  }, [user]);

  const onProfileSubmit = async (values: z.infer<typeof profileSchema>) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('usuarios')
        .update({ 
          name: values.name 
        })
        .eq('id', user.id);

      if (error) throw error;
      toast.success('Perfil atualizado com sucesso!');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao atualizar perfil');
    }
  };

  const onPasswordSubmit = async (values: z.infer<typeof passwordSchema>) => {
    try {
      const { error } = await supabase.auth.updateUser({ 
        password: values.newPassword 
      });

      if (error) throw error;
      
      toast.success('Senha atualizada com sucesso!');
      passwordForm.reset();
    } catch (error: any) {
      toast.error(error.message || 'Erro ao atualizar senha');
    }
  };

  const onEmailSubmit = async (values: z.infer<typeof emailSchema>) => {
    try {
      const { error } = await supabase.auth.updateUser({ 
        email: values.newEmail 
      });

      if (error) throw error;
      
      toast.success('Email atualizado com sucesso! Verifique sua caixa de entrada para confirmar.');
      emailForm.reset();
    } catch (error: any) {
      toast.error(error.message || 'Erro ao atualizar email');
    }
  };

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      
      <div className="container mx-auto pt-24 pb-16 px-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-white mb-2"
        >
          Minha <span className="neon-text">Conta</span>
        </motion.h1>
        <p className="text-gray-400 mb-8">Gerencie suas informações pessoais</p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass rounded-lg p-4"
            >
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
                    activeTab === "profile"
                      ? "bg-neon-purple/20 text-neon-purple"
                      : "text-white hover:bg-light-gray/10"
                  }`}
                >
                  <UserRound size={20} />
                  <span>Perfil</span>
                </button>
                <button
                  onClick={() => setActiveTab("email")}
                  className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
                    activeTab === "email"
                      ? "bg-neon-blue/20 text-neon-blue"
                      : "text-white hover:bg-light-gray/10"
                  }`}
                >
                  <Mail size={20} />
                  <span>Trocar E-mail</span>
                </button>
                <button
                  onClick={() => setActiveTab("password")}
                  className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
                    activeTab === "password"
                      ? "bg-neon-green/20 text-green-400"
                      : "text-white hover:bg-light-gray/10"
                  }`}
                >
                  <KeyRound size={20} />
                  <span>Trocar Senha</span>
                </button>
                <button
                  onClick={() => navigate('/meus-ingressos')}
                  className="flex items-center gap-3 w-full p-3 rounded-lg transition-colors text-white hover:bg-light-gray/10"
                >
                  <Ticket size={20} />
                  <span>Meus Ingressos</span>
                </button>
              </nav>
            </motion.div>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <Card className="bg-dark-gray text-white border-light-gray neon-purple-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <UserRound className="text-neon-purple" />
                      Editar Perfil
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Atualize suas informações pessoais
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...profileForm}>
                      <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                        <FormField
                          control={profileForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Seu nome" 
                                  {...field} 
                                  className="bg-gray-800 border-gray-700 focus:ring-neon-purple focus:border-neon-purple"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={profileForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="seu@email.com" 
                                  {...field} 
                                  disabled
                                  className="bg-gray-800 border-gray-700 opacity-70"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit" className="bg-neon-purple hover:bg-neon-purple/80 w-full sm:w-auto">
                          Salvar Alterações
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              )}
              
              {/* Email Tab */}
              {activeTab === "email" && (
                <Card className="bg-dark-gray text-white border-light-gray neon-blue-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="text-neon-blue" />
                      Alterar E-mail
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Atualize seu endereço de e-mail
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...emailForm}>
                      <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-6">
                        <FormField
                          control={emailForm.control}
                          name="newEmail"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Novo E-mail</FormLabel>
                              <FormControl>
                                <Input 
                                  type="email" 
                                  placeholder="novo@email.com" 
                                  {...field} 
                                  className="bg-gray-800 border-gray-700 focus:ring-neon-blue focus:border-neon-blue"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={emailForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Senha Atual (para confirmar)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="password" 
                                  placeholder="••••••••" 
                                  {...field} 
                                  className="bg-gray-800 border-gray-700 focus:ring-neon-blue focus:border-neon-blue"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit" className="bg-neon-blue hover:bg-neon-blue/80 w-full sm:w-auto">
                          Atualizar E-mail
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              )}
              
              {/* Password Tab */}
              {activeTab === "password" && (
                <Card className="bg-dark-gray text-white border-light-gray neon-green-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <KeyRound className="text-green-400" />
                      Alterar Senha
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Atualize sua senha de acesso
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...passwordForm}>
                      <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
                        <FormField
                          control={passwordForm.control}
                          name="currentPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Senha Atual</FormLabel>
                              <FormControl>
                                <Input 
                                  type="password" 
                                  placeholder="••••••••" 
                                  {...field} 
                                  className="bg-gray-800 border-gray-700"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={passwordForm.control}
                          name="newPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nova Senha</FormLabel>
                              <FormControl>
                                <Input 
                                  type="password" 
                                  placeholder="••••••••" 
                                  {...field} 
                                  className="bg-gray-800 border-gray-700"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={passwordForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirmar Nova Senha</FormLabel>
                              <FormControl>
                                <Input 
                                  type="password" 
                                  placeholder="••••••••" 
                                  {...field} 
                                  className="bg-gray-800 border-gray-700"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit" className="bg-green-500 hover:bg-green-600 w-full sm:w-auto">
                          Atualizar Senha
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default UserAccount;

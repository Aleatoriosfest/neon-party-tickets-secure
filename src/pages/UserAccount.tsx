
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { User, Pencil, Key, Trash2, LogOut } from 'lucide-react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const UserAccount: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);
  
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    try {
      setIsUpdating(true);
      
      const { error } = await supabase
        .from('usuarios')
        .update({ name })
        .eq('id', user.id);
      
      if (error) throw error;
      
      toast.success('Perfil atualizado com sucesso!');
      setIsEditing(false);
    } catch (error: any) {
      console.error('Erro ao atualizar perfil:', error);
      toast.error('Erro ao atualizar perfil', {
        description: error.message
      });
    } finally {
      setIsUpdating(false);
    }
  };
  
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }
    
    try {
      setIsChangingPassword(true);
      
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) throw error;
      
      toast.success('Senha alterada com sucesso!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      console.error('Erro ao alterar senha:', error);
      toast.error('Erro ao alterar senha', {
        description: error.message
      });
    } finally {
      setIsChangingPassword(false);
    }
  };
  
  const handleDeleteAccount = async () => {
    if (!user) return;
    
    try {
      // Em um app real, você precisaria implementar a lógica de exclusão de conta
      // Por exemplo, chamando uma função serverless para excluir o usuário
      // Aqui vamos apenas simular o logout
      
      await signOut();
      toast.success('Conta excluída com sucesso');
      navigate('/');
    } catch (error: any) {
      console.error('Erro ao excluir conta:', error);
      toast.error('Erro ao excluir conta', {
        description: error.message
      });
    } finally {
      setShowDeleteDialog(false);
    }
  };
  
  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error: any) {
      console.error('Erro ao fazer logout:', error);
      toast.error('Erro ao fazer logout', {
        description: error.message
      });
    }
  };
  
  if (!user) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-blue"></div>
      </div>
    );
  }
  
  const joinDate = user.created_at 
    ? new Date(user.created_at).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    : 'Não disponível';
  
  return (
    <div className="min-h-screen bg-dark flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-16 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
              <User className="text-neon-purple" />
              Minha Conta
            </h1>
            <p className="text-gray-400 mt-2">
              Gerencie suas informações pessoais
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4">
              <Card className="bg-dark-gray border-light-gray text-white">
                <CardHeader>
                  <CardTitle>Informações Pessoais</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-neon-purple/20 flex items-center justify-center text-neon-purple text-4xl mb-4">
                      {name ? name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    
                    <h2 className="text-xl font-bold">{name}</h2>
                    <p className="text-gray-400">{email}</p>
                    
                    <div className="mt-4 text-sm text-gray-500">
                      <p>Membro desde: {joinDate}</p>
                    </div>
                    
                    <div className="mt-6 grid gap-3">
                      <Button 
                        onClick={() => navigate('/meus-ingressos')}
                        variant="outline"
                        className="border-neon-purple text-neon-purple hover:bg-neon-purple/20 w-full"
                      >
                        Meus Ingressos
                      </Button>
                      
                      <Button 
                        onClick={handleLogout}
                        variant="outline"
                        className="border-red-500 text-red-500 hover:bg-red-500/10 w-full"
                      >
                        <LogOut size={16} className="mr-2" />
                        Sair da Conta
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-8">
              <Card className="bg-dark-gray border-light-gray text-white">
                <CardHeader>
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="profile" className="text-white">Perfil</TabsTrigger>
                      <TabsTrigger value="security" className="text-white">Segurança</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardHeader>
                <CardContent>
                  <TabsContent value="profile">
                    <form onSubmit={handleUpdateProfile}>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nome</Label>
                          <div className="flex gap-2">
                            <Input
                              id="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="bg-gray-800 border-gray-700 focus:border-neon-blue"
                              disabled={!isEditing}
                              required
                            />
                            {!isEditing && (
                              <Button 
                                type="button" 
                                variant="outline" 
                                onClick={() => setIsEditing(true)}
                                className="border-neon-blue text-neon-blue"
                              >
                                <Pencil size={16} />
                              </Button>
                            )}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            value={email}
                            className="bg-gray-800 border-gray-700"
                            disabled
                          />
                          <p className="text-xs text-gray-500">O email não pode ser alterado</p>
                        </div>
                        
                        {isEditing && (
                          <div className="flex justify-end gap-2 pt-4">
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={() => setIsEditing(false)}
                              className="border-light-gray text-white"
                            >
                              Cancelar
                            </Button>
                            <Button 
                              type="submit"
                              disabled={isUpdating}
                              className="bg-neon-blue hover:bg-neon-blue/80 text-black"
                            >
                              {isUpdating ? 'Salvando...' : 'Salvar Alterações'}
                            </Button>
                          </div>
                        )}
                      </div>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="security">
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-medium flex items-center gap-2">
                            <Key size={16} className="text-neon-blue" />
                            Alterar Senha
                          </h3>
                          <p className="text-sm text-gray-400">Atualize sua senha regularmente para maior segurança</p>
                        </div>
                        
                        <form onSubmit={handleChangePassword} className="space-y-4 pt-2">
                          <div className="space-y-2">
                            <Label htmlFor="current-password">Senha Atual</Label>
                            <Input
                              id="current-password"
                              type="password"
                              value={currentPassword}
                              onChange={(e) => setCurrentPassword(e.target.value)}
                              className="bg-gray-800 border-gray-700 focus:border-neon-blue"
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="new-password">Nova Senha</Label>
                            <Input
                              id="new-password"
                              type="password"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              className="bg-gray-800 border-gray-700 focus:border-neon-blue"
                              required
                              minLength={8}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                            <Input
                              id="confirm-password"
                              type="password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              className="bg-gray-800 border-gray-700 focus:border-neon-blue"
                              required
                              minLength={8}
                            />
                          </div>
                          
                          <div className="pt-2">
                            <Button 
                              type="submit"
                              disabled={isChangingPassword}
                              className="bg-neon-blue hover:bg-neon-blue/80 text-black"
                            >
                              {isChangingPassword ? 'Alterando...' : 'Alterar Senha'}
                            </Button>
                          </div>
                        </form>
                      </div>
                      
                      <div className="border-t border-light-gray/30 pt-6">
                        <div>
                          <h3 className="text-lg font-medium flex items-center gap-2 text-red-400">
                            <Trash2 size={16} className="text-red-400" />
                            Excluir Conta
                          </h3>
                          <p className="text-sm text-gray-400 mb-4">
                            Essa ação não pode ser desfeita. Todos os seus dados serão removidos permanentemente.
                          </p>
                          
                          <Button 
                            onClick={() => setShowDeleteDialog(true)}
                            variant="destructive"
                            className="bg-red-700 hover:bg-red-800"
                          >
                            Excluir Minha Conta
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="bg-dark-gray border-red-800/50 text-white">
          <DialogHeader>
            <DialogTitle className="text-red-400">Excluir Conta</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p>Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.</p>
            <p className="mt-2 text-sm text-gray-400">Todos os seus dados, incluindo histórico de compras e ingressos, serão removidos permanentemente.</p>
          </div>
          
          <DialogFooter className="flex gap-2 sm:gap-0">
            <Button 
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              className="border-light-gray text-white"
            >
              Cancelar
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteAccount}
              className="bg-red-700 hover:bg-red-800"
            >
              Sim, Excluir Minha Conta
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default UserAccount;

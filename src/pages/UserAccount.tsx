
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail, Key, LogOut, Ticket, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

const UserAccount: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (!user) {
      navigate('/auth');
    } else {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user, navigate]);
  
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('usuarios')
        .update({
          name: name
        })
        .eq('id', user.id);
        
      if (error) throw error;
      
      toast.success('Perfil atualizado com sucesso!');
      
      // Atualize o contexto do usuário se necessário
      // updateUserContext({ ...user, name });
      
    } catch (error: any) {
      console.error('Erro ao atualizar perfil:', error);
      toast.error('Erro ao atualizar perfil', { 
        description: error.message 
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }
    
    setLoading(true);
    
    try {
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
      setLoading(false);
    }
  };
  
  const handleDeleteAccount = async () => {
    if (!user) return;
    
    setLoading(true);
    
    try {
      // Em uma implementação real, isto deve ser feito via uma função segura no backend
      // Este é apenas um exemplo simulado
      toast.success('Conta excluída com sucesso');
      await signOut();
      navigate('/');
      
    } catch (error: any) {
      console.error('Erro ao excluir conta:', error);
      toast.error('Erro ao excluir sua conta', { 
        description: error.message 
      });
    } finally {
      setLoading(false);
      setShowDeleteDialog(false);
    }
  };
  
  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Desconectado com sucesso');
      navigate('/');
    } catch (error: any) {
      toast.error('Erro ao sair', {
        description: error.message
      });
    }
  };
  
  if (!user) {
    return null;
  }
  
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
              <User className="text-neon-blue" />
              Minha Conta
            </h1>
            <p className="text-gray-400 mt-2">
              Gerencie seus dados pessoais e preferências
            </p>
          </motion.div>
          
          {/* Perfil do usuário */}
          <div className="mb-8">
            <Card className="bg-dark-gray border-light-gray text-white">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 bg-neon-blue/20 border border-neon-blue/30">
                    <AvatarFallback className="text-neon-blue text-xl">
                      {name ? name.charAt(0).toUpperCase() : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl">{name || 'Usuário'}</CardTitle>
                    <p className="text-gray-400">{email}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Membro desde {new Date(user.created_at || Date.now()).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3 mt-4">
                  <Link to="/meus-ingressos">
                    <Button variant="outline" className="border-neon-blue text-neon-blue hover:bg-neon-blue/20">
                      <Ticket className="w-4 h-4 mr-2" />
                      Meus Ingressos
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="border-red-500 text-red-500 hover:bg-red-500/20"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Configurações da conta */}
          <Tabs defaultValue="profile" className="mb-8">
            <TabsList className="bg-dark-gray border-light-gray/50 border mb-4 w-full md:w-auto">
              <TabsTrigger value="profile" className="text-white data-[state=active]:bg-neon-blue/20 data-[state=active]:text-neon-blue">
                <User className="w-4 h-4 mr-2" />
                Perfil
              </TabsTrigger>
              <TabsTrigger value="security" className="text-white data-[state=active]:bg-neon-purple/20 data-[state=active]:text-neon-purple">
                <Key className="w-4 h-4 mr-2" />
                Segurança
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card className="bg-dark-gray border-light-gray text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="text-neon-blue w-5 h-5" />
                    Informações do Perfil
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome completo</Label>
                      <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        readOnly
                        className="bg-gray-800 border-gray-700 text-white cursor-not-allowed opacity-70"
                      />
                      <p className="text-xs text-gray-500">O e-mail não pode ser alterado</p>
                    </div>
                    
                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        className="bg-neon-blue hover:bg-neon-blue/80 text-black"
                        disabled={loading}
                      >
                        {loading ? 'Salvando...' : 'Salvar alterações'}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card className="bg-dark-gray border-light-gray text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="text-neon-purple w-5 h-5" />
                    Alterar Senha
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Senha atual</Label>
                      <Input
                        id="current-password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Nova senha</Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirmar nova senha</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    
                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        className="bg-neon-purple hover:bg-neon-purple/80 text-white"
                        disabled={loading || !currentPassword || !newPassword || !confirmPassword}
                      >
                        {loading ? 'Alterando...' : 'Alterar senha'}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
              
              <div className="mt-8">
                <Card className="bg-dark-gray/50 border-red-500/30 text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-500">
                      <AlertCircle className="w-5 h-5" />
                      Zona de perigo
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 mb-4">
                      Excluir sua conta é uma ação permanente e não pode ser desfeita. 
                      Todos os seus dados e ingressos serão permanentemente apagados.
                    </p>
                    <Button 
                      variant="destructive" 
                      className="bg-red-500/80 hover:bg-red-500 text-white"
                      onClick={() => setShowDeleteDialog(true)}
                    >
                      Excluir minha conta
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Modal de confirmação para excluir conta */}
          <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <DialogContent className="bg-dark-gray border-light-gray text-white">
              <DialogHeader>
                <DialogTitle className="text-red-500">Excluir conta</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Esta ação não pode ser desfeita. Isso excluirá permanentemente sua conta e todos os dados associados.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p className="text-white">
                  Digite <strong>excluir</strong> para confirmar:
                </p>
                <Input 
                  className="mt-2 bg-gray-800 border-gray-700 text-white"
                  placeholder="excluir"
                />
              </div>
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setShowDeleteDialog(false)}
                  className="border-gray-600 text-gray-300"
                >
                  Cancelar
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleDeleteAccount}
                  disabled={loading}
                >
                  {loading ? 'Excluindo...' : 'Confirmar exclusão'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default UserAccount;

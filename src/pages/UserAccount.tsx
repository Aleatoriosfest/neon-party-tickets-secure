
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail, Key, LogOut, Ticket, AlertCircle, QrCode } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import UserTicketCard from '@/components/UserTicketCard';

const UserAccount: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || '');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState<any[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  
  useEffect(() => {
    if (!user) {
      navigate('/auth');
    } else {
      setName(user.name || '');
      setEmail(user.email || '');
      setNickname(user.name || ''); // Initialize nickname with name
      
      // Fetch user tickets
      fetchUserTickets();
    }
  }, [user, navigate]);
  
  const fetchUserTickets = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      setTickets(data || []);
    } catch (error: any) {
      console.error('Error fetching tickets:', error);
      toast.error('Erro ao carregar ingressos');
    }
  };
  
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('usuarios')
        .update({
          name: nickname // Update with the nickname
        })
        .eq('id', user.id);
        
      if (error) throw error;
      
      toast.success('Perfil atualizado com sucesso!');
      
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
  
  const handleViewTicket = (ticket: any) => {
    setSelectedTicket(ticket);
    setShowTicketModal(true);
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
  
  // Mock tickets for display if no real tickets exist
  const mockTickets = [
    {
      id: '1',
      ticket_number: 'ALT-2023-001',
      event_id: '1',
      status: 'ativo',
      price: 30,
      purchase_date: new Date().toISOString(),
      quantity: 1
    }
  ];
  
  // Use real tickets if available, otherwise use mock data
  const displayTickets = tickets.length > 0 ? tickets : mockTickets;
  
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
              Gerencie seus dados pessoais e ingressos
            </p>
          </motion.div>
          
          {/* Perfil do usuário */}
          <div className="mb-8">
            <Card className="bg-dark-gray border-light-gray text-white">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 bg-neon-blue/20 border border-neon-blue/30">
                    <AvatarFallback className="text-neon-blue text-xl">
                      {nickname ? nickname.charAt(0).toUpperCase() : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl">{nickname || 'Usuário'}</CardTitle>
                    <p className="text-gray-400">{email}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Membro desde {new Date(user.created_at || Date.now()).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3 mt-4">
                  <Link to="/eventos">
                    <Button variant="outline" className="border-neon-blue text-neon-blue hover:bg-neon-blue/20">
                      Voltar para Eventos
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
              <TabsTrigger value="tickets" className="text-white data-[state=active]:bg-neon-purple/20 data-[state=active]:text-neon-purple">
                <Ticket className="w-4 h-4 mr-2" />
                Meus Ingressos
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
                    Editar Perfil
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="nickname">Nickname</Label>
                      <Input
                        id="nickname"
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        placeholder="Como deseja ser chamado"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                      <p className="text-xs text-gray-500">Este é o nome que será exibido em sua conta</p>
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
            
            <TabsContent value="tickets">
              <Card className="bg-dark-gray border-light-gray text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Ticket className="text-neon-blue w-5 h-5" />
                    Meus Ingressos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {displayTickets.length > 0 ? (
                    <div className="space-y-6">
                      {displayTickets.map((ticket) => (
                        <div key={ticket.id} className="border border-light-gray/30 rounded-lg p-4">
                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                            <div className="mb-4 md:mb-0">
                              <h3 className="font-bold text-lg">ALEATÓRIOS FEST</h3>
                              <p className="text-gray-400 text-sm">Ingresso #{ticket.ticket_number}</p>
                              <p className="text-gray-400 text-sm">
                                Comprado em: {new Date(ticket.purchase_date).toLocaleDateString('pt-BR')}
                              </p>
                              <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/30 text-green-400">
                                {ticket.status === 'ativo' ? 'Ativo' : 'Usado'}
                              </div>
                            </div>
                            
                            <Button 
                              className="bg-neon-purple hover:bg-neon-purple/80 text-white"
                              onClick={() => handleViewTicket(ticket)}
                            >
                              <QrCode className="w-4 h-4 mr-2" />
                              Visualizar Ingresso
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-400">Você ainda não tem ingressos</p>
                      <Button 
                        className="mt-4 bg-neon-blue hover:bg-neon-blue/80 text-black"
                        onClick={() => navigate('/eventos')}
                      >
                        Ver Eventos Disponíveis
                      </Button>
                    </div>
                  )}
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
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Ticket QR Code Modal */}
      <Dialog open={showTicketModal} onOpenChange={setShowTicketModal}>
        <DialogContent className="bg-dark-gray border-light-gray text-white">
          <DialogHeader>
            <DialogTitle className="text-neon-blue">Seu Ingresso</DialogTitle>
          </DialogHeader>
          <div className="py-4 flex flex-col items-center">
            <div className="bg-white p-4 rounded-lg mb-4">
              {/* Placeholder for QR Code image */}
              <div className="w-48 h-48 bg-black flex items-center justify-center text-white">
                QR Code de {selectedTicket?.ticket_number}
              </div>
            </div>
            <h3 className="text-xl font-bold text-center mb-1">ALEATÓRIOS FEST</h3>
            <p className="text-sm text-gray-400 text-center mb-3">31 de Maio, 2025</p>
            <p className="text-center mb-1">Chácara Monero, Osasco - SP</p>
            <p className="text-center font-semibold text-neon-purple">
              Ingresso #{selectedTicket?.ticket_number}
            </p>
            <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-900/30 text-green-400">
              Válido
            </div>
          </div>
          <DialogFooter>
            <Button 
              onClick={() => setShowTicketModal(false)}
              className="bg-neon-blue hover:bg-neon-blue/80 text-black w-full"
            >
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default UserAccount;

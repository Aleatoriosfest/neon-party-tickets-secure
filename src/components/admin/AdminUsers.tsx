
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, Calendar, Lock, ShieldCheck, ShieldAlert, Search, Eye, Ticket, Ban } from 'lucide-react';

// Mock data for users
const mockUsers = [
  {
    id: "USER-001",
    name: "Marcos Costa",
    email: "marcos@email.com",
    role: "customer",
    tickets: 3,
    status: "active",
    registrationDate: "10 de Março, 2025",
    lastLogin: "03 de Maio, 2025"
  },
  {
    id: "USER-002",
    name: "Laura Santos",
    email: "laura@email.com",
    role: "customer",
    tickets: 2,
    status: "active",
    registrationDate: "15 de Março, 2025",
    lastLogin: "01 de Maio, 2025"
  },
  {
    id: "USER-003",
    name: "Ricardo Ferreira",
    email: "ricardo@email.com",
    role: "customer",
    tickets: 5,
    status: "active",
    registrationDate: "20 de Março, 2025",
    lastLogin: "30 de Abril, 2025"
  },
  {
    id: "USER-004",
    name: "Julia Pereira",
    email: "julia@email.com",
    role: "customer",
    tickets: 1,
    status: "blocked",
    registrationDate: "25 de Março, 2025",
    lastLogin: "10 de Abril, 2025"
  },
  {
    id: "USER-005",
    name: "Administrador",
    email: "admin@aleatoriosfest.com",
    role: "admin",
    tickets: 0,
    status: "active",
    registrationDate: "01 de Janeiro, 2025",
    lastLogin: "05 de Maio, 2025"
  }
];

// Mock ticket purchase history
const mockPurchaseHistory = [
  {
    id: "PURCHASE-001",
    userId: "USER-001",
    ticketId: "TX-2025-001",
    eventName: "ALEATÓRIOS FEST",
    ticketType: "Homem",
    price: "R$ 30,00",
    purchaseDate: "15 de Abril, 2025",
    paymentMethod: "PIX"
  },
  {
    id: "PURCHASE-002",
    userId: "USER-001",
    ticketId: "TX-2025-006",
    eventName: "PROJETO X: Virada Eletrônica",
    ticketType: "VIP",
    price: "R$ 180,00",
    purchaseDate: "16 de Abril, 2025",
    paymentMethod: "Cartão de Crédito"
  },
  {
    id: "PURCHASE-003",
    userId: "USER-002",
    ticketId: "TX-2025-002",
    eventName: "ALEATÓRIOS FEST",
    ticketType: "Mulher",
    price: "R$ 20,00",
    purchaseDate: "16 de Abril, 2025",
    paymentMethod: "PIX"
  }
];

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [purchaseHistory, setPurchaseHistory] = useState(mockPurchaseHistory);
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.id.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const openUserDetails = (user: any) => {
    setCurrentUser(user);
    setShowDetailsModal(true);
  };
  
  const handleToggleUserStatus = (userId: string) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        const newStatus = user.status === 'active' ? 'blocked' : 'active';
        return { ...user, status: newStatus };
      }
      return user;
    });
    
    setUsers(updatedUsers);
    
    const user = users.find(u => u.id === userId);
    const action = user?.status === 'active' ? 'bloqueado' : 'ativado';
    toast.success(`Usuário ${action} com sucesso!`);
    
    // Update current user if details modal is open
    if (currentUser && currentUser.id === userId) {
      const updatedUser = updatedUsers.find(u => u.id === userId);
      if (updatedUser) {
        setCurrentUser(updatedUser);
      }
    }
  };
  
  const handleToggleUserRole = (userId: string) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        const newRole = user.role === 'admin' ? 'customer' : 'admin';
        return { ...user, role: newRole };
      }
      return user;
    });
    
    setUsers(updatedUsers);
    
    const user = users.find(u => u.id === userId);
    const action = user?.role === 'admin' ? 'removido de admin' : 'promovido para admin';
    toast.success(`Usuário ${action} com sucesso!`);
    
    if (currentUser && currentUser.id === userId) {
      const updatedUser = updatedUsers.find(u => u.id === userId);
      if (updatedUser) {
        setCurrentUser(updatedUser);
      }
    }
  };
  
  // Get purchase history for specific user
  const getUserPurchases = (userId: string) => {
    return purchaseHistory.filter(purchase => purchase.userId === userId);
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Gerenciamento de Usuários</h2>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nome, email ou ID..."
            className="pl-10 bg-dark-gray text-white border-light-gray/30 w-full"
          />
        </div>
      </div>
      
      <div className="border border-light-gray/30 rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-dark-gray">
            <TableRow className="border-b border-light-gray/30">
              <TableHead className="text-white font-medium">Usuário</TableHead>
              <TableHead className="text-white font-medium">Email</TableHead>
              <TableHead className="text-white font-medium">Função</TableHead>
              <TableHead className="text-white font-medium">Ingressos</TableHead>
              <TableHead className="text-white font-medium">Status</TableHead>
              <TableHead className="text-white font-medium">Registro</TableHead>
              <TableHead className="text-white font-medium text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-dark-gray/50">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id} className="border-b border-light-gray/20">
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-700 mr-3 flex items-center justify-center overflow-hidden">
                        {user.role === 'admin' ? (
                          <ShieldCheck size={16} className="text-neon-purple" />
                        ) : (
                          <User size={16} className="text-neon-blue" />
                        )}
                      </div>
                      <span className="text-white">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-gray-300">
                      <Mail size={14} className="mr-1" />
                      <span>{user.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.role === 'admin' 
                        ? 'bg-neon-purple/20 text-neon-purple' 
                        : 'bg-light-gray/20 text-gray-300'
                    }`}>
                      {user.role === 'admin' ? 'Admin' : 'Cliente'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-gray-300">
                      <Ticket size={14} className="mr-1" />
                      <span>{user.tickets}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.status === 'active' 
                        ? 'bg-green-900/30 text-green-400' 
                        : 'bg-red-900/30 text-red-400'
                    }`}>
                      {user.status === 'active' ? 'Ativo' : 'Bloqueado'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-gray-300">
                      <Calendar size={14} className="mr-1" />
                      <span>{user.registrationDate}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-neon-blue hover:bg-neon-blue/20"
                      onClick={() => openUserDetails(user)}
                    >
                      <Eye size={16} className="mr-1" /> Ver
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-gray-400">
                  Nenhum usuário encontrado para esta busca.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* User Details Modal */}
      {currentUser && (
        <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
          <DialogContent className="bg-dark-gray text-white border border-light-gray/30 max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">Detalhes do Usuário</DialogTitle>
            </DialogHeader>
            
            <div className="bg-dark-gray/50 p-4 rounded-lg">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center mb-4">
                      {currentUser.role === 'admin' ? (
                        <ShieldCheck size={36} className="text-neon-purple" />
                      ) : (
                        <User size={36} className="text-neon-blue" />
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-white text-center">{currentUser.name}</h3>
                    <p className="text-gray-400 text-center mb-4">{currentUser.email}</p>
                    
                    <div className="flex flex-col gap-3 w-full">
                      <Button
                        variant="outline"
                        className={`w-full ${
                          currentUser.status === 'active' 
                            ? 'border-red-500 text-red-400 hover:bg-red-500/10' 
                            : 'border-green-500 text-green-400 hover:bg-green-500/10'
                        }`}
                        onClick={() => handleToggleUserStatus(currentUser.id)}
                      >
                        {currentUser.status === 'active' ? (
                          <>
                            <Ban size={16} className="mr-2" /> Bloquear Usuário
                          </>
                        ) : (
                          <>
                            <User size={16} className="mr-2" /> Ativar Usuário
                          </>
                        )}
                      </Button>
                      
                      <Button
                        variant="outline"
                        className={`w-full ${
                          currentUser.role === 'admin' 
                            ? 'border-light-gray text-gray-300 hover:bg-light-gray/10' 
                            : 'border-neon-purple text-neon-purple hover:bg-neon-purple/10'
                        }`}
                        onClick={() => handleToggleUserRole(currentUser.id)}
                      >
                        {currentUser.role === 'admin' ? (
                          <>
                            <ShieldAlert size={16} className="mr-2" /> Remover Admin
                          </>
                        ) : (
                          <>
                            <ShieldCheck size={16} className="mr-2" /> Promover para Admin
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <div className="flex justify-between items-center p-3 bg-dark-gray rounded-md border border-light-gray/30">
                      <div className="flex items-center">
                        <Calendar size={16} className="text-neon-blue mr-2" />
                        <span className="text-gray-400">Registro:</span>
                      </div>
                      <span className="text-white">{currentUser.registrationDate}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-dark-gray rounded-md border border-light-gray/30">
                      <div className="flex items-center">
                        <Lock size={16} className="text-neon-blue mr-2" />
                        <span className="text-gray-400">Último login:</span>
                      </div>
                      <span className="text-white">{currentUser.lastLogin}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-dark-gray rounded-md border border-light-gray/30">
                      <div className="flex items-center">
                        <Ticket size={16} className="text-neon-blue mr-2" />
                        <span className="text-gray-400">Total ingressos:</span>
                      </div>
                      <span className="text-white">{currentUser.tickets}</span>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <Tabs defaultValue="tickets">
                    <TabsList className="grid grid-cols-2 mb-4">
                      <TabsTrigger value="tickets">Ingressos</TabsTrigger>
                      <TabsTrigger value="activity">Atividade</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="tickets">
                      <div className="border border-light-gray/30 rounded-lg overflow-hidden">
                        <Table>
                          <TableHeader className="bg-dark-gray/70">
                            <TableRow className="border-b border-light-gray/30">
                              <TableHead className="text-white font-medium">Evento</TableHead>
                              <TableHead className="text-white font-medium">Tipo</TableHead>
                              <TableHead className="text-white font-medium">Valor</TableHead>
                              <TableHead className="text-white font-medium">Data</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody className="bg-dark-gray/30">
                            {getUserPurchases(currentUser.id).length > 0 ? (
                              getUserPurchases(currentUser.id).map((purchase) => (
                                <TableRow key={purchase.id} className="border-b border-light-gray/20">
                                  <TableCell className="text-white">{purchase.eventName}</TableCell>
                                  <TableCell className="text-gray-300">{purchase.ticketType}</TableCell>
                                  <TableCell className="text-gray-300">{purchase.price}</TableCell>
                                  <TableCell className="text-gray-300">{purchase.purchaseDate}</TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell colSpan={4} className="text-center py-6 text-gray-400">
                                  Este usuário não possui ingressos comprados.
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="activity">
                      <div className="p-4 bg-dark-gray/50 border border-light-gray/30 rounded-lg text-gray-400 text-center">
                        <p>O histórico de atividades detalhado será implementado em uma atualização futura.</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setShowDetailsModal(false)}
                className="border-light-gray text-gray-300 hover:bg-light-gray/10"
              >
                Fechar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AdminUsers;

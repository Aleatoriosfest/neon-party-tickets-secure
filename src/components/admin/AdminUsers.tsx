
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/components/ui/sonner";
import { Search, Mail, CalendarDays, User, UserRound, Eye, Check, X, Ban } from 'lucide-react';

// Mock user data
const mockUsers = [
  {
    id: "1",
    name: "Ana Silva",
    email: "ana@exemplo.com",
    role: "user",
    created_at: "22/04/2025",
    status: "Ativo"
  },
  {
    id: "2",
    name: "Carlos Mendes",
    email: "carlos@exemplo.com",
    role: "admin",
    created_at: "21/04/2025",
    status: "Ativo"
  },
  {
    id: "3",
    name: "Mariana Costa",
    email: "mariana@exemplo.com",
    role: "user",
    created_at: "20/04/2025",
    status: "Ativo"
  },
  {
    id: "4",
    name: "Pedro Santos",
    email: "pedro@exemplo.com",
    role: "user",
    created_at: "18/04/2025",
    status: "Banido"
  },
  {
    id: "5",
    name: "Julia Ferreira",
    email: "julia@exemplo.com",
    role: "user",
    created_at: "15/04/2025",
    status: "Ativo"
  }
];

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const openUserDetails = (user: any) => {
    setCurrentUser(user);
    setShowDetailsModal(true);
  };
  
  const toggleUserStatus = (userId: string) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        const newStatus = user.status === 'Ativo' ? 'Banido' : 'Ativo';
        return { ...user, status: newStatus };
      }
      return user;
    });
    
    setUsers(updatedUsers);
    setShowDetailsModal(false);
    toast.success('Status do usuário atualizado com sucesso!');
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Gerenciamento de Usuários</h2>
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nome ou email..."
            className="pl-10 bg-dark-gray text-white border-light-gray/30"
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
              <TableHead className="text-white font-medium">Cadastro</TableHead>
              <TableHead className="text-white font-medium">Status</TableHead>
              <TableHead className="text-white font-medium text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-dark-gray/50">
            {filteredUsers.map((user) => (
              <TableRow key={user.id} className="border-b border-light-gray/20">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-neon-purple/20 flex items-center justify-center text-neon-purple">
                      {user.name.substring(0, 2).toUpperCase()}
                    </div>
                    <span className="font-medium text-white">{user.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-gray-300">
                    <Mail size={14} className="mr-1 text-neon-blue" />
                    <span>{user.email}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.role === 'admin' 
                      ? 'bg-blue-900/30 text-blue-400' 
                      : 'bg-purple-900/30 text-purple-400'
                  }`}>
                    {user.role === 'admin' ? 'Admin' : 'Usuário'}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-gray-300">
                    <CalendarDays size={14} className="mr-1 text-neon-green" />
                    <span>{user.created_at}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.status === 'Ativo' 
                      ? 'bg-green-900/30 text-green-400'
                      : 'bg-red-900/30 text-red-400'
                  }`}>
                    {user.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-neon-blue hover:bg-neon-blue/20"
                    onClick={() => openUserDetails(user)}
                  >
                    <Eye size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* User Details Modal */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        {currentUser && (
          <DialogContent className="bg-dark-gray text-white border border-light-gray/30 max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <UserRound className="text-neon-purple" />
                Detalhes do Usuário
              </DialogTitle>
            </DialogHeader>
            
            <div className="py-4">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-neon-purple/20 flex items-center justify-center text-neon-purple text-2xl">
                  {currentUser.name.substring(0, 2).toUpperCase()}
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Nome</p>
                    <p className="font-medium">{currentUser.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="font-medium">{currentUser.email}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Função</p>
                    <p className="font-medium">{currentUser.role === 'admin' ? 'Administrador' : 'Usuário'}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Data de Cadastro</p>
                    <p className="font-medium">{currentUser.created_at}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-gray-400 text-sm">Status</p>
                  <p className={`font-medium ${
                    currentUser.status === 'Ativo' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {currentUser.status}
                  </p>
                </div>
              </div>
            </div>
            
            <DialogFooter className="flex justify-between">
              <Button 
                variant="outline"
                className="border-light-gray text-gray-300 hover:bg-light-gray/10"
                onClick={() => setShowDetailsModal(false)}
              >
                Fechar
              </Button>
              
              {currentUser.status === 'Ativo' ? (
                <Button 
                  variant="destructive" 
                  onClick={() => toggleUserStatus(currentUser.id)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Ban size={16} className="mr-1" />
                  Banir Usuário
                </Button>
              ) : (
                <Button 
                  variant="default"
                  onClick={() => toggleUserStatus(currentUser.id)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Check size={16} className="mr-1" />
                  Reativar Usuário
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default AdminUsers;

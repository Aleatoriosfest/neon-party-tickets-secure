
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/components/ui/sonner";
import { QrCode, Calendar, User, CheckCircle, XCircle, Search, Plus, Download } from 'lucide-react';

// Mock data for tickets
const mockTickets = [
  {
    id: "TX-2025-001",
    eventName: "ALEATÓRIOS FEST",
    eventDate: "31 de Maio, 2025",
    customerName: "Marcos Costa",
    customerEmail: "marcos@email.com",
    ticketType: "Homem",
    price: "R$ 30,00",
    status: "Válido",
    purchaseDate: "15 de Abril, 2025"
  },
  {
    id: "TX-2025-002",
    eventName: "ALEATÓRIOS FEST",
    eventDate: "31 de Maio, 2025",
    customerName: "Laura Santos",
    customerEmail: "laura@email.com",
    ticketType: "Mulher",
    price: "R$ 20,00",
    status: "Válido",
    purchaseDate: "16 de Abril, 2025"
  },
  {
    id: "TX-2025-003",
    eventName: "PROJETO X: Virada Eletrônica",
    eventDate: "28 de Maio, 2025",
    customerName: "Ricardo Ferreira",
    customerEmail: "ricardo@email.com",
    ticketType: "VIP",
    price: "R$ 180,00",
    status: "Válido",
    purchaseDate: "10 de Abril, 2025"
  },
  {
    id: "TX-2025-004",
    eventName: "PROJETO X: Virada Eletrônica",
    eventDate: "28 de Maio, 2025",
    customerName: "Julia Pereira",
    customerEmail: "julia@email.com",
    ticketType: "Standard",
    price: "R$ 80,00",
    status: "Usado",
    purchaseDate: "12 de Abril, 2025"
  },
  {
    id: "TX-2025-005",
    eventName: "ALEATÓRIOS FEST",
    eventDate: "31 de Maio, 2025",
    customerName: "Bruno Silva",
    customerEmail: "bruno@email.com",
    ticketType: "Homem",
    price: "R$ 30,00",
    status: "Cancelado",
    purchaseDate: "14 de Abril, 2025"
  }
];

const AdminTickets: React.FC = () => {
  const [tickets, setTickets] = useState(mockTickets);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTicket, setCurrentTicket] = useState<any>(null);
  const [formData, setFormData] = useState({
    eventName: 'ALEATÓRIOS FEST',
    eventDate: '31 de Maio, 2025',
    customerName: '',
    customerEmail: '',
    ticketType: 'Homem',
    price: 'R$ 30,00',
    status: 'Válido'
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const filteredTickets = tickets.filter(ticket => 
    ticket.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.eventName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleAddTicket = () => {
    const newTicket = {
      id: `TX-2025-${String(tickets.length + 1).padStart(3, '0')}`,
      ...formData,
      purchaseDate: new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })
    };
    
    setTickets([...tickets, newTicket]);
    setShowAddModal(false);
    toast.success('Ingresso criado com sucesso!');
    
    // Reset form
    setFormData({
      eventName: 'ALEATÓRIOS FEST',
      eventDate: '31 de Maio, 2025',
      customerName: '',
      customerEmail: '',
      ticketType: 'Homem',
      price: 'R$ 30,00',
      status: 'Válido'
    });
  };
  
  const handleExportCSV = () => {
    // In a real app, this would generate and download a CSV file
    toast.success('Lista de ingressos exportada com sucesso!');
  };
  
  const openDetailsModal = (ticket: any) => {
    setCurrentTicket(ticket);
    setShowDetailsModal(true);
  };
  
  const updateTicketStatus = (ticketId: string, newStatus: string) => {
    const updatedTickets = tickets.map(ticket => 
      ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
    );
    
    setTickets(updatedTickets);
    setShowDetailsModal(false);
    toast.success(`Status do ingresso atualizado para: ${newStatus}`);
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Gerenciamento de Ingressos</h2>
        
        <div className="flex gap-2">
          <Button
            onClick={handleExportCSV}
            variant="outline"
            className="border-neon-blue text-neon-blue hover:bg-neon-blue/10"
          >
            <Download size={16} className="mr-2" /> Exportar CSV
          </Button>
          
          <Button 
            onClick={() => setShowAddModal(true)}
            className="bg-neon-purple hover:bg-neon-purple/80"
          >
            <Plus size={16} className="mr-2" /> Novo Ingresso
          </Button>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nome, email, código ou evento..."
            className="pl-10 bg-dark-gray text-white border-light-gray/30 w-full"
          />
        </div>
      </div>
      
      <div className="border border-light-gray/30 rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-dark-gray">
            <TableRow className="border-b border-light-gray/30">
              <TableHead className="text-white font-medium">Código</TableHead>
              <TableHead className="text-white font-medium">Evento</TableHead>
              <TableHead className="text-white font-medium">Cliente</TableHead>
              <TableHead className="text-white font-medium">Tipo</TableHead>
              <TableHead className="text-white font-medium">Valor</TableHead>
              <TableHead className="text-white font-medium">Status</TableHead>
              <TableHead className="text-white font-medium text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-dark-gray/50">
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket) => (
                <TableRow key={ticket.id} className="border-b border-light-gray/20">
                  <TableCell>
                    <div className="flex items-center">
                      <QrCode size={14} className="mr-1 text-neon-blue" />
                      <span className="text-white font-mono">{ticket.id}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-white">{ticket.eventName}</div>
                    <div className="flex items-center text-sm text-gray-400 mt-1">
                      <Calendar size={12} className="mr-1" />
                      {ticket.eventDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-white">{ticket.customerName}</div>
                    <div className="text-sm text-gray-400">{ticket.customerEmail}</div>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-300">{ticket.ticketType}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-300">{ticket.price}</span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      ticket.status === 'Válido' 
                        ? 'bg-green-900/30 text-green-400' 
                        : ticket.status === 'Usado'
                          ? 'bg-blue-900/30 text-blue-400'
                          : 'bg-red-900/30 text-red-400'
                    }`}>
                      {ticket.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-neon-blue hover:bg-neon-blue/20"
                      onClick={() => openDetailsModal(ticket)}
                    >
                      Detalhes
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-gray-400">
                  Nenhum ingresso encontrado para esta busca.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Add Ticket Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="bg-dark-gray text-white border border-light-gray/30 max-w-2xl">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Ingresso</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="eventName" className="block text-white mb-2">Evento</label>
                <select
                  id="eventName"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-md bg-dark-gray text-white border border-light-gray/30"
                >
                  <option value="ALEATÓRIOS FEST">ALEATÓRIOS FEST</option>
                  <option value="PROJETO X: Virada Eletrônica">PROJETO X: Virada Eletrônica</option>
                  <option value="Neon Night">Neon Night</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="eventDate" className="block text-white mb-2">Data</label>
                <select
                  id="eventDate"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-md bg-dark-gray text-white border border-light-gray/30"
                >
                  <option value="31 de Maio, 2025">31 de Maio, 2025</option>
                  <option value="28 de Maio, 2025">28 de Maio, 2025</option>
                  <option value="12 de Junho, 2025">12 de Junho, 2025</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="customerName" className="block text-white mb-2">Nome do Cliente</label>
                <Input
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  className="bg-dark-gray text-white border-light-gray/30"
                />
              </div>
              
              <div>
                <label htmlFor="customerEmail" className="block text-white mb-2">Email do Cliente</label>
                <Input
                  id="customerEmail"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleInputChange}
                  className="bg-dark-gray text-white border-light-gray/30"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="ticketType" className="block text-white mb-2">Tipo de Ingresso</label>
                <select
                  id="ticketType"
                  name="ticketType"
                  value={formData.ticketType}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-md bg-dark-gray text-white border border-light-gray/30"
                >
                  <option value="Homem">Homem</option>
                  <option value="Mulher">Mulher</option>
                  <option value="VIP">VIP</option>
                  <option value="Standard">Standard</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="price" className="block text-white mb-2">Valor</label>
                <Input
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="bg-dark-gray text-white border-light-gray/30"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="status" className="block text-white mb-2">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full p-2 rounded-md bg-dark-gray text-white border border-light-gray/30"
              >
                <option value="Válido">Válido</option>
                <option value="Usado">Usado</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowAddModal(false)}
              className="border-light-gray text-gray-300 hover:bg-light-gray/10"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleAddTicket}
              className="bg-neon-purple hover:bg-neon-purple/80"
            >
              Adicionar Ingresso
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Ticket Details Modal */}
      {currentTicket && (
        <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
          <DialogContent className="bg-dark-gray text-white border border-light-gray/30 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">Detalhes do Ingresso</DialogTitle>
            </DialogHeader>
            
            <div className="bg-dark-gray/50 p-4 rounded-lg">
              <div className="flex justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{currentTicket.id}</h3>
                  <p className="text-gray-400">Compra em: {currentTicket.purchaseDate}</p>
                </div>
                <div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    currentTicket.status === 'Válido' 
                      ? 'bg-green-900/30 text-green-400' 
                      : currentTicket.status === 'Usado'
                        ? 'bg-blue-900/30 text-blue-400'
                        : 'bg-red-900/30 text-red-400'
                  }`}>
                    {currentTicket.status}
                  </span>
                </div>
              </div>
              
              <div className="flex justify-center mb-6">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${currentTicket.id}`}
                  alt="QR Code"
                  className="border-4 border-white h-32 w-32"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-gray-400 text-sm">Evento</h4>
                  <p className="text-white">{currentTicket.eventName}</p>
                </div>
                <div>
                  <h4 className="text-gray-400 text-sm">Data</h4>
                  <p className="text-white">{currentTicket.eventDate}</p>
                </div>
                <div>
                  <h4 className="text-gray-400 text-sm">Cliente</h4>
                  <p className="text-white">{currentTicket.customerName}</p>
                </div>
                <div>
                  <h4 className="text-gray-400 text-sm">Email</h4>
                  <p className="text-white">{currentTicket.customerEmail}</p>
                </div>
                <div>
                  <h4 className="text-gray-400 text-sm">Tipo</h4>
                  <p className="text-white">{currentTicket.ticketType}</p>
                </div>
                <div>
                  <h4 className="text-gray-400 text-sm">Valor</h4>
                  <p className="text-white">{currentTicket.price}</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-4">
              <Button
                variant="outline"
                className="border-red-500 text-red-400 hover:bg-red-500/10"
                onClick={() => updateTicketStatus(currentTicket.id, 'Cancelado')}
              >
                <XCircle size={16} className="mr-2" /> Cancelar Ingresso
              </Button>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="border-light-gray text-gray-300 hover:bg-light-gray/10"
                  onClick={() => setShowDetailsModal(false)}
                >
                  Fechar
                </Button>
                
                {currentTicket.status !== 'Usado' && (
                  <Button
                    className="bg-neon-blue hover:bg-neon-blue/80 text-black"
                    onClick={() => updateTicketStatus(currentTicket.id, 'Usado')}
                  >
                    <CheckCircle size={16} className="mr-2" /> Marcar como Usado
                  </Button>
                )}
                
                {currentTicket.status !== 'Válido' && (
                  <Button
                    className="bg-green-600 hover:bg-green-600/80 text-white"
                    onClick={() => updateTicketStatus(currentTicket.id, 'Válido')}
                  >
                    <CheckCircle size={16} className="mr-2" /> Validar Ingresso
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AdminTickets;

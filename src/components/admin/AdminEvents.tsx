
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/components/ui/sonner";
import { Calendar, Clock, MapPin, QrCode, Pencil, Trash, Plus } from 'lucide-react';

// Mock data - in a real app, this would come from an API
const mockEvents = [
  {
    id: "evt-001",
    title: "ALEATÓRIOS FEST",
    subtitle: "Aleatorios Fest x Element's Fest",
    date: "31 de Maio, 2025",
    time: "16:00 às 00:00",
    location: "Chácara Monero, Osasco - SP",
    status: "Ativo",
    ticketsSold: 184,
  },
  {
    id: "evt-002",
    title: "PROJETO X: Virada Eletrônica",
    subtitle: "Edição Especial",
    date: "28 de Maio, 2025",
    time: "22:00 às 06:00",
    location: "Arena X, São Paulo",
    status: "Ativo",
    ticketsSold: 203,
  },
  {
    id: "evt-003",
    title: "Neon Night",
    subtitle: "Festa de Eletrônica",
    date: "12 de Junho, 2025",
    time: "23:00 às 05:00",
    location: "Club Matrix",
    status: "Programado",
    ticketsSold: 0,
  },
  {
    id: "evt-004",
    title: "After Party Element's",
    subtitle: "After da Balada",
    date: "25 de Abril, 2025",
    time: "05:00 às 12:00",
    location: "Rooftop Club",
    status: "Finalizado",
    ticketsSold: 156,
  },
];

const AdminEvents: React.FC = () => {
  const [events, setEvents] = useState(mockEvents);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    date: '',
    time: '',
    location: '',
    status: 'Programado'
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddEvent = () => {
    // Create a new event
    const newEvent = {
      id: `evt-00${events.length + 1}`,
      ...formData,
      ticketsSold: 0
    };
    
    setEvents([...events, newEvent]);
    setShowAddModal(false);
    toast.success('Evento criado com sucesso!');
    
    // Reset form
    setFormData({
      title: '',
      subtitle: '',
      date: '',
      time: '',
      location: '',
      status: 'Programado'
    });
  };
  
  const handleEditEvent = () => {
    if (!currentEvent) return;
    
    const updatedEvents = events.map(event => 
      event.id === currentEvent.id ? { ...event, ...formData } : event
    );
    
    setEvents(updatedEvents);
    setShowEditModal(false);
    toast.success('Evento atualizado com sucesso!');
  };
  
  const handleDeleteEvent = (eventId: string) => {
    const updatedEvents = events.filter(event => event.id !== eventId);
    setEvents(updatedEvents);
    toast.success('Evento excluído com sucesso!');
  };
  
  const openEditModal = (event: any) => {
    setCurrentEvent(event);
    setFormData({
      title: event.title,
      subtitle: event.subtitle,
      date: event.date,
      time: event.time,
      location: event.location,
      status: event.status
    });
    setShowEditModal(true);
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Gerenciamento de Eventos</h2>
        
        <Button 
          onClick={() => setShowAddModal(true)}
          className="bg-neon-purple hover:bg-neon-purple/80"
        >
          <Plus size={16} className="mr-2" /> Novo Evento
        </Button>
      </div>
      
      <div className="border border-light-gray/30 rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-dark-gray">
            <TableRow className="border-b border-light-gray/30">
              <TableHead className="text-white font-medium">Nome</TableHead>
              <TableHead className="text-white font-medium">Data</TableHead>
              <TableHead className="text-white font-medium">Local</TableHead>
              <TableHead className="text-white font-medium">Status</TableHead>
              <TableHead className="text-white font-medium">Vendas</TableHead>
              <TableHead className="text-white font-medium text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-dark-gray/50">
            {events.map((event) => (
              <TableRow key={event.id} className="border-b border-light-gray/20">
                <TableCell>
                  <div>
                    <div className="font-medium text-white">{event.title}</div>
                    <div className="text-sm text-gray-400">{event.subtitle}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-gray-300">
                    <Calendar size={14} className="mr-1 text-neon-blue" />
                    <span>{event.date}</span>
                  </div>
                  <div className="text-sm text-gray-400 mt-1">
                    <Clock size={14} className="inline mr-1" />
                    {event.time}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-gray-300">
                    <MapPin size={14} className="mr-1 text-neon-purple" />
                    <span>{event.location}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    event.status === 'Ativo' 
                      ? 'bg-green-900/30 text-green-400' 
                      : event.status === 'Programado'
                        ? 'bg-blue-900/30 text-blue-400'
                        : 'bg-gray-800 text-gray-400'
                  }`}>
                    {event.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <QrCode size={14} className="mr-1 text-neon-blue" />
                    <span className="text-gray-300">{event.ticketsSold}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-neon-blue hover:bg-neon-blue/20"
                    onClick={() => openEditModal(event)}
                  >
                    <Pencil size={16} />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:bg-red-500/20"
                    onClick={() => handleDeleteEvent(event.id)}
                  >
                    <Trash size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Add Event Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="bg-dark-gray text-white border border-light-gray/30 max-w-2xl">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Evento</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="title" className="block text-white mb-2">Nome do Evento</label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="bg-dark-gray text-white border-light-gray/30"
                />
              </div>
              
              <div>
                <label htmlFor="subtitle" className="block text-white mb-2">Subtítulo</label>
                <Input
                  id="subtitle"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleInputChange}
                  className="bg-dark-gray text-white border-light-gray/30"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-white mb-2">Data</label>
                <Input
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="bg-dark-gray text-white border-light-gray/30"
                />
              </div>
              
              <div>
                <label htmlFor="time" className="block text-white mb-2">Horário</label>
                <Input
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="bg-dark-gray text-white border-light-gray/30"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="location" className="block text-white mb-2">Localização</label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="bg-dark-gray text-white border-light-gray/30"
              />
            </div>
            
            <div>
              <label htmlFor="status" className="block text-white mb-2">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                className="w-full p-2 rounded-md bg-dark-gray text-white border border-light-gray/30"
              >
                <option value="Programado">Programado</option>
                <option value="Ativo">Ativo</option>
                <option value="Finalizado">Finalizado</option>
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
              onClick={handleAddEvent}
              className="bg-neon-purple hover:bg-neon-purple/80"
            >
              Adicionar Evento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Event Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="bg-dark-gray text-white border border-light-gray/30 max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Evento</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="edit-title" className="block text-white mb-2">Nome do Evento</label>
                <Input
                  id="edit-title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="bg-dark-gray text-white border-light-gray/30"
                />
              </div>
              
              <div>
                <label htmlFor="edit-subtitle" className="block text-white mb-2">Subtítulo</label>
                <Input
                  id="edit-subtitle"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleInputChange}
                  className="bg-dark-gray text-white border-light-gray/30"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="edit-date" className="block text-white mb-2">Data</label>
                <Input
                  id="edit-date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="bg-dark-gray text-white border-light-gray/30"
                />
              </div>
              
              <div>
                <label htmlFor="edit-time" className="block text-white mb-2">Horário</label>
                <Input
                  id="edit-time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="bg-dark-gray text-white border-light-gray/30"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="edit-location" className="block text-white mb-2">Localização</label>
              <Input
                id="edit-location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="bg-dark-gray text-white border-light-gray/30"
              />
            </div>
            
            <div>
              <label htmlFor="edit-status" className="block text-white mb-2">Status</label>
              <select
                id="edit-status"
                name="status"
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                className="w-full p-2 rounded-md bg-dark-gray text-white border border-light-gray/30"
              >
                <option value="Programado">Programado</option>
                <option value="Ativo">Ativo</option>
                <option value="Finalizado">Finalizado</option>
              </select>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowEditModal(false)}
              className="border-light-gray text-gray-300 hover:bg-light-gray/10"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleEditEvent}
              className="bg-neon-purple hover:bg-neon-purple/80"
            >
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminEvents;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { useAuth } from '@/contexts/AuthContext';
import { BarChart, Users, Calendar, Ticket, Settings, QrCode, PlusCircle, Pencil, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { EventType } from '@/types';

// Mock data for events
const mockEvents: EventType[] = [
  {
    id: "1",
    title: "PROJETO X",
    description: "Uma experiência única com os melhores DJs e atrações da cidade!",
    date: "20 de Julho, 2025",
    location: "Arena XYZ, São Paulo - SP",
    price: 50,
    image_url: "/lovable-uploads/de50cc19-19d3-44a1-bf48-7a14dcc3a803.png"
  }
];

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('events');
  const [events, setEvents] = useState<EventType[]>(mockEvents);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is admin
    if (!isAdmin) {
      toast.error('Acesso negado', {
        description: 'Você não tem permissão para acessar esta página'
      });
      navigate('/');
    }
  }, [isAdmin, navigate]);
  
  const handleChangeTab = (tab: string) => {
    setActiveTab(tab);
  };
  
  const handleAddEvent = () => {
    toast.info('Funcionalidade em desenvolvimento', {
      description: 'A adição de novos eventos estará disponível em breve'
    });
  };
  
  const handleEditEvent = (eventId: string) => {
    toast.info('Funcionalidade em desenvolvimento', {
      description: 'A edição de eventos estará disponível em breve'
    });
  };
  
  const handleDeletePrompt = (eventId: string) => {
    setEventToDelete(eventId);
    setDeleteDialogOpen(true);
  };
  
  const handleDeleteEvent = () => {
    if (eventToDelete) {
      // In a real app, we would delete from the database
      setEvents(events.filter(event => event.id !== eventToDelete));
      toast.success('Evento excluído com sucesso');
      setDeleteDialogOpen(false);
      setEventToDelete(null);
    }
  };
  
  // Navigation items for admin panel
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart },
    { id: 'events', label: 'Eventos', icon: Calendar },
    { id: 'tickets', label: 'Ingressos', icon: Ticket },
    { id: 'users', label: 'Usuários', icon: Users },
    { id: 'verification', label: 'Verificação', icon: QrCode },
    { id: 'settings', label: 'Configurações', icon: Settings }
  ];
  
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white mb-8 text-center"
        >
          Área do <span className="neon-text">Administrador</span>
        </motion.h1>
        
        <div className="max-w-7xl mx-auto">
          {/* Admin Dashboard UI with Sidebar Navigation */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar Navigation */}
            <div className="lg:w-64 glass rounded-lg p-4">
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleChangeTab(item.id)}
                    className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? "bg-neon-purple/20 text-neon-purple"
                        : "text-white hover:bg-light-gray/10"
                    }`}
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
              
              <div className="mt-8 pt-4 border-t border-light-gray/30">
                <Button 
                  variant="outline"
                  className="w-full text-gray-400 hover:text-white border-light-gray/30"
                  onClick={() => navigate('/')}
                >
                  Voltar para o Site
                </Button>
              </div>
            </div>
            
            {/* Content Area */}
            <div className="flex-1 glass rounded-lg p-6">
              {activeTab === 'events' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">Gerenciar Eventos</h2>
                    <Button 
                      onClick={handleAddEvent}
                      className="bg-neon-green hover:bg-neon-green/80 text-black flex items-center gap-2"
                    >
                      <PlusCircle size={18} />
                      Adicionar Evento
                    </Button>
                  </div>
                  
                  {events.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                      Nenhum evento encontrado. Clique em "Adicionar Evento" para criar um novo.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-light-gray/30">
                            <th className="text-left pb-4 text-gray-400 font-medium">Evento</th>
                            <th className="text-left pb-4 text-gray-400 font-medium">Data</th>
                            <th className="text-left pb-4 text-gray-400 font-medium">Local</th>
                            <th className="text-left pb-4 text-gray-400 font-medium">Preço</th>
                            <th className="text-right pb-4 text-gray-400 font-medium">Ações</th>
                          </tr>
                        </thead>
                        <tbody>
                          {events.map((event) => (
                            <tr key={event.id} className="border-b border-light-gray/10 hover:bg-light-gray/5">
                              <td className="py-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 rounded overflow-hidden">
                                    <img 
                                      src={event.image_url} 
                                      alt={event.title} 
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <span className="font-medium text-white">{event.title}</span>
                                </div>
                              </td>
                              <td className="py-4 text-gray-300">{event.date}</td>
                              <td className="py-4 text-gray-300 max-w-[200px] truncate">{event.location}</td>
                              <td className="py-4 text-gray-300">R${event.price.toFixed(2)}</td>
                              <td className="py-4">
                                <div className="flex justify-end gap-2">
                                  <Button 
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleEditEvent(event.id)}
                                    className="text-gray-400 hover:text-white hover:bg-light-gray/20"
                                  >
                                    <Pencil size={18} />
                                  </Button>
                                  <Button 
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDeletePrompt(event.id)}
                                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                  >
                                    <Trash2 size={18} />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
              
              {activeTab !== 'events' && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium text-white mb-2">{navItems.find(item => item.id === activeTab)?.label}</h3>
                  <p className="text-gray-400">Esta funcionalidade está em desenvolvimento.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-dark-gray border-light-gray">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              Tem certeza de que deseja excluir este evento? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-light-gray text-gray-300 hover:bg-light-gray/10 hover:text-white">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteEvent}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <Footer />
    </div>
  );
};

export default Admin;

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';
import {
  User, Users, Ticket, Calendar, Layout, Settings, LogOut, PlusCircle,
  Trash2, Edit, Download, FileText, BarChart3, Banknote, DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import X from '@/components/X';
import Menu from '@/components/Menu';

// Tipo de evento mais detalhado para o admin
interface AdminEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image_url?: string;
  price: number;
  created_at?: string;
  tickets_sold?: number;
  status?: 'active' | 'paused' | 'cancelled';
}

// Tipo de usuário
interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  created_at: string;
}

// Mock data - replace with actual data from Supabase in production
const mockEvents: AdminEvent[] = [
  {
    id: "1",
    title: "ALEATÓRIOS FEST",
    description: "Aleatorios Fest x Element's Fest",
    date: "31 de Maio, 2025",
    location: "Chácara Monero, Osasco - SP",
    price: 30,
    tickets_sold: 15,
    status: 'active',
    created_at: "2023-04-15T14:32:00Z"
  },
  {
    id: "2",
    title: "Element's Fest",
    description: "Edição Especial",
    date: "15 de Junho, 2025",
    location: "Arena XYZ, São Paulo - SP",
    price: 60,
    tickets_sold: 8,
    status: 'active',
    created_at: "2023-04-16T09:15:00Z"
  },
  {
    id: "3",
    title: "Projeto X",
    description: "A festa mais louca do ano",
    date: "20 de Julho, 2025",
    location: "Casa de Eventos ABC, Santo André - SP",
    price: 40,
    tickets_sold: 25,
    status: 'active',
    created_at: "2023-04-18T11:42:00Z"
  }
];

const mockUsers: AdminUser[] = [
  {
    id: "u1",
    name: "João Silva",
    email: "joao@exemplo.com",
    role: "user",
    created_at: "2023-03-10T10:30:00Z",
  },
  {
    id: "u2",
    name: "Maria Souza",
    email: "maria@exemplo.com",
    role: "user",
    created_at: "2023-03-15T14:22:00Z",
  },
  {
    id: "u3",
    name: "Admin Master",
    email: "admin@exemplo.com",
    role: "admin",
    created_at: "2023-02-01T09:00:00Z",
  },
];

const AdminDashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const [events, setEvents] = useState<AdminEvent[]>(mockEvents);
  const [users, setUsers] = useState<AdminUser[]>(mockUsers);
  const [showDeleteEventDialog, setShowDeleteEventDialog] = useState(false);
  const [currentEventId, setCurrentEventId] = useState<string | null>(null);
  const [showCreateEventDialog, setShowCreateEventDialog] = useState(false);
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Estado para novo evento
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    price: '',
    imageUrl: ''
  });
  
  useEffect(() => {
    // Verificar se o usuário é um administrador
    const checkUserRole = async () => {
      if (!user) {
        navigate('/auth');
        return;
      }
      
      if (user.role !== 'admin') {
        toast.error('Acesso negado', {
          description: 'Você não tem permissão para acessar esta página'
        });
        navigate('/access-denied');
      }
    };
    
    checkUserRole();
    
    // Buscar eventos e usuários do Supabase (aqui estamos usando dados fictícios)
    const fetchData = async () => {
      // Em produção, você substituiria isso por chamadas reais ao Supabase
      // const { data: eventsData, error: eventsError } = await supabase.from('events').select('*');
      // const { data: usersData, error: usersError } = await supabase.from('usuarios').select('*');
      
      // Por enquanto, estamos usando dados fictícios
      setEvents(mockEvents);
      setUsers(mockUsers);
    };
    
    fetchData();
  }, [user, navigate]);
  
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
  
  const handleDeleteEvent = (eventId: string) => {
    setCurrentEventId(eventId);
    setShowDeleteEventDialog(true);
  };
  
  const confirmDeleteEvent = async () => {
    if (!currentEventId) return;
    
    try {
      // Em produção, você substituiria isso por chamadas reais ao Supabase
      // await supabase.from('events').delete().eq('id', currentEventId);
      
      // Por enquanto, apenas atualizamos o estado local
      setEvents(events.filter(event => event.id !== currentEventId));
      toast.success('Evento excluído com sucesso');
    } catch (error: any) {
      toast.error('Erro ao excluir evento', {
        description: error.message
      });
    } finally {
      setShowDeleteEventDialog(false);
      setCurrentEventId(null);
    }
  };
  
  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Em produção, você substituiria isso por chamadas reais ao Supabase
      // const { data, error } = await supabase.from('events').insert([newEvent]);
      
      // Por enquanto, apenas atualizamos o estado local
      const mockNewEvent: AdminEvent = {
        id: `e${Date.now()}`,
        title: newEvent.title,
        description: newEvent.description,
        date: newEvent.date + ' ' + newEvent.time,
        location: newEvent.location,
        price: parseFloat(newEvent.price),
        tickets_sold: 0,
        status: 'active',
        created_at: new Date().toISOString()
      };
      
      setEvents([...events, mockNewEvent]);
      toast.success('Evento criado com sucesso');
      setShowCreateEventDialog(false);
      resetNewEventForm();
    } catch (error: any) {
      toast.error('Erro ao criar evento', {
        description: error.message
      });
    }
  };
  
  const resetNewEventForm = () => {
    setNewEvent({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      price: '',
      imageUrl: ''
    });
  };
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  // Dados para estatísticas do dashboard
  const totalEvents = events.length;
  const totalTicketsSold = events.reduce((sum, event) => sum + (event.tickets_sold || 0), 0);
  const totalUsers = users.length;
  const totalRevenue = events.reduce((sum, event) => sum + ((event.tickets_sold || 0) * event.price), 0);
  
  return (
    <div className="min-h-screen bg-dark text-white">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar para desktop */}
        <aside className="hidden md:flex w-64 flex-col bg-dark-gray border-r border-light-gray/30">
          <div className="p-6">
            <h1 className="text-xl font-bold text-neon-blue flex items-center">
              <Layout className="mr-2 h-5 w-5" />
              Painel Admin
            </h1>
          </div>
          
          <nav className="flex-1 px-4">
            <ul className="space-y-1">
              <li>
                <button 
                  onClick={() => setCurrentTab('dashboard')}
                  className={`w-full flex items-center px-4 py-3 rounded-md transition-all ${
                    currentTab === 'dashboard' 
                      ? 'bg-neon-blue/20 text-neon-blue' 
                      : 'text-gray-300 hover:bg-dark/30'
                  }`}
                >
                  <BarChart3 className="mr-3 h-5 w-5" />
                  Dashboard
                </button>
              </li>
              
              <li>
                <button 
                  onClick={() => setCurrentTab('events')}
                  className={`w-full flex items-center px-4 py-3 rounded-md transition-all ${
                    currentTab === 'events' 
                      ? 'bg-neon-blue/20 text-neon-blue' 
                      : 'text-gray-300 hover:bg-dark/30'
                  }`}
                >
                  <Calendar className="mr-3 h-5 w-5" />
                  Eventos
                </button>
              </li>
              
              <li>
                <button 
                  onClick={() => setCurrentTab('tickets')}
                  className={`w-full flex items-center px-4 py-3 rounded-md transition-all ${
                    currentTab === 'tickets' 
                      ? 'bg-neon-blue/20 text-neon-blue' 
                      : 'text-gray-300 hover:bg-dark/30'
                  }`}
                >
                  <Ticket className="mr-3 h-5 w-5" />
                  Ingressos
                </button>
              </li>
              
              <li>
                <button 
                  onClick={() => setCurrentTab('users')}
                  className={`w-full flex items-center px-4 py-3 rounded-md transition-all ${
                    currentTab === 'users' 
                      ? 'bg-neon-blue/20 text-neon-blue' 
                      : 'text-gray-300 hover:bg-dark/30'
                  }`}
                >
                  <Users className="mr-3 h-5 w-5" />
                  Usuários
                </button>
              </li>
              
              <li>
                <button 
                  onClick={() => setCurrentTab('settings')}
                  className={`w-full flex items-center px-4 py-3 rounded-md transition-all ${
                    currentTab === 'settings' 
                      ? 'bg-neon-blue/20 text-neon-blue' 
                      : 'text-gray-300 hover:bg-dark/30'
                  }`}
                >
                  <Settings className="mr-3 h-5 w-5" />
                  Configurações
                </button>
              </li>
            </ul>
          </nav>
          
          <div className="p-4 border-t border-light-gray/30">
            <div className="flex items-center mb-4">
              <div className="bg-neon-blue/20 rounded-full p-2 mr-3">
                <User className="h-5 w-5 text-neon-blue" />
              </div>
              <div>
                <p className="font-medium">{user?.name || 'Admin'}</p>
                <p className="text-xs text-gray-400">{user?.email}</p>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start border-light-gray/50 text-red-400 hover:bg-red-900/20 hover:text-red-400"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </aside>
        
        {/* Conteúdo principal */}
        <main className="flex-1 overflow-y-auto bg-dark">
          {/* Header para dispositivos móveis */}
          <header className="md:hidden flex items-center justify-between p-4 border-b border-light-gray/30">
            <h1 className="text-xl font-bold text-neon-blue flex items-center">
              <Layout className="mr-2 h-5 w-5" />
              Painel Admin
            </h1>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleMobileMenu}
              className="text-white"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </header>
          
          {/* Menu móvel expandido */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-dark-gray border-b border-light-gray/30">
              <nav className="px-4 py-2">
                <ul className="space-y-1">
                  <li>
                    <button 
                      onClick={() => {
                        setCurrentTab('dashboard');
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center px-4 py-3 rounded-md transition-all ${
                        currentTab === 'dashboard' 
                          ? 'bg-neon-blue/20 text-neon-blue' 
                          : 'text-gray-300 hover:bg-dark/30'
                      }`}
                    >
                      <BarChart3 className="mr-3 h-5 w-5" />
                      Dashboard
                    </button>
                  </li>
                  
                  <li>
                    <button 
                      onClick={() => {
                        setCurrentTab('events');
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center px-4 py-3 rounded-md transition-all ${
                        currentTab === 'events' 
                          ? 'bg-neon-blue/20 text-neon-blue' 
                          : 'text-gray-300 hover:bg-dark/30'
                      }`}
                    >
                      <Calendar className="mr-3 h-5 w-5" />
                      Eventos
                    </button>
                  </li>
                  
                  <li>
                    <button 
                      onClick={() => {
                        setCurrentTab('tickets');
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center px-4 py-3 rounded-md transition-all ${
                        currentTab === 'tickets' 
                          ? 'bg-neon-blue/20 text-neon-blue' 
                          : 'text-gray-300 hover:bg-dark/30'
                      }`}
                    >
                      <Ticket className="mr-3 h-5 w-5" />
                      Ingressos
                    </button>
                  </li>
                  
                  <li>
                    <button 
                      onClick={() => {
                        setCurrentTab('users');
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center px-4 py-3 rounded-md transition-all ${
                        currentTab === 'users' 
                          ? 'bg-neon-blue/20 text-neon-blue' 
                          : 'text-gray-300 hover:bg-dark/30'
                      }`}
                    >
                      <Users className="mr-3 h-5 w-5" />
                      Usuários
                    </button>
                  </li>
                  
                  <li>
                    <button 
                      onClick={() => {
                        setCurrentTab('settings');
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center px-4 py-3 rounded-md transition-all ${
                        currentTab === 'settings' 
                          ? 'bg-neon-blue/20 text-neon-blue' 
                          : 'text-gray-300 hover:bg-dark/30'
                      }`}
                    >
                      <Settings className="mr-3 h-5 w-5" />
                      Configurações
                    </button>
                  </li>
                  
                  <li>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-3 text-red-400 hover:bg-red-900/20 rounded-md transition-all"
                    >
                      <LogOut className="mr-3 h-5 w-5" />
                      Sair
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
          
          {/* Conteúdo específico da aba selecionada */}
          <div className="p-6">
            {currentTab === 'dashboard' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
                
                {/* Cards de estatísticas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <Card className="bg-dark-gray border-light-gray">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-sm">Eventos</p>
                          <h3 className="text-3xl font-bold mt-1">{totalEvents}</h3>
                        </div>
                        <div className="bg-neon-blue/20 rounded-full p-3">
                          <Calendar className="h-6 w-6 text-neon-blue" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-dark-gray border-light-gray">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-sm">Ingressos vendidos</p>
                          <h3 className="text-3xl font-bold mt-1">{totalTicketsSold}</h3>
                        </div>
                        <div className="bg-neon-purple/20 rounded-full p-3">
                          <Ticket className="h-6 w-6 text-neon-purple" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-dark-gray border-light-gray">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-sm">Usuários</p>
                          <h3 className="text-3xl font-bold mt-1">{totalUsers}</h3>
                        </div>
                        <div className="bg-green-500/20 rounded-full p-3">
                          <Users className="h-6 w-6 text-green-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-dark-gray border-light-gray">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-sm">Faturamento</p>
                          <h3 className="text-3xl font-bold mt-1">R$ {totalRevenue.toFixed(2)}</h3>
                        </div>
                        <div className="bg-yellow-500/20 rounded-full p-3">
                          <Banknote className="h-6 w-6 text-yellow-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Gráficos e tabelas iriam aqui */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-dark-gray border-light-gray">
                    <CardHeader>
                      <CardTitle>Eventos Recentes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {events.slice(0, 3).map((event) => (
                          <div key={event.id} className="flex justify-between items-center pb-4 border-b border-light-gray/30 last:border-0 last:pb-0">
                            <div>
                              <h4 className="font-medium">{event.title}</h4>
                              <p className="text-sm text-gray-400">{event.date}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{event.tickets_sold} ingressos</p>
                              <p className="text-sm text-neon-blue">R$ {(event.price * (event.tickets_sold || 0)).toFixed(2)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-dark-gray border-light-gray">
                    <CardHeader>
                      <CardTitle>Novos Usuários</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {users.slice(0, 3).map((user) => (
                          <div key={user.id} className="flex justify-between items-center pb-4 border-b border-light-gray/30 last:border-0 last:pb-0">
                            <div className="flex items-center">
                              <div className="bg-neon-blue/20 rounded-full p-2 mr-3">
                                <User className="h-4 w-4 text-neon-blue" />
                              </div>
                              <div>
                                <h4 className="font-medium">{user.name}</h4>
                                <p className="text-sm text-gray-400">{user.email}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-gray-400">
                                {new Date(user.created_at).toLocaleDateString('pt-BR')}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
            
            {currentTab === 'events' && (
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Gerenciar Eventos</h2>
                  <Button 
                    className="mt-4 sm:mt-0 bg-neon-blue hover:bg-neon-blue/80"
                    onClick={() => setShowCreateEventDialog(true)}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Criar Novo Evento
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {events.map((event) => (
                    <Card key={event.id} className="bg-dark-gray border-light-gray">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                          <div className="mb-4 md:mb-0">
                            <h3 className="text-lg font-semibold">{event.title}</h3>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                              <p className="text-sm text-gray-400 flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {event.date}
                              </p>
                              <p className="text-sm text-gray-400">
                                {event.tickets_sold} ingressos vendidos
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex flex-col md:flex-row gap-2">
                            <Button variant="outline" size="sm" className="border-neon-blue text-neon-blue">
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </Button>
                            <Button variant="outline" size="sm" className="border-yellow-500 text-yellow-500">
                              Pausar
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="border-red-500 text-red-500"
                              onClick={() => handleDeleteEvent(event.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Excluir
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {events.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-400">Nenhum evento encontrado</p>
                      <Button 
                        variant="outline" 
                        className="mt-4 border-neon-blue text-neon-blue"
                        onClick={() => setShowCreateEventDialog(true)}
                      >
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Criar Primeiro Evento
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {currentTab === 'tickets' && (
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Gerenciar Ingressos</h2>
                  <Button 
                    className="mt-4 sm:mt-0 bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      toast.success('Exportando relatório de ingressos');
                    }}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Exportar CSV
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {events.map((event) => (
                    <Card key={event.id} className="bg-dark-gray border-light-gray">
                      <CardHeader>
                        <CardTitle>{event.title}</CardTitle>
                        <CardDescription>{event.date}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Total de ingressos vendidos:</span>
                            <span className="font-bold">{event.tickets_sold}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Preço por ingresso:</span>
                            <span>R$ {event.price.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Faturamento total:</span>
                            <span className="text-neon-blue font-bold">
                              R$ {(event.price * (event.tickets_sold || 0)).toFixed(2)}
                            </span>
                          </div>
                          <div className="mt-4 pt-2 border-t border-gray-700">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="border-neon-blue text-neon-blue"
                              onClick={() => {
                                toast.success(`Exportando ingressos de ${event.title}`);
                              }}
                            >
                              <FileText className="h-4 w-4 mr-2" />
                              Ver detalhes
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            
            {currentTab === 'users' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Gerenciar Usuários</h2>
                
                <div className="space-y-4">
                  {users.map((user) => (
                    <Card key={user.id} className="bg-dark-gray border-light-gray">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                          <div className="flex items-center mb-4 md:mb-0">
                            <div className={`rounded-full p-3 mr-3 ${
                              user.role === 'admin' ? 'bg-neon-purple/20' : 'bg-neon-blue/20'
                            }`}>
                              <User className={`h-5 w-5 ${
                                user.role === 'admin' ? 'text-neon-purple' : 'text-neon-blue'
                              }`} />
                            </div>
                            <div>
                              <h3 className="font-medium flex items-center">
                                {user.name}
                                {user.role === 'admin' && (
                                  <span className="ml-2 px-2 py-1 text-xs bg-neon-purple/20 text-neon-purple rounded-full">
                                    Admin
                                  </span>
                                )}
                              </h3>
                              <p className="text-sm text-gray-400">{user.email}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                Criado em {new Date(user.created_at).toLocaleDateString('pt-BR')}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="border-neon-blue text-neon-blue">
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </Button>
                            
                            {user.role !== 'admin' && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="border-red-500 text-red-500"
                                onClick={() => {
                                  toast.success(`Usuário ${user.name} removido`);
                                }}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Remover
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            
            {currentTab === 'settings' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Configurações</h2>
                
                <Card className="bg-dark-gray border-light-gray mb-6">
                  <CardHeader>
                    <CardTitle>Configurações Gerais</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <div>
                        <h3 className="font-medium">Modo manutenção</h3>
                        <p className="text-sm text-gray-400">Coloca o site em modo de manutenção</p>
                      </div>
                      <Switch />
                    </div>
                    
                    <Separator className="bg-light-gray/30" />
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <div>
                        <h3 className="font-medium">Permitir registros</h3>
                        <p className="text-sm text-gray-400">Permitir que novos usuários se registrem</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <Separator className="bg-light-gray/30" />
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <div>
                        <h3 className="font-medium">Enviar notificações por email</h3>
                        <p className="text-sm text-gray-400">Envia emails para eventos importantes</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-dark-gray border-light-gray">
                  <CardHeader>
                    <CardTitle>Informações da Conta Admin</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="admin-name">Nome</Label>
                        <Input 
                          id="admin-name" 
                          defaultValue={user?.name} 
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="admin-email">Email</Label>
                        <Input 
                          id="admin-email" 
                          defaultValue={user?.email} 
                          readOnly 
                          className="bg-gray-800 border-gray-700 text-white cursor-not-allowed opacity-70"
                        />
                      </div>
                      
                      <Button className="bg-neon-blue hover:bg-neon-blue/80 mt-2">
                        Salvar Alterações
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
      
      {/* Modal para excluir evento */}
      <Dialog open={showDeleteEventDialog} onOpenChange={setShowDeleteEventDialog}>
        <DialogContent className="bg-dark-gray border-light-gray text-white">
          <DialogHeader>
            <DialogTitle className="text-red-500">Excluir evento</DialogTitle>
            <DialogDescription className="text-gray-400">
              Tem certeza que deseja excluir este evento? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowDeleteEventDialog(false)}
              className="border-gray-600 text-gray-300"
            >
              Cancelar
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDeleteEvent}
            >
              Sim, excluir evento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Modal para criar evento */}
      <Dialog open={showCreateEventDialog} onOpenChange={setShowCreateEventDialog}>
        <DialogContent className="bg-dark-gray border-light-gray text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-neon-blue">Criar novo evento</DialogTitle>
            <DialogDescription className="text-gray-400">
              Preencha os detalhes do novo evento abaixo.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateEvent}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Nome do evento</Label>
                <Input
                  id="title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Nome do evento"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Descrição do evento"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Data</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="time">Horário</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="location">Local</Label>
                <Input
                  id="location"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Local do evento"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="price">Preço do ingresso (R$)</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={newEvent.price}
                  onChange={(e) => setNewEvent({...newEvent, price: e.target.value})}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="0.00"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="image">Imagem do evento</Label>
                <Input
                  id="image"
                  type="file"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setShowCreateEventDialog(false);
                  resetNewEventForm();
                }}
                className="border-gray-600 text-gray-300"
              >
                Cancelar
              </Button>
              <Button type="submit" className="bg-neon-blue hover:bg-neon-blue/80">
                Criar Evento
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;

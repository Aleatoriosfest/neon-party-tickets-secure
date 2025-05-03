
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { BarChart, PieChart, Users, Ticket, CalendarPlus, Settings, TrendingUp, Trash2, Edit, Eye } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Event {
  id: number;
  name: string;
  date: string;
  tickets_available: number;
  tickets_sold: number;
  status: 'active' | 'completed' | 'upcoming';
}

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    eventCount: 0,
    ticketCount: 0,
    userCount: 0,
    revenue: 0
  });
  const [events, setEvents] = useState<Event[]>([]);
  const [recentUsers, setRecentUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // In a real application, these would fetch actual data from Supabase
        // For now, we'll use placeholder data
        setStats({
          eventCount: 8,
          ticketCount: 254,
          userCount: 142,
          revenue: 12760
        });

        // Mock events data
        setEvents([
          {
            id: 1,
            name: 'Aleatórios Fest 2025',
            date: '2025-05-31',
            tickets_available: 500,
            tickets_sold: 125,
            status: 'upcoming'
          },
          {
            id: 2,
            name: 'Element\'s Music Festival',
            date: '2025-07-15',
            tickets_available: 300,
            tickets_sold: 78,
            status: 'upcoming'
          },
          {
            id: 3,
            name: 'Winter Rave Party',
            date: '2025-06-20',
            tickets_available: 200,
            tickets_sold: 51,
            status: 'upcoming'
          }
        ]);

        // Mock recent users data
        setRecentUsers([
          {
            id: '1',
            name: 'Ana Silva',
            email: 'ana@exemplo.com',
            role: 'user',
            created_at: '2025-04-22'
          },
          {
            id: '2',
            name: 'Carlos Mendes',
            email: 'carlos@exemplo.com',
            role: 'admin',
            created_at: '2025-04-21'
          },
          {
            id: '3',
            name: 'Mariana Costa',
            email: 'mariana@exemplo.com',
            role: 'user',
            created_at: '2025-04-20'
          },
          {
            id: '4',
            name: 'Pedro Santos',
            email: 'pedro@exemplo.com',
            role: 'user',
            created_at: '2025-04-18'
          }
        ]);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        toast.error('Erro ao carregar estatísticas');
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  const handleAddEvent = () => {
    toast.info('Funcionalidade de adicionar evento em desenvolvimento');
  };

  const getStatusBadgeClasses = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-neon-blue/20 text-neon-blue';
      case 'completed':
        return 'bg-gray-500/20 text-gray-300';
      case 'upcoming':
        return 'bg-neon-purple/20 text-neon-purple';
      default:
        return 'bg-gray-500/20 text-gray-300';
    }
  };
  
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      
      <div className="container mx-auto pt-24 pb-16 px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Painel de <span className="neon-text">Controle</span>
          </h1>
          <p className="text-gray-400 mb-8">
            Bem-vindo, {user?.name}! Gerencie todos os aspectos do seu evento.
          </p>
        </motion.div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-dark-gray border-light-gray text-white h-full neon-blue-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">Eventos</CardTitle>
                <div className="h-8 w-8 rounded-full bg-neon-blue/20 flex items-center justify-center">
                  <CalendarPlus className="h-4 w-4 text-neon-blue" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.eventCount}</div>
                <p className="text-sm text-gray-400">Eventos cadastrados</p>
              </CardContent>
              <CardFooter>
                <div className="flex items-center text-xs text-neon-blue">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  <span>+2 no último mês</span>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-dark-gray border-light-gray text-white h-full neon-purple-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">Ingressos</CardTitle>
                <div className="h-8 w-8 rounded-full bg-neon-purple/20 flex items-center justify-center">
                  <Ticket className="h-4 w-4 text-neon-purple" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.ticketCount}</div>
                <p className="text-sm text-gray-400">Ingressos vendidos</p>
              </CardContent>
              <CardFooter>
                <div className="flex items-center text-xs text-neon-purple">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  <span>+35 na última semana</span>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-dark-gray border-light-gray text-white h-full neon-green-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">Usuários</CardTitle>
                <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Users className="h-4 w-4 text-green-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.userCount}</div>
                <p className="text-sm text-gray-400">Usuários cadastrados</p>
              </CardContent>
              <CardFooter>
                <div className="flex items-center text-xs text-green-500">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  <span>+12 na última semana</span>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-dark-gray border-light-gray text-white h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">Receita</CardTitle>
                <div className="h-8 w-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <BarChart className="h-4 w-4 text-orange-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">R$ {stats.revenue.toLocaleString()}</div>
                <p className="text-sm text-gray-400">Receita total</p>
              </CardContent>
              <CardFooter>
                <div className="flex items-center text-xs text-orange-500">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  <span>+R$ 1.750 no último mês</span>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
        
        {/* Events Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-10"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <CalendarPlus className="mr-2 h-6 w-6 text-neon-purple" />
              Eventos
            </h2>
            <Button 
              className="bg-neon-purple hover:bg-neon-purple/80"
              onClick={handleAddEvent}
            >
              <CalendarPlus className="mr-2 h-4 w-4" />
              Novo Evento
            </Button>
          </div>
          
          <div className="bg-dark-gray border border-light-gray rounded-lg overflow-hidden neon-purple-border">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-700">
                    <TableHead className="text-left text-gray-400">Nome do Evento</TableHead>
                    <TableHead className="text-left text-gray-400">Data</TableHead>
                    <TableHead className="text-center text-gray-400">Ingressos Vendidos</TableHead>
                    <TableHead className="text-center text-gray-400">Status</TableHead>
                    <TableHead className="text-right text-gray-400">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map((event) => (
                    <TableRow 
                      key={event.id} 
                      className="border-b border-gray-800 hover:bg-gray-800/30"
                    >
                      <TableCell className="font-medium text-white">{event.name}</TableCell>
                      <TableCell>{new Date(event.date).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell className="text-center">
                        {event.tickets_sold} / {event.tickets_available}
                        <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                          <div 
                            className="bg-neon-purple h-1.5 rounded-full" 
                            style={{ width: `${(event.tickets_sold / event.tickets_available) * 100}%` }}
                          ></div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClasses(event.status)}`}>
                          {event.status === 'active' ? 'Ativo' : 
                           event.status === 'completed' ? 'Concluído' : 
                           'Em breve'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-dark-gray border-gray-700">
                            <DropdownMenuItem className="cursor-pointer hover:bg-gray-800">
                              <Eye className="mr-2 h-4 w-4" />
                              <span>Ver detalhes</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer hover:bg-gray-800">
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Editar</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-gray-700" />
                            <DropdownMenuItem className="cursor-pointer hover:bg-gray-800 text-red-500">
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Excluir</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="p-4 text-center">
              <Button variant="outline" className="border-light-gray text-white hover:bg-light-gray/10">
                Ver Todos os Eventos
              </Button>
            </div>
          </div>
        </motion.div>
        
        {/* Users Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Users className="mr-2 h-6 w-6 text-green-500" />
              Usuários Recentes
            </h2>
          </div>
          
          <div className="bg-dark-gray border border-light-gray rounded-lg overflow-hidden neon-green-border">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-700">
                    <TableHead className="text-left text-gray-400">Nome</TableHead>
                    <TableHead className="text-left text-gray-400">Email</TableHead>
                    <TableHead className="text-left text-gray-400">Tipo</TableHead>
                    <TableHead className="text-left text-gray-400">Data de Cadastro</TableHead>
                    <TableHead className="text-right text-gray-400">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentUsers.map((user) => (
                    <TableRow 
                      key={user.id} 
                      className="border-b border-gray-800 hover:bg-gray-800/30"
                    >
                      <TableCell className="font-medium text-white">{user.name}</TableCell>
                      <TableCell className="text-gray-300">{user.email}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.role === 'admin' 
                            ? 'bg-blue-500/20 text-blue-300' 
                            : 'bg-purple-500/20 text-purple-300'
                        }`}>
                          {user.role}
                        </span>
                      </TableCell>
                      <TableCell className="text-gray-400">{user.created_at}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="p-4 text-center">
              <Button variant="outline" className="border-light-gray text-white hover:bg-light-gray/10">
                Ver Todos os Usuários
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;

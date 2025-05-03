
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { BarChart, Users, Ticket, CalendarPlus, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    eventCount: 0,
    ticketCount: 0,
    userCount: 0
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // In a real application, these would fetch actual data from Supabase
        // For now, we'll use placeholder data
        setStats({
          eventCount: 5,
          ticketCount: 125,
          userCount: 75
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        toast.error('Erro ao carregar estatísticas');
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);
  
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-dark-gray border-light-gray text-white">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">Eventos</CardTitle>
                <BarChart className="h-5 w-5 text-neon-blue" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.eventCount}</div>
                <p className="text-sm text-gray-400">Eventos cadastrados</p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-dark-gray border-light-gray text-white">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">Ingressos</CardTitle>
                <Ticket className="h-5 w-5 text-neon-purple" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.ticketCount}</div>
                <p className="text-sm text-gray-400">Ingressos vendidos</p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-dark-gray border-light-gray text-white">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">Usuários</CardTitle>
                <Users className="h-5 w-5 text-neon-green" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.userCount}</div>
                <p className="text-sm text-gray-400">Usuários cadastrados</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        {/* Action Cards */}
        <h2 className="text-2xl font-bold text-white mb-6">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-dark-gray border-light-gray text-white h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarPlus size={20} className="text-neon-purple" />
                  Criar Evento
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Adicione um novo evento ao catálogo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-neon-purple hover:bg-neon-purple/80">
                  Novo Evento
                </Button>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="bg-dark-gray border-light-gray text-white h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ticket size={20} className="text-neon-blue" />
                  Gerenciar Ingressos
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Verificação e controle de ingressos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full border-neon-blue text-neon-blue hover:bg-neon-blue/20">
                  Ver Ingressos
                </Button>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="bg-dark-gray border-light-gray text-white h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings size={20} className="text-neon-green" />
                  Configurações
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Configure preferências e opções
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full border-light-gray text-white hover:bg-light-gray/10">
                  Configurar
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        {/* Users Table */}
        <div className="bg-dark-gray border border-light-gray rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Users size={20} />
            Usuários Recentes
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-light-gray/30">
                <tr>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Nome</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Email</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Tipo</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Data</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-light-gray/10 hover:bg-light-gray/5">
                  <td className="py-3 px-4 text-white">Ana Silva</td>
                  <td className="py-3 px-4 text-gray-300">ana@exemplo.com</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300">user</span>
                  </td>
                  <td className="py-3 px-4 text-gray-400">22/04/2025</td>
                </tr>
                <tr className="border-b border-light-gray/10 hover:bg-light-gray/5">
                  <td className="py-3 px-4 text-white">Carlos Mendes</td>
                  <td className="py-3 px-4 text-gray-300">carlos@exemplo.com</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300">admin</span>
                  </td>
                  <td className="py-3 px-4 text-gray-400">21/04/2025</td>
                </tr>
                <tr className="hover:bg-light-gray/5">
                  <td className="py-3 px-4 text-white">Mariana Costa</td>
                  <td className="py-3 px-4 text-gray-300">mariana@exemplo.com</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300">user</span>
                  </td>
                  <td className="py-3 px-4 text-gray-400">20/04/2025</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 flex justify-center">
            <Button variant="outline" className="border-light-gray text-white hover:bg-light-gray/10">
              Ver Todos os Usuários
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;

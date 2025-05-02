
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Users, Ticket, CalendarDays } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  // Mock data - in a real app, this would come from an API or database
  const stats = {
    ticketsSold: 387,
    activeEvents: 4,
    registeredUsers: 412,
    revenue: 'R$ 14.650,00'
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-dark-gray border-light-gray text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Ingressos Vendidos</CardTitle>
              <Ticket className="h-4 w-4 text-neon-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.ticketsSold}</div>
              <p className="text-xs text-gray-400 mt-1">+24% em relação ao último evento</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="bg-dark-gray border-light-gray text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Eventos Ativos</CardTitle>
              <CalendarDays className="h-4 w-4 text-neon-purple" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeEvents}</div>
              <p className="text-xs text-gray-400 mt-1">2 eventos agendados para Junho</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="bg-dark-gray border-light-gray text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Usuários Cadastrados</CardTitle>
              <Users className="h-4 w-4 text-neon-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.registeredUsers}</div>
              <p className="text-xs text-gray-400 mt-1">+18 novos nas últimas 24h</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="bg-dark-gray border-light-gray text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Faturamento Total</CardTitle>
              <BarChart className="h-4 w-4 text-neon-purple" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.revenue}</div>
              <p className="text-xs text-gray-400 mt-1">+32% em relação ao mês anterior</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-dark-gray border-light-gray text-white">
          <CardHeader>
            <CardTitle>Eventos Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-light-gray/30">
                <div>
                  <p className="font-medium">ALEATÓRIOS FEST</p>
                  <p className="text-sm text-gray-400">31 de Maio, 2025</p>
                </div>
                <div className="bg-green-900/30 text-green-400 text-xs rounded-full px-2 py-1">
                  Ativo
                </div>
              </div>
              
              <div className="flex items-center justify-between pb-2 border-b border-light-gray/30">
                <div>
                  <p className="font-medium">PROJETO X: Virada Eletrônica</p>
                  <p className="text-sm text-gray-400">28 de Maio, 2025</p>
                </div>
                <div className="bg-green-900/30 text-green-400 text-xs rounded-full px-2 py-1">
                  Ativo
                </div>
              </div>
              
              <div className="flex items-center justify-between pb-2 border-b border-light-gray/30">
                <div>
                  <p className="font-medium">Neon Night</p>
                  <p className="text-sm text-gray-400">12 de Junho, 2025</p>
                </div>
                <div className="bg-blue-900/30 text-blue-400 text-xs rounded-full px-2 py-1">
                  Programado
                </div>
              </div>
              
              <div className="flex items-center justify-between pb-2">
                <div>
                  <p className="font-medium">After Party Element's</p>
                  <p className="text-sm text-gray-400">25 de Abril, 2025</p>
                </div>
                <div className="bg-gray-800 text-gray-400 text-xs rounded-full px-2 py-1">
                  Finalizado
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-dark-gray border-light-gray text-white">
          <CardHeader>
            <CardTitle>Últimas Vendas de Ingressos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-light-gray/30">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-neon-purple/20 flex items-center justify-center text-neon-purple">
                    MC
                  </div>
                  <div>
                    <p className="font-medium">Marcos Costa</p>
                    <p className="text-xs text-gray-400">há 2 horas</p>
                  </div>
                </div>
                <div className="text-white">R$ 30,00</div>
              </div>
              
              <div className="flex items-center justify-between pb-2 border-b border-light-gray/30">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-neon-blue/20 flex items-center justify-center text-neon-blue">
                    LS
                  </div>
                  <div>
                    <p className="font-medium">Laura Santos</p>
                    <p className="text-xs text-gray-400">há 3 horas</p>
                  </div>
                </div>
                <div className="text-white">R$ 20,00</div>
              </div>
              
              <div className="flex items-center justify-between pb-2 border-b border-light-gray/30">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-neon-purple/20 flex items-center justify-center text-neon-purple">
                    RF
                  </div>
                  <div>
                    <p className="font-medium">Ricardo Ferreira</p>
                    <p className="text-xs text-gray-400">há 5 horas</p>
                  </div>
                </div>
                <div className="text-white">R$ 30,00</div>
              </div>
              
              <div className="flex items-center justify-between pb-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-neon-blue/20 flex items-center justify-center text-neon-blue">
                    JP
                  </div>
                  <div>
                    <p className="font-medium">Julia Pereira</p>
                    <p className="text-xs text-gray-400">há 6 horas</p>
                  </div>
                </div>
                <div className="text-white">R$ 20,00</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;

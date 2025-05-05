
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminDashboardComponent from '@/components/admin/AdminDashboard';
import AdminEvents from '@/components/admin/AdminEvents';
import AdminTickets from '@/components/admin/AdminTickets';
import AdminUsers from '@/components/admin/AdminUsers';
import AdminSettings from '@/components/admin/AdminSettings';
import AdminVerification from '@/components/admin/AdminVerification';
import { Shield, Calendar, Ticket, Users, Settings, QrCode } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Redirecionamento se o usuário não for administrador
  if (!loading && (!user || user.role !== 'admin')) {
    navigate('/access-denied');
    return null;
  }
  
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white mb-8 text-center"
        >
          <span className="neon-text">Dashboard</span> Administrativo
        </motion.h1>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar - vertical on desktop, horizontal tabs on mobile */}
          <div className="lg:w-64">
            <div className="hidden lg:block">
              <div className="glass p-4 rounded-lg">
                <div className="space-y-2">
                  <Button
                    variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
                    className={`w-full justify-start ${activeTab === 'dashboard' ? 'bg-neon-blue text-black' : 'text-white'}`}
                    onClick={() => setActiveTab('dashboard')}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                  <Button
                    variant={activeTab === 'events' ? 'default' : 'ghost'}
                    className={`w-full justify-start ${activeTab === 'events' ? 'bg-neon-blue text-black' : 'text-white'}`}
                    onClick={() => setActiveTab('events')}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Eventos
                  </Button>
                  <Button
                    variant={activeTab === 'tickets' ? 'default' : 'ghost'}
                    className={`w-full justify-start ${activeTab === 'tickets' ? 'bg-neon-blue text-black' : 'text-white'}`}
                    onClick={() => setActiveTab('tickets')}
                  >
                    <Ticket className="mr-2 h-4 w-4" />
                    Ingressos
                  </Button>
                  <Button
                    variant={activeTab === 'users' ? 'default' : 'ghost'}
                    className={`w-full justify-start ${activeTab === 'users' ? 'bg-neon-blue text-black' : 'text-white'}`}
                    onClick={() => setActiveTab('users')}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Usuários
                  </Button>
                  <Button
                    variant={activeTab === 'verification' ? 'default' : 'ghost'}
                    className={`w-full justify-start ${activeTab === 'verification' ? 'bg-neon-blue text-black' : 'text-white'}`}
                    onClick={() => setActiveTab('verification')}
                  >
                    <QrCode className="mr-2 h-4 w-4" />
                    Validar QR
                  </Button>
                  <Button
                    variant={activeTab === 'settings' ? 'default' : 'ghost'}
                    className={`w-full justify-start ${activeTab === 'settings' ? 'bg-neon-blue text-black' : 'text-white'}`}
                    onClick={() => setActiveTab('settings')}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Configurações
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Mobile tabs */}
            <div className="lg:hidden">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4">
                  <TabsTrigger value="dashboard" className="text-xs flex flex-col items-center p-2">
                    <Shield className="h-4 w-4 mb-1" />
                    <span>Dashboard</span>
                  </TabsTrigger>
                  <TabsTrigger value="events" className="text-xs flex flex-col items-center p-2">
                    <Calendar className="h-4 w-4 mb-1" />
                    <span>Eventos</span>
                  </TabsTrigger>
                  <TabsTrigger value="tickets" className="text-xs flex flex-col items-center p-2">
                    <Ticket className="h-4 w-4 mb-1" />
                    <span>Ingressos</span>
                  </TabsTrigger>
                  <TabsTrigger value="users" className="text-xs flex flex-col items-center p-2">
                    <Users className="h-4 w-4 mb-1" />
                    <span>Usuários</span>
                  </TabsTrigger>
                  <TabsTrigger value="verification" className="text-xs flex flex-col items-center p-2">
                    <QrCode className="h-4 w-4 mb-1" />
                    <span>QR Code</span>
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="text-xs flex flex-col items-center p-2">
                    <Settings className="h-4 w-4 mb-1" />
                    <span>Config</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1 glass p-6 rounded-lg">
            {activeTab === 'dashboard' && <AdminDashboardComponent />}
            {activeTab === 'events' && <AdminEvents />}
            {activeTab === 'tickets' && <AdminTickets />}
            {activeTab === 'users' && <AdminUsers />}
            {activeTab === 'verification' && <AdminVerification />}
            {activeTab === 'settings' && <AdminSettings />}
          </div>
        </div>
        
        <div className="mt-8 text-center lg:hidden">
          <Button
            variant="outline"
            className="border-light-gray text-white hover:bg-light-gray/10"
            onClick={() => navigate('/admin')}
          >
            Voltar para o Painel
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;

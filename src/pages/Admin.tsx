
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminDashboard from '@/components/admin/AdminDashboard';
import AdminEvents from '@/components/admin/AdminEvents';
import AdminTickets from '@/components/admin/AdminTickets';
import AdminUsers from '@/components/admin/AdminUsers';
import AdminVerification from '@/components/admin/AdminVerification';
import AdminSettings from '@/components/admin/AdminSettings';
import { QrCode, Users, Calendar, Ticket, Settings, BarChart } from 'lucide-react';

const Admin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Check if user is logged in and is an admin
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser') 
      ? JSON.parse(localStorage.getItem('currentUser') || '{}') 
      : null;
    
    if (currentUser && currentUser.role === 'admin') {
      setIsLoggedIn(true);
    }
  }, []);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Implementação simples - em um sistema real deveria usar autenticação segura
    if (username === 'admin' && password === 'projetox2025') {
      const adminUser = {
        email: 'admin@aleatoriosfest.com',
        name: 'Administrador',
        role: 'admin'
      };
      
      localStorage.setItem('currentUser', JSON.stringify(adminUser));
      setIsLoggedIn(true);
      toast.success('Login realizado com sucesso!');
    } else {
      toast.error('Usuário ou senha inválidos');
    }
  };
  
  const handleChangeTab = (tab: string) => {
    setActiveTab(tab);
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
        
        {!isLoggedIn ? (
          <div className="max-w-md mx-auto">
            <div className="glass p-6 rounded-lg">
              <motion.form 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleLogin}
                className="space-y-6"
              >
                <div>
                  <label className="block text-white mb-2">Usuário</label>
                  <Input 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-dark-gray border-light-gray text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-white mb-2">Senha</label>
                  <Input 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="bg-dark-gray border-light-gray text-white"
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-neon-purple hover:bg-neon-purple/80 text-white font-bold"
                >
                  Login
                </Button>
              </motion.form>
            </div>
          </div>
        ) : (
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
                    onClick={() => {
                      localStorage.removeItem('currentUser');
                      setIsLoggedIn(false);
                      toast.info('Logout realizado com sucesso');
                    }}
                  >
                    Sair
                  </Button>
                </div>
              </div>
              
              {/* Content Area */}
              <div className="flex-1 glass rounded-lg p-6">
                {activeTab === 'dashboard' && <AdminDashboard />}
                {activeTab === 'events' && <AdminEvents />}
                {activeTab === 'tickets' && <AdminTickets />}
                {activeTab === 'users' && <AdminUsers />}
                {activeTab === 'verification' && <AdminVerification />}
                {activeTab === 'settings' && <AdminSettings />}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Admin;


import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/sonner';

const AdminLandingPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    if (user.role !== 'admin') {
      navigate('/access-denied');
      return;
    }
  }, [user, navigate]);
  
  // Get current date for the event display
  const eventDate = "31 de Maio, 2025";

  return (
    <div className="min-h-screen bg-dark flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-16 pb-8">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center mb-10"
          >
            {/* Admin Dashboard Logo/Header */}
            <img 
              src="/lovable-uploads/c421dee3-c58a-40c1-a803-d20d860a1a0e.png" 
              alt="Admin Dashboard Logo" 
              className="h-20 mb-4" 
            />
            <h1 className="text-5xl font-bold text-[#0CF2F2] tracking-wider mb-4">
              ADMIN DASHBOARD
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Column - Action Buttons */}
            <div className="lg:col-span-1">
              <Card className="bg-dark border border-gray-800 text-white rounded-lg overflow-hidden">
                <CardContent className="p-6 flex flex-col gap-4">
                  <Button 
                    variant="outline" 
                    className="border-[#0CF2F2] text-white h-16 text-lg font-medium hover:bg-[#0CF2F2]/20"
                  >
                    Criar Novo Evento
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="border-[#0CF2F2] text-white h-16 text-lg font-medium hover:bg-[#0CF2F2]/20"
                  >
                    Editar Evento
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="border-[#0CF2F2] text-white h-16 text-lg font-medium hover:bg-[#0CF2F2]/20"
                  >
                    Ver Compradores
                  </Button>
                  
                  <Link to="/">
                    <Button 
                      variant="outline" 
                      className="w-full border-[#0CF2F2] text-white h-16 text-lg font-medium hover:bg-[#0CF2F2]/20"
                    >
                      Voltar ao Site
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Events Management */}
            <div className="lg:col-span-3">
              <Card className="bg-dark border border-gray-800 text-white mb-6">
                <CardContent className="p-8">
                  <h2 className="text-4xl font-bold text-white mb-6">
                    Gerenciar Eventos
                  </h2>

                  {/* Event Card */}
                  <div className="bg-dark border border-gray-800 rounded-lg p-6 mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                      <div className="mb-4 md:mb-0">
                        <h3 className="text-4xl font-bold text-white mb-2">
                          ALEATÓRIOS FEST
                        </h3>
                        <p className="text-xl text-gray-300">
                          {eventDate}
                        </p>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        className="border-[#0CF2F2] text-white hover:bg-[#0CF2F2]/20"
                      >
                        Ver Mais
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border border-yellow-500/30 bg-yellow-900/10 rounded-lg">
                    <p className="text-xl text-center text-white">
                      Acesso negado. Área exclusiva para administradores.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Stats and Graphs Section */}
              <Card className="bg-dark border border-gray-800 text-white">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Estatísticas de Ingressos
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Ticket Sales by Gender */}
                    <div className="bg-dark-gray border border-gray-700 rounded-lg p-4">
                      <h3 className="text-xl text-[#0CF2F2] mb-4">Vendas por Gênero</h3>
                      <div className="flex items-center justify-center h-52">
                        <div className="flex w-full justify-between">
                          <div className="text-center">
                            <div className="text-4xl font-bold text-[#0CF2F2]">45</div>
                            <div className="text-gray-400">Homens</div>
                          </div>
                          <div className="text-center">
                            <div className="text-4xl font-bold text-[#9D4EDD]">70</div>
                            <div className="text-gray-400">Mulheres</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Sales Trend */}
                    <div className="bg-dark-gray border border-gray-700 rounded-lg p-4">
                      <h3 className="text-xl text-[#0CF2F2] mb-4">Tendência de Vendas</h3>
                      <div className="flex items-center justify-center h-52">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-green-500">↑ 28%</div>
                          <div className="text-gray-400">Aumento na última semana</div>
                          <div className="text-xl font-bold text-white mt-2">115 ingressos</div>
                          <div className="text-gray-400">vendidos no total</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminLandingPage;

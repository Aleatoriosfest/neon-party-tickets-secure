
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/sonner';
import { Check, X, QrCode, RefreshCw } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const QRCodeValidator: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [ticketCode, setTicketCode] = useState('');
  const [scanning, setScanning] = useState(false);
  const [validation, setValidation] = useState<{
    status: 'valid' | 'invalid' | 'used' | null;
    ticket?: any;
  }>({ status: null });
  const [recentValidations, setRecentValidations] = useState<Array<{
    ticketCode: string;
    status: 'valid' | 'invalid' | 'used';
    timestamp: Date;
  }>>([]);

  useEffect(() => {
    // Check if user is admin, if not redirect
    if (!isAdmin) {
      toast.error('Acesso negado', {
        description: 'Você não tem permissão para acessar esta página'
      });
      navigate('/access-denied');
    }
    
    // Try to access camera if supported
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // QR code scanning logic would be implemented here
      // For this example, we'll just use manual input
    }
  }, [isAdmin, navigate]);

  const validateTicket = async () => {
    if (!ticketCode.trim()) {
      toast.error('Por favor, insira um código de ingresso');
      return;
    }
    
    setScanning(true);
    
    try {
      // Query the ticket in the database
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .eq('ticket_number', ticketCode)
        .single();
      
      if (error) {
        setValidation({ status: 'invalid' });
        setRecentValidations(prev => [{
          ticketCode,
          status: 'invalid',
          timestamp: new Date()
        }, ...prev.slice(0, 9)]);
        toast.error('Ingresso inválido', {
          description: 'O código não corresponde a nenhum ingresso'
        });
        return;
      }
      
      if (data.status === 'usado') {
        setValidation({ status: 'used', ticket: data });
        setRecentValidations(prev => [{
          ticketCode,
          status: 'used',
          timestamp: new Date()
        }, ...prev.slice(0, 9)]);
        toast.warning('Ingresso já utilizado', {
          description: `Este ingresso já foi utilizado anteriormente`
        });
        return;
      }
      
      // Mark the ticket as used
      const { error: updateError } = await supabase
        .from('tickets')
        .update({ status: 'usado' })
        .eq('id', data.id);
      
      if (updateError) {
        toast.error('Erro ao validar ingresso', {
          description: updateError.message
        });
        return;
      }
      
      setValidation({ status: 'valid', ticket: data });
      setRecentValidations(prev => [{
        ticketCode,
        status: 'valid',
        timestamp: new Date()
      }, ...prev.slice(0, 9)]);
      toast.success('Ingresso válido!', {
        description: 'Ingresso validado com sucesso'
      });
      
    } catch (error) {
      console.error('Error validating ticket:', error);
      toast.error('Erro ao validar ingresso');
      setValidation({ status: 'invalid' });
    } finally {
      setScanning(false);
      setTicketCode('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      validateTicket();
    }
  };

  return (
    <div className="min-h-screen bg-dark flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-16 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3 mb-8">
              <QrCode className="text-neon-blue" />
              Validação de Ingressos
            </h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Scanner Section */}
              <div className="lg:col-span-2">
                <Card className="bg-dark-gray border-light-gray text-white">
                  <CardHeader>
                    <CardTitle>Escaneie ou Digite o Código do Ingresso</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* QR Code Scanner (placeholder) */}
                    <div className="mb-6 bg-gray-800 rounded-lg p-4 h-64 flex items-center justify-center">
                      <div className="text-center">
                        <QrCode size={80} className="mx-auto mb-4 text-gray-500" />
                        <p className="text-gray-400">Câmera de escaneamento de QR Code</p>
                        <p className="text-gray-500 text-sm">Para validar um ingresso, você pode usar a câmera ou digitar o código manualmente abaixo</p>
                      </div>
                    </div>
                    
                    {/* Manual Input */}
                    <div className="flex gap-2">
                      <Input
                        placeholder="Digite o código do ingresso"
                        value={ticketCode}
                        onChange={(e) => setTicketCode(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="bg-gray-800 border-gray-700"
                      />
                      <Button 
                        onClick={validateTicket} 
                        disabled={scanning || !ticketCode.trim()} 
                        className="bg-neon-blue hover:bg-neon-blue/80 text-black"
                      >
                        {scanning ? <RefreshCw className="h-4 w-4 animate-spin" /> : "Validar"}
                      </Button>
                    </div>
                    
                    {/* Validation Result */}
                    {validation.status && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className={`mt-6 p-4 rounded-lg ${
                          validation.status === 'valid' 
                            ? 'bg-green-900/20 border border-green-500/30' 
                            : validation.status === 'used' 
                              ? 'bg-yellow-900/20 border border-yellow-500/30'
                              : 'bg-red-900/20 border border-red-500/30'
                        }`}
                      >
                        <div className="flex items-center">
                          {validation.status === 'valid' ? (
                            <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center mr-4">
                              <Check className="h-6 w-6 text-green-400" />
                            </div>
                          ) : validation.status === 'used' ? (
                            <div className="h-10 w-10 rounded-full bg-yellow-500/20 flex items-center justify-center mr-4">
                              <RefreshCw className="h-6 w-6 text-yellow-400" />
                            </div>
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-red-500/20 flex items-center justify-center mr-4">
                              <X className="h-6 w-6 text-red-400" />
                            </div>
                          )}
                          
                          <div>
                            {validation.status === 'valid' ? (
                              <>
                                <h3 className="text-lg font-medium text-green-400">Ingresso Válido</h3>
                                {validation.ticket && (
                                  <p className="text-gray-300">Ingresso #{validation.ticket.ticket_number}</p>
                                )}
                              </>
                            ) : validation.status === 'used' ? (
                              <>
                                <h3 className="text-lg font-medium text-yellow-400">Ingresso Já Utilizado</h3>
                                {validation.ticket && (
                                  <p className="text-gray-300">Ingresso #{validation.ticket.ticket_number} já foi validado anteriormente</p>
                                )}
                              </>
                            ) : (
                              <h3 className="text-lg font-medium text-red-400">Ingresso Inválido</h3>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              {/* Recent Validations */}
              <div>
                <Card className="bg-dark-gray border-light-gray text-white h-full">
                  <CardHeader>
                    <CardTitle>Validações Recentes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {recentValidations.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">Nenhuma validação recente</p>
                    ) : (
                      <div className="space-y-3">
                        {recentValidations.map((validation, index) => (
                          <div 
                            key={index}
                            className="p-3 border-b border-gray-800 flex items-center justify-between"
                          >
                            <div>
                              <div className="flex items-center">
                                {validation.status === 'valid' ? (
                                  <Check className="h-4 w-4 text-green-400 mr-2" />
                                ) : validation.status === 'used' ? (
                                  <RefreshCw className="h-4 w-4 text-yellow-400 mr-2" />
                                ) : (
                                  <X className="h-4 w-4 text-red-400 mr-2" />
                                )}
                                <span className="font-medium">#{validation.ticketCode}</span>
                              </div>
                              <p className="text-xs text-gray-500">
                                {validation.timestamp.toLocaleTimeString()}
                              </p>
                            </div>
                            <span className={`text-sm ${
                              validation.status === 'valid' 
                                ? 'text-green-400' 
                                : validation.status === 'used' 
                                  ? 'text-yellow-400'
                                  : 'text-red-400'
                            }`}>
                              {validation.status === 'valid' 
                                ? 'Válido' 
                                : validation.status === 'used' 
                                  ? 'Já Usado'
                                  : 'Inválido'}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default QRCodeValidator;

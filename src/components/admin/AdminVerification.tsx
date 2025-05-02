
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { QrCode, Check, X, Search, Clock, TicketCheck, Filter, DownloadCloud } from 'lucide-react';

// Mock data for check-in events
const mockCheckIns = [
  {
    id: "CHECKIN-001",
    ticketId: "TX-2025-001",
    customerName: "Marcos Costa",
    eventName: "ALEATÓRIOS FEST",
    timestamp: "19:15:23 - 31/05/2025",
    status: "success"
  },
  {
    id: "CHECKIN-002",
    ticketId: "TX-2025-003",
    customerName: "Ricardo Ferreira",
    eventName: "PROJETO X: Virada Eletrônica",
    timestamp: "22:05:47 - 28/05/2025",
    status: "success"
  },
  {
    id: "CHECKIN-003",
    ticketId: "TX-2025-002",
    customerName: "Laura Santos",
    eventName: "ALEATÓRIOS FEST",
    timestamp: "18:37:12 - 31/05/2025", 
    status: "success"
  },
  {
    id: "CHECKIN-004",
    ticketId: "TX-FAKE-001",
    customerName: "Ingresso Inválido",
    eventName: "ALEATÓRIOS FEST",
    timestamp: "20:14:05 - 31/05/2025",
    status: "error"
  }
];

// Mock data for expected attendees 
const mockExpectedAttendees = [
  {
    id: "TX-2025-001",
    customerName: "Marcos Costa",
    eventName: "ALEATÓRIOS FEST",
    ticketType: "Homem",
    status: "checked-in"
  },
  {
    id: "TX-2025-002",
    customerName: "Laura Santos",
    eventName: "ALEATÓRIOS FEST",
    ticketType: "Mulher",
    status: "checked-in"
  },
  {
    id: "TX-2025-003",
    customerName: "Ricardo Ferreira",
    eventName: "PROJETO X: Virada Eletrônica",
    ticketType: "VIP",
    status: "checked-in"
  },
  {
    id: "TX-2025-004",
    customerName: "Julia Pereira",
    eventName: "PROJETO X: Virada Eletrônica",
    ticketType: "Standard",
    status: "pending"
  },
  {
    id: "TX-2025-005",
    customerName: "Bruno Silva",
    eventName: "ALEATÓRIOS FEST",
    ticketType: "Homem",
    status: "cancelled"
  },
  {
    id: "TX-2025-007",
    customerName: "Ana Paula",
    eventName: "ALEATÓRIOS FEST",
    ticketType: "Mulher",
    status: "pending"
  }
];

const AdminVerification: React.FC = () => {
  const [checkIns, setCheckIns] = useState(mockCheckIns);
  const [attendees, setAttendees] = useState(mockExpectedAttendees);
  const [qrCode, setQrCode] = useState('');
  const [scanResult, setScanResult] = useState<null | { valid: boolean; message: string; details?: any }>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleScanQR = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!qrCode.trim()) {
      toast.error('Por favor, insira um código QR válido');
      return;
    }
    
    setIsScanning(true);
    
    // Simulate a scanning process
    setTimeout(() => {
      // Find if this ticket exists in expected attendees
      const ticket = attendees.find(ticket => ticket.id === qrCode);
      
      if (ticket) {
        if (ticket.status === 'checked-in') {
          setScanResult({ 
            valid: false, 
            message: 'Ingresso já utilizado!', 
            details: ticket 
          });
          toast.error('Ingresso já foi utilizado');
        } else if (ticket.status === 'cancelled') {
          setScanResult({ 
            valid: false, 
            message: 'Ingresso cancelado!', 
            details: ticket 
          });
          toast.error('Ingresso cancelado');
        } else {
          // Valid ticket, mark as checked in
          const updatedAttendees = attendees.map(t => 
            t.id === ticket.id ? { ...t, status: 'checked-in' } : t
          );
          setAttendees(updatedAttendees);
          
          // Add to check-in log
          const newCheckIn = {
            id: `CHECKIN-${String(checkIns.length + 1).padStart(3, '0')}`,
            ticketId: ticket.id,
            customerName: ticket.customerName,
            eventName: ticket.eventName,
            timestamp: new Date().toLocaleTimeString('pt-BR') + ' - ' + new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }),
            status: 'success'
          };
          setCheckIns([newCheckIn, ...checkIns]);
          
          setScanResult({ 
            valid: true, 
            message: 'Ingresso válido! Acesso permitido.', 
            details: ticket 
          });
          toast.success('Ingresso válido! Entrada permitida');
        }
      } else {
        // Invalid ticket
        const newCheckIn = {
          id: `CHECKIN-${String(checkIns.length + 1).padStart(3, '0')}`,
          ticketId: qrCode,
          customerName: 'Ingresso Inválido',
          eventName: 'N/A',
          timestamp: new Date().toLocaleTimeString('pt-BR') + ' - ' + new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }),
          status: 'error'
        };
        setCheckIns([newCheckIn, ...checkIns]);
        
        setScanResult({ 
          valid: false, 
          message: 'Ingresso inválido ou não encontrado!' 
        });
        toast.error('Ingresso inválido ou não encontrado');
      }
      
      setIsScanning(false);
      setQrCode('');
    }, 1000);
  };
  
  // Filter attendees by event and search query
  const filteredAttendees = attendees.filter(attendee => {
    const matchesEvent = selectedEvent === 'all' || attendee.eventName.includes(selectedEvent);
    const matchesSearch = 
      attendee.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attendee.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesEvent && matchesSearch;
  });
  
  // Manually mark an attendee as checked in
  const markAsCheckedIn = (ticketId: string) => {
    const updatedAttendees = attendees.map(ticket => 
      ticket.id === ticketId ? { ...ticket, status: 'checked-in' } : ticket
    );
    setAttendees(updatedAttendees);
    
    const ticket = attendees.find(t => t.id === ticketId);
    if (ticket) {
      // Add to check-in log
      const newCheckIn = {
        id: `CHECKIN-${String(checkIns.length + 1).padStart(3, '0')}`,
        ticketId,
        customerName: ticket.customerName,
        eventName: ticket.eventName,
        timestamp: new Date().toLocaleTimeString('pt-BR') + ' - ' + new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }),
        status: 'success'
      };
      setCheckIns([newCheckIn, ...checkIns]);
    }
    
    toast.success('Check-in realizado manualmente');
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Verificação de Ingressos</h2>
        
        <Button
          variant="outline"
          className="border-neon-blue text-neon-blue hover:bg-neon-blue/10"
          onClick={() => toast.success('Relatório exportado com sucesso!')}
        >
          <DownloadCloud size={16} className="mr-2" /> Exportar Relatório
        </Button>
      </div>
      
      <Tabs defaultValue="scanner" className="mb-6">
        <TabsList>
          <TabsTrigger value="scanner">Scanner QR Code</TabsTrigger>
          <TabsTrigger value="checklist">Lista de Check-in</TabsTrigger>
          <TabsTrigger value="logs">Logs de Verificação</TabsTrigger>
        </TabsList>
        
        <TabsContent value="scanner">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-4">Escanear Ingresso</h3>
              
              <form onSubmit={handleScanQR} className="space-y-4">
                <div>
                  <label className="block text-white mb-2">Código QR</label>
                  <div className="relative">
                    <QrCode className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input 
                      value={qrCode}
                      onChange={(e) => setQrCode(e.target.value)}
                      className="pl-10 bg-dark-gray border-light-gray text-white"
                      placeholder="Digite o código QR ou use o scanner"
                      disabled={isScanning}
                    />
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button 
                    type="submit"
                    className="flex-1 bg-neon-blue hover:bg-neon-blue/80 text-black font-bold"
                    disabled={isScanning}
                  >
                    {isScanning ? (
                      <>
                        <div className="animate-spin mr-2">
                          <Clock size={16} />
                        </div>
                        Verificando...
                      </>
                    ) : (
                      <>Verificar Código</>
                    )}
                  </Button>
                  
                  <Button 
                    type="button"
                    variant="outline"
                    className="flex-1 border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-black"
                    onClick={() => {
                      // Em uma aplicação real, aqui integraria com a câmera para leitura de QR
                      toast.info('Funcionalidade de scanner em desenvolvimento');
                    }}
                    disabled={isScanning}
                  >
                    Usar Scanner
                  </Button>
                </div>
              </form>
            </div>
            
            {scanResult && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-6 rounded-lg ${scanResult.valid ? 'bg-green-900/30' : 'bg-red-900/30'} h-full`}
              >
                <div className="flex items-center space-x-2 mb-4">
                  {scanResult.valid ? (
                    <div className="p-2 bg-green-500/20 rounded-full">
                      <Check className="text-green-400" size={24} />
                    </div>
                  ) : (
                    <div className="p-2 bg-red-500/20 rounded-full">
                      <X className="text-red-400" size={24} />
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-white">
                    {scanResult.valid ? 'Acesso Permitido' : 'Acesso Negado'}
                  </h3>
                </div>
                
                <p className="text-white mb-4">{scanResult.message}</p>
                
                {scanResult.details && (
                  <div className="bg-dark-gray/50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-gray-400">Ingresso:</p>
                        <p className="text-white font-mono">{scanResult.details.id}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Evento:</p>
                        <p className="text-white">{scanResult.details.eventName}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Cliente:</p>
                        <p className="text-white">{scanResult.details.customerName}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Tipo:</p>
                        <p className="text-white">{scanResult.details.ticketType}</p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="checklist">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar por nome ou código do ingresso..."
                    className="pl-10 bg-dark-gray text-white border-light-gray/30 w-full"
                  />
                </div>
              </div>
              
              <div className="md:w-48">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <select
                    value={selectedEvent}
                    onChange={(e) => setSelectedEvent(e.target.value)}
                    className="w-full pl-10 p-2 rounded-md bg-dark-gray text-white border border-light-gray/30"
                  >
                    <option value="all">Todos Eventos</option>
                    <option value="ALEATÓRIOS FEST">ALEATÓRIOS FEST</option>
                    <option value="PROJETO X">PROJETO X</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="border border-light-gray/30 rounded-lg overflow-hidden">
              <Table>
                <TableHeader className="bg-dark-gray">
                  <TableRow className="border-b border-light-gray/30">
                    <TableHead className="text-white font-medium">ID</TableHead>
                    <TableHead className="text-white font-medium">Cliente</TableHead>
                    <TableHead className="text-white font-medium">Evento</TableHead>
                    <TableHead className="text-white font-medium">Tipo</TableHead>
                    <TableHead className="text-white font-medium">Status</TableHead>
                    <TableHead className="text-white font-medium text-right">Ação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="bg-dark-gray/50">
                  {filteredAttendees.length > 0 ? (
                    filteredAttendees.map((attendee) => (
                      <TableRow key={attendee.id} className="border-b border-light-gray/20">
                        <TableCell>
                          <div className="flex items-center">
                            <QrCode size={14} className="mr-1 text-neon-blue" />
                            <span className="text-white font-mono">{attendee.id}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-white">{attendee.customerName}</TableCell>
                        <TableCell className="text-gray-300">{attendee.eventName}</TableCell>
                        <TableCell className="text-gray-300">{attendee.ticketType}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            attendee.status === 'checked-in' 
                              ? 'bg-green-900/30 text-green-400' 
                              : attendee.status === 'pending'
                                ? 'bg-blue-900/30 text-blue-400'
                                : 'bg-red-900/30 text-red-400'
                          }`}>
                            {attendee.status === 'checked-in' 
                              ? 'Check-in realizado' 
                              : attendee.status === 'pending'
                                ? 'Pendente'
                                : 'Cancelado'
                            }
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          {attendee.status === 'pending' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-green-400 hover:bg-green-500/20"
                              onClick={() => markAsCheckedIn(attendee.id)}
                            >
                              <TicketCheck size={16} className="mr-1" /> Check-in
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6 text-gray-400">
                        Nenhum participante encontrado para esta busca.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="logs">
          <div className="border border-light-gray/30 rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-dark-gray">
                <TableRow className="border-b border-light-gray/30">
                  <TableHead className="text-white font-medium">ID</TableHead>
                  <TableHead className="text-white font-medium">Ingresso</TableHead>
                  <TableHead className="text-white font-medium">Cliente</TableHead>
                  <TableHead className="text-white font-medium">Evento</TableHead>
                  <TableHead className="text-white font-medium">Timestamp</TableHead>
                  <TableHead className="text-white font-medium text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-dark-gray/50">
                {checkIns.map((checkIn) => (
                  <TableRow key={checkIn.id} className="border-b border-light-gray/20">
                    <TableCell className="font-mono text-gray-300">{checkIn.id}</TableCell>
                    <TableCell className="font-mono text-white">{checkIn.ticketId}</TableCell>
                    <TableCell className="text-white">{checkIn.customerName}</TableCell>
                    <TableCell className="text-gray-300">{checkIn.eventName}</TableCell>
                    <TableCell className="text-gray-300">{checkIn.timestamp}</TableCell>
                    <TableCell className="text-right">
                      {checkIn.status === 'success' ? (
                        <span className="px-2 py-1 rounded-full text-xs bg-green-900/30 text-green-400">
                          Sucesso
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-full text-xs bg-red-900/30 text-red-400">
                          Erro
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminVerification;

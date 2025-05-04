
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { QrCode, CheckCircle, XCircle, Camera, ImageOff } from 'lucide-react';

const AdminVerification: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<null | { valid: boolean; message: string; ticket?: any }>(null);
  
  const handleScanClick = () => {
    setScanning(true);
    
    // Simulando o processo de escaneamento
    setTimeout(() => {
      // Em uma aplicação real, este seria o resultado do escaneamento do QR code
      const mockScanResults = [
        { 
          valid: true, 
          message: "Ingresso Válido", 
          ticket: {
            id: "TX-2025-001",
            eventName: "PROJETO X: Virada Eletrônica",
            eventDate: "28 de Maio, 2025",
            customerName: "Ricardo Ferreira",
            ticketType: "VIP"
          }
        },
        { 
          valid: false, 
          message: "Ingresso já utilizado",
          ticket: {
            id: "TX-2025-002",
            eventName: "PROJETO X: Virada Eletrônica",
            eventDate: "28 de Maio, 2025",
            customerName: "Julia Pereira",
            ticketType: "Standard"
          }
        }
      ];
      
      // Escolhe aleatoriamente um dos resultados para simular diferentes cenários
      const randomResult = mockScanResults[Math.floor(Math.random() * mockScanResults.length)];
      
      setResult(randomResult);
      setScanning(false);
      
      if (randomResult.valid) {
        toast.success("Ingresso verificado com sucesso!");
      } else {
        toast.error("Ingresso inválido!");
      }
    }, 2000);
  };
  
  const resetScan = () => {
    setResult(null);
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Verificação de Ingressos</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-dark-gray border-light-gray text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="text-neon-purple" />
              Scanner de QR Code
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="bg-light-gray/10 rounded-lg p-6 w-full max-w-xs aspect-square flex items-center justify-center mb-6">
              {scanning ? (
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Camera size={60} className="text-neon-blue" />
                </motion.div>
              ) : result ? (
                result.valid ? (
                  <CheckCircle size={60} className="text-green-500" />
                ) : (
                  <XCircle size={60} className="text-red-500" />
                )
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <ImageOff size={40} className="text-gray-500" />
                  <p className="text-gray-400 text-sm text-center">Clique em "Escanear QR Code" para iniciar a verificação</p>
                </div>
              )}
            </div>
            
            {result ? (
              <Button
                onClick={resetScan}
                className="bg-light-gray/20 hover:bg-light-gray/30 px-8"
              >
                Novo Escaneamento
              </Button>
            ) : (
              <Button
                onClick={handleScanClick}
                disabled={scanning}
                className="bg-neon-purple hover:bg-neon-purple/80 px-8"
              >
                {scanning ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="mr-2"
                    >
                      <QrCode size={16} />
                    </motion.div>
                    Escaneando...
                  </>
                ) : (
                  <>
                    <QrCode size={16} className="mr-2" />
                    Escanear QR Code
                  </>
                )}
              </Button>
            )}
          </CardContent>
        </Card>
        
        <Card className="bg-dark-gray border-light-gray text-white">
          <CardHeader>
            <CardTitle>Resultado da Verificação</CardTitle>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="space-y-6">
                <div className={`p-4 rounded-md ${
                  result.valid ? 'bg-green-900/20' : 'bg-red-900/20'
                }`}>
                  <div className="flex items-center gap-3">
                    {result.valid ? (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-500" />
                    )}
                    <div>
                      <h3 className={`font-bold ${
                        result.valid ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {result.message}
                      </h3>
                      <p className="text-sm text-gray-300">
                        {result.valid 
                          ? 'Entrada permitida' 
                          : 'Entrada não autorizada'}
                      </p>
                    </div>
                  </div>
                </div>
                
                {result.ticket && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm text-gray-400">Código do Ingresso</h3>
                      <p className="font-medium">{result.ticket.id}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm text-gray-400">Evento</h3>
                      <p className="font-medium">{result.ticket.eventName}</p>
                      <p className="text-sm text-gray-400">{result.ticket.eventDate}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm text-gray-400">Cliente</h3>
                      <p className="font-medium">{result.ticket.customerName}</p>
                      <p className="text-sm text-gray-300">{result.ticket.ticketType}</p>
                    </div>
                    
                    <div className="pt-4">
                      <p className="text-xs text-gray-400">
                        Verificado em: {new Date().toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48">
                <QrCode size={32} className="text-gray-500 mb-2" />
                <p className="text-gray-400 text-center">
                  Escaneie um QR Code para ver os detalhes do ingresso.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-6">
        <Card className="bg-dark-gray border-light-gray text-white">
          <CardHeader>
            <CardTitle>Instruções de Uso</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2 list-decimal pl-4">
              <li className="text-gray-300">Clique no botão "Escanear QR Code" acima.</li>
              <li className="text-gray-300">Aponte a câmera do dispositivo para o QR Code do ingresso.</li>
              <li className="text-gray-300">Aguarde a verificação automática do código.</li>
              <li className="text-gray-300">Verifique o resultado exibido no painel ao lado.</li>
              <li className="text-gray-300">Para um novo escaneamento, clique em "Novo Escaneamento".</li>
            </ol>
            
            <div className="mt-4 p-3 bg-blue-900/20 rounded-md">
              <p className="text-sm text-blue-300">
                <strong>Dica:</strong> Certifique-se de que o ambiente esteja bem iluminado e que o QR Code esteja completamente visível na câmera para evitar erros de leitura.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminVerification;


import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

const Admin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [scanResult, setScanResult] = useState<null | { valid: boolean; message: string }>(null);
  const [qrCode, setQrCode] = useState('');
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Implementação simples - em um sistema real deveria usar autenticação segura
    if (username === 'admin' && password === 'projetox2025') {
      setIsLoggedIn(true);
      toast.success('Login realizado com sucesso!');
    } else {
      toast.error('Usuário ou senha inválidos');
    }
  };
  
  const handleScanQR = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!qrCode.trim()) {
      toast.error('Por favor, insira um código QR válido');
      return;
    }
    
    // Simulação de validação - em um sistema real verificaria com o backend
    if (qrCode === 'VALID123') {
      setScanResult({ valid: true, message: 'Ingresso válido! Acesso permitido.' });
      toast.success('Ingresso válido!');
    } else {
      setScanResult({ valid: false, message: 'Ingresso inválido ou já utilizado!' });
      toast.error('Ingresso inválido!');
    }
    
    setQrCode('');
  };
  
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
          <div className="max-w-xl mx-auto">
            <div className="glass p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Validação de Ingressos</h2>
              
              <form onSubmit={handleScanQR} className="space-y-4">
                <div>
                  <label className="block text-white mb-2">Código QR</label>
                  <Input 
                    value={qrCode}
                    onChange={(e) => setQrCode(e.target.value)}
                    className="bg-dark-gray border-light-gray text-white"
                    placeholder="Digite o código QR ou use o scanner"
                  />
                </div>
                
                <div className="flex gap-4">
                  <Button 
                    type="submit"
                    className="flex-1 bg-neon-blue hover:bg-neon-blue/80 text-black font-bold"
                  >
                    Verificar Código
                  </Button>
                  
                  <Button 
                    type="button"
                    variant="outline"
                    className="flex-1 border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-black"
                    onClick={() => {
                      // Em uma aplicação real, aqui integraria com a câmera para leitura de QR
                      toast.info('Funcionalidade de scanner em desenvolvimento');
                    }}
                  >
                    Usar Scanner
                  </Button>
                </div>
              </form>
            </div>
            
            {scanResult && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-6 rounded-lg text-center ${scanResult.valid ? 'bg-green-900' : 'bg-red-900'}`}
              >
                <h3 className="text-xl font-bold text-white mb-2">
                  {scanResult.valid ? 'Acesso Permitido' : 'Acesso Negado'}
                </h3>
                <p className="text-white">{scanResult.message}</p>
              </motion.div>
            )}
            
            <div className="mt-8 text-center">
              <Button 
                variant="ghost"
                className="text-gray-400 hover:text-white"
                onClick={() => {
                  setIsLoggedIn(false);
                  setUsername('');
                  setPassword('');
                  setScanResult(null);
                }}
              >
                Sair
              </Button>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Admin;

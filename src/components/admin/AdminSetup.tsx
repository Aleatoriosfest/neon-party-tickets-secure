
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { supabase } from '@/lib/supabase';

const AdminSetup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSetAdmin = async () => {
    if (!email) {
      toast.error('Por favor, informe um email válido');
      return;
    }
    
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('set-admin', {
        body: { email }
      });
      
      if (error) throw error;
      
      toast.success('Usuário definido como administrador com sucesso!', {
        description: data.message
      });
      
      setEmail('');
    } catch (error: any) {
      console.error('Error setting admin:', error);
      toast.error('Erro ao definir administrador', {
        description: error.message || 'Tente novamente mais tarde'
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="p-4 border border-light-gray/20 rounded-lg mb-6">
      <h3 className="text-xl font-semibold text-white mb-3">Definir Administrador</h3>
      <p className="text-gray-400 mb-4">
        Use esta ferramenta para conceder privilégios de administrador a um usuário.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          className="bg-dark-gray text-white border-light-gray/30"
          placeholder="email@exemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button 
          onClick={handleSetAdmin}
          disabled={loading}
          className="bg-neon-purple hover:bg-neon-purple/80 whitespace-nowrap"
        >
          {loading ? 'Processando...' : 'Definir como Admin'}
        </Button>
      </div>
      
      <p className="text-sm text-gray-500 mt-3">
        * Esta operação só pode ser realizada por um usuário administrador existente.
      </p>
    </div>
  );
};

export default AdminSetup;


import React from 'react';
import AdminSetup from './AdminSetup';

const AdminSettings: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Configurações</h2>
      
      <AdminSetup />
      
      <div className="glass p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-white mb-4">Configurações Gerais</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-md font-medium text-white mb-2">Informações do Sistema</h4>
            <p className="text-gray-400">
              Versão: 1.0.0<br />
              Data da última atualização: 06/05/2025
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-medium text-white mb-2">Informações de Contato</h4>
            <p className="text-gray-400">
              Email de suporte: suporte@aleatoriosfest.com<br />
              Telefone: (11) 9999-9999
            </p>
          </div>
          
          <div className="pt-4 border-t border-light-gray/30">
            <p className="text-sm text-gray-500">
              O painel administrativo permite gerenciar todos os aspectos do sistema de eventos,
              incluindo usuários, ingressos e configurações. Para obter ajuda adicional, entre em
              contato com o suporte técnico.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;

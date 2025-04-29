
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-light-gray py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-2xl font-bold neon-text mb-2 block">Projeto X</span>
            <p className="text-sm text-gray-400">© 2025 Todos os direitos reservados</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-neon-blue">
              Política de Privacidade
            </a>
            <a href="#" className="text-gray-400 hover:text-neon-blue">
              Termos de Uso
            </a>
            <a href="#" className="text-gray-400 hover:text-neon-blue">
              Contato
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

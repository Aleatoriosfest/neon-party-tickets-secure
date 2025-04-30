
import React from 'react';
import { Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-light-gray py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-2xl font-bold neon-text mb-2 block">Aleatórios Fest</span>
            <p className="text-sm text-gray-400">© 2025 Todos os direitos reservados</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-4 md:mb-0">
            <a 
              href="https://www.instagram.com/aleatorios_fest?igsh=Nnl0aTE0MzZyMXQ5" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-neon-purple transition-colors flex items-center gap-2"
            >
              <Instagram size={20} />
              <span>@aleatorios_fest</span>
            </a>
            
            <a 
              href="https://www.instagram.com/elementsfest1?igsh=M2Q4MDJvODNncHhl" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-neon-blue transition-colors flex items-center gap-2"
            >
              <Instagram size={20} />
              <span>@elementsfest1</span>
            </a>
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

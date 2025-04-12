import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

const Header: React.FC = () => {
  const { toast } = useToast();
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">Nexo+</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-primary transition-colors">
            Dashboard
          </Link>
          <Link to="/pacientes" className="text-gray-700 hover:text-primary transition-colors">
            Pacientes
          </Link>
          <Link to="/mediciones" className="text-gray-700 hover:text-primary transition-colors">
            Mediciones
          </Link>
          <Link to="/guias" className="text-gray-700 hover:text-primary transition-colors">
            Guías Clínicas
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline"
            onClick={() => {
              toast({
                title: "Notificaciones",
                description: "No tienes notificaciones nuevas",
              });
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
          </Button>
          
          <Link to="/login">
            <Button>Iniciar Sesión</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

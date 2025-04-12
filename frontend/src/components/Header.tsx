import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when route changes
  React.useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container py-4 flex items-center justify-between">
        {/* Main Brand Link */}
        <Link to="/" className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">Nexo+</span>
        </Link>

        {/* Mobile menu button */}
        <button 
          className="md:hidden flex flex-col gap-1.5"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <span className={`h-0.5 w-6 bg-foreground transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`h-0.5 w-6 bg-foreground transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`h-0.5 w-6 bg-foreground transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link to="/dashboard" className="text-foreground hover:text-primary transition-colors">Dashboard</Link>
          <Link to="/pacientes" className="text-foreground hover:text-primary transition-colors">Pacientes</Link>
          <Link to="/mediciones" className="text-foreground hover:text-primary transition-colors">Mediciones</Link>
          <Link to="/guias" className="text-foreground hover:text-primary transition-colors">Guías Clínicas</Link>
          <Link to="/contacto" className="text-foreground hover:text-primary transition-colors">Contacto</Link>
          <Button variant="outline" asChild><Link to="/login">Iniciar sesión</Link></Button>
          <Button asChild><Link to="/registro">Registrarse</Link></Button>
        </nav>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden py-4 bg-background border-t border-b">
          <nav className="container flex flex-col gap-4">
            <Link to="/dashboard" className="py-2 text-foreground hover:text-primary transition-colors" onClick={toggleMenu}>Dashboard</Link>
            <Link to="/pacientes" className="py-2 text-foreground hover:text-primary transition-colors" onClick={toggleMenu}>Pacientes</Link>
            <Link to="/mediciones" className="py-2 text-foreground hover:text-primary transition-colors" onClick={toggleMenu}>Mediciones</Link>
            <Link to="/guias" className="py-2 text-foreground hover:text-primary transition-colors" onClick={toggleMenu}>Guías Clínicas</Link>
            <Link to="/contacto" className="py-2 text-foreground hover:text-primary transition-colors" onClick={toggleMenu}>Contacto</Link>
            <Button variant="outline" className="w-full" asChild><Link to="/login">Iniciar sesión</Link></Button>
            <Button className="w-full" asChild><Link to="/registro">Registrarse</Link></Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

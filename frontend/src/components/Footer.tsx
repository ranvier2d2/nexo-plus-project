import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Nexo+</h3>
            <p className="text-gray-600">
              Mejorando la adherencia terapéutica y previniendo descompensaciones en pacientes post-infarto.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/pacientes" className="text-gray-600 hover:text-primary transition-colors">
                  Pacientes
                </Link>
              </li>
              <li>
                <Link to="/mediciones" className="text-gray-600 hover:text-primary transition-colors">
                  Mediciones
                </Link>
              </li>
              <li>
                <Link to="/guias" className="text-gray-600 hover:text-primary transition-colors">
                  Guías Clínicas
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Recursos</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://www.heart.org/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
                  American Heart Association
                </a>
              </li>
              <li>
                <a href="https://www.minsal.cl/ges/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
                  GES Chile
                </a>
              </li>
              <li>
                <a href="https://www.sochicar.cl/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
                  Sociedad Chilena de Cardiología
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <p className="text-gray-600 mb-2">
              Santiago, Chile
            </p>
            <p className="text-gray-600 mb-2">
              contacto@nexoplus.cl
            </p>
            <p className="text-gray-600">
              +56 2 2123 4567
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Nexo+. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

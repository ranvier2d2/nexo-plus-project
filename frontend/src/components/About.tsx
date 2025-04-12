import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

const About: React.FC = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Sobre Nexo+</h2>
            <p className="text-lg text-gray-700 mb-4">
              Nexo+ nació de una necesidad crítica en el sistema de salud chileno: mejorar la adherencia terapéutica 
              en pacientes post-infarto y reducir las rehospitalizaciones evitables.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              En Chile, uno de cada tres pacientes hospitalizados por insuficiencia cardíaca podría haber evitado ese 
              ingreso si hubiera seguido correctamente su tratamiento. Hasta el 30% abandona al menos un medicamento 
              clave en los primeros 90 días post-infarto.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Nuestra plataforma utiliza inteligencia artificial para monitorear remotamente a los pacientes, 
              detectar signos de alerta temprana y facilitar la comunicación efectiva entre el paciente y su 
              equipo de salud.
            </p>
            <Button size="lg">Conocer nuestro impacto</Button>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Nuestra Misión</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Reducir las rehospitalizaciones por insuficiencia cardíaca y mejorar la calidad de vida de los 
                  pacientes post-infarto mediante tecnología accesible y centrada en el usuario.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Nuestro Enfoque</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Combinamos la experiencia clínica con inteligencia artificial para crear soluciones que cierran 
                  la brecha crítica entre el alta hospitalaria y la recuperación a largo plazo.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Nuestro Impacto</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Proyectamos reducir en un 25% las rehospitalizaciones, elevar la adherencia por sobre el 80% y 
                  aumentar el acceso a rehabilitación cardíaca, generando un ahorro de hasta $7.800 USD por paciente al año.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

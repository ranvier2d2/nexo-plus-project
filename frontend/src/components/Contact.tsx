import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

const Contact: React.FC = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Contáctanos</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ¿Interesado en implementar Nexo+ en tu institución de salud? ¿Tienes preguntas sobre nuestra plataforma?
            Estamos aquí para ayudarte.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Card>
            <CardHeader>
              <CardTitle>Envíanos un mensaje</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Nombre</label>
                    <Input id="name" placeholder="Tu nombre" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input id="email" type="email" placeholder="tu@email.com" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="institution" className="text-sm font-medium">Institución</label>
                  <Input id="institution" placeholder="Nombre de tu institución" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Mensaje</label>
                  <Textarea id="message" placeholder="¿Cómo podemos ayudarte?" rows={5} />
                </div>
                
                <Button type="submit" className="w-full">Enviar mensaje</Button>
              </form>
            </CardContent>
          </Card>
          
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Información de contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">Dirección</h4>
                  <p className="text-gray-600">Av. Providencia 1234, Oficina 567, Santiago, Chile</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-1">Email</h4>
                  <p className="text-gray-600">contacto@nexoplus.cl</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-1">Teléfono</h4>
                  <p className="text-gray-600">+56 2 2123 4567</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Solicita una demostración</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  ¿Quieres ver Nexo+ en acción? Agenda una demostración personalizada con nuestro equipo.
                </p>
                <Button variant="outline" className="w-full">Solicitar demo</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

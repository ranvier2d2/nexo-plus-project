import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const Hero: React.FC = () => {
  return (
    <div className="py-12 md:py-24 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-4" variant="outline">Innovación en Salud Cardíaca</Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-gray-900">
              Nexo+: Cuidado cardíaco inteligente post-infarto
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Plataforma digital con IA que mejora la adherencia terapéutica y previene descompensaciones en pacientes dados de alta tras un infarto agudo al miocardio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="font-medium">
                Comenzar ahora
              </Button>
              <Button size="lg" variant="outline" className="font-medium">
                Conocer más
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Reducción del 25%</CardTitle>
                <CardDescription>en rehospitalizaciones</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Monitoreo continuo y alertas tempranas para prevenir complicaciones.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Adherencia >80%</CardTitle>
                <CardDescription>a medicamentos</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Seguimiento personalizado y recordatorios inteligentes.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Integración IA</CardTitle>
                <CardDescription>con guías clínicas</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Recomendaciones basadas en AHA y GES Chile.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Ahorro $7.800</CardTitle>
                <CardDescription>USD por paciente/año</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Reducción de costos en el sistema de salud.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

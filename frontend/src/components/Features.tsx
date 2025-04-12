import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const Features: React.FC = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Características Principales</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nexo+ ofrece un conjunto completo de herramientas para mejorar la adherencia terapéutica
            y prevenir descompensaciones en pacientes cardíacos.
          </p>
        </div>
        
        <Tabs defaultValue="monitoreo" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
            <TabsTrigger value="monitoreo">Monitoreo Remoto</TabsTrigger>
            <TabsTrigger value="alertas">Sistema de Alertas</TabsTrigger>
            <TabsTrigger value="guias">Guías Clínicas</TabsTrigger>
            <TabsTrigger value="comunicacion">Comunicación</TabsTrigger>
          </TabsList>
          
          <TabsContent value="monitoreo" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Registro de Mediciones</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Seguimiento de peso, presión arterial, frecuencia cardíaca y síntomas con interfaz intuitiva.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Análisis de Tendencias</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Visualización de cambios en parámetros clínicos a lo largo del tiempo para identificar patrones.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recordatorios Personalizados</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Sistema inteligente de recordatorios para mediciones y medicamentos adaptado a cada paciente.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="alertas" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Detección Temprana</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Algoritmos de IA que identifican signos de alerta antes de que ocurran descompensaciones graves.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Clasificación por Niveles</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Sistema de alertas codificadas por colores (verde, amarillo, rojo) según la gravedad.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Notificaciones Inteligentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Mensajes personalizados generados por IA que explican la alerta y sugieren acciones específicas.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="guias" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Integración AHA/GES</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Recomendaciones basadas en guías internacionales (AHA) y locales (GES Chile).</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Interpretación con IA</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Respuestas a consultas específicas sobre guías clínicas utilizando procesamiento de lenguaje natural.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Planes de Seguimiento</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Generación de planes personalizados de seguimiento post-alta basados en el perfil clínico.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="comunicacion" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Integración WhatsApp</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Notificaciones críticas enviadas directamente al teléfono del paciente vía WhatsApp.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Coordinación de Equipo</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Facilita la comunicación entre pacientes y equipo de salud para intervenciones oportunas.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Mensajes Empáticos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Comunicaciones generadas por IA con tono cálido y empático para mejorar la experiencia del paciente.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Features;

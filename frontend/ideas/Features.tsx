
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, AlertTriangle, Activity, Clock, Calendar, LineChart } from 'lucide-react';

const featuresData = [
  {
    icon: <Heart className="h-10 w-10 text-primary" />,
    title: "Monitoreo de Salud",
    description: "Seguimiento de peso, presión arterial, frecuencia cardíaca y síntomas para detectar problemas temprano."
  },
  {
    icon: <AlertTriangle className="h-10 w-10 text-amber-500" />,
    title: "Alertas Personalizadas",
    description: "Detección inmediata de signos de alarma según parámetros clínicos personalizados."
  },
  {
    icon: <Activity className="h-10 w-10 text-accent" />,
    title: "Guías Clínicas",
    description: "Recomendaciones basadas en guías AHA y GES para optimizar el tratamiento post-infarto."
  },
  {
    icon: <Clock className="h-10 w-10 text-blue-500" />,
    title: "Adherencia Terapéutica",
    description: "Recordatorios y seguimiento de medicamentos, dieta y actividad física."
  },
  {
    icon: <Calendar className="h-10 w-10 text-green-500" />,
    title: "Plan de Seguimiento",
    description: "Planificación de controles médicos y rehabilitación cardíaca basada en tu condición."
  },
  {
    icon: <LineChart className="h-10 w-10 text-violet-500" />,
    title: "Informes Clínicos",
    description: "Visualización de tendencias y progreso para pacientes y equipo médico."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-secondary/40">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Funcionalidades</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nexo+ ofrece un conjunto integral de herramientas diseñadas para mejorar la recuperación y prevenir complicaciones post-infarto.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuresData.map((feature, index) => (
            <Card key={index} className="border bg-card shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                {feature.icon}
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

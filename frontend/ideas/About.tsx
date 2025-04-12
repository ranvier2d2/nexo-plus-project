
import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const About = () => {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Sobre Nexo+
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Nexo+ surge como respuesta a una realidad alarmante: uno de cada tres pacientes hospitalizados 
                por insuficiencia cardíaca podría haber evitado ese ingreso si hubiera seguido correctamente 
                su tratamiento.
              </p>
              <p>
                Nuestro objetivo es claro: reducir en un 25% las rehospitalizaciones en los primeros meses, 
                elevar la adherencia terapéutica por sobre el 80% y aumentar el acceso a rehabilitación cardíaca.
              </p>
              <p>
                A través de nuestra plataforma digital basada en inteligencia artificial, acompañamos a 
                pacientes dados de alta tras un infarto agudo al miocardio, mejorando su adherencia 
                terapéutica y previniendo descompensaciones.
              </p>
              
              <div className="pt-4 space-y-4">
                <Alert className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/50">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <AlertTitle className="ml-3 text-green-800 dark:text-green-300">Impacto clínico</AlertTitle>
                  <AlertDescription className="ml-3 text-green-700 dark:text-green-400">
                    Hasta el 65% de las crisis por insuficiencia cardíaca se deben a abandono terapéutico.
                  </AlertDescription>
                </Alert>
                
                <Alert className="border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/50">
                  <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  <AlertTitle className="ml-3 text-amber-800 dark:text-amber-300">Estadísticas clave</AlertTitle>
                  <AlertDescription className="ml-3 text-amber-700 dark:text-amber-400">
                    El 30% de pacientes abandona al menos un medicamento clave en los primeros 90 días post-infarto.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </div>
          
          <div className="relative flex justify-center">
            <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-secondary h-full w-full rounded-2xl overflow-hidden shadow-lg border flex flex-col items-center justify-center p-6">
              <h3 className="text-2xl font-bold mb-6 text-center">Impacto en Chile</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <div className="bg-white/70 dark:bg-gray-800/70 rounded-lg p-4 shadow">
                  <p className="text-4xl font-bold text-primary">15.000</p>
                  <p className="text-sm text-muted-foreground">personas sufren un infarto cada año</p>
                </div>
                
                <div className="bg-white/70 dark:bg-gray-800/70 rounded-lg p-4 shadow">
                  <p className="text-4xl font-bold text-accent">20%</p>
                  <p className="text-sm text-muted-foreground">rehospitalización en primeros 30 días post-alta</p>
                </div>
                
                <div className="bg-white/70 dark:bg-gray-800/70 rounded-lg p-4 shadow">
                  <p className="text-4xl font-bold text-red-500">3,77x</p>
                  <p className="text-sm text-muted-foreground">mayor riesgo de muerte post-IAM con IC</p>
                </div>
                
                <div className="bg-white/70 dark:bg-gray-800/70 rounded-lg p-4 shadow">
                  <p className="text-4xl font-bold text-amber-500">&lt;5%</p>
                  <p className="text-sm text-muted-foreground">accede a rehabilitación cardíaca</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

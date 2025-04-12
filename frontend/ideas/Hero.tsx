
import React from 'react';
import { Button } from "@/components/ui/button";
import { Activity, Heart, Users, ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 -z-10" />
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Nexo+</span>
          </h1>
          <p className="text-2xl md:text-3xl font-semibold mt-3">
            Acompañamiento post-infarto inteligente
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            Plataforma digital que mejora la adherencia terapéutica y previene descompensaciones en pacientes después de un infarto agudo al miocardio.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" className="gap-2">
              Comenzar <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Saber más
            </Button>
          </div>
        </div>
        
        <div className="relative flex justify-center animate-slide-up">
          <div className="w-full max-w-md aspect-[3/4] bg-gradient-to-br from-primary/10 via-accent/10 to-secondary rounded-2xl overflow-hidden shadow-lg border">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8">
              <div className="grid grid-cols-3 gap-4 w-full">
                <div className="flex flex-col items-center justify-center p-4 bg-white/80 dark:bg-gray-800/80 rounded-lg shadow">
                  <Heart className="h-8 w-8 text-red-500 mb-2" />
                  <p className="text-sm font-medium text-center">Monitoreo cardíaco</p>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-white/80 dark:bg-gray-800/80 rounded-lg shadow">
                  <Activity className="h-8 w-8 text-primary mb-2" />
                  <p className="text-sm font-medium text-center">Seguimiento médico</p>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-white/80 dark:bg-gray-800/80 rounded-lg shadow">
                  <Users className="h-8 w-8 text-accent mb-2" />
                  <p className="text-sm font-medium text-center">Apoyo continuo</p>
                </div>
              </div>
              <div className="p-4 bg-white/80 dark:bg-gray-800/80 rounded-lg shadow w-full">
                <p className="text-center text-sm">
                  Reducción del 25% en rehospitalizaciones
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-primary h-2 rounded-full w-3/4"></div>
                </div>
              </div>
              <div className="p-4 bg-white/80 dark:bg-gray-800/80 rounded-lg shadow w-full">
                <p className="text-center text-sm">
                  Adherencia al tratamiento mejorada al 80%
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-accent h-2 rounded-full w-4/5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

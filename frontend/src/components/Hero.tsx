import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Rocket, Info, Activity, Heart, Users } from 'lucide-react'; 
import { Progress } from "@/components/ui/progress"; 

const Hero: React.FC = () => {
  return (
    <div className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 -z-10" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-6" variant="outline">Innovación en Salud Cardíaca</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter mb-6 text-foreground">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Nexo+</span>: Cuidado cardíaco inteligente post-infarto
            </h1>
            <p className="text-lg text-muted-foreground mb-10">
              Plataforma digital con IA que mejora la adherencia terapéutica y previene descompensaciones en pacientes dados de alta tras un infarto agudo al miocardio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="font-medium">
                <Rocket className="mr-2 h-5 w-5" /> 
                Comenzar ahora
              </Button>
              <Button size="lg" variant="outline" className="font-medium">
                <Info className="mr-2 h-5 w-5" /> 
                Conocer más
              </Button>
            </div>
          </div>
          
          <div className="relative flex justify-center animate-slide-up"> 
            <div className="w-full max-w-md aspect-[3/4] bg-gradient-to-br from-primary/10 via-accent/10 to-secondary rounded-2xl overflow-hidden shadow-lg border">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8">
                <div className="grid grid-cols-3 gap-4 w-full">
                  <div className="flex flex-col items-center justify-center p-4 bg-background/80 rounded-lg shadow"> 
                    <Heart className="h-8 w-8 text-red-500 mb-2" />
                    <p className="text-sm font-medium text-center">Monitoreo cardíaco</p>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 bg-background/80 rounded-lg shadow">
                    <Activity className="h-8 w-8 text-primary mb-2" />
                    <p className="text-sm font-medium text-center">Seguimiento médico</p>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 bg-background/80 rounded-lg shadow">
                    <Users className="h-8 w-8 text-accent mb-2" />
                    <p className="text-sm font-medium text-center">Apoyo continuo</p>
                  </div>
                </div>
                <div className="p-4 bg-background/80 rounded-lg shadow w-full">
                  <p className="text-center text-sm font-medium mb-2"> 
                    Reducción del 25% en rehospitalizaciones
                  </p>
                  <Progress value={75} className="h-2" /> 
                </div>
                <div className="p-4 bg-background/80 rounded-lg shadow w-full">
                  <p className="text-center text-sm font-medium mb-2">
                    Adherencia al tratamiento &gt;80%
                  </p>
                  <Progress value={80} className="h-2 [&>div]:bg-accent" /> 
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;

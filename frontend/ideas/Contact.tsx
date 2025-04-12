
import React from 'react';
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Simulación de envío de formulario
    toast({
      title: "Formulario enviado",
      description: "Gracias por contactarnos. Responderemos a la brevedad.",
    });
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-secondary/40">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Contacto</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            ¿Tienes preguntas sobre Nexo+? Estamos aquí para ayudarte.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-card border rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Envíanos un mensaje</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                ></textarea>
              </div>
              <Button type="submit" className="w-full md:w-auto">
                Enviar mensaje
              </Button>
            </form>
          </div>

          <div className="flex flex-col justify-center space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold">Correo electrónico</h4>
                <p className="text-muted-foreground">contacto@nexoplus.cl</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold">Teléfono</h4>
                <p className="text-muted-foreground">+56 2 2123 4567</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold">Dirección</h4>
                <p className="text-muted-foreground">
                  Av. Providencia 1234, Providencia<br />
                  Santiago, Chile
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
              <h4 className="font-semibold text-accent mb-2">¿Eres profesional de salud?</h4>
              <p className="text-sm mb-3">
                Si eres médico, enfermera u otro profesional de salud, contáctanos para conocer nuestras soluciones para equipos clínicos.
              </p>
              <Button variant="outline" className="text-accent border-accent/50 hover:bg-accent/20">
                Solicitar información
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from '../components/ui/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Registro = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Simulación de registro exitoso
    toast({
      title: "Registro exitoso",
      description: "Tu cuenta ha sido creada. ¡Bienvenido a Nexo+!",
    });
    
    // Redirigir al dashboard
    navigate('/dashboard');
  };

  return (
    <div className="container py-12 flex justify-center items-center min-h-[calc(100vh-8rem)]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center">
            <Heart className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mt-4">Crear cuenta en Nexo+</h1>
          <p className="text-muted-foreground mt-2">Regístrate para comenzar tu seguimiento cardíaco</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Crear cuenta</CardTitle>
            <CardDescription>
              Ingresa tus datos para registrarte
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="nombre" className="text-sm font-medium">Nombre</label>
                  <input
                    id="nombre"
                    type="text"
                    placeholder="Juan"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="apellido" className="text-sm font-medium">Apellido</label>
                  <input
                    id="apellido"
                    type="text"
                    placeholder="Pérez"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Correo electrónico</label>
                <input
                  id="email"
                  type="email"
                  placeholder="tu@ejemplo.com"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="telefono" className="text-sm font-medium">Teléfono</label>
                <input
                  id="telefono"
                  type="tel"
                  placeholder="+56 9 1234 5678"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">Contraseña</label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="confirm-password" className="text-sm font-medium">Confirmar contraseña</label>
                <input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 border rounded focus:ring-primary"
                  required
                />
                <label htmlFor="terms" className="text-sm text-muted-foreground">
                  Acepto los <a href="#" className="text-primary hover:underline">términos y condiciones</a>
                </label>
              </div>
              <Button type="submit" className="w-full">Crear cuenta</Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-center text-sm text-muted-foreground">
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Iniciar sesión
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Registro;

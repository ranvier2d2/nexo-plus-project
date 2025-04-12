import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "../components/ui/use-toast";
import { Link, useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Simulación de inicio de sesión exitoso
    toast({
      title: "Inicio de sesión exitoso",
      description: "Bienvenido a Nexo+",
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
          <h1 className="text-3xl font-bold mt-4">Iniciar sesión en Nexo+</h1>
          <p className="text-muted-foreground mt-2">Accede a tu cuenta para gestionar tu seguimiento cardíaco</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Iniciar sesión</CardTitle>
            <CardDescription>
              Ingresa tus credenciales para continuar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium">Contraseña</label>
                  <a href="#" className="text-xs text-primary hover:underline">¿Olvidaste tu contraseña?</a>
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 border rounded focus:ring-primary"
                />
                <label htmlFor="remember" className="text-sm text-muted-foreground">Recordarme</label>
              </div>
              <Button type="submit" className="w-full">Iniciar sesión</Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm text-muted-foreground">
              ¿No tienes una cuenta?{" "}
              <Link to="/registro" className="text-primary hover:underline">
                Registrarse
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">o continúa con</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full" type="button">
                Google
              </Button>
              <Button variant="outline" className="w-full" type="button">
                Microsoft
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;

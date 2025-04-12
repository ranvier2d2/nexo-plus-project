import React, { useState, useEffect } from 'react';
import { useToast } from '../components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';

// Mock data - would be fetched from API in production
const mockStats = {
  totalPatients: 128,
  activeAlerts: 12,
  pendingMeasurements: 8,
  adherenceRate: 78
};

const mockAlerts = [
  { id: 1, patient: 'María González', message: 'Presión sistólica elevada: 165 mmHg', level: 'red', time: '10:23 AM' },
  { id: 2, patient: 'Carlos Fuentes', message: 'Aumento de peso de 2.5 kg detectado', level: 'yellow', time: '09:45 AM' },
  { id: 3, patient: 'Ana Martínez', message: 'Frecuencia cardíaca baja: 48 lpm', level: 'red', time: 'Ayer' },
  { id: 4, patient: 'Roberto Silva', message: 'Disnea reportada', level: 'yellow', time: 'Ayer' },
];

const mockRecentPatients = [
  { id: 'p1', name: 'María González', age: 67, lastMeasurement: 'Hace 2 horas', status: 'Alerta' },
  { id: 'p2', name: 'Carlos Fuentes', age: 72, lastMeasurement: 'Hace 5 horas', status: 'Alerta' },
  { id: 'p3', name: 'Ana Martínez', age: 58, lastMeasurement: 'Ayer', status: 'Estable' },
  { id: 'p4', name: 'Roberto Silva', age: 64, lastMeasurement: 'Ayer', status: 'Alerta' },
  { id: 'p5', name: 'Luisa Morales', age: 70, lastMeasurement: 'Hace 2 días', status: 'Estable' },
];

const Dashboard: React.FC = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleAlertAction = (alertId: number) => {
    toast({
      title: "Alerta atendida",
      description: `Has marcado la alerta #${alertId} como atendida.`,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">Bienvenido al panel de control de Nexo+</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{mockStats.totalPatients}</CardTitle>
            <CardDescription>Pacientes Totales</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              <span className="text-green-500">+4</span> nuevos esta semana
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{mockStats.activeAlerts}</CardTitle>
            <CardDescription>Alertas Activas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              <span className="text-red-500">+3</span> desde ayer
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{mockStats.pendingMeasurements}</CardTitle>
            <CardDescription>Mediciones Pendientes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              <span className="text-yellow-500">-2</span> desde ayer
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{mockStats.adherenceRate}%</CardTitle>
            <CardDescription>Tasa de Adherencia</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              <span className="text-green-500">+2%</span> este mes
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Alerts Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Alertas Recientes</CardTitle>
              <CardDescription>
                Alertas generadas por el sistema basadas en mediciones de pacientes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAlerts.map((alert) => (
                  <Alert key={alert.id} className={alert.level === 'red' ? 'border-red-500 bg-red-50' : 'border-yellow-500 bg-yellow-50'}>
                    <div className="flex justify-between items-start">
                      <div>
                        <AlertTitle className="flex items-center">
                          {alert.level === 'red' ? (
                            <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                          ) : (
                            <span className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></span>
                          )}
                          {alert.patient}
                        </AlertTitle>
                        <AlertDescription>{alert.message}</AlertDescription>
                        <div className="text-xs text-gray-500 mt-1">{alert.time}</div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleAlertAction(alert.id)}
                      >
                        Atender
                      </Button>
                    </div>
                  </Alert>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline">Ver todas las alertas</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Patients */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Pacientes Recientes</CardTitle>
              <CardDescription>
                Últimos pacientes con actividad
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecentPatients.map((patient) => (
                  <div key={patient.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                    <div>
                      <div className="font-medium">{patient.name}</div>
                      <div className="text-sm text-gray-500">{patient.age} años • {patient.lastMeasurement}</div>
                    </div>
                    <div>
                      {patient.status === 'Alerta' ? (
                        <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                          Alerta
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                          Estable
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline">Ver todos los pacientes</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Additional Content */}
      <Tabs defaultValue="adherence">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="adherence">Adherencia</TabsTrigger>
          <TabsTrigger value="measurements">Mediciones</TabsTrigger>
          <TabsTrigger value="guidelines">Guías Clínicas</TabsTrigger>
        </TabsList>
        <TabsContent value="adherence" className="p-4 border rounded-md mt-2">
          <h3 className="text-lg font-medium mb-2">Resumen de Adherencia</h3>
          <p className="text-gray-600 mb-4">
            La tasa de adherencia general es del 78%, con mejoras notables en pacientes que utilizan recordatorios por WhatsApp.
          </p>
          <Button>Ver detalles de adherencia</Button>
        </TabsContent>
        <TabsContent value="measurements" className="p-4 border rounded-md mt-2">
          <h3 className="text-lg font-medium mb-2">Mediciones Recientes</h3>
          <p className="text-gray-600 mb-4">
            Se han registrado 42 nuevas mediciones en las últimas 24 horas. 8 pacientes tienen mediciones pendientes.
          </p>
          <Button>Ver todas las mediciones</Button>
        </TabsContent>
        <TabsContent value="guidelines" className="p-4 border rounded-md mt-2">
          <h3 className="text-lg font-medium mb-2">Guías Clínicas</h3>
          <p className="text-gray-600 mb-4">
            Las recomendaciones se basan en las guías AHA y GES Chile para el manejo post-infarto.
          </p>
          <Button>Consultar guías clínicas</Button>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;

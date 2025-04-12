import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from '../hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';

// Mock data - would be fetched from API in production
const mockPatient = {
  id: 'p1',
  nombre: 'María González',
  edad: 67,
  telefono: '+56912345678',
  status: 'Alerta',
  measurements: [
    { timestamp: '2023-09-15T10:30:00', peso: 68.5, presion_sistolica: 165, presion_diastolica: 95, frecuencia_cardiaca: 72, sintomas: ['dolor de cabeza'] },
    { timestamp: '2023-09-10T11:15:00', peso: 68.2, presion_sistolica: 155, presion_diastolica: 90, frecuencia_cardiaca: 75, sintomas: [] },
    { timestamp: '2023-09-05T09:45:00', peso: 67.8, presion_sistolica: 150, presion_diastolica: 88, frecuencia_cardiaca: 70, sintomas: [] },
    { timestamp: '2023-09-01T14:20:00', peso: 67.5, presion_sistolica: 148, presion_diastolica: 85, frecuencia_cardiaca: 68, sintomas: [] },
  ],
  intervention_history: [
    { timestamp: '2023-09-15T10:35:00', action: 'Notificación WhatsApp enviada', alerts: 'Presión sistólica elevada: 165 mmHg' },
    { timestamp: '2023-09-10T11:20:00', action: 'Llamada de seguimiento', alerts: 'Seguimiento rutinario' },
  ],
  adherence: {
    medicamentos: 85,
    dieta: 70,
    ejercicio: 60,
    global: 72
  }
};

const mockRecommendations = {
  medicamentos: "Tome sus medicamentos a la misma hora todos los días. Use recordatorios en su teléfono. No suspenda ningún medicamento sin consultar a su médico.",
  dieta: "Mantenga una dieta baja en sodio (menos de 2g/día). Evite alimentos procesados. Consuma frutas, verduras y proteínas magras.",
  actividad_fisica: "Realice caminatas de 30 minutos 5 veces por semana. Aumente gradualmente la intensidad según tolerancia. Evite ejercicio intenso sin supervisión.",
  monitoreo: "Mida su presión arterial diariamente. Pésese 3 veces por semana. Registre cualquier síntoma como dificultad para respirar o hinchazón."
};

const PatientDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [patient, setPatient] = useState(mockPatient);
  const [recommendations, setRecommendations] = useState(mockRecommendations);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false);
      // In a real app, we would fetch the patient data based on the ID
      // For now, we'll just use the mock data
    }, 1000);

    return () => clearTimeout(timer);
  }, [id]);

  const handleSendMessage = () => {
    toast({
      title: "Mensaje enviado",
      description: `Se ha enviado un mensaje a ${patient.nombre} con recomendaciones personalizadas.`,
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-CL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
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
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">{patient.nombre}</h1>
          <p className="text-gray-600">
            {patient.edad} años • ID: {patient.id} • Tel: {patient.telefono}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSendMessage}>
            Enviar Mensaje
          </Button>
          <Button>
            Nueva Medición
          </Button>
        </div>
      </div>

      {/* Status and Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className={patient.status === 'Alerta' ? 'border-red-500' : 'border-green-500'}>
          <CardHeader className="pb-2">
            <CardTitle>Estado Actual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              {patient.status === 'Alerta' ? (
                <Badge className="bg-red-100 text-red-800 hover:bg-red-100 text-base py-1 px-3">
                  Alerta
                </Badge>
              ) : (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-base py-1 px-3">
                  Estable
                </Badge>
              )}
              <span className="ml-2 text-gray-600">
                Última medición: {formatDate(patient.measurements[0].timestamp)}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Adherencia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Global:</span>
                <span className="font-semibold">{patient.adherence.global}%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Medicamentos:</span>
                <span>{patient.adherence.medicamentos}%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Dieta:</span>
                <span>{patient.adherence.dieta}%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Ejercicio:</span>
                <span>{patient.adherence.ejercicio}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Última Medición</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Presión arterial:</span>
                <span className="font-semibold">
                  {patient.measurements[0].presion_sistolica}/{patient.measurements[0].presion_diastolica} mmHg
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Frecuencia cardíaca:</span>
                <span>{patient.measurements[0].frecuencia_cardiaca} lpm</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Peso:</span>
                <span>{patient.measurements[0].peso} kg</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Síntomas:</span>
                <span>
                  {patient.measurements[0].sintomas.length > 0 
                    ? patient.measurements[0].sintomas.join(', ') 
                    : 'Ninguno'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different sections */}
      <Tabs defaultValue="measurements">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
          <TabsTrigger value="measurements">Mediciones</TabsTrigger>
          <TabsTrigger value="interventions">Intervenciones</TabsTrigger>
          <TabsTrigger value="recommendations">Recomendaciones</TabsTrigger>
          <TabsTrigger value="alerts">Alertas</TabsTrigger>
        </TabsList>
        
        {/* Measurements Tab */}
        <TabsContent value="measurements" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Mediciones</CardTitle>
              <CardDescription>
                Registro de todas las mediciones del paciente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Presión Arterial</TableHead>
                    <TableHead>Frecuencia Cardíaca</TableHead>
                    <TableHead>Peso</TableHead>
                    <TableHead>Síntomas</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patient.measurements.map((measurement, index) => (
                    <TableRow key={index}>
                      <TableCell>{formatDate(measurement.timestamp)}</TableCell>
                      <TableCell>
                        {measurement.presion_sistolica}/{measurement.presion_diastolica} mmHg
                      </TableCell>
                      <TableCell>{measurement.frecuencia_cardiaca} lpm</TableCell>
                      <TableCell>{measurement.peso} kg</TableCell>
                      <TableCell>
                        {measurement.sintomas.length > 0 
                          ? measurement.sintomas.join(', ') 
                          : 'Ninguno'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Interventions Tab */}
        <TabsContent value="interventions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Intervenciones</CardTitle>
              <CardDescription>
                Registro de todas las intervenciones realizadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Acción</TableHead>
                    <TableHead>Detalles</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patient.intervention_history.map((intervention, index) => (
                    <TableRow key={index}>
                      <TableCell>{formatDate(intervention.timestamp)}</TableCell>
                      <TableCell>{intervention.action}</TableCell>
                      <TableCell>{intervention.alerts}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recomendaciones Personalizadas</CardTitle>
              <CardDescription>
                Generadas por IA basadas en el perfil del paciente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Medicamentos</h3>
                  <p className="text-gray-700">{recommendations.medicamentos}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Dieta</h3>
                  <p className="text-gray-700">{recommendations.dieta}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Actividad Física</h3>
                  <p className="text-gray-700">{recommendations.actividad_fisica}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Monitoreo</h3>
                  <p className="text-gray-700">{recommendations.monitoreo}</p>
                </div>
                <div className="pt-4">
                  <Button onClick={handleSendMessage}>
                    Enviar Recomendaciones por WhatsApp
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Alerts Tab */}
        <TabsContent value="alerts" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Alertas Recientes</CardTitle>
              <CardDescription>
                Alertas generadas basadas en las mediciones del paciente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patient.status === 'Alerta' ? (
                  <Alert className="border-red-500 bg-red-50">
                    <AlertTitle className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                      Presión arterial elevada
                    </AlertTitle>
                    <AlertDescription>
                      Presión sistólica elevada: {patient.measurements[0].presion_sistolica} mmHg.
                      Se recomienda verificar adherencia a medicamentos y contactar al paciente.
                    </AlertDescription>
                    <div className="text-xs text-gray-500 mt-1">
                      {formatDate(patient.measurements[0].timestamp)}
                    </div>
                  </Alert>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No hay alertas activas para este paciente.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientDetailPage;

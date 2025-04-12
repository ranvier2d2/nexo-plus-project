import React, { useState, useEffect } from 'react';
import { useToast } from '../components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { 
  Users, BellRing, ClipboardList, TrendingUp, AlertCircle, 
  Heart, ArrowRight, Activity, ThermometerSnowflake, 
  Scale, Stethoscope, Phone, Timer
} from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';

// Enhanced mock data with more clinical context
const mockPatientsWithAlerts = [
  { 
    id: 'p1', 
    name: 'María González', 
    age: 67, 
    riskScore: 'Alto', 
    lastUpdated: '10:23 AM',
    vitals: [
      { 
        id: 1, 
        name: 'Presión sistólica', 
        value: 165, 
        unit: 'mmHg', 
        normalRange: '110-140',
        trend: 'up',
        severity: 'critical',
        timestamp: '10:23 AM'
      }
    ],
    medications: 3,
    adherence: 65,
    lastContact: 'Ayer',
    nextAction: 'Contactar al médico'
  },
  { 
    id: 'p2', 
    name: 'Carlos Fuentes', 
    age: 72, 
    riskScore: 'Medio',
    lastUpdated: '09:45 AM',
    vitals: [
      { 
        id: 2, 
        name: 'Peso', 
        value: 82.5, 
        unit: 'kg', 
        normalRange: '78-80',
        trend: 'up',
        severity: 'warning',
        timestamp: '09:45 AM',
        note: 'Aumento de 2.5 kg en 3 días'
      }
    ],
    medications: 5,
    adherence: 80,
    lastContact: 'Hace 2 días',
    nextAction: 'Evaluar retención de líquidos'
  },
  { 
    id: 'p3', 
    name: 'Ana Martínez', 
    age: 58, 
    riskScore: 'Alto',
    lastUpdated: 'Ayer',
    vitals: [
      { 
        id: 3, 
        name: 'Frecuencia cardíaca', 
        value: 48, 
        unit: 'lpm', 
        normalRange: '60-100',
        trend: 'down',
        severity: 'critical',
        timestamp: 'Ayer'
      }
    ],
    medications: 4,
    adherence: 92,
    lastContact: 'Hace 3 días',
    nextAction: 'Evaluar medicación β-bloqueante'
  },
  { 
    id: 'p4', 
    name: 'Roberto Silva', 
    age: 64, 
    riskScore: 'Medio',
    lastUpdated: 'Ayer', 
    vitals: [
      { 
        id: 4, 
        name: 'Disnea', 
        value: 'Reportada', 
        unit: '', 
        normalRange: '',
        trend: 'new',
        severity: 'warning',
        timestamp: 'Ayer'
      }
    ],
    medications: 2,
    adherence: 75,
    lastContact: 'Hace 1 día',
    nextAction: 'Programar videollamada'
  },
  { 
    id: 'p5', 
    name: 'Luisa Morales', 
    age: 70, 
    riskScore: 'Bajo',
    lastUpdated: 'Hace 2 días',
    vitals: [],
    medications: 3,
    adherence: 95,
    lastContact: 'Hace 2 días',
    nextAction: ''
  },
];

// Summary statistics
const mockStats = {
  totalPatients: 128,
  activeAlerts: 12,
  pendingMeasurements: 8,
  adherenceRate: 78
};

const Dashboard: React.FC = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('priority');

  // Sort patients by risk level (critical alerts first)
  const priorityPatients = [...mockPatientsWithAlerts].sort((a, b) => {
    const aHasCritical = a.vitals.some(v => v.severity === 'critical');
    const bHasCritical = b.vitals.some(v => v.severity === 'critical');
    
    if (aHasCritical && !bHasCritical) return -1;
    if (!aHasCritical && bHasCritical) return 1;
    
    const aHasWarning = a.vitals.some(v => v.severity === 'warning');
    const bHasWarning = b.vitals.some(v => v.severity === 'warning');
    
    if (aHasWarning && !bHasWarning) return -1;
    if (!aHasWarning && bHasWarning) return 1;
    
    return 0;
  });

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handlePatientAction = (patientId: string, action: string) => {
    toast({
      title: "Acción registrada",
      description: `${action} para el paciente ID: ${patientId}`,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Function to render the severity icon
  const renderSeverityIcon = (severity: string) => {
    switch(severity) {
      case 'critical':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  // Function to render the vital sign with appropriate context
  const renderVitalSign = (vital: any) => {
    const trendIcon = () => {
      if (vital.trend === 'up') return <span className="text-destructive">↑</span>;
      if (vital.trend === 'down') return <span className="text-destructive">↓</span>;
      if (vital.trend === 'new') return <span className="text-yellow-600">⊕</span>;
      return null;
    };

    const getVitalIcon = () => {
      switch(vital.name.toLowerCase()) {
        case 'presión sistólica':
          return <Heart className="h-4 w-4 text-muted-foreground" />;
        case 'frecuencia cardíaca':
          return <Activity className="h-4 w-4 text-muted-foreground" />;
        case 'peso':
          return <Scale className="h-4 w-4 text-muted-foreground" />;
        case 'disnea':
          return <Stethoscope className="h-4 w-4 text-muted-foreground" />;
        default:
          return <Activity className="h-4 w-4 text-muted-foreground" />;
      }
    };

    return (
      <div className={`flex items-start p-3 rounded-md ${vital.severity === 'critical' ? 'bg-destructive/10' : vital.severity === 'warning' ? 'bg-yellow-100 dark:bg-yellow-950/30' : 'bg-secondary/50'}`}>
        <div className="flex-shrink-0 mt-1">
          {getVitalIcon()}
        </div>
        <div className="ml-3 flex-grow">
          <div className="flex items-center">
            <span className="font-medium">
              {vital.name}
            </span>
            <span className="ml-1">
              {trendIcon()}
            </span>
          </div>
          <div className="flex items-baseline">
            <span className={`text-lg font-semibold ${vital.severity === 'critical' ? 'text-destructive' : vital.severity === 'warning' ? 'text-yellow-700 dark:text-yellow-400' : ''}`}>
              {vital.value} {vital.unit}
            </span>
            {vital.normalRange && (
              <span className="ml-2 text-xs text-muted-foreground">
                Normal: {vital.normalRange}
              </span>
            )}
          </div>
          {vital.note && (
            <p className="text-xs text-muted-foreground mt-1">{vital.note}</p>
          )}
          <p className="text-xs text-muted-foreground mt-1">{vital.timestamp}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Panel Clínico</h1>
        <p className="text-muted-foreground">Monitoreo de pacientes con alertas de riesgo</p>
      </div>

      {/* Summary Stats - Now more compact */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle className="text-sm font-medium">Pacientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold text-primary">{mockStats.totalPatients}</div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle className="text-sm font-medium">Alertas</CardTitle>
            <BellRing className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold text-destructive">{mockStats.activeAlerts}</div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle className="text-sm font-medium">Mediciones</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold text-yellow-600">{mockStats.pendingMeasurements}</div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle className="text-sm font-medium">Adherencia</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold text-primary">{mockStats.adherenceRate}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Patient List Tabs */}
      <Tabs defaultValue="priority" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="priority" onClick={() => setActiveTab('priority')}>
            Por urgencia
          </TabsTrigger>
          <TabsTrigger value="recent" onClick={() => setActiveTab('recent')}>
            Actividad reciente
          </TabsTrigger>
          <TabsTrigger value="adherence" onClick={() => setActiveTab('adherence')}>
            Adherencia
          </TabsTrigger>
        </TabsList>

        <TabsContent value="priority" className="space-y-4 mt-0">
          {priorityPatients.map((patient) => (
            <Card key={patient.id} className={`shadow-sm overflow-hidden ${
              patient.vitals.some(v => v.severity === 'critical') 
                ? 'border-l-4 border-l-destructive' 
                : patient.vitals.some(v => v.severity === 'warning')
                  ? 'border-l-4 border-l-yellow-500'
                  : ''
            }`}>
              <CardHeader className="p-4 pb-0">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div>
                      <CardTitle className="text-lg">{patient.name}</CardTitle>
                      <CardDescription>{patient.age} años • Riesgo: {patient.riskScore}</CardDescription>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {patient.vitals.length > 0 && (
                      <Badge variant={
                        patient.vitals.some(v => v.severity === 'critical') 
                          ? 'destructive' 
                          : 'outline'
                      } className={
                        patient.vitals.some(v => v.severity === 'warning')
                          ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-300 dark:bg-yellow-950/30 dark:text-yellow-400 dark:border-yellow-800/50'
                          : ''
                      }>
                        {patient.vitals.some(v => v.severity === 'critical') 
                          ? 'Alerta crítica' 
                          : patient.vitals.some(v => v.severity === 'warning')
                            ? 'Precaución'
                            : 'Estable'
                        }
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                {patient.vitals.length > 0 && (
                  <div className="mb-4 space-y-2">
                    {patient.vitals.map(vital => renderVitalSign(vital))}
                  </div>
                )}
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Timer className="h-4 w-4 mr-2" />
                    <span>Actualizado: {patient.lastUpdated}</span>
                  </div>
                  <div className="flex items-center">
                    <ClipboardList className="h-4 w-4 mr-2" />
                    <span>Medicamentos: {patient.medications}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>Último contacto: {patient.lastContact}</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center mb-2">
                  <div className="font-medium text-sm mb-1 sm:mb-0 sm:mr-2">Adherencia:</div>
                  <div className="w-full flex items-center gap-2">
                    <Progress value={patient.adherence} className="h-2" />
                    <span className="text-sm font-medium">{patient.adherence}%</span>
                  </div>
                </div>
                
                {patient.nextAction && (
                  <div className="mt-4 flex justify-end">
                    <Button 
                      variant={patient.vitals.some(v => v.severity === 'critical') ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handlePatientAction(patient.id, patient.nextAction)}
                    >
                      {patient.nextAction}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="recent" className="space-y-4 mt-0">
          {/* Same card layout but sorted by most recent update */}
          {[...mockPatientsWithAlerts]
            .sort((a, b) => {
              // Simple sort by lastUpdated (would need real timestamps in production)
              if (a.lastUpdated.includes('AM') && !b.lastUpdated.includes('AM')) return -1;
              if (!a.lastUpdated.includes('AM') && b.lastUpdated.includes('AM')) return 1;
              return 0;
            })
            .map((patient) => (
              // Same patient card as above, just different sort order
              <Card key={patient.id} className={`shadow-sm overflow-hidden ${
                patient.vitals.some(v => v.severity === 'critical') 
                  ? 'border-l-4 border-l-destructive' 
                  : patient.vitals.some(v => v.severity === 'warning')
                    ? 'border-l-4 border-l-yellow-500'
                    : ''
              }`}>
                {/* Card content identical to priority tab */}
                <CardHeader className="p-4 pb-0">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div>
                        <CardTitle className="text-lg">{patient.name}</CardTitle>
                        <CardDescription>{patient.age} años • Última actualización: {patient.lastUpdated}</CardDescription>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {patient.vitals.length > 0 && (
                        <Badge variant={
                          patient.vitals.some(v => v.severity === 'critical') 
                            ? 'destructive' 
                            : 'outline'
                        } className={
                          patient.vitals.some(v => v.severity === 'warning')
                            ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-300 dark:bg-yellow-950/30 dark:text-yellow-400 dark:border-yellow-800/50'
                            : ''
                        }>
                          {patient.vitals.some(v => v.severity === 'critical') 
                            ? 'Alerta crítica' 
                            : patient.vitals.some(v => v.severity === 'warning')
                              ? 'Precaución'
                              : 'Estable'
                          }
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  {patient.vitals.length > 0 && (
                    <div className="mb-4 space-y-2">
                      {patient.vitals.map(vital => renderVitalSign(vital))}
                    </div>
                  )}
                  
                  {/* Same additional content as in priority tab */}
                  {/* Additional context, adherence, and action button */}
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="adherence" className="space-y-4 mt-0">
          {/* Patients sorted by adherence (lowest first) */}
          {[...mockPatientsWithAlerts]
            .sort((a, b) => a.adherence - b.adherence)
            .map((patient) => (
              <Card key={patient.id} className={`shadow-sm overflow-hidden ${
                patient.adherence < 70 ? 'border-l-4 border-l-destructive' : 
                patient.adherence < 85 ? 'border-l-4 border-l-yellow-500' : ''
              }`}>
                <CardHeader className="p-4 pb-0">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div>
                        <CardTitle className="text-lg">{patient.name}</CardTitle>
                        <CardDescription>{patient.age} años • {patient.medications} medicamentos</CardDescription>
                      </div>
                    </div>
                    <div>
                      <Badge variant={
                        patient.adherence < 70 ? 'destructive' : 
                        patient.adherence < 85 ? 'outline' : 'outline'
                      } className={
                        patient.adherence >= 85 ? 'bg-green-100 text-green-800 hover:bg-green-100 border-green-300' : 
                        patient.adherence < 85 && patient.adherence >= 70 ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-300' : ''
                      }>
                        {patient.adherence}% adherencia
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <div className="font-medium text-sm mr-2">Adherencia al tratamiento:</div>
                      <div className="text-sm text-muted-foreground">Últimos 30 días</div>
                    </div>
                    <div className="w-full flex items-center gap-2">
                      <Progress value={patient.adherence} className={`h-3 ${
                        patient.adherence < 70 ? '[&>div]:bg-destructive' : 
                        patient.adherence < 85 ? '[&>div]:bg-yellow-500' : '[&>div]:bg-green-500'
                      }`} />
                      <span className="text-sm font-medium">{patient.adherence}%</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <Timer className="h-4 w-4 mr-2" />
                      <span>Actualizado: {patient.lastUpdated}</span>
                    </div>
                    <div className="flex items-center">
                      <ClipboardList className="h-4 w-4 mr-2" />
                      <span>Medicamentos: {patient.medications}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>Último contacto: {patient.lastContact}</span>
                    </div>
                  </div>
                  
                  {patient.adherence < 85 && (
                    <div className="mt-4 flex justify-end">
                      <Button 
                        variant={patient.adherence < 70 ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handlePatientAction(patient.id, 'Llamada de adherencia')}
                      >
                        Programar llamada
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
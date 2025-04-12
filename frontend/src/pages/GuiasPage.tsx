import React, { useState, useEffect } from 'react';
import { useToast } from '../components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';

const GuiasPage: React.FC = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState('aha');
  const [query, setQuery] = useState('');
  const [interpretation, setInterpretation] = useState('');
  const [isInterpreting, setIsInterpreting] = useState(false);

  // Mock guidelines content
  const ahaGuidelines = `
    AHA: Post-AMI Recommendations:
    • BP <130/80 mmHg (minimum <140/90).
    • Beta-blockers: HR 50-70 bpm, prolonged use based on condition.
    • LDL <70 mg/dL; consider additional therapies if 55–69 mg/dL.
    • HbA1c ~7% in diabetics.
    • Echocardiogram 6–12 weeks; consider ICD if LVEF ≤35%.
    • Intensive initial follow-up.
    • Dual antiplatelet therapy for at least 12 months.
    • ACE inhibitors or ARBs for patients with LVEF <40%.
    • Statins for all patients regardless of baseline LDL levels.
    • Cardiac rehabilitation program enrollment.
    • Smoking cessation counseling and support.
    • Depression screening and treatment if needed.
    • Regular follow-up visits: 2 weeks, 1 month, 3 months, 6 months, and 1 year.
  `;

  const gesGuidelines = `
    GES (Chile): Post-AMI/HF Recommendations:
    • First check-up in 7–14 days; initial monthly check-ups, spaced after stabilization.
    • Early cardiac rehabilitation (minimum 15 sessions in 2 months).
    • Focus on adherence, low-sodium diet, and moderate activity.
    • Education in self-care and symptom awareness.
    • Guaranteed access to medications through GES program.
    • Echocardiogram within first month post-discharge.
    • Stress test before 3 months if indicated.
    • Psychological support for patients and families.
    • Nutritional counseling with focus on Mediterranean diet.
    • Smoking cessation program enrollment.
    • Regular monitoring of blood pressure, heart rate, and weight.
    • Alert system for early detection of decompensation signs.
  `;

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleInterpretGuidelines = () => {
    if (!query.trim()) {
      toast({
        title: "Consulta requerida",
        description: "Por favor ingrese una pregunta para interpretar las guías clínicas.",
        variant: "destructive"
      });
      return;
    }

    setIsInterpreting(true);

    // Simulate API call to interpret guidelines
    setTimeout(() => {
      // Mock AI-generated interpretation
      let mockInterpretation = "";
      
      if (source === 'aha') {
        if (query.toLowerCase().includes('presión') || query.toLowerCase().includes('presion')) {
          mockInterpretation = "Según las guías de la AHA, la presión arterial objetivo para pacientes post-infarto debe ser <130/80 mmHg, con un mínimo aceptable de <140/90 mmHg. Se recomienda monitoreo regular y ajuste de medicación antihipertensiva según sea necesario para mantener estos valores.";
        } else if (query.toLowerCase().includes('seguimiento') || query.toLowerCase().includes('control')) {
          mockInterpretation = "Las guías AHA recomiendan un seguimiento intensivo inicial con visitas regulares a las 2 semanas, 1 mes, 3 meses, 6 meses y 1 año post-infarto. Esto permite ajustar el tratamiento y detectar complicaciones tempranamente.";
        } else {
          mockInterpretation = "Basado en las guías AHA para pacientes post-infarto, se recomienda un enfoque integral que incluye control estricto de factores de riesgo cardiovascular, terapia farmacológica óptima (incluyendo antiagregantes plaquetarios duales por al menos 12 meses), rehabilitación cardíaca y seguimiento regular. La meta es prevenir eventos recurrentes y optimizar la recuperación funcional del paciente.";
        }
      } else {
        if (query.toLowerCase().includes('rehabilitación') || query.toLowerCase().includes('rehabilitacion')) {
          mockInterpretation = "Las guías GES de Chile enfatizan la rehabilitación cardíaca temprana, recomendando un mínimo de 15 sesiones en 2 meses. Este programa debe ser multidisciplinario e incluir ejercicio supervisado, educación y apoyo psicológico.";
        } else if (query.toLowerCase().includes('dieta') || query.toLowerCase().includes('alimentación')) {
          mockInterpretation = "Según las guías GES, se recomienda una dieta baja en sodio con enfoque en el patrón mediterráneo. Se sugiere consejería nutricional personalizada como parte integral del tratamiento post-infarto.";
        } else {
          mockInterpretation = "Las guías GES de Chile para pacientes post-infarto establecen un primer control en 7-14 días, seguido de controles mensuales iniciales que se espacian tras la estabilización. Se enfatiza la adherencia terapéutica, dieta adecuada, actividad física moderada y educación en autocuidado. El programa garantiza acceso a medicamentos y exámenes como ecocardiograma en el primer mes y prueba de esfuerzo antes de los 3 meses si está indicada.";
        }
      }

      setInterpretation(mockInterpretation);
      setIsInterpreting(false);
    }, 2000);
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
        <h1 className="text-3xl font-bold mb-2">Guías Clínicas</h1>
        <p className="text-gray-600">Consulta e interpretación de guías clínicas para el manejo post-infarto</p>
      </div>

      <Tabs defaultValue="guidelines">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
          <TabsTrigger value="guidelines">Guías Clínicas</TabsTrigger>
          <TabsTrigger value="interpreter">Intérprete IA</TabsTrigger>
          <TabsTrigger value="followup">Planes de Seguimiento</TabsTrigger>
        </TabsList>
        
        {/* Guidelines Tab */}
        <TabsContent value="guidelines" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Guías AHA</CardTitle>
                <CardDescription>
                  American Heart Association - Recomendaciones post-infarto agudo al miocardio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded-md">
                  {ahaGuidelines}
                </pre>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Guías GES Chile</CardTitle>
                <CardDescription>
                  Garantías Explícitas en Salud - Recomendaciones post-infarto/insuficiencia cardíaca
                </CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded-md">
                  {gesGuidelines}
                </pre>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* AI Interpreter Tab */}
        <TabsContent value="interpreter" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Intérprete de Guías Clínicas con IA</CardTitle>
              <CardDescription>
                Consulta específica sobre las guías clínicas utilizando inteligencia artificial
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="source">Fuente de guías clínicas</Label>
                  <Select value={source} onValueChange={setSource}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar fuente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aha">American Heart Association (AHA)</SelectItem>
                      <SelectItem value="ges">Garantías Explícitas en Salud (GES Chile)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="query">Tu consulta</Label>
                  <Textarea 
                    id="query" 
                    placeholder="Ej: ¿Cuál es la presión arterial objetivo según estas guías?" 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    rows={3}
                  />
                </div>
                
                <Button 
                  onClick={handleInterpretGuidelines} 
                  disabled={isInterpreting}
                  className="w-full"
                >
                  {isInterpreting ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                      Interpretando...
                    </>
                  ) : (
                    'Interpretar con IA'
                  )}
                </Button>
                
                {interpretation && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Interpretación</h3>
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                      <p className="text-gray-800">{interpretation}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Follow-up Plans Tab */}
        <TabsContent value="followup" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Planes de Seguimiento Personalizados</CardTitle>
              <CardDescription>
                Generación de planes de seguimiento basados en el perfil del paciente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="patient-id">ID del Paciente</Label>
                      <Input id="patient-id" placeholder="Ingrese ID del paciente" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="risk-level">Nivel de Riesgo</Label>
                      <Select defaultValue="medium">
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar nivel de riesgo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Bajo</SelectItem>
                          <SelectItem value="medium">Medio</SelectItem>
                          <SelectItem value="high">Alto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Factores de Riesgo</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="hipertension" />
                        <label htmlFor="hipertension" className="text-sm">Hipertensión</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="diabetes" />
                        <label htmlFor="diabetes" className="text-sm">Diabetes</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="dislipidemia" />
                        <label htmlFor="dislipidemia" className="text-sm">Dislipidemia</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="tabaquismo" />
                        <label htmlFor="tabaquismo" className="text-sm">Tabaquismo</label>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full">
                    Generar Plan de Seguimiento
                  </Button>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Plan de Seguimiento Recomendado</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">Controles Médicos</h4>
                      <p className="text-gray-700">Primer control en 7-14 días; luego controles mensuales durante 3 meses y cada 3-6 meses según estabilidad.</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Rehabilitación Cardíaca</h4>
                      <p className="text-gray-700">Programa de rehabilitación cardíaca de 15 sesiones en 2 meses, con evaluación de progreso al finalizar.</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Monitoreo</h4>
                      <p className="text-gray-700">Medición diaria de presión arterial, peso 3 veces por semana, registro de síntomas en la aplicación Nexo+.</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Exámenes</h4>
                      <p className="text-gray-700">Ecocardiograma en 4 semanas, perfil lipídico en 6 semanas, prueba de esfuerzo en 10 semanas si está indicada.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GuiasPage;

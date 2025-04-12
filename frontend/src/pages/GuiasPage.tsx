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
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { BookOpen, Heart, Brain, Clipboard, FileText, CheckCircle, Loader2 } from 'lucide-react';

// Helper function to parse guideline points
const parseGuidelines = (text: string) => {
  const lines = text.trim().split('\n');
  const title = lines[0];
  const points = lines.slice(1).map(line => line.trim().substring(2).trim()); // Remove '• '
  return { title, points };
};

// Map keywords to icons
const getIconForGuideline = (point: string) => {
  const lowerPoint = point.toLowerCase();
  if (lowerPoint.includes('bp') || lowerPoint.includes('presión') || lowerPoint.includes('beta-blockers') || lowerPoint.includes('hr') || lowerPoint.includes('ecocardiograma') || lowerPoint.includes('echocardiogram') || lowerPoint.includes('rehabilitación') || lowerPoint.includes('cardiac rehabilitation') || lowerPoint.includes('prueba de esfuerzo') || lowerPoint.includes('stress test') || lowerPoint.includes('alert system')) return <Heart className="h-4 w-4 flex-shrink-0 mt-0.5" />;
  if (lowerPoint.includes('ldl') || lowerPoint.includes('hba1c') || lowerPoint.includes('antiplatelet') || lowerPoint.includes('antiplaquetaria') || lowerPoint.includes('ace inhibitors') || lowerPoint.includes('arbs') || lowerPoint.includes('statins') || lowerPoint.includes('medicamentos') || lowerPoint.includes('medications') || lowerPoint.includes('nutritional counseling') || lowerPoint.includes('dieta')) return <FileText className="h-4 w-4 flex-shrink-0 mt-0.5" />;
  if (lowerPoint.includes('seguimiento') || lowerPoint.includes('follow-up') || lowerPoint.includes('control') || lowerPoint.includes('monitoring') || lowerPoint.includes('monitoreo')) return <Clipboard className="h-4 w-4 flex-shrink-0 mt-0.5" />;
  if (lowerPoint.includes('depression') || lowerPoint.includes('depresión') || lowerPoint.includes('psychological support') || lowerPoint.includes('apoyo psicológico') || lowerPoint.includes('education') || lowerPoint.includes('educación') || lowerPoint.includes('smoking cessation') || lowerPoint.includes('cesación tabáquica')) return <Brain className="h-4 w-4 flex-shrink-0 mt-0.5" />;
  if (lowerPoint.includes('adherence') || lowerPoint.includes('adherencia') || lowerPoint.includes('activity') || lowerPoint.includes('actividad') || lowerPoint.includes('guaranteed access')) return <CheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />;
  return <CheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />; // Default icon
};


const GuiasPage: React.FC = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState('aha');
  const [query, setQuery] = useState('');
  const [interpretation, setInterpretation] = useState('');
  const [isInterpreting, setIsInterpreting] = useState(false);

  // Mock guidelines content
  const ahaGuidelinesText = `
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

  const gesGuidelinesText = `
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

  const ahaGuidelines = parseGuidelines(ahaGuidelinesText);
  const gesGuidelines = parseGuidelines(gesGuidelinesText);

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
    setInterpretation(''); // Clear previous interpretation

    // Simulate API call to interpret guidelines
    setTimeout(() => {
      // Mock AI-generated interpretation (same logic as before)
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
    }, 1500); // Slightly shorter delay
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 container py-8 md:py-12">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Guías Clínicas</h1>
        <p className="text-muted-foreground text-lg">
          Consulta e interpretación de guías clínicas para el manejo post-infarto.
        </p>
      </div>

      <Tabs defaultValue="guidelines" className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-1 sm:grid-cols-3 gap-1 rounded-lg bg-muted p-1 h-auto">
          <TabsTrigger value="guidelines" className="rounded-md py-2.5 text-sm sm:text-base">
            Guías Clínicas
          </TabsTrigger>
          <TabsTrigger value="interpreter" className="rounded-md py-2.5 text-sm sm:text-base">
            Intérprete IA
          </TabsTrigger>
          <TabsTrigger value="followup" className="rounded-md py-2.5 text-sm sm:text-base">
            Planes de Seguimiento
          </TabsTrigger>
        </TabsList>
        
        {/* Guidelines Tab */}
        <TabsContent value="guidelines" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* AHA Card */}
            <Card className="rounded-xl shadow-lg overflow-hidden border border-primary/20">
              <CardHeader className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-5 pb-4">
                <div className="flex items-center gap-3 mb-1">
                  <div className="bg-primary/10 p-2 rounded-full border border-primary/20">
                     <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">Guías AHA</CardTitle>
                </div>
                <CardDescription className="text-primary/90">American Heart Association - Recomendaciones post-infarto</CardDescription>
              </CardHeader>
              <CardContent className="p-5 pt-4">
                <div className="space-y-4">
                  {ahaGuidelines.points.map((point, index) => (
                    <div key={`aha-item-${index}`} className="flex items-start gap-3 w-full text-sm">
                      <span className="text-primary flex-shrink-0 mt-0.5">{getIconForGuideline(point)}</span>
                      <span className="flex-grow text-muted-foreground text-left leading-snug">{point}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* GES Card */}
            <Card className="rounded-xl shadow-lg overflow-hidden border border-accent/20">
              <CardHeader className="bg-gradient-to-br from-accent/10 via-accent/5 to-transparent p-5 pb-4">
                 <div className="flex items-center gap-3 mb-1">
                  <div className="bg-accent/10 p-2 rounded-full border border-accent/20">
                     <BookOpen className="h-5 w-5 text-accent" />
                  </div>
                  <CardTitle className="text-xl text-accent">Guías GES Chile</CardTitle>
                </div>
                <CardDescription className="text-accent/90">Garantías Explícitas en Salud - Recomendaciones post-infarto/IC</CardDescription>
              </CardHeader>
              <CardContent className="p-5 pt-4">
                 <div className="space-y-4">
                  {gesGuidelines.points.map((point, index) => (
                    <div key={`ges-item-${index}`} className="flex items-start gap-3 w-full text-sm">
                       <span className="text-accent flex-shrink-0 mt-0.5">{getIconForGuideline(point)}</span>
                       <span className="flex-grow text-muted-foreground text-left leading-snug">{point}</span>
                     </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* AI Interpreter Tab */}
        <TabsContent value="interpreter" className="mt-0">
          <Card className="rounded-xl shadow-lg overflow-hidden border border-border/30">
            <CardHeader className="p-5 bg-muted/50">
              <CardTitle className="text-xl">Intérprete de Guías Clínicas con IA</CardTitle>
              <CardDescription>
                Consulta específica sobre las guías clínicas utilizando inteligencia artificial
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 pt-4">
              <div className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="query">Tu consulta</Label>
                    <Textarea 
                      id="query" 
                      placeholder="Ej: ¿Cuál es la presión arterial objetivo según estas guías?" 
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      rows={3}
                      className="border-border/50 focus:border-primary focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="source">Fuente de guías</Label>
                    <Select value={source} onValueChange={setSource}>
                      <SelectTrigger className="border-border/50 focus:ring-primary focus:border-primary">
                        <SelectValue placeholder="Seleccionar fuente" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aha">Guías AHA</SelectItem>
                        <SelectItem value="ges">Guías GES Chile</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    onClick={handleInterpretGuidelines} 
                    disabled={isInterpreting}
                    className="min-w-[150px]"
                  >
                    {isInterpreting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Interpretando...
                      </>
                    ) : (
                      'Interpretar con IA'
                    )}
                  </Button>
                </div>
                
                {interpretation && (
                  <div className="mt-6">
                    <Alert className="bg-gradient-to-tr from-blue-50 via-blue-100/50 to-blue-50 dark:from-blue-950/30 dark:via-blue-950/10 dark:to-blue-950/30 border-blue-200 dark:border-blue-800/50">
                      <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <AlertTitle className="text-blue-800 dark:text-blue-300">Interpretación IA</AlertTitle>
                      <AlertDescription className="mt-1 text-blue-700 dark:text-blue-400/90">
                        {interpretation}
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Follow-up Plans Tab */}
        <TabsContent value="followup" className="mt-0">
          <Card className="rounded-xl shadow-lg overflow-hidden border border-green-500/20">
            <CardHeader className="bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent p-5">
              <CardTitle className="text-xl">Planes de Seguimiento Personalizados</CardTitle>
              <CardDescription>
                Genera planes de seguimiento basados en el perfil del paciente y las guías clínicas
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 pt-4">
              <div className="space-y-6">
                {/* Input Section */}
                <div className="p-5 rounded-lg border border-border/30 bg-background shadow-inner">
                  <h3 className="text-lg font-semibold mb-4 text-foreground">Información del Paciente</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label htmlFor="patient-id" className="font-medium">ID del Paciente</Label>
                      <Input id="patient-id" placeholder="Ej: 12345678-9" className="border-border/50 focus:border-primary"/>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="risk-level" className="font-medium">Nivel de Riesgo</Label>
                      <Select defaultValue="medium">
                        <SelectTrigger className="border-border/50 focus:ring-primary">
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
                  
                  <div className="space-y-2 mb-6">
                    <Label className="font-medium">Factores de Riesgo Presentes</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2">
                      {[ "Hipertensión", "Diabetes", "Dislipidemia", "Tabaquismo", "Obesidad", "Sedentarismo", "Antecedentes Familiares", "Estrés Crónico" ].map(factor => (
                        <div key={factor} className="flex items-center space-x-2">
                          <Checkbox id={factor.toLowerCase().replace(' ', '-')} />
                          <label htmlFor={factor.toLowerCase().replace(' ', '-')} className="text-sm font-normal text-muted-foreground cursor-pointer">
                            {factor}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    Generar Plan de Seguimiento Recomendado
                  </Button>
                </div>
                
                {/* Recommended Plan Section */}
                <div className="border-t border-border/30 pt-6">
                  <h3 className="text-lg font-semibold mb-4">Plan de Seguimiento Recomendado</h3>
                  <div className="space-y-4 bg-gradient-to-br from-green-500/5 via-transparent to-green-500/5 p-5 rounded-lg border border-green-500/30 shadow-sm">
                    {[
                      { icon: Clipboard, title: "Controles Médicos", text: "Primer control en 7-14 días; luego controles mensuales durante 3 meses y cada 3-6 meses según estabilidad." },
                      { icon: Heart, title: "Rehabilitación Cardíaca", text: "Programa de rehabilitación cardíaca de 15 sesiones en 2 meses, con evaluación de progreso al finalizar." },
                      { icon: Heart, title: "Monitoreo en Hogar", text: "Medición diaria de presión arterial, peso 3 veces por semana, registro de síntomas en la aplicación Nexo+." },
                      { icon: FileText, title: "Exámenes Complementarios", text: "Ecocardiograma en 4 semanas, perfil lipídico en 6 semanas, prueba de esfuerzo en 10 semanas si está indicada." }
                    ].map((item, index) => (
                      <div key={index}>
                        <h4 className="font-medium flex items-center gap-2 text-green-700 dark:text-green-400 mb-1">
                          <item.icon className="h-4 w-4" />
                          {item.title}
                        </h4>
                        <p className="text-muted-foreground text-sm ml-6">{item.text}</p>
                      </div>
                    ))}
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
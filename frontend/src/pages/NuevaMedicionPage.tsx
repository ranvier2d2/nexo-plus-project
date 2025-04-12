import React, { useState, useEffect } from 'react';
import { useToast } from '../components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Label } from '../components/ui/label';
import { Slider } from '../components/ui/slider';
import { Checkbox } from '../components/ui/checkbox';

const NuevaMedicionPage: React.FC = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [patientId, setPatientId] = useState('');
  const [measurement, setMeasurement] = useState({
    peso: 70,
    presion_sistolica: 120,
    presion_diastolica: 80,
    frecuencia_cardiaca: 75,
    sintomas: [] as string[]
  });

  // Mock patient list
  const mockPatients = [
    { id: 'p1', name: 'María González' },
    { id: 'p2', name: 'Carlos Fuentes' },
    { id: 'p3', name: 'Ana Martínez' },
    { id: 'p4', name: 'Roberto Silva' },
    { id: 'p5', name: 'Luisa Morales' },
  ];

  // Common symptoms list
  const commonSymptoms = [
    { id: 'dolor-toracico', label: 'Dolor torácico' },
    { id: 'disnea', label: 'Disnea (dificultad para respirar)' },
    { id: 'edema', label: 'Edema (hinchazón)' },
    { id: 'palpitaciones', label: 'Palpitaciones' },
    { id: 'fatiga', label: 'Fatiga' },
    { id: 'mareo', label: 'Mareo o desmayo' },
    { id: 'dolor-cabeza', label: 'Dolor de cabeza' },
  ];

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false);
      
      // Check if there's a patient ID in the URL query params
      const params = new URLSearchParams(window.location.search);
      const patientParam = params.get('patient');
      if (patientParam) {
        setPatientId(patientParam);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSymptomToggle = (symptomLabel: string) => {
    setMeasurement(prev => {
      const symptoms = [...prev.sintomas];
      if (symptoms.includes(symptomLabel)) {
        return { ...prev, sintomas: symptoms.filter(s => s !== symptomLabel) };
      } else {
        return { ...prev, sintomas: [...symptoms, symptomLabel] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!patientId) {
      toast({
        title: "Error",
        description: "Por favor seleccione un paciente",
        variant: "destructive"
      });
      return;
    }
    
    setSubmitting(true);
    
    // Simulate API call to save measurement
    setTimeout(() => {
      setSubmitting(false);
      
      toast({
        title: "Medición registrada",
        description: "La medición ha sido registrada exitosamente",
      });
      
      // Reset form or redirect
      // For demo purposes, we'll just reset the symptoms
      setMeasurement(prev => ({ ...prev, sintomas: [] }));
    }, 1500);
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
        <h1 className="text-3xl font-bold mb-2">Nueva Medición</h1>
        <p className="text-gray-600">Registra una nueva medición para un paciente</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Formulario de Medición</CardTitle>
          <CardDescription>
            Ingresa los datos de la medición del paciente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Patient Selection */}
            <div className="space-y-2">
              <Label htmlFor="patient">Paciente</Label>
              <Select value={patientId} onValueChange={setPatientId}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar paciente" />
                </SelectTrigger>
                <SelectContent>
                  {mockPatients.map(patient => (
                    <SelectItem key={patient.id} value={patient.id}>
                      {patient.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Weight */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="weight">Peso (kg)</Label>
                <span className="text-sm font-medium">{measurement.peso} kg</span>
              </div>
              <Slider
                id="weight"
                min={40}
                max={150}
                step={0.1}
                value={[measurement.peso]}
                onValueChange={(value) => setMeasurement(prev => ({ ...prev, peso: value[0] }))}
              />
            </div>
            
            {/* Blood Pressure */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="systolic">Presión Sistólica (mmHg)</Label>
                  <span className="text-sm font-medium">{measurement.presion_sistolica} mmHg</span>
                </div>
                <Slider
                  id="systolic"
                  min={70}
                  max={220}
                  step={1}
                  value={[measurement.presion_sistolica]}
                  onValueChange={(value) => setMeasurement(prev => ({ ...prev, presion_sistolica: value[0] }))}
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="diastolic">Presión Diastólica (mmHg)</Label>
                  <span className="text-sm font-medium">{measurement.presion_diastolica} mmHg</span>
                </div>
                <Slider
                  id="diastolic"
                  min={40}
                  max={140}
                  step={1}
                  value={[measurement.presion_diastolica]}
                  onValueChange={(value) => setMeasurement(prev => ({ ...prev, presion_diastolica: value[0] }))}
                />
              </div>
            </div>
            
            {/* Heart Rate */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="heart-rate">Frecuencia Cardíaca (lpm)</Label>
                <span className="text-sm font-medium">{measurement.frecuencia_cardiaca} lpm</span>
              </div>
              <Slider
                id="heart-rate"
                min={40}
                max={180}
                step={1}
                value={[measurement.frecuencia_cardiaca]}
                onValueChange={(value) => setMeasurement(prev => ({ ...prev, frecuencia_cardiaca: value[0] }))}
              />
            </div>
            
            {/* Symptoms */}
            <div className="space-y-2">
              <Label>Síntomas</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {commonSymptoms.map(symptom => (
                  <div key={symptom.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={symptom.id} 
                      checked={measurement.sintomas.includes(symptom.label)}
                      onCheckedChange={() => handleSymptomToggle(symptom.label)}
                    />
                    <label htmlFor={symptom.id} className="text-sm">{symptom.label}</label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Additional Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notas Adicionales</Label>
              <Textarea id="notes" placeholder="Observaciones o comentarios adicionales" />
            </div>
            
            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                  Registrando...
                </>
              ) : (
                'Registrar Medición'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {/* Measurement Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Guía de Medición</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Presión Arterial</h3>
              <p className="text-sm text-gray-600">
                Medir después de 5 minutos de reposo, sentado con la espalda apoyada y el brazo a la altura del corazón.
                Evitar cafeína, ejercicio y medicamentos 30 minutos antes.
              </p>
            </div>
            <div>
              <h3 className="font-medium">Peso</h3>
              <p className="text-sm text-gray-600">
                Pesar a la misma hora del día, preferiblemente en la mañana después de ir al baño y antes de desayunar.
                Usar ropa ligera y la misma báscula.
              </p>
            </div>
            <div>
              <h3 className="font-medium">Frecuencia Cardíaca</h3>
              <p className="text-sm text-gray-600">
                Medir en reposo, después de estar sentado tranquilamente durante al menos 5 minutos.
                Contar los latidos durante 60 segundos para mayor precisión.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NuevaMedicionPage;

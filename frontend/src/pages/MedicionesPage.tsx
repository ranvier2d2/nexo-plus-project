
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Filter, ArrowUpDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Measurement, Symptom } from '@/types';

const MedicionesPage = () => {
  // Datos simulados que adaptamos al nuevo tipo
  const mediciones: (Measurement & { paciente: string })[] = [
    { 
      id: "1", 
      patient_id: "1",
      paciente: "María González", 
      peso: 65.2, 
      presion_sistolica: 120,
      presion_diastolica: 80,
      frecuencia_cardiaca: 72, 
      timestamp: "2025-04-10T09:30:00Z",
      created_at: "2025-04-10T09:30:00Z",
      sintomas: [{ id: "1", name: "Fatiga" }]
    },
    { 
      id: "2", 
      patient_id: "2",
      paciente: "Roberto Sánchez", 
      peso: 78.5, 
      presion_sistolica: 135,
      presion_diastolica: 85,
      frecuencia_cardiaca: 68, 
      timestamp: "2025-04-08T10:15:00Z",
      created_at: "2025-04-08T10:15:00Z",
      sintomas: []
    },
    { 
      id: "3", 
      patient_id: "3",
      paciente: "Carmen Pérez", 
      peso: 61.8, 
      presion_sistolica: 145,
      presion_diastolica: 90,
      frecuencia_cardiaca: 75, 
      timestamp: "2025-04-05T11:00:00Z",
      created_at: "2025-04-05T11:00:00Z",
      sintomas: [{ id: "2", name: "Disnea" }, { id: "3", name: "Edema" }]
    },
    { 
      id: "4", 
      patient_id: "4",
      paciente: "Luis Morales", 
      peso: 82.3, 
      presion_sistolica: 110,
      presion_diastolica: 70,
      frecuencia_cardiaca: 63, 
      timestamp: "2025-04-03T14:45:00Z",
      created_at: "2025-04-03T14:45:00Z",
      sintomas: []
    },
    { 
      id: "5", 
      patient_id: "1",
      paciente: "María González", 
      peso: 65.5, 
      presion_sistolica: 125,
      presion_diastolica: 80,
      frecuencia_cardiaca: 70, 
      timestamp: "2025-04-01T08:30:00Z",
      created_at: "2025-04-01T08:30:00Z",
      sintomas: [{ id: "1", name: "Fatiga" }]
    },
  ];

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Mediciones</h1>
          <p className="text-muted-foreground">Registro y seguimiento de signos vitales</p>
        </div>
        <Button asChild>
          <Link to="/mediciones/nueva">
            <PlusCircle className="mr-2 h-4 w-4" /> Nueva Medición
          </Link>
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <div className="w-full sm:w-auto">
              <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50">
                <option value="">Todos los pacientes</option>
                <option value="1">María González</option>
                <option value="2">Roberto Sánchez</option>
                <option value="3">Carmen Pérez</option>
                <option value="4">Luis Morales</option>
              </select>
            </div>
            <div className="w-full sm:w-auto">
              <input 
                type="date" 
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <Button>
              <Filter className="mr-2 h-4 w-4" /> Aplicar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">
                    <Button variant="ghost" size="sm" className="flex items-center h-8 px-2">
                      Paciente <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </th>
                  <th className="text-left p-3 font-medium">
                    <Button variant="ghost" size="sm" className="flex items-center h-8 px-2">
                      Fecha <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </th>
                  <th className="text-left p-3 font-medium">Peso</th>
                  <th className="text-left p-3 font-medium">Presión</th>
                  <th className="text-left p-3 font-medium">FC</th>
                  <th className="text-left p-3 font-medium">Síntomas</th>
                  <th className="text-right p-3 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {mediciones.map((medicion, index) => (
                  <tr key={medicion.id} className={index < mediciones.length - 1 ? "border-b" : ""}>
                    <td className="p-3">{medicion.paciente}</td>
                    <td className="p-3">{new Date(medicion.timestamp).toLocaleString()}</td>
                    <td className="p-3">{medicion.peso} kg</td>
                    <td className="p-3">{medicion.presion_sistolica}/{medicion.presion_diastolica} mmHg</td>
                    <td className="p-3">{medicion.frecuencia_cardiaca} lpm</td>
                    <td className="p-3">
                      {medicion.sintomas && medicion.sintomas.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {medicion.sintomas.map((sintoma, i) => (
                            <span key={i} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                              {sintoma.name}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">Ninguno</span>
                      )}
                    </td>
                    <td className="p-3 text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/mediciones/${medicion.id}`}>Ver detalles</Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicionesPage;

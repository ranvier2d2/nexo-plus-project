import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';

// Mock data - would be fetched from API in production
const mockPatients = [
  { id: 'p1', name: 'María González', age: 67, phone: '+56912345678', lastMeasurement: '2023-09-15', status: 'Alerta' },
  { id: 'p2', name: 'Carlos Fuentes', age: 72, phone: '+56923456789', lastMeasurement: '2023-09-15', status: 'Alerta' },
  { id: 'p3', name: 'Ana Martínez', age: 58, phone: '+56934567890', lastMeasurement: '2023-09-14', status: 'Estable' },
  { id: 'p4', name: 'Roberto Silva', age: 64, phone: '+56945678901', lastMeasurement: '2023-09-14', status: 'Alerta' },
  { id: 'p5', name: 'Luisa Morales', age: 70, phone: '+56956789012', lastMeasurement: '2023-09-13', status: 'Estable' },
  { id: 'p6', name: 'Jorge Pérez', age: 75, phone: '+56967890123', lastMeasurement: '2023-09-13', status: 'Estable' },
  { id: 'p7', name: 'Carmen Rojas', age: 62, phone: '+56978901234', lastMeasurement: '2023-09-12', status: 'Estable' },
  { id: 'p8', name: 'Felipe Díaz', age: 68, phone: '+56989012345', lastMeasurement: '2023-09-12', status: 'Alerta' },
];

const PacientesPage: React.FC = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPatients, setFilteredPatients] = useState(mockPatients);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Filter patients based on search term
    const filtered = mockPatients.filter(patient => 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm)
    );
    setFilteredPatients(filtered);
  }, [searchTerm]);

  const handleAddPatient = () => {
    toast({
      title: "Función en desarrollo",
      description: "La funcionalidad para agregar pacientes estará disponible próximamente.",
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
        <h1 className="text-3xl font-bold mb-2">Pacientes</h1>
        <p className="text-gray-600">Gestiona los pacientes registrados en Nexo+</p>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-96">
          <Input
            placeholder="Buscar por nombre o teléfono..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <Button onClick={handleAddPatient}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Agregar Paciente
        </Button>
      </div>

      {/* Patients Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Pacientes</CardTitle>
          <CardDescription>
            Total: {filteredPatients.length} pacientes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Edad</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Última Medición</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.name}</TableCell>
                  <TableCell>{patient.age} años</TableCell>
                  <TableCell>{patient.phone}</TableCell>
                  <TableCell>{patient.lastMeasurement}</TableCell>
                  <TableCell>
                    {patient.status === 'Alerta' ? (
                      <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                        Alerta
                      </Badge>
                    ) : (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        Estable
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Link to={`/pacientes/${patient.id}`}>
                        <Button variant="outline" size="sm">
                          Ver
                        </Button>
                      </Link>
                      <Link to={`/nueva-medicion?patient=${patient.id}`}>
                        <Button variant="outline" size="sm">
                          Medición
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredPatients.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No se encontraron pacientes con los criterios de búsqueda.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">4</CardTitle>
            <CardDescription>Pacientes en Alerta</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" size="sm">Ver pacientes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">78%</CardTitle>
            <CardDescription>Adherencia Promedio</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" size="sm">Ver detalles</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">3</CardTitle>
            <CardDescription>Nuevos esta semana</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" size="sm">Ver tendencia</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PacientesPage;

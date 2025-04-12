import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';

// Pages
import Dashboard from './pages/Dashboard';
import PacientesPage from './pages/PacientesPage';
import PatientDetailPage from './pages/PatientDetailPage';
import MedicionesPage from './pages/MedicionesPage';
import NuevaMedicionPage from './pages/NuevaMedicionPage';
import GuiasPage from './pages/GuiasPage';
import Login from './pages/Login';
import Registro from './pages/Registro';
import NotFound from './pages/NotFound';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

import './App.css';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/pacientes" element={<PacientesPage />} />
          <Route path="/pacientes/:id" element={<PatientDetailPage />} />
          <Route path="/mediciones" element={<MedicionesPage />} />
          <Route path="/nueva-medicion" element={<NuevaMedicionPage />} />
          <Route path="/guias" element={<GuiasPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default App;

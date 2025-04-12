// src/types/index.ts

export interface Symptom {
  id: string;
  name: string;
}

export interface Measurement {
  id: string;
  patient_id: string;
  peso?: number | null; // Optional as some measurements might lack this
  presion_sistolica?: number | null;
  presion_diastolica?: number | null;
  frecuencia_cardiaca?: number | null;
  timestamp: string; // ISO Date string based on mock data
  created_at: string; // ISO Date string
  sintomas?: Symptom[] | null; // An array of Symptoms, could be empty or null
}

// You can add other shared types here as needed

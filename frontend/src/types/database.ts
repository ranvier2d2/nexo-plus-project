
export interface Database {
  public: {
    Tables: {
      patients: {
        Row: {
          id: string
          nombre: string
          edad: number
          telefono: string | null
          created_at: string
        }
        Insert: {
          id?: string
          nombre: string
          edad: number
          telefono?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          nombre?: string
          edad?: number
          telefono?: string | null
          created_at?: string
        }
      }
      measurements: {
        Row: {
          id: string
          patient_id: string
          timestamp: string
          peso: number
          presion_sistolica: number
          presion_diastolica: number
          frecuencia_cardiaca: number
          created_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          timestamp: string
          peso: number
          presion_sistolica: number
          presion_diastolica: number
          frecuencia_cardiaca: number
          created_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          timestamp?: string
          peso?: number
          presion_sistolica?: number
          presion_diastolica?: number
          frecuencia_cardiaca?: number
          created_at?: string
        }
      }
      symptoms: {
        Row: {
          id: string
          name: string
          description: string | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
        }
      }
      measurement_symptoms: {
        Row: {
          measurement_id: string
          symptom_id: string
        }
        Insert: {
          measurement_id: string
          symptom_id: string
        }
        Update: {
          measurement_id?: string
          symptom_id?: string
        }
      }
      interventions: {
        Row: {
          id: string
          patient_id: string
          timestamp: string
          action: string
          alerts: string
          created_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          timestamp: string
          action: string
          alerts: string
          created_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          timestamp?: string
          action?: string
          alerts?: string
          created_at?: string
        }
      }
      guideline_parameters: {
        Row: {
          id: string
          pa_min: number
          pa_max: number
          fc_min: number
          fc_max: number
          peso_delta: number
          updated_at: string
        }
        Insert: {
          id?: string
          pa_min: number
          pa_max: number
          fc_min: number
          fc_max: number
          peso_delta: number
          updated_at?: string
        }
        Update: {
          id?: string
          pa_min?: number
          pa_max?: number
          fc_min?: number
          fc_max?: number
          peso_delta?: number
          updated_at?: string
        }
      }
      parameter_audit_log: {
        Row: {
          id: string
          timestamp: string
          updated_by: string
          updates: Record<string, any>
        }
        Insert: {
          id?: string
          timestamp: string
          updated_by: string
          updates: Record<string, any>
        }
        Update: {
          id?: string
          timestamp?: string
          updated_by?: string
          updates?: Record<string, any>
        }
      }
    }
  }
}

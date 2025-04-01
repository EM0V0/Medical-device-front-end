export type TremorSeverity = 'stable' | 'moderate' | 'critical';

export interface Patient {
  id: string;
  patientId: string; // External ID (format: PAT-XXXX)
  firstName: string;
  lastName: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  diagnosis: string;
  diagnosisStage?: string;
  medications: Medication[];
  tremorScore: number;
  status: TremorSeverity;
  activityLevel: number;
  sleepQuality: number;
  lastReading: string; // ISO timestamp
  baseline?: number;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  timing?: string;
}

export interface TremorReading {
  id: string;
  patientId: string;
  timestamp: string;
  hand: 'left' | 'right' | 'both';
  value: number;
  severity: TremorSeverity;
  notes?: string;
}

export interface Alert {
  id: string;
  patientId: string;
  timestamp: string;
  type: 'tremor' | 'medication' | 'activity' | 'system';
  severity: TremorSeverity;
  message: string;
  isNew?: boolean;
  isRead?: boolean;
}

export interface MedicalNote {
  id: string;
  patientId: string;
  doctorName: string;
  timestamp: string;
  content: string;
} 
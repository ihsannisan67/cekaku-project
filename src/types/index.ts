// Gender type
export type Gender = 'male' | 'female';

// Severity level for diseases
export type SeverityLevel = 'ringan' | 'sedang' | 'parah';

// Symptom categories
export type SymptomCategory =
  | 'umum'
  | 'pernapasan'
  | 'pencernaan'
  | 'nyeri'
  | 'neurologis'
  | 'lainnya';

// Individual symptom interface
export interface Symptom {
  id: string;
  label: string;
  category: SymptomCategory;
}

// Disease interface
export interface Disease {
  id: string;
  name: string;
  nameEn: string;
  symptoms: string[];
  requiredSymptoms?: string[];
  ageRange?: [number, number];
  genderSpecific?: Gender;
  severity: SeverityLevel;
  severityScore: number;
  description: string;
  canTreatAtHome: boolean;
}

// Result for a single disease diagnosis
export interface DiagnosisResult {
  disease: Disease;
  score: number;
  confidence: 'tinggi' | 'sedang' | 'rendah';
  matchedSymptoms: string[];
}

// Input for diagnosis
export interface DiagnosisInput {
  age: number;
  gender: Gender;
  selectedSymptoms: string[];
}

// Output from diagnosis
export interface DiagnosisOutput {
  primary: DiagnosisResult;
  alternatives: DiagnosisResult[];
  mustGoToHospital: boolean;
  disclaimer: string;
}

// Treatment step
export interface TreatmentStep {
  order: number;
  title: string;
  description: string;
}

// Treatment interface
export interface Treatment {
  diseaseId: string;
  steps: TreatmentStep[];
  medications: string[];
  whenToSeeDoctor: string[];
  duration: string;
}

// Severity thresholds
export const SEVERITY_THRESHOLDS = {
  TINGGI: 0.6,
  SEDANG: 0.3,
} as const;

// Age modifiers
export const AGE_RISK_GROUPS = {
  CHILD_MAX: 12,
  ELDERLY_MIN: 60,
} as const;
import type { Symptom, SymptomCategory } from '@/types';

/**
 * All available symptoms organized by category.
 * Each symptom has a unique ID and label in Bahasa Indonesia.
 */
export const SYMPTOMS: Record<SymptomCategory, Symptom[]> = {
  umum: [
    { id: 'demam', label: 'Demam', category: 'umum' },
    { id: 'lelah', label: 'Kelelahan / Lemas', category: 'umum' },
    { id: 'sakit_kepala', label: 'Sakit Kepala', category: 'umum' },
    { id: 'berkeringat', label: 'Berkeringat Berlebihan', category: 'umum' },
    { id: 'insomnia', label: 'Susah Tidur (Insomnia)', category: 'umum' },
    { id: 'turun_berat_badan', label: 'Penurunan Berat Badan', category: 'umum' },
    { id: 'naik_berat_badan', label: 'Kenaikan Berat Badan', category: 'umum' },
  ],
  pernapasan: [
    { id: 'batuk', label: 'Batuk', category: 'pernapasan' },
    { id: 'sakit_tenggorokan', label: 'Sakit Tenggorokan', category: 'pernapasan' },
    { id: 'sesak_napas', label: 'Sesak Napas', category: 'pernapasan' },
    { id: 'pilek', label: 'Pilek / Hidung Tersumbat', category: 'pernapasan' },
    { id: 'bersin', label: 'Bersin-bersin', category: 'pernapasan' },
  ],
  pencernaan: [
    { id: 'mual', label: 'Mual', category: 'pencernaan' },
    { id: 'muntah', label: 'Muntah', category: 'pencernaan' },
    { id: 'diare', label: 'Diare', category: 'pencernaan' },
    { id: 'sakit_perut', label: 'Sakit / Nyeri Perut', category: 'pencernaan' },
    { id: 'tidak_nafsu_makan', label: 'Tidak Nafsu Makan', category: 'pencernaan' },
  ],
  nyeri: [
    { id: 'nyeri_dada', label: 'Nyeri Dada', category: 'nyeri' },
    { id: 'sakit_punggung', label: 'Sakit Punggung', category: 'nyeri' },
    { id: 'nyeri_sendi', label: 'Nyeri Sendi', category: 'nyeri' },
    { id: 'nyeri_otot', label: 'Nyeri Otot / Pegal', category: 'nyeri' },
  ],
  neurologis: [
    { id: 'pusing', label: 'Pusing / Vertigo', category: 'neurologis' },
    { id: 'pandangan_kabur', label: 'Pandangan Kabur', category: 'neurologis' },
    { id: 'gemetar', label: 'Gemetar / Tremor', category: 'neurologis' },
    { id: 'cemas', label: 'Cemas / Gelisah', category: 'neurologis' },
    { id: 'depresi', label: 'Sedih / Depresi', category: 'neurologis' },
  ],
  lainnya: [
    { id: 'bengkak', label: 'Bengkak (Edema)', category: 'lainnya' },
    { id: 'ruam', label: 'Ruam / Gatal Kulit', category: 'lainnya' },
  ],
};

/**
 * Get all symptoms as a flat array
 */
export const ALL_SYMPTOMS: Symptom[] = Object.values(SYMPTOMS).flat();

/**
 * Get symptom by ID
 */
export function getSymptomById(id: string): Symptom | undefined {
  return ALL_SYMPTOMS.find(s => s.id === id);
}

/**
 * Get all symptom IDs
 */
export const ALL_SYMPTOM_IDS: string[] = ALL_SYMPTOMS.map(s => s.id);

/**
 * Category labels in Bahasa Indonesia
 */
export const CATEGORY_LABELS: Record<SymptomCategory, string> = {
  umum: 'Gejala Umum',
  pernapasan: 'Sistem Pernapasan',
  pencernaan: 'Sistem Pencernaan',
  nyeri: 'Nyeri & Ketidaknyamanan',
  neurologis: 'Gejala Neurologis & Mental',
  lainnya: 'Gejala Lainnya',
};
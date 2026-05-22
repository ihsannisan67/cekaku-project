'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { SymptomCategory } from '@/types';
import { SYMPTOMS, CATEGORY_LABELS } from '@/lib/data/symptoms';
import {
  ListChecks,
  X,
  Thermometer,
  Wind,
  Utensils,
  Bone,
  Brain,
  Sparkles,
  Trash2,
} from 'lucide-react';

// Expressive emoji map for each symptom
const SYMPTOM_EMOJIS: Record<string, string> = {
  // Umum
  demam: '🤒',
  lelah: '😴‍💨',
  sakit_kepala: '🤕',
  berkeringat: '💧',
  insomnia: '🌙',
  turun_berat_badan: '📉',
  naik_berat_badan: '📈',
  // Pernapasan
  batuk: '😮‍💨',
  sakit_tenggorokan: '😷',
  sesak_napas: '😤',
  pilek: '🤧',
  bersin: '🤧💧',
  // Pencernaan
  mual: '🤢',
  muntah: '🤮',
  diare: '🚽',
  sakit_perut: '😣',
  tidak_nafsu_makan: '🍽️',
  // Nyeri
  nyeri_dada: '💔',
  sakit_punggung: '💥',
  nyeri_sendi: '🦵',
  nyeri_otot: '💪',
  // Neurologis
  pusing: '💫',
  pandangan_kabur: '👁️‍🗨',
  gemetar: '〰',
  cemas: '😰',
  depresi: '😔',
  // Lainnya
  bengkak: '🥧',
  ruam: '🔴',
};

// Category icons (still using lucide for category headers)
const CATEGORY_ICONS: Record<SymptomCategory, React.ReactNode> = {
  umum: <Thermometer className="h-5 w-5 text-red-500" />,
  pernapasan: <Wind className="h-5 w-5 text-teal-500" />,
  pencernaan: <Utensils className="h-5 w-5 text-amber-500" />,
  nyeri: <Bone className="h-5 w-5 text-blue-600" />,
  neurologis: <Brain className="h-5 w-5 text-purple-500" />,
  lainnya: <Sparkles className="h-5 w-5 text-pink-500" />,
};

interface SymptomSelectorProps {
  selectedSymptoms: string[];
  onToggleSymptom: (symptomId: string) => void;
  onClearAll: () => void;
}

export function SymptomSelector({ selectedSymptoms, onToggleSymptom, onClearAll }: SymptomSelectorProps) {
  const categories = Object.keys(SYMPTOMS) as SymptomCategory[];

  // Get symptom label by ID
  const getSymptomLabel = (id: string) => {
    for (const category of categories) {
      const symptom = SYMPTOMS[category].find(s => s.id === id);
      if (symptom) return symptom.label;
    }
    return id;
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      {/* Header with counter */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <ListChecks className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Pilih Gejala</h2>
            <p className="text-sm text-gray-600">
              <motion.span
                key={selectedSymptoms.length}
                initial={{ scale: 1.2, color: '#2563eb' }}
                animate={{ scale: 1, color: '#2563eb' }}
                className="font-semibold"
              >
                {selectedSymptoms.length}
              </motion.span>{' '}
              gejala terpilih
            </p>
          </div>
        </div>
        {selectedSymptoms.length > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClearAll}
            className="flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
          >
            <Trash2 className="h-4 w-4" />
            Hapus Semua
          </motion.button>
        )}
      </div>

      {/* Selected symptoms tags */}
      <AnimatePresence mode="popLayout">
        {selectedSymptoms.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-4 overflow-hidden"
          >
            <div className="mb-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
              Gejala Terpilih
            </div>
            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {selectedSymptoms.map((symptomId) => (
                  <motion.span
                    key={symptomId}
                    layout
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.15 } }}
                    whileHover={{ scale: 1.02 }}
                    className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm"
                  >
                    <span className="text-base">{SYMPTOM_EMOJIS[symptomId] || '🔍'}</span>
                    {getSymptomLabel(symptomId)}
                    <button
                      onClick={() => onToggleSymptom(symptomId)}
                      className="ml-1 rounded-full p-0.5 transition-colors hover:bg-blue-500"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mb-4 text-sm text-gray-600">
        Ketuk gejala yang Anda rasakan. Setiap gejala ditampilkan sebagai pill di bawah.
      </p>

      {/* Category sections with solid background */}
      <div className="space-y-4">
        {categories.map((category) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden rounded-xl bg-gray-50"
          >
            {/* Category header */}
            <div className="flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3">
              {CATEGORY_ICONS[category]}
              <span className="flex-1 text-sm font-semibold text-gray-800">
                {CATEGORY_LABELS[category]}
              </span>
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-100 px-1.5 text-xs font-medium text-blue-700">
                {countSelectedInCategory(category, selectedSymptoms)}
              </span>
            </div>

            {/* Symptom pills */}
            <div className="flex flex-wrap gap-2 p-4">
              {SYMPTOMS[category].map((symptom, index) => {
                const isSelected = selectedSymptoms.includes(symptom.id);
                return (
                  <motion.button
                    key={symptom.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.03 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onToggleSymptom(symptom.id)}
                    className={`relative inline-flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      isSelected
                        ? 'border-blue-600 bg-blue-600 text-white shadow-sm'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    {/* Checkmark badge when selected */}
                    {isSelected && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-white"
                      >
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.span>
                    )}
                    {/* Emoji with hover bounce and selected scale */}
                    <motion.span
                      className="text-xl"
                      animate={isSelected ? { scale: 1.2 } : { scale: 1 }}
                      transition={{ duration: 0.15 }}
                      whileHover={{ y: [0, -3, 0] }}
                      style={{ display: 'inline-block' }}
                    >
                      {SYMPTOM_EMOJIS[symptom.id] || '🔍'}
                    </motion.span>
                    <span>{symptom.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function countSelectedInCategory(category: SymptomCategory, selected: string[]): number {
  return SYMPTOMS[category].filter(s => selected.includes(s.id)).length;
}
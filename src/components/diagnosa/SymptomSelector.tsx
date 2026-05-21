'use client';

import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import type { SymptomCategory, Symptom } from '@/types';
import { SYMPTOMS, CATEGORY_LABELS } from '@/lib/data/symptoms';
import { ListChecks, ChevronRight } from 'lucide-react';

interface SymptomSelectorProps {
  selectedSymptoms: string[];
  onToggleSymptom: (symptomId: string) => void;
}

export function SymptomSelector({ selectedSymptoms, onToggleSymptom }: SymptomSelectorProps) {
  const categories = Object.keys(SYMPTOMS) as SymptomCategory[];

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
          <ListChecks className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Pilih Gejala</h2>
          <p className="text-sm text-gray-600">
            Langkah 2 dari 2 - {selectedSymptoms.length} gejala dipilih
          </p>
        </div>
      </div>

      <p className="mb-4 text-sm text-gray-600">
        Pilih semua gejala yang Anda rasakan saat ini. Semakin akurat gejala yang dipilih,
        semakin baik hasil diagnosa.
      </p>

      <Accordion type="single" collapsible className="w-full">
        {categories.map((category) => (
          <AccordionItem key={category} value={category}>
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{CATEGORY_LABELS[category]}</span>
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-100 px-1.5 text-xs font-medium text-blue-700">
                  {countSelectedInCategory(category, selectedSymptoms)}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-3 py-4">
                {SYMPTOMS[category].map((symptom) => (
                  <SymptomCheckbox
                    key={symptom.id}
                    symptom={symptom}
                    checked={selectedSymptoms.includes(symptom.id)}
                    onChange={() => onToggleSymptom(symptom.id)}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

interface SymptomCheckboxProps {
  symptom: Symptom;
  checked: boolean;
  onChange: () => void;
}

function SymptomCheckbox({ symptom, checked, onChange }: SymptomCheckboxProps) {
  return (
    <motion.label
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-all ${
        checked
          ? 'border-blue-600 bg-blue-50'
          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
      }`}
    >
      <Checkbox checked={checked} onCheckedChange={onChange} />
      <span className={`flex-1 text-sm ${checked ? 'text-blue-700 font-medium' : 'text-gray-700'}`}>
        {symptom.label}
      </span>
      {checked && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-blue-600"
        >
          <ChevronRight className="h-4 w-4" />
        </motion.div>
      )}
    </motion.label>
  );
}

function countSelectedInCategory(category: SymptomCategory, selected: string[]): number {
  return SYMPTOMS[category].filter(s => selected.includes(s.id)).length;
}
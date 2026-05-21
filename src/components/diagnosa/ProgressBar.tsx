'use client';

import { motion } from 'framer-motion';
import { ListChecks, CheckCircle2 } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  selectedSymptoms: number;
  minSymptoms?: number;
}

export function ProgressBar({
  currentStep,
  totalSteps,
  selectedSymptoms,
}: ProgressBarProps) {
  // Calculate steps completed
  const stepsCompleted = currentStep;

  return (
    <div className="mb-6 overflow-hidden rounded-2xl bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <ListChecks className="h-4 w-4 text-blue-600" />
          <span>Progress</span>
        </div>
        <span className="text-sm font-bold text-blue-600">
          {stepsCompleted}/{totalSteps} steps
        </span>
      </div>

      {/* Progress track */}
      <div className="relative h-2 overflow-hidden rounded-full bg-gray-100">
        {/* Animated fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(stepsCompleted / totalSteps) * 100}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blue-600 to-blue-400"
        />

        {/* Shimmer effect */}
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        />
      </div>

      {/* Step indicators */}
      <div className="mt-3 flex justify-between">
        {[1, 2].map((step) => (
          <div key={step} className="flex items-center gap-1.5">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className={`
                flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold
                ${step <= stepsCompleted
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-500'}
              `}
            >
              {step <= stepsCompleted ? (
                <CheckCircle2 className="h-3 w-3" />
              ) : (
                step
              )}
            </motion.div>
            <span className={`text-xs ${step <= stepsCompleted ? 'text-blue-600 font-medium' : 'text-gray-400'}`}>
              {step === 1 ? 'Data Diri' : 'Pilih Gejala'}
            </span>
          </div>
        ))}
      </div>

      {/* Symptoms counter */}
      {selectedSymptoms > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-3 flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
            {selectedSymptoms}
          </span>
          <span className="text-xs font-medium text-blue-700">gejala dipilih</span>
        </motion.div>
      )}
    </div>
  );
}
'use client';

import { motion } from 'framer-motion';
import { ListChecks, CheckCircle2 } from 'lucide-react';

interface ProgressBarProps {
  isPatientDataFilled: boolean;
  selectedSymptomsCount: number;
}

export function ProgressBar({ isPatientDataFilled, selectedSymptomsCount }: ProgressBarProps) {
  // Calculate progress based on actual state
  // Step 1: Patient data (age filled) = 1 point
  // Step 2: At least 1 symptom selected = 1 point
  const points = (isPatientDataFilled ? 1 : 0) + (selectedSymptomsCount > 0 ? 1 : 0);
  const totalPoints = 2;
  const percentage = (points / totalPoints) * 100;

  // Step completion states
  const step1Complete = isPatientDataFilled;
  const step2Complete = selectedSymptomsCount > 0;

  return (
    <div className="mb-6 overflow-hidden rounded-2xl bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <ListChecks className="h-4 w-4 text-blue-600" />
          <span>Progress</span>
        </div>
        <span className="text-sm font-bold text-blue-600">
          {points}/{totalPoints} steps
        </span>
      </div>

      {/* Progress track */}
      <div className="relative h-2.5 overflow-hidden rounded-full bg-gray-100">
        {/* Animated fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blue-600 to-blue-400"
        />

        {/* Shimmer effect - only when not complete */}
        {!step2Complete && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{ duration: 1.5, delay: 0.5, repeat: Infinity, repeatDelay: 2 }}
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          />
        )}
      </div>

      {/* Step indicators */}
      <div className="mt-4 flex justify-between">
        {/* Step 1: Data Diri */}
        <div className="flex items-center gap-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className={`
              flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition-colors
              ${step1Complete
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-500'}
            `}
          >
            {step1Complete ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <span>1</span>
            )}
          </motion.div>
          <span className={`text-sm ${step1Complete ? 'font-semibold text-blue-600' : 'text-gray-400'}`}>
            Data Diri
          </span>
        </div>

        {/* Step 2: Pilih Gejala */}
        <div className="flex items-center gap-2">
          <span className={`text-sm ${step2Complete ? 'font-semibold text-blue-600' : 'text-gray-400'}`}>
            Pilih Gejala
          </span>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className={`
              flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition-colors
              ${step2Complete
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-500'}
            `}
          >
            {step2Complete ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <span>2</span>
            )}
          </motion.div>
        </div>
      </div>

      {/* Symptoms counter - only show when symptoms are selected */}
      {selectedSymptomsCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-3 flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
            {selectedSymptomsCount}
          </span>
          <span className="text-xs font-medium text-blue-700">
            {selectedSymptomsCount === 1 ? 'gejala dipilih' : 'gejala dipilih'}
          </span>
        </motion.div>
      )}
    </div>
  );
}
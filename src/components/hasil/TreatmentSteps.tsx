'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Treatment } from '@/types';
import { CheckCircle, Pill, Clock, AlertTriangle, Stethoscope } from 'lucide-react';

interface TreatmentStepsProps {
  treatment: Treatment;
  diseaseName: string;
}

export function TreatmentSteps({ treatment, diseaseName }: TreatmentStepsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <Card className="overflow-hidden shadow-lg">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 p-6">
          <CardTitle className="flex items-center gap-2 text-white">
            <Stethoscope className="h-6 w-6" />
            Langkah Pengobatan Mandiri
          </CardTitle>
          <p className="mt-1 text-sm text-green-100">
            Untuk <strong className="text-white">{diseaseName}</strong>
          </p>
        </div>

        <CardContent className="space-y-6 p-6">
          {/* Steps */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-green-400 to-emerald-200" />

            <div className="space-y-6">
              {treatment.steps.map((step, index) => (
                <motion.div
                  key={step.order}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="relative flex gap-4"
                >
                  {/* Numbered circle */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, type: 'spring', stiffness: 200 }}
                    className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-500 text-lg font-bold text-white shadow-lg"
                  >
                    {step.order}
                  </motion.div>

                  <div className="flex-1 pb-6">
                    <h4 className="mb-1 font-semibold text-gray-900">{step.title}</h4>
                    <p className="text-sm leading-relaxed text-gray-600">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Medications */}
          {treatment.medications.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="overflow-hidden rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white"
            >
              <div className="flex items-center gap-2 border-b border-blue-100 bg-blue-50 px-4 py-3">
                <Pill className="h-5 w-5 text-blue-600" />
                <h4 className="font-semibold text-blue-900">Obat yang Direkomendasikan</h4>
              </div>
              <ul className="space-y-2 p-4">
                {treatment.medications.map((med, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.75 + index * 0.05 }}
                    className="flex items-center gap-3 text-sm text-blue-800"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                      <svg className="h-3.5 w-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    {med}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* When to see doctor */}
          {treatment.whenToSeeDoctor.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="overflow-hidden rounded-xl border border-amber-100 bg-gradient-to-br from-amber-50 to-yellow-50"
            >
              <div className="flex items-center gap-2 border-b border-amber-100 bg-amber-50 px-4 py-3">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <h4 className="font-semibold text-amber-900">Kapan Harus ke Dokter</h4>
              </div>
              <ul className="space-y-2 p-4">
                {treatment.whenToSeeDoctor.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.85 + index * 0.05 }}
                    className="flex items-center gap-3 text-sm text-amber-800"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100">
                      <svg className="h-3.5 w-3.5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Duration */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
              <Clock className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Estimasi Durasi Pemulihan</p>
              <p className="font-semibold text-gray-900">{treatment.duration}</p>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
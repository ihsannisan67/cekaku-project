'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DiagnosisResult } from '@/types';
import { getSeverityLabel } from '@/lib/algorithm/severity-calculator';
import { CheckCircle, AlertTriangle, AlertCircle, TrendingUp } from 'lucide-react';

interface DiagnosisCardProps {
  result: DiagnosisResult;
  index?: number;
}

export function DiagnosisCard({ result, index = 0 }: DiagnosisCardProps) {
  const { disease, score, confidence, matchedSymptoms } = result;
  const percentage = Math.round(score * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <Card className="overflow-hidden border-2 border-blue-200 shadow-lg">
        {/* Header with gradient */}
        <div className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 p-6 text-white">
          {/* Animated shimmer effect */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{ duration: 1.5, delay: 0.5, repeat: Infinity, repeatDelay: 2 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          />

          <div className="relative flex items-start justify-between">
            <div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Badge
                  variant={disease.severity}
                  className={`
                    mb-3 px-3 py-1 text-sm font-semibold
                    ${disease.severity === 'parah' ? 'bg-red-500 text-white' : ''}
                    ${disease.severity === 'sedang' ? 'bg-amber-500 text-white' : ''}
                    ${disease.severity === 'ringan' ? 'bg-green-500 text-white' : ''}
                  `}
                >
                  {disease.severity === 'parah' && <AlertCircle className="mr-1 h-4 w-4" />}
                  {disease.severity === 'sedang' && <AlertTriangle className="mr-1 h-4 w-4" />}
                  {disease.severity === 'ringan' && <CheckCircle className="mr-1 h-4 w-4" />}
                  {getSeverityLabel(disease.severity)}
                </Badge>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="text-2xl font-bold"
              >
                {disease.name}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-blue-100"
              >
                {disease.nameEn}
              </motion.p>
            </div>

            {/* Confidence display */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="text-right"
            >
              <div className="flex items-center gap-1 text-blue-100">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">Confidence</span>
              </div>

              {/* Animated confidence number */}
              <div className="text-3xl font-bold">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {percentage}
                </motion.span>
                <span className="text-2xl">%</span>
              </div>

              {/* Animated confidence bar */}
              <div className="mt-2 h-2 w-24 overflow-hidden rounded-full bg-white/30">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
                  className="h-full rounded-full bg-white"
                />
              </div>

              <Badge
                variant={
                  confidence === 'tinggi' ? 'tinggi' : confidence === 'sedang' ? 'sedang' : 'parah'
                }
                className="mt-2"
              >
                {confidence.charAt(0).toUpperCase() + confidence.slice(1)}
              </Badge>
            </motion.div>
          </div>
        </div>

        <CardContent className="p-6">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mb-4"
          >
            <h3 className="mb-2 flex items-center gap-2 font-semibold text-gray-900">
              <span className="h-1 w-4 rounded-full bg-blue-500" />
              Deskripsi
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">{disease.description}</p>
          </motion.div>

          {/* Matched symptoms */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mb-4"
          >
            <h3 className="mb-3 flex items-center gap-2 font-semibold text-gray-900">
              <span className="h-1 w-4 rounded-full bg-green-500" />
              Gejala yang Cocok ({matchedSymptoms.length}/{disease.symptoms.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {matchedSymptoms.map((symptomId, i) => (
                <motion.div
                  key={symptomId}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                >
                  <Badge variant="default" className="bg-gradient-to-r from-green-100 to-emerald-50 text-green-800 border border-green-200">
                    <CheckCircle className="mr-1.5 h-3.5 w-3.5" />
                    {symptomId.replace(/_/g, ' ')}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Treatment recommendation */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mt-4 overflow-hidden rounded-xl border border-gray-100 bg-gradient-to-r from-gray-50 to-white p-4"
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className={`
                  flex h-10 w-10 items-center justify-center rounded-full
                  ${disease.severity === 'ringan' ? 'bg-green-100 text-green-600' : ''}
                  ${disease.severity === 'sedang' ? 'bg-amber-100 text-amber-600' : ''}
                  ${disease.severity === 'parah' ? 'bg-red-100 text-red-600' : ''}
                `}
              >
                {disease.severity === 'ringan' && <CheckCircle className="h-5 w-5" />}
                {disease.severity === 'sedang' && <AlertTriangle className="h-5 w-5" />}
                {disease.severity === 'parah' && <AlertCircle className="h-5 w-5" />}
              </motion.div>
              <span className="text-sm font-medium text-gray-700">
                {disease.canTreatAtHome
                  ? 'Dapat ditangani mandiri dengan perhatian'
                  : 'Perlu konsultasi ke dokter'}
              </span>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
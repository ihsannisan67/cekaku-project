'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DiagnosisResult } from '@/types';
import { getSeverityLabel } from '@/lib/algorithm/severity-calculator';
import { TrendingUp, Stethoscope } from 'lucide-react';

interface AlternativeDiseasesProps {
  alternatives: DiagnosisResult[];
}

export function AlternativeDiseases({ alternatives }: AlternativeDiseasesProps) {
  if (alternatives.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <Card className="overflow-hidden shadow-lg">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white px-6 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600">
            <Stethoscope className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Kemungkinan Penyakit Lain</h3>
            <p className="text-xs text-gray-500">{alternatives.length} alternatif</p>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="space-y-4">
            {alternatives.map((alt, index) => (
              <motion.div
                key={alt.disease.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.01, x: 4 }}
                className="group relative flex items-center gap-4 rounded-xl border border-gray-100 bg-gradient-to-r from-white to-gray-50 p-4 shadow-sm transition-all hover:border-blue-200 hover:shadow-md"
              >
                {/* Number badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, type: 'spring', stiffness: 200 }}
                  className={`
                    flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-lg font-bold
                    ${index === 0 ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white' : 'bg-gradient-to-br from-gray-300 to-gray-400 text-white'}
                  `}
                >
                  {index + 2}
                </motion.div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {alt.disease.name}
                    </h4>
                    <Badge
                      variant={alt.disease.severity}
                      className={`
                        ${alt.disease.severity === 'parah' ? 'bg-red-100 text-red-700 border-red-200' : ''}
                        ${alt.disease.severity === 'sedang' ? 'bg-amber-100 text-amber-700 border-amber-200' : ''}
                        ${alt.disease.severity === 'ringan' ? 'bg-green-100 text-green-700 border-green-200' : ''}
                      `}
                    >
                      {getSeverityLabel(alt.disease.severity)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">{alt.disease.nameEn}</p>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-bold text-gray-900">
                      {(alt.score * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-1.5 w-16 overflow-hidden rounded-full bg-gray-100">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${alt.score * 100}%` }}
                      transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400"
                    />
                  </div>
                  <p className="text-xs text-gray-400">
                    {alt.matchedSymptoms.length} gejala cocok
                  </p>
                </div>

                {/* Hover indicator */}
                <div className="absolute right-4 opacity-0 transition-opacity group-hover:opacity-100">
                  <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DiagnosisResult } from '@/types';
import { getSeverityColor, getSeverityLabel } from '@/lib/algorithm/severity-calculator';
import { TrendingUp } from 'lucide-react';

interface AlternativeDiseasesProps {
  alternatives: DiagnosisResult[];
}

export function AlternativeDiseases({ alternatives }: AlternativeDiseasesProps) {
  if (alternatives.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card>
        <CardContent className="p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Kemungkinan Penyakit Lain
          </h3>
          <div className="space-y-4">
            {alternatives.map((alt, index) => (
              <div
                key={alt.disease.id}
                className="flex items-center gap-4 rounded-lg border p-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-lg font-bold text-gray-600">
                  {index + 2}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-gray-900">{alt.disease.name}</h4>
                    <Badge variant={alt.disease.severity} className="text-xs">
                      {getSeverityLabel(alt.disease.severity)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">{alt.disease.nameEn}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-gray-600">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {(alt.score * 100).toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {alt.matchedSymptoms.length} gejala cocok
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DiagnosisResult } from '@/types';
import { getSeverityColor, getSeverityLabel } from '@/lib/algorithm/severity-calculator';
import { CheckCircle, AlertTriangle, AlertCircle, TrendingUp } from 'lucide-react';

interface DiagnosisCardProps {
  result: DiagnosisResult;
}

export function DiagnosisCard({ result }: DiagnosisCardProps) {
  const { disease, score, confidence, matchedSymptoms } = result;
  const severityColor = getSeverityColor(disease.severity);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden border-2 border-blue-200">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <Badge variant={disease.severity} className="mb-3">
                {getSeverityLabel(disease.severity)}
              </Badge>
              <h2 className="text-2xl font-bold">{disease.name}</h2>
              <p className="text-blue-100">{disease.nameEn}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-blue-100">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">Confidence</span>
              </div>
              <p className="text-3xl font-bold">{(score * 100).toFixed(0)}%</p>
              <Badge
                variant={
                  confidence === 'tinggi'
                    ? 'tinggi'
                    : confidence === 'sedang'
                    ? 'sedang'
                    : 'parah'
                }
                className="mt-1"
              >
                {confidence.charAt(0).toUpperCase() + confidence.slice(1)}
              </Badge>
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="mb-4">
            <h3 className="mb-2 font-semibold text-gray-900">Deskripsi</h3>
            <p className="text-sm text-gray-600">{disease.description}</p>
          </div>

          <div className="mb-4">
            <h3 className="mb-2 font-semibold text-gray-900">
              Gejala yang Cocok ({matchedSymptoms.length}/{disease.symptoms.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {matchedSymptoms.map((symptomId) => (
                <Badge key={symptomId} variant="default" className="bg-green-100 text-green-800">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  {symptomId.replace(/_/g, ' ')}
                </Badge>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-lg bg-gray-50 p-4">
            <div className="flex items-center gap-2">
              {disease.severity === 'ringan' && <CheckCircle className="h-5 w-5 text-green-600" />}
              {disease.severity === 'sedang' && <AlertTriangle className="h-5 w-5 text-yellow-600" />}
              {disease.severity === 'parah' && <AlertCircle className="h-5 w-5 text-red-600" />}
              <span className="text-sm font-medium text-gray-700">
                {disease.canTreatAtHome
                  ? 'Dapat ditangani mandiri dengan perhatian'
                  : 'Perlu konsultasi ke dokter'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
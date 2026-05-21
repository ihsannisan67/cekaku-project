'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Treatment } from '@/types';
import { CheckCircle, Pill, Clock, AlertTriangle } from 'lucide-react';

interface TreatmentStepsProps {
  treatment: Treatment;
  diseaseName: string;
}

export function TreatmentSteps({ treatment, diseaseName }: TreatmentStepsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Langkah Pengobatan Mandiri
          </CardTitle>
          <p className="text-sm text-gray-600">
            Untuk <strong>{diseaseName}</strong>
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Steps */}
          <div className="space-y-4">
            {treatment.steps.map((step) => (
              <div key={step.order} className="flex gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                  {step.order}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Medications */}
          {treatment.medications.length > 0 && (
            <div className="rounded-lg bg-blue-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Pill className="h-5 w-5 text-blue-600" />
                <h4 className="font-medium text-blue-900">Obat yang Direkomendasikan</h4>
              </div>
              <ul className="space-y-1">
                {treatment.medications.map((med, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-blue-800">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    {med}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* When to see doctor */}
          {treatment.whenToSeeDoctor.length > 0 && (
            <div className="rounded-lg bg-amber-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <h4 className="font-medium text-amber-900">Kapan Harus ke Dokter</h4>
              </div>
              <ul className="space-y-1">
                {treatment.whenToSeeDoctor.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-amber-800">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Duration */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>Estimasi durasi pemulihan: </span>
            <span className="font-medium text-gray-900">{treatment.duration}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
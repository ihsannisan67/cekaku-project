'use client';

import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { ListChecks } from 'lucide-react';

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
  minSymptoms = 1,
}: ProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Calculate progress based on step and symptoms
    const stepProgress = (currentStep / totalSteps) * 100;
    const symptomBonus = Math.min((selectedSymptoms / minSymptoms) * 10, 10);
    setProgress(Math.min(stepProgress + symptomBonus, 100));
  }, [currentStep, totalSteps, selectedSymptoms, minSymptoms]);

  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <ListChecks className="h-4 w-4" />
          <span>Progress</span>
        </div>
        <span className="text-sm font-medium text-gray-900">
          {currentStep}/{totalSteps}
        </span>
      </div>
      <Progress value={progress} className="h-2" />
      {selectedSymptoms > 0 && (
        <p className="mt-2 text-xs text-gray-500">
          {selectedSymptoms} gejala dipilih
        </p>
      )}
    </div>
  );
}
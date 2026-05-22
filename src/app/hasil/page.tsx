'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { DiagnosisCard } from '@/components/hasil/DiagnosisCard';
import { AlternativeDiseases } from '@/components/hasil/AlternativeDiseases';
import { HospitalAlert } from '@/components/hasil/HospitalAlert';
import { TreatmentSteps } from '@/components/hasil/TreatmentSteps';
import { PDFExportButton } from '@/components/hasil/PDFExportButton';
import { Disclaimer } from '@/components/hasil/Disclaimer';
import { getTreatmentByDiseaseId } from '@/lib/data/treatments';
import type { DiagnosisOutput, DiagnosisInput } from '@/types';

export default function HasilPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [diagnosisOutput, setDiagnosisOutput] = useState<DiagnosisOutput | null>(null);
  const [diagnosisInput, setDiagnosisInput] = useState<DiagnosisInput | null>(null);

  useEffect(() => {
    // Load from sessionStorage
    const storedOutput = sessionStorage.getItem('diagnosisOutput');
    const storedInput = sessionStorage.getItem('diagnosisInput');

    if (storedOutput && storedInput) {
      try {
        const output = JSON.parse(storedOutput) as DiagnosisOutput;
        const input = JSON.parse(storedInput) as DiagnosisInput;
        setDiagnosisOutput(output);
        setDiagnosisInput(input);
      } catch {
        router.push('/diagnosa');
      }
    } else {
      router.push('/diagnosa');
    }

    setIsLoading(false);
  }, [router]);

  if (isLoading || !diagnosisOutput || !diagnosisInput) {
    return (
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="flex min-h-[60vh] items-center justify-center">
            <div className="text-center">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-600" />
              <p className="mt-4 text-gray-600">Memuat hasil...</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const { primary, alternatives, mustGoToHospital, disclaimer } = diagnosisOutput;
  const treatment = getTreatmentByDiseaseId(primary.disease.id);

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/diagnosa"
            className="mb-4 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Diagnosa Ulang
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Hasil Diagnosa</h1>
          <p className="mt-2 text-gray-600">
            {diagnosisInput.age} tahun, {diagnosisInput.gender === 'male' ? 'Laki-laki' : 'Perempuan'} | {diagnosisInput.selectedSymptoms.length} gejala dipilih
          </p>
        </div>

        {/* Content for screen display */}
        <div className="space-y-6">
          {/* Hospital Alert */}
          {mustGoToHospital && (
            <HospitalAlert diseaseName={primary.disease.name} />
          )}

          {/* Primary Diagnosis */}
          <DiagnosisCard result={primary} />

          {/* Treatment Steps */}
          {treatment && !mustGoToHospital && (
            <TreatmentSteps treatment={treatment} diseaseName={primary.disease.name} />
          )}

          {/* Alternative Diseases */}
          <AlternativeDiseases alternatives={alternatives} />

          {/* Disclaimer */}
          <Disclaimer disclaimer={disclaimer} />
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 no-print">
          <PDFExportButton
            diagnosisOutput={diagnosisOutput}
            diagnosisInput={diagnosisInput}
          />
          <Link href="/diagnosa">
            <button className="rounded-lg border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Diagnosa Ulang
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { PatientForm } from '@/components/diagnosa/PatientForm';
import { SymptomSelector } from '@/components/diagnosa/SymptomSelector';
import { ProgressBar } from '@/components/diagnosa/ProgressBar';
import { DisclaimerModal } from '@/components/diagnosa/DisclaimerModal';
import { diagnose } from '@/lib/algorithm/diagnosis-engine';
import type { Gender, DiagnosisOutput, DiagnosisInput } from '@/types';

export default function DiagnosaPage() {
  const router = useRouter();
  const [age, setAge] = useState<number>(0);
  const [gender, setGender] = useState<Gender>('male');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleToggleSymptom = (symptomId: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptomId)
        ? prev.filter((id) => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleSubmit = async () => {
    setError(null);

    // Validate
    if (age <= 0 || age > 120) {
      setError('Umur harus antara 1-120 tahun');
      return;
    }

    if (selectedSymptoms.length === 0) {
      setError('Pilih minimal satu gejala');
      return;
    }

    setIsLoading(true);

    try {
      const input: DiagnosisInput = {
        age,
        gender,
        selectedSymptoms,
      };

      const output: DiagnosisOutput = diagnose(input);

      // Store in sessionStorage
      sessionStorage.setItem('diagnosisInput', JSON.stringify(input));
      sessionStorage.setItem('diagnosisOutput', JSON.stringify(output));

      // Navigate to results
      router.push('/hasil');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearAll = () => {
    setSelectedSymptoms([]);
  };

  const isValid = age > 0 && age <= 120 && selectedSymptoms.length > 0;

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Beranda
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Diagnosa Gejala</h1>
          <p className="mt-2 text-gray-600">
            Ikuti langkah-langkah di bawah ini untuk mendapatkan hasil diagnosa
          </p>
        </div>

        {/* Progress */}
        <ProgressBar
          currentStep={2}
          totalSteps={2}
          selectedSymptoms={selectedSymptoms.length}
          minSymptoms={1}
        />

        {/* Error message */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Forms */}
        <div className="space-y-6">
          <PatientForm
            age={age}
            setAge={setAge}
            gender={gender}
            setGender={setGender}
          />

          <SymptomSelector
            selectedSymptoms={selectedSymptoms}
            onToggleSymptom={handleToggleSymptom}
            onClearAll={handleClearAll}
          />

          {/* Submit */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <DisclaimerModal
              onConfirm={handleSubmit}
              disabled={!isValid || isLoading}
            />

            {isLoading && (
              <div className="mt-4 text-center text-sm text-gray-600">
                <div className="mb-2 inline-block h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
                <p>Menganalisis gejala...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
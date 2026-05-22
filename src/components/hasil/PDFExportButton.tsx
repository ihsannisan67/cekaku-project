'use client';

import { useEffect } from 'react';
import { Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DiagnosisPrintContent } from './DiagnosisPrintContent';
import type { DiagnosisOutput, DiagnosisInput } from '@/types';

interface PDFExportButtonProps {
  diagnosisOutput: DiagnosisOutput;
  diagnosisInput: DiagnosisInput;
}

export function PDFExportButton({ diagnosisOutput, diagnosisInput }: PDFExportButtonProps) {
  const handleSaveAsPDF = () => {
    // Add mode-print class to body to show print content
    document.body.classList.add('mode-print');

    // Call print dialog
    window.print();

    // Remove mode-print class after print dialog closes
    // Use setTimeout as a fallback since we can't detect when dialog closes
    setTimeout(() => {
      document.body.classList.remove('mode-print');
    }, 100);
  };

  return (
    <>
      {/* Print content (hidden in normal view, shown when mode-print is active) */}
      <DiagnosisPrintContent
        diagnosisOutput={diagnosisOutput}
        diagnosisInput={diagnosisInput}
      />

      {/* Button */}
      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant="outline"
          onClick={handleSaveAsPDF}
          className="flex items-center gap-2 rounded-lg border-2 border-blue-200 bg-blue-50 text-blue-700 transition-all hover:border-blue-400 hover:bg-blue-100"
        >
          <Printer className="h-4 w-4" />
          <span>Simpan sebagai PDF</span>
        </Button>

        <p className="w-full text-xs text-gray-500 sm:w-auto">
          Pilih &quot;Save as PDF&quot; di dialog print untuk menyimpan file
        </p>
      </div>
    </>
  );
}
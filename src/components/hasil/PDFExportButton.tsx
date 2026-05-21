'use client';

import { useRef } from 'react';
import { Download, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generatePDF, printResults } from '@/lib/utils/pdf-generator';
import type { DiagnosisOutput, DiagnosisInput } from '@/types';

interface PDFExportButtonProps {
  diagnosisOutput: DiagnosisOutput;
  diagnosisInput: DiagnosisInput;
  contentRef?: React.RefObject<HTMLDivElement | null>;
}

export function PDFExportButton({ diagnosisOutput, diagnosisInput, contentRef }: PDFExportButtonProps) {
  const handleDownloadPDF = async () => {
    const element = contentRef?.current || null;
    await generatePDF(diagnosisOutput, diagnosisInput, element);
  };

  const handlePrint = async () => {
    const element = contentRef?.current || null;
    await printResults(diagnosisOutput, diagnosisInput, element);
  };

  return (
    <div className="flex gap-3">
      <Button
        variant="outline"
        onClick={handleDownloadPDF}
        className="flex items-center gap-2"
      >
        <Download className="h-4 w-4" />
        Download PDF
      </Button>
      <Button
        variant="outline"
        onClick={handlePrint}
        className="flex items-center gap-2"
      >
        <Printer className="h-4 w-4" />
        Cetak
      </Button>
    </div>
  );
}
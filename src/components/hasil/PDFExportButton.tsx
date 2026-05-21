'use client';

import { motion } from 'framer-motion';
import { Download, Printer, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generatePDF } from '@/lib/utils/pdf-generator';
import type { DiagnosisOutput, DiagnosisInput } from '@/types';

interface PDFExportButtonProps {
  diagnosisOutput: DiagnosisOutput;
  diagnosisInput: DiagnosisInput;
  contentRef?: React.RefObject<HTMLDivElement | null>;
}

export function PDFExportButton({ diagnosisOutput, diagnosisInput, contentRef }: PDFExportButtonProps) {
  const handleDownloadPDF = async () => {
    try {
      const element = contentRef?.current || null;
      await generatePDF(diagnosisOutput, diagnosisInput, element);
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Gagal membuat PDF. Silakan coba lagi.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-wrap gap-3">
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          variant="outline"
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 rounded-lg border-2 border-blue-200 bg-blue-50 text-blue-700 transition-all hover:border-blue-400 hover:bg-blue-100"
        >
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Download PDF</span>
          <span className="sm:hidden">PDF</span>
        </Button>
      </motion.div>

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          variant="outline"
          onClick={handlePrint}
          className="flex items-center gap-2 rounded-lg border-2 border-gray-200 text-gray-700 transition-all hover:border-gray-400 hover:bg-gray-50"
        >
          <Printer className="h-4 w-4" />
          <span className="hidden sm:inline">Cetak</span>
        </Button>
      </motion.div>
    </div>
  );
}
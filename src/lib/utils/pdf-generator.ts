import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { DiagnosisOutput, DiagnosisInput } from '@/types';
import { getSymptomById } from '@/lib/data/symptoms';
import { getTreatmentByDiseaseId } from '@/lib/data/treatments';
import { getSeverityLabel } from '@/lib/algorithm/severity-calculator';

/**
 * PDF Generator for diagnosis results.
 * Uses jsPDF and html2canvas to create downloadable PDF reports.
 */

/**
 * Generate PDF from diagnosis results.
 *
 * @param diagnosisOutput - Complete diagnosis results
 * @param diagnosisInput - Patient input data
 * @param elementRef - Reference to HTML element to capture
 */
export async function generatePDF(
  diagnosisOutput: DiagnosisOutput,
  diagnosisInput: DiagnosisInput,
  elementRef: HTMLElement | null
): Promise<void> {
  if (elementRef) {
    // Capture the HTML element
    const canvas = await html2canvas(elementRef, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

    // Add footer to each page
    const pageCount = pdf.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      pdf.setFontSize(8);
      pdf.setTextColor(128);
      pdf.text(
        'Dihasilkan oleh Cekaku - Bukan pengganti konsultasi dokter. Konsultasikan hasil ini dengan tenaga medis profesional.',
        pdfWidth / 2,
        pdf.internal.pageSize.getHeight() - 10,
        { align: 'center' }
      );
      pdf.text(
        `Halaman ${i} dari ${pageCount}`,
        pdfWidth - 20,
        pdf.internal.pageSize.getHeight() - 10,
        { align: 'right' }
      );
    }

    pdf.save(`cekaku-diagnosis-${formatDate(new Date())}.pdf`);
  } else {
    // Fallback: generate PDF without visual capture
    generateTextPDF(diagnosisOutput, diagnosisInput);
  }
}

/**
 * Generate text-based PDF as fallback.
 *
 * @param diagnosisOutput - Diagnosis results
 * @param diagnosisInput - Patient input
 */
function generateTextPDF(
  diagnosisOutput: DiagnosisOutput,
  diagnosisInput: DiagnosisInput
): void {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  let y = 20;

  // Header
  pdf.setFontSize(24);
  pdf.setTextColor(59, 130, 246); // Blue
  pdf.text('CEKAKU', pageWidth / 2, y, { align: 'center' });
  y += 10;

  pdf.setFontSize(12);
  pdf.setTextColor(100);
  pdf.text('Laporan Hasil Diagnosa', pageWidth / 2, y, { align: 'center' });
  y += 15;

  // Separator line
  pdf.setDrawColor(200);
  pdf.line(20, y, pageWidth - 20, y);
  y += 10;

  // Patient info
  pdf.setFontSize(12);
  pdf.setTextColor(0);
  pdf.text('Data Pasien', 20, y);
  y += 8;

  pdf.setFontSize(10);
  pdf.setTextColor(60);
  pdf.text(`Umur: ${diagnosisInput.age} tahun`, 25, y);
  y += 6;
  pdf.text(`Jenis Kelamin: ${diagnosisInput.gender === 'male' ? 'Laki-laki' : 'Perempuan'}`, 25, y);
  y += 6;
  pdf.text(`Tanggal: ${formatDate(new Date())}`, 25, y);
  y += 15;

  // Selected symptoms
  pdf.setFontSize(12);
  pdf.setTextColor(0);
  pdf.text('Gejala yang Dipilih', 20, y);
  y += 8;

  pdf.setFontSize(10);
  pdf.setTextColor(60);
  for (const symptomId of diagnosisInput.selectedSymptoms) {
    const symptom = getSymptomById(symptomId);
    if (symptom) {
      pdf.text(`• ${symptom.label}`, 25, y);
      y += 5;
    }
  }
  y += 10;

  // Primary diagnosis
  pdf.setFontSize(12);
  pdf.setTextColor(0);
  pdf.text('Hasil Diagnosa Utama', 20, y);
  y += 8;

  pdf.setFontSize(14);
  pdf.setTextColor(59, 130, 246);
  pdf.text(diagnosisOutput.primary.disease.name, 25, y);
  y += 6;

  pdf.setFontSize(10);
  pdf.setTextColor(60);
  pdf.text(`Nama Medis: ${diagnosisOutput.primary.disease.nameEn}`, 25, y);
  y += 6;
  pdf.text(`Tingkat Keparahan: ${getSeverityLabel(diagnosisOutput.primary.disease.severity)}`, 25, y);
  y += 6;
  pdf.text(`Tingkat Keyakinan: ${diagnosisOutput.primary.confidence.toUpperCase()}`, 25, y);
  y += 6;
  pdf.text(`Score: ${(diagnosisOutput.primary.score * 100).toFixed(1)}%`, 25, y);
  y += 10;

  // Description
  pdf.setFontSize(10);
  pdf.setTextColor(0);
  pdf.text('Deskripsi:', 25, y);
  y += 5;
  const descriptionLines = pdf.splitTextToSize(diagnosisOutput.primary.disease.description, pageWidth - 50);
  pdf.setTextColor(60);
  pdf.text(descriptionLines, 25, y);
  y += descriptionLines.length * 5 + 10;

  // Hospital alert if needed
  if (diagnosisOutput.mustGoToHospital) {
    pdf.setFillColor(255, 235, 235);
    pdf.rect(20, y, pageWidth - 40, 20, 'F');
    pdf.setFontSize(11);
    pdf.setTextColor(185, 28, 28);
    pdf.text('⚠️ SEGERA KE RUMAH SAKIT!', pageWidth / 2, y + 8, { align: 'center' });
    pdf.setFontSize(9);
    pdf.text('Kondisi ini memerlukan penanganan medis segera.', pageWidth / 2, y + 15, { align: 'center' });
    y += 25;
  }

  // Alternative diagnoses
  if (diagnosisOutput.alternatives.length > 0) {
    pdf.setFontSize(12);
    pdf.setTextColor(0);
    pdf.text('Kemungkinan Penyakit Lain', 20, y);
    y += 8;

    for (let i = 0; i < diagnosisOutput.alternatives.length; i++) {
      const alt = diagnosisOutput.alternatives[i];
      pdf.setFontSize(11);
      pdf.setTextColor(59, 130, 246);
      pdf.text(`${i + 1}. ${alt.disease.name}`, 25, y);
      y += 5;
      pdf.setFontSize(9);
      pdf.setTextColor(60);
      pdf.text(`   Keyakinan: ${alt.confidence} (${(alt.score * 100).toFixed(1)}%)`, 25, y);
      y += 6;
    }
    y += 5;
  }

  // Treatment steps if available
  const treatment = getTreatmentByDiseaseId(diagnosisOutput.primary.disease.id);
  if (treatment && !diagnosisOutput.mustGoToHospital) {
    // Check if we need a new page
    if (y > pdf.internal.pageSize.getHeight() - 60) {
      pdf.addPage();
      y = 20;
    }

    pdf.setFontSize(12);
    pdf.setTextColor(0);
    pdf.text('Langkah Pengobatan Mandiri', 20, y);
    y += 8;

    for (const step of treatment.steps) {
      pdf.setFontSize(10);
      pdf.setTextColor(0);
      pdf.text(`${step.order}. ${step.title}`, 25, y);
      y += 5;
      pdf.setTextColor(60);
      const descLines = pdf.splitTextToSize(step.description, pageWidth - 55);
      pdf.text(descLines, 30, y);
      y += descLines.length * 4 + 3;
    }

    y += 5;
    pdf.setFontSize(10);
    pdf.setTextColor(0);
    pdf.text('Obat yang Direkomendasikan:', 25, y);
    y += 5;
    pdf.setTextColor(60);
    for (const med of treatment.medications) {
      pdf.text(`• ${med}`, 30, y);
      y += 4;
    }

    y += 5;
    pdf.setTextColor(0);
    pdf.text('Estimasi Durasi Pemulihan:', 25, y);
    y += 5;
    pdf.setTextColor(60);
    pdf.text(treatment.duration, 30, y);
  }

  // Disclaimer
  if (y > pdf.internal.pageSize.getHeight() - 40) {
    pdf.addPage();
    y = 20;
  }

  y += 15;
  pdf.setFillColor(255, 249, 235);
  pdf.rect(20, y, pageWidth - 40, 25, 'F');
  pdf.setFontSize(9);
  pdf.setTextColor(120, 80, 0);
  const disclaimerLines = pdf.splitTextToSize(
    `PERINGATAN: ${diagnosisOutput.disclaimer}`,
    pageWidth - 45
  );
  pdf.text(disclaimerLines, 25, y + 6);

  // Footer
  y = pdf.internal.pageSize.getHeight() - 15;
  pdf.setFontSize(8);
  pdf.setTextColor(150);
  pdf.text(
    'Dihasilkan oleh Cekaku - cekaku.vercel.app',
    pageWidth / 2,
    y,
    { align: 'center' }
  );

  pdf.save(`cekaku-diagnosis-${formatDate(new Date())}.pdf`);
}

/**
 * Format date for filename and display.
 *
 * @param date - Date object
 * @returns Formatted date string
 */
function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

/**
 * Print the diagnosis results.
 *
 * @param diagnosisOutput - Diagnosis results
 * @param diagnosisInput - Patient input
 * @param elementRef - HTML element to print
 */
export async function printResults(
  diagnosisOutput: DiagnosisOutput,
  diagnosisInput: DiagnosisInput,
  elementRef: HTMLElement | null
): Promise<void> {
  if (elementRef) {
    // Create a print-friendly version
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Hasil Diagnosa Cekaku</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
            h1 { color: #3b82f6; }
            .section { margin-bottom: 20px; }
            .severity-ringan { color: green; }
            .severity-sedang { color: orange; }
            .severity-parah { color: red; }
            .disclaimer { background: #fffbeb; padding: 15px; border-radius: 8px; margin-top: 20px; }
            @media print { body { print-color-adjust: exact; -webkit-print-color-adjust: exact; } }
          </style>
        </head>
        <body>
          ${elementRef.innerHTML}
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    }
  }
}
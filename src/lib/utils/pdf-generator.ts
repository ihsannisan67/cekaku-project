import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { DiagnosisOutput, DiagnosisInput } from '@/types';
import { getSymptomById } from '@/lib/data/symptoms';
import { getTreatmentByDiseaseId } from '@/lib/data/treatments';
import { getSeverityLabel } from '@/lib/algorithm/severity-calculator';

/**
 * Professional PDF Generator for diagnosis results.
 */
export async function generatePDF(
  diagnosisOutput: DiagnosisOutput,
  diagnosisInput: DiagnosisInput,
  elementRef: HTMLElement | null
): Promise<void> {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  let y = margin;

  // ===== HEADER =====
  // Blue gradient header background
  pdf.setFillColor(37, 99, 235); // Primary blue
  pdf.rect(0, 0, pageWidth, 40, 'F');

  // Header content
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text('CEKAKU', margin, 20);

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Hasil Diagnosa - ${formatDate(new Date())}`, pageWidth - margin, 15, { align: 'right' });
  pdf.text(`${diagnosisInput.age} tahun, ${diagnosisInput.gender === 'male' ? 'Laki-laki' : 'Perempuan'}`, pageWidth - margin, 22, { align: 'right' });

  y = 45;

  // ===== SECTION SEPARATOR =====
  pdf.setDrawColor(229, 231, 235);
  pdf.setLineWidth(0.5);
  pdf.line(margin, y, pageWidth - margin, y);
  y += 8;

  // ===== PRIMARY DIAGNOSIS =====
  // Left accent bar
  pdf.setFillColor(37, 99, 235);
  pdf.rect(margin, y, 4, 25, 'F');

  // Disease name
  pdf.setTextColor(17, 24, 39);
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'bold');
  pdf.text(diagnosisOutput.primary.disease.name, margin + 8, y + 8);

  // English name
  pdf.setTextColor(107, 114, 128);
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'italic');
  pdf.text(diagnosisOutput.primary.disease.nameEn, margin + 8, y + 15);

  // Severity badge
  const severityColors = {
    ringan: { bg: [34, 197, 94], text: [255, 255, 255] },    // green
    sedang: { bg: [245, 158, 11], text: [255, 255, 255] },   // yellow
    parah: { bg: [239, 68, 68], text: [255, 255, 255] },     // red
  };
  const sevColor = severityColors[diagnosisOutput.primary.disease.severity];
  pdf.setFillColor(sevColor.bg[0], sevColor.bg[1], sevColor.bg[2]);
  pdf.roundedRect(margin + 8, y + 18, 30, 8, 2, 2, 'F');
  pdf.setTextColor(sevColor.text[0], sevColor.text[1], sevColor.text[2]);
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'bold');
  pdf.text(getSeverityLabel(diagnosisOutput.primary.disease.severity), margin + 12, y + 24);

  y += 32;

  // ===== CONFIDENCE BAR =====
  pdf.setTextColor(107, 114, 128);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Tingkat Keyakinan', margin, y + 5);

  // Progress bar background
  pdf.setFillColor(229, 231, 235);
  pdf.roundedRect(margin + 45, y, 80, 8, 2, 2, 'F');

  // Progress bar fill
  const confidenceWidth = Math.round(diagnosisOutput.primary.score * 80);
  pdf.setFillColor(37, 99, 235);
  pdf.roundedRect(margin + 45, y, confidenceWidth, 8, 2, 2, 'F');

  // Percentage text
  pdf.setTextColor(17, 24, 39);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text(`${Math.round(diagnosisOutput.primary.score * 100)}%`, margin + 130, y + 6.5);

  // Confidence level badge
  const confLevel = diagnosisOutput.primary.confidence;
  const confColors = {
    tinggi: [59, 130, 246],
    sedang: [245, 158, 11],
    rendah: [156, 163, 175],
  };
  pdf.setFillColor(confColors[confLevel][0], confColors[confLevel][1], confColors[confLevel][2]);
  pdf.roundedRect(margin + 155, y, 22, 8, 2, 2, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(9);
  pdf.text(confLevel.charAt(0).toUpperCase() + confLevel.slice(1), margin + 158, y + 6);

  y += 15;

  // ===== DESCRIPTION =====
  pdf.setTextColor(107, 114, 128);
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  const descLines = pdf.splitTextToSize(diagnosisOutput.primary.disease.description, contentWidth);
  pdf.text(descLines, margin, y + 4);
  y += descLines.length * 4 + 8;

  // ===== SECTION SEPARATOR =====
  pdf.setDrawColor(229, 231, 235);
  pdf.line(margin, y, pageWidth - margin, y);
  y += 8;

  // ===== MATCHED SYMPTOMS =====
  pdf.setTextColor(17, 24, 39);
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Gejala yang Cocok', margin, y + 4);
  y += 10;

  const matchedSymptoms = diagnosisOutput.primary.matchedSymptoms;
  const symptomLabels = matchedSymptoms.map(id => getSymptomById(id)?.label || id);

  // Display in columns (2 columns if more than 4 symptoms)
  const colWidth = symptomLabels.length > 4 ? contentWidth / 2 : contentWidth;
  let col = 0;
  let row = 0;

  symptomLabels.forEach((label, i) => {
    const xPos = margin + col * colWidth;
    const yPos = y + row * 7;

    // Checkmark box
    pdf.setFillColor(34, 197, 94);
    pdf.roundedRect(xPos, yPos, 5, 5, 1, 1, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(7);
    pdf.text('✓', xPos + 1, yPos + 4);

    // Symptom label
    pdf.setTextColor(55, 65, 81);
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.text(label, xPos + 8, yPos + 4);

    col++;
    if (col >= 2 || symptomLabels.length <= 4) {
      col = 0;
      row++;
    }
  });

  y += Math.max(row + 1, Math.ceil(symptomLabels.length / 2)) * 7 + 8;

  // ===== SECTION SEPARATOR =====
  pdf.setDrawColor(229, 231, 235);
  pdf.line(margin, y, pageWidth - margin, y);
  y += 8;

  // ===== ALTERNATIVE DISEASES =====
  if (diagnosisOutput.alternatives.length > 0) {
    pdf.setTextColor(17, 24, 39);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Kemungkinan Lainnya', margin, y + 4);
    y += 10;

    diagnosisOutput.alternatives.forEach((alt, i) => {
      // Number badge
      pdf.setFillColor(229, 231, 235);
      pdf.circle(margin + 6, y + 2, 5, 'F');
      pdf.setTextColor(107, 114, 128);
      pdf.setFontSize(8);
      pdf.text(String(i + 2), margin + 4.5, y + 3.5);

      // Disease name
      pdf.setTextColor(17, 24, 39);
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.text(alt.disease.name, margin + 14, y + 4);

      // Score
      pdf.setTextColor(107, 114, 128);
      pdf.setFontSize(9);
      pdf.text(`(${Math.round(alt.score * 100)}% - ${alt.confidence})`, margin + 14, y + 9);

      y += 14;
    });
  }

  // ===== TREATMENT STEPS (if applicable) =====
  const treatment = getTreatmentByDiseaseId(diagnosisOutput.primary.disease.id);
  if (treatment && !diagnosisOutput.mustGoToHospital) {
    y += 5;
    pdf.setDrawColor(229, 231, 235);
    pdf.line(margin, y, pageWidth - margin, y);
    y += 8;

    pdf.setTextColor(17, 24, 39);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Langkah Pengobatan', margin, y + 4);
    y += 12;

    treatment.steps.forEach((step, i) => {
      // Numbered circle
      pdf.setFillColor(34, 197, 94);
      pdf.circle(margin + 5, y + 2, 5, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(8);
      pdf.text(String(step.order), margin + 3.5, y + 3.5);

      // Title
      pdf.setTextColor(17, 24, 39);
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.text(step.title, margin + 14, y + 4);

      // Description
      pdf.setTextColor(107, 114, 128);
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');
      const stepLines = pdf.splitTextToSize(step.description, contentWidth - 14);
      pdf.text(stepLines, margin + 14, y + 9);

      y += stepLines.length * 4 + 10;
    });

    // Medications
    if (treatment.medications.length > 0) {
      pdf.setTextColor(17, 24, 39);
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Obat yang Direkomendasikan:', margin, y + 4);
      y += 8;

      treatment.medications.forEach((med) => {
        pdf.setFillColor(59, 130, 246);
        pdf.circle(margin + 3, y + 2, 2, 'F');
        pdf.setTextColor(55, 65, 81);
        pdf.setFontSize(9);
        pdf.text(med, margin + 8, y + 3);
        y += 6;
      });
    }
  }

  // ===== HOSPITAL ALERT =====
  if (diagnosisOutput.mustGoToHospital) {
    y += 5;
    pdf.setDrawColor(239, 68, 68);
    pdf.setLineWidth(1);
    pdf.line(margin, y, pageWidth - margin, y);
    y += 8;

    // Alert box
    pdf.setFillColor(254, 242, 242);
    pdf.roundedRect(margin, y, contentWidth, 20, 3, 3, 'F');
    pdf.setDrawColor(239, 68, 68);
    pdf.setLineWidth(1);
    pdf.roundedRect(margin, y, contentWidth, 20, 3, 3, 'S');

    pdf.setTextColor(185, 28, 28);
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.text('⚠️ SEGERA KE RUMAH SAKIT!', pageWidth / 2, y + 8, { align: 'center' });
    pdf.setTextColor(127, 29, 29);
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Kondisi ini memerlukan penanganan medis segera.', pageWidth / 2, y + 14, { align: 'center' });

    y += 25;
  }

  // ===== WATERMARK =====
  // Use type assertion for GState
  (pdf as unknown as { setGState: (state: { opacity: number }) => void }).setGState({ opacity: 0.07 });
  pdf.setTextColor(37, 99, 235);
  pdf.setFontSize(60);
  pdf.setFont('helvetica', 'bold');
  pdf.text('CEKAKU', pageWidth / 2, pageHeight / 2, { angle: 45, align: 'center' });
  (pdf as unknown as { setGState: (state: { opacity: number }) => void }).setGState({ opacity: 1 });

  // ===== FOOTER =====
  pdf.setFillColor(55, 65, 81);
  pdf.rect(0, pageHeight - 20, pageWidth, 20, 'F');

  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Hasil Diagnosa Cekaku — Bukan pengganti konsultasi dokter — cekaku.vercel.app', pageWidth / 2, pageHeight - 10, { align: 'center' });

  pdf.save(`cekaku-diagnosis-${formatDate(new Date())}.pdf`);
}

/**
 * Format date for filename and display.
 */
function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

/**
 * Legacy function for printing (kept for compatibility)
 */
export async function printResults(
  diagnosisOutput: DiagnosisOutput,
  diagnosisInput: DiagnosisInput,
  elementRef: HTMLElement | null
): Promise<void> {
  // For now, just generate PDF
  await generatePDF(diagnosisOutput, diagnosisInput, elementRef);
}
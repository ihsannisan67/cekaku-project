'use client';

import { DiagnosisOutput, DiagnosisInput } from '@/types';
import { getTreatmentByDiseaseId } from '@/lib/data/treatments';
import { getSymptomById } from '@/lib/data/symptoms';
import { getSeverityLabel } from '@/lib/algorithm/severity-calculator';

interface DiagnosisPrintContentProps {
  diagnosisOutput: DiagnosisOutput;
  diagnosisInput: DiagnosisInput;
}

export function DiagnosisPrintContent({ diagnosisOutput, diagnosisInput }: DiagnosisPrintContentProps) {
  const { primary, alternatives, disclaimer } = diagnosisOutput;
  const treatment = getTreatmentByDiseaseId(primary.disease.id);
  const percentage = Math.round(primary.score * 100);

  const formatDate = () => {
    const now = new Date();
    return now.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div id="hasil-diagnosa-print" className="diagnosis-print-content">
      {/* Print Header */}
      <div className="print-header">
        <h1>Hasil Diagnosa Cekaku</h1>
        <div className="print-date">
          <div>{diagnosisInput.age} tahun, {diagnosisInput.gender === 'male' ? 'Laki-laki' : 'Perempuan'}</div>
          <div>{formatDate()}</div>
        </div>
      </div>

      {/* Disease Name & Card */}
      <div className="disease-card">
        <span className={`severity-badge ${primary.disease.severity}`}>
          {getSeverityLabel(primary.disease.severity)}
        </span>
        <h2 className="disease-name">{primary.disease.name}</h2>
        <p style={{ color: '#6b7280', marginBottom: '10px' }}>{primary.disease.nameEn}</p>
      </div>

      {/* Confidence */}
      <div className="confidence-section">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontWeight: 600 }}>Confidence:</span>
          <span>{percentage}%</span>
          <span style={{
            padding: '2px 8px',
            background: primary.confidence === 'tinggi' ? '#16a34a' : primary.confidence === 'sedang' ? '#ca8a04' : '#dc2626',
            color: 'white',
            borderRadius: '4px',
            fontSize: '10pt',
            fontWeight: 600,
            textTransform: 'uppercase'
          }}>
            {primary.confidence}
          </span>
        </div>
        <div className="confidence-bar-container">
          <div className="confidence-bar" style={{ width: `${percentage}%` }}></div>
        </div>
      </div>

      {/* Description */}
      <div style={{ marginBottom: '15px' }}>
        <p style={{ fontSize: '11pt', color: '#4b5563' }}>{primary.disease.description}</p>
      </div>

      {/* Matched Symptoms - 2 column if > 4 */}
      <div className="matched-symptoms">
        <h3 style={{ fontSize: '12pt', fontWeight: 700, marginBottom: '8px' }}>
          Gejala yang Cocok ({primary.matchedSymptoms.length}/{primary.disease.symptoms.length})
        </h3>
        <div className={primary.matchedSymptoms.length > 4 ? 'symptoms-grid' : ''}>
          {primary.matchedSymptoms.map((symptomId) => {
            const symptom = getSymptomById(symptomId);
            return (
              <div key={symptomId} className="symptom-item">
                <span className="symptom-check">✓</span>
                <span>{symptom?.label || symptomId}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Symptoms */}
      <div style={{ marginBottom: '15px' }}>
        <h4 style={{ fontSize: '10pt', fontWeight: 600, color: '#6b7280', marginBottom: '5px' }}>
          Semua Gejala yang Dipilih:
        </h4>
        <p style={{ fontSize: '10pt', color: '#4b5563' }}>
          {diagnosisInput.selectedSymptoms.map(id => getSymptomById(id)?.label || id).join(', ')}
        </p>
      </div>

      {/* Treatment Steps */}
      {treatment && (
        <div className="treatment-steps">
          <h3 style={{ fontSize: '12pt', fontWeight: 700, marginBottom: '10px', color: '#1e40af' }}>
            Langkah Pengobatan Mandiri
          </h3>
          {treatment.steps.map((step) => (
            <div key={step.order} className="step-item">
              <div className="step-number">{step.order}</div>
              <div className="step-content">
                <div className="step-title">{step.title}</div>
                <div className="step-desc">{step.description}</div>
              </div>
            </div>
          ))}

          {treatment.medications.length > 0 && (
            <div style={{ marginTop: '10px', marginLeft: '34px' }}>
              <strong style={{ fontSize: '10pt' }}>Obat:</strong>
              <span style={{ fontSize: '10pt', color: '#4b5563' }}> {treatment.medications.join(', ')}</span>
            </div>
          )}
        </div>
      )}

      {/* Alternative Diseases */}
      {alternatives.length > 0 && (
        <div className="alternatives-section">
          <h3 style={{ fontSize: '12pt', fontWeight: 700, marginBottom: '8px' }}>
            Kemungkinan Lainnya
          </h3>
          {alternatives.map((alt, i) => (
            <div key={alt.disease.id} className="alternative-item">
              {i + 1}. <strong>{alt.disease.name}</strong> ({Math.round(alt.score * 100)}%)
            </div>
          ))}
        </div>
      )}

      {/* Disclaimer */}
      <div className="disclaimer-section">
        <strong>Peringatan:</strong> {disclaimer}
      </div>

      {/* Footer */}
      <div className="print-footer">
        Hasil Diagnosa Cekaku — Bukan pengganti konsultasi dokter — cekaku.vercel.app
      </div>
    </div>
  );
}
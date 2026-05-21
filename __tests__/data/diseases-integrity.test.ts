import { describe, it, expect } from 'vitest';
import { DISEASES } from '@/lib/data/diseases';
import { ALL_SYMPTOMS } from '@/lib/data/symptoms';
import { TREATMENTS } from '@/lib/data/treatments';

describe('Diseases Integrity', () => {
  // Get all valid symptom IDs
  const validSymptomIds = ALL_SYMPTOMS.map(s => s.id);

  describe('Disease IDs', () => {
    it('should have unique disease IDs', () => {
      const ids = DISEASES.map(d => d.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(DISEASES.length);
    });
  });

  describe('Disease Symptoms', () => {
    it('should only contain valid symptom IDs', () => {
      DISEASES.forEach(disease => {
        disease.symptoms.forEach(symptomId => {
          expect(validSymptomIds).toContain(symptomId);
        });
      });
    });

    it('should have at least 3 symptoms per disease', () => {
      DISEASES.forEach(disease => {
        expect(disease.symptoms.length).toBeGreaterThanOrEqual(3);
      });
    });

    it('should have unique symptoms per disease', () => {
      DISEASES.forEach(disease => {
        const uniqueSymptoms = new Set(disease.symptoms);
        expect(uniqueSymptoms.size).toBe(disease.symptoms.length);
      });
    });
  });

  describe('Required Symptoms', () => {
    it('should be a subset of symptoms if defined', () => {
      DISEASES.forEach(disease => {
        if (disease.requiredSymptoms) {
          disease.requiredSymptoms.forEach(reqSymptom => {
            expect(disease.symptoms).toContain(reqSymptom);
          });
        }
      });
    });
  });

  describe('Severity Score', () => {
    it('should be between 1 and 10', () => {
      DISEASES.forEach(disease => {
        expect(disease.severityScore).toBeGreaterThanOrEqual(1);
        expect(disease.severityScore).toBeLessThanOrEqual(10);
      });
    });

    it('should have severityScore >= 7 for severe diseases', () => {
      DISEASES.forEach(disease => {
        if (disease.severity === 'parah') {
          expect(disease.severityScore).toBeGreaterThanOrEqual(7);
        }
      });
    });
  });

  describe('Treatable Diseases', () => {
    it('should have treatment for diseases that canTreatAtHome', () => {
      const treatableDiseases = DISEASES.filter(d => d.canTreatAtHome);
      const treatableIds = treatableDiseases.map(d => d.id);

      treatableDiseases.forEach(disease => {
        const hasTreatment = TREATMENTS.some(t => t.diseaseId === disease.id);
        expect(hasTreatment).toBe(true);
      });
    });
  });

  describe('Total Disease Count', () => {
    it('should have at least 40 diseases', () => {
      expect(DISEASES.length).toBeGreaterThanOrEqual(40);
    });
  });
});
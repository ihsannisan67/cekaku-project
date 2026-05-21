import { describe, it, expect } from 'vitest';
import {
  calculateSymptomWeight,
  buildSymptomWeightMap,
  calculateMatchScore,
  calculateCoverageScore,
  calculateAgeModifier,
  calculateGenderModifier,
  determineConfidence,
  diagnose,
} from '@/lib/algorithm/diagnosis-engine';
import { DISEASES } from '@/lib/data/diseases';
import type { Disease, Gender } from '@/types';

describe('Diagnosis Engine', () => {
  describe('calculateSymptomWeight', () => {
    it('should give higher weight to rarer symptoms', () => {
      // Common symptoms (appear in many diseases) should have lower weight
      const commonSymptom = 'demam'; // Appears in many diseases
      const rareSymptom = 'pandangan_kabur'; // Appears in fewer diseases

      const commonWeight = calculateSymptomWeight(commonSymptom, DISEASES);
      const rareWeight = calculateSymptomWeight(rareSymptom, DISEASES);

      expect(rareWeight).toBeGreaterThan(commonWeight);
    });

    it('should return 0 for non-existent symptoms', () => {
      const weight = calculateSymptomWeight('nonexistent_symptom', DISEASES);
      expect(weight).toBe(0);
    });
  });

  describe('buildSymptomWeightMap', () => {
    it('should build map for all symptoms', () => {
      const map = buildSymptomWeightMap(DISEASES);
      expect(map.size).toBeGreaterThan(0);
    });

    it('should assign weights between 0 and 1', () => {
      const map = buildSymptomWeightMap(DISEASES);
      map.forEach((weight) => {
        expect(weight).toBeGreaterThanOrEqual(0);
        expect(weight).toBeLessThanOrEqual(1);
      });
    });
  });

  describe('calculateMatchScore', () => {
    it('should return 0 if required symptoms are missing', () => {
      const heartAttack: Disease = {
        id: 'test',
        name: 'Test Disease',
        nameEn: 'Test Disease',
        symptoms: ['nyeri_dada', 'sesak_napas'],
        requiredSymptoms: ['nyeri_dada'],
        severity: 'parah',
        severityScore: 9,
        description: 'Test',
        canTreatAtHome: false,
      };

      const weightMap = buildSymptomWeightMap(DISEASES);
      const score = calculateMatchScore(['sesak_napas'], heartAttack, weightMap);
      expect(score).toBe(0);
    });

    it('should give higher score for more matched symptoms', () => {
      const flu: Disease = {
        id: 'flu',
        name: 'Flu',
        nameEn: 'Flu',
        symptoms: ['demam', 'batuk', 'pilek'],
        severity: 'ringan',
        severityScore: 2,
        description: 'Test',
        canTreatAtHome: true,
      };

      const weightMap = buildSymptomWeightMap(DISEASES);
      const score1 = calculateMatchScore(['demam'], flu, weightMap);
      const score2 = calculateMatchScore(['demam', 'batuk'], flu, weightMap);

      expect(score2).toBeGreaterThan(score1);
    });
  });

  describe('calculateCoverageScore', () => {
    it('should return 1 when all symptoms are matched', () => {
      const disease: Disease = {
        id: 'test',
        name: 'Test',
        nameEn: 'Test',
        symptoms: ['demam', 'batuk'],
        severity: 'ringan',
        severityScore: 2,
        description: 'Test',
        canTreatAtHome: true,
      };

      const score = calculateCoverageScore(['demam', 'batuk'], disease);
      expect(score).toBe(1);
    });

    it('should return 0.5 when half symptoms are matched', () => {
      const disease: Disease = {
        id: 'test',
        name: 'Test',
        nameEn: 'Test',
        symptoms: ['demam', 'batuk'],
        severity: 'ringan',
        severityScore: 2,
        description: 'Test',
        canTreatAtHome: true,
      };

      const score = calculateCoverageScore(['demam'], disease);
      expect(score).toBe(0.5);
    });
  });

  describe('calculateAgeModifier', () => {
    it('should return 1.0 for diseases without age range', () => {
      const disease: Disease = {
        id: 'test',
        name: 'Test',
        nameEn: 'Test',
        symptoms: [],
        severity: 'ringan',
        severityScore: 2,
        description: 'Test',
        canTreatAtHome: true,
      };

      const modifier = calculateAgeModifier(30, disease);
      expect(modifier).toBe(1.0);
    });

    it('should return 0.7 for patients outside age range', () => {
      const disease: Disease = {
        id: 'test',
        name: 'Test',
        nameEn: 'Test',
        symptoms: [],
        ageRange: [18, 60],
        severity: 'ringan',
        severityScore: 2,
        description: 'Test',
        canTreatAtHome: true,
      };

      const modifier = calculateAgeModifier(10, disease);
      expect(modifier).toBe(0.7);
    });

    it('should return 1.0 for patients within age range', () => {
      const disease: Disease = {
        id: 'test',
        name: 'Test',
        nameEn: 'Test',
        symptoms: [],
        ageRange: [18, 60],
        severity: 'ringan',
        severityScore: 2,
        description: 'Test',
        canTreatAtHome: true,
      };

      const modifier = calculateAgeModifier(30, disease);
      expect(modifier).toBe(1.0);
    });
  });

  describe('calculateGenderModifier', () => {
    it('should return 1.0 for gender-neutral diseases', () => {
      const disease: Disease = {
        id: 'test',
        name: 'Test',
        nameEn: 'Test',
        symptoms: [],
        severity: 'ringan',
        severityScore: 2,
        description: 'Test',
        canTreatAtHome: true,
      };

      const modifier = calculateGenderModifier('male', disease);
      expect(modifier).toBe(1.0);
    });

    it('should return 0 for gender-specific diseases with wrong gender', () => {
      const disease: Disease = {
        id: 'test',
        name: 'Test',
        nameEn: 'Test',
        symptoms: [],
        genderSpecific: 'female',
        severity: 'sedang',
        severityScore: 4,
        description: 'Test',
        canTreatAtHome: false,
      };

      const modifier = calculateGenderModifier('male', disease);
      expect(modifier).toBe(0);
    });

    it('should return 1.0 for matching gender', () => {
      const disease: Disease = {
        id: 'test',
        name: 'Test',
        nameEn: 'Test',
        symptoms: [],
        genderSpecific: 'female',
        severity: 'sedang',
        severityScore: 4,
        description: 'Test',
        canTreatAtHome: false,
      };

      const modifier = calculateGenderModifier('female', disease);
      expect(modifier).toBe(1.0);
    });
  });

  describe('determineConfidence', () => {
    it('should return "tinggi" for scores >= 0.6', () => {
      expect(determineConfidence(0.6)).toBe('tinggi');
      expect(determineConfidence(0.8)).toBe('tinggi');
    });

    it('should return "sedang" for scores >= 0.3 and < 0.6', () => {
      expect(determineConfidence(0.3)).toBe('sedang');
      expect(determineConfidence(0.5)).toBe('sedang');
    });

    it('should return "rendah" for scores < 0.3', () => {
      expect(determineConfidence(0.1)).toBe('rendah');
      expect(determineConfidence(0.29)).toBe('rendah');
    });
  });

  describe('diagnose', () => {
    it('should throw error for empty symptoms', () => {
      expect(() => {
        diagnose({
          age: 30,
          gender: 'male',
          selectedSymptoms: [],
        });
      }).toThrow('Minimal satu gejala harus dipilih');
    });

    it('should return valid diagnosis result', () => {
      const result = diagnose({
        age: 30,
        gender: 'male',
        selectedSymptoms: ['pilek', 'bersin', 'sakit_tenggorokan', 'batuk'],
      });

      expect(result.primary).toBeDefined();
      expect(result.primary.disease).toBeDefined();
      expect(result.primary.score).toBeGreaterThan(0);
      expect(['tinggi', 'sedang', 'rendah']).toContain(result.primary.confidence);
    });

    it('should rank flu highest for flu symptoms', () => {
      const result = diagnose({
        age: 30,
        gender: 'male',
        selectedSymptoms: ['pilek', 'bersin', 'sakit_tenggorokan', 'batuk'],
      });

      expect(result.primary.disease.id).toBe('flu_biasa');
    });

    it('should return mustGoToHospital for severe diseases', () => {
      const result = diagnose({
        age: 30,
        gender: 'male',
        selectedSymptoms: ['nyeri_dada', 'sesak_napas', 'berkeringat', 'mual'],
      });

      expect(result.mustGoToHospital).toBe(true);
    });

    it('should return alternatives', () => {
      const result = diagnose({
        age: 30,
        gender: 'male',
        selectedSymptoms: ['pilek', 'bersin', 'batuk'],
      });

      expect(result.alternatives).toHaveLength(2);
    });
  });
});
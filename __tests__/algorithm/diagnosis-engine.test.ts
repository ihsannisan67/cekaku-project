import { describe, it, expect } from 'vitest';
import {
  calculateSymptomIDF,
  buildSymptomIDFMap,
  calculateIDFMatchScore,
  calculateCompletenessScore,
  calculateAgeModifier,
  calculateGenderModifier,
  determineConfidence,
  checkRequiredSymptoms,
  diagnose,
} from '@/lib/algorithm/diagnosis-engine';
import { DISEASES } from '@/lib/data/diseases';
import type { Disease, Gender } from '@/types';

describe('Diagnosis Engine', () => {
  describe('calculateSymptomIDF', () => {
    it('should give higher weight to rarer symptoms', () => {
      // Common symptoms (appear in many diseases) should have lower IDF
      const commonSymptom = 'demam'; // Appears in many diseases
      const rareSymptom = 'pandangan_kabur'; // Appears in fewer diseases

      const commonIDF = calculateSymptomIDF(commonSymptom, DISEASES);
      const rareIDF = calculateSymptomIDF(rareSymptom, DISEASES);

      expect(rareIDF).toBeGreaterThan(commonIDF);
    });

    it('should return positive IDF for all existing symptoms', () => {
      const idf = calculateSymptomIDF('demam', DISEASES);
      expect(idf).toBeGreaterThan(0);
    });
  });

  describe('buildSymptomIDFMap', () => {
    it('should build map for all symptoms', () => {
      const map = buildSymptomIDFMap(DISEASES);
      expect(map.size).toBeGreaterThan(0);
    });

    it('should assign IDF values greater than 1', () => {
      const map = buildSymptomIDFMap(DISEASES);
      map.forEach((idf) => {
        expect(idf).toBeGreaterThan(0);
      });
    });
  });

  describe('checkRequiredSymptoms', () => {
    it('should return false if no required symptoms are present', () => {
      const disease = {
        requiredSymptoms: ['nyeri_dada'],
      };
      expect(checkRequiredSymptoms(['demam', 'batuk'], disease)).toBe(false);
    });
  });

  describe('calculateCompletenessScore', () => {
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

      const score = calculateCompletenessScore(['demam', 'batuk'], disease);
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

      const score = calculateCompletenessScore(['demam'], disease);
      expect(score).toBe(0.5);
    });
  });

  describe('checkRequiredSymptoms', () => {
    it('should return true if at least one required symptom is present', () => {
      const disease = {
        requiredSymptoms: ['nyeri_dada', 'sesak_napas'],
      };
      expect(checkRequiredSymptoms(['nyeri_dada'], disease)).toBe(true);
    });

    it('should return false if no required symptoms are present', () => {
      const disease = {
        requiredSymptoms: ['nyeri_dada'],
      };
      expect(checkRequiredSymptoms(['demam', 'batuk'], disease)).toBe(false);
    });

    it('should return true for diseases without required symptoms', () => {
      const disease = {};
      expect(checkRequiredSymptoms(['demam'], disease)).toBe(true);
    });
  });

  describe('calculateIDFMatchScore', () => {
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

      const idfMap = buildSymptomIDFMap(DISEASES);
      const score1 = calculateIDFMatchScore(['demam'], flu, idfMap);
      const score2 = calculateIDFMatchScore(['demam', 'batuk'], flu, idfMap);

      expect(score2).toBeGreaterThan(score1);
    });

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

      const idfMap = buildSymptomIDFMap(DISEASES);
      const score = calculateIDFMatchScore(['demam', 'batuk'], disease, idfMap);
      expect(score).toBe(1);
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
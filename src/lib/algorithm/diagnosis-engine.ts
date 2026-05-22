'use client';

import type { DiagnosisInput, DiagnosisOutput, DiagnosisResult, Gender } from '@/types';
import { DISEASES } from '@/lib/data/diseases';
import { SEVERITY_THRESHOLDS, AGE_RISK_GROUPS } from '@/types';

/**
 * Diagnosa engine menggunakan Weighted Bayesian Scoring dengan IDF Scoring.
 *
 * Berdasarkan penelitian:
 * - PMC Entropy 2022 (symptom weighting - IDF)
 * - Frontiers in AI 2024 (coverage scoring)
 * - MDPI Computers 2024 (optimized classifiers)
 */

/**
 * Calculate IDF (Inverse Disease Frequency) score for a symptom.
 * Symptoms that appear in fewer diseases have higher diagnostic value.
 *
 * Formula: log((total_diseases + 1) / (diseases_with_symptom + 1)) + 1
 *
 * @param symptomId - ID of the symptom
 * @param diseases - All diseases in the knowledge base
 * @returns IDF score (higher = more diagnostic/rare)
 */
export function calculateSymptomIDF(symptomId: string, diseases: typeof DISEASES): number {
  const diseasesWithSymptom = diseases.filter(d =>
    d.symptoms.includes(symptomId)
  ).length;
  // IDF formula: rarer symptoms get higher weights
  // Common symptom (e.g., fever in 35 diseases) → ~1.0
  // Rare symptom (e.g., in 3 diseases) → ~2.5
  return Math.log((diseases.length + 1) / (diseasesWithSymptom + 1)) + 1;
}

/**
 * Build a map of symptom IDF scores for all symptoms.
 *
 * @param diseases - All diseases
 * @returns Map of symptom ID to IDF score
 */
export function buildSymptomIDFMap(diseases: typeof DISEASES): Map<string, number> {
  const idfMap = new Map<string, number>();
  for (const disease of diseases) {
    for (const symptomId of disease.symptoms) {
      if (!idfMap.has(symptomId)) {
        idfMap.set(symptomId, calculateSymptomIDF(symptomId, diseases));
      }
    }
  }
  return idfMap;
}

/**
 * Calculate completeness score - how many of the disease's symptoms the user has.
 * Diseases where user matches more symptoms are more relevant.
 *
 * @param selectedSymptoms - Array of symptom IDs selected by user
 * @param disease - Disease to score against
 * @returns Completeness score 0.0 - 1.0
 */
export function calculateCompletenessScore(
  selectedSymptoms: string[],
  disease: { symptoms: string[] }
): number {
  const matchedCount = selectedSymptoms.filter(s =>
    disease.symptoms.includes(s)
  ).length;
  if (disease.symptoms.length === 0) return 0;
  return matchedCount / disease.symptoms.length;
}

/**
 * Calculate IDF match score between selected symptoms and a disease.
 * Uses IDF-weighted symptom scoring where rarer symptoms contribute more.
 *
 * @param selectedSymptoms - Array of symptom IDs selected by user
 * @param disease - Disease to score against
 * @param symptomIDFMap - Pre-computed symptom IDF scores
 * @returns IDF match score (0.0 - 1.0 normalized)
 */
export function calculateIDFMatchScore(
  selectedSymptoms: string[],
  disease: { symptoms: string[] },
  symptomIDFMap: Map<string, number>
): number {
  // Sum IDF scores for matched symptoms
  const idfMatchScore = selectedSymptoms
    .filter(s => disease.symptoms.includes(s))
    .reduce((sum, s) => sum + (symptomIDFMap.get(s) || 0), 0);

  // Calculate max possible IDF score for this disease
  const maxPossibleScore = disease.symptoms.reduce((sum, s) => {
    return sum + (symptomIDFMap.get(s) || 0);
  }, 0);

  if (maxPossibleScore === 0) return 0;
  return idfMatchScore / maxPossibleScore;
}

/**
 * Check if user has ANY required symptom - soft gate.
 * Required symptoms make a diagnosis more likely but don't hard-block.
 *
 * @param selectedSymptoms - Array of symptom IDs selected by user
 * @param disease - Disease to check
 * @returns true if at least one required symptom is present
 */
export function checkRequiredSymptoms(
  selectedSymptoms: string[],
  disease: { requiredSymptoms?: string[] }
): boolean {
  if (!disease.requiredSymptoms || disease.requiredSymptoms.length === 0) {
    return true;
  }
  return disease.requiredSymptoms.some(s => selectedSymptoms.includes(s));
}

/**
 * Calculate age modifier based on whether the patient's age
 * is within the disease's typical age range.
 *
 * @param age - Patient age
 * @param disease - Disease to check
 * @returns Multiplier (0.7 if outside range, 1.0 if within)
 */
export function calculateAgeModifier(age: number, disease: { ageRange?: [number, number] }): number {
  if (!disease.ageRange) return 1.0;
  const [minAge, maxAge] = disease.ageRange;
  if (age < minAge || age > maxAge) return 0.7;
  return 1.0;
}

/**
 * Calculate gender modifier based on gender-specific diseases.
 *
 * @param gender - Patient gender
 * @param disease - Disease to check
 * @returns Multiplier (0 if gender doesn't match, 1.0 if neutral/matches)
 */
export function calculateGenderModifier(
  gender: Gender,
  disease: { genderSpecific?: Gender }
): number {
  if (!disease.genderSpecific) return 1.0;
  if (disease.genderSpecific === gender) return 1.0;
  return 0;
}

/**
 * Determine confidence level based on score.
 *
 * @param score - The final score
 * @returns Confidence level string
 */
export function determineConfidence(score: number): 'tinggi' | 'sedang' | 'rendah' {
  if (score >= SEVERITY_THRESHOLDS.TINGGI) return 'tinggi';
  if (score >= SEVERITY_THRESHOLDS.SEDANG) return 'sedang';
  return 'rendah';
}

/**
 * Count how many required symptoms are met by selected symptoms.
 *
 * @param selectedSymptoms - Array of symptom IDs selected by user
 * @param disease - Disease to check
 * @returns Number of required symptoms met
 */
function countMetRequiredSymptoms(
  selectedSymptoms: string[],
  disease: { requiredSymptoms?: string[] }
): number {
  if (!disease.requiredSymptoms || disease.requiredSymptoms.length === 0) {
    return 0;
  }
  return disease.requiredSymptoms.filter(s => selectedSymptoms.includes(s)).length;
}

/**
 * Extended result type for internal sorting with tie-breaker data
 */
interface ScoredDisease extends DiagnosisResult {
  metRequiredCount: number;
  symptomCount: number;
}

/**
 * Main diagnosis function using Weighted Bayesian Scoring with IDF.
 *
 * @param input - Patient input (age, gender, selected symptoms)
 * @returns Complete diagnosis output with primary disease and alternatives
 */
export function diagnose(input: DiagnosisInput): DiagnosisOutput {
  const { age, gender, selectedSymptoms } = input;

  // Validate input
  if (!selectedSymptoms || selectedSymptoms.length === 0) {
    throw new Error('Minimal satu gejala harus dipilih');
  }

  // Build symptom IDF map once
  const symptomIDFMap = buildSymptomIDFMap(DISEASES);

  // Score all diseases
  const results: ScoredDisease[] = DISEASES.map(disease => {
    // HARD GATE: Check required symptoms - must have at least one
    if (!checkRequiredSymptoms(selectedSymptoms, disease)) {
      return null;
    }

    // Calculate IDF match score
    const idfMatchScore = calculateIDFMatchScore(selectedSymptoms, disease, symptomIDFMap);

    // Calculate completeness score
    const completenessScore = calculateCompletenessScore(selectedSymptoms, disease);

    // Calculate modifiers
    const ageModifier = calculateAgeModifier(age, disease);
    const genderModifier = calculateGenderModifier(gender, disease);

    // Final score: IDF match weighted 70%, completeness 30%
    const rawScore = (idfMatchScore * 0.7) + (completenessScore * 0.3);

    // Final score with modifiers
    const finalScore = rawScore * ageModifier * genderModifier;

    // Find matched symptoms
    const matchedSymptoms = selectedSymptoms.filter(s =>
      disease.symptoms.includes(s)
    );

    // Count met required symptoms for tie-breaking
    const metRequiredCount = countMetRequiredSymptoms(selectedSymptoms, disease);

    return {
      disease,
      score: finalScore,
      confidence: determineConfidence(finalScore),
      matchedSymptoms,
      metRequiredCount,
      symptomCount: disease.symptoms.length,
    };
  }).filter((r): r is ScoredDisease => r !== null);

  // Sort by score descending, with tie-breaking
  results.sort((a, b) => {
    // Primary: sort by score
    const scoreDiff = b.score - a.score;
    if (Math.abs(scoreDiff) > 0.001) return scoreDiff;

    // Tie-breaker 1: More required symptoms met wins
    const requiredDiff = b.metRequiredCount - a.metRequiredCount;
    if (requiredDiff !== 0) return requiredDiff;

    // Tie-breaker 2: Fewer symptoms (more specific) wins
    return a.symptomCount - b.symptomCount;
  });

  // Get top results
  const topResults = results.slice(0, 3);

  if (topResults.length === 0) {
    throw new Error('Tidak ada penyakit yang cocok dengan gejala yang dipilih');
  }

  const primary = topResults[0];
  const alternatives = topResults.slice(1, 3);

  // Determine if hospital is needed
  const mustGoToHospital = determineMustGoToHospital(primary, age);

  // Generate disclaimer
  const disclaimer = generateDisclaimer(primary, mustGoToHospital);

  return {
    primary,
    alternatives,
    mustGoToHospital,
    disclaimer,
  };
}

/**
 * Determine if patient must go to hospital based on severity and age.
 *
 * @param result - Primary diagnosis result
 * @param age - Patient age
 * @returns Boolean indicating if hospital is required
 */
function determineMustGoToHospital(result: DiagnosisResult, age: number): boolean {
  const { disease } = result;

  // All severe diseases require hospital
  if (disease.severity === 'parah') return true;

  // Very elderly or very young patients need hospital for moderate diseases
  if (disease.severity === 'sedang') {
    if (age < AGE_RISK_GROUPS.CHILD_MAX || age >= AGE_RISK_GROUPS.ELDERLY_MIN) {
      return true;
    }
  }

  // Low confidence results for severe diseases need hospital
  if (result.confidence === 'rendah' && disease.severity !== 'ringan') {
    return true;
  }

  return false;
}

/**
 * Generate appropriate medical disclaimer.
 *
 * @param result - Primary diagnosis result
 * @param mustGoToHospital - Whether hospital is required
 * @returns Disclaimer text
 */
function generateDisclaimer(result: DiagnosisResult, mustGoToHospital: boolean): string {
  const diseaseName = result.disease.name;

  if (mustGoToHospital) {
    return `Hasil diagnosa menunjukkan kemungkinan ${diseaseName}. SEGERA KE RUMAH SAKIT untuk pemeriksaan lebih lanjut. Kondisi ini memerlukan penanganan medis segera. Hasil ini BUKAN pengganti diagnosis dokter dan bersifat SEBAGAI INFORMASI AWAL.`;
  }

  if (result.confidence === 'rendah') {
    return `Hasil diagnosa untuk ${diseaseName} memiliki tingkat keyakinan rendah. Disarankan untuk berkonsultasi dengan dokter untuk konfirmasi lebih lanjut. Hasil ini BUKAN pengganti diagnosis dokter.`;
  }

  return `Hasil diagnosa menunjukkan kemungkinan ${diseaseName} dengan tingkat keyakinan ${result.confidence}. Pengobatan mandiri dapat dilakukan dengan perhatian pada gejala. Jika kondisi memburuk, SEGERA ke dokter. Hasil ini BUKAN pengganti diagnosis dokter.`;
}
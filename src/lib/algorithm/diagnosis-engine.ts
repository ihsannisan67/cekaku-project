import type { Disease, DiagnosisInput, DiagnosisOutput, DiagnosisResult, Gender, SeverityLevel } from '@/types';
import { DISEASES } from '@/lib/data/diseases';
import { ALL_SYMPTOM_IDS } from '@/lib/data/symptoms';
import { SEVERITY_THRESHOLDS, AGE_RISK_GROUPS } from '@/types';

/**
 * Diagnosa engine menggunakan Weighted Bayesian Scoring.
 *
 * Berdasarkan penelitian:
 * - PMC Entropy 2022 (symptom weighting)
 * - Frontiers in AI 2024 (coverage scoring)
 * - MDPI Computers 2024 (optimized classifiers)
 */

/**
 * Calculate symptom weight based on how rare it is across diseases.
 * Symptoms that appear in fewer diseases have higher diagnostic value.
 *
 * @param symptomId - ID of the symptom
 * @param diseases - All diseases in the knowledge base
 * @returns Weight between 0 and 1 (higher = more diagnostic)
 */
export function calculateSymptomWeight(symptomId: string, diseases: Disease[]): number {
  const diseasesWithSymptom = diseases.filter(d => d.symptoms.includes(symptomId)).length;
  if (diseasesWithSymptom === 0) return 0;
  // Inverse frequency: rarer symptoms = higher weight
  return 1 / diseasesWithSymptom;
}

/**
 * Build a map of symptom weights for all symptoms.
 *
 * @param diseases - All diseases
 * @returns Map of symptom ID to weight
 */
export function buildSymptomWeightMap(diseases: Disease[]): Map<string, number> {
  const weightMap = new Map<string, number>();
  for (const symptomId of ALL_SYMPTOM_IDS) {
    weightMap.set(symptomId, calculateSymptomWeight(symptomId, diseases));
  }
  return weightMap;
}

/**
 * Calculate match score between selected symptoms and a disease.
 * Uses weighted symptom scoring where rarer symptoms contribute more.
 *
 * @param selectedSymptoms - Array of symptom IDs selected by user
 * @param disease - Disease to score against
 * @param symptomWeightMap - Pre-computed symptom weights
 * @returns Match score 0.0 - 1.0
 */
export function calculateMatchScore(
  selectedSymptoms: string[],
  disease: Disease,
  symptomWeightMap: Map<string, number>
): number {
  // Check required symptoms
  if (disease.requiredSymptoms) {
    const hasAllRequired = disease.requiredSymptoms.every(rs =>
      selectedSymptoms.includes(rs)
    );
    if (!hasAllRequired) return 0;
  }

  // Calculate weighted match
  let matchScore = 0;
  for (const symptom of selectedSymptoms) {
    if (disease.symptoms.includes(symptom)) {
      matchScore += symptomWeightMap.get(symptom) || 0;
    }
  }

  // Normalize by max possible score
  const maxPossibleScore = disease.symptoms.reduce((max, s) => {
    return max + (symptomWeightMap.get(s) || 0);
  }, 0);

  if (maxPossibleScore === 0) return 0;
  return Math.min(matchScore / maxPossibleScore, 1);
}

/**
 * Calculate coverage score - how many of the disease's symptoms the user has.
 *
 * @param selectedSymptoms - Array of symptom IDs selected by user
 * @param disease - Disease to score against
 * @returns Coverage score 0.0 - 1.0
 */
export function calculateCoverageScore(
  selectedSymptoms: string[],
  disease: Disease
): number {
  const matchedCount = selectedSymptoms.filter(s =>
    disease.symptoms.includes(s)
  ).length;
  return matchedCount / disease.symptoms.length;
}

/**
 * Calculate age modifier based on whether the patient's age
 * is within the disease's typical age range.
 *
 * @param age - Patient age
 * @param disease - Disease to check
 * @returns Multiplier (0.7 if outside range, 1.0 if within)
 */
export function calculateAgeModifier(age: number, disease: Disease): number {
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
export function calculateGenderModifier(gender: Gender, disease: Disease): number {
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
 * Main diagnosis function using Weighted Bayesian Scoring.
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

  // Build symptom weight map once
  const symptomWeightMap = buildSymptomWeightMap(DISEASES);

  // Score all diseases
  const results: DiagnosisResult[] = DISEASES.map(disease => {
    // Calculate match score
    const matchScore = calculateMatchScore(selectedSymptoms, disease, symptomWeightMap);

    // Calculate coverage score
    const coverageScore = calculateCoverageScore(selectedSymptoms, disease);

    // Calculate modifiers
    const ageModifier = calculateAgeModifier(age, disease);
    const genderModifier = calculateGenderModifier(gender, disease);

    // Combined score (match weighted 60%, coverage 40%)
    const rawScore = (matchScore * 0.6) + (coverageScore * 0.4);

    // Final score with modifiers
    const finalScore = rawScore * ageModifier * genderModifier;

    // Find matched symptoms
    const matchedSymptoms = selectedSymptoms.filter(s =>
      disease.symptoms.includes(s)
    );

    return {
      disease,
      score: finalScore,
      confidence: determineConfidence(finalScore),
      matchedSymptoms,
    };
  }).filter(r => r.score > 0);

  // Sort by score descending
  results.sort((a, b) => b.score - a.score);

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

/**
 * Calculate severity adjustment based on age risk groups.
 *
 * @param severity - Base severity level
 * @param age - Patient age
 * @returns Adjusted severity level
 */
export function calculateAdjustedSeverity(severity: SeverityLevel, age: number): SeverityLevel {
  // Children under 12 and elderly over 60 have elevated risk
  if (severity === 'ringan' && (age < AGE_RISK_GROUPS.CHILD_MAX || age >= AGE_RISK_GROUPS.ELDERLY_MIN)) {
    return 'sedang';
  }
  return severity;
}
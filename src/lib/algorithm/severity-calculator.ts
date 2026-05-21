import type { SeverityLevel } from '@/types';
import { AGE_RISK_GROUPS } from '@/types';

/**
 * Severity calculator for determining appropriate medical response.
 * Adjusts severity based on age risk groups and other factors.
 */

/**
 * Map severity level to numeric score for sorting.
 *
 * @param severity - Severity level
 * @returns Numeric score (1-3)
 */
export function severityToNumber(severity: SeverityLevel): number {
  switch (severity) {
    case 'ringan': return 1;
    case 'sedang': return 2;
    case 'parah': return 3;
    default: return 1;
  }
}

/**
 * Determine if a disease requires hospital visit based on severity and patient age.
 *
 * @param severity - Disease severity level
 * @param age - Patient age
 * @param confidence - Diagnosis confidence level
 * @returns Boolean indicating if hospital is required
 */
export function mustGoToHospital(
  severity: SeverityLevel,
  age: number,
  confidence: 'tinggi' | 'sedang' | 'rendah'
): boolean {
  // Parah always requires hospital
  if (severity === 'parah') return true;

  // Sedang requires hospital for high-risk age groups
  if (severity === 'sedang') {
    if (age < AGE_RISK_GROUPS.CHILD_MAX || age >= AGE_RISK_GROUPS.ELDERLY_MIN) {
      return true;
    }
  }

  // Ringan but low confidence still needs medical attention
  if (severity === 'ringan' && confidence === 'rendah') {
    if (age < AGE_RISK_GROUPS.CHILD_MAX || age >= AGE_RISK_GROUPS.ELDERLY_MIN) {
      return true;
    }
  }

  return false;
}

/**
 * Adjust severity level based on patient age.
 * Children and elderly have elevated risk.
 *
 * @param severity - Base severity level
 * @param age - Patient age
 * @returns Adjusted severity level
 */
export function adjustSeverityByAge(severity: SeverityLevel, age: number): SeverityLevel {
  // High-risk age groups get severity bump
  if (age < AGE_RISK_GROUPS.CHILD_MAX || age >= AGE_RISK_GROUPS.ELDERLY_MIN) {
    switch (severity) {
      case 'ringan':
        return 'sedang';
      case 'sedang':
        return 'parah';
      case 'parah':
        return 'parah';
    }
  }
  return severity;
}

/**
 * Get severity badge color class.
 *
 * @param severity - Severity level
 * @returns Tailwind CSS color class
 */
export function getSeverityColor(severity: SeverityLevel): string {
  switch (severity) {
    case 'ringan':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'sedang':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'parah':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

/**
 * Get severity icon name from lucide-react.
 *
 * @param severity - Severity level
 * @returns Icon name
 */
export function getSeverityIcon(severity: SeverityLevel): string {
  switch (severity) {
    case 'ringan':
      return 'CheckCircle';
    case 'sedang':
      return 'AlertTriangle';
    case 'parah':
      return 'AlertCircle';
    default:
      return 'Info';
  }
}

/**
 * Get severity label text in Bahasa Indonesia.
 *
 * @param severity - Severity level
 * @returns Indonesian label
 */
export function getSeverityLabel(severity: SeverityLevel): string {
  switch (severity) {
    case 'ringan':
      return 'Ringan';
    case 'sedang':
      return 'Sedang';
    case 'parah':
      return 'Parah';
    default:
      return 'Tidak Diketahui';
  }
}
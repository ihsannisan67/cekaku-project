import { describe, it, expect } from 'vitest';
import {
  severityToNumber,
  mustGoToHospital,
  adjustSeverityByAge,
  getSeverityColor,
  getSeverityIcon,
  getSeverityLabel,
} from '@/lib/algorithm/severity-calculator';

describe('Severity Calculator', () => {
  describe('severityToNumber', () => {
    it('should convert ringan to 1', () => {
      expect(severityToNumber('ringan')).toBe(1);
    });

    it('should convert sedang to 2', () => {
      expect(severityToNumber('sedang')).toBe(2);
    });

    it('should convert parah to 3', () => {
      expect(severityToNumber('parah')).toBe(3);
    });
  });

  describe('mustGoToHospital', () => {
    it('should return true for parah severity', () => {
      expect(mustGoToHospital('parah', 30, 'tinggi')).toBe(true);
    });

    it('should return true for sedang with young patients', () => {
      expect(mustGoToHospital('sedang', 5, 'tinggi')).toBe(true);
    });

    it('should return true for sedang with elderly patients', () => {
      expect(mustGoToHospital('sedang', 65, 'tinggi')).toBe(true);
    });

    it('should return false for sedang with adult patients', () => {
      expect(mustGoToHospital('sedang', 30, 'tinggi')).toBe(false);
    });
  });

  describe('adjustSeverityByAge', () => {
    it('should bump ringan to sedang for children', () => {
      expect(adjustSeverityByAge('ringan', 5)).toBe('sedang');
    });

    it('should bump ringan to sedang for elderly', () => {
      expect(adjustSeverityByAge('ringan', 65)).toBe('sedang');
    });

    it('should bump sedang to parah for children', () => {
      expect(adjustSeverityByAge('sedang', 5)).toBe('parah');
    });

    it('should keep severity for adults', () => {
      expect(adjustSeverityByAge('ringan', 30)).toBe('ringan');
      expect(adjustSeverityByAge('sedang', 30)).toBe('sedang');
    });
  });

  describe('getSeverityColor', () => {
    it('should return green color for ringan', () => {
      expect(getSeverityColor('ringan')).toContain('green');
    });

    it('should return yellow color for sedang', () => {
      expect(getSeverityColor('sedang')).toContain('yellow');
    });

    it('should return red color for parah', () => {
      expect(getSeverityColor('parah')).toContain('red');
    });
  });

  describe('getSeverityIcon', () => {
    it('should return CheckCircle for ringan', () => {
      expect(getSeverityIcon('ringan')).toBe('CheckCircle');
    });

    it('should return AlertTriangle for sedang', () => {
      expect(getSeverityIcon('sedang')).toBe('AlertTriangle');
    });

    it('should return AlertCircle for parah', () => {
      expect(getSeverityIcon('parah')).toBe('AlertCircle');
    });
  });

  describe('getSeverityLabel', () => {
    it('should return correct Indonesian labels', () => {
      expect(getSeverityLabel('ringan')).toBe('Ringan');
      expect(getSeverityLabel('sedang')).toBe('Sedang');
      expect(getSeverityLabel('parah')).toBe('Parah');
    });
  });
});
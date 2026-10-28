import { describe, it, expect, beforeEach } from 'vitest';
import { saveWeightEntry, loadProgress, calculateWeightChange, resetProgress } from '../utils/storage';
import { calculateSvgPoints } from './WeightTracker';

describe('Weight Tracking & SVG Chart Logic', () => {
  beforeEach(() => {
    resetProgress();
  });

  it('should save weight entry and update progress', () => {
    const updated = saveWeightEntry(78.5, '2026-10-20');
    expect(updated.weightHistory.length).toBe(1);
    expect(updated.weightHistory[0].weightKg).toBe(78.5);

    const reloaded = loadProgress();
    expect(reloaded.weightHistory[0].weightKg).toBe(78.5);
  });

  it('should update entry if same date is logged', () => {
    saveWeightEntry(78.5, '2026-10-20');
    const updated = saveWeightEntry(78.0, '2026-10-20');
    expect(updated.weightHistory.length).toBe(1);
    expect(updated.weightHistory[0].weightKg).toBe(78.0);
  });

  it('should calculate weight change delta accurately', () => {
    const history = [
      { date: '2026-10-01', weightKg: 82.0 },
      { date: '2026-10-15', weightKg: 80.5 }
    ];
    const change = calculateWeightChange(history);
    expect(change).toBe(-1.5);
  });

  it('should generate SVG polyline points within view boundaries', () => {
    const history = [
      { date: '2026-10-01', weightKg: 80.0 },
      { date: '2026-10-05', weightKg: 79.0 },
      { date: '2026-10-10', weightKg: 78.5 }
    ];
    const points = calculateSvgPoints(history, 200, 80);
    expect(points.length).toBe(3);
    for (const pt of points) {
      expect(pt.x).toBeGreaterThanOrEqual(0);
      expect(pt.x).toBeLessThanOrEqual(200);
      expect(pt.y).toBeGreaterThanOrEqual(0);
      expect(pt.y).toBeLessThanOrEqual(80);
    }
  });
});

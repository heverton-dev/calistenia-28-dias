import { describe, it, expect } from 'vitest';
import { EXERCISES } from '../data/exercises';

describe('3D Consistent Exercise Media Validation', () => {
  it('should have videoUrl and posterUrl defined for all canonical exercises', () => {
    expect(EXERCISES.length).toBeGreaterThanOrEqual(12);

    EXERCISES.forEach(ex => {
      expect(ex.videoUrl).toBeDefined();
      expect(ex.posterUrl).toBeDefined();
      expect(ex.videoUrl).toMatch(/\.(webm|mp4)$/);
      expect(ex.posterUrl).toMatch(/\.(jpg|png|webp)$/);
    });
  });

  it('should verify all canonical exercises have correct relative media paths', () => {
    EXERCISES.forEach(ex => {
      expect(ex.videoUrl).toBe(`/exercises/${ex.id}.webm`);
      expect(ex.posterUrl).toBe(`/exercises/${ex.id}-poster.jpg`);
    });
  });
});

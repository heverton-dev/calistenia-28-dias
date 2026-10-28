import { describe, it, expect } from 'vitest';
import { EXERCISES } from '../data/exercises';
import fs from 'fs';
import path from 'path';

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

  it('should have physical files existing in public/exercises/ directory for every exercise', () => {
    const publicExercisesDir = path.resolve(process.cwd(), 'public/exercises');
    expect(fs.existsSync(publicExercisesDir)).toBe(true);

    EXERCISES.forEach(ex => {
      const webmFile = path.resolve(publicExercisesDir, `${ex.id}.webm`);
      const mp4File = path.resolve(publicExercisesDir, `${ex.id}.mp4`);
      const gifFile = path.resolve(publicExercisesDir, `${ex.id}.gif`);
      const posterFile = path.resolve(publicExercisesDir, `${ex.id}-poster.jpg`);

      expect(fs.existsSync(webmFile), `Missing ${ex.id}.webm`).toBe(true);
      expect(fs.existsSync(mp4File), `Missing ${ex.id}.mp4`).toBe(true);
      expect(fs.existsSync(gifFile), `Missing ${ex.id}.gif`).toBe(true);
      expect(fs.existsSync(posterFile), `Missing ${ex.id}-poster.jpg`).toBe(true);

      // Garante tamanho leve (< 1.2MB por arquivo para carregamento móvel instantâneo)
      const webmSize = fs.statSync(webmFile).size;
      const mp4Size = fs.statSync(mp4File).size;
      expect(webmSize).toBeLessThan(1.2 * 1024 * 1024);
      expect(mp4Size).toBeLessThan(1.2 * 1024 * 1024);
    });
  });
});

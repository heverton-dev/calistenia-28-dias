import { describe, it, expect } from 'vitest';
import { getAlternativeExercises } from '../data/exercises';
import { replaceWorkoutItem } from '../utils/challengeUtils';
import { WorkoutItem } from '../types/workout';

describe('Exercise Replacement & Alternatives (Mobbin Pattern)', () => {
  it('should find compatible alternatives sharing primary muscle group', () => {
    // Para 'push-up' (peitoral/tríceps), deve sugerir 'diamond-push-up' ou 'burpee'
    const alts = getAlternativeExercises('push-up');
    expect(alts.length).toBeGreaterThan(0);
    expect(alts.some(ex => ex.id === 'push-up')).toBe(false);
    expect(alts.some(ex => ex.primaryMuscles.includes('chest') || ex.primaryMuscles.includes('triceps'))).toBe(true);
  });

  it('should find leg alternatives for squat', () => {
    const alts = getAlternativeExercises('bodyweight-squat');
    expect(alts.length).toBeGreaterThan(0);
    expect(alts.some(ex => ex.id === 'lunges')).toBe(true);
  });

  it('should swap exercise item while preserving duration and rest times', () => {
    const items: WorkoutItem[] = [
      { exerciseId: 'push-up', durationSeconds: 30, restSeconds: 15 },
      { exerciseId: 'plank', durationSeconds: 40, restSeconds: 20 }
    ];

    const updated = replaceWorkoutItem(items, 0, 'diamond-push-up');
    expect(updated[0].exerciseId).toBe('diamond-push-up');
    expect(updated[0].durationSeconds).toBe(30);
    expect(updated[0].restSeconds).toBe(15);
    expect(updated[1].exerciseId).toBe('plank');
  });
});

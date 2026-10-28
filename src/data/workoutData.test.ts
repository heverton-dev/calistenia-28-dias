import { describe, it, expect } from 'vitest';
import { EXERCISES, getExerciseById } from './exercises';
import { CHALLENGE_28_DAYS } from './challenge28';

describe('Workout Data & Challenge 28 Structure', () => {
  it('should have a rich catalog of calisthenics exercises with required fields', () => {
    expect(EXERCISES.length).toBeGreaterThanOrEqual(10);

    for (const ex of EXERCISES) {
      expect(ex.id).toBeDefined();
      expect(ex.name).toBeDefined();
      expect(ex.primaryMuscles.length).toBeGreaterThan(0);
      expect(ex.description.length).toBeGreaterThan(10);
      expect(ex.tips.length).toBeGreaterThan(0);
      expect(ex.animationType).toBeDefined();
    }
  });

  it('should retrieve exercise by id', () => {
    const pushup = getExerciseById('push-up');
    expect(pushup).toBeDefined();
    expect(pushup?.name).toBe('Flexão Tradicional');
    expect(pushup?.primaryMuscles).toContain('chest');
  });

  it('should have exactly 28 days in the challenge', () => {
    expect(CHALLENGE_28_DAYS.length).toBe(28);

    CHALLENGE_28_DAYS.forEach((day, index) => {
      expect(day.dayNumber).toBe(index + 1);
      expect(day.title).toBeDefined();
      expect(day.focus).toBeDefined();

      if (!day.isRestDay) {
        expect(day.items.length).toBeGreaterThanOrEqual(3);
        // todos os exercícios do treino devem existir no catálogo
        for (const item of day.items) {
          const found = getExerciseById(item.exerciseId);
          expect(found, `Exercise ${item.exerciseId} on day ${day.dayNumber} must exist`).toBeDefined();
          expect(item.durationSeconds).toBeGreaterThan(0);
          expect(item.restSeconds).toBeGreaterThanOrEqual(5);
        }
      } else {
        expect(day.items.length).toBe(0);
      }
    });
  });

  it('should have well-balanced rest days', () => {
    const restDays = CHALLENGE_28_DAYS.filter(d => d.isRestDay);
    expect(restDays.length).toBeGreaterThanOrEqual(4); // pelo menos 1 dia de descanso por semana
  });
});

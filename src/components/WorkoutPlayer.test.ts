import { describe, it, expect } from 'vitest';
import { getNextStep, calculateWorkoutProgress } from './playerEngine';
import { WorkoutItem } from '../types/workout';

describe('Workout Player Engine Logic', () => {
  const mockItems: WorkoutItem[] = [
    { exerciseId: 'push-up', durationSeconds: 30, restSeconds: 15 },
    { exerciseId: 'plank', durationSeconds: 20, restSeconds: 10 }
  ];

  it('should transition from active to rest on the current exercise', () => {
    const next = getNextStep('active', 0, mockItems);
    expect(next.state).toBe('rest');
    expect(next.currentIndex).toBe(0);
    expect(next.duration).toBe(15);
  });

  it('should transition from rest to active on the next exercise', () => {
    const next = getNextStep('rest', 0, mockItems);
    expect(next.state).toBe('active');
    expect(next.currentIndex).toBe(1);
    expect(next.duration).toBe(20);
  });

  it('should transition to completed after the last rest or last exercise', () => {
    // Quando terminar o último exercício (índice 1)
    const next = getNextStep('active', 1, mockItems);
    expect(next.state).toBe('completed');
  });

  it('should calculate workout progress percentage accurately', () => {
    // Início (exercício 0 de 2): 0%
    expect(calculateWorkoutProgress(0, 'prepare', mockItems.length)).toBe(0);
    // Metade (exercício 1 de 2 em progresso): 50%
    expect(calculateWorkoutProgress(1, 'active', mockItems.length)).toBe(50);
    // Concluído: 100%
    expect(calculateWorkoutProgress(2, 'completed', mockItems.length)).toBe(100);
  });
});

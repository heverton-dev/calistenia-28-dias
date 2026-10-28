import { WorkoutItem } from '../types/workout';

export type PlayerState = 'prepare' | 'active' | 'rest' | 'completed';

export interface NextStepResult {
  state: PlayerState;
  currentIndex: number;
  duration: number;
}

export function getNextStep(
  currentState: PlayerState,
  currentIndex: number,
  items: WorkoutItem[]
): NextStepResult {
  if (currentState === 'prepare') {
    return {
      state: 'active',
      currentIndex,
      duration: items[currentIndex]?.durationSeconds || 30
    };
  }

  if (currentState === 'active') {
    // Se for o último exercício, não tem descanso, vai direto para concluído
    const isLast = currentIndex >= items.length - 1;
    if (isLast) {
      return {
        state: 'completed',
        currentIndex,
        duration: 0
      };
    }

    return {
      state: 'rest',
      currentIndex,
      duration: items[currentIndex]?.restSeconds || 15
    };
  }

  if (currentState === 'rest') {
    const nextIdx = currentIndex + 1;
    if (nextIdx >= items.length) {
      return {
        state: 'completed',
        currentIndex,
        duration: 0
      };
    }

    return {
      state: 'active',
      currentIndex: nextIdx,
      duration: items[nextIdx]?.durationSeconds || 30
    };
  }

  return {
    state: 'completed',
    currentIndex,
    duration: 0
  };
}

export function calculateWorkoutProgress(
  currentIndex: number,
  state: PlayerState,
  totalItems: number
): number {
  if (totalItems <= 0) return 100;
  if (state === 'completed') return 100;
  if (state === 'prepare') return 0;

  const completedCount = currentIndex;
  return Math.round((completedCount / totalItems) * 100);
}

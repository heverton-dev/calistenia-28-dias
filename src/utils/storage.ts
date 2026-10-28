import { UserProgress } from '../types/workout';

const STORAGE_KEY = 'calistenia_28_progress_v1';

export const DEFAULT_PROGRESS: UserProgress = {
  completedDays: [],
  currentStreak: 0,
  bestStreak: 0,
  totalWorkoutsCompleted: 0
};

// In-memory fallback para Node/testes ou navegadores com cookies bloqueados
const memoryStorage = new Map<string, string>();

function getStorageItem(key: string): string | null {
  try {
    if (typeof localStorage !== 'undefined' && localStorage.getItem) {
      return localStorage.getItem(key);
    }
  } catch {
    // fallback
  }
  return memoryStorage.get(key) || null;
}

function setStorageItem(key: string, value: string): void {
  try {
    if (typeof localStorage !== 'undefined' && localStorage.setItem) {
      localStorage.setItem(key, value);
      return;
    }
  } catch {
    // fallback
  }
  memoryStorage.set(key, value);
}

function removeStorageItem(key: string): void {
  try {
    if (typeof localStorage !== 'undefined' && localStorage.removeItem) {
      localStorage.removeItem(key);
      return;
    }
  } catch {
    // fallback
  }
  memoryStorage.delete(key);
}

export function loadProgress(): UserProgress {
  try {
    const raw = getStorageItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PROGRESS };
    return { ...DEFAULT_PROGRESS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_PROGRESS };
  }
}

export function calculateStreak(lastCompletedDate?: string, currentStreak: number = 0): number {
  if (!lastCompletedDate) return 1;

  const today = new Date().toISOString().split('T')[0];
  if (lastCompletedDate === today) {
    return currentStreak > 0 ? currentStreak : 1;
  }

  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterday = yesterdayDate.toISOString().split('T')[0];

  if (lastCompletedDate === yesterday) {
    return currentStreak + 1;
  }

  // Passou mais de 1 dia, reseta para 1
  return 1;
}

export function saveCompletedDay(dayNumber: number): UserProgress {
  const current = loadProgress();
  const today = new Date().toISOString().split('T')[0];

  const alreadyDone = current.completedDays.includes(dayNumber);
  const newCompletedDays = alreadyDone
    ? current.completedDays
    : [...current.completedDays, dayNumber].sort((a, b) => a - b);

  let newStreak = current.currentStreak;
  if (!alreadyDone) {
    newStreak = calculateStreak(current.lastCompletedDate, current.currentStreak);
  }

  const updated: UserProgress = {
    completedDays: newCompletedDays,
    currentStreak: newStreak,
    bestStreak: Math.max(newStreak, current.bestStreak),
    totalWorkoutsCompleted: alreadyDone ? current.totalWorkoutsCompleted : current.totalWorkoutsCompleted + 1,
    lastCompletedDate: today
  };

  try {
    setStorageItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Fallback silencioso se cota excedida
  }

  return updated;
}

export function resetProgress(): void {
  try {
    removeStorageItem(STORAGE_KEY);
  } catch {
    // Ignora
  }
}

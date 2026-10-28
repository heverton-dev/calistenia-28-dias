import { UserProgress, WeightEntry, AppSettings, WorkoutItem } from '../types/workout';

const STORAGE_KEY = 'calistenia_28_progress_v1';

export const DEFAULT_SETTINGS: AppSettings = {
  soundEnabled: true,
  prepTimeSeconds: 5,
  restTimeMultiplier: 1.0,
  vibrateEnabled: true
};

export const DEFAULT_PROGRESS: UserProgress = {
  completedDays: [],
  currentStreak: 0,
  bestStreak: 0,
  totalWorkoutsCompleted: 0,
  weightHistory: [],
  settings: DEFAULT_SETTINGS,
  customizedItems: {}
};

// In-memory fallback para Node/testes
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
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      settings: { ...DEFAULT_SETTINGS, ...(parsed.settings || {}) },
      weightHistory: parsed.weightHistory || [],
      customizedItems: parsed.customizedItems || {}
    };
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
    ...current,
    completedDays: newCompletedDays,
    currentStreak: newStreak,
    bestStreak: Math.max(newStreak, current.bestStreak),
    totalWorkoutsCompleted: alreadyDone ? current.totalWorkoutsCompleted : current.totalWorkoutsCompleted + 1,
    lastCompletedDate: today
  };

  try {
    setStorageItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Fallback
  }

  return updated;
}

export function saveWeightEntry(weightKg: number, dateStr?: string): UserProgress {
  const current = loadProgress();
  const date = dateStr || new Date().toISOString().split('T')[0];

  const existingIndex = current.weightHistory.findIndex(entry => entry.date === date);
  const newHistory = [...current.weightHistory];

  if (existingIndex >= 0) {
    newHistory[existingIndex] = { date, weightKg };
  } else {
    newHistory.push({ date, weightKg });
  }

  // Ordena por data
  newHistory.sort((a, b) => a.date.localeCompare(b.date));

  const updated: UserProgress = {
    ...current,
    userWeightKg: weightKg,
    weightHistory: newHistory
  };

  try {
    setStorageItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Fallback
  }

  return updated;
}

export function calculateWeightChange(history: WeightEntry[]): number {
  if (history.length < 2) return 0;
  const first = history[0].weightKg;
  const last = history[history.length - 1].weightKg;
  return Number((last - first).toFixed(1));
}

export function saveCustomizedDay(dayNumber: number, items: WorkoutItem[]): UserProgress {
  const current = loadProgress();
  const updated: UserProgress = {
    ...current,
    customizedItems: {
      ...(current.customizedItems || {}),
      [dayNumber]: items
    }
  };

  try {
    setStorageItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Fallback
  }

  return updated;
}

export function saveSettings(settings: Partial<AppSettings>): UserProgress {
  const current = loadProgress();
  const updated: UserProgress = {
    ...current,
    settings: {
      ...current.settings,
      ...settings
    }
  };

  try {
    setStorageItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Fallback
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

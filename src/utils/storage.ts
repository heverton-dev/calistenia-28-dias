import { UserProgress, WeightEntry, AppSettings, WorkoutItem, AppTheme } from '../types/workout';

const STORAGE_KEY = 'calistenia_28_progress_v1';
const THEME_KEY = 'calistenia_28_theme';

export const DEFAULT_SETTINGS: AppSettings = {
  soundEnabled: true,
  prepTimeSeconds: 5,
  restTimeMultiplier: 1.0,
  vibrateEnabled: true,
  theme: 'orange'
};

export const DEFAULT_PROGRESS: UserProgress = {
  completedDays: [],
  currentStreak: 0,
  bestStreak: 0,
  totalWorkoutsCompleted: 0,
  weightHistory: [],
  settings: DEFAULT_SETTINGS,
  customizedItems: {},
  theme: 'orange'
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
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);
    const savedTheme = (getStorageItem(THEME_KEY) as AppTheme) || parsed.theme || 'orange';
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      theme: savedTheme,
      settings: {
        ...DEFAULT_SETTINGS,
        ...(parsed.settings || {}),
        theme: savedTheme
      }
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveTheme(theme: AppTheme): void {
  try {
    setStorageItem(THEME_KEY, theme);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
    const current = loadProgress();
    setStorageItem(STORAGE_KEY, JSON.stringify({ ...current, theme }));
  } catch {
    // fallback
  }
}

export function calculateStreak(lastCompletedDate: string | undefined, currentStreak: number): number {
  if (!lastCompletedDate) return 1;
  const today = new Date().toISOString().split('T')[0];
  const last = new Date(lastCompletedDate);
  const curr = new Date(today);
  const diffDays = Math.floor((curr.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return currentStreak;
  if (diffDays === 1) return currentStreak + 1;
  return 1;
}

export function saveCompletedDay(dayNumber: number): UserProgress {
  const current = loadProgress();
  const completed = new Set(current.completedDays);
  completed.add(dayNumber);

  const today = new Date().toISOString().split('T')[0];
  let streak = current.currentStreak;

  if (current.lastCompletedDate) {
    const last = new Date(current.lastCompletedDate);
    const curr = new Date(today);
    const diffDays = Math.floor((curr.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      streak += 1;
    } else if (diffDays > 1) {
      streak = 1;
    }
  } else {
    streak = 1;
  }

  const updated: UserProgress = {
    ...current,
    completedDays: Array.from(completed).sort((a, b) => a - b),
    currentStreak: streak,
    bestStreak: Math.max(streak, current.bestStreak),
    totalWorkoutsCompleted: current.totalWorkoutsCompleted + 1,
    lastCompletedDate: today
  };

  try {
    setStorageItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Fallback
  }

  return updated;
}

export const saveWorkoutCompletion = saveCompletedDay;

export function saveWeightEntry(weightKg: number, date?: string): UserProgress {
  const current = loadProgress();
  const targetDate = date || new Date().toISOString().split('T')[0];

  const filtered = current.weightHistory.filter(w => w.date !== targetDate);
  const newEntry: WeightEntry = { date: targetDate, weightKg };
  const updatedHistory = [...filtered, newEntry].sort((a, b) => a.date.localeCompare(b.date));

  const updated: UserProgress = {
    ...current,
    userWeightKg: weightKg,
    weightHistory: updatedHistory
  };

  try {
    setStorageItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Fallback
  }

  return updated;
}

export const saveWeight = saveWeightEntry;

export function calculateWeightChange(history: WeightEntry[]): number {
  if (!history || history.length < 2) return 0;
  const sorted = [...history].sort((a, b) => a.date.localeCompare(b.date));
  const first = sorted[0].weightKg;
  const last = sorted[sorted.length - 1].weightKg;
  return Number((last - first).toFixed(1));
}

export function saveCustomizedDayItems(dayNumber: number, items: WorkoutItem[]): UserProgress {
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

export const saveCustomizedDay = saveCustomizedDayItems;

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
    removeStorageItem(THEME_KEY);
  } catch {
    // Ignora
  }
}

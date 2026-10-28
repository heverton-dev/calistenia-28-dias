export type MuscleGroup =
  | 'chest'
  | 'triceps'
  | 'shoulders'
  | 'core'
  | 'back'
  | 'quads'
  | 'glutes'
  | 'calves';

export type AnimationType =
  | 'pushup'
  | 'squat'
  | 'plank'
  | 'dips'
  | 'jumping-jack'
  | 'lunges'
  | 'mountain-climber'
  | 'burpee'
  | 'hollow-hold'
  | 'pike-pushup'
  | 'glute-bridge';

export type AppTheme = 'orange' | 'yellow' | 'pink' | 'blue' | 'green';

export interface Exercise {
  id: string;
  name: string;
  slug: string;
  primaryMuscles: MuscleGroup[];
  secondaryMuscles: MuscleGroup[];
  description: string;
  tips: string[];
  animationType: AnimationType;
  difficulty: 'iniciante' | 'intermediario' | 'avancado';
  mediaId?: string;
  videoUrl?: string;
  posterUrl?: string;
}

export interface WorkoutItem {
  exerciseId: string;
  durationSeconds: number;
  reps?: number;
  restSeconds: number;
}

export interface WorkoutDay {
  dayNumber: number; // 1 a 28
  title: string;
  focus: string;
  phase: number; // 1 (Semana 1), 2 (Semana 2), 3 (Semana 3), 4 (Semana 4)
  isRestDay: boolean;
  estimatedMinutes: number;
  items: WorkoutItem[];
}

export interface WeekPlan {
  weekNumber: number;
  title: string;
  phase: number;
  days: WorkoutDay[];
}

export interface WeightEntry {
  date: string; // YYYY-MM-DD
  weightKg: number;
}

export interface AppSettings {
  soundEnabled: boolean;
  prepTimeSeconds: number; // 3, 5 ou 10
  restTimeMultiplier: number;
  vibrateEnabled: boolean;
  theme?: AppTheme;
}

export interface UserProgress {
  completedDays: number[];
  currentStreak: number;
  bestStreak: number;
  totalWorkoutsCompleted: number;
  lastCompletedDate?: string;
  userWeightKg?: number;
  weightHistory: WeightEntry[];
  settings: AppSettings;
  customizedItems?: Record<number, WorkoutItem[]>;
  theme?: AppTheme;
}

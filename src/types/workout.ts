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

export interface UserProgress {
  completedDays: number[];
  currentStreak: number;
  bestStreak: number;
  totalWorkoutsCompleted: number;
  lastCompletedDate?: string;
  userWeightKg?: number;
}

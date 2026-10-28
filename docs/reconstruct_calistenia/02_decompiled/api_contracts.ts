/**
 * Contratos de API e Estrutura de Domínio Reconstituídos
 * Modelo 100% Offline-First persistido localmente via Web Storage API
 */

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

export interface ExerciseContract {
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

export interface WorkoutItemContract {
  exerciseId: string;
  durationSeconds: number;
  reps?: number;
  restSeconds: number;
}

export interface WorkoutDayContract {
  dayNumber: number; // 1..28
  title: string;
  focus: string;
  phase: number; // 1..4
  isRestDay: boolean;
  estimatedMinutes: number;
  items: WorkoutItemContract[];
}

export interface UserProgressContract {
  completedDays: number[];
  currentStreak: number;
  bestStreak: number;
  totalWorkoutsCompleted: number;
  lastCompletedDate?: string;
  userWeightKg?: number;
}

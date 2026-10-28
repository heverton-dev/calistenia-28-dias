import { WorkoutDay, WorkoutItem } from '../types/workout';

export interface WeekGroup {
  weekNumber: number;
  title: string;
  phaseName: string;
  days: WorkoutDay[];
}

export function groupDaysByWeek(days: WorkoutDay[]): WeekGroup[] {
  const weekTitles = [
    'Semana 1: Adaptação & Core',
    'Semana 2: Força Progressiva',
    'Semana 3: Resistência & Volume',
    'Semana 4: Maestria Final'
  ];

  const weeks: WeekGroup[] = [];
  for (let i = 0; i < 4; i++) {
    const start = i * 7;
    const weekDays = days.slice(start, start + 7);
    weeks.push({
      weekNumber: i + 1,
      title: weekTitles[i] || `Semana ${i + 1}`,
      phaseName: `Fase ${i + 1}`,
      days: weekDays
    });
  }
  return weeks;
}

export function getNextAvailableDay(
  completedDays: number[],
  allDays: WorkoutDay[]
): WorkoutDay {
  const firstUncompleted = allDays.find(d => !completedDays.includes(d.dayNumber));
  return firstUncompleted || allDays[allDays.length - 1];
}

export function replaceWorkoutItem(
  items: WorkoutItem[],
  index: number,
  newExerciseId: string
): WorkoutItem[] {
  if (index < 0 || index >= items.length) return items;
  const newItems = [...items];
  newItems[index] = {
    ...newItems[index],
    exerciseId: newExerciseId
  };
  return newItems;
}

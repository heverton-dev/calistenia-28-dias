import { WorkoutDay } from '../types/workout';

export const CHALLENGE_28_DAYS: WorkoutDay[] = [
  // --- SEMANA 1: FASE 1 - ADAPTAÇÃO & ATIVAÇÃO DO CORE ---
  {
    dayNumber: 1,
    title: 'Ativação e Peitoral Básico',
    focus: 'Peitoral & Core',
    phase: 1,
    isRestDay: false,
    estimatedMinutes: 8,
    items: [
      { exerciseId: 'jumping-jacks', durationSeconds: 30, restSeconds: 15 },
      { exerciseId: 'push-up', durationSeconds: 30, restSeconds: 20 },
      { exerciseId: 'plank', durationSeconds: 30, restSeconds: 20 },
      { exerciseId: 'push-up', durationSeconds: 25, restSeconds: 20 },
      { exerciseId: 'mountain-climber', durationSeconds: 30, restSeconds: 15 }
    ]
  },
  {
    dayNumber: 2,
    title: 'Força Inferior & Base',
    focus: 'Quadríceps & Glúteos',
    phase: 1,
    isRestDay: false,
    estimatedMinutes: 9,
    items: [
      { exerciseId: 'jumping-jacks', durationSeconds: 30, restSeconds: 15 },
      { exerciseId: 'bodyweight-squat', durationSeconds: 40, restSeconds: 20 },
      { exerciseId: 'lunges', durationSeconds: 40, restSeconds: 20 },
      { exerciseId: 'glute-bridge', durationSeconds: 35, restSeconds: 15 },
      { exerciseId: 'plank', durationSeconds: 30, restSeconds: 15 }
    ]
  },
  {
    dayNumber: 3,
    title: 'Tríceps & Empurrar',
    focus: 'Tríceps & Ombros',
    phase: 1,
    isRestDay: false,
    estimatedMinutes: 8,
    items: [
      { exerciseId: 'jumping-jacks', durationSeconds: 30, restSeconds: 15 },
      { exerciseId: 'dips-bench', durationSeconds: 30, restSeconds: 20 },
      { exerciseId: 'push-up', durationSeconds: 25, restSeconds: 20 },
      { exerciseId: 'dips-bench', durationSeconds: 25, restSeconds: 20 },
      { exerciseId: 'mountain-climber', durationSeconds: 30, restSeconds: 15 }
    ]
  },
  {
    dayNumber: 4,
    title: 'Descanso e Recuperação Ativa',
    focus: 'Recuperação Muscular',
    phase: 1,
    isRestDay: true,
    estimatedMinutes: 0,
    items: []
  },
  {
    dayNumber: 5,
    title: 'Escultura Abdominal',
    focus: 'Abdômen & Core Profundo',
    phase: 1,
    isRestDay: false,
    estimatedMinutes: 9,
    items: [
      { exerciseId: 'mountain-climber', durationSeconds: 35, restSeconds: 15 },
      { exerciseId: 'plank', durationSeconds: 40, restSeconds: 20 },
      { exerciseId: 'hollow-body-hold', durationSeconds: 25, restSeconds: 20 },
      { exerciseId: 'glute-bridge', durationSeconds: 35, restSeconds: 15 },
      { exerciseId: 'plank', durationSeconds: 35, restSeconds: 15 }
    ]
  },
  {
    dayNumber: 6,
    title: 'Full Body Metabólico',
    focus: 'Corpo Inteiro & Queima',
    phase: 1,
    isRestDay: false,
    estimatedMinutes: 10,
    items: [
      { exerciseId: 'jumping-jacks', durationSeconds: 40, restSeconds: 15 },
      { exerciseId: 'push-up', durationSeconds: 30, restSeconds: 20 },
      { exerciseId: 'bodyweight-squat', durationSeconds: 40, restSeconds: 20 },
      { exerciseId: 'mountain-climber', durationSeconds: 35, restSeconds: 15 },
      { exerciseId: 'plank', durationSeconds: 35, restSeconds: 15 }
    ]
  },
  {
    dayNumber: 7,
    title: 'Descanso e Regeneração',
    focus: 'Recuperação Muscular',
    phase: 1,
    isRestDay: true,
    estimatedMinutes: 0,
    items: []
  },

  // --- SEMANA 2: FASE 2 - DENSIDADE & FORÇA PROGRESSIVA ---
  {
    dayNumber: 8,
    title: 'Densidade Peitoral',
    focus: 'Peitoral & Tríceps',
    phase: 2,
    isRestDay: false,
    estimatedMinutes: 10,
    items: [
      { exerciseId: 'jumping-jacks', durationSeconds: 35, restSeconds: 15 },
      { exerciseId: 'push-up', durationSeconds: 35, restSeconds: 20 },
      { exerciseId: 'diamond-push-up', durationSeconds: 25, restSeconds: 25 },
      { exerciseId: 'dips-bench', durationSeconds: 30, restSeconds: 20 },
      { exerciseId: 'plank', durationSeconds: 40, restSeconds: 15 }
    ]
  },
  {
    dayNumber: 9,
    title: 'Potência de Pernas',
    focus: 'Pernas & Posterior',
    phase: 2,
    isRestDay: false,
    estimatedMinutes: 10,
    items: [
      { exerciseId: 'jumping-jacks', durationSeconds: 40, restSeconds: 15 },
      { exerciseId: 'bodyweight-squat', durationSeconds: 45, restSeconds: 20 },
      { exerciseId: 'lunges', durationSeconds: 45, restSeconds: 20 },
      { exerciseId: 'glute-bridge', durationSeconds: 40, restSeconds: 15 },
      { exerciseId: 'mountain-climber', durationSeconds: 35, restSeconds: 15 }
    ]
  },
  {
    dayNumber: 10,
    title: 'Ombros e Tríceps Estritos',
    focus: 'Deltóides & Tríceps',
    phase: 2,
    isRestDay: false,
    estimatedMinutes: 10,
    items: [
      { exerciseId: 'pike-push-up', durationSeconds: 30, restSeconds: 25 },
      { exerciseId: 'dips-bench', durationSeconds: 35, restSeconds: 20 },
      { exerciseId: 'diamond-push-up', durationSeconds: 25, restSeconds: 25 },
      { exerciseId: 'plank', durationSeconds: 40, restSeconds: 20 },
      { exerciseId: 'mountain-climber', durationSeconds: 35, restSeconds: 15 }
    ]
  },
  {
    dayNumber: 11,
    title: 'Descanso e Hidratação',
    focus: 'Recuperação Muscular',
    phase: 2,
    isRestDay: true,
    estimatedMinutes: 0,
    items: []
  },
  {
    dayNumber: 12,
    title: 'Abdômen de Aço',
    focus: 'Core & Estabilidade',
    phase: 2,
    isRestDay: false,
    estimatedMinutes: 11,
    items: [
      { exerciseId: 'plank', durationSeconds: 45, restSeconds: 20 },
      { exerciseId: 'hollow-body-hold', durationSeconds: 30, restSeconds: 20 },
      { exerciseId: 'mountain-climber', durationSeconds: 40, restSeconds: 20 },
      { exerciseId: 'glute-bridge', durationSeconds: 40, restSeconds: 15 },
      { exerciseId: 'plank', durationSeconds: 45, restSeconds: 15 }
    ]
  },
  {
    dayNumber: 13,
    title: 'Circuito Condicionamento Total',
    focus: 'Corpo Inteiro',
    phase: 2,
    isRestDay: false,
    estimatedMinutes: 12,
    items: [
      { exerciseId: 'burpee', durationSeconds: 30, restSeconds: 25 },
      { exerciseId: 'push-up', durationSeconds: 35, restSeconds: 20 },
      { exerciseId: 'bodyweight-squat', durationSeconds: 45, restSeconds: 20 },
      { exerciseId: 'dips-bench', durationSeconds: 35, restSeconds: 20 },
      { exerciseId: 'plank', durationSeconds: 45, restSeconds: 15 }
    ]
  },
  {
    dayNumber: 14,
    title: 'Descanso da Segunda Semana',
    focus: 'Recuperação Muscular',
    phase: 2,
    isRestDay: true,
    estimatedMinutes: 0,
    items: []
  },

  // --- SEMANA 3: FASE 3 - RESISTÊNCIA & VOLUME ---
  {
    dayNumber: 15,
    title: 'Volume Superior Extremo',
    focus: 'Peitoral & Tríceps',
    phase: 3,
    isRestDay: false,
    estimatedMinutes: 12,
    items: [
      { exerciseId: 'push-up', durationSeconds: 40, restSeconds: 20 },
      { exerciseId: 'diamond-push-up', durationSeconds: 30, restSeconds: 25 },
      { exerciseId: 'dips-bench', durationSeconds: 40, restSeconds: 20 },
      { exerciseId: 'push-up', durationSeconds: 30, restSeconds: 20 },
      { exerciseId: 'mountain-climber', durationSeconds: 40, restSeconds: 15 }
    ]
  },
  {
    dayNumber: 16,
    title: 'Resistência Muscular de Pernas',
    focus: 'Quadríceps & Glúteos',
    phase: 3,
    isRestDay: false,
    estimatedMinutes: 12,
    items: [
      { exerciseId: 'bodyweight-squat', durationSeconds: 50, restSeconds: 20 },
      { exerciseId: 'lunges', durationSeconds: 50, restSeconds: 20 },
      { exerciseId: 'glute-bridge', durationSeconds: 45, restSeconds: 20 },
      { exerciseId: 'jumping-jacks', durationSeconds: 45, restSeconds: 15 },
      { exerciseId: 'bodyweight-squat', durationSeconds: 40, restSeconds: 20 }
    ]
  },
  {
    dayNumber: 17,
    title: 'Força de Ombros e Estabilização',
    focus: 'Ombros & Core',
    phase: 3,
    isRestDay: false,
    estimatedMinutes: 11,
    items: [
      { exerciseId: 'pike-push-up', durationSeconds: 35, restSeconds: 25 },
      { exerciseId: 'dips-bench', durationSeconds: 40, restSeconds: 20 },
      { exerciseId: 'plank', durationSeconds: 50, restSeconds: 20 },
      { exerciseId: 'mountain-climber', durationSeconds: 45, restSeconds: 15 },
      { exerciseId: 'pike-push-up', durationSeconds: 30, restSeconds: 20 }
    ]
  },
  {
    dayNumber: 18,
    title: 'Recuperação e Sono Reparador',
    focus: 'Recuperação Muscular',
    phase: 3,
    isRestDay: true,
    estimatedMinutes: 0,
    items: []
  },
  {
    dayNumber: 19,
    title: 'Core Isométrico e Dinâmico',
    focus: 'Abdômen & Lombar',
    phase: 3,
    isRestDay: false,
    estimatedMinutes: 12,
    items: [
      { exerciseId: 'hollow-body-hold', durationSeconds: 35, restSeconds: 20 },
      { exerciseId: 'plank', durationSeconds: 50, restSeconds: 20 },
      { exerciseId: 'mountain-climber', durationSeconds: 45, restSeconds: 20 },
      { exerciseId: 'glute-bridge', durationSeconds: 45, restSeconds: 15 },
      { exerciseId: 'plank', durationSeconds: 45, restSeconds: 15 }
    ]
  },
  {
    dayNumber: 20,
    title: 'Queima Total de Gordura',
    focus: 'Cardio & Força',
    phase: 3,
    isRestDay: false,
    estimatedMinutes: 13,
    items: [
      { exerciseId: 'burpee', durationSeconds: 35, restSeconds: 25 },
      { exerciseId: 'jumping-jacks', durationSeconds: 50, restSeconds: 15 },
      { exerciseId: 'push-up', durationSeconds: 35, restSeconds: 20 },
      { exerciseId: 'bodyweight-squat', durationSeconds: 45, restSeconds: 20 },
      { exerciseId: 'burpee', durationSeconds: 30, restSeconds: 20 }
    ]
  },
  {
    dayNumber: 21,
    title: 'Descanso da Terceira Semana',
    focus: 'Recuperação Muscular',
    phase: 3,
    isRestDay: true,
    estimatedMinutes: 0,
    items: []
  },

  // --- SEMANA 4: FASE 4 - MAESTRIA & POTÊNCIA MÁXIMA ---
  {
    dayNumber: 22,
    title: 'Maestria de Empurrar',
    focus: 'Peitoral, Tríceps & Ombros',
    phase: 4,
    isRestDay: false,
    estimatedMinutes: 13,
    items: [
      { exerciseId: 'push-up', durationSeconds: 45, restSeconds: 20 },
      { exerciseId: 'diamond-push-up', durationSeconds: 35, restSeconds: 25 },
      { exerciseId: 'pike-push-up', durationSeconds: 35, restSeconds: 25 },
      { exerciseId: 'dips-bench', durationSeconds: 45, restSeconds: 20 },
      { exerciseId: 'push-up', durationSeconds: 35, restSeconds: 20 }
    ]
  },
  {
    dayNumber: 23,
    title: 'Pernas de Aço',
    focus: 'Quadríceps & Glúteos',
    phase: 4,
    isRestDay: false,
    estimatedMinutes: 13,
    items: [
      { exerciseId: 'bodyweight-squat', durationSeconds: 55, restSeconds: 20 },
      { exerciseId: 'lunges', durationSeconds: 55, restSeconds: 20 },
      { exerciseId: 'glute-bridge', durationSeconds: 50, restSeconds: 20 },
      { exerciseId: 'jumping-jacks', durationSeconds: 50, restSeconds: 15 },
      { exerciseId: 'bodyweight-squat', durationSeconds: 45, restSeconds: 20 }
    ]
  },
  {
    dayNumber: 24,
    title: 'Desafio Calistênico Supremo',
    focus: 'Deltóides & Core',
    phase: 4,
    isRestDay: false,
    estimatedMinutes: 13,
    items: [
      { exerciseId: 'burpee', durationSeconds: 40, restSeconds: 25 },
      { exerciseId: 'pike-push-up', durationSeconds: 40, restSeconds: 25 },
      { exerciseId: 'hollow-body-hold', durationSeconds: 40, restSeconds: 20 },
      { exerciseId: 'dips-bench', durationSeconds: 45, restSeconds: 20 },
      { exerciseId: 'mountain-climber', durationSeconds: 50, restSeconds: 15 }
    ]
  },
  {
    dayNumber: 25,
    title: 'Recuperação Pré-Reta Final',
    focus: 'Recuperação Muscular',
    phase: 4,
    isRestDay: true,
    estimatedMinutes: 0,
    items: []
  },
  {
    dayNumber: 26,
    title: 'Tensão Corporal Absoluta',
    focus: 'Core & Isometria',
    phase: 4,
    isRestDay: false,
    estimatedMinutes: 12,
    items: [
      { exerciseId: 'plank', durationSeconds: 60, restSeconds: 25 },
      { exerciseId: 'hollow-body-hold', durationSeconds: 40, restSeconds: 20 },
      { exerciseId: 'push-up', durationSeconds: 45, restSeconds: 20 },
      { exerciseId: 'mountain-climber', durationSeconds: 50, restSeconds: 20 },
      { exerciseId: 'plank', durationSeconds: 50, restSeconds: 15 }
    ]
  },
  {
    dayNumber: 27,
    title: 'Teste de Capacidade Máxima',
    focus: 'Corpo Inteiro & Explosão',
    phase: 4,
    isRestDay: false,
    estimatedMinutes: 14,
    items: [
      { exerciseId: 'burpee', durationSeconds: 45, restSeconds: 25 },
      { exerciseId: 'push-up', durationSeconds: 45, restSeconds: 20 },
      { exerciseId: 'bodyweight-squat', durationSeconds: 55, restSeconds: 20 },
      { exerciseId: 'diamond-push-up', durationSeconds: 35, restSeconds: 25 },
      { exerciseId: 'plank', durationSeconds: 60, restSeconds: 20 }
    ]
  },
  {
    dayNumber: 28,
    title: 'Graduação do Desafio 28 Dias!',
    focus: 'Celebração & Resistência Final',
    phase: 4,
    isRestDay: false,
    estimatedMinutes: 15,
    items: [
      { exerciseId: 'jumping-jacks', durationSeconds: 60, restSeconds: 15 },
      { exerciseId: 'burpee', durationSeconds: 45, restSeconds: 25 },
      { exerciseId: 'push-up', durationSeconds: 45, restSeconds: 20 },
      { exerciseId: 'bodyweight-squat', durationSeconds: 60, restSeconds: 20 },
      { exerciseId: 'dips-bench', durationSeconds: 50, restSeconds: 20 },
      { exerciseId: 'plank', durationSeconds: 60, restSeconds: 15 }
    ]
  }
];

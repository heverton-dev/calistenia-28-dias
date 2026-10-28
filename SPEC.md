# Especificação Técnica: Calistenia Daily Trainer (28-Day Offline)

## 1. Objetivo
Desenvolver uma aplicação mobile cross-platform (iOS PWA / Android PWA & APK) 100% offline-first para treinos diários de calistenia, inspirada no fluxo guiado do BetterMe, sem taxas, sem anúncios e com total soberania dos dados do usuário.

## 2. Comandos do Projeto
- **Dev:** `npm run dev`
- **Build:** `npm run build`
- **Test:** `npm run test` (Vitest)
- **Preview:** `npm run preview`

## 3. Estrutura do Projeto
```text
proj--app-calistenia/
├── docs/
│   └── intent/calistenia-app.md
├── tasks/
│   ├── plan.md
│   └── todo.md
├── public/
│   ├── icon-192.png
│   ├── icon-512.png
│   └── manifest.json
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AnatomyViewer.tsx     # Diagrama anatômico SVG com destaque dos músculos ativos
│   │   ├── ExerciseAnimation.tsx # Animação vetorial/loop do exercício
│   │   ├── WorkoutPlayer.tsx     # Player guiado com contagem, áudio e pausa/avanço
│   │   ├── DayCard.tsx           # Cartão do dia do desafio (1 a 28)
│   │   ├── ProgressBar.tsx       # Barra de progresso e estatísticas
│   │   └── Layout.tsx            # Shell responsiva mobile com safe-areas
│   ├── data/
│   │   ├── exercises.ts          # Banco de dados de exercícios com anatomia e instruções
│   │   └── challenge28.ts        # Matriz completa dos 28 dias de treino/descanso
│   ├── hooks/
│   │   ├── useAudioTimer.ts      # Web Audio API para beeps de 3s e sino de troca
│   │   ├── useWakeLock.ts        # Mantém a tela acesa durante a sessão
│   │   └── useLocalProgress.ts   # Persistência de progresso e histórico
│   ├── types/
│   │   └── workout.ts            # Tipagens do domínio
│   ├── utils/
│   │   ├── sound.ts              # Sintetizador Web Audio API puro (zero assets de áudio)
│   │   └── storage.ts            # LocalStorage resiliente com fallback
│   ├── App.tsx                   # Roteador de telas (Desafio, Player, Histórico, Exercícios)
│   ├── main.tsx
│   └── index.css                 # Design tokens, modo escuro e animações
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── SPEC.md
```

## 4. Arquitetura e Contratos de Dados

### Tipagens de Domínio (`src/types/workout.ts`)
- **MuscleGroup:** `'chest' | 'triceps' | 'shoulders' | 'core' | 'back' | 'quads' | 'glutes' | 'calves'`
- **Exercise:**
  - `id: string`
  - `name: string`
  - `slug: string`
  - `primaryMuscles: MuscleGroup[]`
  - `secondaryMuscles: MuscleGroup[]`
  - `description: string`
  - `tips: string[]`
  - `animationType: 'pushup' | 'squat' | 'plank' | 'dips' | 'jumping-jack' | 'lunges' | 'mountain-climber' | 'burpee' | 'hollow-hold'`
- **WorkoutItem:**
  - `exerciseId: string`
  - `durationSeconds: number` (ou `reps?: number`)
  - `restSeconds: number`
- **WorkoutDay:**
  - `dayNumber: number` (1 a 28)
  - `title: string`
  - `focus: string`
  - `isRestDay: boolean`
  - `items: WorkoutItem[]`
- **UserProgress:**
  - `completedDays: number[]`
  - `currentStreak: number`
  - `totalWorkoutsCompleted: number`
  - `lastCompletedDate?: string`
  - `weightHistory: { date: string; weightKg: number }[]`

## 5. Requisitos Não Funcionais & PWA Offline
- **Offline First:** O Service Worker faz cache de 100% dos assets estáticos via `vite-plugin-pwa`.
- **Zero Assets de Áudio Externos:** Todos os sons de contagem regressiva (3-2-1) e sino de conclusão são gerados programmaticamente em tempo real via `AudioContext` da Web Audio API (funciona offline instantaneamente).
- **Wake Lock:** Ativa `navigator.wakeLock` durante a reprodução do treino para evitar que a tela do iPhone/Android apague.
- **Anatomia Muscular Dinâmica:** Visualização SVG vetorial destacando os músculos primários em vermelho/laranja e secundários em amarelo.

## 6. Critérios de Aceitação Binários
1. `npm test` executa suite de testes unitários com 100% de aprovação.
2. `npm run build` compila sem erros de TypeScript e sem dependências remotas em runtime.
3. A matriz completa dos 28 dias de treino está implementada com dias de treino e descanso.
4. O player de treino conta os tempos de execução e descanso automaticamente com bips sonoros.
5. O progresso é mantido entre recargas do navegador.

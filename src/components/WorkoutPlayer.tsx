import { useState, useEffect, useRef } from 'react';
import { WorkoutDay } from '../types/workout';
import { getExerciseById } from '../data/exercises';
import { AnatomyViewer } from './AnatomyViewer';
import { ExerciseAnimation } from './ExerciseAnimation';
import { getNextStep, PlayerState, calculateWorkoutProgress } from './playerEngine';
import { playCountdownBeep, playTransitionBell } from '../utils/sound';
import { useWakeLock } from '../hooks/useWakeLock';
import { Play, Pause, SkipForward, X, CheckCircle } from 'lucide-react';

interface WorkoutPlayerProps {
  workout: WorkoutDay;
  onFinish: () => void;
  onExit: () => void;
}

export function WorkoutPlayer({ workout, onFinish, onExit }: WorkoutPlayerProps) {
  const [state, setState] = useState<PlayerState>('prepare');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5); // 5s de preparação inicial
  const [totalTimeLeft, setTotalTimeLeft] = useState(5);
  const [isPaused, setIsPaused] = useState(false);

  // Mantém a tela acesa
  useWakeLock(state !== 'completed');

  const currentItem = workout.items[currentIndex];
  const currentExercise = currentItem ? getExerciseById(currentItem.exerciseId) : null;
  const nextItem = workout.items[currentIndex + 1];
  const nextExercise = nextItem ? getExerciseById(nextItem.exerciseId) : null;

  const timerRef = useRef<number | null>(null);

  // Timer loop
  useEffect(() => {
    if (state === 'completed' || isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = window.setInterval(() => {
      setTimeLeft(prev => {
        // Tocar bip nos 3 segundos finais
        if (prev <= 4 && prev > 1) {
          playCountdownBeep(prev - 1);
        }

        if (prev <= 1) {
          playTransitionBell();
          const next = getNextStep(state, currentIndex, workout.items);
          setState(next.state);
          setCurrentIndex(next.currentIndex);
          setTotalTimeLeft(next.duration);
          return next.duration;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [state, currentIndex, isPaused, workout.items]);

  const handleSkip = () => {
    playTransitionBell();
    const next = getNextStep(state, currentIndex, workout.items);
    setState(next.state);
    setCurrentIndex(next.currentIndex);
    setTimeLeft(next.duration);
    setTotalTimeLeft(next.duration);
  };

  const togglePause = () => {
    setIsPaused(prev => !prev);
  };

  const progressPercent = calculateWorkoutProgress(currentIndex, state, workout.items.length);
  const timerPercent = totalTimeLeft > 0 ? ((totalTimeLeft - timeLeft) / totalTimeLeft) * 100 : 100;

  if (state === 'completed') {
    return (
      <div className="min-h-screen bg-[#090d16] text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6 border border-emerald-500/30 animate-bounce">
          <CheckCircle size={48} />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">Treino Concluído!</h1>
        <p className="text-slate-400 max-w-sm mb-6">
          Você completou o <span className="text-white font-semibold">{workout.title}</span> (Dia {workout.dayNumber} do Desafio).
        </p>

        <div className="grid grid-cols-2 gap-4 w-full max-w-xs mb-8">
          <div className="bg-[#131b2e] p-4 rounded-xl border border-white/5">
            <span className="text-xs text-slate-400 block mb-1">Exercícios</span>
            <span className="text-2xl font-bold text-orange-400">{workout.items.length}</span>
          </div>
          <div className="bg-[#131b2e] p-4 rounded-xl border border-white/5">
            <span className="text-xs text-slate-400 block mb-1">Tempo Est.</span>
            <span className="text-2xl font-bold text-emerald-400">{workout.estimatedMinutes} min</span>
          </div>
        </div>

        <button
          onClick={onFinish}
          className="w-full max-w-xs py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-lg shadow-lg shadow-orange-500/25 active:scale-95 transition-transform"
        >
          Registrar e Salvar
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090d16] text-white flex flex-col justify-between p-4 safe-area-inset">
      {/* Barra superior de controle e progresso */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={onExit}
            className="p-2 rounded-xl bg-slate-800/60 text-slate-300 hover:text-white"
          >
            <X size={20} />
          </button>
          <div className="text-center">
            <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider block">
              Dia {workout.dayNumber} • {workout.focus}
            </span>
            <span className="text-xs text-slate-400">
              {currentIndex + 1} de {workout.items.length} exercícios
            </span>
          </div>
          <div className="w-8" />
        </div>

        {/* Linha de progresso geral do treino */}
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Conteúdo Central */}
      <div className="flex-1 flex flex-col items-center justify-center my-4">
        {state === 'prepare' && (
          <div className="text-center">
            <span className="text-sm font-semibold text-orange-400 uppercase tracking-widest block mb-2">
              Prepare-se
            </span>
            <h2 className="text-2xl font-bold mb-4">{currentExercise?.name}</h2>
            <div className="text-7xl font-black text-white font-mono my-4 animate-pulse">
              {timeLeft}
            </div>
            <p className="text-xs text-slate-400">Começando em instantes...</p>
          </div>
        )}

        {state === 'active' && currentExercise && (
          <div className="w-full max-w-sm flex flex-col items-center">
            {/* Visualizador Anatômico e Animação lado a lado */}
            <div className="grid grid-cols-2 gap-3 w-full mb-4">
              <ExerciseAnimation
                animationType={currentExercise.animationType}
                isPaused={isPaused}
              />
              <AnatomyViewer
                primaryMuscles={currentExercise.primaryMuscles}
                secondaryMuscles={currentExercise.secondaryMuscles}
              />
            </div>

            <h2 className="text-xl font-bold text-center mb-1">{currentExercise.name}</h2>
            <p className="text-xs text-slate-400 text-center mb-4 line-clamp-2">
              {currentExercise.description}
            </p>

            {/* Timer Central Circular / Digital */}
            <div className="relative w-36 h-36 flex flex-col items-center justify-center rounded-full bg-[#131b2e] border-4 border-orange-500/20 shadow-inner">
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="72"
                  cy="72"
                  r="66"
                  stroke="#f97316"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray="415"
                  strokeDashoffset={415 - (415 * timerPercent) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
              </svg>
              <span className="text-4xl font-black font-mono tracking-tight">{timeLeft}s</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Tempo</span>
            </div>
          </div>
        )}

        {state === 'rest' && (
          <div className="text-center w-full max-w-sm">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
              Descanso
            </span>
            <div className="text-6xl font-black font-mono my-4 text-emerald-400">
              {timeLeft}s
            </div>

            {nextExercise && (
              <div className="bg-[#131b2e] p-4 rounded-2xl border border-white/5 text-left mt-4">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                  A Seguir:
                </span>
                <span className="text-sm font-bold text-white block">{nextExercise.name}</span>
                <span className="text-xs text-orange-400 block mt-0.5">
                  Duração: {nextItem?.durationSeconds}s
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Barra Inferior de Controles */}
      <div className="flex items-center justify-center gap-6 pb-4">
        <button
          onClick={togglePause}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/25 active:scale-95 transition-transform"
        >
          {isPaused ? <Play size={28} className="translate-x-0.5" /> : <Pause size={28} />}
        </button>

        <button
          onClick={handleSkip}
          className="p-3 rounded-full bg-slate-800 text-slate-300 hover:text-white active:scale-90 transition-transform"
          title="Pular"
        >
          <SkipForward size={22} />
        </button>
      </div>
    </div>
  );
}

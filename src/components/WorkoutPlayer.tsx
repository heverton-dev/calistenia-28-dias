import { useState, useEffect, useRef } from 'react';
import { WorkoutDay } from '../types/workout';
import { getExerciseById } from '../data/exercises';
import { AnatomyViewer } from './AnatomyViewer';
import { ExerciseAnimation } from './ExerciseAnimation';
import { getNextStep, PlayerState, calculateWorkoutProgress } from './playerEngine';
import { playCountdownBeep, playTransitionBell } from '../utils/sound';
import { useWakeLock } from '../hooks/useWakeLock';
import { Play, Pause, SkipForward, X, CheckCircle, Volume2 } from 'lucide-react';

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

  // Mantém a tela ligada no iPhone / Android
  useWakeLock(state !== 'completed');

  const currentItem = workout.items[currentIndex];
  const currentExercise = currentItem ? getExerciseById(currentItem.exerciseId) : null;
  const nextItem = workout.items[currentIndex + 1];
  const nextExercise = nextItem ? getExerciseById(nextItem.exerciseId) : null;

  const timerRef = useRef<number | null>(null);

  // Loop do timer
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
      <div className="min-h-screen bg-[#080b14] text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/10 text-emerald-400 flex items-center justify-center mb-6 border border-emerald-500/30 shadow-2xl shadow-emerald-500/20">
          <CheckCircle size={56} className="animate-pulse" />
        </div>
        <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 mb-2">
          Missão Cumprida
        </span>
        <h1 className="text-3xl font-black tracking-tight mb-2">Treino Finalizado!</h1>
        <p className="text-slate-400 max-w-sm mb-8 text-sm">
          Você concluiu com maestria o <span className="text-white font-semibold">{workout.title}</span> (Dia {workout.dayNumber} do Desafio).
        </p>

        <div className="grid grid-cols-2 gap-4 w-full max-w-xs mb-8">
          <div className="bg-[#111728] p-4 rounded-2xl border border-white/5 shadow-md">
            <span className="text-[11px] text-slate-400 block mb-1 uppercase font-semibold">Exercícios</span>
            <span className="text-2xl font-black text-orange-400">{workout.items.length}</span>
          </div>
          <div className="bg-[#111728] p-4 rounded-2xl border border-white/5 shadow-md">
            <span className="text-[11px] text-slate-400 block mb-1 uppercase font-semibold">Tempo Total</span>
            <span className="text-2xl font-black text-emerald-400">{workout.estimatedMinutes} min</span>
          </div>
        </div>

        <button
          onClick={onFinish}
          className="w-full max-w-xs py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white font-extrabold text-base shadow-xl shadow-orange-500/30 active:scale-95 transition-all"
        >
          Salvar no Progresso dos 28 Dias
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080b14] text-white flex flex-col justify-between p-4 safe-area-inset max-w-lg mx-auto">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between mb-3 pt-2">
          <button
            onClick={onExit}
            className="p-2.5 rounded-2xl bg-[#12192b] text-slate-300 hover:text-white border border-white/5 active:scale-90 transition-transform"
            aria-label="Sair do treino"
          >
            <X size={20} />
          </button>

          <div className="text-center">
            <span className="text-[11px] font-extrabold text-orange-400 uppercase tracking-widest block">
              Dia {workout.dayNumber} • {workout.focus}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Série {currentIndex + 1} de {workout.items.length}
            </span>
          </div>

          <div className="p-2.5 rounded-2xl bg-[#12192b] text-emerald-400 border border-white/5">
            <Volume2 size={20} />
          </div>
        </div>

        {/* Linha de Progresso Global do Treino */}
        <div className="w-full h-2 bg-slate-800/60 rounded-full overflow-hidden p-0.5 border border-white/5">
          <div
            className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-400 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Área Central Interativa */}
      <div className="flex-1 flex flex-col items-center justify-center my-3">
        {state === 'prepare' && (
          <div className="text-center flex flex-col items-center">
            <span className="text-xs font-black tracking-widest text-orange-400 uppercase px-3 py-1 bg-orange-500/10 rounded-full border border-orange-500/20 mb-3">
              Prepare-se
            </span>
            <h2 className="text-2xl font-black mb-6 text-white">{currentExercise?.name}</h2>

            <div className="relative w-44 h-44 flex items-center justify-center rounded-full bg-[#111728] border-4 border-orange-500/30 shadow-2xl shadow-orange-500/20 my-4">
              <span className="text-8xl font-black text-white font-mono tracking-tighter animate-pulse">
                {timeLeft}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2">Posicione-se no solo...</p>
          </div>
        )}

        {state === 'active' && currentExercise && (
          <div className="w-full flex flex-col items-center">
            {/* Visualizador Anatômico e Animação Cinemática Lado a Lado */}
            <div className="grid grid-cols-2 gap-3 w-full mb-3">
              <ExerciseAnimation
                animationType={currentExercise.animationType}
                isPaused={isPaused}
                className="!h-64"
              />
              <AnatomyViewer
                primaryMuscles={currentExercise.primaryMuscles}
                secondaryMuscles={currentExercise.secondaryMuscles}
                className="!h-64"
              />
            </div>

            <div className="text-center mb-4">
              <h2 className="text-xl font-black tracking-tight text-white mb-0.5">{currentExercise.name}</h2>
              <p className="text-xs text-slate-400 max-w-sm line-clamp-1">
                {currentExercise.description}
              </p>
            </div>

            {/* Display do Timer Esportivo */}
            <div className="relative w-36 h-36 flex flex-col items-center justify-center rounded-full bg-[#111728] border-4 border-orange-500/20 shadow-2xl shadow-orange-500/15">
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="72"
                  cy="72"
                  r="65"
                  stroke="#f97316"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray="408"
                  strokeDashoffset={408 - (408 * timerPercent) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
              </svg>
              <span className="text-4xl font-black font-mono tracking-tight text-white">{timeLeft}s</span>
              <span className="text-[9px] text-orange-400 font-extrabold uppercase tracking-widest">Ativo</span>
            </div>
          </div>
        )}

        {state === 'rest' && (
          <div className="text-center w-full max-w-sm flex flex-col items-center">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20 mb-3">
              Recuperação Ativa
            </span>
            <div className="text-7xl font-black font-mono my-2 text-emerald-400 tracking-tight">
              {timeLeft}s
            </div>
            <p className="text-xs text-slate-400 mb-6">Respire fundo e prepare os músculos</p>

            {nextExercise && (
              <div className="bg-[#111728] p-4 rounded-3xl border border-white/10 text-left w-full shadow-xl">
                <span className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider block mb-1">
                  Próximo Movimento:
                </span>
                <span className="text-base font-bold text-white block">{nextExercise.name}</span>
                <span className="text-xs text-orange-400 font-medium block mt-1">
                  Duração: {nextItem?.durationSeconds} segundos
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Controles Inferiores */}
      <div className="flex items-center justify-center gap-6 pb-2">
        <button
          onClick={togglePause}
          className="w-16 h-16 rounded-3xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white flex items-center justify-center shadow-2xl shadow-orange-500/30 active:scale-90 transition-all"
          aria-label={isPaused ? 'Continuar' : 'Pausar'}
        >
          {isPaused ? <Play size={28} className="translate-x-0.5" fill="currentColor" /> : <Pause size={28} fill="currentColor" />}
        </button>

        <button
          onClick={handleSkip}
          className="p-4 rounded-2xl bg-[#111728] text-slate-300 hover:text-white border border-white/5 active:scale-90 transition-transform"
          title="Pular para próximo"
        >
          <SkipForward size={22} />
        </button>
      </div>
    </div>
  );
}

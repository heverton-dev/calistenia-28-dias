import { useState, useEffect, useRef } from 'react';
import { WorkoutDay, AppSettings } from '../types/workout';
import { getExerciseById } from '../data/exercises';
import { AnatomyViewer } from './AnatomyViewer';
import { ExerciseAnimation } from './ExerciseAnimation';
import { getNextStep, PlayerState, calculateWorkoutProgress } from './playerEngine';
import { playCountdownBeep, playTransitionBell } from '../utils/sound';
import { useWakeLock } from '../hooks/useWakeLock';
import { Play, Pause, SkipForward, X, CheckCircle, Volume2, VolumeX, Activity, Layers, Columns } from 'lucide-react';

interface WorkoutPlayerProps {
  workout: WorkoutDay;
  settings?: AppSettings;
  onFinish: () => void;
  onExit: () => void;
}

export function WorkoutPlayer({ workout, settings, onFinish, onExit }: WorkoutPlayerProps) {
  const initialPrep = settings?.prepTimeSeconds || 5;
  const isSoundOn = settings ? settings.soundEnabled : true;

  const [state, setState] = useState<PlayerState>('prepare');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(initialPrep);
  const [totalTimeLeft, setTotalTimeLeft] = useState(initialPrep);
  const [isPaused, setIsPaused] = useState(false);
  const [playerTab, setPlayerTab] = useState<'anim' | 'anatomy' | 'split'>('anim');

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
        // Tocar bip nos 3 segundos finais se habilitado
        if (isSoundOn && prev <= 4 && prev > 1) {
          playCountdownBeep(prev - 1);
        }

        if (prev <= 1) {
          if (isSoundOn) playTransitionBell();
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
  const isFinalThreeSeconds = state === 'active' && timeLeft <= 3 && timeLeft > 0;

  if (state === 'completed') {
    return (
      <div className="min-h-screen bg-[#080b14] text-white flex flex-col items-center justify-center p-6 text-center select-none">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/10 text-emerald-400 flex items-center justify-center mb-5 border border-emerald-500/30 shadow-2xl shadow-emerald-500/20">
          <CheckCircle size={48} className="animate-pulse" />
        </div>
        <span className="text-xs font-black tracking-widest text-emerald-400 uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 mb-2 whitespace-nowrap">
          Missão Cumprida
        </span>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">Treino Finalizado!</h1>
        <p className="text-slate-400 max-w-sm mb-6 text-xs sm:text-sm">
          Você concluiu com maestria o <span className="text-white font-semibold">{workout.title}</span> (Dia {workout.dayNumber} do Desafio).
        </p>

        <div className="grid grid-cols-2 gap-3 w-full max-w-xs mb-6">
          <div className="bg-[#111728] p-3.5 rounded-2xl border border-white/5 shadow-md">
            <span className="text-[10px] text-slate-400 block mb-1 uppercase font-bold whitespace-nowrap">Exercícios</span>
            <span className="text-2xl font-black text-orange-400">{workout.items.length}</span>
          </div>
          <div className="bg-[#111728] p-3.5 rounded-2xl border border-white/5 shadow-md">
            <span className="text-[10px] text-slate-400 block mb-1 uppercase font-bold whitespace-nowrap">Tempo Total</span>
            <span className="text-2xl font-black text-emerald-400">{workout.estimatedMinutes} min</span>
          </div>
        </div>

        <button
          onClick={onFinish}
          className="w-full max-w-xs py-3.5 px-6 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white font-extrabold text-sm shadow-xl shadow-orange-500/30 active:scale-95 transition-all"
        >
          Salvar no Progresso dos 28 Dias
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-h-screen bg-[#080b14] text-white flex flex-col justify-between p-3.5 safe-area-inset max-w-lg mx-auto overflow-hidden select-none">
      {/* Top Header - Sem quebra de linha */}
      <div className="shrink-0">
        <div className="flex items-center justify-between mb-2 pt-1 flex-nowrap gap-2">
          <button
            onClick={onExit}
            className="p-2 rounded-2xl bg-[#12192b] text-slate-300 hover:text-white border border-white/5 active:scale-90 transition-transform shrink-0"
            aria-label="Sair do treino"
          >
            <X size={18} />
          </button>

          <div className="text-center min-w-0 flex-1 px-1">
            <span className="text-[10px] font-extrabold text-orange-400 uppercase tracking-widest block whitespace-nowrap truncate">
              Dia {workout.dayNumber} • {workout.focus}
            </span>
            <span className="text-[11px] text-slate-400 font-medium block whitespace-nowrap truncate">
              Série {currentIndex + 1} de {workout.items.length}
            </span>
          </div>

          <div className="p-2 rounded-2xl bg-[#12192b] border border-white/5 shrink-0">
            {isSoundOn ? (
              <Volume2 size={18} className="text-emerald-400" />
            ) : (
              <VolumeX size={18} className="text-slate-500" />
            )}
          </div>
        </div>

        {/* Linha de Progresso Global do Treino */}
        <div className="w-full h-1.5 bg-slate-800/60 rounded-full overflow-hidden p-0.5 border border-white/5">
          <div
            className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-400 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Área Central Interativa: Flexível, sem estourar e sem cortar o timer */}
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center py-2 overflow-y-auto no-scrollbar">
        {state === 'prepare' && (
          <div className="text-center flex flex-col items-center my-auto">
            <span className="text-[10px] font-black tracking-widest text-orange-400 uppercase px-3 py-1 bg-orange-500/10 rounded-full border border-orange-500/20 mb-3 whitespace-nowrap">
              Prepare-se
            </span>
            <h2 className="text-xl sm:text-2xl font-black mb-4 text-white line-clamp-1">{currentExercise?.name}</h2>

            <div className="relative w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center rounded-full bg-[#111728] border-4 border-orange-500/30 shadow-2xl shadow-orange-500/20 my-2 shrink-0">
              <span className="text-7xl font-black text-white font-mono tracking-tighter animate-pulse">
                {timeLeft}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2">Posicione-se no solo...</p>
          </div>
        )}

        {state === 'active' && currentExercise && (
          <div className="w-full flex flex-col items-center justify-center my-auto">
            {/* Seletor de Visão Compacto no Player - 1 Linha Obrigatória */}
            <div className="flex items-center justify-between w-full max-w-sm mb-2 px-1 flex-nowrap gap-2 shrink-0">
              <div className="flex items-center gap-1 bg-[#101728] p-1 rounded-2xl border border-white/5 flex-nowrap shrink-0">
                <button
                  onClick={() => setPlayerTab('anim')}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-extrabold flex items-center gap-1 transition-all whitespace-nowrap shrink-0 ${
                    playerTab === 'anim'
                      ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Activity size={12} />
                  Biomecânica
                </button>
                <button
                  onClick={() => setPlayerTab('anatomy')}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-extrabold flex items-center gap-1 transition-all whitespace-nowrap shrink-0 ${
                    playerTab === 'anatomy'
                      ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Layers size={12} />
                  Músculos
                </button>
              </div>

              <button
                onClick={() => setPlayerTab('split')}
                className={`p-1.5 rounded-xl border border-white/5 transition-all shrink-0 ${
                  playerTab === 'split'
                    ? 'bg-orange-500/20 text-orange-400 border-orange-500/40'
                    : 'text-slate-500 hover:text-slate-300 bg-[#101728]'
                }`}
                title="Lado a Lado"
              >
                <Columns size={15} />
              </button>
            </div>

            {/* Palco do Atleta ou Anatomia Enquadrado com precisão */}
            <div className="w-full mb-2 shrink min-h-0">
              {playerTab === 'anim' && (
                <ExerciseAnimation
                  animationType={currentExercise.animationType}
                  isPaused={isPaused}
                  className="h-44 sm:h-56 w-full"
                />
              )}

              {playerTab === 'anatomy' && (
                <AnatomyViewer
                  primaryMuscles={currentExercise.primaryMuscles}
                  secondaryMuscles={currentExercise.secondaryMuscles}
                  className="h-44 sm:h-56 w-full"
                />
              )}

              {playerTab === 'split' && (
                <div className="grid grid-cols-2 gap-2">
                  <ExerciseAnimation
                    animationType={currentExercise.animationType}
                    isPaused={isPaused}
                    className="h-44"
                  />
                  <AnatomyViewer
                    primaryMuscles={currentExercise.primaryMuscles}
                    secondaryMuscles={currentExercise.secondaryMuscles}
                    className="h-44"
                  />
                </div>
              )}
            </div>

            <div className="text-center mb-2 shrink-0">
              <h2 className="text-base sm:text-lg font-black tracking-tight text-white mb-0.5 line-clamp-1">
                {currentExercise.name}
              </h2>
              <p className="text-[11px] text-slate-400 max-w-sm line-clamp-1">
                {currentExercise.description}
              </p>
            </div>

            {/* Display do Timer Esportivo com Pulso Leve nos 3s Finais */}
            <div
              className={`relative w-28 h-28 sm:w-32 sm:h-32 flex flex-col items-center justify-center rounded-full bg-[#111728] border-4 transition-all duration-300 shrink-0 ${
                isFinalThreeSeconds
                  ? 'border-orange-500 timer-subtle-pulse shadow-orange-500/40'
                  : 'border-orange-500/20 shadow-2xl shadow-orange-500/15'
              }`}
            >
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r="50"
                  stroke={isFinalThreeSeconds ? '#f97316' : '#ea580c'}
                  strokeWidth="5"
                  fill="none"
                  strokeDasharray="314"
                  strokeDashoffset={314 - (314 * timerPercent) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
              </svg>
              <span
                className={`text-3xl sm:text-4xl font-black font-mono tracking-tight transition-transform duration-300 ${
                  isFinalThreeSeconds ? 'scale-110 text-orange-400 animate-pulse' : 'text-white'
                }`}
              >
                {timeLeft}s
              </span>
              <span className="text-[8px] sm:text-[9px] text-orange-400 font-extrabold uppercase tracking-widest whitespace-nowrap">
                {isFinalThreeSeconds ? 'Finalizando!' : 'Ativo'}
              </span>
            </div>
          </div>
        )}

        {state === 'rest' && (
          <div className="text-center w-full max-w-sm flex flex-col items-center my-auto">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20 mb-2 whitespace-nowrap">
              Recuperação Ativa
            </span>
            <div className="text-6xl sm:text-7xl font-black font-mono my-2 text-emerald-400 tracking-tight shrink-0">
              {timeLeft}s
            </div>
            <p className="text-xs text-slate-400 mb-4">Respire fundo e prepare os músculos</p>

            {nextExercise && (
              <div className="bg-[#111728] p-3.5 rounded-3xl border border-white/10 text-left w-full shadow-xl">
                <span className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider block mb-0.5 whitespace-nowrap">
                  Próximo Movimento:
                </span>
                <span className="text-sm sm:text-base font-bold text-white block truncate">{nextExercise.name}</span>
                <span className="text-[11px] text-orange-400 font-medium block mt-0.5 whitespace-nowrap">
                  Duração: {nextItem?.durationSeconds} segundos
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Controles Inferiores - Garantido Shrink-0 (Nunca Corta) */}
      <div className="flex items-center justify-center gap-6 pt-2 pb-1 shrink-0">
        <button
          onClick={togglePause}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white flex items-center justify-center shadow-2xl shadow-orange-500/30 active:scale-90 transition-all shrink-0"
          aria-label={isPaused ? 'Continuar' : 'Pausar'}
        >
          {isPaused ? <Play size={26} className="translate-x-0.5" fill="currentColor" /> : <Pause size={26} fill="currentColor" />}
        </button>

        <button
          onClick={handleSkip}
          className="p-3.5 sm:p-4 rounded-2xl bg-[#111728] text-slate-300 hover:text-white border border-white/5 active:scale-90 transition-transform shrink-0"
          title="Pular para próximo"
        >
          <SkipForward size={20} />
        </button>
      </div>
    </div>
  );
}

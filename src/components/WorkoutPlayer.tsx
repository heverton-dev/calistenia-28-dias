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
      <div className="h-[100dvh] max-h-[100dvh] bg-[#080b14] text-white flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
        <div className="w-20 h-20 rounded-3xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/30 shadow-2xl shadow-emerald-500/20 shrink-0">
          <CheckCircle size={44} className="animate-pulse" />
        </div>
        <span className="text-[10px] font-black tracking-widest text-emerald-400 uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 mb-2 whitespace-nowrap shrink-0">
          Missão Cumprida
        </span>
        <h1 className="text-2xl font-black tracking-tight mb-1.5 shrink-0">Treino Finalizado!</h1>
        <p className="text-slate-400 max-w-sm mb-5 text-xs shrink-0">
          Você concluiu com maestria o <span className="text-white font-semibold">{workout.title}</span> (Dia {workout.dayNumber} do Desafio).
        </p>

        <div className="grid grid-cols-2 gap-3 w-full max-w-xs mb-6 shrink-0">
          <div className="bg-[#111728] p-3 rounded-2xl border border-white/5 shadow-md">
            <span className="text-[10px] text-slate-400 block mb-0.5 uppercase font-bold whitespace-nowrap">Exercícios</span>
            <span className="text-xl font-black text-theme">{workout.items.length}</span>
          </div>
          <div className="bg-[#111728] p-3 rounded-2xl border border-white/5 shadow-md">
            <span className="text-[10px] text-slate-400 block mb-0.5 uppercase font-bold whitespace-nowrap">Tempo Total</span>
            <span className="text-xl font-black text-emerald-400">{workout.estimatedMinutes} min</span>
          </div>
        </div>

        <button
          onClick={onFinish}
          className="w-full max-w-xs py-3.5 px-6 rounded-2xl bg-theme-gradient text-white font-extrabold text-sm shadow-theme active:scale-95 transition-all shrink-0"
        >
          Salvar no Progresso dos 28 Dias
        </button>
      </div>
    );
  }

  return (
    <div className="h-[100dvh] max-h-[100dvh] bg-[#080b14] text-white flex flex-col justify-between p-3 safe-area-inset max-w-lg mx-auto overflow-hidden select-none">
      {/* 1. TOP HEADER (Altura Fixa - Shrink-0) */}
      <div className="shrink-0 mb-1">
        <div className="flex items-center justify-between mb-1.5 pt-0.5 flex-nowrap gap-2">
          <button
            onClick={onExit}
            className="p-2 rounded-2xl bg-[#12192b] text-slate-300 hover:text-white border border-white/5 active:scale-90 transition-transform shrink-0"
            aria-label="Sair do treino"
          >
            <X size={18} />
          </button>

          <div className="text-center min-w-0 flex-1 px-1">
            <span className="text-[10px] font-extrabold text-theme uppercase tracking-widest block whitespace-nowrap truncate">
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
            className="h-full bg-theme-gradient transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 2. ÁREA CENTRAL DINÂMICA (Adapta-se à tela sem nunca empurrar os botões) */}
      <div className="flex-1 min-h-0 flex flex-col items-center justify-between py-1 overflow-y-auto no-scrollbar">
        {state === 'prepare' && (
          <div className="text-center flex flex-col items-center justify-center my-auto">
            <span className="text-[10px] font-black tracking-widest text-theme uppercase px-3 py-1 bg-theme-subtle rounded-full border border-theme-subtle mb-2 whitespace-nowrap">
              Prepare-se
            </span>
            <h2 className="text-lg sm:text-xl font-black mb-3 text-white line-clamp-1">{currentExercise?.name}</h2>

            <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center rounded-full bg-[#111728] border-4 border-theme-subtle shadow-theme my-2 shrink-0">
              <span className="text-6xl sm:text-7xl font-black text-white font-mono tracking-tighter animate-pulse">
                {timeLeft}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2">Posicione-se no solo...</p>
          </div>
        )}

        {state === 'active' && currentExercise && (
          <div className="w-full h-full flex flex-col items-center justify-between">
            {/* Seletor de Visão Compacto - 1 Linha Obrigatória */}
            <div className="flex items-center justify-between w-full max-w-sm mb-1 px-1 flex-nowrap gap-2 shrink-0">
              <div className="flex items-center gap-1 bg-[#101728] p-0.5 rounded-2xl border border-white/5 flex-nowrap shrink-0">
                <button
                  onClick={() => setPlayerTab('anim')}
                  className={`px-2.5 py-1 rounded-xl text-[10px] font-extrabold flex items-center gap-1 transition-all whitespace-nowrap shrink-0 ${
                    playerTab === 'anim'
                      ? 'bg-theme text-white shadow-theme'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Activity size={11} />
                  Biomecânica
                </button>
                <button
                  onClick={() => setPlayerTab('anatomy')}
                  className={`px-2.5 py-1 rounded-xl text-[10px] font-extrabold flex items-center gap-1 transition-all whitespace-nowrap shrink-0 ${
                    playerTab === 'anatomy'
                      ? 'bg-theme text-white shadow-theme'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Layers size={11} />
                  Músculos
                </button>
              </div>

              <button
                onClick={() => setPlayerTab('split')}
                className={`p-1 rounded-xl border border-white/5 transition-all shrink-0 ${
                  playerTab === 'split'
                    ? 'bg-theme-subtle text-theme border-theme-subtle'
                    : 'text-slate-500 hover:text-slate-300 bg-[#101728]'
                }`}
                title="Lado a Lado"
              >
                <Columns size={14} />
              </button>
            </div>

            {/* Palco do Atleta ou Anatomia - Altura Dinâmica Inteligente */}
            <div className="w-full shrink min-h-0 flex-1 max-h-[38vh] flex items-center justify-center my-0.5">
              {playerTab === 'anim' && (
                <ExerciseAnimation
                  exerciseId={currentExercise.id}
                  animationType={currentExercise.animationType}
                  isPaused={isPaused}
                  className="h-full w-full max-h-[36vh]"
                />
              )}

              {playerTab === 'anatomy' && (
                <AnatomyViewer
                  primaryMuscles={currentExercise.primaryMuscles}
                  secondaryMuscles={currentExercise.secondaryMuscles}
                  className="h-full w-full max-h-[36vh]"
                />
              )}

              {playerTab === 'split' && (
                <div className="grid grid-cols-2 gap-2 w-full h-full max-h-[36vh]">
                  <ExerciseAnimation
                    exerciseId={currentExercise.id}
                    animationType={currentExercise.animationType}
                    isPaused={isPaused}
                    className="h-full"
                  />
                  <AnatomyViewer
                    primaryMuscles={currentExercise.primaryMuscles}
                    secondaryMuscles={currentExercise.secondaryMuscles}
                    className="h-full"
                  />
                </div>
              )}
            </div>

            {/* Nome e Descrição do Exercício */}
            <div className="text-center my-0.5 shrink-0 px-2">
              <h2 className="text-sm sm:text-base font-black tracking-tight text-white line-clamp-1">
                {currentExercise.name}
              </h2>
              <p className="text-[10px] text-slate-400 max-w-sm line-clamp-1">
                {currentExercise.description}
              </p>
            </div>

            {/* Display do Timer Esportivo com Pulso nos 3s Finais */}
            <div
              className={`relative w-24 h-24 sm:w-28 sm:h-28 flex flex-col items-center justify-center rounded-full bg-[#111728] border-4 transition-all duration-300 shrink-0 my-1 ${
                isFinalThreeSeconds
                  ? 'border-theme timer-subtle-pulse'
                  : 'border-white/10 shadow-lg'
              }`}
            >
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="42"
                  stroke="var(--theme-color)"
                  strokeWidth="4.5"
                  fill="none"
                  strokeDasharray="264"
                  strokeDashoffset={264 - (264 * timerPercent) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
              </svg>
              <span
                className={`text-2xl sm:text-3xl font-black font-mono tracking-tight transition-transform duration-300 ${
                  isFinalThreeSeconds ? 'scale-110 text-theme animate-pulse' : 'text-white'
                }`}
              >
                {timeLeft}s
              </span>
              <span className="text-[8px] text-theme font-extrabold uppercase tracking-widest whitespace-nowrap">
                {isFinalThreeSeconds ? 'Finalizando!' : 'Ativo'}
              </span>
            </div>
          </div>
        )}

        {state === 'rest' && (
          <div className="text-center w-full max-w-sm flex flex-col items-center justify-center my-auto">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20 mb-2 whitespace-nowrap">
              Recuperação Ativa
            </span>
            <div className="text-5xl sm:text-6xl font-black font-mono my-2 text-emerald-400 tracking-tight shrink-0">
              {timeLeft}s
            </div>
            <p className="text-xs text-slate-400 mb-3">Respire fundo e prepare os músculos</p>

            {nextExercise && (
              <div className="bg-[#111728] p-3 rounded-2xl border border-white/10 text-left w-full shadow-lg">
                <span className="text-[9px] text-slate-400 uppercase font-extrabold tracking-wider block mb-0.5 whitespace-nowrap">
                  Próximo Movimento:
                </span>
                <span className="text-sm font-bold text-white block truncate">{nextExercise.name}</span>
                <span className="text-[10px] text-theme font-medium block mt-0.5 whitespace-nowrap">
                  Duração: {nextItem?.durationSeconds} segundos
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. CONTROLES INFERIORES: BLINDADOS CONTRA CORTE (Shrink-0 com padding inferior) */}
      <div className="flex items-center justify-center gap-6 pt-1 pb-2 shrink-0">
        <button
          onClick={togglePause}
          className="w-14 h-14 rounded-2xl bg-theme-gradient text-white flex items-center justify-center shadow-theme active:scale-90 transition-all shrink-0"
          aria-label={isPaused ? 'Continuar' : 'Pausar'}
        >
          {isPaused ? <Play size={24} className="translate-x-0.5" fill="currentColor" /> : <Pause size={24} fill="currentColor" />}
        </button>

        <button
          onClick={handleSkip}
          className="p-3.5 rounded-2xl bg-[#111728] text-slate-300 hover:text-white border border-white/5 active:scale-90 transition-transform shrink-0"
          title="Pular para próximo"
        >
          <SkipForward size={18} />
        </button>
      </div>
    </div>
  );
}

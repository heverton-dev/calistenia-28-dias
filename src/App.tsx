import { useState, useEffect } from 'react';
import { CHALLENGE_28_DAYS } from './data/challenge28';
import { WorkoutDay, UserProgress } from './types/workout';
import { loadProgress, saveCompletedDay, resetProgress } from './utils/storage';
import { groupDaysByWeek, getNextAvailableDay } from './utils/challengeUtils';
import { DayCard } from './components/DayCard';
import { ExerciseModal } from './components/ExerciseModal';
import { WorkoutPlayer } from './components/WorkoutPlayer';
import { Flame, Trophy, Play, RotateCcw, Smartphone, Dumbbell, ShieldCheck } from 'lucide-react';

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(loadProgress());
  const [activeWorkout, setActiveWorkout] = useState<WorkoutDay | null>(null);
  const [inspectingDay, setInspectingDay] = useState<WorkoutDay | null>(null);

  const [selectedWeek, setSelectedWeek] = useState<number | 'all'>('all');

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const nextDay = getNextAvailableDay(progress.completedDays, CHALLENGE_28_DAYS);
  const weekGroups = groupDaysByWeek(CHALLENGE_28_DAYS);
  const completionPercentage = Math.round((progress.completedDays.length / 28) * 100);

  const displayedWeeks = selectedWeek === 'all'
    ? weekGroups
    : weekGroups.filter(w => w.weekNumber === selectedWeek);

  const handleStartWorkout = (day: WorkoutDay) => {
    setInspectingDay(null);
    setActiveWorkout(day);
  };

  const handleFinishWorkout = () => {
    if (activeWorkout) {
      const updated = saveCompletedDay(activeWorkout.dayNumber);
      setProgress(updated);
      setActiveWorkout(null);
    }
  };

  const handleReset = () => {
    if (window.confirm('Deseja reiniciar todo o seu progresso do Desafio de 28 Dias?')) {
      resetProgress();
      setProgress(loadProgress());
    }
  };

  if (activeWorkout) {
    return (
      <WorkoutPlayer
        workout={activeWorkout}
        onFinish={handleFinishWorkout}
        onExit={() => setActiveWorkout(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#080b14] text-white flex flex-col items-center pb-14 selection:bg-orange-500 selection:text-white">
      {/* Background Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-72 bg-gradient-to-b from-orange-600/15 via-transparent to-transparent pointer-events-none" />

      {/* Main Container */}
      <main className="w-full max-w-md px-4 pt-4 z-10">
        {/* Header Superior Esportivo */}
        <header className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white flex items-center justify-center font-black shadow-lg shadow-orange-500/25">
              <Dumbbell size={20} />
            </div>
            <div>
              <h1 className="text-base font-black tracking-tight leading-none">Calistenia 28D</h1>
              <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                <Smartphone size={11} /> 100% Offline
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Streak Contador */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-[#111728] border border-white/10 shadow-md">
              <Flame size={16} className="text-orange-500 fill-orange-500 animate-pulse" />
              <span className="text-xs font-black font-mono tracking-tight text-white">{progress.currentStreak} dias</span>
            </div>

            <button
              onClick={handleReset}
              className="p-2.5 rounded-2xl bg-[#111728] text-slate-400 hover:text-white border border-white/5 active:scale-90 transition-transform"
              title="Reiniciar Desafio"
              aria-label="Reiniciar Desafio"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </header>

        {/* Card Principal: Treino Recomendado de Hoje (Estilo BetterMe Pro) */}
        <section className="relative overflow-hidden p-6 rounded-3xl bg-gradient-to-br from-[#141d33] via-[#101728] to-[#0c1220] border border-orange-500/30 shadow-2xl shadow-orange-500/10 mb-6">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-orange-400 bg-orange-500/15 border border-orange-500/30 px-3 py-1 rounded-full">
                Treino de Hoje
              </span>
              <span className="text-xs text-slate-400 font-mono font-bold">
                {nextDay.estimatedMinutes} min
              </span>
            </div>

            <h2 className="text-2xl font-black tracking-tight text-white mb-1">
              Dia {nextDay.dayNumber}: {nextDay.title}
            </h2>
            <p className="text-xs text-slate-400 mb-5">
              Foco: <span className="text-orange-300 font-semibold">{nextDay.focus}</span> • {nextDay.items.length} séries guiadas
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleStartWorkout(nextDay)}
                className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-orange-500/30 active:scale-95 transition-all"
              >
                <Play size={18} fill="currentColor" />
                Iniciar Treino
              </button>
              <button
                onClick={() => setInspectingDay(nextDay)}
                className="py-4 px-4 rounded-2xl bg-[#1b253d] text-white font-bold text-xs hover:bg-[#222f4d] border border-white/5 transition-colors"
              >
                Anatomia & Detalhes
              </button>
            </div>
          </div>
        </section>

        {/* Progresso do Desafio de 28 Dias */}
        <section className="bg-[#111728] p-4 rounded-3xl border border-white/5 mb-6 shadow-md">
          <div className="flex items-center justify-between text-xs mb-2.5">
            <span className="text-slate-300 flex items-center gap-1.5 font-bold">
              <Trophy size={15} className="text-amber-400" />
              Desafio dos 28 Dias
            </span>
            <span className="font-mono font-extrabold text-orange-400">
              {progress.completedDays.length} de 28 Dias ({completionPercentage}%)
            </span>
          </div>

          <div className="w-full h-2.5 bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-400 transition-all duration-700 rounded-full"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </section>

        {/* Filtro em Pills de Semanas (Padrão Mobbin / Fitbod) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-4 scrollbar-none no-scrollbar">
          <button
            onClick={() => setSelectedWeek('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedWeek === 'all'
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                : 'bg-[#111728] text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            Todas as Semanas
          </button>
          {[1, 2, 3, 4].map(w => (
            <button
              key={w}
              onClick={() => setSelectedWeek(w)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedWeek === w
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                  : 'bg-[#111728] text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              Semana {w}
            </button>
          ))}
        </div>

        {/* Grade de Semanas e Dias */}
        <section className="space-y-6">
          {displayedWeeks.map(week => (
            <div key={week.weekNumber} className="space-y-2.5">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  {week.title}
                </h3>
                <span className="text-[11px] text-slate-500 font-mono font-bold">
                  {week.days.filter(d => progress.completedDays.includes(d.dayNumber)).length}/7 concluídos
                </span>
              </div>

              <div className="space-y-2">
                {week.days.map(day => (
                  <DayCard
                    key={day.dayNumber}
                    day={day}
                    isCompleted={progress.completedDays.includes(day.dayNumber)}
                    isCurrent={nextDay.dayNumber === day.dayNumber}
                    onClick={() => setInspectingDay(day)}
                  />
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Rodapé Informativo */}
        <footer className="mt-12 text-center text-xs text-slate-500 space-y-1.5">
          <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 font-medium">
            <ShieldCheck size={14} className="text-emerald-400" />
            100% Código Aberto • Sem Servidor • Dados Seguros no Dispositivo
          </div>
          <p className="text-[10px] text-slate-600">
            Adicione à Tela de Início no Safari (iOS) ou Chrome (Android) para treinar offline
          </p>
        </footer>
      </main>

      {/* Modal de Detalhes do Dia e Exercício */}
      {inspectingDay && (
        <ExerciseModal
          day={inspectingDay}
          isCompleted={progress.completedDays.includes(inspectingDay.dayNumber)}
          onClose={() => setInspectingDay(null)}
          onStart={handleStartWorkout}
        />
      )}
    </div>
  );
}

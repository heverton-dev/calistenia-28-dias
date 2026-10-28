import { useState, useEffect } from 'react';
import { CHALLENGE_28_DAYS } from './data/challenge28';
import { WorkoutDay, UserProgress } from './types/workout';
import { loadProgress, saveCompletedDay, resetProgress } from './utils/storage';
import { groupDaysByWeek, getNextAvailableDay } from './utils/challengeUtils';
import { DayCard } from './components/DayCard';
import { ExerciseModal } from './components/ExerciseModal';
import { WorkoutPlayer } from './components/WorkoutPlayer';
import { Flame, Trophy, Play, RotateCcw, Smartphone } from 'lucide-react';

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(loadProgress());
  const [activeWorkout, setActiveWorkout] = useState<WorkoutDay | null>(null);
  const [inspectingDay, setInspectingDay] = useState<WorkoutDay | null>(null);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const nextDay = getNextAvailableDay(progress.completedDays, CHALLENGE_28_DAYS);
  const weekGroups = groupDaysByWeek(CHALLENGE_28_DAYS);
  const completionPercentage = Math.round((progress.completedDays.length / 28) * 100);

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
    if (window.confirm('Deseja reiniciar todo o progresso do desafio de 28 dias?')) {
      resetProgress();
      setProgress(loadProgress());
    }
  };

  // Se estiver com treino ativo, exibe o player em tela cheia
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
    <div className="min-h-screen bg-[#090d16] text-white flex flex-col items-center pb-12">
      {/* Container Responsivo Mobile/Tablet */}
      <main className="w-full max-w-md px-4 pt-6">
        {/* Barra Superior */}
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-black border border-orange-500/30">
              C28
            </div>
            <div>
              <h1 className="text-base font-extrabold tracking-tight">Calistenia 28D</h1>
              <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                <Smartphone size={10} /> 100% Offline Ready
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Streak */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#131b2e] border border-white/5">
              <Flame size={16} className="text-orange-500 fill-orange-500 animate-pulse" />
              <span className="text-xs font-bold font-mono">{progress.currentStreak} dias</span>
            </div>

            <button
              onClick={handleReset}
              className="p-2 rounded-xl bg-[#131b2e] text-slate-400 hover:text-white border border-white/5 active:scale-95"
              title="Reiniciar Progresso"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </header>

        {/* Card Destaque: Treino Recomendado de Hoje */}
        <section className="relative overflow-hidden p-5 rounded-3xl bg-gradient-to-br from-orange-600 via-orange-500 to-amber-600 shadow-xl shadow-orange-500/20 mb-6">
          <div className="relative z-10">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-orange-100 bg-black/20 px-2.5 py-1 rounded-full inline-block mb-3">
              Treino Recomendado
            </span>
            <h2 className="text-2xl font-black tracking-tight text-white mb-1">
              Dia {nextDay.dayNumber}: {nextDay.title}
            </h2>
            <p className="text-xs text-orange-100/90 mb-4 line-clamp-1">
              {nextDay.focus} • {nextDay.estimatedMinutes} min • {nextDay.items.length} exercícios
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleStartWorkout(nextDay)}
                className="flex-1 py-3 px-5 rounded-2xl bg-white text-orange-600 font-extrabold text-sm flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform"
              >
                <Play size={16} fill="currentColor" />
                Iniciar Treino
              </button>
              <button
                onClick={() => setInspectingDay(nextDay)}
                className="py-3 px-4 rounded-2xl bg-black/20 text-white font-bold text-sm hover:bg-black/30 transition-colors"
              >
                Ver Detalhes
              </button>
            </div>
          </div>
        </section>

        {/* Barra de Progresso Geral do Desafio */}
        <section className="bg-[#101726] p-4 rounded-2xl border border-white/5 mb-6">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-400 flex items-center gap-1.5 font-medium">
              <Trophy size={14} className="text-amber-400" />
              Progresso do Desafio
            </span>
            <span className="font-bold text-white">
              {progress.completedDays.length} / 28 Dias ({completionPercentage}%)
            </span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-emerald-400 transition-all duration-500 rounded-full"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </section>

        {/* Lista das 4 Semanas e 28 Dias */}
        <section className="space-y-6">
          {weekGroups.map(week => (
            <div key={week.weekNumber} className="space-y-2.5">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {week.title}
                </h3>
                <span className="text-[11px] text-slate-500 font-mono">
                  {week.days.filter(d => progress.completedDays.includes(d.dayNumber)).length}/7
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
        <footer className="mt-10 text-center text-xs text-slate-500 space-y-1">
          <p>Calistenia 28 Dias • 100% Open Source</p>
          <p className="text-[11px] text-slate-600">Sem anúncios • Sem cadastros • Dados no seu aparelho</p>
        </footer>
      </main>

      {/* Modal de Detalhes do Dia */}
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

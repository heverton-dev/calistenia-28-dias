import { useState, useEffect } from 'react';
import { CHALLENGE_28_DAYS } from './data/challenge28';
import { WorkoutDay, UserProgress, WorkoutItem, AppSettings, AppTheme } from './types/workout';
import { loadProgress, saveWorkoutCompletion, saveWeight, saveSettings, saveCustomizedDayItems, resetProgress, saveTheme } from './utils/storage';
import { groupDaysByWeek, getNextAvailableDay } from './utils/challengeUtils';
import { DayCard } from './components/DayCard';
import { ExerciseModal } from './components/ExerciseModal';
import { WorkoutPlayer } from './components/WorkoutPlayer';
import { WeightTracker } from './components/WeightTracker';
import { SettingsModal } from './components/SettingsModal';
import { ThemeSelectorModal } from './components/ThemeSelectorModal';
import { ResetConfirmationModal } from './components/ResetConfirmationModal';
import { Flame, Trophy, Play, RotateCcw, Smartphone, Dumbbell, ShieldCheck, Sliders, Palette, Check } from 'lucide-react';

const QUICK_THEMES: { id: AppTheme; hex: string; label: string }[] = [
  { id: 'orange', hex: '#f97316', label: 'Laranja' },
  { id: 'yellow', hex: '#eab308', label: 'Amarelo' },
  { id: 'pink', hex: '#ec4899', label: 'Rosa' },
  { id: 'blue', hex: '#0ea5e9', label: 'Azul' },
  { id: 'green', hex: '#10b981', label: 'Verde' }
];

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(loadProgress());
  const [activeWorkout, setActiveWorkout] = useState<WorkoutDay | null>(null);
  const [inspectingDay, setInspectingDay] = useState<WorkoutDay | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState<number | 'all'>('all');

  useEffect(() => {
    const loaded = loadProgress();
    setProgress(loaded);
    const theme = loaded.theme || 'orange';
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  const handleSelectTheme = (newTheme: AppTheme) => {
    saveTheme(newTheme);
    setProgress(prev => ({ ...prev, theme: newTheme }));
  };

  const nextDay = getNextAvailableDay(progress.completedDays, CHALLENGE_28_DAYS);
  const weekGroups = groupDaysByWeek(CHALLENGE_28_DAYS);
  const completionPercentage = Math.round((progress.completedDays.length / 28) * 100);

  const displayedWeeks = selectedWeek === 'all'
    ? weekGroups
    : weekGroups.filter(w => w.weekNumber === selectedWeek);

  const handleStartWorkout = (day: WorkoutDay) => {
    setInspectingDay(null);
    const customized = progress.customizedItems?.[day.dayNumber];
    const finalDay: WorkoutDay = customized ? { ...day, items: customized } : day;
    setActiveWorkout(finalDay);
  };

  const handleFinishWorkout = () => {
    if (activeWorkout) {
      const updated = saveWorkoutCompletion(activeWorkout.dayNumber);
      setProgress(updated);
      setActiveWorkout(null);
    }
  };

  const handleSaveWeight = (weight: number) => {
    const updated = saveWeight(weight);
    setProgress(updated);
  };

  const handleUpdateSettings = (newSettings: Partial<AppSettings>) => {
    const updated = saveSettings(newSettings);
    setProgress(updated);
  };

  const handleUpdateCustomizedItems = (dayNumber: number, items: WorkoutItem[]) => {
    const updated = saveCustomizedDayItems(dayNumber, items);
    setProgress(updated);
  };

  const handleReset = () => {
    resetProgress();
    const fresh = loadProgress();
    setProgress(fresh);
    document.documentElement.setAttribute('data-theme', fresh.theme || 'orange');
  };

  const currentActiveTheme = progress.theme || 'orange';

  if (activeWorkout) {
    return (
      <WorkoutPlayer
        workout={activeWorkout}
        settings={progress.settings}
        onFinish={handleFinishWorkout}
        onExit={() => setActiveWorkout(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#080b14] text-white flex flex-col items-center pb-14 selection:bg-theme selection:text-white select-none">
      {/* Background Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-72 bg-gradient-to-b from-theme-subtle via-transparent to-transparent pointer-events-none" />

      {/* Main Container */}
      <main className="w-full max-w-md px-4 pt-3 z-10">
        {/* Header Superior Esportivo */}
        <header className="flex items-center justify-between mb-3 flex-nowrap gap-2">
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-theme-gradient text-white flex items-center justify-center font-black shadow-theme shrink-0">
              <Dumbbell size={20} />
            </div>
            <div>
              <h1 className="text-base font-black tracking-tight leading-none whitespace-nowrap">Calistenia 28D</h1>
              <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 mt-0.5 whitespace-nowrap">
                <Smartphone size={11} /> 100% Offline
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Streak Contador */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-2xl bg-[#111728] border border-white/10 shadow-md shrink-0">
              <Flame size={15} className="text-orange-500 fill-orange-500 animate-pulse" />
              <span className="text-xs font-black font-mono tracking-tight text-white whitespace-nowrap">{progress.currentStreak} dias</span>
            </div>

            {/* Botão de Paleta Completa */}
            <button
              onClick={() => setShowThemeModal(true)}
              className="p-2.5 rounded-2xl bg-[#111728] text-slate-300 hover:text-white border border-white/5 active:scale-90 transition-transform relative shrink-0"
              title="Paleta de Cores"
              aria-label="Cores"
            >
              <Palette size={15} className="text-theme" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-theme animate-ping" />
            </button>

            {/* Botão de Configurações */}
            <button
              onClick={() => setShowSettings(true)}
              className="p-2.5 rounded-2xl bg-[#111728] text-slate-300 hover:text-white border border-white/5 active:scale-90 transition-transform shrink-0"
              title="Ajustes do Treinador"
              aria-label="Ajustes"
            >
              <Sliders size={15} />
            </button>

            <button
              onClick={() => setShowResetModal(true)}
              className="p-2.5 rounded-2xl bg-[#111728] text-slate-400 hover:text-white border border-white/5 active:scale-90 transition-transform shrink-0"
              title="Reiniciar Desafio"
              aria-label="Reiniciar Desafio"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </header>

        {/* Seletor Rápido de Cores (1 Toque Direto no Dashboard) */}
        <section className="flex items-center justify-between px-3 py-2 mb-3 bg-[#101728] rounded-2xl border border-white/5 flex-nowrap shadow-sm">
          <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5 whitespace-nowrap shrink-0">
            <Palette size={13} className="text-theme" />
            Cor do App:
          </span>
          <div className="flex items-center gap-2 shrink-0">
            {QUICK_THEMES.map(t => {
              const isActive = currentActiveTheme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => handleSelectTheme(t.id)}
                  className={`w-6 h-6 rounded-full transition-all active:scale-90 flex items-center justify-center shrink-0 ${
                    isActive
                      ? 'scale-110 ring-2 ring-white shadow-lg'
                      : 'opacity-65 hover:opacity-100 hover:scale-105'
                  }`}
                  style={{
                    backgroundColor: t.hex,
                    boxShadow: isActive ? `0 0 10px ${t.hex}` : undefined
                  }}
                  title={`Mudar para cor ${t.label}`}
                  aria-label={`Mudar para cor ${t.label}`}
                >
                  {isActive && <Check size={12} className="text-white stroke-[3]" />}
                </button>
              );
            })}
          </div>
        </section>

        {/* Card Principal: Treino Recomendado de Hoje (Estilo BetterMe Pro) */}
        <section className="relative overflow-hidden p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#141d33] via-[#101728] to-[#0c1220] border border-theme-subtle shadow-theme mb-4">
          <div className="absolute top-0 right-0 w-32 h-32 bg-theme-subtle rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2.5 flex-nowrap">
              <span className="text-[10px] font-black uppercase tracking-widest text-theme bg-theme-subtle border border-theme-subtle px-3 py-1 rounded-full whitespace-nowrap">
                Treino de Hoje
              </span>
              <span className="text-xs text-slate-400 font-mono font-bold whitespace-nowrap">
                {nextDay.estimatedMinutes} min
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mb-1 line-clamp-1">
              Dia {nextDay.dayNumber}: {nextDay.title}
            </h2>
            <p className="text-xs text-slate-400 mb-4 line-clamp-1">
              Foco: <span className="text-theme font-bold">{nextDay.focus}</span> • {nextDay.items.length} séries guiadas
            </p>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => handleStartWorkout(nextDay)}
                className="flex-1 py-3.5 px-5 rounded-2xl bg-theme-gradient text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-theme active:scale-95 transition-all whitespace-nowrap"
              >
                <Play size={16} fill="currentColor" />
                Iniciar Treino
              </button>
              <button
                onClick={() => setInspectingDay(nextDay)}
                className="py-3.5 px-3.5 rounded-2xl bg-[#1b253d] text-white font-bold text-xs hover:bg-[#222f4d] border border-white/5 transition-colors whitespace-nowrap"
              >
                Anatomia & Detalhes
              </button>
            </div>
          </div>
        </section>

        {/* Card de Peso Corporal e Evolução (Mobbin / BetterMe) */}
        <section className="mb-4">
          <WeightTracker
            history={progress.weightHistory}
            onSaveWeight={handleSaveWeight}
          />
        </section>

        {/* Progresso do Desafio de 28 Dias */}
        <section className="bg-[#111728] p-4 rounded-3xl border border-white/5 mb-4 shadow-md">
          <div className="flex items-center justify-between text-xs mb-2.5 flex-nowrap">
            <span className="text-slate-300 flex items-center gap-1.5 font-bold whitespace-nowrap">
              <Trophy size={14} className="text-amber-400" />
              Desafio dos 28 Dias
            </span>
            <span className="font-mono font-extrabold text-theme whitespace-nowrap">
              {progress.completedDays.length} de 28 Dias ({completionPercentage}%)
            </span>
          </div>

          <div className="w-full h-2 bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-white/5">
            <div
              className="h-full bg-theme-gradient transition-all duration-700 rounded-full"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </section>

        {/* Filtro em Pills de Semanas - 1 Linha com rolagem sem scrollbar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 mb-3.5 no-scrollbar flex-nowrap">
          <button
            onClick={() => setSelectedWeek('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
              selectedWeek === 'all'
                ? 'bg-theme text-white shadow-theme'
                : 'bg-[#111728] text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            Todas as Semanas
          </button>
          {[1, 2, 3, 4].map(w => (
            <button
              key={w}
              onClick={() => setSelectedWeek(w)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                selectedWeek === w
                  ? 'bg-theme text-white shadow-theme'
                  : 'bg-[#111728] text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              Semana {w}
            </button>
          ))}
        </div>

        {/* Grade de Semanas e Dias */}
        <section className="space-y-4">
          {displayedWeeks.map(week => (
            <div key={week.weekNumber} className="space-y-2">
              <div className="flex items-center justify-between px-1 flex-nowrap">
                <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-theme" />
                  {week.title}
                </h3>
                <span className="text-[10px] text-slate-500 font-mono font-bold whitespace-nowrap">
                  {week.days.filter(d => progress.completedDays.includes(d.dayNumber)).length}/7 concluídos
                </span>
              </div>

              <div className="space-y-1.5">
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
        <footer className="mt-8 text-center text-xs text-slate-500 space-y-1">
          <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 font-medium">
            <ShieldCheck size={13} className="text-emerald-400" />
            100% Código Aberto • Sem Servidor • Dados Seguros no Dispositivo
          </div>
          <p className="text-[9px] text-slate-600">
            Adicione à Tela de Início no Safari (iOS) ou Chrome (Android) para treinar offline
          </p>
        </footer>
      </main>

      {/* Modal de Detalhes do Dia e Exercício */}
      {inspectingDay && (
        <ExerciseModal
          day={inspectingDay}
          customizedItems={progress.customizedItems?.[inspectingDay.dayNumber]}
          onUpdateItems={items => handleUpdateCustomizedItems(inspectingDay.dayNumber, items)}
          isCompleted={progress.completedDays.includes(inspectingDay.dayNumber)}
          onClose={() => setInspectingDay(null)}
          onStart={handleStartWorkout}
        />
      )}

      {/* Modal de Configurações */}
      {showSettings && (
        <SettingsModal
          settings={progress.settings}
          currentTheme={currentActiveTheme}
          onSelectTheme={handleSelectTheme}
          onUpdateSettings={handleUpdateSettings}
          onClose={() => setShowSettings(false)}
        />
      )}

      {/* Modal de Seleção de Cores do Aplicativo */}
      {showThemeModal && (
        <ThemeSelectorModal
          currentTheme={currentActiveTheme}
          onSelectTheme={handleSelectTheme}
          onClose={() => setShowThemeModal(false)}
        />
      )}

      {/* Modal de Confirmação de Reinício Customizado */}
      <ResetConfirmationModal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        onConfirm={handleReset}
      />
    </div>
  );
}

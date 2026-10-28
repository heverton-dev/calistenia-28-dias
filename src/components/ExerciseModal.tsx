import { useState } from 'react';
import { WorkoutDay, WorkoutItem } from '../types/workout';
import { getExerciseById } from '../data/exercises';
import { AnatomyViewer } from './AnatomyViewer';
import { ExerciseAnimation } from './ExerciseAnimation';
import { ExerciseReplacementModal } from './ExerciseReplacementModal';
import { replaceWorkoutItem } from '../utils/challengeUtils';
import { X, Play, Clock, Flame, Dumbbell, RefreshCw, Activity, Layers } from 'lucide-react';

interface ExerciseModalProps {
  day: WorkoutDay;
  customizedItems?: WorkoutItem[];
  onUpdateItems?: (items: WorkoutItem[]) => void;
  onClose: () => void;
  onStart: (day: WorkoutDay) => void;
  isCompleted: boolean;
}

export function ExerciseModal({
  day,
  customizedItems,
  onUpdateItems,
  onClose,
  onStart,
  isCompleted
}: ExerciseModalProps) {
  const currentItems = customizedItems || day.items;
  const [replacingIndex, setReplacingIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<Record<number, 'anim' | 'anatomy' | 'both'>>({});

  const getItemTab = (idx: number) => activeTab[idx] || 'anim';
  const setItemTab = (idx: number, tab: 'anim' | 'anatomy' | 'both') => {
    setActiveTab(prev => ({ ...prev, [idx]: tab }));
  };

  const handleSelectReplacement = (newExerciseId: string) => {
    if (replacingIndex !== null && onUpdateItems) {
      const updated = replaceWorkoutItem(currentItems, replacingIndex, newExerciseId);
      onUpdateItems(updated);
    }
    setReplacingIndex(null);
  };

  const dayToStart: WorkoutDay = {
    ...day,
    items: currentItems
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
        <div className="bg-[#0b101d] w-full max-w-lg max-h-[92vh] rounded-t-3xl sm:rounded-3xl border border-white/10 flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200 shadow-2xl">
          {/* Header */}
          <div className="p-4 border-b border-white/5 flex items-center justify-between bg-[#0e1424]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/30">
                <Dumbbell size={20} />
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-orange-400 uppercase tracking-widest block">
                  Dia {day.dayNumber} • {day.focus}
                </span>
                <h3 className="text-base font-black text-white">{day.title}</h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-2xl bg-[#141c30] text-slate-300 hover:text-white border border-white/5 active:scale-90 transition-transform"
              aria-label="Fechar"
            >
              <X size={18} />
            </button>
          </div>

          {/* Conteúdo com Exercícios e Anatomia */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Métricas rápidas */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#111728] border border-white/5 text-xs text-slate-300">
              <span className="flex items-center gap-1.5 font-bold">
                <Clock size={15} className="text-orange-400" />
                {day.estimatedMinutes} minutos totais
              </span>
              <span className="flex items-center gap-1.5 font-bold">
                <Flame size={15} className="text-red-400" />
                {currentItems.length} séries
              </span>
              {isCompleted && (
                <span className="text-emerald-400 font-extrabold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  ✓ Concluído
                </span>
              )}
            </div>

            {day.isRestDay ? (
              <div className="p-8 text-center bg-[#111728] rounded-3xl border border-white/5">
                <h4 className="text-lg font-black text-white mb-2">Dia de Recuperação</h4>
                <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
                  A hipertrofia e a adaptação do sistema nervoso central ocorrem durante o descanso. Hidrate-se bem e recarregue para o próximo ciclo!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {currentItems.map((item, idx) => {
                  const ex = getExerciseById(item.exerciseId);
                  if (!ex) return null;
                  const currentTab = getItemTab(idx);

                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-3xl bg-[#111728] border border-white/5 flex flex-col gap-3 shadow-md"
                    >
                      {/* Top Bar do Item */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-orange-400 font-mono font-bold block uppercase tracking-wider">
                            Série #{idx + 1} • {item.durationSeconds}s
                          </span>
                          <h4 className="text-sm font-black text-white">{ex.name}</h4>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setReplacingIndex(idx)}
                            className="p-1.5 rounded-xl bg-[#182238] text-slate-300 hover:text-orange-400 border border-white/5 text-[11px] font-bold flex items-center gap-1 active:scale-95 transition-all"
                            title="Trocar por variação compatível"
                          >
                            <RefreshCw size={12} />
                            Trocar
                          </button>
                          <span className="text-[10px] font-bold px-2 py-1 rounded-xl bg-slate-800 text-slate-300 border border-white/5">
                            {item.restSeconds}s desc.
                          </span>
                        </div>
                      </div>

                      {/* Seletor de Visão: Animação Cinemática vs Mapa Muscular */}
                      <div className="flex items-center justify-between bg-[#0a0f1d] p-1 rounded-2xl border border-white/5">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setItemTab(idx, 'anim')}
                            className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold flex items-center gap-1.5 transition-all ${
                              currentTab === 'anim'
                                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25'
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            <Activity size={13} />
                            Biomecânica
                          </button>
                          <button
                            onClick={() => setItemTab(idx, 'anatomy')}
                            className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold flex items-center gap-1.5 transition-all ${
                              currentTab === 'anatomy'
                                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25'
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            <Layers size={13} />
                            Músculos
                          </button>
                        </div>

                        <button
                          onClick={() => setItemTab(idx, 'both')}
                          className={`px-2.5 py-1.5 rounded-xl text-[10px] font-bold transition-all ${
                            currentTab === 'both'
                              ? 'bg-slate-700 text-white'
                              : 'text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          Lado a Lado
                        </button>
                      </div>

                      {/* Palco de Visualização em Alta Resolução */}
                      {currentTab === 'anim' && (
                        <ExerciseAnimation
                          animationType={ex.animationType}
                          className="h-60 w-full"
                        />
                      )}

                      {currentTab === 'anatomy' && (
                        <AnatomyViewer
                          primaryMuscles={ex.primaryMuscles}
                          secondaryMuscles={ex.secondaryMuscles}
                          className="h-64 w-full"
                        />
                      )}

                      {currentTab === 'both' && (
                        <div className="grid grid-cols-2 gap-2">
                          <ExerciseAnimation
                            animationType={ex.animationType}
                            className="h-56"
                          />
                          <AnatomyViewer
                            primaryMuscles={ex.primaryMuscles}
                            secondaryMuscles={ex.secondaryMuscles}
                            className="h-56"
                          />
                        </div>
                      )}

                      <p className="text-[11px] text-slate-400 leading-relaxed bg-[#0b101d] p-3 rounded-2xl border border-white/5">
                        {ex.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {!day.isRestDay && (
            <div className="p-4 border-t border-white/5 bg-[#0b101d]">
              <button
                onClick={() => onStart(dayToStart)}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-orange-500/25 active:scale-95 transition-all"
              >
                <Play size={18} fill="currentColor" />
                {isCompleted ? 'Refazer Treino Guiado' : 'Iniciar Treino Guiado'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Substituição de Exercício */}
      {replacingIndex !== null && currentItems[replacingIndex] && (
        <ExerciseReplacementModal
          currentExerciseId={currentItems[replacingIndex].exerciseId}
          onSelectReplacement={handleSelectReplacement}
          onClose={() => setReplacingIndex(null)}
        />
      )}
    </>
  );
}

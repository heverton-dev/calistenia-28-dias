import { WorkoutDay } from '../types/workout';
import { getExerciseById } from '../data/exercises';
import { AnatomyViewer } from './AnatomyViewer';
import { ExerciseAnimation } from './ExerciseAnimation';
import { X, Play, Clock, Flame, Dumbbell } from 'lucide-react';

interface ExerciseModalProps {
  day: WorkoutDay;
  onClose: () => void;
  onStart: (day: WorkoutDay) => void;
  isCompleted: boolean;
}

export function ExerciseModal({ day, onClose, onStart, isCompleted }: ExerciseModalProps) {
  return (
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
            className="p-2.5 rounded-2xl bg-[#141c30] text-slate-300 hover:text-white border border-white/5 active:scale-90"
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
              {day.items.length} séries
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
              {day.items.map((item, idx) => {
                const ex = getExerciseById(item.exerciseId);
                if (!ex) return null;

                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-3xl bg-[#111728] border border-white/5 flex flex-col gap-2.5 shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-orange-400 font-mono font-bold block uppercase tracking-wider">
                          Série #{idx + 1} • {item.durationSeconds}s
                        </span>
                        <h4 className="text-sm font-black text-white">{ex.name}</h4>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-1 rounded-xl bg-slate-800 text-slate-300 border border-white/5">
                        {item.restSeconds}s descanso
                      </span>
                    </div>

                    {/* Visualizador Anatômico e Animação no Modal */}
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <ExerciseAnimation
                        animationType={ex.animationType}
                        className="!h-48 !p-2"
                      />
                      <AnatomyViewer
                        primaryMuscles={ex.primaryMuscles}
                        secondaryMuscles={ex.secondaryMuscles}
                        className="!h-48 !p-2"
                      />
                    </div>

                    <p className="text-[11px] text-slate-400 leading-relaxed bg-[#0b101d] p-2.5 rounded-xl border border-white/5">
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
              onClick={() => onStart(day)}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-orange-500/25 active:scale-95 transition-all"
            >
              <Play size={18} fill="currentColor" />
              {isCompleted ? 'Refazer Treino Guiado' : 'Iniciar Treino Guiado'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

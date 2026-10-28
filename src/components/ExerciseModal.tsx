import { WorkoutDay } from '../types/workout';
import { getExerciseById } from '../data/exercises';
import { AnatomyViewer } from './AnatomyViewer';
import { ExerciseAnimation } from './ExerciseAnimation';
import { X, Play, Clock, Flame } from 'lucide-react';

interface ExerciseModalProps {
  day: WorkoutDay;
  onClose: () => void;
  onStart: (day: WorkoutDay) => void;
  isCompleted: boolean;
}

export function ExerciseModal({ day, onClose, onStart, isCompleted }: ExerciseModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-[#101726] w-full max-w-lg max-h-[90vh] rounded-t-3xl sm:rounded-3xl border border-white/10 flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200">
        {/* Header do Modal */}
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider block">
              Dia {day.dayNumber} do Desafio
            </span>
            <h3 className="text-lg font-bold text-white">{day.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 text-slate-300 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Lista de Exercícios com Anatomia */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="flex items-center gap-4 text-xs text-slate-400 pb-2">
            <span className="flex items-center gap-1">
              <Clock size={14} className="text-orange-400" />
              {day.estimatedMinutes} min
            </span>
            <span className="flex items-center gap-1">
              <Flame size={14} className="text-red-400" />
              {day.focus}
            </span>
            {isCompleted && (
              <span className="text-emerald-400 font-semibold ml-auto">
                ✓ Concluído
              </span>
            )}
          </div>

          {day.isRestDay ? (
            <div className="p-6 text-center bg-[#090d16] rounded-2xl border border-white/5">
              <h4 className="text-base font-bold text-white mb-2">Dia de Recuperação</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                O crescimento e a regeneração muscular acontecem durante o descanso. Beba água, durma bem e faça alongamentos leves se desejar.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {day.items.map((item, idx) => {
                const ex = getExerciseById(item.exerciseId);
                if (!ex) return null;

                return (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-[#090d16] border border-white/5 flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs text-slate-500 font-mono block">
                          #{idx + 1} • {item.durationSeconds}s
                        </span>
                        <h4 className="text-sm font-bold text-white">{ex.name}</h4>
                      </div>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {item.restSeconds}s descanso
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <ExerciseAnimation animationType={ex.animationType} className="!p-2 !h-28" />
                      <AnatomyViewer
                        primaryMuscles={ex.primaryMuscles}
                        secondaryMuscles={ex.secondaryMuscles}
                        className="!p-2 !h-28"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer com Botão de Ação */}
        {!day.isRestDay && (
          <div className="p-4 border-t border-white/5 bg-[#090d16]">
            <button
              onClick={() => onStart(day)}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 active:scale-95 transition-transform"
            >
              <Play size={18} fill="currentColor" />
              {isCompleted ? 'Refazer Treino' : 'Iniciar Treino'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

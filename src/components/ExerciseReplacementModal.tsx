import { Exercise } from '../types/workout';
import { getAlternativeExercises, getExerciseById } from '../data/exercises';
import { ExerciseAnimation } from './ExerciseAnimation';
import { X, RefreshCw, Check } from 'lucide-react';

interface ExerciseReplacementModalProps {
  currentExerciseId: string;
  onSelectReplacement: (newExerciseId: string) => void;
  onClose: () => void;
}

export function ExerciseReplacementModal({
  currentExerciseId,
  onSelectReplacement,
  onClose
}: ExerciseReplacementModalProps) {
  const current = getExerciseById(currentExerciseId);
  const alternatives = getAlternativeExercises(currentExerciseId);

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-[#0b101d] w-full max-w-md max-h-[85vh] rounded-t-3xl sm:rounded-3xl border border-white/10 flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200 shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-[#0e1424]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/30">
              <RefreshCw size={16} />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-orange-400 uppercase tracking-widest block">
                Substituir Movimento
              </span>
              <h3 className="text-sm font-black text-white">
                Substituir: {current?.name}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#141c30] text-slate-300 hover:text-white border border-white/5"
            aria-label="Fechar"
          >
            <X size={16} />
          </button>
        </div>

        {/* Lista de Variações Anatômicas Compatíveis */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <p className="text-xs text-slate-400 mb-1">
            Selecione uma variação que trabalha os mesmos grupos musculares com intensidade similar ou adaptada:
          </p>

          {alternatives.map((alt: Exercise) => (
            <button
              key={alt.id}
              onClick={() => onSelectReplacement(alt.id)}
              className="w-full text-left p-3 rounded-2xl bg-[#111728] border border-white/5 hover:border-orange-500/40 hover:bg-[#151e33] transition-all flex items-center justify-between group active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-xl bg-[#090d16] border border-white/5 overflow-hidden flex items-center justify-center">
                  <ExerciseAnimation
                    animationType={alt.animationType}
                    className="!w-16 !h-16 !p-1 border-0"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">
                      {alt.name}
                    </span>
                    <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                      {alt.difficulty}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 block line-clamp-1">
                    {alt.description}
                  </span>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 group-hover:bg-orange-500 group-hover:text-white flex items-center justify-center transition-colors">
                <Check size={14} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

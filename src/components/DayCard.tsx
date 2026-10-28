import { WorkoutDay } from '../types/workout';
import { Check, Flame, Moon, ChevronRight } from 'lucide-react';

interface DayCardProps {
  day: WorkoutDay;
  isCompleted: boolean;
  isCurrent: boolean;
  onClick: () => void;
}

export function DayCard({ day, isCompleted, isCurrent, onClick }: DayCardProps) {
  return (
    <button
      onClick={onClick}
      className={`relative w-full text-left p-3.5 sm:p-4 rounded-2xl transition-all duration-200 border flex items-center justify-between group active:scale-[0.98] ${
        isCurrent
          ? 'bg-gradient-to-r from-theme-subtle via-[#141d33] to-[#0f172a] border-theme-subtle shadow-theme'
          : isCompleted
          ? 'bg-[#0c1220]/80 border-emerald-500/30'
          : day.isRestDay
          ? 'bg-[#101424]/40 border-purple-500/20'
          : 'bg-[#101728] border-white/5 hover:border-white/10'
      }`}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1 mr-2">
        {/* Marcador do Dia / Status */}
        <div
          className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center font-black text-sm transition-all shadow-sm shrink-0 ${
            isCompleted
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-emerald-500/10'
              : isCurrent
              ? 'bg-theme-gradient text-white shadow-theme'
              : day.isRestDay
              ? 'bg-purple-500/15 text-purple-300 border border-purple-500/25'
              : 'bg-[#182238] text-slate-400 border border-white/5'
          }`}
        >
          {isCompleted ? (
            <Check size={18} strokeWidth={3} />
          ) : day.isRestDay ? (
            <Moon size={16} />
          ) : (
            <span className="font-mono">{day.dayNumber}</span>
          )}
        </div>

        {/* Informações Centrais - Blindadas Contra Quebra */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-nowrap">
            <span className="text-xs sm:text-sm font-black text-white group-hover:text-theme transition-colors whitespace-nowrap truncate">
              {day.title}
            </span>
            {isCurrent && !isCompleted && (
              <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-theme text-white shadow-theme whitespace-nowrap shrink-0">
                Hoje
              </span>
            )}
          </div>
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5 flex-nowrap overflow-hidden">
            {day.isRestDay ? (
              <span className="text-purple-300 font-medium whitespace-nowrap truncate">Recuperação Muscular</span>
            ) : (
              <>
                <Flame size={12} className="text-red-400 shrink-0" />
                <span className="text-slate-300 whitespace-nowrap truncate">{day.focus}</span>
                <span className="text-slate-600 shrink-0">•</span>
                <span className="font-mono text-slate-400 whitespace-nowrap shrink-0">{day.estimatedMinutes} min</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center text-slate-500 group-hover:text-white transition-colors shrink-0">
        <ChevronRight size={18} />
      </div>
    </button>
  );
}

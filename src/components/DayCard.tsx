import { WorkoutDay } from '../types/workout';
import { Check, Flame, Moon, ArrowRight } from 'lucide-react';

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
      className={`relative w-full text-left p-3.5 rounded-2xl transition-all duration-200 border flex items-center justify-between group active:scale-[0.98] ${
        isCurrent
          ? 'bg-gradient-to-r from-orange-950/40 via-[#192238] to-[#121929] border-orange-500/50 shadow-lg shadow-orange-500/10'
          : isCompleted
          ? 'bg-[#0f172a]/60 border-emerald-500/30'
          : day.isRestDay
          ? 'bg-[#131b2e]/40 border-purple-500/20'
          : 'bg-[#101726] border-white/5 hover:border-white/10'
      }`}
    >
      <div className="flex items-center gap-3">
        {/* Marcador do Dia / Status */}
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-colors ${
            isCompleted
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
              : isCurrent
              ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
              : day.isRestDay
              ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
              : 'bg-slate-800 text-slate-400'
          }`}
        >
          {isCompleted ? (
            <Check size={18} strokeWidth={3} />
          ) : day.isRestDay ? (
            <Moon size={16} />
          ) : (
            <span>{day.dayNumber}</span>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">
              {day.title}
            </span>
            {isCurrent && !isCompleted && (
              <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-orange-500 text-white">
                Hoje
              </span>
            )}
          </div>
          <span className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
            {day.isRestDay ? (
              <span className="text-purple-300">Descanso e Recuperação</span>
            ) : (
              <>
                <Flame size={12} className="text-red-400" />
                <span>{day.focus}</span>
                <span>•</span>
                <span>{day.estimatedMinutes} min</span>
              </>
            )}
          </span>
        </div>
      </div>

      <div className="flex items-center text-slate-500 group-hover:text-white transition-colors">
        <ArrowRight size={16} />
      </div>
    </button>
  );
}

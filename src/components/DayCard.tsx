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
      className={`relative w-full text-left p-4 rounded-2xl transition-all duration-200 border flex items-center justify-between group active:scale-[0.98] ${
        isCurrent
          ? 'bg-gradient-to-r from-orange-950/30 via-[#141d33] to-[#0f172a] border-orange-500/50 shadow-lg shadow-orange-500/10'
          : isCompleted
          ? 'bg-[#0c1220]/80 border-emerald-500/30'
          : day.isRestDay
          ? 'bg-[#101424]/40 border-purple-500/20'
          : 'bg-[#101728] border-white/5 hover:border-white/10'
      }`}
    >
      <div className="flex items-center gap-3.5">
        {/* Marcador do Dia / Status */}
        <div
          className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-sm transition-all shadow-sm ${
            isCompleted
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-emerald-500/10'
              : isCurrent
              ? 'bg-gradient-to-tr from-orange-600 to-amber-500 text-white shadow-lg shadow-orange-500/30'
              : day.isRestDay
              ? 'bg-purple-500/15 text-purple-300 border border-purple-500/25'
              : 'bg-[#182238] text-slate-400 border border-white/5'
          }`}
        >
          {isCompleted ? (
            <Check size={20} strokeWidth={3} />
          ) : day.isRestDay ? (
            <Moon size={18} />
          ) : (
            <span className="font-mono">{day.dayNumber}</span>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-black text-white group-hover:text-orange-400 transition-colors">
              {day.title}
            </span>
            {isCurrent && !isCompleted && (
              <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-500 text-white shadow-sm shadow-orange-500/30">
                Hoje
              </span>
            )}
          </div>
          <span className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
            {day.isRestDay ? (
              <span className="text-purple-300 font-medium">Recuperação Muscular</span>
            ) : (
              <>
                <Flame size={12} className="text-red-400" />
                <span className="text-slate-300">{day.focus}</span>
                <span className="text-slate-600">•</span>
                <span className="font-mono text-slate-400">{day.estimatedMinutes} min</span>
              </>
            )}
          </span>
        </div>
      </div>

      <div className="flex items-center text-slate-500 group-hover:text-white transition-colors">
        <ChevronRight size={18} />
      </div>
    </button>
  );
}

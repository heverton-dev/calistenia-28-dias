import { AnimationType } from '../types/workout';

interface ExerciseAnimationProps {
  animationType: AnimationType;
  className?: string;
  isPaused?: boolean;
}

export function ExerciseAnimation({
  animationType,
  className = '',
  isPaused = false
}: ExerciseAnimationProps) {
  return (
    <div className={`relative flex items-center justify-center rounded-2xl bg-[#090d16] p-4 border border-white/5 overflow-hidden ${className}`}>
      <style>{`
        @keyframes pushupAnim {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(18px) rotate(-2deg); }
        }
        @keyframes squatAnim {
          0%, 100% { transform: translateY(0px) scaleY(1); }
          50% { transform: translateY(22px) scaleY(0.85); }
        }
        @keyframes plankAnim {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(2px); }
        }
        @keyframes climberAnim {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(12px); }
        }
        @keyframes jumpingJackAnim {
          0%, 100% { transform: scale(0.95); }
          50% { transform: scale(1.08); }
        }
        .anim-pushup { animation: pushupAnim 2s ease-in-out infinite; }
        .anim-squat { animation: squatAnim 2.2s ease-in-out infinite; }
        .anim-plank { animation: plankAnim 3s ease-in-out infinite; }
        .anim-climber { animation: climberAnim 1s ease-in-out infinite; }
        .anim-jumping { animation: jumpingJackAnim 1.2s ease-in-out infinite; }
        .paused { animation-play-state: paused !important; }
      `}</style>

      {/* Renderização baseada no tipo de movimento */}
      <div className={`w-36 h-36 flex items-center justify-center ${isPaused ? 'paused' : ''}`}>
        {animationType === 'pushup' || animationType === 'pike-pushup' ? (
          <svg viewBox="0 0 100 100" className={`w-32 h-32 text-orange-500 anim-pushup ${isPaused ? 'paused' : ''}`}>
            {/* Chão */}
            <line x1="5" y1="85" x2="95" y2="85" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
            {/* Tronco & Braços */}
            <circle cx="80" cy="45" r="7" fill="#f97316" />
            <line x1="75" y1="50" x2="30" y2="65" stroke="#f97316" strokeWidth="5" strokeLinecap="round" />
            <line x1="30" y1="65" x2="15" y2="83" stroke="#cbd5e1" strokeWidth="5" strokeLinecap="round" />
            {/* Braço empurrando */}
            <polyline points="70,52 68,68 68,83" fill="none" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
          </svg>
        ) : animationType === 'squat' || animationType === 'lunges' ? (
          <svg viewBox="0 0 100 100" className={`w-32 h-32 text-orange-500 anim-squat ${isPaused ? 'paused' : ''}`}>
            {/* Chão */}
            <line x1="5" y1="90" x2="95" y2="90" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
            {/* Cabeça */}
            <circle cx="50" cy="20" r="7" fill="#f97316" />
            {/* Tronco */}
            <line x1="50" y1="27" x2="50" y2="52" stroke="#f97316" strokeWidth="6" strokeLinecap="round" />
            {/* Pernas agachando */}
            <polyline points="50,52 38,68 40,88" fill="none" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" />
            <polyline points="50,52 62,68 60,88" fill="none" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" />
            {/* Braços estendidos à frente para equilíbrio */}
            <line x1="50" y1="35" x2="25" y2="35" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
          </svg>
        ) : animationType === 'plank' || animationType === 'hollow-hold' ? (
          <svg viewBox="0 0 100 100" className={`w-32 h-32 text-orange-500 anim-plank ${isPaused ? 'paused' : ''}`}>
            <line x1="5" y1="80" x2="95" y2="80" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
            <circle cx="78" cy="48" r="7" fill="#f97316" />
            <line x1="72" y1="52" x2="22" y2="60" stroke="#ef4444" strokeWidth="6" strokeLinecap="round" />
            {/* Apoio no antebraço */}
            <polyline points="68,54 68,78 76,78" fill="none" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
            <line x1="22" y1="60" x2="16" y2="78" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
          </svg>
        ) : animationType === 'mountain-climber' ? (
          <svg viewBox="0 0 100 100" className={`w-32 h-32 text-orange-500 anim-climber ${isPaused ? 'paused' : ''}`}>
            <line x1="5" y1="85" x2="95" y2="85" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
            <circle cx="75" cy="42" r="7" fill="#f97316" />
            <line x1="70" y1="46" x2="35" y2="55" stroke="#f97316" strokeWidth="5" strokeLinecap="round" />
            <line x1="68" y1="48" x2="68" y2="83" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
            {/* Perna avançando */}
            <polyline points="35,55 52,62 50,75" fill="none" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
            <polyline points="35,55 20,72 16,83" fill="none" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 100 100" className={`w-32 h-32 text-orange-500 anim-jumping ${isPaused ? 'paused' : ''}`}>
            <circle cx="50" cy="22" r="7" fill="#f97316" />
            <line x1="50" y1="29" x2="50" y2="55" stroke="#f97316" strokeWidth="6" strokeLinecap="round" />
            {/* Braços para o alto */}
            <line x1="50" y1="36" x2="28" y2="18" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
            <line x1="50" y1="36" x2="72" y2="18" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
            {/* Pernas abertas */}
            <line x1="50" y1="55" x2="30" y2="85" stroke="#cbd5e1" strokeWidth="5" strokeLinecap="round" />
            <line x1="50" y1="55" x2="70" y2="85" stroke="#cbd5e1" strokeWidth="5" strokeLinecap="round" />
          </svg>
        )}
      </div>

      <div className="absolute bottom-1 right-2 text-[10px] text-slate-500 uppercase tracking-widest font-mono">
        Loop Vetorial
      </div>
    </div>
  );
}

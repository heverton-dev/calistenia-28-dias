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
    <div className={`relative flex flex-col items-center justify-center rounded-2xl bg-[#090d19] border border-white/10 p-3 shadow-2xl overflow-hidden ${className}`}>
      {/* Efeito sutil de iluminação de piso e gradiente de estúdio */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#101726]/40 to-[#0b101d] pointer-events-none" />

      {/* Animações CSS com física cinemática atlética */}
      <style>{`
        @keyframes pushupMovement {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          45%, 55% {
            transform: translateY(22px) rotate(-1.5deg);
          }
        }

        @keyframes pushupForearm {
          0%, 100% {
            transform: rotate(0deg);
          }
          45%, 55% {
            transform: rotate(-35deg);
          }
        }

        @keyframes squatMovement {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(32px);
          }
        }

        @keyframes squatThigh {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(65deg);
          }
        }

        @keyframes plankBreathing {
          0%, 100% {
            transform: translateY(0px) scaleY(1);
          }
          50% {
            transform: translateY(1.5px) scaleY(0.985);
          }
        }

        @keyframes climberLegL {
          0%, 100% {
            transform: translateX(0px) translateY(0px) scaleX(1);
          }
          50% {
            transform: translateX(35px) translateY(-14px) scaleX(0.7);
          }
        }

        @keyframes climberLegR {
          0%, 100% {
            transform: translateX(35px) translateY(-14px) scaleX(0.7);
          }
          50% {
            transform: translateX(0px) translateY(0px) scaleX(1);
          }
        }

        @keyframes jackArms {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(-130deg);
          }
        }

        @keyframes jackLegs {
          0%, 100% {
            transform: scaleX(0.85);
          }
          50% {
            transform: scaleX(1.35);
          }
        }

        .anim-pushup-body { animation: pushupMovement 2.2s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite; }
        .anim-squat-body { animation: squatMovement 2.4s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite; }
        .anim-plank-body { animation: plankBreathing 2.8s ease-in-out infinite; }
        .anim-climber-left { animation: climberLegL 1.1s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        .anim-climber-right { animation: climberLegR 1.1s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        .anim-jack-jump { animation: squatMovement 1.1s ease-in-out infinite; }
        .is-paused { animation-play-state: paused !important; }
      `}</style>

      {/* Palco do Atleta Vetorial */}
      <div className={`relative w-full h-56 flex items-center justify-center ${isPaused ? 'is-paused' : ''}`}>
        {/* ================= 1. PUSH-UP / PIKE PUSH-UP ================= */}
        {animationType === 'pushup' || animationType === 'pike-pushup' || animationType === 'dips' ? (
          <svg viewBox="0 0 240 180" className="w-56 h-48 select-none">
            <defs>
              <linearGradient id="matGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="50%" stopColor="#334155" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>
              <linearGradient id="skin" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fdba74" />
                <stop offset="100%" stopColor="#ea580c" />
              </linearGradient>
              <linearGradient id="shirt" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#c2410c" />
              </linearGradient>
            </defs>

            {/* Tapete de Treino / Chão */}
            <rect x="15" y="145" width="210" height="6" rx="3" fill="url(#matGrad)" />
            <line x1="10" y1="151" x2="230" y2="151" stroke="#0f172a" strokeWidth="2" />

            {/* Grupo Dinâmico do Atleta */}
            <g className={`anim-pushup-body origin-[40px_145px] ${isPaused ? 'is-paused' : ''}`}>
              {/* Pés e Tênis */}
              <ellipse cx="38" cy="140" rx="8" ry="5" fill="#f8fafc" />
              <rect x="30" y="137" width="12" height="6" rx="2" fill="#0284c7" />

              {/* Pernas com Bermuda Esportiva */}
              <path d="M42 138 L95 110 L102 118 L46 144 Z" fill="#334155" />
              <path d="M85 116 L120 102 L124 116 L88 126 Z" fill="#0f172a" />

              {/* Tronco Muscular com Camisa de Treino */}
              <path d="M118 103 L174 88 C182 86 188 92 185 100 L174 114 L122 116 Z" fill="url(#shirt)" />

              {/* Cabeça do Atleta com Cabelo e Foco */}
              <circle cx="198" cy="84" r="13" fill="url(#skin)" />
              <path d="M190 74 C198 68 212 72 210 84 C205 78 195 78 190 74 Z" fill="#1e293b" />

              {/* Braço e Ombro (com flexão articulada) */}
              <path d="M168 96 L164 122 L176 122 L178 96 Z" fill="url(#skin)" />
              {/* Antebraço apoiado com força no chão */}
              <path d="M164 120 L166 145 L178 145 L174 120 Z" fill="url(#skin)" />
              {/* Mão espalmada no solo */}
              <ellipse cx="170" cy="145" rx="9" ry="3" fill="#fdba74" />

              {/* Brilho muscular indicativo de contração no peitoral */}
              <circle cx="160" cy="102" r="5" fill="#ef4444" opacity="0.8" className="animate-ping" />
            </g>
          </svg>
        ) : animationType === 'squat' || animationType === 'lunges' ? (
          /* ================= 2. SQUAT / LUNGES ================= */
          <svg viewBox="0 0 200 220" className="w-52 h-52 select-none">
            <defs>
              <linearGradient id="squatMat" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>
            </defs>

            {/* Chão */}
            <line x1="20" y1="200" x2="180" y2="200" stroke="#334155" strokeWidth="4" strokeLinecap="round" />

            {/* Grupo do Atleta Agachando */}
            <g className={`anim-squat-body ${isPaused ? 'is-paused' : ''}`}>
              {/* Cabeça */}
              <circle cx="100" cy="40" r="14" fill="#fdba74" />
              <path d="M90 30 C100 24 114 28 112 40 C106 34 96 34 90 30 Z" fill="#1e293b" />

              {/* Tronco Ereto com Camiseta Atlética */}
              <path d="M84 56 C84 56 100 52 116 56 L112 108 L88 108 Z" fill="#f97316" />

              {/* Braços estendidos à frente para equilíbrio perfeito */}
              <path d="M96 66 L52 74 C48 75 46 71 49 68 L94 60 Z" fill="#ea580c" />
              <circle cx="48" cy="72" r="5" fill="#fdba74" />

              {/* Bermuda de Treino */}
              <path d="M86 106 L114 106 L118 132 L82 132 Z" fill="#0f172a" />

              {/* Coxas / Quadríceps sob carga */}
              <path d="M85 130 L74 165 L88 168 L98 132 Z" fill="#ea580c" />
              <path d="M115 130 L126 165 L112 168 L102 132 Z" fill="#ea580c" />

              {/* Panturrilhas e Canelas */}
              <path d="M74 165 L76 195 L88 195 L86 168 Z" fill="#fdba74" />
              <path d="M124 165 L122 195 L110 195 L112 168 Z" fill="#fdba74" />

              {/* Tênis esportivos firmes no solo */}
              <rect x="68" y="194" width="22" height="7" rx="3" fill="#f8fafc" />
              <rect x="110" y="194" width="22" height="7" rx="3" fill="#f8fafc" />

              {/* Indicador de ativação muscular nas coxas */}
              <circle cx="82" cy="148" r="4" fill="#ef4444" className="animate-ping" />
              <circle cx="118" cy="148" r="4" fill="#ef4444" className="animate-ping" />
            </g>
          </svg>
        ) : animationType === 'plank' || animationType === 'hollow-hold' ? (
          /* ================= 3. PLANK ISOMÉTRICO ================= */
          <svg viewBox="0 0 240 160" className="w-56 h-44 select-none">
            {/* Solo */}
            <rect x="15" y="130" width="210" height="5" rx="2.5" fill="#334155" />

            <g className={`anim-plank-body ${isPaused ? 'is-paused' : ''}`}>
              {/* Tênis apoiados na ponta dos pés */}
              <ellipse cx="38" cy="125" rx="8" ry="5" fill="#f8fafc" />

              {/* Pernas retas e contraídas */}
              <path d="M42 122 L98 108 L102 118 L46 128 Z" fill="#334155" />
              <path d="M96 110 L130 104 L134 116 L98 120 Z" fill="#0f172a" />

              {/* Tronco rígido como uma tábua (Core em chamas) */}
              <path d="M128 104 L184 94 C190 94 194 98 192 104 L182 114 L132 115 Z" fill="#f97316" />

              {/* Cabeça neutra olhando para o chão */}
              <circle cx="204" cy="94" r="12" fill="#fdba74" />

              {/* Braço dobrado em L (apoio total nos antebraços) */}
              <path d="M178 102 L178 128 L198 128 L198 122 L186 122 L186 102 Z" fill="#ea580c" />

              {/* Efeito de tensão e energia no Core */}
              <line x1="130" y1="112" x2="175" y2="108" stroke="#ef4444" strokeWidth="3" strokeDasharray="4 2" className="animate-pulse" />
            </g>
          </svg>
        ) : animationType === 'mountain-climber' ? (
          /* ================= 4. MOUNTAIN CLIMBER DINÂMICO ================= */
          <svg viewBox="0 0 240 180" className="w-56 h-48 select-none">
            <line x1="15" y1="150" x2="225" y2="150" stroke="#334155" strokeWidth="4" strokeLinecap="round" />

            {/* Braços firmes sustentando o corpo */}
            <circle cx="196" cy="80" r="13" fill="#fdba74" />
            <path d="M140 92 L185 86 L180 106 L142 108 Z" fill="#f97316" />
            <path d="M174 94 L170 148 L182 148 L184 94 Z" fill="#ea580c" />

            {/* Perna Esquerda Dinâmica (Avançando em alta velocidade) */}
            <g className={`anim-climber-left ${isPaused ? 'is-paused' : ''}`}>
              <path d="M140 102 L120 120 L135 135 Z" fill="#334155" />
              <rect x="130" y="132" width="14" height="6" rx="2" fill="#38bdf8" />
            </g>

            {/* Perna Direita Estendida */}
            <g className={`anim-climber-right ${isPaused ? 'is-paused' : ''}`}>
              <path d="M140 102 L80 134 L90 142 Z" fill="#0f172a" />
              <rect x="75" y="138" width="14" height="6" rx="2" fill="#f8fafc" />
            </g>
          </svg>
        ) : (
          /* ================= 5. POLICHINELO / BURPEE / DIPS ================= */
          <svg viewBox="0 0 200 220" className="w-52 h-52 select-none">
            <line x1="20" y1="200" x2="180" y2="200" stroke="#334155" strokeWidth="4" strokeLinecap="round" />

            <g className={`anim-jack-jump ${isPaused ? 'is-paused' : ''}`}>
              {/* Cabeça */}
              <circle cx="100" cy="45" r="14" fill="#fdba74" />

              {/* Braços levantando para o alto em arco */}
              <path d="M96 66 L60 38 C56 35 52 38 54 42 L90 74 Z" fill="#f97316" />
              <path d="M104 66 L140 38 C144 35 148 38 146 42 L110 74 Z" fill="#f97316" />

              {/* Tronco */}
              <path d="M86 64 C86 64 100 60 114 64 L110 115 L90 115 Z" fill="#ea580c" />

              {/* Pernas em abertura atlética */}
              <path d="M88 114 L62 188 L74 190 L98 120 Z" fill="#334155" />
              <path d="M112 114 L138 188 L126 190 L102 120 Z" fill="#334155" />

              {/* Tênis */}
              <rect x="54" y="188" width="22" height="7" rx="3" fill="#f8fafc" />
              <rect x="124" y="188" width="22" height="7" rx="3" fill="#f8fafc" />
            </g>
          </svg>
        )}
      </div>

      <div className="w-full flex items-center justify-between z-10 pt-1 border-t border-white/5">
        <span className="text-[10px] text-orange-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Execução Cinemática
        </span>
        <span className="text-[10px] text-slate-500 font-mono">
          {isPaused ? 'Pausado' : 'Biomecânica Ativa'}
        </span>
      </div>
    </div>
  );
}

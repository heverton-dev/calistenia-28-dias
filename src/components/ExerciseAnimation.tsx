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
    <div className={`relative flex flex-col items-center justify-between rounded-3xl bg-gradient-to-b from-[#0c1222] via-[#090d18] to-[#060912] border border-white/10 p-3 shadow-2xl overflow-hidden ${className}`}>
      {/* Luz ambiente de estúdio fitness */}
      <div className="absolute inset-0 bg-radial from-orange-500/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

      {/* Header Compacto - 1 Linha Obrigatória sem Wrap */}
      <div className="w-full flex items-center justify-between z-10 mb-1 gap-2 flex-nowrap">
        <span className="text-[9px] font-black text-orange-400 uppercase tracking-widest flex items-center gap-1 bg-orange-500/15 px-2 py-0.5 rounded-full border border-orange-500/30 shrink-0 whitespace-nowrap shadow-inner">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          Cinemática 2D
        </span>
        <span className="text-[9px] text-slate-400 font-mono font-bold bg-white/5 px-2 py-0.5 rounded-lg border border-white/5 shrink-0 whitespace-nowrap">
          {isPaused ? 'Pausado' : 'Biomecânica Ativa'}
        </span>
      </div>

      {/* Estilos e Keyframes Cinemáticos Fluidos */}
      <style>{`
        /* 1. FLEXÃO BIOMECÂNICA SUAVE */
        @keyframes pushupPlankMotion {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          40%, 60% {
            transform: translateY(22px) rotate(-1deg);
          }
        }
        @keyframes pushupForearmFlex {
          0%, 100% {
            transform: rotate(0deg);
          }
          40%, 60% {
            transform: rotate(48deg);
          }
        }
        @keyframes chestGlowPulse {
          0%, 100% {
            opacity: 0.25;
            transform: scale(0.9);
          }
          40%, 60% {
            opacity: 0.95;
            transform: scale(1.2);
          }
        }

        /* 2. JUMPING JACKS FLUIDO */
        @keyframes jackJumpMotion {
          0%, 100% {
            transform: translateY(0px) scale(0.98);
          }
          50% {
            transform: translateY(-16px) scale(1.02);
          }
        }
        @keyframes jackArmArcLeft {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(-130deg);
          }
        }
        @keyframes jackArmArcRight {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(130deg);
          }
        }
        @keyframes jackLegSpreadL {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(-22deg);
          }
        }
        @keyframes jackLegSpreadR {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(22deg);
          }
        }

        /* 3. AGACHAMENTO / SQUAT */
        @keyframes squatDepthMotion {
          0%, 100% {
            transform: translateY(0px);
          }
          45%, 55% {
            transform: translateY(32px);
          }
        }
        @keyframes squatArmsBalance {
          0%, 100% {
            transform: rotate(0deg);
          }
          45%, 55% {
            transform: rotate(-40deg);
          }
        }

        /* 4. ESCALADOR / MOUNTAIN CLIMBERS */
        @keyframes climberPumpLeg1 {
          0%, 100% {
            transform: translateX(0px) translateY(0px);
          }
          50% {
            transform: translateX(45px) translateY(-22px);
          }
        }
        @keyframes climberPumpLeg2 {
          0%, 100% {
            transform: translateX(45px) translateY(-22px);
          }
          50% {
            transform: translateX(0px) translateY(0px);
          }
        }

        /* 5. PRANCHA E PONTE */
        @keyframes plankBreath {
          0%, 100% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(1.03);
          }
        }
        @keyframes bridgeThrust {
          0%, 100% {
            transform: translateY(18px) rotate(-6deg);
          }
          50% {
            transform: translateY(0px) rotate(0deg);
          }
        }

        .anim-pushup-body { animation: pushupPlankMotion 2.2s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite; }
        .anim-pushup-arm { transform-origin: 172px 105px; animation: pushupForearmFlex 2.2s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite; }
        .anim-pushup-glow { transform-origin: 165px 100px; animation: chestGlowPulse 2.2s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite; }

        .anim-jack-body { animation: jackJumpMotion 1.05s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        .anim-jack-arm-l { transform-origin: 82px 60px; animation: jackArmArcLeft 1.05s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        .anim-jack-arm-r { transform-origin: 118px 60px; animation: jackArmArcRight 1.05s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        .anim-jack-leg-l { transform-origin: 90px 120px; animation: jackLegSpreadL 1.05s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        .anim-jack-leg-r { transform-origin: 110px 120px; animation: jackLegSpreadR 1.05s cubic-bezier(0.4, 0, 0.2, 1) infinite; }

        .anim-squat-torso { animation: squatDepthMotion 2.3s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite; }
        .anim-squat-arms { transform-origin: 95px 75px; animation: squatArmsBalance 2.3s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite; }

        .anim-climber-1 { animation: climberPumpLeg1 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        .anim-climber-2 { animation: climberPumpLeg2 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite; }

        .anim-plank-core { transform-origin: 100px 120px; animation: plankBreath 2.8s ease-in-out infinite; }
        .anim-glute-thrust { transform-origin: 50px 145px; animation: bridgeThrust 2.4s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite; }

        .paused { animation-play-state: paused !important; }
      `}</style>

      {/* Palco do Atleta Vetorial */}
      <div className={`relative w-full flex-1 flex items-center justify-center min-h-0 select-none py-0.5 ${isPaused ? 'paused' : ''}`}>
        {/* ================= 1. PUSH-UP / PIKE-PUSHUP / DIPS ================= */}
        {animationType === 'pushup' || animationType === 'pike-pushup' || animationType === 'dips' ? (
          <svg viewBox="0 0 240 160" preserveAspectRatio="xMidYMid meet" className="w-full h-full max-h-56">
            <defs>
              <linearGradient id="skinShade" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fed7aa" />
                <stop offset="100%" stopColor="#ea580c" />
              </linearGradient>
              <linearGradient id="tankJersey" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#c2410c" />
              </linearGradient>
              <linearGradient id="tightsShade" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
              <radialGradient id="floorShadow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(0,0,0,0.55)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0)" />
              </radialGradient>
            </defs>

            {/* Sombra de Contato com o Piso */}
            <ellipse cx="125" cy="142" rx="90" ry="9" fill="url(#floorShadow)" />
            <line x1="20" y1="142" x2="225" y2="142" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />

            {/* Atleta Completo em Flexão */}
            <g className={`anim-pushup-body origin-[42px_138px] ${isPaused ? 'paused' : ''}`}>
              {/* Tênis Esportivo com Sola de Amortecimento */}
              <g id="shoes">
                <path d="M28 128 C34 128 42 132 42 139 L28 139 Z" fill="#f8fafc" />
                <rect x="28" y="138" width="14" height="4" rx="2" fill="#f97316" />
              </g>

              {/* Pernas com Calça de Compressão e Curvatura Muscular */}
              <path
                d="M40 135 C56 127 78 118 104 112 C106 118 88 130 44 140 Z"
                fill="url(#tightsShade)"
                stroke="#334155"
                strokeWidth="0.8"
              />
              {/* Bermuda Esportiva */}
              <path d="M96 106 L124 100 L126 118 L98 121 Z" fill="#090d16" />

              {/* Tronco Musculoso com Regata Atlética Laranja */}
              <path
                d="M122 100 C142 95 164 90 180 86 C188 93 186 106 174 112 C154 114 132 117 122 116 Z"
                fill="url(#tankJersey)"
              />
              <path d="M126 99 C144 94 166 90 180 86 L175 96 C155 99 138 102 126 104 Z" fill="#ea580c" opacity="0.4" />

              {/* Cabeça do Atleta com Perfil Esportivo */}
              <circle cx="198" cy="80" r="12" fill="url(#skinShade)" />
              <path d="M190 70 C200 64 212 70 211 82 C204 76 194 76 190 70 Z" fill="#0f172a" />
              <rect x="194" y="77" width="8" height="3" rx="1.5" fill="#f97316" />

              {/* Braço Posterior (Profundidade) */}
              <path d="M168 87 L162 112 L160 140" stroke="#7c2d12" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" opacity="0.35" />

              {/* Braço Ativo de Frente com Articulação de Cotovelo */}
              <g className={`anim-pushup-arm ${isPaused ? 'paused' : ''}`}>
                <path
                  d="M174 92 L166 120 L164 140"
                  stroke="url(#skinShade)"
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect x="160" y="132" width="8" height="4" rx="1.5" fill="#f97316" />
                <ellipse cx="164" cy="141" rx="7" ry="3" fill="#fdba74" />
              </g>

              {/* Foco de Ativação no Peitoral */}
              <circle cx="166" cy="100" r="8" fill="#ef4444" className={`anim-pushup-glow ${isPaused ? 'paused' : ''}`} />
              <circle cx="166" cy="100" r="3" fill="#ffffff" />
            </g>
          </svg>
        ) : animationType === 'jumping-jack' ? (
          /* ================= 2. JUMPING JACKS (POLICHINELO) ================= */
          <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet" className="w-full h-full max-h-56">
            <defs>
              <linearGradient id="jackSkin" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fed7aa" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
            </defs>

            <ellipse cx="100" cy="188" rx="50" ry="6" fill="rgba(0,0,0,0.5)" />
            <line x1="25" y1="188" x2="175" y2="188" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />

            <g className={`anim-jack-body origin-[100px_188px] ${isPaused ? 'paused' : ''}`}>
              {/* Perna Esquerda Articulada com Tênis */}
              <g className={`anim-jack-leg-l ${isPaused ? 'paused' : ''}`}>
                <path d="M88 112 L76 150 L68 180 L78 182 L88 150 L94 112 Z" fill="#1e293b" />
                <path d="M60 180 C64 176 76 177 78 182 L58 182 Z" fill="#f8fafc" />
                <rect x="58" y="181" width="20" height="3" rx="1.5" fill="#f97316" />
              </g>

              {/* Perna Direita Articulada com Tênis */}
              <g className={`anim-jack-leg-r ${isPaused ? 'paused' : ''}`}>
                <path d="M112 112 L124 150 L132 180 L122 182 L112 150 L106 112 Z" fill="#1e293b" />
                <path d="M122 180 C124 176 136 177 140 182 L122 182 Z" fill="#f8fafc" />
                <rect x="122" y="181" width="20" height="3" rx="1.5" fill="#f97316" />
              </g>

              {/* Bermuda Esportiva */}
              <path d="M82 105 L118 105 L122 126 L78 126 Z" fill="#090d16" />

              {/* Braço Esquerdo em Arco */}
              <g className={`anim-jack-arm-l ${isPaused ? 'paused' : ''}`}>
                <path d="M82 56 L50 74 L42 66 L74 48 Z" fill="url(#jackSkin)" />
                <circle cx="45" cy="70" r="5" fill="#f97316" />
              </g>

              {/* Braço Direito em Arco */}
              <g className={`anim-jack-arm-r ${isPaused ? 'paused' : ''}`}>
                <path d="M118 56 L150 74 L158 66 L126 48 Z" fill="url(#jackSkin)" />
                <circle cx="155" cy="70" r="5" fill="#f97316" />
              </g>

              {/* Tronco Musculoso em Regata Laranja */}
              <path d="M82 52 C82 52 100 48 118 52 L114 108 L86 108 Z" fill="#ea580c" />
              <path d="M88 60 C96 64 104 64 112 60" stroke="#9a3412" strokeWidth="2" strokeLinecap="round" fill="none" />

              {/* Deltoides */}
              <circle cx="82" cy="54" r="6" fill="#f97316" />
              <circle cx="118" cy="54" r="6" fill="#f97316" />

              {/* Cabeça do Atleta com Faixa */}
              <circle cx="100" cy="32" r="13" fill="url(#jackSkin)" />
              <path d="M88 22 C98 16 112 18 112 30 C106 26 96 26 88 22 Z" fill="#0f172a" />
              <rect x="88" y="30" width="24" height="3.5" rx="1.5" fill="#f97316" />
            </g>
          </svg>
        ) : animationType === 'squat' || animationType === 'lunges' ? (
          /* ================= 3. SQUAT / AGACHAMENTO ================= */
          <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet" className="w-full h-full max-h-56">
            <ellipse cx="100" cy="188" rx="60" ry="7" fill="rgba(0,0,0,0.5)" />
            <line x1="20" y1="188" x2="180" y2="188" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />

            {/* Pés Fixos no Chão com Tênis */}
            <path d="M64 180 C68 176 80 177 84 188 L60 188 Z" fill="#f8fafc" />
            <rect x="60" y="187" width="24" height="3" rx="1.5" fill="#f97316" />

            <path d="M120 180 C124 176 136 177 140 188 L116 188 Z" fill="#f8fafc" />
            <rect x="116" y="187" width="24" height="3" rx="1.5" fill="#f97316" />

            {/* Tronco e Quadril com Descida Biomecânica */}
            <g className={`anim-squat-torso origin-[100px_188px] ${isPaused ? 'paused' : ''}`}>
              {/* Pernas em Flexão de 90 Graus */}
              <path d="M68 182 L58 146 L76 122 L88 148 Z" fill="#1e293b" />
              <path d="M128 182 L138 146 L120 122 L108 148 Z" fill="#1e293b" />

              <circle cx="56" cy="146" r="6" fill="#334155" />
              <circle cx="140" cy="146" r="6" fill="#334155" />

              {/* Bermuda */}
              <path d="M70 115 L126 115 L130 134 L66 134 Z" fill="#090d16" />

              {/* Braços à Frente em Contra-peso */}
              <g className={`anim-squat-arms ${isPaused ? 'paused' : ''}`}>
                <path d="M92 64 L44 70 L42 62 L90 56 Z" fill="#fdba74" />
                <ellipse cx="40" cy="66" rx="5" ry="4" fill="#f97316" />
              </g>

              {/* Tronco Inclinado Neutro */}
              <path d="M78 54 C78 54 96 50 116 54 L112 118 L82 118 Z" fill="#ea580c" />

              {/* Cabeça */}
              <circle cx="102" cy="36" r="13" fill="#fed7aa" />
              <path d="M92 26 C102 20 114 24 112 36 Z" fill="#0f172a" />
              <rect x="92" y="34" width="20" height="3.5" rx="1.5" fill="#f97316" />

              {/* Ativação Muscular nos Quadríceps */}
              <circle cx="66" cy="136" r="4" fill="#ef4444" className="animate-ping" opacity="0.8" />
              <circle cx="130" cy="136" r="4" fill="#ef4444" className="animate-ping" opacity="0.8" />
            </g>
          </svg>
        ) : animationType === 'mountain-climber' ? (
          /* ================= 4. MOUNTAIN CLIMBERS ================= */
          <svg viewBox="0 0 240 160" preserveAspectRatio="xMidYMid meet" className="w-full h-full max-h-56">
            <line x1="20" y1="142" x2="225" y2="142" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />

            {/* Braços Rígidos no Chão */}
            <path d="M180 82 L176 140" stroke="#fdba74" strokeWidth="8" strokeLinecap="round" />
            <ellipse cx="176" cy="141" rx="7" ry="3" fill="#ea580c" />

            {/* Perna 1 - Pistão Dinâmico */}
            <g className={`anim-climber-1 ${isPaused ? 'paused' : ''}`}>
              <path d="M48 136 L78 108 L116 108" stroke="#334155" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <rect x="42" y="134" width="12" height="6" rx="2" fill="#f97316" />
            </g>

            {/* Perna 2 - Pistão Alternado */}
            <g className={`anim-climber-2 ${isPaused ? 'paused' : ''}`}>
              <path d="M48 136 L106 104 L126 112" stroke="#1e293b" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <rect x="42" y="134" width="12" height="6" rx="2" fill="#f8fafc" />
            </g>

            {/* Tronco */}
            <path d="M120 104 L180 80 L174 98 L116 114 Z" fill="#ea580c" />

            {/* Cabeça */}
            <circle cx="196" cy="75" r="12" fill="#fed7aa" />
            <path d="M188 67 C198 62 208 67 206 79 Z" fill="#0f172a" />
          </svg>
        ) : animationType === 'glute-bridge' ? (
          /* ================= 5. GLUTE BRIDGE ================= */
          <svg viewBox="0 0 240 160" preserveAspectRatio="xMidYMid meet" className="w-full h-full max-h-56">
            <line x1="20" y1="142" x2="225" y2="142" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />

            {/* Ombros e Cabeça no Solo */}
            <circle cx="48" cy="135" r="12" fill="#fed7aa" />
            <path d="M40 131 C46 125 56 127 56 137 Z" fill="#0f172a" />

            {/* Pés Firmes */}
            <rect x="175" y="136" width="20" height="6" rx="2" fill="#f97316" />

            {/* Elevação Pélvica */}
            <g className={`anim-glute-thrust ${isPaused ? 'paused' : ''}`}>
              <path d="M180 136 L140 90 L120 100 L170 140 Z" fill="#1e293b" />
              <path d="M56 136 L135 95 L140 106 L62 140 Z" fill="#ea580c" />
              <circle cx="135" cy="100" r="6" fill="#ef4444" className="animate-ping" opacity="0.8" />
            </g>
          </svg>
        ) : (
          /* ================= 6. PRANCHA ISOMÉTRICA ================= */
          <svg viewBox="0 0 240 160" preserveAspectRatio="xMidYMid meet" className="w-full h-full max-h-56">
            <line x1="20" y1="142" x2="225" y2="142" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />

            <g className={`anim-plank-core ${isPaused ? 'paused' : ''}`}>
              <rect x="28" y="131" width="14" height="7" rx="2.5" fill="#f8fafc" />
              <rect x="28" y="135" width="14" height="3" rx="1.5" fill="#f97316" />

              {/* Pernas em Linha Reta */}
              <path d="M40 135 L116 114 L118 127 L44 140 Z" fill="#1e293b" />

              {/* Tronco */}
              <path d="M116 114 L174 102 L170 119 L118 127 Z" fill="#ea580c" />

              {/* Antebraço no Solo */}
              <path d="M168 110 L168 140 L190 140" stroke="#fdba74" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />

              {/* Cabeça */}
              <circle cx="198" cy="98" r="12" fill="#fed7aa" />
              <path d="M190 89 C200 84 210 89 208 100 Z" fill="#0f172a" />

              {/* Linha de Tensão Muscular do Core */}
              <line x1="116" y1="121" x2="170" y2="110" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3" className="animate-pulse" />
            </g>
          </svg>
        )}
      </div>

      {/* Footer Compacto em 1 Linha */}
      <div className="w-full flex items-center justify-between text-[9px] text-slate-500 font-mono mt-1 border-t border-white/5 pt-1 flex-nowrap">
        <span className="flex items-center gap-1 shrink-0 whitespace-nowrap">
          <span className="w-1 h-1 rounded-full bg-orange-400" />
          Cadência Controlada
        </span>
        <span className="text-slate-400 font-bold shrink-0 whitespace-nowrap">Loop Biomecânico</span>
      </div>
    </div>
  );
}

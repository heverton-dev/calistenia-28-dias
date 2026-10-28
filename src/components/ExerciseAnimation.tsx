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
    <div className={`relative flex flex-col items-center justify-between rounded-3xl bg-gradient-to-b from-[#0c1222] to-[#070b14] border border-white/10 p-4 shadow-2xl overflow-hidden ${className}`}>
      {/* Luz ambiente volumétrica de estúdio atlético */}
      <div className="absolute inset-0 bg-radial from-orange-500/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

      {/* Header com Tag de Cinemática e Status */}
      <div className="w-full flex items-center justify-between z-10 mb-2">
        <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest flex items-center gap-1.5 bg-orange-500/15 px-2.5 py-1 rounded-full border border-orange-500/30 shadow-inner">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          Cinemática 2D
        </span>
        <span className="text-[10px] text-slate-400 font-mono font-bold bg-white/5 px-2 py-0.5 rounded-lg border border-white/5">
          {isPaused ? 'Pausado' : 'Biomecânica Ativa'}
        </span>
      </div>

      {/* CSS Keyframes para Biomecânica Contínua */}
      <style>{`
        /* ================= 1. PUSH-UP / FLEXÃO ================= */
        @keyframes athletePushup {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          45%, 55% {
            transform: translateY(22px) rotate(-1deg);
          }
        }
        @keyframes pushupArmForearm {
          0%, 100% {
            transform: rotate(0deg);
          }
          45%, 55% {
            transform: rotate(50deg);
          }
        }
        @keyframes pushupChestPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          45%, 55% {
            transform: scale(1.3);
            opacity: 0.9;
          }
        }

        /* ================= 2. JUMPING JACKS ================= */
        @keyframes athleteJackBounce {
          0%, 100% {
            transform: translateY(0px) scaleY(1);
          }
          50% {
            transform: translateY(-14px) scaleY(1.02);
          }
        }
        @keyframes jackArmLeft {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(-135deg);
          }
        }
        @keyframes jackArmRight {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(135deg);
          }
        }
        @keyframes jackLegLeft {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(-24deg);
          }
        }
        @keyframes jackLegRight {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(24deg);
          }
        }

        /* ================= 3. SQUAT / AGACHAMENTO ================= */
        @keyframes athleteSquatDrop {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(32px);
          }
        }
        @keyframes squatThighFlex {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(45deg);
          }
        }
        @keyframes squatArmsCounter {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(-35deg);
          }
        }

        /* ================= 4. MOUNTAIN CLIMBERS ================= */
        @keyframes climberKneeLeft {
          0%, 100% {
            transform: translateX(0px) translateY(0px);
          }
          50% {
            transform: translateX(42px) translateY(-20px);
          }
        }
        @keyframes climberKneeRight {
          0%, 100% {
            transform: translateX(42px) translateY(-20px);
          }
          50% {
            transform: translateX(0px) translateY(0px);
          }
        }

        /* ================= 5. PLANK / HOLLOW ================= */
        @keyframes plankCoreBreath {
          0%, 100% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(1.03);
          }
        }

        /* ================= 6. GLUTE BRIDGE ================= */
        @keyframes gluteThrust {
          0%, 100% {
            transform: translateY(18px) rotate(-6deg);
          }
          50% {
            transform: translateY(0px) rotate(0deg);
          }
        }

        .anim-pushup-body { animation: athletePushup 2.2s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite; }
        .anim-pushup-arm { transform-origin: 180px 115px; animation: pushupArmForearm 2.2s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite; }
        .anim-pushup-pulse { transform-origin: 170px 110px; animation: pushupChestPulse 2.2s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite; }

        .anim-jack-body { animation: athleteJackBounce 1.05s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        .anim-jack-arm-l { transform-origin: 84px 62px; animation: jackArmLeft 1.05s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        .anim-jack-arm-r { transform-origin: 116px 62px; animation: jackArmRight 1.05s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        .anim-jack-leg-l { transform-origin: 90px 124px; animation: jackLegLeft 1.05s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        .anim-jack-leg-r { transform-origin: 110px 124px; animation: jackLegRight 1.05s cubic-bezier(0.4, 0, 0.2, 1) infinite; }

        .anim-squat-torso { animation: athleteSquatDrop 2.3s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite; }
        .anim-squat-arm { transform-origin: 100px 75px; animation: squatArmsCounter 2.3s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite; }

        .anim-climber-leg1 { animation: climberKneeLeft 0.85s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        .anim-climber-leg2 { animation: climberKneeRight 0.85s cubic-bezier(0.4, 0, 0.2, 1) infinite; }

        .anim-plank-hold { transform-origin: 100px 120px; animation: plankCoreBreath 3s ease-in-out infinite; }
        .anim-glute-bridge { transform-origin: 50px 145px; animation: gluteThrust 2.4s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite; }

        .paused { animation-play-state: paused !important; }
      `}</style>

      {/* Palco SVG Principal */}
      <div className={`relative w-full flex-1 flex items-center justify-center min-h-[170px] select-none ${isPaused ? 'paused' : ''}`}>
        {/* =========================================================
            1. PUSH-UP / PIKE-PUSHUP / DIPS
           ========================================================= */}
        {animationType === 'pushup' || animationType === 'pike-pushup' || animationType === 'dips' ? (
          <svg viewBox="0 0 250 170" preserveAspectRatio="xMidYMid meet" className="w-full h-full max-h-56">
            <defs>
              <linearGradient id="bodySkin" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffedd5" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
              <linearGradient id="tankShirt" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#c2410c" />
              </linearGradient>
              <linearGradient id="gymTights" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
              <radialGradient id="shadowFloor" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(0,0,0,0.6)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0)" />
              </radialGradient>
            </defs>

            {/* Sombra no piso */}
            <ellipse cx="125" cy="150" rx="95" ry="10" fill="url(#shadowFloor)" />
            {/* Solo de treino / Linha base */}
            <line x1="20" y1="150" x2="230" y2="150" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />

            {/* Corpo inteiro em flexão */}
            <g className={`anim-pushup-body origin-[42px_146px] ${isPaused ? 'paused' : ''}`}>
              {/* Pés com tênis esportivo e sola neon */}
              <g id="pushup-shoes">
                <path d="M28 136 C34 136 44 140 44 147 L28 147 Z" fill="#f8fafc" />
                <rect x="28" y="146" width="16" height="4" rx="2" fill="#f97316" />
              </g>

              {/* Pernas atléticas com calça de compressão */}
              <g id="pushup-legs">
                {/* Coxa e Panturrilha com contorno muscular esculpido */}
                <path
                  d="M42 143 C56 135 80 126 106 120 C108 126 90 138 46 148 Z"
                  fill="url(#gymTights)"
                  stroke="#334155"
                  strokeWidth="0.8"
                />
                <circle cx="82" cy="129" r="6" fill="#1e293b" opacity="0.6" />
                {/* Bermuda sobreposta */}
                <path d="M96 114 L126 108 L128 126 L98 129 Z" fill="#090d16" />
              </g>

              {/* Tronco Musculoso com Regata Atlética Laranja */}
              <g id="pushup-torso">
                <path
                  d="M124 108 C144 103 166 98 184 94 C192 101 190 114 178 120 C156 122 134 125 124 124 Z"
                  fill="url(#tankShirt)"
                />
                {/* Costas e Dorsal com detalhe de sombreamento */}
                <path d="M128 107 C146 102 168 98 184 94 L178 104 C158 107 140 110 128 112 Z" fill="#ea580c" opacity="0.5" />
              </g>

              {/* Cabeça e Pescoço com Postura Alinhada */}
              <g id="pushup-head">
                <circle cx="204" cy="88" r="13" fill="url(#bodySkin)" />
                {/* Cabelo moderno e fone esportivo */}
                <path d="M196 78 C206 72 218 78 217 90 C210 84 200 84 196 78 Z" fill="#0f172a" />
                <rect x="200" y="85" width="8" height="4" rx="2" fill="#f97316" />
              </g>

              {/* Braço de trás (profundidade) */}
              <path d="M174 95 L168 120 L166 148" stroke="#7c2d12" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />

              {/* Braço Ativo de Frente com Articulação Biomecânica */}
              <g className={`anim-pushup-arm ${isPaused ? 'paused' : ''}`}>
                <path
                  d="M180 100 L172 128 L170 148"
                  stroke="url(#bodySkin)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Munhequeira de treino */}
                <rect x="166" y="140" width="8" height="4" rx="1.5" fill="#f97316" />
                {/* Mão espalmada com tração no chão */}
                <ellipse cx="170" cy="149" rx="8" ry="3" fill="#fdba74" />
              </g>

              {/* Ponto de Tensão Neon no Peitoral */}
              <circle cx="172" cy="108" r="7" fill="#ef4444" className={`anim-pushup-pulse ${isPaused ? 'paused' : ''}`} />
              <circle cx="172" cy="108" r="3" fill="#ffffff" />
            </g>
          </svg>
        ) : animationType === 'jumping-jack' ? (
          /* =========================================================
              2. JUMPING JACKS (POLICHINELO)
             ========================================================= */
          <svg viewBox="0 0 220 220" preserveAspectRatio="xMidYMid meet" className="w-full h-full max-h-56">
            <defs>
              <linearGradient id="skinJacks" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fed7aa" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
              <linearGradient id="tankJacks" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#c2410c" />
              </linearGradient>
            </defs>

            {/* Sombra elástica no piso */}
            <ellipse cx="100" cy="205" rx="55" ry="7" fill="rgba(0,0,0,0.5)" />
            <line x1="30" y1="205" x2="170" y2="205" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />

            <g className={`anim-jack-body origin-[100px_205px] ${isPaused ? 'paused' : ''}`}>
              {/* Perna Esquerda Articulada com Tênis */}
              <g className={`anim-jack-leg-l ${isPaused ? 'paused' : ''}`}>
                <path d="M88 122 L76 165 L66 198 L78 200 L88 165 L94 122 Z" fill="#1e293b" />
                {/* Tênis Esquerdo */}
                <path d="M58 198 C62 194 76 195 78 200 L56 200 Z" fill="#f8fafc" />
                <rect x="56" y="200" width="22" height="3" rx="1.5" fill="#f97316" />
              </g>

              {/* Perna Direita Articulada com Tênis */}
              <g className={`anim-jack-leg-r ${isPaused ? 'paused' : ''}`}>
                <path d="M112 122 L124 165 L134 198 L122 200 L112 165 L106 122 Z" fill="#1e293b" />
                {/* Tênis Direito */}
                <path d="M122 198 C124 194 138 195 142 200 L122 200 Z" fill="#f8fafc" />
                <rect x="122" y="200" width="22" height="3" rx="1.5" fill="#f97316" />
              </g>

              {/* Shorts Esportivo */}
              <path d="M80 114 L120 114 L124 136 L76 136 Z" fill="#090d16" />

              {/* Braço Esquerdo Dinâmico com Arco */}
              <g className={`anim-jack-arm-l ${isPaused ? 'paused' : ''}`}>
                <path d="M84 62 L50 82 L42 74 L76 54 Z" fill="url(#skinJacks)" />
                <circle cx="45" cy="78" r="6" fill="#f97316" />
              </g>

              {/* Braço Direito Dinâmico com Arco */}
              <g className={`anim-jack-arm-r ${isPaused ? 'paused' : ''}`}>
                <path d="M116 62 L150 82 L158 74 L124 54 Z" fill="url(#skinJacks)" />
                <circle cx="155" cy="78" r="6" fill="#f97316" />
              </g>

              {/* Tronco Musculoso em Regata */}
              <path d="M82 56 C82 56 100 52 118 56 L114 116 L86 116 Z" fill="url(#tankJacks)" />
              {/* Clavícula e Sombreamento Peitoral */}
              <path d="M88 64 C96 68 104 68 112 64" stroke="#9a3412" strokeWidth="2" strokeLinecap="round" fill="none" />

              {/* Ombros Esculpidos */}
              <circle cx="82" cy="58" r="7" fill="#ea580c" />
              <circle cx="118" cy="58" r="7" fill="#ea580c" />

              {/* Cabeça do Atleta com Faixa Neon */}
              <circle cx="100" cy="34" r="14" fill="url(#skinJacks)" />
              <path d="M88 24 C98 18 112 20 112 32 C106 28 96 28 88 24 Z" fill="#0f172a" />
              <rect x="88" y="32" width="24" height="4" rx="2" fill="#f97316" />
            </g>
          </svg>
        ) : animationType === 'squat' || animationType === 'lunges' ? (
          /* =========================================================
              3. SQUAT / LUNGES (AGACHAMENTO PROFUNDO)
             ========================================================= */
          <svg viewBox="0 0 220 220" preserveAspectRatio="xMidYMid meet" className="w-full h-full max-h-56">
            <defs>
              <linearGradient id="squatSkin" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fed7aa" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
            </defs>

            {/* Solo de Treino */}
            <ellipse cx="110" cy="205" rx="65" ry="8" fill="rgba(0,0,0,0.5)" />
            <line x1="25" y1="205" x2="195" y2="205" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />

            {/* Pés firmes no piso (permanecem ancorados no solo) */}
            <path d="M68 196 C72 192 84 194 88 205 L64 205 Z" fill="#f8fafc" />
            <rect x="64" y="204" width="24" height="3" rx="1.5" fill="#f97316" />

            <path d="M128 196 C132 192 144 194 148 205 L124 205 Z" fill="#f8fafc" />
            <rect x="124" y="204" width="24" height="3" rx="1.5" fill="#f97316" />

            {/* Tronco, Quadril e Braços com Descida Biomecânica */}
            <g className={`anim-squat-torso origin-[100px_205px] ${isPaused ? 'paused' : ''}`}>
              {/* Pernas em flexão de agachamento */}
              <path d="M72 198 L60 160 L78 135 L90 162 Z" fill="#1e293b" />
              <path d="M136 198 L148 160 L130 135 L118 162 Z" fill="#1e293b" />

              {/* Joelhos e Coxas com Tensão Muscular */}
              <circle cx="58" cy="160" r="7" fill="#334155" />
              <circle cx="150" cy="160" r="7" fill="#334155" />

              {/* Shorts Esportivo */}
              <path d="M74 125 L134 125 L138 145 L70 145 Z" fill="#090d16" />

              {/* Braços estendidos à frente para equilíbrio perfeito */}
              <g className={`anim-squat-arm ${isPaused ? 'paused' : ''}`}>
                <path d="M96 70 L46 76 L44 68 L94 62 Z" fill="url(#squatSkin)" />
                <ellipse cx="42" cy="72" rx="6" ry="5" fill="#f97316" />
              </g>

              {/* Tronco com Regata Laranja Inclinado com Neutro Lombar */}
              <path d="M82 60 C82 60 100 56 122 60 L118 128 L86 128 Z" fill="#ea580c" />
              <path d="M88 66 C98 70 110 70 118 66" stroke="#9a3412" strokeWidth="2" strokeLinecap="round" fill="none" />

              {/* Cabeça Olhando à Frente */}
              <circle cx="106" cy="40" r="14" fill="url(#squatSkin)" />
              <path d="M96 30 C106 24 118 28 116 40 C110 34 102 34 96 30 Z" fill="#0f172a" />
              <rect x="96" y="38" width="22" height="4" rx="2" fill="#f97316" />

              {/* Indicador de Tensão nos Quadríceps */}
              <circle cx="70" cy="148" r="4" fill="#ef4444" className="animate-ping" opacity="0.7" />
              <circle cx="138" cy="148" r="4" fill="#ef4444" className="animate-ping" opacity="0.7" />
            </g>
          </svg>
        ) : animationType === 'mountain-climber' ? (
          /* =========================================================
              4. MOUNTAIN CLIMBERS (ESCALADOR DINÂMICO)
             ========================================================= */
          <svg viewBox="0 0 250 170" preserveAspectRatio="xMidYMid meet" className="w-full h-full max-h-56">
            {/* Solo */}
            <line x1="20" y1="150" x2="230" y2="150" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />

            {/* Braços de Apoio em Prancha Alta */}
            <path d="M185 85 L180 148" stroke="#fdba74" strokeWidth="9" strokeLinecap="round" />
            <ellipse cx="180" cy="149" rx="8" ry="3" fill="#ea580c" />

            {/* Perna 1 - Bombeando ao Peito */}
            <g className={`anim-climber-leg1 ${isPaused ? 'paused' : ''}`}>
              <path d="M48 144 L80 115 L120 115" stroke="#334155" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <rect x="42" y="142" width="14" height="6" rx="2" fill="#f97316" />
            </g>

            {/* Perna 2 - Alternada */}
            <g className={`anim-climber-leg2 ${isPaused ? 'paused' : ''}`}>
              <path d="M48 144 L110 110 L130 118" stroke="#1e293b" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <rect x="42" y="142" width="14" height="6" rx="2" fill="#f8fafc" />
            </g>

            {/* Tronco Musculoso em Prancha */}
            <path d="M125 110 L185 85 L178 105 L120 120 Z" fill="#ea580c" />

            {/* Cabeça */}
            <circle cx="202" cy="80" r="13" fill="#fed7aa" />
            <path d="M194 72 C204 66 216 72 214 84 C208 78 198 78 194 72 Z" fill="#0f172a" />
          </svg>
        ) : animationType === 'glute-bridge' ? (
          /* =========================================================
              5. GLUTE BRIDGE (ELEVAÇÃO PÉLVICA)
             ========================================================= */
          <svg viewBox="0 0 250 170" preserveAspectRatio="xMidYMid meet" className="w-full h-full max-h-56">
            <line x1="20" y1="150" x2="230" y2="150" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />

            {/* Cabeça e Ombros no Chão */}
            <circle cx="50" cy="142" r="13" fill="#fed7aa" />
            <path d="M42 138 C48 132 58 134 58 144 Z" fill="#0f172a" />

            {/* Pés cravados no solo */}
            <rect x="180" y="144" width="22" height="6" rx="2" fill="#f97316" />

            {/* Tronco e Quadril Elevando */}
            <g className={`anim-glute-bridge ${isPaused ? 'paused' : ''}`}>
              {/* Coxas conectadas aos pés */}
              <path d="M185 144 L145 95 L125 105 L175 148 Z" fill="#1e293b" />
              {/* Tronco em Linha Reta com Quadril */}
              <path d="M58 144 L140 100 L146 112 L64 148 Z" fill="#ea580c" />
              {/* Tensão Glútea */}
              <circle cx="140" cy="105" r="6" fill="#ef4444" className="animate-ping" opacity="0.8" />
            </g>
          </svg>
        ) : (
          /* =========================================================
              6. PLANK / HOLLOW / DEFAULT (PRANCHA ISOMÉTRICA)
             ========================================================= */
          <svg viewBox="0 0 250 170" preserveAspectRatio="xMidYMid meet" className="w-full h-full max-h-56">
            <line x1="20" y1="150" x2="230" y2="150" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />

            <g className={`anim-plank-hold ${isPaused ? 'paused' : ''}`}>
              {/* Pés apoiados na ponta */}
              <rect x="28" y="138" width="16" height="8" rx="3" fill="#f8fafc" />
              <rect x="28" y="142" width="16" height="4" rx="2" fill="#f97316" />

              {/* Pernas em Linha Reta Perfeita */}
              <path d="M42 142 L120 120 L122 134 L46 148 Z" fill="#1e293b" />

              {/* Tronco e Abdômen Rígido */}
              <path d="M120 120 L180 108 L176 126 L122 134 Z" fill="#ea580c" />

              {/* Antebraço no Solo (Prancha Baixa) */}
              <path d="M174 116 L174 148 L196 148" stroke="#fdba74" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />

              {/* Cabeça Alinhada com a Coluna */}
              <circle cx="204" cy="104" r="13" fill="#fed7aa" />
              <path d="M196 95 C206 90 216 95 214 106 Z" fill="#0f172a" />

              {/* Linha de Tensão Biomecânica do Core */}
              <line x1="120" y1="128" x2="175" y2="116" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3" className="animate-pulse" />
            </g>
          </svg>
        )}
      </div>

      {/* Footer com Indicador de Cadência */}
      <div className="w-full flex items-center justify-between text-[10px] text-slate-500 font-mono mt-1 border-t border-white/5 pt-1.5">
        <span className="flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-orange-400" />
          Cadência Controlada
        </span>
        <span className="text-slate-400 font-bold">Loop Biomecânico</span>
      </div>
    </div>
  );
}

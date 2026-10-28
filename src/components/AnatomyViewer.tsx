import { useState } from 'react';
import { MuscleGroup } from '../types/workout';

export const MUSCLE_LABELS: Record<MuscleGroup, string> = {
  chest: 'Peitoral',
  triceps: 'Tríceps',
  shoulders: 'Deltóides / Ombros',
  core: 'Abdômen / Core',
  back: 'Dorsais / Costas',
  quads: 'Quadríceps',
  glutes: 'Glúteos',
  calves: 'Panturrilhas'
};

export function getMuscleFillColor(
  group: MuscleGroup,
  primary: MuscleGroup[],
  secondary: MuscleGroup[]
): string {
  if (primary.includes(group)) {
    return '#ef4444'; // vermelho/laranja intenso
  }
  if (secondary.includes(group)) {
    return '#f59e0b'; // âmbar/amarelo
  }
  return '#1e293b'; // cinza escuro inativo
}

interface AnatomyViewerProps {
  primaryMuscles: MuscleGroup[];
  secondaryMuscles: MuscleGroup[];
  className?: string;
}

export function AnatomyViewer({
  primaryMuscles,
  secondaryMuscles,
  className = ''
}: AnatomyViewerProps) {
  const hasBackPrimary = primaryMuscles.some(m => ['back', 'glutes', 'triceps'].includes(m));
  const [view, setView] = useState<'front' | 'back'>(hasBackPrimary && !primaryMuscles.includes('chest') ? 'back' : 'front');

  const isPrimary = (group: MuscleGroup) => primaryMuscles.includes(group);
  const isSecondary = (group: MuscleGroup) => secondaryMuscles.includes(group);

  const getFill = (group: MuscleGroup) => {
    if (isPrimary(group)) return 'url(#fireNeonPrimary)';
    if (isSecondary(group)) return 'url(#fireNeonSecondary)';
    return '#182438'; // Músculo em repouso
  };

  const getFilter = (group: MuscleGroup) => {
    if (isPrimary(group)) return 'url(#glowPrimary)';
    if (isSecondary(group)) return 'url(#glowSecondary)';
    return undefined;
  };

  return (
    <div className={`relative flex flex-col items-center justify-between rounded-3xl bg-gradient-to-b from-[#0c1222] to-[#070b14] border border-white/10 p-3 shadow-2xl overflow-hidden ${className}`}>
      {/* Glow ambiente de fundo */}
      <div className="absolute inset-0 bg-radial from-orange-500/10 via-transparent to-transparent pointer-events-none" />

      {/* Header Compacto de Alta Densidade */}
      <div className="w-full flex items-center justify-between z-10 mb-1 gap-1">
        {/* Chips de Músculos Ativos */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar scrollbar-none py-0.5 max-w-[65%]">
          {primaryMuscles.map(m => (
            <span
              key={m}
              className="text-[9px] font-black tracking-tight px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 flex items-center gap-1 shrink-0 shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              {MUSCLE_LABELS[m]}
            </span>
          ))}
          {secondaryMuscles.map(m => (
            <span
              key={m}
              className="text-[9px] font-bold tracking-tight px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 shrink-0"
            >
              {MUSCLE_LABELS[m]}
            </span>
          ))}
        </div>

        {/* Toggle Frente / Costas */}
        <div className="flex bg-[#121a2d] p-0.5 rounded-xl border border-white/5 shrink-0">
          <button
            type="button"
            onClick={() => setView('front')}
            className={`text-[9px] font-extrabold px-2 py-1 rounded-lg transition-all ${
              view === 'front'
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Frente
          </button>
          <button
            type="button"
            onClick={() => setView('back')}
            className={`text-[9px] font-extrabold px-2 py-1 rounded-lg transition-all ${
              view === 'back'
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Costas
          </button>
        </div>
      </div>

      {/* Área Central com a Silhueta Atlética */}
      <div className="relative w-full flex-1 flex items-center justify-center min-h-0 select-none py-1">
        <svg
          viewBox="0 0 200 290"
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full max-h-56 drop-shadow-xl"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="glowPrimary" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glowSecondary" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Gradiente Neon de Ativação Primária (Hipertrofia Ativa) */}
            <linearGradient id="fireNeonPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff4500" />
              <stop offset="50%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>

            {/* Gradiente de Ativação Secundária (Sinergista) */}
            <linearGradient id="fireNeonSecondary" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>

            {/* Sombra de oclusão anatômica */}
            <linearGradient id="boneShade" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#25334d" />
              <stop offset="100%" stopColor="#141c2c" />
            </linearGradient>
          </defs>

          {view === 'front' ? (
            /* ================= VISTA ANTERIOR (FRENTE) ================= */
            <g id="body-front">
              {/* Cabeça e Pescoço com Proporção Atlética */}
              <circle cx="100" cy="22" r="13" fill="#25334d" />
              <path d="M94 33 L106 33 L108 44 L92 44 Z" fill="#1b253b" />

              {/* Trapézio Anterior */}
              <path d="M86 43 C93 39 107 39 114 43 L122 50 L78 50 Z" fill="#1e2a3e" />

              {/* Deltóides / Ombros (Esquerdo e Direito) */}
              <path
                d="M76 46 C66 50 58 60 60 72 C66 74 74 70 78 60 Z"
                fill={getFill('shoulders')}
                filter={getFilter('shoulders')}
                className="transition-all duration-300"
              />
              <path
                d="M124 46 C134 50 142 60 140 72 C134 74 126 70 122 60 Z"
                fill={getFill('shoulders')}
                filter={getFilter('shoulders')}
                className="transition-all duration-300"
              />

              {/* Peitoral Maior Esculpido com Fibras Estriadas */}
              <path
                d="M78 52 C88 52 98 56 99 72 C88 75 78 70 77 60 Z"
                fill={getFill('chest')}
                filter={getFilter('chest')}
                stroke="#0b101f"
                strokeWidth="1.2"
                className="transition-all duration-300"
              />
              <path
                d="M122 52 C112 52 102 56 101 72 C112 75 122 70 123 60 Z"
                fill={getFill('chest')}
                filter={getFilter('chest')}
                stroke="#0b101f"
                strokeWidth="1.2"
                className="transition-all duration-300"
              />

              {/* Bíceps & Braço Superior */}
              <path
                d="M59 72 C53 82 54 98 58 106 C64 104 67 94 67 76 Z"
                fill={getFill('triceps')}
                filter={getFilter('triceps')}
                stroke="#0b101f"
                strokeWidth="1"
                className="transition-all duration-300"
              />
              <path
                d="M141 72 C147 82 146 98 142 106 C136 104 133 94 133 76 Z"
                fill={getFill('triceps')}
                filter={getFilter('triceps')}
                stroke="#0b101f"
                strokeWidth="1"
                className="transition-all duration-300"
              />

              {/* Antebraços */}
              <path d="M57 108 C52 124 50 142 52 150 C56 150 61 132 62 112 Z" fill="#202c44" />
              <path d="M143 108 C148 124 150 142 148 150 C144 150 139 132 138 112 Z" fill="#202c44" />

              {/* Serrátil e Oblíquos (Core Lateral) */}
              <path
                d="M75 72 C78 84 80 100 84 112 C81 102 77 88 75 72 Z"
                fill={getFill('core')}
                filter={getFilter('core')}
                className="transition-all duration-300"
              />
              <path
                d="M125 72 C122 84 120 100 116 112 C119 102 123 88 125 72 Z"
                fill={getFill('core')}
                filter={getFilter('core')}
                className="transition-all duration-300"
              />

              {/* Abdômen 6-Pack com Linha Alba Esculpida */}
              <g id="abs-front" fill={getFill('core')} filter={getFilter('core')} className="transition-all duration-300">
                <rect x="86" y="76" width="12" height="10" rx="2" stroke="#0b101f" strokeWidth="1" />
                <rect x="102" y="76" width="12" height="10" rx="2" stroke="#0b101f" strokeWidth="1" />
                <rect x="86" y="88" width="12" height="11" rx="2" stroke="#0b101f" strokeWidth="1" />
                <rect x="102" y="88" width="12" height="11" rx="2" stroke="#0b101f" strokeWidth="1" />
                <rect x="87" y="101" width="11" height="12" rx="2" stroke="#0b101f" strokeWidth="1" />
                <rect x="102" y="101" width="11" height="12" rx="2" stroke="#0b101f" strokeWidth="1" />
              </g>

              {/* Quadril / Pelve */}
              <path d="M82 116 L118 116 L122 140 L78 140 Z" fill="#141c2c" />

              {/* Quadríceps (Reto Femoral e Vasto Lateral/Medial) */}
              <path
                d="M78 142 C72 166 70 192 77 210 C88 210 94 184 96 142 Z"
                fill={getFill('quads')}
                filter={getFilter('quads')}
                stroke="#0b101f"
                strokeWidth="1.2"
                className="transition-all duration-300"
              />
              <path
                d="M122 142 C128 166 130 192 123 210 C112 210 106 184 104 142 Z"
                fill={getFill('quads')}
                filter={getFilter('quads')}
                stroke="#0b101f"
                strokeWidth="1.2"
                className="transition-all duration-300"
              />

              {/* Joelhos */}
              <circle cx="80" cy="216" r="4.5" fill="#202c44" />
              <circle cx="120" cy="216" r="4.5" fill="#202c44" />

              {/* Panturrilhas / Gastrocnêmio */}
              <path
                d="M76 222 C70 240 72 258 76 272 C83 272 86 254 84 222 Z"
                fill={getFill('calves')}
                filter={getFilter('calves')}
                stroke="#0b101f"
                strokeWidth="1.2"
                className="transition-all duration-300"
              />
              <path
                d="M124 222 C130 240 128 258 124 272 C117 272 114 254 116 222 Z"
                fill={getFill('calves')}
                filter={getFilter('calves')}
                stroke="#0b101f"
                strokeWidth="1.2"
                className="transition-all duration-300"
              />

              {/* Pés */}
              <ellipse cx="76" cy="275" rx="6" ry="2.5" fill="#202c44" />
              <ellipse cx="124" cy="275" rx="6" ry="2.5" fill="#202c44" />
            </g>
          ) : (
            /* ================= VISTA POSTERIOR (COSTAS) ================= */
            <g id="body-back">
              {/* Cabeça e Pescoço Traseiro */}
              <circle cx="100" cy="22" r="13" fill="#202c44" />
              <path d="M94 33 L106 33 L108 44 L92 44 Z" fill="#1b253b" />

              {/* Trapézio Dorsal (Diamante Central de Força) */}
              <path
                d="M100 40 L118 50 L100 78 L82 50 Z"
                fill={getFill('back')}
                filter={getFilter('back')}
                stroke="#0b101f"
                strokeWidth="1"
                className="transition-all duration-300"
              />

              {/* Deltóides Posteriores */}
              <path
                d="M76 46 C66 50 58 60 60 72 C66 74 74 70 78 60 Z"
                fill={getFill('shoulders')}
                filter={getFilter('shoulders')}
                className="transition-all duration-300"
              />
              <path
                d="M124 46 C134 50 142 60 140 72 C134 74 126 70 122 60 Z"
                fill={getFill('shoulders')}
                filter={getFilter('shoulders')}
                className="transition-all duration-300"
              />

              {/* Grande Dorsal (V-Taper / Asas) */}
              <path
                d="M78 60 C82 78 85 96 94 108 C85 98 75 82 73 64 Z"
                fill={getFill('back')}
                filter={getFilter('back')}
                stroke="#0b101f"
                strokeWidth="1"
                className="transition-all duration-300"
              />
              <path
                d="M122 60 C118 78 115 96 106 108 C115 98 125 82 127 64 Z"
                fill={getFill('back')}
                filter={getFilter('back')}
                stroke="#0b101f"
                strokeWidth="1"
                className="transition-all duration-300"
              />

              {/* Tríceps Braquial (Foco Posterior) */}
              <path
                d="M58 72 C52 82 54 98 58 106 C64 104 67 94 67 76 Z"
                fill={getFill('triceps')}
                filter={getFilter('triceps')}
                stroke="#0b101f"
                strokeWidth="1"
                className="transition-all duration-300"
              />
              <path
                d="M142 72 C148 82 146 98 142 106 C136 104 133 94 133 76 Z"
                fill={getFill('triceps')}
                filter={getFilter('triceps')}
                stroke="#0b101f"
                strokeWidth="1"
                className="transition-all duration-300"
              />

              {/* Antebraços Traseiros */}
              <path d="M57 108 C52 124 50 142 52 150 C56 150 61 132 62 112 Z" fill="#202c44" />
              <path d="M143 108 C148 124 150 142 148 150 C144 150 139 132 138 112 Z" fill="#202c44" />

              {/* Lombar e Eretores da Espinha */}
              <path
                d="M93 80 L107 80 L106 116 L94 116 Z"
                fill={getFill('back')}
                filter={getFilter('back')}
                stroke="#0b101f"
                strokeWidth="1"
                className="transition-all duration-300"
              />

              {/* Glúteos Máximos Esculpidos */}
              <path
                d="M80 118 C80 118 90 116 100 120 C100 134 94 148 82 148 C76 142 78 126 80 118 Z"
                fill={getFill('glutes')}
                filter={getFilter('glutes')}
                stroke="#0b101f"
                strokeWidth="1.2"
                className="transition-all duration-300"
              />
              <path
                d="M120 118 C120 118 110 116 100 120 C100 134 106 148 118 148 C124 142 122 126 120 118 Z"
                fill={getFill('glutes')}
                filter={getFilter('glutes')}
                stroke="#0b101f"
                strokeWidth="1.2"
                className="transition-all duration-300"
              />

              {/* Isquiotibiais (Posterior de Coxa) */}
              <path
                d="M80 150 C76 172 74 194 78 210 C86 210 92 186 94 150 Z"
                fill={getFill('quads')}
                filter={getFilter('quads')}
                stroke="#0b101f"
                strokeWidth="1.2"
                className="transition-all duration-300"
              />
              <path
                d="M120 150 C124 172 126 194 122 210 C114 210 108 186 106 150 Z"
                fill={getFill('quads')}
                filter={getFilter('quads')}
                stroke="#0b101f"
                strokeWidth="1.2"
                className="transition-all duration-300"
              />

              {/* Joelhos Traseiros / Fossa Poplítea */}
              <circle cx="80" cy="216" r="4" fill="#202c44" />
              <circle cx="120" cy="216" r="4" fill="#202c44" />

              {/* Panturrilhas Posteriores (Gastrocnêmio Bi-lobado) */}
              <path
                d="M77 222 C70 240 72 258 76 272 C83 272 86 254 84 222 Z"
                fill={getFill('calves')}
                filter={getFilter('calves')}
                stroke="#0b101f"
                strokeWidth="1.2"
                className="transition-all duration-300"
              />
              <path
                d="M123 222 C130 240 128 258 124 272 C117 272 114 254 116 222 Z"
                fill={getFill('calves')}
                filter={getFilter('calves')}
                stroke="#0b101f"
                strokeWidth="1.2"
                className="transition-all duration-300"
              />

              {/* Pés */}
              <ellipse cx="76" cy="275" rx="5" ry="2.5" fill="#202c44" />
              <ellipse cx="124" cy="275" rx="5" ry="2.5" fill="#202c44" />
            </g>
          )}
        </svg>
      </div>

      {/* Legenda de Ativação no Rodapé */}
      <div className="w-full flex items-center justify-between text-[9px] text-slate-500 font-mono mt-1 border-t border-white/5 pt-1.5">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
          Foco Primário
        </span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          Sinergista
        </span>
      </div>
    </div>
  );
}

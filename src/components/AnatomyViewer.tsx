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
    return '#ef4444'; // Vermelho intenso
  }
  if (secondary.includes(group)) {
    return '#f59e0b'; // Âmbar/Laranja
  }
  return '#1e293b'; // Base inativa
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
  // Detecta automaticamente se a visualização deve focar na frente ou nas costas
  const hasBackPrimary = primaryMuscles.some(m => ['back', 'glutes', 'triceps'].includes(m));
  const [view, setView] = useState<'front' | 'back'>(hasBackPrimary && !primaryMuscles.includes('chest') ? 'back' : 'front');

  const isPrimary = (group: MuscleGroup) => primaryMuscles.includes(group);
  const isSecondary = (group: MuscleGroup) => secondaryMuscles.includes(group);

  const getFill = (group: MuscleGroup) => {
    if (isPrimary(group)) return 'url(#fireGlowPrimary)';
    if (isSecondary(group)) return 'url(#fireGlowSecondary)';
    return view === 'front' ? '#182235' : '#141d2e';
  };

  const getFilter = (group: MuscleGroup) => {
    if (isPrimary(group)) return 'url(#glowPrimary)';
    if (isSecondary(group)) return 'url(#glowSecondary)';
    return undefined;
  };

  return (
    <div className={`relative flex flex-col items-center justify-between rounded-2xl bg-[#090d19] border border-white/10 p-3 shadow-2xl overflow-hidden ${className}`}>
      {/* Luz ambiente de fundo neon */}
      <div className="absolute inset-0 bg-radial from-orange-500/10 via-transparent to-transparent pointer-events-none" />

      {/* Header com Seletor Frente/Costas e Músculos Ativos */}
      <div className="w-full flex items-center justify-between z-10 mb-1">
        <div className="flex flex-wrap gap-1 max-w-[70%]">
          {primaryMuscles.map(m => (
            <span
              key={m}
              className="text-[10px] font-bold tracking-tight px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 flex items-center gap-1 shadow-sm shadow-red-500/20"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              {MUSCLE_LABELS[m]}
            </span>
          ))}
          {secondaryMuscles.map(m => (
            <span
              key={m}
              className="text-[10px] font-medium tracking-tight px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30"
            >
              {MUSCLE_LABELS[m]}
            </span>
          ))}
        </div>

        {/* Toggle Frente / Costas */}
        <div className="flex bg-[#12192b] p-0.5 rounded-xl border border-white/5">
          <button
            type="button"
            onClick={() => setView('front')}
            className={`text-[10px] font-bold px-2 py-1 rounded-lg transition-all ${
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
            className={`text-[10px] font-bold px-2 py-1 rounded-lg transition-all ${
              view === 'back'
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Costas
          </button>
        </div>
      </div>

      {/* Ilustração Anatômica Vetorial Atlética em Alta Fidelidade */}
      <div className="relative w-full flex items-center justify-center my-1">
        <svg
          viewBox="0 0 200 330"
          className="w-48 h-64 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Filtros de bioluminescência ativa dos músculos */}
            <filter id="glowPrimary" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glowSecondary" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Gradientes dos Músculos Ativos */}
            <linearGradient id="fireGlowPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff4500" />
              <stop offset="50%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>

            <linearGradient id="fireGlowSecondary" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>

            <linearGradient id="bodyBase" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>

          {view === 'front' ? (
            /* ================= VISTA FRONTAL ATALÉTICA ================= */
            <g id="body-front">
              {/* Silhueta Subjacente de Contorno */}
              <path
                d="M100 20 C108 20 114 26 114 34 C114 43 108 48 100 48 C92 48 86 43 86 34 C86 26 92 20 100 20 Z"
                fill="#243048"
              />
              <path d="M93 46 L107 46 L110 56 L90 56 Z" fill="#1b253b" />

              {/* Trapézio Superior */}
              <path d="M84 54 C91 50 109 50 116 54 L122 62 L78 62 Z" fill="#1b253b" />

              {/* Ombros / Deltóides Anteriores e Laterais */}
              <path
                d="M76 60 C64 64 56 74 58 88 C66 90 74 84 78 72 Z"
                fill={getFill('shoulders')}
                filter={getFilter('shoulders')}
                className="transition-all duration-300"
              />
              <path
                d="M124 60 C136 64 144 74 142 88 C134 90 126 84 122 72 Z"
                fill={getFill('shoulders')}
                filter={getFilter('shoulders')}
                className="transition-all duration-300"
              />

              {/* Peitoral Maior (Esquerdo e Direito com corte muscular nítido) */}
              <path
                d="M78 65 C88 65 98 70 99 87 C87 91 76 84 76 74 Z"
                fill={getFill('chest')}
                filter={getFilter('chest')}
                stroke="#090d19"
                strokeWidth="1.5"
                className="transition-all duration-300"
              />
              <path
                d="M122 65 C112 65 102 70 101 87 C113 91 124 84 124 74 Z"
                fill={getFill('chest')}
                filter={getFilter('chest')}
                stroke="#090d19"
                strokeWidth="1.5"
                className="transition-all duration-300"
              />

              {/* Bíceps & Tríceps (Braço Superior) */}
              <path
                d="M57 88 C50 100 52 118 57 128 C63 126 66 114 66 94 Z"
                fill={getFill('triceps')}
                filter={getFilter('triceps')}
                stroke="#090d19"
                strokeWidth="1"
                className="transition-all duration-300"
              />
              <path
                d="M143 88 C150 100 148 118 143 128 C137 126 134 114 134 94 Z"
                fill={getFill('triceps')}
                filter={getFilter('triceps')}
                stroke="#090d19"
                strokeWidth="1"
                className="transition-all duration-300"
              />

              {/* Antebraços */}
              <path d="M56 130 C50 148 48 168 50 178 C54 178 60 156 61 134 Z" fill="#202c44" />
              <path d="M144 130 C150 148 152 168 150 178 C146 178 140 156 139 134 Z" fill="#202c44" />

              {/* Serrátil Anterior / Oblíquos Laterais */}
              <path
                d="M73 88 C76 102 78 120 83 134 C80 122 75 106 73 88 Z"
                fill={getFill('core')}
                filter={getFilter('core')}
                className="transition-all duration-300"
              />
              <path
                d="M127 88 C124 102 122 120 117 134 C120 122 125 106 127 88 Z"
                fill={getFill('core')}
                filter={getFilter('core')}
                className="transition-all duration-300"
              />

              {/* Abdômen 6-Pack Esculpido com Linha Alba */}
              <g id="abs-group" fill={getFill('core')} filter={getFilter('core')} className="transition-all duration-300">
                {/* Gomos Superiores */}
                <rect x="85" y="90" width="13" height="12" rx="3" stroke="#090d19" strokeWidth="1.2" />
                <rect x="102" y="90" width="13" height="12" rx="3" stroke="#090d19" strokeWidth="1.2" />
                {/* Gomos Médios */}
                <rect x="85" y="104" width="13" height="13" rx="3" stroke="#090d19" strokeWidth="1.2" />
                <rect x="102" y="104" width="13" height="13" rx="3" stroke="#090d19" strokeWidth="1.2" />
                {/* Gomos Inferiores */}
                <rect x="86" y="119" width="12" height="14" rx="3" stroke="#090d19" strokeWidth="1.2" />
                <rect x="102" y="119" width="12" height="14" rx="3" stroke="#090d19" strokeWidth="1.2" />
              </g>

              {/* Quadril / Pelve */}
              <path d="M82 136 L118 136 L124 162 L76 162 Z" fill="#1b253b" />

              {/* Quadríceps (Vasto Medial, Vasto Lateral, Reto Femoral de cada perna) */}
              <path
                d="M78 165 C72 190 70 218 78 240 C90 240 96 210 97 165 Z"
                fill={getFill('quads')}
                filter={getFilter('quads')}
                stroke="#090d19"
                strokeWidth="1.5"
                className="transition-all duration-300"
              />
              <path
                d="M122 165 C128 190 130 218 122 240 C110 240 104 210 103 165 Z"
                fill={getFill('quads')}
                filter={getFilter('quads')}
                stroke="#090d19"
                strokeWidth="1.5"
                className="transition-all duration-300"
              />

              {/* Joelhos Articulares */}
              <circle cx="80" cy="246" r="5" fill="#202c44" />
              <circle cx="120" cy="246" r="5" fill="#202c44" />

              {/* Panturrilhas / Gastrocnêmio */}
              <path
                d="M76 253 C70 274 72 295 77 312 C84 312 87 292 85 253 Z"
                fill={getFill('calves')}
                filter={getFilter('calves')}
                stroke="#090d19"
                strokeWidth="1.5"
                className="transition-all duration-300"
              />
              <path
                d="M124 253 C130 274 128 295 123 312 C116 312 113 292 115 253 Z"
                fill={getFill('calves')}
                filter={getFilter('calves')}
                stroke="#090d19"
                strokeWidth="1.5"
                className="transition-all duration-300"
              />

              {/* Pés */}
              <path d="M72 314 C72 318 84 322 84 314 Z" fill="#202c44" />
              <path d="M128 314 C128 318 116 322 116 314 Z" fill="#202c44" />
            </g>
          ) : (
            /* ================= VISTA POSTERIOR (COSTAS & GLÚTEOS) ================= */
            <g id="body-back">
              {/* Cabeça e Pescoço Traseiro */}
              <path
                d="M100 20 C108 20 114 26 114 34 C114 43 108 48 100 48 C92 48 86 43 86 34 C86 26 92 20 100 20 Z"
                fill="#202c44"
              />
              <path d="M92 46 L108 46 L111 56 L89 56 Z" fill="#1b253b" />

              {/* Trapézio Dorsal (Formato de Diamante/Pipa) */}
              <path
                d="M100 52 L120 64 L100 95 L80 64 Z"
                fill={getFill('back')}
                filter={getFilter('back')}
                stroke="#090d19"
                strokeWidth="1.2"
                className="transition-all duration-300"
              />

              {/* Deltóides Posteriores */}
              <path
                d="M78 60 C66 64 58 74 60 88 C68 89 74 83 78 72 Z"
                fill={getFill('shoulders')}
                filter={getFilter('shoulders')}
                className="transition-all duration-300"
              />
              <path
                d="M122 60 C134 64 142 74 140 88 C132 89 126 83 122 72 Z"
                fill={getFill('shoulders')}
                filter={getFilter('shoulders')}
                className="transition-all duration-300"
              />

              {/* Grande Dorsal (Asas das Costas) */}
              <path
                d="M78 74 C82 95 86 116 96 128 C86 118 74 100 72 78 Z"
                fill={getFill('back')}
                filter={getFilter('back')}
                stroke="#090d19"
                strokeWidth="1.2"
                className="transition-all duration-300"
              />
              <path
                d="M122 74 C118 95 114 116 104 128 C114 118 126 100 128 78 Z"
                fill={getFill('back')}
                filter={getFilter('back')}
                stroke="#090d19"
                strokeWidth="1.2"
                className="transition-all duration-300"
              />

              {/* Tríceps (Visão Posterior Completa) */}
              <path
                d="M58 86 C52 98 54 116 59 126 C64 124 68 112 68 94 Z"
                fill={getFill('triceps')}
                filter={getFilter('triceps')}
                stroke="#090d19"
                strokeWidth="1.2"
                className="transition-all duration-300"
              />
              <path
                d="M142 86 C148 98 146 116 141 126 C136 124 132 112 132 94 Z"
                fill={getFill('triceps')}
                filter={getFilter('triceps')}
                stroke="#090d19"
                strokeWidth="1.2"
                className="transition-all duration-300"
              />

              {/* Glúteos Máximos (Esquerdo e Direito com relevo) */}
              <path
                d="M76 138 C80 135 99 135 100 152 C99 168 76 166 74 146 Z"
                fill={getFill('glutes')}
                filter={getFilter('glutes')}
                stroke="#090d19"
                strokeWidth="1.5"
                className="transition-all duration-300"
              />
              <path
                d="M124 138 C120 135 101 135 100 152 C101 168 124 166 126 146 Z"
                fill={getFill('glutes')}
                filter={getFilter('glutes')}
                stroke="#090d19"
                strokeWidth="1.5"
                className="transition-all duration-300"
              />

              {/* Isquiotibiais / Posterior de Coxa */}
              <path
                d="M77 166 C72 190 70 218 78 240 C88 240 96 215 97 166 Z"
                fill={getFill('quads')}
                filter={getFilter('quads')}
                stroke="#090d19"
                strokeWidth="1.2"
                className="transition-all duration-300"
              />
              <path
                d="M123 166 C128 190 130 218 122 240 C112 240 104 215 103 166 Z"
                fill={getFill('quads')}
                filter={getFilter('quads')}
                stroke="#090d19"
                strokeWidth="1.2"
                className="transition-all duration-300"
              />

              {/* Panturrilhas Posteriores (Gêmeos) */}
              <path
                d="M76 253 C69 274 72 295 77 312 C84 312 87 292 85 253 Z"
                fill={getFill('calves')}
                filter={getFilter('calves')}
                stroke="#090d19"
                strokeWidth="1.2"
                className="transition-all duration-300"
              />
              <path
                d="M124 253 C131 274 128 295 123 312 C116 312 113 292 115 253 Z"
                fill={getFill('calves')}
                filter={getFilter('calves')}
                stroke="#090d19"
                strokeWidth="1.2"
                className="transition-all duration-300"
              />
            </g>
          )}
        </svg>
      </div>

      <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wider">
        Mapa Muscular Ativo • {view === 'front' ? 'Visão Anterior' : 'Visão Posterior'}
      </span>
    </div>
  );
}

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
    return '#f59e0b'; // Âmbar / amarelo
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
  const hasBackPrimary = primaryMuscles.some(m => ['back', 'glutes', 'triceps'].includes(m));
  const [view, setView] = useState<'front' | 'back'>(hasBackPrimary && !primaryMuscles.includes('chest') ? 'back' : 'front');

  const isPrimary = (group: MuscleGroup) => primaryMuscles.includes(group);
  const isSecondary = (group: MuscleGroup) => secondaryMuscles.includes(group);

  const getFill = (group: MuscleGroup) => {
    if (isPrimary(group)) return 'url(#fireNeonPrimary)';
    if (isSecondary(group)) return 'url(#fireNeonSecondary)';
    return 'url(#inactiveMuscleGrad)';
  };

  const getFilter = (group: MuscleGroup) => {
    if (isPrimary(group)) return 'url(#glowPrimary)';
    if (isSecondary(group)) return 'url(#glowSecondary)';
    return undefined;
  };

  return (
    <div className={`relative flex flex-col items-center justify-between rounded-3xl bg-gradient-to-b from-[#0c1222] via-[#090d18] to-[#060912] border border-white/10 p-3 shadow-2xl overflow-hidden ${className}`}>
      {/* Luz ambiente de tomografia térmica */}
      <div className="absolute inset-0 bg-radial from-orange-500/10 via-transparent to-transparent pointer-events-none" />

      {/* Header Compacto - 1 Linha Obrigatória sem Wrap */}
      <div className="w-full flex items-center justify-between z-10 mb-1 gap-2 flex-nowrap">
        {/* Chips de Músculos Ativos em 1 Linha com rolagem invisível */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scrollbar-none flex-nowrap shrink min-w-0 py-0.5">
          {primaryMuscles.map(m => (
            <span
              key={m}
              className="text-[9px] font-black tracking-tight px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 flex items-center gap-1 shrink-0 whitespace-nowrap shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              {MUSCLE_LABELS[m]}
            </span>
          ))}
          {secondaryMuscles.map(m => (
            <span
              key={m}
              className="text-[9px] font-bold tracking-tight px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 shrink-0 whitespace-nowrap"
            >
              {MUSCLE_LABELS[m]}
            </span>
          ))}
        </div>

        {/* Toggle Frente / Costas Compacto */}
        <div className="flex bg-[#121a2d] p-0.5 rounded-xl border border-white/5 shrink-0">
          <button
            type="button"
            onClick={() => setView('front')}
            className={`text-[9px] font-extrabold px-2 py-0.5 rounded-lg transition-all ${
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
            className={`text-[9px] font-extrabold px-2 py-0.5 rounded-lg transition-all ${
              view === 'back'
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Costas
          </button>
        </div>
      </div>

      {/* Área Central: Silhueta Anatômica Atlética Completa */}
      <div className="relative w-full flex-1 flex items-center justify-center min-h-0 select-none py-0.5">
        <svg
          viewBox="0 0 180 270"
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full max-h-56 drop-shadow-2xl"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Glow Neon Intenso para Músculo Primário */}
            <filter id="glowPrimary" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Glow Neon para Músculo Sinergista */}
            <filter id="glowSecondary" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Gradiente Primário de Alta Definição */}
            <linearGradient id="fireNeonPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff4500" />
              <stop offset="45%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#b91c1c" />
            </linearGradient>

            {/* Gradiente Secundário Sinergista */}
            <linearGradient id="fireNeonSecondary" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>

            {/* Gradiente Metálico para Músculos em Repouso */}
            <linearGradient id="inactiveMuscleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e2c44" />
              <stop offset="100%" stopColor="#131c2c" />
            </linearGradient>

            <linearGradient id="silhouetteBase" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#172236" />
              <stop offset="100%" stopColor="#0d1422" />
            </linearGradient>
          </defs>

          {/* Sombra de apoio no chão */}
          <ellipse cx="90" cy="265" rx="42" ry="3.5" fill="rgba(0,0,0,0.5)" />

          {view === 'front' ? (
            /* ================= VISTA ANTERIOR (FRENTE) ================= */
            <g id="body-front">
              {/* Cabeça e Pescoço Esculpido */}
              <circle cx="90" cy="18" r="12" fill="url(#silhouetteBase)" stroke="#2b3a54" strokeWidth="0.8" />
              <path d="M85 28 L95 28 L97 38 L83 38 Z" fill="#141c2c" />

              {/* Trapézio Superior */}
              <path d="M78 36 C84 32 96 32 102 36 L108 43 L72 43 Z" fill="#172338" />

              {/* Ombros / Deltóide Anterior e Lateral */}
              <path
                d="M70 39 C61 43 54 52 56 63 C61 65 68 61 72 51 Z"
                fill={getFill('shoulders')}
                filter={getFilter('shoulders')}
                stroke="#0b101f"
                strokeWidth="1"
                className="transition-all duration-300"
              />
              <path
                d="M110 39 C119 43 126 52 124 63 C119 65 112 61 108 51 Z"
                fill={getFill('shoulders')}
                filter={getFilter('shoulders')}
                stroke="#0b101f"
                strokeWidth="1"
                className="transition-all duration-300"
              />

              {/* Peitoral Maior (Esquerdo e Direito com fenda esternal) */}
              <path
                d="M72 45 C81 45 89 48 89 63 C79 66 71 61 70 52 Z"
                fill={getFill('chest')}
                filter={getFilter('chest')}
                stroke="#0b101f"
                strokeWidth="1.2"
                className="transition-all duration-300"
              />
              <path
                d="M108 45 C99 45 91 48 91 63 C101 66 109 61 110 52 Z"
                fill={getFill('chest')}
                filter={getFilter('chest')}
                stroke="#0b101f"
                strokeWidth="1.2"
                className="transition-all duration-300"
              />

              {/* Bíceps Braquial */}
              <path
                d="M55 64 C50 73 50 86 54 94 C59 92 62 84 62 68 Z"
                fill={getFill('triceps')}
                filter={getFilter('triceps')}
                stroke="#0b101f"
                strokeWidth="0.8"
                className="transition-all duration-300"
              />
              <path
                d="M125 64 C130 73 130 86 126 94 C121 92 118 84 118 68 Z"
                fill={getFill('triceps')}
                filter={getFilter('triceps')}
                stroke="#0b101f"
                strokeWidth="0.8"
                className="transition-all duration-300"
              />

              {/* Antebraços */}
              <path d="M53 95 C49 108 47 124 49 132 C53 132 57 116 58 98 Z" fill="#1b253b" />
              <path d="M127 95 C131 108 133 124 131 132 C127 132 123 116 122 98 Z" fill="#1b253b" />

              {/* Mãos */}
              <circle cx="49" cy="135" r="3" fill="#172236" />
              <circle cx="131" cy="135" r="3" fill="#172236" />

              {/* Oblíquos / Serrátil Anterior */}
              <path
                d="M69 64 C71 74 73 88 77 98 C74 89 70 78 69 64 Z"
                fill={getFill('core')}
                filter={getFilter('core')}
                className="transition-all duration-300"
              />
              <path
                d="M111 64 C109 74 107 88 103 98 C106 89 110 78 111 64 Z"
                fill={getFill('core')}
                filter={getFilter('core')}
                className="transition-all duration-300"
              />

              {/* Abdômen 6-Pack Esculpido */}
              <g id="abs-front" fill={getFill('core')} filter={getFilter('core')} className="transition-all duration-300">
                <rect x="79" y="67" width="9" height="8" rx="2" stroke="#0b101f" strokeWidth="1" />
                <rect x="92" y="67" width="9" height="8" rx="2" stroke="#0b101f" strokeWidth="1" />
                <rect x="79" y="77" width="9" height="9" rx="2" stroke="#0b101f" strokeWidth="1" />
                <rect x="92" y="77" width="9" height="9" rx="2" stroke="#0b101f" strokeWidth="1" />
                <rect x="80" y="88" width="9" height="9" rx="2" stroke="#0b101f" strokeWidth="1" />
                <rect x="91" y="88" width="9" height="9" rx="2" stroke="#0b101f" strokeWidth="1" />
              </g>

              {/* Cintura / Pelve */}
              <path d="M75 101 L105 101 L108 122 L72 122 Z" fill="#121a2a" />

              {/* Quadríceps (Reto Femoral + Vasto Lateral e Medial) */}
              <path
                d="M72 124 C66 144 65 168 71 184 C80 184 85 162 86 124 Z"
                fill={getFill('quads')}
                filter={getFilter('quads')}
                stroke="#0b101f"
                strokeWidth="1.2"
                className="transition-all duration-300"
              />
              <path
                d="M108 124 C114 144 115 168 109 184 C100 184 95 162 94 124 Z"
                fill={getFill('quads')}
                filter={getFilter('quads')}
                stroke="#0b101f"
                strokeWidth="1.2"
                className="transition-all duration-300"
              />

              {/* Joelhos */}
              <circle cx="73" cy="189" r="4" fill="#1c283e" />
              <circle cx="107" cy="189" r="4" fill="#1c283e" />

              {/* Panturrilhas / Gastrocnêmio */}
              <path
                d="M70 195 C65 210 67 228 71 242 C77 242 80 226 77 195 Z"
                fill={getFill('calves')}
                filter={getFilter('calves')}
                stroke="#0b101f"
                strokeWidth="1"
                className="transition-all duration-300"
              />
              <path
                d="M110 195 C115 210 113 228 109 242 C103 242 100 226 103 195 Z"
                fill={getFill('calves')}
                filter={getFilter('calves')}
                stroke="#0b101f"
                strokeWidth="1"
                className="transition-all duration-300"
              />

              {/* Pés com Apoio Anatômico */}
              <ellipse cx="71" cy="248" rx="5" ry="2.5" fill="#1c283e" />
              <ellipse cx="109" cy="248" rx="5" ry="2.5" fill="#1c283e" />
            </g>
          ) : (
            /* ================= VISTA POSTERIOR (COSTAS) ================= */
            <g id="body-back">
              {/* Cabeça e Pescoço Traseiro */}
              <circle cx="90" cy="18" r="12" fill="url(#silhouetteBase)" stroke="#2b3a54" strokeWidth="0.8" />
              <path d="M85 28 L95 28 L97 38 L83 38 Z" fill="#141c2c" />

              {/* Trapézio Dorsal (Diamante de Força) */}
              <path
                d="M90 35 L106 44 L90 68 L74 44 Z"
                fill={getFill('back')}
                filter={getFilter('back')}
                stroke="#0b101f"
                strokeWidth="1"
                className="transition-all duration-300"
              />

              {/* Deltóides Posteriores */}
              <path
                d="M70 39 C61 43 54 52 56 63 C61 65 68 61 72 51 Z"
                fill={getFill('shoulders')}
                filter={getFilter('shoulders')}
                stroke="#0b101f"
                strokeWidth="1"
                className="transition-all duration-300"
              />
              <path
                d="M110 39 C119 43 126 52 124 63 C119 65 112 61 108 51 Z"
                fill={getFill('shoulders')}
                filter={getFilter('shoulders')}
                stroke="#0b101f"
                strokeWidth="1"
                className="transition-all duration-300"
              />

              {/* Grande Dorsal (V-Taper / Asas) */}
              <path
                d="M72 52 C75 68 78 84 85 94 C77 86 69 72 67 56 Z"
                fill={getFill('back')}
                filter={getFilter('back')}
                stroke="#0b101f"
                strokeWidth="1.2"
                className="transition-all duration-300"
              />
              <path
                d="M108 52 C105 68 102 84 95 94 C103 86 111 72 113 56 Z"
                fill={getFill('back')}
                filter={getFilter('back')}
                stroke="#0b101f"
                strokeWidth="1.2"
                className="transition-all duration-300"
              />

              {/* Tríceps Braquial (Cabeça Longa e Lateral) */}
              <path
                d="M54 64 C49 73 50 86 54 94 C59 92 62 84 62 68 Z"
                fill={getFill('triceps')}
                filter={getFilter('triceps')}
                stroke="#0b101f"
                strokeWidth="0.8"
                className="transition-all duration-300"
              />
              <path
                d="M126 64 C131 73 130 86 126 94 C121 92 118 84 118 68 Z"
                fill={getFill('triceps')}
                filter={getFilter('triceps')}
                stroke="#0b101f"
                strokeWidth="0.8"
                className="transition-all duration-300"
              />

              {/* Antebraços */}
              <path d="M53 95 C49 108 47 124 49 132 C53 132 57 116 58 98 Z" fill="#1b253b" />
              <path d="M127 95 C131 108 133 124 131 132 C127 132 123 116 122 98 Z" fill="#1b253b" />

              {/* Eretores da Espinha / Lombar */}
              <path
                d="M84 70 L96 70 L95 101 L85 101 Z"
                fill={getFill('back')}
                filter={getFilter('back')}
                stroke="#0b101f"
                strokeWidth="1"
                className="transition-all duration-300"
              />

              {/* Glúteos Máximos */}
              <path
                d="M73 103 C73 103 82 101 90 105 C90 117 85 128 75 128 C70 122 71 109 73 103 Z"
                fill={getFill('glutes')}
                filter={getFilter('glutes')}
                stroke="#0b101f"
                strokeWidth="1.2"
                className="transition-all duration-300"
              />
              <path
                d="M107 103 C107 103 98 101 90 105 C90 117 95 128 105 128 C110 122 109 109 107 103 Z"
                fill={getFill('glutes')}
                filter={getFilter('glutes')}
                stroke="#0b101f"
                strokeWidth="1.2"
                className="transition-all duration-300"
              />

              {/* Isquiotibiais (Posterior de Coxa) */}
              <path
                d="M74 130 C70 150 68 170 72 184 C79 184 84 162 85 130 Z"
                fill={getFill('quads')}
                filter={getFilter('quads')}
                stroke="#0b101f"
                strokeWidth="1.2"
                className="transition-all duration-300"
              />
              <path
                d="M106 130 C110 150 112 170 108 184 C101 184 96 162 95 130 Z"
                fill={getFill('quads')}
                filter={getFilter('quads')}
                stroke="#0b101f"
                strokeWidth="1.2"
                className="transition-all duration-300"
              />

              {/* Joelhos Posteriores */}
              <circle cx="73" cy="189" r="3.5" fill="#1c283e" />
              <circle cx="107" cy="189" r="3.5" fill="#1c283e" />

              {/* Panturrilhas Posteriores (Gastrocnêmio Esculpido) */}
              <path
                d="M71 195 C65 210 67 228 71 242 C77 242 80 226 77 195 Z"
                fill={getFill('calves')}
                filter={getFilter('calves')}
                stroke="#0b101f"
                strokeWidth="1"
                className="transition-all duration-300"
              />
              <path
                d="M109 195 C115 210 113 228 109 242 C103 242 100 226 103 195 Z"
                fill={getFill('calves')}
                filter={getFilter('calves')}
                stroke="#0b101f"
                strokeWidth="1"
                className="transition-all duration-300"
              />

              {/* Pés */}
              <ellipse cx="71" cy="248" rx="4.5" ry="2.5" fill="#1c283e" />
              <ellipse cx="109" cy="248" rx="4.5" ry="2.5" fill="#1c283e" />
            </g>
          )}
        </svg>
      </div>

      {/* Legenda de Ativação Compacta em 1 Linha */}
      <div className="w-full flex items-center justify-between text-[9px] text-slate-500 font-mono mt-1 border-t border-white/5 pt-1 flex-nowrap">
        <span className="flex items-center gap-1 shrink-0 whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
          Foco Primário
        </span>
        <span className="flex items-center gap-1 shrink-0 whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          Sinergista
        </span>
      </div>
    </div>
  );
}

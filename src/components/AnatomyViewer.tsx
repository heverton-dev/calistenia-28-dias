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
    return '#ef4444'; // Vermelho/Laranja de alta intensidade (músculo ativo principal)
  }
  if (secondary.includes(group)) {
    return '#f59e0b'; // Âmbar/Amarelo (estabilizador/secundário)
  }
  return '#1e293b'; // Cinza escuro neutro inativo
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
  const getColor = (group: MuscleGroup) => getMuscleFillColor(group, primaryMuscles, secondaryMuscles);

  return (
    <div className={`relative flex flex-col items-center justify-center p-3 rounded-2xl bg-[#0d1424] border border-white/5 ${className}`}>
      {/* Legenda superior de músculos ativos */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
        {primaryMuscles.map(m => (
          <span
            key={m}
            className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 flex items-center gap-1"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            {MUSCLE_LABELS[m]} (Principal)
          </span>
        ))}
        {secondaryMuscles.map(m => (
          <span
            key={m}
            className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30"
          >
            {MUSCLE_LABELS[m]}
          </span>
        ))}
      </div>

      {/* Silhueta anatômica vetorial SVG */}
      <svg
        viewBox="0 0 200 320"
        className="w-44 h-56 drop-shadow-md select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Cabeça e Pescoço */}
        <circle cx="100" cy="30" r="16" fill="#334155" />
        <path d="M94 46 L106 46 L104 56 L96 56 Z" fill="#334155" />

        {/* Ombros / Deltóides */}
        <path
          d="M74 60 C64 62 60 74 62 84 C68 84 74 80 78 72 Z"
          fill={getColor('shoulders')}
          className="transition-colors duration-300"
        />
        <path
          d="M126 60 C136 62 140 74 138 84 C132 84 126 80 122 72 Z"
          fill={getColor('shoulders')}
          className="transition-colors duration-300"
        />

        {/* Peitoral Esquerdo e Direito */}
        <path
          d="M78 64 C88 64 97 68 98 84 C86 86 76 80 78 64 Z"
          fill={getColor('chest')}
          className="transition-colors duration-300"
        />
        <path
          d="M122 64 C112 64 103 68 102 84 C114 86 124 80 122 64 Z"
          fill={getColor('chest')}
          className="transition-colors duration-300"
        />

        {/* Tríceps / Braço Superior */}
        <path
          d="M60 84 C56 96 58 116 62 126 C66 126 70 114 70 96 Z"
          fill={getColor('triceps')}
          className="transition-colors duration-300"
        />
        <path
          d="M140 84 C144 96 142 116 138 126 C134 126 130 114 130 96 Z"
          fill={getColor('triceps')}
          className="transition-colors duration-300"
        />

        {/* Antebraços */}
        <path d="M58 128 C54 145 52 165 54 175 C57 175 62 155 64 132 Z" fill="#334155" />
        <path d="M142 128 C146 145 148 165 146 175 C143 175 138 155 136 132 Z" fill="#334155" />

        {/* Abdômen / Core */}
        <path
          d="M85 90 L115 90 L112 135 L88 135 Z"
          fill={getColor('core')}
          className="transition-colors duration-300"
        />
        {/* Linhas de definição do abdômen */}
        <line x1="100" y1="92" x2="100" y2="133" stroke="#090d16" strokeWidth="2" opacity="0.6" />
        <line x1="88" y1="105" x2="112" y2="105" stroke="#090d16" strokeWidth="2" opacity="0.6" />
        <line x1="89" y1="120" x2="111" y2="120" stroke="#090d16" strokeWidth="2" opacity="0.6" />

        {/* Dorsais / Costas (visíveis na silhueta lateral) */}
        <path
          d="M74 84 C76 100 80 115 84 125 C82 115 76 98 74 84 Z"
          fill={getColor('back')}
          className="transition-colors duration-300"
        />
        <path
          d="M126 84 C124 100 120 115 116 125 C118 115 124 98 126 84 Z"
          fill={getColor('back')}
          className="transition-colors duration-300"
        />

        {/* Pelve e Glúteos */}
        <path
          d="M86 138 L114 138 L120 162 L80 162 Z"
          fill={getColor('glutes')}
          className="transition-colors duration-300"
        />

        {/* Coxas / Quadríceps Esquerdo e Direito */}
        <path
          d="M82 166 C78 190 76 215 82 235 C92 235 96 205 97 166 Z"
          fill={getColor('quads')}
          className="transition-colors duration-300"
        />
        <path
          d="M118 166 C122 190 124 215 118 235 C108 235 104 205 103 166 Z"
          fill={getColor('quads')}
          className="transition-colors duration-300"
        />

        {/* Joelhos */}
        <circle cx="83" cy="240" r="4" fill="#334155" />
        <circle cx="117" cy="240" r="4" fill="#334155" />

        {/* Panturrilhas */}
        <path
          d="M81 245 C77 265 78 285 81 300 C87 300 88 280 87 245 Z"
          fill={getColor('calves')}
          className="transition-colors duration-300"
        />
        <path
          d="M119 245 C123 265 122 285 119 300 C113 300 112 280 113 245 Z"
          fill={getColor('calves')}
          className="transition-colors duration-300"
        />

        {/* Pés */}
        <ellipse cx="80" cy="305" rx="6" ry="3" fill="#334155" />
        <ellipse cx="120" cy="305" rx="6" ry="3" fill="#334155" />
      </svg>
    </div>
  );
}

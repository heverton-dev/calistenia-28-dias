import { useEffect, useRef, useState } from 'react';
import { AnimationType } from '../types/workout';

interface ExerciseAnimationProps {
  animationType?: AnimationType;
  exerciseId?: string;
  className?: string;
  isPaused?: boolean;
}

const EXERCISE_ID_MAP: Record<string, string> = {
  'push-up': '/exercises/push-up',
  'diamond-push-up': '/exercises/diamond-push-up',
  'pike-push-up': '/exercises/pike-push-up',
  'dips-bench': '/exercises/dips-bench',
  'plank': '/exercises/plank',
  'mountain-climber': '/exercises/mountain-climber',
  'hollow-body-hold': '/exercises/hollow-body-hold',
  'bodyweight-squat': '/exercises/bodyweight-squat',
  'lunges': '/exercises/lunges',
  'glute-bridge': '/exercises/glute-bridge',
  'jumping-jacks': '/exercises/jumping-jacks',
  'burpee': '/exercises/burpee',
};

const ANIMATION_TYPE_MAP: Record<AnimationType, string> = {
  'pushup': '/exercises/push-up',
  'squat': '/exercises/bodyweight-squat',
  'plank': '/exercises/plank',
  'dips': '/exercises/dips-bench',
  'jumping-jack': '/exercises/jumping-jacks',
  'lunges': '/exercises/lunges',
  'mountain-climber': '/exercises/mountain-climber',
  'burpee': '/exercises/burpee',
  'hollow-hold': '/exercises/hollow-body-hold',
  'pike-pushup': '/exercises/pike-push-up',
  'glute-bridge': '/exercises/glute-bridge',
};

export function ExerciseAnimation({
  animationType,
  exerciseId,
  className = '',
  isPaused = false
}: ExerciseAnimationProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasVideoError, setHasVideoError] = useState(false);

  // Determina o caminho base da mídia
  const basePath =
    (exerciseId && EXERCISE_ID_MAP[exerciseId]) ||
    (animationType && ANIMATION_TYPE_MAP[animationType]) ||
    '/exercises/push-up';

  // Sincroniza pause/play com o vídeo
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPaused) {
      video.pause();
    } else {
      video.play().catch(() => {
        // Ignora política de autoplay se já tiver iniciado
      });
    }
  }, [isPaused, basePath]);

  return (
    <div
      className={`relative flex flex-col items-center justify-between rounded-3xl bg-gradient-to-b from-[#0c1222] via-[#090d18] to-[#060912] border border-white/10 p-2.5 shadow-2xl overflow-hidden select-none ${className}`}
    >
      {/* Luz ambiente de estúdio fitness vinculada ao tema */}
      <div className="absolute inset-0 bg-radial from-[var(--theme-color)]/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--theme-color)]/35 to-transparent" />

      {/* Header Compacto - 1 Linha Obrigatória sem Quebras */}
      <div className="w-full flex items-center justify-between z-10 mb-1 gap-2 flex-nowrap shrink-0">
        <span className="text-[9px] font-black text-white/90 uppercase tracking-widest flex items-center gap-1.5 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15 shrink-0 whitespace-nowrap shadow-inner">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          Avatar 3D Ativo
        </span>
        <span className="text-[9px] text-slate-300 font-mono font-bold bg-white/5 px-2 py-0.5 rounded-lg border border-white/5 shrink-0 whitespace-nowrap">
          {isPaused ? '⏸ Pausado' : '⚡ 30 FPS Loop'}
        </span>
      </div>

      {/* Palco do Vídeo / Avatar 3D */}
      <div className="relative w-full flex-1 min-h-0 flex items-center justify-center overflow-hidden rounded-2xl bg-black/40 border border-white/5">
        {/* Glow de fundo focalizado no atleta */}
        <div className="absolute w-40 h-40 rounded-full bg-[var(--theme-color)]/15 blur-2xl pointer-events-none" />

        {!hasVideoError ? (
          <video
            ref={videoRef}
            key={basePath}
            autoPlay
            loop
            muted
            playsInline
            poster={`${basePath}-poster.jpg`}
            onError={() => setHasVideoError(true)}
            className="w-full h-full max-h-full object-contain filter drop-shadow-[0_8px_20px_rgba(0,0,0,0.85)] z-10"
          >
            <source src={`${basePath}.webm`} type="video/webm" />
            <source src={`${basePath}.mp4`} type="video/mp4" />
            {/* Fallback de imagem GIF se o navegador não decodificar vídeo */}
            <img
              src={`${basePath}.gif`}
              alt="Animação do Exercício"
              className="w-full h-full object-contain"
            />
          </video>
        ) : (
          <img
            src={`${basePath}.gif`}
            alt="Animação do Exercício"
            className="w-full h-full object-contain filter drop-shadow-[0_8px_20px_rgba(0,0,0,0.85)] z-10"
          />
        )}

        {/* Overlay sutil de piso do estúdio */}
        <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10" />
      </div>

      {/* Rodapé Informativo de Cadência Biomecânica */}
      <div className="w-full flex items-center justify-between z-10 mt-1 px-1 text-[9px] text-slate-400 font-mono shrink-0 whitespace-nowrap">
        <span className="flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-[var(--theme-color)]" />
          Consistência Anatômica
        </span>
        <span className="text-slate-400/80">Modelo 3D Unificado</span>
      </div>
    </div>
  );
}

// Sintetizador Web Audio API puro - Zero dependências ou assets externos de áudio

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return null;

  if (!audioCtx) {
    audioCtx = new AudioCtx();
  }

  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }

  return audioCtx;
}

/**
 * Toca bip de contagem regressiva (3, 2, 1) ou tom final mais agudo
 */
export function playCountdownBeep(secondsRemaining: number): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // No 1 ou 0 toca mais agudo (1200Hz), nos demais 800Hz
    const freq = secondsRemaining <= 1 ? 1200 : 780;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  } catch {
    // Silencia em ambientes headless
  }
}

/**
 * Toca sino harmônico ao concluir o exercício ou ao trocar de série
 */
export function playTransitionBell(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const baseFreqs = [523.25, 659.25, 783.99]; // Acorde C Maior
    baseFreqs.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.05);

      const startTime = ctx.currentTime + index * 0.05;
      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.65);
    });
  } catch {
    // Silencia em ambientes headless
  }
}

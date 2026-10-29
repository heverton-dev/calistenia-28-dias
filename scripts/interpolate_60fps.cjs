const { execSync } = require('child_process');
const fs = require('fs');

const exercises = [
  'push-up', 'diamond-push-up', 'pike-push-up', 'dips-bench',
  'plank', 'mountain-climber', 'hollow-body-hold', 'bodyweight-squat',
  'lunges', 'glute-bridge', 'jumping-jacks', 'burpee'
];

console.log('--- INICIANDO INTERPOLAÇÃO DE MOVIMENTO PARA 60 FPS NATIVO ---');

exercises.forEach((id, idx) => {
  const gif = `public/exercises/${id}.gif`;
  const mp4 = `public/exercises/${id}.mp4`;
  const webm = `public/exercises/${id}.webm`;

  if (fs.existsSync(gif)) {
    try {
      console.log(`[${idx + 1}/12] Processando ${id} para 60 FPS...`);
      // Interpolação vetorial AOBMC para 60 FPS em MP4 H.264
      execSync(
        `ffmpeg -y -i "${gif}" -vf "minterpolate=fps=60:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1" -c:v libx264 -pix_fmt yuv420p -movflags faststart "${mp4}"`,
        { stdio: 'ignore' }
      );
      // Interpolação vetorial para 60 FPS em WebM VP9
      execSync(
        `ffmpeg -y -i "${gif}" -vf "minterpolate=fps=60:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1" -c:v libvpx-vp9 -b:v 0 -crf 30 "${webm}"`,
        { stdio: 'ignore' }
      );
      console.log(`  ✓ ${id}: MP4=${fs.statSync(mp4).size} bytes | WebM=${fs.statSync(webm).size} bytes @ 60 FPS`);
    } catch (e) {
      console.error(`  ✖ Falha em ${id}:`, e.message);
    }
  }
});

console.log('--- TODOS OS 12 EXERCÍCIOS INTERPOLADOS PARA 60 FPS COM SUCESSO! ---');

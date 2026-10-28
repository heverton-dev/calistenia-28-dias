const { execSync } = require('child_process');
const fs = require('fs');

const exercises = [
  'push-up', 'diamond-push-up', 'pike-push-up', 'dips-bench',
  'plank', 'mountain-climber', 'hollow-body-hold', 'bodyweight-squat',
  'lunges', 'glute-bridge', 'jumping-jacks', 'burpee'
];

exercises.forEach(id => {
  const mp4 = `public/exercises/${id}.mp4`;
  const poster = `public/exercises/${id}-poster.jpg`;
  
  if (fs.existsSync(mp4)) {
    try {
      execSync(`ffmpeg -y -i "${mp4}" -ss 00:00:00.000 -vframes 1 "${poster}"`, { stdio: 'ignore' });
      console.log(`Poster for ${id}: ${fs.statSync(poster).size} bytes`);
    } catch (e) {
      console.error(`Failed poster on ${id}:`, e.message);
    }
  }
});
console.log('ALL POSTERS GENERATED!');

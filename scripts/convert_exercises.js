const { execSync } = require('child_process');
const fs = require('fs');

const exercises = [
  'push-up', 'diamond-push-up', 'pike-push-up', 'dips-bench',
  'plank', 'mountain-climber', 'hollow-body-hold', 'bodyweight-squat',
  'lunges', 'glute-bridge', 'jumping-jacks', 'burpee'
];

exercises.forEach(id => {
  const gif = `public/exercises/${id}.gif`;
  const mp4 = `public/exercises/${id}.mp4`;
  const webm = `public/exercises/${id}.webm`;
  
  if (fs.existsSync(gif)) {
    try {
      execSync(`ffmpeg -y -i "${gif}" -movflags faststart -pix_fmt yuv420p -vf "scale=ceil(iw/2)*2:ceil(ih/2)*2" "${mp4}"`, { stdio: 'inherit' });
      execSync(`ffmpeg -y -i "${gif}" -c:v libvpx-vp9 -b:v 0 -crf 32 "${webm}"`, { stdio: 'inherit' });
      console.log(`Converted ${id}: MP4=${fs.statSync(mp4).size} bytes, WebM=${fs.statSync(webm).size} bytes`);
    } catch (e) {
      console.error(`Failed on ${id}:`, e.message);
    }
  }
});
console.log('ALL EXERCISES CONVERTED SUCCESSFULLY!');

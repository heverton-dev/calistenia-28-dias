const fs = require('fs');

let content = fs.readFileSync('src/data/exercises.ts', 'utf-8');

const mediaMap = {
  'push-up': { videoUrl: '/exercises/push-up.webm', posterUrl: '/exercises/push-up-poster.jpg' },
  'diamond-push-up': { videoUrl: '/exercises/diamond-push-up.webm', posterUrl: '/exercises/diamond-push-up-poster.jpg' },
  'pike-push-up': { videoUrl: '/exercises/pike-push-up.webm', posterUrl: '/exercises/pike-push-up-poster.jpg' },
  'dips-bench': { videoUrl: '/exercises/dips-bench.webm', posterUrl: '/exercises/dips-bench-poster.jpg' },
  'plank': { videoUrl: '/exercises/plank.webm', posterUrl: '/exercises/plank-poster.jpg' },
  'mountain-climber': { videoUrl: '/exercises/mountain-climber.webm', posterUrl: '/exercises/mountain-climber-poster.jpg' },
  'hollow-body-hold': { videoUrl: '/exercises/hollow-body-hold.webm', posterUrl: '/exercises/hollow-body-hold-poster.jpg' },
  'bodyweight-squat': { videoUrl: '/exercises/bodyweight-squat.webm', posterUrl: '/exercises/bodyweight-squat-poster.jpg' },
  'lunges': { videoUrl: '/exercises/lunges.webm', posterUrl: '/exercises/lunges-poster.jpg' },
  'glute-bridge': { videoUrl: '/exercises/glute-bridge.webm', posterUrl: '/exercises/glute-bridge-poster.jpg' },
  'jumping-jacks': { videoUrl: '/exercises/jumping-jacks.webm', posterUrl: '/exercises/jumping-jacks-poster.jpg' },
  'burpee': { videoUrl: '/exercises/burpee.webm', posterUrl: '/exercises/burpee-poster.jpg' }
};

for (const [id, media] of Object.entries(mediaMap)) {
  const target = `id: '${id}',`;
  if (content.includes(target) && !content.includes(`videoUrl: '${media.videoUrl}'`)) {
    content = content.replace(
      target,
      `${target}\n    videoUrl: '${media.videoUrl}',\n    posterUrl: '${media.posterUrl}',`
    );
  }
}

fs.writeFileSync('src/data/exercises.ts', content, 'utf-8');
console.log('exercises.ts updated with videoUrl and posterUrl!');

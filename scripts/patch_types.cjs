const fs = require('fs');

let types = fs.readFileSync('src/types/workout.ts', 'utf-8');
if (!types.includes('mediaId?: string;')) {
  types = types.replace(
    '  difficulty: \'iniciante\' | \'intermediario\' | \'avancado\';',
    '  difficulty: \'iniciante\' | \'intermediario\' | \'avancado\';\n  mediaId?: string;\n  videoUrl?: string;\n  posterUrl?: string;'
  );
  fs.writeFileSync('src/types/workout.ts', types, 'utf-8');
  console.log('Types updated with media fields!');
} else {
  console.log('Types already up to date.');
}

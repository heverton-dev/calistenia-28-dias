const fs = require('fs');

// 1. Atualiza WorkoutPlayer.tsx
let player = fs.readFileSync('src/components/WorkoutPlayer.tsx', 'utf-8');
player = player.split('<ExerciseAnimation\n                  animationType={currentExercise.animationType}').join('<ExerciseAnimation\n                  exerciseId={currentExercise.id}\n                  animationType={currentExercise.animationType}');
player = player.split('<ExerciseAnimation\n                    animationType={currentExercise.animationType}').join('<ExerciseAnimation\n                    exerciseId={currentExercise.id}\n                    animationType={currentExercise.animationType}');
fs.writeFileSync('src/components/WorkoutPlayer.tsx', player, 'utf-8');
console.log('WorkoutPlayer updated successfully!');

// 2. Atualiza ExerciseModal.tsx se necessário
let modal = fs.readFileSync('src/components/ExerciseModal.tsx', 'utf-8');
modal = modal.split('<ExerciseAnimation\n                        animationType={exercise.animationType}').join('<ExerciseAnimation\n                        exerciseId={exercise.id}\n                        animationType={exercise.animationType}');
modal = modal.split('<ExerciseAnimation\n                          animationType={exercise.animationType}').join('<ExerciseAnimation\n                          exerciseId={exercise.id}\n                          animationType={exercise.animationType}');
fs.writeFileSync('src/components/ExerciseModal.tsx', modal, 'utf-8');
console.log('ExerciseModal updated successfully!');

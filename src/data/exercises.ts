import { Exercise } from '../types/workout';

export const EXERCISES: Exercise[] = [
  {
    id: 'push-up',
    name: 'Flexão Tradicional',
    slug: 'flexao-tradicional',
    primaryMuscles: ['chest', 'triceps'],
    secondaryMuscles: ['shoulders', 'core'],
    description: 'Movimento fundamental de empurrar que constrói força no peitoral, ombros e tríceps com estabilidade de tronco.',
    tips: [
      'Mantenha o corpo em linha reta da cabeça aos calcanhares',
      'Desça até o peito quase tocar o chão',
      'Cotovelos a cerca de 45 graus do tronco, sem abrir demais'
    ],
    animationType: 'pushup',
    difficulty: 'iniciante'
  },
  {
    id: 'diamond-push-up',
    name: 'Flexão Diamante',
    slug: 'flexao-diamante',
    primaryMuscles: ['triceps', 'chest'],
    secondaryMuscles: ['shoulders', 'core'],
    description: 'Variação avançada com as mãos unidas em formato de diamante, aumentando a ênfase no tríceps braquial.',
    tips: [
      'Polegares e indicadores quase se tocando sob o centro do peito',
      'Mantenha o abdômen rígido para não arquear a lombar',
      'Se necessário, inicie com os joelhos no chão'
    ],
    animationType: 'pushup',
    difficulty: 'intermediario'
  },
  {
    id: 'pike-push-up',
    name: 'Flexão Pike',
    slug: 'flexao-pike',
    primaryMuscles: ['shoulders', 'triceps'],
    secondaryMuscles: ['chest', 'core'],
    description: 'Excelente para desenvolver os deltóides e força vertical preparatória para handstand e parada de mão.',
    tips: [
      'Eleve o quadril formando um "V" invertido',
      'Desça a cabeça à frente das mãos em movimento triangular',
      'Olhe para os pés, mantendo o pescoço neutro'
    ],
    animationType: 'pike-pushup',
    difficulty: 'intermediario'
  },
  {
    id: 'dips-bench',
    name: 'Mergulho no Banco / Cadeira',
    slug: 'mergulho-no-banco',
    primaryMuscles: ['triceps', 'shoulders'],
    secondaryMuscles: ['chest'],
    description: 'Isola e queima os tríceps utilizando o suporte de uma cadeira, sofá ou degrau.',
    tips: [
      'Mantenha as costas próximas à borda de apoio',
      'Flexione os cotovelos até formar um ângulo de 90 graus',
      'Empurre o chão/apoio com a palma das mãos sem encolher os ombros'
    ],
    animationType: 'dips',
    difficulty: 'iniciante'
  },
  {
    id: 'plank',
    name: 'Prancha Isométrica',
    slug: 'prancha-isometrica',
    primaryMuscles: ['core'],
    secondaryMuscles: ['shoulders', 'glutes'],
    description: 'O padrão ouro para estabilização de core, fortalecendo abdômen profundo e sustentação lombar.',
    tips: [
      'Apoie os antebraços no chão alinhados aos ombros',
      'Contraia glúteos e abdômen como se levasse um soco',
      'Não deixe o quadril cair nem empinar'
    ],
    animationType: 'plank',
    difficulty: 'iniciante'
  },
  {
    id: 'mountain-climber',
    name: 'Alpinista (Mountain Climber)',
    slug: 'mountain-climber',
    primaryMuscles: ['core', 'shoulders'],
    secondaryMuscles: ['quads', 'calves'],
    description: 'Exercício dinâmico e cardiovascular que queima gordura e ativa intensamente a parede abdominal.',
    tips: [
      'Inicie em posição de flexão alta',
      'Puxe os joelhos alternadamente em direção ao peito com ritmo',
      'Mantenha as mãos firmes sob os ombros sem pular o quadril'
    ],
    animationType: 'mountain-climber',
    difficulty: 'iniciante'
  },
  {
    id: 'hollow-body-hold',
    name: 'Canoa Isométrica (Hollow Body)',
    slug: 'canoa-isometrica',
    primaryMuscles: ['core'],
    secondaryMuscles: ['quads'],
    description: 'Postura clássica da ginástica olímpica essencial para desenvolver força e tensão corporal total.',
    tips: [
      'Pressione a lombar com força total contra o chão',
      'Estenda pernas e braços criando formato de concha',
      'Respire de forma controlada sem soltar a pressão lombar'
    ],
    animationType: 'hollow-hold',
    difficulty: 'intermediario'
  },
  {
    id: 'bodyweight-squat',
    name: 'Agachamento Livre',
    slug: 'agachamento-livre',
    primaryMuscles: ['quads', 'glutes'],
    secondaryMuscles: ['calves', 'core'],
    description: 'O rei dos exercícios de pernas, desenvolvendo coxas, glúteos e mobilidade funcional do quadril.',
    tips: [
      'Pés na largura dos ombros, ligeiramente apontados para fora',
      'Inicie descendo o quadril para trás como se fosse sentar',
      'Joelhos acompanhando a linha dos dedos dos pés'
    ],
    animationType: 'squat',
    difficulty: 'iniciante'
  },
  {
    id: 'lunges',
    name: 'Avanço / Passada',
    slug: 'passada-afundo',
    primaryMuscles: ['quads', 'glutes'],
    secondaryMuscles: ['calves', 'core'],
    description: 'Trabalho unilateral fundamental para corrigir desequilíbrios musculares e aumentar estabilidade.',
    tips: [
      'Dê um passo à frente mantendo o tronco ereto',
      'Desça o joelho de trás até quase tocar o solo',
      'Empurre o calcanhar da frente para retornar à posição inicial'
    ],
    animationType: 'lunges',
    difficulty: 'iniciante'
  },
  {
    id: 'glute-bridge',
    name: 'Elevação Pélvica',
    slug: 'elevacao-pelvica',
    primaryMuscles: ['glutes', 'back'],
    secondaryMuscles: ['core'],
    description: 'Fortalecimento da cadeia posterior, glúteos e proteção para a coluna vertebral.',
    tips: [
      'Deite-se de costas com joelhos dobrados e pés firmes no chão',
      'Eleve o quadril apertando os glúteos no ponto mais alto',
      'Segure 1 segundo no topo antes de descer de forma controlada'
    ],
    animationType: 'glute-bridge',
    difficulty: 'iniciante'
  },
  {
    id: 'jumping-jacks',
    name: 'Polichinelo Ativo',
    slug: 'polichinelo',
    primaryMuscles: ['calves', 'shoulders'],
    secondaryMuscles: ['quads', 'core'],
    description: 'Aquecimento e estímulo metabólico para elevar batimentos e preparar o corpo para o treino.',
    tips: [
      'Pouse na ponta dos pés para amortecer o impacto',
      'Abra braços e pernas de forma sincronizada',
      'Mantenha respiração constante e ritmada'
    ],
    animationType: 'jumping-jack',
    difficulty: 'iniciante'
  },
  {
    id: 'burpee',
    name: 'Burpee Completo',
    slug: 'burpee-completo',
    primaryMuscles: ['chest', 'quads', 'core'],
    secondaryMuscles: ['shoulders', 'triceps', 'calves'],
    description: 'Exercício de corpo inteiro de alta intensidade para resistência anaeróbica e condicionamento extremo.',
    tips: [
      'Agache, apoie as mãos, jogue os pés para trás em flexão',
      'Faça a flexão rápida, puxe os pés de volta e salte verticalmente',
      'Mantenha ritmo fluido e cadenciado'
    ],
    animationType: 'burpee',
    difficulty: 'avancado'
  }
];

export function getExerciseById(id: string): Exercise | undefined {
  return EXERCISES.find(ex => ex.id === id);
}

export function getAlternativeExercises(exerciseId: string): Exercise[] {
  const current = getExerciseById(exerciseId);
  if (!current) return [];

  return EXERCISES.filter(ex => {
    if (ex.id === exerciseId) return false;
    // Compartilha algum músculo primário ou secundário
    const sharesPrimary = ex.primaryMuscles.some(m => current.primaryMuscles.includes(m));
    const sharesSecondary = ex.secondaryMuscles.some(m => current.primaryMuscles.includes(m));
    return sharesPrimary || sharesSecondary;
  });
}

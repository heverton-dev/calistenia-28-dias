# Plano de Implementação: Animações Realistas e Consistentes 3D para Exercícios

- **Módulo:** `media-3d-animations`
- **Spec:** `docs/specs/SPEC-animacoes-3d-exercicios.md`
- **Data:** 2026-10-28
- **Estratégia:** Fatiamento Vertical (Varredura de Ativos → Pipeline de Conversão/Armazenamento → Refatoração do Componente → Validação Visual E2E)

---

## 1. Grafo de Dependências

```
[1. Varredura e Seleção do Avatar Consistente]
                      │
                      ▼
[2. Aquisição e Otimização dos 12 Clipes de Exercício (WebM/MP4)]
                      │
                      ▼
[3. Armazenamento Local em public/exercises/ com Nomenclatura Canônica]
                      │
                      ▼
[4. Refatoração do Componente ExerciseAnimation (Suporte a Vídeo/Loop)]
                      │
                      ▼
[5. Atualização de Tipos e Mapeamento de Metadados (src/types, exercises.ts)]
                      │
                      ▼
[6. Testes Unitários de Regressão e Validação E2E no Playwright (Mobile)]
```

---

## 2. Fatias Verticais de Implementação

### Fatia 1: Varredura, Aquisição & Otimização do Conjunto 3D Consistente
- Localizar repositório/fonte de modelo atlético 3D consistente contendo os 12 exercícios canônicos.
- Padronizar resolução (720x720 / proporção 1:1), fundo estúdio escuro e iluminação limpa.
- Otimizar taxa de compressão para WebM/MP4 (alvo: < 1.2 MB por clipe).
- Armazenar ativos prontos em `public/exercises/`.

### Fatia 2: Componente de Vídeo em Loop com Controle de Estado
- Adaptar `src/components/ExerciseAnimation.tsx`:
  - Adicionar suporte nativo à tag `<video>` com `playsinline autoPlay loop muted`.
  - Conectar ref de vídeo ao prop `isPaused` com fallback gracioso.
  - Manter sobreposição de badges informativos e iluminação temática sem layout-shift.
- Atualizar tipo `Exercise` em `src/types/workout.ts` para incluir caminhos de mídia opcionais (`videoUrl`, `posterUrl`).

### Fatia 3: Integração no Player e Validação E2E
- Verificar renderização no `WorkoutPlayer` e no modal de detalhes `ExerciseModal`.
- Rodar bateria de testes unitários (`npm test -- --run`).
- Executar validação visual com Playwright nas resoluções mobile 360×740 e 375×667.
